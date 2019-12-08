import React from "react";
import {Input, Form, Tag, message, Tooltip, Icon, Button} from "antd";
import { withRouter } from 'react-router-dom';
import * as callApi from '../../../utils/apiCaller';
const { TextArea } = Input;

class MainInformation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tags: [],
            isChange: false,
            loading: false,
            inputVisible: false,
            inputValue: '',
        }
    }
    enterLoading = () => {
        this.setState({ loading: true });
      };
      handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        if (tags.length === 0) this.setState({tags, isChange: false});
        else this.setState({ tags, isChange: true });
      };
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      };
    
      handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
      };
    
      handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
      };
      saveInputRef = input => (this.input = input);
    updateInfoRequest = e => {
        const {updateInfo} = this.props;
        e.preventDefault();
        const user = {
         name: document.getElementById('name').value,
         address: {
             address: document.getElementById('address').value,
            ward: document.getElementById('ward').value,
            district: document.getElementById('district').value,
            province: document.getElementById('province').value
         },
         skills: this.state.tags,
         introduction: document.getElementById('introduction').value
       };
         return callApi.callApiUpdateInfo(user)
           .then(() => {
             message.success("Update info successfully!");
             this.setState({isChange: false, loading: false});
             updateInfo(user);
           })
           .catch(err => {
             console.log(err);
             this.setState({loading: false});
             message.error("Update info failed.");
           });
    }
    handleChange = e => {
      if (e.target.value === "") this.setState({isChange: false});
      else this.setState({isChange: true});
    }
    componentDidUpdate(prevProps){
      const {name, address, introduction, skills} = this.props;
      if (prevProps.name !== name){
      console.log("abcccc");
         this.props.form.setFieldsValue({
           name: name,
           address: address.address,
           ward: address.ward,
           district: address.district,
           province: address.province,
           introduction: introduction
         })
         this.setState({tags: skills});
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const {tags, isChange, loading, inputValue, inputVisible} = this.state;
        const formItemLayout = {
            labelCol: {
              xs: { span: 20 },
              sm: { span: 4 }
            },
            wrapperCol: {
              xs: { span: 22 },
              sm: { span: 18 }
            }
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0
              },
              sm: {
                span: 16,
                offset: 8
              }
            }
          };
        return(
            <div className="update-profile-section">
                <h2>Main user information</h2>
            <Form {...formItemLayout}  onSubmit={this.updateInfoRequest} onChange={this.handleChange}>
                  <p id="msg" style={{ color: 'red' }} />
                  <Form.Item label="Name">
                    {getFieldDecorator('name', {
                      rules: [
                        { required: true, message: 'Please input your name!' }
                      ]
                    })(<Input id="name"/>)}
                  </Form.Item>
                  <Form.Item label="Address">
                    {getFieldDecorator('address', {
                      rules: [
                        { required: true, message: 'Please input your address!' }
                      ]
                    })(<Input id="address"/>)}
                  </Form.Item>
                  <Form.Item label="Ward">
                    {getFieldDecorator('ward', {
                      rules: [
                        { required: true, message: 'Please input your ward!' }
                      ]
                    })(<Input id="ward" />)}
                  </Form.Item>
                  <Form.Item label="District">
                    {getFieldDecorator('district', {
                      rules: [{ required: true, message: 'Please input your district!' }]
                    })(<Input id="district" />)}
                  </Form.Item>
                  <Form.Item label="Province">
                    {getFieldDecorator('province', {
                      rules: [
                        { required: true, message: 'Please input your province!' }
                      ]
                    })(<Input id="province" />)}
                  </Form.Item>
                  <Form.Item label="Skills">
                    {getFieldDecorator('skills', {
                      rules: [
                        { required: true, message: 'Please input your skill!' }
                      ]
                    })(<div>
                        {tags.map((tag, index) => {
                          const isLongTag = tag.length > 20;
                          const tagElem = (
                            <Tag key={tag} closable={index !== -1} onClose={() => this.handleClose(tag)}>
                              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                          );
                          return isLongTag ? (
                            <Tooltip title={tag} key={tag}>
                              {tagElem}
                            </Tooltip>
                          ) : (
                            tagElem
                          );
                        })}
                        {inputVisible && (
                          <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                          />
                        )}
                        {!inputVisible && (
                          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                            <Icon type="plus" /> Add skill
                          </Tag>
                        )}
                      </div>)}
                  </Form.Item>
                  <Form.Item label="Introduction">
                    {getFieldDecorator('introduction', {
                      rules: []
                    })(<TextArea rows={4} id="introduction"/>)}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={loading} onClick={this.enterLoading} disabled={!(isChange)}>
                  Save Changes
                </Button>
              </Form.Item>
                </Form>
             </div>
        );
    }
}
const MainInformationForm = Form.create({})(MainInformation);

export { MainInformationForm };
export default withRouter(MainInformationForm);