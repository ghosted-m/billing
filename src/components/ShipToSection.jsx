import { useState } from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ShipToSection = ({ shipTo, handleInputChange, billTo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copyBillToShip, setCopyBillToShip] = useState(false);

  const toggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleCopyBillToShip = (e) => {
    setCopyBillToShip(e.target.checked);
    if (e.target.checked) {
      handleInputChange({ target: { name: 'name', value: billTo.company } });
      handleInputChange({ target: { name: 'phone', value: billTo.phone } });
      handleInputChange({ target: { name: 'address1', value: billTo.address1 } });
      handleInputChange({ target: { name: 'address2', value: billTo.address2 } });
      handleInputChange({ target: { name: 'address3', value: billTo.address3 } });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Ship To</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="copyBillToShip"
              checked={copyBillToShip}
              onChange={handleCopyBillToShip}
              className="mr-2"
            />
            <label htmlFor="copyBillToShip">Same as Bill To</label>
          </div>
          <button onClick={(e) => toggleExpand(e)} className="focus:outline-none">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingLabelInput
              id="shipToName"
              label="Name"
              value={shipTo.name}
              onChange={handleInputChange}
              name="name"
            />
            <FloatingLabelInput
              id="shipToPhone"
              label="Phone"
              value={shipTo.phone}
              onChange={handleInputChange}
              name="phone"
            />
          </div>
          <FloatingLabelInput
            id="shipToAdd"
            label="Address"
            value={shipTo.address1}
            onChange={handleInputChange}
            name="address1"
          />
          <FloatingLabelInput
            id="shipToAdd2"
            label="Address-2"
            value={shipTo.address2}
            onChange={handleInputChange}
            name="address2"
          />
          <FloatingLabelInput
            id="shipToAdd3"
            label="Address-3"
            value={shipTo.address3}
            onChange={handleInputChange}
            name="address3"
          />
        </div>
      )}
    </div>
  );
};

export default ShipToSection;
