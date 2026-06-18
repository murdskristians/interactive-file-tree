# Interactive File Tree

A Vue 3 + TypeScript interactive file tree component with drag-and-drop support, built using Vite and Pinia.

**🔗 Live demo: https://interactive-file-tree-kristians.netlify.app**

## Features

- **Hierarchical File Tree Display**: Navigate through files and folders with expandable/collapsible nodes
- **Drag and Drop**: Reorganize files and folders by dragging them to new locations
- **CRUD Operations**: Create files and folders (placed relative to the current selection), rename, and delete items
- **Inline Rename**: Rename a node in place via double-click, the toolbar, or `F2`
- **Live Search**: Filter the tree as you type, with matching nodes highlighted and ancestor folders auto-expanded
- **File Type Icons**: Automatic icon assignment based on file extensions (via Lucide icons)
- **Description Panel**: View details of selected files including path and description
- **Export / Import**: Export the tree as JSON and re-import it later for a full round trip
- **Auto-save**: The tree and view state are persisted to `localStorage` and restored on reload
- **Keyboard Support**: `Delete` to remove, `F2` to rename, `Ctrl`/`Cmd`+`F` to search, `Esc` to clear search
- **Responsive Design**: Works on desktop and mobile devices
- **Theme Toggle**: Switch between system, light and dark themes; the choice is persisted

## Quick Start

### Using the start script

```bash
./start_fe.sh
```

### Manual setup

```bash
cd frontend
npm install
npm run dev
```

The application will start on **http://localhost:5180**

## Project Structure

```
apps/interactive_file_tree/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileTreeNode.vue    # Recursive tree node component
│   │   │   └── FileTreeView.vue    # Main container component
│   │   ├── composables/
│   │   │   └── useFileTreeDragDrop.ts  # Drag-and-drop logic
│   │   ├── stores/
│   │   │   └── fileTreeStore.ts    # Pinia state management
│   │   ├── types/
│   │   │   └── fileTree.ts         # TypeScript definitions
│   │   ├── utils/
│   │   │   └── fileTreeUtils.ts    # Tree manipulation utilities
│   │   ├── styles/
│   │   │   └── fileTree.css        # Global styles
│   │   ├── data/
│   │   │   └── sampleFileTree.json # Sample data for demo
│   │   ├── App.vue                 # Root component
│   │   └── main.ts                 # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── start_fe.sh                     # Startup script
└── README.md
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 5180 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run type-check` | Run TypeScript type checking |

## Component Usage

### Basic Usage

```vue
<template>
  <FileTreeView />
</template>

<script setup lang="ts">
import FileTreeView from './components/FileTreeView.vue';
</script>
```

### With Custom Data

```vue
<template>
  <FileTreeView :initial-data="myTreeData" />
</template>

<script setup lang="ts">
import FileTreeView from './components/FileTreeView.vue';
import type { FileTreeNode } from './types/fileTree';

const myTreeData: FileTreeNode[] = [
  {
    id: 'folder-1',
    name: 'My Folder',
    type: 'folder',
    children: [
      {
        id: 'file-1',
        name: 'document.txt',
        type: 'file',
        description: 'A sample document'
      }
    ]
  }
];
</script>
```

### Component Options

```vue
<FileTreeView
  :initial-data="treeData"
  :options="{
    readOnly: false,
    showToolbar: true,
    showDescription: true,
    compactMode: false,
    maxDepth: 20,
    allowDragDrop: true
  }"
/>
```

## Dependencies

- **Vue 3**: Progressive JavaScript framework
- **Pinia**: State management for Vue
- **Vite**: Next-generation frontend tooling
- **TypeScript**: Type-safe JavaScript
- **Lucide Vue Next**: Beautiful and consistent icons

## Interactions

| Action | Result |
|--------|--------|
| Click | Select node |
| Double-click folder | Expand/collapse |
| Double-click name | Rename node inline |
| Drag file/folder | Move to another folder |
| New File button | Create file in/next to the selection |
| New Folder button | Create folder in/next to the selection |
| Rename button / `F2` | Rename selected item inline |
| Delete button / `Delete` key | Remove selected item |
| Import button | Load a tree from a JSON file |
| Export button | Download tree as JSON |
| `Ctrl`/`Cmd` + `F` | Focus the search box |
| `Esc` | Clear the active search |
| Theme toggle (header) | Cycle system → light → dark |

## Configuration

The app runs on port **5180** by default to avoid conflicts with other applications. This can be changed in:

- `vite.config.ts` - `server.port`
- `package.json` - dev script `--port` flag

## License

MIT
