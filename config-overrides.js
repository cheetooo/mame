module.exports = {
    webpack:function(config, env){
        // console.log(config)
        return config
    },
    devServer: function(configFunction){
        return  function(proxy,allowedHost){
            const  config  =  configFunction(proxy,allowedHost);
            config.historyApiFallback = true;
            config.host = '192.168.2.95';
            return config
        }
    }
}