import { invoke } from "@tauri-apps/api";
import aboba from "./Config";

export async function get_mascot() {
    return await invoke("get_mascot", {});
}

export async function get_volume() {
    return await invoke("get_volume", {});
}


export async function get_cams() {
    return await invoke("get_cameras")
}

export async function set_cams(val: number) {
    return await invoke("set_cameras", {index: val, config: aboba, })
}

export async function get_mics() {
    return await invoke("get_microphones")
}

export async function set_mics(val: number) {
    return await invoke("select_microphone", {index: val})
}