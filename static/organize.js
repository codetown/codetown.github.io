// 获取开发者定义的样式
function getAuthorStyle(element) {
    let resultCSSText = ''
    // 遍历所有样式表
    for (let sheet of document.styleSheets) {
        try {
            // 遍历每个样式表中的规则
            for (let rule of sheet.cssRules) {
                if (element.matches(rule.selectorText) && element.className.split(' ').includes(rule.selectorText.replace('.', ''))) {
                    const regex = /\{ (.*?) \}/;
                    const match = rule.cssText.match(regex);
                    if (match) {
                        const extractedText = match[1].replace('none', 'block');
                        resultCSSText += extractedText
                    } else {
                        console.log("没有找到匹配项");
                    }
                }
            }
        } catch (e) {
            console.warn('Cannot access stylesheet due to CORS policy');
        }
    }
    return resultCSSText
}

// 将样式写入style标签
function writeCsstoStyle() {
    const cssMap = {}
    const special = ['header','nav','main','aside','footer','caption', 'form', 'input', 'textarea', 'button'];
    Array.from(document.querySelectorAll('[class]')).forEach(element => {
        const authorStyle = getAuthorStyle(element).trim();
        let newClassName = element.className.trim().replaceAll(' ', '').replaceAll('/', '').replaceAll(':', '').replaceAll('-', '')
        if (authorStyle != '' && newClassName != '') {
            if (newClassName.length > 13) {
                const arrClassName = element.className.split(' ')
                newClassName = ''
                arrClassName.forEach(item => {
                    newClassName += item[0]
                })
            }
            if (newClassName.length < 8) {
                newClassName =element.tagName.toLowerCase()+'-'+newClassName
            }
            if (special.includes(element.tagName.toLowerCase())) {
                newClassName=element.tagName.toLowerCase()
            }
            cssMap[newClassName] = authorStyle
            element.className = newClassName
        }
    });
    const styleText = Object.keys(cssMap).map(key => `.${key} {${cssMap[key]}}`).join('\n');
    const styleElement = document.createElement('style');
    styleElement.textContent = styleText;
    document.head.appendChild(styleElement);
}

// 下载开发者定义的样式
function downloadCustomStyle() {
    const cssText = document.querySelector('style').textContent
    const blob = new Blob([cssText], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom.css';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
}

// 下载修改后的 HTML
function downloadModifiedHtml() {
    writeCsstoStyle()
    // 获取整个 HTML 文档的内容
    document.querySelectorAll('script')?.forEach(script => script.remove());
    const htmlContent = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    // 创建 Blob 对象
    const blob = new Blob([htmlContent], { type: 'text/html' });
    // 创建 Blob URL
    const url = URL.createObjectURL(blob);
    // 创建下载链接
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modified.html';
    a.style.display = 'none';
    // 添加到 DOM
    document.body.appendChild(a);
    // 触发点击
    a.click();
    // 清理工作
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}