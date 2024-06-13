const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Set JWT_SECRET as an environment variable
process.env.JWT_SECRET = 'skindiseaseapp123';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Logging middleware
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/reports', express.static(path.join(__dirname, 'reports')));

// DB Config
const db = 'mongodb://localhost:27017/skin-disease-app';

// Connect to MongoDB with updated options
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected at', db))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/predictions', require('./routes/api/predictions'));
app.use('/api/blogs', require('./routes/api/blogs'));
app.use('/api/contact', require('./routes/api/contact'));
app.use('/api/chatbot', require('./routes/api/chatbot'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Logging middleware for unhandled errors
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).send('Internal Server Error');
});

// Log incoming requests
app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.originalUrl);
  next();
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));