// importante leer lo que hay en el drive  aun nos falta la api no la emos probado este link es por parte de linkeding es  un 
// mini tutorial de como usar las tokens de spotify (https://es.linkedin.com/pulse/consumiendo-la-api-de-spotify-en-angular-standalone-francisco-javier)
// dos la base de datos esta incompleta y aun nos falata el como gestionarla ademas de que este bien relacionada
// tres la interfaz que viene siendo el diseño visual de la pagina estamos en 0 ver como podemos usar el figma o canva para hacernos una idea
// cuatro comprobar si las rutas estan bien hechas y si falta alguna otra

// Importar las funciones necesarias
import {
    validacionForm,
    fetchData,
    showNotification,
    setDataInLocalStorage,
    removeDataInLocalStorage,
    getDataInLocalStorage
} from "./funciones.js";

// Seleccionar elementos del DOM
const boton = document.querySelector("#music");
const resultadoInput = document.querySelector("#cancion");
const boton2 = document.querySelector("#vide");
const inputResultado = document.querySelector("#video");
const inputEmIn = document.querySelector("#emailIn");
const inputPasIn = document.querySelector("#passwordIn");
const inputEmRe = document.querySelector("#emailRe");
const inputPasRe = document.querySelector("#passwordRe");
const botonUsuario = document.querySelector("#boton_usuario");
const botonEntrada = document.querySelector("#boton_entrada");
const miFormatoDiv = document.querySelectorAll(".formato-div");

// URL de la API de Spotify y de iTunes
const apiurl = "https://spotify23.p.rapidapi.com/search/?q=";
const url = 'https://itunesvolodimir-kudriachenkov1.p.rapidapi.com/searchMusic';

// Evento clic para buscar canciones
boton.addEventListener("click", () => {
    const nombreCancion = resultadoInput.value.trim();

    if (nombreCancion.length === 0) {
        alert("Por favor, introduce una canción.");
        return;
    }

    fetch(apiurl + encodeURIComponent(nombreCancion) + "&type=multi&offset=0&limit=10&numberOfTopResults=5", {
        method: "get",
        headers: {
            "x-rapidapi-host": "spotify23.p.rapidapi.com",
            "x-rapidapi-key": "<TU_CLAVE_API_RAPIDAPI>",
            "useQueryString": true
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Procesar la respuesta aquí
    })
    .catch(error => alert(error));
});

// Evento clic para buscar vídeos
boton2.addEventListener("click", () => {
    const nombreVideo = inputResultado.value.trim();

    if (nombreVideo.length === 0) {
        alert("Por favor, introduce el nombre de un video.");
        return;
    }

    fetch(url + encodeURIComponent(nombreVideo), {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '4c62be50e4msh41c41963f39f872p1a9105jsndd1693db3af4',
            'X-RapidAPI-Host': 'iTunesvolodimir-kudriachenkoV1.p.rapidapi.com'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Procesar la respuesta aquí
    })
    .catch(error => alert(error));
});

// Evento de inicio de sesión
formInicio.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validacionForm(formInicio)) return;

    fetchData(apiurl + "singIn", "post", {
        inputEmIn: inputEmIn.value,
        inputPasIn: inputPasIn.value,
    })
    .then((res) => {
        if (res.status === 500 || res.status === 204 || res.status === 401) {
            showNotification("error", res.mensaje);
            return;
        }

        Swal.fire({
            title: "Inicio de sesión correcto",
            text: "Tu token de inicio de sesión se ha guardado en el LocalStorage (validez de 24 horas). Haz clic en OK para acceder.",
            icon: "success"
        }).then(() => {
            setDataInLocalStorage(login_token_key_ls, res.login_token);
            location.href = "/app.html";
        });
    })
    .catch(error => alert(error));
});

