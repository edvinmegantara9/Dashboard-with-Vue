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
          <div class="card mt-2 p-3">
            <p>
              2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </CTab>
        <CTab title="Kotak Keluar">
          <div class="card mt-2 p-3">
            <p>
              2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </CTab>
      </CTabs>
    </div>
  </div>
</template>



<script>
import CreateMessage from "./components/CreateMessage.vue";
export default {
  components: {
    CreateMessage,
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