<template>
  <div>
    <div class="card mt-2 p-3">
      <div class="row">
        <div class="col-3 ml-auto">
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
              @change="getOutbox"
            >
              <!-- <option selected>Pilih...</option> -->
              <option selected value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
          </div>
        </div>
      </div>
      <CDataTable class="table-striped" :items="computedItems" :fields="fields">
        <template #action="{ item }">
          <td class="py-2">
            <CButton
              @click="view(item)"
              class="mr-2"
              color="info"
              square
              size="sm"
            >
              Lihat
            </CButton>
          </td>
        </template>
      </CDataTable>
      <br />
      <pagination
        v-if="total > 10"
        v-model="params.page"
        :records="total"
        :per-page="10"
        @paginate="pagination"
      />
    </div>

    <CModal
      size="lg"
      title="Detail Pesan"
      centered
      color="primary"
      :show.sync="detailModal"
    >
      <div class="row">
        <div class="col">
          <CInput label="Kepada" v-model="getReceiver" disabled />

          <CInput label="Judul" v-model="details.title" disabled />
          <label for="">Isi Pesan</label>
          <textarea
            class="form-control"
            v-model="details.content"
            disabled
            aria-disabled=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <label for="">Lampiran</label>

          <div class="card dashed" style="height: 150px">
            <div class="row">
              <div
                class="col-md-3"
                v-for="(item, index) in details.attachments"
                :key="index"
              >
                <div
                  class="card m-1 justify-content-center text-center"
                  style="height: 140px"
                >
                  <img
                    class="align-self-center mb-2 mt-2"
                    src="@/assets/attachment.png"
                    width="35%"
                    alt=""
                  />
                  <div class="card-footer p-0 m-1">
                    <button
                      @click="viewDocs(item.file)"
                      class="btn btn-sm btn-info btn-block"
                    >
                      Lihat
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-3" v-if="details.attachments.length == 0">
                <div
                  class="card m-1 justify-content-center text-center"
                  style="height: 140px"
                >
                  <p>Tidak ada lampiran</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CModal>
    <a target="_blank" ref="newPage" href=""></a>
  </div>
</template>


<script>
import * as data from "../../../model/outbox";

export default {
  name: "Outbox",
  data() {
    return {
      outbox: [],
      fields: data.fields,
      user: {},
      detailModal: false,
      details: {
        title: "",
        receivers: [],
        attachments: [],
      },
      total: 0,
      params: {
        sortby: "id",
        sorttype: "desc",
        row: 10,
      },
    };
  },

  methods: {
    getOutbox() {
      this.$store
        .dispatch("message/getOutbox", {
          id: this.user.id,
          params: this.params,
        })
        .then((resp) => {
          this.outbox = resp.data.data;
          this.total = resp.data.total;
          console.log(this.outbox);
        })
        .catch((e) => {
          alert(e);
        });
    },
    hapus() {},
    view(item) {
      this.details = item;
      this.detailModal = true;
    },
    pagination(page) {
      this.params.page = page;
      this.getOutbox();
      // console.log(page);
    },
    viewDocs(item) {
      this.$refs.newPage.href = item;
      this.$refs.newPage.click();
    },
  },

  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getOutbox();
  },
  watch: {
    getOutboxFromStore(val) {
      this.outbox = val.data.data;
      this.total = val.data.total;
    },
  },
  computed: {
    computedItems() {
      return this.outbox.map((e) => {
        return {
          ...e,
          title: e.title,
          receiver: e.receivers
            .map((e) => {
              return e.name;
            })
            .join(),
          created_at: this.$moment(e.created_at).format(
            "dddd, MMMM Do YYYY, h:mm a"
          ),
        };
      });
    },
    getReceiver() {
      return this.details.receivers
        .map((item) => {
          return item.name;
        })
        .join();
    },
    getOutboxFromStore() {
      return this.$store.getters["message/getOutbox"];
    },
  },
};
</script>

<style scoped>
</style>