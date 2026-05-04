import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CreateInvoice from './pages/CreateInvoice';
import InvoiceList from './pages/InvoiceList';
import InvoiceView from './pages/InvoiceView';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CreateInvoice />} />
        <Route path="invoices" element={<InvoiceList />} />
        <Route path="invoice/:id" element={<InvoiceView />} />
      </Route>
    </Routes>
  );
}
