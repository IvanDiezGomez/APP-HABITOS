const iniciarSesion = async () => {
    try {
        const email = document.getElementById('email').value;
        const contraseña = document.getElementById('contraseña').value;

        if (!email || !contraseña) {
            alert('Ingrese correo y contraseña');
            return;
        }

        const response = await axios.get('http://localhost:3000/usuarios');
        const usuarios = response.data;
        const usuarioEncontrado = usuarios.find(usuario =>
            usuario.email === email &&
            (usuario.contraseña === contraseña || usuario.password === contraseña)
        );
        if (usuarioEncontrado) {
            alert('Inicio de sesión exitoso');
            window.location.href='../PAGES/index.html'
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        console.log(error);
    }
}

// Exponer la función al ámbito global para que `onclick="iniciarSesion()"` en HTML funcione
window.iniciarSesion = iniciarSesion;

const registrarBtn = document.getElementById('registrarBtn');
if (registrarBtn) {
    registrarBtn.addEventListener('click', () => {
        window.location.href = '../PAGES/registro.html';
    });
}

