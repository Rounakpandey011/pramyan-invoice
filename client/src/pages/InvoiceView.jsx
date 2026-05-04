import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Download, MessageCircle, Mail } from 'lucide-react';
import { invoiceAPI } from '../utils/api';
import { generateInvoicePDF, buildWhatsAppLink, buildMailtoLink } from '../utils/pdf';
import InvoiceTemplate from '../components/InvoiceTemplate';

export default function InvoiceView() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const printRef = useRef(null);

  useEffect(() => {
    invoiceAPI
      .getById(id)
      .then((res) => setInvoice(res.data))
      .catch(() => toast.error('Failed to load invoice'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDownload = async () => {
    if (!printRef.current) return;
    setGenerating(true);
    try {
      await generateInvoicePDF(printRef.current, `${invoice.invoiceNumber}.pdf`);
      toast.success('PDF downloaded');
    } catch {
      toast.error('Failed to generate PDF');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-500">Loading...</div>;
  }

  if (!invoice) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Invoice not found</p>
        <Link to="/invoices" className="btn-secondary mt-4 inline-flex">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>
    );
  }

  const whatsappLink = buildWhatsAppLink(invoice.phone, invoice);
  const mailtoLink = buildMailtoLink(invoice);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/invoices" className="btn-secondary">
          <ArrowLeft size={16} /> Back to All Invoices
        </Link>
        <div className="flex flex-wrap gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            title="Send via WhatsApp"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
          <a href={mailtoLink} className="btn-secondary" title="Send via Email">
            <Mail size={16} /> Email
          </a>
          <button onClick={handleDownload} disabled={generating} className="btn-primary">
            <Download size={16} /> {generating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div className="text-sm text-slate-600">
        <span className="font-mono font-semibold text-pramyan-700">{invoice.invoiceNumber}</span>
        <span className="mx-2">·</span>
        <span>Tip: Download the PDF, then attach it in your WhatsApp/Email message.</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4 sm:p-6 overflow-auto"
      >
        <div className="mx-auto" style={{ maxWidth: '794px' }}>
          <InvoiceTemplate ref={printRef} invoice={invoice} />
        </div>
      </motion.div>
    </div>
  );
}
