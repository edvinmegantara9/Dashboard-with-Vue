import axios from 'axios'; 


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        login(_, data){
            return new Promise((resolve, reject) => {
                axios.post('/login', data).then(resp => {
                    localStorage.setItem('token', resp.data.token)
                    localStorage.setItem('user', resp.data.user)
                    axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        me(_){
            return new Promise((resolve, reject) => {
                axios.get('/me').then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        logout(_){
            return new Promise(resolve => {
                localStorage.removeItem('token');            
                resolve();
            })
        }

    },
    getters: {

    }

}