<template>
  <div class="header">
    <div class="search">
      <input
        v-model="search_string"
        type="search"
        @keyup.enter="search"
        @search="search"
      />
      <button @click="search">Поиск</button>
    </div>
    <div class="generate">
      <span class="label">Количество: </span>
      <input v-model="count" @keyup.enter="generate" />
      <button @click="generate">Сгенерировать</button>
    </div>
  </div>
  <div class="table">
    <div class="table-head">
      <div>ID</div>
      <div>Имя</div>
      <div>Количество</div>
      <div>Цена</div>
      <div></div>
    </div>
    <div v-show="!loading" class="body">
      <VueDraggableNext v-model="list" @change="move">
        <TableItem v-for="item in list" :key="item.id" :item="item" />
      </VueDraggableNext>
      <div class="trigger" ref="trigger"></div>
    </div>
    <div v-show="loading" class="loading"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getListUnit, moveUnit, generateData } from "../api";
import { VueDraggableNext } from "vue-draggable-next";
import TableItem from "@/components/TableItem.vue";

const list = ref([]);
const page = ref(1);
const search_string = ref("");
const count = ref(1000000);
const loading = ref(false);
watch(count, () => {
  count.value > 1000000 && (count.value = 1000000);
});
function getUnits() {
  if (page.value === 1)
    loading.value = true;
  getListUnit(page.value, search_string.value)
    .then((res) => {
      res.json().then((data) => {
        list.value = [...list.value, ...data];
        loading.value = false;
      });
    })
    .catch(() => {
      console.error;
      loading.value = false;
    });
}
getUnits();

const search = () => {
  loading.value = true;
  page.value = 1;
  getListUnit(page.value, search_string.value)
    .then((res) => {
      res.json().then((data) => {
        list.value = data;
        loading.value = false;
      });
    })
    .catch((e) => {
      console.error(e);
      loading.value = false;
    });
};

function generate() {
  loading.value = true;
  list.value = [];
  page.value = 1;
  search_string.value = "";
  generateData(count.value).finally(() => {
    loading.value = false;
    getUnits();
  });
}

function move(e) {
  let newIndex;
  if (e.moved.oldIndex < e.moved.newIndex) {
    newIndex = list.value[e.moved.newIndex - 1].sortIndex;
    if (search_string.value) {
      list.value[e.moved.newIndex + 1].sortIndex = newIndex - 1;
    } else {
      for (let i = e.moved.oldIndex + 1; i < e.moved.newIndex - 1; i++) {
        list.value[i].sortIndex++;
      }
    }
  } else {
    newIndex = list.value[e.moved.newIndex + 1].sortIndex;
    if (search_string.value) {
      list.value[e.moved.newIndex + 1].sortIndex = newIndex + 1;
    } else {
      for (let i = newIndex + 1; i < e.moved.oldIndex; i++) {
        list.value[i].sortIndex++;
      }
    }
  }
  moveUnit(e.moved.element.sortIndex, newIndex);
  list.value[e.moved.newIndex].sortIndex = newIndex;
}

const trigger = ref();
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && list.value.length >= 20) {
        page.value = page.value + 1;
        getUnits();
      }
    });
  });
  observer.observe(trigger.value);
});
</script>
<style scoped>
.loading {
  background: url(/src/assets/czarodziej.gif);
  width: 160px;
  height: 145px;
  display: block;
  margin: auto;
  margin-top: 25%;
}
.header {
  margin-bottom: 30px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
input {
  width: 300px;
  height: 30px;
  padding: 0;
  margin: 0;
  border: 0px;
  outline: 0px;
  background: #00000052;
  box-shadow: 0px 1px 6px 3px #1f1f1f inset;
  border: 1px solid #a58a42;
  color: white;
  padding: 0px 10px;
  box-sizing: border-box;
}
button {
  background: url(/src/assets/GldBtn2.png);
  width: 100px;
  height: 30px;
  margin-left: 10px;
  background-size: 100px 30px;
  font-weight: 700;
  background-position-y: -2px;
  cursor: pointer;
}
.generate .label {
  color: white;
}
.generate input {
  width: 100px;
  text-align: center;
}
.generate button {
  width: 130px;
  background-size: 130px 30px;
}
.search input {
  width: 300px;
}
.search button {
  width: 100px;
  background-size: 100px 30px;
}
.table {
  color: white;
}
.table-head {
  margin-bottom: 20px;
}
.table-head {
  display: flex;
}
.table-head > div {
  width: 100%;
  text-align: center;
  margin-left: 10px;
}
.table-head > div:nth-child(5) {
  max-width: 30px;
}

.table-head > div:nth-child(1) {
  min-width: 60px;
  max-width: 60px;
}
</style>
