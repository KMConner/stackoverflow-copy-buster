import { browser } from 'webextension-polyfill-ts'

export async function saveConfig(key: string, value: boolean): Promise<void> {
    const data: { [s: string]: any } = {}
    data[key] = value
    await browser.storage.sync.set(data)
}

export async function getEnabled(key: string): Promise<boolean> {
    const val = await browser.storage.sync.get(key)
    return val[key] !== false
}
