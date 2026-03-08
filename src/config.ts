export const SITE = {
  website: "https://blog.atdpath.com/",
  author: "Daniel Roziecki",
  title: "atdpath: blog",
  desc: "Wejdźmy wspólnie w świat z AI.",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000,
  lang: "pl",
  timezone: "Europe/Warsaw",
};

export const NAV_LINKS = [
  { href: "/posts", label: "Posty" },
  { href: "/piy", label: "PIY" },
  { href: "/atd", label: "ATD" },
  { href: "/about", label: "O mnie" },
] as const;

export const SOCIALS = [
  {
    name: "GitHub",
    href: "https://github.com/emssik",
    icon: "github",
    active: true,
  },
  {
    name: "X",
    href: "https://x.com/ZeroToJunior",
    icon: "x",
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-roziecki/",
    icon: "linkedin",
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:emssik@emssik.eu",
    icon: "mail",
    active: true,
  },
] as const;
