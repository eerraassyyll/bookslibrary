let books = JSON.parse(localStorage.getItem('library')) || [];

const container = document.getElementById('bookContainer');
const form = document.getElementById('bookForm');


function save() {
    localStorage.setItem('library', JSON.stringify(books));
    render();
}

function render(filterData = books) {
    container.innerHTML = '';
    
    filterData.forEach((book, index) => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <p class="date">${book.year} г</p>
            <img src="https://glstatic.rg.ru/uploads/images/2016/04/19/61c012a02e0e5d8.jpg" alt="cover">
            <h2>${book.title}</h2>
            <p class="author">${book.author}</p>
            <p class="status">${book.status}</p>
            <div class="actions">
                <button onclick="del(${index})">Удалить</button>
                <button onclick="edit(${index})">Ред.</button>
            </div>
        `;
        container.appendChild(item);
    });
}

form.onsubmit = (e) => {
    e.preventDefault();
    const newBook = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        year: document.getElementById('year').value,
        status: document.getElementById('status').value
    };
    books.push(newBook);
    form.reset();
    save();
};

function del(index) {
    books.splice(index, 1);
    save();
}

function edit(index) {
    const newTitle = prompt('Новое название:', books[index].title);
    if (newTitle) {
        books[index].title = newTitle;
        save();
    }
}

const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

function filter() {
    const text = searchInput.value.toLowerCase();
    const status = statusFilter.value;

    const filtered = books.filter(book => {
        const matchesText = book.title.toLowerCase().includes(text) || book.author.toLowerCase().includes(text);
        const matchesStatus = status === 'all' || book.status === status;
        return matchesText && matchesStatus;
    });
    render(filtered);
}

searchInput.oninput = filter;
statusFilter.onchange = filter;

render();