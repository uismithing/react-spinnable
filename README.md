## React Spinnable

Spinnable is a React component designed to add the ability to easily rotate a target element. The motion profile consists of an axis, easing, duration, and displacement among the parameters. The Spinnable component simply wraps a single target element which then becomes spinnable. No adjustments to the original CSS or HTML topography are necessary. The motion action is accomplished by invoking the spinnableApply() and spinnableReset() methods.

### Features
  * Callbacks for onStart, onReady, onChange, onComplete
  * Fully configurable spin behavior
  * No adjustments to existing HTML/CSS needed

### Learn more
See the demo at [http://www.uismithing.com/main/spinnable](http://www.uismithing.com/main/spinnable).

### Repository
[https://github.com/uismithing/react-spinnable](https://github.com/uismithing/react-spinnable)

### Install
`npm install react-spinnable -s`

### Deploy
`import Spinnable from "react-spinnable"`
```html
<Spinnable id="spinnable-example-component" ref="spinnableexample" {...spinnableProfile}>
	<div id="spinnable-example-container" className="spinnable-example"></div>
</Spinnable>
```