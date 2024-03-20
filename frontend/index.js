const boton = document.querySelector("button");
const resultadoInpùt = document.querySelector("input");

boton.addEventListener("click", () => {
    if (resultadoInpùt.value.length === 0) {
        alert("El campo esta basio");
        return;
    }
    fetch("http://localhost:3000/api/v1/crear", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre: resultadoInpùt.value
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

