<template>
  <div class="line">
    <div>{{ item.id }}</div>
    <div>{{ item.name }}</div>
    <div>{{ item.count }}</div>
    <div>{{ item.price }}</div>
    <div
      class="checkbox"
      @click="
        item.inStock = !item.inStock;
        trade(item.id, +item.inStock);
      "
    >
      <div v-show="item.inStock"></div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { tradeUnit } from "@/api";
import debounce from "@/helpers/debounce";
const { item } = defineProps({
  item: {
    type: Object,
    required: true
  }
});
const trade = debounce((id, trade) => {
  tradeUnit(id, trade);
}, 300);
</script>
<style scoped>
.line {
  display: flex;
}

.line > div {
  width: 100%;
  text-align: center;
  margin-left: 10px;
  border-image: url(https://heroes.thelazy.net/images/9/9b/Border-small.png) 4 /
    4px / 4px repeat;
  background: url(/src/assets/Leather-dark.png);
  height: 30px;
  line-height: 30px;
  margin-bottom: 15px;
}

.line > div:nth-child(1) {
  min-width: 60px;
  max-width: 60px;
}

.checkbox {
  padding: 3px;
  box-sizing: border-box;
  cursor: pointer;
  max-width: 30px;
}
.checkbox > div {
  max-width: 100%;
  height: 100%;
  background: #f7de7b;
}
</style>