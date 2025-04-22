<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { CtfMenuGroup } from '~/types/contentful';

const { data } = await useAsyncData(async () => {
  const { $contentfulClient } = useNuxtApp();
  return await $contentfulClient.getEntries({
    content_type: 'navigationMenu',
    include: 2
  });
});

const menuItems = data.value?.items[0].fields.menuItems;

const navItems = ref<NavigationMenuItem[]>(menuItems.map((group: CtfMenuGroup) => {
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
}));
</script>

<template>
  <UNavigationMenu :items="navItems" content-orientation="vertical" class="w-full justify-center z-50" />
</template>
