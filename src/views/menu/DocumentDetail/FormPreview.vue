<template>
    <div class="container">
        <div id="pdf-content" style="background-color:white" class="custom-font">
            <div style="text-align: center; margin-top: 2px"><img src="@/assets/logo/garuda.png" width="113.3px" height="113.3px" /></div>
            <p style="text-align:center; margin:0">BUPATI BANDUNG</p>
            <p style="text-align:center; margin:0">PROVINSI JAWA BARAT</p>
            <p style="text-align:center; margin:0; line-height: 3">KEPUTUSAN BUPATI BANDUNG</p>
            <table style="margin-left: 143.6px;">
                <tr>
                    <td>NOMOR</td>
                    <td style="padding-left: 37.7px; padding-right: 18.8px">:</td>
                    <td >{{document.document.document_number }}</td>
                </tr>
                <tr v-if="document.document_attachments.length > 0">
                    <td>LAMPIRAN</td>
                    <td style="padding-left: 37.7px; padding-right: 18.8px">:</td>
                    <td >{{ document.document_attachments.length }} ({{ pembilang(document.document_attachments.length, false) }})</td>
                </tr>
            </table>
            <p style="text-align:center; margin:0; line-height: 3">TENTANG</p> 
            <p style="text-align:center; margin-left: 22.6px;margin-right: 22.6px;">
                {{ document.document.title }}
            </p>
            <p style="text-align:center; margin:0; line-height: 3">BUPATI BANDUNG,</p>

            <!-- Menimbang -->
            <table class="table-naskah" v-if="document.document_considers.length > 1">
                <tr v-for="(value, key) in document.document_considers" :key="key">
                    <td style="vertical-align: baseline;width: 136px">{{ key == 0 ? 'Menimbang' : '' }}</td>
                    <td style="vertical-align: baseline;width: 18.8px">{{ key == 0 ? ':' : '' }}</td>
                    <td style="vertical-align: baseline;width: 37.7px">{{ changeListNumber(key) }}.</td>
                    <td style="vertical-align: baseline;"><p style=" text-align: justify;text-justify: inter-word;">{{ value.description }}</p></td>
                </tr>
            </table>
            <table class="table-naskah" v-else>
                <tr>
                    <td style="vertical-align: baseline;width: 136px">Menimbang</td>
                    <td style="vertical-align: baseline;width: 18.8px">:</td>
                    <td colspan="2"  style="vertical-align: baseline;"><p style=" text-align: justify;text-justify: inter-word;">{{ document.document_considers[0].description }}</p></td>
                </tr>
            </table>
            <!-- Menimbang -->

            <!-- Mengingat -->
            <table class="table-naskah" v-if="document.document_remembers.length > 1">
                <tr v-for="(value, key) in document.document_remembers" :key="key">
                    <td style="vertical-align: baseline;width: 136px">{{ key == 0 ? 'Mengingat' : '' }}</td>
                    <td style="vertical-align: baseline;width: 18.8px">{{ key == 0 ? ':' : '' }}</td>
                    <td style="vertical-align: baseline;width: 37.7px">{{ key + 1 }}.</td>
                    <td style="vertical-align: baseline;"><p style=" text-align: justify;text-justify: inter-word;">{{ value.description }}</p></td>
                </tr>
            </table>
            <table class="table-naskah" v-else>
                <tr>
                    <td style="vertical-align: baseline;width: 136px">Menimbang</td>
                    <td style="vertical-align: baseline;width: 18.8px">:</td>
                    <td colspan="2"  style="vertical-align: baseline;"><p style=" text-align: justify;text-justify: inter-word;">{{ document.document_remembers[0].description }}</p></td>
                </tr>
            </table>
            <!-- Mengingat -->

            <!-- Memperhatikan -->
            <div v-if="document.document_notices.length > 0">
                <table class="table-naskah" v-if="document.document_notices.length > 1">
                    <tr v-for="(value, key) in document.document_notices" :key="key">
                        <td style="vertical-align: baseline;width: 136px">{{ key == 0 ? 'Memperhatikan' : '' }}</td>
                        <td style="vertical-align: baseline;width: 18.8px">{{ key == 0 ? ':' : '' }}</td>
                        <td style="vertical-align: baseline;width: 37.7px">{{ key + 1 }}.</td>
                        <td style="vertical-align: baseline;"><p style=" text-align: justify;text-justify: inter-word;">{{ value.description }}</p></td>
                    </tr>
                </table>
                <table class="table-naskah" v-else>
                    <tr>
                        <td style="vertical-align: baseline;width: 136px">Memperhatikan</td>
                        <td style="vertical-align: baseline;width: 18.8px">:</td>
                        <td colspan="2"  style="vertical-align: baseline;"><p style=" text-align: justify;text-justify: inter-word;">{{ document.document_notices[0].description }}</p></td>
                    </tr>
                </table>
            </div>
            <!-- Memperhatikan -->

            <!-- Memutuskan -->
            <p style="text-align:center; margin:0; line-height: 3">MEMUTUSKAN:</p>
            <table class="table-naskah">
                <tr>
                    <td style="vertical-align: baseline;width: 136px">Menetapkan</td>
                    <td style="vertical-align: baseline;width: 18.8px">:</td>
                    <td style="vertical-align: baseline;width: 37.7px"></td>
                    <td style="vertical-align: baseline;"></td>
                </tr>
                <tr v-for="(value, key) in document.document_decisions" :key="key">
                <td style="vertical-align: baseline;width: 136px">{{ pembilang(key + 1, true) }}</td>
                    <td style="vertical-align: baseline;width: 18.8px">:</td>
                    <td colspan="2" style="vertical-align: baseline;"><p style=" text-align: justify;text-justify: inter-word;" v-html="value.description"></p></td>
                </tr>
            </table>
            <!-- Memutuskan -->

            <section class="row mt-3 ttd_bupati" id="ttd">
                <div class="col">&nbsp;</div>
                <div class="col">
                    <p style="margin:0;">Ditetapkan di Soreang</p>
                    <p style="margin:0">pada tanggal {{ formatDate(document.document.date) }}</p>
                    <p style="padding:0px 50px 50px 0px; line-height: 3; text-align:center">BUPATI BANDUNG</p>
                    <p style="padding:0px 50px 0px 0px; line-height: 3; text-align:center">N. DADANG SUPRIATNA</p>
                </div>
            </section>
     
        </div>
        <CButton class="m-3 btn btn-primary"
            @click="exportPDF()"
            >
            Preview
        </CButton>
    </div>
