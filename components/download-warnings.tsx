import { List, ListItem, Text } from "@mantine/core";

export default function DownloadWarnings() {
    return (
        <div className="md:w-72 not-dark:bg-red-100 border-red-500 p-4 border-l-4">
            <Text fw={700}>EssentialsX does not support</Text>
            <List spacing="xs" size="sm" mt="sm">
                <ListItem>
                    <Text fw={700}>ℹ️ Folia is not supported yet.</Text>
                    We are working on proper Folia support. Do not attempt to use
                    current versions of EssentialsX on Folia or forks of it - you may lose userdata.
                </ListItem>
                <ListItem>
                    <Text fw={700}>🛑 Do not use Mohist.</Text>
                    Do not use Mohist. Mohist tricks users into deleting official
                    EssentialsX jars and installing unofficial modified software.{" "}
                    <a className="underline" href="#">
                        Click here for more information.
                    </a>
                </ListItem>
                <ListItem>
                    <Text fw={700}>🛑 Other Forge/Fabric hybrid server software</Text>
                    including Cauldron, Thermos, CatServer etc. - the Bukkit API does not properly support mods, and
                    using Bukkit plugins on modded Forge/Fabric servers will cause significant problems.
                    For Forge servers, use{" "}
                    <a className="underline" href="https://www.spongepowered.org/downloads/spongeforge">
                        SpongeForge
                    </a> with{" "}
                    <a className="underline" href="https://nucleuspowered.org/">
                        Nucleus
                    </a> for plugin support and a complete Essentials replacement, or consider a mod designed
                    for Forge such as {" "}
                    <a className="underline" href="https://www.curseforge.com/minecraft/mc-mods/ftb-essentials">
                        FTB Essentials.
                    </a>
                </ListItem>
                <ListItem>
                    <Text fw={700}>🛑 1.7.10 or below</Text>
                    You should use the original{" "}
                    <a className="underline" href="https://dev.bukkit.org/projects/essentials">
                        Essentials.
                    </a>
                </ListItem>
            </List>
        </div>
    );
}