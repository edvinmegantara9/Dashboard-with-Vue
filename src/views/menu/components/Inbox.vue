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
              @change="getInbox"
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
  </div>
</template>


<script>
import * as data from "../../../model/inbox";

export default {
  data() {
    return {
      inbox: [],
      fields: data.fields,
      user: {},
      total: "",
      params: {
        sortby: "id",
        sorttype: "desc",
        row: 10,
        page: 1,
      },
    };
  },

  methods: {
    getInbox() {
      this.$store
        .dispatch("message/getInbox", {
          id: this.user.role_id,
          params: this.params,
        })
        .then((resp) => {
          this.inbox = resp.data.data;
          this.total = resp.data.total;
          console.log(this.inbox);
        })
        .catch((e) => {
          alert(e);
        });
    },
    hapus() {},
    view() {},
    pagination(page) {
      this.params.page = page;
      this.getInbox();
      // console.log(page);
    },
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getInbox();
  },
  watch: {
    getInboxFromStore(val) {
      this.inbox = val.data.data;
      this.total = val.data.total;
    },
  },
  computed: {
    computedItems() {
      return this.inbox.map((e) => {
        return {
          ...e,
          title: e.message.title,
          sender: e.message.sender ? e.message.sender.name : "tidak ada",
          created_at: this.$moment(e.message.created_at).format(
            "dddd, MMMM Do YYYY, h:mm a"
          ),
        };
      });
    },
    getInboxFromStore() {
      return this.$store.getters["message/getInbox"];
    },
  },
};
</script>

<style scoped>
</style>