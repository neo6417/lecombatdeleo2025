export function parseImageContent(content: string): string {
  // Convert standalone image tags to resizable image divs
  return content.replace(
    /<img\s+src="([^"]+)"[^>]*>/g,
    (match, src) => `<div data-type="resizable-image" class="image-align-center" style="width: 100%"><img src="${src}" alt="" style="width: 100%; height: auto;"></div>`
  );
}