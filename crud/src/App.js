import React, { useState, useEffect } from 'react'
import { Data } from './EmployeData'

function App() {


     const[data, setData]= useState([]);
     const[firstName, setFisrtName]= useState('')
     const[lastName, setLastName]= useState('')
     const[age, setAge]= useState(0)
     const[id, setId]=useState(0)

     const[isUpdate, setIsUpdate]= useState(false)


     useEffect(()=>{
      setData(Data)
     },[]);

      const handleEdit =(id) =>{
        const dt = data.filter(item => item.id === id);
        if(dt !==undefined)
        {
          setIsUpdate(true)
          setId(id)
          setFisrtName(dt[0].firstName);
          setLastName(dt[0].lastName);
          setAge(dt[0].age);
        }
      }


      const handleDelete = (id) =>{
        if(id > 0)
        {
          if(window.confirm('Are you sure to delete this item'))
          {
          const dt = data.filter(item => item.id !== id);
          setData(dt);
          }
        }
      }
             



      const handleUpdate =() =>{
           const index = data.map((item) =>{
            return item.id
           }).indexOf(id);


        const dt = [...data];
        dt[index].firstName = firstName;
        dt[index].lastName = lastName;
        dt[index].age = age;

        setData(dt);
        handleClear()
      }

             const handleSave =(e) =>{
                    
                     let error = "";
                     if(firstName ==='')
                      error += 'First Name is required'

                     if(lastName ==='')
                      error += 'Last Name is required'
                      if(age <= 0)
                      error +='age is required'
                    if(error===''){
                      alert('Save Record');
                      e.preventDefault();


                      const dt=[...data];
                      const newObject = {
                        id:Data.length+1,
                        firstName:firstName,
                        lastName:lastName,
                        age:age
                      }
                       

                      dt.push(newObject)
                       setData(dt)
                    }


                   else{
                    alert(`Error :${error}`);
                   }
             }


      const handleClear =() =>{
        {
          setId()
          setFisrtName('');
          setLastName('');
          setAge('');
          setIsUpdate(false)
        }
      }



  return (
    <div>



         <div style={{display:'flex', justifyContent:'center', marginTop:'1rem'}}>
                <div>

                     <label>First Name
                      <input type='text' placeholder='Enter First name' onChange={(e)=> setFisrtName(e.target.value)} value={firstName}/>
                     </label>
                     </div>

                     <div>
                     <label>Last Name
                      <input type='text' placeholder='Enter Last name' onChange={(e)=> setLastName(e.target.value)} value={lastName}/>
                     </label>
                     </div>


                     <div>
                     <label>Age
                      <input type='text' placeholder='Enter age' onChange={(e)=> setAge(e.target.value)} value={age}/>
                     </label>
                </div>
                  
                  <div >
                    {

                     !isUpdate ?
                     <button className='btn btn-primary' onClick={(e)=>handleSave(e)}>Save</button>
                      :
                      <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button>

                    }
              
                  
                  <button className='btn btn-danger' onClick={() =>handleClear()}>Clear</button>
                    
                  </div>





         </div>
          
          <table className='table table-hover'>
            <thead>
              <tr>
                <td>Sr.no</td>
                <td>Id</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Age</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
                  {
                    data.map((item, index)=>{
                      return(
                           
                             <tr key={index}>
                                 <td>{index+ 1}</td>
                                <td>{item.id}</td> 
                                <td>{item.firstName}</td> 
                                <td>{item.lastName}</td> 
                                <td>{item.age}</td> 
                                <td>
                                  <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>
                                  <button className='btn btn-danger' onClick={() =>handleDelete(item.id)}>Delete</button>
                                </td>
                             </tr>





                      )
                    })
                  }
            </tbody>
          </table>
    </div>
  )
}

export default App