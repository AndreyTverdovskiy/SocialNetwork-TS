import React from "react";
import {usersDataType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type UserPropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    users: Array<usersDataType>,
    followingInProgress: string[],

    onPageChanged: (page: number) => void,
    followThunkCreator: (userId: string) => void
    unfollowThunkCreator: (userId: string) => void
}


let Users = (props: UserPropsType) => {

    return <div>
        <Paginator totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}/>
        <div>
            {
                props.users.map(u =>
                    <User key={u.id}
                          user={u}
                          followingInProgress={props.followingInProgress}
                          followThunkCreator={props.followThunkCreator}
                          unfollowThunkCreator={props.unfollowThunkCreator}
                    />
                )
            }
        </div>
    </div>
}

export default Users