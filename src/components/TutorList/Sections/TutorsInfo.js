import React from "react";
import {Link} from "react-router-dom";
import { Skeleton, Card, Avatar, Col, Row } from 'antd';

const { Meta } = Card;

export default class TutorsInfo extends React.Component{
    skills(skills){
        var kq = "";
        for (let i = 0; i<skills.length-1; i++)
            kq += skills[i]+", ";
        kq += skills[skills.length-1];
        return kq;
    }
    description = tutor=>{
        return(
            <div>
                <p>Address: {tutor.address.district}, {tutor.address.province}</p>
                <p>Price per hour: {tutor.wages === 0? "Negotiate" : tutor.wages}</p>
                <p>Skills: {this.skills(tutor.skills)}</p>
            </div>
        )
    }
    renderTutor(i){
        const {loading, tutorlist} = this.props;
        return (
           <Link to={`tutordetail/${tutorlist[i]._id}`}><Card hoverable
          style={{ width: 350, marginTop: 30 }}
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Avatar shape='square' size={100} src={tutorlist[i].picture} />
              }
              title={tutorlist[i].name}
              description={this.description(tutorlist[i])}
            />
          </Skeleton>
        </Card></Link>
        )
    }
    renderAllTutors(){
        const {tutorlist} = this.props;
        if (tutorlist.length >0){
        const matrixSize = parseInt(tutorlist.length/3,10) + (tutorlist.length%3 > 0? 1 : 0);
        console.log(matrixSize);
    var tutors = [];
    for (let i = 0; i < matrixSize; i++) {
      var tutor = [];
      for (let j = 0; j < 3; j++) {
        const tutorKey = i * 3 + j;
        if (tutorKey === tutorlist.length) break;
        tutor.push(
          <Col span={8} key={tutorKey}>{this.renderTutor(tutorKey)}</Col>
        );
      }
      tutors.push(<Row style={{textAlign:"center", margin:"auto"}} gutter={16} key={i}>{tutor}</Row>);
    }
    return tutors;
  }
  else {
    return(<p>Not found.</p>)
  }
    }
    renderSkeleton(){
      var kq = [];
      for (let i=0;i<3;i++){
        kq.push(
        <Col span={8} key={i}>
        <Card hoverable
        style={{ width: 350, marginTop: 30 }}
      >
        <Skeleton loading={true} avatar active>
          <Meta
            avatar={
              <Avatar shape='square' size={100} src="" />
            }
            title=""
            description=""
          />
        </Skeleton>
      </Card></Col>
      )}
      return (<Row style={{textAlign:"center", margin:"auto"}} gutter={16}>{kq}</Row>)
    }
    render() {
        const { loading} = this.props;
        return(
            <div style={{ background: '#fff', padding: '30px' }}>
        {loading === true? this.renderSkeleton() : this.renderAllTutors()}
  </div>
        )
    }
}