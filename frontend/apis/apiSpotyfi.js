const boton = document.querySelector("button");
const resultadoInput = document.querySelector("input");
const apiURL = "https://spotify23.p.rapidapi.com/search/?q=";

boton.addEventListener("click", () => {
    const nombreCancion = resultadoInput.value.trim();

    if (nombreCancion.length === 0) {
        alert("El campo está vacío");
        return;
    }
    fetch(apiURL + encodeURIComponent(nombreCancion) + "&type=multi&offset=0&limit=10&numberOfTopResults=5", {
        method: "GET",
        headers: {
            "x-rapidapi-host": "spotify23.p.rapidapi.com",
            "x-rapidapi-key": "<TU_CLAVE_API_RAPIDAPI>",
            "useQueryString": true
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => alert(error));
});