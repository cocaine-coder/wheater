import { UserConfig, DefaultTheme } from 'vitepress'

export default {
    title: 'wheater',
    description: '解决js/ts微不足道的小事情',
    appearance: 'dark',
    base: '/wheater/',
    head: [
        [
            'link', { rel: 'icon', href: '/logo.svg' }
        ]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        logo: '/logo.svg',
        sidebar: [
            {
                text: '介绍',
                collapsed: true,
                items: [
                    { text: '什么是wheater', link: '/guide/introduction/' },
                    { text: '安装', link: '/guide/introduction/install' },
                    { text: '反馈', link: '/guide/introduction/feedback' }
                ]
            },
            getRouters('guide', 'types', ['page', 'tree']),
            getRouters('guide', 'utils', ['array', 'creator', 'date', 'deep', 'validator','common']),
            getRouters('guide', 'models', ['tree'])
        ],
        socialLinks: [{ icon: 'github', link: "https://github.com/cocaine-coder/wheater" }]
    }
} as UserConfig<DefaultTheme.Config>

function getRouters(first: string, second: string, thirds: string[]) {
    return {
        text: second,
        collapsed: true,
        link: `/${first}/${second}/`,
        items: thirds.map(x => {
            return {
                text: x,
                link: `/${first}/${second}/${x}`
            }
        })
    }
}