import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { environment } from '../../environment';
import User from '../../models/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import Reim from '../../models/reim';

interface IProps {
    currentUser?: User
}

interface IComponentState {
    reims: Reim[],
    users: User[],
    usersDropdown: {
        isOpen: boolean,
        selection: string
    }
}

export class ReimsByCurentUser extends Component<IProps, IComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reims: [],
            users: [],
            usersDropdown: {
                isOpen: false,
                selection: 'All'
            }
        };
    }

    async componentDidMount() {
        this.getReims();
        this.getUsers();
    }

    getReims = async () => {
        const resp = await fetch(environment.context + '/reim', {
            credentials: 'include'
        });
        const reimsFromServer = await resp.json();
        this.setState({
            reims: reimsFromServer,
            usersDropdown: {
                ...this.state.usersDropdown,
                selection: 'All'
            }
        });
        console.log(reimsFromServer);
    }

    getreimsByUserId = async (users: User) => {
        const resp = await fetch(environment.context + '/reim/author/userId/' + users.id, {
            credentials: 'include'
        });
        const reimsFromServer = await resp.json();
        this.setState({
            reims: reimsFromServer,
            usersDropdown: {
                ...this.state.usersDropdown,
                selection: users.username
            }
        });
        console.log(reimsFromServer);
    }


    getUsers = async () => {
        const resp = await fetch(environment.context + '/users/reim/author', {
            credentials: 'include'
        });
        const users = await resp.json();
        this.setState({
            users
        });
    }

    toggleUsersDropdown = () => {
        this.setState({
            usersDropdown: {
                ...this.state.usersDropdown,
                isOpen: !this.state.usersDropdown.isOpen
            }
        });
    }

    approveReim = async(ReimId: number) => {
        const result = await fetch(environment.context + '/reim', {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({
                id: ReimId,
                status: null
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        const updatedReim = await result.json();
        this.setState({
            ...this.state,
            reims: this.state.reims.map(reim => {
                if(reim.reimId === updatedReim.id) {
                    return updatedReim;
                } else {
                    return reim;
                }
            })
        })
    }

   denyReim = async(ReimId: number) => {
        const result = await fetch(environment.context + '/reim', {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({
                id: ReimId,
                status: {
                    id: this.props.currentUser && this.props.currentUser.id
                }
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        const updatedReim = await result.json();
        this.setState({
            ...this.state,
            reims: this.state.reims.map(reim => {
                if(reim.reimId === updatedReim.id) {
                    return updatedReim;
                } else {
                    return reim;
                }
            })
        })
    }

    getAproveOption = (reim: Reim) => {
        if (this.props.currentUser) {
            const pen = 'pending'
            if (!reim.resolver) {
                return <td>
                    <Button color="success" onClick={() => this.approveReim(reim.reimId)}>Approved</Button>
                </td>
            }
        }
    }

    getDeniedOption = (reim: Reim) => {
        if (this.props.currentUser) {
            const pen = 'pending'
             if (!reim.resolver) {
                return <td>
                    <Button color="danger" onClick={() => this.denyReim(reim.reimId)}>Denied</Button>
                </td>
            }
        }
    }

    getReimsByCurentUserID = async () => {
        let curent = this.props.currentUser && this.props.currentUser.id;
        const resp = await fetch(environment.context + '/reim/author/userId/' + Number(curent), {
            credentials: 'include'
        });
        const reimsFromServer = await resp.json();
        this.setState({
            reims: reimsFromServer
        });
        console.log(reimsFromServer);
    }

    render() {
        const reims = this.state.reims;
        return (
            <div id="reim-table-container">
                <ButtonDropdown id="reim-Status-dropdown"
                    isOpen={this.state.usersDropdown.isOpen}
                    toggle={this.toggleUsersDropdown}>

                    <DropdownToggle caret>
                        {this.state.usersDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getReims}>All</DropdownItem>
                        <DropdownItem divider />
                        {
                            this.state.users.map(user => (
                                <DropdownItem key={'Status-dropdown-' + user.id}
                                    onClick={() => this.getreimsByUserId(user)}>
                                    {user.username}
                                </DropdownItem>
                            ))
                        }
                    </DropdownMenu>
                </ButtonDropdown>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                            <th scope="col">Author</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date Submited</th>
                            <th scope="col">Date Resolved</th>
                            <th scope="col">Description</th>
                            <th scope="col">Resolver</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             reims.map(reim =>
                                <tr key={'reimId-' + reim.reimId}>
                                    <td>{reim.reimId}</td>
                                    <td>{reim.author}</td>
                                    <td>{reim.amount}</td>
                                    <td>{reim.dateSubmitted}</td>
                                    <td>{reim.dateResolved}</td>
                                    <td>{reim.description}</td>
                                    <td>{reim.resolver && reim.resolver.username}</td>
                                    <td>{reim.status}</td>
                                    <td>{reim.type}</td>
                                    {this.getAproveOption(reim)}
                                    {this.getDeniedOption(reim)}
                                </tr>)
                        }
                    </tbody>
                </table>
                <li className="nav-item active">
                    {this.props.currentUser && this.props.currentUser.id}
                </li>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(ReimsByCurentUser);