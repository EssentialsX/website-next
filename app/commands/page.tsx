"use client";

import React, { Fragment, useState } from "react";
import ExpandableList from "@/components/expanding-list";
import PageHeader from "@/components/page-header";
import {
    Badge,
    Button,
    Collapse,
    Paper,
    Table,
    TableTbody,
    TableTd,
    TableTh,
    TableThead,
    TableTr
} from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";

import core from "@/lib/EssentialsX-commands.json"
import chat from "@/lib/EssentialsXChat-commands.json"
import spawn from "@/lib/EssentialsXSpawn-commands.json"
import discord from "@/lib/EssentialsXDiscord-commands.json"
import discordlink from "@/lib/EssentialsXDiscordLink-commands.json"
import xmpp from "@/lib/EssentialsXXMPP-commands.json"

export default function Commands() {
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const allCommands = {
        "Essentials": core,
        "Chat": chat,
        "Spawn": spawn,
        "Discord": discord,
        "Discord Link": discordlink,
        "XMPP": xmpp
    }

    // Toggle expanded row
    const toggleRow = (id: string) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <div className="flex flex-col">
            <PageHeader
                title="Commands"
                description="EssentialsX commands reference."
            />

            <div className="xl:mx-16">
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>Module</TableTh>
                            <TableTh>Command</TableTh>
                            <TableTh>Aliases</TableTh>
                            <TableTh>Description</TableTh>
                            <TableTh>Usage(s)</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        {Object.entries(allCommands).map(([mod, cmds]) =>
                            Object.entries(cmds).map(([cmd, obj]) => (
                                <Fragment key={cmd}>
                                    <TableTr>
                                        <TableTd>
                                            <Badge fullWidth>{mod}</Badge>
                                        </TableTd>
                                        <TableTd className="prose dark:prose-invert">
                                            <code className="text-xs">/{cmd}</code>
                                        </TableTd>
                                        <TableTd>
                                            <ExpandableList
                                                items={obj.aliases
                                                    .sort((a, b) => a.length - b.length)
                                                    .map((alias) => `/${alias}`)}
                                            />
                                        </TableTd>
                                        <TableTd>
                                            {obj.description}
                                        </TableTd>
                                        <TableTd
                                            className="prose dark:prose-invert cursor-pointer flex"
                                            onClick={() => toggleRow(cmd)}
                                        >
                                            <code
                                                className="text-xs break-all flex items-center"
                                                style={{ borderStartEndRadius: 0, borderBottomRightRadius: 0 }}
                                            >
                                                /{cmd}{obj.usage.slice(10)}
                                            </code>
                                            <Button
                                                px={2}
                                                h="inherit"
                                                style={{ borderStartStartRadius: 0, borderBottomLeftRadius: 0 }}
                                            >
                                                <IconSelector size={14} />
                                            </Button>
                                        </TableTd>
                                    </TableTr>
                                    <Collapse in={expandedRow === cmd} component={TableTr}>
                                        <TableTd colSpan={5} className="p-0">
                                            <Paper
                                                p="md"
                                                m={16}
                                                withBorder
                                                shadow="sm"
                                            >
                                                <h3>Usages</h3>
                                                <ul>
                                                    {obj.usages.map((line, index) => (
                                                        <li key={index}>
                                                            <code className="text-xs">{line.usage}</code>
                                                            <p className="text-xs">{line.description}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Paper>
                                        </TableTd>
                                    </Collapse>
                                </Fragment>
                        )))}
                    </TableTbody>
                </Table>
            </div>
        </div>
    );
}
