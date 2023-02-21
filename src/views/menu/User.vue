<template>
  <div>
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
            label="NIP"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="test@email.com"
          />
          <label for="Role">Role / PD</label>
          <v-select class="mb-3"
            v-model="form.role_id"
            placeholder="Pilih Role"
            label="label"
            :options="computedRole"
          ></v-select>
          <label for="">Pilih restaurant</label>
          <v-select 
            placeholder="Rumah Makan"
            class="" 
            :reduce="itemsRestorant => itemsRestorant.value" 
            v-model="form.restorant_id" 
            label="label" 
            :options="itemsRestorant"></v-select>
          <CInput
            v-if="!isUpdate"
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="*******"
          />
          <CInput
            v-if="!isUpdate"
            v-model="form.password_confirmation"
            label="Konfirmasi Password"
            type='password'
            placeholder="ketik disini"
          />
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="createModal = !createModal" class="btn btn-secondary mr-3">
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
            v-model="form.password_confirmation"
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
      form: {

      },
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
      invalidPassword: '',
      itemsRestorant: [],
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
    getDataRestorant() {
        var loading = this.$loading.show();

        let params = {
          sorttype: "asc",
          sortby: "id",
          row: 100,
          page: 1,
          keyword: "",
        }
        
        this.$store
          .dispatch("restorant/get", params)
          .then((resp) => {
            const restData = resp.data.data;

            restData.map(item => {
              this.itemsRestorant.push({
                label: item.name,
                value: item.id
              })
            })

            loading.hide();
          })
          .catch((e) => {
            this.$toast.error("gagal mengambil data  \n", e);
            loading.hide();
          });
      },
    searchOff(){
      this.isSearching = false;
      this.params.keyword = '';
      this.getData();
    },
    submit() {
      var loading = this.$loading.show();
      this.form.role_id = this.form.role_id.value
      this.form.restorant_id = this.form.role_id.value
      console.log(this.form)

      this.$store
        .dispatch("user/addUser", this.form)
        .then(() => {
          this.$toast.success("Berhasil menambahkan user");
          loading.hide();
          this.createModal = false;
          this.form = {};
          this.getData();
        })
        .catch(() => {
          loading.hide();
        });
    },
    edit(item) {
      this.form = item;
      this.isUpdate = true;
      this.createModal = true;
      if (this.form.role_id) {
        let role = {
          value: this.form.role_id,
          label: this.roles.find(element => {
            return element.id == this.form.role_id
          }).name
        }
        this.form.role_id = role
      }

      if (this.form.restaurant_id !== null) {
        let role = {
          value: this.form.restaurant_id,
          label: this.itemsRestorant.find(element => {
            return element.value == this.form.restaurant_id
          }).label
        }
        this.form.restaurant_id = role
      }
    },
    update() {
      var loading = this.$loading.show();
      this.form.role_id = this.form.role_id.value
      this.form.restorant_id = this.form.restorant_id.value
      console.log(this.form)
      this.$store
        .dispatch("user/updateUser", { id: this.form.id, data: this.form })
        .then(() => {
          this.$toast.success("Berhasil merubah data user");
          loading.hide();
          this.createModal = false;
          this.form = {};
          this.getData();
        })
        .catch(() => {
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
            this.$loading.hide();
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
          console.log(resp.data.data)
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

          // this.getDataRole();
        })
        .catch(() => {
          loading.hide();
        });
    },
    getDataRole() {
      var loading = this.$loading.show();

      let params = {
        sorttype: "asc",
        sortby: "id",
        row: 100,
        page: 1,
        keyword: "",
      }

      this.$store
        .dispatch("role/get", params)
        .then((resp) => {
          this.roles = resp.data.data;

          loading.hide();
        })
        .catch(() => {
          loading.hide();
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
      } else if (item.password != item.password_confirmation) {
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
    },
  },
  computed: {
    computedItems() {
      return this.items.map((item) => {
        return {
          ...item,
          role: item.roles ? item.roles.name : "Tidak ada",
          created_at: this.$moment(item.created_at).format("Do MMMM YYYY"),
          updated_at: this.$moment(item.updated_at).format("Do MMMM YYYY"),
        };
      });
    },
    computedRestorantItems(){
        return this.itemsRestorant.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
      },
    computedRole() {
      // if (this.form.role_id) {
      //   let role = {
      //     value: this.form.role_id,
      //     label: this.roles.find(element => {
      //       return element.id == this.form.role_id
      //     }).name
      //   }
      //   this.form.role_id = role
      // }
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
    this.getDataRestorant()
    this.getDataRole()
  },
};
</script>