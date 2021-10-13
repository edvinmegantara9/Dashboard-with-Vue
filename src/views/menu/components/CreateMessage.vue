<template>
  <div>
    <div class="card mt-2 p-3">
      <CInput v-model="form.title" placeholder="Judul Pesan" />
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
      form: {
        attachments: [],
      },
      user: {},
      roles: [],
    };
  },
  methods: {
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
          this.$toast.error("gagal mengambil data roles \n", e);
        });
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
          };
          loading.hide();
          this.$toast.success("Berhasil mengirim pesan");
        })
        .catch((e) => {
          loading.hide();
          this.$toast.error("Terjadi kesalahan | " + e);
        });
    },
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

  mounted() {
    this.getRole();
    this.user = JSON.parse(localStorage.getItem("user"));
  },
};
</script>

<style >
.dashed {
  border-style: dashed !important;
}
</style>