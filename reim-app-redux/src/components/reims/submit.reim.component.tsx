import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { environment } from '../../environment';
import User from '../../models/user';
import Role from '../../models/role';


interface IProps { 
    currentUser?: User
}

interface IComponentState {
    users: User[],
    roles: Role[],
    roleDropdown: {
        isOpen: boolean,
        selection: string
    }
}


export class SubmitReim extends Component<IProps, IComponentState> {



    getUsersByRoleId = async (role: Role) => {
        const resp = await fetch(environment.context + '/users/role/' + role.id, {
            credentials: 'include'
        });
        const usersFromServer = await resp.json();
        this.setState({
            users: usersFromServer,
            roleDropdown: {
                ...this.state.roleDropdown,
                selection: role.role
            }
        });
        console.log(usersFromServer);
    }




    render() {
        return (
            <form className="form-signin" >
            <h1 className="h3 mb-3 font-weight-normal">submit reimbursement</h1>
            <label htmlFor="inputAmount" className="sr-only">Amount</label>
            <input type="text" id="inputAmount" 
                name="username"
                className="form-control"
                placeholder="amount"  />
              <label htmlFor="inputType" className="sr-only">Type</label>
            <input type="text" id="inputType" 
                name="type"
                className="form-control"
                placeholder="type"  />
                    <label htmlFor="inputUsername" className="sr-only">description</label>
            <input type="text" id="inputDescription" 
                name="description"
                className="form-control"
                placeholder="description"  />
          

            <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
        </form>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(SubmitReim);
