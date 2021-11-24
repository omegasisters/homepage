/*
gen_songs_list.ts updates songsList.ts based on data given by YoutubeAPI.

How to run:
$ yarn buildScripts
$ yarn genSongsList
*/

import axios from 'axios'
import { songListItem, songListProps } from '../preact/main/playlists/songsList'
import fs from "fs"

/************************************
 * const values / properties
 * **********************************/
const API_ENDPOINT = "https://youtube.googleapis.com/youtube/v3/playlistItems"
const PART = "id,contentDetails,snippet,status"
// This is omesis's official playlist for their "Utattemita"
// SEE: https://www.youtube.com/playlist?list=PLjUYRJfqz5WsaAcHvdt6Qv5gaERy75fej
const PLAYLIST_ID = "PLjUYRJfqz5WsaAcHvdt6Qv5gaERy75fej"
// const YOUTUBE_API_KEY='put_yours'
const YOUTUBE_API_KEY='AIzaSyBxfFCz722xtpQ7fKCUwu1z5-N86f-q8iY'

const SYNCHRONICITY_VIDEO_ID = "jis7E_mbwPw"
const JSON_FILE_PATH = `${__dirname}/../preact/main/playlists/songsList.json`


/************************************
 * types
 * **********************************/
type YoutubeVideoItem = {
  title: string;
  videoID: string;
  position: number;
}


/************************************
 * functions
 * **********************************/

/**
 * getSongList fetches song list from YoutubeAPI
 *
*/
async function getSongList(): Promise<songListProps> {
  let songList: YoutubeVideoItem[] = []

  let pageToken = ""
  while(true) {
    console.log("fetching a page of playlist...")
    let response = await axios.get(`${API_ENDPOINT}?part=${PART}&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}&pageToken=${pageToken}`, {
      headers: {
        "Accept": "application/json"
      }
    })

    if(response.status !== 200) {
      throw "failed to retrieve response"
    } else {
      console.log(`retrieved a page successfully. totalResults: ${response.data.pageInfo.totalResults}, num of items in this page: ${response.data.items.length}`)
    }

    songList = [...songList, ...response.data.items.map((item: any) => {
      return {
        title: item.snippet.title,
        videoID: item.contentDetails.videoId,
        // The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth.
        // SEE: https://developers.google.com/youtube/v3/docs/playlistItems#resource
        position: item.snippet.position
      }
    })]

    if(response.data.nextPageToken === undefined) {
      break
    } else {
      pageToken = response.data.nextPageToken
    }
  }

  return songList
    .sort(sortOmesisSongs)
    .map((item: YoutubeVideoItem): songListItem => ({ title: item.title, videoID: item.videoID }))
}

/**
 * sortOmesisSongs sorts list of songs fetched from a playlist
 * sort order is:
 *   - basically, newer items come in the bottom and older ones come in top
 *   - Only exception is "Synchronicity". It always comes in first position
 *
*/
function sortOmesisSongs(a: YoutubeVideoItem, b: YoutubeVideoItem): number {
    // synchronicity should be always located on top of the result.
    if (a.videoID === SYNCHRONICITY_VIDEO_ID) {
      return -1
    } else if (b.videoID === SYNCHRONICITY_VIDEO_ID) {
      return 1
    } else {
      return b.position - a.position
    }
}

function writeToJsonFile(path: string, songList: songListProps) {
  fs.writeFile(path, JSON.stringify(songList, null, 2), {flag: 'w'}, (err) => {
    if (err) throw err
    console.log(`finished writing song list into ${path}`)
  })
}



/************************************
 * main
 * **********************************/

(async () => {
  let list = await getSongList()
  writeToJsonFile(JSON_FILE_PATH, list)
})()