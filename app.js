const express = require('express');
const { rezervasyonRoutes } = require('./routes');

const PORT = 8000;
const app = express();
app.use('/rezervasyon', rezervasyonRoutes);
app.listen(PORT);
