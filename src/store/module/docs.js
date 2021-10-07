import axios from 'axios'; 


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        // Documents
        getDocuments(_,_params){
            return new Promise((resolve, reject) => {
                axios.get('document', {
                    params : {
                        row: 20,
                        sortby: 'id',
                        sorttype: 'asc'
                    }
                }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        
        addDocuments(_, data){
            return new Promise((resolve,reject) => {
                axios.post('document', data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        updateDocuments(_, {id,data}){
            return new Promise((resolve,reject) => {
                axios.put('document/update/'+ id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        deleteDocuments(_, id){
            return new Promise((resolve,reject) => {
                axios.delete('document/delete/'+ id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        // Documents Type
        getDocumentsType(_,_params){
            return new Promise((resolve, reject) => {
                axios.get('document_type', {
                    params : {
                        row: 20,
                        sortby: 'id',
                        sorttype: 'asc'
                    }
                }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        addDocumentsType(_, data){
            return new Promise((resolve,reject) => {
                axios.post('document_type', data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        updateDocumentsType(_, {id,data}){
            return new Promise((resolve,reject) => {
                axios.put('document_type/update/'+ id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        deleteDocumentsType(_, id){
            return new Promise((resolve,reject) => {
                axios.delete('document_type/delete/'+ id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

    },
    getters: {

    }

}