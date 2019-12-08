import React from "react";
import { Layout} from "antd";
const {  Footer } = Layout;

export default class MFooter extends React.Component {
    render(){
        return(
            <Footer style={{ textAlign: 'center' }}>Web tutorial ©2019 Created by Tran Hue Thy, Le Do Trong, Nguyen Thanh Dat</Footer>
        );
    }
}