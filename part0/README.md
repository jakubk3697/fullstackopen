### 0.4 New note diagram
In this case, if we add new record, a POST request will be executed and the whole page will rerender from scratch with the new record in response.
This is very inefficient solution. 
```mermaid
sequenceDiagram
browser->>server: HTTP  POST  https://studies.cs.helsinki.fi/exampleapp/new_note 
server-->>browser: HTTP status code 302 - URL Redirect
Note  over  browser, server: *Below we have rerendered page.
browser->server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/notes
server-->>browser: HTML-code
browser->>server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/main.css
server-->>browser: main.css
browser->>server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/main.js
server-->>browser: main.js
Note  over  browser: browser starts executing js-code that requests JSON data from serwer
browser->>server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/data.json
server-->>browser: [{content:"asss", date: "2023-01-09T18:13:15.096Z}, ...]
Note  over  browser: browser executes the event handler that renders notes to display
```
### 0.5 Single page app diagram
```mermaid
sequenceDiagram
browser->server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/notes
server-->>browser: HTML-code
browser->>server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/main.css
server-->>browser: main.css
browser->>server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->>browser: spa.js
Note  over  browser: browser starts executing js-code that requests JSON data from serwer
browser->>server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/data.json
server-->>browser: [{content:"asss", date: "2023-01-09T18:13:15.096Z}, ...]
Note  over  browser: browser executes the event handler that renders notes to display

```
### 0.6 New note in Single page app diagram
In this example, website don't rerender. This time the server doesn't ask for a redirect, the browser stays on the same page, and it sends no further HTTP requests. In spa aplications we use AJAX to send data to the server. 
``` mermaid
sequenceDiagram
browser->server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/notes
server-->>browser: HTML-code
browser->>server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/main.css
server-->>browser: main.css
browser->>server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->>browser: spa.js
Note  over  browser: browser starts executing js-code that requests JSON data from serwer
browser->>server: HTTP  GET  https://studies.cs.helsinki.fi/exampleapp/data.json
server-->>browser: [{content:"asss", date: "2023-01-09T18:13:15.096Z}, ...]
Note  over  browser: browser executes the event handler that renders notes to display
browser->>server: HTTP  POST  https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Note  over  browser, server: Status code 201 "created". Sends paylod to the server with content and creation date. 
```