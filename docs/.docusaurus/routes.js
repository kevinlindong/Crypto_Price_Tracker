import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '328'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '3bc'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '648'),
            routes: [
              {
                path: '/challenges',
                component: ComponentCreator('/challenges', '0bd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/intro',
                component: ComponentCreator('/intro', '9fa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/setup/configuration',
                component: ComponentCreator('/setup/configuration', 'f23'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/setup/installation',
                component: ComponentCreator('/setup/installation', '339'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-app/api-integration',
                component: ComponentCreator('/web-app/api-integration', 'c71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-app/architecture',
                component: ComponentCreator('/web-app/architecture', '521'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-app/state-management',
                component: ComponentCreator('/web-app/state-management', '5d6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-app/ui-components',
                component: ComponentCreator('/web-app/ui-components', '2d8'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
