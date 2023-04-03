import {
  BadRequestException,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createZipFile } from './common/helpers';
import { PdfService } from './pdf/pdf.service';
import { SuccessResponseDto } from './common/dtos/response.dto';
import { Response } from 'express';
import { LocalFileService } from './models/local-file/local-file.service';
import { ApiResponse } from './common/decorators/response.decorator';
import { ApiFile } from './common/decorators';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(
    private readonly pdf: PdfService,
    private readonly localFile: LocalFileService,
  ) {}

  @Get()
  @ApiResponse('Success')
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Return test data' })
  getHello() {
    return {
      project: 'Aquavita API',
      description: 'RestFul API specification for Aquavita',
      version: '1.0.0',
    };
  }

  @Post('image')
  @ApiFile()
  @ApiResponse('Upload image successfully.')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload image.' })
  async getImage(@UploadedFile('file') image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException('File is required.');
    }
    return await this.localFile.saveLocalFileData({
      path: image.path,
      filename: image.filename,
      destination: image.destination,
      mimetype: image.mimetype,
    });
  }

  @Get('/export')
  @ApiOperation({ summary: 'Test export zip service' })
  @Header('Content-Type', 'application/zip')
  async exportZip(@Res() res: Response): Promise<void> {
    const zipFile = await createZipFile([]);

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${'name'}.zip`,
      //'Content-Length': zipFile.length,
    });

    res.send(zipFile);
  }

  @Get('/pdf')
  @ApiOperation({ summary: 'Test generate pdf service' })
  @Header('Content-Type', 'application/pdf')
  async generatePdf(@Res() res: Response): Promise<any> {
    const template = 'Bonjour {{name}}!';
    const variables = { name: 'Jean' };
    const pdfBuffer = await this.pdf.generatePdf(template, variables);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  }
}
