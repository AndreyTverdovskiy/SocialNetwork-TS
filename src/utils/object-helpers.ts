import {usersDataType} from "../redux/users-reducer";

export const updateObjectInArray = (items:Array<usersDataType>, itemId:string, objPropName: string, newObjProps:any) => {
    items.map(u => {
        // if (u[objPropName] === itemId) {
        if (u['id'] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}