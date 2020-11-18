import { browser } from 'webextension-polyfill-ts'
import * as siteList from './siteList'


function createSiteNameElement(siteName: string): HTMLDivElement {
    const elem = document.createElement('div')
    elem.innerText = siteName
    elem.className = 'site_dom'
    return elem
}

async function saveConfig(key: string, value: boolean): Promise<void> {
    const data: { [s: string]: any } = {}
    data[key] = value
    await browser.storage.sync.set(data)
}

async function createSiteSwitchElement(siteName: string): Promise<HTMLDivElement> {
    const input = document.createElement('input')
    input.type = 'checkbox'

    input.addEventListener('change', async e => await saveConfig(siteName, (<HTMLInputElement>e.target).checked))
    const val = await browser.storage.sync.get()
    input.checked = val[siteName] !== false

    const span = document.createElement('span')
    span.className = 'slider round'

    const label = document.createElement('label')
    label.className = 'switch'
    label.appendChild(input)
    label.appendChild(span)

    const elem = document.createElement('div')
    elem.className = 'site_toggle'
    elem.appendChild(label)

    return elem
}

async function main() {
    const table = <HTMLDivElement>document.getElementById("site_table")
    for (const site of siteList.copySites) {
        table.appendChild(createSiteNameElement(site.name))
        table.appendChild(await createSiteSwitchElement(site.name))
    }
}

window.addEventListener('load', main)
