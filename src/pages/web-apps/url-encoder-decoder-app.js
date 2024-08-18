import React, { useState } from 'react';
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const URLEncoderDecoder = () => {
    const [input, setInput] = useState('');
    const [encodedText, setEncodedText] = useState('');
    const [decodedText, setDecodedText] = useState('');

    const encodeText = () => {
        const encoded = input.replace(/[^/:?#[\]@!$&'()*+,;=]/g, (char) => encodeURIComponent(char));
        setEncodedText(encoded);
    };

    const decodeText = () => {
        try {
        const decoded = decodeURIComponent(input.replace(/%(?![0-9A-Fa-f]{2})/g, '%25'));
        setDecodedText(decoded);
        } catch (error) {
        setDecodedText('Unable to decode the text.');
        }
    };

    const resetAll = () => {
        setInput('');
        setEncodedText('');
        setDecodedText('');
    };

    const styles = {
        container: {
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        },
        title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
        },
        textarea: {
        width: '100%',
        height: '100px',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '14px',
        },
        buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        },
        button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        },
        encodeButton: {
        backgroundColor: '#4CAF50',
        },
        decodeButton: {
        backgroundColor: '#2196F3',
        },
        resetButton: {
        backgroundColor: '#f44336',
        },
        resultContainer: {
        marginBottom: '20px',
        },
        resultTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
        },
        resultText: {
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minHeight: '50px',
        wordBreak: 'break-all',
        },
    };

    return (
        <div style={styles.container}>
        <h1 style={styles.title}>URL Encoder / Decoder</h1>
        <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.textarea}
            placeholder="Enter text here"
        />
        <div style={styles.buttonContainer}>
            <button
            onClick={encodeText}
            style={{...styles.button, ...styles.encodeButton}}
            >
            Encode
            </button>
            <button
            onClick={decodeText}
            style={{...styles.button, ...styles.decodeButton}}
            >
            Decode
            </button>
            <button
            onClick={resetAll}
            style={{...styles.button, ...styles.resetButton}}
            >
            Reset
            </button>
        </div>
        <div style={styles.resultContainer}>
            <h2 style={styles.resultTitle}>Encoded Result:</h2>
            <div style={styles.resultText}>{encodedText}</div>
        </div>
        <div style={styles.resultContainer}>
            <h2 style={styles.resultTitle}>Decoded Result:</h2>
            <div style={styles.resultText}>{decodedText}</div>
        </div>
        </div>
    );
};

//TODO 여기를 템플릿으로 변경 하기
const URLEncoderDecoderrApp = () => (
    <Layout>
        <div>
            <h1>JSON Formatter</h1>
            <URLEncoderDecoder />
        </div>
            
        <br />
        <Link to="/">Go back to the homepage</Link>
    </Layout>
)

export const Head = () => <Seo title="A service that provides features that make it easier to view JSON formats." />

export default URLEncoderDecoderrApp