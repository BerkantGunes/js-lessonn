import React from 'react'

import { Button,Form,Input,Modal } from 'antd'

const Addd = ({isAddModalOpen, setIsAddModalOpen, categories, setCategories}) => {
    const [form] = Form.useForm();

    // client tarafindan veritabanina ekleme icin fetch ozelligini kullaniriz
    const onFinish = (values) => { 
        try {
            fetch("http://localhost:5000/api/categories/add-category", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            message.success("Category Added Successfully");
            form.resetFields();
            setCategories([...categories, {
                _id: Math.random(),
                title: values.title,
            }]);
        }
        catch (error) {
            console.log(error);
        }
        
    }

    return (
        <Modal title="Add New Category" open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} footer={false}>
            <Form layout='vertical' onFinish={onFinish} form={form}>
                <Form.Item name="title" label="Add Category" rules={[{ required: true, message: "Category field can not be null!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item className='flex justify-end mb-0'>
                    <Button type='primary' htmlType='submit'>Add</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Addd