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

export const FetchData = (collectionName, key1='', key2='', prefix='') => {
  const [collectionData, setCollectionData] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUserData(collectionName);
      setCollectionData(data);
    };
    fetchUsers();
  }, []);

  const handleCompanyChange = (event) => {
    const selectedName = event.target.value;
    const customer = collectionData.find(
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
  };

  return {
    [`${prefix}CollectionData`]:collectionData,
    [`${prefix}FormData`]:formData,
    [`${prefix}HandleCompanyChange`]:handleCompanyChange,
  };
};
