import Config from '@/common/config.js';

let domain = Config.global_env == "dev" ? "http://127.0.0.1:8007" : "http://123.56.221.25:8007"
// 宏伟的接口ip
 let Apidomain = Config.global_env == "dev" ? "http://39.106.48.98:80/" : "http://39.106.48.98:80/"
//let Apidomain = Config.global_env == "dev" ? "http://localhost:8090/" : "http://39.106.48.98:8080/"
// 上传图片地址
let Uploaddomain = Config.global_env == "dev" ? "http://app.lexislive.com.cn/" : "http://app.lexislive.com.cn"

const api = {
    domain: domain,
    Apidomain: Apidomain,
    Uploaddomain: Uploaddomain
};

export default api