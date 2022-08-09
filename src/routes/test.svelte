<script>
	import clsx from 'clsx';
	import CamOn from '../ui/icons/CamOn.svelte';
	import MicOn from '../ui/icons/MicOn.svelte';
	import Maximize from '../ui/icons/Maximize.svelte';
	import User from '../ui/icons/User.svelte';
	import CloseCall from '../ui/icons/CloseCall.svelte';
	let small = true;
</script>

<div class="flex w-full h-full">
	<div class="flex flex-1 w-full p-2">
		<div class="flex items-center justify-center relative rounded-md w-full bg-neutral-300">
			<User size={36} />
			<div class="flex justify-center absolute bottom-10 w-full rounded-md">
				<div class="flex gap-2 ">
					<div
						class="flex items-center justify-center w-10 h-10 p-2 rounded-md cursor-pointer bg-gray-200"
					>
						<CamOn />
					</div>
					<div
						class="flex items-center justify-center w-10 h-10 p-2 rounded-md cursor-pointer bg-gray-200"
					>
						<MicOn />
					</div>

					<div
						class="flex items-center justify-center w-10 h-10 p-2 rounded-md cursor-pointer bg-red-500 text-white ml-40"
					>
						<CloseCall />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col h-full w-64 p-2 gap-2 overflow-auto">
		<div class="flex flex-col rounded-md w-full bg-gray-300 overflow-hidden">
			<div class="flex flex-col w-60 h-40 relative">
				<div class="flex items-center justify-center w-full h-full bg-neutral-300">
					<User size={18} />
				</div>
				<div class="flex gap-2 absolute bottom-2 left-2 w-56 h-7 rounded-md ">
					<div
						class="flex items-center justify-center w-7 h-7 p-2 rounded-md cursor-pointer bg-gray-200"
					>
						<CamOn />
					</div>
					<div
						class="flex items-center justify-center w-7 h-7 p-2 rounded-md cursor-pointer bg-gray-200"
					>
						<MicOn />
					</div>

					<div
						class="flex items-center justify-center w-7 h-7 p-2 rounded-md cursor-pointer bg-gray-200 ml-auto"
					>
						<Maximize />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
