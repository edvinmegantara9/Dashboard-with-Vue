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
            <div v-if="chats.length != 0">
              <div
                class="row"
                v-for="(item, index) in generateChats"
                :key="index"
              >
                <div class="col-md">
                  <div class="row" v-if="item.sender_id != user.role.id">
                    <div class="col-md-8 mr-auto">
                      <div class="row mb-3 ml-3 align-items-center">
                        <div
                          class="
                            card
                            rounded
                            m-0
                            mr-3
                            px-3
                            py-2
                            buble
                            bg-secondary
                          "
                        >
                          <b>
                            {{ item.chat }}
                          </b>
                          <hr class="m-0 mt-2 mb-1" />
                          <small
                            >{{ item.sender_name }} |
                            {{ item.role_name }}</small
                          >
                        </div>

                        <small>
                          {{ item.date }}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="item.sender_id == user.role.id">
                    <div class="col-md-8 ml-auto">
                      <div
                        class="
                          row
                          mb-3
                          justify-content-end
                          mr-3
                          align-items-center
                        "
                      >
                        <small>{{ item.date }}</small>

                        <div
                          class="
                            card
                            m-0
                            ml-3
                            rounded
                            px-3
                            py-2
                            bg-primary
                            text-white
                            buble
                          "
                        >
                          <b>
                            {{ item.chat }}
                          </b>
                          <hr
                            class="m-0 mt-2 mb-1"
                            style="border-color: white"
                          />
                          <small
                            >{{ item.sender_name }} |
                            {{ item.role_name }}</small
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="chats.length == 0">
              <center>Belum ada chat</center>
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
                  @keydown.enter="sendChat()"
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
      chats: [],
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
      this.getChat();
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
          this.getRooms();
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
    getChat() {
      let room = firebase.database().ref(this.showRoom.room_id);
      console.log(room);
      room.on("value", (snapshot) => {
        // console.log(snapshot);
        if (snapshot.val()) {
          this.chats = [];

          for (let [key, value] of Object.entries(snapshot.val())) {
            this.chats.push(value);
          }
        } else {
          this.chats = [];
        }

        console.log("chat", this.chats);
      });
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
      let room = firebase.database().ref(this.showRoom.room_id);
      // let room = firebase.database().ref("roomsilaper kedua");

      this.formChat.sender_name = this.user.full_name;
      this.formChat.sender_id = this.user.role.id;
      this.formChat.is_file = 0;
      this.formChat.role_name = this.user.role.name;
      this.formChat.datetime = new Date().getTime();
      // this.formChat.datetime = this.$moment(new Date()).format(
      //   "MMMM Do YYYY, h:mm"
      // );

      room.push(this.formChat);
      this.formChat = {};
      this.getChat();
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
      return this.chats.map((item) => {
        return {
          chat: item.chat,
          sender_id: item.sender_id,
          sender_name: item.sender_name,
          role_name: item.role_name,
          date: this.$moment(item.datetime).format(" h:mm"),
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
  min-height: 350px;
  height: 350px;
  overflow-y: auto;
  background-color: ghostwhite;
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
.buble {
  width: auto !important;
  display: inline-block;
}
@media screen and (min-width: 1920px) {
  .scroll {
    min-height: 350px;
    height: 650px;
    overflow-y: auto;
  }
}
</style>