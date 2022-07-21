<template>
  <div>
    <h3>Data SBU</h3>
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
                    @change="getData()"
                  >
                    <!-- <option selected>Pilih...</option> -->
                    <option selected value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <button
                  class="btn btn-sm btn-primary"
                  v-if="user.role.name.toLowerCase() == 'admin'"
                  @click="addModal()"
                >
                  Tambah Data SBU
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
      :title="
        isUpdate ? 'Edit Data SBU' : 'Tambah Data SBU'
      "
      centered
      :color="isUpdate ? 'success' : 'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col">
          <CInput
            v-model="form.nama_pjbu"
            label="Nama PJBU"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.nama_badan_usaha"
            label="Nama Badan Usaha"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.alamat"
            label="Alamat"
            placeholder="ketik disini"
          />
          <label for="">Kecamatan</label>
          <select
            name=""
            v-model="form.kecamatan"
            class="form-control"
            placeholder="Pilih"
            id=""
          >
            <option value="Ciparay">Ciparay</option>
            <option value="Soreang">Soreang</option>
          </select>
          <CInput
            v-model="form.bentuk"
            label="Bentuk Badan Usaha"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.asosiasi"
            label="Asosiasi"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.sub_klasifikasi_kbli"
            label="Sub Klasifikasi KBLI"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.kualifikasi_kbli"
            label="Kualifikasi KBLI"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.tanggal_terbit"
            label="Kualifikasi KBLI"
            placeholder="ketik disini"
            type="date"
          />
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>

          <button @click="submit" v-if="!isUpdate" class="btn btn-primary">
            Tambah Data SBU
          </button>
          <button @click="update" v-if="isUpdate" class="btn btn-primary">
            Update Data SBU
          </button>
        </div>
      </template>
    </CModal>
  </div>
</template>



<script>
import * as data from "../../model/sbu";

export default {
  data() {
    return {
      createModal: false,
      fields: [],
      isUpdate: false,
      items: [],

      page: 1,
      total: 0,
      form: {
   
      },
      user: JSON.parse(localStorage.getItem("user")),
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 5,
        page: 1,
        type: [0, 1],
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
    submit() {
      this.form.user_id = JSON.parse(localStorage.getItem("user")).id;
      this.form.opd_id = JSON.parse(localStorage.getItem("user")).role_id;
      var loading = this.$loading.show();
      this.$store
        .dispatch("sbu/addSbu", this.form)
        .then(() => {
          this.$toast.success("Berhasil menambahkan data");
          loading.hide();
          this.createModal = false;
          this.form = {
          };
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
    cancel() {
      this.form = {
        type: 0,
      };
      this.createModal = false;
    },
    update() {
      var loading = this.$loading.show();
      delete this.form.updated_at;
      this.form.nilai_kontrak = parseInt(this.form.nilai_kontrak);
      this.$store
        .dispatch("sbu/updateSbu", {
          id: this.form.id,
          data: this.form,
        })
        .then(() => {
          this.$toast.success("Berhasil merubah data ");
          loading.hide();
          this.createModal = false;
          this.form = {
            type: 0,
          };
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
          .dispatch("sbu/deleteSbu", item.id)
          .then(() => {
            this.$toast.success("Berhasil menghapus data ");

            this.form = {
              type: 0,
            };
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
        .dispatch("sbu/getSbu", this.params)
        .then((resp) => {
          this.items = resp.data.data;
          this.total = resp.data.total;

          loading.hide();
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data  \n", e);
          loading.hide();
        });
    },
    addModal() {
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
          created_at: item.created_at.slice(0, 10),
        };
      });
    },
  },
  mounted() {
    this.getData();
  },

  created() {
    this.fields =
      this.user.role.name.toLowerCase() == "admin"
        ? data.fields
        : data.fields_no_action;
  },
};
</script>