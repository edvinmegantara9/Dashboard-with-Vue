<template>
  <div>
    <h3>Data SBU</h3>
    <br />
    <CCard>
      <CCardBody>
        <div class="row justify-content-between">
          <div class="col-10">
            <div class="row mb-3">
              <button
                class="btn btn-sm btn-primary ml-2"
                v-if="user.role.name.toLowerCase() == 'admin'"
                @click="addModal()"
              >
                <CIcon name="cilMedicalCross" />
                Tambah
              </button>

              <button
                class="btn btn-sm btn-primary ml-2"
                v-if="user.role.name.toLowerCase() == 'admin'"
                @click="addModalImport()"
              >
                <CIcon name="cilArrowThickToBottom" />
                Import
              </button>
            
              <label class="m-1 ml-3" for="">Select All : </label>
              <input
                type="checkbox"
                v-model="isSelectedAll"
                @change="checkAll()"
              />

              <select v-if="selectedItems.length > 0"
                  style="max-width: 200px"
                  class="form-control form-control-sm mx-2"
                  placeholder="Ketik disini"
                  v-model="selectedAction"
                  @change="changeActionSelected()"
                >
                <option value="0">Action Selected</option>
                <option value="1">Delete Items Selected</option>
                <option value="2">Export Excel Items Selected</option>
                <option value="3">Export Pdf Items Selected</option>
              </select>

            </div>
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="col-10">
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
          <div class="col-2">
            <div class="row">
              <div class="col-12">
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
                    @change="getData()"
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
          sorter
        >
        <template #select="{ item }">
          <td class="py-2">
            <input 
                type="checkbox"
                @change="check(item)"
                v-model="item.select"
              />
          </td>
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
          :per-page="50"
          @paginate="pagination"
        />
      </CCardBody>
    </CCard>
    <CModal
      size="lg"
      :title="
        isUpdate ? 'Edit Data SBU' : 'Tambah Data SBU'
      "
      centered
      :color="isUpdate ? 'success' : 'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col">
          <CInput
            v-model="form.nama_pjbu"
            label="Nama PJBU"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.nama_badan_usaha"
            label="Nama Badan Usaha"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.alamat"
            label="Alamat"
            placeholder="ketik disini"
          />
          <label for="">Kecamatan</label>
          <select
            name=""
            v-model="form.kecamatan"
            class="form-control"
            placeholder="Pilih"
            id=""
          >
            <option v-for="kecamatan in kecamatans" :value="kecamatan.name" :key="kecamatan.name">{{ kecamatan.name }}</option>
          </select>
          <CInput
            v-model="form.bentuk"
            label="Bentuk Badan Usaha"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.asosiasi"
            label="Asosiasi"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.sub_klasifikasi_kbli"
            label="Sub Klasifikasi KBLI"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.kualifikasi_kbli"
            label="Kualifikasi KBLI"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.tanggal_terbit"
            label="Kualifikasi KBLI"
            placeholder="ketik disini"
            type="date"
          />
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>

          <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
            Tambah Data SBU
          </button>
          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update Data SBU
          </button>
        </div>
      </template>
    </CModal>
    <CModal
      size="lg"
      title="Import Data"
      centered
      color="primary"
      :show.sync="createModalImport"
    >
        <a href="sbu_import.xlsx" download class="btn btn-primary">Download format</a>
        <br /><br />
        <input
            type="file"
            class="form-control"
            ref="uploadFieldBefore"
            @change="selectFileImport"
          />
    </CModal>
  </div>
</template>



<script>
import * as data from "../../model/sbu";
import FileSaver from "file-saver";

