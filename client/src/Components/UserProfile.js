import React, { useState } from 'react'
import { TabContent, TabPane, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ProfileSetting from './ProfileSetting';
import PostProducs from './PostProducs';
import MyProducts from './MyProducts';
import '../css/userProfile.css';

export default function UserProfile(props) {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (

        <div id="user-profile" className="container">
            <Row className="nav-tabs">
                <Col className="col-12 col-sm-4 nav-item bg-warning border-right">
                    <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { toggle('1'); }}
                    >
                        <h6 className="text-center">Profile Setting</h6>
                    </NavLink>
                </Col>
                <Col className="col-12 col-sm-4 nav-item bg-warning border-right">
                    <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}
                    >
                        <h6 className="text-center">Mes Aventures</h6>
                    </NavLink>
                </Col>
                <Col className="col-12 col-sm-4 nav-item bg-warning">
                    <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => { toggle('3'); }}
                    >
                        <h6 className="text-center">Publier Aventures</h6>
                    </NavLink>
                </Col>
                <Col>
                <NavLink
                    className={classnames({ active: activeTab === '4' })}
                    onClick={() => { toggle('4'); }}
                    >
                        <h6 className="text-center">Créer un groupe</h6>
                    </NavLink>
                </Col>
                <Col>
                <NavLink
                    className={classnames({ active: activeTab === '5' })}
                    onClick={() => { toggle('5'); }}
                    >
                        <h6 className="text-center">Participer</h6>
                    </NavLink>
                </Col>
            </Row>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <ProfileSetting />
                </TabPane>
                <TabPane tabId="2">
                <Row>
                    <MyProducts />
                </Row>
                </TabPane>
                <TabPane tabId="3">
                    <PostProducs />
                </TabPane>
                <TabPane tabId="4">
                    <h1 style={{padding: "300px"}}>Créer un groupe camping</h1>
                </TabPane>
                <TabPane tabId="5">
                    <h1 style={{padding: "300px"}}>Participer a un groupe groupe</h1>
                </TabPane>
            </TabContent>
        </div>
    )
}
