const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/post', require('./routes/post'));

const PORT = process.env.PORT || 1500;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
