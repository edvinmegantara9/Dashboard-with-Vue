<template>
  <div>
    <CCard>
      <CCardBody>
        <div class="row">
          <div class="col-6">
            <CInput
              v-model="form.name"
              label="Nama Perusahaan"
              placeholder="ketik disini"
            />
          </div>
          <div class="col-6">
            <CInput
              v-model="form.email"
              label="Email Perusahaan"
              placeholder="ketik disini"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <CInput
              v-model="form.address"
              label="Alamat"
              placeholder="ketik disini"
            />
          </div>
          <div class="col-6">
            <CInput
              v-model="form.phone_number"
              label="No. Telp"
              placeholder="ketik disini"
            />
          </div>
        </div>

        <div class="row mt-3 mb-3">
          <div class="col-12">
            <table class="table table-bordered">
              <tr>
                <td>Judul</td>
                <td>Deskripsi</td>
                <td></td>
              </tr>
              <tr v-for="(service, index) in form.company_services" :key="service.id">
                <td>
                  <CInput
                    v-model="service.title"
                    placeholder="ketik Judul"
                  />
                </td>
                <td>
                  <CInput
                    v-model="service.description"
                    placeholder="Ketik Deskripsi"
                  />
                </td>
                <td style="width: 50px">
                  <CButton 
                    @click="removeService(index)"
                    color="danger"
                    square
                    size="sm"
                  >
                    Hapus
                  </CButton>
                </td>
              </tr>
            </table>
            <CButton 
              @click="addService"
              color="success"
              square
              size="sm"
            >
              + Tambah Layanan
            </CButton>
          </div>
        </div>


        <div class="row mt-3 mb-3">
          <div class="col-12">
            <table class="table table-bordered">
              <tr>
                <td>Nama</td>
                <td>Logo</td>
                <td></td>
              </tr>
              <tr v-for="(client, index) in form.company_clients" :key="client.id">
                <td>
                  <CInput
                    v-model="client.name"
                    placeholder="ketik Nama"
                  />
                </td>
                <td style="width: 150px">
                  <div v-if="client.logo">
                    <CCardLink :href="client.logo" target="_blank" class="">
                      <CCardImg
                        :src="client.logo"
                        style="object-fit: cover"
                        height="auto"
                        variant="full"
                      />
                    </CCardLink>

                    <button
                      class="btn btn-danger btn-sm btn-block mt-2"
                      @click="deleteImage(index)"
                    >
                      Hapus
                    </button>
                  </div>

                  <input v-else
                    type="file"
                    class="form-control"
                    @change="selectFile($event, index)"
                  />
                </td>
                <td style="width: 50px">
                  <CButton 
                    @click="removeClient(index)"
                    color="danger"
                    square
                    size="sm"
                  >
                  Hapus
                  </CButton></td>
              </tr>
            </table>
            <CButton 
              @click="addClient"
              color="success"
              square
              size="sm"
            >
              + Tambah Klien
            </CButton>
          </div>
        </div>

         <div class="row">
          <div class="col-12">
            <CTextarea
              v-model="form.about"
              label="Tentang Perusahaan"
              placeholder="ketik disini"
            />
          </div>
        </div>
         <div class="row">
          <div class="col-12">
            <CTextarea
              v-model="form.vision"
              label="Visi Perusahaan"
              placeholder="ketik disini"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <CTextarea
              v-model="form.mision"
              label="Misi Perusahaan"
              placeholder="ketik disini"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
             <label for="">Instruksi Tes</label>
              <vue-editor
                v-model="form.test_instruction"
                placeholder="Ketik disini..."
              ></vue-editor>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
             <label for="">Panduan Pembayaran</label>
              <vue-editor
                v-model="form.payment_instruction"
                placeholder="Ketik disini..."
              ></vue-editor>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
             <label for="">Tentang Aplikasi</label>
              <vue-editor
                v-model="form.about_application"
                placeholder="Ketik disini..."
              ></vue-editor>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
             <label for="">Tentang Aplikasi</label>
              <vue-editor
                v-model="form.about_application"
                placeholder="Ketik disini..."
              ></vue-editor>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
             <label for="">Kebijakan Privasi</label>
              <vue-editor
                v-model="form.privacy_policy"
                placeholder="Ketik disini..."
              ></vue-editor>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
             <label for="">Kebijakan Pengembalian</label>
              <vue-editor
                v-model="form.developer_policy"
                placeholder="Ketik disini..."
              ></vue-editor>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
             <label for="">Syarat & Ketentuan</label>
              <vue-editor
                v-model="form.term_and_condition"
                placeholder="Ketik disini..."
              ></vue-editor>
          </div>
        </div>
      </CCardBody>
      <CCardFooter>
        <div>
          <button @click="back" class="btn btn-secondary mr-3">Kembali</button>
          <button @click="update" class="btn btn-primary">
            Simpan
          </button>
        </div>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { uploadImage } from "@/utils/fileUpload";

export default {
  components: {
    VueEditor   
  },
  data() {
    return {
      form: {
        company_services: [],
        company_clients: []
      }
    };
  },
  methods: {
    deleteImage(index) {
      this.form.company_clients[index].logo = null;
    },
    selectFile(event, index) {
      this.file = event.target.files[0];
      var loading = this.$loading.show();
      uploadImage(this.file)
        .then((resp) => {
          this.form.company_clients[index].logo = resp;
          loading.hide();
          this.update();
          this.$toast.success("File berhasil diupload !!");
        })
        .catch((e) => {
          loading.hide();
          this.$toast.error("Terjadi kesalahan !!");
        });
    },
    addService() {
      this.form.company_services.push({
        title: "",
        description: "",
      })
      this.update();
    },
    removeService(index) {
      this.form.company_services.splice(index, 1);
    },
    addClient() {
      this.form.company_clients.push({
        title: "",
        description: "",
      })
    },
    removeClient(index) {
      this.form.company_clients.splice(index, 1);
    },
    back() {
      this.$router.replace({ path: "company" });
    },
    update() {
        var loading = this.$loading.show();
        this.$store
          .dispatch("company/updateCompany", {
            id: this.form.id,
            data: this.form,
          })
          .then(() => {
            this.$toast.success("Berhasil merubah data ");
            loading.hide();
          })
          .catch((e) => {
            loading.hide();
          });
    },
    getData() {
        let loading = this.$loading.show();
        this.$store.dispatch("company/getCompanyById", this.$route.query.id).then(
            (data) => {
                const result = data;
                if (result.status == 200) {
                    this.form = result.data;
                }
                loading.hide();
            },
            (error) => {
                loading.hide();
            }
        );
    },
  },
  mounted() {
    this.getData();
  },
};
</script>