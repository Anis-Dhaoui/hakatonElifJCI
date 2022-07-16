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
                        <h6 className="text-center">My Products</h6>
                    </NavLink>
                </Col>
                <Col className="col-12 col-sm-4 nav-item bg-warning">
                    <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => { toggle('3'); }}
                    >
                        <h6 className="text-center">Post new product</h6>
                    </NavLink>
                </Col>
            </Row>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <ProfileSetting />
                </TabPane>
                <TabPane tabId="2">
                <Row>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right m-3">My products</h4>
                    </div>
                    <MyProducts />
                </Row>
                </TabPane>
                <TabPane tabId="3">
                    <PostProducs />
                </TabPane>
            </TabContent>
        </div>
    )
}
