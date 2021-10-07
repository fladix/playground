import React, { useState, useCallback } from "react";
import ReactFlow, { Controls } from "react-flow-renderer";
import { Dropdown, Menu, Button, Space } from "antd";
import * as IoIcons from "react-icons/io5";

const posIni = {
  x: 750,
  y: 100,
};

const serviceNode = {
  id: "service",
  sourcePosition: "right",
  targetPosition: "left",
  // you can also pass a React component as a label
  data: {
    label: <div style={{ height: "400px" }}>My Service</div>,
  },
  position: { x: posIni.x, y: posIni.y },
};

const initialElements = [serviceNode];

const getNodeId = () => `randomnode_${+new Date()}`;

function ProviderServices() {
  const [elements, setElements] = useState(initialElements);
  const [posInput, setPosInput] = useState({ x: 200, y: posIni.y - 150 });
  const [posOutput, setPosOutput] = useState({ x: 1200, y: posIni.y - 150 });

  const handleMenuClick = (e) => {
    let pos, newNode, newEdge;
    switch (e.key) {
      case "in-date-time":
      case "in-location":
      case "in-size":
        pos = { x: posInput.x, y: posInput.y + 100 };
        newNode = {
          id: getNodeId(),
          type: "input",
          sourcePosition: "right",
          data: { label: e.key },
          position: pos,
        };
        newEdge = {
          id: getNodeId(),
          source: newNode.id,
          target: "service",
        };
        setPosInput(pos);
        break;
      case "out-price":
      case "out-prospect":
        pos = { x: posOutput.x, y: posOutput.y + 100 };
        newNode = {
          id: getNodeId(),
          type: "output",
          targetPosition: "left",
          data: { label: e.key },
          position: pos,
        };
        newEdge = {
          id: getNodeId(),
          source: "service",
          target: newNode.id,
        };
        setPosOutput(pos);
        break;
      default:
        alert("Not expected: default case");
    }
    onAdd(newNode, newEdge);
  };

  const onAdd = useCallback(
    (newNode, newEdge) => {
      setElements((els) => els.concat(newNode, newEdge));
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
      <Space className="ProvSvc-toolbar">
        <Dropdown overlay={menuInput} placement="bottomLeft">
          <Button
            className="ProvSvc-tb-button"
            size="large"
            icon={<IoIcons.IoEnterOutline className="Button-icon" size={16} />}
          >
            In
          </Button>
        </Dropdown>
        <Dropdown overlay={menuOutput} placement="bottomLeft">
          <Button
            className="ProvSvc-tb-button"
            size="large"
            icon={<IoIcons.IoExitOutline className="Button-icon" size={16} />}
          >
            Out
          </Button>
        </Dropdown>
      </Space>
      <div className="ProvSvc-diagram">
        <ReactFlow elements={elements}>
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default ProviderServices;
