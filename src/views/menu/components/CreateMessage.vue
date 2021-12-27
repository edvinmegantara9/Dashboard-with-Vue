<template>
  <div>
    <div class="card mt-2 p-3">
      <CInput v-model="form.title" placeholder="Judul Pesan" />
      <input type="checkbox" id="vehicle1" name="vehicle1" v-model="checked" @change="check(checked)"> Pilih semua penerima
      <br /><br />
      <v-select
        class="mb-3"
        v-model="form.receivers"
        placeholder="Kirim ke"
        multiple
        :options="computedRole"
      ></v-select>
      <textarea
        name=""
        v-model="form.content"
        placeholder="Isi Pesan"
        class="form-control"
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <br />
      Lampiran (Maks 3)
      <div class="card mt-2 dashed" style="height: 150px">
        <div class="row">
          <div
            class="col-md-3"
            v-for="(item, index) in form.attachments"
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
                  @click="deleteItem(index)"
                  class="btn btn-sm btn-danger btn-block"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-3" v-if="form.attachments.length < 3">
            <div
              @click="upload"
              class="card m-1 justify-content-center text-center"
              style="height: 140px"
            >
              <img
                class="align-self-center mb-2 mt-2"
                src="@/assets/upload.png"
                width="40%"
                alt=""
              />

              <p>Klik untuk upload</p>
            </div>
          </div>
        </div>
      </div>
      <button @click="submit" class="btn btn-primary">KIRIM PESAN</button>
    </div>
    <input @change="selectFile" type="file" name="" hidden ref="upload" id="" />
  </div>
</template>


<script>
import { uploadFile } from "@/utils/fileUpload";
export default {
  props: [],
  data() {
    return {
      checked: false,
      form: {
        attachments: [],
        receivers: []
      },
      user: {},

      receivers: [],
    };
  },
  methods: {
    check(checked) {
      if (checked) {
        this.receivers.forEach(element => {
          const isAvailable = this.form.receivers.find(item => {
            return item.value == element.id
          })

          if (!isAvailable) {
            this.form.receivers.push({
              value: element.id,
              label: element.name
            })
          }
        });
      } else {
        this.form.receivers = [];
      }
      console.log(checked, "event", this.form.receivers, this.receivers);
    },
    upload() {
      this.$refs.upload.click();
    },
    deleteItem(index) {
      if (index > -1) {
        this.form.attachments.splice(index, 1);
      }
    },
    selectFile(event) {
      var file = event.target.files[0];
      var loading = this.$loading.show();
      uploadFile(file)
        .then((resp) => {
          this.form.attachments.push(resp);
          loading.hide();
          alert("File berhasil diupload !!");
        })
        .catch((e) => {
          loading.hide();
          alert("Terjadi kesalahan !! | " + e);
        });
    },
    getReceiver() {
      var params = {
        row: 100,
        sortby: "id",
        sorttype: "desc",
      };
      this.$store
        .dispatch("message/getReceiver", {
          id: this.user.role.id,
          params: params,
        })
        .then((resp) => {
          this.receivers = resp.data;
          console.log("receiver", this.receivers);
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data!! | " + e);
        });
    },
    submit() {
      var data = JSON.parse(JSON.stringify(this.form));
      data.receivers = this.form.receivers.map((e) => {
        return e.value;
      });

      data.sender_id = this.user.id;
      data.created_by = this.user.role_id;
      var loading = this.$loading.show();

      this.$store
        .dispatch("message/sendMessage", data)
        .then(() => {
          this.form = {
            attachments: [],
            receivers: []
          };
          loading.hide();
          this.$toast.success("Berhasil mengirim pesan");
          this.checked = false;
        })
        .catch((e) => {
          loading.hide();
          this.$toast.error("Terjadi kesalahan | " + e);
        });
    },
  },

  computed: {
    computedRole() {
      return this.receivers.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    },
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getReceiver();
  },
};
</script>

<style >
.dashed {
  border-style: dashed !important;
}
</style>