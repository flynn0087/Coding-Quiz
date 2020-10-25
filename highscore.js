function displayHighscores() {
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      let listItem = document.createElement("li");
      listItem.textContent = score.initials + " - " + score.score; 
      let olEl = document.getElementById("highscores");
      olEl.appendChild(listItem);
    });
  }
  
  function resetHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("reset").onclick = resetHighscores;
  displayHighscores();