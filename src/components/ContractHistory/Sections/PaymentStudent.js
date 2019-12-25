import React from "react";
import {Link} from "react-router-dom";
import { List, Button, Skeleton, Icon, message, Modal } from 'antd';
import * as callApi from '../../../utils/apiCaller';
const { confirm } = Modal;
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
const count = 3;
export default class PaymentStudent extends React.Component{
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
          status: "paymentConfirmation"
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
      handleAccept(item){
        confirm({
            title: 'Accept Payment',
            content: <span>Do you want to pay <b>{item.price}đ</b> to hire tutor <b>{item.tutorName}</b>?</span>,
            onOk:()=> {
              this.setState({page: 0})
          var data={
              _id: item._id,
              content: `Student ${item.studentName} accepted to pay ${item.price}đ for tutor ${item.tutorName}.`,
              status: "inProcess"
          }
        callApi.callApiUpdateContract(data).then(()=>{
            message.success("Pay successfully!");
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
            message.error("Pay failed.")
        })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
      }
      handleCancelRequest(item){
          this.setState({page: 0})
          var data={
              _id: item._id,
              content: `Student ${item.studentName} canceled request.`,
              status: "finished"
          }
        callApi.callApiUpdateContract(data).then(()=>{
            message.success("Cancel request successfully!");
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
            message.error("Cancel request failed.")
        })
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
                 return (
              <List.Item 
              key={item._id}
                actions={[<a style={{padding:"0px 30px", marginBottom:"50px"}} onClick={()=>this.handleCancelRequest(item)}><IconText  type="close" text="Cancel Request" key="reject" /></a>,
                <a style={{padding:"0px 30px", marginBottom:"50px"}} onClick={()=>this.handleAccept(item)}><IconText  type="check" text="Accept Payment" key="accept" /></a>]}
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

            )
    }
}