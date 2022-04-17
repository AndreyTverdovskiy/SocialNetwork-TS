import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {usersDataType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom"

type UserPropsType = {
    user: usersDataType,
    followingInProgress: string[],
    followThunkCreator: (userId: string) => void,
    unfollowThunkCreator: (userId: string) => void,
}


let User = (props: UserPropsType) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + props.user.id}>
                        <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto}
                             className={styles.userPhoto}/>
                    </NavLink>
                </div>

                <div>
                    {props.user.followed
                        ?
                        <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                onClick={() => {props.unfollowThunkCreator(props.user.id)}}>
                            Unfollow
                        </button>
                        : <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                  onClick={() => {props.followThunkCreator(props.user.id)}}>
                            Follow
                        </button>}
                </div>
            </span>

            <span>
                <span>
                    <div>{props.user.name}</div>
                    <div>{props.user.status}</div>
                </span>
                <span>
                    <div>{'props.user.location.country'}</div>
                    <div>{'props.user.location.city'}</div>
                </span>
            </span>
        </div>
    )

}

export default User