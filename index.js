const listaPeliculas = document.getElementById("lista-peliculas");
const botonAnterior = document.getElementById("boton-anterior");
const botonSiguiente = document.getElementById("boton-siguiente");
const textoPagina = document.getElementById("texto-pagina");

let peliculas = [];
let pagina = 1;
let cantidad = 3;

let imagenes = [
    "https://m.media-amazon.com/images/I/51ETR+VhX8L._SY300_SX300_QL70_FMwebp_.jpg",
    "https://images.cdn2.buscalibre.com/fit-in/360x360/03/b4/03b4b1225ba2e87573f5b172179a5a4a.jpg",
    "https://static.wikia.nocookie.net/laordenjedi/images/1/19/Retornojediportada.jpg/revision/latest/scale-to-width-down/290?cb=20110219172041&path-prefix=es",
    "https://tumbaabierta.com/wp-content/uploads/2012/02/tumbaabierta_star_wars_episodioI_3d_poster.jpg",
    "https://m.media-amazon.com/images/I/41w0uUDccrL._SY445_SX342_QL70_FMwebp_.jpg",
    "https://www.insomniacine.cl/wp-content/uploads/2025/04/SW_Ep3_20th_Anniversary_LAS.jpg"

];

const main = async () => {
    const starResponse = await fetch("https://swapi.info/api/films");
    const starData = await starResponse.json();

    console.log("starData", starData);

    peliculas = starData;

    console.log("peliculas", peliculas);

    mostrarPeliculas();
}

const mostrarPeliculas = () => {
    listaPeliculas.innerHTML = "";

    let inicio = (pagina - 1) * cantidad;
    let fin = inicio + cantidad;

    let lista = peliculas.slice(inicio, fin);

    lista.forEach((pelicula, index) => {
        let numeroImagen = inicio + index;

        listaPeliculas.innerHTML += `
            <div class="bg-white rounded-2xl shadow-md p-4">
                <img src="${imagenes[numeroImagen]}" class="w-full h-80 object-cover rounded-xl">
                <h2 class="mt-3 text-lg font-bold text-center">${pelicula.title}</h2>
                <p>Episodio: ${pelicula.episode_id}</p>
                <p>Director: ${pelicula.director}</p>
                <p>Fecha: ${pelicula.release_date}</p>
            </div>
        `;
    });

    textoPagina.innerHTML = "Pagina " + pagina;
}

botonSiguiente.addEventListener("click", () => {
    let totalPaginas = Math.ceil(peliculas.length / cantidad);

    if (pagina < totalPaginas) {
        pagina++;
        mostrarPeliculas();
    }
});

botonAnterior.addEventListener("click", () => {
    if (pagina > 1) {
        pagina--;
        mostrarPeliculas();
    }
});

main();