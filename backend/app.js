const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); 

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

const transaksiRoutes = require('./routes/transaksiRoutes');
app.use('/api', transaksiRoutes);

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
    
});