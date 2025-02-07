const express = require('express');
const router = express.Router();
const manutencoesController = require('../controllers/maintenanceController');

router.post('/manutencoes', manutencoesController.addMaintenance);
router.get('/manutencoes', manutencoesController.getMaintenance);
router.get('/manutencoes/:id', manutencoesController.searchMaintenance);
router.put('/manutencoes/:id', manutencoesController.updateMaintenance);
router.delete('/manutencoes/:id', manutencoesController.deleteMaintenance);

module.exports = router;
