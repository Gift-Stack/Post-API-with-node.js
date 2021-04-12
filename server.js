const express = require('express');
const app = express();

app.get('/', (req, res) => res.json({ msg: 'Hola' }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/post', require('./routes/post'));

const PORT = process.env.PORT || 1500;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
