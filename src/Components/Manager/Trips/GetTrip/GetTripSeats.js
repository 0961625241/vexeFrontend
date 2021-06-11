import React, { Component } from 'react'

export default class GetTripSeats extends Component {
    qua=(id)=>{
        // let qua = document.getElementById(id);
        // let seat = this.props.seat;
        //     if((qua.style.fill) === "rgb(192, 192, 192)")
        //     {
        //         qua.style.fill = 'rgb(24, 144, 255)';
        //     }else{
        //         if((qua.style.fill) === "rgb(253, 237, 232)")
        //         {
        //             qua.style.fill = 'rgb(253, 237, 232)'
        //         }else{
        //             qua.style.fill = 'rgb(192, 192, 192)';
        //         }
        //     }
        //     seat.filter((item,index)=>{
        //         if(item._id === id && item.isBooked !== true)
        //         {
        //          this.props.onCheckbox(this.props.price,item.code)
        //         }
        //     })
     }
     phanmang1 = (start, end) => {
        return this.props.seat.slice(start, end).map((item, index) => {
            if (index % 2 !== 0) {
                return (
                    <React.Fragment key={index} >
                        <td ></td>
                        <td   className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}}   id={item._id} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text  data-v-8084877a="">
                            <tspan onClick={()=>this.qua(item._id)} data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                            {item.code}
                        </tspan></text></svg>
                        </td>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment key={index} >
                        <td ></td>
                        <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}}  className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">{item.code}</tspan></text></svg></td>
                    </React.Fragment>
                )
            }


        })
    }
    phanmang2 = (start, end) => {
        return this.props.seat.slice(start, end).map((item, index) => {
            if (index % 2 !== 0) {
                return (
                    <React.Fragment key={index} >
                        <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                            {item.code}
                        </tspan></text></svg>
                        </td>
                        <td></td>
                    </React.Fragment>
                )
            }
            return (
                <React.Fragment key={index} >
                    <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                        {item.code}
                    </tspan></text></svg>
                    </td>
                </React.Fragment>
            )

        })
    }
    phanmang3 = (start, end) => {
        return this.props.seat.slice(start, end).map((item, index) => {
            return (
                <React.Fragment key={index} >
                    <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                        {item.code}
                    </tspan></text></svg>
                    </td>
                </React.Fragment>
            )

        })
    }
    phanmangsleep1 = (start, end) => {
        return this.props.seat.slice(start, end).map((item, index) => {
            return (
                <React.Fragment key={index} >
                    <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}  data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                        {item.code}
                    </tspan></text></svg>
                    </td>
                </React.Fragment>
            )

        })
    }
    phanmangsleep2 = (start, end) => {
        return this.props.seat.slice(start, end).map((item, index) => {
            return (
                <React.Fragment key={index} >
                    <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                        {item.code}
                    </tspan></text></svg>
                    </td>
                    <td></td>
                </React.Fragment>
            )
        })
    }


   // 0 5
    phanmang41sleep = (start, end) => {
        return this.props.seat.slice(start, end).map((item, index) => {
            if (index % 2 === 0) {
            return (
                <React.Fragment key={index} >
                    <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}  data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                        {item.code}
                    </tspan></text></svg>
                    </td>
                </React.Fragment>
            )
            }
            else{
                return (
                    <React.Fragment key={index} >
                         <td ></td>
                         <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}  data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                        {item.code}
                    </tspan></text></svg>
                    </td>
                         <td></td>
                    </React.Fragment>
                )
            }
        })
    }

    phanmang41sleepNgangCuoi = (start, end) => {
        return this.props.seat.slice(start, end).map((item, index) => {
            return (
                
                <React.Fragment key={index} >
                    <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}  data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                        {item.code}
                    </tspan></text></svg>
                    </td>
                </React.Fragment>
            )
        })
    }

    phanmang35choNgoi = (start, end) => {
        return this.props.seat.slice(start, end).map((item, index) => {
            return (
                <React.Fragment key={index} >
                    <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}  data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                        {item.code}
                    </tspan></text></svg>
                    </td>
                </React.Fragment>
            )
    })
}
phanmang35choNgoiThieu= (start, end) => {
    return this.props.seat.slice(start, end).map((item, index) => {
        if (index % 2 === 0) {
        return (
            <React.Fragment key={index} >
                <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}  data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                    {item.code}
                </tspan></text></svg>
                </td>
                <td></td>
            </React.Fragment>
        )
        }
        else{
            return (
                <React.Fragment key={index} >
                <td className={`tdx${this.props.id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="23" height="42" viewBox="0 0 28 44"><g   id={item._id} style={item.isBooked === true ? {fill:"rgb(253, 237, 232)"} : {fill:"rgb(192, 192, 192)"}} className={`spanx${this.props.id}`} stroke="#000" strokeWidth=".5"><g><rect width="28" height="44" rx="4" stroke="none"></rect><rect x=".25" y=".25" width="27.5" height="43.5" rx="3.75" fill="none"></rect></g><g transform="translate(2)"><rect width="24" height="34" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="23.5" height="33.5" rx="1.75" fill="none"></rect></g><g transform="translate(6 36)"><rect width="16" height="8" rx="2" stroke="none"></rect><rect x=".25" y=".25" width="15.5" height="7.5" rx="1.75" fill="none"></rect></g></g><text data-v-8084877a=""><tspan onClick={()=>this.qua(item._id)}  data-v-8084877a="" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                    {item.code}
                </tspan></text></svg>
                </td>
            </React.Fragment>
            )
        }
})
}
    render() {
         let { seat} = this.props;
        return (
            <>
                      {seat.length === 24 ?
                  <div className="coach-container" >
                      <div className="coach">
                    <table className='checkBoxSeat' style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                {this.phanmang1(0, 2)}
                            </tr>
                            <tr>
                                {this.phanmang2(2, 5)}
                            </tr>
                            <tr>
                                {this.phanmang2(5, 8)}
                            </tr>
                            <tr>
                                {this.phanmang2(8, 11)}
                            </tr>
                            <tr>
                                {this.phanmang2(11, 14)}
                            </tr>
                            <tr>
                                {this.phanmang2(14, 17)}
                            </tr>
                            <tr>
                                {this.phanmang2(17, 20)}
                            </tr>
                            <tr>
                                {this.phanmang3(20, 24)}
                            </tr>

                        </tbody>
                    </table>
                    </div>
                    </div>
                    : ''
                }
                {seat.length === 22 ?
                    <div className="coach-container" style={{marginRight:'16px'}}>
                        <span>1 Floor</span>
                        <div className="coach">
                            <table className='checkBoxSeat' style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        {this.phanmangsleep1(0, 2)}
                                    </tr>
                                    <tr>
                                        {this.phanmangsleep1(2, 4)}
                                    </tr>
                                    <tr>
                                        {this.phanmangsleep1(4, 6)}
                                    </tr>
                                    <tr>
                                        {this.phanmangsleep1(6, 8)}
                                    </tr>
                                    <tr>
                                        {this.phanmangsleep1(8, 10)}
                                    </tr>
                                    <tr>
                                        {this.phanmangsleep2(10, 11)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : ''
                }
                {seat.length === 22 ?
                    <div className="coach-container">
                        <span>2 Floor</span>
                        <div className="coach">
                            <table className='checkBoxSeat' style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        {this.phanmangsleep1(11, 13)}
                                    </tr>
                                    <tr>
                                        {this.phanmangsleep1(13, 15)}
                                    </tr>
                                    <tr>
                                        {this.phanmangsleep1(15, 17)}
                                    </tr>
                                    <tr>
                                        {this.phanmangsleep1(17, 19)}
                                    </tr>
                                    <tr>
                                        {this.phanmangsleep1(19, 21)}
                                    </tr>
                                    <tr>
                                        {this.phanmangsleep2(21, 22)}
                                    </tr>
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : ''
                }
                 {seat.length === 41 ? 
                  <div className="coach-container">
                  <span>1 Floor</span>
                  <div className="coach">
                      <table className='checkBoxSeat' style={{ width: '100%' }}>
                          <tbody>
                              <tr>
                              {this.phanmang41sleep(0, 3)}
                                  </tr>
                                    <tr>
                              {this.phanmang41sleep(3, 6)}
                                  </tr>
                                  <tr>
                              {this.phanmang41sleep(6, 9)}
                                  </tr>
                                  <tr>
                              {this.phanmang41sleep(9, 12)}
                                  </tr>
                                  <tr>
                              {this.phanmang41sleep(12, 15)}
                                  </tr>
                                  <tr>
                              {this.phanmang41sleep(15, 18)}
                                  </tr>
                                  </tbody>
                                  </table>
                                  </div>
                                  </div>
                  : ''}
                      {seat.length === 41 ?
                    <div className="coach-container" style={{marginRight:'16px'}}>
                        <span>2 Floor</span>
                        <div className="coach">
                            <table className='checkBoxSeat' style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        {this.phanmang41sleep(18, 21)}
                                    </tr>
                                    <tr>
                                        {this.phanmang41sleep(21, 24)}
                                    </tr>
                                    <tr>
                                        {this.phanmang41sleep(24, 27)}
                                    </tr>
                                    <tr>
                                        {this.phanmang41sleep(27, 30)}
                                    </tr>
                                    <tr>
                                        {this.phanmang41sleep(30, 33)}
                                    </tr>
                                    <tr>
                                        {this.phanmang41sleep(33, 36)}
                                    </tr>
                                    <tr>
                                        {this.phanmang41sleepNgangCuoi(36, 41)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : ''
                }
                 {seat.length === 34 ? 
                  <div className="coach-container">
                  <span>1 Floor</span>
                  <div className="coach">
                      <table className='checkBoxSeat' style={{ width: '100%' }}>
                          <tbody>
                              <tr>
                              {this.phanmang35choNgoi(0, 3)}
                                  </tr>
                                    <tr>
                              {this.phanmang35choNgoi(3, 6)}
                                  </tr>
                                  <tr>
                              {this.phanmang35choNgoi(6, 9)}
                                  </tr>
                                  <tr>
                              {this.phanmang35choNgoi(9, 12)}
                                  </tr>
                                  <tr>
                              {this.phanmang35choNgoiThieu(12, 14)}
                                  </tr>
                                  <tr>
                              {this.phanmang35choNgoi(14, 17)}
                                  </tr>
                                  </tbody>
                                  </table>
                                  </div>
                                  </div>
                  : ''}
                      {seat.length === 34 ?
                    <div className="coach-container" style={{marginRight:'16px'}}>
                        <span>2 Floor</span>
                        <div className="coach">
                            <table className='checkBoxSeat' style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        {this.phanmang35choNgoi(17, 20)}
                                    </tr>
                                    <tr>
                                        {this.phanmang35choNgoi(20, 23)}
                                    </tr>
                                    <tr>
                                        {this.phanmang35choNgoi(23, 26)}
                                    </tr>
                                    <tr>
                                        {this.phanmang35choNgoi(26, 29)}
                                    </tr>
                                    <tr>
                                        {this.phanmang35choNgoiThieu(29, 31)}
                                    </tr>
                                    <tr>
                                        {this.phanmang35choNgoi(31, 34)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : ''
                }
            </>
        )
    }
}
