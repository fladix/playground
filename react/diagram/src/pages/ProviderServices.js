import React, { useState, useCallback } from "react";
import ReactFlow, { isNode } from "react-flow-renderer";
import { Dropdown, Menu, Button, Space } from "antd";
import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (elements) => {
  dagreGraph.setGraph({ rankdir: "LR" });
  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = "left";
      el.sourcePosition = "right";

      // Little hack to pass a slightly different position to notify react flow
      // about the change. Moreover, this shifts the dagre node position
      // (anchor=center center) to the top left so it matches the
      // react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};

const serviceNode = {
  id: "service",
  sourcePosition: "right",
  targetPosition: "left",
  // you can also pass a React component as a label
  data: { label: <div>My Service</div> },
  position: { x: 550, y: 200 },
};

const initialElements = [serviceNode];

const getNodeId = () => `randomnode_${+new Date()}`;

function ProviderServices() {
  const [elements, setElements] = useState(initialElements);

  const onLayout = useCallback(
    (newNode, newEdge) => {
      const layoutedElements = getLayoutedElements(
        elements.concat(newNode, newEdge)
      );
      setElements(layoutedElements);
    },
    [elements]
  );

  const handleMenuClick = (e) => {
    let newNode, newEdge;
    switch (e.key) {
      case "in-date-time":
      case "in-location":
      case "in-size":
        newNode = {
          id: getNodeId(),
          type: "input",
          sourcePosition: "right",
          data: { label: e.key },
          position: { x: 0, y: 0 },
        };
        newEdge = {
          id: getNodeId(),
          source: newNode.id,
          target: "service",
        };
        break;
      case "out-price":
      case "out-prospect":
        newNode = {
          id: getNodeId(),
          type: "output",
          targetPosition: "left",
          data: { label: e.key },
          position: { x: 0, y: 0 },
        };
        newEdge = {
          id: getNodeId(),
          source: "service",
          target: newNode.id,
        };
        break;
      default:
        alert("Not expected: default case");
    }
    // onAdd eliminated: would required two setElements and react performs
    // state updades in batch and asynchronously. So it wouldn't work.
    onLayout(newEdge, newNode);
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
