import { Button, Card, message, Table } from "antd"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateInvoice from "../components/cart/CreateInvoice";
import Header from "../components/Header/Header"  
import { ClearOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { increase,decrease, deleteCart } from "../redux/cartSlice.js";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Product Image',
      dataIndex: 'img',
      key: 'img',
      width: "125px",
      render: (text) => {
        return (<img src={text} alt="" className="w-full h-20 object-cover" />)
      }
    },
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => {
        return (
          <span>{text.toFixed(2)}$</span>
        )
      }
    },
    {
      title: 'Product Number',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text,record) => {
        return (
          <div className="flex items-center">
            <Button type="primary" size="small" className="w-full flex items-center justify-center rounded-full" icon={<PlusCircleOutlined />} onClick={() => dispatch(increase(record))} />
            <span className="font-bold w-6 inline-block text-center">{record.quantity}</span>
            <Button type="primary" size="small" className="w-full flex items-center justify-center rounded-full" icon={<MinusCircleOutlined />} onClick={() => {
              if (record.quantity === 1) {
                if (window.confirm("Are you sure? Item will be deleted!")) {
                  dispatch(decrease(record));
                  message.success("Item deleted successfully!");
                }
              }
              if (record.quantity > 1) {
                dispatch(decrease(record));
              }
            }} />
          </div>
        )
      }
    },
    {
      title: 'Total Price',
      dataIndex: 'price',
      key: 'price',
      render: (record) => {
        return (
          <span>{(record.quantity * record.price).toFixed(2)}$</span>
        )
      }
    },
    {
      title: 'Actions',
      render: (_, record) => {
        return (
          <Button 
          type="link" 
          danger
          onClick={()=> {
            dispatch(deleteCart(record));
            message.success("Product Deleted Successfully!");
          }}
          >Delete</Button>
        )
      }
    },
  ];

  console.log(isModalOpen);


  return (
    <>
      <Header />
      <div className="px-6">
        <Table
         dataSource={cart.cartItems} 
         columns={columns} 
         bordered pagination={false} 
         scroll={{
          x: 1200,
          y: 300
         }} 
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>{(cart.total * cart.tax) /100 > 0 ? (cart.total).toFixed(2): 0}$</span>
            </div>
            <div className="flex justify-between my-2">
              <span>VAT %{cart.tax}</span>
              <span className="text-red-600">{(cart.total * cart.tax) /100 > 0 ? ((cart.total * cart.tax) /100).toFixed(2) : 0}$</span>
            </div>
            <div className="flex justify-between">
              <b>Total</b>
              <b>{(cart.total * cart.tax) /100 > 0 ? (cart.total + ((cart.total * cart.tax) /100)).toFixed(2): 0}$</b>
            </div>
            <Button className="mt-4 w-full" type="primary" size="large" onClick={() => setIsModalOpen(true)}>Create Order</Button>
          </Card>
        </div>
      </div>

      <CreateInvoice isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default CartPage