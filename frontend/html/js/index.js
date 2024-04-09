// importante leer lo que hay en el drive  aun nos falta la api no la emos probado este link es por parte de linkeding es  un 
// mini tutorial de como usar las tokens de spotify (https://es.linkedin.com/pulse/consumiendo-la-api-de-spotify-en-angular-standalone-francisco-javier)
// dos la base de datos esta incompleta y aun nos falata el como gestionarla ademas de que este bien relacionada
// tres la interfaz que viene siendo el diseño visual de la pagina estamos en 0 ver como podemos usar el figma o canva para hacernos una idea
// cuatro comprobar si las rutas estan bien hechas y si falta alguna otra

const boton = document.querySelector("#music");
const resultadoInput = document.querySelector("input");
const apiurl = "https://spotify23.p.rapidapi.com/search/?q=";

boton.addEventListener("click", () => {
    const nombreCancion = resultadoInput.value.trim();

    if (nombreCancion.length === 0) {
        alert("El campo esta basio");
        return;
    }
    fetch(apiurl + encodeURIComponent(nombreCancion) + "&type=multi&offset=0&limit=10&numberOfTopResults=5", {
        method: "get",
        headers: {
            "x-rapidapi-host": "spotify23.p.rapidapi.com",
            "x-rapidapi-key": "<TU_CLAVE_API_RAPIDAPI>",
            "useQueryString": true
        },
        body: JSON.stringify({
            nombre: resultadoInput.value
        })
    })

        .then(res => res.json())
        .then(msg => {
            console.log(msg.mensaje);
            setTimeout(() => {
                location.reload();
            }, 3000);
        })
        .catch(error => alert(error));
});

// mejorar esta parte de codigo y acoplarlo al proyecto

// este es el input de texto y el boton que se conectara a la api par abuscar la musica que quieres o buscas

// tambien que nos enseñe el codigo y q es lo que hace cada linea para aprender mejor
// otra parte a resaltar seria la forma en la que hacer nuestro proyecto que nos de ideas e informacion de que es lo que debemos hacer para poder lograr el proyecto final


const url = 'https://itunesvolodimir-kudriachenkov1.p.rapidapi.com/searchMusic';
const boton2 = document.querySelector("#vide");
const inputResultado = document.querySelector("input");

boton2.addEventListener("click", () => {
    const nombreVideo = resultadoInput.value.trim();

    if (nombreVideo.length === 0) {
        alert("El campo esta basio")
        return;
    }
    fetch(url + encodeURIComponent(nombreVideo), {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '4c62be50e4msh41c41963f39f872p1a9105jsndd1693db3af4',
            'X-RapidAPI-Host': 'iTunesvolodimir-kudriachenkoV1.p.rapidapi.com'
        },
        body: JSON.stringify({
            nombre: resultadoInput.value
        })
    })
        .then(res => res.json())
        .then(msg => {
            console.log(msg.mensaje);
            setTimeout(() => {
                location.reload();
            }, 3000);
        })
        .catch(error => alert(error));
});

// Boton de usuario

const boton3 = document.querySelector("#usua");

boton3.addEventListener("click", () => {
    const nombreUsuario = resultadoInput.value.trim();

    if (nombreUsuario.length === 0) {
        alert("El usuario es incorrecto o el campo esta bacio")
        return;
    }
    fetch(url + encodeURIComponent(nombreUsuario), {
        method: 'GET',
        headers: {

        },
        body: JSON.stringify({
            nombre: resultadoInput.value
        })
    })
        .then(res => res.json())
        .then(msg => {
            console.log(msg.mensaje);
            setTimeout(() => {
                location.reload();
            }, 3000);
        })
        .catch(error => alert(error));
});

// Boton de registro

const boton_usuario = document.querySelector("#boton_registro");

boton_usuario.addEventListener("click", () => {
    const nombreUsuario = resultadoInput.value.trim();

    if (nombreCancion.length === 0) {
        alert("El usuario es incorrecto")
        return;
    }
    fetch(url + encodeURIComponent(nombreUsuario), {
        method: 'get',
        headers: {

        },
        body: json.stringify({
            nombre: resultadoInput.value
        })
    })
        .then(res => res.json())
        .then(msg => {
            console.log(msg.mensaje);
            setTimeout(() => {
                location.reload();
            }, 3000);
        })
        .catch(error => alert(error));
});
// Boton de entrada
const boton_entrada = document.querySelector("#boton_entrada");
boton_entrada.addEventListener("click", () => {
    const entrada = resultadoInput.value.trim();

    if (entrada.length == 0) {
        alert("Los campos estan vacios o no coinsiden")
        return;
    }
    fetch(url + encodeURIComponent(nombreUsuario), {
        method: 'get',
        headers: {

        },
        body: json.stringify({
            nombre: resultadoInput.value
        })
    })

        .then(res => res.json())
        .then(msg => {
            console.log(msg.mensaje);
            setTimeout(() => {
                location.reload();
            }, 3000);
        })
        .catch(error => alert(error));
});


