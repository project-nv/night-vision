export default {
    lang: 'en-US',
    title: 'NightVision Docs',
    description: 'Timeseries / candlestick charts for PROs. Welcome to nex-gen!',
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ],
    themeConfig: {
        socialLinks: [
            { icon: 'github', link: 'https://github.com/project-nv/night-vision' }
        ],
        logo: '/favicon.png',
        nav: [
            { text: 'Guide', link: '/guide/intro/night-vision-charts' },
            { text: 'Examples', link: '/guide/intro/10-basic-examples' },
            { text: 'Changelog', link: 'https://github.com/...' },
            {
               text: '0.1.0',
               items: [
                 { text: '0.1.0', link: 'https://github.com/...' },
               ]
             }
        ],
        sidebar: [
            {
                text: 'Introduction',
                items: [
                  {
                      text: 'Night Vision Charts',
                      link: '/guide/intro/night-vision-charts'
                  },
                  {
                      text: 'Getting Started',
                      link: '/guide/intro/getting-started'
                  },
                  {
                      text: 'Basic Configuration',
                      link: '/guide/intro/basic-configuration'
                  },
                  {
                      text: '10 Basic Examples',
                      link: '/guide/intro/10-basic-examples'
                  }
                ]
            },
            {
                text: 'Main Chart Component',
                items: [
                  {
                      text: 'Core Elements',
                      link: '/guide/main-comp/core-elements'
                  },
                  {
                      text: 'Layout',
                      link: '/guide/main-comp/layout'
                  },
                  {
                      text: 'DataHub',
                      link: '/guide/main-comp/data-hub'
                  },
                  {
                      text: 'MetaHub',
                      link: '/guide/main-comp/meta-hub'
                  },
                  {
                      text: 'DataScan',
                      link: '/guide/main-comp/data-scan'
                  },
                  {
                      text: 'Cursor',
                      link: '/guide/main-comp/cursor'
                  },
                  {
                      text: 'Events',
                      link: '/guide/main-comp/events'
                  },
                  {
                      text: 'Scripts',
                      link: '/guide/main-comp/scripts'
                  }
                ]
            },
            {
                text: 'Data Structure',
                items: [
                    {
                        text: 'The Top Level',
                        link: '/guide/data-struct/the-top-level'
                    },
                    {
                        text: 'Pane Object',
                        link: '/guide/data-struct/pane-object'
                    },
                    {
                        text: 'Overlay Object',
                        link: '/guide/data-struct/overlay-object'
                    }
                ]
            },
            {
                text: 'API',
                items: [
                    {
                        text: 'Chart API',
                        link: '/guide/api/chart-api'
                    },
                    {
                        text: 'Data API',
                        link: '/guide/api/data-api'
                    },
                    {
                        text: 'Layout API',
                        link: '/guide/api/layout-api'
                    },
                    {
                        text: 'DataHub API',
                        link: '/guide/api/datahub-api'
                    },
                    {
                        text: 'Chart Config',
                        link: '/guide/api/chart-config'
                    },
                    {
                        text: 'Default Colors',
                        link: '/guide/api/default-colors'
                    }
                ]
            },
            {
                text: 'Built-in Overlays',
                items: [
                    {
                        text: 'Overlays',
                        link: '/guide/built-in/overlays'
                    }
                ]
            },
            {
                text: 'NavyJS',
                items: []
            },
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present ChartMaster'
        }
    }
}
