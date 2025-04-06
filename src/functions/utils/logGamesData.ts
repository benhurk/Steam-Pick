import SteamSpyDataRes from '@/types/steamSpyDataRes';

export default function logGamesData(
    completedGamesData: SteamSpyDataRes,
    droppedGamesData: SteamSpyDataRes
) {
    const allGames = completedGamesData.concat(droppedGamesData);

    const log = allGames
        .filter((game) =>
            Object.keys(game.tags).some((tag) => tag === 'Precision Platformer')
        )
        .map((game) => {
            return { name: game.name, tags: Object.keys(game.tags) };
        });

    console.log(log);
}
