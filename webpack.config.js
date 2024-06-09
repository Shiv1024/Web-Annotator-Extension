const CopyPlugin= require('copy-webpack-plugin');
const path=require('path')
const HtmlPlugin=require('html-webpack-plugin');
const tailwind = require('tailwind');
const autoprefixer = require('autoprefixer');
const tailwindcss=require('tailwindcss')

module.exports={
    mode:"development",
    devtool:'cheap-module-source-map',
    entry:{
        popup:path.resolve('./src/popup/popup.tsx'),
        background:path.resolve('./Public/background.ts'),
        content:path.resolve('./Public/content.ts'),
        App:path.resolve('./src/components/App.tsx'),
      
        
        
    },
    module:{
        rules:[
            {
                use:"ts-loader",
                test:/\.tsx$/,
                exclude: /node_modules/
            },
            {
                use:"ts-loader",
                test:/\.ts$/,
                exclude: /node_modules/
            },
            
            {
                use:['style-loader','css-loader',{
                    loader:'postcss-loader',
                    options:{
                        postcssOptions:{
                            ident:'postcss',
                            plugins:[tailwindcss,autoprefixer],
                        }
                    }
                }],
                test:/\.css$/i,

            }
        ]

    },
    plugins:[
        new CopyPlugin({
            patterns:[
                {from:path.resolve('src/manifest.json'),
                to:path.resolve('dist')
                },

            ],
        }),
        ...getHtmlPlugins([
            'popup',
            'App',
       
            
        ])
    ],
    resolve:{
        extensions:['.tsx','.ts','.js']
    },
    output:{
        filename:'[name].js'
    }
}
function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }))
}