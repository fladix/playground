import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import Home from "./pages/Home";
import ProviderOrganization from "./pages/ProviderOrganization";
import ProviderServices from "./pages/ProviderServices";
import ProviderDirectory from "./pages/ProviderDirectory";
import ManagerProjects from "./pages/ManagerProjects";
import ManagerOrganization from "./pages/ManagerOrganization";
import ManagerJobBoard from "./pages/ManagerJobBoard";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import Logo from "./components/Logo";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Header className="App-header">
            <Logo />
            <Avatar size="large" icon={<AiIcons.AiOutlineUser />} />
          </Header>
          <Layout>
            <Sider className="App-sider" collapsible width="256">
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1", "sub2"]}
                mode="inline"
                theme="dark"
              >
                <Menu.Item key="1" icon={<AiIcons.AiFillHome />}>
                  <Link to="/home">Home</Link>
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  icon={<FaIcons.FaToolbox />}
                  title="Service Provider"
                >
                  <Menu.Item key="2" icon={<RiIcons.RiHomeGearFill />}>
                    <Link to="/provider/organization">My Organization</Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<RiIcons.RiServiceFill />}>
                    <Link to="/provider/myservices">My Services</Link>
                  </Menu.Item>
                  <Menu.Item key="4" icon={<IoIcons.IoIosBook />}>
                    <Link to="/provider/directory">Service Directory</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<FaIcons.FaUserTie />}
                  title="Manager"
                >
                  <Menu.Item key="5" icon={<RiIcons.RiHomeGearFill />}>
                    <Link to="/manager/organization">My Organization</Link>
                  </Menu.Item>
                  <Menu.Item key="6" icon={<FaIcons.FaUserTie />}>
                    <Link to="/manager/myprojects">My Projects</Link>
                  </Menu.Item>
                  <Menu.Item key="7" icon={<RiIcons.RiDashboardFill />}>
                    <Link to="/manager/jobboard">Job Board</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Content className="App-content">
                <Switch>
                  <Route path="/" exact>
                    <Redirect to="/home" />
                  </Route>
                  <Route path="/home" exact component={Home}></Route>
                  <Route
                    path="/provider/organization"
                    exact
                    component={ProviderOrganization}
                  ></Route>
                  <Route
                    path="/provider/myservices"
                    exact
                    component={ProviderServices}
                  ></Route>
                  <Route
                    path="/provider/directory"
                    exact
                    component={ProviderDirectory}
                  ></Route>
                  <Route
                    path="/manager/organization"
                    exact
                    component={ManagerOrganization}
                  ></Route>
                  <Route
                    path="/manager/myprojects"
                    exact
                    component={ManagerProjects}
                  ></Route>
                  <Route
                    path="/manager/jobboard"
                    exact
                    component={ManagerJobBoard}
                  ></Route>
                </Switch>
              </Content>
              <Footer className="App-footer">Footer</Footer>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
