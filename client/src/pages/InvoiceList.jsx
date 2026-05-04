import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FileText, Plus, Eye } from 'lucide-react';
import { invoiceAPI } from '../utils/api';
import { formatCurrency, formatDateLong } from '../utils/format';

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    invoiceAPI
      .getAll()
      .then((res) => setInvoices(res.data))
      .catch(() => toast.error('Failed to load invoices'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm font-semibold text-pramyan-700 tracking-widest uppercase">
            All Invoices
          </p>
          <h1 className="font-display text-4xl font-bold text-slate-900 mt-1">
            Invoice History
          </h1>
          <p className="text-slate-500 mt-2">Sorted by date — newest first.</p>
        </div>
        <Link to="/" className="btn-primary">
          <Plus size={18} /> New Invoice
        </Link>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-lg bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <FileText className="mx-auto mb-3 text-slate-300" size={48} />
            <p className="font-semibold">No invoices yet</p>
            <p className="text-sm mt-1">Create your first invoice to get started.</p>
            <Link to="/" className="btn-primary mt-4 inline-flex">
              <Plus size={16} /> New Invoice
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-xs font-bold tracking-widest text-slate-500 uppercase">
                  <th className="text-left px-6 py-3">Invoice #</th>
                  <th className="text-left px-6 py-3">Student</th>
                  <th className="text-left px-6 py-3 hidden sm:table-cell">Class</th>
                  <th className="text-left px-6 py-3">Date</th>
                  <th className="text-right px-6 py-3">Amount</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv, i) => (
                  <motion.tr
                    key={inv._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-pramyan-50/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-sm text-pramyan-700 font-semibold">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{inv.studentName}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 hidden sm:table-cell">
                      {inv.className}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDateLong(inv.invoiceDate)}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                      {formatCurrency(inv.amount)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/invoice/${inv._id}`}
                        className="inline-flex items-center gap-1 text-pramyan-700 font-semibold text-sm hover:text-pramyan-900"
                      >
                        <Eye size={14} /> View
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
