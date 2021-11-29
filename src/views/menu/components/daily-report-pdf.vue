<style>
    #content-table table, #content-table th, #content-table td {
        border: 1px solid black;
        border-collapse: collapse;
    }
</style>
<template>
    <section>
        <div class="row mb-5">
            <div class="col-md-6">
            <router-link to="/laporan-harian">
                <CButton
                class="mr-2"
                color="warning"
                square
                size="md"
            >
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
                <table style="width: 100%">
                    <tr>
                        <td><img src="@/assets/logo/pagaralam.png" height="75px"></td>
                        <td style="text-align: center"><h4><b>LAPORAN KINERJA HARIAN ASN BAPPEDA KOTA PAGAR ALAM</b></h4></td>
                    </tr>
                </table>
            </header>
            <section>
                <br>
                <table id="content-table">
                    <thead style="text-align: center;">
                        <th>Tanggal</th>
                        <th>Jam</th>
                        <th>Nama</th>
                        <th>NIP</th>
                        <th>Golongan</th>
                        <th>Jabatan</th>
                        <th>Laporan</th>
                    </thead>
                    <tbody v-for="item in data" :key="item.id" class="p-1">
                        <tr>
                            <td>{{item.date}}</td>
                            <td>{{item.updated_at}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.nip}}</td>
                            <td>{{item.position}}</td>
                            <td>{{item.role}}</td>
                            <td>{{item.report}}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <br/>
            <br/>
            <footer>
                <table>
                    <tr>
                        <td style="width: 30%; text-align: center">
                            Mengetahui<br/>
                            KEPALA BAPPEDA KOTA PAGAR ALAM<br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <b>NOVI APRIYADI, SE,MM</b><br/>
                            Pembina TK. I<br/>
                            NIP. 197711052003121004
                        </td>
                        <td style="width: 30%"></td>
                        <td style="width: 30%; text-align: center">
                            Pagar Alam, ................................ 2021<br/>
                            KEPALA SUB BAGIAN UMUM DAN KEPEGAWAIAN<br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <b>WARDALENA, SE</b><br/>
                            PENATA TK. I<br/>
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
import jsPDF from "jspdf"

export default {
    data() {
        return {
            id : null,
            data: null
        }
    },
    methods: {
        exportPDF(id){
            var loading = this.$loading.show();
            window.html2canvas = html2canvas;
            var doc =new jsPDF("p", "pt", "a4");
            doc.html(document.querySelector("#pdf-content"), {
                callback: function(pdf) {
                    pdf.save("Laporan_Harian_" +
                        id.firstdate +
                        "-" +
                        id.lastdate + ".pdf")
                    loading.hide();
                }
            }).then(() => this.$router.push('laporan-harian'));
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
          this.data.forEach(element => {
              element.updated_at = element.updated_at.slice(11, 16);
          });
        })
        .catch((e) => {
          loading.hide();
          this.$toast.error(e);
        });
    }
}
</script>