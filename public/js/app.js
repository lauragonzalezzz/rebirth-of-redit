var dataBtn = document.getElementById('dataBtn');
dataBtn.addEventListener('click', function(event){
  event.preventDefault();

  var userInput = document.getElementById('userInput');

  var dataRequest = new XMLHttpRequest();
  dataRequest.addEventListener('load', getData);
  dataRequest.open('GET', "https://www.reddit.com/r/" + userInput.value + ".json");
  dataRequest.send();
});

function getData(){
  var container = document.getElementById('container');
  container.innerHTML = "";

  var allTheThings = JSON.parse(this.responseText);


  for (var i = 0; i < allTheThings.data.children.length; i++){

    var card = document.createElement('div');
    card.className = "card";
    card.id = allTheThings.data.children[i].data.id;
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

    var dateCreated = document.createElement('div');
    var date = new Date(allTheThings.data.children[i].data.created*1000);
    dateCreated.innerHTML = "Created on " + date;
    card.appendChild(dateCreated);

    var author = document.createElement('span');
    author.className = "author";
    author.innerHTML = " by " + allTheThings.data.children[i].data.author;
    dateCreated.appendChild(author);

    if (allTheThings.data.children[i].data.thumbnail !== "self" &&
      allTheThings.data.children[i].data.thumbnail !== "default"){
      var thumbnail = document.createElement('img');
      thumbnail.src = allTheThings.data.children[i].data.thumbnail;
      thumbnail.className = "thumbnail";
      card.appendChild(thumbnail);
    };
    if (allTheThings.data.children[i].data.url.search(".gif") !== -1){
      thumbnail.src = allTheThings.data.children[i].data.url;
    };

  }; //Ends FOR loop


}; //End of getData function


//sort cards by score?
