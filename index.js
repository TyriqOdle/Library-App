

 //Constructor
 function Book(title, author, pages,genre, year, read) {
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages 
    this.genre = genre
    this.year = year
    this.read = read
  }
  
  Book.prototype.toggleRead = function() {
    this.read = !this.read;
  };
  
const myLibrary = [];

addBookToLibrary("Defending Jacob", "William Landay", 464 ,"Drama", 2012, false)
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281 ,"Classic Fiction", 1960, true)



//Display the stuff on the page.
myLibrary.map(displayBooks)

function addBookToLibrary(title, author, pages,genre, year, read) {
  const book = new Book(title, author,pages, genre,year,read)

  myLibrary.push(book)

  console.log(myLibrary)
}





function displayBooks(book){
    //Getting the Elements from the DOM
    let display = document.querySelector(".library")

    let bookCard = document.createElement("div")
    bookCard.setAttribute("class","book-card")
    let bookTop = document.createElement("div")
    bookTop.setAttribute("class","book-card-header")
    let bookTitle = document.createElement("h3")
    bookTitle.setAttribute("class","book-title")
    let bookAuthor = document.createElement("p")
    bookAuthor.setAttribute("class","book-author")
    let readStatus = document.createElement("div")
    readStatus.setAttribute("class","read-status")
    let bookBody = document.createElement("div")
    bookBody.setAttribute("class","book-card-body")

    // Book details section
    let bookDetails = document.createElement("div")
    bookDetails.setAttribute("class", "book-details")

    // Pages detail
    let pagesDetail = document.createElement("div")
    pagesDetail.setAttribute("class", "book-detail")
    let pagesLabel = document.createElement("span")
    pagesLabel.setAttribute("class", "detail-label")
    pagesLabel.textContent = "Pages"
    let pagesValue = document.createElement("span")
    pagesValue.setAttribute("class", "detail-value")
    pagesDetail.appendChild(pagesLabel)
    pagesDetail.appendChild(pagesValue)

    // Genre detail
    let genreDetail = document.createElement("div")
    genreDetail.setAttribute("class", "book-detail")
    let genreLabel = document.createElement("span")
    genreLabel.setAttribute("class", "detail-label")
    genreLabel.textContent = "Genre"
    let genreValue = document.createElement("span")
    genreValue.setAttribute("class", "detail-value")
    genreDetail.appendChild(genreLabel)
    genreDetail.appendChild(genreValue)

    // Year detail
    let yearDetail = document.createElement("div")
    yearDetail.setAttribute("class", "book-detail")
    let yearLabel = document.createElement("span")
    yearLabel.setAttribute("class", "detail-label")
    yearLabel.textContent = "Year"
    let yearValue = document.createElement("span")
    yearValue.setAttribute("class", "detail-value")
    yearDetail.appendChild(yearLabel)
    yearDetail.appendChild(yearValue)

    // Add all details to book details section
    bookDetails.appendChild(pagesDetail)
    bookDetails.appendChild(genreDetail)
    bookDetails.appendChild(yearDetail)

    // Book actions section
    let bookActions = document.createElement("div")
    bookActions.setAttribute("class", "book-actions")
    let toggleReadBtn = document.createElement("button")
    toggleReadBtn.setAttribute("data-id", book.id);
    toggleReadBtn.textContent = book.read ? "Mark as Unread" : "Mark as Read"
    toggleReadBtn.setAttribute("class", "btn-toggle-read")

    //Event Listener for the Toggle Button.
    toggleReadBtn.setAttribute("data-id", book.id);

    toggleReadBtn.addEventListener("click", (e) => {
      const bookId = e.target.dataset.id
      const book = myLibrary.find((b) => b.id === bookId)
      if (book) {
        book.toggleRead();
        updateLibrary(); 
      }
    });

    //Delete Button
    let delBtn = document.createElement("button")
    delBtn.setAttribute("class", "btn-delete")
    delBtn.textContent = "Delete"
    delBtn.setAttribute("data-id", book.id)

    //Delete Button Event Listener
    delBtn.addEventListener("click", (e) =>{
      const bookId = e.target.dataset.id
      const book = myLibrary.find((b) => b.id === bookId)

      let index = myLibrary.indexOf(book)
      myLibrary.splice(index,1)

      updateLibrary()
    })


  
    bookActions.appendChild(toggleReadBtn)
    bookActions.appendChild(delBtn)

    //Assigning Values
    bookTitle.textContent = book.title
    bookAuthor.textContent = book.author
    readStatus.textContent = book.read

    pagesValue.textContent = book.pages
    genreValue.textContent = book.genre
    yearValue.textContent = book.year


    // Assemble the book card
    bookTop.appendChild(bookTitle)
    bookTop.appendChild(bookAuthor)
    bookTop.appendChild(readStatus)

    bookBody.appendChild(bookDetails)
    bookBody.appendChild(bookActions)

    bookCard.appendChild(bookTop)
    bookCard.appendChild(bookBody)

    //Displaying on the Page
    display.appendChild(bookCard)
}

function updateLibrary(){
  const display = document.querySelector(".library");
  display.innerHTML = ""; // Clear existing cards
  myLibrary.forEach((book) => {
    displayBooks(book); // Re-add each book to the page
  });
}

function addNewBook(){
  //Making the form visable
  newBookModal.style.display = 'flex'

  //Event listeners for closing the menu
  let cancelButton = document.querySelector(".btn-cancel")
  let closeBtn = document.querySelector(".close-btn")

  closeBtn.addEventListener("click",() =>{
    newBookModal.style.display = 'none'
    })

  cancelButton.addEventListener("click",() =>{
    newBookModal.style.display = 'none'
  })
}


let newBookModal = document.querySelector("#newBookModal")
//EVENT LISTENERS

//Add new book
let addBookButton = document.querySelector("#newBookBtn")
addBookButton.addEventListener("click",addNewBook)

//********************************** */

//Grabbing the inputs from the forum
let form = document.querySelector("#newBookForm")

form.addEventListener("submit",(e) =>{
  e.preventDefault(); //Stops page from refreashing
  console.log("Form submitted!");

  const formData = new FormData(form) 

  let bookTitle = formData.get("title")
  let bookAuthor = formData.get("author")
  let bookPages = formData.get("pages")
  let bookGenre = formData.get("genre")
  let bookAYear = formData.get("year")
  let bookRead = formData.get("read")
  if(bookRead == null ){
    bookRead = false
  }else{
    bookRead = true
  }

  if (!bookTitle || !bookAuthor || !bookPages || !bookGenre || !bookAYear) {
    alert("Please fill out all fields.");
    return;
  }

  //Adding the new data into the array.

  addBookToLibrary(bookTitle,bookAuthor, bookPages,bookGenre,bookAYear, bookRead)
  console.log(bookTitle, bookAuthor, bookPages, bookGenre, bookAYear, bookRead);

  // Re display the books onto the page.
  updateLibrary()


  form.reset()  
  newBookModal.style.display = 'none'
} )






