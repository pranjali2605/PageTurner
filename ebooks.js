let booksPerPage = 6; 
let currentIndex = 0; 
let bookData = [];

// Fetch and load book data from JSON
async function loadBooksFromJSON() {
    try {
        const response = await fetch('./ebooks.json'); 
        bookData = await response.json(); 
        displayBooks();
    } catch (error) {
        console.error("Failed to load eBooks:", error); 
    }
}

// Function to display books
function displayBooks() {
    const bookContainer = document.getElementById("bookContent");
    const endIndex = Math.min(currentIndex + booksPerPage, bookData.length);
    for (let i = currentIndex; i < endIndex; i++) {
        const book = bookData[i];
        const bookElement = `
            <div class="col-5">
                <div class="image">
                    <a href="${book.link}" target="_blank">
                        <img src="${book.image}" alt="${book.title}">
                    </a>
                </div>
                <p>${book.title}</p>
            </div>`;
        bookContainer.insertAdjacentHTML("beforeend", bookElement); 
    }
    currentIndex = endIndex; 
    toggleLoadMoreButton(); 
}


function toggleLoadMoreButton() {
    const loadMoreButton = document.getElementById("loadMore");
    loadMoreButton.style.display = currentIndex < bookData.length ? "block" : "none"; 
}

// Search Functionality
function searchBooks() {
    const query = document.getElementById("searchInput").value.toLowerCase(); 
    const filteredBooks = bookData.filter(book => book.title.toLowerCase().includes(query)); 
    const bookContainer = document.getElementById("bookContent");
    bookContainer.innerHTML = ''; 
    currentIndex = 0; 
    toggleLoadMoreButton(); 

    if (filteredBooks.length > 0) {
        filteredBooks.forEach(book => {
            const bookElement = `
                <div class="col-5">
                    <div class="image">
                        <a href="${book.link}" target="_blank">
                            <img src="${book.image}" alt="${book.title}">
                        </a>
                    </div>
                    <p>${book.title}</p>
                </div>`;
            bookContainer.insertAdjacentHTML("beforeend", bookElement); 
        });
    } else {
        bookContainer.innerHTML = '<p>No results found.</p>'; 
    }
}

// Load more books when the "Load More" button is clicked
function loadMoreBooks() {
    displayBooks(); 
}

// Load initial books
window.onload = loadBooksFromJSON; 

// Attach search functionality to the input event
document.getElementById("searchInput").addEventListener("input", searchBooks);
