import LoaderSpinner from '@/components/LoaderSpinner';

export default function LoadingRecommendations() {
    return (
        <div className='relative grow flex flex-col gap-2 justify-center items-center text-white text-center'>
            <LoaderSpinner />
            <h3 className='text-2xl font-semibold'>Processing...</h3>
            <p className='text-lg'>This can take a few seconds.</p>
        </div>
    );
}
