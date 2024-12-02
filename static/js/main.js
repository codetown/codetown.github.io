const form = document.getElementById("search-form");
function search(e) {
  const effectValue = e.currentTarget["keyword"].value.trim();
  if (!effectValue) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  return true;
}
form.addEventListener("submit", search);

/**
 * 处理图片加载失败事件
 * @param {Event} event - 事件对象
 */
document.addEventListener(
  "error",
  function (event) {
    if (event.target.tagName.toLowerCase() === "img") {
      // 检查是否已经处理过错误
      if (event.target.getAttribute("data-error-handled") === "true") {
        event.stopImmediatePropagation(); // 防止其他监听器处理
        return;
      }

      // 标记此图片错误已处理
      event.target.setAttribute("data-error-handled", "true");

      // 移除 onerror 事件处理器
      event.target.onerror = null;

      // 设置默认图片
      event.target.src = "images/nopic.png";

      // 阻止默认行为
      event.preventDefault();
      e.stopPropagation();
    }
  },
  true
); // 使用 capture 模式
