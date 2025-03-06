import { Text } from "@mantine/core";

export default function DumpError({error}: { error: string }) {
    return (
        <div className="mt-8 mx-20 rounded-xl">
            <div className="not-dark:bg-red-50 border-red-500 p-4 border-l-4 rounded-sm">
                <Text>
                    Failed to load EssentialsX dump data!
                </Text>
                <Text>
                    Double check you used the correct URL, and if that doesn&apos;t work, try generating a new dump
                    with <b>/ess dump</b>.
                </Text>
                <Text mt="xl">
                    Error: <b>{error}</b>
                </Text>
            </div>
        </div>
    );
}