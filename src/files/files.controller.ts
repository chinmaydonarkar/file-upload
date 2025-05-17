import {
    Controller,
    Get,
    Param,
    NotFoundException,
    Post,
    UploadedFile,
    UseInterceptors,
    Body,
    UseGuards,
    Req,
    BadRequestException
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { v4 as uuidv4 } from 'uuid';
  import { extname } from 'path';
  import { FilesService } from './files.service';
  import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
  
  @Controller()
  export class FilesController {
    constructor(private readonly filesService: FilesService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }))
    async uploadFile(
      @UploadedFile() file: Express.Multer.File,
      @Body() body: { title?: string; description?: string },
      @Req() req: any,
    ) {
        const { title, description } = body ?? {};
        const userId = req?.user?.userId;

        if (!title || !description || !userId) {
          throw new BadRequestException('Title, description, and userId are required.');
        }
      
        return this.filesService.handleUpload(
          file,
          title,
          description,
          userId,
        );
      }

      @UseGuards(JwtAuthGuard)
      @Get('files/:id')
      async getFileById(@Param('id') id: string, @Req() req: any) {
        const file = await this.filesService.getFileById(Number(id), req.user.userId);
        if (!file) {
          throw new NotFoundException('File not found or access denied');
        }
        return file;
      }
  }
