import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='bg-dark-transparent text-sm text-slate-300'>
            <div className='relative container text-center py-4 flex flex-col md:flex-row gap-2 justify-center items-center'>
                <span>This site is not associated with Valve</span>
                <span className='hidden md:inline'>|</span>
                <span>
                    Steam and the Steam logo are property of Valve Corp.
                </span>
                <span className='hidden md:inline'>|</span>

                <Link href='/about/#privacy' className='underline text-sky-300'>
                    Privacy Policy
                </Link>
            </div>
        </footer>
    );
}
