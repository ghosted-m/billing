import FloatingLabelInput from './FloatingLabelInput';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FetchData } from "@/Auth/FetchData";

const BillToSection = ({selectedCurrency, setSelectedCurrency, onCompanySelect }) => {
  
    const { users, formData, handleCompanyChange } = FetchData(onCompanySelect, 'users', 'clientInfo', 'clientAddress');
  

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
          onChange={handleCompanyChange}
          name="company"
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
          name="mobile"
        />
        <FloatingLabelInput
          id="billToGSTIN"
          label="GSTIN"
          value={formData.gstin}
          name="gstin"
        />
      </div>
      <FloatingLabelInput
        id="billToAddress"
        label="Address"
        value={formData.address1}
        name="address1"
        className="mt-4"
      />
      <FloatingLabelInput
        id="billToAddress"
        label="Address-2"
        value={formData.address2}
        name="address2"
        className="mt-4"
      />
      <FloatingLabelInput
        id="billToAddress"
        label="Address-3"
        value={formData.address3}
        name="address3"
        className="mt-4"
      />
    </div>
  );
};

export default BillToSection;