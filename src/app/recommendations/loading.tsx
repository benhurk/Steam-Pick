import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingRecommendations() {
    return (
        <main className='container py-12 flex flex-col gap-16'>
            <Skeleton
                className='w-full h-44 rounded-sm border border-slate-500 opacity-90
                bg-gradient-to-bl from-slate-800 via-slate-700 to-slate-800'
            />
            <div className='flex justify-between animate'>
                <Skeleton
                    className='w-80 h-[32rem] rounded-sm border border-slate-500 opacity-90
                    bg-gradient-to-bl from-slate-800 via-slate-700 to-slate-800'
                />
                <Skeleton
                    className='w-80 h-[32rem] rounded-sm border border-slate-500 opacity-90
                    bg-gradient-to-bl from-slate-800 via-slate-700 to-slate-800'
                />
            </div>
        </main>
    );
}
