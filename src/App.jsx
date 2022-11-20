import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from '../src/views/landing-page/LandingPage'
import Signup from '../src/views/signup-page/Signup'
import AdminAuth from '../src/views/admin/auth/AdminAuth'
import UserManagement from '../src/views/admin/account/user-management/UserManagement'
import AdminHome from '../src/views/admin/account/Home/AdminHome'
import AdminsManagement from '../src/views/admin/account/admin-management/AdminsManagement'
import AdminSettings from '../src/views/admin/account/settings/AdminSettings'
import UserFeed from './views/users/feed/UserFeed'
import Reports from './views/admin/reports/Reports';
import ConfirmEmail from './views/confirm-email/ConfirmEmail';

function App() {
    return(
        <Router>
            <div className="app">
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <LandingPage/>
                        </Route>
                        <Route exact path="/signup">
                            <Signup/>
                        </Route>
                        <Route exact path="/admin">
                            <AdminAuth/>
                        </Route>
                        <Route exact path="/admin_user_management">
                            <UserManagement/>
                        </Route>
                        <Route exact path="/admin_home">
                            <AdminHome/>
                        </Route>
                        <Route exact path="/admin_admins_management">
                            <AdminsManagement/>
                        </Route>
                        <Route exact path="/admin_settings">
                            <AdminSettings/>
                        </Route> 
                        <Route exact path="/reports">
                            <Reports/>
                        </Route>
                        <Route exact path="/feed">
                            <UserFeed/>
                        </Route>
                        <Route exact path="/confirm_email/:token">
                            <ConfirmEmail/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
    
}

export default App;
