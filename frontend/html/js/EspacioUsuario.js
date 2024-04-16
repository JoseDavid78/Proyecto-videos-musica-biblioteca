document.addEventListener('DOMContentLoaded', function() {
    const musicForm = document.getElementById('music-form');
    const musicInput = document.getElementById('music-input');
    const musicLibrary = document.querySelector('.music-library');

    musicForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const songName = musicInput.value.trim();
        if (songName !== '') {
            addSongToLibrary(songName);
            musicInput.value = '';
        }
    });

    function addSongToLibrary(songName) {
        const songElement = document.createElement('div');
        songElement.classList.add('song');
        songElement.textContent = songName;
        musicLibrary.appendChild(songElement);
    }
});