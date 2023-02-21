<template>
  <CSidebar class="bg-main" fixed :minimize="minimize" :show.sync="show">
    <CSidebarBrand class="d-md-down-none mb-2" to="/">
      <img src="@/assets/logo/donasi_02.png" width="40%" alt="" />
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
      data
    };
  },
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
    getRoles() {
      return this.$store.getters["auth/getUser"];
    },

    getRoleFromLocal() {
      return JSON.parse(localStorage.getItem("user"));
    },
    computedSidebar() {
      const role = JSON.parse(localStorage.getItem("user"));

      if (role.roles.name.toLowerCase() == "dinas") {
        return [
          {
            _name: "CSidebarNav",
            _children: data.admin,
          },
        ];
      } else {
        return [
          {
            _name: "CSidebarNav",
            _children: data.restaurant,
          },
        ];
      }
    },
  },
};
</script>


<style>
  .bg-main {
    background: #024531 !important;
  }

  .c-sidebar .c-sidebar-brand {
      color: #fff;
      background: #fff !important;
  }
</style>