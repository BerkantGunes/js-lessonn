import { Button, Form, Input, message, Modal, Table } from 'antd'
import React, { useState } from 'react'

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/categories/update-category"), {
        method: "PUT",
        body: JSON.stringify(...values, { _id: editingRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }
      message.success("Category updated successfully!")
      setCategories(categories.map((item) => {
        if (item._id === editingRow._id) {
          return { ...item, title: values.title }
        }
        return item;
      }));
    }
    catch (error) {
      message.error("Something went wrong..")
      console.log(error);
    }
  }

  const deleteCategory = (id) => {
    try {
      fetch("http://localhost:5000/api/categories/delete-category", {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      message.success("Category deleted successfully!")
      setCategories(categories.filter((item) => item._id !== id));
    }
    catch (error) {
      console.log(error);
      message.error("Something went wrong..")
    }
  }

  const columns = [{
    title: "Category Title",
    dataIndex: "title",
    render: (_, record) => {
      if (record._id === editingRow._id) {
        return (
          <Form.Item className='mb-0' name="title">
            <Input defaultValue={record.title} />
          </Form.Item>
        );
      } else {
        return <p>{record.title}</p>
      }
    }
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => {
      return (
        <div>
          <Button type="link" onClick={() => setEditingRow(record)}>Edit</Button>
          <Button type="text" htmlType='submit'>Save</Button>
          <Button type="text" danger onClick={() => deleteCategory(record._id)}>Delete</Button>
        </div>
      );
    },
  },
  ]

  return (
    <Modal open={isEditModalOpen} title="Category Options" footer={false} onCancel={() => setIsEditModalOpen(false)}>
      <Form onFinish={onFinish}>
        <Table bordered dataSource={categories} columns={columns} />
      </Form>
    </Modal>
  )
}

export default Edit