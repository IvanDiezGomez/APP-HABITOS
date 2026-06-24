
// FUNCION PARA CARGAR LOS HABITOS YA COMPLIDOS DE NUESTRA TABLA HABITOS Y MOSTRAMOS CREANDO UNA TABLA 
const cargarCumplidos = async () => {
    try {
        const [registrosResponse, habitosResponse] = await Promise.all([
            axios.get('http://localhost:3000/registros'),
            axios.get('http://localhost:3000/habitos')
        ]);

        const tbody = document.getElementById('tablaCumplidos');

        if (!tbody) return;

        tbody.innerHTML = '';

        registrosResponse.data.forEach((registro, index) => {
            const habito = habitosResponse.data.find((item) => String(item.id) === String(registro.habitoId));
            const nombreHabito = registro.habito || (habito ? habito.nombre : 'Hábito eliminado');
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${nombreHabito}</td>
                <td>${registro.estado || 'Cumplido'}</td>
                <td>${registro.fecha || 'Sin fecha'}</td>
                 <td><button class="btn btn-warning" onclick="eliminarRegistro(${registro.id})">ELIMINAR</button></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar cumplidos:', error);
    }
};
//FUNCION PARA ELIMINAR UN HABITO CUMPLIDO 

document.addEventListener('DOMContentLoaded', cargarCumplidos);
const eliminarRegistro = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/registros/${id}`);
        cargarCumplidos();

    }
    catch (error) {
        console.error('Error al eliminar hábito:', error);
    }
};