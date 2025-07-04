// src/components/BackendTest.tsx
import { useState, useEffect } from 'preact/hooks';
import { graphqlClient } from '../utils/graphql-client';

export default function BackendTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${info}`]);
  };

  useEffect(() => {
    const testBackend = async () => {
      try {
        // Get the endpoint being used
        const isDev = import.meta.env.DEV;
        const currentEndpoint = isDev 
          ? import.meta.env.DEV_NEXT_PUBLIC_APP_BACKEND_URL 
          : import.meta.env.PROD_NEXT_PUBLIC_APP_BACKEND_URL;
        
        setEndpoint(currentEndpoint || 'Not configured');
        addDebugInfo(`Environment: ${isDev ? 'Development' : 'Production'}`);
        addDebugInfo(`Endpoint: ${currentEndpoint}`);
        
        console.log('BackendTest: Testing endpoint:', currentEndpoint);
        
        if (!currentEndpoint) {
          throw new Error('Backend URL not configured in environment variables');
        }
        
        // Test if endpoint is reachable first
        addDebugInfo('Testing endpoint reachability...');
        try {
          const response = await fetch(currentEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: '{ __typename }'
            })
          });
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          addDebugInfo('Endpoint is reachable');
        } catch (fetchError) {
          addDebugInfo(`Endpoint not reachable: ${fetchError instanceof Error ? fetchError.message : 'Unknown error'}`);
          throw new Error(`Cannot reach backend at ${currentEndpoint}. Is the server running?`);
        }
        
        // Simple test query
        addDebugInfo('Sending GraphQL query...');
        const testQuery = `
          query TestQuery {
            companies {
              nodeId
              name
            }
          }
        `;
        
        const response = await graphqlClient.request<{ companies: Array<{ nodeId: string; name: string }> }>(testQuery);
        console.log('BackendTest: Response received:', response);
        
        addDebugInfo('GraphQL query successful');
        setStatus('success');
        setMessage(`Backend is accessible! Found ${response.companies?.length || 0} companies.`);
      } catch (error) {
        console.error('BackendTest: Error:', error);
        addDebugInfo(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Unknown error occurred');
      }
    };

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (status === 'loading') {
        addDebugInfo('Request timed out after 15 seconds');
        setStatus('error');
        setMessage('Request timed out. The backend may not be running or is not responding.');
      }
    }, 15000);

    testBackend();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Backend Connection Test</h2>
      
      <div className="space-y-2">
        <div>
          <span className="font-medium">Endpoint: </span>
          <span className="text-sm text-gray-600">{endpoint}</span>
        </div>
        
        <div>
          <span className="font-medium">Status: </span>
          {status === 'loading' && (
            <span className="text-yellow-600">Testing connection...</span>
          )}
          {status === 'success' && (
            <span className="text-green-600">✓ Connected</span>
          )}
          {status === 'error' && (
            <span className="text-red-600">✗ Error</span>
          )}
        </div>
        
        {message && (
          <div className="text-sm text-gray-700 mt-2">
            {message}
          </div>
        )}
        
        {debugInfo.length > 0 && (
          <div className="mt-4">
            <div className="font-medium text-sm mb-2">Debug Log:</div>
            <div className="bg-gray-100 p-2 rounded text-xs font-mono max-h-32 overflow-y-auto">
              {debugInfo.map((info, index) => (
                <div key={index} className="text-gray-700">{info}</div>
              ))}
            </div>
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-xs text-red-500 mt-2">
            <div className="font-medium">Common solutions:</div>
            <div>1. Ensure backend server is running: npm run dev (in bangsluke-backend-server)</div>
            <div>2. Check if backend is accessible at: {endpoint}</div>
            <div>3. Verify .env file has correct backend URL</div>
            <div>4. Check browser console for detailed error logs</div>
            <div>5. Try accessing GraphQL Playground directly: {endpoint}</div>
          </div>
        )}
      </div>
    </div>
  );
} 