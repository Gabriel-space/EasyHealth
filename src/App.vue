<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import layoutDefault from "./layouts/layoutDefault.vue";

const route = useRoute();
const semLayout = computed(() => route.meta.semLayout);
</script>

<template>
  <div v-if="semLayout">
    <router-view />
  </div>
  <layout-default v-else />
</template>