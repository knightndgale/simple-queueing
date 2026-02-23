import { Button, Flex, Form, FormProps, Input, Modal, Select, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import DefaultLayout from "../../component/DefaultLayout";
import useDisclosure from "../../hook/useDisclosure";
import useTransactionStore from "../../store/transaction.store";
import { Transaction } from "../../zodSchema/transaction.schema";

const Client = () => {
  type FieldType = {
    transactionType: string;
    clientName: string;
  };
  const { Title, Text } = Typography;

  const { isOpen, onToggle } = useDisclosure();
  const [forms] = useForm();
  const { transactions, addClient, getTransactions } = useTransactionStore((state) => state);
  const [transactionList, setTransationList] = useState<{ value: Transaction["transactionType"]; label: Transaction["transactionType"] }[]>([]);
  const [latestClient, setLatestClient] = useState({
    name: "",
    number: 0,
    transactionType: "",
  });
  useEffect(() => {
    const transactionList_ = transactions.map((transaction) => ({
      label: transaction.transactionType,
      value: transaction.transactionType,
    }));
    setTransationList(transactionList_);
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = (value) => {
    addClient(value.transactionType, value.clientName);
    const transactions_ = getTransactions();
    const currentClient = transactions_.find((transaction_) => transaction_.transactionType === value.transactionType)?.clientList.pop();

    setLatestClient({
      name: currentClient?.clientName || "",
      number: currentClient?.number || 0,
      transactionType: value.transactionType,
    });
    onToggle();
  };

  return (
    <DefaultLayout>
      <Flex style={{ width: "100vw", height: "100vh" }} justify="center" align="center">
        <Form wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ width: "50%" }} onFinish={onFinish} name="transactions" initialValues={{ transactionType: "" }} preserve={false} form={forms}>
          <Form.Item label="Transaction Type" name={"transactionType"} required rules={[{ required: true, message: "Please select a transaction type!" }]}>
            <Select options={transactionList} />
          </Form.Item>
          <Form.Item label="Client Name" name={"clientName"} required rules={[{ required: true, message: "Please enter client name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button block size="large" htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Modal
          closable={false}
          title={"Please take note of your queue number"}
          open={isOpen}
          cancelButtonProps={{
            style: {
              visibility: "hidden",
            },
          }}
          onOk={() => {
            onToggle();
            location.reload();
          }}>
          <div
            style={{
              height: "28rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}>
            <Title level={4}>{latestClient.transactionType}</Title>
            <Title style={{ fontSize: "300px", margin: 0, textAlign: "center" }}>{latestClient.number}</Title>
            <Text style={{ margin: 0, textAlign: "center" }}>{latestClient.name}</Text>
          </div>
        </Modal>
      </Flex>
    </DefaultLayout>
  );
};

export default Client;
