<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <img src="@/assets/logo/logo.png" class="img-banner" alt="" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/dashboard"> Dashboard </CHeaderNavLink>
      </CHeaderNavItem>
      <a href="https://sibangun.bandungkab.go.id/" class="btn btn-primary m-1">Beranda</a>
      <a href="https://webgis.sibangun.bandungkab.go.id/public/" class="btn btn-primary m-1">Peta Inteaktif</a>
    </CHeaderNav>
    <CHeaderNav class="mr-4 ml-sm-auto">
      <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt,
  },
};
</script>

<style scoped>
.img-banner {
  width: 100%;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .img-banner {
    width: 45% !important;
  }
}
</style>
