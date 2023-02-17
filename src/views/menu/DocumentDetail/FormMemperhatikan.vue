<template>
    <div class="container">
        <div v-for="(item, index) in document_notices" :key="index" :set="v = $v.document_notices.$each[index]">
            <table class="table">
                <tr>
                    <td style="vertical-align: baseline;width: 15px;"><strong>{{ index +1 }}.</strong></td>
                    <td>
                        <div class="form-group">
                            <textarea type="text" :class="['form-control', (!v.description.required) ? '' : '']"  v-model="item.description" id="title" aria-describedby="title" placeholder="Ketik Memperhatikan" rows="3"></textarea>
                            <!-- <small id="document_type" v-if="!v.description.required" class="form-text text-muted">Deskripsi Memperhatikan Wajid Diisi!</small> -->
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
                        </div> -->
                    </td>
                    <td style="width: 20px;vertical-align: baseline;">
                        <button @click="deleteDetail(index)" class="btn btn-sm btn-danger m-1">Hapus</button>
                    </td>
                </tr>
            </table>
            <!-- <hr class="mt-0" /> -->
        </div>
        <small id="document_type" class="form-text text-muted"><strong>*Note: Kententuan memperhatikan boleh diisi bila diperlukan!</strong></small>
        <button @click="add" class="btn btn-sm btn-success"><CIcon name="cilMedicalCross" /> Tambah Memperhatikan</button>
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
                document_notices: [
                    // {
                    //     description: '',
                    //     margin_top: '',
                    //     margin_left: '',
                    //     margin_button: '',
                    //     margin_rigth: '',
                    // }
                ]
            }
        },
        validations: {
            // memperhatikan tidak required
            document_notices: {
                $each: {
                    description: { required },
                }
            }
        },
        watch: {
            $v: {
                handler: function (val) {
                    if(!val.$invalid) {
                        this.$store.commit('document/setDocumentNotices', this.document_notices);
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
                this.document_notices.push({
                    description: '',
                    margin_top: '',
                    margin_left: '',
                    margin_button: '',
                    margin_rigth: '',
                })
            },
            deleteDetail(index) {
                this.document_notices.splice(index, 1);
            }
        },
        mounted() {
            let _document_notices = this.$store.state.document.document_notices;
            if (_document_notices.length > 0) {
                this.document_notices = _document_notices;
            }
            if(!this.$v.$invalid) {
                this.$emit('can-continue', {value: true});
            } else {
                this.$emit('can-continue', {value: false});
            }
        }
    }
</script>