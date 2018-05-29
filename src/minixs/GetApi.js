import MD5 from "js-md5"
export function GetPinDuoDuoApi(data) {
    //获取unix时间戳
   data.timestamp = new Date().getTime()
   //需要加密的字符串
   let EchoString = `${data.client_secret}client_id${data.client_id}data_type${data.data_type}page${data.page}page_size${data.page_size}sort_type${data.sort_type}timestamp${data.timestamp}type${data.type}with_coupon${data.with_coupon}${data.client_secret}`
   //生成签名
   data.sign = (MD5(EchoString)).toUpperCase()
   //返回Api
   return `http://gw-api.pinduoduo.com/api/router?client_id=${data.client_id}&data_type=${data.data_type}&page=${data.page}&page_size=${data.page_size}&sort_type=${data.sort_type}&timestamp=${data.timestamp}&type=${data.type}&with_coupon=${data.with_coupon}&sign=${data.sign}`
}