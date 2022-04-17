import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css'

type StatusType = {
    status: string
    updateStatus: (status: string) => void
}


class ProfileStatus extends React.Component<StatusType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<StatusType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }


    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status || "==="}
                        </span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true}
                               onBlur={this.deactivateEditMode}
                               value={this.state.status}
                               onChange={this.onStatusChange}
                        />
                    </div>
                }
            </div>
        );
    }


}

export default ProfileStatus;