const express = require('express');
const bodyParser = require('body-parser');
const { matchOrders, getPendingOrders, getCompletedOrders, addOrder } = require('./orderController');
const app = express();
app.use(bodyParser.json());

const PORT = 5000;

// Routes
app.get('/api/pending-orders', async (req, res) => {
    const orders = await getPendingOrders();
    res.json(orders);
});

app.get('/api/completed-orders', async (req, res) => {
    const orders = await getCompletedOrders();
    res.json(orders);
});

app.post('/api/add-order', async (req, res) => {
    const { buyerQty, buyerPrice, sellerQty, sellerPrice } = req.body;
    await addOrder(buyerQty, buyerPrice, sellerQty, sellerPrice);
    await matchOrders(buyerPrice);
    res.json({ message: 'Order processed!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
