let card = document.querySelector(".movies-grid");
let form = document.getElementById("searchForm");
let text = document.getElementById("searchInput");

form.addEventListener("submit", event => {
    event.preventDefault();

    card.innerHTML = "";

    let API = `https://www.omdbapi.com/?s=${text.value}&apikey=d1c25dcd`;

    fetch(API)
        .then(res => res.json())
        .then(data => {
            if (!data.Search) {
                card.innerHTML = "<p>No movies found.</p>";
                return;
            }

            data.Search.forEach(movie => {
                let div = document.createElement("div");
                div.className = "movie-card";

                let img = document.createElement("img");
                img.src = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image";
                img.className = "movie-poster";

                let name = document.createElement("h2");
                name.textContent = movie.Title;
                name.className = "movie-title";

                let year = document.createElement("p");
                year.textContent = movie.Year
                year.className = "movie-year";

                let desc = document.createElement("p");
                desc.textContent = movie.Type.replace(/\b\w/g, c => c.toUpperCase());
                desc.className = "movie-details";

                div.appendChild(img);
                div.appendChild(name);
                div.appendChild(year);
                div.appendChild(desc);
                card.appendChild(div);
            });
        });
});
