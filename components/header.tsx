import Link from "next/link"
import { Button, Container, Group } from "@mantine/core"
import Image from "next/image";

export default function Header() {
    return (
        <Container bg="#2C2E33" size="xl" h="100%">
            <Group justify="space-between" h="100%" px="xl">
                <Link href="/" style={{textDecoration: "none", color: "inherit"}}>
                    <Image
                        width={196}
                        height={32}
                        src="/logo-navbar.png"
                        alt="EssentialsX Logo"
                        className="object-contain"
                    />
                </Link>
                <Group>
                    <Button component={Link} c="white" href="/community" variant="subtle">
                        Community
                    </Button>
                    <Button component={Link} c="white" href="/wiki" variant="subtle">
                        Wiki
                    </Button>
                    <Button component={Link} c="white" href="/downloads">
                        Downloads
                    </Button>
                </Group>
            </Group>
        </Container>
    )
}

