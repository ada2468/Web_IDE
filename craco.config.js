const path = require('path');

module.exports = {
   webpack: {
        configure: (webpackConfig, { env, paths }) => { 
            paths.appBuild = webpackConfig.output.path = path.resolve('./docs');
            return webpackConfig;  // Important: return the modified config
        }
    }
}