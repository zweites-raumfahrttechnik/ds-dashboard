//添加用户功能
import { Random } from 'mockjs';
export interface UserFormlist{
    uuid:string,
    type:1|2|3,
    username:string,
    host?:string,
    password?:string,
}
export const defaultUserFormlist: Record<number, Omit<UserFormlist, 'type'>> = {
    1:{
        uuid:"@uuid",
        username:'',
        host:'',
        password:''
    },
    2:{
        uuid:"@uuid",
        username:'',
        host:'',
        password:''
    },
    3:{
        uuid:"@uuid",
        username:'',
        host:'',
        password:''
    },
}
