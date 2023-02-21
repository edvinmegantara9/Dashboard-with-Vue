import axios from 'axios'; 


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        get(_, _params){
            return new Promise((resolve, reject) => {
                axios.get('restorant?sorttype=desc&sortby=id&row=10&keyword=', {params : _params}).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        
        add(_, data){
            console.log(data)
            return new Promise((resolve,reject) => {
                axios.post('restorant/create', data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        update(_, {id,data}){
            return new Promise((resolve,reject) => {
                axios.put('restorant/update/'+ id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        delete(_, id){
            return new Promise((resolve,reject) => {
                axios.delete('restorant/delete/'+ id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        selectedAction(_, {action, data}) {
            return new Promise((resolve, reject) => {
                axios.post('/restorant/selected_action/' + action, { data: data }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        exportReport(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/restorant/selected_action/export_excel',  { params: _params, responseType: 'blob' }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        ReportByDate(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/restorant/selected_action/export_pdf', { params: _params }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        import(_, file) {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);
                const headers = { 'Content-Type': 'multipart/form-data' };
                let config = {
                    headers
                }
                axios.post('/menu/import', formData, config).then(resp => {
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