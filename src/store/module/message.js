import axios from 'axios';


export default {
    namespaced: true,
    state: {
        inbox: [],
        outbox: []
    },
    mutations: {
        setInbox(state, data) {
            state.inbox = data
        },

        setOutbox(state, data) {
            state.outbox = data
        }
    },
    actions: {

        sendMessage({ dispatch }, data) {
            const params = {
                sorttype: 'desc',
                sortby: 'id',
                row: 5
            }
            return new Promise((resolve, reject) => {
                axios.post('/message', data).then(resp => {
                    dispatch('getInbox', { id: data.created_by, params })
                    dispatch('getOutbox', { id: data.sender_id, params })
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        getInbox({ commit }, { id, params }) {
            return new Promise((resolve, reject) => {
                axios.get('/message/inbox/' + id, { params }).then(resp => {
                    commit('setInbox', resp.data)
                    resolve(resp.data)
                }).catch(e => {
                    reject(e)
                })
            })
        },

        getOutbox({ commit }, { id, params }) {
            return new Promise((resolve, reject) => {
                axios.get('/message/outbox/' + id, { params }).then(resp => {
                    commit('setOutbox', resp.data)
                    resolve(resp.data)

                }).catch(e => {
                    reject(e)
                })
            })
        },

        getReceiver({ _ }, { id, params }) {
            return new Promise((resolve, reject) => {
                axios.get('/message/receiver/' + id, { params }).then(resp => {
                    resolve(resp.data)
                }).catch(e => {
                    reject(e)
                })
            })
        }



    },
    getters: {
        getInbox: state => { return state.inbox },
        getOutbox: state => { return state.outbox }
    }

}