<template>
    <div class="container">
        <form>
            <div class="form-group">
                <label for="document_type">Jenis Dokumen</label>
                <input type="text" class="form-control" disabled :class="['input', ($v.form.document_type.$error) ? 'is-danger form-control' : 'form-control']" v-model="form.document_type" id="document_type" aria-describedby="document_type" placeholder="Pilih Jenis Dokumen">
                <small id="document_type" v-if="$v.form.document_type.$error"  class="form-text text-muted">Jenis Dokumen Wajid Diisi!</small>
            </div>
            <div class="form-group">
                <label for="title">Judul</label>
                <textarea type="text" class="form-control" :class="['input', ($v.form.title.$error) ? 'is-danger form-control' : 'form-control']" v-model="form.title" id="title" aria-describedby="title" placeholder="Ketik Judul" rows="3"></textarea>
                <small id="title" v-if="$v.form.title.$error"  class="form-text text-muted">Judul Wajib Diisi!</small>
            </div>
            <div class="form-group">
                <label for="signer">Pejabat yang Menandatangani</label>
                <input type="text" class="form-control" :class="['input', ($v.form.signer.$error) ? 'is-danger form-control' : 'form-control']" v-model="form.signer" id="signer" aria-describedby="signer" placeholder="Ketik Pejabat yang Menandatangani">
                <small id="signer" v-if="$v.form.signer.$error"  class="form-text text-muted">Pejabat yang Menandatangani Wajib Diisi!</small>
            </div>
            <div class="form-group">
                <label for="date">Tanggal Pengajuan</label>
                <input type="date" class="form-control" :class="['input', ($v.form.date.$error) ? 'is-danger form-control' : 'form-control']" v-model="form.date" id="date" aria-describedby="date" placeholder="Ketik Tanggal Pengajuan">
                <small id="date" v-if="$v.form.date.$error"  class="form-text text-muted">Tanggal Pengajuan Wajib Diisi!</small>
            </div>
        </form>
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
                form: {
                    document_type: 'Keputusan Bupati',
                    title: '',
                    signer: '',
                    date: ''
                }
            }
        },
        validations: {
            form: {
                document_type: {
                    required
                },
                title: {
                    required
                },
                signer: {
                    required
                },
                date: {
                    required
                }
            }
        },
        watch: {
            $v: {
                handler: function (val) {
                    if(!val.$invalid) {
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
        mounted() {
            if(!this.$v.$invalid) {
                this.$emit('can-continue', {value: true});
            } else {
                this.$emit('can-continue', {value: false});
            }
        }
    }
</script>