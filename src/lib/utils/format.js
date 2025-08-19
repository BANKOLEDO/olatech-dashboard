export const toCurrency = (n) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(n);

export const monthLabel = (m) =>
  new Date(2000, m, 1).toLocaleString(undefined, { month: "short" });
