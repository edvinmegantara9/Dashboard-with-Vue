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
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        selectedAction(_, {action, data}) {
            return new Promise((resolve, reject) => {
                axios.post('/paket_pekerjaan/selected_action/' + action, { data: data }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        exportReport(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/paket_pekerjaan/selected_action/export_excel',  { params: _params, responseType: 'blob' }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        ReportByDate(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/paket_pekerjaan/selected_action/export_pdf', { params: _params }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        persentase(_) {
            return new Promise((resolve, reject) => {
                axios.get('/paket_pekerjaan/persentase').then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        persentase_sumber_dana(_) {
            return new Promise((resolve, reject) => {
                axios.get('/paket_pekerjaan/persentase_sumber_dana').then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        other(_) {
            return new Promise((resolve, reject) => {
                axios.get('/paket_pekerjaan/other').then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        }
    },
    getters: {

    }

}