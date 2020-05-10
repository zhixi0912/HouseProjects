// src\redux\reducer\index.js
/*
 * Reducer: 数据处理
 */
import {type} from "../action";
const initalState = {
    menuName: "1"
}

const ebikeData = (state = initalState,action)=>{
    switch (action.type) {
        case type.SWITCH_MENU:
        {
            // console.log("action",action)
            const newState =JSON.parse(JSON.stringify(state))
            if(action){

            }
            newState.menuName = action.menuName
            // console.log("newState",newState)
            return newState

        }
        default:
            return state

    }
}


export default ebikeData;