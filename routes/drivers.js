const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Rotas para motoristas
router.post('/motoristas', driverController.addDriver);
router.get('/motoristas', driverController.getDrivers);
router.get('/motoristas/:id', driverController.searchDriver);
router.put('/motoristas/:id', driverController.updateDriver);
router.delete('/motoristas/:id', driverController.deleteDriver);

module.exports = router;
