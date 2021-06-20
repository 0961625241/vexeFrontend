import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Layout, Col, Row } from 'antd';
import { Link, NavLink } from "react-router-dom";
import {postLoginRequest,getUserRequest} from './../../../actions/users';
import { connect } from 'react-redux';
import Signup from '../Signup/Signup';
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const comparePassword = promisify(bcrypt.compare);



const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 12,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        // range: '${label} must be between ${min} and ${max}',
        range: '${label} must have at least ${min} characters'
    },
};

const Signin = (props) => {
    useEffect(() => {
        props.getUserRequest();
    },[])
    const onFinish = (values) => {
        console.log(values);
        console.log('ádsad')
       
        // if(props.listUser && props.listUser.length > 0)
        // {
        //     props.listUser.map((item,index)=>{
                 
        //         console.log(comparePassword(values.password, item.password))
        //         console.log(item.password === comparePassword(values.password, item.password))
        //         // if(item.email === values.name && item.password === values.password)
        //         // {

        //         // }
        //     })
        // }
      
         props.postLoginRequest(values, props.history)
        
        
    };
    const [register, setRegister] = useState([
        {
            name: ['email'],
         
            value: props.userSignUp.email || '',
        },
        {
            name: ['password'],
           
            value: props.userSignUp.password || '',
        },
    ]);

   
   
    return (
        <section className="signUp">
            <div className="container">
                <Row>
                    <Col span={24} className="col-12 signUp_content" >
                        <div className="title__signUp">
                            <h4 >Đăng nhập </h4>
                        </div>
                        <Form name="nest-messages"  onFinish={onFinish} fields={register} validateMessages={validateMessages}>
                            <Form.Item
                                className="form-signup"
                                name={'email'}
                                label="email"
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input className="form-signup-input" />
                            </Form.Item>
                            <Form.Item
                                className="form-signup"
                                name={'password'}
                                label="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    }
                                ]}
                            >
                                <Input type="password" className="form-signup-input" />
                            </Form.Item>


                            <Form.Item  className="form-signup">
                                <p id='errLogin'>{props.userLogin.err && props.userLogin.err !== null ? props.userLogin.err : '' }</p>
                                <Button  type="primary" htmlType="submit"  className="submit-Login">
                                    Đăng nhập
        </Button>
                            </Form.Item>
                            <div className="divider form-signup"><span>hoặc</span></div>
                            <Form.Item  style={{marginBottom:'50px'}} className="form-signup">
                                <Button type="primary"  className="submit-Login">
                                    <Link className="submit-Login" to="/signup">Tạo tài khoản mới </Link>
                                </Button>
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
        postLoginRequest: (data, history) => {
            dispatch(postLoginRequest(data, history))
        },
        getUserRequest: () => {
            dispatch(getUserRequest())
        },
    }
}
const mapStateToProps = (state) => ({
    userLogin: state.userLogin,
    listUser: state.listUser.user,
    userSignUp: state.userSignUp.getUserSignUp,
});
export default connect(mapStateToProps, mapDispathToProps)(Signin);

