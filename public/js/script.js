document.addEventListener("DOMContentLoaded", async function () {
  console.log("Search.html DOMContentLoaded");

  const searchForm = document.getElementById("movie-search-form");
  const movieResults = document.getElementById("movie-results");

  // Check if there's a movie query sent from the dashboard
  const urlParams = new URLSearchParams(window.location.search);
  const dashboardQuery = urlParams.get("dashboardQuery");
  console.log("Dashboard Query:", dashboardQuery);

  if (dashboardQuery && dashboardQuery.trim() !== "") {
    // Use the dashboard query to fetch results
    try {
      console.log("Fetching results for Dashboard Query:", dashboardQuery);
      const response = await fetch(`/movie/search/${encodeURIComponent(dashboardQuery)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      displayMovies(data.d, movieResults);

      // Clear the dashboard query parameter
      const urlWithoutDashboardQuery = window.location.href.split('?')[0];
      window.history.replaceState({}, document.title, urlWithoutDashboardQuery);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }
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
