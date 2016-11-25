var ColorPicker = (function (window) {
	function _(dom) {
		if (Object.prototype.toString.call(dom) == "[object String]")
			dom = document.querySelector(dom);
		if (dom.tagName != 'IMG')
			return;
		this.img = dom;
		this.createCanvas();
		this.listener();
	}
	_.prototype.createCanvas = function () {
		this.canvas = this.img.nextSibling && this.img.nextSibling.tagName == "CANVAS" ? this.img.nextSibling : document.createElement('canvas');
		this.canvas.width = this.img.width;
		this.canvas.height = this.img.height;
		this.canvas.style.cursor = 'crosshair';
		this.ctx = this.canvas.getContext("2d");
		this.copyStyle();
		this.img.style.display = 'none';
		this.img.insertAdjacentElement('afterend', this.canvas);
		this.ctx.drawImage(this.img, 0, 0);
	};

	_.prototype.listener = function () {
		this.canvas.addEventListener('mousemove', this.mouseMoveHandle.bind(this));
		this.canvas.addEventListener('click', this.clickHandle.bind(this));
		this.canvas.addEventListener('mouseout', this.mouseoutHandle.bind(this));
	};

	_.prototype.copyStyle = function () {
		var styles = ['display', 'position', 'top', 'left', 'bottom', 'right', 'vertical-align'];
		styles.forEach(_ => {
			this.canvas.style[_] = window.getComputedStyle(this.img)[_]
		});
	};

	_.prototype.mouseMoveHandle = function (e) {
		var pos = this.mousePosition(e),
		imageData = this.getPixData(pos);
		this.mousemoveCallback && this.mousemoveCallback(imageData.data, e)

	};

	_.prototype.mouseoutHandle = function (e) {
		this.mouseoutCallback && this.mouseoutCallback(e)
	};

	_.prototype.clickHandle = function (e) {
		var pos = this.mousePosition(e),
		imageData = this.getPixData(pos);
		this.clickCallback && this.clickCallback(imageData.data, e)
	};

	_.prototype.getPixData = function (pos) {
		return this.ctx.getImageData(pos.x, pos.y, 1, 1);
	};

	_.prototype.mousemove = function (fn) {
		this.mousemoveCallback = fn;
		return this;
	};

	_.prototype.mouseout = function (fn) {
		this.mouseoutCallback = fn;
		return this;
	};

	_.prototype.click = function (fn) {
		this.clickCallback = fn;
		return this;
	};
	// rgba arr to hex str
	_.prototype.hex = function (colorData) {
		return Array.prototype.map.call(colorData, _ => ('0' + _.toString(16)).slice(-2)).join('').slice(0, -2);
	};
	_.prototype.mousePosition = function (event) {
		var element = this.elementPosition(event);
		return {
			'x': event.pageX - element.x,
			'y': event.pageY - element.y
		};
	};

	_.prototype.elementPosition = function (e) {
		var obj = e.target,
		x = 0,
		y = 0;
		while (obj.offsetParent) {
			x += obj.offsetLeft;
			y += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return {
			'x': x,
			'y': y
		};
	};

	function wrap(dom) {
		this.instance = new _(dom);
	}
	wrap.prototype.click = function (fn) {
		this.instance.click(fn);
		return this;
	};

	wrap.prototype.mousemove = function (fn) {
		this.instance.mousemove(fn);
		return this;
	};

	wrap.prototype.mouseout = function (fn) {
		this.instance.mouseout(fn);
		return this;
	};

	wrap.prototype.hex = function (colorData) {
		return this.instance.hex(colorData);
	};

	return function (dom) {
		return new wrap(dom)
	}

})(window);