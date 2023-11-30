const fetch = require('node-fetch');

async function tester (req, res) {
const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'bc579c69a3msh5488c4b48da0464p11ec5ejsnc2fdee9c50e4',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}
};

tester();
