import React from 'react';
import { Button, Input } from 'reactstrap';
import { environment } from '../../environment';
import type from '../../models/type';
import User from '../../models/user';




interface IState {

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

export default class SubmitReim2 extends React.Component<{}, IState> {

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
        const body = {
            author: this.state.reims.author,
            amount: this.state.reims.amount,
            dateSubmitted: "2019-07-20T16:00:00.000Z",
            description: this.state.reims.description,
            status: "pending",
            type: this.state.reims.type
        }
        event.preventDefault();
        try {
            console.log('reim being submitted ' + this.state.reims.author)
            const resp = await fetch('/reim', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const reimbursement = await resp.json();
            this.setState({
                ...this.state,
                successMessage: `Reimbursement ID ${reimbursement.reimbursementId} created!`
            })

        } catch (err) {
            console.log(err);
            let id =  this.state.reims.author;
            let am =  this.state.reims.amount;
            let des =  this.state.reims.description;
            let ty =  this.state.reims.type;
            console.log('Reimbursement submition error' + id+am+des+ty);
            this.setState({
                errorMessage: 'Reimbursement submission error' + id+am+des+ty


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