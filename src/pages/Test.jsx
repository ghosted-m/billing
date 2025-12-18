import ItemDetails from "@/components/ItemDetails";
import { products } from "@/components/praduct";
import { useState, useEffect } from "react";
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from "../utils/invoiceCalculations";

export default function Test(){
    const [items, setItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [totals, setTotals] = useState({ subTotal: "0.00", taxAmount: "0.00", grandTotal: "0.00" });

    const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "amount") {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setItems(newItems);
      // recalc totals after change
      const sub = calculateSubTotal(newItems);
      const tax = calculateTaxAmount(sub, 0);
      const grand = calculateGrandTotal(sub, 0);
      setTotals({ subTotal: sub, taxAmount: tax, grandTotal: grand });
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
    const currentSubTotal = calculateSubTotal(items);
    const currentTaxAmount = calculateTaxAmount(currentSubTotal, 0);
    const currentGrand = calculateGrandTotal(currentSubTotal, 0);
    setTotals({ subTotal: currentSubTotal, taxAmount: currentTaxAmount, grandTotal: currentGrand });
  };

  const addSelectedProduct = () => {
    const id = parseInt(selectedProductId, 10);
    if (!id) return;
    const prod = products.find((p) => p.id === id);
    if (!prod) return;
    const newItem = {
      name: prod.name,
      description: "",
      quantity: 1,
      amount: prod.value || 0,
      total: prod.value || 0,
      hsn: prod.code || "",
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    // update totals after adding
    const sub = calculateSubTotal(newItems);
    const tax = calculateTaxAmount(sub, 0);
    const grand = calculateGrandTotal(sub, 0);
    setTotals({ subTotal: sub, taxAmount: tax, grandTotal: grand });
    setSelectedProductId("");
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