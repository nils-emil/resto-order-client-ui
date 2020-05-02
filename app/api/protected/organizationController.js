const express = require('express');
const router = express.Router({mergeParams: true});

const Organization = require('../../models/organization').Organization

router.route('/add').post(function (req, res) {
    let organization = new Organization(req.body);
    organization.save()
        .then(e => {
            res.status(200).json(e);
        })
});


module.exports = router;
