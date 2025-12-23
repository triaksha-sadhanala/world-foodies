/**
 * Includes HTML content from external fileURLs into elements with the specified attribute
 */
export async function includeHTML() {
  const DATA_INCLUDE_HTML_ATTR = "data-include-html";
  const elements = document.querySelectorAll(`[${DATA_INCLUDE_HTML_ATTR}]`);

  function fetchAllIncludes() {
    return Array.from(elements).map(
      async (element) => {
        const fileURL = element.getAttribute(DATA_INCLUDE_HTML_ATTR);

        try {
          const response = await fetch(fileURL);

          if (!response.ok) {
              throw new Error(`HTTP error: ${response.status}`);
          }

          element.innerHTML = await response.text();

        } catch (error) {

          console.error(`Failed to include "${fileURL}":`, error);
          element.innerHTML = "Content could not be loaded.";

        } finally {
          element.removeAttribute(DATA_INCLUDE_HTML_ATTR);
        }
      }
    )
  }

  // Process all includes in parallel and wait for them to complete
  await Promise.all([...fetchAllIncludes()]);
  return;
}
