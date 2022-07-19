import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getPaketPekerjaan(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/paket_pekerjaan', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addPaketPekerjaan(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/paket_pekerjaan', data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updatePaketPekerjaan(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/paket_pekerjaan/update/' + id, data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deletePaketPekerjaan(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/paket_pekerjaan/delete/' + id).then(resp => {

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