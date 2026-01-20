import React from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'

const Add = ({ isAddModalOpen, setIsAddModalOpen, categories, products, setProducts }) => {
    const [form] = Form.useForm();

    // client tarafindan veritabanina ekleme icin fetch ozelligini kullaniriz 
    const onFinish = (values) => {
        try {
            fetch("http://localhost:5000/api/products/add-product", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            message.success("Product Added Successfully");
            form.resetFields();
            setProducts([
                ...products,
                {
                    ...values,
                    _id: Math.random(),
                    price: Number(values.price),
                },
            ]);
            setIsAddModalOpen(false)
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <Modal title="Add New Product" open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} footer={false}>
            <Form layout='vertical' onFinish={onFinish} form={form}>
                <Form.Item name="title" label="Product Name" rules={[{ required: true, message: "Product Name field can not be null!" }]}>
                    <Input placeholder='Enter product name' />
                </Form.Item>



                <Form.Item name="img" label="Product Image" rules={[{ required: true, message: "Product image field can not be null!" }]}>
                    <Input placeholder='Enter product image' />
                </Form.Item>



                <Form.Item name="price" label="Product Price" rules={[{ required: true, message: "Product price field can not be null!" }]}>
                    <Input placeholder='Enter product price' />
                </Form.Item>



                <Form.Item name="category" label="Product Category" rules={[{ required: true, message: "Product category field can not be null!" }]}>
                    <Select showSearch placeholder="Search to Select" optionFilterProp='children' filterOption={
                        (input, option) => (option?.title ?? "").includes(input)
                    }
                        filterSort={(optionA, optionB) => (optionA?.title ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.title ?? "").toLowerCase())
                        }
                        options={categories} />
                </Form.Item>



                <Form.Item className='flex justify-end mb-0'>
                    <Button type='primary' htmlType='submit'>Add</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Add