import fs from 'fs';

export default class GestorMensajes {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async crearMensaje(objeto) {
        try {
            const mensaje = {
                id: await this.#obtenerIdMaximo() + 1,
                ...objeto
            };

            const mensajesActuales = await this.obtenerTodos();
            mensajesActuales.push(mensaje);

            await fs.promises.writeFile(this.ruta, JSON.stringify(mensajesActuales));
            return mensaje;
        } catch (error) {
            console.log('Error al crear el mensaje:', error);
        }
    }

    async #obtenerIdMaximo() {
        let idMaximo = 0;
        const mensajes = await this.obtenerTodos();

        mensajes.forEach((mensaje) => {
            if (mensaje.id > idMaximo) {
                idMaximo = mensaje.id;
            }
        });

        return idMaximo;
    }

    async obtenerTodos() {
        try {
            if (fs.existsSync(this.ruta)) {
                const contenido = await fs.promises.readFile(this.ruta, 'utf8');
                const mensajes = JSON.parse(contenido);
                return mensajes;
            } else {
                return [];
            }
        } catch (error) {
            console.log('Error al obtener todos los mensajes:', error);
        }
    }

    async obtenerPorId(id) {
        const mensajesActuales = await this.obtenerTodos();
        const mensaje = mensajesActuales.find((sms) => sms.id === id);

        if (mensaje) {
            return mensaje;
        }

        return false;
    }

    async actualizarMensaje(objeto, id) {
        try {
            const mensajesActuales = await this.obtenerTodos();
            const indice = mensajesActuales.findIndex((mensaje) => mensaje.id === id);

            if (indice === -1) {
                throw new Error(`Id ${id} no encontrado`);
            } else {
                mensajesActuales[indice] = { ...objeto, id };
            }

            await fs.promises.writeFile(this.ruta, JSON.stringify(mensajesActuales));
        } catch (error) {
            console.log('Error al actualizar el mensaje:', error);
        }
    }

    async eliminarMensaje(id) {
        const mensajesActuales = await this.obtenerTodos();

        if (mensajesActuales.length > 0) {
            const nuevosMensajes = mensajesActuales.filter((mensaje) => mensaje.id !== id);
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevosMensajes));
        } else {
            throw new Error(`Mensaje no encontrado`);
        }
    }

    async eliminarMensajes() {
        if (fs.existsSync(this.ruta)) {
            await fs.promises.unlink(this.ruta);
        }
    }
}
