const obtenerUsiarios = async () => {
    try {
        const response = await axios.get('http://localhost:3000/usuarios');
        console.log(response.data);
        
    } catch (error) {
        console.log(error);
    }
};
obtenerUsiarios();

crearUsuario = async () => {
    try {
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const contraseña = document.getElementById('contraseña').value.trim();

        if (!nombre || !email || !apellido || !contraseña) {
            alert('Completa todos los campos');
            return;
        }


        const agregarUsuario = {
      
            nombre: nombre,
            email: email,
            apellido: apellido,
            contraseña: contraseña
        };

        await axios.post('http://localhost:3000/usuarios', agregarUsuario);
        console.log(obtenerUsiarios() );
        alert('Usuario creado con exito');
        window.location.href = '../PAGES/login.html';

    }
    catch (error) {
        console.log(error);
    }   
}