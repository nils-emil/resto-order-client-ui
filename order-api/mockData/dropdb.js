const Category = require('../models/category').Category
const Organization = require('../models/organization').Organization
const User = require('../models/user').User
const Table = require('../models/table').Table
const MenuItem = require('../models/menuItem').MenuItem
const Order = require('../models/order').Order
const MenuItemAmount = require('../models/order').MenuItemAmount

Organization.collection.drop()
Category.collection.drop()
User.collection.drop()
Table.collection.drop()
MenuItem.collection.drop()
Order.collection.drop()
MenuItemAmount.collection.drop()
