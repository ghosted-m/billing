import { useState, useEffect } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import {query, getDocs, collection, addDoc} from 'firebase/firestore';
import {db} from './database';

export default function Profile() {
    const [profileAdd, setProfileAdd] = useState({address1:'',address2:'',address3:''})
    const [profile,setProfile] = useState({company:'',mobile:'',email:'',gstin:'',});
    
    const handleChange = (setter)=>(e)=>{
    const {name,value} = e.target;
    setter((prev)=>({...prev,[name]:value}))};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isClientInfoValid = Object.values(profile).every(val => val.trim() !== '');
        const isClientAddressValid = Object.values(profileAdd).every(val => val.trim() !== '');
        if (!isClientInfoValid || !isClientAddressValid) {
            alert('Please fill in all required fields before submitting.');
            return;
        }
        const companyData = {profile, profileAdd,}
        try {
            const docRef = await addDoc(collection(db, "Profile"), companyData);
            console.log("Document written with ID: ", docRef.id);
            setProfileAdd({ address1: '', address2: '', address3: '' });
            setProfile({company: '', mobile: '', email: '', gstin: '', });}
        catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    const [dataRcv, setDataRcv] = useState([]);
    const fetchData = async () => {
    const q = query(collection(db, 'Profile'));
    const querySnapshot = await getDocs(q);
    const data =[];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      data.push({ id: doc.id, ...doc.data() });
    });
    setDataRcv(data); // Save to state
  };

  useEffect(() => {
    fetchData();
    console.log(dataRcv);
  }, []);

    return(
        <>
        <div className='p-4 shadow-lg m-8'>
        <h3 className='font-semibold mb-4'>ADD COMPANY PROFILE</h3>
        <form onSubmit={handleSubmit} className='space-x-4'>
            <div className=''>

            <div className='mb-4'>
            <FloatingLabelInput
            id='CompanyName'
            label='COMPANY NAME'
            type='text'
            value={profile.company}
            onChange={handleChange(setProfile)}
            name='company'
            
            />
            
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
            <div className='mb-4'>
            <FloatingLabelInput
            id='mobile'
            label='Mobile'
            type='text'
            value={profile.mobile}
            onChange={handleChange(setProfile)}
            name='mobile'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='email'
            label='EMAIL-ID'
            type='text'
            value={profile.email}
            onChange={handleChange(setProfile)}
            name='email'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='gstin'
            label='GSTIN'
            type='text'
            value={profile.gstin}
            onChange={handleChange(setProfile)}
            name='gstin'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add1'
            label='ADDRESS-1'
            type='text'
            value={profileAdd.address1}
            onChange={handleChange(setProfileAdd)}
            name='address1'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add2'
            label='ADDRESS-2'
            type='text'
            value={profileAdd.address2}
            onChange={handleChange(setProfileAdd)}
            name='address2'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add3'
            label='ADDRESS-3'
            type='text'
            value={profileAdd.address3}
            onChange={handleChange(setProfileAdd)}
            name='address3'
            />
            </div>
            </div>
            </div>
            <button type='submit'>Submit</button>
        </form>
        </div>
        </>
    );
}
