import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import { toWords } from 'number-to-words';
import Bank from '@/components/Bank';

const Template5 = ({ data = {} }) => {
  const { billTo = {}, shipTo = {}, invoice = {}, yourCompany = {}, items = [], taxPercentage = 0, taxAmount = 0, subTotal = 0, grandTotal = 0, notes = '', selectedCurrency } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white max-w-4xl mx-auto flex flex-col h-full overflow-visible">
        <div className="p-8 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-green-600">Invoice</h1>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold">
                {yourCompany.company}
              </h2>
              <p>{yourCompany.gstin}</p>
              <p>{yourCompany.address1}, {yourCompany.address2}</p>
              <p>{yourCompany.address3}, {yourCompany.mobile}</p>
            </div>
          </div>

          <div className="flex justify-between mb-8 mt-4">
            <div className="w-1/2">
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                Billed to
              </h3>
              <p className="font-bold">{billTo.company || "Client Name"}</p>
              <p>{billTo.gstin}</p>
              <p>{billTo.address1}, {billTo.address2}</p>
              <p>{billTo.address3}, {billTo.mobile}</p>
            </div>
            <div className="text-right w-1/3">
              <h3 className="text-lg font-semibold text-green-600 mb-2 text-left">
                Invoice Details
              </h3>
              <p className="flex justify-between">
                <span className="font-semibold">Invoice #:</span>
                <span>{invoice.number || "N/A"}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Invoice Date:</span>
                <span>
                  {invoice.date
                    ? format(new Date(invoice.date), "MMM dd, yyyy")
                    : "N/A"}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Due Date:</span>
                <span>
                  {invoice.paymentDate
                    ? format(new Date(invoice.paymentDate), "MMM dd, yyyy")
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>

          <table className="w-full mb-8 border border-green-600">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-2 text-left">Item #/Item description</th>
                <th className="p-2 text-left">HSN #</th>
                <th className="p-2 text-right">Qty.</th>
                <th className="p-2 text-right">Rate</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-green-50" : ""}
                >
                  <td className="p-2">{item.name || "Item Name"}</td>
                  <td className="p-2">{item.hsn}</td>
                  <td className="p-2 text-right">{item.quantity || 0}</td>
                  <td className="p-2 text-right">
                    {formatCurrency(item.amount || 0, selectedCurrency)}
                  </td>
                  <td className="p-2 text-right">
                    {formatCurrency((item.quantity || 0) * (item.amount || 0), selectedCurrency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-4">
            <div className='w-2/3'>
            <h3 className='text-green-600 font-semibold text-md px-8'>Bank & Payment Details</h3>
            <Bank value={`upi://pay?pa=7979852849@pthdfc&pn=AmrendraKumar&am=${grandTotal}&tn=RefrensINV ${invoice}`} />
            </div>
            <div className="w-1/3">
              <p className="flex justify-between">
                <span>Sub Total:</span> <span>{formatCurrency(subTotal, selectedCurrency)}</span>
              </p>
              {taxPercentage > 0 && (
                <p className="flex justify-between border-b">
                  <span>Tax ({taxPercentage}%):</span>{" "}
                  <span>{formatCurrency(taxAmount, selectedCurrency)}</span>
                </p>
              )}
              <p className="flex justify-between font-bold text-lg mt-2">
                <span>Total Due:</span>{" "}
                <span className="text-green-600">
                  {formatCurrency(grandTotal, selectedCurrency)}
                </span>
              </p>
              <div className='py-4 border-b'>
                <p className='font-thin pt-2'>Invoice Total (In words)</p>
                <p className='text-sm font-bold capitalize'>{toWords(grandTotal)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='px-16 pb-2 -mt-4 w-[85%]'>
          <h3 className='text-green-600 font-semibold text-md mb-2'>Terms and Conditions</h3>
          <ul className='list-decimal pl-8 font-thin tracking-tight text-sm/2'>
            <li>Please pay within 15 days from the date of invoice overdue interest @ 10% will be charged on delayed payment.</li>
            <li>Please quote invoice number when remitting funds.</li>
          </ul>
        </div>
        <div className="px-12">
          {notes && (
            <div className="px-4 py-2">
              <h3 className="text-md font-semibold text-green-600 mb-2">
                Additional Notes
              </h3>
              <p className='font-thin px-4'>{notes}</p>
            </div>
          )}
        </div>
        <div className='flex-grow px-12 py-2 tracking-tight text-sm/2'>For any query contact here mobile: +919135831234 email: amrendrakstar@gmail.com</div>
        <div className="p-4 text-center text-sm text-gray-600 bg-green-50 tracking-tight text-sm/2">This is a computer-generated invoice and doesn't require a signature.</div>
      </div>
    </BaseTemplate>
  );
};

export default Template5;
