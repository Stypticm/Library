let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    Book.prototype.changeStatus = read => {
        if ((read === undefined) || (read === 'Не прочитана')) {
            read = 'Прочитана';
            let newString = `${title} by ${author}, ${pages}, статус ${read} `;
            return (newString);
        } else if (read === 'Прочитана') {
            read = 'Не прочитана';
            let newString = `${title} by ${author}, ${pages}, статус ${read} `;
            return (newString);
        }
    };
    
    // Book.prototype.info = () => {
    //     let newString = `${title} by ${author}, ${pages}, статус ${read} `;
    //     return (newString);
    // };    
}


// Функция добавления новой книги
function addBookToLibrary(titleBook, authorBook, pagesBook, readBook) {
    let book = new Book(titleBook, authorBook, pagesBook, readBook);
    myLibrary.push(book);
    return myLibrary;
}

// Отрисовка библиотеки
function render() {
    const libraryBooks = document.querySelector('.libraryBooks');
    for (let i = 0; i < myLibrary.length; i++) {
        libraryBooks.innerHTML += `
                                <div class="col-sm-12 col-md-6 col-xl-4">
                                    <div class="card text-center">
                                        <div class="card-body">
                                            <h5 class="card-title">${myLibrary[i].title}</h5>
                                            <p class="card-text">Author ${myLibrary[i].author}</p>
                                            <p class="card-text">${myLibrary[i].pages} pages</p>
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input" id="read">
                                                <label class="form-check-label" for="read">Read / Unread</label>
                                            </div>
                                            <div class="d-flex justify-content-around">
                                                <button type="button" class='btn btn-success status'>Прочитана</button>
                                                <button type="button" class='btn btn-danger bookDelete${i}'>Удалить</button>
                                            </div>
                                        </div>                            
                                    </div>
                                </div>
                                `;
    }
};

// Кнопка и текст для добавления новой книги,а так же удаления
function getNewBook() {
    const row = document.querySelector('.row');
    row.innerHTML = `
        <div class="collapse formAddNewBook" id="collapseExample">
            <div class="card card-body">
                <div class="form-group">
                   <input type="text" class="form-control" id="title" placeholder="Title">
                   <input type="text" class="form-control" id="author" placeholder="Author">
                   <input type="number" class="form-control" id="pages" placeholder="Pages">
                   <div class="form-check">
                     <input type="checkbox" class="form-check-input" id="read">
                     <label class="form-check-label" for="read">Read / Unread</label>
                   </div>
                </div>
                <div class="d-flex justify-content-around">
                    <button class="btn btn-success submitButton">Submit</button>
                    <button class="btn btn-danger cancelButton">Cancel</button>
                </div>      
            </div>
        </div>
        `;

        function valueNull() {
            document.querySelector('#title').value = "";
            document.querySelector('#author').value = "";
            document.querySelector('#pages').value = "";
            document.querySelector('#read').checked = "";
            document.querySelector('.formAddNewBook').classList.value = "col-sm-6 formAddNewBook collapse";
        }

        const submitButton = document.querySelector('.submitButton');
        submitButton.addEventListener('click', () => {
            let titleBook = document.querySelector('#title').value;
            let authorBook = document.querySelector('#author').value;
            let pagesBook = document.querySelector('#pages').value;
            let readBook = document.querySelector('#read').checked;

            addBookToLibrary(titleBook, authorBook, pagesBook, readBook);
            valueNull();
            render();
        });

        const cancelButton = document.querySelector('.cancelButton');
        cancelButton.addEventListener('click', () => {
            valueNull();
        });
};
getNewBook();


// Функция изменения статуса прочтения книги
function changeStatusBook() {
    const myLib = document.querySelector('.myLib');
    for (let i = 0; i < myLibrary.length; i++) {
        const statusButton = myLib.querySelector(`.book${i}`).querySelector('.status');
        statusButton.addEventListener('click', () => {
            if ((myLibrary[i].read === undefined) || (myLibrary[i].read === 'Не прочитана')) {
                myLib.querySelector(`.book${i}`).firstChild.textContent = myLibrary[i].changeStatus();
                statusButton.textContent = 'Не прочитана';
                myLibrary[i].read = 'Прочитана';
            } else if (myLibrary[i].read === 'Прочитана') {                
                myLib.querySelector(`.book${i}`).firstChild.textContent = myLibrary[i].changeStatus('Прочитана');
                statusButton.textContent = 'Прочитана';
                myLibrary[i].read = 'Не прочитана';
            }
        });
    }
}