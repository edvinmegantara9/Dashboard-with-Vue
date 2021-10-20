<template>
  <div>
    <div class="row">
      <div class="col-md-8">
        <div class="card shadow p-2">
          <div class="card-header text-uppercase">
            <div class="row justify-content-center">
              <div class="col-md-9 align-self-center mr-auto">
                <b> {{ showRoom.room_name }} </b>
              </div>
              <div class="col-md-3 ml-auto text-right">
                <button class="btn btn-danger btn-sm pull-right">
                  Akhiri Layanan
                </button>
              </div>
            </div>
          </div>
          <div class="card-body scroll">
            <div
              class="row"
              v-for="(item, index) in generateChats"
              :key="index"
            >
              <div class="col-md">
                <div class="row" v-if="item.sender_id != id">
                  <div class="col-md-8 mr-auto">
                    <div class="row mb-3">
                      <div class="col-sm-10 m-0">
                        <div class="card rounded m-0 p-3 bg-secondary">
                          {{ item.chat }}
                        </div>
                      </div>
                      <div class="col-sm-1 p-0 m-0 align-self-center">
                        <small>
                          {{ item.date }}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row" v-if="item.sender_id == id">
                  <div class="col-md-8 ml-auto">
                    <div class="row mb-3">
                      <div class="col-sm-1 p-0 m-0 align-self-center">
                        <small>{{ item.date }}</small>
                      </div>
                      <div class="col-sm-11">
                        <div class="card m-0 rounded p-3 bg-primary text-white">
                          {{ item.chat }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer bg-primary">
            <div class="row">
              <div class="col-md-10">
                <input
                  v-model="formChat.chat"
                  placeholder="Ketik disini..."
                  class="form-control rounded"
                  type="text "
                />
              </div>

              <div class="col-md-2">
                <button
                  class="btn rounded btn-secondary btn-block"
                  @click="sendChat()"
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow p-2">
          <div class="card-header text-uppercase font-weight-bold">
            Daftar Room
          </div>
          <div class="card-body p-1 mt-2 scroll">
            <ul class="list-group" v-if="rooms.length != 0">
              <li
                v-for="(item, index) in rooms"
                :key="index"
                :class="[
                  'list-group-item ',
                  selectedRoom === index ? 'active' : '',
                ]"
                @click="selectRoom(index, item)"
              >
                <CIcon class="mr-1" name="cil-comment-square"></CIcon>
                {{
                  item.room_name.length > 20
                    ? item.room_name.slice(0, 20) + "...."
                    : item.room_name
                }}
              </li>
            </ul>
            <center v-if="rooms.length == 0">Tidak ada room</center>
          </div>
          <div class="card-footer">
            <button
              class="btn btn-block btn-primary"
              @click="createModal = true"
            >
              Buat Room
            </button>
          </div>
        </div>
      </div>
    </div>

    <CModal
      size="lg"
      title=" Buat Chat Room"
      centered
      color="primary"
      :show.sync="createModal"
    >
      <div class="row">
        <div class="col">
          <CInput
            label="Nama Room"
            placeholder="Permintaan Layanan Online Chat ...."
            v-model="form.room_name"
          />
          <v-select
            class="mb-3"
            placeholder="Kirim ke"
            v-model="form.receivers"
            multiple
            :options="getOptions"
          ></v-select>
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="cancel" class="btn btn-secondary mr-3">Batal</button>

          <button @click="submit" class="btn btn-primary">Buat Room</button>
        </div>
      </template>
    </CModal>
  </div>
</template>



<script>
import firebase from "firebase/compat/app";

export default {
  data() {
    return {
      id: 0,
      form: {},
      createModal: false,
      selectedRoom: null,
      formChat: {},
      showRoom: {
        room_name: "NAMA ROOM",
      },
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 100,
      },
      roles: [],
      rooms: [],
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  methods: {
    selectRoom(index, item) {
      if (this.selectedRoom === index) {
        this.selectedRoom = null;
      } else {
        this.selectedRoom = index;
      }
      this.showRoom = item;
    },
    submit() {
      this.form.created_by = this.user.role.id;
      // this.form.sender_name = this.user.full_name;
      // this.form.role_name = this.user.role.name;

      var data = {
        ...this.form,
        receivers: this.form.receivers.map((item) => {
          return item.value;
        }),
      };
      var loading = this.$loading.show();
      this.$store
        .dispatch("room/addRoom", data)
        .then(() => {
          this.$toast.success("Berhasil membuat room !!");
          this.createModal = false;
          loading.hide();
          this.form = {};
        })
        .catch((e) => {
          this.$toast.error("gagal membuat room | " + e);
          loading.hide();
        });
    },
    cancel() {
      this.createModal = false;
      this.form = {};
    },
    getRoles() {
      this.$store
        .dispatch("role/getRole", this.params)
        .then((resp) => {
          this.roles = resp.data.data;
        })
        .catch((e) => {
          this.$toast.error("Terjadi kesalahan | " + e);
        });
    },
    sendChat() {
      // let room = firebase.database().ref(this.showRoom.room_id);
      let room = firebase.database().ref("roomsilaper kedua");

      this.formChat.sender_name = this.user.full_name;
      this.formChat.sender_id = this.user.role.id;
      this.formChat.is_file = 0;
      this.formChat.role_name = this.user.role.name;
      this.formChat.datetime = new Date().getTime();
      // this.formChat.datetime = this.$moment(new Date()).format(
      //   "MMMM Do YYYY, h:mm"
      // );

      room.push(this.formChat);
      room.on("value", (snapshot) => {
        console.log(snapshot.val());
      });
    },
    getRooms() {
      var params = {
        role_id: this.user.role.id,
        sorttype: "desc",
        sortby: "id",
      };
      this.$store
        .dispatch("room/getRoom", params)
        .then((resp) => {
          this.rooms = resp.data;
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil room | " + e);
        });
    },
  },
  mounted() {
    this.getRoles();
    this.getRooms();
  },

  computed: {
    generateChats() {
      return [0, 1, 1, 0, 0, 1].map((item) => {
        return {
          chat:
            "inisldlaskdlaskldkasldklaskddariLoremipsumdolorsitametconsecteturi" +
            item,
          sender_id: item,
          date: "12:45",
        };
      });
    },
    getOptions() {
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
.scroll {
  height: 350px;
  overflow-y: auto;
}
.rounded {
  border-radius: 25px !important;
}
ul {
  list-style-type: none;
}
.chat {
  width: 150px;
}
.list-group-item {
  cursor: pointer;
}
.list-group-item:hover {
  background-color: #5997e869;
  color: white;
}
</style>