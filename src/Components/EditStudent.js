import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditStudent() {
  const {studentid}=useParams()
  const [id,setId]=useState("");
  const [name,setName]=useState("");
  const [place,setPlace]=useState("");
  const [phone,setPhone]=useState("");
  const navigate=useNavigate();
  const [validation, setValidation] =useState(false)
  // const [studentdata,setStudentdata]=useState({})

  useEffect(()=>{
    fetch('http://localhost:8000/students/'+studentid)
    .then((res)=>res.json())
    .then((data)=>{
      setId(data.id)
      setName(data.name)
      setPlace(data.place)
      setPhone(data.phone)
    })
    .catch((err)=>console.log(err.message)
    )
  },[])

  const handleSubmit=(e)=>{
    e.preventDefault();
   const studentData=({id,name,place,phone});
    fetch('http://localhost:8000/students/'+studentid,{
      method:'PUT',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(studentData)
    })
    .then((res)=>{
      alert("Student Data Updated Successfully");
      navigate('/');
    })
    .catch((err)=>console.log(err.message)
    )

  }
  return (
    <div className='container'>
      <h1>Edit Student Details</h1>
      <form className='crud-form' onSubmit={handleSubmit}>
        <label htmlFor='id'>Id:</label>
        <input type='text' id='id' name='id' required
         value={id} onChange={(e)=>setId(e.target.value)}
         onMouseDown={()=>setValidation(true)}></input>
         {id.length===0 && validation && <span className='err-msg'>Please Enter Your Id</span>}

        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' name='name' required
         value={name} onChange={(e)=>setName(e.target.value)}
          onMouseDown={()=>setValidation(true)}></input>
         {name.length===0 && validation && <span className='err-msg'>Please Enter Your Name</span>}

        <label htmlFor='place'>Place:</label>
        <input type='text' id='place' name='place' required 
        value={place} onChange={(e)=>setPlace(e.target.value)} 
         onMouseDown={()=>setValidation(true)}></input>
        {place.length===0 && validation && <span className='err-msg'>Please Enter Your Place</span>}

        <label htmlFor='id'>Phone:</label>
        <input type='text' id='phone' name='phone' required 
        value={phone} onChange={(e)=>setPhone(e.target.value)}
         onMouseDown={()=>setValidation(true)}></input>
        {phone.length===0 && validation && <span className='err-msg'>Please Enter Your Phone</span>}

        <div className='action-btns'>
          <button className='btn btn-save'>Update</button>
          <Link to='/' className='btn btn-back'>Back</Link>
        </div>
      </form>
    </div>
  )
}
