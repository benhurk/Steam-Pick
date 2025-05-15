import Image from 'next/image';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';

export default function Header() {
    return (
        <header className='bg-dark-transparent py-4 text-white'>
            <div className='relative container flex justify-between items-center'>
                <div>
                    <Link href={'/'} className='block'>
                        <h1 className='flex gap-4 items-center text-5xl font-bold'>
                            <Image
                                width={48}
                                height={48}
                                src='./steamlogo.svg'
                                alt='Steam'
                            />
                            Pick
                        </h1>
                    </Link>
                </div>
                <nav className='font-semibold text-lg'>
                    <ul className='flex items-center gap-16'>
                        <li>
                            <Link href={'/'}>About</Link>
                        </li>
                        <li>
                            <Link
                                href={'https://github.com/benhurk/Steam-Pick'}
                                target='_blank'
                                className='text-white text-4xl'>
                                <BsGithub />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
