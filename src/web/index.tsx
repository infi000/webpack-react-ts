import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style/app.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from 'antd';

const { Content, Footer } = Layout;

import { HeaderUi } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { About } from "./components/About/About";
import { Todo } from "./components/Todo/Todo";


function Main(params:type) {
    return (
        <Router>
            <Layout className="main-layout">
                <HeaderUi />
                <Content style={{ padding: '50px 50px', marginTop: 64, }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                        <Route path="/" exact component={Todo} />
                        <Route path="/about/" component={About} />
                        <Route path="/home/" component={Home} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    一灯©2019 Created by Ant UED
    </Footer>

            </Layout>
        </Router>
    )
}

ReactDOM.render(

    <Main />,

    document.getElementById("root")
);