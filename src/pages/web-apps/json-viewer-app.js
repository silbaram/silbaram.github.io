import React from 'react';
import { Link } from "gatsby";

import Seo from "../../components/seo";
import JSONFormatterComponent from "../../components/jsonformatter-app/JSONFormatterComponent";
import Layout from "../../components/layout/layout"

//TODO 여기를 템플릿으로 변경 하기
const JsonViewerApp = () => (
    <Layout>
        <div>
            <h1>JSON Formatter</h1>
            <JSONFormatterComponent />
        </div>
            
        <br />
        <Link to="/">Go back to the homepage</Link>
    </Layout>
)

export const Head = () => <Seo title="A service that provides features that make it easier to view JSON formats." />

export default JsonViewerApp