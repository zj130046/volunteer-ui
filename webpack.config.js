module.exports = {
    // devServer:{
    //     proxy:{
    //         '/volunteer':{
    //             target:'http://121.36.13.135:33160/volunteer'
    //         }
    //     }
    // },
    rules: [
        {
            test: /\.s(c|a)ss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        implementation: require('sass'),
                        fiber: require('fibers'),
                        indentedSyntax: true // optional
                    }
                }
            ]
        }
    ]
};