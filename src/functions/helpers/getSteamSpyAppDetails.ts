import SteamSpyDataRes from '@/types/SteamSpyDataRes';
import pLimit from 'p-limit';

const limit = pLimit(1);

export default async function getSteamSpyAppDetails(appIdsArray: number[]) {
    const requests = appIdsArray.map((id) =>
        limit(async () => {
            return await fetch(
                `https://steamspy.com/api.php?request=appdetails&appid=${id}`,
                { next: { revalidate: 86400 } }
            )
                .then((res) => res.json())
                .then((data: SteamSpyDataRes) => data);
        })
    );

    return (await Promise.all(requests)).flat();
}
