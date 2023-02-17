<template>
    <div class="container">
        <form>
            <div class="form-group">
                <label for="document_type">Jenis Dokumen</label>
                <input type="text" disabled :class="['input', (!$v.form.document_type.required) ? 'is-invalid form-control' : 'form-control']" v-model="form.document_type" id="document_type" aria-describedby="document_type" placeholder="Pilih Jenis Dokumen">
                <small id="document_type" v-if="!$v.form.document_type.required"  class="form-text text-muted">Jenis Dokumen Wajid Diisi!</small>
            </div>
            <div class="form-group">
                <label for="title">Judul*</label>
                <textarea type="text" :class="['input', (!$v.form.title.required) ? 'is-invalid form-control' : 'form-control']" v-model="form.title" id="title" aria-describedby="title" placeholder="Ketik Judul" rows="3"></textarea>
                <small id="title" v-if="!$v.form.title.required"  class="form-text text-muted">Judul Wajib Diisi!</small>
            </div>
            <!-- <div class="form-group">
                <label for="title">Number Dokumen*</label>
                <input type="text" :class="['input', (!$v.form.document_number.required) ? 'is-invalid form-control' : 'form-control']" v-model="form.document_number" id="document_number" aria-describedby="title" placeholder="Ketik Number Dokumen">
                <small id="document_number" v-if="!$v.form.document_number.required"  class="form-text text-muted">Judul Wajib Diisi!</small>
            </div> -->
            <!-- <div class="form-group">
                <label for="signer">Pejabat yang Menandatangani*</label>
                <input type="text" :class="['input', (!$v.form.signer.required) ? 'is-invalid form-control' : 'form-control']" v-model="form.signer" id="signer" aria-describedby="signer" placeholder="Ketik Pejabat yang Menandatangani">
                <small id="signer" v-if="!$v.form.signer.required"  class="form-text text-muted">Pejabat yang Menandatangani Wajib Diisi!</small>
            </div> -->
            <div class="form-group">
                <label for="date">Tanggal Pengajuan*</label>
                <input type="date" :class="['input', (!$v.form.date.required) ? 'is-invalid form-control' : 'form-control']" v-model="form.date" id="date" aria-describedby="date" placeholder="Ketik Tanggal Pengajuan">
                <small id="date" v-if="!$v.form.date.required"  class="form-text text-muted">Tanggal Pengajuan Wajib Diisi!</small>
            </div>
        </form>
        <div class="row">
        <div class="col">
            <label for="document_supports">Upload Surat Pengantar & Dokumen Pendukung *</label>
            <div
                class="card border d-flex justify-content-center text-center"
                style="height: 150px"
            >
                <div class="align-self-center mb-3">
                    <img src="@/assets/upload.png" width="100px" />
                </div>
                <button
                    class="btn btn-sm btn-primary align-self-center"
                    style="width: 15%"
                    @click="upload"
                    >
                    Upload Disini
                </button>
            </div>
        </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="div">
                    <input
                        hidden
                        type="file"
                        class="form-control"
                        ref="uploadField"
                        @change="selectFile"
                    />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-1" v-for="(item, index) in document_supports" :key="item.file">
            <CCardLink :href="item.file" target="_blank" class="">
                <img src="@/assets/attachment.png" width="100%" />
            </CCardLink>
            <button
                class="btn btn-danger btn-sm btn-block mt-2"
                @click="deleteFile('update', index)"
            >
                Hapus
            </button>
            <br />
            </div>
        </div>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'
    import { uploadFile } from "@/utils/fileUpload";
 
    export default {
        props: ['clickedNext', 'currentStep'],
        mixins: [validationMixin],
        data() {
            return {
                form: {
                    document_type: 'Keputusan Bupati',
                    title: '',
                    // document_number: '',
                    // signer: '',
                    date: '',
                },
                document_supports: []
            }
        },
        methods: {
            upload() {
                this.$refs.uploadField.click();
            },
            selectFile(event) {
            this.file = event.target.files[0];
            var loading = this.$loading.show();
            uploadFile(this.file)
                .then((resp) => {
                    this.document_supports.push({file: resp});
                    loading.hide();
                    this.$swal.fire({
                        icon: 'success',
                        text: 'File berhasil diupload !!',
                    });
                })
                .catch((e) => {
                    loading.hide();
                    this.$swal.fire({
                        icon: 'warning',
                        text: 'Terjadi kesalahan, ' + e,
                    })
                });
            },
        },
        validations: {
            form: {
                document_type: {
                    required
                },
                title: {
                    required
                },
                // document_number: {
                //     required
                // },
                // signer: {
                //     required
                // },
                date: {
                    required
                },
            },
            document_supports: {
                required
            }
        },
        watch: {
            $v: {
                handler: function (val) {
                    console.log(!val.$invalid, "invalid", this.document_supports.length);
                    if(!val.$invalid) {
                        this.form.document_supports = this.document_supports;
                        this.$store.commit('document/setDocument', this.form);
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
            let document = this.$store.state.document.document;
            this.form.title = document.title ? document.title : '';
            this.form.date = document.date ? document.date : '';
            this.document_supports = document.document_supports ? document.document_supports : [];
            if(!this.$v.$invalid) {
                this.$emit('can-continue', {value: true});
            } else {
                this.$emit('can-continue', {value: false});
            }
        }
    }
</script>