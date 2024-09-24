import { Notice, requestUrl, type RequestUrlParam, type RequestUrlResponse } from "obsidian";


export interface KenkuItem {
    title: string;
    id: string;
}

export interface KenkuFMState {
    playing: boolean;
    track: KenkuItem;
    playlist: KenkuItem;
}


export class KenkuController {

    static tracks: KenkuItem[] = []
    static sounds: KenkuItem[] = []
    static playlists: KenkuItem[] = []
    static soundboards: KenkuItem[] = []


    static async init() {

        console.log('Loading Kenku FM Tracks...');

        try {
            const { tracks, playlists } = await requestUrl(`http://127.0.0.1:3333/v1/playlist`).json;
            this.tracks = tracks;
            this.playlists = playlists;
            console.log(`[Kenku Controls] ${this.tracks.length} Tracks Loaded`);
    
    
            const { sounds, soundboards } = await requestUrl(`http://127.0.0.1:3333/v1/soundboard`).json;
            this.sounds = sounds;
            this.soundboards = soundboards;
            console.log(`[Kenku Controls] ${this.sounds.length} Sounds Loaded`);
        } catch (e) {
            console.log(e);
            new Notice('Failed to load Kenku FM data\nis Kenku Remote running?');
        }
    }

    static async queuePlaylist(id: string) {
        
    }


    static async getState(): Promise<KenkuFMState> {
        try {
            const response = await requestUrl("http://127.0.0.1:3333/v1/playlist/playback").json;
            return response as KenkuFMState;
        

        } catch (e) {
            new Notice('Failed to load Kenku FM data\nis Kenku Remote running?');
            throw e;
        }
    }

    static async resume() {
        try {
            const response = await requestUrl("http://127.0.0.1:3333/v1/playlist/play").json;
        

        } catch (e) {
            new Notice('Failed to load Kenku FM data\nis Kenku Remote running?');
            throw e;
        }
    }

    static async pause() {
        try {
            const response = await requestUrl("http://127.0.0.1:3333/v1/playlist/pause").json;
        

        } catch (e) {
            new Notice('Failed to load Kenku FM data\nis Kenku Remote running?');
            throw e;
        }
    }

    static async playTrack(id: string) {

        const { playing, track } = await this.getState();

        if (playing && id === track.id ) {
            console.warn('doing nothing as we are already playing this track');
            return;
        }

        let params: RequestUrlParam = {
            url: "http://127.0.0.1:3333/v1/playlist/play",
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id
            })

        };
        await requestUrl(params);
    }
    static async playSound(id: string) {

        let params: RequestUrlParam = {
            url: "http://127.0.0.1:3333/v1/soundboard/play",
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id
            })

        };
        await requestUrl(params);
    }

}


