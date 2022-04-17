import {v1} from 'uuid';


let initialState = {
    dialogs: [
        {id: v1(), name: 'Dimych'},
        {id: v1(), name: 'Andrey'},
        {id: v1(), name: 'Sveta'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Victor'},
        {id: v1(), name: 'Valera'}
    ],
    messages: [
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'How is your it-kamasutra?'},
        {id: v1(), message: 'Yo'},
        {id: v1(), message: 'Yo'},
        {id: v1(), message: 'Yo'}
    ]
}

export let sendMessageActionCreator = (newMassage: string) => {
    return {
        type: 'SEND-MESSAGE',
        newMassage
    } as const
}

export type DialogsActionType = ReturnType<typeof sendMessageActionCreator>

export type messageDataType = {
    id: string
    message: string
}
export type dialogsDataType = {
    id: string
    name: string
}
export type dialogsPageType = {
    dialogs: Array<dialogsDataType>,
    messages: Array<messageDataType>,
}

const dialogsReducer = (state: dialogsPageType = initialState, action: DialogsActionType): dialogsPageType => {

    switch (action.type) {
        case 'SEND-MESSAGE': {
            const newMassage: messageDataType = {
                id: v1(),
                message: action.newMassage
            }

            return {
                ...state,
                messages: [...state.messages, newMassage]
            }
            // stateCopy.messages = [...state.messages]
            // stateCopy.messages.push(newMassage)
            // stateCopy.newMassageText = ''
        }
        default :
            return state
    }
}

export default dialogsReducer;