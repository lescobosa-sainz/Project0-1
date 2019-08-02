import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { environment } from '../../environment';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import Role from '../../models/role';
import User from '../../models/user';

interface IProps {
    currentUser?: User
}

interface IComponentState {
    users: User[],
    role: Role[],
    roleDropdown: {
        isOpen: boolean,
        selection: string
    }
}

export class Users extends Component<IProps, IComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            role: [],
            roleDropdown: {
                isOpen: false,
                selection: 'All'
            }
        };
    }

    async componentDidMount() {
        this.getUser();
        this.getRole();
    }

    getUser = async () => {
        const resp = await fetch(environment.context + '/user', {
            credentials: 'include'
        });
        const usersFromServer = await resp.json();
        this.setState({
            users: usersFromServer,
            roleDropdown: {
                ...this.state.roleDropdown,
                selection: 'All'
            }
        });
        console.log(usersFromServer);
    }

    getUsersByRoleId = async (role: Role) => {
        const resp = await fetch(environment.context + '/user/role/' + role.id, {
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


    getRole = async () => {
        const resp = await fetch(environment.context + '/role', {
            credentials: 'include'
        });
        const role = await resp.json();
        this.setState({
            role
        });
    }

    toggleRoleDropdown = () => {
        this.setState({
            roleDropdown: {
                ...this.state.roleDropdown,
                isOpen: !this.state.roleDropdown.isOpen
            }
        });
    }



    render() {
        const users = this.state.users;
        return (
            <div id="reim-table-container">
                <ButtonDropdown id="reim-Status-dropdown"
                    isOpen={this.state.roleDropdown.isOpen}
                    toggle={this.toggleRoleDropdown}>

                    <DropdownToggle caret>
                        {this.state.roleDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getUser}>All</DropdownItem>
                        <DropdownItem divider />
                        {
                            this.state.role.map(role => (
                                <DropdownItem key={'Status-dropdown-' + role.id}
                                    onClick={() => this.getUsersByRoleId(role)}>
                                    {role.role}
                                </DropdownItem>
                            ))
                        }
                    </DropdownMenu>
                </ButtonDropdown>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Password</th>
                            <th scope="col">Email</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user =>
                                <tr key={'id-' + user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.roleID && user.roleID.role}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(Users);