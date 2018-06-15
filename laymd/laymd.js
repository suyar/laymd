layui.define(['jquery'], function(exports) {
    "use strict";

    var $ = layui.$;

    //所有工具
    var tools = {
        bold: '<i class="laymd-tool-b" title="加粗" laymd-event="bold">B</i>',
        italic: '<i class="laymd-tool-i" title="斜体" laymd-event="italic">I</i>',
        underline: '<i class="laymd-tool-u" title="下划线" laymd-event="underline">U</i>',
        del: '<i class="laymd-tool-d" title="删除线" laymd-event="del">D</i>',
        '|': '<span></span>',
        h1: '<i class="laymd-tool-h1" title="h1" laymd-event="h1">h1</i>',
        h2: '<i class="laymd-tool-h2" title="h2" laymd-event="h2">h2</i>',
        h3: '<i class="laymd-tool-h3" title="h3" laymd-event="h3">h3</i>',
        h4: '<i class="laymd-tool-h4" title="h4" laymd-event="h4">h4</i>',
        h5: '<i class="laymd-tool-h5" title="h5" laymd-event="h5">h5</i>',
        h6: '<i class="laymd-tool-h6" title="h6" laymd-event="h6">h6</i>',
        hr: '<i class="laymd-tool-hr" title="换行符" laymd-event="hr">—</i>',
        link: '<i class="laymd-tool-link" title="超链接" laymd-event="link">A</i>',
        code: '<i class="laymd-tool-code" title="代码" laymd-event="code">/</i>',
        ol: '<i class="laymd-tool-ol" title="有序列表" laymd-event="ol">ol</i>',
        ul: '<i class="laymd-tool-ul" title="无序列表" laymd-event="ul">ul</i>',
        tl: '<i class="laymd-tool-tl" title="任务列表" laymd-event="tl">tl</i>',
        table: '<i class="laymd-tool-table" title="表格" laymd-event="table">T</i>',
        quote: '<i class="laymd-tool-quote" title="引用" laymd-event="quote">Q</i>',
        toc: '<i class="laymd-tool-toc" title="导航" laymd-event="toc">TOC</i>',
        left: '<i class="laymd-tool-left" title="居左" laymd-event="left">L</i>',
        center: '<i class="laymd-tool-center" title="居中" laymd-event="center">C</i>',
        right: '<i class="laymd-tool-right" title="居右" laymd-event="right">R</i>',
        img: '<i class="laymd-tool-img" title="图片" laymd-event="img">IMG</i>',
        full: '<i class="laymd-tool-full" title="全屏" laymd-event="full">↗</i>'
    };

    //事件列表
    var events = {
        bold: function (event, element) {
            var range = this.getRangeData();
            this.setRangeData({
                text: '**' + range.text + '**',
                start: range.end + 2,
                end: range.end + 2
            });
        },
        italic: function (event, element) {
            var range = this.getRangeData();
            this.setRangeData({
                text: '*' + range.text + '*',
                start: range.end + 1,
                end: range.end + 1
            });
        },
        underline: function (event, element) {
            var range = this.getRangeData();
            this.setRangeData({
                text: '++' + range.text + '++',
                start: range.end + 2,
                end: range.end + 2
            });
        },
        del: function (event, element) {
            var range = this.getRangeData();
            this.setRangeData({
                text: '~~' + range.text + '~~',
                start: range.end + 2,
                end: range.end + 2
            });
        },
        left: function (event, element) {
            this.setLineText(this.getLineText().replace(/^ *(:-:|--:) /, ''));
        },
        center: function (event, element) {
            this.setLineText(':-: ' + this.getLineText().replace(/ *(^:-:|--:) /, ''));
        },
        right: function (event, element) {
            this.setLineText('--: ' + this.getLineText().replace(/^ *(:-:|--:) /, ''));
        },
        h1: function (event, element) {
            this.setLineText('# ' + this.getLineText().replace(/^ *#+ /, ''));
        },
        h2: function (event, element) {
            this.setLineText('## ' + this.getLineText().replace(/^ *#+ /, ''));
        },
        h3: function (event, element) {
            this.setLineText('### ' + this.getLineText().replace(/^ *#+ /, ''));
        },
        h4: function (event, element) {
            this.setLineText('#### ' + this.getLineText().replace(/^ *#+ /, ''));
        },
        h5: function (event, element) {
            this.setLineText('##### ' + this.getLineText().replace(/^ *#+ /, ''));
        },
        h6: function (event, element) {
            this.setLineText('###### ' + this.getLineText().replace(/^ *#+ /, ''));
        },
        hr: function (event, element) {
            var range = this.getRangeData();
            this.setRangeData({
                text: "\n---\n",
                start: range.start + 5,
                end: range.start + 5
            });
        },
        link: function (event, element, data) {
            var range = this.getRangeData();
            if (data) {
                var text = data.text || range.text || data.link,
                    title = data.title || text || '',
                    link = '[' + text + '](' + data.link + (title ? (' "' + title + '"') : '') + ')';
                this.setRangeData({
                    text: link,
                    start: range.start + link.length,
                    end: range.start + link.length
                });
            } else {
                var textLen = range.text.length,
                    text = textLen ? range.text : 'text',
                    title = textLen ? range.text : 'title';
                this.setRangeData({
                    text: '[' + text + '](http://link-address "' + title + '")',
                    start: textLen ? (range.start + textLen + 3) : (range.start + 1),
                    end: textLen ? (range.start + textLen + 22) : (range.start + 5),
                });
            }
        },
        code: function (event, element) {
            var range = this.getRangeData(),
                line = this.getLineData();
            if (range.text || line.text) {
                this.setRangeData({
                    text: '`' + range.text + '`',
                    start: range.end + 1,
                    end: range.end + 1
                });
            } else {
                this.setLineData({
                    text: '```\n\n```',
                    start: line.start + 4,
                    end: line.start + 4
                });
            }
        },
        ol: function (event, element) {
            this.setLineText(this.getLineText().replace(/^( *)(?:(?:(?:\d+\.)|(?:-(?: \[[ x]])?)) )?(.*)/, '$11. $2'));
        },
        ul: function (event, element) {
            this.setLineText(this.getLineText().replace(/^( *)(?:(?:(?:\d+\.)|(?:-(?: \[[ x]])?)) )?(.*)/, '$1- $2'));
        },
        tl: function (event, element) {
            this.setLineText(this.getLineText().replace(/^( *)(?:(?:(?:\d+\.)|(?:-(?: \[[ x]])?)) )?(.*)/, '$1- [ ] $2'));
        },
        enter: function (event, element) {
            var line = this.getLineData(),
                preLine = this.getLineData(line.line - 1);
            var match = /^( *)((?:(?:\d+\.)|(?:-(?: \[[ x]])?)) )?(.*)/.exec(preLine.text);
            if (match[2]) {
                if (match[3] === '') {
                    this.setLineText('', preLine.line);
                    this.setLineText('', line.line);
                } else if (match[2].length === 3) {
                    var m = /^(\d+)\. /.exec(match[2]);
                    this.setLineText(match[1] + (parseInt(m[1]) + 1) + '. ' + line.text);
                } else {
                    this.setLineText(match[1] + match[2] + line.text);
                }
            }
        },
        table: function (event, element) {
            var range = this.getRangeData(),
                table = [
                    this.getLineText() ? '\n' : '',
                    'header 1 | header 2',
                    '--- | ---',
                    'row 1 col 1 | row 1 col 2',
                    'row 2 col 1 | row 2 col 2',
                    '\n'
                ].join("\n");
            this.setRangeData({
                text: table,
                start: range.start + table.length,
                end: range.start + table.length
            });
        },
        quote: function (event, element) {
            this.setLineText('> ' + this.getLineText().replace(/^ *> /, ''));
        },
        toc: function (event, element) {
            var range = this.getRangeData();
            this.setRangeData({
                text: '\n[TOC]\n',
                start: range.start + 7,
                end: range.start + 7
            });
        },
        img: function (event, element, data) {
            var range = this.getRangeData();
            if (data) {
                var alt = data.alt || range.text || data.title || data.src,
                    title = data.title || alt || '',
                    src = '[' + alt + '](' + data.src + (title ? (' "' + title + '"') : '') + ')';
                this.setRangeData({
                    text: src,
                    start: range.start + src.length,
                    end: range.start + src.length
                });
            } else {
                var textLen = range.text.length,
                    alt = textLen ? range.text : 'alt',
                    title = textLen ? range.text : 'title';
                this.setRangeData({
                    text: '![' + alt + '](http://link-address "' + title + '")',
                    start: textLen ? (range.start + textLen + 4) : (range.start + 2),
                    end: textLen ? (range.start + textLen + 23) : (range.start + 5),
                });
            }
        },
        tab: function (event, element) {
            var range = this.getRangeData();
            this.setRangeData({text: '    ', start: range.start + 4, end: range.start + 4});
        },
        input: function (event, element) {
            this.history.redo(true);
            events.change.call(this, event, element);
        },
        redo: function (event, element, flush) {
            this.history.redo(flush);
        },
        undo: function (event, element, record) {
            this.history.undo(record);
        },
        change: function (event, element) {
            var change = this.getOpt('change');
            typeof change === 'function' && change.call(this);
        },
        full: function (event, element) {
            this.fullScreen(element);
        }
    };

    //热键数组
    var keyMap = [];
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

    /**
     * 热键
     * @param event 按键事件
     * @param up 是否keyup
     */
    var hotkeys = function (event, up) {
        if (up) {
            if (event.keyCode === 13) {
                event.preventDefault();
                events.enter.call(this, event);
            }
        } else if (event.ctrlKey) {
            if (event.shiftKey && event.keyCode === 90) { //ctrl + shift + z
                events.redo.call(this, event);
            } else if (keyMap[event.keyCode]) {
                event.preventDefault();
                events[keyMap[event.keyCode]].call(this, event);
            }
        } else {
            if (event.keyCode === 9) {
                event.preventDefault();
                events.tab.call(this, event);
            }
        }
    };

    /**
     * 编辑器对象
     * @param id 编辑器容器ID
     * @param options 编辑器选项
     * @constructor
     */
    var MD = function (id, options) {
        //this别名
        var THIS = this;
        //配置项
        var config = {
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
                'full'
            ],
            height: 280
        };

        //合并选项
        config = $.extend({}, config, options);

        //获取编辑器容器
        var div = $(typeof(id) === 'string' ? '#' + id : id).addClass('layui-laymd');

        //设置要显示的工具
        var toolsEl = [];
        layui.each(config.tools, function(index, item){
            tools[item] &&  toolsEl.push(tools[item]);
        });

        //载入元素
        div.html([
            '<div class="layui-unselect layui-laymd-tool">'+ toolsEl.join('') +'</div>',
                '<div class="layui-laymd-area">',
                    '<textarea spellcheck="false"></textarea>',
                '</div>',
            '</div>'
        ].join(''));

        //设置编辑框的样式
        var textArea = div.find('textarea').css('height', config.height).attr('name', div.attr('name') || div.prop('id')),
            ta = textArea[0];

        //绑定按键事件
        textArea.on('keydown', function (e) {
            hotkeys.call(THIS, e);
        });

        //绑定按钮事件
        textArea.on('keyup', function (e) {
            hotkeys.call(THIS, e, true);
        });

        //输入事件
        var composition = false, preText, sufText;
        textArea.on('input', function (e) {
            composition || events.input.call(THIS, e, this);
        }).on('compositionstart', function (e) {
            preText = textArea.val();
            composition = true;
        }).on('compositionend', function (e) {
            composition = false;
            sufText = textArea.val();
            preText === sufText || events.input.call(THIS, e, this);
        });

        //操作记录
        setInterval(function () {
            events.undo.call(THIS, null, null, true);
        }, 1500);

        //工具栏事件
        div.find('.layui-laymd-tool > i').on('click', function (e) {
            events[$(this).attr('laymd-event')].call(THIS, e, this);
        });

        /**
         * 获取选中位置
         * @returns {{start: number, end: number, text: string}}
         */
        this.getRangeData = function () {
            ta.focus();
            return {
                start: ta.selectionStart,
                end: ta.selectionEnd,
                text: ta.value.substring(ta.selectionStart, ta.selectionEnd)
            };
        };

        /**
         * 替换选中数据
         * @param rangeData {{start: *|number, end: *|number, text: *|string}}
         */
        this.setRangeData = function (rangeData) {
            ta.focus();
            if (typeof rangeData.text === 'string') {
                var value = ta.value;
                if (ta.setRangeText) {
                    ta.setRangeText(rangeData.text);
                } else {
                    var range = this.getRangeData(),
                        pre = value.substring(0, range.start),
                        suf = value.substring(range.end);
                    ta.value = pre + rangeData.text + suf;
                    ta.selectionStart = range.start;
                    ta.selectionEnd = range.start + rangeData.text.length;
                }
                value === ta.value || textArea.trigger('input');
            }
            if (typeof rangeData.start === 'number') {
                ta.selectionStart = rangeData.start;
            }
            if (typeof rangeData.end === 'number') {
                ta.selectionEnd = rangeData.end;
            }
        };

        /**
         * 获取选中文本
         * @returns {string}
         */
        this.getRangeText = function () {
            return this.getRangeData().text;
        };

        /**
         * 设置选中文本
         * @param text
         */
        this.setRangeText = function (text) {
            this.setRangeData({text: text});
        };

        /**
         * 获取光标所在行的数据
         * @param line
         * @returns {{start: number, end: number, line: number, text: string}}
         */
        this.getLineData = function (line) {
            ta.focus();
            var lineData = {},
                text = ta.value,
                lines = text.split("\n");

            lineData.start = 0;
            lineData.line = typeof line === 'number' ? line : text.substring(0, ta.selectionEnd).split("\n").length - 1;
            lineData.text = lines[lineData.line] || '';
            for (var i = 0; i < lineData.line; i++) {
                lineData.start += lines[i].length + 1;
            }
            lineData.end = lineData.start + lineData.text.length;
            return lineData;
        };

        /**
         * 设置光标所在行的数据
         * @param lineData {{start: *|number, end: *|number, line: *|number, text: *|string}}
         */
        this.setLineData = function (lineData) {
            ta.focus();
            if (typeof lineData.text === 'string') {
                var line = this.getLineData(lineData.line),
                    value = ta.value,
                    pre = value.substring(0, line.start),
                    suf = value.substring(line.end);
                ta.value = pre + lineData.text + suf;
                ta.selectionStart = ta.selectionEnd = line.start + lineData.text.length;
                value === ta.value || textArea.trigger('input');
            }
            if (typeof lineData.start === 'number') {
                ta.selectionStart = lineData.start;
            }
            if (typeof lineData.end === 'number') {
                ta.selectionEnd = lineData.end;
            }
        };

        /**
         * 获取光标所在行的文本
         * @returns {string}
         */
        this.getLineText = function (line) {
            return this.getLineData({line: line}).text;
        };

        /**
         * 设置光标所在行的文本
         * @param text
         * @param line
         */
        this.setLineText = function (text, line) {
            this.setLineData({text: text, line: line});
        };

        /**
         * 设置超链接
         * @param link 链接位置
         * @param text 链接文本
         * @param title 链接标题
         */
        this.setLink = function (link, text, title) {
            events.link.call(THIS, null, null, {
                link: link,
                text: text,
                title: title
            });
        };

        /**
         * 设置图片
         * @param src 图片地址
         * @param alt 图片ALT
         * @param title 图片标题
         */
        this.setImg = function (src, alt, title) {
            events.img.call(THIS, null, null, {
                src: src,
                alt: alt,
                title: title
            });
        };

        /**
         * 触发某个事件
         * @param event 事件名称
         */
        this.trigger = function (event) {
            events[event] && events[event].call(this);
        };

        //操作记录
        this.history = {
            _undo: [ta.value],
            _redo: [],
            undo: function (record) {
                if (record) {
                    var text = ta.value;
                    if (this._undo[this._undo.length - 1] === text) {
                        return false;
                    } else {
                        this._undo.push(text);
                        this._undo.length > 500 && this._undo.shift();
                    }
                } else {
                    this.undo(true);
                    if (this._undo.length > 1) {
                        this._redo.push(this._undo.pop());
                        ta.value = this._undo[this._undo.length - 1];
                        events.change.call(THIS);
                    }
                }
            },
            redo: function (flush) {
                if (flush && this._redo.length) {
                    this._redo = [];
                } else {
                    if (this._redo.length > 0) {
                        ta.value = this._redo.pop();
                        this.undo(true);
                        events.change.call(THIS);
                    }
                }
            }
        };

        /**
         * 获取编辑器的内容
         * @returns {string}
         */
        this.getText = function () {
            return ta.value;
        };

        /**
         * 获取配置项
         * @param name 配置名
         * @returns {*}
         */
        this.getOpt = function (name) {
            return config[name];
        };

        /**
         * 切换全屏
         * @param element 按钮元素
         */
        this.fullScreen = function (element) {
            if (div.hasClass('layui-laymd-full')) {
                div.removeClass('layui-laymd-full');
                element && $(element).text('↗');
            } else {
                div.addClass('layui-laymd-full');
                element && $(element).text('↙');
            }
        };
    };


    exports('laymd', {
        init: function (id, options) {
            return new MD(id, options);
        }
    });
});
