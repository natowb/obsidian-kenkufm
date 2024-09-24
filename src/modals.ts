import { App, Notice, SuggestModal, requestUrl } from "obsidian";
import { KenkuController } from "./utils/kenku";



interface Track{
    title: string;
    id: string;
}

export enum KenkuModalType {
    Sound,
    Track
}


// export class PlayTrackModal extends SuggestModal<Track> {

//     tracks: Track[] = [];
//     type: KenkuModalType;

//     constructor(app: App, type: KenkuModalType = KenkuModalType.Track) {
//         super(app);
//         this.type = type;
//     }


//     // Returns all available suggestions.
//     getSuggestions(query: string): Track[] {
//         return KenkuController.tracks.filter((track) =>
//             track.title.toLowerCase().includes(query.toLowerCase())
//         );
//     }

//     // Renders each suggestion item.
//     renderSuggestion(track: Track, el: HTMLElement) {
//         el.createEl("div", { text: track.title });
//         el.createEl("small", { text: track.id });
//     }

//     // Perform action on the selected suggestion.
//     onChooseSuggestion(track: Track, evt: MouseEvent | KeyboardEvent) {
//         new Notice(`Now Playing ${track.title}`);
//         KenkuController.playTrack(track.id);
//     }
// }

// export class PlaySoundModal extends SuggestModal<Track> {

//     // Returns all available suggestions.
//     getSuggestions(query: string): Track[] {
//         return KenkuController.sounds.filter((track) =>
//             track.title.toLowerCase().includes(query.toLowerCase())
//         );
//     }

//     // Renders each suggestion item.
//     renderSuggestion(track: Track, el: HTMLElement) {
//         el.createEl("div", { text: track.title });
//         el.createEl("small", { text: track.id });
//     }

//     // Perform action on the selected suggestion.
//     onChooseSuggestion(track: Track, evt: MouseEvent | KeyboardEvent) {
//         new Notice(`Now Playing ${track.title}`);
//         KenkuController.playSound(track.id);
//     }
// }