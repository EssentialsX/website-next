"use client"

import React from "react";
import Link from "next/link";
import { Text } from "@mantine/core";
import { wikiNavigation } from "@/lib/wiki-navigation";
import { usePathname } from "next/navigation";

export default function WikiSidebar() {
    const path = usePathname();

    return (
        <aside className="bg-[#1c1e22] w-full p-4 rounded-lg">
            <div>
                {Object.keys(wikiNavigation).map((category, index) => (
                    <div key={index} className="mb-6">
                        <Text size="sm" fw={700} c="dimmed" className="mb-2">
                            {category}
                        </Text>
                        <div className="space-y-1">
                            {wikiNavigation[category].map((link, linkIndex) => (
                                <Link
                                    key={linkIndex}
                                    href={link.slug ? `/wiki/${link.slug}` : link.href!}
                                    className={`block py-1 px-2 rounded hover:bg-[#d91c1c] ${
                                        path === `/wiki/${link.slug}` ? "bg-[#d91c1c] text-white" : "text-gray-300"
                                    }`}
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}
