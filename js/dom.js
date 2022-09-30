const UNCOMPLETED_BOOK = "incompleteBookshelfList";
const COMPLETED_BOOK = "completeBookshelfList"
const BOOK_ITEMID = "itemId";

function addBook(){
    const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK);
    const completedBook = document.getElementById(COMPLETED_BOOK);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const bookIsCompleted = document.getElementById("inputBookIsComplete").checked;

    const book = makeBook(bookTitle,bookAuthor,bookYear,bookIsCompleted);
    const newBook = composeBook(bookTitle,bookAuthor,bookYear,bookIsCompleted);

    book[BOOK_ITEMID] = newBook.id;
    books.push(newBook);

    if(bookIsCompleted){
        completedBook.append(book);
    }else{
        uncompletedBook.append(book);
    }

    updateDataToStorage();
    
}

function makeBook(title, author, year,isCompleted){
    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("penulis");
    textAuthor.innerText = "Penulis: " + author;
    
    const textYear = document.createElement("p");
    textYear.classList.add("tahun");
    textYear.innerText = "Tahun:" + year;
    
    const buttonDone = document.createElement("button");
    buttonDone.classList.add("green");
    buttonDone.addEventListener("click",function(event){
        addBookToCompleted(event.target.parentElement.parentElement);
    });
    buttonDone.innerText = "Selesai dibaca";

    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("red");
    buttonDelete.addEventListener("click",function(event){
        removeBook(event.target.parentElement.parentElement);
    });
    buttonDelete.innerText = "Hapus buku";
    
    const buttonUndone = document.createElement("button");
    buttonUndone.classList.add("green");
    buttonUndone.addEventListener("click",function(event){
        addBooktoUncompleted(event.target.parentElement.parentElement);
    })
    buttonUndone.innerText = "Belum selesai dibaca";


    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action");
    if(isCompleted){
        buttonContainer.append(buttonUndone,buttonDelete);
    } else{
        buttonContainer.append(buttonDone,buttonDelete);
    }
    

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.append(textTitle,textAuthor,textYear,buttonContainer);
 
    return textContainer;
}

function removeBook(bookElement){
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition,1);

    bookElement.remove();
    updateDataToStorage();
}

function addBookToCompleted(bookElement){
    const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = bookElement.querySelector(".book_item > .penulis").innerText;
    const bookYear = bookElement.querySelector(".book_item > .tahun").innerText;

    const newBookList = makeBook(bookTitle, bookAuthor, bookYear,true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBookList[BOOK_ITEMID] = book.id;
    
    const listCompleted = document.getElementById(COMPLETED_BOOK);
    listCompleted.append(newBookList);
    bookElement.remove();

    updateDataToStorage();
}

function addBooktoUncompleted(bookElement){
    const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = bookElement.querySelector(".book_item > .penulis").innerText;
    const bookYear = bookElement.querySelector(".book_item > .tahun").innerText;

    const newBookList = makeBook(bookTitle, bookAuthor, bookYear,false);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBookList[BOOK_ITEMID] = book.id;

    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK);
    listUncompleted.append(newBookList);
    bookElement.remove();

    updateDataToStorage();
}

const cariBuku = document.getElementById("searchBook")

cariBuku.addEventListener("submit",function(event){
    event.preventDefault();
    const searchTitle = document.getElementById("searchBookTitle").value;
    searchBookTitle(searchTitle);
});

function searchBookTitle(searchTitle){
    const bookList = document.querySelectorAll(".book_item > h3");
    for (let i = 0; i< bookList.length ; i++){
        if(searchTitle != ""){
            if(bookList[i].innerText.includes(searchTitle)){
                bookList[i].parentElement.removeAttribute("hidden"); 
            } else{
               bookList[i].parentElement.setAttribute("hidden","hidden");
            }
        } else{
            bookList[i].parentElement.removeAttribute("hidden");
        }
    }  
}

