'use client'

import { DataTable } from '@/components/data/DataTable'
import { columns } from '@/components/data/columns'
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const [page, setPage] = useState(1);

  const { data: result, error, isLoading } = useSWR(
    `http://localhost:3001/csv?limit=10&page=${page}`,
     fetcher
  );

  const onNextPage = () => setPage((current) => {
    if (result.nextPage === null) {
      return current;
    }

    return current + 1;
  })

  const onPreviousPage = () => setPage((current) => {
    if (result.nextPage === null) {
      return current;
    }

    return current - 1;
  })

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DataTable
        data={result}
        columns={columns}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </main>
  )
}
