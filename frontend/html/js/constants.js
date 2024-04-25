const apiURL = "http://localhost:3000/api/v1/"; // esta es la url a la que hay que mandar a spotify para que se redireccione y pueda acceder a nuestro codigo
const spotify_token_key_LS = "BQDjIVRLtolOMzvxBylb1bpZk4HyXmkKrnzd-DFpQ9FSa897RNToTV98Zy8j0skm9wVl8KtrgkGC4fWIRTNI3eM6kWkeKp9acfq4J5bl0La3yRyoB28"; // El token se gasta en una hora, 
// no se cual es el interbalo para que se vuelva a generar pero se puede mas de uno al dia
const login_token_key_LS = "Bearer";


export {
  apiURL,
  spotify_token_key_LS,
  login_token_key_LS
};

// alparcer essta guiado directamento por urls a cierto posiblemente todo aya que hacerlo con post man no se como hacerlo con codigo normal

export class SpotifyService {
  constructor(private _http: HttpClient ) { }
  public res: any = {};
  public TOKEN = "BQDjIVRLtolOMzvxBylb1bpZk4HyXmkKrnzd-DFpQ9FSa897RNToTV98Zy8j0skm9wVl8KtrgkGC4fWIRTNI3eM6kWkeKp9acfq4J5bl0La3yRyoB28"; // El token se gasta en una hora, 
  // no se cual es el interbalo para que se vuelva a generar pero se puede mas de uno al dia
  public infoMapeada: song[] = [];
  public infoMapeadaTopTracks: song[] - [];
  public getArtistsAndAlbums(); song[] {

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.TOKEN}`
  })
  this._http.get('https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album',
  { headers })
  .subscribe(data => {
    this.res = data;
    const { albums } = this.res
    albums.items.forEach((item: any) => {
      const infoObject = {
        image: item.images[0].url,
        name: item.name
      }
      this.infoMapeada.push(infoObject)
    });
  })
  return this.infoMapeada;
  }
  public getArtistsTopTracks(): song[] {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.TOKEN}` 
      })
      this._http.get('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n', { headers })
      .subscribe((data: any) => {
        let { tracks } = data;
        tracks.items.forEach((item: any) => {
          const finalObjet = {
            image: item.track.album.images[0].url,
            name: item.track.album.name
          }
          console.log(finalObjet)
          this.infoMapeadaTopTracks.push(finalObjet)
        })
      })
      return this.infoMapeadaTopTracks;
  }
}


// Este es el codigo que creo que necesitamos pero esta en el lenguaje de programacion de Angular
// necesitamso comvertirlo
// hay mas detalles en la apgina de linkeding URL en abajo ultima linea


// buscar en youtube como sacar el token hay te lo indica
// instalar postman para hacer pruebas de el token y el acceso
// aqui la url que te dice como obtener el token  https://es.linkedin.com/pulse/consumiendo-la-api-de-spotify-en-angular-standalone-francisco-javier