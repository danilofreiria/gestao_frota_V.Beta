const express = require('express');
const router = express.Router();
const viagensController = require('../controllers/travelsController');

router.post('/viagens', viagensController.addTravel);
router.get('/viagens', viagensController.getTravels);
router.get('/viagens/:id', viagensController.searchTravel);
router.put('/viagens/:id', viagensController.updateTravel);
router.delete('/viagens/:id', viagensController.deleteTravel);

module.exports = router;
