<template>
 <div>
    <VolumeTransaction />
    <div class="row">
      <VolumeTransactionBySimType />
      <CChartDoughnutExample />
    </div>
 </div>
</template>

<script>
import axios from "axios";
import VolumeTransaction from "../charts/VolumeTransaction.vue";
import VolumeTransactionBySimType from "../charts/VolumeTransactionBySimType.vue";
import CChartDoughnutExample from "../charts/VolumeTransacationByPaymentMethod.vue";
export default {
  components: {
    VolumeTransaction,
    VolumeTransactionBySimType,
    CChartDoughnutExample,
  },
  data() {
    return {
      user: {},
      updateModal: false,
      form: {},
      roles: [],
      rooms: [],
      inbox: [],
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 3,
      },
    };
  },
  methods: {
    getMe() {
      this.$store
        .dispatch("auth/me")
        .then((resp) => {
          this.user = resp.data;
          this.getInbox();
          this.getRooms();
        })
        .catch((e) => {
        });
    },
  },
  mounted() {
    this.getMe();
  },

  computed: {
    computedRole() {
      return this.roles.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    },
  },
};
</script>

<style scoped>
.border-top {
  border-top: 3px solid #1d4374 !important;
}

.scroll {
  overflow-y: auto;
  height: 150px;
}
</style>

<style>
table {
  display: table;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}
</style>