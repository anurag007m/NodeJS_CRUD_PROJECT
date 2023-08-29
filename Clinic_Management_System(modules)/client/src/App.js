
import './App.css';

import { useState } from 'react';

import Axios from 'axios'

function App() {

  const[clinicname,setClinicname]=useState(""); 

  const[contactnumber,setContactnumber]=useState(0); 

  const[aboutclinic,setAboutclinic]=useState(""); 

  const[clinicaddress,setClinicaddress]=useState(""); 

  const[clinichour,setClinichour]=useState(0); 

  const [newClinichour,setNewClinichour] = useState(0);


  const [clinicList,setClinicList]=useState([]);


  
const addClinic=()=>{



  Axios.post('http://localhost:3001/create',
  {
 clinicname:clinicname,
 contactnumber:contactnumber,
 aboutclinic:aboutclinic,
 clinicaddress:clinicaddress,
 clinichour:clinichour,

}).then(()=>{
  setClinicList([...clinicList,
  
    {
      clinicname:clinicname,
      contactnumber:contactnumber,
      aboutclinic:aboutclinic,
 clinicaddress:clinicaddress,
 clinichour:clinichour,
     
     },

  ])
});

};

const getClinic =()=>{

  Axios.get('http://localhost:3001/clinics').then((response)=>{
  setClinicList(response.data );
});


};

const updateClinicClinichour=(id)=>{
  Axios.put('http://localhost:3001/update',{clinichour:newClinichour,id:id}).then((response)=>{
    setClinicList(clinicList.map((val)=>{
      return val.id === id ?
      {id:val.id,clinicname:val.clinicname,aboutclinic:val.aboutclinic,contactnumber:val.contactnumber,clinicaddress:val.clinicaddress,clinichour:newClinichour}:val;
    })
    );
  }
  );
};

const deleteClinic=(id)=>{
  Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
    setClinicList(clinicList.filter((val)=>{
      return val.id !== id
    })
    );
  });
}

  return (



    <div className="App">



    

    <div className='information'>

    
    <nav>
      <img src="FIRST_MEDIX_LOGO.png" alt="logo" />
    </nav>

    <label>Clinic Name</label>
      <input type="text" onChange={(event)=>{setClinicname(event.target.value);
      }}

      placeholder='Enter Clinic Name'
       />

    <label>Contact Number</label>
      <input type="number" 
      onChange={(event)=>{setContactnumber(event.target.value);
      }}

      placeholder='Enter Contact Number'

      // pattern="[0-9]*" inputmode="numeric"
       />

    <label>About Clinic</label>
      <input type="text"
      onChange={(event)=>{setAboutclinic(event.target.value);
      }}

      placeholder='Write Description'

       />

    <label>Clinic Address</label>
      <input type="text"
      onChange={(event)=>{setClinicaddress(event.target.value);
      }}

      placeholder='Enter Clinic Address'
       />

    <label>Clinic Timing</label>
      <input type="number"
onChange={(event)=>{setClinichour(event.target.value);
      }}

      placeholder='Enter Clinic Timings'

       />
      <button onClick={addClinic}>Add Clinic</button>
    </div>

      
<div className="clinics">
      <button onClick={getClinic}>Show Clinics</button>


      {clinicList.map((val,key)=>{
        return (
        
         <div className='clinic'> 
        
        <div>
        <h3>Clinic Name: {val.clinicname}</h3>
        <h3>Contact Number:{val.contactnumber}</h3>
        <h3>About Clinic: {val.aboutclinic}</h3>
        <h3>Clinic Address: {val.clinicaddress}</h3>
        <h3>Clinic Timings: {val.clinichour}</h3>
</div>
          <div>
          
          <input type="text" placeholder="Timings" className='timings'

onChange={(event)=>{setNewClinichour(event.target.value);
      }}

          />
          <button onClick={()=>updateClinicClinichour(val.id)} className='updel'>

          Update
          
          </button>


      <button onClick={()=>{
        deleteClinic(val.id);
      }} className='updel'>
      Delete</button>


          </div>

         </div>
        );
      
      })}

      </div>

    </div>
  );
}

export default App;
