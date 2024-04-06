function mostrarPestana(pestana) {
    // Ocultar todas las pestañas
    const todasLasPestanas = document.querySelectorAll('.pestana');
    todasLasPestanas.forEach(pestana => {
        pestana.style.display = 'none';
    });

    // Mostrar la pestaña seleccionada
    const pestañaSeleccionada = document.getElementById('pestana-' + pestana);
    pestañaSeleccionada.style.display = 'block';
}