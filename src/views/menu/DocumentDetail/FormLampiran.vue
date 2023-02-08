<template>
    <div class="container">
        <div v-for="(item, index) in document_attachments" :key="index" :set="v = $v.document_attachments.$each[index]">
            <table>
                <tr>
                    <td style="vertical-align: baseline;"><strong>{{ index +1 }}.</strong></td>
                    <td>
                        <div class="form-group">
                            <textarea type="text" :class="['form-control', (!v.title.required) ? 'is-invalid' : '']"  v-model="item.title" id="title" aria-describedby="title" placeholder="Ketik Judul Lampiran" rows="3"></textarea>
                            <small id="document_type" v-if="!v.title.required" class="form-text text-muted">Judul Lampiran Wajid Diisi!</small>
                        </div>
                        <ckeditor :editor="editor" v-model="item.description" :config="editorConfig"></ckeditor>
                        <small id="document_type" v-if="!v.description.required" class="form-text text-muted">Deskripsi Lampiran Wajid Diisi!</small>
                        <div class="row mt-2">
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
                        </div>
                    </td>
                    <td style="width: 20px;vertical-align: baseline;">
                        <button @click="deleteDetail(index)" class="btn btn-sm btn-danger m-1">Hapus</button>
                    </td>
                </tr>
            </table>
            <hr class="mt-0" />
        </div>
        <button @click="add" class="btn btn-sm btn-success mt-3"><CIcon name="cilMedicalCross" /> Tambah Lampiran</button>
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
                document_attachments: [
                    {
                        title: '',
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
                }
            }
        },
        components: {
            VueEditor
        },
        validations: {
            document_attachments: {
                $each: {
                    title: { required },
                    description: { required },
                }
            }
        },
        watch: {
            $v: {
                handler: function (val) {
                    if(!val.$invalid && this.document_attachments.length > 0) {
                        this.$store.commit('document/setDocumentAttachments', this.document_attachments);
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
                this.document_attachments.push({
                    description: '',
                    margin_top: '',
                    margin_left: '',
                    margin_button: '',
                    margin_rigth: '',
                })
            },
            deleteDetail(index) {
                this.document_attachments.splice(index, 1);
            }
        },
        mounted() {
            if(!this.$v.$invalid) {
                this.$emit('can-continue', {value: true});
            } else {
                this.$emit('can-continue', {value: false});
            }
        }
    }
</script>