export default function PrivacyPolicySection() {
    return (
        <section id='privacy'>
            <h2
                className='mb-6 text-4xl text-center font-semibold text-transparent 
                    bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                Privacy Policy
            </h2>
            <div className='flex flex-col gap-8'>
                <div>
                    <div className='flex flex-col gap-3 text-slate-100'>
                        <p className='font-semibold'>
                            The following Steam data is retrieved when requested
                            by the user when a SteamID is submited through this
                            application:
                        </p>
                        <ul className='list-disc pl-4'>
                            <li>Public persona name and avatar picture.</li>
                            <li>
                                {
                                    "User's game library, playtimes and achievements."
                                }
                            </li>
                            <li>
                                Game store data. (names, tags, images, and
                                descriptions)
                            </li>
                        </ul>
                        <p className='font-semibold'>
                            This data is used solely to:
                        </p>
                        <ul className='list-disc pl-4'>
                            <li>Generate personalized game recommendations.</li>
                            <li>
                                {
                                    "Display some gaming statistics. (User's favorite tags and number of games)"
                                }
                            </li>
                        </ul>
                        <p className='font-semibold'>All data is:</p>
                        <ul className='list-disc pl-4'>
                            <li>{'(And must be) publicly avaiable.'}</li>
                            <li>
                                Not written to any persistent storage
                                (databases, files, etc.). Only temporarily
                                cached in memory.
                            </li>
                            <li>
                                Processed in real-time during an active session.
                            </li>
                            <li>{'Provided "AS IS".'}</li>
                        </ul>
                        <p className='font-semibold'>
                            Server-side processing happens on{' '}
                            <a
                                href='https://vercel.com/docs/edge-network/regions'
                                target='_blank'
                                className='underline text-sky-400'>
                                {"Vercel's global edge network"}
                            </a>
                            .
                        </p>
                        <p className='font-semibold'>
                            We do not share, sell, or transfer any data to third
                            parties.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
