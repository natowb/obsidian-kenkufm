import { type App, SuggestModal } from "obsidian";
import { soundboards, sounds, tracks } from "./stores/kenkuStore";
import { get } from "svelte/store";
import type { KenkuItem, KenkuSoundboard } from "./types";

export class InsertTrackModal extends SuggestModal<KenkuItem> {
	// Returns all available suggestions.
	getSuggestions(query: string): KenkuItem[] {
		return get(tracks).filter((track) =>
			track.title.toLowerCase().includes(query.toLowerCase()),
		);
	}

	// Renders each suggestion item.
	renderSuggestion(track: KenkuItem, el: HTMLElement) {
		el.createEl("div", { text: track.title });
		el.createEl("small", { text: track.id });
	}

	// Perform action on the selected suggestion.
	onChooseSuggestion(track: KenkuItem, evt: MouseEvent | KeyboardEvent) {
		const editor = this.app.workspace.activeEditor?.editor;
		if (editor) {
			const codeBlock = `\`\`\`kenkufm-track\n   id: ${track.id}\n\`\`\``;
			editor.replaceRange(codeBlock, editor.getCursor());
		}
	}
}

export class InsertSoundboardModal extends SuggestModal<KenkuSoundboard> {
	// Returns all available suggestions.
	getSuggestions(query: string): KenkuSoundboard[] {
		return get(soundboards).filter((track) =>
			track.title.toLowerCase().includes(query.toLowerCase()),
		);
	}

	// Renders each suggestion item.
	renderSuggestion(track: KenkuSoundboard, el: HTMLElement) {
		el.createEl("div", { text: track.title });
		el.createEl("small", { text: track.id });
	}

	// Perform action on the selected suggestion.
	onChooseSuggestion(item: KenkuSoundboard, evt: MouseEvent | KeyboardEvent) {
		const editor = this.app.workspace.activeEditor?.editor;
		if (editor) {
			const boards = get(soundboards);

			const index = boards.findIndex((s) => s.id === item.id);
			if (index === -1) {
				return;
			}

			const board = boards[index];
			const allSounds = get(sounds);
			const soundEntries = board.sounds
				.map((soundId) => {
					const sound = allSounds.find((s) => s.id === soundId);
					if (!sound) return null;
					return `  - title: "${sound.title}"\n    id: "${sound.id}"`;
				})
				.filter(Boolean)
				.join("\n");

			const codeBlock = `\`\`\`kenkufm-sound\ntitle: "${board.title}"\nsounds:\n${soundEntries}\n\`\`\``;
			editor.replaceRange(codeBlock, editor.getCursor());
		}
	}
}
