import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaService } from '../prisma.service'; // ✅ import PrismaService
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'file-processing' })
  ],
  controllers: [FilesController],
  providers: [FilesService, PrismaService] // ✅ add PrismaService here
})
export class FilesModule {}
