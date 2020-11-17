import axios from "axios"
import * as xpath from 'xpath'
import { DOMParser } from "xmldom"
import * as parse5 from "parse5"
import * as xmlser from "xmlserializer"
import { browser } from "webextension-polyfill-ts"
import * as siteList from "./siteList"

async function mainImpl(e: chrome.webNavigation.WebNavigationParentedCallbackDetails, originalUrlXpath: string) {
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

console.log(siteList.copySites)

for (const site of siteList.copySites) {
    chrome.webNavigation.onBeforeNavigate.addListener(e => mainImpl(e, site.originUrlXpath), { url: [{ urlMatches: site.urlPattern }] });
}
