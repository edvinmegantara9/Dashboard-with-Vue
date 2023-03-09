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
                <button @click="search()" style="width: 80px" class="btn btn-sm btn-success">
                  Cari
                </button>
                <v-select
                    v-if="role !== '1'"
                    placeholder="Rumah Makan"
                    class="ml-2" 
                    style="width: 200px"
                    @change="getData"
                    :reduce="itemRestorant => itemRestorant.value" 
                    v-model="params.keyword" 
                    label="key" 
                    :options="itemRestorant"></v-select>
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
          <template #bukti_transfer="{ item }">
            <CButton
              @click="openFile(item.bukti_transfer)"
              class="mr-2 mt-2"
              color="primary"
              square
              size="sm"
            >
              Download
            </CButton>
          </template>
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
          isUpdate ? 'Edit Menu' : 'Tambah Menu'
        "
        centered
        :color="isUpdate ? 'success' : 'primary'"
        :show.sync="createModal"
      >
      <div class="row">
            <div class="col-3">Nama</div>
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
            <div class="col-3">Payment methods</div>
            <div class="col-9">
              <CSelect
                v-model="form.payment_method"
                :options="[{ label:'Cash', value:'Cash' },{label: 'Transfer', value: 'Transfer'}]"
              />
            </div>
            <div class="col-3">Jumlah donasi</div>
            <div class="col-9">
                <CInput
                    v-model="form.jumlah_donasi"
                    placeholder="ketik disini"
                />
            </div>
            <div class="col-3">Pilih Restoran</div>
            <div class="col-9">
              <select
                style="max-width: 100%"
                class="form-control form-control-md mb-3"
                placeholder="Pilih Restoran"
                v-model="form.restorant_id"
              >
                <option value="" disabled>Nama Restoran</option>
                <option v-for="(item) in restorans" :key="item.id" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div class="col-3">Bukti transfer</div>
            <div class="col-9">
              <div class="row">
                <div class="col text-center">
                  <label for=""></label>
                  <div
                    v-if="form.bukti_transfer === ''"
                    class="card border d-flex justify-content-center"
                    style="height: 250px"
                  >
                    <div class="align-self-center mb-3">
                      <img src="@/assets/upload.png" width="100px" alt="" />
                    </div>
                    <button
                      class="btn btn-sm btn-primary align-self-center"
                      style="width: 50%"
                      @click="uploadBuktiTransfer"
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
                    ref="uploadFieldBuktiTransfer"
                    @change="selectFileBuktiTransfer"
                  />
                </div>
              </div>
            </div>
            <div class="row" v-if="form.bukti_transfer">
              <div class="col-md-3">
                <button
                  class="btn btn-primary btn-sm btn-block mt-2"
                  @click="openFile(form.bukti_transfer)"
                >
                  Preview
                </button>
                <button
                  class="btn btn-danger btn-sm btn-block mt-2"
                  @click="deleteImageBuktiTransfer"
                >
                  Hapus
                </button>
                <br />
              </div>
            </div>
            </div>
            
        </div>
        <template slot="footer">
          <div>
            <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>
  
            <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
              Tambah donasi
            </button>
            <button @click="update" v-if="isUpdate" class="btn btn-primary">
              Update donasi
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
  import * as data from "../../model/donasi";
  import { uploadImage } from "@/utils/fileUpload";
  import FileSaver from "file-saver";
  
  export default {
    data() {
      return {
        file: null,
        createModal: false,
        createModalImport: false,
        fields: [],
        isUpdate: false,
        items: [],
        restorans: [],
        selectedItems: [],
        isSelectedAll: false,
        selectedAction: 0,
        page: 1,
        total: 0,
        to: 0,
        form: {
          name: "",
          phone_number: "",
          bukti_transfer: "",
          payment_method: "",
          jumlah_donasi: "",
          restorant_id: ""
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
        searchOn: '',
        itemRestorant: [],
        role: ""
      };
    },
    methods: {
      getData() {
        var loading = this.$loading.show();
        
        this.$store
          .dispatch("restorant/get", this.params)
          .then((resp) => {
            this.restorans = resp.data.data;
            this.getDataRestorant();
            loading.hide();
          })
          .catch((e) => {
            this.$toast.error("gagal mengambil data  \n", e);
            loading.hide();
          });
      },
      getDataRestorant() {
        this.$store
          .dispatch("restorant/get", this.params)
          .then((resp) => {
            let restData = resp.data.data;

            this.restorans = resp.data.data;

            restData.map(item => {
              this.itemRestorant.push({
                key: item.name,
                value: item.id
              })
            })

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
        // this.form.restorant_id = JSON.parse(localStorage.getItem('user')).restorant_id
        // console.log(JSON.parse(localStorage.getItem('user')))
        this.$store
          .dispatch("donasi/add", this.form)
          .then(() => {
            this.$toast.success("Berhasil menambahkan data");
            loading.hide();
            this.createModal = false;
            this.form = {
              name: "",
              phone_number: "",
              bukti_transfer: "",
              payment_method: "",
              jumlah_donasi: "",
              restorant_id: ""
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
          name: "",
          phone_number: "",
          bukti_transfer: "",
          payment_method: "",
          jumlah_donasi: "",
          restorant_id: ""
        }
        this.createModal = false;
      },
      update() {
        var loading = this.$loading.show();
        delete this.form.updated_at;
        this.$store
          .dispatch("donasi/update", {
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
              bukti_transfer: "",
              payment_method: "",
              jumlah_donasi: "",
              restorant_id: ""
            }
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
            .dispatch("donasi/delete", item.id)
            .then(() => {
              this.$toast.success("Berhasil menghapus data ");
              console.log(item.id)
              this.form = {
                name: "",
                phone_number: "",
                bukti_transfer: "",
                payment_method: "",
                jumlah_donasi: "",
                restorant_id: ""
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
          .dispatch("donasi/get", this.params)
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
      uploadBuktiTransfer() {
        this.$refs.uploadFieldBuktiTransfer.click();
      },
      selectFileBuktiTransfer(event) {
        console.log("run upload")
        this.file = event.target.files[0];
        var loading = this.$loading.show();
        uploadImage(this.file)
          .then((resp) => {

            this.form.bukti_transfer = resp
            loading.hide();
            alert("File berhasil diupload !!");
          })
          .catch((e) => {
            loading.hide();
            alert("Terjadi kesalahan !! | " + e);
          });
      },
      deleteImageBuktiTransfer(){
        this.form.bukti_transfer = ""
      },
      openFile(url){
        window.open(url)
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
          .dispatch("donasi/selectedAction", 
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
         .dispatch("donasi/exportReport", {
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
          .dispatch("donasi/getKecamatan", this.params)
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
          .dispatch("donasi/import", this.file)
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
            nama_restorant: item.restorant.name,
            created_at: this.$moment(item.created_at).format("Do MMMM YYYY HH:mm"),
            updated_at: this.$moment(item.updated_at).format("Do MMMM YYYY HH:mm"),
          };
        });
      },
    },

    mounted() {
      this.getData();
      this.getDataRestorant()
    },
  
    created() {
      this.fields = data.fields
      // this.form.restorant_id = JSON.parse(localStorage.getItem('user')).restaurant_id

    },
  };
  </script>