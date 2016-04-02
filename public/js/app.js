var dataBtn = document.getElementById('dataBtn');
dataBtn.addEventListener('click', function(event){
  event.preventDefault();

  var dataRequest = new XMLHttpRequest();
  dataRequest.addEventListener('load', getData);
  dataRequest.open('GET', "https://www.reddit.com/r/javascript.json");
  dataRequest.send();
});

function getData(){
  var allTheThings = JSON.parse(this.responseText);

  var container = document.getElementById('container');

  for (var i = 0; i < allTheThings.data.children.length; i++){

    var card = document.createElement('div');
    card.className = "card";
    card.id = "card" + i;
    container.appendChild(card);

    var title = document.createElement('div');
    title.innerHTML = "<a href='" + allTheThings.data.children[i].data.url + "'>" + allTheThings.data.children[i].data.title + "</a>";
    title.id = allTheThings.data.children[i].data.created;
    card.appendChild(title);

    if (allTheThings.data.children[i].data.stickied === true){
      var sticky = document.createElement('span');
      sticky.innerHTML = " STICKY!";
      title.appendChild(sticky);
    };

    var score = document.createElement('div');
    score.innerHTML = allTheThings.data.children[i].data.score;
    score.className = "score";
    card.appendChild(score);

    if (score < 100){
      score.classList.add('excellentScore');
    };





  }; //Ends FOR loop


}; //End of getData function


//sort cards by score?
