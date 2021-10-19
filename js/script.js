var moviesParsed = JSON.parse(movies); //Array mit Filme aus JSON
var sort_direction = "down"; //Variable für Sortierrichtung

//Likes hinzufügen
function addLike() {
  var current_likes = this.nextSibling.innerHTML;
  var new_likes = parseInt(current_likes) + 1;
  this.nextSibling.innerHTML = new_likes;
  var movie_id = this.id.slice(-1);
  moviesParsed[movie_id].likes = new_likes;
}

//Werte vergleichen
function sortMoviesArray(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

//Symbol der Sortierung ändern und Aufruf zur Neugenerierung der Tabelle
function sortMovies() {
  //wenn die webseite geöffnet wird, sortiere absteigend
  // symbol auf absteigend ändern
  //wenn geklickt wird, richtung umkehren

  if (sort_direction == "down") {
    sort_direction = "up";
    document
      .getElementById("icon-direction")
      .classList.replace("bi-caret-down-fill", "bi-caret-up-fill");
  } else {
    sort_direction = "down";
    document
      .getElementById("icon-direction")
      .classList.replace("bi-caret-up-fill", "bi-caret-down-fill");
  }

  drawMoviesTable(sort_direction);
}

//Tabelle mit Filminformation erstellen - abhängig von der aktuellen Sortierung
function drawMoviesTable(sort_direction) {
  if (sort_direction == "down") { //wenn sort_direction gleich "down" ist
    moviesParsed.reverse(sortMoviesArray("likes")); //sortiere die Liste moviesParsed aufsteigend
  } else { //falls sort_direction nicht "down" ist
    moviesParsed.sort(sortMoviesArray("likes")); //sortiere die Liste moviesParsed absteigend
  }


  //überschreibe den Inhalt von dem Element "movieTable" mit einem leeren Text = Inhalt LÖSCHEN
  document.getElementById("movieTable").innerHTML = ""; 

  // ------> bis Schleife gekommen -------------------------------------------------------------------------
  for (let [index, movie] of moviesParsed.entries()) {
    document.getElementById("movieTable").innerHTML += `
      <div class="col">
      <div class="row m-1 p-2  border border-dark row-cols-2 row-cols-sm-2 row-cols-md-1 h-100">
  
      <div class="card">
      <img src="${movie.image}" class="card-img-top" />
      <div class="card-body">
          <h6 class="card-title">${movie.movieName}</h6>
          <p id="description">${movie.description} </p>
          <p id="like"><button id="like-btn-${index}" class="btn btn-success btn-sm"><i class="bi bi-hand-thumbs-up-fill">Like</i> </button><span id="likeDisplay" class="badge rounded-circle bg-success">${movie.likes}</span></p>
          
      </div>
      </div>
      </div>
      </div>
  `;
  }
  var like_elements = document.querySelectorAll("[id^=like-btn-]");
  for (let [index, like] of like_elements.entries()) {
    like.addEventListener("click", addLike);
  }
}

//Tabelle mit Filminformation bei Start abwärts sortiert erstellen
drawMoviesTable(sort_direction); //starte Funktion drawMoviesTable und übergebe Parameter sort_direction zb "down"
//Event-Listener für Sortierung erstellen
document.getElementById("btn-sort").addEventListener("click", sortMovies);
