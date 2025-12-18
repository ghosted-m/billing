import { useState, useEffect } from "react";
import { getUserData } from '../Auth/Database';
import { products } from "@/components/praduct";

const emptyForm = {
  name: '',
  quantity: '',
  hsns: '',
  gstin: '',
  total: '',
  description: '',
};

export const Abctest = () => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
      setFormData(products);
  }, []);

  const onItemChange = (event) => {
    const selectedName = event.target.value;
    const customer = formData.find(
      (c) => `${c[key1]?.name} - ${c[key1]?.gstin}` === selectedName
    );

    let updatedFormData = emptyForm;
    if (pro) {
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

//   return {
//     'itemsData':collectionData,
//     'formData':formData,
//     'items':onItemChange,
//   };

return(
    console.log(formData)
)
};
