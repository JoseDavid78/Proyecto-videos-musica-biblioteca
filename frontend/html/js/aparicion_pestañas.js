// Botones de Inicio

function mostrarPestana(pestana) {
    const todasLasPestanas = document.querySelectorAll('.pestana'); // Oculta todas las pestañas
    todasLasPestanas.forEach(pestana => {
        pestana.style.display = 'none';
    });

    const pestañaSeleccionada = document.getElementById('pestana-' + pestana); // Muestrar la pestaña seleccionada
    pestañaSeleccionada.style.display = 'block';
}