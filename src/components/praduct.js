const products = [
  {
    product: 'item 1',
    price: '10.00',
    unit: 'box',
    hsn: '4567890',
    gst: '12%',
    desc: 'Item 1 description',
  },
  {
    product: 'Item 2',
    price: '100.50',
    unit: 'box',
    hsn: '1234567',
    gst: '5%',
    desc: 'description of item 2',
  },
  {
    product: 'item 3',
    price: '50.40',
    unit: 'kgs',
    hsn: '12345555',
    gst: '18%',
    desc: 'description of item 3',
  },
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
