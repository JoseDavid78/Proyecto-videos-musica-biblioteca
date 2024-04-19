const idSpotify = "http GET https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy \"";
const id = "4aawyAB9vmqN3uQ7FjRGTy";

// Posible respuesta

const api = {
    "album_type": "compilation",
    "total_tracks": 9,
    "available_markets": ["CA", "BR", "IT"],
    "external_urls": {
      "spotify": "string"
    },
    "href": "string",
    "id": "2up3OPMp9Tb4dAKM2erWXQ",
    "images": [
      {
        "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
        "height": 300,
        "width": 300
      }
    ],
    "name": "string",
    "release_date": "1981-12",
    "release_date_precision": "year",
    "restrictions": {
      "reason": "market"
    },
    "type": "album",
    "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
    "artists": [
      {
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "string",
        "name": "string",
        "type": "artist",
        "uri": "string"
      }
    ],
    "tracks": {
      "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
      "limit": 20,
      "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
      "offset": 0,
      "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
      "total": 4,
      "items": [
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "string"
              },
              "href": "string",
              "id": "string",
              "name": "string",
              "type": "artist",
              "uri": "string"
            }
          ],
          "available_markets": ["string"],
          "disc_number": 0,
          "duration_ms": 0,
          "explicit": false,
          "external_urls": {
            "spotify": "string"
          },
          "href": "string",
          "id": "string",
          "is_playable": false,
          "linked_from": {
            "external_urls": {
              "spotify": "string"
            },
            "href": "string",
            "id": "string",
            "type": "string",
            "uri": "string"
          },
          "restrictions": {
            "reason": "string"
          },
          "name": "string",
          "preview_url": "string",
          "track_number": 0,
          "type": "string",
          "uri": "string",
          "is_local": false
        }
      ]
    },
    "copyrights": [
      {
        "text": "string",
        "type": "string"
      }
    ],
    "external_ids": {
      "isrc": "string",
      "ean": "string",
      "upc": "string"
    },
    "genres": ["Egg punk", "Noise rock"],
    "label": "string",
    "popularity": 0
  }
  
  export{
    api,
    idSpotify,
    ENDPOINT,
    id
  }
  // const Authoritation = "Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'";
// const ENDPOINT = "https://api.spotify.com/v1/albums/{id}";