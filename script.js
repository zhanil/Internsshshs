function searchBook() {
    const searchTerm = document.getElementById("bookInput").value;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.items);
        });
}

function displayBooks(books) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    books.forEach(book => {
        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors.join(", ");
        const buyLink = book.saleInfo.buyLink;
        const bookDiv = document.createElement("div");
        bookDiv.innerHTML = `
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Author(s):</strong> ${authors}</p>
            <a href="${buyLink}" target="_blank">Купить</a>
        `;
        bookList.appendChild(bookDiv);
    });
}


function submitForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const bookTitle = document.querySelector("#bookList div p:first-child").innerText.split(": ")[1];
    const bookAuthor = document.querySelector("#bookList div p:nth-child(2)").innerText.split(": ")[1];

    const data = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        bookTitle: bookTitle,
        bookAuthor: bookAuthor
    };

    fetch('YOUR_GOOGLE_SHEETS_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            alert("Данные успешно отправлены!");
        } else {
            alert("Ошибка при отправке данных!");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}