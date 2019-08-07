import React, { Component } from 'react';
import User from '../../models/user';
import Role from '../../models/role';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import { environment } from '../../environment';



interface IProps {
    currentUser?: User
}

interface IComponentState {
    users: User[],
    roles: Role[]
}

export class EditUser extends Component<IProps, IComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            roles: []
        };
    }


    

    render() {
        return (
            <form className="form-edituser" >

                <h1 className="h3 mb-3 font-weight-normal">Edit User : {this.props.currentUser && this.props.currentUser.id}</h1>

                <p>User Name : </p>
                <input type="text" id="inputFname"
                    name="fname"
                    className="form-control"
                    value={this.props.currentUser && this.props.currentUser.username} />

                <p>First Name : </p>
                <input type="text" id="inputFname"
                    name="fname"
                    className="form-control"
                    
                    value={this.props.currentUser && this.props.currentUser.firstName} />

                <p>Last Name : </p>
                <input type="text" id="inputAmount"
                    name="username"
                    className="form-control"
                    value={this.props.currentUser && this.props.currentUser.lastName} />

                <p>email : </p>
                <input type="text" id="inputAmount"
                    name="username"
                    className="form-control"
                    value={this.props.currentUser && this.props.currentUser.email} />

                <p>phone : </p>
                <input type="text" id="inputAmount"
                    name="username"
                    className="form-control"
                    value={this.props.currentUser && this.props.currentUser.phone} />

                <p>Password :</p>
                <input type="text" id="inputAmount"
                    name="username"
                    className="form-control"
                    placeholder= "password"/>
                <p />

                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
            </form>


        );
    }
}
const mapStateToProps = (state: IState) => ({
    currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(EditUser);