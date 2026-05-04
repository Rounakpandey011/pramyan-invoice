import { forwardRef } from 'react';
import { formatCurrency, formatDate } from '../utils/format';
import logo from "../assets/logo.jpeg";
import logo from "../assets/logo.jpeg";

const InvoiceTemplate = forwardRef(({ invoice }, ref) => {
  if (!invoice) return null;

  const {
    invoiceNumber,
    invoiceDate,
    studentName,
    className,
    parentName,
    phone,
    address,
    amount,
  } = invoice;

  return (
    <div
      ref={ref}
      className="bg-white mx-auto"
      style={{
        width: "794px",
        minHeight: "1123px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#1f2937",
      }}>
      {/* Teal header */}
      <div style={{ backgroundColor: "#0f7c75" }} className="px-12 py-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className=" rounded-xl  flex items-center justify-center shadow-soft">
              <img src={logo} alt="Pramyan" className="w-15 h-12" />
            </div>
          </div>

          <div className="text-right">
            <h2
              className="text-white text-5xl font-light tracking-[0.15em] leading-none"
              style={{ fontFamily: "Fraunces, serif" }}>
              INVOICE
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-white text-xs">
              <span className="font-bold tracking-widest text-right">
                INVOICE #
              </span>
              <span className="text-left font-mono">{invoiceNumber}</span>
              <span className="font-bold tracking-widest text-right">DATE</span>
              <span className="text-left font-mono">
                {formatDate(invoiceDate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Orange divider */}
      <div style={{ backgroundColor: "#f5a524" }} className="h-1.5" />

      {/* Body */}
      <div className="px-12 py-10">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-pramyan-700 mb-3">
              BILL TO
            </p>
            <p className="font-bold text-lg text-slate-900">{studentName}</p>
            <p className="text-sm text-slate-600 mt-2">{className}</p>
            {parentName && (
              <p className="text-sm text-slate-600 mt-1">
                Parent: {parentName}
              </p>
            )}
            {phone && <p className="text-sm text-slate-600 mt-1">{phone}</p>}
            {address && (
              <p className="text-sm text-slate-600 mt-1">{address}</p>
            )}
          </div>

          <div className="text-right">
            <p className="text-xs font-bold tracking-[0.2em] text-pramyan-700 mb-3">
              PAY TO
            </p>
            <p className="font-bold text-lg text-slate-900">Pramyan Edutech</p>
            <p className="text-sm text-slate-600 mt-2">
              Bhutani Alphathum, Sector 90 Noida - 201305, India
            </p>
            <p className="text-sm text-slate-600 mt-3">hr@pramyan.com</p>
          </div>
        </div>

        {/* Items */}
        <div className="mt-12">
          <div
            className="grid items-center px-2 py-3 border-b border-slate-200 text-xs font-bold tracking-[0.2em] text-pramyan-700"
            style={{ gridTemplateColumns: "1fr 100px 80px 140px" }}>
            <span>DESCRIPTION</span>
            <span className="text-right">RATE</span>
            <span className="text-right">QTY</span>
            <span className="text-right">AMOUNT</span>
          </div>
          <div
            className="grid items-center px-2 py-4 border-b border-slate-100"
            style={{ gridTemplateColumns: "1fr 100px 80px 140px" }}>
            <span className="font-bold text-slate-800">
              Personalized Tuition Fee
            </span>
            <span className="text-right text-slate-700">{amount}</span>
            <span className="text-right text-slate-700">1</span>
            <span className="text-right font-bold text-slate-900">
              {formatCurrency(amount)}
            </span>
          </div>
        </div>

        <div style={{ minHeight: "180px" }} />

        {/* Footer block */}
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-slate-400 mb-4">
              NOTES &amp; INSTRUCTIONS
            </p>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Thank you for choosing Pramyan. Please make the payment at your
              earliest.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-600">Subtotal</span>
              <span className="font-semibold text-slate-800">
                {formatCurrency(amount)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-600">
                Tax <span className="ml-2 font-mono text-xs underline">0</span>{" "}
                %
              </span>
              <span className="font-semibold text-slate-800">₹ 0.00</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-600">Discount</span>
              <span className="font-semibold text-slate-800">- ₹ 0</span>
            </div>
            <div className="border-t border-slate-300 pt-4 mt-2 flex justify-between items-center">
              <span className="text-sm font-bold tracking-[0.2em] text-slate-700">
                TOTAL
              </span>
              <span
                className="text-3xl font-extrabold"
                style={{ color: "#0f7c75" }}>
                {formatCurrency(amount)}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-16 pt-4 flex justify-between text-[10px] tracking-[0.2em] text-slate-400 font-semibold">
          <span>PRAMYAN EDUTECH</span>
          <span>GENERATED VIA PRAMYAN TOOLS</span>
        </div>
      </div>
    </div>
  );
});

InvoiceTemplate.displayName = 'InvoiceTemplate';
export default InvoiceTemplate;
