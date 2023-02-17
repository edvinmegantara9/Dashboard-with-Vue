import axios from 'axios'; 


export default {
    namespaced: true,
    state: {
        document: {},
        document_considers: [],
        document_remembers: [],
        document_notices: [],
        document_decisions: [],
        document_attachments: [],
        document_supports: [],
    },
    mutations: {
        setDocument (state, data) {
            state.document = data
        },
        setDocumentConsiders (state, data) {
            state.document_considers = data
        },
        setDocumentRemembers (state, data) {
            state.document_remembers = data
        },
        setDocumentNotices (state, data) {
            state.document_notices = data
        },
        setDocumentDecisions (state, data) {
            state.document_decisions = data
        },
        setDocumentAttachments (state, data) {
            state.document_attachments = data
        },
        setDocumentSupports (state, data) {
            state.document_supports = data
        }
    },
    getters: {
        getDocument: state => { 
            let document = state.document;
            document.document_considers = state.document_considers;
            document.document_remembers = state.document_remembers;
            document.document_notices = state.document_notices;
            document.document_decisions = state.document_decisions;
            document.document_attachments = state.document_attachments;
            document.document_supports = state.document_supports;
            return document 
        }
    },
    actions: {

        show(_,id){
            return new Promise((resolve, reject) => {
                axios.get('document/' + id).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        get(_,_params){
            return new Promise((resolve, reject) => {
                axios.get('document', {params : _params}).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        
        add(_, data){
            return new Promise((resolve,reject) => {
                axios.post('document/create', data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e);
                })
            })
        },

        update(_, {id,data}){
            return new Promise((resolve,reject) => {
                axios.put('document/update/'+ id, data).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        delete(_, id){
            return new Promise((resolve,reject) => {
                axios.delete('document/delete/'+ id).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        selectedAction(_, {action, data}) {
            return new Promise((resolve, reject) => {
                axios.post('/document/selected_action/' + action, { data: data }).then(resp => {
                    resolve(resp.data);
                }).catch(e => {
                    reject(e);
                })
            });
        },

        exportReport(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/document/selected_action/export_excel',  { params: _params, responseType: 'blob' }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        ReportByDate(_, _params) {
            return new Promise((resolve, reject) => {
                axios.get('/document/selected_action/export_pdf', { params: _params }).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    reject(e)
                })
            })
        },

        import(_, file) {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);
                const headers = { 'Content-Type': 'multipart/form-data' };
                let config = {
                    headers
                }
                axios.post('/document/import', formData, config).then(resp => {
                    resolve(resp)
                }).catch(e => {
                    reject(e)
                })
            })
        },
    },
}