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
.table {
  white-space: normal !important;
}
</style>
<template>
  <section>
    <div class="row mb-5">
      <div class="col-md-6">
        <router-link to="/user-register">
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
              <b>Daftar User Register</b>
            </td>
          </tr>
        </table>
      </header>
      <section class="table-responsive">
        <br />
        <table id="content-table" style="width: 100%">
          <thead style="text-align: center">
            <th>No.</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Phone Number</th>
          </thead>
          <tbody v-for="(item, index) in computedData" :key="item.id" class="p-1">
            <tr>
              <td style="width:40px">{{ index +1 }}</td>
              <td>{{ item.full_name }} </td>
              <td>{{ item.email }} </td>
              <td>{{ item.phone_number }} </td>
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
        filename: "Laporan_daftar_user_register.pdf",
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
        .then(() => this.$router.push("user-register"));
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
    this.$store.dispatch("user_register/ReportByDate", this.id).then((resp) => {
      loading.hide();
      this.data = resp.data.data;
    }).catch(e => {
      this.$toast.error(e);
      loading.hide();
    });
  },
};
</script>