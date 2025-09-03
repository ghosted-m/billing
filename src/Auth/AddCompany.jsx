import { useState } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';

export default function Company() {
    const [add, setAdd] = useState({address1:'',address2:'',address3:''})
    const [formData,setFormData] = useState({
        company:'',
        mobile:'',
        email:'',
        gstin:'',
    });
    
        const handleChange = (setter)=>(e)=>{
        const {name,value} = e.target;
        setter((prev)=>({...prev,[name]:value}))};

    const handleSubmit = (e) => {
    e.preventDefault();
    const companyData ={
        formData,
        add,
    }
        console.log(companyData);
    }
    return(
        <>
        <div className='p-4 shadow-lg m-8'>
            <h3 className='font-semibold mb-4'>COMPANY DETAILS</h3>
        <form onSubmit={handleSubmit} className='space-x-4'>
            <div className=''>

            <div className='mb-4'>
            <FloatingLabelInput
            id='CompanyName'
            label='COMPANY NAME'
            type='text'
            value={formData.company}
            onChange={handleChange(setFormData)}
            name='company'
            />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
            <div className='mb-4'>
            <FloatingLabelInput
            id='mobile'
            label='Mobile'
            type='text'
            value={formData.mobile}
            onChange={handleChange(setFormData)}
            name='mobile'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='email'
            label='EMAIL-ID'
            type='text'
            value={formData.email}
            onChange={handleChange(setFormData)}
            name='email'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='gstin'
            label='GSTIN'
            type='text'
            value={formData.gstin}
            onChange={handleChange(setFormData)}
            name='gstin'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add1'
            label='ADDRESS-1'
            type='text'
            value={formData.address1}
            onChange={handleChange(setAdd)}
            name='address1'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add2'
            label='ADDRESS-2'
            type='text'
            value={formData.address2}
            onChange={handleChange(setAdd)}
            name='address2'
            />
            </div>
            <div className='mb-4'>
            <FloatingLabelInput
            id='add3'
            label='ADDRESS-3'
            type='text'
            value={formData.address3}
            onChange={handleChange(setAdd)}
            name='address3'
            />
            </div>
            </div>
            <input type='Submit' value='Submit'/>
            </div>
        </form>
        </div>
        </>
    );
}
