<template>
  <div>
    <h3>Dokumen Kota</h3>
    <br />
    <CCard>
      <CCardBody>
        <div class="row">
          <div class="col-md-5">
            <div class="row mb-3">
              <label class="m-1 ml-3" for="">Search : </label>
              <input
                type="text"
                style="max-width: 200px"
                class="form-control form-control-sm mx-2"
                placeholder="Ketik disini"
              />
              <button class="btn btn-sm btn-success">Cari</button>
            </div>
          </div>
          <div :class="['col-md-5', 'ml-auto', user.role.is_opd == 0 || user.role.name.toLowerCase() == 'admin'? '':'offset-md-2']">
            <div class="row">
              <div :class="['col-md-6', user.role.is_opd == 0 || user.role.name.toLowerCase() == 'admin'? '':'offset-md-6']">
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01"
                      >Per Halaman</label
                    >
                  </div>
                  <select
                    class="custom-select"
                    style="max-width: 100px"
                    id="inputGroupSelect01"
                    v-model="params.row"
                    @change="getPubDocuments"
                  >
                    <!-- <option selected>Pilih...</option> -->
                    <option selected value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <button
                  v-if="
                  user.role.is_opd == 0 ||
                  user.role.name.toLowerCase() == 'admin'
                "
                  class="btn btn-sm btn-primary"
                  @click="addPubDocuments()"
                >
                  Tambah Dokumen Kota
                </button>
              </div>
            </div>
          </div>
        </div>
        <CDataTable
          class="table-striped"
          :items="computedItems"
          :fields="fields"
        >
          <template #action="{ item }">
            <td class="py-2">
              <CButton
                @click="download(item)"
                class="mr-2"
                color="success"
                square
                size="sm"
              >
                Download
              </CButton>
              <CButton
                @click="edit(item)"
                class="mr-2"
                color="warning"
                square
                size="sm"
                v-if="
                  user.role.is_opd == 0 ||
                  user.role.name.toLowerCase() == 'admin'
                "
              >
                Edit
              </CButton>
              <CButton 
                @click="hapus(item)" 
                color="danger" 
                square 
                size="sm"
                v-if="
                  user.role.is_opd == 0 ||
                  user.role.name.toLowerCase() == 'admin'
                "
              >
                Delete
              </CButton>
            </td>
          </template>
        </CDataTable>
        <pagination
          v-if="total > 5"
          v-model="page"
          :records="total"
          :per-page="5"
          @paginate="pagination"
        />
      </CCardBody>
    </CCard>
    <CModal
      size="lg"
      :title="isUpdate ? 'Edit Dokumen' : 'Tambah Dokumen'"
      centered
      :color="isUpdate ? 'success' : 'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col">
          <CInput
            v-model="form.title"
            label="Nama Dokumen"
            placeholder="ketik disini"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="div" v-if="!isUpdate">
            <label class="form-label" for="newData.file">Upload File</label>
            <input
              type="file"
              class="form-control"
              id="newData.file"
              @change="selectFile"
            />
          </div>
          <CInput
            v-if="isUpdate"
            v-model="form.file"
            label="File Dokumen"
            type="text"
            disabled
          />
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>

          <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
            Tambah Dokumen
          </button>
          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update Dokumen
          </button>
        </div>
      </template>
    </CModal>
  </div>
</template>



<script>
import * as data from "../../model/document";
import { uploadFile } from "@/utils/fileUpload";

export default {
  data() {
    return {
      createModal: false,
      fields: data.fieldsPublic,
      isUpdate: false,
      user: {
        role : { is_opd: null, name: '' }
      },
      items: [],
      opd_list: [],
      page: 1,
      total: 0,
      form: {},
      params: {
        sorttype: "asc",
        sortby: "id",
        row: 5,
        page: 1,
      },
    };
  },
  methods: {
    selectFile(event) {
      console.log(event);
      this.file = event.target.files[0];
      var loading = this.$loading.show();
      uploadFile(this.file)
        .then((resp) => {
          this.form.file = resp;
          loading.hide();
          alert("File berhasil diupload !!");
        })
        .catch((e) => {
          loading.hide();
          alert("Terjadi kesalahan !! | " + e);
        });
    },

    submit() {
      this.form.document_type = 0;
      var loading = this.$loading.show();
      this.$store
      .dispatch("docs/addPubDocuments", this.form)
      .then(() => {
        this.$toast.success("Berhasil menambahkan dokumen");
        loading.hide();
        this.createModal = false;
        this.form = {};
        this.getPubDocuments();
      })
      .catch((e) => {
        this.$toast.error(e);
        loading.hide();
      });
    },
    edit(item) {
      this.form = item;
      this.isUpdate = true;
      this.createModal = true;
    },
    download(item) {
      window.open(item.file, "_blank");
    },
    cancel() {
      this.form = {};
      this.createModal = false;
    },
    update() {
      var loading = this.$loading.show();
      delete this.form.updated_at;
      this.$store
        .dispatch("docs/updatePubDocuments", {
          id: this.form.id,
          data: this.form,
        })
        .then(() => {
          this.$toast.success("Berhasil merubah tipe dokumen");
          loading.hide();
          this.createModal = false;
          this.form = {};
          this.getPubDocuments();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    hapus(item) {
      if (confirm("Data akan dihapus !!")) {
        this.$store
          .dispatch("docs/deletePubDocuments", item.id)
          .then(() => {
            this.$toast.success("Berhasil menghapus data tipe dokumen");

            this.form = {};
            this.getPubDocuments();
          })
          .catch((e) => {
            this.$toast.error(e);
            loading.hide();
          });
      }
    },
    getPubDocuments() {
      this.params.role_id = this.user.role.id;
      var loading = this.$loading.show();
      this.$store
        .dispatch("docs/getPubDocuments", this.params)
        .then((resp) => {
          this.items = resp.data.data.filter(data => data.document_type == 0);
          this.total = resp.data.total;
          loading.hide();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    addPubDocuments() {
      this.isUpdate = false;
      this.createModal = true;
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getPubDocuments();
      // console.log(page);
    },
    getUserFromLocal() {
      var data = JSON.parse(localStorage.getItem("user"));
      this.user = data;

      this.getOpdList();
    },
    getOpdList() {
      this.opd_list = this.user.role.opd.map((e) => {
        return e.id;
      });
    },
  },
  watch: {
    computedItems(val) {},
  },
  computed: {
    computedItems() {
      return this.items.map((item) => {
        return {
          ...item,
          created_at: item.created_at.slice(0, 10),
          updated_at: item.updated_at.slice(0, 10),
        };
      });
    },
  },
  mounted() {
    this.getUserFromLocal();
    this.getPubDocuments();
  },
};
</script>