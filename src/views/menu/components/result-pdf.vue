<style>
#pdf-content {
  width: calc(29.7cm - 2cm * 2);
  color: #000 !important;
}
#content-table {
  font-size: 8pt;
  border-collapse: collapse;
}
#content-table th,
#content-table td {
  border: 1px solid black;
  padding-left: 3pt;
  padding-right: 3pt;
}
#footer {
  font-size: 8pt;
}
table {
  white-space: normal !important;
}
</style>
<template>
  <section>
    <div class="row mb-5">
      <div class="col-md-6">
        <router-link to="/product">
          <CButton class="mr-2" color="warning" square size="md">
            Kembali
          </CButton>
        </router-link>
        <CButton
          @click="exportPDF(id)"
          class="mr-2"
          color="danger"
          square
          size="md"
        >
          Export PDF
        </CButton>
      </div>
    </div>
    <div id="pdf-content">
      <header>
        <table id="header" style="width: 100%">
          <tr>
            <td style="text-align: center; font-size: 11pt">
              <b>Daftar Hasil Test</b>
            </td>
          </tr>
        </table>
      </header>
      <section class="table-responsive">
        <br />
        <table id="content-table" style="width: 100%">
          <thead style="text-align: center">
            <th>No.</th>
            <th>Category</th>
            <th>User</th>
            <th>Product</th>
            <th>No. Payment</th>
            <th>Nama</th>
            <th>NIK</th>
            <th>Pekerjaan</th>
            <th>Alamat</th>
            <th>SIM</th>
            <th>Keperluan</th>
            <th>Point</th>
            <th>Status</th>
            <th>Expired</th>
          </thead>
          <tbody v-for="(item, index) in computedData" :key="item.id" class="p-1">
            <tr>
              <td style="width:40px">{{ index +1 }}</td>
              <td>{{ item.category }} </td>
              <td>{{ item.full_name }} </td>
              <td>{{ item.name }} </td>
              <td>{{ item.no_transaction }} </td>
              <td>{{ item.nama }} </td>
              <td>{{ item.nik }} </td>
              <td>{{ item.work }} </td>
              <td>{{ item.address }} </td>
              <td>{{ item.sim_type}} </td>
              <td>{{ item.needs}} </td>
              <td>{{ item.total_point}} </td>
              <td>{{ item.status}} </td>
              <td>{{ item.expired_at}} </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </section>
</template>

<script src=""></script>

<script>
import html2pdf from "html2pdf.js";

export default {
  data() {
    return {
      id: null,
      data: [],
      counter: 0,
    };
  },
  methods: {
    exportPDF(id) {
      var opt = {
        margin: 2,
        filename: "Laporan_result.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "cm", format: "a4", orientation: "l" },
        pagebreak: { avoid: "tr" },
      };
      var element = document.getElementById("pdf-content");
      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => this.$router.push("result"));
    },
  },
  computed: {
    computedData() {
      return this.data.map((item) => {
        return {
          ...item,
        }
      });
    }
  },
  created() {
    this.id = this.$route.query;
  },
  mounted() {
    console.log(this.id)
    var loading = this.$loading.show();
    this.$store.dispatch("result/ReportByDate", this.id).then((resp) => {
      loading.hide();
      this.data = resp.data.data;
    }).catch(e => {
      this.$toast.error(e);
      loading.hide();
    });
  },
};
</script>