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

export {
    validacionForm,
    fetchData
};