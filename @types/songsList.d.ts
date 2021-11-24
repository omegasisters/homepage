import { songListProps } from '../preact/main/playlists/songsList'

declare module '*/songsList.json' {
  const value: songListProps;
  export default value;
}
