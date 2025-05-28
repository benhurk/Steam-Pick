# Steam Pick

Steam Pick is a tool that analyzes a Steam profile and generates personalized recommendations for it.

The goal of this project is to create a game recommendation system that improves on some issues with Steam's system:

-   Steam only recommends games in the shop, meaning that all those games you bought on sales and never touched will remain forgotten.
-   It says _"Similar to games you've played"_ but:
    -   [It's not similar at all.](https://i.imgur.com/al4cCgE.png)
    -   [It uses games that you've not actually played.](https://i.imgur.com/uNhLNDk.png)

## How it works

The user submits their SteamID, then the application:

1. Analyzes their library, attributing a score for each game based on playtime and achievements, making a ranking.
2. Uses this ranking to get the user's favorite genres, gameplay styles and themes.
3. Get games with good reviews that better fit the user's taste.

### Tag system

The Steam tag system is great, but for our purpose it needs some work. The issue is, some tags are not reliable for that matter, like _Action_ for example, it's an extremely generic and not really necessary tag, since other, more specific tags, can suggest if a game has action in it while being more descriptive.

First we create a new tag set that doesn't include super broad tags, nor too specific ones, and we categorize them into genres, gameplay and themes, so we can weight them differently when processing recommendations.

[SteamDB](https://steamdb.info/tags/) lists all tags on Steam and how many games have them, to get the Steam tag id and name we can use the [GetTagList](https://steamapi.xpaw.me/#IStoreService/GetTagList) Steam API endpoint.

-   [Tag arrays](https://github.com/benhurk/Steam-Pick/blob/main/src/consts/gameTags.ts)

#### Broad genres

However, we can't just rule out all broad tags, some of them are very important genres that we have to include, here is a case:

Are Disco Elysium and Elden Ring similar games? No. But they're both _RPGs_.

To properly handle cases like this we split the genre tags into 'broad' and 'specific', then when getting a game's tags, we only consider broad genres if the game has no specific genre tagged. So in this case, Disco Elysium will count only as a _CRPG_ and Elden Ring as a _Souls-like_, while a game like Bannerlord just as a _RPG_.

#### Misused tags

Some tags are misused as synonyms of other tags, like _Sandbox_ with _Open World_. Others are basically inflated tags.

A good example of an inflated tag is _Souls-like_. We've all seen people calling a game "The Dark Souls of something" even tough it has no similarity at all with _Souls_ games.

We can fix these problems using Steam's tag weight system, by grouping misused tags with their common pairs, we call them **grouped tags**, then when processing a game's tags, we pick only the one with the highest weight.

-   [Filter tags](https://github.com/benhurk/Steam-Pick/blob/main/src/functions/utils/filterGameTags.ts)
-   [Grouped tags](https://github.com/benhurk/Steam-Pick/blob/main/src/consts/groupedTags.ts)
-   [Filter misused tags](https://github.com/benhurk/Steam-Pick/blob/main/src/functions/utils/filterGroupedTags.ts)

### Game weight logic

In order to know what type of games the user likes we first need to know... what games the user likes.

We do this by attributing games a score based on the user's playtime and achievements, this score is used to identify the user's favorite genres, gameplay and themes.

| Playtime | Points |
| :------- | :----- |
| ≤ 10h    | 0      |
| 10~20h   | 1      |
| 20~50h   | 2      |
| ≥ 50h +  | 3      |

> Including higher playtime scores can cause unsatisfying cases where a single multiplayer or infinitely playable game changes the final result.

<br>

| Best achievement global % | Total achievements | Points |
| :------------------------ | :----------------- | :----- |
| ≥ 25%                     | < 50%              | 0      |
| < 25%                     | < 50%              | 1      |
| ≥ 25%                     | ≥ 50%              | 1      |
| < 25%                     | ≥ 50%              | 2      |
| < 25%                     | 100%               | 3      |

## APIs

-   [SteamSpy API](https://steamspy.com/api.php)
-   Steam Web API:
    -   [ISteamUser/GetPlayerSummaries](https://partner.steamgames.com/doc/webapi/ISteamUser#GetPlayerSummaries)
    -   [IPlayerService/GetOwnedGames](https://partner.steamgames.com/doc/webapi/IPlayerService#GetOwnedGames)
    -   [IPlayerService/GetTopAchievementsForGames](https://steamapi.xpaw.me/#IPlayerService/GetTopAchievementsForGames)
    -   [IStoreQueryService/Query](https://github.com/benhurk/IStoreQueryService-Query-v1-Documentation/tree/main)
    -   [store.steampowered.com/api/appdetails](https://github.com/Revadike/InternalSteamWebAPI/wiki/Get-App-Details)
