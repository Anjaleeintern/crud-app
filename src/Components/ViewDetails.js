import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewDetails() {

  const {studentid}=useParams()
  const [studentdata,setStudentdata]=useState({})

  useEffect(()=>{
    fetch('https://crud-app-53ri.onrender.com/students/'+studentid)
    .then((res)=>res.json())
    .then((data)=>setStudentdata(data))
    .catch((err)=>console.log(err.message)
    )
  },[])
  return (
    <div className='container'>
      <h1>Student Details</h1>
     { studentdata && <div className='details'>
        <p><strong>Id: </strong>{studentdata.id}</p>
        <p><strong>Name: </strong>{studentdata.name}</p>
        <p><strong>Place: </strong>{studentdata.place}</p>
        <p><strong>Phone: </strong>{studentdata.phone}</p>
      </div>}
      <Link to='/'className='btn btn-back'>Back</Link>
    </div>
  )
}
