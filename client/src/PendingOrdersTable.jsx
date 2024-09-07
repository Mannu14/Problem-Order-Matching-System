import React from 'react';

const PendingOrdersTable = ({ orders }) => (
  <table>
    <thead>
      <tr>
        <th>Buyer Qty</th>
        <th>Buyer Price</th>
        <th>Seller Price</th>
        <th>Seller Qty</th>
      </tr>
    </thead>
    <tbody>
      {orders.map(order => (
        <tr key={order.id}>
          <td>{order.buyer_qty}</td>
          <td>{order.buyer_price}</td>
          <td>{order.seller_price}</td>
          <td>{order.seller_qty}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PendingOrdersTable;
