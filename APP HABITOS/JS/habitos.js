const cargarHabitos = async () => {
    try {
        const response = await axios.get('http://localhost:3000/habitos');
        const habitos = response.data;
        const tbody = document.getElementById('tablaHabitos');

        tbody.innerHTML = '';

        habitos.forEach((habito, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${habito.nombre}</td>
                <td>${habito.frecuencia}</td>
                <td><button class="btn btn-success" onclick="marcarComoCumplido(event, ${habito.id})">CUMPLIDO</button></td>
                <td><input type="checkbox" id="checkbox${habito.id}" ></td>
                <td><button class="btn btn-warning" onclick=" editarHabitos (${habito.id})">EDITAR</button></td>

                <td><button class="btn btn-warning" onclick="eliminarHabito(${habito.id})">ELIMINAR</button></td>
            `;
            tbody.appendChild(tr);

        });
    } catch (error) {
        console.error('Error al cargar hábitos:', error);
    }
};

const agregarHabito = async () => {
    try {
        const nombre = document.getElementById('nuevoHabitoNombre').value.trim();
        const frecuencia = document.getElementById('nuevaFrecuencia').value.trim() || 'Diario';

        if (!nombre) {
            alert('Por favor ingresa el nombre del hábito');
            return;
        }

        const habitosActuales = await axios.get('http://localhost:3000/habitos');
        const ultimoId = habitosActuales.data.reduce((maxId, habito) => {
            const idNum = Number(habito.id);
            return Number.isFinite(idNum) && idNum > maxId ? idNum : maxId;
        }, 0);

        const nuevoHabito = {
            id: ultimoId + 1,
            nombre: nombre,
            frecuencia: frecuencia
        };

        await axios.post('http://localhost:3000/habitos', nuevoHabito);

        document.getElementById('nuevoHabitoNombre').value = '';
        document.getElementById('nuevaFrecuencia').value = '';

        await cargarHabitos();
    } catch (error) {
        console.error('Error al agregar hábito:', error);
    }
};

document.addEventListener('DOMContentLoaded', cargarHabitos);

const marcarComoCumplido = async (event, habitoId) => {
    try {
       
      const registrosResponse = await axios.get('http://localhost:3000/registros');
        const habitoResponse = await axios.get(`http://localhost:3000/habitos/${habitoId}`);
        const habito = habitoResponse.data; 


        await axios.post('http://localhost:3000/registros', {
            id: 'id' ,
            habitoId: Number(habito.id),
            habito: habito.nombre,
            fecha: new Date().toISOString().slice(0, 10),
            estado: 'Cumplido'
        });
        alert(`¡Hábito "${habito.nombre}" marcado como cumplido!`);

        
        cargarHabitos();

       
    } catch (error) {
        console.error('Error al guardar cumplido:', error);
        alert('No se pudo guardar el hábito cumplido.');
    }
};

const eliminarHabito = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/habitos/${id}`);
        cargarHabitos();

    }
    catch (error) {
        console.error('Error al eliminar hábito:', error);
    }
};
const editarHabitos = async (id) => {
    try {

        const nuevoNombre = prompt("Ingrese el nuevo nombre del hábito:");

        if (!nuevoNombre) return;

        await axios.patch(`http://localhost:3000/habitos/${id}`, {
            nombre: nuevoNombre
        });

        cargarHabitos();

    } catch (error) {
        console.error("Error al editar hábito:", error);
    }
};





