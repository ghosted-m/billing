import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (invoiceData, templateNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Try to capture the on-screen preview node if it exists to avoid layout mismatches
      const previewNode = document.getElementById('invoice-preview');
      let canvas;

      if (previewNode) {
        // Clone the preview node so we can capture it offscreen without UI overlays
        const clone = previewNode.cloneNode(true);
        // Create an offscreen container with exact A4 dimensions
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '-9999px';
        container.style.left = '-9999px';
        container.style.width = '210mm';
        container.style.height = '297mm';
        container.style.overflow = 'visible';
        container.appendChild(clone);
        document.body.appendChild(container);

        // Ensure cloned element has same computed width/height
        clone.style.width = '210mm';
        clone.style.minHeight = '297mm';

        // Wait a tick for fonts/styles to apply
        await new Promise((r) => setTimeout(r, 50));

        canvas = await html2canvas(clone, {
          scale: Math.max(2, window.devicePixelRatio || 1),
          useCORS: true,
          logging: false,
          windowWidth: clone.scrollWidth,
          windowHeight: clone.scrollHeight,
        });

        document.body.removeChild(container);
      } else {
        // Fallback: server-render the template into a detached node (existing behavior)
        const invoice = document.createElement('div');
        document.body.appendChild(invoice);

        // Render the InvoiceTemplate component to a string
        const InvoiceTemplate = (await import('../components/InvoiceTemplate')).default;
        const ReactDOMServer = (await import('react-dom/server')).default;
        const React = (await import('react')).default;

        const invoiceElement = React.createElement(InvoiceTemplate, { data: invoiceData, templateNumber });
        const invoiceHTML = ReactDOMServer.renderToString(invoiceElement);

        invoice.innerHTML = `
          <div class="w-[210mm] min-h-[297mm] mx-auto border shadow-lg">
            ${invoiceHTML}
          </div>
        `;
        invoice.style.width = '210mm';
        invoice.style.height = '297mm';

        canvas = await html2canvas(invoice, {
          scale: Math.max(2, window.devicePixelRatio || 1),
          useCORS: true,
          logging: false,
        });

        document.body.removeChild(invoice);
      }
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
      const { number, date, paymentDate } = invoiceData.invoice;
      const { name: companyName } = invoiceData.yourCompany;
      const { name: billToName } = invoiceData.billTo;
      const timestamp = new Date().getTime();

      let fileName;
      switch (templateNumber) {
        case 1:
          fileName = `${number}.pdf`;
          break;
        case 2:
          fileName = `${companyName}_${number}.pdf`;
          break;
        case 3:
          fileName = `${companyName}.pdf`;
          break;
        case 4:
          fileName = `${date}.pdf`;
          break;
        case 5:
          fileName = `${number}-${date}.pdf`;
          break;
        case 6:
          fileName = `invoice_${timestamp}.pdf`;
          break;
        case 7:
          fileName = `Invoice_${number}.pdf`;
          break;
        case 8:
          fileName = `Invoice_${billToName}.pdf`;
          break;
        case 9:
          fileName = `IN-${date}.pdf`;
          break;
        default:
          fileName = `invoice_template_${templateNumber}.pdf`;
      }

      pdf.save(fileName);
      
      document.body.removeChild(invoice);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
