import {v1} from 'uuid';
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

export type postDataType = {
    id: string
    message: string
    counts: number
}

export type contactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type photoTypeType = {
    small: string
    large: string
}
export type profileType = {
    userId: number
    aboutMe: string
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    photos: photoTypeType
}
export type profilePageType = {
    posts: Array<postDataType>
    profile: profileType
    status: string
}

let initialState: profilePageType = {
    posts: [
        {id: v1(), message: 'Hi, how are you?', counts: 5},
        {id: v1(), message: 'It is my first post', counts: 8}
    ],
    profile: {} as profileType,
    status: ''
}

//ActionCreators
export let addPost = (message: string) => {
    return {
        type: 'ADD-POST',
        message
    } as const
}
export let setUserProfile = (profile: profileType) => {
    return {
        type: 'SET-USER-PROFILE',
        profile
    } as const
}
export let setStatus = (status: string) => {
    return {
        type: 'SET-STATUS',
        status
    } as const
}
export let deletePost = (postId: string) => {
    return {
        type: 'DELETE-POST',
        postId
    } as const
}

export type ProfileActionType = ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>

//Thunk
export const getUserProfileThunkCreator = (userId: string) => async (dispatch: Dispatch) => {
    let data = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}
export const getStatusTC = (userId: string) => async (dispatch: Dispatch) => {
    let res = await profileAPI.getStatus(userId)
    dispatch(setStatus(res.data))
}
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let res = await profileAPI.updateStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}


const profileReducer = (state: profilePageType = initialState, action: ProfileActionType): profilePageType => {

    switch (action.type) {
        case 'ADD-POST': {
            let newPost: postDataType = {
                id: v1(),
                message: action.message,
                counts: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
            // stateCopy.posts = [...state.posts]
            // stateCopy.posts.push(newPost)
            // stateCopy.newPostText = ''
        }

        case "SET-USER-PROFILE": {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET-STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'DELETE-POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        default:
            return state
    }
}
export default profileReducer;