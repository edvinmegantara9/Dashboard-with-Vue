<template>
  <div>
    <h3>Dokumen OPD</h3>
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
          <div class="col-md-5 ml-auto">
            <div class="row">
              <div class="col">
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
                    @change="getDocuments"
                  >
                    <!-- <option selected>Pilih...</option> -->
                    <option selected value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <button class="btn btn-sm btn-primary" @click="addDocuments()">
                  Tambah Dokumen
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
              >
                Edit
              </CButton>
              <CButton @click="hapus(item)" color="danger" square size="sm">
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
        <div class="col">
          <CSelect
            :value.sync="form.document_type"
            label="Tipe"
            placeholder="Pilih"
            :options="computedTypes"
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
      fields: data.fields,
      isUpdate: false,
      items: [],
      users: [],
      docTypes: [],
      page: 1,
      total: 0,
      form: {},
      params: {
        sorttype: "desc",
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
      var loading = this.$loading.show();
      this.$store
        .dispatch("auth/me")
        .then((resp) => {
          console.log(resp.data);
          this.form.upload_by = resp.data.role_id;
          console.log(this.form);
          this.$store
            .dispatch("docs/addDocuments", this.form)
            .then(() => {
              this.$toast.success("Berhasil menambahkan dokumen");
              loading.hide();
              this.createModal = false;
              this.form = {};
              this.getDocuments();
            })
            .catch((e) => {
              this.$toast.error(e);
              loading.hide();
            });
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    edit(item) {
      var data = JSON.parse(JSON.stringify(item));
      delete data.updated_at;
      delete data.deleted_at;
      delete data.created_at;

      this.form = data;
      this.form.upload_by = data.uploader.id;
      this.docTypes.forEach((element) => {
        if (this.form.document_type == element.name) {
          this.form.document_type = element.id;
        }
      });
      this.isUpdate = true;
      this.createModal = true;
    },
    download(item) {
      window.open(item.file, "_blank");
    },
    cancel() {
      this.docTypes.forEach((element) => {
        if (this.form.document_type == element.id) {
          this.form.document_type = element.name;
        }
      });
      this.form = {};
      this.createModal = false;
    },
    update() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("docs/updateDocuments", { id: this.form.id, data: this.form })
        .then(() => {
          this.$toast.success("Berhasil merubah data dokumen");
          loading.hide();
          this.createModal = false;
          this.form = {};
          this.getDocuments();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    hapus(item) {
      if (confirm("Data akan dihapus !!")) {
        this.$store
          .dispatch("docs/deleteDocuments", item.id)
          .then(() => {
            this.$toast.success("Berhasil menghapus data dokumen");

            this.form = {};
            this.getDocuments();
          })
          .catch((e) => {
            this.$toast.error(e);
            loading.hide();
          });
      }
    },
    getDocuments() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("docs/getDocuments", this.params)
        .then((resp) => {
          this.items = resp.data.data;
          this.total = resp.data.total;
          this.$store
            .dispatch("user/getUser", this.params)
            .then((resp) => {
              this.users = resp.data.data;
              this.items.forEach((element) => {
                this.users.forEach((e) => {
                  if (element.upload_by == e.id) {
                    element.upload_by = e.role.name;
                  }
                });
              });
            })
            .catch((e) => {
              this.$toast.error(e);
            });
          loading.hide();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    getDocumentsType() {
      this.$store
        .dispatch("docs/getDocumentsType")
        .then((resp) => {
          this.docTypes = resp.data.data;
          console.log(this.docTypes);
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data tipe dokumen \n", e);
        });
    },
    addDocuments() {
      this.isUpdate = false;
      this.createModal = true;
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getDocuments();
      // console.log(page);
    },
  },
  computed: {
    computedItems() {
      return this.items.map((item) => {
        return {
          ...item,
          document_type: item.document_type.name,
          upload_by: item.uploader ? item.uploader.name : "Tidak ada",
          updated_at: item.updated_at.slice(0, 10),
        };
      });
    },
    computedTypes() {
      return this.docTypes.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    },
  },
  mounted() {
    this.getDocuments();
    this.getDocumentsType();
  },
};
</script>