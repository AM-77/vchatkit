<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import daily from '@daily-co/daily-js';

	import Video from '../../ui/Video/Video.svelte';
	import MinVideo from '../../ui/MinVideo/MinVideo.svelte';
	import Rooms from '../../ui/Rooms/Rooms.svelte';
	import Spinner from '../../ui/Spinner/Spinner.svelte';

	import { envs } from '../../utils/envs';
	import { store } from '../../store';

	let callObject;
	let participants = [];
	let currentUser;
	let connectedUsers = [];
	let joining = true;

	const theStore = store();

	$: console.log(participants);

	onMount(() => {
		if (!$theStore.name) goto('/');
	});

	const createAndJoinCall = async () => {
		const { id } = $page.params;
		if (!id || !$theStore.name) {
			return;
		}

		const url = `${envs.BASE_URL}/${id}`;

		callObject = daily.createCallObject({ url, userName: $theStore.name });
		callObject
			.on('joining-meeting', (e) => {
				joining = true;
				updateParticpants(e);
			})
			.on('joined-meeting', (e) => {
				joining = false;
				updateParticpants(e);
			})
			.on('participant-joined', updateParticpants)
			.on('participant-left', updateParticpants)
			.on('participant-updated', updateParticpants)
			.on('error', () => alert('Error !!!'))
			// camera-error = device error
			// like device in use or permissions issues
			.on('camera-error', () => alert('Error !!!'));
		// .on('app-message', handleAppMessage);

		try {
			await callObject.join();
		} catch (e) {
			// THERE WAS AN ERROR, PLEASE TRY AGAIN
		}
	};

	const updateParticpants = (e) => {
		if (!callObject) return;
		participants = Object.values(callObject.participants());
		currentUser = participants.find((p) => p.local);
		connectedUsers = participants.filter((p) => !p.local);
	};

	onMount(() => {
		if (!browser) return;
		createAndJoinCall();
	});

	const onMaximize = (participant) => {
		currentUser = participant;
		connectedUsers = [...participants, participant].filter(
			(p) => participant.user_id !== p.user_id
		);
	};
</script>

{#if joining}
	<div class="flex flex-col gap-4 w-full h-full justify-center items-center">
		<Spinner size={48} classes="w-12 h-12 text-emerald-500" />
		<p class="text-xl text-emerald-500">Joining...</p>
	</div>
{:else}
	<Rooms>
		<svelte:fragment slot="main-screen">
			{#if currentUser}
				<Video participant={currentUser} {callObject} />
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="connected-users">
			{#each connectedUsers as participant}
				{#if participant}
					<MinVideo {participant} {callObject} onMaximize={() => onMaximize(participant)} />
				{/if}
			{/each}
		</svelte:fragment>
	</Rooms>
{/if}
