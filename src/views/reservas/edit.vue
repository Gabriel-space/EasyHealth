<template>
  <div>
    <breadcrumbs>
      <template v-slot:model> Reservas </template>
      <template v-slot:action> Editando Reservas </template>
    </breadcrumbs>
    <pre>{{ $route.params.id }}</pre>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
</script>

<style lang="scss" scoped></style>
