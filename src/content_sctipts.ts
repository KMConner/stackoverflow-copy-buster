import axios from "axios"
import * as xpath from 'xpath'
import { DOMParser } from "xmldom"
import * as parse5 from "parse5"
import * as xmlser from "xmlserializer"
import { browser } from "webextension-polyfill-ts"


async function main(e: chrome.webNavigation.WebNavigationParentedCallbackDetails) {
    const currentUrl = e.url
    const htmlData = (await axios.get(currentUrl)).data
    const htmlDoc: parse5.Document = parse5.parse(htmlData)
    const xhtml = xmlser.serializeToString(htmlDoc)
    const doc = new DOMParser().parseFromString(xhtml)
    var select = xpath.useNamespaces({ "xhtml": "http://www.w3.org/1999/xhtml" });
    const attr: any = select("/xhtml:html/xhtml:body/xhtml:main/xhtml:div/xhtml:div[2]/xhtml:div/xhtml:div[2]/xhtml:div[2]/xhtml:div[2]/xhtml:p[1]/xhtml:small[1]/xhtml:a/@href", doc)[0];
    console.log(attr.nodeValue)
    await browser.tabs.update(e.tabId, { url: attr.nodeValue })
}

chrome.webNavigation.onBeforeNavigate.addListener(main, { url: [{ urlMatches: "https://stackoverrun.com/ja/q/*" }] });
