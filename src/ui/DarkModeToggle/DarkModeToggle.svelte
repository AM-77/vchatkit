<script>
	import { onMount } from 'svelte';
	import { darkMode as darkModeStore, updateDarkMode } from '../../store';
	import Moon from '../icons/Moon.svelte';
	import Sun from '../icons/Sun.svelte';

	const darkMode = darkModeStore();
	const toggleDarkMode = () => {
		localStorage.setItem('darkMode', !$darkMode ? 'true' : 'false');
		updateDarkMode(!$darkMode);
	};

	onMount(() => {
		updateDarkMode(localStorage.getItem('darkMode') === 'true');
	});
</script>

<button
	on:click={toggleDarkMode}
	class="flex justify-center items-center cursor-pointer w-10 h-10 rounded-md hover:bg-emerald-200 dark:hover:bg-emerald-700"
>
	{#if $darkMode}
		<Moon />
	{:else}
		<Sun />
	{/if}
</button>
