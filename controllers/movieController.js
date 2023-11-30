const fetch = require('node-fetch');
const config = require('../utils/config');

exports.movieSearch = async (req, res) => {
  const movie = req.params.movie;
  console.log(movie);
  if (!movie) {
    return res.status(400).json({ error: 'Movie query is required' });
  }

  const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${movie}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': config.rapidApiKey,
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Serverside: Failed to fetch movie data');
    }

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Serverside:Failed to fetch movie data' });
  }
};
