<template>
  <div>
    <h3>Paket Pekerjaan</h3>
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
            
              <!-- <button
                  class="btn btn-sm btn-success mr-2 ml-2"
                >
                  <CIcon name="cil-spreadsheet" />
                  Export Excel
              </button>
              <button class="btn btn-sm btn-danger">
                <CIcon name="cib-adobe-acrobat-reader" />
                Export PDF
              </button> -->
             
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

              <select
                  style="max-width: 200px"
                  class="form-control form-control-sm mx-2"
                  placeholder="Ketik disini"
                >
                <option>Semua Kecamatan</option>
                <option>Ciparay</option>
                <option>Soreang</option>
                <option>Banjaran</option>
              </select>

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
        isUpdate ? 'Edit Paket Pekerjaan' : 'Tambah Paket Pekerjaan'
      "
      centered
      :color="isUpdate ? 'success' : 'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col">
          <CInput
            v-model="form.nama_paket"
            label="Nama Paket"
            placeholder="ketik disini"
          />
           <label for="">Jenis Pekerjaan</label>
            <select
              name=""
              v-model="form.jenis_pekerjaan"
              class="form-control"
              placeholder="Pilih"
              id=""
            >
              <option v-for="category in category" :value="category.name" :key="category.name">{{ category.name }}</option>
          </select>
          <label for="">Sumber Dana</label>
          <select
            name=""
            v-model="form.sumber_dana"
            class="form-control"
            placeholder="Pilih"
            id=""
          >
            <option value="ABPD">APBD</option>
            <option value="DAK">DAK</option>
            <option value="APBN">APBN</option>
            <option value="BANKEU">BANKEU</option>
            <option value="DAU">DAU</option>
            <option value="DID">DID</option>
            <option value="BANGUB">BANGUB</option>
          </select>
          <CInput
            v-model="form.nilai_kontrak"
            label="Nilai Kontrak"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.alamat_pekerjaan"
            label="Alamat Pekerjaan"
            placeholder="ketik disini"
          />
        </div>
        <div class="col">  
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

          <label for="">Progress Pekerjaan</label>
          <select
            name=""
            v-model="form.status_pekerjaan"
            class="form-control"
            placeholder="Pilih"
            id=""
          >
            <option value="0-10%<">0-10%</option>
            <option value="11-20%">11-20%</option>
            <option value="21-30%">21-30%</option>
            <option value="31-40%">31-40%</option>
            <option value="41-50%">41-50%</option>
            <option value="51-60%">51-60%</option>
            <option value="61-70%">61-70%</option>
            <option value="71-80%">71-80%</option>
            <option value="81-90%">81-90%</option>
            <option value="91-100%">91-100%</option>
          </select>

          <CInput
            v-model="form.tahun_anggaran"
            label="Tahun Anggaran"
            placeholder="ketik disini"
          />

          <CInput
            v-model="form.longitude"
            label="Longitude"
            placeholder="ketik disini"
          />

           <CInput
            v-model="form.latitude"
            label="Latitude"
            placeholder="ketik disini"
          />
        </div>
      </div>
      <!-- bagian upload -->
      <div class="row">
        <div class="col text-center">
          <label for="">Upload Foto Dokumen 1 : </label>
          <div
            v-if="imageListBefore.length <= 3"
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
              @click="uploadBefore"
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
              ref="uploadFieldBefore"
              @change="selectFileBefore"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3" v-for="(item, index) in imageListBefore" :key="item">
          <CCardLink :href="item" target="_blank" class="">
            <CCardImg
              :src="item"
              style="object-fit: cover"
              height="auto"
              variant="full"
            />
          </CCardLink>

          <button
            class="btn btn-danger btn-sm btn-block mt-2"
            @click="deleteImageBefore('update', index)"
          >
            Hapus
          </button>
          <br />
        </div>
      </div>
      <!-- bagian upload -->

      <!-- bagian upload -->
      <div class="row">
        <div class="col text-center">
          <label for="">Upload Foto Dokumen 3 : </label>
          <div
            v-if="imageListProcess.length <= 3"
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
              @click="uploadProcess"
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
              ref="uploadFieldProcess"
              @change="selectFileProcess"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3" v-for="(item, index) in imageListProcess" :key="item">
          <CCardLink :href="item" target="_blank" class="">
            <CCardImg
              :src="item"
              style="object-fit: cover"
              height="auto"
              variant="full"
            />
          </CCardLink>

          <button
            class="btn btn-danger btn-sm btn-block mt-2"
            @click="deleteImageProcess('update', index)"
          >
            Hapus
          </button>
          <br />
        </div>
      </div>
      <!-- bagian upload -->

      <!-- bagian upload -->
      <div class="row">
        <div class="col text-center">
          <label for="">Upload Foto Dokumen 2 : </label>
          <div
            v-if="imageListAfter.length <= 3"
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
              @click="uploadAfter"
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
              ref="uploadFieldAfter"
              @change="selectFileAfter"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3" v-for="(item, index) in imageListAfter" :key="item">
          <CCardLink :href="item" target="_blank" class="">
            <CCardImg
              :src="item"
              style="object-fit: cover"
              height="auto"
              variant="full"
            />
          </CCardLink>

          <button
            class="btn btn-danger btn-sm btn-block mt-2"
            @click="deleteImageAfter('update', index)"
          >
            Hapus
          </button>
          <br />
        </div>
      </div>
      <!-- bagian upload -->

      <template slot="footer">
        <div>
          <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>

          <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
            Tambah Paket Pekerjaan
          </button>
          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update Paket Pekerjaan
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
        <div class="row">
          <div class="col">
            <div class="div">
              <input
                type="file"
                class="form-control"
                ref="importData"
                @change="importData"
              />
            </div>
          </div>
        </div>
      </CModal>
  </div>
