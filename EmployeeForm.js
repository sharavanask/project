import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const EmployeeForm = () => {
    const [formData,setFormData]=useState({
        name:"",
        empid:"",
        email:"",
        ph:"",
        dept:"",
        djoin:"",
        role:""
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const departments=["hr","Engineering","Marketing"];

    const handlechange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
        setError('');
        setSuccess("");
    
    }
    const validate=()=>{
        if(!formData.name) return "Name is required";
        if(!formData.empid) return "Empid is required";
        if(!formData.email||!/\S+@\S+\.\S+/.test(formData.email)) return "valid Email is required";
        if (!formData.ph || !/^\d{10}$/.test(formData.ph)) return "Phone number must be 10 digits.";
        if (!formData.dept) return "Department is required.";
        if (!formData.djoin) return "Date of joining is required.";
        if (!formData.role) return "Role is required.";
        return null;
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const validationError=validate();
        if(validationError){
            setError(validationError);
            return;
        }
        try{
            const response = await axios.post('http://localhost:3001/employee',{
                name:formData.name,
                empid:formData.empid,
                email:formData.email,
                ph:formData.ph,
                dept:formData.dept,
                djoin:formData.djoin,
                role:formData.role
            });
            console.log("addsuccess")
            setSuccess("added successfully");
            setFormData({ name: "", empid: "", email: "", ph: "", dept: "", djoin: "", role: "" });

            
        }
        catch(err){
            console.log(err)
            setError(err.message);
        }
    };
  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Name</label>
            <input type='text' name='name' value={formData.name} onChange={handlechange} required />2
        </div>
        <div>
            <label>Employee ID</label>
            <input type='text' name="empid" value={formData.empid} onChange={handlechange} required/>
            
        </div>
        <div>
            <label>Email</label>
            <input type='Email' name='email' value={formData.email} onChange={handlechange} required />

        </div>
        <div>
            <label>Phone</label>
            <input type='tel' maxLength={10} name="ph" value={formData.ph} onChange={handlechange}    />    
        </div>
        <div>
            <label>Department</label>
            <select name="dept" value={formData.dept} onChange={handlechange}>
                <option value="">Select Department</option>
                {departments.map((dept)=>(
                    <option key={dept} value={dept}>{dept}</option>
                ))}
            </select>
        </div>
        <div>
            <label>Date of Joining:</label>
            <input type="date" name="djoin" max={new Date().toISOString().split('T')[0]} value={formData.djoin} onChange={handlechange} required />
        </div>
        <div>
            <label>Role:</label>
            <input type="text" name="role" value={formData.role} onChange={handlechange} required />
        </div>
        <button type="submit">Submit</button>
        <button type="reset" onClick={()=>setFormData({name:"",empid:"",email:"",ph:"",dept:"",djoin:"",role:""})}>Reset</button>
        {error && <p style={{color:'red'}}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  )
}

export default EmployeeForm