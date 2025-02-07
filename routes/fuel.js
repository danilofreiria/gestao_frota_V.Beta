const express = require('express');
const router = express.Router();
const abastecimentosController = require('../controllers/fuelController');

router.post('/abastecimentos', abastecimentosController.addFillup);
router.get('/abastecimentos', abastecimentosController.getFillups);
router.get('/abastecimentos/:id', abastecimentosController.searchfillup);
router.put('/abastecimentos/:id', abastecimentosController.updateFillups);
router.delete('/abastecimentos/:id', abastecimentosController.deleteFillup);

module.exports = router;
