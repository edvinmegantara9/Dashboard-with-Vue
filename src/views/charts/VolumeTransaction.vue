<template>
    <div class="row">
      <div class="col-md-12">
        <div class="card border-top rounded shadow p-3">
          <div class="row align-items-center">
            <div class="col-10">
              <b>Transaksi Volume</b>
            </div>
            <div class="col-2 text-right">
               <select v-model="tahun" class="form-control" aria-label="Default select example">
                 <option v-for="tahun in tahuns" :key="tahun.tahun" :value="tahun.tahun" @change="change()">{{ tahun.tahun }}</option>
              </select>
            </div>
          </div>
          <hr />
          <CChartLine
            :datasets="dataset"
            :options="defaultOptions"
            style="height:300px"
            :labels="bulan"
          />
        </div>
      </div>
    </div>
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'
import {_} from 'vue-underscore';

export default {
  name: 'CChartLineExample',
  components: { CChartLine },
  data() {
    return {
      tahun: "2022",
      tahuns: [],
      bulan: [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ],
      dataset: []
    }
  },
  computed: {
    defaultDatasets () {
      return this.dataset
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
    getGrafikVolumeTransaction() {
        this.$store.dispatch("dashboard/getGrafikVolumeTransaction", this.tahun).then((resp) => {

        const group = _.groupBy(resp, function(obj) {
          return obj.category;
        });
        const groupKey = Object.keys(group);

        for (let prop of groupKey) {
          let value = [];
          for (let index = 1; index <= 12; index++) {
            let result = group[prop].find(item => {
              return item.bulan == index;
            })

            if (result) {
              value.push(result.jumlah)
            } else {
              value.push(0)
            }
          }
          
          this.dataset.push({
              label: prop,
              borderColor: this.getRandomColor(),
              data: value,
              fill: false,
              //  tension: 0.1
          })
        }
      }).catch(e => {
        this.$toast.error(e);
      });
    },
    getYear() {
      this.$store.dispatch("dashboard/getYear", this.tahun).then((resp) => {
        this.tahuns = resp;
        this.tahun = this.tahuns[0].tahun;
         this.getGrafikVolumeTransaction();
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
  }
}
</script>
