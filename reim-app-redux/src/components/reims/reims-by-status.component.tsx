import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { environment } from '../../environment';
import User from '../../models/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import Reim from '../../models/reim';
import Status from '../../models/status';

interface IProps {
    currentUser?: User
}

interface IComponentState {
    reims: Reim[],
    status: Status[],
    statusDropdown: {
        isOpen: boolean,
        selection: string
    },
    successMessage?: string
}

export class ReimsByStatus extends Component<IProps, IComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reims: [],
            status: [],
            statusDropdown: {
                isOpen: false,
                selection: 'All'
            }
        };
    }

    async componentDidMount() {
        this.getReims();
        this.getStatus();
       
    }

    getReims = async () => {
        const resp = await fetch(environment.context + '/reim', {
            credentials: 'include'
        });
        const reimsFromServer = await resp.json();
        this.setState({
            reims: reimsFromServer,
            statusDropdown: {
                ...this.state.statusDropdown,
                selection: 'All'
            }
        });
        console.log(reimsFromServer);
    }

    getreimsByStatusId = async (status: Status) => {
        const resp = await fetch(environment.context + '/reim/status/' + status.statusId, {
            credentials: 'include'
        });
        const reimsFromServer = await resp.json();
        this.setState({
            reims: reimsFromServer,
            statusDropdown: {
                ...this.state.statusDropdown,
                selection: status.status
            }
        });
        console.log(reimsFromServer);
    }



    getStatus = async () => {
        const resp = await fetch(environment.context + '/status', {
            credentials: 'include'
        });
        const status = await resp.json();
        this.setState({
            status
        });
    }

    toggleStatusDropdown = () => {
        this.setState({
            statusDropdown: {
                ...this.state.statusDropdown,
                isOpen: !this.state.statusDropdown.isOpen
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
                status: 3
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
                    isOpen={this.state.statusDropdown.isOpen}
                    toggle={this.toggleStatusDropdown}>

                    <DropdownToggle caret>
                        {this.state.statusDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getReims}>All</DropdownItem>
                        <DropdownItem divider />
                        {
                            this.state.status.map(status => (
                                <DropdownItem key={'Status-dropdown-' + status.statusId}
                                    onClick={() => this.getreimsByStatusId(status)}>
                                    {status.status}
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

export default connect(mapStateToProps)(ReimsByStatus);