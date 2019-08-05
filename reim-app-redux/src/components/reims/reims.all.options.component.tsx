import React, { Component } from 'react'
import { environment } from '../../environment';
import User from '../../models/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import Reim from '../../models/reim';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown } from 'reactstrap';
import type from '../../models/type';


interface IProps {
    currentUser?: User
}

interface IComponentState {
    reims: Reim[],
    users: User[],
    usersDropdown: {
        isOpen: boolean,
        selection: string
    },
    types: type[],
    typesDropdown: {
        isOpen: boolean,
        selection: string
    }
}
export class ReimsAllOptions extends Component<IProps, IComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reims: [],
            users: [],
            usersDropdown: {
                isOpen: false,
                selection: 'All'
            },
            types: [],
            typesDropdown: {
                isOpen: false,
                selection: 'All'
            }
        };
    }

    async componentDidMount() {
        this.getReims();
        this.getUsers();
        this.gettypes();
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
            },
            typesDropdown: {
                ...this.state.typesDropdown,
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

    getreimsBytypesId = async (types: type) => {
        const resp = await fetch(environment.context + '/reim/type/' + types.typeId, {
            credentials: 'include'
        });
        const reimsFromServer = await resp.json();
        this.setState({
            reims: reimsFromServer,
            typesDropdown: {
                ...this.state.typesDropdown,
                selection: types.type
            }
        });
        console.log(reimsFromServer);
    }


    gettypes = async () => {
        const resp = await fetch(environment.context + '/type', {
            credentials: 'include'
        });
        const types = await resp.json();
        this.setState({
            types
        });
    }

    toggletypesDropdown = () => {
        this.setState({
            typesDropdown: {
                ...this.state.typesDropdown,
                isOpen: !this.state.typesDropdown.isOpen
            }
        });
    }



    approveReim = async (reim: Reim) => {
        const result = await fetch(environment.context + '/reim', {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({
                reimId: reim.reimId,
                dateResolve: String(reim.dateResolved),
                resolver: this.props.currentUser && this.props.currentUser.id,
                status: 2

            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        const updatedReim = await result.json();
        this.setState({
            ...this.state,
            reims: this.state.reims.map(reim => {
                if (reim.reimId === updatedReim.reimId) {
                    return updatedReim;
                } else {
                    return reim;
                }
            })
        })
    }

    denyReim = async (reim: Reim) => {
        let curent = this.props.currentUser;

        const result = await fetch(environment.context + '/reim', {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({
                reimId: reim.reimId,
                dateResolve: String(reim.dateResolved),
                resolver: this.props.currentUser && this.props.currentUser.id,
                status: 2
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        const updatedReim = await result.json();
        this.setState({
            ...this.state,
            reims: this.state.reims.map(reim => {
                if (reim.reimId === updatedReim.id) {
                    return updatedReim;
                } else {
                    return reim;
                }
            })
        })
    }



    getAproveOption = (reim: Reim) => {
        let curent = this.props.currentUser && this.props.currentUser.roleID.id;
        if (curent === 1 || curent === 3) {
            const pen = 'pending';
            if (String(reim.status) === pen) {
                return <td>
                    <Button color="success" onClick={() => this.approveReim(reim)}>Approve</Button>
                </td>
            }
        }
    }

    getDeniedOption = (reim: Reim) => {
        let curent = this.props.currentUser && this.props.currentUser.roleID.id;
        if (curent === 1 || curent === 3) {
            const pen = 'pending';
            if (String(reim.status) === pen) {
                return <td>
                    <Button color="danger" onClick={() => this.denyReim(reim)}>Deny</Button>
                </td>
            }
        }
    }

    render() {
        const reims = this.state.reims;
        return (
            <div id="reim-table-container">


                <ButtonDropdown id="reim-Status-dropdown"
                    isOpen={this.state.typesDropdown.isOpen}
                    toggle={this.toggletypesDropdown}>

                    <DropdownToggle caret>
                        {this.state.typesDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getReims}>All Status</DropdownItem>
                        <DropdownItem divider />
                        {
                            this.state.types.map(types => (
                                <DropdownItem key={'Status-dropdown-' + types.typeId}
                                    onClick={() => this.getreimsBytypesId(types)}>
                                    {types.type}
                                </DropdownItem>
                            ))
                        }
                    </DropdownMenu>

                </ButtonDropdown>



                <ButtonDropdown id="reim-Status-dropdown"
                    isOpen={this.state.usersDropdown.isOpen}
                    toggle={this.toggleUsersDropdown}>

                    <DropdownToggle caret>
                        {this.state.usersDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getReims}>All Authors</DropdownItem>
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
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(ReimsAllOptions);