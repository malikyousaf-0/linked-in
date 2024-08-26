document.addEventListener("DOMContentLoaded", () => {
  const highlightsList = document.getElementById("highlightsList");

  chrome.storage.local.get(null, (items) => {
    for (const [url, highlights] of Object.entries(items)) {
      highlights.forEach((highlight) => {
        const li = document.createElement("li");

        const textSpan = document.createElement("span");
        textSpan.textContent = `${highlight.text} - ${url}`;
        li.appendChild(textSpan);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => {
          deleteHighlight(url, highlight.text);
        });
        li.appendChild(deleteBtn);

        highlightsList.appendChild(li);
      });
    }
  });
});

function deleteHighlight(url, text) {
  chrome.storage.local.get(url, (data) => {
    if (data[url]) {
      const updatedHighlights = data[url].filter(
        (highlight) => highlight.text !== text
      );
      if (updatedHighlights.length > 0) {
        chrome.storage.local.set({ [url]: updatedHighlights });
      } else {
        chrome.storage.local.remove(url);
      }
      window.location.reload(); // Refresh the popup to reflect changes
    }
  });
}
