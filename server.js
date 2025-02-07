require('dotenv').config();
const express = require('express');
const pool = require('./db');
const driverRoute = require('./routes/drivers');
const ridesRoute = require('./routes/rides');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(driverRoute);
app.use(ridesRoute);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
