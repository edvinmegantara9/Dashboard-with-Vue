<template>
  <div>
    <h3>Pesan</h3>
    <hr />
    <div class="card shadow rounded-lg p-1">
      <CTabs variant="pills" :active-tab="0">
        <CTab title="Tulis pesan">
          <create-message></create-message>
        </CTab>
        <CTab title="Kotak Masuk">
          <inbox />
        </CTab>
        <CTab title="Kotak Keluar">
          <outbox />
        </CTab>
      </CTabs>
    </div>
  </div>
</template>



<script>
import CreateMessage from "./components/CreateMessage.vue";
import Inbox from "./components/Inbox.vue";
import Outbox from "@/views/menu/components/Outbox.vue";

export default {
  components: {
    CreateMessage,
    Inbox,
    Outbox,
  },
  data() {
    return {};
  },
};
</script>

<style >
.tab {
  width: 100px !important;
}
</style>