function validacionForm(form) {
    let validacion = true;
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => {
        input.classList.remove("error");
        if (input.value.length === 0) {
            input.classList.add("error");
            validacion = false;
        }
    });
    return validacion;
}

async function fetchData(url, method, bodyData, spotifyToken, loginToken){
    try {
        toggleSpinner();
        const headers = { "Content-Type": "application/json" };
        if (spotifyToken) headers["Authorization1"] = "Bearer " + spotifyToken;
        if (loginToken) headers["Authorizatios2"] = "Bearer " + loginToken;
        if (bodyData === false && method.toUpperCase() === 'GET') {
            const respuesta = await fetch(url, {
                method: method,
                headers,
            });
            toggleSpinner();
            return await respuesta.json();
        } else {
            const respuesta = await fetch(url, {
                method:method,
                headers,
            });
            toggleSpinner();
            return await respuesta.json();
        }
     } catch (error) {
        toggleSpinner();
        showNotification("error", "Error en el servidor ", error);
    }
}

function toggleSpinner() {
    document.querySelector(".fa-spin").classList.toggle("hide");
}

let currentPage = 1;
const itemsPerPage = 4;
let albums;
let bandasNom;
let generos;


const albumsTemplate = document.querySelector("#albumsTemplate");
const bandasNombre = document.querySelector("bandNameDiv");
const bandasGenero = document.querySelector("bandGenresDiv");
const resultadoDivAlbums = document.querySelector(".resultDivAlbums");

function showAlbumsResultsHTML(alb, bandN, genres, format) {
    albums = alb;
    bandasNom = bandN;
    generos = genres;
    resultadoDivAlbums.innerHTML = "";
    bandasNombre.innerHTML = bandasNom;
    if (format) {
        bandasNombre.innerHTML = bandasNom + " en formato " + format;
    }
    if (genres) {
        if (generos.length === 0) {
            generos = "No se encontro el genero musical de este artista";
        }
        bandasGenero.innerHTML = "<u>Género</u>: <i>" + generos + "</i>";
    }
    const starIndex = (currentPage -1)  * itemsPerPage;
    const endIndex = starIndex + itemsPerPage;
    const albumToShow = Albums.slice(starIndex, endIndex);
    albumToShow.forEach((album) => {
        const albumElement = albumsTemplate.content.cloneNode(true);
        albumElement.querySelector(".album h4").textContent = album.name;
        albumElement.querySelector(".album img").src = album.images[0].url;
        albumElement.querySelector(".album img").alt = album.name;
        albumElement.querySelector(".album .type").innerHTML =
          "<u>Tipo</u>: " + album.album_type;
        albumElement.querySelector(".album .year").innerHTML =
          "<u>Año</u>: " + album.release_date.split("-")[0];
        albumElement.querySelector(".btnAddAlbum").id = album.id;
        resultadoDivAlbums.appendChild(albumElement);
    });
    const totalPages = Match.ceil(albums.length / itemsPerPage);
    renderPaginationButtons(totalPages);
    return resultadoDivAlbums;
}

function renderPaginationButtons(totalPages) {
    const paginatioButtons = document.getElementById("paginationButtons");
    paginatioButtons.innerHTML = "Págs: ";
    for (let i = 1; i <= totalPages; i++) {
        const boton = document.createElement("button");
        boton.textContent = i;
        if(i === currentPage) {
            boton.classList.add("current-page");
        }
        boton.addEventListener("click",() =>{
            currentPage = i;
            showAlbumsResultsHTML(albums, bandasNom, generos);
        });
        paginatioButtons.appendChild(boton);
    }
}

const botonGetTokenSpotify = document.querySelector("")

botonGetTokenSpotify.addEventListener("click", getToken);





export {
    validacionForm,
    fetchData,
    showAlbumsResultsHTML
};


// aqui tambien falta analizar ciertas cosas aun no se todas las conecciones que tiene
// solo se que hay un monton de cosas para el login 
// aun nos falta lo del token y las peticiones
// y ya casi terminamos la entrada y el login