// Evento de registro de usuario
botonUsuario.addEventListener("click", () => {
    const emailRe = inputEmRe.value.trim();

    if (emailRe.length === 0) {
        alert("Por favor, introduce tu email.");
        return;
    }

    fetch(url, {
        method: 'get',
        headers: {
            // Aquí van las cabeceras necesarias
        },
        body: JSON.stringify({
            nombre: inputPasRe.value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Procesar la respuesta aquí
    })
    .catch(error => alert(error));
});

// Evento de entrada
botonEntrada.addEventListener("click", () => {
    const entrada = resultadoInput.value.trim();

    if (entrada.length == 0) {
        alert("Por favor, introduce una entrada.");
        return;
    }

    fetch(url, {
        method: 'get',
        headers: {
            // Aquí van las cabeceras necesarias
        },
        body: JSON.stringify({
            nombre: resultadoInput.value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Procesar la respuesta aquí
    })
    .catch(error => alert(error));
});

// Evento para mostrar álbumes de bandas
miFormatoDiv.forEach((formatoDiv) => {
    formatoDiv.addEventListener("click", e => {
        isSpotifyTokenLocalStorage();
        const loginToken = getDataInLocalStorage(login_token_key_ls);
        fetchData(apiURL + "getAlbumsDB?formato=" + e.target.id, "get", false, false, loginToken)
            .then(res => {
                if (res.status === 401) {
                    removeDataInLocalStorage(spotify_token_key_ls);
                    isSpotifyTokenLocalStorage();
                    return;
                }
                if (res.status === 403) {
                    removeDataInLocalStorage(login_token_key_ls);
                    isSpotifyTokenLocalStorage();
                    return;
                }
                if (res.status === 500) {
                    showNotification("error", res.message);
                    return;
                }
                if (res.bandAlbuns.length === 0) {
                    miFormatoDiv.innerHTML = `
                <article>
                    <h2><i>Todavía no has guardado ningún álbum de este formato en tu biblioteca</i></h2>
                    <a href="./albuns.HTML">->Volver a mi biblioteca</a>
                </article>
                `;
                    return;
                }
                miFormatoDiv.innerHTML =
                    "<h4>Listado de álbumes de bandas" + res.bandAlbuns[0].albumInfo.formato + "</h4>";
                const uniqueBands = [...new Set(res.bandAlbuns.map(item => item.bandAlbuns))];
                for (let i = 0; i < uniqueBands.length; i++) {
                    miFormatoDiv.innerHTML += `<b><a href="#" id="${uniqueBands[i]}">->${i + 1}- ${uniqueBands[i]}</a></b>`;
                }
                miFormatoDiv.innerHTML += `<a href="./albuns.html">->Volver a mi biblioteca</a>`;
                next(res.bandAlbuns, res.bandAlbuns[0].albumInfo.formato);
            });
    });
});

// Borrado de álbumes/música/vídeo
function deleteAlbumDB(resultDivAlbuns, formato) {
    const btnaddalbun = resultDivAlbuns.querySelectorAll("./albun_boton");
    btnaddalbun.forEach((btn) => {
        btn.addEventListener("click", async (evento) => {
            Swal.fire({
                title: "¿Estás seguro de que quieres eliminar este álbum de tu biblioteca?",
                text: "",
                icon: "",
                showCancelButton: true,
                confirmButtonColor: "cadetblue",
                showCancelButtonColor: "rgb(255 95 95)",
                confirmButtonText: "¡Sí!"
            }).then((result) => {
                if (result.isConfirmed) {
                    const login_token = getDataInLocalStorage(login_token_key_ls);
                    fetchData(apiURL + "deleteAlbumDB", "delete", { albumID: evento.target.id, formato }, false, login_token)
                        .then((res) => {
                            if (res.status === 401) {
                                removeDataInLocalStorage(spotify_token_key_ls);
                                isSpotifyTokenLocalStorage();
                                return;
                            }
                            if (res.status === 403) {
                                removeDataInLocalStorage(login_token_key_ls);
                                isLoginTokenInLocalStorage();
                                return;
                            }
                            if (res.status === 500) {
                                showNotification("error", res.message);
                                return;
                            }
                            Swal.fire({
                                title: "Álbum borrado",
                                text: res.message,
                                icon: "success"
                            }).then(() => location.reload());
                        });
                }
            });
        });
    });

}



// Aun falta completar el codigo en siertas partes y convinarlo con el backen
// Y aun no tenemos el token ni al Api de spotify

// bitacora posiblemente final llegue al punto de que ya no entiendo nada no se como acoplarlo y siento
// que si sigo aplicando la de chatgpt no are nada
// almenos si supiera que hace cada cosa y como se conecta talvez lo aria
// pero para mi ya fue F noma
// tengo que empesar desde 0 no puedo mas