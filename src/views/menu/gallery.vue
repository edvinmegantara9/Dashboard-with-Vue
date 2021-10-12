<template>
  <div>
    <h3 class="font-weight-bold">Gallery</h3>
    <br />
    <CContainer class="pr-md-5" fluid>
      <CRow class="mb-3">
        <CCol sm="12" class="text-right">
          <button @click="addData" class="btn btn-sm btn-primary">
            Tambah Gallery
          </button>
        </CCol>
      </CRow>
      <CRow v-if="gallery.length > 0">
        <CCol md="4" sm="6" v-for="glr in gallery" :key="glr.id">
          <CCard class="rounded shadow">
            <CCardHeader class="p-0">
              <CCardLink :href="glr.file" target="_blank" class="">
                <CCardImg
                  :src="glr.file"
                  style="object-fit: cover"
                  height="400px"
                  variant="full"
                />
              </CCardLink>
            </CCardHeader>
            <CCardBody>
              <h5 class="font-weight-bold">{{ glr.title }}</h5>
              <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> -->
            </CCardBody>
            <CCardFooter>
              <div class="row">
                <div class="col-6 ml-auto">
                  <button
                    class="btn btn-sm btn-warning mr-1 ml-3"
                    @click="edit(glr)"
                  >
                    Edit
                  </button>
                  <button @click="hapus(glr)" class="btn btn-sm btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CRow v-else>
        <CCol sm="12"> Tidak ada Gallery </CCol>
      </CRow>
      <CPagination
        v-if="total > params.row"
        :activePage.sync="page"
        :pages="last_page"
        @update:activePage="pagination"
        align="center"
      />
    </CContainer>
    <CModal
      size="lg"
      :title="isUpdate ? 'Edit Gallery' : 'Tambah Gallery'"
      centered
      :color="isUpdate ? 'success' : 'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col text-center">
          <div
            class="card border d-flex justify-content-center"
            style="height: 250px"
          >
            <img
              v-if="!preview"
              src="@/assets/upload.png"
              class="align-self-center mb-4"
              height="35%"
              width="15%"
              alt=""
            />
            <button
              v-if="!preview"
              class="btn btn-sm btn-primary align-self-center"
              style="width: 15%"
              @click="upload"
            >
              Upload Disini
            </button>

            <div v-if="preview" class="align-self-center">
              <img
                :src="preview"
                style="width: 100%; height: 230px; object-fit: cover"
                alt=""
              />
            </div>
          </div>
          <center>
            <button
              class="btn btn-sm btn-primary"
              @click="upload"
              v-if="preview && isUpdate"
            >
              Ubah Foto
            </button>
          </center>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CInput
            v-model="form.title"
            label="Deskripsi"
            placeholder="ketik disini"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="div">
            <!-- <label class="form-label" for="newData.file">Upload File</label> -->
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
      <template slot="footer">
        <div>
          <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>

          <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
            Tambah Gallery
          </button>
          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update Gallery
          </button>
        </div>
      </template>
    </CModal>
  </div>
</template>


<script>
import { uploadImage } from "@/utils/fileUpload";
export default {
  data() {
    return {
      gallery: [],
      page: 1,
      last_page: 1,
      preview: "",
      total: 0,
      form: {},
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 6,
        page: 1,
      },
      createModal: false,
      isUpdate: false,
      isShow: false,
    };
  },
  methods: {
    getData() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("gallery/getGallery", this.params)
        .then((resp) => {
          this.gallery = resp.data.data;
          this.total = resp.data.total;
          this.last_page = resp.data.last_page;
          loading.hide();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    upload() {
      this.$refs.uploadField.click();
    },
    hapus(item) {
      if (confirm("Data akan dihapus permanen !!")) {
        var loading = this.$loading.show();
        this.$store
          .dispatch("gallery/deleteGallery", item.id)
          .then(() => {
            loading.hide();
            this.$toast.success("Berhasil menghapus gallery");

            this.createModal = false;
            this.getData();
          })
          .catch((e) => {
            loading.hide();
            this.$toast.error("Terjadi kesalahan !! | " + e);
          });
      }
    },
    selectFile(event) {
      console.log(event);
      this.file = event.target.files[0];
      var loading = this.$loading.show();
      uploadImage(this.file)
        .then((resp) => {
          this.form.file = resp;
          this.preview = resp;
          loading.hide();
          alert("File berhasil diupload !!");
        })
        .catch((e) => {
          loading.hide();
          alert("Terjadi kesalahan !! | " + e);
        });
    },
    cancel() {
      this.createModal = false;
      this.form = {};
    },
    submit() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("gallery/addGallery", this.form)
        .then(() => {
          loading.hide();
          this.$toast.success("Berhasil menambah gallery");
          this.form = {};
          this.createModal = false;
          this.getData();
        })
        .catch((e) => {
          loading.hide();
          this.$toast.error("Gagal menambah gallery | " + e);
        });
    },
    edit(item) {
      this.preview = item.file;
      this.form.title = item.title;
      this.form.id = item.id;
      this.isUpdate = true;
      this.createModal = true;
    },
    update() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("gallery/updateGallery", {
          data: this.form,
          id: this.form.id,
        })
        .then(() => {
          loading.hide();
          this.$toast.success("Berhasil merubah gallery");
          this.form = {};
          this.createModal = false;
          this.getData();
        })
        .catch((e) => {
          loading.hide();
          this.$toast.error("Gagal menambah gallery | " + e);
        });
    },
    addData() {
      this.isUpdate = false;
      this.createModal = true;
      this.form = {};
    },

    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>