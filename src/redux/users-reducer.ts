import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

export type locationType = {
    city: string
    country: string
}
export type photoTypeType = {
    small: string
    large: string
}

export type usersDataType = {
    name: string
    id: string
    photos: photoTypeType
    status: string
    followed: boolean

    location: locationType
}
export type usersPageType = {
    users: Array<usersDataType>
    pageSize: number
    totalUsersCount: number
    currentPage: number,
    isFetching: boolean,
    followingInProgress: string[]
}


let initialState: usersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []

}
// Action Creators (AC)
export const follow = (userId: string) => {
    return {
        type: 'FOLLOW',
        userId
    } as const
}
export let unfollow = (userId: string) => {
    return {
        type: 'UNFOLLOW',
        userId
    } as const
}
export let setUsers = (users: Array<usersDataType>) => {
    return {
        type: 'SET-USERS',
        users
    } as const
}
export let setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
}
export let setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: 'SET-TOTAL-USER-COUNT',
        totalUsersCount
    } as const
}
export let toggleFetching = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        isFetching
    } as const
}
export let toggleFollowingProgress = (followingInProgress: boolean, userId: string) => {
    return {
        type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
        followingInProgress,
        userId
    } as const
}

export type UsersActionType = ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleFetching>
    | ReturnType<typeof toggleFollowingProgress>

//Thunks
export const requestUsersThunkCreator = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleFetching(true))
    dispatch(setCurrentPage(page))

    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}


const followUnfollowFlow = async (dispatch: Dispatch, userId: string, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}


export const followThunkCreator = (userId: string) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI)
    followUnfollowFlow(dispatch, userId, apiMethod, follow)

}

export const unfollowThunkCreator = (userId: string) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI)
    followUnfollowFlow(dispatch, userId, apiMethod, unfollow)

}


const usersReducer = (state: usersPageType = initialState, action: UsersActionType): usersPageType => {

    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                // users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                // users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case "SET-USERS": {
            return {
                ...state,
                users: action.users
            }
        }
        case "SET-CURRENT-PAGE": {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case "SET-TOTAL-USER-COUNT": {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case "TOGGLE-IS-FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case "TOGGLE-IS-FOLLOWING-PROGRESS": {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}
export default usersReducer;