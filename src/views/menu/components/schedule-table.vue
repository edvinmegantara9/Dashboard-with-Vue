<template>
  <div>
    <div class="card shadow border-top p-2">
      <p class="p-1 m-0"><b> Jadwal Perencanaan | APBD Induk </b></p>
      <br />
      <div class="card-body p-0">
        <table class="table table-striped table-responsive">
          <thead>
            <tr>
              <th>Jadwal</th>
              <th>Perencanaan</th>
              <th>Jenis Anggaran</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in getInduk" :key="index">
              <td>{{ item.schedule }}</td>
              <td>{{ item.plan }}</td>
              <td>APBD Induk</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer"></div>
    </div>
    <br />
    <div class="card shadow border-top p-2">
      <p class="p-1 m-0"><b> Jadwal Perencanaan | APBD Perubahan </b></p>
      <br />
      <div class="card-body p-0">
        <table class="table table-striped table-responsive">
          <thead>
            <tr>
              <th>Jadwal</th>
              <th>Perencanaan</th>
              <th>Jenis Anggaran</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in getPerubahan" :key="index">
              <td>{{ item.schedule }}</td>
              <td>{{ item.plan }}</td>
              <td>APBD Perubahan</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 100,
        type: [0, 1],
      },
    };
  },

  methods: {
    getData() {
      var loading = this.$loading.show();
      this.$store
        .dispatch("schedule/getSchedule", this.params)
        .then((resp) => {
          this.data = resp.data.data;

          loading.hide();
        })
        .catch((e) => {
          this.$toast.error("gagal mengambil data  \n", e);
          loading.hide();
        });
    },
  },

  computed: {
    getInduk() {
      return this.data.filter((item) => item.type == 0);
    },
    getPerubahan() {
      return this.data.filter((item) => item.type == 1);
    },
  },

  mounted() {
    this.getData();
  },
};
</script>


<style scoped>
.border-top {
  border-top: 3px solid #1d4374 !important;
}
</style>