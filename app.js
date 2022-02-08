// Show search result

document.getElementById("search-btn").addEventListener("click", function () {
  const searchInput = document.getElementById("search-input").value;
  const searchResults = document.getElementById("search-results");
  fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
    .then((res) => res.json())
    .then((data) => {
      let albums = data.data;
      albums = albums.slice(0, 10);
      searchResults.innerHTML = "";
      for (let i = 0; i < albums.length; i++) {
        const song = albums[i];
        let srcResults = document.createElement("div");
        srcResults.innerHTML = `<div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <img class="album-img" src="${song.album["cover_medium"]}" alt="">
            <h3 class="lyrics-name">${song.title} <span class="duration">${(
          song.duration / 60
        ).toFixed(2)} min</span</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="{showLyrics('${song.title}','${
          song.artist.name
        }')}" class="btn btn-success">Get Lyrics</button>
          </div>
        </div>`;
        searchResults.appendChild(srcResults);
      }
      // console.log(data.data);
    });
});

// Show lyrics

function showLyrics(title, artist) {
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then((res) => res.json())
    .then((data) => {
      const show_lyrics = document.getElementById("show-lyrics");
      if (data.hasOwnProperty("error")) {
        alert("Lyrics Not Found");
      } else {
        show_lyrics.innerText = `

         ${title} - ${artist}
---------------------------------------------

        ${data.lyrics}`;
        // console.log(data.lyrics);
      }
    });
}
