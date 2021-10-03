<template>
  <div>
    <h3>Master User</h3>
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
                <button class="btn btn-sm btn-primary" @click="addUser()">
                  Tambah User
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
          v-model="page"
          :records="total"
          :per-page="5"
          @paginate="pagination"
        />
      </CCardBody>
    </CCard>
    <CModal
      size="lg"
      :title="isUpdate ? 'Edit User' : 'Tambah User'"
      centered
      :color="isUpdate ? 'success' : 'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col">
          <CInput
            v-model="form.full_name"
            label="Nama Lengkap"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.nip"
            :readonly="isUpdate"
            label="NIP"
            type="number"
            placeholder="12345678"
          />
          <CInput
            v-if="!isUpdate"
            v-model="form.password"
            label="Password"
            type="text"
            placeholder="*******"
          />
        </div>
        <div class="col">
          <CInput
            v-model="form.position"
            label="Jabatan"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.group"
            label="Golongan"
            placeholder="ketik disini"
          />
          <CSelect
            :value.sync="form.role_id"
            label="Role"
            :options="computedRole"
          />
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="createModal = false" class="btn btn-secondary mr-3">
            Batal
          </button>

          <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
            Tambah User
          </button>
          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update User
          </button>
        </div>
      </template>
    </CModal>
  </div>
</template>



<script>
import * as data from "../../model/user";
export default {
  data() {
    return {
      createModal: false,
      fields: data.fields,
      isUpdate: false,
      items: [],
      roles: [],
      page: 1,
      total: 0,
      form: {},
      params: {
        sorttype: "asc",
        sortby: "id",
        row: 5,
        page: 1,
      },
    };
  },
  methods: {
    submit() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("user/addUser", this.form)
        .then(() => {
          this.$toast.success("Berhasil menambahkan user");
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
    edit(item) {
      this.form = item;
      this.isUpdate = true;
      this.createModal = true;
    },
    update() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("user/updateUser", { id: this.form.id, data: this.form })
        .then(() => {
          this.$toast.success("Berhasil merubah data user");
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
          .dispatch("user/deleteUser", item.id)
          .then(() => {
            this.$toast.success("Berhasil menghapus data user");

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
        .dispatch("user/getUser", this.params)
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
          this.$toast.error("gagal mengambil data role \n", e);
        });
    },
    addUser() {
      this.isUpdate = false;
      this.createModal = true;
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
      // console.log(page);
    },
  },
  computed: {
    computedItems() {
      return this.items.map((item) => {
        return {
          ...item,
          role: item.role.name,
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
  },
  mounted() {
    this.getData();
    this.getRole();
  },
};
</script>