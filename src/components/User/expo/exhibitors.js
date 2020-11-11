import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as CONFIG from '../../../config.json'

class Exhibitors extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      exhibitor_status:'all',
      search:null,
    }
    this.exhibitorChange = this.exhibitorChange.bind(this);
    this.handleLoginKeyUp = this.handleLoginKeyUp.bind(this);
  };
  componentDidMount(){
    
  }

  sponserGold(data)
    {
      if(!this.state.search || this.state.search =='')
      {
        console.log('hellooooooooo')
        if(data.membership_type.membership == "Gold")
        {
          return  <li><Link to={"/sponsor/detail/"+data._id}><img src={CONFIG.BASE_URL+"/uploads/"+data.profile_img} alt /></Link></li>
        }
      }
      else
      {
        if(data.sponsor_name.toLowerCase().includes(this.state.search.toLowerCase()))
        {
          console.log('11111111111111')
          if(data.membership_type.membership == "Gold")
          {
            return  <li><Link to={"/sponsor/detail/"+data._id}><img src={CONFIG.BASE_URL+"/uploads/"+data.profile_img} alt /></Link></li>
          }
        }
        else if(this.state.search == '')
        {
          if(data.membership_type.membership == "Gold")
          {
            return  <li><Link to={"/sponsor/detail/"+data._id}><img src={CONFIG.BASE_URL+"/uploads/"+data.profile_img} alt /></Link></li>
          }
        }
        
      }
    }

  sponserDiamond(data,search = null)
  {
    if(!this.state.search || this.state.search =='')
    {
      if(data.membership_type.membership == "Diamond")
      {
        return  <li><Link to={"/sponsor/detail/"+data._id}><img src={CONFIG.BASE_URL+"/uploads/"+data.profile_img} alt /></Link></li>
      }
    }
    else{
      if(data.sponsor_name.toLowerCase().includes(this.state.search.toLowerCase()))
      {
        console.log('11111111111111')
        if(data.membership_type.membership == "Diamond")
        {
          return  <li><Link to={"/sponsor/detail/"+data._id}><img src={CONFIG.BASE_URL+"/uploads/"+data.profile_img} alt /></Link></li>
        }
      }
      else if(this.state.search == '')
      {
        if(data.membership_type.membership == "Diamond")
        {
          return  <li><Link to={"/sponsor/detail/"+data._id}><img src={CONFIG.BASE_URL+"/uploads/"+data.profile_img} alt /></Link></li>
        }
      }
    }
  }

  exhibitorChange(e)
  {
    this.setState({exhibitor_status:e.target.value});
  }


  handleLoginKeyUp(e)
  {
    var search = e.target.value
    var data = null;
    
      this.setState({search:search})
    
  }


  render() {
  return (
    <div className="expoExhibitors">
      <div className="exhibitorsTilteDrop">
        <h3>Exhibitors</h3>
        <div className="exhibitorsDropBox">
          <ul>
            <li>
              <div className="dropSelectBox">
                <select className="custom-select" name="exhibitor" onChange={this.exhibitorChange}>
                  <option value="all">Display all Tiers</option>
                  <option value="diamond">Diamond</option>
                  <option value="gold">Gold</option>
                </select>
              </div>
            </li>
            <li>
              <div className="searchExhibitors">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search Exhibitors"
                  onKeyUp={this.handleLoginKeyUp}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      {(this.state.exhibitor_status == 'all' || this.state.exhibitor_status == 'diamond') &&
      <div className="listExhibitors">
        <div className="exhibitorsListBlock">
          <h3>Diamond</h3>
          <ul className="brandLogoSec">
          { this.props.sponser_data.map(( value, index) => (
          this.sponserDiamond(value)
         ))}
          </ul>
        </div>
      </div>
      }
      {(this.state.exhibitor_status == 'all' || this.state.exhibitor_status == 'gold')  &&
      <div className="exhibitorsListBlock">
        <h3>Gold</h3>
        <ul className="brandLogoSec">
        { this.props.sponser_data.map(( value, index) => (
          this.sponserGold(value)
         ))}
        </ul>
      </div>
     }
    </div>
  );
}
};

export default Exhibitors;