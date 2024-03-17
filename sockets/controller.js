import Usuarios  from '../classes/usuarios.js'
import { crearMensaje } from '../utilidades/utilidades.js';

const usuarios = new Usuarios(); // solo se ejecuta cuando el servidor se levanta


export const socketController = (client = new Socket(), io) => {

    console.log('Client connected', client.id);
    
    // client.on('disconnect', () => {
    //     console.log('Client disconnected', client.id);
    // });

    client.on('entrarChat', (usuario, callback) => {

        if( !usuario.nombre || !usuario.sala ){
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(usuario.sala);

      usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala );

       client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonasPorSala(usuario.sala));
       client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje('Adminitrados', `${usuario.nombre} Se unió `));
       callback(usuarios.getPersonasPorSala(usuario.sala));
    })

    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensaje(persona, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback( mensaje );
    });


    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Adminitrados', `${personaBorrada.nombre} Salió `));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    });


    //mensajes Privados
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPerona(client.id)

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
        

    });

}