// Modal and Form (Open and Close Functions/Listeners)
const formContainer = document.querySelector('.form-container');
const overlayTrigger = document.querySelector('#overlay');
const closeFormBtn = document.querySelector('.close-symbol');
const addBookBtn = document.querySelector('.book-btn');
const formInput = document.querySelector('.form-hidden')

const openForm = () => {
  formContainer.style.display = "block";
  overlayTrigger.style.display = 'block';
};

const closeForm = () => {
  formContainer.style.display = 'none';
  overlayTrigger.style.display = 'none';
  document.querySelector(".form-hidden").reset();
};

addBookBtn.addEventListener('click', openForm);
closeFormBtn.addEventListener('click', closeForm);
overlayTrigger.addEventListener('click', closeForm);


// Step 1: All of your book objects are going to be stored in a simple array
let myLibrary = [];
let book = {};

// Object Constructor
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status; 
}


// Step 2: Add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array. 

const addBookToLibrary = (event) => {
  event.preventDefault();
  //Form Inputs
  const titleInput = document.getElementById('title').value; 
  const authorInput = document.getElementById('author').value;
  const pagesInput = document.getElementById('pages').value; 
  const statusInput = document.getElementById('read-status-info').checked;
  
  book = new Book(titleInput, authorInput, pagesInput, statusInput);
  myLibrary.push(book);
  //Every new Book object gets passed through the display function
  displayBooks(book);
  closeForm();
};

formInput.addEventListener('submit', addBookToLibrary);

// Dynamic Table Headers
const tableContainer = document.querySelector('.table-container')
const authorHeader = document.getElementById('title-author');
const pagesHeader = document.getElementById('title-pages');
const statusHeader = document.getElementById('title-status');
const statusInfo = document.getElementById('read-status-info');
const deleteColumn = document.getElementById('trashcan');

// This function assigns the same class name to each column
const addColumnClass = (column) => {
  column.className ='individual-container';
};

// Step 3: Write a function that loops through the array and displays each book on the page. 

const displayBooks = (newBook) => {
  // Each book will be grouped in its own individual row called rowContainer
  const rowContainer = tableContainer.appendChild(document.createElement('div'));
  rowContainer.setAttribute('data-index', `${myLibrary.indexOf(newBook)}`)
  rowContainer.className = `row-container`;
  
  // Here we are creating title, author, pages, and status columns with their corresponding text and class names
    const titleColumn = rowContainer.appendChild(document.createElement('div'));
    const titleText = document.createTextNode(newBook.title);
    titleColumn.setAttribute('id', 'title-text');
    titleColumn.appendChild(titleText);
    addColumnClass(titleColumn);

    const authorColumn = rowContainer.appendChild(document.createElement('div'));
    const authorText = document.createTextNode(newBook.author);
    authorColumn.appendChild(authorText);
    addColumnClass(authorColumn);

    const pagesColumn = rowContainer.appendChild(document.createElement('div'));
    const pagesText = document.createTextNode(newBook.pages);
    pagesColumn.appendChild(pagesText);
    addColumnClass(pagesColumn);

    const statusColumn = rowContainer.appendChild(document.createElement('div'));
    addColumnClass(statusColumn);
    statusColumn.setAttribute('id', 'status-container');
    statusColumn.addEventListener('click', () => { 
      newBook.status = !newBook.status; 
      updateLibrary();
    });
      if (newBook.status == false) {
        const statusToggle = statusColumn.appendChild(document.createElement('img'));
        statusToggle.src = 'images/xmark-solid.svg';
        statusToggle.classList = 'toggle-unread';
        const statusText = statusColumn.appendChild(document.createElement('p'));
        statusText.textContent = 'UNREAD'; 
      } else if (newBook.status == true) {
          const statusToggle = statusColumn.appendChild(document.createElement('img'));
          statusToggle.src = 'images/check-solid.svg';
          statusToggle.classList = 'toggle-read';
          const statusText = statusColumn.appendChild(document.createElement('p'));
          statusText.textContent = 'READ';
      };

    const trashContainer = rowContainer.appendChild(document.createElement('div'));
    trashContainer.className = 'row-img-container';
    let trashBtn = trashContainer.appendChild(document.createElement('img'));
      trashBtn.src = 'images/trash-solid.svg';    
      trashBtn.className = 'row-img';
      trashBtn.setAttribute('data-index', `${myLibrary.indexOf(newBook)}`);

// Step 4: Add a button on each book’s display to remove the book from the library.
    // removes book objects both visually and from the myLibrary array
    trashBtn.addEventListener('click', function deleteRow() {
      myLibrary.splice(rowContainer.dataset.index, 1);
      rowContainer.remove();
    })
};


// This function clears every book row from the library container using a forEach loop
// Then it repopulates the display with the updated read/unread designation using a for loop
// This will be called when users toggle the read/unread column in order to update each book's read status
const updateLibrary = () => {
  const libraryHeader = document.querySelector('.table-container')
  const libraryItems = document.querySelectorAll('.row-container');
  libraryItems.forEach(libraryItems => libraryHeader.removeChild(libraryItems));
 
  for (let i= 0; i< myLibrary.length; i++){
    displayBooks(myLibrary[i]);
  }
};

