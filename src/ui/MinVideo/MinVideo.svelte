<script>
	import { onMount } from 'svelte';

	import CamOn from '../icons/CamOn.svelte';
	import CamOff from '../icons/CamOff.svelte';
	import MicOn from '../icons/MicOn.svelte';
	import MicOff from '../icons/MicOff.svelte';
	import Maximize from '../icons/Maximize.svelte';
	import User from '../icons/User.svelte';

	export let callObject;
	export let participant;
	export let onMaximize;

	let isCamOn = false;
	let isMicOn = false;

	let videoTrackSet = false;
	let videoTrack;
	let videoSrc;
	$: {
		videoTrack = participant?.tracks?.video;
		isCamOn = participant?.video;
	}
	$: screenTrack = participant?.screen?.tracks?.screenVideo;
	$: {
		if (!participant?.screen && videoTrack?.state === 'playable' && !videoTrackSet) {
			videoSrc = new MediaStream([videoTrack.persistentTrack]);
			videoTrackSet = true;
		} else if (participant?.screen && screenTrack.state === 'playable' && !videoTrackSet) {
			videoSrc = new MediaStream([screenTrack.track]);
			videoTrackSet = true;
		}
	}
	$: {
	}

	let audioTrackSet = false;
	let audioTrack;
	let audioSrc;
	$: {
		audioTrack = participant?.tracks?.audio;
		isMicOn = participant?.audio;
	}
	$: {
		// Wait until the track is playable and then only set it once to avoid rerendering it
		if (audioTrack.state === 'playable' && !audioTrackSet) {
			// Use persistentTrack to avoid issues in Safari
			audioSrc = new MediaStream([audioTrack.persistentTrack]);
			audioTrackSet = true;
		}
	}

	function srcObject(node, stream) {
		node.srcObject = stream;
		return {
			update(newStream) {
				if (node.srcObject != newStream) {
					node.srcObject = newStream;
				}
			}
		};
	}
</script>

<div class="flex flex-col rounded-md w-full bg-gray-300 overflow-hidden">
	<div class="flex flex-col w-60 h-40 relative">
		<div class="flex items-center justify-center w-full h-full bg-neutral-300">
			{#if isCamOn}
				<video autoplay use:srcObject={videoSrc} width="600px" height="250px">
					<track kind="captions" />
				</video>
			{:else}
				<User size={18} />
				<p>{callObject.properties.userName}</p>
			{/if}
		</div>
		<div class="flex gap-2 absolute bottom-2 left-2 w-56 h-7 rounded-md ">
			<div
				class="flex items-center justify-center w-7 h-7 p-2 rounded-md cursor-pointer bg-gray-100"
			>
				{#if isCamOn}
					<CamOn />
				{:else}
					<CamOff />
				{/if}
			</div>
			<div
				class="flex items-center justify-center w-7 h-7 p-2 rounded-md cursor-pointer bg-gray-100"
			>
				{#if isMicOn}
					<MicOn />
				{:else}
					<MicOff />
				{/if}
			</div>

			<div
				class="flex items-center justify-center w-7 h-7 p-2 rounded-md cursor-pointer bg-gray-100 ml-auto"
				on:click={onMaximize}
			>
				<Maximize />
			</div>
		</div>
	</div>
</div>
{#if audioSrc}
	<audio id={`audio-${participant?.session_id}`} autoPlay playsInline use:srcObject={audioSrc}>
		<track kind="captions" />
	</audio>
{/if}
