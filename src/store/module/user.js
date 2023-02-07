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
                axios.post('register', data).then(resp => {
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
        }
    },
    getters: {

    }

}