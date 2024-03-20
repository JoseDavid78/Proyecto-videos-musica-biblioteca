const boton = document.querySelector("button");
const resultadoInpùt = document.querySelector("input");

const url = "//http:/localhost/3000/api/v1";

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


// este es el input de texto y el boton que se conectara a la api par abuscar la musica que quieres o buscas


