<template>
  <div>

    <div class="row">
      <!-- <div class="col-md-6">
        <div class="card border-top rounded shadow p-3">
          <p class="p-0 m-0"><b> Persentase Paket Pekerjaan (%)</b></p>
          <hr />
          <MainChartExample />
        </div>
      </div> -->
      <div class="col-md-12">
      <div class="card border-top rounded shadow p-3">
          <p class="p-0 m-0"><b> Jumlah Paket Pekerjaan </b></p>
          <hr />
          <CChartBarExample />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="card border-top rounded shadow p-3">
          <p class="p-0 m-0"><b> Persentase Sumber Dana (%)</b></p>
          <hr />
          <SumberDanaChart />
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-top rounded shadow p-3">
          <p class="p-0 m-0"><b> Jumlah Quarry, Lab, Sewa Alat, Batas Wilayah  </b></p>
          <hr />
          <OtherChart />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="card border-top rounded shadow p-3" style="height: 325px">
          <p class="p-0 m-0"><b> Agenda Pembangunan </b></p>
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
              style="width: 30%"
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
              <img width="150px" src="@/assets/logo/pagaralam.png" alt="" srcset="" />
            </div>
            <div class="col">
              <table class="table table-sm table-striped table-responsive">
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
          <button
            class="btn btn-sm btn-primary"
            @click="editUser"
            style="width: 100px"
          >
            Edit Profile
          </button>
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
              style="width: 30%"
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
            <div class="table-responsive">
              <table
                v-if="inbox.length != 0"
                class="table table-sm table-striped dytable"
              >
                <tbody>
                  <tr v-for="item in inbox" :key="item.id">
                    <td style="vertical-align: center" width="20px">
                      <CIcon
                        name="cil-envelope-closed"
                        size="custom-size"
                        class="mr-3 pb-1"
                        :height="25"
                      />
                    </td>
                    <td class="font-weight-bold">
                      {{ item.message.title }}
                      <small> - dari : {{ item.message.sender.name }}</small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer py-1 px-0">
            <router-link
              to="/komunikasi/pesan"
              style="width: 30%"
              class="btn btn-sm btn-primary mt-2 mb-0"
            >
              Selengkapnya
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-md">
        <schedule-table />
      </div>
    </div> -->
    <CModal
      size="lg"
      title="Edit User"
      centered
      color="primary"
      :show.sync="updateModal"
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
            :readonly="true"
            label="NIP"
            type="number"
            placeholder="12345678"
          />
          <CInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="test@email.com"
          />
          <CInput
            v-model="form.password"
            label="Password"
            type="text"
            placeholder="*******"
          />
          <small class="text-danger"
            >Kosongkan password jika tidak ingin mengubah</small
          >
        </div>
        <div class="col">
          <CInput
            v-model="form.position"
            label="Jabatan"
            placeholder="ketik disini"
          />
          <CInput
            v-model="form.group"
            label="Golongan"
            placeholder="ketik disini"
          />
          <CSelect
            :value.sync="form.role_id"
            label="Role"
            disabled
            placeholder="Pilih Role"
            :options="computedRole"
          />
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="updateModal = false" class="btn btn-secondary mr-3">
            Batal
          </button>

          <button @click="update" class="btn btn-primary">Update User</button>
        </div>
      </template>
    </CModal>
  </div>
</template>



<script>
import axios from "axios";
import ScheduleTable from "./components/schedule-table.vue";
import MainChartExample from "../charts/CChartDoughnutExample.vue";
import CChartBarExample from "../charts/CChartBarExample.vue";
import SumberDanaChart from "../charts/SumberDanaChart.vue";
import OtherChart from "../charts/OtherChart.vue";
export default {
  components: {
    ScheduleTable,
    MainChartExample,
    CChartBarExample,
    SumberDanaChart,
    OtherChart
  },
  data() {
    return {
      user: {},
      updateModal: false,
      form: {},
      agenda: [],
      roles: [],
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
    editUser() {
      this.form = this.user;
      this.updateModal = true;
    },
    update() {
      var loading = this.$loading.show();
      if (this.form.password == null) {
        this.$store
          .dispatch("user/updateUser", { id: this.form.id, data: this.form })
          .then(() => {
            this.$toast.success("Berhasil merubah data user");
            loading.hide();
            this.updateModal = false;
            this.form = {};
            this.getMe();
          })
          .catch((e) => {
            this.$toast.error(e);
            this.updateModal = false;
            loading.hide();
          });
      } else {
        this.$store
          .dispatch("user/changePassword", {
            id: this.form.id,
            password: this.form.password,
          })
          .then(() => {
            this.$store
              .dispatch("user/updateUser", {
                id: this.form.id,
                data: this.form,
              })
              .then(() => {
                this.$toast.success("Berhasil merubah data user");
                loading.hide();
                this.updateModal = false;
                this.form = {};
                this.getMe();
              })
              .catch((e) => {
                this.$toast.error(e);
                this.updateModal = false;
                loading.hide();
              });
          })
          .catch((e) => {
            this.$toast.error(e);
            this.updateModal = false;
            loading.hide();
          });
      }
    },
    getMe() {
      this.$store
        .dispatch("auth/me")
        .then((resp) => {
          this.user = resp.data;
          this.getInbox();
          this.getRooms();
        })
        .catch((e) => {
          this.$toast.error(e);
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
          console.log("room", this.rooms);
        })
        .catch((e) => {
          this.$toast.error(e);
        });
    },
    getInbox() {
      var _params = {
        sortby: "id",
        sorttype: "desc",
        row: 3,
      };
      this.$store
        .dispatch("message/getInbox", {
          id: this.user.role.id,
          params: _params,
        })
        .then((resp) => {
          this.inbox = resp.data.data;
        })
        .catch((e) => {
          this.$toast.error(e);
        });
    },
    getRole() {
      let _params = {
        sorttype: "asc",
        sortby: "id",
        row: 100,
      };
      this.$store
        .dispatch("role/getRole", _params)
        .then((resp) => {
          this.roles = resp.data.data;
          console.log(this.roles);
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data role \n", e);
        });
    },
  },
  mounted() {
    this.getMe();
    this.getData();
    this.getRole();
    
  },

  computed: {
    computedRole() {
      return this.roles.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    },
  },
};
</script>

<style scoped>
.border-top {
  border-top: 3px solid #1d4374 !important;
}

/* .dytable {
  display: block;
  min-width: 100%;
  overflow-x: auto;
} */

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