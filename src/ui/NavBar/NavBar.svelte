<script>
	import DarkModeToggle from '../DarkModeToggle/DarkModeToggle.svelte';
	import Github from '../icons/Github.svelte';
	import Logo from '../icons/Logo.svelte';
</script>

<div
	class="flex h-14 w-full bg-white dark:bg-neutral-900 shadow-sm justify-between items-center px-20"
>
	<a href="/" class="flex h-full items-center">
		<Logo />
	</a>
	<div class="flex gap-3">
		<a
			href="https://github.com"
			class="flex justify-center items-center no-underline cursor-pointer w-10 h-10 rounded-md hover:bg-emerald-200 dark:hover:bg-emerald-700"
		>
			<Github />
		</a>
		<DarkModeToggle />
	</div>
</div>
