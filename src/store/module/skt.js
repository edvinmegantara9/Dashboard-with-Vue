import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getSkt(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/skt', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addSkt(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/skt', data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateSkt(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/skt/update/' + id, data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteSkt(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/skt/delete/' + id).then(resp => {

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