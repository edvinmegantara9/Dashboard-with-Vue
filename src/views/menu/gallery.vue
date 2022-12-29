<template>
  <div>
    <h3 class="font-weight-bold">Gallery</h3>
    <br />
    <CContainer class="pr-md-5" fluid>
      <CRow class="mb-3">
        <CCol sm="12" class="text-right">
          <button v-if="user.role.is_opd != 1" @click="addData" class="btn btn-sm btn-primary">
            Tambah Gallery
          </button>
        </CCol>
      </CRow>
      <CRow v-if="gallery.length > 0">
        <CCol md="4" sm="6" v-for="glr in gallery" :key="glr.id">
          <CCard class="rounded shadow">
            <CCardHeader class="p-0">
              <carousel :per-page="1">
                <slide v-for="item in extractGallery(glr.file)" :key="item">
                  <CCardLink :href="item" target="_blank" class="">
                    <CCardImg
                      :src="item"
                      style="object-fit: cover"
                      height="350px"
                      variant="full"
                    />
                  </CCardLink>
                </slide>
              </carousel>
            </CCardHeader>
            <CCardBody>
              <h5 class="font-weight-bold">{{ glr.title }}</h5>
              <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> -->
            </CCardBody>
            <CCardFooter>
              <div class="row">
                <button
                  class="btn btn-sm btn-info mr-1 ml-3"
                  @click="openDetail(glr)"
                >
                  Detail
                </button>
                <button v-if="user.role.is_opd != 1" class="btn btn-sm btn-warning mr-1" @click="edit(glr)">
                  Edit
                </button>
                <button v-if="user.role.is_opd != 1" @click="hapus(glr)" class="btn btn-sm btn-danger">
                  Delete
                </button>
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
      v-if="user.role.is_opd != 1"
      size="lg"
      :title="isUpdate ? 'Edit Gallery' : 'Tambah Gallery'"
      centered
      :color="isUpdate ? 'success' : 'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col text-center">
          <div
            v-if="imageList.length <= 3"
            class="card border d-flex justify-content-center"
            style="height: 250px"
          >
            <div class="align-self-center mb-3">
              (MAKS 4)
              <br />
              <img src="@/assets/upload.png" width="100px" alt="" />
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
        <div class="col-md-3" v-for="(item, index) in imageList" :key="item">
          <!-- <img
            :src="item"
            class="align-self-center mb-4"
            style="width: 100%; height: 230px; object-fit: cover"
          /> -->
          <CCardLink :href="item" target="_blank" class="">
            <CCardImg
              :src="item"
              style="object-fit: cover"
              height="250px"
              variant="full"
            />
          </CCardLink>

          <button
            class="btn btn-danger btn-sm btn-block mt-2"
            @click="deleteImage('create', index)"
          >
            Hapus
          </button>
          <br />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <CInput
            v-model="form.title"
            label="Judul"
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
      <div class="row">
        <div class="col">
          <label for="">Deskripsi</label>
          <vue-editor
            v-model="form.description"
            placeholder="Ketik disini..."
          ></vue-editor>
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

    <!-- form update -->

    <CModal
      v-if="user.role.is_opd != 1"
      size="lg"
      title="Edit Gallery"
      centered
      color="success"
      :show.sync="updateModal"
    >
      <div class="row">
        <div class="col text-center">
          <div
            v-if="extractGallery(form.file).length <= 3"
            class="card border d-flex justify-content-center"
            style="height: 250px"
          >
            <div class="align-self-center mb-3">
              (MAKS 4)
              <br />
              <img src="@/assets/upload.png" width="100px" alt="" />
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
        <div class="col-md-3" v-for="(item, index) in imageList" :key="item">
          <!-- <img
            :src="item"
            class="align-self-center mb-4"
            style="width: 100%; height: 230px; object-fit: cover"
          /> -->
          <CCardLink :href="item" target="_blank" class="">
            <CCardImg
              :src="item"
              style="object-fit: cover"
              height="250px"
              variant="full"
            />
          </CCardLink>

          <button
            class="btn btn-danger btn-sm btn-block mt-2"
            @click="deleteImage('update', index)"
          >
            Hapus
          </button>
          <br />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <CInput
            v-model="form.title"
            label="Judul"
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
      <div class="row">
        <div class="col">
          <label for="">Deskripsi</label>
          <vue-editor
            v-model="form.description"
            placeholder="Ketik disini..."
          ></vue-editor>
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>

          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update Gallery
          </button>
        </div>
      </template>
    </CModal>
    <!-- bottom sheet -->
    <vue-bottom-sheet
      v-if="selectedGallery != { file: '' }"
      :is-full-screen="true"
      max-width="100%"
      max-height="95%"
      ref="myBottomSheet"
    >
      <div class="row">
        <div class="col-lg-10 mx-auto">
          <h4>
            <strong>{{ selectedGallery.title }}</strong>
          </h4>
          <span>{{
            selectedGallery.created_at | moment("dddd, Do MMMM  YYYY")
          }}</span>

          <hr />

          <carousel :per-page="1" class="text-center mt-3 mb-3">
            <slide
              v-for="item in extractGallery(selectedGallery.file)"
              :key="item"
            >
              <img :src="item" style="object-fit: cover" width="100%" />
            </slide>
          </carousel>
          <hr />
          <div class="text-justify" v-html="selectedGallery.description"></div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>


