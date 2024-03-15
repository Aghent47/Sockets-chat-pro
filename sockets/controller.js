import Usuarios  from '../classes/usuarios.js'

const usuarios = new Usuarios(); // solo se ejecuta cuando el servidor se levanta

export const socketController = (client = new Socket(), io) => {

    console.log('Client connected', client.id);
    
    // client.on('disconnect', () => {
    //     console.log('Client disconnected', client.id);
    // });

    client.on('entrarChat', (usuario, callback) => {

        if( !usuario.nombre ){
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

       let personas = usuarios.agregarPersona(client.id, usuario.nombre);

       client.broadcast.emit('listaPersonas', usuarios.getPeronas());
       callback(personas);
    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        
        client.broadcast.emit('crearMensaje', {usuario: 'Administrador', mensaje: `${personaBorrada.nombre} a abandonado el chat`});
        client.broadcast.emit('listaPersonas', usuarios.getPeronas());
    })

}