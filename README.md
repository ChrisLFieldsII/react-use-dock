# React Use Dock

## A hook to render dynamic content into a Dock!

[Visit Demo](https://react-use-dock.vercel.app/)

<p align="center">
  <img src="./react-use-dock.gif" alt="demo" />
</p>

## Install

(requires React version ^16.8.0)

```bash
# npm
npm i react-use-dock

# Yarn
yarn add react-use-dock
```

## Usage

> ### Wrap application with `DockProvider`

```jsx
import { DockProvider } from 'react-use-dock'

function MyApp() {
  return (
    <DockProvider>
      <Layout>
        <AppContent />
      </Layout>
    </DockProvider>
  )
}
```

> ### Add `Dock` component into your component tree

```jsx
import { Dock } from 'react-use-dock'

function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>React Use Dock</h1>
      </header>

      <main>{children}</main>

      <footer>Stuff</footer>

      {/* Dock is absolutely positioned, place anywhere */}
      <Dock />
    </div>
  )
}
```

> ### Use Dock

```jsx
import { useEffect } from 'react'
import { useDock, DockContainer } from 'react-use-dock'

function Example() {
  const dock = useDock()

  // provide any render function!
  const render = () => (
    <DockContainer onCloseDock={() => console.log('Closed dock')}>
      <YourDockContent />
    </DockContainer>
  )

  useEffect(() => {
    dock.openDock({
      render,
      minSize: 350,
      orientation: 'right',
      size: 50,
    })
  }, [])

  return (
    <div>
      <button onClick={dock.toggleDock}>Toggle Dock</button>
    </div>
  )
}
```

## API

> ### useDock hook

View the `useDock()` api in the [Docs](https://react-use-dock.vercel.app/docs/interfaces/context.dockcontextvalue.html)

> ### Dock

The `Dock` component is where the `render` function is called to display content.

```jsx
interface DockProps {
  id?: string
  style?: React.CSSProperties
}
```

| Name  | Description                                                    | Default        |
| ----- | -------------------------------------------------------------- | -------------- |
| id    | `id` attribute for the Docks `<div>`. Useful for css selection | react-use-dock |
| style | Inline styles                                                  | {}             |

> ### DockContainer

The `DockContainer` component is a simple wrapper component that renders a close icon at the top right.

```jsx
interface DockContainerProps {
  children: any
  onCloseDock?(): void
  CloseIcon?: ReactNode
}
```

| Name        | Description                           | Default                                              |
| ----------- | ------------------------------------- | ---------------------------------------------------- |
| children    | React child components                | -                                                    |
| onCloseDock | Callback when dock is closed          | () => {}                                             |
| CloseIcon   | Custom React component for close icon | `<span style={{ fontSize: '1.5em' }}>&times;</span>` |

```jsx
import { DockContainer } from 'react-use-dock'

function Example() {
  return (
    <DockContainer
      onCloseDock={() => console.log('Closed Dock')}
      CloseIcon={<span>Close Dock</span>}
    >
      <YourDockContent />
    </DockContainer>
  )
}
```
