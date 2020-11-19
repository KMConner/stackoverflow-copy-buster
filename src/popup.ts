import * as siteList from './siteList'
import * as config from './config'


function createSiteNameElement(siteName: string): HTMLDivElement {
    const elem = document.createElement('div')
    elem.innerText = siteName
    elem.className = 'site_dom'
    return elem
}

async function createSiteSwitchElement(siteName: string): Promise<HTMLDivElement> {
    const input = document.createElement('input')
    input.type = 'checkbox'

    input.addEventListener('change', async e => await config.saveConfig(siteName, (<HTMLInputElement>e.target).checked))
    input.checked = await config.getEnabled(siteName)

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
