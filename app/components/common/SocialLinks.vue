<script lang="ts" setup>
const socialLinks = [
  {
    src: "/icons/telegram-svgrepo-com.svg",
    alt: "Telegram",
    link: "https://t.me/yourchannel",
  },
  {
    src: "/icons/twitter-x-logo.svg",
    alt: "Twitter",
    link: "https://twitter.com/yourchannel",
  },
  {
    src: "/icons/instagram-167-svgrepo-com.svg",
    alt: "Instagram",
    link: "https://www.instagram.com/yourchannel/",
  },
];

const handleLinkClick = (event: MouseEvent, link: string) => {
  event.preventDefault();
  window.open(link, "_blank");
};
</script>

<template>
  <div class="flex gap-3">
    <a
      v-for="socialLink in socialLinks"
      :key="socialLink.alt"
      :href="socialLink.link"
      @click="handleLinkClick($event, socialLink.link)"
    >
      <img :src="socialLink.src" :alt="socialLink.alt" class="social-link" />
    </a>
  </div>
</template>

<style scoped>
.social-link {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
}

.social-link:hover {
  opacity: 0.8;
}
</style>
