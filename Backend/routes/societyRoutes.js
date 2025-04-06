const express = require('express');
const router = express.Router();
const societyController = require('../controllers/societyController');

router.get('/', societyController.getSocietiesByStatus);         
router.get('/:id', societyController.getSocietyById);          
router.put('/:id/status', societyController.updateSocietyStatus); 

module.exports = router;
