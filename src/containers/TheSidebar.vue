<template>
  <CSidebar class="bg-main" fixed :minimize="minimize" :show.sync="show">
    <CSidebarBrand class="d-md-down-none mb-2" to="/">
      <img src="@/assets/logo/logo.png" width="60%" alt="" />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="computedSidebar" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import * as data from "./_nav";

export default {
  name: "TheSidebar",
  data() {
    return {
      role: {},
    };
  },

  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
    getRoleFromLocal() {
      return JSON.parse(localStorage.getItem("user"));
    },
    computedSidebar() {
      return [
          {
            _name: "CSidebarNav",
            _children: data.admin,
          },
        ];
    },
  },
};
</script>


<style>
.bg-main {
  background: #5945e6 !important;
}

.c-sidebar .c-sidebar-brand {
    color: #fff;
    background: #fff !important;
}
</style>