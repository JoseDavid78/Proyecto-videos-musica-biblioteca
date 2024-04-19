import {
    apiURL,
    spotify_token_key_LS,
    login_token_key_LS,
  } from "./constants.js";
  
  // valida formularios
  function validacionForm(form) {
    let validate = true;
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => {
      input.classList.remove("error");
      if (input.value.length === 0) {
        input.classList.add("error");
        validate = false;
      }
    });
    return validate;
  }
  
  // Funcion para obtener datos del servidor asíncronamente mediante fetch
  async function fetchData(url, method, bodyData, spotifyToken, loginToken) {
    try {
      toggleSpinner();
      const headers = { "Content-Type": "application/json" };
      if (spotifyToken) headers["Authorization1"] = "Bearer " + spotifyToken;
      if (loginToken) headers["Authorization2"] = "Bearer " + loginToken;
      // Validar si bodyData es false y el método es GET
      if (bodyData === false && method.toUpperCase() === 'GET') {
        // No incluir el cuerpo en la solicitud si el método es GET
        const response = await fetch(url, {
          method: method,
          headers,
        });
        toggleSpinner();
        return await response.json();
      } else {
        const response = await fetch(url, {
          method: method,
          headers,
          body: JSON.stringify(bodyData),
        });
        toggleSpinner();
        return await response.json();
      }
    } catch (error) {
      toggleSpinner();
      showNotification("error", "Error en el servidor! ", error);
    }
  }
  
  function toggleSpinner() {
    document.querySelector(".fa-spin").classList.toggle("hide");
  }
  
  // Funciones para mostrar resultados en el DOM y paginación
  // Variables para paginación
  let currentPage = 1;
  const itemsPerPage = 4;
  // Globales para correcto funcionamiento de la paginación
  let Albums;
  let BandName;
  let Genres;
  // DOM elements
  const albumsTemplate = document.querySelector("#albumsTemplate");
  const bandNameDiv = document.getElementById("bandNameDiv");
  const bandGenresDiv = document.getElementById("bandGenresDiv");
  const resultDivAlbums = document.querySelector(".resultDivAlbums");
  
  function showAlbumsResultsHTML(alb, bandN, genres, format) {
    Albums = alb;
    BandName = bandN;
    Genres = genres;
    resultDivAlbums.innerHTML = "";
    bandNameDiv.innerHTML = BandName;
    if (format) {
      bandNameDiv.innerHTML = BandName + " en formato " + format;
    }
    if (genres) {
      if (Genres.length === 0) {
        Genres = "No se encontró género musical sobre este artista";
      }
      bandGenresDiv.innerHTML = "<u>Género</u>: <i>" + Genres + "</i>";
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const albumsToShow = Albums.slice(startIndex, endIndex);
    albumsToShow.forEach((album) => {
      const albumElement = albumsTemplate.content.cloneNode(true);
      albumElement.querySelector(".album h4").textContent = album.name;
      albumElement.querySelector(".album img").src = album.images[0].url;
      albumElement.querySelector(".album img").alt = album.name;
      albumElement.querySelector(".album .type").innerHTML =
        "<u>Tipo</u>: " + album.album_type;
      albumElement.querySelector(".album .year").innerHTML =
        "<u>Año</u>: " + album.release_date.split("-")[0];
      albumElement.querySelector(".btnAddAlbum").id = album.id;
      resultDivAlbums.appendChild(albumElement);
    });
    const totalPages = Math.ceil(Albums.length / itemsPerPage);
    renderPaginationButtons(totalPages);
    return resultDivAlbums;
  }
  
  function renderPaginationButtons(totalPages) {
    const paginationButtons = document.getElementById("paginationButtons");
    paginationButtons.innerHTML = "Págs: ";
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      if (i === currentPage) {
        // Agrega la clase 'current-page' al botón de la página actual
        button.classList.add("current-page");
      }
      button.addEventListener("click", () => {
        currentPage = i;
        showAlbumsResultsHTML(Albums, BandName, Genres);
      });
      paginationButtons.appendChild(button);
    }
  }
  
  // Funciones LocalStorage (LS)
  // Esta el token en el LS?
  const btnSpotifyGetToken = document.getElementById("btnSpotifyGetToken");
  // Evento que llama a la API de Spotify para recibir el token de acceso
  btnSpotifyGetToken.addEventListener("click", getToken);
  function isSpotifyTokenInLocalStorage() {
    if (!isDataInLocalStorage(spotify_token_key_LS)) {
      btnSpotifyGetToken.classList.remove("hide");
      showNotification(
        "warning",
        "No hay token de Spotify en el LS o ha caducado",
        "Haz clic en el botón de arriba 'Get Token API Spotify'"
      );
      return;
    }
    btnSpotifyGetToken.classList.add("hide");
  }
  
  function isLoginTokenInLocalStorage() {
    if (!isDataInLocalStorage(login_token_key_LS)) {
      Swal.fire({
        title: "Token de login inválido o ha caducado!",
        text: "Haz click en OK para añadir los tus datos de acceso a la APP y renovar el token",
        icon: "warning"
      }).then(() => {
        location.href = "./index.html";
      });
    }
  }
  
  // Obtener el token
  function getToken() {
    const login_token = getDataInLocalStorage(login_token_key_LS);
    fetchData(apiURL + "getToken", "get", false, false, login_token)
    .then((res) => {
      if (res.error) {
        showNotification("error", "Oops...", res.error);
        return;
      }
      localStorage.setItem(spotify_token_key_LS, res.access_token);
      showNotification(
        "success",
        "Se ha guardado tu token de spotify en el LocalStorage (1h de validez)." 
      );
      isSpotifyTokenInLocalStorage();
    });
  }
  
  function setDataInLocalStorage(key, value) {
    return localStorage.setItem(key, value);
  }
  
  function isDataInLocalStorage(key) {
    return localStorage.getItem(key) !== null;
  }
  
  function getDataInLocalStorage(key) {
    return localStorage.getItem(key);
  }
  
  function removeDataInLocalStorage(key) {
    return localStorage.removeItem(key);
  }
  
  // Funciones para mostrar alertas
  function showNotification(type, message, details) {
    showAlert(type, message, details);
  }
  
  function showAlert(icon, title, text) {
    Swal.fire({ icon: icon, title: title, text: text });
  }
  
  // cerrar sesion
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  btnCerrarSesion.addEventListener("click", () => {
    removeDataInLocalStorage(login_token_key_LS);
    location.href = "./index.html";
  });
  
  export {
    fetchData,
    showAlbumsResultsHTML,
    isSpotifyTokenInLocalStorage,
    isLoginTokenInLocalStorage,
    isDataInLocalStorage,
    setDataInLocalStorage,
    getDataInLocalStorage,
    removeDataInLocalStorage,
    showNotification,
    validacionForm
  };
  
  // aca solo falta acoplar el token y hacer unos arreglos