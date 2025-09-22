import type { Component } from "vue";
import Telegram from "~/components/icons/Telegram.vue";
import Twitter from "~/components/icons/Twitter.vue";
import Instagram from "~/components/icons/Instagram.vue";

export const socialLinks: {
  alt: string;
  link: string;
  icon: Component;
}[] = [
  {
    alt: "Telegram",
    link: "https://t.me/yourchannel",
    icon: Telegram,
  },
  {
    alt: "Twitter",
    link: "https://twitter.com/yourchannel",
    icon: Twitter,
  },
  {
    alt: "Instagram",
    link: "https://www.instagram.com/yourchannel/",
    icon: Instagram,
  },
];
