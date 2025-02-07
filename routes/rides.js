const express = require('express');
const router = express.Router();
const veiculosController = require('../controllers/ridesController');

router.post('/veiculos', veiculosController.addRide);
router.get('/veiculos', veiculosController.getRides);
router.get('/veiculos/:id', veiculosController.searchRide);
router.put('/veiculos/:id', veiculosController.updateRide);
router.delete('/veiculos/:id', veiculosController.deleteRide);

module.exports = router;
