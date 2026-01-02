import { useEffect, useState } from 'react';

function APITest() {
  const [status, setStatus] = useState('Testing...');
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing API:', import.meta.env.VITE_API_URL);
        
        // Test health endpoint
        const healthResponse = await fetch(`${import.meta.env.VITE_API_URL.replace('/api', '')}/health`);
        console.log('Health response:', healthResponse.status);
        
        // Test problems endpoint
        const problemsResponse = await fetch(`${import.meta.env.VITE_API_URL}/problems`);
        console.log('Problems response:', problemsResponse.status);
        
        if (problemsResponse.ok) {
          const data = await problemsResponse.json();
          setProblems(data.problems || []);
          setStatus(`✅ API Working - ${data.problems?.length || 0} problems loaded`);
        } else {
          setStatus(`❌ API Error: ${problemsResponse.status}`);
        }
      } catch (error) {
        console.error('API Test Error:', error);
        setStatus(`❌ Connection Error: ${error.message}`);
      }
    };

    testAPI();
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>API Connection Test</h3>
      <p><strong>API URL:</strong> {import.meta.env.VITE_API_URL}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Problems Count:</strong> {problems.length}</p>
      {problems.length > 0 && (
        <ul>
          {problems.slice(0, 3).map(p => (
            <li key={p._id}>{p.title} ({p.difficulty})</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default APITest;