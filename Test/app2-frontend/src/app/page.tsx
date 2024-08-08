"use client";
"use client";
import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import { Modal, Form, Input, Button, Select, Popover, Table } from "antd";

const { Option } = Select;

// Define the type for the tree data
interface TreeNode {
  name: string;
  id: string;
  gender: string;
  location: string;
  imageUrl?: string;
  children?: TreeNode[];
}

interface HierarchyNode extends d3.HierarchyNode<TreeNode> {}
interface HierarchyLink extends d3.HierarchyLink<TreeNode> {}

const NodeWithPopover: React.FC<{
  nodeData: TreeNode;
  x: number;
  y: number;
  onAddChild: (parentId: string) => void;
}> = ({ nodeData, x, y, onAddChild }) => {
  const content = (
    <>
      <Table
        dataSource={[
          { key: "1", label: "Name", value: nodeData.name },
          { key: "2", label: "ID", value: nodeData.id },
          { key: "3", label: "Gender", value: nodeData.gender },
          { key: "4", label: "Location", value: nodeData.location },
        ]}
        columns={[
          { title: "Label", dataIndex: "label", key: "label" },
          { title: "Value", dataIndex: "value", key: "value" },
        ]}
        pagination={false}
        size="small"
      />
      <Button block type="primary" onClick={() => onAddChild(nodeData.id)}>
        Add Child
      </Button>
    </>
  );

  return (
    <foreignObject x={x - 50} y={y - 70} width={100} height={120}>
      <Popover content={content} title="Node Information" trigger="hover">
        <div
          style={{
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "50%",
            backgroundColor: "green",
            color: "white",
            width: "100px",
            height: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={nodeData.imageUrl || "https://via.placeholder.com/50"}
            alt={nodeData.name}
            style={{ borderRadius: "50%", marginBottom: "5px" }}
          />
          {nodeData.name}
        </div>
      </Popover>
    </foreignObject>
  );
};

const MLMTree: React.FC<{
  data: TreeNode;
  onAddChild: (parentId: string) => void;
}> = ({ data, onAddChild }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [nodes, setNodes] = useState<HierarchyNode[]>([]);
  const [links, setLinks] = useState<HierarchyLink[]>([]);

  useEffect(() => {
    if (svgRef.current) {
      const width = 1000;
      const height = 1000;

      const root = d3.hierarchy(data);
      const treeLayout = d3.tree<TreeNode>().size([height - 200, width - 200]);
      const layout = treeLayout(root);

      setNodes(layout.descendants());
      setLinks(layout.links());
    }
  }, [data]);

  return (
    <svg ref={svgRef} width={"95vw"} height={1000}>
      {links.map((link, i) => (
        <line
          key={i}
          x1={link.source.y! + 100}
          y1={link.source.x! + 30}
          x2={link.target.y! + 100}
          y2={link.target.x! + 30}
          stroke="black"
        />
      ))}
      {nodes.map((node, i) => (
        <NodeWithPopover
          key={i}
          nodeData={node.data}
          x={node.y! + 100}
          y={node.x! + 50}
          onAddChild={onAddChild}
        />
      ))}
    </svg>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<TreeNode>({
    name: "Root",
    id: "1",
    gender: "Male",
    location: "City A",
    imageUrl: "/user.svg",
    children: [
      {
        name: "Child 1",
        id: "2",
        gender: "Female",
        location: "City B",
        imageUrl: "/user.svg",
        children: [
          {
            name: "child 1",
            id: "3",
            gender: "Male",
            location: "City C",
            imageUrl: "/user.svg",
            children: [
              {
                name: "child 1",
                id: "8",
                gender: "Male",
                location: "City C",
                imageUrl: "/user.svg",
              },
              {
                name: "child 2",
                id: "9",
                gender: "Female",
                location: "City D",
                imageUrl: "/user.svg",
                children: [
                  {
                    name: "child 1",
                    id: "10",
                    gender: "Male",
                    location: "City C",
                    imageUrl: "/user.svg",
                  },
                  {
                    name: "child 2",
                    id: "11",
                    gender: "Female",
                    location: "City D",
                    imageUrl: "/user.svg",
                  },
                ],
              },
            ],
          },
          {
            name: "child 2",
            id: "4",
            gender: "Female",
            location: "City D",
            imageUrl: "/user.svg",
          },
        ],
      },
      {
        name: "Child 2",
        id: "5",
        gender: "Male",
        location: "City E",
        imageUrl: "/user.svg",
        children: [
          {
            name: "child 3",
            id: "6",
            gender: "Female",
            location: "City F",
            imageUrl: "/user.svg",
          },
          {
            name: "child 4",
            id: "7",
            gender: "Male",
            location: "City G",
            imageUrl: "/user.svg",
          },
        ],
      },
    ],
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedData = localStorage.getItem("mlmTreeData");
    if (storedData) {
      console.log(JSON.parse(storedData));

      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mlmTreeData", JSON.stringify(data));
  }, [data, setData]);

  const handleAddNode = (values: {
    parentId: string;
    name: string;
    id: string;
    gender: string;
    location: string;
    imageUrl: string;
  }) => {
    const addNode = (currentNode: TreeNode): TreeNode => {
      if (currentNode.id === values.parentId) {
        const newChild = {
          name: values.name,
          id: values.id,
          gender: values.gender,
          location: values.location,
          imageUrl: values.imageUrl,
          children: [],
        };
        return {
          ...currentNode,
          children: [...(currentNode.children || []), newChild],
        };
      } else if (currentNode.children) {
        return {
          ...currentNode,
          children: currentNode.children.map(addNode),
        };
      }
      return currentNode;
    };

    setData((prevData) => addNode(prevData));

    setIsModalVisible(false);
    form.resetFields();
  };
  console.log(data);

  const handleAddChild = (parentId: string) => {
    form.setFieldsValue({ parentId });
    setIsModalVisible(true);
  };

  return (
    <div className="text-center">
      <div>
        <h1 className="text-3xl p-2 text-[#008000] font-bold">
          MLM Tree Visualization
        </h1>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Data
        </Button>
      </div>
      <Modal
        title="Add New Node"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddNode}>
          <Form.Item
            label="Parent ID"
            name="parentId"
            rules={[{ required: true, message: "Please input the Parent ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please input the Full Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Unique ID"
            name="id"
            rules={[{ required: true, message: "Please input the Unique ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select the Gender!" }]}
          >
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input the Location!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="imageUrl"
            rules={[{ required: true, message: "Please input the Image URL!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
        Note: Enter /user.svg
      </Modal>
      <MLMTree data={data} onAddChild={handleAddChild} />
    </div>
  );
};

export default App;
