import { createClient } from '@/lib/supabase-server'

export default async function TestPage() {
  const supabase = await createClient()
  
  // Test database connection
  const { data, error } = await supabase
    .from('users')
    .select('count')
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Gearmobile Database Test</h1>
        {error ? (
          <div className="text-red-600">
            <p className="font-semibold">❌ Connection Error</p>
            <p className="text-sm mt-2">{error.message}</p>
          </div>
        ) : (
          <div className="text-green-600">
            <p className="font-semibold">✅ Supabase Connected!</p>
            <p className="text-sm mt-2">Database is ready</p>
          </div>
        )}
      </div>
    </div>
  )
}
