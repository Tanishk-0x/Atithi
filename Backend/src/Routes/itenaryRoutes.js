const express = require('express') ; 
const router = express.Router() ; 
const GenerateItenary = require('../Controllers/itenaryController'); 


router.post('/generate' , GenerateItenary) ; 


module.exports = router ; 


