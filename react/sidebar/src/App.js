import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Provider from './pages/Provider'
import ProviderOrganization from './pages/ProviderOrganization';
import ProviderServices from './pages/ProviderServices';
import ProviderDirectory from './pages/ProviderDirectory';
import Manager from './pages/Manager';
import ManagerProjects from './pages/ManagerProjects';
import ManagerOrganization from './pages/ManagerOrganization';
import ManagerJobBoard from './pages/ManagerJobBoard';

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path='/home' exact component={Home}></Route>
        <Route path='/provider' exact component={Provider}></Route>
        <Route path='/provider/organization' exact component={ProviderOrganization}></Route>
        <Route path='/provider/myservices' exact component={ProviderServices}></Route>
        <Route path='/provider/directory' exact component={ProviderDirectory}></Route>
        <Route path='/manager' exact component={Manager}></Route>
        <Route path='/manager/organization' exact component={ManagerOrganization}></Route>
        <Route path='/manager/myprojects' exact component={ManagerProjects}></Route>
        <Route path='/manager/jobboard' exact component={ManagerJobBoard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
