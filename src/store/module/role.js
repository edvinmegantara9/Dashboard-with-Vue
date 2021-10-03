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



    },
    getters: {

    }

}