import React from "react";
import { Link } from "gatsby";

import Layout from "../../components/layout";
import Seo from "../../components/seo";
import CalculatorComponent from "../../components/calculator-app/CalculatorComponent";

//TODO 여기를 템플릿으로 변경 하기
const CalculatorApp = () => (
  <Layout>
    <div className="calculatorAppStyles.app">
      <h1>React Calculator</h1>
      <CalculatorComponent />
    </div>
    
    <br />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const Head = () => <Seo title="Simple calculator for use in your web browser" />

export default CalculatorApp
