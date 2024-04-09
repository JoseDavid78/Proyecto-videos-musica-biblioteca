const url = 'https://itunesvolodimir-kudriachenkov1.p.rapidapi.com/searchMusic'; // URL de la api?
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '4c62be50e4msh41c41963f39f872p1a9105jsndd1693db3af4',
		'X-RapidAPI-Host': 'iTunesvolodimir-kudriachenkoV1.p.rapidapi.com'
	},
	body: new URLSearchParams({
		country: '<REQUIRED>',
		term: '<REQUIRED>'
	})
};
// proyecto-videos-musica-biblioteca/frontend/apis/api.music.js
try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

// esta es la primera opcion de la url (https://rapidapi.com/volodimir.kudriachenko/api/iTunes/) recuerda que tienen que ser peticiones a la api que te devuelvan el resultado de lo buscado
