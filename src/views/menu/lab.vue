<template>
  <div>
    <h3>Lab</h3>
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
        isUpdate ? 'Edit Lab' : 'Tambah Lab'
      "
      centered
      :color="isUpdate ? 'success' : 'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col">
          <CInput
            v-model="form.name"
            label="Nama Penyedia"
            placeholder="ketik disini"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CInput
            v-model="form.notes"
            label="Note"
            placeholder="ketik disini"
          />
        </div>
        <div class="col">
          <CInput
            v-model="form.address"
            label="Alamat"
            placeholder="ketik disini"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CInput
            v-model="form.longitude"
            label="Longitude"
            placeholder="ketik disini"
          />
        </div>
        <div class="col">
          <CInput
            v-model="form.latitude"
            label="Latitude"
            placeholder="ketik disini"
          />
        </div>
      </div>
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
        <div class="col-md-3" v-for="(item, index) in imageList" :key="item">
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
            @click="deleteImage('update', index)"
          >
            Hapus
          </button>
          <br />
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>

          <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
            Tambah Lab
          </button>
          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update Lab
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
        <a href="lab_import.xlsx" download class="btn btn-primary">Download format</a>
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
import * as data from "../../model/lab";
import { uploadImage } from "@/utils/fileUpload";
import FileSaver from "file-saver";

export default {
  data() {
    return {
      createModal: false,
      fields: [],
      isUpdate: false,
      items: [],
      imageList: [],
      page: 1,
      total: 0,
      createModalImport: false,
      kecamatans: [],
      selectedItems: [],
      isSelectedAll: false,
      selectedAction: 0,
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
      this.form.document_labs = [];
      this.imageList.forEach(element => {
        this.form.document_labs.push({
          image: element
        })
      });
      var loading = this.$loading.show();
      this.$store
        .dispatch("lab/addLab", this.form)
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
      this.imageList = this.extractGallery(item.document_labs);
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

      this.form.document_labs = [];
      this.imageList.forEach(element => {
        this.form.document_labs.push({
          image: element
        })
      });

      this.$store
        .dispatch("lab/updateLab", {
          id: this.form.id,
          data: this.form,
        })
        .then(() => {
          this.$toast.success("Berhasil merubah data ");
          loading.hide();
          this.createModal = false;
          this.form = {};
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
          .dispatch("lab/deleteLab", item.id)
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
        .dispatch("lab/getLab", this.params)
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
    },
    selectFileImport(event) {
      this.file = event.target.files[0];
      var loading = this.$loading.show();
      this.$store
        .dispatch("lab/importLab", this.file)
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
      console.log("open modal import!");
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
        .dispatch("lab/selectedAction", 
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
       .dispatch("lab/exportReport", {
          data: this.selectedItems,
        })
        .then((resp) => {
          loading.hide();
          FileSaver.saveAs(
            resp.data,
            "lab_"
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
      this.$router.push({ name: "LabExportPDF", query: { data: this.selectedItems } });
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
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
    upload() {
      this.$refs.uploadField.click();
    },
    extractGallery(item) {
      let data = [];
      item.forEach(element => {
        data.push(element.image);
      });
      return data;
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