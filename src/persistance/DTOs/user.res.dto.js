export default function currentUserResDTO(user) {
    const { first_name: nombre, last_name: apellido, email: correo_electronico, role: rol } = user;
    return { nombre, apellido, correo_electronico, rol };
}
