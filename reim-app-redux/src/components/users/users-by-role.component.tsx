import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { environment } from '../../environment';
import User from '../../models/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import Reim from '../../models/reim';
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

export class UsersByRole extends Component<IProps, IComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            roles: [],
            roleDropdown: {
                isOpen: false,
                selection: 'All'
            }
        };
    }

    async componentDidMount() {
        this.getUsers();
        this.getRoles();
    }

    getUsers = async () => {
        const resp = await fetch(environment.context + '/users', {
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



    getRoles = async () => {
        const resp = await fetch(environment.context + '/role', {
            credentials: 'include'
        });
        const roles = await resp.json();
        this.setState({
            roles
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

    approveReim = async(UserId: number) => {
        const result = await fetch(environment.context + '/reim', {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({
                id: UserId,
                status: null
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        const updatedUser = await result.json();
        this.setState({
            ...this.state,
            users: this.state.users.map(user => {
                if(user.id === updatedUser.id) {
                    return updatedUser;
                } else {
                    return user;
                }
            })
        })
    }



    getUpdateOption = (reim: Reim) => {
        if(this.props.currentUser) {
            const pen = 'pending'
            if (!reim.resolver) {
                return <td>
                    <Button color="success" onClick={() => this.approveReim(reim.reimId)}>Approved</Button>
                </td>
            }
        }
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
                        <DropdownItem onClick={this.getUsers}>All</DropdownItem>
                        <DropdownItem divider />
                        {
                            this.state.roles.map(role => (
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

export default connect(mapStateToProps)(UsersByRole);