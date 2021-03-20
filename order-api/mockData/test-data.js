const bcrypt = require('bcryptjs')

console.log('Replicating DB')

const Category = require('../models/category').Category
const Organization = require('../models/organization').Organization
const User = require('../models/user').User
const Table = require('../models/table').Table
const MenuItem = require('../models/menuItem').MenuItem

const organization = new Organization({ name: 'ITÜK-TTU' })
organization.save()

const categories = [
  new Category({ name: 'Salatid', order: 1, organizationId: organization._id }),
  new Category({ name: 'Pitsad', order: 2, organizationId: organization._id }),
  new Category({ name: 'Risottod', order: 3, organizationId: organization._id }),
  new Category({ name: 'Pastad', order: 4, organizationId: organization._id }),
  new Category({ name: 'Lastele', order: 5, organizationId: organization._id }),
  new Category({ name: 'Joogid', order: 6, organizationId: organization._id })
]

for (let category of categories) {
  category.save()
}

async function addUser() {
  const password = await bcrypt.hash('TestParool24813', 10)

  let user = new User({
    password: password,
    email: 'test1@gmail.com', organizationId:
    organization._id
  })
  user.save()
}

addUser()

const tables = [
  new Table({
    code: '111111',
    organizationId: organization._id,
    number: 1,
    width: 75,
    height: 200,
    xPosition: 50,
    yPosition: 50
  }),
  new Table({
    code: '222222',
    organizationId: organization._id,
    number: 2,
    width: 75,
    height: 200,
    xPosition: 200,
    yPosition: 50
  }),
  new Table({
    code: '333333',
    organizationId: organization._id,
    number: 3,
    width: 75,
    height: 200,
    xPosition: 350,
    yPosition: 50
  }),
  new Table({
    code: '444444',
    organizationId: organization._id,
    number: 4,
    width: 75,
    height: 200,
    xPosition: 500,
    yPosition: 50
  }),
  new Table({
    code: '555555',
    organizationId: organization._id,
    number: 5,
    width: 75,
    height: 200,
    xPosition: 650,
    yPosition: 50
  }),
  new Table({
    code: '666666',
    organizationId: organization._id,
    number: 6,
    width: 75,
    height: 200,
    xPosition: 50,
    yPosition: 400
  }),
  new Table({
    code: '777777',
    organizationId: organization._id,
    number: 7,
    width: 75,
    height: 200,
    xPosition: 200,
    yPosition: 400
  }),
  new Table({
    code: '888888',
    organizationId: organization._id,
    number: 8,
    width: 75,
    height: 200,
    xPosition: 350,
    yPosition: 400
  }),
  new Table({
    code: '999999',
    organizationId: organization._id,
    number: 9,
    width: 75,
    height: 200,
    xPosition: 500,
    yPosition: 400
  })
]

for (let table of tables) {
  table.save()
}

