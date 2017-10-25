var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('post_detail', {_id:req.query.id});
});


module.exports = router;
