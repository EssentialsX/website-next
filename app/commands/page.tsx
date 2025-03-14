"use client";

import { useState } from "react";
import ExpandableList from "@/components/expanding-list";
import PageHeader from "@/components/page-header";
import { Badge, Paper, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from "@mantine/core";

export default function Commands() {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const commands = [
        {
            id: 1,
            module: "Essentials",
            command: "/help",
            aliases: ["/essentials", "/help"],
            description: "A command that provides a lot of help for our users wow big description.",
            syntax: "/help [(command)] [page]",
            details: {
                permissions: "essentials.help",
                examples: [
                    "/help - Shows the main help page",
                    "/help teleport - Shows help for the teleport command",
                    "/help 2 - Shows page 2 of the main help"
                ],
                notes: "This command provides help for all EssentialsX commands and displays them in a paginated format."
            }
        },
        {
            id: 4,
            module: "Essentials",
            command: "/help",
            aliases: ["/essentials", "/help"],
            description: "A command that provides a lot of help for our users wow big description.",
            syntax: "/help [(command)] [page]",
            details: {
                permissions: "essentials.help",
                examples: [
                    "/help - Shows the main help page",
                    "/help teleport - Shows help for the teleport command",
                    "/help 2 - Shows page 2 of the main help"
                ],
                notes: "This command provides help for all EssentialsX commands and displays them in a paginated format."
            }
        },
        {
            id: 3,
            module: "Essentials",
            command: "/help",
            aliases: ["/essentials", "/help"],
            description: "A command that provides a lot of help for our users wow big description.",
            syntax: "/help [(command)] [page]",
            details: {
                permissions: "essentials.help",
                examples: [
                    "/help - Shows the main help page",
                    "/help teleport - Shows help for the teleport command",
                    "/help 2 - Shows page 2 of the main help"
                ],
                notes: "This command provides help for all EssentialsX commands and displays them in a paginated format."
            }
        },
        {
            id: 2,
            module: "Essentials",
            command: "/help",
            aliases: ["/essentials", "/help"],
            description: "A command that provides a lot of help for our users wow big description.",
            syntax: "/help [(command)] [page]",
            details: {
                permissions: "essentials.help",
                examples: [
                    "/help - Shows the main help page",
                    "/help teleport - Shows help for the teleport command",
                    "/help 2 - Shows page 2 of the main help"
                ],
                notes: "This command provides help for all EssentialsX commands and displays them in a paginated format."
            }
        },
    ];

    // Toggle expanded row
    const toggleRow = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <div className="flex flex-col">
            <PageHeader
                title="Commands"
                description="EssentialsX commands reference."
            />

            <div className="mx-16">
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>Module</TableTh>
                            <TableTh>Command</TableTh>
                            <TableTh>Aliases</TableTh>
                            <TableTh>Description</TableTh>
                            <TableTh>Syntax</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        {commands.map((cmd) => (
                            <>
                                <TableTr
                                    key={cmd.id}
                                    onClick={() => toggleRow(cmd.id)}
                                    className="hover:bg-gray-100 cursor-pointer transition-all"
                                >
                                    <TableTd>
                                        <Badge>{cmd.module}</Badge>
                                    </TableTd>
                                    <TableTd>
                                        <code>{cmd.command}</code>
                                    </TableTd>
                                    <TableTd>
                                        <ExpandableList items={cmd.aliases} />
                                    </TableTd>
                                    <TableTd>
                                        {cmd.description}
                                    </TableTd>
                                    <TableTd>
                                        <code>{cmd.syntax}</code>
                                    </TableTd>
                                </TableTr>
                                {expandedRow === cmd.id && (
                                    <TableTr key={`${cmd.id}Expand`}>
                                        <TableTd colSpan={5} className="p-0">
                                            <Paper
                                                shadow="sm"
                                                p="md"
                                                withBorder
                                                className="m-2 bg-blue-50"
                                            >
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div>
                                                        <h3 className="text-lg font-semibold">Permissions</h3>
                                                        <code>{cmd.details.permissions}</code>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold">Examples</h3>
                                                        <ul className="list-disc pl-5">
                                                            {cmd.details.examples.map((example, idx) => (
                                                                <li key={idx}><code>{example}</code></li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold">Notes</h3>
                                                        <p>{cmd.details.notes}</p>
                                                    </div>
                                                </div>
                                            </Paper>
                                        </TableTd>
                                    </TableTr>
                                )}
                            </>
                        ))}
                    </TableTbody>
                </Table>
            </div>
        </div>
    );
}