chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "highlightText",
    title: "Highlight Selected Text",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "highlightText") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: highlightAndSaveText,
    });
  }
});

// function highlightAndSaveText() {
//   const selection = window.getSelection();
//   if (!selection.rangeCount) return;
//   function generateRandomId() {
//     const characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let result = "";
//     for (let i = 0; i < 6; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       result += characters.charAt(randomIndex);
//     }
//     return result;
//   }
//   const range = selection.getRangeAt(0);
//   const span = document.createElement("span");
//   //   random id
//   const randomId = generateRandomId();
//   span.id = randomId;
//   span.style.backgroundColor = "yellow";
//   span.appendChild(range.extractContents());
//   range.insertNode(span);

//   const highlightedText = span.innerText;
//   const url = window.location.href;

//   const generateSelector = (element) => {
//     if (!element || element.nodeType !== 1) return ""; // Ensure it's an element node
//     let path = "";

//     while (element.parentElement) {
//       const siblings = Array.from(element.parentNode.children).filter(
//         (e) => e.nodeType === 1
//       );
//       const index = siblings.indexOf(element) + 1;

//       const selector = `${element.tagName.toLowerCase()}:nth-child(${index})`;

//       path = ` > ${selector}${path}`;
//       element = element.parentElement;
//     }

//     return `html${path}`; // Start from `html` as the root element
//   };

//   // Example: Generate and save the selector
//   const element = document.querySelector("#" + randomId).parentElement;
//   const selector = generateSelector(element);
//   console.log(selector); // Logs the valid selector

//   // Saving the selector in a variable for reuse
//   localStorage.setItem("savedSelector", selector);

//   // Later, reuse the saved selector
//   const savedSelector = localStorage.getItem("savedSelector");
//   const selectedElement = document.querySelector(savedSelector);
//   console.log(selectedElement); // Logs the selected element

//   //   const parentSelector = generateSelector(span);
//   const startOffset = range.startOffset;
//   const endOffset = range.endOffset;

//   console.log("Saving to storage", selector);
//   chrome.storage.local.get([url], (result) => {
//     const highlights = result[url] || [];
//     highlights.push({
//       text: highlightedText,
//       html: span.outerHTML,
//       parentSelector: selector,
//       startOffset,
//       endOffset,
//     });
//     chrome.storage.local.set({ [url]: highlights });
//   });

//   selection.removeAllRanges();
// }

function highlightAndSaveText() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  function generateRandomId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  // Generate the ID first
  const randomId = generateRandomId();

  // Proceed to create the span element and set the ID
  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.id = randomId;
  span.style.backgroundColor = "yellow";
  span.appendChild(range.extractContents());
  range.insertNode(span);

  const highlightedText = span.innerText;
  const url = window.location.href;

  const generateSelector = (element) => {
    if (!element || element.nodeType !== 1) return ""; // Ensure it's an element node
    let path = "";

    while (element.parentElement) {
      const siblings = Array.from(element.parentNode.children).filter(
        (e) => e.nodeType === 1
      );
      const index = siblings.indexOf(element) + 1;

      const selector = `${element.tagName.toLowerCase()}:nth-child(${index})`;

      path = ` > ${selector}${path}`;
      element = element.parentElement;
    }

    return `html${path}`; // Start from `html` as the root element
  };

  // Generate and save the selector
  console.log(randomId);
  setTimeout(() => {
    console.log(randomId, "sfsadfasdf");
  }, 1000);
  const element = document.querySelector("#" + randomId).parentElement;
  const selector = generateSelector(element);
  console.log(selector); // Logs the valid selector

  // Saving the selector in a variable for reuse
  localStorage.setItem("savedSelector", selector);

  // Later, reuse the saved selector
  const savedSelector = localStorage.getItem("savedSelector");
  const selectedElement = document.querySelector(savedSelector);
  console.log(selectedElement); // Logs the selected element

  const startOffset = range.startOffset;
  const endOffset = range.endOffset;

  console.log("Saving to storage", selector);
  chrome.storage.local.get([url], (result) => {
    const highlights = result[url] || [];
    highlights.push({
      text: highlightedText,
      html: span.outerHTML,
      parentSelector: selector,
      startOffset,
      endOffset,
    });
    chrome.storage.local.set({ [url]: highlights });
  });

  selection.removeAllRanges();
}

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.text) {
//     console.log("hlo");
//     highlightAndSaveText();
//   }
// });
