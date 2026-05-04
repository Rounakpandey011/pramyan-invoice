export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount || 0);

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-CA'); // YYYY-MM-DD
};

export const formatDateLong = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
