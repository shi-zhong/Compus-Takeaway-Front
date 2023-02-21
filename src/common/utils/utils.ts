import Taro from "@tarojs/taro";
import EventEmitter  from "events";

function getTotal(){
    let buffer = Taro.getStorageSync("buffer");
    let total = 0,sum = 0;
    Object.keys(buffer).map(item => {
        let {price,quantity} = buffer[item];
        sum += quantity;
        total += price*quantity;
    })
    return {sum,total};
}

const Event = new EventEmitter();

export {
    getTotal,
    Event
}