</template>

<script> 
    import html2pdf from "html2pdf.js";
    import { uploadFile, getFont } from "@/utils/fileUpload";

    export default {
        props: ['clickedNext'],
        data() {
            return {
                document: {}
            }
        },
        methods: {
            formatDate(date) {
                return this.$moment(date).format("Do MMMM YYYY");
            },
            leaving: function () {
                alert("Leaving...");
            },
            pembilang(nilai, isPutusan){
                nilai = Math.abs(nilai);
                var simpanNilaiBagi=0;
                var huruf = ["", "SATU", "DUA", "TIGA", "EMPAT", "LIMA", "ENAM", "TUJUH", "DELAPAN", "SEMBILAN", "SEPULUH", "SEBELAS"];
                var temp="";
            
                if (nilai < 12) {
                    temp = ""+huruf[nilai];
                }
                else if (nilai <20) {
                    temp = pembilang(nilai - 10) + " BELAS";
                }
                else if (nilai < 100) {
                    simpanNilaiBagi = Math.floor(nilai/10);
                    temp = pembilang(simpanNilaiBagi)+" PULUH"+ pembilang(nilai % 10);
                }
                else if (nilai < 200) {
                    temp = " SERATUS" + pembilang(nilai - 100);
                }
                else if (nilai < 1000) {
                    simpanNilaiBagi = Math.floor(nilai/100);
                    temp = pembilang(simpanNilaiBagi) + " RATUS" + pembilang(nilai % 100);
                }
                else if (nilai < 2000) {
                    temp = " SERIBU" + pembilang(nilai - 1000);
                }
                else if (nilai < 1000000) {
                    simpanNilaiBagi = Math.floor(nilai/1000);
                    temp = pembilang(simpanNilaiBagi) + " RIBU" + pembilang(nilai % 1000);
                } 
                else if (nilai < 1000000000) {
                    simpanNilaiBagi = Math.floor(nilai/1000000);
                    temp =pembilang(simpanNilaiBagi) + " JUTA" + pembilang(nilai % 1000000);
                } 
                else if (nilai < 1000000000000) {
                    simpanNilaiBagi = Math.floor(nilai/1000000000);
                    temp = pembilang(simpanNilaiBagi) + " MILIAR" + pembilang(nilai % 1000000000);
                } 
                else if (nilai < 1000000000000000) {
                    simpanNilaiBagi = Math.floor(nilai/1000000000000);
                    temp = pembilang(nilai/1000000000000) + " TRILIUN" + pembilang(nilai % 1000000000000);
                }
            
                if (isPutusan) {
                    return 'KE'+temp;
                } else {
                    return temp;
                }
                
            },
            changeListNumber(index) {
                let alpabeth = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
                return alpabeth[index];
            },
            exportPDF() {

            var opt = {
                margin: [2, 2, 4.5, 2],
                filename: "Naskah.pdf",
                image: { type: "png", quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "cm", format: "legal", orientation: "p" },
                pagebreak: { avoid: ["tr", "section"], after: ['#ttd'], before: ".ttd_bupati" },
            };

            var element = document.getElementById("pdf-content");
            html2pdf()
                .from(element)
                .set(opt)
                .toPdf()
                .get('pdf')
                .then((pdf) => {

                    try {
                        let totalPages = pdf.internal.getNumberOfPages();

                        for (let i = 2; i <= totalPages; i++) {
                            // pdf.addFileToVFS('BookmanOldStyle.ttf', getFont);
                            // pdf.addFont('BookmanOldStyle.ttf', 'BookmanOldStyle', 'normal');
                            pdf.setPage(i);
                            pdf.setFontSize(12);
                            pdf.setTextColor('#000000');
                            pdf.text('- ' + i + ' -', (pdf.internal.pageSize.getWidth()/2.20), (1.5));         
                        }

                        const perBlob = pdf.output('blob');
                        console.log(perBlob, "testing");

                        uploadFile(newpdf)
                            .then((resp) => {
                                console.log(resp)
                                // this.form.file = resp;
                                alert("File berhasil diupload !!");
                            })
                            .catch((e) => {
                                alert("Terjadi kesalahan !! | " + e);
                            });
                    } catch (error) {
                        console.log(error);
                    }
                 
                   
                })
                .save()
            },
        },
        mounted() {
            this.$emit('can-continue', {value: true});
            this.document = this.$store.state.document;
        },
    }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Bookman+Old+Style&display=swap');

  .custom-font {
    font-family: 'Bookman Old Style', serif;
    font-size: 12pt;
    line-height: 1.2;
    color: black;
  }

  .table-naskah {
    white-space: normal !important;
  }

  p {
    margin-bottom: 0 !important;
  }
</style>