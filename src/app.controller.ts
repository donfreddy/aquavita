import { BadRequestError } from './common/helpers/api-error';
import { BadRequestResponse } from './common/helpers/api-response';
import { PdfService } from './pdf/pdf.service';
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
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { createZipFile, SuccessResponse } from './common/helpers';
import { SuccessResponseDto } from './common/dtos/response.dto';
import { Response } from 'express';
import LocalFilesInterceptor from './common/interceptors/local-files.interceptor';
import { LocalFileService } from './models/local-file/local-file.service';
import { ApiFile } from './common/decorators/api-file.decorator';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(
    private readonly pdf: PdfService,
    private readonly localFile: LocalFileService,
  ) {}

  @Get()
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Return test data' })
  getHello() {
    const data = {
      project: 'Aquavita API',
      description: 'RestFul API specification for Aquavita',
      version: '1.0.0',
    };
    return new SuccessResponse('Success', data);
  }

  @Post('image')
  @ApiFile()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload image.' })
  async getImage(@UploadedFile('file') image: Express.Multer.File) {
    const result = await this.localFile.saveLocalFileData({
      path: image.path,
      filename: image.filename,
      destination: image.destination,
      mimetype: image.mimetype,
    });

    return new SuccessResponse('Upload image successfully.', result);
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

    // new SuccessResponse(null, zipFile).send(res);
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

    //new SuccessResponse(null, pdfBuffer).send(res);
    res.send(pdfBuffer);
  }
}
