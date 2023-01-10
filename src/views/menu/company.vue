<template>
  <div>
    <CCard>
      <CCardBody>
        <div class="row justify-content-between">
          <div class="col-10">
            <div class="row mb-3">
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
import * as data from "../../model/company";

export default {
  data() {
    return {
      visibleStaticBackdropDemo: false,
      file: null,
      fields: [],
      isUpdate: false,
      items: [],
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
       this.$router.push({ path: 'company-detail', query: { id: item.id } });
    },
    getData() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("company/getCompany", this.params)
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