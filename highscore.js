//this is the function that display the scores, including ordering them
function displayHighscores() {
  let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });
  
  //this creates the list of highscores
  highscores.forEach(function(score) {
    let listItem = document.createElement("li");
    listItem.textContent = score.initials + " - " + score.score; 
    let olEl = document.getElementById("highscores");
    olEl.appendChild(listItem);
  });
}
  
  //this function reset the highscores
function resetHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

//this link the button click of reset to the function
document.getElementById("reset").onclick = resetHighscores;
// this activates the function display highschores
displayHighscores();