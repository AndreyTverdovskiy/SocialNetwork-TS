import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {postDataType} from "../../../redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControls/FormsControls";

type MyPostPropsType = {
    posts: Array<postDataType>
    addPost: (message: string) => void
}
type AddPostFormType = {
    newPostBody: string
}

const MyPosts = React.memo( (props: MyPostPropsType) => {
    const maxLength10 = maxLengthCreator(10)

    const AddPostForm: React.FC<InjectedFormProps<AddPostFormType>> = React.memo((props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={'newPostBody'}
                           component={TextArea}
                           placeholder={'Post text'}
                           validate={[required, maxLength10]}/>
                </div>

                <div>
                    <button>Add post</button>
                </div>
            </form>
        )
    })

    const AddPostFormReduxForm = reduxForm<AddPostFormType>({form: 'postForm'})(AddPostForm)

    const onSubmit = (formData: AddPostFormType) => {
        props.addPost(formData.newPostBody)
    }
    let postsElements = props.posts.map(p => <Post key={p.id}
                                                   message={p.message}
                                                   counts={p.counts}/>
    )

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <AddPostFormReduxForm onSubmit={onSubmit}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

export default MyPosts;