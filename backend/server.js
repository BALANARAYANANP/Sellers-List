const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedSellers(); 
  })
  .catch((err) => console.error('Database connection error:', err));

// Seller Schema
const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});

const Seller = mongoose.model('Seller', sellerSchema);

// Routes

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Get All Sellers
app.get('/api/sellers', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sellers', error });
  }
});

// Add a New Seller
app.post('/api/sellers', async (req, res) => {
  const { name, rating, review } = req.body;

  if (!name || !rating || !review) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newSeller = new Seller({ name, rating, review });
    const savedSeller = await newSeller.save();
    res.status(201).json(savedSeller);
  } catch (error) {
    res.status(500).json({ message: 'Error saving seller', error });
  }
});

// Delete a Seller
app.delete('/api/sellers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSeller = await Seller.findByIdAndDelete(id);

    if (!deletedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.json({ message: 'Seller deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting seller', error });
  }
});

// Update a Seller
app.put('/api/sellers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, rating, review } = req.body;

  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      id,
      { name, rating, review },
      { new: true, runValidators: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.json(updatedSeller);
  } catch (error) {
    res.status(500).json({ message: 'Error updating seller', error });
  }
});
const seedSellers = async () => {
  try {
    const count = await Seller.countDocuments();
    if (count === 0) {
      const demoSellers = [
        { name: 'John Doe', rating: 4.5, review: 'Excellent service and fast delivery!' },
        { name: 'Jane Smith', rating: 4.0, review: 'Great products, highly recommend.' },
        { name: 'Alice Johnson', rating: 5.0, review: 'Amazing experience, top-notch quality.' },
        { name: 'Bob Brown', rating: 3.8, review: 'Good seller but could improve packaging.' },
        { name: 'Charlie Lee', rating: 4.7, review: 'Outstanding customer support and great value.' },
      ];
      await Seller.insertMany(demoSellers);
      console.log('Demo sellers added to the database');
    } else {
      console.log('Sellers already exist in the database');
    }
  } catch (error) {
    console.error('Error seeding demo sellers:', error);
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
