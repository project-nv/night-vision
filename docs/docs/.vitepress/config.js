export default {
    lang: 'en-US',
    title: 'NightVision Docs',
    description: 'Timeseries / candlestick charts for PROs. Welcome to nex-gen!',
    appearance: 'dark',
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ],
    themeConfig: {
        socialLinks: [
            { icon: 'github', link: 'https://github.com/project-nv/night-vision' },
            { icon: 'twitter', link: 'https://twitter.com/nvxbased' }
        ],
        logo: '/favicon.png',
        nav: [
            { text: 'Guide', link: '/guide/intro/night-vision-charts' },
            { text: 'Examples', link: '/guide/intro/10-basic-examples' },
            { text: 'Roadmap', link: 'https://github.com/project-nv/night-vision#roadmap' },
            {
               text: '0.2.5',
               items: [
                 { text: '0.2.5', link: 'https://www.npmjs.com/package/night-vision' },
               ]
             }
        ],
        algolia: {
            appId: '1NTH8LZXRR',
            apiKey: 'b1e5ca1e1763cd54b928f10badc27f90',
            indexName: 'nightvision'
        },
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
                collapsible: true,
                collapsed: true,
                items: [
                    {
                        "text": "Area",
                        "link": "/guide/built-in/Area"
                    },
                    {
                        "text": "ArrowTrades",
                        "link": "/guide/built-in/ArrowTrades"
                    },
                    {
                        "text": "Band",
                        "link": "/guide/built-in/Band"
                    },
                    {
                        "text": "Candles",
                        "link": "/guide/built-in/Candles"
                    },
                    {
                        "text": "CandlesPlus",
                        "link": "/guide/built-in/CandlesPlus"
                    },
                    {
                        "text": "Histogram",
                        "link": "/guide/built-in/Histogram"
                    },
                    {
                        "text": "PriceLabels",
                        "link": "/guide/built-in/PriceLabels"
                    },
                    {
                        "text": "Range",
                        "link": "/guide/built-in/Range"
                    },
                    {
                        "text": "Sparse",
                        "link": "/guide/built-in/Sparse"
                    },
                    {
                        "text": "Spline",
                        "link": "/guide/built-in/Spline"
                    },
                    {
                        "text": "Splines",
                        "link": "/guide/built-in/Splines"
                    },
                    {
                        "text": "SuperBands",
                        "link": "/guide/built-in/SuperBands"
                    },
                    {
                        "text": "Trades",
                        "link": "/guide/built-in/Trades"
                    },
                    {
                        "text": "Volume",
                        "link": "/guide/built-in/Volume"
                    },
                    {
                        "text": "VolumeDelta",
                        "link": "/guide/built-in/VolumeDelta"
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
            copyright: 'Copyright © 2022-present, ChartMaster'
        }
    }
}
