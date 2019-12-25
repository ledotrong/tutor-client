import React from "react";
import {Link} from "react-router-dom";
import { List, Button, Skeleton, Icon, Modal, message, Timeline} from 'antd';
import * as callApi from '../../../utils/apiCaller';
const { confirm } = Modal;
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
const count = 3;
export default class FinishedStudent extends React.Component{
    state = {
        page: 0,
        initLoading: true,
        loading: false,
        data: [{
            studentID: null,
            studentName: null,
            tutorName: null,
            tutorID: null,
            rentHours: null,
          startDate: null,
          endDate: null,
          price: null,
          contractCreationDate: new Date(),
        currentStatus: null,
        statusHistory: [{
        date: null,
        content: null,
        status: null}]
        }],
        list: [{
            studentID: null,
            studentName: null,
            tutorName: null,
            tutorID: null,
            rentHours: null,
          startDate: null,
          endDate: null,
          price: null,
          contractCreationDate: new Date(),
        currentStatus: null,
        statusHistory: [{
        date: null,
        content: null,
        status: null}]
        }],
      };
      componentDidMount() {
          const {page} = this.state;
        this.getData(res => {
          this.setState({
            initLoading: false,
            data: res,
            list: res,
            page: page +1
          });
        });
      }
    
      getData = callback => {
        const data={
          current: this.state.page,
          status: "finished"
      }
         callApi.callApiGetContract(data).then((res)=>{
          callback(res.data.results);
        }).catch(err=>{
         // if (err.response.data.message === "Invalid token") this.props.history.push('/login');
          console.log(err);
        })
      };
      onLoadMore = () => {
        this.setState({
          loading: true,
          list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, studentID: null,
            studentName: null,
            tutorName: null,
            tutorID: null,
            rentHours: null,
          startDate: null,
          endDate: null,
          price: null,
          contractCreationDate: new Date(),
        currentStatus: null,
        statusHistory: [{
        date: null,
        content: null,
        status: null }]}))),
        });
        this.getData(res => {
          const data = this.state.data.concat(res);
          const {page} = this.state;
          this.setState(
            {
              data,
              list: data,
              loading: false,
              page: page + 1
            },
            () => {
              // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
              // In real scene, you can using public method of react-virtualized:
              // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
              window.dispatchEvent(new Event('resize'));
            },
          );
        });
      };
      contractHistory(item){
        var kq =[];
        for (let i =0;i<item.length;i++){
          var temp = new Date(item[i].date);
          kq.push(<Timeline.Item>{item[i].content}<br/> {temp.getHours()}:{temp.getMinutes()}:{temp.getSeconds()} {temp.getDate()}/{temp.getMonth()+1}/{temp.getFullYear()}</Timeline.Item>)
        }
        return kq;
      }
    viewDetail=(item)=>{
      const {role} = this.props;
      var temp = new Date(item.contractCreationDate);
      var temp1 = new Date(item.startDate);
      var temp2 = new Date(item.endDate);
      Modal.info({
        title: 'Contract Detail',
        content: (
          <div>
      <p><b>Tutor: </b>{item.tutorName}</p>
             <p><b>Date of contract creation:</b>&nbsp;&nbsp; {temp.getDate()}/{temp.getMonth()+1}/{temp.getFullYear()}</p>
             <p><b>Renting hours:</b>&nbsp;&nbsp; {item.rentHours}</p>
            <p><b>Study period:</b>&nbsp;&nbsp; {temp1.getDate()}/{temp1.getMonth()+1}/{temp1.getFullYear()} - {temp2.getDate()}/{temp2.getMonth()+1}/{temp2.getFullYear()}</p>
             <p><b>Total price:</b>&nbsp;&nbsp; {item.price === 0 ? "Negotiate" : item.price}</p>
             <p><b>Contract History: </b></p>
              <Timeline>
                {this.contractHistory(item.statusHistory)}
              </Timeline>
          </div>
        ),
        onOk() {},
      });
    }
      handleComplain(item){
        confirm({
            title: 'Complain Tutor',
            content: "Do you want to complain tutor?",
            onOk:()=> {
              this.setState({page: 0})
              var data={
                  _id: item._id,
                  content: `Student ${item.studentName} had made a complain about tutor ${item.tutorName}.`,
                  status: "complain"
              }
              callApi.callApiUpdateContract(data).then(()=>{
                message.success("Complain successfully!");
                this.getData(res => {
                    this.setState({
                      initLoading: false,
                      data: res,
                      list: res,
                      page: this.state.page+1
                    });
                  });
            }).catch(err=>{
                console.log(err);
                message.error("Complain failed.")
            })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
      }
      handleConfirm=(item)=>{
        confirm({
            title: 'Confirm Complete',
            content: <div>
                <p>Do you want to vote for tutor?</p>
            </div>,
            onOk:()=> {
              this.setState({page: 0})
              var data={
                  _id: item._id,
                  content: `Student ${item.studentName} confirmed complete this study period.`,
                  status: "finished",
                  rate: 1
              }
              callApi.callApiUpdateContract(data).then(()=>{
                message.success("Confirm successfully!");
                this.getData(res => {
                    this.setState({
                      initLoading: false,
                      data: res,
                      list: res,
                      page: this.state.page+1
                    });
                  });
            }).catch(err=>{
                console.log(err);
                message.error("Confirm failed.")
            })
            },
            onCancel:()=> {
              this.setState({page: 0})
              var data={
                  _id: item._id,
                  content: `Student ${item.studentName} confirmed complete this study period.`,
                  status: "finished",
                  rate: 0
              }
              callApi.callApiUpdateContract(data).then(()=>{
                message.success("Confirm successfully!");
                this.getData(res => {
                    this.setState({
                      initLoading: false,
                      data: res,
                      list: res,
                      page: this.state.page+1
                    });
                  });
            }).catch(err=>{
                console.log(err);
                message.error("Confirm failed.")
            })
            },
            okText: "Vote +1",
            cancelText: "No"
          });
      }
    render(){
        const { initLoading, loading, list} = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;
        return(
            <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item =>{
                var temp = new Date(item.contractCreationDate);
                var temp1 = new Date(item.startDate);
                var temp2 = new Date(item.endDate);
                if(item.currentStatus === "inProcess")
                 return (
              <List.Item 
              key={item._id}
                actions={[<a style={{padding:"0px 30px", marginBottom:"50px"}} onClick={()=>this.handleConfirm(item)}><IconText  type="check" text="Confirm Finish" key="confirmfinish" /></a>,
                <a style={{padding:"0px 30px", marginBottom:"50px"}} onClick={()=>this.handleComplain(item)}><IconText  type="close" text="Complain" key="conplain" /></a>,
                <a style={{padding:"0px 30px", marginBottom:"50px"}} onClick={()=>this.viewDetail(item)}><IconText  type="info-circle" text="View Detail" key="viewdetail" /></a>]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta 
                    title={<Link to={`/userdetail/${item.tutorID}`}><a style={{padding:"0px 30px"}}>{item.tutorName}</a></Link>}
                  />
                  <div style={{padding:"0px 30px"}}>
                        <p><b>Date of contract creation:</b>&nbsp;&nbsp; {temp.getDate()}/{temp.getMonth()+1}/{temp.getFullYear()}</p>
                        <p><b>Renting hours:</b>&nbsp;&nbsp; {item.rentHours}</p>
                        <p><b>Study period:</b>&nbsp;&nbsp; {temp1.getDate()}/{temp1.getMonth()+1}/{temp1.getFullYear()} - {temp2.getDate()}/{temp2.getMonth()+1}/{temp2.getFullYear()}</p>
                        <p><b>Total price:</b>&nbsp;&nbsp; {item.price === 0 ? "Negotiate" : item.price}</p>
                        </div>
                </Skeleton>
              </List.Item>
            )
            else
            return (
         <List.Item 
         key={item._id}
           actions={[<span style={{padding:"0px 30px", marginBottom:"50px"}}>{item.statusHistory[item.statusHistory.length -1].rate === 1?
            "You had voted for tutor": null}</span>, <a style={{padding:"0px 30px", marginBottom:"50px" }} onClick={()=>this.viewDetail(item)}><IconText  type="info-circle" text="View Detail" key="viewdetail" /></a>]}
         >
           <Skeleton avatar title={false} loading={item.loading} active>
             <List.Item.Meta 
               title={<Link to={`/userdetail/${item.tutorID}`}><a style={{padding:"0px 30px"}}>{item.tutorName}</a></Link>}
             />
             <div style={{padding:"0px 30px"}}>
                   <p><b>Date of contract creation:</b>&nbsp;&nbsp; {temp.getDate()}/{temp.getMonth()+1}/{temp.getFullYear()}</p>
                   <p><b>Renting hours:</b>&nbsp;&nbsp; {item.rentHours}</p>
                   <p><b>Study period:</b>&nbsp;&nbsp; {temp1.getDate()}/{temp1.getMonth()+1}/{temp1.getFullYear()} - {temp2.getDate()}/{temp2.getMonth()+1}/{temp2.getFullYear()}</p>
                   <p><b>Total price:</b>&nbsp;&nbsp; {item.price === 0 ? "Negotiate" : item.price}</p>
                   </div>
           </Skeleton>
         </List.Item>
       )}}
     /> 
       )}}