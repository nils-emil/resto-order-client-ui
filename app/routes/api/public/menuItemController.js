const express = require('express');
const MenuItem = require('../../../models/menu').MenuItem
const router = express.Router({ mergeParams: true });

router.route('/:organization').get(function (req, res) {
  MenuItem.find({ 'organization': req.params.organization })
    .exec()
    .then(menuItems => res.json(menuItems))
})

router.route('/edit/:id').get(function (req, res) {
  let id = req.params.id
  MenuItem.findById(id, function (err, MenuItem) {
    res.json(MenuItem)
  })
});

router.route('/').get(function (req, res) {
  MenuItem.find(req.query, (err, MenuItems) => {
    if (err) {
      console.log(err);
    } else {
      res.json(MenuItems);
    }
  });
});

module.exports = router;
