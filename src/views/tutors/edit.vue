<template>
  <div>
    <breadcrumbs>
      <template v-slot:model> Clientes </template>
      <template v-slot:action> Editando Clientes </template>
    </breadcrumbs>
    <pre>{{ $route.params.id }}</pre>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
</script>

<style lang="scss" scoped></style>
