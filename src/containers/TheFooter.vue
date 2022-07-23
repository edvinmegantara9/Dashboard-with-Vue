<template>
  <CFooter :fixed="false">
    <div>
      <a href="#" target="_blank">SIBANGUN</a>
      <span class="ml-1">&copy; {{ new Date().getFullYear() }}</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Administrasi Pembangunan</span>
      <a href="#">Kab. Bandung</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>
