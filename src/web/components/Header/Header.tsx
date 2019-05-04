import * as  React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';

const { Header } = Layout;

function HeaderUi() {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1"> <Link to="/">Todo</Link></Menu.Item>
                <Menu.Item key="2">  <Link to="/about/">About</Link></Menu.Item>
                <Menu.Item key="3">  <Link to="/home/">Home</Link></Menu.Item>
            </Menu>
        </Header>
    )
}


export {
    HeaderUi
}