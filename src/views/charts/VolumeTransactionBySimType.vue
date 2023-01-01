<template>
  <div class="col-md-6">
    <div class="card border-top rounded shadow p-3">
      <div class="row align-items-center">
        <div class="col-9">
          <b>Summary Transaksi By SIM Type</b>
        </div>
        <div class="col-3 text-right">
            <select v-model="tahun" class="form-control" aria-label="Default select example">
              <option v-for="tahun in tahuns" :key="tahun.tahun" :value="tahun.tahun" @change="change()">{{ tahun.tahun }}</option>
          </select>
        </div>
      </div>
      <hr />
      <CChartBar
        :datasets="defaultDatasets"
        :labels="sims"
        :options="computedOptions"
        style="height:300px"
      />
    </div>
  </div>  
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs'
import { deepObjectsMerge } from '@coreui/utils/src'
import {_} from 'vue-underscore';

export default {
  name: 'CChartBarExample',
  components: { CChartBar },
    data() {
    return {
      tahun: "2022",
      tahuns: [],
      sims: [],
      total: [],
      colors: []
    }
  },
  computed: {
    defaultDatasets () {
      return [
        {
          label: 'Jumlah transaksi per sim',
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
    }
  },
    methods: {
      getRandomColor() {
          var letters = '0123456789ABCDEF';
          var color = '#';
          for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
      },
      getGrafikVolumeTransactionBySim() {
          this.$store.dispatch("dashboard/getGrafikVolumeTransactionBySim", this.tahun).then((resp) => {

            resp.forEach(element => {
                this.sims.push(element.sim_type);
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
          this.getGrafikVolumeTransactionBySim();
        }).catch(e => {
          this.$toast.error(e);
        });
      },
      change() {
        this.getYear();
      }
  },
  mounted() {
     this.getYear();
  },
}
</script>
