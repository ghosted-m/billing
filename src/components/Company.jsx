import FloatingLabelInput from "./FloatingLabelInput";
import { FetchData } from "@/Auth/FetchData";
const Company = ({onCompanySelect})=>{
  const { users, formData, handleCompanyChange } = FetchData(onCompanySelect, 'Profile', 'profile', 'profileAdd');

  return(
    <>
    <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Your Company</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="yourCompanyName"
                  label="Name"
                  value={formData.company}
                  onChange={handleCompanyChange}
                  name="company"
                  list="profileData"
                />
                <datalist id='profileData'>
                 {users.map(data=>(<option key={data.id} value={`${data.profile.company} - ${data.profile.gstin}`} />))}
                </datalist>
                <FloatingLabelInput
                  id="yourCompanyPhone"
                  label="Phone"
                  value={formData.mobile}
                  name="mobile"
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