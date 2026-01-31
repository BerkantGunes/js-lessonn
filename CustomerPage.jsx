import { Table } from 'antd';
import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';



const CustomerPage = () => {
  const [billItems, setInvoiceItems] = useState([]);

  useEffect(() => {
      const getInvoices = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/invoices/get-all")
          const data = await res.json();
          setInvoiceItems(data);
        } catch (error) {
          console.log(error);
          
        }
      }
      getInvoices()
    }, [])
  

const columns = [
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Paymnet Method',
    dataIndex: 'paymentMode',
    key: 'paymentMode',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text)=> {
      return <span>{text.substring(0, 10)}</span>
    }
  },
];

  return (
    <>
        <Header />
        <div className="px-6">
            <h1 className='text-4xl font-bold text-center mb-4'>Customers</h1>
          <Table dataSource={billItems} columns={columns} bordered pagination={false} scroll={{x: 1000, y: 300}}/>
        </div>
        
    </>
  )
}

export default CustomerPage