import { InboxOutlined, LoadingOutlined, PlusCircleOutlined, QuestionCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Divider, Empty, Flex, Modal, Space, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultLayout from "./component/DefaultLayout";
import TransactionCard from "./component/TransactionCard";
import useDisclosure from "./hook/useDisclosure";
import useTransactionStore from "./store/transaction.store";
import { colorPalette } from "./theme/color-palette";
import { Transaction } from "./zodSchema/transaction.schema";

const App = () => {
  const navigate = useNavigate();
  const { getTransactions } = useTransactionStore((state) => state);
  const [currentTransactions, setcurrentTransactions] = useState<Transaction[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeOut = setInterval(() => {
      const transactions_ = getTransactions();
      setcurrentTransactions(transactions_);
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(timeOut);
  }, []);

  const { Title, Paragraph, Text } = Typography;
  const hasTransactions = currentTransactions.length > 0;

  return (
    <DefaultLayout>
      <div
        style={{
          height: "97vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}>
        {/* Hero header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${colorPalette.button.light} 0%, white 100%)`,
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 20,
            flexShrink: 0,
            border: `1px solid ${colorPalette.button.light}`,
          }}>
          <Flex justify="space-between" align="center" wrap="wrap" gap="middle">
            <div>
              <Title level={3} style={{ margin: 0, color: colorPalette.typography.main }}>
                Queue Dashboard
              </Title>
              <Text type="secondary" style={{ fontSize: 14 }}>
                View and manage current queue numbers by transaction type.
              </Text>
            </div>
            <Space wrap>
              <Button type="link" icon={<QuestionCircleOutlined />} onClick={onOpen} style={{ color: colorPalette.link.main }}>
                About this app
              </Button>
              <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => navigate("/transaction-type-management")}>
                Manage types
              </Button>
              <Button
                icon={<UserAddOutlined />}
                onClick={() => navigate("/client")}
                style={{
                  color: colorPalette.button.main,
                  borderColor: colorPalette.button.main,
                }}>
                Get queue number
              </Button>
            </Space>
          </Flex>
        </div>

        {/* Cards area with subtle container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            minHeight: 0,
            background: hasTransactions ? "rgba(227, 242, 253, 0.15)" : "transparent",
            borderRadius: 12,
            padding: hasTransactions ? 16 : 0,
            border: hasTransactions ? `1px dashed ${colorPalette.button.light}` : "none",
          }}>
          {isLoading ? (
            <Flex
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}>
              <Spin
                size="large"
                indicator={<LoadingOutlined spin />}
                style={{
                  fontSize: 48,
                }}
              />
            </Flex>
          ) : hasTransactions && !isLoading ? (
            <Flex
              style={{
                width: "100%",
                overflowX: "auto",
                gap: 16,
                padding: "8px 0",
              }}>
              {currentTransactions.map((transaction, index) => {
                const latestClient = transaction.clientList.find((client) => client.status === "waiting") || { number: 0, clientName: "" };
                return <TransactionCard transactions={currentTransactions} key={index} transactionType={transaction.transactionType} number={latestClient?.number} name={latestClient.clientName} />;
              })}
            </Flex>
          ) : (
            !hasTransactions &&
            !isLoading && (
              <Empty
                image={<InboxOutlined style={{ fontSize: 64, color: colorPalette.button.light }} />}
                imageStyle={{ height: 80 }}
                description={
                  <Space direction="vertical" align="center" size="small">
                    <Text strong style={{ fontSize: 16 }}>
                      No transaction types yet
                    </Text>
                    <Text type="secondary">Add a transaction type to start managing your queue.</Text>
                  </Space>
                }
                style={{ margin: "auto" }}>
                <Button type="primary" icon={<PlusCircleOutlined />} size="large" onClick={() => navigate("/transaction-type-management")}>
                  Add transaction type
                </Button>
              </Empty>
            )
          )}
        </div>
      </div>

      <Modal
        title="About this app"
        open={isOpen}
        onCancel={onClose}
        footer={
          <Button type="primary" onClick={onClose}>
            Got it
          </Button>
        }
        width={520}
        centered>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <Title level={5} style={{ marginTop: 0 }}>
              What is this?
            </Title>
            <Paragraph style={{ marginBottom: 0 }}>
              A simple queue management app for multiple transaction types. Staff can see current numbers and advance the queue; clients can get a queue number for their chosen transaction type.
            </Paragraph>
          </div>
          <Divider style={{ margin: "12px 0" }} />
          <div>
            <Title level={5}>How it works</Title>
            <Paragraph style={{ marginBottom: 8 }}>
              <Text strong>1. Staff:</Text> Create and manage transaction types at{" "}
              <Link to="/transaction-type-management" style={{ color: colorPalette.link.main }} onClick={onClose}>
                Transaction Type Management
              </Link>
              .
            </Paragraph>
            <Paragraph style={{ marginBottom: 8 }}>
              <Text strong>2. Clients:</Text> Get a queue number by choosing a transaction type and entering their name at{" "}
              <Link to="/client" style={{ color: colorPalette.link.main }} onClick={onClose}>
                Client
              </Link>
              .
            </Paragraph>
            <Paragraph style={{ marginBottom: 0 }}>
              <Text strong>3. Staff:</Text> On this dashboard, view the current number per type, advance the queue (Next), or reset. Click a transaction type on a card to open the full-screen view.
            </Paragraph>
            <Text type="secondary" style={{ display: "block", marginTop: 12 }}>
              Queue data is stored in your browser.
            </Text>
          </div>
        </Space>
      </Modal>
    </DefaultLayout>
  );
};

export default App;
