import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getGallery(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/gallery', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addGallery(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/gallery', data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateGallery(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/gallery/update/' + id, data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteGallery(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/gallery/delete/' + id).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },




    },
    getters: {

    }

}