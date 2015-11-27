# css-input
##### If you like custom css inputs (checkboxes & radio buttons) check out the ```index.html``` file to understand the simplicity of usage. All you need to do is only extra class added to your <form> tag. Choose pattern you like and have fun!

### Patterns (it's a class name for <form> tag)
* ```css-input```
* ```css-input``` with ```same-line```
* ```css-input``` with ```type-1```
* ```css-input``` with ```color-1```
* ```css-input``` with ```anim-1``` or ```anim-2``` or ```anim-3```

##### example usage
```
<form class="css-input type-1 anim-1">
  <input id="input-1" type="checkbox"/>
  <label for="input-1">Example label for css-input</label>

  <input id="input-2" type="radio"/>
  <label for="input-2">Example label for css-input</label>
</form>
```

## Installation
* install nodejs (https://nodejs.org)
* install gulp ```npm install -g gulp```
* install node dependencies ```npm install```
* single compilation for source files ```gulp``` (now you have distribution files in ```dist``` folder)
* files watcher for development ```gulp watch```

This version works only on chrome (so far)