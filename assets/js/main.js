(function () {
    fetch('./assets/db/biblia.csv')
        .then(res => res.text())
        .then(res => parseResponse(res))
        .then(res => {
            search(res); // Call the first time from here and pass the res as argument to not have large code here.
            return organizedVers(res);
        })
        .then((db) => {
            const vers = db.organizedByBooks[db.book].filter((i, o) => {
                // just filter the current cap in the web page to then maniputale its data
                if (i.cap == db.cap) {
                    return i;
                }
            })
            const orderedVers = vers.sort((a, b) => a.vers - b.vers); // sort the vers in asc mode
            printVers(orderedVers, db);
        })
        .catch(err => { throw new Error(err) });


        
    const parseResponse = db => new Promise((resolve, reject) => {

        const arr = db.split('\n'); // converting every line in reg and storage into an array
        const data = arr.map(reg => {
            const d = reg.split('|'); // Converting all reg in {data array} to an array
            return {
                testamento: d[0],
                cod_libro: d[1],
                nombre: d[2],
                cod_grupo: d[3],
                grupo: d[4],
                abbrev: d[5],
                cap: d[6],
                vers: d[7],
                mensaje: d[8]
            }
        })
        data.pop();     // Delete last element wich contains an empty object;
        resolve(data);

    })
    const search = res => {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('search');
        const counterBox = document.createElement('h1');
        const root = document.getElementById('root');

        if (searchInput.value !== '' && searchInput.value.length >= 3) {
            var counter = 0;
            root.innerHTML = '';

            res.filter(function (i) {
                if (i.mensaje.indexOf(searchInput.value) !== -1 || i.mensaje.toLowerCase().indexOf(searchInput.value) !== -1) {
                    const tmpElem = document.createElement('span');
                    const br = document.createElement('br');

                    counter++;
                    counterBox.innerHTML = `${counter} resultados de la busqueda: <b>${searchInput.value}</b>`;
                    tmpElem.innerText = `${i.nombre} ${i.cap}:${i.vers} ${i.mensaje}`;
                    root.appendChild(tmpElem);
                    root.appendChild(br);
                }
            })
            root.prepend(counterBox);
        }

        searchForm.addEventListener('input', function (e) {
            e.preventDefault();
            search(res);
        })
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            search(res);
        })
    }
    const organizedVers = vers => new Promise((resolve, reject) => {
        const root = document.getElementById('root');
        if (location.search) {
            const url = location.search.slice(1).split('&');

            const formatedUrl = {
                book: url[0].slice(5),
                cap: url[1].slice(4)
            };
            var organizedByBooks = {};

            // What i want to do here is to organized by books every reg in db, so i reduce all
            // elements into an object using Array's reduce method, wich work like this:
            // if acc => "organizedByBooks" already contains current.code_libro not create another
            // array into acc, just add to this array already created the current data
            // if not it can create the array and then push into the same the current data, but
            // it's important to return the acc to continue the iteration
            vers.reduce((acc, current) => {
                if (acc[current.cod_libro]) {
                    acc[current.cod_libro].push(current)
                } else {
                    acc[current.cod_libro] = new Array();
                    acc[current.cod_libro].push(current)
                }
                return acc;
            }, organizedByBooks) // here we pass the organizedByBooks wich is the [acc]

            resolve({ organizedByBooks, book: formatedUrl.book, cap: formatedUrl.cap });
        } else {
            root.innerHTML = "<center><h2>Home Application</h2</center>";
        }
    })
    const printVers = (vers, db) => {
        vers.map((i, o) => {
            const root = document.getElementById('root');
            const navbarMessage = document.getElementById('navbar-message');
            const line = document.createElement('span');
            const br = document.createElement('br');
            navbarMessage.innerText = `${i.nombre} / Capítulo ${db.cap}`;
            line.textContent = `${i.vers}.- ${i.mensaje}`;

            // line.addEventListener('click', function () {
            //     handleOpt(i);
            // });
            root.appendChild(line);
            root.appendChild(br);
            return i;
        })
    }
})();
