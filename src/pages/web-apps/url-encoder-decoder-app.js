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

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-4">URL Encoder / Decoder</h1>
        <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-4 h-24 resize-y"
            placeholder="Enter text here"
        />
        <div className="flex space-x-2 mb-4">
            <button
            onClick={encodeText}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
            Encode
            </button>
            <button
            onClick={decodeText}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
            Decode
            </button>
            <button
            onClick={resetAll}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
            Reset
            </button>
        </div>
        <div className="mb-4">
            <h2 className="font-semibold mb-2">Encoded Result:</h2>
            <div className="bg-gray-100 p-2 rounded-md overflow-x-auto">
            <pre className="whitespace-pre-wrap break-all">{encodedText}</pre>
            </div>
        </div>
        <div>
            <h2 className="font-semibold mb-2">Decoded Result:</h2>
            <div className="bg-gray-100 p-2 rounded-md overflow-x-auto">
            <pre className="whitespace-pre-wrap break-all">{decodedText}</pre>
            </div>
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