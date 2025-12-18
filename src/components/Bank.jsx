import React from "react";
import { QRCodeSVG } from "qrcode.react";
export default function Bank({value}) {
    const data = {
        AccName: 'Amrendra Kumar',
        AccNumber: '123456',
        ifsc: 'ifsc1234560',
        Bank: 'Bank Name',
        upi: '7979852849@pthdfc'
    }
    return (
        <>

            <div className='flex flex-row justify-center gap-8 py-4'>

                <div className='flex flex-col gap-2 *:text-sm *:font-thin'>
                    <div className='flex flex-row justify-start gap-2'>
                        <div className="w-1/2"><p>Account Holder Name</p></div>
                        <div className="w-1/2 font-bold"><p className="">{data.AccName}</p></div>
                    </div>
                    <div className='flex flex-row justify-start gap-2'>
                        <div className="w-1/2"><p>Account Number</p></div>
                        <div className="w-1/2 font-bold"><p className="">{data.AccNumber}</p></div>
                    </div>
                    <div className='flex flex-row justify-start gap-2'>
                        <div className="w-1/2"><p>IFSC</p></div>
                        <div className="w-1/2 font-bold"><p className="">{data.ifsc}</p></div>
                    </div>
                    <div className='flex flex-row justify-start gap-2'>
                        <div className="w-1/2"><p>BANK NAME</p></div>
                        <div className="w-1/2 font-bold"><p className="">{data.Bank}</p></div>
                    </div>
                    <div className='flex flex-row justify-start gap-2'>
                        <div className="w-1/2"><p>UPI</p></div>
                        <div className="w-1/2 font-bold"><p className="">{data.upi}</p></div>
                    </div>
                    </div>

                    <div className="space-y-2 py-4 font-thin text-sm">
                        <p>UPI- Scan to Pay</p>
                        <QRCodeSVG value={value} className="w-[100px] h-[100px]"/>
                    </div>

            </div>
            </>
    );
}
