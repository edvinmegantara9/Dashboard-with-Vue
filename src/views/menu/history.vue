<template>
  <div>
    <h3>History Layanan</h3>
    <CCard>
      <CCardBody>
        <CDataTable
          class="table-striped"
          :fields="fields"
          :items="computedItems"
          items-per-page-select
          :items-per-page="5"
          :table-filter="{ label: 'Search', placeholder: 'Cari disini...' }"
          sorter
          :pagination="true"
        >
          <template #action="{ item }">
            <td class="py-2">
              <CButton @click="show(item)" color="primary" square size="sm">
                Show
              </CButton>
            </td>
          </template>
        </CDataTable>
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
        sorttype: "asc",
        role_id: 0,
      },
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
          this.items = resp.data;
          this.total = this.items.length;
          loading.hide();
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
      }
    },
  },
  computed: {
    computedItems() {
      return this.items.map((item) => {
        const start_chat = new Date(item.start_chat);
        const end_chat = new Date(item.end_chat);
        var diff = end_chat - start_chat;
        var hour = Math.floor(diff / 3600000);
        var minutes = Math.floor((diff - (hour * 3600000)) / 60000);
        return {
          ...item,
          duration: hour + ' jam' + ' ' + minutes + ' menit',
          rating: this.getRating(item.rating),
        };
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>