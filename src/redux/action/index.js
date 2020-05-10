// src\redux\action\index.js
/*
* Action类型:用户事件操作
*/
export const type = {
    SWITCH_MENU:'SWITCH'
}

export function switchMenu(menuName) {
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}