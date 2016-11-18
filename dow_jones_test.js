var boinga = false;
window.onload = function(){
 loadFile();
 document.getElementById("boinga").addEventListener('click', function() {
    boinga = true;
    var content = document.getElementById("content")
    document.getElementById("page-header").innerHTML = "BOINGA";
    while(content.firstChild){
      content.removeChild(content.firstChild);
    }
    loadFile();
  });

 document.getElementById("unboinga").addEventListener('click', function() {
    boinga = false;
    var content = document.getElementById("content")
    document.getElementById("page-header").innerHTML = "World";
    while(content.firstChild){
      content.removeChild(content.firstChild);
    }
    loadFile();
  });

}
function loadFile(){
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      var stories = JSON.parse(this.responseText);
      createSections(stories)
    }
  };
  xmlRequest.open("GET", "dow_jones_test.php", true);
  xmlRequest.send();
}
function makeNode(nodeType, nodeText, nodeChild, nodeClassname, nodeHref, nodeSource){
  var node = document.createElement(nodeType);
  node.className += nodeClassname;
  if(nodeText){
    if(boinga){
      nodeText = translate(nodeText);
    }
    node.appendChild(document.createTextNode(nodeText));
  }
  if(nodeChild){
    node.appendChild(nodeChild);
  }
  if(nodeHref){
    node.href = nodeHref;
  }
  if(nodeSource){
    node.src = nodeSource;
  }
  return node;
}
function translate(string){
  var highBoing = /[A-Z][A-z]{3,}/;
  var lowBoing = /[a-z]{3,}/;
  var threeLetterLow = new RegExp(lowBoing, 'g');
  var threeLetterHigh = new RegExp(highBoing, 'g');
  var newString = string.replace(threeLetterLow, "boinga");
  newString = newString.replace(threeLetterHigh, "Boinga");
  return newString
}
function createSections(stories){
  var index = "strap";
  storyContainer =  document.createElement("DIV");

  for(var i = 0; i < stories.length; i++){
    var storiesSection = document.createElement("DIV");
    storiesSection.className += "story-section";
    //sectionHeader.appendChild(sectionTitle);
    storiesSection.appendChild(makeNode("H2", stories[i][index], null, "section-header", null, null ));
    storiesSection.appendChild(createStoryList(stories[i]["headlines"]));
    storyContainer.appendChild(storiesSection);
  }
  document.getElementById("content").appendChild(storyContainer);
}
function createStoryList(sectionStories){
  var storyList = document.createElement("UL");
  storyList.className += "story-list"
  for(var i = 0; i < sectionStories.length; i++){
    var storyListElement = document.createElement("LI");
    storyListElement.className += "story-list-item";
    var storyHeadlineLink = makeNode("A", sectionStories[i]["headline"], null, "story-headline-link", sectionStories[i]["desktop_url"], null);
    var storyHeadline = makeNode("H3", null, storyHeadlineLink, "story-headline", null, null );
    if(sectionStories[i]["image"]){
      storyListElement.appendChild(makeNode("IMG", null, null, "story-image", null, sectionStories[i]["image"]));
    }
    storyListElement.appendChild(storyHeadline);
     if(sectionStories[i]["text"]){
      storyListElement.appendChild(makeNode("P", sectionStories[i]["text"], null, "story-slug", null, null));
    }

    storyListElement.appendChild(makeNode("P", sectionStories[i]["byline"], null, "story-byline" ));
    storyListElement.appendChild(makeNode("P", new Date(sectionStories[i]["date"]).toLocaleString(), null, "story-date" ));
    storyList.appendChild(storyListElement);
  }
  return storyList;
}

