const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const ServiceCall = require('../app/models/serviceCall').ServiceCall;
require('./config/db').connection;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('./routes'));

const server = app.listen(PORT, function () {
    console.log('Server is running on Port:', PORT);
});


const socket = require('socket.io');
io = socket(server);

io.on('connection', (socket) => {

    socket.on('CALL_SERVICE', function (data) {
        const serviceCall = new ServiceCall(data);
        serviceCall["serviced"] = false;
        serviceCall["callTime"] = new Date();
        serviceCall.save(() => {
            io.emit('SERVICE_CALLED', serviceCall)
        });
    });

    ServiceCall.find({serviced: false}, (err, messages) => {
        socket.emit('ALL_UNSERVICED_TABLES', messages);
    });

    socket.on('MARK_TABLE_SERVICED', function (data) {
        ServiceCall.findOne(data,
            (err, messages) => {
                messages["serviced"] = true;
                messages.save();
            });

    })
});
