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

        endRoom(_, { id, }) {
            return new Promise((resolve, reject) => {
                axios.put('/chat/endchat/' + id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        rateRoom(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/chat/ratechat/' + id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        }




    },
    getters: {

    }

}