// window.addEventListener("load", () => {
//   const url = window.location.href;
//   chrome.storage.local.get([url], (result) => {
//     const highlights = result[url] || [];
//     highlights.forEach(({ text }) => {
//       //   const range = document.createRange();
//       //   const frag = range.createContextualFragment(html);
//       //   document.body.appendChild(frag);
//       highlightText(text);
//     });
//   });
// });

// // Function to highlight the text
// function highlightText(text) {
//   console.log("highlightText");
//   console.log(text);
//   // Get the body of the document
//   const body = document.body;

//   // Create a range object
//   const range = document.createRange();

//   // Get all the text nodes in the document
//   const walker = document.createTreeWalker(
//     body,
//     NodeFilter.SHOW_TEXT,
//     null,
//     false
//   );

//   // Loop through the text nodes
//   while (walker.nextNode()) {
//     const node = walker.currentNode;
//     const nodeText = node.nodeValue;

//     // Find the index of the text in the current text node
//     const index = nodeText.indexOf(text);

//     if (index !== -1) {
//       // If the text is found, set the range
//       range.setStart(node, index);
//       range.setEnd(node, index + text.length);

//       // Create a span element to wrap the text
//       const span = document.createElement("span");
//       span.style.backgroundColor = "yellow"; // Highlight color
//       span.appendChild(range.extractContents());
//       range.insertNode(span);

//       // Stop after the first match
//       break;
//     }
//   }
// }

// // // Call the function with the specific text to highlight
// // highlightText(
// //   'With our "Try it Yourself" editor, you can edit Python code and view the result.'
// // );

// Function to highlight the text
// function highlightText(text) {
//   // Get the body of the document
//   const body = document.body;

//   // Create a range object
//   const range = document.createRange();

//   // Get all the text nodes in the document
//   const walker = document.createTreeWalker(
//     body,
//     NodeFilter.SHOW_TEXT,
//     null,
//     false
//   );

//   // Loop through the text nodes
//   while (walker.nextNode()) {
//     const node = walker.currentNode;
//     let nodeText = node.nodeValue;

//     // While the text is found in the current node
//     while (nodeText.includes(text)) {
//       const index = nodeText.indexOf(text);

//       // If the text is found, set the range
//       range.setStart(node, index);
//       range.setEnd(node, index + text.length);

//       // Create a span element to wrap the text
//       const span = document.createElement("span");
//       span.style.backgroundColor = "yellow"; // Highlight color
//       span.appendChild(range.extractContents());
//       range.insertNode(span);

//       // Move to the next part of the text node (after the highlighted part)
//       nodeText = node.nodeValue;

//       // Update the walker to the new current node
//       walker.currentNode = span.nextSibling;
//     }
//   }
// }

// window.addEventListener("load", () => {
//   const url = window.location.href;
//   chrome.storage.local.get([url], (result) => {
//     const highlights = result[url] || [];
//     highlights.forEach(({ text }) => {
//       highlightText(text);
//     });
//   });
// });

// function highlightText({ text, parentSelector, startOffset, endOffset }) {
//   const parent = document.querySelector(parentSelector);
//   console.log(parent);
//   if (!parent) return;

//   const range = document.createRange();
//   const textNodes = [...parent.childNodes].filter(
//     (node) => node.nodeType === Node.TEXT_NODE
//   );

//   let found = false;
//   textNodes.forEach((node) => {
//     if (found) return;
//     const nodeText = node.textContent;
//     const index = nodeText.indexOf(text);

//     if (
//       index !== -1 &&
//       index === startOffset &&
//       index + text.length === endOffset
//     ) {
//       range.setStart(node, index);
//       range.setEnd(node, index + text.length);
//       const span = document.createElement("span");
//       span.style.backgroundColor = "yellow";
//       span.appendChild(range.extractContents());
//       range.insertNode(span);
//       found = true;
//     }
//   });
// }

