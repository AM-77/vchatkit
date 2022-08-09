<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import CamOn from '../icons/CamOn.svelte';
	import CamOff from '../icons/CamOff.svelte';
	import MicOn from '../icons/MicOn.svelte';
	import MicOff from '../icons/MicOff.svelte';
	import CloseCall from '../icons/CloseCall.svelte';

	// props
	export let callObject;
	export let participant;

	let isCamOn = false;
	let isMicOn = false;

	let videoTrackSet = false;
	let videoSrc;
	$: videoTrack = participant?.tracks?.video;
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
	let audioSrc;
	$: audioTrack = participant?.tracks?.audio;
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

	onMount(() => {
		if (!callObject) return;
		isCamOn = callObject.localVideo();
		isMicOn = callObject.localAudio();
	});

	const setLocalVideo = (isEnabled) => {
		callObject.setLocalVideo(isEnabled);
		isCamOn = isEnabled;
	};

	const setLocalAudio = (isEnabled) => {
		callObject.setLocalAudio(isEnabled);
		isMicOn = isEnabled;
	};

	const leave = async () => {
		await callObject.leave();
		goto('/');
	};
</script>

<div class="flex flex-1 w-full p-2">
	<div
		class="flex items-center justify-center relative rounded-md w-full bg-neutral-100 overflow-hidden"
	>
		{#if isCamOn}
			<video class="w-full" autoplay use:srcObject={videoSrc} width="600px" height="250px">
				<track kind="captions" />
			</video>
		{:else}
			<div class="flex items-center justify-center w-24 h-24 rounded-full bg-neutral-200">
				<p class="text-5xl font-normal capitalize text-neutral-900">
					{participant.user_name.slice(0, 1)}
				</p>
			</div>
		{/if}

		<div class="flex justify-center absolute bottom-10 w-full rounded-md">
			<div class="flex gap-2 ">
				<div
					class="flex items-center justify-center w-10 h-10 p-2 rounded-md cursor-pointer bg-neutral-200"
					on:click={() => setLocalVideo(!isCamOn)}
				>
					{#if isCamOn}
						<CamOn />
					{:else}
						<CamOff />
					{/if}
				</div>
				<div
					class="flex items-center justify-center w-10 h-10 p-2 rounded-md cursor-pointer bg-neutral-200"
					on:click={() => setLocalAudio(!isMicOn)}
				>
					{#if isMicOn}
						<MicOn />
					{:else}
						<MicOff />
					{/if}
				</div>

				<div
					class="flex items-center justify-center w-10 h-10 p-2 rounded-md cursor-pointer bg-red-500 text-white ml-40"
					on:click={leave}
				>
					<CloseCall />
				</div>
			</div>
		</div>
	</div>
</div>
