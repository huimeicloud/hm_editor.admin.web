/**
 * 部署配置
 */
declare var _config:any
export const DeploymentConfig = {
    /**
     * 版本号
     */
    VERSION: '1.0',

    /**
     * 服务端地址注册表
     */
    SERVER_URL: _config.Server,
    SERVER_URL_DEFINED: _config.SERVER_URL_DEFINED,

    /**
     * ECharts地图数据
     */
    ECHARTS_MAPS: [
    ]
};
