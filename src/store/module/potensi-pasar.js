import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getPotensiPasar(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/potensi_pasar', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addPotensiPasar(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/potensi_pasar', data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updatePotensiPasar(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/potensi_pasar/update/' + id, data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deletePotensiPasar(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/potensi_pasar/delete/' + id).then(resp => {

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