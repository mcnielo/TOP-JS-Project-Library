const myLibrary = [];

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Moby Dick", "Herman Melville", 635, false);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("The Chronicles of Narnia", "C.S. Lewis", 778, false);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, true);
renderLibrary();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.backgroundColor = getRandomGradient();
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

    console.log(`Title: ${title}, Author: ${author}, Pages: ${pages}, ${read}`);

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

    bookCard.style.background = book.backgroundColor;

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
    author.textContent = `${book.author}`;

    // Create pages element
    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    // Create read status element
    const read = document.createElement("p");
    read.textContent = `${book.read ? "Read" : "Not Read"}`;

    const removeBtn = document.createElement("div");
    removeBtn.classList.add("removeBtn");
    removeBtn.innerHTML = '<span class="removeBtnIcon">×</span>';

    // // Create the read button
    // const readBtn = document.createElement("button");
    // if (bookCard.classList.contains("read")) {
    //   readBtn.textContent = "Unread";
    // } else {
    //   readBtn.textContent = "Read";
    // }
    // readBtn.classList.add("readBtn");

    // Create the read toggle (switch) for the book card
    const readToggle = document.createElement("input");
    readToggle.type = "checkbox";
    readToggle.classList.add("read-toggle");

    // Set the initial state of the toggle based on the book's read status
    if (book.read) {
      readToggle.checked = true; // Mark it as read
    } else {
      readToggle.checked = false; // Mark it as unread
    }

    // Append the toggle to the book card

    // Append elements to book card
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(readToggle);
    bookCard.appendChild(removeBtn);

    // Add event listener for the remove button
    removeBtn.addEventListener("click", () => {
      removeBookFromLibrary(book.title); // Remove book from array
      renderLibrary(); // Re-render the library after removal
    });

    // Append the book card to the book list
    bookList.appendChild(bookCard);
  }

  // Ensure the "Add New Book" button is at the top after rendering the books
  const addNewButtonContainer = document.querySelector("#newBookBtn");
  if (!addNewButtonContainer) {
    const newBookBtn = `
      <div id="newBookBtn">
        <img id="addNewButton" src="icons/add.png" alt="add button icon">
      </div>
      `;
    bookList.innerHTML = newBookBtn + bookList.innerHTML;
  }

  // Attach the "Add New Book" button listener again
  const addBook = document.querySelector("#newBookBtn");
  addBook.addEventListener("click", () => {
    formModal.classList.remove("hidden");
  });
}

function getRandomColor() {
  // Generate a random hex color code
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomGradient() {
  // Random color components within a pastel range (dark pastel tones)
  const r = Math.floor(Math.random() * 50) + 100; // Red: Random value between 100 and 150
  const g = Math.floor(Math.random() * 50) + 100; // Green: Random value between 100 and 150
  const b = Math.floor(Math.random() * 50) + 100; // Blue: Random value between 100 and 150

  // Return the RGB color in string format
  return `rgb(${r}, ${g}, ${b})`;
}
