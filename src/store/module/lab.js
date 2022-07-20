import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getLab(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/lab', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addLab(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/lab', data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateLab(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/lab/update/' + id, data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteLab(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/lab/delete/' + id).then(resp => {

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