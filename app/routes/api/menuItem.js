const express = require('express');
const router = express.Router({mergeParams: true});

let MenuItem = require('./../../models/menu');

router.route('/add').post(function (req, res) {
    let menuItem = new MenuItem(req.body);
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

// Defined edit route
router.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    MenuItem.findById(id, function (err, MenuItem) {
        res.json(MenuItem);
    });
});

//  Defined update route
router.route('/update/:id').post(function (req, res) {
    MenuItem.findById(req.params.id, function (err, MenuItem) {
        if (!MenuItem)
            res.status(404).send("data is not found");
        else {
            MenuItem.title = req.body.title;
            MenuItem.description = req.body.description;
            MenuItem.organization = req.body.organization;
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