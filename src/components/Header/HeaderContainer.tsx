import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logoutTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type HeaderClassContainerPropsType = {
    login: string
    isAuth: boolean
    logoutTC: () => void
}


class HeaderClassContainer extends React.Component<HeaderClassContainerPropsType> {

    render() {
        return <Header login={this.props.login}
                       isAuth={this.props.isAuth}
                       logoutTC={this.props.logoutTC}
        />
    }
}

type mapStateToPropsType = {
    login: string
    isAuth: boolean
}

const mapStateToProps = (reduxStore: AppStateType): mapStateToPropsType => {
    return {
        login: reduxStore.auth.login,
        isAuth: reduxStore.auth.isAuth,
    }
};
const HeaderContainer = connect(mapStateToProps, {logoutTC})(HeaderClassContainer)

export default HeaderContainer;