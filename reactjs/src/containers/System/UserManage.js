import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, getCreateUser, getDeleteUser, getEditUser} from "../../services/userService";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state ={
            arrUsers : [],
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    async componentDidMount() {
       await this.handleGetAllUsers()
    }
    handleGetAllUsers = async () => {
        let response = await getAllUsers('All');
        if(response && response.errCode === 0)
            this.setState({
                arrUsers : response.users
            })
    }
    handleOnChange = (event, id) => {
        // bad code
        // this.setState({
        //     [id]: event.target.value
        //  })

        // good code
        let copyState = {... this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })

    }
    checkValidate = () => {
        let isValid = true;
        const arr = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arr.length; i++ ){
            if(!this.state[arr[i]]){
                isValid = false;
                alert('Missing parameter : ' + arr[i]);
                break;
            }
        }
        return isValid;
    }
    handleOnClick = async () => {
        const {arrUsers, email, password, firstName, lastName, address}  = this.state;
        const dataInput = {email, password, firstName, lastName, address}
        if(this.checkValidate()===true){
            let {errCode, message} = await getCreateUser(dataInput)
            try{
                if( errCode === 0){
                    await this.handleGetAllUsers()
                }
                else {
                    alert(message)
                }
            }catch (e) {
                console.log(e)
            }
        }
    }
    handleDeleteUser = async (user) => {
        console.log(user)
        try {
            let res = await getDeleteUser(user.id)
            if (res && res.errCode === 0) {
                this.handleGetAllUsers()
            }
            else {
                alert(res.errMessage)
            }
        }catch (e){
            console.log(e)
        }
    }
    handleEditUser = async () => {
        let data= { id: 6, email: 'long@gmail.com', password: '123456', firstName: 'abc', lastName: 'def', address: 'bdhdh'}
        console.log(data)
        let res= await getEditUser(data)
    }
    render() {
        const {arrUsers, email, password, firstName, lastName, address}  = this.state;
        return (
            <div>
                <h2>Create a new user</h2>
                <form>
                    <label>Email</label>
                    <input type={"email"}
                           name={'email'}
                           onChange={(event) => {this.handleOnChange(event,'email')}}
                           value={email}
                    /><br/>
                    <label >Password</label>
                    <input type={'password'}
                           name={'password'}
                           onChange={(event) => {this.handleOnChange(event,'password')}}
                           value={password}
                    /><br/>
                    <label>First name</label>
                    <input type={'text'}
                           name={'firstName'}
                           onChange={(event) => {this.handleOnChange(event,'firstName')}}
                           value={firstName}
                    /><br/>
                    <label>Last name</label>
                    <input type={'text'} name={'lastName'}
                           onChange={(event) => {this.handleOnChange(event,'lastName')}}
                           value={lastName}
                    /><br/>
                    <label>Address</label>
                    <input type={'text'} name={'address'}
                           onChange={(event) => {this.handleOnChange(event,'address')}}
                           value={address}
                    /><br/>
                    <input type={'button'} value={'Submit'} onClick={() => {this.handleOnClick()}}/>
                </form>
                <table id="customers">
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {arrUsers && arrUsers.map((item,index) => {
                        return(
                            <tr>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td><button onClick={() => {this.handleEditUser()}}>edit</button>
                                    <button onClick={() => {this.handleDeleteUser(item)}}>delete</button></td>
                            </tr>
                        )
                    })}
                </table>
                <form>
                    <label>First name</label>
                    <input type={'text'}
                           name={'firstName'}
                           onChange={(event) => {this.handleOnChange(event,'firstName')}}
                           value={firstName}
                    /><br/>
                    <label>Last name</label>
                    <input type={'text'} name={'lastName'}
                           onChange={(event) => {this.handleOnChange(event,'lastName')}}
                           value={lastName}
                    /><br/>
                    <label>Address</label>
                    <input type={'text'} name={'address'}
                           onChange={(event) => {this.handleOnChange(event,'address')}}
                           value={address}
                    />
                </form>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
