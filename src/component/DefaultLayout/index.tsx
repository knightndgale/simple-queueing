import { HomeOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation();
  const navigate = useNavigate();
  return (
    <Layout>
      <Content>
        <div style={{ height: "86vh", padding: "10px 15px" }}>
          {path.pathname !== "/" && (
            <Button icon={<HomeOutlined />} onClick={() => navigate("/")}>
              Home
            </Button>
          )}
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
