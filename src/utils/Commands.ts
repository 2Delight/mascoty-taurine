import { invoke } from "@tauri-apps/api";
import aboba from "./Config";

export async function get_mascot() {
    return await invoke("get_mascot", {});
}

export async function get_cams() {
    return await invoke("get_cameras")
}

export async function set_cams(val: number) {
    return await invoke("get_cameras", {val, aboba, })
}