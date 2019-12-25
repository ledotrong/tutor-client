import React from "react";
import RequestTutor from './RequestTutor';
import RequestStudent from './RequestStudent';
import PaymentStudent from './PaymentStudent';
import PaymentTutor from './PaymentTutor';
import InProcess from './InProcess';
import FinishedStudent from './FinishedStudent';
import FinishedTutor from './FinishedTutor';
import Complain from './Complain';
import {Tabs} from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (

  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    )}
  </Sticky>
);
export default class ContractList extends React.Component{
    render(){
      const {role} = this.props;
      console.log("pppp", role)
        return(
            <StickyContainer>
    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
      <TabPane tab="Request" key="1" style={{ minHeight: 200 }}>
        {role === "student"? <RequestStudent/> : role === "tutor"? <RequestTutor/> : <p>loading</p>}
      </TabPane>
      <TabPane tab="Payment confirmation" key="2">
      {role === "student"? <PaymentStudent/> : role === "tutor"? <PaymentTutor/> : <p>loading</p>}
      </TabPane>
      <TabPane tab="In process" key="3">
        <InProcess role={role}/>
      </TabPane>
      <TabPane tab="Finished" key="4">
      {role === "student"? <FinishedStudent/> : role === "tutor"? <FinishedTutor/> : <p>loading</p>}
      </TabPane>
      <TabPane tab="Complain" key="5">
        <Complain role={role}/>
      </TabPane>
    </Tabs>
  </StickyContainer>
        )
    }
}