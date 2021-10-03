import React, { useState, useCallback } from "react";
import ReactFlow from "react-flow-renderer";
import { Dropdown, Menu, Button, Space } from "antd";

const initialElements = [
  {
    id: "1",
    sourcePosition: "right",
    targetPosition: "left",
    // you can also pass a React component as a label
    data: { label: <div>My Service</div> },
    position: { x: 100, y: 125 },
  },
];

const getNodeId = () => `randomnode_${+new Date()}`;

function ProviderServices() {
  const [elements, setElements] = useState(initialElements);

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "in-date-time":
        console.log("in-date-time");
        onAdd();
        break;
      case "in-location":
        console.log("in-location");
        break;
      case "in-size":
        console.log("in-size");
        break;
      case "out-price":
        console.log("out-price");
        break;
      case "out-prospect":
        console.log("out-prospect");
    }
  };

  const menuInput = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="in-date-time">Date/Time</Menu.Item>
      <Menu.Item key="in-location">Location</Menu.Item>
      <Menu.Item key="in-size">Size</Menu.Item>
    </Menu>
  );

  const menuOutput = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="out-price">Price</Menu.Item>
      <Menu.Item key="out-prospect">Prospect</Menu.Item>
    </Menu>
  );

  // TODO Add param to memoization: required special trick
  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      type: "input",
      sourcePosition: "right",
      data: { label: "Input #1" },
      position: { x: 50, y: 50 },
    };
    setElements((els) => els.concat(newNode));
  }, [setElements]);

  return (
    <div className="ProvSvc-grid">
      <div className="ProvSvc-toolbar">
        <Space>
          <Dropdown overlay={menuInput} placement="bottomLeft">
            <Button size="large">Add Input Node</Button>
          </Dropdown>
          <Dropdown overlay={menuOutput} placement="bottomLeft">
            <Button size="large">Add Output Node</Button>
          </Dropdown>
        </Space>
      </div>
      <div className="ProvSvc-diagram">
        <ReactFlow elements={elements} />
      </div>
    </div>
  );
}

export default ProviderServices;
