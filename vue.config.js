module.exports = {
    //publicPath: '/wustvolunteer/', //公共路径
    publicPath: './', //公共路径
    outputDir: process.env.VUE_APP_ENV ==='production'?'volunteer':'volunteer-test', //输出文件目录
    assetsDir: 'static', //静态资源文件名称
    filenameHashing: false, //文件名是否包含hash
    lintOnSave: false, //是否使用eslint
    productionSourceMap: false // 生产环境的 source map
};
