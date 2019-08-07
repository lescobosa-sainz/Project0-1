
import React, { Component } from 'react'
import { environment } from '../../environment';
import User from '../../models/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';


interface IProps {
    currentUser?: User
}

interface IComponentState {
    users: {
        id: 0,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    }
    errorMessage?: string
}

export class EditUser extends Component<IProps, IComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            users: {
                id: 0,
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: ''

            }
        };
    }




    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            users: {
                ...this.state.users,
                [name]: event.target.value
            }
        });
    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {

        console.log(this.props.currentUser && this.props.currentUser.id);
        let curent = 38;

        const body = {
            "id": curent,
            "username": this.state.users.username,
            "password": "",
            "email": "bend@hotmail",
            "firstName": "bender",
            "lastName": "rodriguez",
            "phone": "12356743",
            "roleID": 5
        }

        // const body = {
        //     "id": curent ,  
        //     "username": this.state.users.username,
        //     "firstName": this.state.users.firstName,
        //     "lastName": this.state.users.lastName,
        //    "email": this.state.users.email,   
        //     "phone": this.state.users.phone 
        // }
        // const body = {
        //     "id": curent,  
        //     "username": String(this.state.users.username)

        // }

        event.preventDefault();
        try {
            console.log('body: ' + body);
            const resp = await fetch(environment.context + '/users', {
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




    async edit() {


        const body = {
            "id": 38,
            "username": "bend",
            "password": "",
            "email": "bend@hotmail",
            "firstName": "bender",
            "lastName": "rodriguez",
            "phone": "1234",
            "roleID": 5
        }


        try {
            console.log('body: ' + body);
            const resp = await fetch(environment.context + '/users', {
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

        return (
            <form className="form-edituser" onSubmit={this.submit}>

                <h1 className="h3 mb-3 font-weight-normal">Edit User : {this.props.currentUser && this.props.currentUser.id}</h1>

                <p>User Name : </p>
                <input type="text" id="inputFistName"
                    name="username"
                    className="form-control"
                    placeholder="username"
                    defaultValue={this.props.currentUser && this.props.currentUser.username}
                    value={this.state.users.username} onChange={this.handleChange} />

                <p>First Name : </p>
                <input type="text" id="inputLastName"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    onChange={this.handleChange}
                    defaultValue={this.props.currentUser && this.props.currentUser.firstName}
                    value={this.state.users.firstName} />

                <p>Last Name : </p>
                <input type="text" id="inputLastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                    defaultValue={this.props.currentUser && this.props.currentUser.lastName}
                    value={this.state.users.lastName} />

                <p>Email : </p>
                <input type="text" id="inputEmail"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={this.handleChange}
                    defaultValue={this.props.currentUser && this.props.currentUser.email}
                    value={this.state.users.email} />

                <p>Phone : </p>
                <input type="text" id="inputPhone"
                    name="phone" className="form-control"
                    placeholder="Phone" onChange={this.handleChange}
                    defaultValue={this.props.currentUser && this.props.currentUser.phone} value={this.state.users.phone}/>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
            </form>


        )
    }
}

const mapStateToProps = (state: IState) => ({
    currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(EditUser);