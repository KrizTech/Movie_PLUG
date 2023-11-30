document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("movie-search-form");
    const movieResults = document.getElementById("movie-results");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const queryInput = document.getElementById("movie-query");
        const movieName = queryInput.value.trim();

        if (movieName.length === 0) {
            alert("Cant take empty string");
            console.log('Query cant be empty');
            return;
        }

        try {
            const response = await fetch(`/movie/search/${encodeURIComponent(movieName)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
	    console.log(data);
             movieResults.innerHTML = "";

            displayMovies(data.d, movieResults);

        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    });
});

// Function to display movies
function displayMovies(movies, container) {
  console.log("Displaying Movies:", movies);

  // Create a movie card for each movie using map and template literals
  const movieCards = movies.map(movie => {
    const { l: name, y: year, i: { imageUrl } = {} } = movie;
    const posterSrc = imageUrl || 'placeholder.jpg';

    return `<ul id="movie-container">
              <h2>${name}</h2>
              <p>Year: ${year}</p>
              <img src="${posterSrc}" alt="${name}">
            </ul>`;
  });

  // Create an unordered list and append movie cards
  const movieList = document.createElement("ul");
  movieList.classList.add("movie-list");
  movieList.innerHTML = movieCards.join('');

  // Append the movie list to the container
  container.appendChild(movieList);
}
