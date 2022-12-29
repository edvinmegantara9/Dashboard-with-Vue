<template>
  <CChartDoughnut
    :datasets="defaultDatasets"
    :labels="paket_pekerjaan"
  />
</template>

<script>
import { CChartDoughnut } from '@coreui/vue-chartjs'

export default {
  name: 'CChartDoughnutExample',
  components: { CChartDoughnut },
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
      this.$store.dispatch("paket_pekerjaan/persentase").then((resp) => {

        let grand_total = 0;
        resp.data.forEach(element => {
          grand_total += element.total;
        });

        resp.data.forEach(element => {
          this.paket_pekerjaan.push(element.jenis_pekerjaan)
          this.total.push(((element.total / grand_total) * 100).toFixed())
          this.colors.push(this.getRandomColor())
        });
      }).catch(e => {
        this.$toast.error(e);
      });
  },
}
</script>
