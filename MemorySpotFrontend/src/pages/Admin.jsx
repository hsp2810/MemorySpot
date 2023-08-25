import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Divider,
} from '@chakra-ui/react';
import Statistics from '../components/Admin/Statistics';
import Users from '../components/Admin/Users';
import Blocked from '../components/Admin/BlockedList';
import '../assets/css/userAdmin.css';
import AdminProfileButtonMenu from '../components/Admin/AdminProfileButtonMenu';
import MemoryOveride from '../components/Admin/MemoryOveride';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Admin = () => {
  const navigate = useNavigate();
  const { isLogin } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, []);

  return (
    <>
      {isLogin && (
        <>
          <div className="admin-container" style={{ marginLeft: '4rem' }}>
            <h1 className="admin-heading">Administrator Dashboard</h1>

            <AdminProfileButtonMenu></AdminProfileButtonMenu>
          </div>
          <Divider marginTop="2rem" marginBottom="2rem" />
          <div className="admin-manage" style={{ marginLeft: '4rem' }}>
            <Heading as="h2" className="admin-subheading">
              Manage
            </Heading>
            <Tabs variant="soft-rounded" colorScheme="orange">
              <TabList className="admin-tablist">
                <Tab className="admin-tab">Users</Tab>
                <Tab className="admin-tab">Banned</Tab>
                <Tab className="admin-tab">Statistics</Tab>
                <Tab className="admin-tab">Memory Override</Tab>
              </TabList>
              <TabPanels className="admin-tabpanels">
                <TabPanel className="admin-tabpanel">
                  <Users className="users" />
                </TabPanel>
                <TabPanel className="admin-tabpanel">
                  <Blocked />
                </TabPanel>
                <TabPanel className="admin-tabpanel">
                  <Statistics></Statistics>
                </TabPanel>
                <TabPanel className="admin-tabpanel">
                  <MemoryOveride></MemoryOveride>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </>
      )}
    </>
  );
};

export default Admin;
