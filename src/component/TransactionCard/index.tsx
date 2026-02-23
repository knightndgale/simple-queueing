import { Button, Card, Col, Flex, Popover, Row, Typography } from "antd";
import React from "react";
import useDisclosure from "../../hook/useDisclosure";
import useTransactionStore from "../../store/transaction.store";
import { Transaction } from "../../zodSchema/transaction.schema";

const TransactionCard: React.FC<{
  transactionType: string;
  number: number;
  name: string;
  transactions: Transaction[];
}> = ({ transactions, transactionType, name, number }) => {
  const { Title, Text } = Typography;
  const { resetSpecificTransaction, next } = useTransactionStore((state) => state);
  const currentTransaction = transactions.find((transaction) => transaction.transactionType === transactionType);

  const waitingClients = currentTransaction?.clientList.filter((client) => client.status === "waiting").length || 0;

  const isDisabledTransaction = !(waitingClients > 1);

  console.log(currentTransaction?.currentNumber);

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card
      style={{
        margin: 10,
        minWidth: "30rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "normal",
      }}
      title={<a href={`/transaction/${transactionType}`}>{transactionType}</a>}>
      <div
        style={{
          height: "28rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <Title style={{ fontSize: "300px", margin: 0, textAlign: "center" }}>{number || 0}</Title>
        <Text style={{ margin: 0, textAlign: "center" }}>{name || ""}</Text>
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
                      resetSpecificTransaction(transactionType);
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

        <Button disabled={isDisabledTransaction} size="large" block type="primary" onClick={() => next(transactionType, number)}>
          Next
        </Button>
      </Flex>
    </Card>
  );
};

export default TransactionCard;
