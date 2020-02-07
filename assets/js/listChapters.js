(function () {
    fetch('./assets/db/books.csv')
        .then(res => res.text())
        .then(res => parseResponse(res))
        .then(jsonResponse => renderData(jsonResponse))
        .catch(err => { throw new Error(err) });


    const parseResponse = db => new Promise((resolve, reject) => {
        const arr = db.split('\n'); // Converting the text data to an array
        const data = arr.map(reg => {
            let data = reg.split(','); // Converting all reg wich are in text format to an array
            return {
                bookId: data[0],
                bookName: data[1],
                bookChap: data[2]
            }
        })

        data.shift(0);  // Delete first element wich contains the table's title from csv;
        data.pop();     // Delete last element wich contains an empty object;
        resolve(data);  //Send success response;

    })

    const renderData = books => {

        if (location.search) {
            const url = location.search.slice(1).split('&');
            const formatedUrl = {
                book: url[0].slice(5),
                cap: url[1].slice(4)
            };

            const listCaps = document.getElementById('caps');
            const book = books[formatedUrl.book - 1];
            var counter = 1;

            while (counter <= book.bookChap) {
                const button = document.createElement('a');
                button.href = `?book=${formatedUrl.book}&cap=${counter}`;
                button.textContent = counter;
                button.className = 'btn btn-default caps';
                listCaps.appendChild(button);
                counter++;
            }
        }

    }
})()
