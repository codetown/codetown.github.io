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
      event.stopPropagation();
    }
  },
  true
); // 使用 capture 模式

const playerOptions = {
  controls: [
    "play-large",
    // 'restart',
    // 'rewind',
    "play",
    // 'fast-forward',
    "progress",
    "current-time",
    // 'duration',
    "mute",
    "volume",
    // 'captions',
    "settings",
    // 'pip',
    // 'airplay',
    // 'download',
    "fullscreen",
  ],
  settings: ["quality", "speed"],
  i18n: {
    restart: "重新播放",
    rewind: "倒退 {seektime} 秒",
    play: "播放",
    pause: "暂停",
    fastForward: "快进 {seektime} 秒",
    seek: "Seek",
    volume: "音量",
    mute: "静音",
    unmute: "取消静音",
    enableCaptions: "启用字幕",
    disableCaptions: "禁用字幕",
    enterFullscreen: "进入全屏",
    exitFullscreen: "退出全屏",
    settings: "设置",
    speed: "播放速度",
    normal: "正常",
    quality: "当前画质",
    loop: "循环播放",
    start: "开始",
    end: "结束",
    all: "全部",
    reset: "重置",
    disabled: "已禁用",
  },
};

let gHls, gPlayer;
let currentCloudIndex = 0,
  currentSerieIndex = 0;
const tabs = document.getElementById("cloud-tabs")?.children || [];
const clouds = document.getElementById("tab-contents")?.children || [];
const xlx = document.getElementById("xlx");
const jjx = document.getElementById("jjx");
console.info("tabs=>",tabs)
console.info("tab-contents=>",clouds)
function setSerie(cloudIndex, serieIndex) {
  for (let index = 0; index < clouds.length; index++) {
    if (index == cloudIndex) {
      clouds[index].style = "display:flex";
    } else {
      clouds[index].style = "display:none";
    }
  }
  let fileURL = "";
  for (let index = 0; index < clouds[cloudIndex].children.length; index++) {
    const a = clouds[cloudIndex].children[index];
    if (index == serieIndex) {
      a.className = "active";
      fileURL = a.href;
    } else {
      a.className = "normal";
    }
  }
  if(xlx){
    xlx.innerHTML = cloudIndex + 1;
  }
  if(jjx){
    jjx.innerHTML = clouds[cloudIndex].children[serieIndex].innerHTML;
  }
  currentCloudIndex = cloudIndex;
  currentSerieIndex= serieIndex;
  if (!fileURL) {
    return;
  }
  if (gHls) {
    gHls.destroy();
  }
  gHls = new Hls();
  const video = document.getElementById("player");
  gHls.loadSource(fileURL);
  gHls.attachMedia(video);
  // 监听 Hls.goog Events.MANIFEST_PARSED 事件，当播放列表解析完成后进行 Plyr 初始化
  gHls.on(Hls.Events.MANIFEST_PARSED, function () {
    if (!gPlayer) {
      gPlayer = new Plyr(video, playerOptions);
    }
  });
}
function setCloud(cloudIndex) {
  for (let index = 0; index < tabs.length; index++) {
    if (cloudIndex == index) {
      currentCloudIndex = cloudIndex;
      tabs[index].className = "active";
      clouds[index].style = "display:flex";
    } else {
      tabs[index].className = "";
      clouds[index].style = "display:none";
    }
  }
  setSerie(cloudIndex, currentSerieIndex );
}
function init() {
  if (!Hls.isSupported()) {
    alert("该浏览器不支持视频流播放，请更换浏览器打开本网站");
    return;
  }
  setCloud("0");
}

if (tabs.length > 0 && clouds.length > 0) {
  init();
}
