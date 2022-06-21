import Service from '@ember/service';
import config from 'task2/config/environment';

export default Service.extend({
    async getBooks(search, tags_like) {
        let queryParams = '';
        if (search) {
            queryParams = `?q=${search}`;
        }
        if (tags_like) {
            queryParams = `?tags_like=${tags_like}`;
        }
        if (search && tags_like) {
            queryParams = `?q=${search}&tags_like=${tags_like}`;
        }

        const response = await fetch(`${config.backendURL}/books${queryParams}`);
        return await response.json();
        //return fetch(`${config.backendURL}/books${queryParams}`).then((response) => response.json());
    },
    async getBook(id) {
        const response = await fetch(`${config.backendURL}/books/${id}`);
        return await response.json();
        //return fetch(`${config.backendURL}/books/${id}`).then((response) => response.json());
    },
    async createBook(book, uploadData) {
        // return fetch(`${config.backendURL}/books`, { 
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(book)
        // });
        return new Promise(async (resolve, reject) => {
            try {
                const savedBookPromise = await fetch(`${config.backendURL}/books`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                });

                const savedBook = await savedBookPromise.json();

                if (!uploadData) {
                    resolve();
                }

                uploadData.url = `${config.fileUploadURL}`;
                // uploadData.headers = getOwner(this).lookup('adapter:application').get('headers');
                uploadData.submit().done(async (result/*, textStatus, jqXhr*/) => {
                    try {
                        const dataToUpload = {
                            entityName: 'books',
                            id: savedBook.id,
                            fileName: result.filename
                        };

                        await fetch(`${config.backendURL}/saveURL`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataToUpload)
                        });

                        // eslint-disable-next-line no-console
                        console.log('Ok');
                        resolve();
                    }
                    catch (e) {
                        reject(e);
                    }
                }).fail((jqXhr, textStatus, errorThrown) => {
                    reject(errorThrown);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    },
    deleteBook(id) {
        //this.get('books').removeObjects(book);
        return fetch(`${config.backendURL}/books/${id}`, { method: 'DELETE' });
    },
    updateBook(book, uploadData) {
        // return fetch(`${config.backendURL}/books/${book.id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(book)
        // });
        return new Promise(async (resolve, reject) => {
            try {
            const savedBookPromise = await fetch(`${config.backendURL}/books/${book.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
    
            const savedBook = await savedBookPromise.json();
    
            if (!uploadData) {
                resolve();
            }
    
            uploadData.url = `${config.fileUploadURL}`;
            // uploadData.headers = getOwner(this).lookup('adapter:application').get('headers');
            uploadData.submit().done(async (result/*, textStatus, jqXhr*/) => {
                try {
                    const dataToUpload = {
                        entityName: 'books',
                        id: savedBook.id,
                        fileName: result.filename
                };
    
                await fetch(`${config.backendURL}/saveURL`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToUpload)
                });
    
                    // eslint-disable-next-line no-console
                    console.log('Ok');
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            }).fail((jqXhr, textStatus, errorThrown) => {
                reject(errorThrown);
            });
            }
            catch (e) {
                reject(e);
            }
        });
    },

    getSpeakers(search) {
        let queryParams = '';
        if (search) {
            queryParams = `?q=${search}`;
        }

        return fetch(`${config.backendURL}/speakers${queryParams}`).then((response) => response.json());
    },
    getSpeaker(id) {
        return fetch(`${config.backendURL}/speakers/${id}`).then((response) => response.json());
    },
    createSpeaker(speaker) {
        return fetch(`${config.backendURL}/speakers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(speaker)
        });
    },
    deleteSpeaker(id) {
        return fetch(`${config.backendURL}/speakers/${id}`, { method: 'DELETE' });
    },
    updateSpeaker(speaker) {
        return fetch(`${config.backendURL}/speakers/${speaker.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(speaker)
        });
    },
});
