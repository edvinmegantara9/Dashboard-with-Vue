import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getRoom(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/chat', { params: _params }).then(resp => {

                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        addRoom(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/chat', data).then(resp => {

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