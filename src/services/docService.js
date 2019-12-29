import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, billNumber) => {
    savePDF(html, {
      paperSize: 'Letter',
      fileName: 'Invoice_' + billNumber + '.pdf',
      margin: 8
    })
  }
}

const Doc = new DocService();
export default Doc;