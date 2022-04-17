import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileInfo.module.css'

type StatusType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatusWithHooks = (props: StatusType) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                        <span onDoubleClick={activateEditMode}>
                            {props.status || "***"}
                        </span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true}
                           onBlur={deactivateEditMode}
                           value={status}
                           onChange={onStatusChange}
                    />
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;