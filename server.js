require('dotenv').config();
const express = require('express');
const pool = require('./db');
const driverRoute = require('./routes/drivers');
const ridesRoute = require('./routes/rides');
const fuelRoute = require('./routes/fuel');
const travelRoute = require('./routes/travel');
const MaintenanceRoute = require('./routes/maintenance');
const ticketRoute = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(driverRoute);
app.use(ridesRoute);
app.use(fuelRoute);
app.use(travelRoute);
app.use(MaintenanceRoute);
app.use(ticketRoute);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
