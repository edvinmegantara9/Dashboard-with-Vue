<style>
#pdf-content {
  width: calc(29.7cm - 2cm * 2);
  /* margin: 28pt 32pt 28pt 32pt;
        word-spacing: 1pt;
        word-break: page-break; */
  color: #000 !important;
}
#content-table {
  font-size: 8pt;
  /* border-top: 1pt solid black;
  border-left: 1pt solid black; */
  border-collapse: collapse;
}
#content-table th,
#content-table td {
  /* border-right: 1px solid black;
  border-bottom: 1px solid black; */
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
              <b>DAFTAR SKA</b>
            </td>
          </tr>
        </table>
      </header>
      <section class="table-responsive">
        <br />
        <table id="content-table" style="width: 100%">
          <thead style="text-align: center">
            <th>Nama</th>
            <th>Alamat</th>
            <th>ID Sub Bagian</th>
            <th>Deskripsi</th>
            <th>ID Kualifikasi Profesi</th>
            <th>Asosiasi</th>
            <th>Tgl Cetak Sertifikat</th>
            <th>Provinsi Domisili</th>
            <th>Kabupaten</th>
            <th>Kecamatan</th>
          </thead>
          <tbody v-for="item in computedData" :key="item.id" class="p-1">
            <tr>
              <td>{{ item.nama }} </td>
              <td>{{ item.alamat }} </td>
              <td>{{ item.id_sub_bagian }} </td>
              <td>{{ item.deskripsi }} </td>
              <td>{{ item.id_kualifikasi_profesi }} </td>
              <td>{{ item.asosiasi }} </td>
              <td>{{ item.tgl_cetak_sertifikat }} </td>
              <td>{{ item.provinsi_domisili }} </td>
              <td>{{ item.kabupaten }} </td>
              <td>{{ item.kecamatan }} </td>
            </tr>
          </tbody>
        </table>
      </section>
      <br />
      <br />
      <!-- <footer>
        <table id="footer" style="width: 100%">
          <tr>
            <td style="width: 50%; text-align: center">
              Mengetahui<br />
              KEPALA BAPPEDA KOTA PAGAR ALAM<br />
              <br />
              <br />
              <br />
              <br />
              <b>{{ signer.bappeda != null ? signer.bappeda.full_name : '' }}</b><br />
              Pembina TK. I<br />
              NIP. {{signer.bappeda != null ? signer.bappeda.nip : '' }}
            </td>
            <td style="width: 50%; text-align: center">
              Pagar Alam, {{ $moment().format("Do MMMM YYYY") }}<br />
              KEPALA SUB BAGIAN UMUM DAN KEPEGAWAIAN<br />
              <br />
              <br />
              <br />
              <br />
              <b>{{ signer.kepegawaian != null ? signer.kepegawaian.full_name : '' }}</b><br />
              PENATA TK. I<br />
              NIP. {{ signer.kepegawaian != null ? signer.kepegawaian.nip : '' }}
            </td>
          </tr>
        </table>
      </footer> -->
    </div>
  </section>
</template>

<script src=""></script>

<script>
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf"
import html2pdf from "html2pdf.js";
import VueMoment from "vue-moment";

export default {
  data() {
    return {
      id: null,
      data: [],
      counter: 0,
      signer: {
        bappeda: null,
        kepegawaian: null
      }
    };
  },
  methods: {
    exportPDF(id) {
      var opt = {
        margin: 2,
        filename: "Laporan_Skt.pdf",
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
        .then(() => this.$router.push("ska"));
    },
    // getSigner() {
    //   var param = {
    //     sorttype: "asc",
    //     sortby: "id",
    //     row: 1,
    //     page: 1,
    //     keyword: "Kepala Bappeda",
    //   }
    //   this.$store.dispatch("user/getUser", param)
    //     .then((resp) => {
    //       this.signer.bappeda = (resp.data.data[0] != null) ? resp.data.data[0] : null
    //     }).catch(e => {
    //       this.$toast.error('Tidak dapat mengambil data Kepala Bappeda');
    //     });
    //   param.keyword = "KEPALA SUB BAGIAN KEPEGAWAIAN"
    //   this.$store.dispatch("user/getUser", param)
    //     .then((resp) => {
    //       this.signer.kepegawaian = (resp.data.data[0] != null) ? resp.data.data[0] : null
    //     }).catch(e => {
    //       this.$toast.error('Tidak dapat mengambil data Kepala Sub Bagian Umum dan Kepegawaian');
    //     });
    // }
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
    this.$store.dispatch("ska/ReportByDate", this.id).then((resp) => {
      loading.hide();
      this.data = resp.data.data;
    }).catch(e => {
      this.$toast.error(e);
      loading.hide();
    });
    // this.getSigner();
  },
};
</script>