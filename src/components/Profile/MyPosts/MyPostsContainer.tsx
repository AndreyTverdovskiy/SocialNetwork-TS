import MyPosts from "./MyPosts";
import {addPost, profilePageType} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type mapDispatchPropsType = {
    addPost: (message: string) => void
}

let mapStateToProps = (reduxStore: AppStateType): profilePageType => {
    return {
        posts: reduxStore.profilePage.posts,
        profile: reduxStore.profilePage.profile,
        status: reduxStore.profilePage.status
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        addPost: (message: string) => {
            dispatch(addPost(message))
        }
    }

}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;