import React from 'react'
import MuiMarkdown from 'mui-markdown'
import { marked } from 'marked'

/**
 * A component to render the Sources page/route
 */
export default function Sources() {
  const content = `
<center>

# Sources

> Sources of images, text, code, and other content used by me that was created by someone else

</center>

<br/>

| Name                                                                                                                                                                                                                                                                                                            | Description                                                                                                                                            | License                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| <p><a href="https://github.com/mui/material-ui">Material UI</a></p> <ul> <li>Icons from Material-Icons</li> <li>Roboto font</li> <li>Collapsible Table</li> <li>Textfields and inputs</li> <li>Containers and layouts</li> <li>Tooltip</li> <li>Snackbar</li> <li>Progress bars</li> <li>Breadcrumbs</li> </ul> | A comprehensive library of components that features our implementation of Google's [Material Design](https://material.io/design/introduction/) system. | [MIT](https://github.com/mui/material-ui/blob/master/LICENSE)         |
| [nanoid](https://github.com/ai/nanoid)                                                                                                                                                                                                                                                                          | A tiny (130 bytes), secure, URL-friendly, unique string ID generator for JavaScript                                                                    | [MIT](https://github.com/ai/nanoid/blob/main/LICENSE)                 |
| [React Router](https://github.com/remix-run/react-router)                                                                                                                                                                                                                                                       | Declarative routing for React                                                                                                                          | [MIT](https://github.com/remix-run/react-router/blob/main/LICENSE.md) |
| [luxon](https://github.com/moment/luxon)                                                                                                                                                                                                                                                                        | A library for working with dates and times in JS                                                                                                       | [MIT](https://github.com/moment/luxon/blob/master/LICENSE.md)         |
| [mongoose](https://github.com/Automattic/mongoose)                                                                                                                                                                                                                                                              | MongoDB object modeling designed to work in an asynchronous environment.                                                                               | [MIT](https://github.com/Automattic/mongoose/blob/master/LICENSE.md)  |
| [express](https://github.com/expressjs/express)                                                                                                                                                                                                                                                                 | Fast, unopinionated, minimalist web framework for node.                                                                                                | [MIT](https://github.com/expressjs/express/blob/master/LICENSE)       |
| [mui-markdown](https://github.com/hajhosein/mui-markdown)                                                                                                                                                                                                                                                       | Render MD/MDX files with MUI components.                                                                                                               | [MIT](https://github.com/hajhosein/mui-markdown/blob/main/LICENSE)    |
| [marked](https://github.com/markedjs/marked)                                                                                                                                                                                                                                                                    | A markdown parser and compiler. Built for speed.                                                                                                       | [MIT](https://github.com/markedjs/marked/blob/master/LICENSE.md)      |
| [recharts](https://github.com/recharts/recharts)                                                                                                                                                                                                                                                                | Redefined chart library built with React and D3                                                                                                        | [MIT](https://github.com/recharts/recharts/blob/master/LICENSE)                                                                      |
`
  const html = marked.parse(content).replace('&#39;', "'")
  return <MuiMarkdown>{html}</MuiMarkdown>
}
