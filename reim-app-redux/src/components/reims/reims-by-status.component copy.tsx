import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input } from 'reactstrap';
import { environment } from '../../environment';
import User from '../../models/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import Reim from '../../models/reim';
import Status from '../../models/status';
import type from '../../models/type';

interface IProps {
    currentUser?: User
}

interface IComponentState {

    users: User[],
    usersDropdown: {
        isOpen: boolean,
        selection: string
    }
    reims: {
        author: number,
        amount: number,
        description: '',
        type: number
    },
    types: type[],
    typesDropdown: {
        isOpen: boolean,
        selection: string
    },
    errorMessage?: string,
    successMessage?: string
}

export class ReimsByStatus5 extends Component<IProps, IComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            usersDropdown: {
                isOpen: false,
                selection: 'All'
            },
            reims: {
                author: 0,
                amount: 0,
                description: '',
                type: 1
            },
            types: [],
            typesDropdown: {
                isOpen: false,
                selection: 'All'
            }
        }

        this.setType = this.setType.bind(this);
    }

    async componentDidMount() {
        this.getUsers();
        this.gettypes();
        
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

    getUsers = async () => {
        const resp = await fetch(environment.context + '/users', {
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

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            ...this.state,
            reims: {
                ...this.state.reims,
                [name]: event.target.value
            }
        });
    }


    selectAuthor = (event: any) => {
        this.setState({
            ...this.state,
            reims: {
                ...this.state.reims,
                author: event.target.value
            }
        })
    }

    setType = (event: any) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            reims: {
                ...this.state.reims,
                type: +value
            }
        });

    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {
    let aut = 1;
        const body = {
            "author": aut,
        "amount": this.state.reims.amount,
        "dateSubmitted": "2019-07-20T16:00:00.000Z",
        "description": this.state.reims.description,
        "status": "1",
        "type": this.state.reims.type
        }
        event.preventDefault();
         try {


            console.log('sjsj');
            const result = await fetch(environment.context +'/reim', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            });
            console.log('sj');
            const reimbursement = await result.json();
            this.setState({
                ...this.state,
                //successMessage: `Reimbursement ID created!`
                 successMessage: `Reimbursement requested!`
            })
            console.log('sjswerj');
        } catch (err) {
            console.log(err);
            console.log('Reimbursement submition error');
            this.setState({
                errorMessage: 'Reimbursement submission error'


            });
        }

      
    }


    async edit() {

      
        const body = {
            "id": 38,
        "username": "bend",
        "password": "",
        "email": "bend@hotmail",
        "firstName": "bender",
        "lastName": "rodriguez",
        "phone": "123",
        "roleID": 5
        }

       
        try {
            console.log('body: ' + body);
            const resp = await fetch(environment.context +'/users', {
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const user = await resp.json();

            console.log(user);

            localStorage.setItem('user', JSON.stringify(user));

        } catch (err) {
            console.log(err);
            console.log('Error updating');
            this.setState({
                errorMessage: 'Error updating'

            });
        }
    }

    render() {
        const users = this.state.users;
        const types = this.state.types;
        return (
            <div>
                <form className="form-edituser" onSubmit={this.submit}>
                    <p className="success-message">{this.state.successMessage}</p>
                    <h1 className="h3 mb-3 font-weight-normal">Submit a reimbursement request</h1>

                    <p>Author</p>
                    <Input type="select" onChange={this.selectAuthor}>{users.map((user: User) => <option value={user.id} key={'userId -' + user.username}>{user.firstName} {user.lastName}</option>)}</Input>

                    <p>Amount</p>
                    <input type="text" id="inputAmount" name="amount" className="form-control" placeholder="Amount" onChange={this.handleChange} value={this.state.reims.amount} required />

                    <p>Description</p>
                    <input type="text" id="inputDescription" name="description" className="form-control" placeholder="Description" onChange={this.handleChange} value={this.state.reims.description} required />


                    <p>Type</p>
                    <Input type="select" onChange={this.setType}>{types.map((type: any) => <option value={type.typeId} key={'typeId -' + type.typeId}>{type.type}</option>)}</Input>

                    <p />
                    {this.state.errorMessage && <p id="error-message">{this.state.errorMessage}</p>}

                    <Button type="submit">Submit Request</Button>
                </form>
            </div>
        );
    }

}

const mapStateToProps = (state: IState) => ({
    currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(ReimsByStatus5);