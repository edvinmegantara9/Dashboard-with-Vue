<template>
  <div>
    <h3>Laporan Masyarakat</h3>

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
                    @change="getData"
                  >
                    <!-- <option selected>Pilih...</option> -->
                    <option selected value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
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
          :items="computedItems.filter((n) => n)"
          :fields="fields"
          sorter
        >
          <template #action="{ item }">
            <td class="py-2">
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
          v-if="total > 5"
          v-model="page"
          :records="total"
          :per-page="5"
          @paginate="pagination"
        />
      </CCardBody>
    </CCard>
  </div>
</template>


<script>
import * as data from "../../model/report-citizen";

export default {
  data() {
    return {
      createModal: false,
      fields: data.fields,
      isUpdate: false,
      items: [],
      roles: [],
      user: JSON.parse(localStorage.getItem("user")),
      page: 1,
      total: 0,
      form: {},
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 5,
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
        this.params.keyword = '';
      } else {
        this.$toast.error("Inputan tidak boleh kosong !!");
      }
    },

    searchOff(){
      this.isSearching = false;
      this.getData();
    },
    getData() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("report_citizen/getCitizenReport", this.params)
        .then((resp) => {
          this.items = resp.data.data;
          this.total = resp.data.total;
          loading.hide();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },

    destroy(id) {
      if (confirm("Data akan dihapus !!")) {
        var loading = this.$loading.show();
        this.$store
          .dispatch("report_citizen/deleteCitizenReport", id)
          .then((resp) => {
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

    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
    },
  },
  computed: {
    computedItems() {
      return this.items.map((item) => {
        if (
          this.user.role.name.toLowerCase() == "admin" ||
          this.user.role.isOpd == 0
        ) {
          return {
            ...item,
          };
        }
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>