<template>
  <CFooter :fixed="false">
    <div>
      <a href="#" target="_blank">Silaper</a>
      <span class="ml-1">&copy; {{ new Date().getFullYear() }}</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Bappeda</span>
      <a href="#">Kota Pagar Alam</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>
