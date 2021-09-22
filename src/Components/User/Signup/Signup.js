import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Layout, Col, Row,Modal, } from 'antd';
import {postSignUpRequest,getUserRequest} from './../../../actions/users';
import { connect } from 'react-redux';
import {getSelectNotify} from './../../../actions/loading';
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
        // range: '${label} must have at least ${min} characters'
    },
};

const Signup = (props) => {
    useEffect(() => {
        props.getUserRequest()
    },[])
  
    const [register, setRegister] = useState([
        {
            name: ['email'],
            value: '',
        },
        {
            name: ['password'],
            value: '',
        },
        {
            name: ['Confirm'],
            value: '',
        },
        {
            name: ['ho'],
            value: '',
        },
        {
            name: ['ten'],
            value: '',
        },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const onFinish = (values) => {
        values.fullName = values.ho + values.ten
        props.getSelectNotify({loading: true})
        props.postSignUpRequest(values, props.history)
        console.log(values);
    };
    const showModal = () => {
    //    console.log(setRegister,...register)
        setIsModalVisible(true);
          
                // 
           
       
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <section className="signUp">
            <div className="container">
                <Row>
                    <Col span={24} className="col-12 signUp_content" >
                        <div className="title__signUp">
                            <h4 >Đăng Ký</h4>
                        </div>
                        <Form name="nest-messages" onFinish={onFinish} fields={register} validateMessages={validateMessages}>
                            <div className="form-signup1">
                                <Form.Item
                                    className="form-both"
                                    name={'ho'}
                                    label="Họ"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input className="form-signup-input" />
                                </Form.Item>
                              
                                <Form.Item
                                    className="form-both"
                                    name={'ten'}
                                    label="Tên"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input className="form-signup-input" />
                                </Form.Item>
                            </div>
                            <Form.Item
                                className="form-signup"
                                name={'email'}
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        type: 'email'
                                    },
                                    {
                                        validator: async (rule, value) => {
                                            props.listUser.map((valuex, item) => {
                                                // console.log(valuex.email)
                                                if (value === valuex.email) {
                                                    throw new Error('email exists!');
                                                }
                                            })
                                        }
                                    }
                                ]}
                            >
                                <Input className="form-signup-input" />
                            </Form.Item>

                            <div className="form-signup1">
                                <Form.Item
                                    className="form-both"
                                    name="password"
                                    label="Mật khẩu"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input type="password" className="form-signup-input" />
                                </Form.Item>

                                <Form.Item
                                    className="form-both"
                                    name="Confirm"
                                    label="Xác nhận lại mật khẩu"
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject('2 password not match');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input type="password" className="form-signup-input" />
                                </Form.Item>
                            </div>
                            <Form.Item style={{ marginBottom: '50px' }} className="form-signup">
                                <Button type="primary"  htmlType="submit" className="submit-Login">
                                    Đăng Ký
                                </Button>
                                <Modal
                                    title="Basic Modal"
                                    visible={isModalVisible}
                                    onOk={handleOk}
                                    onCancel={handleCancel} >
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                </Modal>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </section>

    );
};

const mapDispathToProps = (dispatch) => {
    return {
        postSignUpRequest: (data, history) => {
            dispatch(postSignUpRequest(data, history))
        },
        getUserRequest: () => {
            dispatch(getUserRequest())
        },
        getSelectNotify: (notify) => {
            dispatch(getSelectNotify(notify))
        },
    }
}
const mapStateToProps = (state) => ({
    listUser: state.listUser.user,
});
export default connect(mapStateToProps, mapDispathToProps)(Signup);

