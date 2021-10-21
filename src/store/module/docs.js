import axios from 'axios';


export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

        // Documents
        getDocuments(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('document', {
                    params: _params
                }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        addDocuments(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('document', data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        updateDocuments(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('document/update/' + id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        deleteDocuments(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('document/delete/' + id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        // Documents Type
        getDocumentsType(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('document_type', {
                    params: {
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

        addDocumentsType(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('document_type', data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        updateDocumentsType(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('document_type/update/' + id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        deleteDocumentsType(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('document_type/delete/' + id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        // Public Documents
        getPubDocuments(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('public_document', {
                    params: {
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

        addPubDocuments(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('public_document', data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        updatePubDocuments(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('public_document/update/' + id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        deletePubDocuments(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('public_document/delete/' + id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        
        // Citizen Report
        getCitizenReport(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('citizen_report', {
                    params: {
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

        addCitizenReport(_, data) {
            return new Promise((resolve, reject) => {
                axios.post('citizen_report', data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        updateCitizenReport(_, { id, data }) {
            return new Promise((resolve, reject) => {
                axios.put('citizen_report/update/' + id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        deleteCitizenReport(_, id) {
            return new Promise((resolve, reject) => {
                axios.delete('citizen_report/delete/' + id).then(resp => {
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