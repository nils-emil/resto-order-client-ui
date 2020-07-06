const express = require('express');
const router = express.Router({mergeParams: true});

const Table = require('../../models/table').Table

router.route('/add').post(function (req, res) {
    let table = new Table(req.body);
    table.save()
      .then(e => {
          res.status(200).json(e)
      })
});

router.route('/:tableCode').get(function (req, res) {
    let code = req.params.tableCode;
    Table.findOne({code: code}, function (err, MenuItem) {
        res.json(MenuItem);
    });
});

module.exports = router;
