import React from 'react';
import s from './ProfileInfo.module.css'
import {profileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoPropsType = {
    profile: profileType
    status: string

    updateStatus: (status: string) => void
}

function ProfileInfo(props: ProfileInfoPropsType) {
    const {profile,status, updateStatus} = props
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos?.large}/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <div>
                    {props.profile.aboutMe}
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;