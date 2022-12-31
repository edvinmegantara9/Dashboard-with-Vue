import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getTransaction(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/product-payment/admin', { params: _params }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addTransaction(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/product-payment/create', data).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateTransaction(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/product-payment/update/' + id, data).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteTransaction(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/product-payment/delete/' + id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        selectedAction(_, {action, data}) {
            return new Promise((resolve, reject) => {
                axios.post('/product-payment/selected_action/' + action, { data: data }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        exportReport(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/product-payment/selected_action/export_excel',  { params: _params, responseType: 'blob' }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        ReportByDate(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/product-payment/selected_action/export_pdf', { params: _params }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        importTransaction(_, file) {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);
                const headers = { 'Content-Type': 'multipart/form-data' };
                let config = {
                    headers
                }
                axios.post('/product-payment/import', formData, config).then(resp => {
                    resolve(resp)
                }).catch(e => {
                    reject(e)
                })
            })
        },
    },
    getters: {

    }
}