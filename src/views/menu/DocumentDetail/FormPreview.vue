<template>
    <div>
        <div id="pdf-content" style="background-color:white" class="custom-font">
        <div style="text-align: center; margin-top: 2px"><img src="@/assets/logo/garuda.png" width="113.3px" height="113.3px" /></div>
        <p style="text-align:center; margin:0">BUPATI BANDUNG</p>
        <p style="text-align:center; margin:0">PROVINSI JAWA BARAT</p>
        <p style="text-align:center; margin:0; line-height: 2">KEPUTUSAN BUPATI BANDUNG</p>
        <table style="margin-left: 143.6px;">
            <tr>
            <td>NOMOR</td>
            <td style="padding-left: 37.7px; padding-right: 18.8px">:</td>
            <td >800/Kep.645-BKPSDM/2022</td>
            </tr>
            <tr>
            <td>LAMPIRAN</td>
            <td style="padding-left: 37.7px; padding-right: 18.8px">:</td>
            <td >2 (DUA)</td>
            </tr>
        </table>
        <p style="text-align:center; margin:0; line-height: 2">TENTANG</p> 
        <p style="text-align:center; margin-left: 22.6px;margin-right: 22.6px;">
            {{ document.title }}
        </p>
        <p style="text-align:center; margin:0; line-height: 2">BUPATI BANDUNG,</p>
        <table class="table-naskah">
            <tr>
                <td style="vertical-align: baseline;">Menimbang</td>
                <td style="vertical-align: baseline;">:</td>
                <td style="vertical-align: baseline;">a.</td>
                <td><p style=" text-align: justify;
  text-justify: inter-word;">bahwa berdasarkan pasal 85 ayat (6) Peraturan Daerah Nomor 5 Tahun 2016 tentang Pembentukan Produk Hukum Daerah, Ketentuan lebih lanjut mengenai pembentukan, susunan keanggotan, dan tugas tim pembahasan Rancangan Peraturan Bupati ditetapkan dengan Keputusan Bupati;</p></td>
            </tr>
            <tr>
                <td style="vertical-align: baseline;"></td>
                <td style="vertical-align: baseline;"></td>
                <td style="vertical-align: baseline;"> b.</td>
                <td style="vertical-align: baseline;"><p style=" text-align: justify;
  text-justify: inter-word;">bahwa berdasarkan pertimbangan sebagaimana dimaksud pada huruf a, perlu menetapkan Pembentukan Tim Penyusunan Peraturan Bupati Bandung tentang Tata Cara Penegakan Disiplin Pegawai Negeri Sipil Di Lingkungan Pemerintah Kabupaten Bandung, dengan Keputusan Bupati;</p></td>
            </tr>
        </table>
        </div>
        <CButton class="m-3 btn btn-primary"
            @click="exportPDF(id)"
            >
            Preview
        </CButton>
    </div>
</template>

<script> 
    import html2pdf from "html2pdf.js";
    export default {
        props: ['clickedNext'],
        data() {
            return {
                document: {}
            }
        },
        methods: {
            exportPDF(id) {

            var opt = {
                margin: [0, 2, 4.5, 2],
                filename: "Naskah.pdf",
                image: { type: "jpeg", quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "cm", format: "legal", orientation: "p" },
                pagebreak: { avoid: "tr" },
            };

            var element = document.getElementById("pdf-content");
            html2pdf()
                .set(opt)
                .from(element)
                .save()
                .then(() => {});
            },
        },
        mounted() {
            this.$emit('can-continue', {value: true});
            this.document = this.$store.state.document.document;
            console.log(this.document, "document");
        }
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
</style>