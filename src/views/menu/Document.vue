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
  </div>
</template>

<script>
import * as data from "../../model/e_product";
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
      selectedItems: [],
      isSelectedAll: false,
      selectedAction: 0,
      page: 1,
      total: 0,
      to: 0,
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
    edit(item) {
      this.form = item;
      this.isUpdate = true;
      this.createModal = true;
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
          .dispatch("menu/delete", item.id)
          .then(() => {
            this.$toast.success("Berhasil menghapus data ");
            this.getData();
          })
          .catch((e) => {
            this.$toast.error(e);
            loading.hide();
          });
        } 
      })
    },
    getData() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("document/get", this.params)
        .then((resp) => {
          this.items = resp.data.data;
          this.total = resp.data.total;
          this.to = resp.data.to;
          loading.hide();
        })
        .catch((e) => {
          // this.$toast.error("gagal mengambil data  \n", e);
          loading.hide();
        });
    },
    addModal() {
      this.$router.push({ path: 'DocumentFrom' });
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