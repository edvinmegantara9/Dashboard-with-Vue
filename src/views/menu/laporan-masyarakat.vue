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
                style="max-width: 200px"
                class="form-control form-control-sm mx-2"
                placeholder="Ketik disini"
              />
              <button class="btn btn-sm btn-success">Cari</button>
            </div>
          </div>
          <div class="col-md-5 offset-md-2 ml-auto">
            <div class="row">
              <div class="col-md-6 offset-md-6">
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
                    @change="getCitizenReport"
                  >
                    <!-- <option selected>Pilih...</option> -->
                    <option selected value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CDataTable
          v-if="
            user.role.is_opd == 0 ||
            user.role.name.toLowerCase() == 'admin'
          "
          class="table-striped"
          :items="computedItems.filter((n) => n)"
          :fields="fields"
        >
          <template #action="{ item }">
            <td class="py-2">
              <CButton
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
        <CDataTable
          v-if="user.role.is_opd == 1"
          class="table-striped"
          :items="computedItems.filter((n) => n)"
          :fields="fields_opd"
        >
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
  </div>
</template>



<script>
import * as data from "../../model/document";

export default {
  data() {
    return {
      createModal: false,
      fields: data.LaporanMasyarakat,
      fields_opd: data.LaporanMasyarakat_opd,
      isUpdate: false,
      user: {
        role: { is_opd: null, name: '' }
      },
      items: [],
      report: [],
      docTypes: [],
      opd_list: [],
      page: 1,
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
    hapus(item) {
      if (confirm("Data akan dihapus !!")) {
        this.$store
          .dispatch("docs/deleteCitizenReport", item.id)
          .then(() => {
            this.$toast.success("Berhasil menghapus data laporan");
            this.getCitizenReport();
          })
          .catch((e) => {
            this.$toast.error(e);
            loading.hide();
          });
      }
    },
    getCitizenReport() {
      this.$store
        .dispatch("docs/getCitizenReport")
        .then((resp) => {
          this.report = resp.data.data;
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data laporan \n", e);
        });
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getCitizenReport();
    },
    getUserFromLocal() {
      var data = JSON.parse(localStorage.getItem("user"));
      this.user = data;
      this.getOpdList();
    },
    getOpdList() {
      this.opd_list = this.user.role.opd.map((e) => {
        return e.id;
      });
    },
  },
  watch: {
    computedItems(val) {},
  },
  computed: {
    computedItems() {
      return this.report.map((item) => {
        return {
          ...item
        };
      });
    },
  },
  mounted() {
    this.getUserFromLocal();
    this.getCitizenReport();
  },
};
</script>