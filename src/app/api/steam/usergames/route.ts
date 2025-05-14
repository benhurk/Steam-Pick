export const revalidate = 86400;

import { NextResponse } from 'next/server';

import { GetTopAchievementsForGamesRes, OwnedGamesRes } from '@/types/TSteam';
import { SteamGame } from '@/types/TGames';
import { ownedGamesMock } from '@/consts/mock';

import isRecentlyPlayed from '@/functions/utils/isRecentlyPlayed';

const BASE_URL = 'https://api.steampowered.com/IPlayerService';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const steamId = searchParams.get('steamid');

    if (!steamId) {
        return NextResponse.json(
            { error: 'No SteamID provided.' },
            { status: 400 }
        );
    }

    try {
        //Get owned games
        const owned: SteamGame[] =
            ownedGamesMock.length > 0
                ? ownedGamesMock
                : await fetch(
                      `${BASE_URL}/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamId}&include_appinfo=true&include_played_free_games&format=json`
                  )
                      .then((res) => res.json())
                      .then((data: OwnedGamesRes) =>
                          data.response.games.map((game) => ({
                              appid: game.appid,
                              name: game.name.toLowerCase(),
                              playtime: game.playtime_forever,
                              recentlyPlayed: isRecentlyPlayed(
                                  game.rtime_last_played
                              ),
                          }))
                      );

        //Filter played games
        let played = owned.filter((game) => game.playtime >= 120);

        //Filter unplayed games
        const unplayed = owned.filter(
            (g) => g.playtime < 120 && !g.recentlyPlayed
        );

        //Get played games achievements
        const appids = encodeURI(
            played
                .map((g) => g.appid)
                .map((id, index) => `appids[${index}]=${id}`)
                .join('&')
        );

        const achievements: GetTopAchievementsForGamesRes = await fetch(
            `${BASE_URL}/GetTopAchievementsForGames/v1/?key=${process.env.STEAM_KEY}&steamid=${steamId}&max_achievements=5000&${appids}`
        ).then((res) => res.json());

        //Update played games to include the achievements
        played = achievements.response.games.map((g) => {
            const game = played.filter((p) => p.appid === g.appid)[0];

            return {
                appid: game.appid,
                name: game.name,
                playtime: game.playtime,
                recentlyPlayed: game.recentlyPlayed,
                total_achievements: g.total_achievements,
                unlocked_achievements: g.achievements?.map((a) => ({
                    name: a.name,
                    player_percent_unlocked: a.player_percent_unlocked,
                })),
            };
        });

        return NextResponse.json({
            owned,
            played,
            unplayed,
        });
    } catch (error) {
        console.error('Error getting user games:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Steam data' },
            { status: 500 }
        );
    }
}
