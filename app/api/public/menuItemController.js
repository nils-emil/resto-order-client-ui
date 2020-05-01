const express = require('express');
const MenuItem = require('../../models/menuItem').MenuItem
const router = express.Router({ mergeParams: true });

router.route('/:organizationId').get(function (req, res) {
  MenuItem.find({ ...req.query, 'organizationId': req.params.organizationId })
    .exec()
    .then(menuItems => {
      res.json(menuItems)
    })
})

router.route('/edit/:id').get(function (req, res) {
  let id = req.params.id
  MenuItem.findById(id, function (err, MenuItem) {
    res.json(MenuItem)
  })
});

module.exports = router;
