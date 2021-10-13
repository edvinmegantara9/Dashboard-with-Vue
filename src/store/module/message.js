import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        sendMessage(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('/message', data).then(resp => {

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