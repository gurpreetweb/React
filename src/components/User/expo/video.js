import React, { Component,useState, useEffect } from "react";
import axios from 'axios';
import * as CONFIG from '../../../config.json'

class Video extends Component {
    constructor(props) {
      super(props);
      this.state = 
      {
      data:{},
      error:{},
      agendaPageNo:1,
      agendaPageLimit:5,
      }
      this.getData = this.getData.bind(this);
    };
  
    componentDidMount()
    {
      this.getData();
    }
  
    getData= async () =>
    {
      var userData =JSON.parse(localStorage.getItem('userData'));              
  
      axios.defaults.headers.common['token'] = 'Bearer'+' '+userData.token;
      await axios.post(CONFIG.BASE_URL+"/api/video/"+this.props.match.params.id)
      .then(res => 
      {
  
        if(res.data.status == 200)
        {
          this.setState({data: res.data.data, data_status:true  });
        }
        else if(res.data.status == 500)
        {
          this.setState({errorMessage: 'Something went wrong, please try again later!', data_status:true });
        }
        else{
          this.setState({errorMessage: res.data.message });
        }
      }) 
      .catch(err => 
      {	
        this.setState({errorMessage: 'Something went wrong, please try again later!',data_status:true  });
      });
    }
  
    
  
    render() {
   
    return (
    <div id="page-content-wrapper">
      <div className="innerContentBlock">
        {/* Start Page Title */}
        <div className="sitePageTitle">
          <h2>{this.state.data.sponsor_name}</h2>
        </div>
        {/* End Page Title */}
        {/* Start Inner Sec */}
        <div className="brandInnerPage">
          <div className="brand360Video">
          {this.state.data.space_code != '' && <iframe  width="100%" src ={this.state.data.space_code} style={{height: 'calc(100vh - 7px)'}}/> }
            {/* <img src="/images/360Img.jpg" alt="" /> */}
          </div>
          
        
        </div>
        {/* End Inner Sec */}
        {/* End AGENDA HIGHLIGHTS Section */}
      </div>
    </div>
);
}
};

export default Video;
