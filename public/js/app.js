var container = document.getElementById('container');

var header = document.getElementById('header');
var logo = document.createElement('img');
logo.src = 'https://redditupvoted.files.wordpress.com/2015/09/snoo-with-all-the-balloons.png';
logo.className = "logo";
header.appendChild(logo);


var dataBtn = document.getElementById('dataBtn');
dataBtn.addEventListener('click', function(event){
  event.preventDefault();

  var userInput = document.getElementById('userInput');
  if (userInput.value.search(" ") !== -1){
    userInput.value = userInput.value.replace(/\s/g, '');
  }

  var dataRequest = new XMLHttpRequest();
  dataRequest.addEventListener('load', getData);
  dataRequest.open('GET', "https://www.reddit.com/r/" + userInput.value + ".json");
  dataRequest.send();
});

function getData(){
  container.innerHTML = "";

  userInput.value = '';


  var allTheThings = JSON.parse(this.responseText);


  for (var i = 0; i < allTheThings.data.children.length; i++){

    var card = document.createElement('div');
    card.className = "card";
    card.classList.add('panel');
    card.classList.add('panel-default');
    card.id = allTheThings.data.children[i].data.id;
    container.appendChild(card);

    var title = document.createElement('div');
    // var titleLink = document.createElement('a');
    // titleLink.href = allTheThings.data.children[i].data.url;
    // title.appendChild(titleLink)
    title.innerHTML = "<a href='" + allTheThings.data.children[i].data.url + "'>" + allTheThings.data.children[i].data.title + "</a>";
    title.id = allTheThings.data.children[i].data.created;
    title.className = 'title';
    title.classList.add('panel-heading')
    card.appendChild(title);

    if (allTheThings.data.children[i].data.stickied === true){
      var sticky = document.createElement('span');
      sticky.innerHTML = " STICKY!";
      title.appendChild(sticky);
    };

    var panelBody = document.createElement('div');
    panelBody.classList.add('panel-body');
    card.appendChild(panelBody);

    var dateCreated = document.createElement('div');
    var date = new Date(allTheThings.data.children[i].data.created*1000);
    dateCreated.innerHTML = "Created on " + date;
    panelBody.appendChild(dateCreated);

    var author = document.createElement('span');
    author.className = "author";
    author.innerHTML = " by " + allTheThings.data.children[i].data.author;
    dateCreated.appendChild(author);

    if (allTheThings.data.children[i].data.thumbnail !== "self" &&
      allTheThings.data.children[i].data.thumbnail !== "default"){
      var thumbnail = document.createElement('img');
      thumbnail.src = allTheThings.data.children[i].data.preview.images[0].source.url;
      thumbnail.className = "thumbnail";
      thumbnail.classList.add('img-responsive');
      panelBody.appendChild(thumbnail);
    };
    if ((allTheThings.data.children[i].data.url.search(".gif") !== -1) && (allTheThings.data.children[i].data.url.search(".gifv")) === -1){
      thumbnail.src = allTheThings.data.children[i].data.url;
    };

    // var testOuterPanelDiv = document.createElement('div');
    // testOuterPanelDiv.classList.add('panel');
    // testOuterPanelDiv.classList.add('panel-default');
    // container.appendChild(testOuterPanelDiv);

    // var testPanelHeading = document.createElement('div');
    // testPanelHeading.innerHTML = "Hello World"
    // testPanelHeading.classList.add('panel-heading');
    // testOuterPanelDiv.appendChild(testPanelHeading);

    // var testPanelBody = document.createElement('div');
    // testPanelBody.innerHTML = "Hi I'm Laura";
    // testPanelBody.classList.add('panel-body');
    // testOuterPanelDiv.appendChild(testPanelBody);

  }; //Ends FOR loop


}; //End of getData function


//sort cards by score?
