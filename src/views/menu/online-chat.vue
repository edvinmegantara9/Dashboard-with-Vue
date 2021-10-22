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
                <button
                  v-if="selectedRoom != null"
                  class="btn btn-danger btn-sm pull-right"
                  @click="endModal = true"
                >
                  Akhiri Layanan
                </button>
              </div>
            </div>
          </div>
          <div
            class="card-body scroll"
            v-chat-scroll="{ always: true, smooth: true }"
          >
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
              <div class="col-md-9">
                <input
                  v-model="formChat.chat"
                  placeholder="Ketik disini..."
                  class="form-control rounded"
                  type="text "
                  @keydown.enter="sendChat()"
                />
              </div>
              <div class="col-md-1 p-0">
                <button class="btn mr-2 btn-secondary rounded btn-block">
                  <CIcon
                    size="md"
                    style="color: black"
                    class="p-0 m-0"
                    name="cil-file"
                  ></CIcon>
                </button>
              </div>

              <div class="col-md-2">
                <button
                  class="btn rounded btn-secondary btn-block font-weight-bold"
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
                v-for="(item, index) in generateRooms.filter((n) => n)"
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
    <CModal
      size="md"
      title="Penilaian layanan online chat"
      centered
      color="primary"
      :show.sync="endModal"
    >
      <div class="row">
        <div class="col-md-10 mx-auto text-center">
          <p>
            Terima kasih telah menghubungi kami <br />
            jika masih adakeluhan yang belum terselesaikan jangan ragu untuk
            menghubungi kami kembali.
          </p>
          <hr />
        </div>
      </div>
      <div class="row">
        <div class="col-md-10 mx-auto text-center">
          <b>Beri Rating</b> <br />
          <select v-model="rating" class="form-control mt-2" name="" id="">
            <option value="0" selected disabled>Pilih</option>
            <option value="1">Tidak Baik</option>
            <option value="2">Kurang Baik</option>
            <option value="3">Cukup Baik</option>
            <option value="4">Baik</option>
            <option value="5">Sangat Baik</option>
          </select>
        </div>
      </div>
      <template slot="footer">
        <div>
          <button @click="endModal = false" class="btn btn-secondary mr-3">
            Batal
          </button>

          <button @click="endChat" class="btn btn-primary">
            Berikan review
          </button>
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
      endModal: false,
      selectedRoom: null,
      formChat: {},
      showRoom: {
        room_name: "NAMA ROOM",
      },
      rating: 0,
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
    endChat() {
      var loading = this.$loading.show();
      this.endModal = false;

      this.$store
        .dispatch("room/endRoom", {
          id: this.showRoom.id,
          data: { rating: this.rating },
        })
        .then(() => {
          loading.hide();
          this.chats = [];
          this.selectedRoom = null;
          this.getRooms();
          this.$toast.success("Berhasil memberi penilaian");
        })
        .catch((e) => {
          loading.hide();
          this.$toast.error("Gagar memberi penilaian | " + e);
        });
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
    generateRooms() {
      return this.rooms.map((e) => {
        if (e.end_chat == null) {
          return {
            ...e,
          };
        }
      });
    },
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