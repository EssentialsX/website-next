"use client";

import DiscordAuthorize from "@/components/discord-authorize";
import { Stack, Title } from "@mantine/core";

export default function Discord() {
    return (
        <div className="flex flex-col">
            <section className="bg-primary py-12 px-12" style={{backgroundColor: "#D11920"}}>
                <div className="max-w-6xl mx-auto text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Authorize EssentialsX Discord Bot</h1>
                    <p className="text-lg">
                        Enter the client ID from the Discord Developers site
                        into the box below to add your bot to your Discord server.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <Stack>
                    <Title order={2}>Authorize your EssentialsX Discord Bot with Discord</Title>
                    <p>
                        Enter your Client ID, which you should have copied from
                        step two of the initial setup instructions, into the box below.
                    </p>
                    <p>
                        Once you enter your Client ID into the box below, clicking
                        &quot;Authorize&quot; will redirect you to Discord&apos;s website.
                        On Discord&apos;s website, you&apos;ll be able to select from any server
                        you have the &quot;Manage Server&quot; permission in to add it in. Once
                        you&apos;ve added the bot to a server, you can continue the next step in the initial setup.
                    </p>

                    <div className="flex items-center justify-center mt-10">
                        <DiscordAuthorize />
                    </div>
                </Stack>
            </div>
        </div>
    );
}