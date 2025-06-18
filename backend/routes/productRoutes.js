import express from 'express';
import multer from 'multer';
import Product from '../models/Product.js';
import User from '../models/User.js';

const router = express.Router();

// Setup multer for product image
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/products'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, price, quantity, farmerId } = req.body;

    const farmer = await User.findById(farmerId);
    if (!farmer || farmer.role !== 'farmer') {
      return res.status(403).json({ msg: 'Invalid farmer ID' });
    }

    const product = new Product({
      name,
      price,
      quantity,
      image: req.file ? req.file.path : '',
      farmer: farmerId
    });

    await product.save();
    res.json({ message: 'Product added', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const products = await Product.find().populate('farmer', 'name phone');
  res.json(products);
});

export default router;
