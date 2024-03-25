// importante leer lo que hay en el drive  aun nos falta la api no la emos probado este link es por parte de linkeding es  un 
 // mini tutorial de como usar las tokens de spotify (https://es.linkedin.com/pulse/consumiendo-la-api-de-spotify-en-angular-standalone-francisco-javier)
// dos la base de datos esta incompleta y aun nos falata el como gestionarla ademas de que este bien relacionada
// tres la interfaz que viene siendo el diseño visual de la pagina estamos en 0 ver como podemos usar el figma o canva para hacernos una idea
// cuatro comprobar si las rutas estan bien hechas y si falta alguna otra

const boton = document.querySelector("button");
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

// pregunta a la ia (chatgpt) todo acerca del examen del lunes mandarle el codigo en un solo texto de cada carpeta para asi sabes en que es lo que fallamos y en que podemos mejorar
// tambien que nos enseñe el codigo y q es lo que hace cada linea para aprender mejor
// otra parte a resaltar seria la forma en la que hacer nuestro proyecto que nos de ideas e informacion de que es lo que debemos hacer para poder lograr el proyecto final


const url = 'https://itunesvolodimir-kudriachenkov1.p.rapidapi.com/searchMusic';
const boton2 = document.querySelector("button");
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

const boton3 =document.querySelector("button");

boton3.addEventListener("click", () => {
    const nombreUsuario = resultadoInput.value.trim();

    if (nombreUsuario.length === 0) {
        alert("El usuario es incorrecto o el campo esta bacio")
        return;
    }
    fetch(url + encodeURIComponent(nombreUsuario), {
        method: 'GET',
        headers:{

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

const boton_usuario = document.querySelector(".boton_in");
boton_usuario.addEventListener("click", () => {
    const nombreUsuario = resultadoInput.value.trim();

    if (nombreCancion.length === 0) {
        alert("El usuario es incorrecto")
        return;
    }
    fetch(url + encodeURIComponent(nombreUsuario),{
        method: 'get',
        headers:{

        },
        body:json.stringify({
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
    if (nombreUsuario >= inputResultado) {
        boton = inputResultado;
    } else {
        console.log(inputResultado);
    }
});

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