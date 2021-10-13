<template>
  <div>
    <h3>Laporan Harian</h3>
    <br/>
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
                v-model="search"
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
                <button class="btn btn-sm btn-primary" @click="create">
                  Tambah Laporan Harian
                </button>
              </div>
            </div>
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
    <CModal
        :title="!isUpdate ? 'Tambah Laporan Harian' : 'Update Laporan Harian'"
        :color="!isUpdate ? 'primary' : 'warning'"
        size="lg"
        :show.sync="createModal"
      >
        <CRow>
          <CCol sm="12">
            <CTextarea
              v-model="form.report"
              label="Laporan Harian"
              placeholder="Tulis laporan disini ..."
            />
          </CCol>
        </CRow>
        <template slot="footer">
          <div class="row">
            <button @click="closeModal" class="btn btn-secondary mr-3">
              Batal
            </button>

            <button
              @click="store"
              v-if="!isUpdate"
              class="btn btn-primary"
            >
              Tambah Laporan
            </button>
            
            <button
              @click="update"
              v-if="isUpdate"
              class="btn btn-primary"
            >
              Update Laporan
            </button>
          </div>
        </template>
      </CModal>
  </div>
</template>



<script>
import * as data from "../../model/report";
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
      search: '',
      params: {
        sorttype: "desc",
        sortby: "date",
        row: 5,
        page: 1,
      },
    }
  },
  methods: {
    getData() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("report/getReport", this.params)
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
    create() {
      this.createModal = true;
      this.isUpdate = false;
    },
    store () {
      var loading = this.$loading.show();
      this.form.name = this.user.full_name;
      this.form.email = this.user.email;
      this.form.nip = this.user.nip;
      this.form.position = this.user.position;
      this.form.role = this.user.role.name;
      this.$store
        .dispatch("report/addReport", this.form)
        .then((resp) => {
          this.$toast.success("Berhasil menambah laporan harian");
          loading.hide();
          this.closeModal();
          this.getData();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    edit(item){
      this.isUpdate = true;
      this.form = item;
      this.form.id = item.id;
      this.createModal = true;
    },
    update() {
      if (this.isUpdate) {
        var loading = this.$loading.show();
        this.$store
          .dispatch("report/updateReport", {id: this.form.id, data: this.form})
          .then((resp) => {
            this.$toast.success("Berhasil memperbarui laporan harian");
            loading.hide();
            this.closeModal();
            this.getData();
          })
          .catch((e) => {
            this.$toast.error(e);
            loading.hide();
          });
      } else {
        this.$toast.error("Tidak bisa memperbarui laporan");
      }
    },
    destroy(id) {
      if (confirm("Data akan dihapus !!")) {
        var loading = this.$loading.show();
        this.$store
          .dispatch("report/deleteReport", id)
          .then(() => {
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
    closeModal() {
      this.createModal = false;
      this.isUpdate = false;
      this.form = {};
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
          role: item.role
        };
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>