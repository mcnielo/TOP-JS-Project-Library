const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function removeBookFromLibrary(title) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === title) {
      myLibrary.splice(i, 1);
      break;
    }
  }
}

function readStatusUpdate(title) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === title) {
      if (myLibrary[i].read) {
        myLibrary[i].read = false;
      } else {
        myLibrary[i].read = true;
      }
      break;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const addBook = document.querySelector("#newBookBtn");
  const formModal = document.querySelector("#formModal");
  const closeModal = document.querySelector("#closeModal");
  const bookForm = document.querySelector("#bookForm");

  // Show the modal
  addBook.addEventListener("click", () => {
    formModal.classList.remove("hidden");
  });

  // Hide the modal
  closeModal.addEventListener("click", () => {
    formModal.classList.add("hidden");
  });

  // Optional: Hide modal when clicking outside the content
  formModal.addEventListener("click", (event) => {
    if (event.target === formModal) {
      formModal.classList.add("hidden");
    }
  });

  // Submit Form
  bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    console.log(
      `Title: ${title}, Author: ${author}, Pages: ${pages}, Read: ${read}`
    );

    addBookToLibrary(title, author, pages, read);
    renderLibrary();

    formModal.classList.add("hidden");

    bookForm.reset();
  });
});

function renderLibrary() {
  const bookList = document.querySelector("#bookList");
  bookList.innerHTML = ""; // Clear existing list of books

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    // Create book card container
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");

    // Add dynamic class for read status
    if (book.read) {
      bookCard.classList.add("read");
    } else {
      bookCard.classList.add("not-read");
    }

    // Create title element
    const title = document.createElement("h3");
    title.textContent = book.title;

    // Create author element
    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    // Create pages element
    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    // Create read status element
    const read = document.createElement("p");
    read.textContent = `Read: ${book.read ? "Yes" : "No"}`;

    // Create the remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("removeBtn");

    // Create the read button
    const readBtn = document.createElement("button");
    if (bookCard.classList.contains("read")) {
      readBtn.textContent = "Unread";
    } else {
      readBtn.textContent = "Read";
    }
    readBtn.classList.add("readBtn");

    // Append elements to book card
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(removeBtn);
    bookCard.appendChild(readBtn);

    // Add event listener for the remove button
    removeBtn.addEventListener("click", () => {
      removeBookFromLibrary(book.title); // Remove book from array
      renderLibrary(); // Re-render the library after removal
    });

    readBtn.addEventListener("click", () => {
      readStatusUpdate(book.title);
      renderLibrary();
    });

    // Append the book card to the book list
    bookList.appendChild(bookCard);
  }
}
