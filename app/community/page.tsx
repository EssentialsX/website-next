'use client';

import PageHeader from '@/components/page-header';
import { useSharedData } from '@/contexts/shared-data';
import { Button } from '@mantine/core';
import CountUp from 'react-countup';

export default function Community() {
  const { discord, patreon, github } = useSharedData();

  return (
    <div className='flex flex-col'>
      <PageHeader
        title='Join the EssentialsX community'
        description="Need support with EssentialsX, or just want to chat about servers and plugins? We've got you covered."
      />

      <div className='mx-auto max-w-6xl px-4 py-8'>
        <div className='grid gap-8 md:grid-cols-3'>
          <div className='space-y-12 md:col-span-2'>
            <section>
              <h2 className='mb-4 text-2xl font-bold'>
                Join the MOSS community on Discord
              </h2>
              <p className='mb-4'>
                MOSS is one of the leading Discord communities for open source
                Minecraft projects.
              </p>
              <p className='mb-4'>
                You can get support for several plugins including EssentialsX,
                plus chat to fellow server owners and plugin developers from
                across the globe! We&apos;re always happy to welcome new
                members.
                <a href='https://discord.gg/h8CnPSw' className='link ml-1'>
                  Click here to join
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-2xl font-bold'>
                Discuss EssentialsX on GitHub
              </h2>
              <p className='mb-4'>
                Want to report a bug, request a feature or contribute to
                EssentialsX? You can join in the discussion on
                <a
                  href='https://github.com/EssentialsX/Essentials'
                  className='link ml-1'
                >
                  GitHub
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-2xl font-bold'>Visit us on Patreon</h2>
              <p className='mb-4'>
                Feeling generous or just want to say hi? You can see news
                updates, chat to other patrons and leave comments for us over on
                our
                <a href='https://patreon.com/EssentialsX' className='link ml-1'>
                  Patreon page
                </a>
                . You can also pledge to EssentialsX to help support the
                project.
              </p>
            </section>
          </div>

          <div className='space-y-8'>
            <div className='rounded-lg bg-blue-600 p-6 text-center text-white'>
              <h3 className='mb-2 font-bold'>
                EssentialsX is part of MOSS on Discord
              </h3>
              <div className='mb-2 flex justify-between'>
                <div>
                  <p className='w-24 text-3xl font-bold'>
                    <CountUp start={0} end={discord.members} />
                  </p>
                  <p className='text-sm'>ONLINE</p>
                </div>
                <div>
                  <p className='text-3xl font-bold'>18,000+</p>
                  <p className='text-sm'>MEMBERS</p>
                </div>
              </div>
              <Button component='a' href='https://discord.gg/h8CnPSw'>
                Join on Discord...
              </Button>
            </div>

            <div className='rounded-lg bg-red-400 p-6 text-center text-white'>
              <h3 className='mb-2 font-bold'>Support EssentialsX on Patreon</h3>
              <div className='mb-2 flex justify-between'>
                <div>
                  <p className='w-24 text-3xl font-bold'>
                    <CountUp start={0} end={patreon.patrons} />
                  </p>
                  <p className='text-sm'>PATRONS</p>
                </div>
                <div>
                  <p className='w-34 text-3xl font-bold'>
                    <CountUp
                      start={0}
                      end={Math.round(patreon.sum / 100)}
                      prefix='$'
                    />
                  </p>
                  <p className='text-sm'>PER MONTH</p>
                </div>
              </div>
              <Button component='a' href='https://patreon.com/EssentialsX'>
                Support on Patreon...
              </Button>
            </div>

            <div className='rounded-lg bg-gray-700 p-6 text-center text-white'>
              <h3 className='mb-2 font-bold'>EssentialsX is open source</h3>
              <div className='mb-2 flex justify-between'>
                <div>
                  <p className='w-24 text-3xl font-bold'>
                    <CountUp start={0} end={github.stars} />
                  </p>
                  <p className='text-sm'>STARS</p>
                </div>
                <div>
                  <p className='w-24 text-3xl font-bold'>
                    <CountUp start={0} end={github.forks} />
                  </p>
                  <p className='text-sm'>FORKS</p>
                </div>
              </div>
              <Button
                component='a'
                href='https://github.com/EssentialsX/Essentials'
              >
                Visit on GitHub...
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
