dev:
	npx tauri dev

prod:
	LIBTORCH_STATIC=1
	export LIBTORCH_STATIC
	npx tauri build
