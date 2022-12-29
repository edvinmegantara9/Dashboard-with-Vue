<template>
  <div>
    <h3>Laporan Harian</h3>
    <br />
    <CCard>
      <CCardBody>
        <div class="row">
          <div class="col-md-6">
            <div class="row mb-3">
              <div class="col-md-7">
                <div class="row">
                  <label class="m-1 ml-3" for="">Search : </label>
                  <input
                    type="text"
                    v-model="params.keyword"
                    style="max-width: 125px"
                    class="form-control form-control-sm mx-2"
                    placeholder="Ketik disini"
                  />
                  <button @click="search()" class="btn btn-sm btn-success">
                    Cari
                  </button>
                </div>
              </div>
              <div class="col">
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01"
                      >Per Halaman</label
                    >
                  </div>
                  <select
                    class="custom-select"
                    style="max-width: 75px"
                    id="inputGroupSelect01"
                    v-model="params.row"
                    @change="getData"
                  >
                    <!-- <option selected>Pilih...</option> -->
                    <option selected value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option><option value="1000">1000</option>
<option value="2000">2000</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 ml-auto">
            <div class="row">
              <div class="col">
                <button class="btn btn-sm btn-primary mr-2" @click="create">
                  <CIcon name="cil-plus" />
                  Tambah Laporan Harian
                </button>
                <button
                  @click="openModalExcel"
                  class="btn btn-sm btn-success mr-2"
                >
                  <CIcon name="cil-spreadsheet" />
                  Export Excel
                </button>
                <button @click="openModalPDF" class="btn btn-sm btn-danger">
                  <CIcon name="cib-adobe-acrobat-reader" />
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="isSearching">
          <div class="col">
            <h3>
              <span class="badge bg-primary text-light text-bor my-auto">
                {{ searchOn }}&nbsp;&nbsp;
                <span
                  @click="searchOff"
                  class="badge bg-light text-dark text-center"
                  style="cursor: pointer"
                  >X</span
                >
              </span>
            </h3>
          </div>
        </div>
        <CDataTable
          class="table-striped"
          :items="computedItems"
          :itemsPerPage="5"
          :fields="fields"
          sorter
        >
          <template #report="item">
            <div>
              <td
                style="
                  min-width: 450px;
                  max-width: 500px !important;
                  white-space: normal;
                "
              >
                {{ item.item.report }}
              </td>
            </div>
          </template>
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
              <CButton
                @click="destroy(item.id)"
                color="danger"
                square
                size="sm"
              >
                Delete
              </CButton>
            </td>
          </template>
        </CDataTable>
        <pagination
          v-if="total !== items.length"
          v-model="page"
          :records="total"
          :per-page="50"
          @paginate="pagination"
        />
      </CCardBody>
    </CCard>
    <CModal
      :title="!isUpdate ? 'Tambah Laporan Harian' : 'Update Laporan Harian'"
      :color="!isUpdate ? 'primary' : 'warning'"
      size="lg"
      :show.sync="createModal"
    >
      <CRow>
        <CCol sm="6">
          <CInput
            v-model="form.name"
            label="Nama"
            placeholder="Ketik disini..."
            readonly
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="Ketik disini..."
            readonly
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="form.nip"
            label="NIP"
            placeholder="Ketik disini..."
            readonly
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="form.position"
            label="Jabatan"
            placeholder="Ketik disini..."
            readonly
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="form.role"
            label="Role"
            placeholder="Ketik disini..."
            readonly
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CTextarea
            v-model="form.report"
            label="Laporan Harian"
            placeholder="Tulis laporan disini ..."
          />
        </CCol>
      </CRow>
      <template slot="footer">
        <div class="row">
          <button @click="closeModal" class="btn btn-secondary mr-3">
            Batal
          </button>

          <button @click="store" v-if="!isUpdate" class="btn btn-primary">
            Tambah Laporan
          </button>

          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update Laporan
          </button>
        </div>
      </template>
    </CModal>
    <CModal
      :title="exportType"
      :color="exportType == 'Export Excel' ? 'success' : 'danger'"
      size="md"
      :show.sync="exportModal"
    >
      <CRow>
        <CCol sm="6">
          <CInput
            v-model="exportDataParams.firstdate"
            label="Dari"
            type="date"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="exportDataParams.lastdate"
            label="Sampai"
            type="date"
          />
        </CCol>
      </CRow>
      <template slot="footer">
        <div class="row">
          <button @click="exportModal = false" class="btn btn-secondary mr-3">
            Batal
          </button>

          <button
            v-if="exportType == 'Export Excel'"
            @click="exportExcel"
            class="btn btn-success"
          >
            Export
          </button>

          <button
            v-if="exportType == 'Export PDF'"
            @click="exportPDF"
            class="btn btn-danger"
          >
            Export
          </button>
        </div>
      </template>
    </CModal>
  </div>
