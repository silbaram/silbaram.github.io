import React, { useState } from "react"

import Seo from "../../../components/Seo";
import ProjectDetail from "../../../components/ProjectDetail"

const JSONFormatterComponent = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [collapsedState, setCollapsedState] = useState({});

  const formatJSON = (input) => {
    try {
      const parsedData = JSON.parse(input);
      setJsonData(parsedData);
      setError('');
    } catch (e) {
      setJsonData(null);
      setError(`Error parsing JSON: ${e.message}`);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    formatJSON(event.target.value);
  };

  const toggleCollapse = (key) => {
    setCollapsedState((prevState) => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const renderJSON = (data, level = 0, keyPath = '') => {
    if (typeof data === 'object' && data !== null) {
      const isArray = Array.isArray(data);
      const key = keyPath || 'root';
      const collapsed = collapsedState[key] || false;
      const indent = ' '.repeat(level * 4); // 들여쓰기 설정

      return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
                    <span style={{ marginLeft: indent }}>
                        {isArray ? '' : `"${key.split('.').pop()}": `}
                      <span
                        onClick={() => toggleCollapse(key)}
                        style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px' }}
                      >
                            {collapsed ? '[+]' : '[-]'}
                        </span>
                    </span>
          {collapsed ? (
            <span>{isArray ? '[ ... ]' : '{ ... }'}</span>
          ) : (
            <span>
                            {isArray ? '[' : '{ '}
              <div style={{ marginLeft: `${(level + 1) * 20}px` }}>
                                {Object.keys(data).map((subKey, index, array) => {
                                  const newKeyPath = keyPath ? `${keyPath}.${subKey}` : subKey;
                                  return (
                                    <div key={index}>
                                      {renderJSON(data[subKey], level + 1, newKeyPath)}
                                      {index < array.length - 1 ? ',' : ''}
                                    </div>
                                  );
                                })}
                            </div>
                            <span>{isArray ? ']' : '}'}</span>
                        </span>
          )}
        </div>
      );
    } else {
      return (
        <span style={{ color: 'green', display: 'inline' }}>
                    {JSON.stringify(data)}
                </span>
      );
    }
  };

  return (
    <div>
      <textarea
        className="w-full"
        value={input}
        onChange={handleInputChange}
        style={{ height: '200px' }}
        placeholder="여기에 JSON을 입력하세요..."
      />
      <div style={{ background: '#f4f4f4', padding: '10px', marginTop: '20px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
        {error ? (
          <pre>{error}</pre>
        ) : jsonData ? (
          <pre>{renderJSON(jsonData)}</pre>
        ) : (
          "유효한 JSON을 입력하세요."
        )}
      </div>
    </div>
  );
};

const JsonViewerApp = ({ location }) => {
  const isFullscreen = location?.state?.isFullscreen ?? true;

  return (
    <ProjectDetail title={"JSON Formatter"} isFullscreen={isFullscreen}>
      <div>
          <JSONFormatterComponent />
      </div>
    </ProjectDetail>
  );
};

export const Head = () => (
  <Seo
    title="JSON Formatter – JSON 뷰어"
    description="Quickly paste JSON and explore its structure with expand/collapse functionality."
    keywords={["JSON 뷰어", "JSON 포매터", "Webtool", "개발 도구", "JSON Viewer", "JSON Formatter", "Webtool", "Developer Tool"]}
  />
)
export default JsonViewerApp