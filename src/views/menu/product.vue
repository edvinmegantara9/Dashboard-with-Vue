<template>
  <div>
    <CCard>
      <CCardBody>
        <div class="row justify-content-between">
          <div class="col-10">
            <div class="row mb-3">
              <!-- <button
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
              </button> -->
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
                <!-- <option value="1">Delete Items Selected</option> -->
                <option value="2">Export Excel Items Selected</option>
                <option value="3">Export Pdf Items Selected</option>
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
              <!-- <CButton @click="hapus(item)" color="danger" square size="sm">
                Delete
              </CButton> -->
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
      size="xl"
      :title="
        isUpdate ? 'Edit Product' : 'Tambah Product'
      "
      centered
      :color="'primary'"
      :show.sync="createModal"
      scrollable
    >
      <div class="row">
        <div class="col-6">
          <CInput
            v-model="form.name"
            label="Nama Product"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.expired_time"
            label="Waktu Expired"
            placeholder="ketik disini"
          />
        </div>
        <div class="col-6">
           <CInput
            v-model="form.expired_result"
            label="Hasil Expired"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.max_point_result"
            label="Max Point"
            placeholder="ketik disini"
          />
        </div>
        <div class="col-12">
          <table class="table table-bordered">
            <tr>
              <td>No.</td>
              <td>Pertanyaan</td>
              <td>Point</td>
              <td></td>
            </tr>
            <tr v-for="(detail, index) in form.product_details" :key="detail.id">
              <td style="width:40px">
                {{ index +1 }}.
              </td>
              <td>
                <CInput
                  v-model="detail.question"
                  placeholder="ketik disini" />
                  <table>
                    <tr>
                      <td>
                        Pilihan Jawaban
                      </td>
                      <td>
                        Jawaban Benar
                      </td>
                      <td></td>
                    </tr>
                    <tr v-for="(multiple, index_multiple) in detail.multiple_choices" :key="multiple.id">
                      <td>
                        <CInput
                          v-model="multiple.option"
                          placeholder="ketik disini" />
                        </td>
                        <td style="width:30px">
                        <select
                          v-model="multiple.answer_correct"
                          class="form-control"
                          placeholder="Pilih"
                        >
                          <option value="1" selected>Benar</option>
                          <option value="0">Salah</option>
                        </select>
                      </td>
                      <td style="width:20px">
                        <CButton @click="deleteMutliple(index, index_multiple)" color="danger" square size="sm">
                          Delete
                        </CButton>
                      </td>
                    </tr>
                  </table>
                  <CButton 
                    class="mt-2"
                    @click="addMultiple(index)"
                    color="success"
                    square
                    size="sm"
                  >
                    + Tambah Opsi
                  </CButton>
              </td>
              <td style="width:100px">
                 <CInput
                  v-model="detail.point"
                  placeholder="ketik disini" />
              </td>
              <td style="width:80px">
                <CButton @click="deleteDetail(index)" color="danger" square size="sm">
                Delete
                </CButton>
              </td>
            </tr>
          </table>
          <CButton 
            @click="addDetail"
            color="success"
            square
            size="sm"
          >
            + Tambah Pertanyaan
          </CButton>
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>
          <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
            Tambah Product
          </button>
          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update Product
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
        <a href="Product.xlsx" download class="btn btn-primary">Download format</a>
        <br /><br />
        <input
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
import * as data from "../../model/product";
import { uploadImage } from "@/utils/fileUpload";
import FileSaver from "file-saver";

export default {
  data() {
    return {
      visibleStaticBackdropDemo: false,
      file: null,
      createModal: false,
      createModalImport: false,
      fields: [],
      isUpdate: false,
      items: [],
      kecamatans: [],
      imageListAfter: [],
      imageListProcess: [],
      imageListBefore: [],
      selectedItems: [],
      isSelectedAll: false,
      selectedAction: 0,
      page: 1,
      total: 0,
      to: 0,
      form: {
        product_details: []
      },
      user: JSON.parse(localStorage.getItem("user")),
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 100,
        page: 1,
        type: [0, 1],
        keyword: "",
        kecamatan: ""
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
      this.$store
        .dispatch("product/addProduct", this.form)
        .then(() => {
          this.$toast.success("Berhasil menambahkan data");
          loading.hide();
          this.createModal = false;
          this.form = {
          };
          this.getData();
        })
        .catch((e) => {
          loading.hide();
        });
    },
    edit(item) {
      var loading = this.$loading.show();
      this.$store
        .dispatch("product/getProductById", item.id)
        .then((result) => {
          this.form = result.data;
          loading.hide();    
        })
        .catch((e) => {
          loading.hide();
        });

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
        .dispatch("product/updateProduct", {
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
          loading.hide();
        });
    },
    hapus(item) {
      if (confirm("Data akan dihapus !!")) {
        this.$store
          .dispatch("product/deleteProduct", item.id)
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
        .dispatch("product/getProduct", this.params)
        .then((resp) => {
          this.items = resp.data.data;
          this.total = resp.data.total;
          this.to = resp.data.to;

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
        .dispatch("product/selectedAction", 
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
       .dispatch("product/exportReport", {
          data: this.selectedItems,
        })
        .then((resp) => {
          loading.hide();
          FileSaver.saveAs(
            resp.data,
            "Product"
          );
          this.exportModal = false;
          this.exportDataParams = {};
        })
        .catch((e) => {
          loading.hide();
        });
    },
    exportPDF() {
      this.$router.push({ name: "ProductExportPDF", query: { data: this.selectedItems } });
    },

    selectFileImport(event) {
      this.file = event.target.files[0];
    },
    cancelImport() {
      this.file = null;
    },
    importData() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("product/importProduct", this.file)
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
    addDetail() {
      this.form.product_details.push({
        answer: "",
        answer_correct: "",
        point: "",
      })
    },
    addMultiple(index) {
      this.form.product_details[index].multiple_choices.push({
        option: "",
        answer_correct: "",
      })
    },
    deleteDetail(index) {
      this.form.product_details.splice(index, 1);
    },
    deleteMutliple(index, index_multiple) {
       this.form.product_details[index].multiple_choices.splice(index_multiple, 1);
    }
  },
  computed: {
    computedItems() {  
      return this.items.map((item, index) => {
        return {
          index: (this.to - this.items.length) + index+1 + '.',
          ...item,
          created_at: this.$moment(item.created_at).format("Do MMMM YYYY"),
          updated_at: this.$moment(item.updated_at).format("Do MMMM YYYY"),
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