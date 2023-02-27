<template>
  <CChartBar
    :datasets="defaultDatasets"
    :labels="paket_pekerjaan"
    :options="computedOptions"
    style="height:300px"
  />
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs'
import { deepObjectsMerge } from '@coreui/utils/src'

export default {
  name: 'CChartBarExample',
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
    },
    defaultOptions () {
      return {
        maintainAspectRatio: false,
        responsive: true,
      }
    },
    computedOptions () {
      return deepObjectsMerge(this.defaultOptions, this.options || {})
    },
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
      // this.$store.dispatch("paket_pekerjaan/persentase").then((resp) => {

      //   resp.data.forEach(element => {
      //     this.paket_pekerjaan.push(element.jenis_pekerjaan)
      //     this.total.push(element.total)
      //     this.colors.push(this.getRandomColor())
      //   });
      // }).catch(e => {
      //   this.$toast.error(e);
      // });
  },
}
</script>
