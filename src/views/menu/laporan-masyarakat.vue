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
          :items="computedItems.filter((n) => n)"
          :fields="fields"
          sorter
        >
          <template #action="{ item }">
            <td class="py-2">
              <CButton @click="view(item)" color="info" square size="sm">
                Detail
              </CButton>
              <CButton
                v-if="
                  user.role.name.toLowerCase() == 'admin' ||
                  user.role.isOpd == 0
                "
                @click="destroy(item.id)"
                color="danger"
                square
                size="sm"
                class="ml-2"
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
      size="lg"
      title="Detail laporan"
      centered
      color="primary"
      :show.sync="detailModal"
    >
      <div class="row">
        <div class="col text-center">
          <div
            class="card border d-flex justify-content-center"
            style="height: 250px"
          >
            <img
              v-if="!modalData.file"
              src="@/assets/no-image-post.png"
              class="align-self-center mb-4"
              width="45%"
              alt=""
            />

            <div v-if="modalData.file" class="align-self-center">
              <img
                :src="modalData.file"
                style="width: 100%; height: 230px; object-fit: cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CInput v-model="modalData.name" label="Nama" readonly />
          <CInput v-model="modalData.address" label="Alamat" readonly />
          <CInput v-model="modalData.phone_number" label="No HP" readonly />
          <CInput v-model="modalData.report" label="Isi Laporan" readonly />
        </div>
      </div>
    </CModal>
  </div>
</template>


<script>
import * as data from "../../model/report-citizen";

export default {
  data() {
    return {
      detailModal: false,
      fields: data.fields,
      isUpdate: false,
      items: [],
      roles: [],
      user: JSON.parse(localStorage.getItem("user")),
      page: 1,
      total: 0,
      form: {},

      modalData: {},
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 50,
        page: 1,
        keyword: "",
      },
      isSearching: false,
      searchOn: "",
    };
  },
  methods: {
    search() {
      if (this.params.keyword != "") {
        this.isSearching = true;
        this.getData();
        this.searchOn = this.params.keyword;
        this.params.keyword = "";
      } else {
        this.$toast.error("Inputan tidak boleh kosong !!");
      }
    },
    view(item) {
      this.modalData = item;
      this.detailModal = true;
    },
    searchOff() {
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
      return this.items.map((item, index) => {
        return {
          ...item,
        };
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>