const apiURL = "http://localhost:3000/api/v1/"; // esta es la url a la que hay que mandar a spotify para que se redireccione y pueda acceder a nuestro codigo
const spotify_token_key_LS = "BQDjIVRLtolOMzvxBylb1bpZk4HyXmkKrnzd-DFpQ9FSa897RNToTV98Zy8j0skm9wVl8KtrgkGC4fWIRTNI3eM6kWkeKp9acfq4J5bl0La3yRyoB28";
const login_token_key_LS = "Bearer";


export {
  apiURL,
  spotify_token_key_LS,
  login_token_key_LS
};

// buscar en youtube como sacar el token hay te lo indica
// instalar postman para hacer pruebas de el token y el acceso
// aqui la url que te dice como obtener el token  https://es.linkedin.com/pulse/consumiendo-la-api-de-spotify-en-angular-standalone-francisco-javier