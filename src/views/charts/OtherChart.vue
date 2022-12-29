<template>
  <CChartBar
    :datasets="defaultDatasets"
    :labels="paket_pekerjaan"
  />
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs'

export default {
  name: 'OtherChart',
  components: { CChartBar },
    data() {
    return {
      paket_pekerjaan: [],
      total: [],
      colors: []
    }
  },
  computed: {
    defaultDatasets () {
      return [
        {
          label: 'Jumlah Paket Pekerjaan',
          backgroundColor: this.colors,
          data: this.total
        }
      ]
    }
  },
    methods: {
    // generate random color
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
  },
  mounted() {
      this.$store.dispatch("paket_pekerjaan/other").then((resp) => {
        resp.data.forEach(element => {
          this.paket_pekerjaan.push(element.nama)
          this.total.push(element.total)
          this.colors.push(this.getRandomColor())
        });
      }).catch(e => {
        this.$toast.error(e);
      });
  },
}
</script>
