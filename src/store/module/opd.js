import axios from 'axios'; 


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getOPD(_,_params){
            return new Promise((resolve, reject) => {
                axios.get('/opd', {params: _params}).then(resp => {
                   
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addOPD(_,data){
            return new Promise((resolve, reject) => {
                axios.post('/opd', data).then(resp => {
                   
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