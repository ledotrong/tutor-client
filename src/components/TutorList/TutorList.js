import React from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Breadcrumb, Select, message, Form, Row, Col, Button, Pagination } from "antd";
import MHeader from "../../containers/Header/MHeader";
import MFooter from "../Footer/MFooter";
import TutorsInfo from "./Sections/TutorsInfo";
import * as callApi from '../../utils/apiCaller';
import data from '../../core/data';
const { Option } = Select;
const { Content} = Layout;

class TutorList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            children: [],
            provinces: [],
            districts: [],
            province: null,
            district: null,
            sortPrice: null,
            skill: null,
            tutorlist: Array(0),
            loading: true,
            totalPage: 0,
            current: 1
        }
    }
    handleChangeProvince = e => {
        var temp =[];
        for (let j = 0 ; j<Object.keys(data[`${parseInt(e,10)+1}`].districts).length; j++)
        {
          temp.push(<Option key={j}>{data[`${parseInt(e,10)+1}`].districts[`${Object.keys(data[`${parseInt(e,10)+1}`].districts)[j]}`]}</Option>);
        }
        this.setState({districts: temp, isChange: true, province: data[`${parseInt(e,10)+1}`].name});
      }
      handleChangeDistrict = value =>{
        this.setState({district: value.label});
      }
      handleChangePrice = value =>{
        this.setState({sortPrice: value.label});
      }
      handleChangeSkill = value =>{
        this.setState({skill: value.label});
      }
      handleSearch=(e)=>{
        e.preventDefault();
          const {province, district, skill, sortPrice} = this.state;
        var query = {province, district, skill, sortPrice, current: 1};
        return callApi.callApiSearchTutorList(query).then((data)=>{
            this.setState({tutorlist: data.data.tutorlist, current: 1, loading: false, totalPage: data.data.totalPage});
        }).catch(err=>{
            console.log(err);
            message.error("Load data failed");
        })
      }
      enterLoading=()=>{
          this.setState({loading: true});
      }
      getAllTutor=()=>{
        return callApi.callApiGetTutorList().then((data)=>{
          console.log("dataaaaaa",data);
            this.setState({tutorlist: data.data.tutorlist, totalPage: data.data.totalPage, current: 1});
        }).catch(err=>{
            console.log(err);
            message.error("Load data failed");
        })
      }
      handleReset=()=>{
        this.getAllTutor();
        this.setState({loading: false, province: null,
          district: null,
          sortPrice: null,
          skill: null});
    }
    componentWillMount= ()=>{
        const {allskills, getSkills} = this.props;
        if (allskills.length === 0) getSkills();
        var tempProvinces = [];
        for (let i =0 ; i< Object.keys(data).length; i++){
          tempProvinces.push(<Option key={i}>{data[`${i+1}`].name}</Option>);
        }
        this.setState({ provinces: tempProvinces});
      }
      handleChangePage=(page, pageSize)=>{
        const {province, district, skill, sortPrice} = this.state;
        var query = {province, district, skill, sortPrice, current: page};
        return callApi.callApiSearchTutorList(query).then((data)=>{
            this.setState({tutorlist: data.data.tutorlist, current: page, totalPage: data.data.totalPage});
        }).catch(err=>{
            console.log(err);
            message.error("Load data failed");
        })
      }
      componentDidMount(){
        const {allskills} = this.props;
        this.getAllTutor();
        this.setState({loading: false});
        var temp = [];
        for (let i = 0; i < allskills.length; i++) {
          temp.push(<Option key={i}>{allskills[i]}</Option>);
        }
        this.setState({children: temp});
      }
      componentDidUpdate(prevProps){
       
        const {allskills} = this.props;
        if (prevProps.allskills !== allskills)
        {
        var temp = [];
        for (let i = 0; i < allskills.length; i++) {
          temp.push(<Option key={i}>{allskills[i]}</Option>);
        }
        this.setState({children: temp});
        }
      }
    render(){
        const {provinces, districts, children, tutorlist, current, totalPage, loading, sortPrice} = this.state;
        const { getFieldDecorator } = this.props.form;
        return(
            <Layout className="layout">
    <MHeader/>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Tutor List</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 280, display:'block' }}>
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>
        <Col span={6} key={0} style={{ display: 'block' }}>
              <Form.Item label={"Province"}>
                {getFieldDecorator(`province`, {
                  rules: [],
                })(<Select
                    showSearch
                    defaultValue={null}
                    style={{ width: 200 }}
                    placeholder="Select province"
                    optionFilterProp="children"
                    onChange={this.handleChangeProvince}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {provinces}
                  </Select>)}
              </Form.Item>
            </Col>
            <Col span={6} key={1} style={{ display: 'block' }}>
              <Form.Item label={"District"}>
                {getFieldDecorator(`district`, {
                  rules: [],
                })(<Select
                    showSearch
                    labelInValue
                    style={{ width: 200 }}
                    placeholder="Select district"
                    optionFilterProp="children"
                    onChange={this.handleChangeDistrict}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {districts}
                  </Select>)}
              </Form.Item>
            </Col>
            <Col span={6} key={2} style={{ display: 'block' }}>
              <Form.Item label={"Price"}>
                {getFieldDecorator(`price`, {
                  rules: [],
                })(<Select
                labelInValue
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select sort price"
                    optionFilterProp="children"
                    onChange={this.handleChangePrice}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="ascending">Ascending</Option>
                    <Option value="descending">Descending</Option>
                    <Option value="negotiate">Negotiate</Option>
                  </Select>)}
              </Form.Item>
            </Col>
            <Col span={6} key={3} style={{ display: 'block' }}>
              <Form.Item label={"Skill"}>
                {getFieldDecorator(`skill`, {
                  rules: [],
                })(<Select
                    showSearch
                    labelInValue
                    style={{ width: 200 }}
                    placeholder="Select skill"
                    optionFilterProp="children"
                    onChange={this.handleChangeSkill}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {children}
                  </Select>)}
              </Form.Item>
            </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" onClick={this.enterLoading}>
              Search
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
        <TutorsInfo tutorlist={tutorlist} loading={loading}/>
        <Pagination style={{textAlign:"center", margin:"auto"}}  total={(parseInt(totalPage/6)+(totalPage%6===0?0:1))*10} current={current} onChange={this.handleChangePage} />
      </div>
    </Content>
    <MFooter/>
  </Layout>
        )
    }
}
const TutorListForm = Form.create({})(TutorList);

export { TutorListForm };
export default withRouter(TutorListForm);