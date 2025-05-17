import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('file-processing') private fileQueue: Queue,
  ) {}

  async handleUpload(
    file: Express.Multer.File,
    title: string,
    description: string,
    userId: number,
  ) {
    const savedFile = await this.prisma.file.create({
      data: {
        userId,
        originalName: file.originalname,
        storagePath: file.path,
        title,
        description,
        status: 'uploaded',
      },
    });

    await this.fileQueue.add('process-file', {
      fileId: savedFile.id,
      path: file.path,
    });

    return {
      fileId: savedFile.id,
      status: 'uploaded',
    };
  }
  async getFileById(fileId: number, userId: number) {
    return this.prisma.file.findFirst({
      where: {
        id: fileId,
        userId, // ensures user only sees their own files
      },
      select: {
        id: true,
        originalName: true,
        title: true,
        description: true,
        status: true,
        extractedData: true,
        uploadedAt: true,
      },
    });
  }
}
