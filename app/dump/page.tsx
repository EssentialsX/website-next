"use client";

import Dump from "@/components/dump/dump";
import DumpError from "@/components/dump/dump-error";
import DumpMissing from "@/components/dump/dump-missing";
import { DumpPaste } from "@/lib/dump-utils";
import { Loader } from "@mantine/core";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const loadingBars = (
    <div className="flex justify-center mt-12">
        <Loader type="bars"/>
    </div>
);

export default function Page() {
    return (
        <div className="flex flex-col">
            <section className="bg-primary py-12 px-12" style={{backgroundColor: "#D11920"}}>
                <div className="max-w-6xl mx-auto text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">EssentialsX Server Dump</h1>
                </div>
            </section>

            <Suspense fallback={loadingBars}>
                <DumpContent />
            </Suspense>
        </div>
    );
}

function DumpContent() {
    const params = useSearchParams();
    const bytebin = params.get("bytebin");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);
    const [dump, setDump] = useState<DumpPaste | undefined>(undefined);

    const fetchDump = async () => {
        setLoading(true);
        await axios.get(`https://api.pastes.dev/${bytebin}`)
            .then(res => res.data as DumpPaste)
            .then(setDump)
            .catch(e => {
                console.log(e);
                setError(e.response ? e.response.data : e.message);
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (bytebin) {
            fetchDump();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bytebin]);

    if (bytebin === null) {
        return <DumpMissing/>
    }

    if (loading) {
        return loadingBars;
    }

    if (error !== undefined) {
        return <DumpError error={error} />
    }

    if (dump !== undefined) {
        return <Dump id={bytebin} dump={dump} />
    }

    return null;
}