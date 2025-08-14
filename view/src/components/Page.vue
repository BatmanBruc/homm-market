<template>
  <div class="page">
    <Table />
  </div>
</template>
<script setup>
import Table from '@/components/Table.vue';
</script>

<style scoped>
.page {
  border-image: url(/src/assets/Border-blue.png) 48 / 48px / 0 repeat;
  background: url(/src/assets/Leather.png);
  padding: 32px 44px;
  height: 100%;
  box-sizing: border-box;
  min-height: calc(100vh - 60px);
}
table {
  border-image: url(https://heroes.thelazy.net/images/9/9b/Border-small.png) 4 / 4px / 4px repeat;
  background: url(/src/assets/Leather-dark.png);
  margin: 4px 4px 8px;
  background-color: transparent !important;
  width: 100%;
  height: 100%;
}
</style>
