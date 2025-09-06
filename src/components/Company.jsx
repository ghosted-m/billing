import { useState, useEffect } from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import { getUserData } from "@/Auth/Database";

const Company = ({CompanySelection})=>{
const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUserData();
      setUsers(data);
      console.log(data);
    };
    fetchUsers();
  }, []);
  
const [formData, setFormData] = useState({});

const handleCustomerChange = (event) => {
  const selectedName = event.target.value;
  const customer = users.find(
    (c) => `${c.clientInfo.company} - ${c.clientInfo.gstin}` === selectedName
  );

  let updatedFormData;
  if (customer) {
    const { clientInfo, clientAddress } = customer;
    updatedFormData = {
      company: clientInfo.company || '',
      phone: clientInfo.mobile || '',
      email: clientInfo.email || '',
      gstin: clientInfo.gstin || '',
      address1: clientAddress.address1 || '',
      address2: clientAddress.address2 || '',
      address3: clientAddress.address3 || '',
    };
  } else {
    updatedFormData = {
      company: '',
      phone: '',
      email: '',
      gstin: '',
      address1: '',
      address2: '',
      address3: '',
    };
  }
  setFormData(updatedFormData);
  CompanySelection(updatedFormData); // Send to parent
};

  return(
    <>
    <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Your Company</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="yourCompanyName"
                  label="Name"
                  value={formData.company}
                  onChange={handleCustomerChange}
                  name="company"
                  list="receivedData"
                />
                <datalist id='receivedData'>
                 {users.map(data=>(<option key={data.id} value={`${data.clientInfo.company} - ${data.clientInfo.gstin}`} />))}
                </datalist>
                <FloatingLabelInput
                  id="yourCompanyPhone"
                  label="Phone"
                  value={formData.phone}
                  onChange={()=>{}}
                  name="phone"
                />
              </div>
              <FloatingLabelInput
                id="yourCompanyGSTIN"
                label="GSTIN"
                value={formData.gstin}
                name="gstin"
                className="mt-4"
              />
              <FloatingLabelInput
                id="yourCompanyAddress1"
                label="Address"
                value={formData.address1}
                name="address1"
                className="mt-4"
              />
              <FloatingLabelInput
                id="yourCompanyAddress2"
                label="Address"
                value={formData.address2}
                name="address2"
                className="mt-4"
              />
              <FloatingLabelInput
                id="yourCompanyAddress3"
                label="Address"
                value={formData.address3}
                name="address3"
                className="mt-4"
              />
            </div>
    </>
  );
}
export default Company;