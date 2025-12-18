const products = [
  { id: 1, name: "P.N.S 2A", value: 13, code: "85361040" },
  { id: 2, name: "P.N.S 4A", value: 13, code: "85361040" },
  { id: 3, name: "P.N.S 6A", value: 13, code: "85361040" },
  { id: 4, name: "P.N.S 10A", value: 13, code: "85361040" },
  { id: 5, name: "P.N.S 16A", value: 13, code: "85361040" },
  { id: 6, name: "P.T.I.A 32A", value: 25, code: "85361040" },
  { id: 7, name: "P.T.I.S. 63A", value: 25, code: "85361040" },
  { id: 8, name: "P.T.C.P. 100A", value: 80, code: "85361040" },
  { id: 9, name: "P.T.C.P. 125A", value: 80, code: "85361040" },
  { id: 10, name: "P.N.S. 4A PLAIN", value: 12, code: "85361040" },
  { id: 11, name: "HRC CONTACT SIZE 01", value: 27, code: "85361040" },
  { id: 12, name: "SIZE 00 100A", value: 75, code: "85361040" },
  { id: 13, name: "SIZE 01 200A", value: 135, code: "85361040" },
  { id: 14, name: "SIZE 01 125A", value: 140, code: "85361040" },
  { id: 15, name: "SIZE 02 315A", value: 200, code: "85361040" },
  { id: 16, name: "P.T.S.D. 100A", value: 32.5, code: "85361040" },
  { id: 17, name: "P.T.S.D. 125A", value: 32.5, code: "85361040" },
  { id: 18, name: "SIZE 00 100A", value: 59.5, code: "85361040" },
  { id: 19, name: "SIZE 00 63A", value: 59.5, code: "85361040" },
  { id: 20, name: "P.T.F.P 250A", value: 165, code: "85361040" },
  { id: 21, name: "2PACKAGING FORWARDING", value: 100, code: "" }
];


const customers = [
  {
    id: '1',
    name: 'Amrendra kumar',
    phone: '9191919191',
    email: 'amrendrakstar@gmail.com',
    billingAddress: {
      address1: 'Amnour',
      address2: 'Amnour',
      address3: 'Saran Bihar 841401',
    },
    shippingAddress: {
      address1: '',
      address2: '',
      address3: '',
    },
    gstin: 'gst_number',
  },
  {
    id: '2',
    name: 'Amrendra kumar',
    phone: '9191919191',
    email: 'amrendrakstar@gmail.com',
    billingAddress: {
      address1: 'Amnour',
      address2: 'Amnour',
      address3: 'Saran Bihar 841401',
    },
    shippingAddress: {
      address1: '',
      address2: '',
      address3: '',
    },
    gstin: 'gst_number2',
  },
  {
    id: '3',
    name: 'Amrendra kumar',
    phone: '9191919191',
    email: 'amrendrakstar@gmail.com',
    billingAddress: {
      address1: 'Amnour',
      address2: 'Amnour',
      address3: 'Saran Bihar 841401',
    },
    shippingAddress: {
      address1: '',
      address2: '',
      address3: '',
    },
    gstin: 'gst_number3',
  },
];

export { customers, products };
