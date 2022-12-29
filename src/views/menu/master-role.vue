<template>
  <div>
    <h3>Master Role</h3>
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
              <div class="col">
                <button class="btn btn-sm btn-primary" @click="addRole()">
                  Tambah Role
                </button>
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
        >
          <template #is_opd="{ item }">
            <td>
              <CBadge :color="getBadge(item.is_opd)">
                {{ item.is_opd }}
              </CBadge>
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
          v-model="params.page"
          :records="total"
          :per-page="params.row"
          @paginate="pagination"
        />
      </CCardBody>
    </CCard>
    <CModal
      :title="isUpdate ? 'Edit Role' : 'Tambah Role'"
      centered
      :color="isUpdate ? 'success' : 'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col">
          <CInput
            v-model="form.name"
            label="Nama Role"
            placeholder="ketik disini"
          />
          <CSelect
            :value.sync="form.is_opd"
            label="OPD"
            placeholder="Pilih"
            :options="[
              { label: 'Ya', value: 1 },
              { label: 'Tidak', value: 0 },
            ]"
          />

          <v-select
            v-if="form.is_opd == 0"
            v-model="form.opds"
            multiple
            placeholder="Pilih OPD"
            :options="computedOPD.filter((n) => n)"
          ></v-select>
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="createModal = false" class="btn btn-secondary mr-3">
            Batal
          </button>

          <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
            Tambah Role
          </button>
          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update Role
          </button>
        </div>
      </template>
    </CModal>
  </div>
</template>



<script>
import * as data from "../../model/role";
export default {
  data() {
    return {
      createModal: false,
      fields: data.fields,
      isUpdate: false,
      items: [],
      opds: [],
      total: 0,
      form: {},
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 50,
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
      if (this.form.opds) {
        // console.log("before ", this.form);
        var opds = this.form.opds.map((e) => {
          return e.value;
        });
        this.form.opds = opds;
      }
      console.log("after", this.form);
      this.createModal = false;
      var loading = this.$loading.show();
      this.$store
        .dispatch("role/addRole", this.form)
        .then(() => {
          this.$toast.success("Berhasil menambahkan role");
          loading.hide();
          this.form = {};
          this.getData();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    edit(item) {
      console.log(item);
      var data = JSON.parse(JSON.stringify(item));
      console.log("opds", item.opds);
      this.form = data;
      this.form.is_opd = data.is_opd == "Ya" ? 1 : 0;
      this.isUpdate = true;
      this.createModal = true;
    },
    update() {
      var loading = this.$loading.show();
      var data = JSON.parse(JSON.stringify(this.form));
      if (data.is_opd == 1) {
        data.opds = [];
      } else {
        data.opds = data.opds.map((e) => {
          return e.value;
        });
      }
      if (data.opd) {
        delete data.opd;
      }
      console.log(data);
      this.$store
        .dispatch("role/updateRole", { id: data.id, data: data })
        .then(() => {
          this.$toast.success("Berhasil merubah data Role");
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
      if (
        confirm(
          "JIKA ROLE DIHAPUS, MAKA USER DENGAN ROLE TERKAIT AKAN IKUT TERHAPUS !!"
        )
      ) {
        this.$store
          .dispatch("role/deleteRole", item.id)
          .then(() => {
            this.$toast.success("Berhasil menghapus data Role");

            this.form = {};
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
        .dispatch("role/getRole", this.params)
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
    getOPD() {
      let _params = {
        sorttype: "asc",
        sortby: "id",
        row: 100,
      };
      this.$store
        .dispatch("role/getRole", _params)
        .then((resp) => {
          this.opds = resp.data.data;
          console.log("opd", this.opds);
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data opd \n", e);
        });
    },
    addRole() {
      this.isUpdate = false;
      this.form = {};
      this.createModal = true;
    },
    pagination(page) {
      this.params.page = page;
      this.getData();
      // console.log(page);
    },
    getBadge(val) {
      return val == "Ya" ? "info" : "warning";
    },
  },
  computed: {
    computedItems() {
      return this.items.map((item, index) => {
        return {
          id: item.id,
          name: item.name,
          is_opd: item.is_opd == 0 ? "Tidak" : "Ya",
          created_at: item.created_at.slice(0, 10),
          opds: item.opd.map((e) => {
            return {
              value: e.id,
              label: e.name,
            };
          }),
          opd:
            item.opd.length > 0
              ? item.opd
                  .map((e) => {
                    return e.name;
                  })
                  .join()
              : "Tidak ada",
        };
      });
    },
    computedOPD() {
      return this.opds.map((item) => {
        if (item.is_opd == 1)
          return {
            value: item.id,
            label: item.name,
          };
      });
    },
  },
  mounted() {
    this.getData();
    this.getOPD();
  },
};
</script>