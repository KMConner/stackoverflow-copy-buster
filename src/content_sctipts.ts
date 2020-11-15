import axios from "axios"
import { parse } from 'node-html-parser'

async function main(e: chrome.webNavigation.WebNavigationParentedCallbackDetails) {
    const currentUrl = e.url;
    const htmlData = (await axios.get(currentUrl)).data;
    const domRoot = parse(htmlData);
    console.log(domRoot);
    console.log(currentUrl)
    console.log("hogehogehoge");
}

chrome.webNavigation.onBeforeNavigate.addListener(main, { url: [{ urlMatches: "https://stackoverrun.com/*" }] });
