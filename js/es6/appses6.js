class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){
    const list = document.getElementById('book-list');

    // Create tr element
    const row = document.createElement('tr');
    // Insert Col HTML
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
  }

  showAlert(message, className){
    // Create Div
    const div = document.createElement('div');
    // Add ClassName
    div.className = `alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get Parent 
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert Alert
    container.insertBefore(div, form);
    // Timeout after 3 seconds
    setTimeout(()=> document.querySelector('.alert').remove(), 3000)
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}


// Local Storage Class

class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(book=>{
      const ui = new UI();

      // Add book to UI
      ui.addBookToList(book);
    })
  }

  static addBooks(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbnNumber){
    const books = Store.getBooks();
    books.forEach((book,index,array) => {
      if(book.isbn === isbnNumber){
        array.splice(index, 1);
      }
    })
    localStorage.setItem('books', JSON.stringify(books));
  }

}

// DOM Load Event
document.addEventListener('DOMContentLoaded', e =>{
  Store.displayBooks();
})

// Event Listener to add book
document.getElementById('book-form').addEventListener('submit', e => {
  // Get Form Values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  // Instantiate Book
  const book = new Book(title, author, isbn);
  // Instantiate UI
  const ui = new UI();
  console.log(ui);
  // Validate
  if(title === '' || author === '' || isbn === ''){
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
    

  } else {
    // Add Book to List
    ui.addBookToList(book);

    // Add to LS
    Store.addBooks(book);

    // Show success
    ui.showAlert('Book Added', 'success');

    // Clear input Fields
    ui.clearFields();
  }


  e.preventDefault();
})



// Event Listener for Delete
document.getElementById('book-list').addEventListener('click', e => {
  

  // Instantiate UI
  const ui = new UI();
  

  // Delete Book
  ui.deleteBook(e.target);

  // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert('Book removed', 'success');


  e.preventDefault();
});