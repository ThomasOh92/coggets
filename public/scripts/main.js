function addStickyNote(){ // function to add more sticky notes
  var bigPiece = document.getElementById('Pieces');
  var x = document.createElement("TEXTAREA");
  x.rows="8";
  x.cols="16";
  bigPiece.appendChild(x);
}

function addForm(){ //function to add more forms
    var bigPiece = document.getElementById('Pieces'); //grabs the pieces element, which is an unordered list
    var formNode = document.createElement("FORM"); //  dynamically creates a new form element
      formNode.setAttribute('method', "POST");
      formNode.setAttribute('action', "/");
    var i = document.createElement("input"); //input element, text
      i.setAttribute('type',"text");
      i.setAttribute('name',"newArticle");
    var s = document.createElement("input"); //input element, Submit button
      s.setAttribute('type',"submit");
      s.setAttribute('value',"Save URL");
    formNode.appendChild(i);
    formNode.appendChild(s);
    bigPiece.appendChild(formNode); //appends the form element to the pieces element
}

var saveArticle = document.getElementById("newArticle").value; // grabs the text from the first form
$.get(saveArticle, function(response) {
  console.log(response);
});

//2. Follow the instructions in the article to try and grab some cross origin
var name = "codemzy";
