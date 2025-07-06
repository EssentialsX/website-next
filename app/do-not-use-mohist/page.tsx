import PageHeader from '@/components/page-header';
import {
  Anchor,
  Container,
  Flex,
  List,
  ListItem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Image from 'next/image';

export default function DoNotUseMohist() {
  return (
    <Flex direction='column'>
      <PageHeader
        title='PSA: Do not use Mohist.'
        description='A warning about malicious behaviour and the dangers of running untrusted code.'
      />

      <Container size='xl' py={40}>
        <Stack gap={20}>
          <Text fs='italic'>
            Note: this PSA is not about whether or not we will help you if you
            run Mohist. That question is answered on the official EssentialsX
            downloads page and changelogs.
            <br /> This PSA is about security and dangerous behaviour by the
            Mohist project.
          </Text>
          <Text mt={0}>
            It has come to our attention that as of{' '}
            <a
              href='https://github.com/MohistMC/Mohist/commit/58bbb1c8a13dcbf764c11668287e6fb85a884b3a'
              className='link'
            >
              10th April 2021
            </a>
            ,{' '}
            <strong>
              Mohist tricks users into deleting official plugin jars and
              installing unofficial modified builds.
            </strong>{' '}
            Not only is this behaviour shady, but it also poses significant risk
            to users who don&apos;t know what software they&apos;re running.
          </Text>

          <Text>
            As a result, we strongly recommend that you{' '}
            <strong>
              do not use or support the Mohist project in any way going
              forwards.
            </strong>{' '}
            We cannot guarantee the safety or functionality of unofficial builds
            of EssentialsX, and you should avoid using Mohist where possible.
            There are countless alternatives that are safer and more functional,
            and these alternatives are listed at the bottom of this page.
          </Text>

          <div>
            <Title order={2} mb='md'>
              Context
            </Title>

            <Stack gap='lg'>
              <div>
                <Title order={3} size='h4' mb='sm'>
                  Forge, Bukkit and hybrid servers
                </Title>
                <Text>
                  For almost as long as Forge and Bukkit have co-existed, there
                  have been several projects which aim to allow Forge mods and
                  Bukkit plugins to run alongside each other on the same server.
                  The issue with this, however, is that Bukkit was never
                  designed to support mods, and Forge was never designed to work
                  with the rigid Bukkit API. This means that generally these
                  forks require considerable modifications to the CraftBukkit
                  and Forge server code, and if done wrong this leads to both
                  plugins and mods working in unexpected ways.
                </Text>
              </div>

              <div>
                <Title order={3} size='h4' mb='sm'>
                  Mohist and the Bukkit API
                </Title>
                <Text mb='md'>
                  However, over the past year, instead of trying to implement
                  the Bukkit API properly, the Mohist project has chosen to make
                  several breaking changes to the CraftBukkit code patches it
                  uses. These changes fundamentally break how the Bukkit API is
                  designed to function:
                </Text>

                <List spacing='sm' listStyleType='disc'>
                  <ListItem>
                    <strong className='prose dark:prose-invert'>
                      Injecting block/item types added by Forge into the Bukkit{' '}
                      <code>Material</code> enum twice:
                    </strong>
                    <br />
                    Some mods add blocks/items with the same name as vanilla or
                    other mods. Mohist injects Forge items and blocks into
                    Bukkit&apos;s{' '}
                    <span className='prose dark:prose-invert'>
                      <code>Material</code>
                    </span>{' '}
                    class, but somehow managed to{' '}
                    <a
                      href='https://github.com/MohistMC/Mohist/issues/443'
                      className='link'
                    >
                      register the same material more than once
                    </a>
                    . Enums in Java should only contain one instance per
                    identifier, and this means any plugin trying to interact
                    with items or blocks is prone to breaking with no warning.
                    This also means any plugins that register default
                    permissions for materials will break.
                  </ListItem>
                  <ListItem>
                    <strong className='prose dark:prose-invert'>
                      Re-creating the Bukkit <code>Player</code> object:
                    </strong>
                    <br />
                    Bukkit&apos;s{' '}
                    <span className='prose dark:prose-invert'>
                      <code>Player</code>
                    </span>{' '}
                    interface allows plugins to access online players on the
                    server, and is a core part of the Bukkit API. On a standard
                    CraftBukkit-based server, the{' '}
                    <span className='prose dark:prose-invert'>
                      <code>Player</code>
                    </span>{' '}
                    implementation is kept around while the player is online
                    even if the player entity changes (ie when it dies), and
                    updates itself accordingly based on what happens in the
                    underlying Mojang code.
                    <br />
                    However, Mohist changes this behaviour so that the Bukkit{' '}
                    <span className='prose dark:prose-invert'>
                      <code>Player</code>
                    </span>{' '}
                    is replaced every time the player dies,{' '}
                    <em>
                      even though this class is supposed to wrap around the
                      underlying player entity and update when it changes
                    </em>
                    ! This broke the majority of EssentialsX, as the{' '}
                    <span className='prose dark:prose-invert'>
                      <code>Player</code>
                    </span>{' '}
                    we use becomes detached from the actual server whenever
                    someone dies.
                  </ListItem>
                </List>

                <Text mt='md'>
                  These changes (and likely others too) consequently break
                  several plugins, including but not limited to EssentialsX.
                  Despite being warned that these are breaking changes and will
                  cause issues, the Mohist project has refused to fix their
                  implementation of Bukkit, and instead has employed further
                  workarounds to hide issues with plugins.
                </Text>
              </div>

              <div>
                <Title order={3} size='h4' mb='sm'>
                  Mohist&apos;s dangerous &quot;plugin checker&quot;
                </Title>
                <Text mb='md'>
                  On{' '}
                  <Anchor
                    href='https://github.com/MohistMC/Mohist/commit/58bbb1c8a13dcbf764c11668287e6fb85a884b3a'
                    className='link'
                  >
                    10th April 2021
                  </Anchor>
                  , Mohist added a &quot;plugin checker&quot;, which scans for
                  plugins that Mohist breaks and shows the following message:
                </Text>

                <Image
                  src='/wiki/images/mohist-warning.png'
                  alt='Mohoist'
                  height={45}
                  width={928}
                />

                <br />

                <Text mb='md'>
                  Not only is this message misleading (implying that EssentialsX
                  is at fault when the real issue is on Mohist&apos;s end), but
                  it tricks users into{' '}
                  <strong>
                    deleting the software they downloaded from a trusted source
                  </strong>{' '}
                  and <strong>running arbitrary code</strong> from an unknown
                  source,{' '}
                  <em>
                    without telling the user what is wrong with the plugin they
                    downloaded, how the &quot;correct version&quot; is any
                    better, or where the &quot;correct&quot; version even
                    originates from
                  </em>
                  . Many users who see this prompt will not understand that
                  Mohist is downloading and running arbitrary modified code
                  instead of the official plugin jars they downloaded.
                  Furthermore, this mechanism could very easily be abused to
                  download malware, hidden behind the names of other well-known
                  projects and using the excuse of &quot;fixes&quot;.
                </Text>

                <Text>
                  There are several better ways the Mohist team can rectify
                  their issues, but the correct way is this:{' '}
                  <strong>write a compliant Bukkit API implementation</strong>.
                  Other similar projects already achieve this, <em>without</em>{' '}
                  relying on tricking users into downloading and executing
                  unknown code. Mohist&apos;s decision to mislead users into
                  downloading untrusted code shows that they do not care about
                  the security of their users.
                </Text>
              </div>
            </Stack>
          </div>

          <div>
            <Title order={2} mb='md'>
              Alternatives to Mohist and hybrid servers
            </Title>

            <Stack gap='md'>
              <Text>
                There are countless alternative hybrid servers that attempt to
                run Bukkit plugins on top of Forge, but many suffer from similar
                incompatibilities as Mohist does.
              </Text>

              <Text>
                However, if you&apos;re running a 1.12.2 or 1.19+,{' '}
                <Anchor className='link' href='https://www.spongepowered.org/'>
                  SpongeForge
                </Anchor>{' '}
                is a mature and well-engineered solution which allows running a
                rich ecosystem of{' '}
                <Anchor className='link' href='https://ore.spongepowered.org/'>
                  SpongeAPI plugins
                </Anchor>{' '}
                alongside Forge mods. SpongeAPI is designed to support the
                nuances of modded platforms, and in general Sponge plugins work
                seamlessly with Forge mods - for example,{' '}
                <Anchor className='link' href='https://v2.nucleuspowered.org/'>
                  Nucleus
                </Anchor>{' '}
                includes almost every feature of EssentialsX and more, and is
                100% compatible with mods. Many Bukkit plugins also have
                equivalent Sponge ports, and some (such as{' '}
                <Anchor className='link' href='https://luckperms.net/'>
                  LuckPerms
                </Anchor>
                ) even allow you to use your existing Bukkit data when you
                switch to Sponge.
              </Text>

              <Text>
                Depending on the version of Minecraft you run, a version of
                SpongeForge may not be available. However, there is a wide
                selection of server-side mods for Forge and Fabric that can
                replace plugins, which you can find sites like on{' '}
                <Anchor
                  href='https://www.curseforge.com/minecraft/mc-mods/ftb-essentials-forge'
                  className='link'
                >
                  CurseForge
                </Anchor>{' '}
                and{' '}
                <Anchor href='https://modrinth.com/mods' className='link'>
                  Modrinth
                </Anchor>
                . For example,{' '}
                <Anchor
                  href='https://www.curseforge.com/minecraft/mc-mods/ftb-essentials-forge'
                  className='link'
                >
                  FTB Essentials
                </Anchor>{' '}
                for Forge includes features similar to EssentialsX, while{' '}
                <Anchor
                  href='https://www.curseforge.com/minecraft/mc-mods/ftb-chunks-forge'
                  className='link'
                >
                  FTB Chunks
                </Anchor>{' '}
                allows for land claims and protection.
              </Text>
            </Stack>
          </div>
        </Stack>
      </Container>
    </Flex>
  );
}
