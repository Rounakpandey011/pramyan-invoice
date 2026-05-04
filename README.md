# Pramyan Edutech — Invoice Generator

A simple MERN app for Pramyan teachers to:
1. **Generate invoices** for students (auto Pramyan-branded PDF)
2. **Send the PDF to parents** via WhatsApp or Email
3. **View all generated invoices**, sorted by date (newest first)

That's it. Nothing extra.

---

## 🛠 Tech

- **Frontend**: React + Vite + Tailwind + Framer Motion
- **Backend**: Node + Express
- **Database**: MongoDB
- **PDF**: html2canvas + jsPDF (browser-side, fast)

---

## 📂 Folder Structure

```
pramyan-invoice/
├── client/         # React frontend
│   ├── public/logo.svg     ← replace with real Pramyan logo
│   └── src/
│       ├── components/
│       │   ├── Layout.jsx
│       │   └── InvoiceTemplate.jsx   ← exact replica of the PDF
│       ├── pages/
│       │   ├── CreateInvoice.jsx     ← the form
│       │   ├── InvoiceList.jsx       ← all invoices, sorted by date
│       │   └── InvoiceView.jsx       ← preview + download + send
│       └── utils/
│           ├── api.js
│           ├── format.js
│           └── pdf.js                ← PDF + WhatsApp + email helpers
│
└── server/         # Express backend
    ├── models/Invoice.js
    ├── routes/invoiceRoutes.js
    └── server.js
```

---

## 🚀 How to Run Locally

### 1. Install Node.js & MongoDB

- Node.js 18+ → https://nodejs.org
- MongoDB → either install locally OR use free MongoDB Atlas → https://www.mongodb.com/atlas

### 2. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 3. Configure environment

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/pramyan_invoices
```

(If using Atlas, use the Atlas connection string instead.)

### 4. Run both apps

Open **two terminals**:

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📝 How a Teacher Uses It

1. Open the app — landing page is the **New Invoice** form.
2. Fill in: student name, class, parent name, phone, address, amount.
3. Click **Generate Invoice** → opens the invoice preview.
4. Click **Download PDF** → saves the file to the computer.
5. Click **WhatsApp** or **Email** → opens a pre-filled message; teacher just attaches the downloaded PDF and hits send.
6. Click **All Invoices** in the top nav to see the history (sorted by date, newest first). Click any row to view/re-download.

---

## 🖼 Replacing the Logo

The placeholder logo is at `client/public/logo.svg`. Replace it with the actual Pramyan logo (same filename, or update the references in `Layout.jsx` and `InvoiceTemplate.jsx`).

Send me the logo file and I'll swap it in.

---

## 🌐 Sending This to Pramyan

Easiest path:

1. **Zip the project** (without `node_modules`).
2. **Email it** to the Pramyan team with this README.
3. They follow the "How to Run Locally" steps above.

If you want a live link they can just open in a browser, deploy:
- **Frontend** → Vercel (free) — connect GitHub repo, point root to `client/`
- **Backend** → Render (free) — connect GitHub repo, point root to `server/`
- **Database** → MongoDB Atlas (free)

Tell me if you want help deploying — I'll walk you through it.

---

## 🧪 API (For Reference)

| Method | Endpoint | What it does |
|--------|----------|--------------|
| GET | `/api/invoices` | List all (sorted by date, newest first) |
| GET | `/api/invoices/:id` | Get one invoice |
| POST | `/api/invoices` | Create invoice |
| GET | `/api/invoices/next-number` | Get next invoice # for the form |
