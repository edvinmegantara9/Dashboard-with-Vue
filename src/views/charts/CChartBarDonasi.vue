<template>
    <CChartBar
      :datasets="computedListDonasi"
      :labels="labels"
      :options="computedOptions"
      style="height:400px"
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
        labels:[],
        total: [],
        colors: [],
        listDonasi: []
      }
    },
    computed: {
      defaultDatasets () {
        return [
          {
            label: "Donasi Berdasarkan Rumah Makan",
            backgroundColor: ["#14532d", "#14532d"],
            data: [200, 200]
          },
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
      computedListDonasi() {
        let dataFix = this.listDonasi
        let datasets = []

        datasets.push({
            label: "Jumlah Donasi Berdasarkan Rumah Makan",
            backgroundColor: this.getRandomColor(),
            data: this.getFields(dataFix[0])
        })

        return datasets
      }
    },
    methods: {
        getFields(input) {
            var output = [];
            for(const property in input ) {
                output.push(input[property])
            }
        
            return output;
        },
        // generate random color
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        getDonasi(){
        var loading = this.$loading.show();
        this.$store
            .dispatch('dashboard/getDonasiRumahMakan')
            .then((res)=> {
                this.listDonasi = res.data
                this.labels = Object.keys(res.data[0])
                loading.hide()
            })
            .catch(() =>{
                loading.hide()
            })
        }
    },
    mounted() {
        this.getDonasi()
    },
  }
  </script>
  