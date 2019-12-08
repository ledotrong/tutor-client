import React from "react";
import { Button} from 'antd';
import {Link } from 'react-router-dom';
export default class Home extends React.Component{
    renderSkills = () =>{
        const {skills} = this.props;
        var kq = [];
        for (let i=0;i<skills.length; i+=1)
        {
            kq.push(<li>{skills[i]}</li>);
        }
        return kq;
    }
    render (){
        const {role, email, address, name, getUser, logout, loginErr} = this.props;
        if (localStorage.getItem("usertoken") !== null && email === null)  getUser();
       if (email === null) return (
            <div>
               <Link to='/login'> <Button type="primary">Sign in</Button></Link>
               <Link to='/register'> <Button type="primary">Sign up</Button></Link>
            </div>
        );
        else return (
            <div>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Role: {role}</p>
                <p>Address: {address.address}</p>
                <p>Skills: <ul>{this.renderSkills()}</ul></p>
                <Link to='/profile' ><Button type="primary">Change profile</Button></Link>
                <Button type="primary" onClick={logout}>Log out</Button>
            </div>
        )
    }
}