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
                style="max-width: 200px"
                class="form-control form-control-sm mx-2"
                placeholder="Ketik disini"
              />
              <button class="btn btn-sm btn-success">Cari</button>
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
              <div class="col">
                <button class="btn btn-sm btn-primary" @click="addRole()">
                  Tambah Role
                </button>
              </div>
            </div>
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
          v-if="total > 5"
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
            :options="computedOPD"
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
        row: 5,
        page: 1,
      },
    };
  },
  methods: {
    submit() {
      if (this.form.opds) {
        var opds = this.form.opds.map((e) => {
          return e.value;
        });
        this.form.opds = opds;
      }
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
      this.form = data;
      this.form.is_opd = data.is_opd == "Ya" ? 1 : 0;
      this.isUpdate = true;
      this.createModal = true;
    },
    update() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("role/updateRole", { id: this.form.id, data: this.form })
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
      if (confirm("Data akan dihapus !!")) {
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
        .dispatch("opd/getOPD", _params)
        .then((resp) => {
          this.opds = resp.data.data;
          console.log(this.opds);
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data opd \n", e);
        });
    },
    addRole() {
      this.isUpdate = false;
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
      return this.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          is_opd: item.is_opd == 0 ? "Tidak" : "Ya",
          created_at: item.created_at.slice(0, 10),
          opd: item.opd.length > 0 ? item.opd.join() : "Tidak ada",
        };
      });
    },
    computedOPD() {
      return this.opds.map((item) => {
        return {
          value: item.id,
          label: item.opd.name,
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