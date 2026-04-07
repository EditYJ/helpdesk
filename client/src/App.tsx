import { useEffect, useState } from 'react'

interface DbTestResponse {
  status: string
  message: string
}

function App() {
  const [dbTest, setDbTest] = useState<DbTestResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/db-test')
      .then((res) => res.json())
      .then((data) => {
        setDbTest(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Database Connection Test</h1>

        {loading && (
          <div className="text-gray-500">Loading...</div>
        )}

        {error && (
          <div className="text-red-500">Error: {error}</div>
        )}

        {dbTest && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded-full ${dbTest.status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className={`font-medium ${dbTest.status === 'ok' ? 'text-green-700' : 'text-red-700'}`}>
                Status: {dbTest.status}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Message: {dbTest.message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
