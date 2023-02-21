<template>
    <div>
      <CCard>
        <CCardBody>
          <div class="row justify-content-between">
            <div class="col-10">
              <div class="row mb-3">
                <button
                  class="btn btn-sm btn-primary ml-2"
                  @click="addModal()"
                >
                  <CIcon name="cilMedicalCross" />
                  Tambah
                </button>
                
                <button
                  class="btn btn-sm btn-primary ml-2"
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
                  <!-- <option value="3">Export Pdf Items Selected</option> -->
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
                      <option value="100">100</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
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
            :per-page="100"
            @paginate="pagination"
          />
        </CCardBody>
      </CCard>
      <CModal
        size="lg"
        :title="
          isUpdate ? 'Edit Restaurant' : 'Tambah Restaurant'
        "
        centered
        :color="isUpdate ? 'success' : 'primary'"
        :show.sync="createModal"
      >
        <div class="row">
            <div class="col-3">Nama restaurant</div>
            <div class="col-9">
                <CInput
                    v-model="form.name"
                    placeholder="ketik disini"
                />
            </div>
            <div class="col-3">Nomor telepon</div>
            <div class="col-9">
                <CInput
                    v-model="form.phone_number"
                    placeholder="ketik disini"
                />
            </div>
            <div class="col-3">Alamat</div>
            <div class="col-9">
                <CInput
                    v-model="form.address"
                    placeholder="ketik disini"
                />
            </div>
            <div class="col-3">Kecamatan</div>
            <div class="col-9">
                <v-select 
                    placeholder="Kecamatan"
                    class="mb-3" 
                    style="width: 200px"
                    :reduce="kecamatan => kecamatan.value" 
                    v-model="form.kecamatan" 
                    label="key" 
                    :options="kecamatan"></v-select>
            </div>
            <div class="col-3">Desa</div>
            <div class="col-9">
                <v-select 
                    placeholder="Desa"
                    class="mb-3" 
                    style="width: 200px"
                    :reduce="desa => desa.value" 
                    v-model="form.desa" 
                    label="key" 
                    :options="desa"></v-select>
            </div>
            <div class="col-3">Nomor rekening</div>
            <div class="col-9">
                <CInput
                    v-model="form.nomor_rekening"
                    placeholder="ketik disini"
                />
            </div>
        </div>
        <template slot="footer">
          <div>
            <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>
  
            <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
              Tambah Restaurant
            </button>
            <button @click="update" v-if="isUpdate" class="btn btn-primary">
              Update Restaurant
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
          <a href="Menu.xlsx" download class="btn btn-primary">Download format</a>
          <br /><br />
          <input
              id="import"
              type="file"
              class="form-control"
              ref="uploadFieldBefore"
              @change="selectFileImport"
            />
          <template slot="footer">
          <div>
            <button @click="cancelImport" class="btn btn-secondary mr-3">Batal</button>
  
            <button @click="importData" class="btn btn-primary">
              Proses Import
            </button>
          </div>
        </template>
      </CModal>
    </div>
  </template>
  
  <script>
  import * as data from "../../model/restorant";
  import { uploadImage } from "@/utils/fileUpload";
  import kecamatan, { desa } from '../../utils/internalData'
  import FileSaver from "file-saver";
  
  export default {
    data() {
      return {
        file: null,
        kecamatan,
        desa,
        createModal: false,
        createModalImport: false,
        fields: [],
        isUpdate: false,
        items: [],
        selectedItems: [],
        isSelectedAll: false,
        selectedAction: 0,
        page: 1,
        total: 0,
        to: 0,
        form: {
            name: "",
            phone_number: "",
            address: "",
            kecamatan: "",
            desa: "",
            nomor_rekening: ""
        },
        user: JSON.parse(localStorage.getItem("user")),
        params: {
          sorttype: "desc",
          sortby: "id",
          row: 100,
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
          this.getData();
          this.searchOn = this.params.keyword;
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
        var loading = this.$loading.show();
        console.log(this.form)
        this.$store
          .dispatch("restorant/add", this.form)
          .then(() => {
            this.$toast.success("Berhasil menambahkan data");
            loading.hide();
            this.createModal = false;
            this.form = {
                name: "",
                phone_number: "",
                address: "",
                kecamatan: "",
                desa: "",
                nomor_rekening: ""
            }
            this.getData();
          })
          .catch(() => {
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
        this.$store
          .dispatch("restorant/update", {
            id: this.form.id,
            data: this.form,
          })
          .then(() => {
            this.$toast.success("Berhasil merubah data ");
            loading.hide();
            this.createModal = false;
            this.form = {
                name: "",
                phone_number: "",
                address: "",
                kecamatan: "",
                desa: "",
                nomor_rekening: ""
            };
            this.getData();
          })
          .catch(() => {
            loading.hide();
          });
      },
      hapus(item) {
        this.$swal.fire({
          icon: 'warning',
          html: 'Apakah yakin akan menghapus data?',
          showCancelButton: true,
          confirmButtonText: 'Ya, Hapus',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$store
            .dispatch("restorant/delete", item.id)
            .then(() => {
              this.$toast.success("Berhasil menghapus data ");
  
              this.form = {
                name: "",
                phone_number: "",
                address: "",
                kecamatan: "",
                desa: "",
                nomor_rekening: ""
            }
              this.getData();
            })
            .catch((e) => {
              this.$toast.error(e);
              this.$loading.hide();
            });
          } 
        })
      },
      getData() {
        var loading = this.$loading.show();
        
        this.$store
          .dispatch("restorant/get", this.params)
          .then((resp) => {
            this.items = resp.data.data;
            this.total = resp.data.total;
            this.to = resp.data.to;

            console.log(resp.data)
  
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
        switch (Number(this.selectedAction)) {
          case 1:
            this.$swal.fire({
              icon: 'warning',
              html: 'Apakah yakin akan menghapus data?',
              showCancelButton: true,
              confirmButtonText: 'Ya, Hapus',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.deleteSelected('delete');
              } 
            })
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
          .dispatch("restorant/selectedAction", 
          {
            action: action,
            data: this.selectedItems,
          })
          .then(() => {
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
      exportExcel() {
        var loading = this.$loading.show();
        this.$store
         .dispatch("restorant/exportReport", {
            data: this.selectedItems,
          })
          .then((resp) => {
            loading.hide();
            FileSaver.saveAs(
              resp.data,
              "Menu"
            );
            this.exportModal = false;
            this.exportDataParams = {};
          })
          .catch(() => {
            loading.hide();
          });
      },
      exportPDF() {
        this.$router.push({ name: "MenuExportPDF", query: { data: this.selectedItems } });
      },
      getKecamatan() {
        this.$store
          .dispatch("restorant/getKecamatan", this.params)
          .then((resp) => {
            this.kecamatans = resp.data;
            console.log(this.kecamatans, "kecamatan");
          })
          .catch((e) => {
            this.$toast.error("gagal mengambil data  \n", e);
          });
      },
      selectFileImport(event) {
        this.file = event.target.files[0];
      },
      cancelImport() {
        this.file = null;
        document.getElementById('import').value = '';
      },
      importData() {
        var loading = this.$loading.show();
        this.$store
          .dispatch("restorant/import", this.file)
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
      }
    },
    computed: {
      computedItems() {  
        return this.items.map((item, index) => {
          return {
            index: (this.to - this.items.length) + index+1 + '.',
            ...item,
            created_at: this.$moment(item.created_at).format("Do MMMM YYYY HH:mm"),
            updated_at: this.$moment(item.updated_at).format("Do MMMM YYYY HH:mm"),
          };
        });
      },
    },
    mounted() {
      this.getData();
    },
  
    created() {
      this.fields = data.fields
    },
  };
  </script>