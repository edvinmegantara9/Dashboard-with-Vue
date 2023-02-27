<template>
 <div class="bg-white p-4">
    <div class="h5 text-black-50">Jumlah donasi berdasarkan rumah makan</div>
    <CChartBarDonasi/>
 </div>
</template>

<script>
// import axios from "axios";
import CChartBarDonasi from "../charts/CChartBarDonasi.vue";
export default {
  components: {
    CChartBarDonasi
  },
};
</script>
