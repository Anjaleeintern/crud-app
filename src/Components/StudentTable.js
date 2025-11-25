import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function StudentTable() {
  const [students,setStudents]=useState("")
  const navigate = useNavigate()

  const DisplayDetails=(id)=>{
        navigate('/student/view/'+id);
  }
  const EditDetails=(id)=>{
    navigate('/student/edit/'+id)
  }
  const RemoveDetails=(id)=>{
    if(window.confirm("Are you sure you want to delete?")){
      fetch('https://crud-app-53ri.onrender.com/students/'+id,{
      method:'DELETE',
      
    })
    .then((res)=>{
      alert("Student Data Remove Successfully");
      window.location.reload()
    })
    .catch((err)=>console.log(err.message)
    )
    }
  }

  useEffect(()=>{
    fetch('https://crud-app-53ri.onrender.com/students')
    .then((res)=>
      res.json())
    .then((data)=>
      setStudents(data))
    .catch((err)=>console.log(err.message))
    },[])
  return (
    <div className='container'>
      <h1>Student Records</h1>
      <div className='table-container'>
        <Link to='/student/create' className='btn btn-add'>Add New Student</Link>
        <table className='crud-table'>
          <thead>
            <tr>
                <th>Sl No.</th>
                <th>Student Name</th>
                <th>Place</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { 
              students && students.map((items,index)=>(
                <tr key={items.id}>
                <td data-label="Id">{index+1}</td>
                <td data-label="Name">{items.name}</td>
                <td data-label="Place">{items.place}</td>
                <td data-label="Phone">{items.phone}</td>
                <td className='action-btns'>
                  <button className='btn btn-view'onClick={()=>DisplayDetails(items.id)}>View</button>
                  <button className='btn btn-edit'onClick={()=>EditDetails(items.id)}>Edit</button>
                  <button className='btn btn-delete'onClick={()=>RemoveDetails(items.id)}>Delete</button>
                </td>
              </tr>
              ))
              }
            </tbody>
        </table>
      </div>
      
    </div>
  )
}
