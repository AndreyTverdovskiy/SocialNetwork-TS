import React from 'react';

import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatusTC, profileType, getUserProfileThunkCreator, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";



type MapStatePropsType = {
    profile: profileType
    status: string
    myId: string
    isAuth:boolean
}
type MapDispatchPropsType = {
    setUserProfile: (profile: profileType) => void
    getUserProfileThunkCreator: (userId: string) => void
    getStatusTC: (userId: string) => void
    updateStatus: (status:string) => void

}
type OwnPropsProfileType = MapStatePropsType & MapDispatchPropsType

type PathParamsType = {
    userId: string
}

type PropsProfileType = RouteComponentProps<PathParamsType> & OwnPropsProfileType

class ProfileClassContainer extends React.Component<PropsProfileType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.myId
            if (!userId){
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfileThunkCreator(userId)
        this.props.getStatusTC(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
            />
        )
    }
}


let mapStateToProps = (reduxStore: AppStateType): MapStatePropsType => (
    {
        profile: reduxStore.profilePage.profile,
        status: reduxStore.profilePage.status,
        myId: reduxStore.auth.userId,
        isAuth: reduxStore.auth.isAuth

    }
)


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileThunkCreator, getStatusTC, updateStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileClassContainer)