import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getSka(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/ska', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addSka(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/ska', data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateSka(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/ska/update/' + id, data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteSka(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/ska/delete/' + id).then(resp => {

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