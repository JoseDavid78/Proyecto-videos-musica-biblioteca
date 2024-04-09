const musica = require('musicmatch')({apikey: "key"});
const artista = require('./artistMondel');
const track = require ('./TrackModel');

function getArtista (req,res) {
    let artista = req.params.name
    musica.artistaSearch({q_artist: artista, page_size: 10})
    .then(function (data) {
        let artista_list = data.message.body.artista_list;
        res.status(200).send(artista_list); 
    }).catch(function (err) {
        res.status(404).send({action: 'get Artista', message: "No se ha encontrado el Artista. ERROR:" + err});
    })
}
// esta es la peticion para traer los artistas


function getTrack (res,req) {
    let track = req.params.title;
    musica.trackSearch({q: track, page: 1, page_size: 10})
    .then(function (data){
        let track_list = data.message.body.track_list;
        res.status(200).send(track_list);
    }).catch(function (err){
        res.status(404).send({action: 'get Tracks', message: "No se han encontrado tracks. ERROR:" + err});
    })
}
// esta es la petcion para traes tracks(aun no sabemos que es investigar)


function getArtistaAlbums(res,req) {
    let artista_id = req.params.artist_id;
    musica.artistaAlbums({artista_id: artista_id, s_release_date: "desc", g_album_name: 1})
    .then(function (data) {
        let album_list = data.message.body.album_list;
        let artista_id = album_list[0].album.artista_id;
        let artista_nombre = album_list[0].album.artista.name;
        updateTopArtista(artista_id, artista_nombre);
        res.status(200).send(album_list);
    }).catch(function (err) {
        res.status(404).send({action: 'get Artista Albun', message: "No se han encontrado albums. ERROR:" + err});
    })
}
// esta es la peticion que tra albums de un autor en concreto y mas especificos su musicas 

// son solo prototipos aun hay que acoplarlos y mejorarlos














