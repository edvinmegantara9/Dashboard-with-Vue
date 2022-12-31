import axios from 'axios'; 


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getUser(_,_params){
            return new Promise((resolve, reject) => {
                axios.get('admin', {params : _params}).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        
        addUser(_, data){
            return new Promise((resolve,reject) => {
                axios.post('admin', data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        updateUser(_, {id,data}){
            return new Promise((resolve,reject) => {
                axios.put('admin/update/'+ id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        deleteUser(_, id){
            return new Promise((resolve,reject) => {
                axios.delete('admin/delete/'+ id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        changePassword(_, {id, password}) {
            return new Promise((resolve, reject) => {
                axios.put('admin/change-password/' + id, {password: password}).then(resp => {
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