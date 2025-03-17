import getUserGames from '@/helpers/getUserGames';
import { redirect } from 'next/navigation';

type Props = {
    searchParams: {
        steamId: string;
    };
};

export default async function Recommendations({ searchParams }: Props) {
    const { steamId } = await searchParams;

    if (!steamId) {
        redirect('/');
    }

    const { playedGames, recentlyPlayed } = await getUserGames(steamId);

    return <div>Teste</div>;
}
