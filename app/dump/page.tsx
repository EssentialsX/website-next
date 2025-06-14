'use client';

import Dump from '@/components/dump/dump';
import DumpError from '@/components/dump/dump-error';
import DumpMissing from '@/components/dump/dump-missing';
import PageHeader from '@/components/page-header';
import { DumpPaste } from '@/lib/dump-utils';
import {
  CodeHighlightAdapterProvider,
  createShikiAdapter,
} from '@mantine/code-highlight';
import { Loader } from '@mantine/core';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const loadingBars = (
  <div className='flex justify-center mt-12'>
    <Loader type='bars' />
  </div>
);

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['plaintext', 'json', 'log', 'yml'],
    themes: [],
  });

  return shiki;
}

const shikiAdapter = createShikiAdapter(loadShiki);

export default function Page() {
  return (
    <div className='flex flex-col'>
      <PageHeader title='EssentialsX Server Dump' />

      <div className='lg:px-28'>
        <Suspense fallback={loadingBars}>
          <CodeHighlightAdapterProvider adapter={shikiAdapter}>
            <DumpContent />
          </CodeHighlightAdapterProvider>
        </Suspense>
      </div>
    </div>
  );
}

function DumpContent() {
  const params = useSearchParams();
  const bytebin = params.get('bytebin');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [dump, setDump] = useState<DumpPaste | undefined>(undefined);

  const fetchDump = async () => {
    setLoading(true);
    await axios
      .get(`https://api.pastes.dev/${bytebin}`)
      .then(res => res.data as DumpPaste)
      .then(setDump)
      .catch(e => {
        console.log(e);
        setError(e.response ? e.response.data : e.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (bytebin) {
      fetchDump();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bytebin]);

  if (bytebin === null) {
    return <DumpMissing />;
  }

  if (loading) {
    return loadingBars;
  }

  if (error !== undefined) {
    return <DumpError error={error} />;
  }

  if (dump !== undefined) {
    return <Dump id={bytebin} dump={dump} />;
  }

  return null;
}
