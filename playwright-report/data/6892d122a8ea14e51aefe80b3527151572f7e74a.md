# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - heading "Server Error in '/' Application." [level=1] [ref=e3]:
      - text: Server Error in '/' Application.
      - separator [ref=e4]
    - heading "A potentially dangerous Request.Form value was detected from the client (password=\"...rt('test')</script>\")." [level=2] [ref=e5]
  - generic [ref=e6]:
    - text: "Description: ASP.NET has detected data in the request that is potentially dangerous because it might include HTML markup or script. The data might represent an attempt to compromise the security of your application, such as a cross-site scripting attack. If this type of input is appropriate in your application, you can include code in a web page to explicitly allow it. For more information, see http://go.microsoft.com/fwlink/?LinkID=212874."
    - text: "Exception Details: System.Web.HttpRequestValidationException: A potentially dangerous Request.Form value was detected from the client (password=\"...rt('test')</script>\")."
    - text: "Source Error:"
    - table [ref=e7]:
      - rowgroup [ref=e8]:
        - 'row "Line 20: if (IsPost) { Line 21: username = Request.Form[\"username\"]; Line 22: password = Request.Form[\"password\"]; Line 23: Line 24: // Validate the user''s username" [ref=e9]':
          - 'cell "Line 20: if (IsPost) { Line 21: username = Request.Form[\"username\"]; Line 22: password = Request.Form[\"password\"]; Line 23: Line 24: // Validate the user''s username" [ref=e10]':
            - code [ref=e11]:
              - generic [ref=e12]: "Line 20: if (IsPost) { Line 21: username = Request.Form[\"username\"]; Line 22: password = Request.Form[\"password\"]; Line 23: Line 24: // Validate the user's username"
    - text: "Source File: d:\\dzhosts\\localuser\\vantruongt2\\www.railwayb2.somee.com\\Account\\Login.cshtml Line: 22"
    - text: "Stack Trace:"
    - table [ref=e13]:
      - rowgroup [ref=e14]:
        - row [ref=e15]:
          - cell [ref=e16]:
            - code [ref=e17]:
              - generic [ref=e18]: "[HttpRequestValidationException (0x80004005): A potentially dangerous Request.Form value was detected from the client (password=\"...rt('test')</script>\").] System.Web.HttpRequest.ValidateString(String value, String collectionKey, RequestValidationSource requestCollection) +9915173 System.Web.<>c__DisplayClass280_0.<ValidateHttpValueCollection>b__0(String key, String value) +23 System.Web.HttpValueCollection.EnsureKeyValidated(String key) +9913143 System.Web.HttpValueCollection.Get(String name) +18 System.Collections.Specialized.NameValueCollection.get_Item(String name) +12 ASP._Page_Account_Login_cshtml.Execute() in d:\\dzhosts\\localuser\\vantruongt2\\www.railwayb2.somee.com\\Account\\Login.cshtml:22 System.Web.WebPages.WebPageBase.ExecutePageHierarchy() +199 System.Web.WebPages.WebPage.ExecutePageHierarchy(IEnumerable`1 executors) +73 System.Web.WebPages.WebPage.ExecutePageHierarchy() +154 System.Web.WebPages.StartPage.RunPage() +19 System.Web.WebPages.StartPage.ExecutePageHierarchy() +64 System.Web.WebPages.WebPageBase.ExecutePageHierarchy(WebPageContext pageContext, TextWriter writer, WebPageRenderingBase startPage) +80 System.Web.WebPages.WebPageHttpHandler.ProcessRequestInternal(HttpContext context) +259"
    - separator [ref=e19]
    - text: "Version Information: Microsoft .NET Framework Version:4.0.30319; ASP.NET Version:4.8.4797.0"
  - link "Web hosting by Somee.com" [ref=e21] [cursor=pointer]:
    - /url: http://somee.com
  - generic [ref=e25]:
    - link "Hosted Windows Virtual Server. 2.5GHz CPU, 2GB RAM, 60GB SSD. Try it now for $1!" [ref=e27] [cursor=pointer]:
      - /url: http://somee.com/VirtualServer.aspx
    - link "Web hosting by Somee.com" [ref=e29] [cursor=pointer]:
      - /url: http://somee.com
```