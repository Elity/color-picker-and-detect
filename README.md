# colorPicker
A javascript lib for rgb color picker and detect to human color

### Live Demo

https://jsfiddle.net/xingsuifeng/yajsdg65/

### Usage

```javascript
var imgDom = document.querySelector('#img');
imgDom.addEventListener('load',function(){
      ColorPicker(this).click(function(data,event){
        // data is picked rgba Uint8ClampedArray  example: black -> [0, 0, 0, 255]

      }).mousemove(function(d,e){
        
      }).mouseout(function(e){
        
      });
    });
```

