const {io} = require('../server');
const {TicketControl} = require("../classes/ticket-control");
const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        const siguiente = ticketControl.siguienteTicket();
        callback(siguiente)

    });

    //Emitir evento estadoActual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4:ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);


        //emitimos evento al frontend
        client.broadcast.emit('ultimos4',{
            ultimos4:ticketControl.getUltimos4()
        });


    })

});