</template>



<script>
import * as data from "../../model/report";
import FileSaver from "file-saver";

export default {
  data() {
    return {
      createModal: false,
      exportModal: false,
      exportType: "",
      fields: data.fields,
      isUpdate: false,
      exportDataParams: {},
      items: [],
      roles: [],
      user: JSON.parse(localStorage.getItem("user")),
      page: 1,
      total: 0,
      form: {},
      params: {
        sorttype: "desc",
        sortby: "date",
        row: 50,
        page: 1,
        role_id: 0,
        keyword: "",
      },
      isSearching: false,
      searchOn: "",
    };
  },
  methods: {
    search() {
      if (this.params.keywordexportExcel != "") {
        this.isSearching = true;
        this.getData();
        this.searchOn = this.params.keyword;
        this.params.keyword = "";
      } else {
        this.$toast.error("Inputan tidak boleh kosong !!");
      }
    },
    openModalExcel() {
      this.exportModal = true;
      this.exportType = "Export Excel";
    },

    openModalPDF() {
      this.exportModal = true;
      this.exportType = "Export PDF";
    },
    exportExcel() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("report/exportReport", this.exportDataParams)
        .then((resp) => {
          loading.hide();
          FileSaver.saveAs(
            resp.data,
            "Laporan_Harian_" +
              this.exportDataParams.firstdate +
              "-" +
              this.exportDataParams.lastdate
          );
          this.exportModal = false;
          this.exportDataParams = {};
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },

    exportPDF() {
      this.$router.push({ name: "ExportPDF", query: this.exportDataParams });
    },

    searchOff() {
      this.isSearching = false;
      this.getData();
    },
    getData() {
      var loading = this.$loading.show();
      if (this.user.role_id != null) {
        this.params.role_id = this.user.role_id;
      }
      this.$store
        .dispatch("report/getReport", this.params)
        .then((resp) => {
          this.items = resp.data.data;

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
          loading.hide();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    create() {
      this.form.name = this.user.full_name;
      this.form.email = this.user.email;
      this.form.nip = this.user.nip;
      this.form.position = this.user.position;
      this.form.role = this.user.role.name;
      this.createModal = true;
      this.isUpdate = false;
    },
    store() {
      var loading = this.$loading.show();
      this.form.name = this.user.full_name;
      this.form.email = this.user.email;
      this.form.nip = this.user.nip;
      this.form.position = this.user.position;
      this.form.role = this.user.role.name;
      this.$store
        .dispatch("report/addReport", this.form)
        .then((resp) => {
          this.$toast.success("Berhasil menambah laporan harian");
          loading.hide();
          this.closeModal();
          this.getData();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    edit(item) {
      this.isUpdate = true;
      this.form = item;
      this.form.id = item.id;
      this.form.name = item.name;
      this.form.email = item.email;
      this.form.nip = item.nip;
      this.form.position = item.position;
      this.form.role = item.role;
      this.createModal = true;
    },
    update() {
      if (this.isUpdate) {
        var loading = this.$loading.show();
        this.$store
          .dispatch("report/updateReport", {
            id: this.form.id,
            data: this.form,
          })
          .then((resp) => {
            this.$toast.success("Berhasil memperbarui laporan harian");
            loading.hide();
            this.closeModal();
            this.getData();
          })
          .catch((e) => {
            this.$toast.error(e);
            loading.hide();
          });
      } else {
        this.$toast.error("Tidak bisa memperbarui laporan");
      }
    },
    destroy(id) {
      if (confirm("Data akan dihapus !!")) {
        var loading = this.$loading.show();
        this.$store
          .dispatch("report/deleteReport", id)
          .then(() => {
            this.$toast.success("Berhasil menghapus laporan");
            if (this.total == this.params.row + 1) {
              this.page--;
              this.params.page = this.page;
            }
            this.getData();
            loading.hide();
          })
          .catch((e) => {
            this.$toast.error(e);
            loading.hide();
          });
      }
    },
    closeModal() {
      this.createModal = false;
      this.isUpdate = false;
      this.form = {};
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
    },
  },
  computed: {
    computedItems() {
      return this.items.map((item, index) => {
        return {
          ...item,
          group: item.user != null ? item.user.group : "",
          updated_at: this.$moment(item.updated_at).format(
            "dddd, Do MMMM  YYYY, HH:mm"
          ),
          date: this.$moment(item.created_at).format("dddd, Do MMMM YYYY"),
          created_at: this.$moment(item.created_at).format("HH:mm"),
        };
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>