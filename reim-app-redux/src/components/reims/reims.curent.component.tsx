import React, { Component } from 'react'
import { environment } from '../../environment';
import User from '../../models/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import Reim from '../../models/reim';

interface IProps {
    currentUser?: User
}


interface IComponentState {
    reims: Reim[]
}

export class ReimsByCurent extends Component<IProps, IComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reims: []
        };
    }

    async componentDidMount() {
        this.getReims();

    }

    getReims = async () => {
        let curent = this.props.currentUser && this.props.currentUser.id;
        const resp = await fetch(environment.context + '/reim/author/userId/' + curent, {
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
                                    <td>{reim.resolver}</td>
                                    <td>{reim.status}</td>
                                    <td>{reim.type}</td>
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

export default connect(mapStateToProps)(ReimsByCurent);