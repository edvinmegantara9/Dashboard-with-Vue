import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getHistory(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/chat/history', { params: _params }).then(resp => {
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