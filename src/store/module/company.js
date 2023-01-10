import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getCompany(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/company', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        getCompanyById(_, id) {
            return new Promise((resolve, reject) => {
                axios.get('/company/' + id).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addCompany(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/company/create', data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateCompany(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/company/update/' + id, data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteCompany(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/company/delete/' + id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            });
        },
    },
    getters: {

    }

}