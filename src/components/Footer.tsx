import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='bg-dark-transparent text-sm text-slate-300'>
            <div className='relative container py-4 flex gap-2 justify-center items-center'>
                <span>This site is not associated with Valve</span>
                <span>|</span>
                <span>
                    Steam and the Steam logo are property of Valve Corp.
                </span>
                <span>|</span>

                <Link href='/about/#privacy' className='underline text-sky-300'>
                    Privacy Policy
                </Link>
            </div>
        </footer>
    );
}
