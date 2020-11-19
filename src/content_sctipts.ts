import axios from "axios"
import * as xpath from 'xpath'
import { DOMParser } from "xmldom"
import * as parse5 from "parse5"
import * as xmlser from "xmlserializer"
import { browser, WebNavigation } from "webextension-polyfill-ts"
import * as siteList from "./siteList"
import * as config from './config'

const callbacks: Array<{ name: string, callback: (e: WebNavigation.OnBeforeNavigateDetailsType) => Promise<void>, pattern: string }> = []

async function mainImpl(e: WebNavigation.OnBeforeNavigateDetailsType, originalUrlXpath: string) {
    const currentUrl = e.url
    const htmlData = (await axios.get(currentUrl)).data
    const htmlDoc: parse5.Document = parse5.parse(htmlData)
    const xhtml = xmlser.serializeToString(htmlDoc)
    const doc = new DOMParser().parseFromString(xhtml)
    var select = xpath.useNamespaces({ "xhtml": "http://www.w3.org/1999/xhtml" });
    const attr: any = select(originalUrlXpath, doc)[0];
    console.log(attr.nodeValue)
    await browser.tabs.update(e.tabId, { url: attr.nodeValue })
}

async function updateListener(): Promise<void> {
    for (const site of callbacks) {
        if (await config.getEnabled(site.name) && !browser.webNavigation.onBeforeNavigate.hasListener(site.callback)) {
            browser.webNavigation.onBeforeNavigate.addListener(site.callback, { url: [{ urlMatches: site.pattern }] });
            console.log('Enabling ' + site.name)
        }
        else if (!await config.getEnabled(site.name) && browser.webNavigation.onBeforeNavigate.hasListener(site.callback)) {
            browser.webNavigation.onBeforeNavigate.removeListener(site.callback);
            console.log('Disabling ' + site.name)
        }
    }
}

for (const site of siteList.copySites) {
    callbacks.push({
        name: site.name,
        callback: async e => await mainImpl(e, site.originUrlXpath),
        pattern: site.urlPattern
    })
}

updateListener();
browser.storage.onChanged.addListener(async _ => await updateListener())
