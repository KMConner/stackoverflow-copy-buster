import * as siteList from './siteList'

function createSiteNameElement(siteName: string): HTMLDivElement {
    const elem = document.createElement('div')
    elem.innerText = siteName
    elem.className = 'site_dom'
    return elem
}

function createSiteSwitchElement(siteName: string): HTMLDivElement {
    const input = document.createElement('input')
    input.type = 'checkbox'

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

function main() {
    const table = <HTMLDivElement>document.getElementById("site_table")
    for (const site of siteList.copySites) {
        table.appendChild(createSiteNameElement(site.name))
        table.appendChild(createSiteSwitchElement(site.name))
    }
}

window.addEventListener('load', main)
