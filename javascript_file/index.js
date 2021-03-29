
 


var addNewText = document.getElementById('addnewtext');
var addButton = document.getElementById('addbutton');
var noteBook = document.getElementById('notebook');
var searchBtn = document.getElementById('searchbtn');
var searchBox = document.getElementById('searchbox');


// adding event on the search Box for getting value from search box on every key press :
searchBox.addEventListener('keyup',toSearchNotes);

// adding event listner on the add button
addButton.addEventListener('click', addTextToLocalStrorage);


// calling the funtion to show note 
toShowNotesOnScreen();

// method to add the text/notes in the local storage
function addTextToLocalStrorage() {
    // geting the value of the text area using the address of the text area html element
    let dataInFormOfString = localStorage.getItem("noteBooks")
    if (dataInFormOfString == null) 
    {
        var noteBookArray = [];
    }
    else
    {
        noteBookArray = JSON.parse(dataInFormOfString);
    }
    // getting the value of the text area
    let valueFromTextarea = addNewText.value;

    // push the the value of textarea into the array  noteBook
    noteBookArray.push(valueFromTextarea)

    // adding the array as string format to the local storage
    localStorage.setItem("noteBooks", JSON.stringify(noteBookArray));

    addNewText.value="";

    // calling the toShowNoteONScreen function:
    toShowNotesOnScreen();

}

//  method to show the notes of notebook in the screen:

function toShowNotesOnScreen()
{

    // here we are getting the data form the local storage in the form of string
    var dataInFormOfString = localStorage.getItem("noteBooks");
    if(dataInFormOfString.length == null)
    {
        
        var noteBookArray = [];
        document.getElementById('emptynotes').innerText = "please make new notes"
    }
    else
    {
        var noteBookArray = JSON.parse(dataInFormOfString);
    }
    var addNewHtml = ""; 
    noteBookArray.forEach( (value,index,array)=>{
        addNewHtml = `${addNewHtml}  <div class="col-lg-3 col-md-4 col-sm-6 mb-3  tosearch">

        <div class="card">
            <div class="card-body">
              <h5 class="card-title">note ${index+1}</h5>
            <p class="getvalue"> ${value} </P>
            
              <a href="#" class="btn btn-primary  delete-button" id=${index}   onclick="toDeleteNotes(this.id)" >Delete Note</a>
            </div>
        </div>
    </div>`
}
)
noteBook.innerHTML = addNewHtml; 
}

// method to delete the note form the notesBook

function toDeleteNotes(indexOfStoringNote)
{
    var noteBookArray =[];
    var dataInFormOfString =localStorage.getItem("noteBooks")

    

    noteBookArray = JSON.parse(dataInFormOfString);
    // deleting the value in array present at given/particular index:
    noteBookArray.splice(indexOfStoringNote,1);

    // after delte the particular note form the noteBook array ,pass the rest array to the local storage
    localStorage.setItem("noteBooks",JSON.stringify(noteBookArray));
    
  

    toShowNotesOnScreen();
}

// method to search the particular notes:

function toSearchNotes()
{
    // here we are getting the value  of  search box for every event of keypress in the search box 
    const inputVlaueInSearchBox = searchBox.value;

    // here we are getting  an array of the address of the html element(pargraph) present for each notes
    const addressOfAllParagraphInArray=document.getElementsByClassName('getvalue')

    // here we are getting the address of the super parent of the corroponding paragraphs
    const addressOfParentOfParagraphInArray = document.getElementsByClassName('tosearch');
  
  
   for(var i =0; i<addressOfAllParagraphInArray.length;i++)
   {
    var xyz = addressOfAllParagraphInArray[i].innerText;

    if(xyz.search(`${inputVlaueInSearchBox}`) != -1)
      {
        addressOfParentOfParagraphInArray[i].style.display = "block";
      }
      else
      {
        addressOfParentOfParagraphInArray[i].style.display="none"
      }

   }

}

