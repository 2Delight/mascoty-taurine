import { invoke } from "@tauri-apps/api";

export async function get_mascot() {
    return await invoke("get_mascot", {});
}

export async function get_cams() {
    return await invoke("get_cameras")
}