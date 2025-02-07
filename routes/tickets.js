const express = require('express');
const router = express.Router();
const multasController = require('../controllers/ticketsController');

router.post('/multas', multasController.addTicket);
router.get('/multas', multasController.getTickets);
router.get('/multas/:id', multasController.searchTickets);
router.put('/multas/:id', multasController.updateTicket);
router.delete('/multas/:id', multasController.deleteTicket);

module.exports = router;
