import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getSbu(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/sbu', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addSbu(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/sbu', data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateSbu(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/sbu/update/' + id, data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteSbu(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/sbu/delete/' + id).then(resp => {

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