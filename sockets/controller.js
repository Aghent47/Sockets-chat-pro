export const socketController = (socket) => {

    console.log('Client connected', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });

    socket.on('enviar-mensaje', ( payload, callback ) => {

        const id = 123456;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload);
    
    });
}