<script>
import { uploadImage } from "@/utils/fileUpload";
import { VueEditor } from "vue2-editor";
import { Carousel, Slide } from "vue-carousel";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";

export default {
  components: {
    VueEditor,
    Carousel,
    Slide,
    VueBottomSheet,
  },

  data() {
    return {
      gallery: [],
      selectedGallery: {
        file: "",
      },
      page: 1,
      updateModal: false,
      imageList: [],
      last_page: 1,
      preview: "",
      total: 0,
      form: {
        file: "",
      },
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 6,
        page: 1,
      },
      createModal: false,
      isUpdate: false,
      isShow: false,
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  methods: {
    openDetail(data) {
      this.selectedGallery = data;
      this.$refs.myBottomSheet.open();
    },
    closeDetail() {
      this.$refs.myBottomSheet.close();
    },
    getData() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("gallery/getGallery", this.params)
        .then((resp) => {
          this.gallery = resp.data.data;
          this.total = resp.data.total;

          // khusus untuk checkbox
          this.selectedItems = [];
          this.items.forEach(element => {
            if (this.isSelectedAll) {
              element.select = true;
              this.selectedItems.push(element.id);
            } else {
              element.select = false;
            }
          });
          this.last_page = resp.data.last_page;
          loading.hide();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    extractGallery(item) {
      return item.split(",");
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
    deleteImage(state, index) {
      this.imageList.splice(index, 1);
    },
    selectFile(event) {
      console.log(event);
      this.file = event.target.files[0];
      var loading = this.$loading.show();
      uploadImage(this.file)
        .then((resp) => {
          this.imageList.push(resp);
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
      this.updateModal = false;
      this.form = {
        file: "",
      };
    },
    submit() {
      var loading = this.$loading.show();
      this.form.file = this.imageList.join(",");
      this.$store
        .dispatch("gallery/addGallery", this.form)
        .then(() => {
          loading.hide();
          this.$toast.success("Berhasil menambah gallery");
          this.form = { file: "" };
          this.createModal = false;
          this.imageList = [];
          this.getData();
        })
        .catch((e) => {
          loading.hide();
          this.$toast.error("Gagal menambah gallery | " + e);
        });
    },
    edit(item) {
      this.form.title = item.title;
      this.form.id = item.id;
      this.form.description = item.description;
      this.imageList = this.extractGallery(item.file);
      this.isUpdate = true;
      this.updateModal = true;
    },
    update() {
      var loading = this.$loading.show();
      this.form.file = this.imageList.join(",");
      this.$store
        .dispatch("gallery/updateGallery", {
          data: this.form,
          id: this.form.id,
        })
        .then(() => {
          loading.hide();
          this.$toast.success("Berhasil merubah gallery");
          this.form = { file: "" };

          this.updateModal = false;
          this.imageList = [];
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
      this.preview = "";
      this.form = { file: "" };
    },

    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
    },
  },
  mounted() {
    this.getData();
    console.log(this.user.role);
  },
};
</script>