import React, { useState } from 'react';

const OrderForm = ({ onNewOrder }) => {
  const [buyerQty, setBuyerQty] = useState(0);
  const [buyerPrice, setBuyerPrice] = useState(0);
  const [sellerQty, setSellerQty] = useState(0);
  const [sellerPrice, setSellerPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewOrder({ buyerQty, buyerPrice, sellerQty, sellerPrice });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Buyer Qty" onChange={e => setBuyerQty(e.target.value)} />
      <input type="number" placeholder="Buyer Price" onChange={e => setBuyerPrice(e.target.value)} />
      <input type="number" placeholder="Seller Qty" onChange={e => setSellerQty(e.target.value)} />
      <input type="number" placeholder="Seller Price" onChange={e => setSellerPrice(e.target.value)} />
      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;
