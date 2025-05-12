'use client';

import { ClipLoader } from 'react-spinners';

export default function LoaderSpinner() {
    return (
        <div className='block mb-4'>
            <ClipLoader color='#fff' size={64} />
        </div>
    );
}
