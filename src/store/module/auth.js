import axios from 'axios';

export default {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        setUser(state, data) {
            state.user = data
        }
    },
    actions: {

        login({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('/login', data).then(resp => {
                    localStorage.setItem('token', resp.data.token)
                    localStorage.setItem('user', JSON.stringify(resp.data.user))
                    commit('setUser', resp.data)
                    axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        me() {
            return new Promise((resolve, reject) => {
                axios.get('/me').then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        logout() {
            return new Promise(resolve => {
                localStorage.removeItem('token');
                resolve();
            })
        }
    },
    getters: {
        getUser: state => { return state.user.user }
    }

}