import FloatingLabelInput from '../components/FloatingLabelInput';
import BillToSection from '../components/BillToSection';
import ShipToSection from '../components/ShipToSection';
import ItemDetails from "../components/ItemDetails";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { templates } from "../utils/templateRegistry";
import { FiEdit, FiFileText, FiTrash2 } from "react-icons/fi";
import { RefreshCw } from "lucide-react";
import Company from '../components/Company';
import { FetchData } from "@/Auth/FetchData";

const generateRandomInvoiceNumber = () => {
  const length = Math.floor(Math.random() * 6) + 3;
  const alphabetCount = Math.min(Math.floor(Math.random() * 4), length);
  let result = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  for (let i = 0; i < alphabetCount; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  for (let i = alphabetCount; i < length; i++) {
    result += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return result;
};
const noteOptions = [
  "Thank you for choosing us today! We hope your shopping experience was pleasant and seamless. Your satisfaction matters to us, and we look forward to serving you again soon. Keep this receipt for any returns or exchanges.",
  "Your purchase supports our community! We believe in giving back and working towards a better future. Thank you for being a part of our journey. We appreciate your trust and hope to see you again soon.",
  "We value your feedback! Help us improve by sharing your thoughts on the text message survey link. Your opinions help us serve you better and improve your shopping experience. Thank you for shopping with us!",
];
const Index = () => {
  const navigate = useNavigate();
  const { firmCollectionData, firmFormData, firmHandleCompanyChange } = FetchData( 'Profile', 'profile', 'profileAdd','firm');
  const { customerCollectionData, customerFormData, customerHandleCompanyChange } = FetchData( 'users', 'clientInfo', 'clientAddress','customer');
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [billTo, setBillTo] = useState({});
  const [shipTo, setShipTo] = useState({ name: "", address1: "", address2:'',address3:'', phone: ""   });
  const [invoice, setInvoice] = useState({date: "", paymentDate: "", number: generateRandomInvoiceNumber(),});
  const [yourCompany, setYourCompany] = useState({});
  const [items, setItems] = useState([]);
  const [taxPercentage, settaxPercentage] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [notes, setNotes] = useState("");
  const refreshNotes = () => {
    const randomIndex = Math.floor(Math.random() * noteOptions.length);
    setNotes(noteOptions[randomIndex]);
  };

//section for set data into localStorage...

  useEffect(() => {
    // Load form data from localStorage on component mount
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo || { name: "", address: "", phone: "" });
      setShipTo(parsedData.shipTo || { name: "", address: "", phone: "" });
      setInvoice(
        parsedData.invoice || { date: "", paymentDate: "", number: "" }
      );
      setYourCompany(
        parsedData.yourCompany || { name: "", address: "", phone: "" }
      );
      setItems(parsedData.items || []);
      settaxPercentage(parsedData.taxPercentage || 0);
      setNotes(parsedData.notes || "");
      setSelectedCurrency(parsedData.selectedCurrency || "INR"); // Load selectedCurrency from localStorage
    } else {
      // If no saved data, set invoice number
      setInvoice((prev) => ({
        ...prev,
        number: generateRandomInvoiceNumber(),
      }));
    }
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const formData = {
      billTo,
      shipTo,
      invoice,
      yourCompany,
      items,
      taxPercentage,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
      selectedCurrency, // Add selectedCurrency to localStorage
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [
    billTo,
    shipTo,
    invoice,
    yourCompany,
    items,
    taxPercentage,
    notes,
    taxAmount,
    subTotal,
    grandTotal,
    selectedCurrency, // Add selectedCurrency to localStorage dependency array
  ]);

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

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

  const calculateSubTotal = () => {
    const calculatedSubTotal = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
    setSubTotal(calculatedSubTotal); 
    return calculatedSubTotal;
  };

  const calculateTaxAmount = (subTotalValue) => { 
    const tax = (subTotalValue * taxPercentage) / 100;
    setTaxAmount(tax); 
    return tax;
  };

  const calculateGrandTotal = (subTotalValue, taxAmountValue) => { 
    const total = parseFloat(subTotalValue) + parseFloat(taxAmountValue);
    setGrandTotal(total); 
    return total;
  };

  const updateTotals = () => {
    const currentSubTotal = calculateSubTotal();
    const currentTaxAmount = calculateTaxAmount(currentSubTotal);
    calculateGrandTotal(currentSubTotal, currentTaxAmount);
  };

  const handleTaxPercentageChange = (e) => {
    const taxRate = parseFloat(e.target.value) || 0;
    settaxPercentage(taxRate);
  };

  useEffect(() => {
    updateTotals();
  }, [items, taxPercentage]); 

  const handleTemplateClick = (templateNumber) => {
    const formData = {
      billTo,
      shipTo,
      invoice,
      yourCompany,
      items,
      taxPercentage,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
      selectedCurrency, // Add this
    };
    navigate("/template", {
      state: { formData, selectedTemplate: templateNumber },
    });
  };

  const clearForm = () => {
    setBillTo({ name: "", phone: "", address1: "", address2:'', address3:'', gstin:'', });
    setShipTo({ name: "", phone:'', address1: "", address2:'', address3:'', });
    setInvoice({
      date: "",
      paymentDate: "",
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({ company:'',
    phone:'',
    gstin:'',
    address1:'',
    address2:'',
    address3:'', });
    setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
    settaxPercentage(0);
    setNotes("");
    localStorage.removeItem("formData");
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const fullFormData = {
    billTo,
    shipTo,
    invoice,
    yourCompany,
    items,
    taxPercentage,
    taxAmount,
    subTotal,
    grandTotal,
    notes,
    currency: selectedCurrency
  };

  console.log(fullFormData); 
};


  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold mb-8 text-center">Bill Generator</h1>
      <div className="fixed top-4 left-4 flex gap-2">
        <button
          onClick={clearForm}
          className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
          aria-label="Clear Form"
        >
          <FiTrash2 size={24} />
        </button>
        <button
          onClick={()=>{}}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
          aria-label="Fill with Dummy Data"
        >
          <FiEdit size={24} />
        </button>
      </div>
      <button
        onClick={() =>
          navigate("/receipt", {
            state: {
              formData: {
                billTo,
                shipTo,
                invoice,
                yourCompany,
                items,
                taxPercentage,
                notes,
                selectedCurrency, // Ensure this is passed
              },
            },
          })
        }
        className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600"
        aria-label="Switch to Receipt"
      >
        <FiFileText size={24} />
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} autoComplete='off'>
            <BillToSection
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
              customerCollectionData={customerCollectionData}
              customerFormData={customerFormData}
              onChange={customerHandleCompanyChange}

            />
            <ShipToSection
              shipTo={shipTo}
              handleInputChange={handleInputChange(setShipTo)}
              billTo={billTo}
            />

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Invoice Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FloatingLabelInput
                  id="invoiceNumber"
                  label="Invoice Number"
                  value={invoice.number}
                  onChange={handleInputChange(setInvoice)}
                  name="number"
                />
                <FloatingLabelInput
                  id="invoiceDate"
                  label="Invoice Date"
                  type="date"
                  value={invoice.date}
                  onChange={handleInputChange(setInvoice)}
                  name="date"
                />
                <FloatingLabelInput
                  id="paymentDate"
                  label="Payment Date"
                  type="date"
                  value={invoice.paymentDate}
                  onChange={handleInputChange(setInvoice)}
                  name="paymentDate"
                />
              </div>
            </div>

            <Company 
            firmCollectionData={firmCollectionData}
            firmFormData={firmFormData}
            onChange={firmHandleCompanyChange}
            />
            
            <ItemDetails
              items={items}
              handleItemChange={handleItemChange}
              addItem={addItem}
              removeItem={removeItem}
              currencyCode={selectedCurrency}
            />

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Totals</h3>
              <div className="flex justify-between mb-2">
                <span>Sub Total:</span>
                <span>{formatCurrency(subTotal, selectedCurrency)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax Rate (%):</span>
                <input
                  type="number"
                  value={taxPercentage}
                  onChange={(e) => handleTaxPercentageChange(e)}
                  className="w-24 p-2 border rounded"
                  min="0"
                  max="28"
                  step="1"
                />
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax Amount:</span>
                <span>{formatCurrency(taxAmount, selectedCurrency)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Grand Total:</span>
                <span>{formatCurrency(grandTotal, selectedCurrency)}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium">Notes</h3>
                <button
                  type="button"
                  onClick={refreshNotes}
                  className="ml-2 p-1 rounded-full hover:bg-gray-200"
                  title="Refresh Notes"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              ></textarea>
            </div>

            {/* Clear Form button removed */}
            <input type='reset' value='Reset' className='px-4 py-2'/>
            <input type='submit' value='Submit' />
          </form>
        </div>

        <div
          className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md overflow-y-auto"
          // style={{ maxHeight: "calc(100vh - 2rem)" }}
        >
          <h2 className="text-2xl font-semibold mb-4">Template Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <div
                key={index}
                className="template-card bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleTemplateClick(index + 1)}
              >
                <img
                  src={`/assets/template${index + 1}-preview.png`}
                  alt={template.name}
                  className={`w-full ${
                    template.name === "Template 10"
                      ? "h-[38px] w-[57px]"
                      : "h-50"
                  } object-cover rounded mb-2`}
                />
                <p className="text-center font-medium">{template.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
