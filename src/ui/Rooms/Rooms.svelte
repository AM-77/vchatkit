<div class="flex w-full h-full">
	<div class="flex flex-1 w-full">
		<slot name="main-screen" />
	</div>
	<div class="flex flex-col h-full w-64 p-2 gap-2 overflow-auto">
		<slot name="connected-users" />
	</div>
</div>
