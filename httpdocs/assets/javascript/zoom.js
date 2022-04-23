const target = document.querySelector('main')
const padding = 10

var level = 1

document.addEventListener('keyup', (event) => {
  if (level !== 1 && event.key === 'Escape') {
    zoom.out()
  }
})

const magnify = (rect, scale) => {
  rect.width = rect.width || 1
  rect.height = rect.height || 1

  // Center the rect within the zoomed viewport
  rect.x -= (window.innerWidth - rect.width * scale) / 2
  rect.y -= (window.innerHeight - rect.height * scale) / 2

  // Reset
  if (scale === 1) {
    target.style.transform = ''
  }
  // Scale
  else {
    const scrollOffset = getScrollOffset()
    target.style.transformOrigin = `${scrollOffset.x}px ${scrollOffset.y}px`
    target.style.transform = `translate(${-rect.x}px, ${-rect.y}px) scale(${scale})`
  }

  level = scale
}

const getScrollOffset = () => ({
  x: window.scrollX !== undefined ? window.scrollX : window.pageXOffset,
  y: window.scrollY !== undefined ? window.scrollY : window.pageYOffset,
})

const zoom = {
  /**
   * Zooms in on either a rectangle or HTML element.
   *
   * @param {Object} options
   *   - element: HTML element to zoom in on
   *   OR
   *   - x/y: coordinates in non-transformed space to zoom in on
   *   - width/height: the portion of the screen to zoom in on
   *   - scale: can be used instead of width/height to explicitly set scale
   */
  to: (options) => {
    // Due to an implementation limitation we can't zoom in
    // to another element without zooming out first
    if (level !== 1) {
      zoom.out()
    } else {
      options.x = options.x || 0
      options.y = options.y || 0

      // If an element is set, that takes precedence
      if (Boolean(options.element)) {
        // Space around the zoomed in element to leave on screen
        const bounds = options.element.getBoundingClientRect()

        options.x = bounds.left - padding
        options.y = bounds.top - padding
        options.width = bounds.width + padding * 2
        options.height = bounds.height + padding * 2
      }

      // If width/height values are set, calculate scale from those values
      if (options.width !== undefined && options.height !== undefined) {
        options.scale = Math.max(
          Math.min(
            window.innerWidth / options.width,
            window.innerHeight / options.height
          ),
          1
        )
      }

      if (options.scale > 1) {
        options.x *= options.scale
        options.y *= options.scale

        magnify(options, options.scale)
      }
    }
  },

  /**
   * Resets the document zoom state to its default.
   */
  out: () => {
    magnify({ x: 0, y: 0 }, 1)
    level = 1
  },
}

export { zoom }
