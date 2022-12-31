import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getProduct(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/product', { params: _params }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addProduct(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/product/create', data).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateProduct(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/product/update/' + id, data).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteProduct(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/product/delete/' + id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        selectedAction(_, {action, data}) {
            return new Promise((resolve, reject) => {
                axios.post('/product/selected_action/' + action, { data: data }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        exportReport(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/product/selected_action/export_excel',  { params: _params, responseType: 'blob' }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        ReportByDate(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/product/selected_action/export_pdf', { params: _params }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        importProduct(_, file) {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);
                const headers = { 'Content-Type': 'multipart/form-data' };
                let config = {
                    headers
                }
                axios.post('/product/import', formData, config).then(resp => {
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