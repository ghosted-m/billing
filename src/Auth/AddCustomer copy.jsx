import { useState } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import {collection, addDoc} from 'firebase/firestore';
import {db} from './database';

export default function AddCustomer() {
    const [clientAddress, setClientAddress] = useState({address1:'',address2:'',address3:''})
    const [clientInfo,setClientInfo] = useState({company:'',mobile:'',email:'',gstin:'',});

    const handleChange = (setter)=>(e)=>{
    const {name,value} = e.target;
    setter((prev)=>({...prev,[name]:value}))};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isClientInfoValid = Object.values(clientInfo).every(val => val.trim() !== '');
        const isClientAddressValid = Object.values(clientAddress).every(val => val.trim() !== '');
        if (!isClientInfoValid || !isClientAddressValid) {
            alert('Please fill in all required fields before submitting.');
            return;
        }
        const companyData = {clientInfo, clientAddress,}
        try {
            const docRef = await addDoc(collection(db, "users"), companyData);
            console.log("Document written with ID: ", docRef.id);
            setClientAddress({ address1: '', address2: '', address3: '' });
            setClientInfo({company: '', mobile: '', email: '', gstin: '', });}
        catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return(
        <>
        <div className='p-4 shadow-lg m-8'>
        <h3 className='font-semibold mb-4'>ADD CUSTOMER PROFILE</h3>
        <form onSubmit={handleSubmit} className='space-x-4'>
            <div className=''>

            <div className='mb-4'>
            <FloatingLabelInput
            id='CompanyName'
            label='COMPANY NAME'
            type='text'
            value={clientInfo.company}
            onChange={handleChange(setClientInfo)}
            name='company'
            />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
            <div className='mb-4'>
            <FloatingLabelInput
            id='mobile'
            label='Mobile'
            type='text'
            value={clientInfo.mobile}
            onChange={handleChange(setClientInfo)}
            name='mobile'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='email'
            label='EMAIL-ID'
            type='text'
            value={clientInfo.email}
            onChange={handleChange(setClientInfo)}
            name='email'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='gstin'
            label='GSTIN'
            type='text'
            value={clientInfo.gstin}
            onChange={handleChange(setClientInfo)}
            name='gstin'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add1'
            label='ADDRESS-1'
            type='text'
            value={clientAddress.address1}
            onChange={handleChange(setClientAddress)}
            name='address1'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add2'
            label='ADDRESS-2'
            type='text'
            value={clientAddress.address2}
            onChange={handleChange(setClientAddress)}
            name='address2'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add3'
            label='ADDRESS-3'
            type='text'
            value={clientAddress.address3}
            onChange={handleChange(setClientAddress)}
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
