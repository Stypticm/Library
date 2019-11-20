let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.changeStatus = read => {
        if ((read === undefined) || (read === 'Не прочитана')) {
            read = 'Прочитана';
            let newString = `${title} by ${author}, ${pages}, статус ${read} `;
            return (newString);
        } else if (read === 'Прочитана') {
            read = 'Не прочитана';
            let newString = `${title} by ${author}, ${pages}, статус ${read} `;
            return (newString);
        }
    }

    this.info = () => {
        let newString = `${title} by ${author}, ${pages}, статус ${read} `;
        return (newString);
    };    
}

//('Три товарища, Эрик Мария Ремарк, 200 страниц');
//('Капитанская дочка, Пушкин, 150 страниц');
//('The Hobbit, J.R.R. Tolkien, 295 pages');

// Функция добавления новой книги
let inputString = '';

function addBookToLibrary(inputString) {
    let inputString2 = inputString.split(/\s*,\s*/);
    let book = new Book(inputString2[0], inputString2[1], inputString2[2], inputString2[3]);
    myLibrary.push(book);
    return myLibrary;
}

// Кнопка и текст для добавления новой книги
function getNewBook() {
    const myLib = document.querySelector('.myLib');
    const buttonNewBook = document.querySelector('.newBook');
    buttonNewBook.addEventListener('click', () => {
        document.querySelector('.myLib').innerHTML = '<div class="myLib"></div>';
        addBookToLibrary(inputString = prompt("Введите данные для добавления книги: "));
        render();
        for (let i = 0; i < myLibrary.length; i++) {
            document.querySelector(`.bookDelete${i}`).addEventListener('click', () => {
                myLib.querySelector(`.book${i}`).remove();
                myLibrary.splice(i, 1);
            });
        };
        changeStatusBook();
    });
}
getNewBook();

// Отображаение библиотеки в html
function render() {
    const myLib = document.querySelector('.myLib');
    for (let i = 0; i < myLibrary.length; i++) {
        myLib.innerHTML += `<div class='book${i}'>
                                ${myLibrary[i].info()}
                                <button class='status'>Прочитана</button>
                                <button class='bookDelete${i}'>Удалить</button>
                            </div>`;
    }
}

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