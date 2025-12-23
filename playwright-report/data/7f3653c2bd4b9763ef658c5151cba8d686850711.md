# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - heading "Server Error in '/' Application." [level=1] [ref=e3]:
      - text: Server Error in '/' Application.
      - separator [ref=e4]
    - heading "Invalid column name \"ID\"." [level=2] [ref=e5]
  - generic [ref=e6]:
    - text: "Description: An unhandled exception occurred during the execution of the current web request. Please review the stack trace for more information about the error and where it originated in the code."
    - text: "Exception Details: System.InvalidOperationException: Invalid column name \"ID\"."
    - text: "Source Error:"
    - table [ref=e7]:
      - rowgroup [ref=e8]:
        - 'row "Line 7: Response.Redirect(strUnsupportURL); Line 8: } Line 9: _Fn.TrackUserTime(); Line 10: }" [ref=e9]':
          - 'cell "Line 7: Response.Redirect(strUnsupportURL); Line 8: } Line 9: _Fn.TrackUserTime(); Line 10: }" [ref=e10]':
            - code [ref=e11]:
              - generic [ref=e12]: "Line 7: Response.Redirect(strUnsupportURL); Line 8: } Line 9: _Fn.TrackUserTime(); Line 10: }"
    - text: "Source File: d:\\dzhosts\\localuser\\vantruongt2\\www.railwayb2.somee.com\\Page\\_PageStart.cshtml Line: 9"
    - text: "Stack Trace:"
    - table [ref=e13]:
      - rowgroup [ref=e14]:
        - 'row "[InvalidOperationException: Invalid column name \"ID\".] WebMatrix.Data.DynamicRecord.VerifyColumn(String name) +14701 WebMatrix.Data.DynamicRecord.get_Item(String name) +18 WebMatrix.Data.DynamicRecord.TryGetMember(GetMemberBinder binder, Object& result) +13 CallSite.Target(Closure , CallSite , Object ) +140 System.Dynamic.UpdateDelegates.UpdateAndExecute1(CallSite site, T0 arg0) +679 ASP._Fn.TrackUserTime() +1295 ASP._Page_Page__PageStart_cshtml.Execute() in d:\\dzhosts\\localuser\\vantruongt2\\www.railwayb2.somee.com\\Page\\_PageStart.cshtml:9 System.Web.WebPages.StartPage.ExecutePageHierarchy() +46 System.Web.WebPages.WebPageBase.ExecutePageHierarchy(WebPageContext pageContext, TextWriter writer, WebPageRenderingBase startPage) +80 System.Web.WebPages.WebPageHttpHandler.ProcessRequestInternal(HttpContext context) +259" [ref=e15]':
          - 'cell "[InvalidOperationException: Invalid column name \"ID\".] WebMatrix.Data.DynamicRecord.VerifyColumn(String name) +14701 WebMatrix.Data.DynamicRecord.get_Item(String name) +18 WebMatrix.Data.DynamicRecord.TryGetMember(GetMemberBinder binder, Object& result) +13 CallSite.Target(Closure , CallSite , Object ) +140 System.Dynamic.UpdateDelegates.UpdateAndExecute1(CallSite site, T0 arg0) +679 ASP._Fn.TrackUserTime() +1295 ASP._Page_Page__PageStart_cshtml.Execute() in d:\\dzhosts\\localuser\\vantruongt2\\www.railwayb2.somee.com\\Page\\_PageStart.cshtml:9 System.Web.WebPages.StartPage.ExecutePageHierarchy() +46 System.Web.WebPages.WebPageBase.ExecutePageHierarchy(WebPageContext pageContext, TextWriter writer, WebPageRenderingBase startPage) +80 System.Web.WebPages.WebPageHttpHandler.ProcessRequestInternal(HttpContext context) +259" [ref=e16]':
            - code [ref=e17]:
              - generic [ref=e18]: "[InvalidOperationException: Invalid column name \"ID\".] WebMatrix.Data.DynamicRecord.VerifyColumn(String name) +14701 WebMatrix.Data.DynamicRecord.get_Item(String name) +18 WebMatrix.Data.DynamicRecord.TryGetMember(GetMemberBinder binder, Object& result) +13 CallSite.Target(Closure , CallSite , Object ) +140 System.Dynamic.UpdateDelegates.UpdateAndExecute1(CallSite site, T0 arg0) +679 ASP._Fn.TrackUserTime() +1295 ASP._Page_Page__PageStart_cshtml.Execute() in d:\\dzhosts\\localuser\\vantruongt2\\www.railwayb2.somee.com\\Page\\_PageStart.cshtml:9 System.Web.WebPages.StartPage.ExecutePageHierarchy() +46 System.Web.WebPages.WebPageBase.ExecutePageHierarchy(WebPageContext pageContext, TextWriter writer, WebPageRenderingBase startPage) +80 System.Web.WebPages.WebPageHttpHandler.ProcessRequestInternal(HttpContext context) +259"
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