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
               text: '0.4.0',
               items: [
                 { text: '0.4.0', link: 'https://www.npmjs.com/package/night-vision' },
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
                    },
                    {
                        text: 'Script Object',
                        link: '/guide/data-struct/script-object'
                    }
                ]
            },
            {
                text: 'NavyJS',
                items: [
                    {
                        text: 'Scripts Intro',
                        link: '/guide/navy-js/scripts-intro'
                    },
                    {
                        text: 'Overlay Scripts',
                        link: '/guide/navy-js/overlay-scripts'
                    },
                    {
                        text: 'Indicator Scripts',
                        link: '/guide/navy-js/indicator-scripts'
                    },
                    {
                        text: 'Advanced Stuff',
                        link: '/guide/navy-js/advanced-stuff'
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
                        text: 'SE Client API',
                        link: '/guide/api/se-client-api'
                    },
                    {
                        text: 'Navy JS API',
                        link: '/guide/api/navy-api'
                    },
                    {
                        text: 'SE STD Library',
                        link: '/guide/api/se-std-lib'
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
                        "text": "AppleArea",
                        "link": "/guide/built-in-overlays/AppleArea"
                    },
                    {
                        "text": "Area",
                        "link": "/guide/built-in-overlays/Area"
                    },
                    {
                        "text": "ArrowTrades",
                        "link": "/guide/built-in-overlays/ArrowTrades"
                    },
                    {
                        "text": "Band",
                        "link": "/guide/built-in-overlays/Band"
                    },
                    {
                        "text": "Candles",
                        "link": "/guide/built-in-overlays/Candles"
                    },
                    {
                        "text": "CandlesPlus",
                        "link": "/guide/built-in-overlays/CandlesPlus"
                    },
                    {
                        "text": "Cloud",
                        "link": "/guide/built-in-overlays/Cloud"
                    },
                    {
                        "text": "Histogram",
                        "link": "/guide/built-in-overlays/Histogram"
                    },
                    {
                        "text": "PriceLabels",
                        "link": "/guide/built-in-overlays/PriceLabels"
                    },
                    {
                        "text": "Range",
                        "link": "/guide/built-in-overlays/Range"
                    },
                    {
                        "text": "RangeTool",
                        "link": "/guide/built-in-overlays/RangeTool"
                    },
                    {
                        "text": "Sparse",
                        "link": "/guide/built-in-overlays/Sparse"
                    },
                    {
                        "text": "Spline",
                        "link": "/guide/built-in-overlays/Spline"
                    },
                    {
                        "text": "Splines",
                        "link": "/guide/built-in-overlays/Splines"
                    },
                    {
                        "text": "SuperBands",
                        "link": "/guide/built-in-overlays/SuperBands"
                    },
                    {
                        "text": "Trades",
                        "link": "/guide/built-in-overlays/Trades"
                    },
                    {
                        "text": "Volume",
                        "link": "/guide/built-in-overlays/Volume"
                    },
                    {
                        "text": "VolumeDelta",
                        "link": "/guide/built-in-overlays/VolumeDelta"
                    }
                ]
            },
            {
                text: 'Built-in Indicators',
                collapsible: true,
                collapsed: true,
                items: [
                    {
                        "text": "ALMA",
                        "link": "/guide/built-in-indicators/ALMA"
                    },
                    {
                        "text": "ATR",
                        "link": "/guide/built-in-indicators/ATR"
                    },
                    {
                        "text": "ATRp",
                        "link": "/guide/built-in-indicators/ATRp"
                    },
                    {
                        "text": "BB",
                        "link": "/guide/built-in-indicators/BB"
                    },
                    {
                        "text": "BBW",
                        "link": "/guide/built-in-indicators/BBW"
                    },
                    {
                        "text": "CCI",
                        "link": "/guide/built-in-indicators/CCI"
                    },
                    {
                        "text": "CMO",
                        "link": "/guide/built-in-indicators/CMO"
                    },
                    {
                        "text": "COG",
                        "link": "/guide/built-in-indicators/COG"
                    },
                    {
                        "text": "DMI",
                        "link": "/guide/built-in-indicators/DMI"
                    },
                    {
                        "text": "EMA",
                        "link": "/guide/built-in-indicators/EMA"
                    },
                    {
                        "text": "HMA",
                        "link": "/guide/built-in-indicators/HMA"
                    },
                    {
                        "text": "Ichimoku",
                        "link": "/guide/built-in-indicators/Ichimoku"
                    },
                    {
                        "text": "KC",
                        "link": "/guide/built-in-indicators/KC"
                    },
                    {
                        "text": "KCW",
                        "link": "/guide/built-in-indicators/KCW"
                    },
                    {
                        "text": "MACD",
                        "link": "/guide/built-in-indicators/MACD"
                    },
                    {
                        "text": "MFI",
                        "link": "/guide/built-in-indicators/MFI"
                    },
                    {
                        "text": "MOM",
                        "link": "/guide/built-in-indicators/MOM"
                    },
                    {
                        "text": "ROC",
                        "link": "/guide/built-in-indicators/ROC"
                    },
                    {
                        "text": "RSI",
                        "link": "/guide/built-in-indicators/RSI"
                    },
                    {
                        "text": "Ribbon",
                        "link": "/guide/built-in-indicators/Ribbon"
                    },
                    {
                        "text": "SAR",
                        "link": "/guide/built-in-indicators/SAR"
                    },
                    {
                        "text": "SMA",
                        "link": "/guide/built-in-indicators/SMA"
                    },
                    {
                        "text": "SWMA",
                        "link": "/guide/built-in-indicators/SWMA"
                    },
                    {
                        "text": "Stoch",
                        "link": "/guide/built-in-indicators/Stoch"
                    },
                    {
                        "text": "TSI",
                        "link": "/guide/built-in-indicators/TSI"
                    },
                    {
                        "text": "VWMA",
                        "link": "/guide/built-in-indicators/VWMA"
                    },
                    {
                        "text": "WilliamsR",
                        "link": "/guide/built-in-indicators/WilliamsR"
                    }
                ]
            }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present, ChartMaster'
        }
    }
}
