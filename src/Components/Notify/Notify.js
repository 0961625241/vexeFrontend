import React, { useEffect, useState } from 'react';
import Loading from './../Loading/Loading'
import { connect } from 'react-redux';
import Toast from './../Toast/Toast'
import {getSelectNotify} from './../../actions/loading';
const Notify = (props) => {
    const  notify  = props.notify;
    console.log(notify)
    return(
        <> 
            {notify.loading && <Loading />}
            {notify.error && 
                <Toast
                    msg={{ msg: notify.error, title: "Error" }}
                    handleShow={() => props.getSelectNotify({})}
                    bgColor="bg-danger"
                />
            }

            {notify.success && 
                <Toast
                    msg={{ msg: notify.success, title: "Success" }}
                    handleShow={() => props.getSelectNotify({})}
                    bgColor="bg-success"
                />
            }
        </>
    )
}

const mapDispathToProps = (dispatch) => {
    return {
        getSelectNotify: (notify) => {
            dispatch(getSelectNotify(notify))
        },
        
    }
}
const mapStateToProps = (state) => ({
    notify: state.loading.notify,
});
export default connect(mapStateToProps, mapDispathToProps)(Notify);
