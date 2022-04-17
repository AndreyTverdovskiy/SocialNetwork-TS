import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {dialogsPageType} from "../../redux/dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {TextArea} from "../common/FormsControls/FormsControls";

type propsDialogType = {
    dialogPage: dialogsPageType
    newMassageText: string
    sendMessage: (newMassage: string) => void
    updateNewMessageAction: (text: string) => void

}
type AddMessageFormType = {
    newMassageBody: string
}

function Dialogs(props: propsDialogType) {

    let dialogsElements = props.dialogPage.dialogs.map(d =>
        <DialogItem key={d.id}
                    name={d.name}
                    id={d.id}
        />
    )

    let messagesElements = props.dialogPage.messages.map(m =>
        <Message key={m.id}
                 message={m.message}
        />
    )

    // let newSendMassage = React.createRef<HTMLTextAreaElement>()

    const maxLength50 = maxLengthCreator(50)
    const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={'newMassageBody'}
                           component={TextArea}
                           placeholder={'Enter your massage'}
                           validate={[required, maxLength50]}
                    />
                </div>
                <div>
                    <button>Send</button>
                </div>
            </form>
        )
    }

    const AddMessageFormReduxForm = reduxForm<AddMessageFormType>({form: 'dialogAddForm'})(AddMessageForm)

    const onSubmit = (formData: AddMessageFormType) => {
        props.sendMessage(formData.newMassageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}


export default Dialogs;