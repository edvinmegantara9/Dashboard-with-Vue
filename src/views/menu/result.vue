<template>
  <div>
    <CCard>
      <CCardBody>
        <div class="row justify-content-between">
          <div class="col-10">
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
               <button
                class="btn btn-sm btn-primary ml-2"
                @click="addModal()"
              >
                Filter
              </button>
              <label class="m-1 ml-3" for="">Select All : </label>
              <input
                type="checkbox"
                v-model="isSelectedAll"
                @change="checkAll()"
              />

              <select v-if="selectedItems.length > 0"
                  style="max-width: 200px"
                  class="form-control form-control-sm mx-2"
                  placeholder="Ketik disini"
                  v-model="selectedAction"
                  @change="changeActionSelected()"
                >
                <option value="0">Action Selected</option>
                <option value="2">Export Excel Items Selected</option>
                <option value="3">Export Pdf Items Selected</option>
              </select>
            </div>
          </div>
          <div class="col-2">
            <div class="row">
              <div class="col-12">
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
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
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
          sorter
        >
        <template #select="{ item }">
          <td class="py-2">
            <input 
                type="checkbox"
                @change="check(item)"
                v-model="item.select"
              />
          </td>
        </template>

        </CDataTable>
        <pagination
          v-if="total !== items.length"
          v-model="page"
          :records="total"
          :per-page="100"
          @paginate="pagination"
        />
      </CCardBody>
    </CCard>
     <CModal
      size="lg"
      :title="'Filter Transaksi'"
      centered
      :color="'primary'"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col-6">
          <CInput
            v-model="params.firstdate"
            label="Tanggal Awal"
            type="date"
          />
        </div>
         <div class="col-6">
          <CInput
            v-model="params.lastdate"
            label="Tanggal Akhir"
            type="date"
          />
         </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label for="">Status</label>
          <select
            v-model="params.status"
            class="form-control"
            placeholder="Pilih"
          >
            <option value="">Semua Status</option>
            <option value="LULUS">LULUS</option>
            <option value="GAGAL">GAGAL</option>
          </select>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <label for="">SIM type</label>
          <select
            v-model="params.sim_type"
            class="form-control"
            placeholder="Pilih"
          >
            <option value="">Semua SIM</option>
            <option value="SIM A">SIM A</option>
            <option value="SIM A UMUM">SIM A UMUM</option>
            <option value="SIM B1">SIM B1</option>
            <option value="SIM B1 UMUM">SIM B1 UMUM</option>
            <option value="SIM B2">SIM B2</option>
            <option value="SIM B2 UMUM">SIM B2 UMUM</option>
            <option value="SIM C">SIM C</option>
            <option value="SIM C1">SIM C1</option>
            <option value="SIM C2">SIM C2</option>
            <option value="SIM D">SIM D</option>
            <option value="SIM D1">SIM D1</option>
          </select>
        </div>
        <div class="col-6">
          <label for="">Keperluan</label>
          <select
            v-model="params.needs"
            class="form-control"
            placeholder="Pilih"
          >
            <option value="">Semua Keperluan</option>
            <option value="Pengajuan SIM Baru" >Pengajuan SIM Baru</option>
            <option value="Pengajuan Perpanjangan SIM">Pengajuan Perpanjangan SIM</option>
          </select>
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="cancel" class="btn btn-secondary mr-2">
            Clear
          </button>
          <button @click="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </template>
    </CModal>
  </div>
</template>

<script>
import * as data from "../../model/result";
import FileSaver from "file-saver";

export default {
  data() {
    return {
      file: null,
      createModal: false,
      createModalImport: false,
      fields: [],
      isUpdate: false,
      items: [],
      imageListAfter: [],
      imageListProcess: [],
      imageListBefore: [],
      selectedItems: [],
      isSelectedAll: false,
      selectedAction: 0,
      page: 1,
      total: 0,
      to: 0,
      form: {
        product_details: []
      },
      user: JSON.parse(localStorage.getItem("user")),
      params: {
        firstdate: this.$moment().format("YYYY-MM-DD"),
        lastdate: this.$moment().format("YYYY-MM-DD"),
        status: "",
        sim_type: "",
        needs: "",
        sorttype: "desc",
        sortby: "id",
        row: 100,
        page: 1,
        keyword: "",
      },
      isSearching: false,
      searchOn: '',
      summary: 0
    };
  },
  methods: {
    addModal() {
      this.isUpdate = false;
      this.createModal = true;
    },
    search() {
      if (this.params.keyword != "") {
        this.isSearching = true;
        this.getData();
        this.searchOn = this.params.keyword;
      } else {
        this.$toast.error("Inputan tidak boleh kosong !!");
      }
    },
    searchOff(){
      this.isSearching = false;
      this.params.keyword = '';
      this.getData();
    },
    getData() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("result/getResult", this.params)
        .then((resp) => {
          this.items = resp.data.data;
          this.total = resp.data.total;
          this.to = resp.data.to;

          // khusus untuk checkbox
          this.selectedItems = [];
          this.summary = 0;
          this.items.forEach(element => {
            this.summary += Number(element.amount);
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
          this.$toast.error("gagal mengambil data  \n", e);
          loading.hide();
        });
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
    },
    check(item) {
      if (item.select) {
        this.selectedItems.push(item.id);
      } else {
        const index = this.selectedItems.indexOf(item.id);
        this.selectedItems.splice(index, 1);
      }
    },
    checkAll() {
      this.getData();
    },
    changeActionSelected() {
      switch (Number(this.selectedAction)) {
        case 1:
          console.log('deleted')
          this.deleteSelected('delete');
          break;
        case 2:
          console.log('export excel')
          this.exportExcel('export_excel');
          break;
        case 3:
          console.log('export pdf')
          this.exportPDF();
          break;
      }
    },
    exportExcel(action) {
      var loading = this.$loading.show();
      this.$store
       .dispatch("result/exportReport", {
          data: this.selectedItems,
        })
        .then((resp) => {
          loading.hide();
          FileSaver.saveAs(
            resp.data,
            "Result"
          );
          this.exportModal = false;
          this.exportDataParams = {};
        })
        .catch((e) => {
          loading.hide();
        });
    },
    exportPDF() {
      this.$router.push({ name: "ResultExportPDF", query: { data: this.selectedItems } });
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    cancel() {
      this.params = {
        firstdate: this.$moment().format("YYYY-MM-DD"),
        lastdate: this.$moment().format("YYYY-MM-DD"),
        sim_type: "",
        needs: "",
        status: "",
        sorttype: "desc",
        sortby: "id",
        row: 100,
        page: 1,
        keyword: "",
      }
    },
    submit() {
      this.createModal = false;
      this.getData();
    }
  },
  computed: {
    computedItems() {  
      return this.items.map((item, index) => {
        return {
          index: (this.to - this.items.length) + index+1 + '.',
          ...item,
          product: item.product.name,
          user: item.user.full_name,
          payment: item.payment.no_transaction,
          expired_at: this.$moment(item.expired_at).format("Do MMMM YYYY"),
          created_at: this.$moment(item.created_at).format("Do MMMM YYYY"),
          updated_at: this.$moment(item.updated_at).format("Do MMMM YYYY"),
        };
      });
    },
  },
  mounted() {
    this.getData();
  },
  created() {
    this.fields = data.fields
  },
};
</script>