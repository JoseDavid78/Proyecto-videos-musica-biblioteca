const urlApiSpotifyAA = "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums \
Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'";



function validacionForm(form) {         // Funcion que valida el formulario
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

async function fetchData(url, method, bodyData, spotifyToken, loginToken){     // funcion que valida el fetch
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

// hay un error de package.json ver que error es y subsanarlo

const albumsTemplate = document.querySelector("#albumsTemplate");
const bandasNombre = document.querySelector("bandNameDiv");
const bandasGenero = document.querySelector("bandGenresDiv");
const resultadoDivAlbums = document.querySelector(".resultDivAlbums");

function showAlbumsResultsHTML(alb, bandN, genres, format) {       //Funcion que valida los albums
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
function isSpotifyTokenLocalStorage() {
    if (!isSpotifyTokenLocalStorage(spotify_token_key_ls)) {
        botonGetTokenSpotify.classList.remove("hide");
        showNotification(
            "warning",
            "No hay token de Spotify en el LS o ha caducado",
            "Has click en el boton de arriba 'Get Token API Spotify'"
        );
        return;
    }
    botonGetTokenSpotify.classList.add("hide");
}


function isLoginTokenInLocalStorage() {
    if (!isDataInLocalStorage(login_token_key_ls)) {
        Swal.fire({
            title: "Token de login invalido o ha caducado",
            text: "Haz click en OK para añadir tus datos de acceso a la APP y renueva tu token",
            icon: "warning"
        }).then(()=>{
            location.href="./index.html";
        });
    }
}

function SpotifyService(_httpClient) {
    this._httpClient = _httpClient;
    this.credentials = {
        clienId: '',
        clientSecret:'',
        accessToken: ''
    };
    this.poolURLS = {
        authorize: 'https://accounts.spotify.com/es-ES/authorize?client_id=' +
            this.credentials.clienId + '&response_type=token' +
            '&redirect_uri=' + encodeURIComponent('/#/') +
            '&expires_in=3600',
        refreshAccessToken: 'https://accounts.spotify.com/api/token'
    };
    this.upDateToken();
}


//  export {
//      validacionForm,
//      fetchData,
//      showAlbumsResultsHTML,
//      isLoginTokenInLocalStorage,
//      SpotifyService // posible funcion token
//  };

 module.exports = validacionForm;
 module.exports = fetchData;
 module.exports = showAlbumsResultsHTML;
 module.exports = isLoginTokenInLocalStorage;

// aqui tambien falta analizar ciertas cosas aun no se todas las conecciones que tiene
// solo se que hay un monton de cosas para el login 
// aun nos falta lo del token y las peticiones
// y ya casi terminamos la entrada y el login