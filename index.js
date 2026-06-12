const listaPersonajes = document.getElementById("lista-personajes");
const botonAnterior = document.getElementById("boton-anterior");
const botonSiguiente = document.getElementById("boton-siguiente");
const textoPagina = document.getElementById("texto-pagina");

const seccionComparacion = document.getElementById("seccion-comparacion");
const tablaCuerpo = document.getElementById("tabla-cuerpo");
const nombreP1 = document.getElementById("nombre-p1");
const nombreP2 = document.getElementById("nombre-p2");
const botonLimpiar = document.getElementById("boton-limpiar");

let personajes = [];
let seleccionados = []; 
let pagina = 1;
let cantidad = 3;

const main = async () => {
    const respuesta = await fetch("https://swapi.info/api/people");
    const datos = await respuesta.json();
    
    personajes = datos;
    mostrarPersonajes();
}

const mostrarPersonajes = () => {
    listaPersonajes.innerHTML = "";

    let inicio = (pagina - 1) * cantidad;
    let fin = inicio + cantidad;
    let listaFiltrada = personajes.slice(inicio, fin);

    listaFiltrada.forEach((personaje) => {
            let yaSeleccionado = seleccionados.includes(personaje);

        let tarjeta = document.createElement("div");
        tarjeta.className = "bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between";

        tarjeta.innerHTML = `
            <div>
                <h2 class="text-xl font-bold text-center mb-2">${personaje.name}</h2>
                <p class="mb-4 text-gray-600 text-center">Género: ${personaje.gender}</p>
            </div>
        `;

        let boton = document.createElement("button");
        boton.innerText = yaSeleccionado ? "✓ Seleccionado" : "Seleccionar para comparar";
        boton.className = yaSeleccionado 
            ? "bg-green-600 text-white px-4 py-2 rounded w-full font-bold" 
            : "bg-black text-white px-4 py-2 rounded w-full";

        boton.addEventListener("click", () => {
            if (yaSeleccionado) {
                let indice = seleccionados.indexOf(personaje);
                seleccionados.splice(indice, 1);
            } else {
                if (seleccionados.length >= 2) {
                    alert("Solo puedes seleccionar un máximo de 2 personajes.");
                    return;
                }
                seleccionados.push(personaje);
            }

            mostrarPersonajes();
            generarComparacion();
        });

        tarjeta.appendChild(boton);
        listaPersonajes.appendChild(tarjeta);
    });

    let totalPaginas = Math.ceil(personajes.length / cantidad);
    textoPagina.innerHTML = "Pagina " + pagina + " de " + totalPaginas;
}

const generarComparacion = () => {
    if (seleccionados.length === 2) {
        let p1 = seleccionados[0];
        let p2 = seleccionados[1];

        nombreP1.innerText = p1.name;
        nombreP2.innerText = p2.name;

        tablaCuerpo.innerHTML = `
            <tr class="border-b border-gray-200">
                <td class="p-3 font-bold bg-gray-50">Altura</td>
                <td class="p-3 text-center">${p1.height} cm</td>
                <td class="p-3 text-center">${p2.height} cm</td>
            </tr>
            <tr class="border-b border-gray-200">
                <td class="p-3 font-bold bg-gray-50">Peso</td>
                <td class="p-3 text-center">${p1.mass} kg</td>
                <td class="p-3 text-center">${p2.mass} kg</td>
            </tr>
            <tr class="border-b border-gray-200">
                <td class="p-3 font-bold bg-gray-50">Género</td>
                <td class="p-3 text-center">${p1.gender}</td>
                <td class="p-3 text-center">${p2.gender}</td>
            </tr>
            <tr class="border-b border-gray-200">
                <td class="p-3 font-bold bg-gray-50">Color de cabello</td>
                <td class="p-3 text-center">${p1.hair_color}</td>
                <td class="p-3 text-center">${p2.hair_color}</td>
            </tr>
            <tr class="border-b border-gray-200">
                <td class="p-3 font-bold bg-gray-50">Año de nacimiento</td>
                <td class="p-3 text-center">${p1.birth_year}</td>
                <td class="p-3 text-center">${p2.birth_year}</td>
            </tr>
        `;

        seccionComparacion.classList.remove("hidden");
    } else {
        seccionComparacion.classList.add("hidden");
    }
}

botonLimpiar.addEventListener("click", () => {
    seleccionados = [];
    mostrarPersonajes();
    generarComparacion();
});

botonSiguiente.addEventListener("click", () => {
    let totalPaginas = Math.ceil(personajes.length / cantidad);
    if (pagina < totalPaginas) {
        pagina++;
        mostrarPersonajes();
    }
});

botonAnterior.addEventListener("click", () => {
    if (pagina > 1) {
        pagina--;
        mostrarPersonajes();
    }
});

main();