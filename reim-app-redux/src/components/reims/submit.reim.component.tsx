import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { environment } from '../../environment';
import User from '../../models/user';
import Reim from '../../models/reim';
import type from '../../models/type';


interface IProps { 
    currentUser?: User
}

interface IComponentState {
    users: User[],
    reims: Reim[],
    types: type[],
    typesDropdown: {
        isOpen: boolean,
        selection: string
    }
}


export class SubmitReim extends Component<IProps, IComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users:[],
            reims: [],
            types: [],
            typesDropdown: {
                isOpen: false,
                selection: 'All'
            }
        };
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
