import React from "react";
import * as callApi from '../utils/apiCaller';
export default class VerifyAccount extends React.Component{
    verifyAccount = () => {
        const {id} = this.props.match.params;
        const {setCurrent, setId} = this.props;
        return callApi
        .callApiVerifyAccount({id: id})
        .then(() => {
          setCurrent(2);
          setId(id);
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