import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  constructor() {}

  // Generate a PDF
  // You can browse demo here https://pdfkit.org/demo/browser.html
  async generatePdf(template: string, variables: any): Promise<Buffer> {
    // Create a document
    const doc = new PDFDocument();

    // Buffer the document's contents
    const buffers: Buffer[] = [];

    // Pipe its output somewhere, like to a file or HTTP response
    doc.pipe(fs.createWriteStream('output.pdf'));

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const result = Buffer.concat(buffers);
      return result;
    });

    // Add content to PDF
    doc.text(`Bonjour ${variables.name}`);

    doc.end();

    return new Promise((resolve, reject) => {
      doc.on('end', () => {
        const result = Buffer.concat(buffers);
        resolve(result);
      });
      doc.on('error', reject);
    });
  }
}
