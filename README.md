## How does it work?

### Fixing tags

#### Broad genres

Are Disco Elysium and Elden Ring similar games? No. But they're both _RPGs_. To get a more precise idea of what someone's favorite genres are, we [split genres into 'broad' and 'specific'](https://github.com/benhurk/Steam-Unbacklog/blob/main/src/arrays/genres.ts), then, [when getting the games tags we only consider broad genres if the game has no specific genre tagged](https://github.com/benhurk/Steam-Unbacklog/blob/main/src/functions/utils/filterGameTags.ts). So Disco Elysium is a _CRPG_ and Elden Ring is a _Souls-like_, while The Elder Scrolls IV is a _RPG_.

#### Inflated tags

A good example of a inflated tag is _Souls-like_. Even tough a game plays very differently from actual _Souls_ games, if it has melee combat or a more unforgiving difficulty it might be tagged that, take Cuphead for example. Luckly, Steam has a tag weight system, so we can [group the inflated tags with their common pairs](https://github.com/benhurk/Steam-Unbacklog/blob/main/src/arrays/groupedTags.ts) and [pick only the one with the highest weight](https://github.com/benhurk/Steam-Unbacklog/blob/main/src/functions/utils/filterGroupedTags.ts), this will result in, Cuphead for example, not being considered _Souls-like_, only a _Shmup_.

### Game weight logic

A simple system that attribute games a score, the score is used to identify which type of games the user [likes](https://github.com/benhurk/Steam-Unbacklog/blob/main/src/functions/helpers/getTagsCount.ts) or [dislikes](https://github.com/benhurk/Steam-Unbacklog/blob/main/src/functions/helpers/getTagsToExclude.ts).

| Playtime | Points |
| :------- | :----- |
| ≤ 10h    | 0      |
| 10~20h   | 1      |
| 20~50h   | 2      |
| ≥ 50h +  | 3      |

| Best achievement global % | Total achievements | Points |
| :------------------------ | :----------------- | :----- |
| ≥ 25%                     | < 50%              | 0      |
| < 25%                     | < 50%              | 1      |
| ≥ 25%                     | ≥ 50%              | 1      |
| < 25%                     | ≥ 50%              | 2      |
| < 25%                     | 100%               | 3      |

## Steam API

### IStoreQueryService/Query/v1

> [!NOTE]  
> **This endpoint is not officially documented, below is only what i tested and know how it works.** You can check and test everything i didn't document [here](https://steamapi.xpaw.me/#IStoreQueryService/Query).

```http
  GET https://api.steampowered.com/IStoreQueryService/Query/v1/?key=&input_json=
```

Returns the Steam store data for up to 1000 apps per request.

| Param        | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `key`        | `string` | A Steam Web API Key. **Required** |
| `input_json` | `string` | URI encoded json. **Required**    |

#### input_json:

```json
{
    "query": {},
    "context": {},
    "data_request": {}
}
```

-   **"query"**:
    | Property | Type | Description |
    | :---------- | :--------- | :------------------------------------------ |
    | `start` | `number` | From which item the response begins, used as pagination. |
    | `count` | `number` | Max of items to return (default: 10, max: 1000). |
    | `sort` | `number` | An id for sorting. Tells the response how to sort the data.|
    | `filter` | `object` | An object with filter configuration.|

    `sort`:

    -   **1** - Alphabetical order.
    -   **2** - Ascending appid.
    -   **20** - Most recent.
    -   **21** - Percentage of positive reviews (desc).

    `filter`:
    | Property | Type | Description |
    | :---------- | :--------- | :------------------------------------------ |
    | `released_only` | `boolean` | Return only released apps.|
    | `coming_soon_only` | `boolean` | Return only coming soon apps. |
    | `type_filters` | `object` | Which app types to return.|
    | `tagids_must_match` | `object[]` | Return only apps that contains the specified tag ids. |
    | `tagids_exclude` | `number[]` | Don't return apps that contains the specified tag ids. |
    | `global_top_n_sellers` | `number` | Return only apps in the top "n" most selled. |

    `type_filter`:

    -   "include_apps" `boolean`
    -   "include_packages" `boolean`
    -   "include_bundles" `boolean`
    -   "include_games" `boolean`
    -   "include_demos" `boolean`
    -   "include_mods" `boolean`
    -   "include_dlc" `boolean`
    -   "include_software" `boolean`
    -   "include_video" `boolean`
    -   "include_hardware" `boolean`
    -   "include_series" `boolean`
    -   "include_music" `boolean`

    `tagids_must_match`:

    To specify the tag ids you must pass in objects with the property `tagids`. Each `tagids` can only include 1 tag, to specify multiple tags you need to pass in multiple objects with `tagids`.

    ```json
    "tagids_must_match": [{"tagids": ["1628"]}, {"tagids": ["1664"]}]
    ```

-   **"context"**:
    | Property | Type | Description |
    | :---------- | :--------- | :------------------------------------------ |
    | `elanguage` | `number` | An ID for the language that the data will be returned in (if avaiable). Defaults to 0 (english). |
    | `country_code` | `string` | e.g. 'US', 'FR', 'DE', 'BR'. Which country to pull data from. **Required**|

> [!NOTE]  
> When testing `country_code` the data looked the same every time, so i'm not sure what it does, but **if you don't include it, no data will be returned**. My guess is that it just won't return data from apps banned or not released in X country.
