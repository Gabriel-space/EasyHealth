<template>
  <div class="mx-3 mt-2">
    <ul class="menu bg-base-200 rounded-box w-57">
      <li>
        <router-link :to="{name:'reservas.index'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Reservas
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'historico.index'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Histórico
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>