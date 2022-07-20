import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getQuarry(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/quarry', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addQuarry(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/quarry', data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateQuarry(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/quarry/update/' + id, data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteQuarry(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/quarry/delete/' + id).then(resp => {

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