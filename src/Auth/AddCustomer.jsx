import { useState, useEffect } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import {collection, addDoc} from 'firebase/firestore';
import {db} from './database';
import axios from 'axios';

export default function AddCustomer() {
    const [clientAddress, setClientAddress] = useState({address1:'',address2:'',address3:''})
    const [clientInfo,setClientInfo] = useState({company:'',mobile:'',email:'',gstin:'',});

const apiKey = 'Tm7sKiOodVOAoYhECbp9I9amIGk2';
  const [gstin, setGstin] = useState('');
  const [formData, setFormData] = useState({
    tradeNam: '',
    ctb: '',
    rgdt: '',
    add1:'',
    add2:'',
    add3:'',
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://appyflow.in/api/verifyGST?gstNo=${gstin}&key_secret=${apiKey}`);
        const data = response.data;
        const taxpayer = data.taxpayerInfo || {};
        const address = taxpayer.pradr?.addr || {};
        const add1 = [address.bno, address.st, address.loc]
        .filter(Boolean)
        .join(', ');
        const add2 = [address.city, address.dst]
        .filter(Boolean)
        .join(', ');
        const add3 = [address.stcd, address.pncd]
        .filter(Boolean) 
        .join(', '); 
        setFormData({
          tradeNam: taxpayer.tradeNam || '',
          ctb: taxpayer.ctb || '',
          rgdt: taxpayer.rgdt || '',
          add1: add1 || '',
          add2: add2 || '',
          add3: add3 || '',
        });
      } catch (err) {
        console.error('Failed to fetch GST data:', err);
        setFormData({ tradeNam: '', ctb: '', rgdt: '', dst: '' });
      } 
    };

    // Only call when GSTIN is exactly 15 characters
    if (gstin.length === 15) {
      fetchData();
    }
  }, [gstin]);

  // Handle typing into GST field
  const handleGstinChange = (e) => {
    setGstin(e.target.value.toUpperCase()); // GSTINs are uppercase
  };

  // Handle other input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
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
            value={formData.tradeNam}
            onChange={handleInputChange}
            name='tradeNam'
            />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
            <div className='mb-4'>
            <FloatingLabelInput
            id='mobile'
            label='Mobile'
            type='text'
            value={formData.pradr}
            onChange={handleInputChange}
            name='ctb'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='email'
            label='EMAIL-ID'
            type='text'
            value={formData.rgdt}
            onChange={handleInputChange}
            name='rgdt'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='gstin'
            label='GSTIN'
            type='text'
            value={gstin}
            onChange={handleGstinChange}
            maxLength={15}
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add1'
            label='ADDRESS-1'
            type='text'
            value={formData.add1}
            onChange={handleInputChange}
            name='add1'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add2'
            label='ADDRESS-2'
            type='text'
            value={formData.add2}
            onChange={handleInputChange}
            name='add2'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add3'
            label='ADDRESS-3'
            type='text'
            value={formData.add3}
            onChange={handleInputChange}
            name='add3'
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
