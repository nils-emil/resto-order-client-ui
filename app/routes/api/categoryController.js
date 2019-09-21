
const express = require('express');
const router = express.Router({mergeParams: true});

const Category = require('./../../models/category').Category;
const MenuItem = require('./../../models/menu').MenuItem;

router.route('/add').post(function (req, res) {
    let category = new Category(req.body);
    category.save()
        .then(e => {
            res.status(200).json(e);
        })
});

router.route('/').get(function (req, res) {
    Category.find((err, Categories) => {
        if (err) {
            console.log(err);
        } else {
            res.json(Categories);
        }
    });
});

router.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Category.findById(id, (err, categories) => {
        res.json(categories);
    });
});

router.route('/update/:id').post(function (req, res) {
    Category.findById(req.params.id, (err, category) => {
        if (!category)
            res.status(404).send("data is not found");
        else {
            category.name = req.body.name;
            category.order = req.body.order;
            category.save().then(() => {
                res.json('Update complete');
            })
                .catch(() => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

router.route('/delete/:id').delete(function (req, res) {
    console.log(req.params.id)
    Category.remove({_id: req.params.id}, () => {
        MenuItem.update({category: req.params.id}, {category: null}, {multi: true},() => {
            res.status(204).send();
        });
    });
});

module.exports = router;