</template>



<script>
import * as data from "../../model/paket-pekerjaan";
import { uploadImage } from "@/utils/fileUpload";
import FileSaver from "file-saver";

export default {
  data() {
    return {
      kecamatans: [],
      category: [],
      createModal: false,
      createModalImport: false,
      fields: [],
      isUpdate: false,
      items: [],
      imageListAfter: [],
      imageListProcess: [],
      imageListBefore: [],
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
    getCategory() {
      this.$store
        .dispatch("category/getCategory", this.params)
        .then((resp) => {
          this.category = resp.data.data;
          console.log(this.category, "category");
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data  \n", e);
        });
    },
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
      this.params.keyword = '';
      this.getData();
    },
    submit() {
      this.form.paket_pekerjaan_befores = [];
      this.form.paket_pekerjaan_processes = [];
      this.form.paket_pekerjaan_afters = [];

      this.imageListBefore.forEach(element => {
        this.form.paket_pekerjaan_befores.push({
          image: element
        })
      });
      
      this.imageListProcess.forEach(element => {
        this.form.paket_pekerjaan_processes.push({
          image: element
        })
      });
      
      this.imageListAfter.forEach(element => {
        this.form.paket_pekerjaan_afters.push({
          image: element
        })
      });

      this.form.user_id = JSON.parse(localStorage.getItem("user")).id;
      this.form.opd_id = JSON.parse(localStorage.getItem("user")).role_id;
      var loading = this.$loading.show();
      this.$store
        .dispatch("paket_pekerjaan/addPaketPekerjaan", this.form)
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
      this.imageListBefore = this.extractGallery(item.paket_pekerjaan_befores);
      this.imageListProcess = this.extractGallery(item.paket_pekerjaan_processes);
      this.imageListAfter = this.extractGallery(item.paket_pekerjaan_afters);
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
        .dispatch("paket_pekerjaan/updatePaketPekerjaan", {
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
          .dispatch("paket_pekerjaan/deletePaketPekerjaan", item.id)
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
      var loading = this.$loading.show();
      this.$store
        .dispatch("paket_pekerjaan/getPaketPekerjaan", this.params)
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
    addModal() {
      this.isUpdate = false;
      this.createModal = true;
      this.imageList = [];
      this.form = {};
      this.getKecamatan();
    },
    addModalImport() {
      this.createModalImport = true;
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
    },
    uploadAfter() {
      this.$refs.uploadFieldAfter.click();
    },
    selectFileAfter(event) {
      this.file = event.target.files[0];
      var loading = this.$loading.show();
      uploadImage(this.file)
        .then((resp) => {
          this.imageListAfter.push(resp);
          loading.hide();
          alert("File berhasil diupload !!");
        })
        .catch((e) => {
          loading.hide();
          alert("Terjadi kesalahan !! | " + e);
        });
    },
    uploadProcess() {
      this.$refs.uploadFieldProcess.click();
    },
    importData($event) {
      console.log($event, "event");
      this.file = event.target.files[0];
      var loading = this.$loading.show();
      
    },
    selectFileProcess(event) {
      this.file = event.target.files[0];
      var loading = this.$loading.show();
      uploadImage(this.file)
        .then((resp) => {
          this.imageListProcess.push(resp);
          loading.hide();
          alert("File berhasil diupload !!");
        })
        .catch((e) => {
          loading.hide();
          alert("Terjadi kesalahan !! | " + e);
        });
    },
    uploadBefore() {
      this.$refs.uploadFieldBefore.click();
    },
    selectFileBefore(event) {
      this.file = event.target.files[0];
      var loading = this.$loading.show();
      uploadImage(this.file)
        .then((resp) => {
          this.imageListBefore.push(resp);
          loading.hide();
          alert("File berhasil diupload !!");
        })
        .catch((e) => {
          loading.hide();
          alert("Terjadi kesalahan !! | " + e);
        });
    },
    deleteImageBefore(state, index) {
      this.imageListBefore.splice(index, 1);
    },
    deleteImageProcess(state, index) {
      this.imageListProcess.splice(index, 1);
    },
    deleteImageAfter(state, index) {
      this.imageListAfter.splice(index, 1);
    },
    extractGallery(item) {
      let data = [];
      item.forEach(element => {
        data.push(element.image);
      });
      return data;
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
        .dispatch("paket_pekerjaan/selectedAction", 
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
          this.$toast.error("gagal mengambil data  \n", e);
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
       .dispatch("paket_pekerjaan/exportReport", {
          data: this.selectedItems,
        })
        .then((resp) => {
          loading.hide();
          FileSaver.saveAs(
            resp.data,
            "Laporan_Harian_"
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
      this.$router.push({ name: "PaketPekerjaanExportPDF", query: { data: this.selectedItems } });
    },
  },
  computed: {
    computedItems() {  
      return this.items.map((item, index) => {
        return {
          index: index+1 + '.',
          ...item,
          nilai_kontrak: item.nilai_kontrak.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          full_name: item.user != null ? item.user.full_name : "",
          opd: item.role != null ? item.role.name : "",
          created_at: item.created_at.slice(0, 10),
        };
      });
    },
  },
  mounted() {
    this.getData();
    this.getCategory();
  },

  created() {
    this.fields =
      this.user.role.name.toLowerCase() == "admin"
        ? data.fields
        : data.fields_no_action;
  },
};
</script>