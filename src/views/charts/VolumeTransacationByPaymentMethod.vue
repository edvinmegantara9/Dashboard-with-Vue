<template>
  <div class="col-md-6">
    <div class="card border-top rounded shadow p-3">
      <div class="row align-items-center">
        <div class="col-9">
          <b>Summary Transaksi By SIM Type</b>
        </div>
        <div class="col-3 text-right">
            <select v-model="tahun" class="form-control" aria-label="Default select example">
              <option v-for="tahun in tahuns" :key="tahun.tahun" :value="tahun.tahun">{{ tahun.tahun }}</option>
          </select>
        </div>
      </div>
      <hr />
      <CChartDoughnut
        :datasets="defaultDatasets"
        :labels="payment_method"
        style="height:300px"
      />
    </div>
  </div>
</template>

<script>
import { CChartDoughnut } from '@coreui/vue-chartjs'

export default {
  name: 'CChartDoughnutExample',
  components: { CChartDoughnut },
  data() {
    return {
      payment_method: [],
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
    },
    getGrafikVolumeTransactionByPaymentMethod() {
        this.$store.dispatch("dashboard/getGrafikVolumeTransactionByPaymentMethod", this.tahun).then((resp) => {
          resp.forEach(element => {
              this.payment_method.push(element.payment_method);
              this.total.push(element.jumlah);
              this.colors.push(this.getRandomColor());
          });
      }).catch(e => {
        this.$toast.error(e);
      });
    },
    getYear() {
      this.$store.dispatch("dashboard/getYear", this.tahun).then((resp) => {
        this.tahuns = resp;
        this.tahun = this.tahuns[0].tahun;
        this.getGrafikVolumeTransactionByPaymentMethod();
      }).catch(e => {
        this.$toast.error(e);
      });
    }
  },
  mounted() {
    this.getYear();
  },
}
</script>
