import Service from '@ember/service';
import config from 'task2/config/environment';

export default Service.extend({
    getBooks(search) {
        let queryParams = '';
        if (search) {
        queryParams=`?q=${search}`;
        }

        return fetch(`${config.backendURL}/books${queryParams}`).then((response) => response.json());
    },
    getBook(id) {
        //return this.get('books').find((book) => book.id == parseInt(id));
        return fetch(`${config.backendURL}/books/${id}`).then((response) => response.json());
    },
    createBook(book) {
        return fetch(`${config.backendURL}/books`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
    },
    deleteBook(id) {
        //this.get('books').removeObjects(book);
        return fetch(`${config.backendURL}/books/${id}`, { method: 'DELETE' });
    },
    updateBook(book) {
        return fetch(`${config.backendURL}/books/${book.id}`, { 
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
    },

    getSpeakers() {
        return fetch(`${config.backendURL}/speakers`).then((response) => response.json());
    },
    getSpeaker(id) {
        return fetch(`${config.backendURL}/speakers/${id}`).then((response) => response.json());
    },
});
