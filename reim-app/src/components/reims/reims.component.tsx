import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Reim from '../../models/reim';
import Status from '../../models/status';

interface IState {
    reims: Reim[],
    status: Status[],
    statusDropdown: {
        isOpen: boolean,
        selection: string
    }
}

export default class Reims extends Component<{}, IState> {
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
        this.getreims();
        this.getstatuss();
    }

    getreims = async () => {
        const resp = await fetch('http://localhost:8012/reims', {
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

    getreimsBystatusId = async (status: Status) => {
        const resp = await fetch('http://localhost:8012/reims/status/' + status.statusId, {
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

    getstatuss = async () => {
        const resp = await fetch('http://localhost:8012/status', {
            credentials: 'include'
        });
        const status = await resp.json();
        this.setState({
            status
        });
    }

    togglestatusDropdown = () => {
        this.setState({
            statusDropdown: {
                ...this.state.statusDropdown,
                isOpen: !this.state.statusDropdown.isOpen
            }
        });
    }

    render() {
        const reims = this.state.reims;
        return (
            <div id="reim-table-container">
                <ButtonDropdown id="reim-status-dropdown"
                    isOpen={this.state.statusDropdown.isOpen}
                    toggle={this.togglestatusDropdown}>

                    <DropdownToggle caret>
                        {this.state.statusDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getreims}>All</DropdownItem>
                        <DropdownItem divider />
                        {
                            this.state.status.map(status => (
                                <DropdownItem key={'status-dropdown-' + status.statusId}
                                    onClick={() => this.getreimsBystatusId(status)}>
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
                                    <td>${reim.reimId}</td>
                                    <td>${reim.author}</td>
                                    <td>${reim.amount}</td>
                                    <td>${reim.dateSubmitted}</td>
                                    <td>${reim.dateResolved}</td>
                                    <td>${reim.description}</td>
                                    <td>${reim.resolver}</td>
                                    <td>${reim.status}</td>
                                    <td>${reim.type}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
