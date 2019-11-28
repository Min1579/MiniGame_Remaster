const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
      res.render('desertwar/main');
});

module.exports = router;