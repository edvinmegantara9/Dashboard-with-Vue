import axios from 'axios'; 


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getRole(_,_params){
            return new Promise((resolve, reject) => {
                axios.get('/role', {params: _params}).then(resp => {
                   
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addRole(_,data){
            return new Promise((resolve, reject) => {
                axios.post('/role', data).then(resp => {
                   
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        updateRole(_, {id,data}){
            return new Promise((resolve,reject) => {
                axios.put('role/update/'+ id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        deleteRole(_, id){
            return new Promise((resolve,reject) => {
                axios.delete('role/delete/'+ id).then(resp => {
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