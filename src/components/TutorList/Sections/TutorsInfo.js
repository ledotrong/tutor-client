import React from "react";
import {Link} from "react-router-dom";
import { Skeleton, Card, Avatar, Tag,List, Form, Modal, InputNumber, DatePicker, message } from 'antd';
import * as callApi from "../../../utils/apiCaller";
const {RangePicker } = DatePicker;
const { Meta } = Card;
const dateFormat = 'DD/MM/YYYY';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const {form, wages, visible, onCancel, onCreate} = this.props;
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      };
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form {...formItemLayout}  onSubmit={this.chooseTutorRequest}  >
          <Form.Item label="Renting hours">
            {getFieldDecorator('rentinghours', {
              rules: [
                { required: true, message: 'Please input renting hours!' }
              ]
            })(<InputNumber min={16} max={99999999999} id="rentinghours"/>)}
          </Form.Item>
          <Form.Item label="Study period">
            {getFieldDecorator('studyperiod', {
              rules: [
                { required: true, message: 'Please input study period!' }
              ]
            })( <RangePicker id="studyperiod"
              format={dateFormat}
            />)}
          </Form.Item>
          <Form.Item label="Total price">
            {getFieldDecorator('totalprice', {})( <p id="studyperiod">{wages*form.getFieldValue("rentinghours")}</p>)}
          </Form.Item>
          </Form>
          </Modal>
      )
    }
  }
)
export default class TutorsInfo extends React.Component{
  state={
    loading: false,
    visible: false,
    wages: -1,
    tutorID : null,
    tutorName: null, role: null
  }
    skills(skills){
        var kq = [];
        var color=["magenta","red","volcano","orange","gold","lime","green","cyan","blue","geekblue","purple"];
        for (let i = 0; i<skills.length; i++){console.log("color",color[Math.floor(Math.random() * 11)] )
          kq.push( <Tag color={color[Math.floor(Math.random() * 11)]}>{skills[i]}</Tag>)}
        return kq;
    }
    handleCancel = () => {
      this.setState({ visible: false });
    };
    handleCreate = () => {
      const { form } = this.formRef.props;
      const {wages, tutorID, tutorName} = this.state;
      var er = null;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        var data = {
          rentHours: values.rentinghours,
          startDate: new Date(values.studyperiod[0].get('year'),values.studyperiod[0].get('month'),values.studyperiod[0].get('date')),
          endDate: new Date(values.studyperiod[1].get('year'),values.studyperiod[1].get('month'),values.studyperiod[1].get('date')),
          price: values.rentinghours*wages,
          tutorID: tutorID,
          tutorName: tutorName
        }
        callApi.callApiChooseTutor(data).then(()=>{
          message.success("Send request to tutor successfully!");
        }).catch((err)=>{
          if (err.response.data) this.props.history.push('/login');
          message.error( "Send request to tutor failed.");
        })
        form.resetFields();
        this.setState({ visible: false });
      });
    };
  
    saveFormRef = formRef => {
      this.formRef = formRef;
    };
    chooseTutor=(tutor)=>{
      this.setState({wages: tutor.wages, visible: true, tutorName: tutor.name, tutorID: tutor._id })
    }
    description = tutor=>{
        return(
            <div>
                <p>Address: {tutor.address.district}, {tutor.address.province}</p>
                <p>Price per hour: {tutor.wages === 0 || tutor.wages === null? "Negotiate" : tutor.wages}</p>
                
               
            </div>
        )
    }
    renderTutor(i){
        const {loading, tutorlist, role} = this.props;
        console.log("oooooo", role)
        if (role === "tutor")
        return (
             <Card hoverable key={i}
          style={{  marginTop: 30 }}
        > <Link to={`userdetail/${tutorlist[i]._id}`}>
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Avatar shape='square' size={100} src={tutorlist[i].picture} />
              }
              title={tutorlist[i].name}
              description={this.description(tutorlist[i])}
            ></Meta>
             <span style={{color:"black"}}>Skills:</span><span style={{marginLeft:"5%"}}>{this.skills(tutorlist[i].skills)}</span>
          </Skeleton></Link>
        </Card>
        );
      else return (
        <Card hoverable key={i}
        actions={[<a className="choosetutor" onClick={()=>this.chooseTutor(tutorlist[i])}>Choose tutor</a>]}
     style={{  marginTop: 30 }}
   > <Link to={`userdetail/${tutorlist[i]._id}`}>
     <Skeleton loading={loading} avatar active>
       <Meta
         avatar={
           <Avatar shape='square' size={100} src={tutorlist[i].picture} />
         }
         title={tutorlist[i].name}
         description={this.description(tutorlist[i])}
       />
        <span style={{color:"black"}}>Skills:</span><span style={{marginLeft:"5%"}}>{this.skills(tutorlist[i].skills)}</span>
     </Skeleton></Link>
   </Card>
   );
    }
    renderAllTutors(){
        const {tutorlist} = this.props;
    var tutors = [];
    for (let i = 0; i < tutorlist.length; i++) {
        tutors.push(this.renderTutor(i));
    }
    return tutors;
    }
    render() {
        const { loading} = this.props;
       
        console.log(loading);
        return(
            <div style={{ background: '#fff' }}>
              <List
    grid={{
      gutter: 30,
      xs: 1,
      sm: 1,
      md: 2,
      lg: 2,
      xl: 3,
      xxl: 3,
    }}
    dataSource = {this.renderAllTutors()}
    renderItem={item => (
      <List.Item>{item}</List.Item>
      )}
  />
  <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          wages={this.state.wages}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
  </div>

        )
    }
}