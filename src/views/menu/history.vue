<template>
  <div>
    <h3>History Layanan</h3>
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
                    <option selected value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
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
                {{ searchOn }}&nbsp;&nbsp;
                <span
                  @click="searchOff"
                  class="badge bg-light text-dark text-center"
                  style="cursor: pointer"
                  >X</span
                >
              </span>
            </h3>
          </div>
        </div>
        <CDataTable
          class="table-striped"
          :fields="fields"
          :items="computedItems"
        >
          <template #action="{ item }">
            <td class="py-2">
              <CButton @click="show(item)" color="primary" square size="sm">
                Show
              </CButton>
            </td>
          </template>
        </CDataTable>
        <pagination
          v-if="total > 5"
          v-model="page"
          :records="total"
          :per-page="params.row"
          @paginate="pagination"
        />
      </CCardBody>
    </CCard>
    <CModal title="Detail History Layanan" size="lg" :show.sync="createModal">
      <CRow>
        <CCol sm="12">
          <CInput
            v-model="form.room_name"
            label="Nama Layanan"
            placeholder="Ketik disini..."
            readonly
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="form.start_chat"
            label="Waktu Dibuat Layanan"
            placeholder="Ketik disini..."
            readonly
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="form.end_chat"
            label="Waktu Berakhir Layanan"
            placeholder="Ketik disini..."
            readonly
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="form.rating"
            label="Rating"
            placeholder="Ketik disini..."
            readonly
          />
        </CCol>
        <CCol sm="6">
          <CInput v-model="form.duration" label="Durasi" readonly />
        </CCol>
      </CRow>
      <template slot="footer">
        <div class="row">
          <button @click="closeModal" class="btn btn-secondary mr-3">
            Tutup
          </button>
        </div>
      </template>
    </CModal>
  </div>
</template>


<script>
import * as data from "../../model/history-chat";

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      fields: data.fields,
      items: [],
      page: 1,
      total: 0,
      createModal: false,
      form: {
        room_name: "",
        start_chat: "",
        end_chat: "",
        rating: 0,
      },
      params: {
        sortby: "id",
        sorttype: "desc",
        page: 1,
        role_id: 0,
        row: 5,
        keyword: "",
      },
      isSearching: false,
      searchOn: "",
    };
  },
  methods: {
    getData() {
      var loading = this.$loading.show();
      if (this.user.role_id != null) {
        this.params.role_id = this.user.role_id;
      }
      this.$store
        .dispatch("history_chat/getHistory", this.params)
        .then((resp) => {
          this.items = resp.data.data;
          this.total = resp.data.total;
          loading.hide();
          console.log("items", this.items);
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    show(item) {
      this.form.room_name = item.room_name;
      this.form.start_chat = item.start_chat;
      this.form.end_chat = item.end_chat;
      this.form.rating = item.rating;
      this.form.duration = item.duration;

      this.createModal = true;
    },
    closeModal() {
      this.form = {
        room_name: "",
        start_chat: "",
        end_chat: "",
        rating: 0,
      };

      this.createModal = false;
    },
    getRating(item) {
      switch (item) {
        case 1:
          return "Tidak Baik";

        case 2:
          return "Kurang Baik";

        case 3:
          return "Cukup Baik";

        case 4:
          return "Baik";

        case 5:
          return "Sangat Baik";

        default:
          return "Tidak ada";
      }
    },
    search() {
      if (this.params.keyword != "") {
        this.isSearching = true;
        this.getData();
        this.searchOn = this.params.keyword;
        this.params.keyword = "";
      } else {
        this.$toast.error("Inputan tidak boleh kosong !!");
      }
    },

    searchOff() {
      this.isSearching = false;
      this.getData();
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
    },
  },
  computed: {
    computedItems() {
      if (this.items.length != 0) {
        return this.items.map((item) => {
          const start_chat = new Date(item.start_chat);
          const end_chat = new Date(item.end_chat);
          var diff = end_chat - start_chat;
          var hour = Math.floor(diff / 3600000);
          var minutes = Math.floor((diff - hour * 3600000) / 60000);
          return {
            ...item,
            duration: hour + " jam" + " " + minutes + " menit",
            rating: this.getRating(item.rating),
          };
        });
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>