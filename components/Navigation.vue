<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { ContentfulMenuGroup } from '~/types/contentful';

const { data } = await useAsyncData(async () => {
  const { $contentfulClient } = useNuxtApp();
  return await $contentfulClient.getEntries({
    content_type: 'navigationMenu',
    include: 2
  });
});

const navItemsMap = computed(() => {
  const menuItems = data.value?.items[0].fields.menuItems;
  const map = menuItems.map((group: ContentfulMenuGroup) => {
    const groupLabel = group.fields.groupName;
    let groupIcon = 'i-lucide-credit-card';
    groupLabel === 'Pricing' && (groupIcon = 'i-lucide-currency');
    groupLabel === 'About Us' && (groupIcon = 'i-lucide-users-round');
    const hasGroupLink = group.fields.groupLink;
    const hasChildren = group.fields.featuredPages;
    
    return {
      label: groupLabel,
      icon: groupIcon,
      to: hasGroupLink ? `/${group.fields.groupLink?.fields.slug}` : '',
      children: hasChildren
        ? group.fields.featuredPages?.map(page => ({
            label: page.fields.pageName,
            description: page.fields.internalName,
            to: `/${page.fields.slug}`,
          }))
        : [],
    }
  });
  return map;
});

const navItems = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/',
    slot: 'home' as const
  },
  ...navItemsMap.value,
]);
</script>

<template>
  <UContainer>
    <UNavigationMenu
      :items="navItems"
      content-orientation="vertical"
      variant="link"
      color="neutral"
      class="bg-white w-full justify-center z-50"
      :ui="{
        root: '[&>div]:w-full'
      }"
    >
    </UNavigationMenu>
  </UContainer>
</template>

<style>
@reference '@/assets/css/main.css';

[data-menu-item]:first-child {
  @apply mr-auto;
}
</style>
