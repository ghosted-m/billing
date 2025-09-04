import FloatingLabelInput from './FloatingLabelInput';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getUserData } from '../Auth/Database';
import { useState, useEffect } from 'react';




const BillToSection = ({selectedCurrency, setSelectedCurrency }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUserData();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  



   const [formData, setFormData] = useState({});
     const handleCustomerChange = (event) => {
  const selectedName = event.target.value;
  const customer = users.find(
    (c) => `${c.clientInfo.company} - ${c.clientInfo.gstin}` === selectedName
  );

  if (customer) {
    const { clientInfo, clientAddress } = customer;
    setFormData({
      company: clientInfo.company || '',
      mobile: clientInfo.mobile || '',
      email: clientInfo.email || '',
      gstin: clientInfo.gstin || '',
      address1: clientAddress.address1 || '',
      address2: clientAddress.address2 || '',
      address3: clientAddress.address3 || '',
    });
  } else {
    setFormData({
      company: '',
      mobile: '',
      email: '',
      gstin: '',
      address1: '',
      address2: '',
      address3: '',
    });
  }
};


  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Select Currency</h3>
        <RadioGroup
          value={selectedCurrency}
          onValueChange={setSelectedCurrency}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="INR" id="inr" />
            <Label htmlFor="inr">INR (₹)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="USD" id="usd" />
            <Label htmlFor="usd">USD ($)</Label>
          </div>
        </RadioGroup>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Bill To</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className='col-span-2'>
        <FloatingLabelInput
          id="billToName"
          label="Name"
          value={formData.company}
          onChange={handleCustomerChange}
          name="name"
          list='receivedData'
        />
        <datalist id='receivedData'>
          {users.map(data=>(<option key={data.id} value={`${data.clientInfo.company} - ${data.clientInfo.gstin}`} />))}
        </datalist>
        </div>
        <FloatingLabelInput
          id="billToPhone"
          label="Phone"
          value={formData.mobile}
          name="phone"
          onChange={() => {}}
        />
        <FloatingLabelInput
          id="billToGSTIN"
          label="GSTIN"
          value={formData.gstin}
          name="gstin"
          onChange={() => {}}
        />
      </div>
      <FloatingLabelInput
        id="billToAddress"
        label="Address"
        value={formData.address}
        name="address"
        className="mt-4"
        onChange={() => {}}
      />
      <FloatingLabelInput
        id="billToAddress"
        label="Address-2"
        value={formData.address2}
        name="address2"
        className="mt-4"
        onChange={() => {}}
      />
      <FloatingLabelInput
        id="billToAddress"
        label="Address-3"
        value={formData.address3}
        name="address3"
        className="mt-4"
        onChange={() => {}}
      />
    </div>
  );
};

export default BillToSection;