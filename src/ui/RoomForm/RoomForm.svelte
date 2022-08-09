<script lang="ts">
	import clsx from 'clsx';
	import { store } from '../../store';
	import { goto } from '$app/navigation';
	import Spinner from '../Spinner/Spinner.svelte';

	const theStore = store();
	let loading = false;

	const submitForm = async () => {
		loading = true;
		let room;
		if ($theStore.url) {
			const splitedUrl = $theStore.url.split('/');
			room = splitedUrl[splitedUrl.length - 1];
		} else {
			const submit = await fetch('/rooms.json', { method: 'POST' });
			const data = await submit.json();
			room = data.room.name;
		}

		loading = false;
		goto(`/rooms/${room}`);
	};
</script>

<div class="flex flex-col flex-1 items-center p-5">
	<p class="text-3xl font-medium text-emerald-500 mb-7">Create or Join a Chat Room</p>
	<form class="flex flex-col w-1/4 gap-2" on:submit|preventDefault={submitForm}>
		<div>
			<label class="text-sm capitalize font-medium text-neutral-800" for="name">Your name*</label>
			<input
				id="name"
				required
				class="w-full h-10 border-2 rounded-md px-3 p-1 outline-none text-sm hover:border-emerald-200 focus:border-emerald-200"
				type="text"
				bind:value={$theStore.name}
				placeholder="Your name please"
			/>
		</div>
		<div>
			<label class="text-sm capitalize font-medium text-neutral-800" for="url">Room URL</label>
			<input
				name="url"
				class="w-full h-10 border-2 rounded-md px-3 p-1 outline-none text-sm hover:border-emerald-200 focus:border-emerald-200"
				type="url"
				bind:value={$theStore.url}
				placeholder="To create a new room, leave this field empty."
			/>
		</div>
		<button
			type="submit"
			class={clsx([
				'flex items-center justify-center gap-2 h-10 mt-5 rounded-md text-sm font-medium outline-none capitalize',
				'text-neutral-800 bg-gray-200 dark:bg-zinc-900 hover:bg-emerald-200 dark:hover:bg-emerald-60',
				loading ? 'bg-emerald-200 dark:bg-emerald-60 text-emerald-900' : ''
			])}
			disabled={loading}
		>
			{#if loading}
				<Spinner classes="w-5 h-5 fill-zinc-900" /> loading...
			{:else}
				submit
			{/if}
		</button>
	</form>
</div>
