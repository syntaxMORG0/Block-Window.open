const toggle = document.getElementById("toggle");

browser.storage.local.get("blockOpen").then((data) => {
  toggle.checked = !!data.blockOpen;
});

toggle.addEventListener("change", () => {
  browser.storage.local.set({ blockOpen: toggle.checked });
  browser.tabs.query({ active: true, currentWindow: true })
    .then(tabs => {
      browser.tabs.sendMessage(tabs[0].id, {
        blockOpen: toggle.checked
      });
    });
});
