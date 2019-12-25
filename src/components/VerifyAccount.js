import React from "react";
import * as callApi from '../utils/apiCaller';
export default class VerifyAccount extends React.Component{
    verifyAccount = () => {
        const {id, role} = this.props.match.params;
        const {setCurrent, setId, setRole} = this.props;
        return callApi
        .callApiVerifyAccount({id: id})
        .then(() => {
          setCurrent(2);
          setId(id);
          setRole(role);
            this.props.history.push('/register');
        })
        .catch(err => {
          console.log(err);
        });
    }
    render(){
        this.verifyAccount();
        return (
            <div>

            </div>
        );
    }
} 