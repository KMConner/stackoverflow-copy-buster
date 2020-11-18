import { CopySite } from './copySite'
export const copySites: Array<CopySite> = [
    {
        urlPattern: "https://stackoverrun.com/ja/q/*",
        originUrlXpath: "/xhtml:html/xhtml:body/xhtml:main/xhtml:div/xhtml:div[2]/xhtml:div/xhtml:div[2]/xhtml:div[2]/xhtml:div[2]/xhtml:p[1]/xhtml:small[1]/xhtml:a/@href"
    },
    {
        urlPattern: "https://qastack.jp/*/*",
        originUrlXpath: "/xhtml:html/xhtml:body/xhtml:section[1]/xhtml:div/xhtml:div[1]/xhtml:article[1]/xhtml:div[2]/xhtml:div[2]/xhtml:div[2]/xhtml:small/xhtml:a[2]/@href"
    },
    {
        urlPattern: "https://qa.codeflow.site/questions/*",
        originUrlXpath: "/xhtml:html/xhtml:body/xhtml:div/xhtml:div[3]/xhtml:div[2]/xhtml:div[1]/xhtml:div[2]/xhtml:div[3]/xhtml:div[1]/xhtml:p/xhtml:a/@href"
    }
]