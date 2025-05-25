import getTagNames from '@/functions/utils/getTagNames';
import { TUserGames, TUserInfo } from '@/types/TApi';
import { TTaste } from '@/types/TTaste';
import Image from 'next/image';
import { redirect } from 'next/navigation';

type Props = {
    steamID: string;
    userTaste: TTaste;
    userGames: TUserGames;
};

export default async function UserInfoSection({
    steamID,
    userTaste,
    userGames,
}: Props) {
    let userInfo: TUserInfo;
    try {
        const res = await fetch(
            `${process.env.URL}/api/steam/userinfo?steamid=${steamID}`
        );

        userInfo = await res.json();
    } catch {
        return <></>;
    }

    if (!userInfo) {
        redirect('/');
    }

    const tagsArrayToString = (tagsArray: [number, number][]) => {
        return getTagNames(tagsArray.map(([tag]) => tag)).join(', ');
    };

    return (
        <section
            className='flex flex-col md:flex-row rounded-sm overflow-hidden
            bg-gradient-to-bl from-slate-950 via-slate-800 to-slate-950 shadow-2xl 
            border border-slate-300'>
            <div className='flex gap-4'>
                <Image
                    src={userInfo.avatar}
                    width={176}
                    height={176}
                    alt={userInfo.personaname + 'avatar'}
                />
                <div className='md:hidden py-3'>
                    <h4
                        className='mb-4 text-3xl font-bold text-transparent 
                        bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                        {userInfo.personaname}
                    </h4>
                    <ul className='pr-4 text-center flex flex-col text-slate-100'>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Games:
                            </span>
                            <span>{userGames.owned.length}</span>
                        </li>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Played:
                            </span>
                            <span>{userGames.played.length}</span>
                        </li>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Unplayed:
                            </span>
                            <span>{userGames.unplayed.length}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='p-3 grow'>
                <h4
                    className='hidden md:block mb-4 text-3xl font-bold text-transparent 
                    bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                    {userInfo.personaname}
                </h4>
                <div className='flex flex-col md:flex-row gap-2 md:gap-0 text-sm md:text-base justify-between'>
                    <ul className='*:shadow-xl text-slate-100'>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Genres:
                            </span>
                            <span>
                                {tagsArrayToString(userTaste.favoriteGenres)}
                            </span>
                        </li>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Gameplay:
                            </span>
                            <span>
                                {tagsArrayToString(userTaste.favoriteGameplay)}
                            </span>
                        </li>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Themes:
                            </span>
                            <span>
                                {tagsArrayToString(userTaste.favoriteThemes)}
                            </span>
                        </li>
                    </ul>
                    <ul className='hidden md:flex pr-4 text-center gap-1 md:flex-col md:gap-0 text-slate-100'>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Games:
                            </span>
                            <span>{userGames.owned.length}</span>
                        </li>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Played:
                            </span>
                            <span>{userGames.played.length}</span>
                        </li>
                        <li>
                            <span className='mr-2 text-white font-semibold'>
                                Unplayed:
                            </span>
                            <span>{userGames.unplayed.length}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
