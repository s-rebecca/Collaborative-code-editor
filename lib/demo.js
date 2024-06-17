import Peer from 'peerjs';
import SimpleMDE from 'simplemde';

import DemoController from './controller';
import Broadcast from './broadcast';
import Editor from './editor';
import UserBot from './userBot';

const id = Math.floor(Math.random() * 100000);

const demo = new DemoController(
  (location.search.slice(1) || '0'),
  location.origin,
  new Peer('conclave-demo-'+id, {
    debug: 3
  }),
  new Broadcast(),
  new Editor(new SimpleMDE({
    placeholder: "Share the link to invite collaborators to your document.",
    spellChecker: false,
    toolbar: false,
    autofocus: true,
    indentWithTabs: true,
    tabSize: 4,
    indentUnit: 4,
    lineWrapping: false,
    shortCuts: []
  }))
);

const script1 = `CodeColl is a real-time collaborative coding environment.

## Features

- Real-time collaboration
- Run Code

## Doesn't Google Docs do this?

Yes, but Google Docs is not a code editor. CodeColl is a code editor that supports real-time collaboration.

# How does it work?

CodeColl uses [Operational Transformation](https://en.wikipedia.org/wiki/Operational_transformation) to synchronize changes between multiple users.

# How do I use it?

1. Share the link to invite collaborators to your document.
2. Start coding!
`;

new UserBot('conclave-bot'+id, 'conclave-demo-'+id, script1, demo.editor.mde);

