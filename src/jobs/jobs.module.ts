import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JobsProcessor } from './jobs.processor';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'file-processing',
    }),
  ],
  providers: [JobsProcessor, PrismaService],
})
export class JobsModule {}
