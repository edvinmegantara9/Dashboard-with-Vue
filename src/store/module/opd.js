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

        updateOPD(_,{id,data}){
            return new Promise((resolve, reject) => {
                axios.put('/opd/update/'+ id, data).then(resp => {
                   
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        deleteOPD(_,id){
            return new Promise((resolve, reject) => {
                axios.delete('/opd/delete/'+ id).then(resp => {
                   
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