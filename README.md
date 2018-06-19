# laymd-基于layui模块化的Markdown编辑器

### 快速上手

引入解析器（这个看个人喜好，demo用的是marked.js，速度较快，也可以用HyperDown）

```html
<script src="laymd/marked.min.js"></script>
```

```javascript
layui.config({base: 'laymd/'}).use(['laymd'], function(){
    var laymd = layui.laymd;

    //实例化编辑器,可以多个实例
    var md = laymd.init('demo', {});

    //内容改变事件
    md.on('change', function () {
        //这里借用marked.js解析效率比HyperDown快,用户可自行找解析器
        this.setPreview(marked(this.getText()));
    });

    //初始化数据预览
    md.do('change');
});
```

[查看示例页面](http://laymd.revoke.cc/?_blank)


> 注意，请把`laymd.css`和`preview.css`以及`laymd.js`放在同一个目录下，并且不要变更文件名

### API

- `md.on(event, callback)`

绑定事件，目前仅支持`change`事件

---

- `md.do(action)`

执行事件，事件详情请看源码

- `md.history`

撤销：`md.history.undo`

还原：`md.history.redo`

- `md.getRangeData()`

获取当前选中的文字以及开始-结束位置`{start: number, end: number, text: string}`

- `md.setRangeData(rangeData)`

替换当前选中数据并且设置选中范围的开始-结束位置`{start: number, end: number, text: string}`

- `md.getRangeText()`

获取选中的文本

- `md.setRangeText(text)`

替换当前选中的数据

- `md.getLineData(line)`

获取当前行的数据，如果有传入`line`则获取第`line`行的数据；如果跨行选中，则以选中最后的位置一行为准
`{start: number, end: number, line: number, text: string}`

- `md.setLineData(lineData)`

设置光标所在行的数据`{start: number, end: number, line: number, text: string}`,如果line存在，表示设置的第`line`行

- `md.getLineText(line)`

获取第`line`行的数据，不传为当前行

- `md.setLineText(text ,line)`

设置第`line`行的数据，不传为当前行

- `md.getText()`

获取当前的MD数据

- `md.setPreview(html)`

设置预览的HTML

- `md.setLink(link, text, title)`

在当前位置添加超链接

- `md.setImg(src, alt, title)`

在当前位置添加图片


### 快捷键

```javascript
keyMap[66] = 'bold'; //ctrl + b
keyMap[73] = 'italic'; //ctrl + i
keyMap[85] = 'underline'; //ctrl + u
keyMap[68] = 'del'; //ctrl + d
keyMap[37] = 'left'; //ctrl + ←
keyMap[38] = 'center'; //ctrl + ↑
keyMap[39] = 'right'; //ctrl + →
keyMap[49] = 'h1'; //ctrl + 1
keyMap[50] = 'h2'; //ctrl + 2
keyMap[51] = 'h3'; //ctrl + 3
keyMap[52] = 'h4'; //ctrl + 4
keyMap[53] = 'h5'; //ctrl + 5
keyMap[54] = 'h6'; //ctrl + 6
keyMap[189] = 'hr'; //ctrl + -
keyMap[76] = 'link'; //ctrl + l
keyMap[191] = 'code'; //ctrl + /
keyMap[81] = 'quote'; //ctrl + q
keyMap[89] = 'redo'; //ctrl + y
keyMap[90] = 'undo'; //ctrl + z
```

### 初始化配置

```javascript
laymd.init('demo', {
    tools: [
        'bold', 'italic', 'underline', 'del',
        '|',
        'left', 'center', 'right',
        '|',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        '|',
        'hr', 'link', 'code', 'ol', 'ul', 'tl',
        '|',
        'table', 'quote', 'toc', 'img',
        '|',
        'full', 'preview'
    ],
    height: 280
});
```

> 嗯。。。目前就支持这两项配置

> 关于图标问题：因个人偷懒，懒得弄图标，所以将就一下

### 更多问题，直接在PR提交或者加群633203774探讨

