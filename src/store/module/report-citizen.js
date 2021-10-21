// Daily Report
import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        getCitizenReport(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/citizen_report', {params: _params}).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        // addReport(_, _data) {
        //     return new Promise((resolve, reject) => {
        //         axios.post('/daily_report', _data).then(resp => {
        //             resolve(resp);
        //         }).catch(e => {
        //             reject(e);
        //         })
        //     });
        // },

        // updateReport(_, _data) {
        //     return new Promise((resolve, reject) => {
        //         axios.put('/daily_report/update/' + _data.id, _data.data).then(resp => {
        //             resolve(resp);
        //         }).catch(e => {
        //             reject(e);
        //         })
        //     });
        // },

        deleteCitizenReport(_, _id) {
            return new Promise((resolve, reject) => {
                axios.delete('/citizen_report/delete/' + _id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            });
        }
    },
    getters: {

    }

}