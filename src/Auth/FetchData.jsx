import { useState, useEffect } from "react";
import { getUserData } from '../Auth/Database';

const emptyForm = {
  company: '',
  phone: '',
  email: '',
  gstin: '',
  address1: '',
  address2: '',
  address3: '',
};

export const FetchData = (onCompanySelect, collectionName, key1='', key2='') => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUserData(collectionName);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleCompanyChange = (event) => {
    const selectedName = event.target.value;
    const customer = users.find(
      (c) => `${c[key1]?.company} - ${c[key1]?.gstin}` === selectedName
    );

    let updatedFormData = emptyForm;
    if (customer) {
      const details = customer[key1] || {};
      const add = customer[key2] || {};
      updatedFormData = {
        ...emptyForm, 
        ...details, 
        ...add,
      };
    }

    setFormData(updatedFormData);

    ()=>{
    onCompanySelect(updatedFormData);
    }
  };

  return {
    users,
    formData,
    handleCompanyChange,
  };
};
