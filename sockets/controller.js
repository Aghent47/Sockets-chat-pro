import Usuarios  from '../classes/usuarios.js'
import { crearMensaje } from '../utilidades/utilidades.js';

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

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensaje(persona, data.mensaje);
        client.broadcast.emit('crearMensaje', mensaje);
    });


    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        
        client.broadcast.emit('crearMensaje', crearMensaje('Adminitrados', `${personaBorrada.nombre} Salió `));
        client.broadcast.emit('listaPersonas', usuarios.getPeronas());
    })

}