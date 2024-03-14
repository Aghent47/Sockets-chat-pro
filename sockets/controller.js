export const socketController = (client) => {

    console.log('Client connected', client.id);
    
    client.on('disconnect', () => {
        console.log('Client disconnected', client.id);
    });

    client.on('enviar-mensaje', ( payload, callback ) => {

        const id = 123456;
        callback( id );

        client.broadcast.emit('enviar-mensaje', payload);
    
    });
}