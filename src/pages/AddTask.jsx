import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import './pages.css'

const AddTask = () => {
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("You dont add any desc yet, feel free to edit it...") ;
    const [deadline,setDeadline] = useState("") ;
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!title.trim()) return toast.info("Title is required!") ;

        try {
            const res = await api.post("/todos/add",
                {title,desc,deadline},
                {withCredentials:true}
            );
            if(res.status === 201){
                toast.success("Task added successfully ✅") ;
                navigate("/todos") ;
            }

        } catch (err) {
            console.error("Error adding todo: " , err) ;
            toast.error("Failed to add todo ! try again later") ;
        }
        
        }

    

  return (
    <div className='addTask'>
        <div className="container mt-4" style={{maxWidth:"600px"}}>
            <h2 className="text-center mb-4">Add New Task 🧠</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label className='form-label'>Title</label>
                    <input type="text" className="form-control" placeholder='Enter task title' value={title} 
                        onChange={(e)=> setTitle(e.target.value)} required
                    />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Description</label>
                    <textarea 
                        className='form-control'
                        rows="3"
                        placeholder='Feel free to add you desc...'
                        value={desc}
                        onChange={(e)=> setDesc(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label  className="form-label">DeadLine</label>
                    <input type="date" className='form-control'
                        value={deadline}
                        onChange={(e)=> setDeadline(e.target.value)}    
                    />
                </div>

                <button type='submit' className='btn btn-primary w-100'>
                    ADD TASK
                </button>

            </form>

        </div>
    </div>
  )
}

export default AddTask ;