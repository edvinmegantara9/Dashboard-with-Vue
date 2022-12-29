import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getBatasWilayah(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/batas_wilayah', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addBatasWilayah(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/batas_wilayah', data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateBatasWilayah(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/batas_wilayah/update/' + id, data).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteBatasWilayah(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/batas_wilayah/delete/' + id).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        importAlatKontruksi(_, file) {
            return new Promise((resolve, reject) => {

                const formData = new FormData();
                formData.append('file', file);
                const headers = { 'Content-Type': 'multipart/form-data' };

                let config = {
                    headers
                }
  
                axios.post('/batas_wilayah/import', formData, config).then(resp => {
                    resolve(resp)
                }).catch(e => {
                    reject(e)
                })
            })
        },

        selectedAction(_, {action, data}) {
            return new Promise((resolve, reject) => {
                axios.post('/batas_wilayah/selected_action/' + action, { data: data }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        exportReport(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/batas_wilayah/selected_action/export_excel',  { params: _params, responseType: 'blob' }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        ReportByDate(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/batas_wilayah/selected_action/export_pdf', { params: _params }).then(resp => {
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