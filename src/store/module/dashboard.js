import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        getYear(_) {
            return new Promise((resolve, reject) => {
                axios.get('/dashboard/get-year').then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },
        getGrafikVolumeTransaction(_, tahun) {
            return new Promise((resolve, reject) => {
                axios.get('/dashboard/grafik-volume-transaction/' + tahun).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },
        getGrafikVolumeTransactionBySim(_, tahun) {
            return new Promise((resolve, reject) => {
                axios.get('/dashboard/grafik-volume-transaction-by-sim/' + tahun).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },
        getGrafikVolumeTransactionByPaymentMethod(_, tahun) {
            return new Promise((resolve, reject) => {
                axios.get('/dashboard/grafik-volume-transaction-by-payment-method/' + tahun).then(resp => {
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