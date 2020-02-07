(function () {
    fetch('./assets/db/books.csv')
        .then(res => res.text())
        .then(res => parseResponse(res))
        .then(jsonRes => renderData(jsonRes))
        .catch(err => { throw new Error(err) });

    const parseResponse = data => new Promise((resolve, reject) => {
        const arrFromData = data.split('\n'); // Converting the text data to an array

        const books = arrFromData.map(reg => {
            let data = reg.split(','); // Converting all reg wich are in text format to an array

            // Parsing in object every registers
            return {
                bookId: data[0],
                bookName: data[1],
                bookChap: data[2]
            }
        })

        books.shift(0);  // Delete first element wich contains the table's title from csv file;
        books.pop();     // Delete last element wich contains an empty object;

        resolve(books); // Send success response

    })

    const renderData = books => {
        const listBooks = document.getElementById('books');
        books.forEach(book => {
            listBooks.innerHTML += `<li><a href="?book=${book.bookId}&cap=${1}">${book.bookName}</a></li>`
        });
    }

})()