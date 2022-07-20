import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getAlatKontruksi(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/alat_kontruksi', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addAlatKontruksi(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/alat_kontruksi', data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateAlatKontruksi(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/alat_kontruksi/update/' + id, data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteAlatKontruksi(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/alat_kontruksi/delete/' + id).then(resp => {

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