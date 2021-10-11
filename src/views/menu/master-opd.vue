<template>
  <div>
    <h3>Master OPD</h3>
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
                <button class="btn btn-sm btn-primary" @click="addOPD()">
                  Tambah OPD
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
      :title="isUpdate ? 'Edit OPD' : 'Tambah OPD'"
      centered
      :color="isUpdate ? 'success' : 'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col">
          <label for="Role">Role</label>
          <v-select
            v-model="form.role_id"
            placeholder="Pilih Role"
            :options="computedRole"
          ></v-select>
          <br />
          <label for="Role">OPD</label>
          <v-select
            v-model="form.opd_id"
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
            Tambah OPD
          </button>
          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update OPD
          </button>
        </div>
      </template>
    </CModal>
  </div>
</template>



<script>
import * as data from "../../model/opd";
export default {
  data() {
    return {
      createModal: false,
      fields: data.fields,
      isUpdate: false,
      items: [],
      roles: [],
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
      this.createModal = false;
      var data = {
        opd_id: this.form.opd_id.value,
        role_id: this.form.role_id.value,
      };
      var loading = this.$loading.show();
      this.$store
        .dispatch("opd/addOPD", data)
        .then(() => {
          this.$toast.success("Berhasil menambahkan opd");
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
      this.form = {
        id: item.id,
        opd_id: { value: data.opd_id, label: data.opd },
        role_id: { value: data.role_id, label: data.role },
      };
      this.isUpdate = true;
      this.createModal = true;
    },
    update() {
      var loading = this.$loading.show();
      var data = {
        opd_id: this.form.opd_id.value,
        role_id: this.form.role_id.value,
      };
      this.$store
        .dispatch("opd/updateOPD", { id: this.form.id, data: data })
        .then(() => {
          this.$toast.success("Berhasil merubah data OPD");
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
          .dispatch("opd/deleteOPD", item.id)
          .then(() => {
            this.$toast.success("Berhasil menghapus data OPD");

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
        .dispatch("opd/getOPD", this.params)
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
    getRole() {
      let _params = {
        sorttype: "asc",
        sortby: "id",
        row: 100,
      };
      this.$store
        .dispatch("role/getRole", _params)
        .then((resp) => {
          this.roles = resp.data.data;
          console.log(this.roles);
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data roles \n", e);
        });
    },
    addOPD() {
      this.isUpdate = false;
      this.form = {};
      this.createModal = true;
    },
    pagination(page) {
      this.params.page = page;
      this.getData();
      // console.log(page);
    },
  },
  computed: {
    computedItems() {
      return this.items.map((item) => {
        return {
          id: item.id,
          opd_id: item.opd_id,
          role_id: item.role_id,
          opd: item.opd ? item.opd.name : "Tidak ada",
          role: item.role ? item.role.name : "Tidak ada",
          created_at: item.created_at
            ? item.created_at.slice(0, 10)
            : "Tidak ada",
        };
      });
    },
    computedRole() {
      return this.roles.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    },
    computedOPD() {
      return this.roles.map((item) => {
        if (item.is_opd == 1) {
          return {
            value: item.id,
            label: item.name,
          };
        }
      });
    },
  },
  mounted() {
    this.getData();
    this.getRole();
  },
};
</script>