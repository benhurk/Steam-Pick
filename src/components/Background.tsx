export default function Background() {
    return (
        <div className='absolute inset-0 -z-10 pointer-events-none bg-slate-900 overflow-y-hidden'>
            <div
                className='absolute w-[150%] h-[200%] -inset-1/2 bg-[url(/bg.png)] bg-repeat blur-xs
                            -rotate-z-12 rotate-x-45 '
            />
            <div className='absolute inset-0 bg-gradient-to-bl from-black via-gray-800  to-black opacity-85' />
        </div>
    );
}
