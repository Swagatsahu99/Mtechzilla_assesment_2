import React, { useState } from 'react'

import axios from 'axios';
import './user.css'

const User = () => {

    let [name,setName]=useState("");

    let [user,setUser]=useState();

    let [loding,isLoading]=useState(false);

    let [errormsg,setErrormsg]=useState("");


    let handleSearch=async ()=>{
        try{
            setErrormsg("");
            isLoading(true)
            const response=await axios.get(`https://api.github.com/users/${name}`);
            setTimeout(() => {
                isLoading(false);
            }, 1000);
            setUser(response.data)
            setName("");
            console.log(response.data);
        }catch(error){
            setErrormsg(error.toJSON().message);
            console.log(error.toJSON().message);
        }
    }

    
    return (
<div className='container-fluid next'>

<h1 className='display-1 text-center text-capitalize git my-3'>gitHub public information</h1>
    
    <div className='container box my-5'>
        <div className="form-floating">
            <input id='text1' type="text" className=' form-control search-box' placeholder="dd" value={name} onChange={(e)=>setName(e.target.value)} />
            <label htmlFor='text1'>Enter name</label>
        </div>
        <button className="btn btn-primary" onClick={handleSearch}>Submit</button>
    </div>

    {errormsg.length<1 && user && !loding &&(
<div className="card mb-3 mx-auto card-box">
    <div className="row card-content">
    <div className="col-md-6 text-center">
          <img src={user.avatar_url} className="img-fluid logo" alt="image" />
    </div>

    <div className="col-md-6">
      <div className="card-body">
        <h5 className="card-title mt-3 text-uppercase my-5 ">{user.name}</h5>
        <p className="card-text"><span>Username: </span>{user.login}</p>
        <p className="card-text"><span>No. of public repos: </span>{user.public_repos}</p>
        <p className="card-text"><span>No. of public gists: </span>{user.public_gists}</p>

        <p className='card-text text-muted'>
             Created on: {(user.created_at).slice(0,10)}
        </p>
        
        {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
      </div>
    </div>
      </div>
</div>
)} 
{loding && errormsg.length<1 && (<h1 className='text-center text-secondary display-4 '>Loading.....</h1>)}

<h2 className='text-center display-3 text-danger '>{errormsg}</h2>


    </div>
  )
}

export default User;