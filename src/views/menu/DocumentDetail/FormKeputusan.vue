<template>
    <div class="container">
        <div v-for="(item, index) in document_decisions" :key="index" :set="v = $v.document_decisions.$each[index]">
            <table>
                <tr>
                    <td style="vertical-align: baseline;width: 15px;"><strong>{{ index +1 }}.</strong></td>
                    <td>
                        <ckeditor tag-name="textarea" :editor="editor" v-model="item.description" :config="editorConfig"></ckeditor>
                        <!-- <vue-editor :editor-toolbar="customToolbar"
                            v-model="item.description"
                            placeholder="Ketik disini..."
                        ></vue-editor> -->
                        <small id="document_type" v-if="!v.description.required" class="form-text text-muted">Deskripsi Keputusan Wajid Diisi!</small>
                        <!-- <div class="row mt-2">
                            <div class="form-group col">
                                <input type="text" class="form-control"  v-model="item.margin_top" id="title" aria-describedby="title" placeholder="Margin Atas">
                            </div>
                            <div class="form-group col">
                                <input type="text" class="form-control"  v-model="item.margin_button" id="title" aria-describedby="title" placeholder="Margin Bawah">
                            </div>
                            <div class="form-group col">
                                <input type="text" class="form-control"  v-model="item.margin_left" id="title" aria-describedby="title" placeholder="Margin Kiri">
                            </div>
                            <div class="form-group col">
                                <input type="text" class="form-control"  v-model="item.margin_rigth" id="title" aria-describedby="title" placeholder="Margin Kanan">
                            </div>
                        </div> -->
                    </td>
                    <td style="width: 20px;vertical-align: baseline;">
                        <button @click="deleteDetail(index)" class="btn btn-sm btn-danger m-1">Hapus</button>
                    </td>
                </tr>
            </table>
            <!-- <hr class="mt-0" /> -->
        </div>
        <button @click="add" class="btn btn-sm mt-3 btn-success"><CIcon name="cilMedicalCross" /> Tambah Keputusan</button>
        <button class="btn btn-sm btn-primary mt-3 ml-1"><CIcon name="cilMedicalCross" /> Tambah Tembusan</button>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'
    import { VueEditor } from "vue2-editor";
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

 
    export default {
        props: ['clickedNext', 'currentStep'],
        mixins: [validationMixin],
        data() {
            return {
                document_decisions: [
                    {
                        description: '',
                        margin_top: '',
                        margin_left: '',
                        margin_button: '',
                        margin_rigth: '',
                    }
                ],
                customToolbar: [
                    [{ list: "ordered" }, { list: "bullet" }],
                ],
                editor: ClassicEditor,
                editorData: '',
                editorConfig: {
                    // The configuration of the editor.
                    resize_maxWidth: 800
                }
            }
        },
        components: {
            VueEditor
        },
        validations: {
            document_decisions: {
                $each: {
                    description: { required },
                }
            }
        },
        watch: {
            $v: {
                handler: function (val) {
                    if(!val.$invalid && this.document_decisions.length > 0) {
                        this.$store.commit('document/setDocumentDecisions', this.document_decisions);
                        this.$emit('can-continue', {value: true});
                    } else {
                        this.$emit('can-continue', {value: false});
                    }
                },
                deep: true
            },
            clickedNext(val) {
                if(val === true) {
                    this.$v.form.$touch();
                }
            }
        },
        methods: {
            add() {
                this.document_decisions.push({
                    description: '',
                    margin_top: '',
                    margin_left: '',
                    margin_button: '',
                    margin_rigth: '',
                })
            },
            deleteDetail(index) {
                this.document_decisions.splice(index, 1);
            }
        },
        mounted() {
            let _document_decisions = this.$store.state.document.document_decisions;
            if (_document_decisions.length > 0) {
                this.document_decisions = _document_decisions;
            }
            if(!this.$v.$invalid) {
                this.$emit('can-continue', {value: true});
            } else {
                this.$emit('can-continue', {value: false});
            }
        }
    }
</script>

<style>
    /* .table {
        white-space: normal !important;
    } */
    .ck-editor .ck-editor__main .ck-content {
        min-height: 200px !important;
        max-width: 900px !important;
        width: 900px !important;
    }
</style>