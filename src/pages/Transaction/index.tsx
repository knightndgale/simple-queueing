import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Popover, Row, Typography } from "antd";
import React from "react";
import useDisclosure from "../../hook/useDisclosure";
import useTransactionStore from "../../store/transaction.store";

import { useNavigate, useParams } from "react-router-dom";

const Transaction: React.FC = () => {
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const { type } = useParams();
  const { resetSpecificTransaction, next, transactions } = useTransactionStore((state) => state);

  const currentTransaction = transactions.find((transaction) => {
    return transaction.transactionType === type;
  });

  const currentClient = currentTransaction?.clientList.find((client) => client.status === "waiting");

  const waitingClients = currentTransaction?.clientList.filter((client) => client.status === "waiting").length || 0;

  const isDisabledTransaction = !(waitingClients > 1);

  const { isOpen, onToggle } = useDisclosure();

  if (!currentTransaction) {
    return (
      <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
        <Typography.Title level={2}> No Transaction Type Found</Typography.Title>
      </Flex>
    );
  }

  return (
    <Flex justify="center" align="center" style={{ height: "100vh", width: "100%" }}>
      <Card
        style={{
          margin: 10,
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "normal",
        }}
        title={type}
        extra={<Button style={{ border: 0 }} icon={<CloseOutlined onClick={() => navigate("/")} style={{ color: "red" }} />} />}>
        <div
          style={{
            height: "28rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
          <Title style={{ fontSize: "300px", margin: 0, textAlign: "center" }}>{currentClient?.number || 0}</Title>
          <Text style={{ margin: 0, textAlign: "center" }}>{currentClient?.clientName || ""}</Text>
        </div>
        <Flex gap="small" style={{ width: "100%", marginTop: 10 }}>
          <Popover
            content={
              <>
                <Typography.Text>Are you sure you want to reset this transaction?</Typography.Text>
                <Row gutter={4} style={{ marginTop: 10 }}>
                  <Col span={5}>
                    <Button
                      onClick={() => {
                        if (type) resetSpecificTransaction(type);
                        onToggle();
                      }}
                      danger>
                      Yes
                    </Button>
                  </Col>
                  <Col span={6}>
                    <Button type="primary"> Cancel </Button>
                  </Col>
                </Row>
              </>
            }
            title="Warning"
            trigger="click"
            open={isOpen}
            onOpenChange={onToggle}>
            <Button size="large" block type="primary" danger>
              Reset
            </Button>
          </Popover>

          <Button disabled={isDisabledTransaction} size="large" block type="primary" onClick={() => type && next(type, currentClient?.number || 0)}>
            Next
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Transaction;
