import { Form, Modal, Input, Select, Card, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateInvoice = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch("http://localhost:5000/api/invoices/add-invoice", {
        method:"POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })

      if(res.status === 200) {
        message.success("Invoice created Successfully!");
        dispatch(reset());
        navigate("/invoices");
      }
    }
    catch (error) {
      message.danger("Oops Somethings went wrong..");
      console.log(error);
      
    }
  };

  return (
    <Modal
      title="Create Invoice"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}

    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item label="Customer Name" name={"customerName"} rules={[{
          required: true,
          message: "Customer Name is required"
        }]}>
          <Input placeholder="Customer Name" />
        </Form.Item>
        <Form.Item label="Phone Number" name={"phoneNumber"} rules={[{
          required: true,
          message: "Phone Number is required"
        }]}>
          <Input placeholder="Phone Number" maxLength={11} />
        </Form.Item>
        <Form.Item label="Payment Method" name={"paymentMethod"} rules={[{
          required: true,
          message: "Choosing Payment Method is required"
        }]}>
          <Select placeholder="Choose a payment method">
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="Credit Cart">Credit Cart</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>{(cart.total * cart.tax) / 100 > 0 ? (cart.total).toFixed(2) : 0}$</span>
          </div>
          <div className="flex justify-between my-2">
            <span>VAT %{cart.tax}</span>
            <span className="text-red-600">{(cart.total * cart.tax) / 100 > 0 ? ((cart.total * cart.tax) / 100).toFixed(2) : 0}$</span>
          </div>
          <div className="flex justify-between">
            <b>Total</b>
            <b>{(cart.total * cart.tax) / 100 > 0 ? (cart.total + ((cart.total * cart.tax) / 100)).toFixed(2) : 0}$</b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Create Order
            </Button>
          </div>
        </Card>

      </Form>
    </Modal>
  )
}

export default CreateInvoice