import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        getResult(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/product-result/admin', { params: _params }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        selectedAction(_, {action, data}) {
            return new Promise((resolve, reject) => {
                axios.post('/product-result/selected_action/' + action, { data: data }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        exportReport(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/product-result/selected_action/export_excel',  { params: _params, responseType: 'blob' }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        ReportByDate(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/product-result/selected_action/export_pdf', { params: _params }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },
    },
    getters: {

    }
}