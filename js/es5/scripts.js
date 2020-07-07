// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI(){}

// Show Alert
UI.prototype.showAlert = function(message, className){
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



// Clear Input Fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Add book to list
UI.prototype.addBookToList = function(book){
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

// Event Listeners
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

    // Show success
    ui.showAlert('Book Added', 'success');

    // Clear input Fields
    ui.clearFields();
  }


  e.preventDefault();
})