import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow, followThunkCreator, requestUsersThunkCreator,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow, unfollowThunkCreator,
    usersPageType
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from "../../redux/users-selectors";


type PropsUsersType = {
    usersPage: usersPageType
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: any,

    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setCurrentPage: (page: number) => void
    toggleFollowingProgress: (value: boolean, id: string) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    followThunkCreator: (userId: string) => void
    unfollowThunkCreator: (userId: string) => void
}

class UsersClassContainer extends React.Component<PropsUsersType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersThunkCreator(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsersThunkCreator(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.usersPage.users}
                   followingInProgress={this.props.followingInProgress}
                   followThunkCreator={this.props.followThunkCreator}
                   unfollowThunkCreator={this.props.unfollowThunkCreator}

            />
        </>
    }
}

let mapStateToProps = (reduxStore: AppStateType) => {
    return {
        usersPage: getUsers(reduxStore),
        pageSize: getPageSize(reduxStore),
        totalUsersCount: getTotalUsersCount(reduxStore),
        currentPage: getCurrentPage(reduxStore),
        isFetching: getIsFetching(reduxStore),
        followingInProgress: getFollowingInProgress(reduxStore)
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,

        getUsersThunkCreator: requestUsersThunkCreator,
        followThunkCreator,
        unfollowThunkCreator,
    })
)(UsersClassContainer)