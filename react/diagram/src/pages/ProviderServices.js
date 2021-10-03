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
      case "in-location":
      case "in-size":
        onAdd({
          id: getNodeId(),
          type: "input",
          sourcePosition: "right",
          data: { label: e.key },
          position: { x: 50, y: 50 },
        });
        break;
      case "out-price":
      case "out-prospect":
        onAdd({
          id: getNodeId(),
          type: "output",
          targetPosition: "left",
          data: { label: e.key },
          position: { x: 50, y: 50 },
        });
        break;
      default:
        alert("Not expected: default case");
    }
  };

  const onAdd = useCallback(
    (newNode) => {
      setElements((els) => els.concat(newNode));
    },
    [setElements]
  );

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
