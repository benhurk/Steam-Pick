import getTagNames from '@/functions/utils/getTagNames';
import { TUserGames, TUserInfo } from '@/types/TApi';
import { TTaste } from '@/types/TTaste';
import Image from 'next/image';

type Props = {
    userInfo: TUserInfo;
    userTaste: TTaste;
    userGames: TUserGames;
};

export default function UserInfoSection({
    userInfo,
    userTaste,
    userGames,
}: Props) {
    const tagsArrayToString = (tagsArray: [number, number][]) => {
        return getTagNames(tagsArray.map(([tag]) => tag)).join(', ');
    };

    return (
        <section
            className='flex justify-between items-center rounded-sm overflow-hidden
            bg-gradient-to-bl from-slate-950 via-slate-800 to-slate-950 shadow-lg 
            border border-slate-400 shadow-sky-900'>
            <Image
                src={userInfo.avatar}
                width={176}
                height={0}
                alt={userInfo.personaname + 'avatar'}
            />
            <div className='p-3 ms-2 w-full'>
                <h4
                    className='mb-4 text-3xl font-bold text-transparent 
                    bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                    {userInfo.personaname}
                </h4>
                <div className='flex justify-between'>
                    <ul className='*:shadow-xl text-slate-300'>
                        <li>
                            <span className='text-white font-semibold mr-1'>
                                Genres:
                            </span>{' '}
                            {tagsArrayToString(userTaste.favoriteGenres)}
                        </li>
                        <li>
                            <span className='text-white font-semibold mr-1'>
                                Gameplay:
                            </span>{' '}
                            {tagsArrayToString(userTaste.favoriteGameplay)}
                        </li>
                        <li>
                            <span className='text-white font-semibold mr-1'>
                                Themes:
                            </span>{' '}
                            {tagsArrayToString(userTaste.favoriteThemes)}
                        </li>
                        <li>
                            <span className='text-white font-semibold mr-1'>
                                Moods:
                            </span>{' '}
                            {tagsArrayToString(userTaste.favoriteMoods)}
                        </li>
                    </ul>
                    <ul className='pr-4 text-center flex flex-col'>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Games:
                            </span>
                            <span className='text-slate-300'>
                                {userGames.owned.length}
                            </span>
                        </li>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Played:
                            </span>
                            <span className='text-slate-300'>
                                {userGames.played.length}
                            </span>
                        </li>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Unplayed:
                            </span>
                            <span className='text-slate-300'>
                                {userGames.unplayed.length}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
