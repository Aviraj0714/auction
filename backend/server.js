const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.SECRET_KEY;

// 🔹 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 🔹 Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'auction-items', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage });

// 🔹 User Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// 🔹 Auction Schema & Model
const auctionItemSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  currentBid: Number,
  highestBidder: String,
  closingTime: Date,
  isClosed: { type: Boolean, default: false },
  imageUrl: String,
});
const AuctionItem = mongoose.model('AuctionItem', auctionItemSchema);

// 🔹 Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
};

// 🔹 Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 🔹 Signin Route
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id, username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Signin successful', token });
});

// 🔹 Create Auction (Protected)
app.post('/auction', authenticate, upload.single('image'), async (req, res) => {
  try {
    console.log("🔹 Received Auction Data:", req.body);
    console.log("🔹 Received File:", req.file);

    const { itemName, description, startingBid, closingTime } = req.body;
    if (!itemName || !description || !startingBid || !closingTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const imageUrl = req.file?.path || '';

    const newItem = new AuctionItem({
      itemName,
      description,
      currentBid: Number(startingBid),
      highestBidder: '',
      closingTime,
      imageUrl
    });

    await newItem.save();
    res.status(201).json({ message: 'Auction item created', item: newItem });
  } catch (error) {
    console.error('Auction Post Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 🔹 Get all auction items
app.get('/auctions', async (req, res) => {
  try {
    const auctions = await AuctionItem.find();
    res.json(auctions);
  } catch (error) {
    console.error('Fetching Auctions Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 🔹 Get single auction item
app.get('/auctions/:id', async (req, res) => {
  try {
    const auctionItem = await AuctionItem.findById(req.params.id);
    if (!auctionItem) return res.status(404).json({ message: 'Auction not found' });

    res.json(auctionItem);
  } catch (error) {
    console.error('Fetching Auction Item Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 🔹 Place Bid (Protected)
app.post('/bid/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { bid } = req.body;
    const item = await AuctionItem.findById(id);

    if (!item) return res.status(404).json({ message: 'Auction item not found' });
    if (item.isClosed) return res.status(400).json({ message: 'Auction is closed' });

    if (new Date() > new Date(item.closingTime)) {
      item.isClosed = true;
      await item.save();
      return res.json({ message: 'Auction closed', winner: item.highestBidder });
    }

    if (bid > item.currentBid) {
      item.currentBid = bid;
      item.highestBidder = req.user.username;
      await item.save();
      res.json({ message: 'Bid successful', item });
    } else {
      res.status(400).json({ message: 'Bid too low' });
    }
  } catch (error) {
    console.error('Bidding Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 🔹 Auto-close expired auctions
setInterval(async () => {
  const now = new Date();
  const expiredAuctions = await AuctionItem.find({ closingTime: { $lte: now }, isClosed: false });

  for (const auction of expiredAuctions) {
    auction.isClosed = true;
    await auction.save();
  }
  console.log(`🔹 Closed ${expiredAuctions.length} expired auctions.`);
}, 60 * 1000);

// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
