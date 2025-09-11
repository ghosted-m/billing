import FloatingLabelInput from "./FloatingLabelInput";
const Company = ({firmCollectionData, firmFormData, onChange})=>{
  return(
    <>
    <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Your Company</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="yourCompanyName"
                  label="Name"
                  value={firmFormData.company}
                  onChange={onChange}
                  name="company"
                  list="profileData"
                />
                <datalist id='profileData'>
                 {firmCollectionData.map(data=>(<option key={data.id} value={`${data.profile.company} - ${data.profile.gstin}`} />))}
                </datalist>
                <FloatingLabelInput
                  id="yourCompanyPhone"
                  label="Phone"
                  value={firmFormData.mobile}
                  name="mobile"
                />
              </div>
              <FloatingLabelInput
                id="yourCompanyGSTIN"
                label="GSTIN"
                value={firmFormData.gstin}
                name="gstin"
                className="mt-4"
              />
              <FloatingLabelInput
                id="yourCompanyAddress1"
                label="Address"
                value={firmFormData.address1}
                name="address1"
                className="mt-4"
              />
              <FloatingLabelInput
                id="yourCompanyAddress2"
                label="Address"
                value={firmFormData.address2}
                name="address2"
                className="mt-4"
              />
              <FloatingLabelInput
                id="yourCompanyAddress3"
                label="Address"
                value={firmFormData.address3}
                name="address3"
                className="mt-4"
              />
            </div>
    </>
  );
}
export default Company;