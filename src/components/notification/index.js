// import React from 'react'
import { notification  } from 'antd';
const show = function (msg,type,cb) {
    notification[type]({
        message: '提示',
        description: msg,
        onClose:cb
    });
};

let showMsg = {
    success(msg, cb){
        show(msg,"success",cb)
    },
    info(msg,cb){
        show(msg, "info",cb)
    },
    warn(msg,cb){
        show(msg, "warning",cb)
    },
    error(msg,cb){
        show(msg, "error",cb)
    }
}

export default showMsg