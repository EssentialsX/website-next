'use client';

import Dump from '@/components/dump/dump';
import DumpError from '@/components/dump/dump-error';
import DumpMissing from '@/components/dump/dump-missing';
import PageHeader from '@/components/page-header';
import { DumpPaste, GistResponse } from '@/lib/dump-utils';
import {
  CodeHighlightAdapterProvider,
  createShikiAdapter,
} from '@mantine/code-highlight';
import { Loader } from '@mantine/core';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const loadingBars = (
  <div className='mt-12 flex justify-center'>
    <Loader type='bars' />
  </div>
);

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  return await createHighlighter({
    langs: ['plaintext', 'json', 'log', 'yml'],
    themes: [],
  });
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
  const gist = params.get('gist');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [dump, setDump] = useState<DumpPaste | undefined>(undefined);

  const fetchBytebinDump = async () => {
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

  const fetchGistDump = async () => {
    setLoading(true);
    await axios
      .get(`https://api.github.com/gists/${gist}`)
      .then(async res => {
        // The gist contains the raw JSON content from pastes.dev
        const gistData = res.data as GistResponse;
        const firstFile = Object.values(gistData.files)[0];

        let rawContent: string;

        // If the content is truncated (which it likely will be!), fetch from raw_url
        if (firstFile.truncated) {
          const rawResponse = await axios.get(firstFile.raw_url, {
            responseType: 'text',
          });
          rawContent = rawResponse.data;
        } else {
          rawContent = firstFile.content;
        }

        const dumpPaste: DumpPaste = JSON.parse(rawContent);
        return dumpPaste;
      })
      .then(setDump)
      .catch(e => {
        console.log(e);
        setError(
          e.response ? e.response.data || e.response.statusText : e.message,
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (bytebin) {
      fetchBytebinDump();
    } else if (gist) {
      fetchGistDump();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bytebin, gist]);

  if (bytebin === null && gist === null) {
    return <DumpMissing />;
  }

  if (loading) {
    return loadingBars;
  }

  if (error !== undefined) {
    return <DumpError error={error} />;
  }

  if (dump !== undefined) {
    return (
      <Dump
        id={bytebin || gist || ''}
        dump={dump}
        sourceType={gist ? 'gist' : 'bytebin'}
      />
    );
  }

  return null;
}
