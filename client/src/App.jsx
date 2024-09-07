import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from './OrderForm';
import PendingOrdersTable from './PendingOrdersTable';
import CompletedOrdersTable from './CompletedOrdersTable';

const App = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const pendingRes = await axios.get('/api/pending-orders');
    setPendingOrders(pendingRes.data);

    const completedRes = await axios.get('/api/completed-orders');
    setCompletedOrders(completedRes.data);
  };

  const handleNewOrder = async (newOrder) => {
    await axios.post('/api/add-order', newOrder);
    fetchOrders();
  };

  return (
    <div className="App">
      <h1>Order Matching System</h1>
      <OrderForm onNewOrder={handleNewOrder} />
      <h2>Pending Orders</h2>
      <PendingOrdersTable orders={pendingOrders} />
      <h2>Completed Orders</h2>
      <CompletedOrdersTable orders={completedOrders} />
    </div>
  );
};

export default App;
