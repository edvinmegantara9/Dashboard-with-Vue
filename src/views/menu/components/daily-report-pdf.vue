<style>
#pdf-content {
  width: 580pt;
  margin: 28pt 32pt 28pt 32pt;
  word-spacing: 1pt;
  word-break: page-break;
}
#content-table {
  font-size: 8pt;
  border-top: 1pt solid black;
  border-left: 1pt solid black;
  border-collapse: collapse;
}
#content-table th,
#content-table td {
  border-right: 1pt solid black;
  border-bottom: 1pt solid black;
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
        <router-link to="/laporan-harian">
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
            <td><img src="@/assets/logo/pagaralam.png" height="50pt" /></td>
            <td style="text-align: center; font-size: 11pt">
              <b>LAPORAN KINERJA HARIAN ASN BAPPEDA<br />KOTA PAGAR ALAM</b>
            </td>
          </tr>
        </table>
      </header>
      <section>
        <br />
        <table id="content-table" style="width: 100%">
          <thead style="text-align: center">
            <th style="width: 60px">Tanggal</th>
            <th>Jam</th>
            <th>Nama</th>
            <th>NIP</th>
            <th>Golongan</th>
            <th>Jabatan</th>
            <th>Laporan</th>
          </thead>
          <tbody v-for="item in data" :key="item.id" class="p-1">
            <tr>
              <td>{{ item.date }}</td>
              <td>{{ item.updated_at }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.nip }}</td>
              <td>{{ item.user.group }}</td>
              <td>{{ item.position }}</td>
              <td>{{ item.report }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <br />
      <br />
      <footer>
        <table id="footer" style="width: 100%">
          <tr>
            <td style="width: 50%; text-align: center">
              Mengetahui<br />
              KEPALA BAPPEDA KOTA PAGAR ALAM<br />
              <br />
              <br />
              <br />
              <br />
              <b>NOVI APRIYADI, SE,MM</b><br />
              Pembina TK. I<br />
              NIP. 197711052003121004
            </td>
            <td style="width: 50%; text-align: center">
              Pagar Alam, ................................ 2021<br />
              KEPALA SUB BAGIAN UMUM DAN KEPEGAWAIAN<br />
              <br />
              <br />
              <br />
              <br />
              <b>WARDALENA, SE</b><br />
              PENATA TK. I<br />
              NIP. 197611042007012013
            </td>
          </tr>
        </table>
      </footer>
    </div>
  </section>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  data() {
    return {
      id: null,
      data: null,
    };
  },
  methods: {
    exportPDF(id) {
      var loading = this.$loading.show();
      window.html2canvas = html2canvas;
      var doc = new jsPDF("l", "pt", "a4");
      doc
        .html(document.getElementById("pdf-content"), {
          callback: function (pdf) {
            pdf.save(
              "Laporan_Harian_" + id.firstdate + "-" + id.lastdate + ".pdf"
            );
            loading.hide();
          },
        })
        .then(() => this.$router.push("laporan-harian"));
    },
  },
  created() {
    this.id = this.$route.query;
  },
  mounted() {
    var loading = this.$loading.show();
    this.$store
      .dispatch("report/ReportByDate", this.id)
      .then((resp) => {
        loading.hide();
        this.data = resp.data.data;
        this.data.forEach((element) => {
          element.updated_at = element.updated_at.slice(11, 16);
        });
      })
      .catch((e) => {
        loading.hide();
        this.$toast.error(e);
      });
  },
};
</script>