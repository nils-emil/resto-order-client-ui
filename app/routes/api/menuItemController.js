const express = require('express');
const MenuItem = require('./../../models/menu').MenuItem;
const router = express.Router({mergeParams: true});

router.route('/add').post(function (req, res) {
    const menuItem = new MenuItem(req.body);
    menuItem.save()
        .then(e => {
            res.status(200).json(e);
        })
        .catch(() => {
            res.status(400).send("Unable to save to database");
        });
});

router.route('/').get(function (req, res) {
    MenuItem.find((err, MenuItems) => {
        if (err) {
            console.log(err);
        } else {
            res.json(MenuItems);
        }
    });
});

router.route('/:organization').get(function (req, res) {
    MenuItem.find({"organization": req.params.organization})
        .exec()
        .then(menuItems => res.json(menuItems));
});

router.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    MenuItem.findById(id, function (err, MenuItem) {
        res.json(MenuItem);
    });
});

router.route('/update/:id').post(function (req, res) {
    MenuItem.findById(req.params.id, function (err, MenuItem) {
        if (!MenuItem)
            res.status(404).send("data is not found");
        else {
            MenuItem.title = req.body.title;
            MenuItem.description = req.body.description;
            MenuItem.organization = req.body.organization;
            MenuItem.category = req.body.category;
            MenuItem.price = req.body.price;
            MenuItem.image = req.body.image;
            MenuItem.save().then(() => {
                res.json('Update complete');
            })
                .catch(() => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

router.route('/delete/:id').get(function (req, res) {
    MenuItem.findByIdAndRemove({_id: req.params.id}, function (err, MenuItem) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = router;
