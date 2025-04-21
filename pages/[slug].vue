<script setup lang="ts">
  const route = useRoute();
</script>

<template>
  <div>
    <UApp>
      <Navigation />
      <UContainer>
        <h1 class="">I'm the page at {{ route.path }}</h1>
      </UContainer>
    </UApp>
  </div>
</template>