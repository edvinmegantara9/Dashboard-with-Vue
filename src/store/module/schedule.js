import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getSchedule(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('planning_schedule', { params: _params }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        addSchedule(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('planning_schedule', data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        updateSchedule(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('planning_schedule/update/' + id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        deleteSchedule(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('planning_schedule/delete/' + id).then(resp => {
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