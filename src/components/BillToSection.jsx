import FloatingLabelInput from './FloatingLabelInput';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const BillToSection = ({selectedCurrency, setSelectedCurrency, customerCollectionData, customerFormData, onChange }) => {


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
          value={customerFormData.company}
          onChange={onChange}
          name="company"
          list='receivedData'
        />
        <datalist id='receivedData'>
          {customerCollectionData.map(data=>(<option key={data.id} value={`${data.clientInfo.company} - ${data.clientInfo.gstin}`} />))}
        </datalist>
        </div>
        <FloatingLabelInput
          id="billToPhone"
          label="Phone"
          value={customerFormData.mobile}
          name="mobile"
        />
        <FloatingLabelInput
          id="billToGSTIN"
          label="GSTIN"
          value={customerFormData.gstin}
          name="gstin"
        />
      </div>
      <FloatingLabelInput
        id="billToAddress"
        label="Address"
        value={customerFormData.address1}
        name="address1"
        className="mt-4"
      />
      <FloatingLabelInput
        id="billToAddress"
        label="Address-2"
        value={customerFormData.address2}
        name="address2"
        className="mt-4"
      />
      <FloatingLabelInput
        id="billToAddress"
        label="Address-3"
        value={customerFormData.address3}
        name="address3"
        className="mt-4"
      />
    </div>
  );
};
export default BillToSection;