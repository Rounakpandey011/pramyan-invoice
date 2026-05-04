import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generateInvoicePDF(element, fileName = 'invoice.pdf') {
  if (!element) throw new Error('Element required');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
  pdf.save(fileName);
}

export function buildWhatsAppLink(phone, invoice) {
  const sanitized = (phone || '').replace(/[^\d]/g, '');
  const msg =
    `Hello ${invoice?.parentName || ''},%0A%0A` +
    `Please find the invoice for ${invoice?.studentName || 'your child'}.%0A` +
    `Invoice #: ${invoice?.invoiceNumber}%0A` +
    `Amount: INR ${invoice?.amount}%0A%0A` +
    `Thank you,%0APramyan Edutech`;
  return `https://wa.me/${sanitized}?text=${msg}`;
}

export function buildMailtoLink(invoice) {
  const subject = encodeURIComponent(`Invoice ${invoice?.invoiceNumber} — Pramyan Edutech`);
  const body = encodeURIComponent(
    `Dear ${invoice?.parentName || 'Parent'},\n\n` +
      `Please find the invoice for ${invoice?.studentName}.\n` +
      `Invoice Number: ${invoice?.invoiceNumber}\n` +
      `Total: INR ${invoice?.amount}\n\n` +
      `Thank you for choosing Pramyan.\n\nRegards,\nPramyan Edutech`
  );
  return `mailto:?subject=${subject}&body=${body}`;
}
