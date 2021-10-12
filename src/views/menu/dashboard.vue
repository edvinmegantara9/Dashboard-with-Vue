<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="card border-top rounded shadow p-3">
          <p class="p-0 m-0"><b> Agenda Bappeda </b></p>
          <hr />
          <table class="table table-sm table-striped">
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
          </table>

          <router-link
            to="/agenda"
            style="width: 25%"
            class="btn btn-sm btn-primary"
          >
            Selengkapnya
          </router-link>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-top rounded shadow p-3">
          <p class="p-0 m-0"><b> Profile Perangkat Daerah </b></p>
          <hr />
          <div class="row">
            <div class="col-md-4">
              <img src="@/assets/logo/pagaralam.png" alt="" srcset="" />
            </div>
            <div class="col">
              <table class="table table-sm table-striped">
                <tbody>
                  <tr>
                    <td>Provinsi</td>
                    <td>Sumatra Selatan</td>
                  </tr>
                  <tr>
                    <td>Kota</td>
                    <td>Pagar Alam</td>
                  </tr>
                  <tr>
                    <td>Jabatan</td>
                    <td>{{ user.position }}</td>
                  </tr>
                  <tr>
                    <td>Nama</td>
                    <td>{{ user.full_name }}</td>
                  </tr>
                  <tr>
                    <td>NIP</td>
                    <td>{{ user.nip }}</td>
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
        <div class="card border-top rounded shadow">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            deleniti dicta ex impedit odit iusto quidem corrupti at minima
            quaerat? Consequuntur architecto molestiae pariatur repellendus odit
            at facere quasi mollitia.
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-top rounded shadow">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            deleniti dicta ex impedit odit iusto quidem corrupti at minima
            quaerat? Consequuntur architecto molestiae pariatur repellendus odit
            at facere quasi mollitia.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {},
      agenda: [],
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
  },
  mounted() {
    this.getData();
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
</style>