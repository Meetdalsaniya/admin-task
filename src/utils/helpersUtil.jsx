export const calculateTotal = (items) => {
  return items.reduce((acc, item) => {
    const itemTotal = item.quantity * item.price * (1 + item.margin / 100);
    return acc + itemTotal;
  }, 0);
};
