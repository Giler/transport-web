/**
 * Created by aweakcoder on 16/10/09.
 */
import Api from '@/common/api.js';
import Axios from 'axios'

//配置接口信息
let token = localStorage.getItem('token') || '';
let _base = Api.domain + "/admin"
//配置接口信息
Axios.defaults.baseURL = _base;
Axios.defaults.headers.common['X-Nideshop-Token'] = token;

Axios.interceptors.response.use(
	response => {
		console.log("interceptors", response);
		if(response.data.errno == 401){
			// 未登录
			location.replace(`/lexis-admin/?${Math.random()}#login`)
		}else{
			return response.data;
		}
	}
);

let request = function(config) {
    let _req = null;
    if(config.type && config.type == 'post'){
        _req = Axios.post(config.url || '', config.data)
    }else{
      _req = Axios.get(config.url || '', {
          params: config.data
      })
    }
    return _req
}
export default request