// posible boton que devuelva la musica / video

miFormatoDiv.forEach((formatoDiv) => {
    formatoDiv.addEventListener("click", e => {
        isSpotifyTokenLocalStorage();
        const loginToken = getDataInLocalStorage(login_token_key_ls);
        fetchData(apiURL + "getAlbumsDB?formato=" + e.targeta.id, "get", false, false, loginToken)
            .then(res => {
                if (res.status === 401) {
                    removeDataInLocalStoreage(spotify_token_key_ls);
                    isSpotifyTokenLocalStorage();
                    return;
                }
                if (res.status === 403) {
                    removeDataInLocalStoreage(login_token_key_ls);
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
                    <h2><i>Todabia no has guardado ningun albun de este formato en tu biblioteca</i></h2>
                    <a href="./albuns.HTML">->Volver a mi biblioteca</a>
                </article>
                `;
                    return;
                }
                miFormatoDiv.innerHTML = 
                "<h4>Listado de albunes de bandas" + res.bandAlbuns[0].albumInfo.formato + "</h4>";
                const uniqueBands = [ ...new Set(res.bandAlbuns.map(item => item.bandAlbuns)) ];
                for (let i = 0; i < uniqueBands.length; i++) {
                  miFormatoDiv.innerHTML += `<b><a href="#" id="${uniqueBands[i]}">->${i + 1}- ${uniqueBands[i]}</a></b>`;
                }
                miFormatoDiv.innerHTML += `<a href="./albuns.html">->Volver a mi biblioteca</a>`;
                next(res.bandAlbuns, res.bandAlbuns[0].albumInfo.formato); 
            });
    });
});

// prototipo de borrado de albunes/musica/video

function deleteAlbumDB(resultDivAlbuns, formato) {
    const btnaddalbun = resultDivAlbuns.querySelectorAll("./albun_boton");
    btnaddalbun.forEach((btn) => {
        btn.addEventListener("click", async (evento) => {
            Swal.fire({
                title: "Seguro quieres eliminar este albun de tu biblioteca?",
                text: "",
                icon: "",
                showCancelButton: true,
                confirmButtonColor: "cadetblue",
                showCancelButtonColor: "rgb(255 95 95)",
                confirmButtonText: "SI!" 
            }).then((result) => {
                if (result.isConfirmed) {
                    const login_token = getDataInLocalStorage(login_token_key_ls);
                    fetchData(apiURL + "deleteAlbumDB", "delete", { albumID: evento.target.id, formato }, false, login_token)
                    .then((res) => {
                        if (res.status === 401) {
                            removeDataInLocalStoreage(spotify_token_key_ls);
                            isSpotifyTokenLocalStorage();
                            return;
                        }
                        if (res.status === 403) {
                            removeDataInLocalStoreage(login_token_key_ls);
                            isLoginTokenInLocalStorage();
                            return;
                        }
                        if (res.status === 500) {
                            showNotification("error", res.message);
                            return;
                        }
                        Swal.fire({
                            title: "album borrado",
                            text: res.message,
                            icon: "success"
                        }).then(() => location.reload())
                    });
                }
            });
        });
    });
}
// estos son los posibles botones con falta de ajustes y darle sentido a cada uno
// aun hay que darle sentido a los inputs los nombres que le puse en el html y creo que faltan mas botones que no tienen codigo en js













// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': '4c62be50e4msh41c41963f39f872p1a9105jsndd1693db3af4',
// 		'X-RapidAPI-Host': 'iTunesvolodimir-kudriachenkoV1.p.rapidapi.com'
// 	},
// 	body: new URLSearchParams({
// 		country: '<REQUIRED>',
// 		term: '<REQUIRED>'
// 	})
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }


// esto es el posible procesador de musica
// ya que tengo que analizar el de spotify
// analizar el codigo con chat gpt

// el codigo del segundo boton es el posible codigo de musica par ahcer las peticiones

// ver paginas similares a la que queremos ahcer y mas opciones botones estilos y demas

// en caso de que sobre el tiempo intentar hacer la barra de reproduccion de sonido
// botones de control de audio SVG, reproductor de musica SVG