import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from '../prisma.service';
import * as fs from 'fs/promises';
import * as crypto from 'crypto';

@Processor('file-processing')
export class JobsProcessor {
  constructor(private prisma: PrismaService) {}

  @Process('process-file')
  async handleFileProcessing(job: Job<{ fileId: number; path: string }>) {
    const { fileId, path } = job.data;

    try {
      // Mark as processing
      await this.prisma.file.update({
        where: { id: fileId },
        data: { status: 'processing' },
      });

      // Simulate file reading and checksum calculation
      const fileBuffer = await fs.readFile(path);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      // Update file record
      await this.prisma.file.update({
        where: { id: fileId },
        data: {
          status: 'processed',
          extractedData: `sha256:${hash}`,
        },
      });

      console.log(`File ${fileId} processed.`);
    } catch (err) {
      console.error(`Failed to process file ${fileId}`, err);
      await this.prisma.file.update({
        where: { id: fileId },
        data: {
          status: 'failed',
          extractedData: `Error: ${err.message}`,
        },
      });
    }
  }
}
