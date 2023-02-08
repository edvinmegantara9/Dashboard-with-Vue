<template>
  <CFooter :fixed="false">
    <div>
      <a href="#" target="_blank">E-PRODUK</a>
      <span class="ml-1">&copy; {{ new Date().getFullYear() }}</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">SETDA. PRODUK HUKUM</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>
