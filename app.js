// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = [];
const maxAmigos = 10;

function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombre = inputAmigo.value.trim();
    
    if (nombre && amigos.length < maxAmigos) {
        // Verificar si el nombre ya existe
        if (!amigos.includes(nombre)) {
            amigos.push(nombre);
            inputAmigo.value = '';
            actualizarLista();
        } else {
            alert('Este amigo ya está en la lista');
        }
    } else if (amigos.length >= maxAmigos) {
        alert('Ya has alcanzado el máximo de 10 amigos');
    } else {
        alert('Por favor ingresa un nombre válido');
    }
}

function actualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        li.className = 'name-item';
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => eliminarAmigo(index);
        
        li.appendChild(deleteButton);
        lista.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
    document.getElementById('resultado').innerHTML = '';
}

function sortearAmigo() {
    if (amigos.length < 4) {
        alert('Se necesitan al menos 4 amigos para realizar el sorteo');
        return;
    }

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    // Crear una copia del array de amigos para hacer el sorteo
    let amigosSorteo = [...amigos];
    let asignaciones = [];

    // Realizar el sorteo asegurando que nadie se auto-seleccione
    for (let i = 0; i < amigos.length; i++) {
        let posiblesAmigos = amigosSorteo.filter(a => a !== amigos[i]);
        
        if (i === amigos.length - 1 && posiblesAmigos.includes(asignaciones[0])) {
            // Si es el último y solo queda el primero, reiniciar el sorteo
            return sortearAmigo();
        }

        let indiceAleatorio = Math.floor(Math.random() * posiblesAmigos.length);
        let amigoSeleccionado = posiblesAmigos[indiceAleatorio];
        
        asignaciones.push(amigoSeleccionado);
        amigosSorteo = amigosSorteo.filter(a => a !== amigoSeleccionado);
    }

    // Mostrar resultados
    asignaciones.forEach((amigoSecreto, index) => {
        const li = document.createElement('li');
        li.className = 'result-item';
        li.textContent = `${amigos[index]} → ${amigoSecreto}`;
        resultado.appendChild(li);
    });
}