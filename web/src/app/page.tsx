'use client'
import { DataTable } from '@/components/data/DataTable'
import { columns } from '@/components/data/columns'
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const { data: result, error, isLoading } = useSWR('http://localhost:3001/csv?limit=10', fetcher)
  console.error("🚀 ~ Home ~ error:", error);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DataTable data={result?.data || []} columns={columns}/>
    </main>
  )
}
