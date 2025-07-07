import { useState, useEffect } from 'preact/hooks';
import { graphqlClient, graphqlRequest } from '../utils/graphql-client';

interface DebugResult {
  test: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  details?: any;
  timestamp: string;
}

export default function GraphQLDebugger() {
  const [results, setResults] = useState<DebugResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (test: string, status: DebugResult['status'], message: string, details?: any) => {
    setResults(prev => [...prev, {
      test,
      status,
      message,
      details,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);

    // Test 1: Environment Variables
    addResult('Environment Check', 'pending', 'Checking environment variables...');
    try {
      const isDev = import.meta.env.DEV;
      const devUrl = import.meta.env.PUBLIC_APP_BACKEND_URL_DEV;
      const prodUrl = import.meta.env.PUBLIC_APP_BACKEND_URL_PROD;
      
      addResult('Environment Check', 'success', 
        `Environment: ${isDev ? 'Development' : 'Production'}, Dev URL: ${devUrl || 'Not set'}, Prod URL: ${prodUrl || 'Not set'}`,
        { isDev, devUrl, prodUrl }
      );
    } catch (error) {
      addResult('Environment Check', 'error', 
        `Environment check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      );
    }

    // Test 2: Network Connectivity
    addResult('Network Test', 'pending', 'Testing network connectivity...');
    try {
      const testUrl = import.meta.env.DEV ? 
        import.meta.env.PUBLIC_APP_BACKEND_URL_DEV : 
        import.meta.env.PUBLIC_APP_BACKEND_URL_PROD;
      
      if (!testUrl) {
        addResult('Network Test', 'error', 'No backend URL configured');
        return;
      }

      const response = await fetch(testUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ __typename }' })
      });

      addResult('Network Test', 'success', 
        `Network test successful - Status: ${response.status}`,
        { status: response.status, statusText: response.statusText }
      );
    } catch (error) {
      addResult('Network Test', 'error', 
        `Network test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      );
    }

    // Test 3: GraphQL Schema Introspection
    addResult('Schema Introspection', 'pending', 'Testing GraphQL schema introspection...');
    try {
      const introspectionQuery = `
        query IntrospectionQuery {
          __schema {
            queryType {
              name
            }
            types {
              name
              kind
            }
          }
        }
      `;

      const result = await graphqlRequest(introspectionQuery);
      addResult('Schema Introspection', 'success', 
        `Schema introspection successful - Found ${result.__schema?.types?.length || 0} types`,
        { queryTypes: result.__schema?.types?.filter((t: any) => t.kind === 'OBJECT')?.map((t: any) => t.name) }
      );
    } catch (error) {
      addResult('Schema Introspection', 'error', 
        `Schema introspection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      );
    }

    // Test 4: Simple Query Test
    addResult('Simple Query Test', 'pending', 'Testing simple GraphQL query...');
    try {
      const simpleQuery = `
        query TestQuery {
          companies {
            nodeId
            name
          }
        }
      `;

      const result = await graphqlRequest(simpleQuery);
      addResult('Simple Query Test', 'success', 
        `Simple query successful - Found ${result.companies?.length || 0} companies`,
        { companies: result.companies }
      );
    } catch (error) {
      addResult('Simple Query Test', 'error', 
        `Simple query failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      );
    }

    // Test 5: CORS Test
    addResult('CORS Test', 'pending', 'Testing CORS configuration...');
    try {
      const testUrl = import.meta.env.DEV ? 
        import.meta.env.PUBLIC_APP_BACKEND_URL_DEV : 
        import.meta.env.PUBLIC_APP_BACKEND_URL_PROD;
      
      if (!testUrl) {
        addResult('CORS Test', 'error', 'No backend URL configured for CORS test');
        return;
      }

      const response = await fetch(testUrl, {
        method: 'OPTIONS',
        headers: {
          'Origin': window.location.origin,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type'
        }
      });

      const corsHeaders = {
        'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
        'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
        'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
      };

      addResult('CORS Test', 'success', 
        `CORS test successful - Status: ${response.status}`,
        { corsHeaders, status: response.status }
      );
    } catch (error) {
      addResult('CORS Test', 'error', 
        `CORS test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      );
    }

    setIsRunning(false);
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">GraphQL Connection Debugger</h2>
        <button
          onClick={runTests}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isRunning ? 'Running Tests...' : 'Run Debug Tests'}
        </button>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{result.test}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                result.status === 'success' ? 'bg-green-100 text-green-800' :
                result.status === 'error' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {result.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">{result.message}</div>
            <div className="text-xs text-gray-500 mt-1">{result.timestamp}</div>
            {result.details && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-blue-600">View Details</summary>
                <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>

      {results.length === 0 && !isRunning && (
        <div className="text-center text-gray-500 py-8">
          Click "Run Debug Tests" to start debugging your GraphQL connection
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Troubleshooting Tips:</h3>
          <ul className="text-sm space-y-1">
            <li>• Ensure your backend server is running on port 5001</li>
            <li>• Check that CORS is properly configured in your backend</li>
            <li>• Verify environment variables are set correctly</li>
            <li>• Check browser console for additional error details</li>
            <li>• Try accessing the GraphQL Playground directly at your backend URL</li>
          </ul>
        </div>
      )}
    </div>
  );
} 