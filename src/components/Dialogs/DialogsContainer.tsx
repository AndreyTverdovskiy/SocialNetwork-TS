import {dialogsPageType, sendMessageActionCreator} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Dialogs from "./Dialogs";

type MapStatePropsType = {
    dialogPage: dialogsPageType
    // newMassageText: string
}
let mapStateToProps = (reduxStore: AppStateType): MapStatePropsType => {
    return {
        dialogPage: reduxStore.dialogsPage,
        // newMassageText: reduxStore.dialogsPage.newMassageText,
    }
}
type mapDispatchPropsType = {
    sendMessage: (newMassage: string) => void
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        sendMessage: (newMassage: string) => {
            dispatch(sendMessageActionCreator(newMassage))
        }
    }
}


export default compose<React.ComponentType>
(connect
    (mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)
(Dialogs)