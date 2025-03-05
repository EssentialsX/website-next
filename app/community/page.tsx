import { Button } from "@mantine/core";

export default function Community() {
    return (
        <div className="flex flex-col">
            <section className="bg-primary py-12 px-12" style={{backgroundColor: "#D11920"}}>
                <div className="max-w-6xl mx-auto text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Join the EssentialsX community</h1>
                    <p className="text-lg">
                        Need support with EssentialsX, or just want to chat about servers and plugins?
                        We&apos;ve got you covered.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Join the MOSS community on Discord</h2>
                            <p className="mb-4">
                                MOSS is one of the leading Discord communities for open source Minecraft projects.
                            </p>
                            <p className="mb-4">
                                You can get support for several plugins including EssentialsX, plus chat to fellow
                                server owners and plugin developers from across the globe! We&apos;re always happy to
                                welcome new members.
                                <a href="https://discord.gg/h8CnPSw" className="link ml-1">Click here to join</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Discuss EssentialsX on GitHub</h2>
                            <p className="mb-4">
                                Want to report a bug, request a feature or contribute to EssentialsX? You can join in
                                the discussion on
                                <a href="https://github.com/EssentialsX/Essentials" className="link ml-1">GitHub</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Visit us on Patreon</h2>
                            <p className="mb-4">
                                Feeling generous or just want to say hi? You can see news updates, chat to other patrons
                                and leave comments for us over on our
                                <a href="https://patreon.com/EssentialsX" className="link ml-1">Patreon page</a>. You
                                can also
                                pledge to EssentialsX to help support the project.
                            </p>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
                            <h3 className="font-bold mb-2">EssentialsX is part of MOSS on Discord</h3>
                            <div className="flex justify-between mb-2">
                                <div>
                                    <p className="text-3xl font-bold">5564</p>
                                    <p className="text-sm">ONLINE</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">4000+</p>
                                    <p className="text-sm">MEMBERS</p>
                                </div>
                            </div>
                            <Button>
                                Join on Discord...
                            </Button>
                        </div>

                        <div className="bg-red-400 text-white p-6 rounded-lg text-center">
                            <h3 className="font-bold mb-2">Support EssentialsX on Patreon</h3>
                            <div className="flex justify-between mb-2">
                                <div>
                                    <p className="text-3xl font-bold">310</p>
                                    <p className="text-sm">PATRONS</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">$44</p>
                                    <p className="text-sm">PER MONTH</p>
                                </div>
                            </div>
                            <Button>
                                Support on Patreon...
                            </Button>
                        </div>

                        <div className="bg-gray-700 text-white p-6 rounded-lg text-center">
                            <h3 className="font-bold mb-2">EssentialsX is open source</h3>
                            <div className="flex justify-between mb-2">
                                <div>
                                    <p className="text-3xl font-bold">2017</p>
                                    <p className="text-sm">STARS</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">1000</p>
                                    <p className="text-sm">FORKS</p>
                                </div>
                            </div>
                            <Button>
                                Visit on GitHub...
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

