import axios from 'axios'; 


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getUser(_,_params){
            return new Promise((resolve, reject) => {
                axios.get('user', {params : _params}).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        
        addUser(_, data){
            return new Promise((resolve,reject) => {
                axios.post('user', data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        updateUser(_, {id,data}){
            return new Promise((resolve,reject) => {
                axios.put('user/update/'+ id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        deleteUser(_, id){
            return new Promise((resolve,reject) => {
                axios.delete('user/delete/'+ id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        changePassword(_, {id, password}) {
            return new Promise((resolve, reject) => {
                axios.put('user/change-password/' + id, {password: password}).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
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
                axios.get('/user/selected_action/export_excel',  { params: _params, responseType: 'blob' }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        ReportByDate(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/user/selected_action/export_pdf', { params: _params }).then(resp => {
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
                axios.post('/user/import', formData, config).then(resp => {
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