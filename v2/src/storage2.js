// Compare-before-write protects against a stale tab replacing a newer save.
export function writeSave(storage,key,state,expected){try{let current=storage.getItem(key);if(current!==expected)return {ok:false,conflict:true};let raw=JSON.stringify(state);storage.setItem(key,raw);return {ok:true,raw}}catch{return {ok:false,unavailable:true}}}
export function backup(storage,key,raw){try{storage.setItem(key,raw);return true}catch{return false}}
