# About Next.JS 

- If a folder under app is enclosed in parentheses then it is not considered a route by next.js. Useful in creating UI components in app folder. 
  - In the application, (dashboard) will not be considered as route by next.js


# Routes 
- layout.js 
  - Any component defined under layout.js can be shared across multiple routes, states are preserved, and no-render occurs. 
  - Must take a children prop 
  - Can be exported as component if the UI is defined under layout.js
- template.js 
  - Opposite of layout.js. Can be shared across multiple routes, states are not preserved, and re-render occurs. 
  - Must take a children prop 
  - Best used to render UI that needs to have clean state when someone changes the route. 
  - Can be exported as component if the UI is defined under template.js

- There must be one layout.js at the root of the app folder that takes the entire application as React Children prop and renders under the body tag defined under html tag. <html><body>{ children }</body</html>

functions cannot be passed as props to a child component if the parent component is a server component

Any component that is asynchronous in nature is a server component. Such components only render after the completion of asynchronous operation and the data generated at the end of asynchronous operation are then passed down as props to the client-side components (synchronous in nature)

Route Handlers allow us to make custom request handles on a given route using the Web Request and Response APIs 
Think of it like this. When we visit an URL, we want to call an API immediately. This can be achieved using the route handlers. 
All route handlers files have the naming convention - route.ts or route.js