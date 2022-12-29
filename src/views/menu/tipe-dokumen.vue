<template>
  <div>
    <h3>Tipe Dokumen</h3>
    <br />
    <CCard>
      <CCardBody>
        <div class="row">
          <div class="col-md-5">
            <div class="row mb-3">
              <label class="m-1 ml-3" for="">Search : </label>
              <input
                type="text"
                v-model="params.keyword"
                style="max-width: 200px"
                class="form-control form-control-sm mx-2"
                placeholder="Ketik disini"
              />
              <button @click="search()" class="btn btn-sm btn-success">
                Cari
              </button>
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
                    @change="getDocumentsType"
                  >
                    <!-- <option selected>Pilih...</option> -->
                    <option selected value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option><option value="1000">1000</option>
<option value="2000">2000</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <button
                  class="btn btn-sm btn-primary"
                  @click="addDocumentsType()"
                >
                  Tambah Tipe Dokumen
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="isSearching">
          <div class="col">
            <h3>
              <span class="badge bg-primary text-light text-bor my-auto">
                {{searchOn}}&nbsp;&nbsp;
                <span @click="searchOff" class="badge bg-light text-dark text-center" style="cursor: pointer">X</span>
              </span>
            </h3>
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
          v-if="total !== items.length"
          v-model="page"
          :records="total"
          :per-page="params.row"
          @paginate="pagination"
        />
      </CCardBody>
    </CCard>
    <CModal
      size="lg"
      :title="isUpdate ? 'Edit Tipe Dokumen' : 'Tambah Tipe Dokumen'"
      centered
      :color="isUpdate ? 'success' : 'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col">
          <CInput
            v-model="form.name"
            label="Nama Tipe Dokumen"
            placeholder="ketik disini"
          />
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>

          <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
            Tambah Tipe Dokumen
          </button>
          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update Tipe Dokumen
          </button>
        </div>
      </template>
    </CModal>
  </div>
</template>



<script>
import * as data from "../../model/document";

export default {
  data() {
    return {
      createModal: false,
      fields: data.fieldsType,
      isUpdate: false,
      items: [],
      docTypes: [],
      page: 1,
      total: 0,
      form: {},
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 50,
        page: 1,
        keyword: "",
      },
      isSearching: false,
      searchOn: ''
    };
  },
  methods: {
    search() {
      if (this.params.keyword != "") {
        this.isSearching = true;
        this.getDocumentsType();
        this.searchOn = this.params.keyword;
        // this.params.keyword = '';
      } else {
        this.$toast.error("Inputan tidak boleh kosong !!");
      }
    },

    searchOff(){
      this.isSearching = false;
      this.getDocumentsType();
    },
    submit() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("docs/addDocumentsType", this.form)
        .then(() => {
          this.$toast.success("Berhasil menambahkan tipe dokumen");
          loading.hide();
          this.createModal = false;
          this.form = {};
          this.getDocumentsType();
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
    cancel() {
      this.form = {};
      this.createModal = false;
    },
    update() {
      var loading = this.$loading.show();
      delete this.form.updated_at;
      this.$store
        .dispatch("docs/updateDocumentsType", {
          id: this.form.id,
          data: this.form,
        })
        .then(() => {
          this.$toast.success("Berhasil merubah data tipe dokumen");
          loading.hide();
          this.createModal = false;
          this.form = {};
          this.getDocumentsType();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    hapus(item) {
      if (confirm("Data akan dihapus !!")) {
        this.$store
          .dispatch("docs/deleteDocumentsType", item.id)
          .then(() => {
            this.$toast.success("Berhasil menghapus data tipe dokumen");

            this.form = {};
            this.getDocumentsType();
          })
          .catch((e) => {
            this.$toast.error(e);
            loading.hide();
          });
      }
    },
    getDocumentsType() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("docs/getDocumentsType", this.params)
        .then((resp) => {
          this.docTypes = resp.data.data;
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
          console.log(this.docTypes);
          loading.hide();
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data tipe dokumen \n", e);
          loading.hide();
        });
    },
    addDocumentsType() {
      this.isUpdate = false;
      this.createModal = true;
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getDocumentsType();
      // console.log(page);
    },
  },
  computed: {
    computedItems() {
      return this.docTypes.map((item) => {
        return {
          ...item,
          created_at: item.created_at.slice(0, 10),
          updated_at: item.updated_at.slice(0, 10),
        };
      });
    },
  },
  mounted() {
    this.getDocumentsType();
  },
};
</script>