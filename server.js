const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: 'rzp_live_8Ft56TrnMR2sAa',
  key_secret: 'g8YJla8t9gupFMrQaUkRWVB0',
});

app.post('/createOrder', async (req, res) => {
  const { amount, currency, receipt } = req.body;
  console.log('Received request:', req.body);
  try {
    const order = await razorpay.orders.create({ amount, currency, receipt });
    console.log('Order created:', order);
    res.json({ orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