export default {
  data() {
    return {
      createModal: false,
      createModalImport: false,
      fields: [],
      isUpdate: false,
      items: [],
      kecamatans: [],
      selectedItems: [],
      isSelectedAll: false,
      selectedAction: 0,

      page: 1,
      total: 0,
      form: {
   
      },
      user: JSON.parse(localStorage.getItem("user")),
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 50,
        page: 1,
        type: [0, 1],
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
        this.getData();
        this.searchOn = this.params.keyword;
        // this.params.keyword = '';
      } else {
        this.$toast.error("Inputan tidak boleh kosong !!");
      }
    },

    searchOff(){
      this.isSearching = false;
      this.getData();
    },
    submit() {
      this.form.user_id = JSON.parse(localStorage.getItem("user")).id;
      this.form.opd_id = JSON.parse(localStorage.getItem("user")).role_id;
      var loading = this.$loading.show();
      this.$store
        .dispatch("sbu/addSbu", this.form)
        .then(() => {
          this.$toast.success("Berhasil menambahkan data");
          loading.hide();
          this.createModal = false;
          this.form = {
          };
          this.getData();
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
      this.form = {
        type: 0,
      };
      this.createModal = false;
    },
    update() {
      var loading = this.$loading.show();
      delete this.form.updated_at;
      this.form.nilai_kontrak = parseInt(this.form.nilai_kontrak);
      this.$store
        .dispatch("sbu/updateSbu", {
          id: this.form.id,
          data: this.form,
        })
        .then(() => {
          this.$toast.success("Berhasil merubah data ");
          loading.hide();
          this.createModal = false;
          this.form = {
            type: 0,
          };
          this.getData();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    hapus(item) {
      if (confirm("Data akan dihapus !!")) {
        this.$store
          .dispatch("sbu/deleteSbu", item.id)
          .then(() => {
            this.$toast.success("Berhasil menghapus data ");

            this.form = {
              type: 0,
            };
            this.getData();
          })
          .catch((e) => {
            this.$toast.error(e);
            loading.hide();
          });
      }
    },
    getData() {
      this.getKecamatan();
      var loading = this.$loading.show();
      this.$store
        .dispatch("sbu/getSbu", this.params)
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
          this.$toast.error("gagal mengambil data  \n", e);
          loading.hide();
        });
    },
    getKecamatan() {
      this.$store
        .dispatch("sbu/getKecamatan", this.params)
        .then((resp) => {
          this.kecamatans = resp.data;
          console.log(this.kecamatans, "kecamatan");
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data  \n", e);
        });
    },
    addModal() {
      this.isUpdate = false;
      this.createModal = true;
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
      // console.log(page);
    },
    selectFileImport(event) {
      this.file = event.target.files[0];
      var loading = this.$loading.show();
      this.$store
        .dispatch("sbu/importSbu", this.file)
        .then((res) => {
          this.$toast.success(res.data.message);
          loading.hide();
          this.createModalImport = false;
          this.form = {
          };
          this.getData();
        })
        .catch((e) => {
          console.log(e)
          this.$toast.error(e);
          loading.hide();
        });
    },
    addModalImport() {
      this.createModalImport = true;
    },
     check(item) {
      if (item.select) {
        this.selectedItems.push(item.id);
      } else {
        const index = this.selectedItems.indexOf(item.id);
        this.selectedItems.splice(index, 1);
      }
    },
    checkAll() {
      this.getData();
    },
    changeActionSelected() {
      console.log(this.selectedAction)
      switch (Number(this.selectedAction)) {
        case 1:
          console.log('deleted')
          this.deleteSelected('delete');
          break;
        case 2:
          console.log('export excel')
          this.exportExcel('export_excel');
          break;
        case 3:
          console.log('export pdf')
          this.exportPDF();
          break;
      }
    },
    deleteSelected(action) {
      var loading = this.$loading.show();
      this.$store
        .dispatch("sbu/selectedAction", 
        {
          action: action,
          data: this.selectedItems,
        })
        .then((resp) => {
          this.$toast.success("Item Selected Berhasil diproses");
          loading.hide();
          this.createModal = false;
          this.form = {
          };
          this.getData();
        })
        .catch((e) => {
          this.$toast.error("gagal menghapus data  \n", e);
          loading.hide();
        });
    },
    openModalExcel() {
      this.exportModal = true;
      this.exportType = "Export Excel";
    },
    openModalPDF() {
      this.exportModal = true;
      this.exportType = "Export PDF";
    },
    exportExcel(action) {
      var loading = this.$loading.show();
      this.$store
       .dispatch("sbu/exportReport", {
          data: this.selectedItems,
        })
        .then((resp) => {
          loading.hide();
          FileSaver.saveAs(
            resp.data,
            "sbu_"
          );
          this.exportModal = false;
          this.exportDataParams = {};
        })
        .catch((e) => {
          console.log(e)
          this.$toast.error(e);
          loading.hide();
        });
    },
    exportPDF() {
      this.$router.push({ name: "SbuExportPDF", query: { data: this.selectedItems } });
    },
  },
  computed: {
    computedItems() {
      return this.items.map((item, index) => {
        return {
          index: index+1 + '.',
          ...item,
          created_at: item.created_at.slice(0, 10),
        };
      });
    },
  },
  mounted() {
    this.getData();
  },

  created() {
    this.fields =
      this.user.role.name.toLowerCase() == "admin"
        ? data.fields
        : data.fields_no_action;
  },
};
</script>