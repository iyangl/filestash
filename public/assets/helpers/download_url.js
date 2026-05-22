import { get as getConfig } from "../model/config.js";

export function overrideDownloadUrl(path) {
    const template = getConfig("download_url_override", "");
    if (!template) return "";

    const encodedPath = path
        .replace(/^\/+/, "")
        .split("/")
        .map(encodeURIComponent)
        .join("/");

    if (template.includes("{{path}}")) {
        return template.split("{{path}}").join(encodedPath);
    }
    return template.replace(/\/+$/, "") + "/" + encodedPath;
}

export function overrideDownloadUrlFromLink(link) {
    const url = new URL(link, window.location.origin + "/");
    if (!url.pathname.endsWith("/api/files/cat")) return "";

    const paths = url.searchParams.getAll("path");
    if (paths.length !== 1) return "";
    return overrideDownloadUrl(paths[0]);
}
