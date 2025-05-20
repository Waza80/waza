export interface KV {
  location: string;
}

export interface SpotifyTimestamps {
  start: number;
  end: number;
}

export interface Spotify extends Activity {
  track_id: string;
  timestamps: SpotifyTimestamps;
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface DiscordUser {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  avatar: string;
}

export interface ActivityTimestamps {
  start: number;
  end?: number;
}

export interface ActivityAssets {
  large_text?: string;
  large_image?: string;
  small_text?: string;
  small_image?: string;
}

export interface ActivityParty {
  id: string;
}

export type Activity = {
  type: number;
  timestamps: ActivityTimestamps;
  sync_id?: string;
  state: string;
  session_id?: string;
  party?: ActivityParty;
  name: string;
  id: string;
  flags?: number;
  details?: string;
  created_at: number;
  assets: ActivityAssets;
  application_id?: string;
}

export type DiscordData = {
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
  listening_to_spotify: boolean;
  kv: KV;
  spotify: Spotify | null;
  discord_user: DiscordUser;
  discord_status: string;
  activities: Activity[];
} & object