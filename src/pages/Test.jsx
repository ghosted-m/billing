import ItemDetails from "@/components/ItemDetails";
import { products } from "@/components/praduct";
import { useState, useEffect } from "react";

export default function Test(){
    const [items, setItems] = useState([]);

    const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "amount") {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setItems(newItems);
    updateTotals();
  };
    const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 0, amount: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const updateTotals = () => {
    const currentSubTotal = calculateSubTotal();
    const currentTaxAmount = calculateTaxAmount(currentSubTotal);
    calculateGrandTotal(currentSubTotal, currentTaxAmount);
  };

    return(
        <>
        <ItemDetails
              items={items}
              handleItemChange={handleItemChange}
              addItem={addItem}
              removeItem={removeItem}
              currencyCode={'INR'}
            />
        </>
    )
}