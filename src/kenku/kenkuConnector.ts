import * as kenkuApi from "../api/kenkuApi";
import {
	currentState,
	isKenkuConnected,
	playlists,
	soundboards,
	sounds,
	tracks,
} from "../stores/kenkuStore";
import { Notice } from "obsidian";

let intervalId: NodeJS.Timeout | undefined;
let failureCounter = 0;
const MAX_FAILURE_COUNT = 3;

const logInfo = (message: string, ...args: unknown[]) =>
	console.info(
		`[KenkuFM Integration] ${message}`,
		args.length > 0 ? args : undefined,
	);
const logError = (message: string, ...args: unknown[]) =>
	console.error(
		`[KenkuFM Integration] ${message}`,
		args.length > 0 ? args : undefined,
	);

export const connect = async () => {
	logInfo("attempting to connect...");
	isKenkuConnected.set(false);

	{
		const { data, error } = await kenkuApi.fetchPlaybackState();
		if (!data) {
			logError("failed to connect. Is KenkuFM running?", error);
			new Notice("[KenkuFM Integration] failed to connect...");

			return;
		}
		currentState.set(data);
	}

	{
		const { data, error } = await kenkuApi.fetchPlaylists();
		if (!data) {
			logError("failed to fetch playlists from KenkuFM", error);
			new Notice("[KenkuFM Integration] failed to connect...");

			return;
		}
		playlists.set(data.playlists);
		tracks.set(data.tracks);
	}

	{
		const { data, error } = await kenkuApi.fetchSoundboards();
		if (!data) {
			logError("failed to fetch soundboards from KenkuFM", error);
			new Notice("[KenkuFM Integration] failed to connect...");

			return;
		}
		soundboards.set(data.soundboards);
		sounds.set(data.sounds);
	}

	const pollingStarted = await startPolling();

	if (pollingStarted) {
		new Notice("[KenkuFM Integration] connected!");
		logInfo("connected!");
		isKenkuConnected.set(true);
	} else {
		new Notice("[KenkuFM Integration] failed to connect...");
		logError("failed to connect. Is KenkuFM running?");
	}
};

async function poll() {
	if (failureCounter >= MAX_FAILURE_COUNT) {
		stopPolling();
		new Notice("[KenkuFM Integration] Lost connection...");
		return false;
	}

	const { data, error } = await kenkuApi.fetchPlaybackState();
	if (!data) {
		failureCounter++;
		logError(`failed to poll kenku fm... (attempt ${failureCounter}`, error);
		return false;
	}

	currentState.set(data);
	failureCounter = 0;
	isKenkuConnected.set(true);
	return true;
}

export const startPolling = async (interval = 1000) => {
	if (intervalId !== undefined) return;
	failureCounter = 0;
	const success = await poll();
	intervalId = setInterval(poll, interval);
	return success;
};

export const stopPolling = () => {
	isKenkuConnected.set(false);
	if (intervalId !== undefined) {
		clearInterval(intervalId);
		intervalId = undefined;
	}
};
