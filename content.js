let originalOpen = window.open;

function enableBlock() {
  window.open = function () {
    console.log("window.open blocked");
    return null;
  };
}

function disableBlock() {
  window.open = originalOpen;
}

// Load saved state
browser.storage.local.get("blockOpen").then((data) => {
  if (data.blockOpen) enableBlock();
});

// Listen for toggle changes
browser.runtime.onMessage.addListener((msg) => {
  if (msg.blockOpen) {
    enableBlock();
  } else {
    disableBlock();
  }
});
