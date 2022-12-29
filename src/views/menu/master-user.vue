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
                <button class="btn btn-sm btn-primary" @click="addUser()">
                  Tambah User
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
              <CButton
                @click="changePassword(item)"
                class="mr-2"
                color="info"
                square
                size="sm"
              >
                Change Password
              </CButton>
              <CButton
                v-if="item.id != user.id"
                @click="hapus(item)"
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
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="test@email.com"
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
            placeholder="Pilih Role"
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
    <CModal
      size="lg"
      title="Change Password"
      centered
      color="primary"
      :show.sync="modalPassword"
    >
      <div class="row">
        <div class="col-12">
          <CInput
            v-model="form.full_name"
            label="Nama User"
            placeholder="nama"
            disabled
          />
        </div>
        <div class="col-12">
          <CInput
            v-model="form.password"
            label="Password"
            type='password'
            placeholder="ketik disini"
            :is-valid="isPasswordValid"
            @update:value="inputPassword()"
            :lazy="false"
          />
        </div>
        <div class="col-12">
          <CInput
            v-model="form.confirm_password"
            label="Konfirmasi Password"
            type='password'
            placeholder="ketik disini"
          />
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="closeModalPassword" class="btn btn-secondary mr-3">
            Batal
          </button>

          <button @click="updatePassword" class="btn btn-primary">
            Update Password
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
      user: JSON.parse(localStorage.getItem("user")),
      page: 1,
      total: 0,
      form: {},
      params: {
        sorttype: "asc",
        sortby: "id",
        row: 50,
        page: 1,
        keyword: "",
      },
      isSearching: false,
      searchOn: '',
      modalPassword: false,
      isPasswordValid: null, //null/boolean
      invalidPassword: ''
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
      this.form = {};
      this.createModal = true;
    },
    changePassword(item) {
      this.modalPassword = true
      this.form.id = item.id
      this.form.full_name = item.full_name
    },
    inputPassword(){
      this.invalidPassword = '';
      this.isPasswordValid = null;
    },
    validatePassword(item) {
      if (item.password.length < 6) {
        this.invalidPassword = 'Password kurang dari 6 karakter!!';
        this.isPasswordValid = false;
        return false;
      } else if (item.password != item.confirm_password) {
        this.invalidPassword = 'Konfirmasi password tidak sama!!';
        this.isPasswordValid = false;
        return false;
      } else {
        this.invalidPassword = '';
        this.isPasswordValid = null;
        return true;
      }
    },
    updatePassword() {
      if (this.validatePassword(this.form)) {
        var loading = this.$loading.show();
        this.$store
          .dispatch("user/changePassword", { id: this.form.id, password: this.form.password })
          .then(() => {
            this.$toast.success("Berhasil merubah password user");
            loading.hide();
            this.modalPassword = false;
            this.form = {};
            this.getData();
          })
          .catch((e) => {
            this.$toast.error(e);
            loading.hide();
          });
      } else {
        this.$toast.error(this.invalidPassword);
      }
    },
    closeModalPassword (){
      this.form = {};
      this.invalidPassword = '';
      this.isPasswordValid = null;
      this.modalPassword = false;
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
      return this.items.map((item, index) => {
        return {
          ...item,
          role: item.role ? item.role.name : "Tidak ada",
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