import React, { Component } from 'react';
import User from "../../models/user";
import { IState } from "../../reducers";
import { connect } from "react-redux";


interface IProps {
    currentUser?: User
}

export class JustUser extends Component<IProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
      
        return (

            <div>
                <li className="nav-item active">
                    {this.props.currentUser && this.props.currentUser.username} hi
                </li>
            </div>

        )
    }
}

const mapStateToProps = (state: IState) => ({
    currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(JustUser);