// window.addEventListener("load", () => {
//   const url = window.location.href;
//   chrome.storage.local.get([url], (result) => {
//     const highlights = result[url] || [];
//     console.log(highlights);
//     highlights.forEach((highlight) => {
//       highlightText(highlight);
//     });
//   });
// });

function highlightText(parentSelector, text) {
  // Get the parent element using the selector
  console.log(parentSelector);
  const parentElement = document.querySelector(parentSelector);
  console.log(parentElement);

  if (!parentElement) {
    console.error("Parent element not found for selector:", parentSelector);
    return;
  }

  // Create a range object
  const range = document.createRange();

  // Get all the text nodes within the parent element
  const walker = document.createTreeWalker(
    parentElement,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  // Loop through the text nodes
  while (walker.nextNode()) {
    const node = walker.currentNode;
    let nodeText = node.nodeValue;

    // While the text is found in the current node
    while (nodeText.includes(text)) {
      const index = nodeText.indexOf(text);

      // If the text is found, set the range
      range.setStart(node, index);
      range.setEnd(node, index + text.length);

      // Create a span element to wrap the text
      const span = document.createElement("span");
      span.style.backgroundColor = "yellow"; // Highlight color
      span.appendChild(range.extractContents());
      range.insertNode(span);

      // Move to the next part of the text node (after the highlighted part)
      nodeText = node.nodeValue;

      // Update the walker to the new current node
      walker.currentNode = span.nextSibling;
    }
  }
}
// function highlightText(parentSelector, text) {
//   const parentElement = document.querySelector(parentSelector);
//   console.log("Parent Element:", parentElement);

//   if (!parentElement) {
//     console.error("Parent element not found for selector:", parentSelector);
//     return;
//   }

//   // Create a range and a document fragment to operate on text nodes
//   const range = document.createRange();
//   const fragment = document.createDocumentFragment();

//   // Get all the text nodes within the parent element using a TreeWalker
//   const walker = document.createTreeWalker(
//     parentElement,
//     NodeFilter.SHOW_TEXT,
//     {
//       acceptNode: function (node) {
//         // Only accept nodes that contain the text
//         return node.nodeValue.includes(text)
//           ? NodeFilter.FILTER_ACCEPT
//           : NodeFilter.FILTER_REJECT;
//       },
//     },
//     false
//   );

//   let currentNode = walker.nextNode();
//   while (currentNode) {
//     const nodeValue = currentNode.nodeValue;
//     let startIndex = 0;

//     // Multiple occurrences in the same node
//     while ((startIndex = nodeValue.indexOf(text, startIndex)) !== -1) {
//       range.setStart(currentNode, startIndex);
//       range.setEnd(currentNode, startIndex + text.length);

//       const span = document.createElement("span");
//       span.style.backgroundColor = "yellow";
//       span.textContent = text;

//       // Extract and replace the content in the range with the span
//       range.deleteContents();
//       range.insertNode(span);

//       // Move the start index forward and continue the search
//       startIndex += text.length;

//       // Reset the range to capture the next occurrence
//       range.setStartAfter(span);
//       range.setEndAfter(span);
//     }

//     currentNode = walker.nextNode();
//   }
// }

window.addEventListener("load", () => {
  const url = window.location.href;
  chrome.storage.local.get([url], (result) => {
    const highlights = result[url] || [];
    console.log(highlights);
    highlights.forEach(({ parentSelector, text }) => {
      highlightText(parentSelector, text);
    });
  });
});

// document.addEventListener("mouseup", function () {
//   const selectedText = window.getSelection().toString().trim();
//   console.log(selectedText);
//   if (selectedText) {
//     let button = document.createElement("button");
//     button.textContent = "hlo";
//     button.style.position = "fixed";
//     button.style.left = `${event.pageX}px`;
//     button.style.top = `${event.pageY}px`;
//     button.style.zIndex = 1000;
//     document.body.appendChild(button);

//     button.addEventListener("click", function () {
//       chrome.runtime.sendMessage({ text: "send" });
//       document.body.removeChild(button);
//     });
//   }
// });
