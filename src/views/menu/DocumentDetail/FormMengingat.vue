<template>
    <div class="container">
        <div v-for="(item, index) in document_remembers" :key="index" :set="v = $v.document_remembers.$each[index]">
            <table class="table">
                <tr>
                    <td style="vertical-align: baseline;width: 15px;"><strong>{{ index +1 }}.</strong></td>
                    <td>
                        <div class="form-group">
                            <textarea type="text" :class="['form-control', (!v.description.required) ? 'is-invalid' : '']"  v-model="item.description" id="title" aria-describedby="title" placeholder="Ketik Mengingat" rows="3"></textarea>
                            <small id="document_type" v-if="!v.description.required" class="form-text text-muted">Deskripsi Mengingat Wajid Diisi!</small>
                        </div>
                        <!-- <div class="row">
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
                    </td> -->
                    <td style="width: 20px;vertical-align: baseline;">
                        <button @click="deleteDetail(index)" class="btn btn-sm btn-danger m-1">Hapus</button>
                    </td>
                </tr>
            </table>
            <!-- <hr class="mt-0" /> -->
        </div>
        <button @click="add" class="btn btn-sm btn-success"><CIcon name="cilMedicalCross" /> Tambah Mengingat</button>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'
 
    export default {
        props: ['clickedNext', 'currentStep'],
        mixins: [validationMixin],
        data() {
            return {
                document_remembers: [
                    {
                        description: '',
                        margin_top: '',
                        margin_left: '',
                        margin_button: '',
                        margin_rigth: '',
                    }
                ]
            }
        },
        validations: {
            document_remembers: {
                $each: {
                    description: { required },
                }
            }
        },
        watch: {
            $v: {
                handler: function (val) {
                    if(!val.$invalid && this.document_remembers.length > 0) {
                        this.$store.commit('document/setDocumentRemembers', this.document_remembers);
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
                this.document_remembers.push({
                    description: '',
                    margin_top: '',
                    margin_left: '',
                    margin_button: '',
                    margin_rigth: '',
                })
            },
            deleteDetail(index) {
                this.document_remembers.splice(index, 1);
            }
        },
        mounted() {
            let _document_remembers = this.$store.state.document.document_remembers;
            if (_document_remembers.length > 0) {
                this.document_remembers = _document_remembers;
            }
            if(!this.$v.$invalid) {
                this.$emit('can-continue', {value: true});
            } else {
                this.$emit('can-continue', {value: false});
            }
        }
    }
</script>