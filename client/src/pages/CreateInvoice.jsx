import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Save, Sparkles } from 'lucide-react';
import { invoiceAPI } from '../utils/api';

export default function CreateInvoice() {
  const [form, setForm] = useState({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().slice(0, 10),
    studentName: '',
    className: '',
    parentName: '',
    phone: '',
    address: '',
    amount: 4000,
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    invoiceAPI
      .nextNumber()
      .then((res) => setForm((f) => ({ ...f, invoiceNumber: res.data.invoiceNumber })))
      .catch(() =>
        setForm((f) => ({ ...f, invoiceNumber: `PRM-${new Date().getFullYear()}-001` }))
      );
  }, []);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    if (!form.studentName || !form.className || !form.amount) {
      toast.error('Please fill student name, class, and amount');
      return;
    }
    setSaving(true);
    try {
      const { data } = await invoiceAPI.create({ ...form, amount: Number(form.amount) });
      toast.success('Invoice created!');
      navigate(`/invoice/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-pramyan-700 tracking-widest uppercase">
          New Invoice
        </p>
        <h1 className="font-display text-4xl font-bold text-slate-900 mt-1">
          Generate Invoice
        </h1>
        <p className="text-slate-500 mt-2">
          Fill in the details below and we'll generate a Pramyan-branded invoice.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 sm:p-8 space-y-6"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Invoice #</label>
            <input
              className="input font-mono"
              value={form.invoiceNumber}
              onChange={(e) => update('invoiceNumber', e.target.value)}
            />
          </div>
          <div>
            <label className="label">Date</label>
            <input
              type="date"
              className="input"
              value={form.invoiceDate}
              onChange={(e) => update('invoiceDate', e.target.value)}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Student Name *</label>
            <input
              className="input"
              placeholder="Name"
              value={form.studentName}
              onChange={(e) => update('studentName', e.target.value)}
            />
          </div>
          <div>
            <label className="label">Class & Subjects *</label>
            <input
              className="input"
              placeholder="e.g. Class  - Math, Science, SST"
              value={form.className}
              onChange={(e) => update('className', e.target.value)}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Parent Name</label>
            <input
              className="input"
              placeholder="Name"
              value={form.parentName}
              onChange={(e) => update('parentName', e.target.value)}
            />
          </div>
          <div>
            <label className="label">Phone</label>
            <input
              className="input"
              placeholder="+91 XXXXXXXXXX"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">Address</label>
          <input
            className="input"
            placeholder="Adress"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
          />
        </div>

        <div>
          <label className="label">Amount (₹) *</label>
          <input
            type="number"
            className="input"
            value={form.amount}
            onChange={(e) => update('amount', e.target.value)}
          />
        </div>

        {/* Live preview total */}
        <div className="bg-gradient-to-br from-pramyan-700 to-pramyan-900 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 text-pramyan-100 text-xs font-semibold tracking-widest uppercase">
            <Sparkles size={14} /> Total Amount
          </div>
          <p className="font-display font-bold text-4xl mt-2">
            ₹ {Number(form.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <button onClick={handleSubmit} disabled={saving} className="btn-primary w-full">
          <Save size={18} /> {saving ? 'Generating...' : 'Generate Invoice'}
        </button>
      </motion.div>
    </div>
  );
}
