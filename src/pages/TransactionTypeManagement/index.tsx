import { CloseOutlined } from "@ant-design/icons";
import type { FormProps, TableProps } from "antd";
import { Button, Form, Input, Modal, Popconfirm, Table, Typography, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../../component/DefaultLayout";
import useDisclosure from "../../hook/useDisclosure";
import useTransactionStore from "../../store/transaction.store";

interface DataType {
  key: string;
  transactionType: string;
  currentNumber: number;
  numberOfClients: number;
}

const TableTypeManagement: React.FC = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [api, contextHolder] = notification.useNotification();
  const { transactions, archive } = useTransactionStore((state) => state);
  const [data, setData] = useState<DataType[]>([]);
  const popOverConfirm = useDisclosure();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: "Current Number",
      dataIndex: "currentNumber",
      key: "currentNumber",
    },
    {
      title: "Number of Clients",
      dataIndex: "numberOfClients",
      key: "numberOfClients",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete the transaction type"
          description="Are you sure to delete this transaction type?"
          onConfirm={() => archive(record.transactionType)}
          onCancel={popOverConfirm.onClose}
          okText="Yes"
          cancelText="No">
          <Button style={{ border: 0 }} icon={<CloseOutlined style={{ color: "red" }} />} />
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    const _data = transactions.map((transaction, index) => ({
      key: String(index),
      transactionType: transaction.transactionType,
      currentNumber: transaction.currentNumber,
      numberOfClients: transaction.clientList.length,
    }));
    setData(_data);
  }, [transactions]);

  type FieldType = {
    transactionType: string;
  };
  const [forms] = useForm();
  const addTransaction = useTransactionStore((state) => state.add);
  const onFinish: FormProps<FieldType>["onFinish"] = ({ transactionType }) => {
    addTransaction(transactionType);
    forms.resetFields();
    api.success({
      message: "Successfully added transaction type!",
      closable: true,
    });
    onToggle();
  };

  return (
    <DefaultLayout>
      {contextHolder}
      <Typography.Title level={2}>Transaction Type Management</Typography.Title>
      <Modal title="New Transaction Type" open={isOpen} onOk={() => forms.submit()} okText={"Submit"} okType="primary" onCancel={onClose}>
        <Form onFinish={onFinish} name="transactions" initialValues={{ transactionType: "" }} preserve={false} form={forms}>
          <Form.Item label="Transaction Type" name={"transactionType"} required rules={[{ required: true, message: "Please enter transaction type!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type="primary"
        onClick={onToggle}
        style={{
          marginBottom: 20,
        }}>
        Add New Transaction Type
      </Button>
      <Table columns={columns} pagination={{ showSizeChanger: true }} dataSource={data} />
    </DefaultLayout>
  );
};

export default TableTypeManagement;
