const form = document.getElementById("search-form");

function search(e) {
  const keywordElement = e.target.elements.keyword;
  if (!keywordElement) {
    console.error("表单中未找到 keyword 元素");
    return false;
  }

  const effectValue = keywordElement.value.trim();
  if (!effectValue) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  return true;
}

form.addEventListener("submit", search);

document.addEventListener(
  "error",
  (event) => {
    if (event.target.tagName.toLowerCase() === "img") {
      if (event.target.getAttribute("data-error-handled") === "true") {
        event.stopImmediatePropagation();
        return;
      }

      event.target.setAttribute("data-error-handled", "true");
      event.target.onerror = null;
      event.target.src = "images/nopic.png";
      event.preventDefault();
      event.stopPropagation();
    }
  },
  true
);

const playerOptions = {
  controls: [
    "play-large",
    "play",
    "progress",
    "current-time",
    "mute",
    "volume",
    "settings",
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

const state = {
  gHls: null,
  gPlayer: null,
  currentCloudIndex: 0,
  currentSerieIndex: 0,
  tabs: Array.from(document.getElementById("cloud-tabs")?.children || []),
  clouds: Array.from(document.getElementById("tab-contents")?.children || []),
  xlx: document.getElementById("xlx"),
  jjx: document.getElementById("jjx"),
  video: document.getElementById("player"),
  videoTitle:
    document.getElementById("video-title")?.innerText?.trim() || "视频默认名称",
};

const isM3u8Url = (url) => {
  const pathname = new URL(url).pathname.toLowerCase();
  return pathname.endsWith(".m3u8") || pathname.endsWith(".m3u");
};

function setSerie(cloudIndex, serieIndex) {
  if (
    cloudIndex < 0 ||
    cloudIndex >= state.clouds.length ||
    serieIndex < 0 ||
    serieIndex >= state.clouds[cloudIndex].children.length
  ) {
    console.error("无效的云或集索引");
    return;
  }

  state.clouds.forEach((cloud, index) => {
    cloud.style.display = index === cloudIndex ? "flex" : "none";
  });

  let fileURL = "";
  Array.from(state.clouds[cloudIndex]?.children || []).forEach((a, index) => {
    a.className = index === serieIndex ? "active" : "normal";
    if (index === serieIndex) {
      fileURL = a.href;
    }
  });

  if (state.xlx) {
    state.xlx.innerHTML = cloudIndex + 1;
  }

  if (state.jjx) {
    state.jjx.innerHTML =
      state.clouds[cloudIndex].children[serieIndex]?.innerHTML || "";
  }

  state.currentCloudIndex = cloudIndex;
  state.currentSerieIndex = serieIndex;

  if (!fileURL) {
    return;
  }
  if (isM3u8Url(fileURL)) {
    if (state.gHls) {
      state.gHls.destroy();
    }
    state.gHls = new Hls();
    state.gHls.loadSource(fileURL);
    state.gHls.attachMedia(state.video);
    state.gHls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (!state.gPlayer) {
        state.gPlayer = new Plyr(state.video, playerOptions);
      }
    });
  } else {
    if (!state.gPlayer) {
      state.gPlayer = new Plyr(state.video, playerOptions);
    }
    state.gPlayer.source = {
      type: "video",
      title: state.videoTitle,
      sources: [{ src: fileURL, type: "video/mp4" }],
    };
  }
}

function setCloud(cloudIndex) {
  if (
    cloudIndex < 0 ||
    cloudIndex >= state.tabs.length ||
    cloudIndex >= state.clouds.length
  ) {
    console.error("无效的云索引");
    return;
  }

  state.tabs.forEach((tab, index) => {
    tab.className = index === cloudIndex ? "active" : "";
  });

  state.clouds.forEach((cloud, index) => {
    cloud.style.display = index === cloudIndex ? "flex" : "none";
  });

  state.currentCloudIndex = cloudIndex;
  setSerie(cloudIndex, state.currentSerieIndex);
}

function init() {
  if (!Hls.isSupported()) {
    alert("该浏览器不支持视频流播放，请更换浏览器打开本网站");
    return;
  }

  if (state.tabs.length > 0 && state.clouds.length > 0) {
    setCloud(0);
  }
}

if (state.tabs.length > 0 && state.clouds.length > 0) {
  init();
}
