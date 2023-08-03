import { UserConfig, DefaultTheme } from 'vitepress'

export default {
    title: 'wheater',
    description: '解决js/ts一些微不足道的小事情',
    appearance: 'dark',
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
            getRouters('guide','types',['page', 'tree']),
            getRouters('guide','utils',['array', 'creator', 'date', 'deep', 'validator']),
            getRouters('guide','models',['tree'])
        ],
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