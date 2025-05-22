import { Skeleton } from '@/components/ui/skeleton';
import { TbLoader3 } from 'react-icons/tb';

export default function LoadingRecommendations() {
    return (
        <main className='container py-12'>
            <Skeleton
                className='w-full mb-16 h-44 rounded-sm border border-slate-500 opacity-90
                bg-gradient-to-bl from-slate-800 via-slate-700 to-slate-800'
            />
            <div>
                <div className='text-white flex flex-col justify-center items-center gap-2 mb-4'>
                    <div className='flex items-center gap-2'>
                        <TbLoader3 className='animate-spin text-3xl' />
                        <span className='text-lg'>Processing...</span>
                    </div>
                    <span className='text-slate-300'>
                        This can take a few seconds
                    </span>
                </div>
                <div className='flex justify-between'>
                    <Skeleton
                        className='w-80 h-[32rem] rounded-sm border border-slate-500 opacity-90
                    bg-gradient-to-bl from-slate-800 via-slate-700 to-slate-800'
                    />
                    <Skeleton
                        className='w-80 h-[32rem] rounded-sm border border-slate-500 opacity-90
                    bg-gradient-to-bl from-slate-800 via-slate-700 to-slate-800'
                    />
                </div>
            </div>
        </main>
    );
}