const menuItems = [
  new MenuItem({
    title: 'Tabbouleh salat',
    description: 'Tabbouleh salat pärineb Levanti piirkonna mägistelt aladelt Liibanoni ja Süüria vahelt.',
    organizationId: organization._id,
    price: 7.20,
    categoryId: categories[0]._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2020/02/Retseptisahtel-Tabbouleh-salat-1.jpg'
  }),
  new MenuItem({
    title: 'Chorizo pastasalat',
    description: 'Peale vaadates võib tunduda, et see chorizo pastasalat on midagi tohutult lihtsat ja maitsvat. Tegelikult see just nii ongi.',
    organizationId: organization._id,
    price: 9.00,
    categoryId: categories[0]._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2019/04/Retseptisahtel-pastasalat-1-696x366.jpg'
  }),
  new MenuItem({
    title: 'Pitsapirukad',
    description: '',
    organizationId: organization._id,
    price: 5.00,
    categoryId: categories[1]._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2017/10/retseptisahtel-pitsapirukad-7-696x366.jpg'
  }),
  new MenuItem({
    title: 'Pitsa sinihallitusjuustu ja peekoniga',
    description: 'See on  tüüpilistest pitsadest kergem variant pirnide ja sinihallitusjuustuga. Võib tunduda, et pirnid muudavad pitsa liiga magusaks, kuid sinihallitusjuust ja peekon annavad parajal määral soolasust juurde, nii et tegelikult on kõik maitsed ilusasti tasakaalus.',
    organizationId: organization._id,
    price: 8.00,
    categoryId: categories[1]._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2016/10/pitsa-retseptisahtel-696x368.jpg'
  }),
  new MenuItem({
    title: 'Köögivilja frittata fetaga',
    description: 'See on kui hommikusöökide pitsa, sest sinna on võimalik lisada põhimõtteliselt kõike, mis pähe tuleb.',
    organizationId: organization._id,
    price: 6.00,
    categoryId: categories[1]._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2019/01/Retseptisahtel-frittata-5-696x366.jpg'
  }),
  new MenuItem({
    title: 'Ahjupraad odra risotoga',
    description: '',
    organizationId: organization._id,
    price: 11.00,
    categoryId: categories[2]._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2016/09/Ahjupraad-retseptisahtel-696x368.jpg'
  }),
  new MenuItem({
    title: 'Grillitud kana seenerisotto ja värske rukolaga',
    description: '',
    organizationId: organization._id,
    price: 13.00,
    categoryId: categories[2]._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2019/11/Retseptisahtel-Grillitud-kana-seenerisottoga-696x364.jpg'
  }),
  new MenuItem({
    title: 'Kanapasta päikesekuivatatud tomatitega',
    description: 'Kanapasta päikesekuivatatud tomatitega – mitte ainult tervislik vaid ka täitsa lihtne roog, millest kumavad läbi suviselt mõnusad maitsed.',
    organizationId: organization._id,
    price: 10.00,
    categoryId: categories[3]._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2019/10/Retseptisahtel-Kanapasta6-696x366.jpg'
  }),
  new MenuItem({
    title: 'Täidetud teokarbipasta',
    description: 'Spinatiga täidetud teokarbipasta on mõnus roog, mida võib pakkuda nii suupistetena kui ka näiteks lõunasöögiks koos kerge salatiga. Ideaalne viis suurest lihasöömisest väike paus teha.',
    organizationId: organization._id,
    price: 12.00,
    categoryId: categories[3]._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2019/06/Retseptisahtel-taidetud-teokarbipasta-9-696x366.jpg'
  }),
  new MenuItem({
    title: 'Friikartulid viineritega',
    description: 'Ilmselge klassika.',
    organizationId: organization._id,
    price: 5.00,
    categoryId: categories[4]._id,
    imageUrl: 'https://previews.123rf.com/images/foodandmore/foodandmore1311/foodandmore131100068/23700412-slices-of-grilled-smoked-sausage-and-crisp-golden-french-fries-topped-with-mayonnaise-in-a-fluted-wh.jpg'
  }),
  new MenuItem({
    title: 'Coca-cola',
    description: '',
    organizationId: organization._id,
    price: 2.00,
    categoryId: categories[5]._id,
    imageUrl: 'https://cdn11.bigcommerce.com/s-5bce5hukxg/images/stencil/1280x1280/products/2401/2989/coke355__27172.1580962276.jpg?c=2&imbypass=on'
  }),
  new MenuItem({
    title: 'Fanta',
    description: '',
    organizationId: organization._id,
    price: 2.00,
    categoryId: categories[5]._id,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJ1qScnmk4nPCFgyu5M9NkoDn68xzzHWdUvPVjWKJlilwXr-2Q&usqp=CAU'
  }),
  new MenuItem({
    title: 'Kohvi',
    description: '',
    organizationId: organization._id,
    price: 2.00,
    categoryId: categories[5]._id,
    imageUrl: 'https://ae01.alicdn.com/kf/HTB1ka9bSXXXXXX0XFXXq6xXFXXXy/diamond-painting-big-size-rhinestones-embroidery-coffe-decor-decorative-coffee-beans.jpg'
  }),

]

for (const menuItem of menuItems) {
  menuItem.save()
}







