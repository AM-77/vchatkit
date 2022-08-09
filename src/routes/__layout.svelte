<script>
	import '../app.css';
	import NavBar from '../ui/NavBar/NavBar.svelte';

	import { darkMode as darkModeStore } from '../store';
	import clsx from 'clsx';

	const darkMode = darkModeStore();
</script>

<div class={clsx('flex flex-col w-full h-screen bg-gray-50', $darkMode ? 'dark' : '')}>
	<NavBar />
	<div class="flex flex-grow overflow-hidden">
		<slot />
	</div>
</div>
