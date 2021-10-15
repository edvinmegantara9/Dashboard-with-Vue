<template>
  <CSidebar class="bg-main" fixed :minimize="minimize" :show.sync="show">
    <CSidebarBrand class="d-md-down-none mb-2 p-2" to="/">
      <!-- <CIcon 
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 556 134"
      /> -->
      <img src="@/assets/logo/logo.png" width="60%" alt="" />

      <!-- <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      /> -->
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
    getRoles() {
      return this.$store.getters["auth/getUser"];
    },

    getRoleFromLocal() {
      return JSON.parse(localStorage.getItem("user"));
    },

    computedSidebar() {
      console.log("getrole", this.getRoleFromLocal.role);
      this.role = this.getRoles
        ? this.getRoles.role
        : this.getRoleFromLocal.role;
      console.log("role", this.role);
      if (this.role.name.toLowerCase() == "admin") {
        console.log("admin");
        return [
          {
            _name: "CSidebarNav",
            _children: data.admin,
          },
        ];
      } else if (this.role.is_opd == 1) {
        console.log("isopd");

        return [
          {
            _name: "CSidebarNav",
            _children: data.opd,
          },
        ];
      } else {
        console.log("notopd");

        return [
          {
            _name: "CSidebarNav",
            _children: data.not_opd,
          },
        ];
      }
    },
  },
};
</script>


<style>
.bg-main {
  background: #24548c !important;
}
</style>