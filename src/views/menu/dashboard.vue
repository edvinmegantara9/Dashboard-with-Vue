<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="card border-top rounded shadow p-3" style="height: 300px">
          <p class="p-0 m-0"><b> Agenda Bappeda </b></p>
          <hr />
          <div class="card-body p-0">
            <center v-if="agenda.length == 0">
              <p>Tidak ada agenda</p>
            </center>
            <div class="scroll" v-if="agenda.length != 0">
              <div class="row" v-for="item in agenda" :key="item.id">
                <div class="col-md-1">
                  <CIcon
                    name="cil-bookmark"
                    size="custom-size"
                    class="mr-3"
                    :height="35"
                  />
                </div>
                <div class="col-md-11">
                  <b> {{ item.title }} <br /> </b>
                  {{ item.content.slice(0, 15) + "...." }}
                  <hr />
                </div>
              </div>
            </div>
            <!-- <table
              v-if="agenda.length != 0"
              class="table table-sm table-striped dytable"
            >
              <tbody>
                <tr v-for="item in agenda" :key="item.id">
                  <td width="20px">
                    <CIcon
                      name="cil-bookmark"
                      size="custom-size"
                      class="mr-3"
                      :height="35"
                    />
                  </td>
                  <td>
                    {{ item.title }} <br />
                    {{ item.content.slice(0, 15) + "...." }}
                  </td>
                </tr>
              </tbody>
            </table> -->
          </div>

          <div class="card-footer py-1 px-0">
            <router-link
              to="/agenda"
              style="width: 25%"
              class="btn btn-sm btn-primary mt-2 mb-0"
            >
              Selengkapnya
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-top rounded shadow p-3">
          <p class="p-0 m-0"><b> Profile </b></p>
          <hr />
          <div class="row">
            <div class="col-md-4">
              <img src="@/assets/logo/pagaralam.png" alt="" srcset="" />
            </div>
            <div class="col">
              <table class="table table-sm table-striped dytable">
                <tbody>
                  <tr>
                    <td>Nama</td>
                    <td>{{ user.full_name }}</td>
                  </tr>
                  <tr>
                    <td>NIP</td>
                    <td>{{ user.nip }}</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>{{ user.role.name }}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{{ user.email }}</td>
                  </tr>
                  <tr>
                    <td>Jabatan</td>
                    <td>{{ user.position }}</td>
                  </tr>

                  <tr>
                    <td>Pangkat / Golongan</td>
                    <td>{{ user.group }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card border-top rounded shadow p-3" style="height: 250px">
          <p class="p-0 m-0"><b> Permintaan Layanan Online Chat </b></p>
          <hr />
          <div class="card-body p-0">
            <center v-if="rooms.length == 0">
              <p>Tidak ada permintaan</p>
            </center>
            <table
              v-if="rooms.length != 0"
              class="table table-sm table-striped dytable"
            >
              <tbody>
                <tr v-for="item in rooms.slice(0, 3)" :key="item.id">
                  <td width="20px">
                    <CIcon
                      name="cil-comment-square"
                      size="custom-size"
                      class="mr-3"
                      :height="25"
                    />
                  </td>
                  <td class="font-weight-bold">
                    {{ item.room_name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="card-footer py-1 px-0">
            <router-link
              to="/komunikasi/online-chat"
              style="width: 25%"
              class="btn btn-sm btn-primary mt-2 mb-0"
            >
              Selengkapnya
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-top rounded shadow p-3" style="height: 250px">
          <p class="p-0 m-0"><b> Pesan </b></p>
          <hr />
          <div class="card-body p-0">
            <center v-if="inbox.length == 0"><p>Tidak ada pesan</p></center>
            <table
              v-if="inbox.length != 0"
              class="table table-sm table-striped dytable"
            >
              <tbody>
                <tr v-for="item in inbox" :key="item.id">
                  <td width="20px">
                    <CIcon
                      name="cil-envelope"
                      size="custom-size"
                      class="mr-3"
                      :height="25"
                    />
                  </td>
                  <td class="font-weight-bold">
                    {{ item.title }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer py-1 px-0">
            <router-link
              to="/komunikasi/pesan"
              style="width: 25%"
              class="btn btn-sm btn-primary mt-2 mb-0"
            >
              Selengkapnya
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md">
        <schedule-table />
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import ScheduleTable from "./components/schedule-table.vue";
export default {
  components: {
    ScheduleTable,
  },
  data() {
    return {
      user: {},
      agenda: [],
      rooms: [],
      inbox: [],
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 3,
      },
    };
  },
  methods: {
    getData() {
      var loading = this.$loading.show();
      axios
        .get("/agenda", { params: this.params })
        .then((resp) => {
          this.agenda = resp.data.data.data;

          loading.hide();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    getRooms() {
      var params = {
        sortby: "id",
        sorttype: "desc",
        row: 3,
        role_id: this.user.role.id,
      };
      this.$store
        .dispatch("room/getRoom", params)
        .then((resp) => {
          this.rooms = resp.data;
        })
        .catch((e) => {
          this.$toast.error(e);
        });
    },
    getInbox() {
      var params = {
        sortby: "id",
        sorttype: "desc",
        row: 3,
      };
      this.$store
        .dispatch("message/getInbox", {
          id: this.user.role_id,
          params: params,
        })
        .then((resp) => {
          this.inbox = resp.data.data;
        })
        .catch((e) => {
          this.$toast.error(e);
        });
    },
  },
  mounted() {
    this.getData();
    this.getRooms();
    this.getInbox();
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
};
</script>

<style scoped>
.border-top {
  border-top: 3px solid #1d4374 !important;
}

.dytable {
  display: block;
  min-width: 100%;
  overflow-x: auto;
}

.scroll {
  overflow-y: auto;
  height: 150px;
}
</style>

<style>
table {
  display: table;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}
</style>