// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Crypto Price Tracker',
  tagline: 'Documentation for the Crypto Price Tracker application',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://crypto-price-tracker-docs.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/kevinlindong/Crypto_Price_Tracker/tree/main/docs/',
          routeBasePath: '/', // Change this to '/' to make docs the home page
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      navbar: {
        title: 'Crypto Price Tracker',
        logo: {
          alt: 'Crypto Price Tracker Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://github.com/kevinlindong/Crypto_Price_Tracker',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/intro',  // Update this path to '/intro' since docs is now at root
              },
              {
                label: 'Setup Guide',
                to: '/setup/installation',  // Update this path too
              },
              {
                label: 'GitHub',
                href: 'https://github.com/kevinlindong/Crypto_Price_Tracker',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Crypto Price Tracker. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
    }),
};

module.exports = config;