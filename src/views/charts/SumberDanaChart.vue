<template>
  <CChartDoughnut
    :datasets="defaultDatasets"
    :labels="sumber_dana"
  />
</template>

<script>
import { CChartDoughnut } from '@coreui/vue-chartjs'

export default {
  name: 'SumberDanaChart',
  components: { CChartDoughnut },
  data() {
    return {
      sumber_dana: [],
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
      this.$store.dispatch("paket_pekerjaan/persentase_sumber_dana").then((resp) => {

        let grand_total = 0
        resp.data.forEach(element => {
            grand_total += element.total;
        });

        resp.data.forEach(element => {
          this.sumber_dana.push(element.sumber_dana)
          this.total.push((element.total).toFixed())
          this.colors.push(this.getRandomColor())
        });
      }).catch(e => {
        this.$toast.error(e);
      });
  },
}
</script>
