const db = require('./db');

// Get pending orders
const getPendingOrders = async () => {
    const [rows] = await db.query("SELECT * FROM pending_orders");
    return rows;
};

// Get completed orders
const getCompletedOrders = async () => {
    const [rows] = await db.query("SELECT * FROM completed_orders");
    return rows;
};

// Add a new order
const addOrder = async (buyerQty, buyerPrice, sellerQty, sellerPrice) => {
    await db.query(
        "INSERT INTO pending_orders (buyer_qty, buyer_price, seller_price, seller_qty) VALUES (?, ?, ?, ?)",
        [buyerQty, buyerPrice, sellerPrice, sellerQty]
    );
};

const matchOrders = async (buyerPrice) => {
    await db.query("START TRANSACTION");
    const [matchingOrders] = await db.query(
        "SELECT * FROM pending_orders WHERE seller_price <= ? ORDER BY seller_price ASC", [buyerPrice]
    );

    for (const order of matchingOrders) {
        const matchedQty = Math.min(order.buyer_qty, order.seller_qty);

        await db.query("INSERT INTO completed_orders (price, qty) VALUES (?, ?)", [order.seller_price, matchedQty]);
        if (order.seller_qty > matchedQty) {
            await db.query("UPDATE pending_orders SET seller_qty = seller_qty - ? WHERE id = ?", [matchedQty, order.id]);
        } else {
            await db.query("DELETE FROM pending_orders WHERE id = ?", [order.id]);
        }
    }

    await db.query("COMMIT");
};

module.exports = { getPendingOrders, getCompletedOrders, addOrder, matchOrders };
