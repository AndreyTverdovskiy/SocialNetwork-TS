import axios from "axios";
import {profileType} from "../redux/profile-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "f5ff3888-6c31-4dc3-96de-41cb84342d46"
    }
})

export const usersAPI = {

    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(id: string) {
        return instance.post(`/follow/${id}`)
            .then(response => response.data)
    },
    unfollow(id: string) {
        return instance.delete((`/follow/${id}`))
            .then(response => response.data)
    },
    getProfile(userId: string) {
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<profileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId: string) {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`/profile/status`, {status})
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email:string, password:string, rememberMe:boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}



