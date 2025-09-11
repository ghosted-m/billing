import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template1 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes, selectedCurrency } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-right">
            <h2 className="text-3xl font-semibold">INVOICE</h2>
          </div>
        </div>

        <div className="flex justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold">{yourCompany.company}</h1>
            <p> {yourCompany.gstin}</p>
            <p>{yourCompany.address1}, {yourCompany.mobile}</p>
          </div>
          <div>
            <p>Invoice Number: {invoice.number}</p>
            <p>Invoice Date: {invoice.date}</p>
            <p>Due Date: {invoice.paymentDate}</p>
          </div>
        </div>

        <div className="flex justify-between mb-8">
          <div>
            <h3 className="font-semibold">Bill To:</h3>
            <p>{billTo.company}</p>
            <p>{billTo.gstin}</p>
            <p>{billTo.address1}, {billTo.address2}</p>
            <p>{billTo.address3}, {billTo.mobile}</p>
          </div>
          <div>
            <h3 className="font-semibold">Ship To:</h3>
            <p>{shipTo.name}</p>
            <p>{shipTo.address1}, {yourCompany.address2} </p>
            <p>{yourCompany.address3}, {shipTo.mobile}</p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="border-t border-b bg-gray-100">
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-center">Quantity</th>
              <th className="p-2 text-right">Unit Price</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-t-2 border-b-2 border-gray-800">
                <td className="p-2">
                  {item.name}
                  <div className="text-sm text-gray-500">
                    {item.description}
                  </div>
                </td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">
                  {formatCurrency(item.amount, selectedCurrency)}
                </td>
                <td className="p-2 text-right">
                  {formatCurrency(item.total, selectedCurrency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{formatCurrency(subTotal, selectedCurrency)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between mb-2">
                <span>Tax ({taxPercentage}%):</span>
                <span>{formatCurrency(taxAmount, selectedCurrency)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatCurrency(grandTotal, selectedCurrency)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-2">Notes:</h3>
          <p>{notes}</p>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template1;
