import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import s from '../common/FormsControls/FormsControls.module.css'


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type loginPropsType = {
    isAuth: boolean,
    loginTC: (email: string, password: string, rememberMe: boolean) => void
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            {createField(null, 'RememberMe', [], Input, {type: 'checkbox'}, 'Remember me')}

            {error &&
                <div className={s.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: loginPropsType) => {

    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
        props.loginTC(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {loginTC})(Login)

