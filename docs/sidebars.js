/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Home',
    },
    {
      type: 'category',
      label: 'Setup Guide',
      items: ['setup/installation', 'setup/configuration'],
    },
    {
      type: 'category',
      label: 'Web App',
      items: [
        'web-app/architecture',
        'web-app/api-integration',
        'web-app/state-management',
        'web-app/ui-components',
      ],
    },
    {
      type: 'doc',
      id: 'challenges',
      label: 'Challenges & Solutions',
    },
  ],
};

module.exports = sidebars;