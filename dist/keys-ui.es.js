var qg = Object.defineProperty;
var Rg = (r, e, t) => e in r ? qg(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var _ = (r, e, t) => Rg(r, typeof e != "symbol" ? e + "" : e, t);
const Er = class Er {
  constructor() {
    this.initialized = !1, this.stateManager = /* @__PURE__ */ new Map();
  }
  /**
   * Singleton pattern implementation
   * Automatically handles instance management based on class name
   */
  static getInstance() {
    const e = this.name;
    return Er.instances.has(e) || Er.instances.set(e, new this()), Er.instances.get(e);
  }
  /**
   * Standardized initialization flow
   * Prevents double initialization and provides lifecycle hooks
   */
  init() {
    var e, t, n;
    this.initialized || ((e = this.onBeforeInit) == null || e.call(this), this.bindEventListeners(), this.initializeElements(), (t = this.setupDynamicObserver) == null || t.call(this), (n = this.onAfterInit) == null || n.call(this), this.initialized = !0);
  }
  /**
   * Standardized cleanup and destroy
   * Handles state cleanup and provides extension point
   */
  destroy() {
    var e;
    (e = this.onDestroy) == null || e.call(this), this.stateManager.clear(), this.initialized = !1;
  }
  /**
   * State management utilities
   * Common operations used across multiple action classes
   */
  getState(e) {
    return this.stateManager.get(e);
  }
  setState(e, t) {
    this.stateManager.set(e, t);
  }
  removeState(e) {
    return this.stateManager.delete(e);
  }
  hasState(e) {
    return this.stateManager.has(e);
  }
  clearAllStates() {
    this.stateManager.clear();
  }
  getAllStates() {
    return new Map(this.stateManager);
  }
  /**
   * Common utility methods used across action classes
   * Note: For DOM operations use DOMUtils, for events use EventUtils
   */
  /**
   * Common MutationObserver setup for dynamic content
   * Used by many action classes to detect new elements
   */
  createDynamicObserver(e) {
    const t = new MutationObserver((n) => {
      n.forEach((i) => {
        i.addedNodes.length > 0 && e(i.addedNodes);
      });
    });
    return t.observe(document.body, {
      childList: !0,
      subtree: !0
    }), t;
  }
  /**
   * Debounced resize handler utility
   * Used by positioning-aware components
   */
  createResizeHandler(e, t = 100) {
    let n = null;
    return () => {
      n && clearTimeout(n), n = setTimeout(e, t);
    };
  }
  /**
   * Check if the action class is properly initialized
   */
  isInitialized() {
    return this.initialized;
  }
  /**
   * Get the number of managed states
   * Useful for debugging and testing
   */
  getStateCount() {
    return this.stateManager.size;
  }
};
Er.instances = /* @__PURE__ */ new Map();
let ne = Er;
class v {
  /**
   * Safely find the closest ancestor element matching selector
   */
  static findClosest(e, t) {
    return !e || !(e instanceof Element) ? null : e.closest(t) || null;
  }
  /**
   * Find closest element with data attribute
   */
  static findClosestWithData(e, t) {
    return (e == null ? void 0 : e.closest(`[data-${t}]`)) || null;
  }
  /**
   * Safely query selector within element or document
   */
  static querySelector(e, t) {
    return (t || document).querySelector(e) || null;
  }
  /**
   * Safely query all elements matching selector
   */
  static querySelectorAll(e, t) {
    const n = t || document;
    return Array.from(n.querySelectorAll(e));
  }
  /**
   * Find elements with specific data attribute
   */
  static findByDataAttribute(e, t, n) {
    const i = t ? `[data-${e}="${t}"]` : `[data-${e}]`;
    return this.querySelectorAll(i, n);
  }
  /**
   * Find single element with data attribute
   */
  static findFirstByDataAttribute(e, t, n) {
    const i = t ? `[data-${e}="${t}"]` : `[data-${e}]`;
    return this.querySelector(i, n);
  }
  /**
   * Check if element has data attribute with optional value
   */
  static hasDataAttribute(e, t, n) {
    if (!e) return !1;
    const i = e.dataset[t];
    return n !== void 0 ? i === n : i !== void 0;
  }
  /**
   * Get data attribute value safely
   */
  static getDataAttribute(e, t) {
    return e == null ? void 0 : e.dataset[t];
  }
  /**
   * Set data attribute safely
   */
  static setDataAttribute(e, t, n) {
    e && (e.dataset[t] = n);
  }
  /**
   * Remove data attribute safely
   */
  static removeDataAttribute(e, t) {
    e && delete e.dataset[t];
  }
  /**
   * Check if element is disabled (multiple ways)
   */
  static isDisabled(e) {
    return e ? e.hasAttribute("disabled") || e.dataset.disabled === "true" || e.getAttribute("aria-disabled") === "true" : !0;
  }
  /**
   * Check if element is hidden
   */
  static isHidden(e) {
    return e ? e.hidden || e.style.display === "none" || e.getAttribute("aria-hidden") === "true" || !e.offsetParent : !0;
  }
  /**
   * Find form element (input/textarea) within container
   */
  static findFormElement(e) {
    return (e == null ? void 0 : e.querySelector("input, textarea")) || null;
  }
  /**
   * Find form element associated with action button
   */
  static findFormElementForAction(e) {
    let t = this.findClosest(e, '[data-input-actions="true"]');
    if (t && (t.tagName.toLowerCase() === "input" || t.tagName.toLowerCase() === "textarea"))
      return t;
    if (t = this.findClosest(e, '*:has(input[data-input-actions="true"]), *:has(textarea[data-input-actions="true"])'), t) {
      const i = this.findFormElement(t);
      if (i)
        return i;
    }
    let n = e.parentElement;
    for (; n; ) {
      const i = this.findFormElement(n);
      if (i)
        return i;
      n = n.parentElement;
    }
    return null;
  }
  /**
   * Get element by ID safely
   */
  static getElementById(e) {
    return document.getElementById(e) || null;
  }
  /**
   * Check if element matches selector
   */
  static matches(e, t) {
    var n;
    return ((n = e == null ? void 0 : e.matches) == null ? void 0 : n.call(e, t)) ?? !1;
  }
  /**
   * Find all child elements matching selector
   */
  static findChildren(e, t) {
    return e ? Array.from(e.children).filter(
      (n) => this.matches(n, t)
    ) : [];
  }
  /**
   * Get next sibling element matching selector
   */
  static getNextSibling(e, t) {
    let n = e == null ? void 0 : e.nextElementSibling;
    for (; n; ) {
      if (!t || this.matches(n, t))
        return n;
      n = n.nextElementSibling;
    }
    return null;
  }
  /**
   * Get previous sibling element matching selector
   */
  static getPreviousSibling(e, t) {
    let n = e == null ? void 0 : e.previousElementSibling;
    for (; n; ) {
      if (!t || this.matches(n, t))
        return n;
      n = n.previousElementSibling;
    }
    return null;
  }
  /**
   * Add class safely
   */
  static addClass(e, t) {
    e == null || e.classList.add(t);
  }
  /**
   * Remove class safely
   */
  static removeClass(e, t) {
    e == null || e.classList.remove(t);
  }
  /**
   * Toggle class safely
   */
  static toggleClass(e, t, n) {
    return (e == null ? void 0 : e.classList.toggle(t, n)) ?? !1;
  }
  /**
   * Check if element has class
   */
  static hasClass(e, t) {
    return (e == null ? void 0 : e.classList.contains(t)) ?? !1;
  }
  /**
   * Remove multiple classes safely
   */
  static removeClasses(e, t) {
    e && e.classList.remove(...t);
  }
  /**
   * Add multiple classes safely
   */
  static addClasses(e, t) {
    e && e.classList.add(...t);
  }
  /**
   * Set or remove attribute based on condition
   */
  static toggleAttribute(e, t, n) {
    e && (n !== void 0 ? e.setAttribute(t, n) : e.removeAttribute(t));
  }
  /**
   * Get element's computed style property
   */
  static getComputedStyle(e, t) {
    return e ? window.getComputedStyle(e).getPropertyValue(t) : "";
  }
  /**
   * Check if element is visible in viewport
   */
  static isInViewport(e) {
    if (!e) return !1;
    const t = e.getBoundingClientRect();
    return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
  /**
   * Get element's offset relative to document
   */
  static getElementOffset(e) {
    if (!e) return { top: 0, left: 0 };
    const t = e.getBoundingClientRect();
    return {
      top: t.top + window.pageYOffset,
      left: t.left + window.pageXOffset
    };
  }
  /**
   * Focus element safely with optional delay
   */
  static focus(e, t) {
    e && (t ? setTimeout(() => e.focus(), t) : e.focus());
  }
  /**
   * Scroll element into view safely
   */
  static scrollIntoView(e, t) {
    e && e.scrollIntoView(t || { block: "nearest" });
  }
  /**
   * Remove element from DOM safely
   */
  static removeElement(e) {
    e && e.parentNode && e.parentNode.removeChild(e);
  }
  /**
   * Create element with optional classes and attributes
   */
  static createElement(e, t) {
    const n = document.createElement(e);
    return t != null && t.classes && n.classList.add(...t.classes), t != null && t.attributes && Object.entries(t.attributes).forEach(([i, s]) => {
      n.setAttribute(i, s);
    }), t != null && t.textContent && (n.textContent = t.textContent), t != null && t.innerHTML && (n.innerHTML = t.innerHTML), n;
  }
}
class I {
  /**
   * Create and dispatch custom event
   */
  static dispatchCustomEvent(e, t, n, i) {
    const s = new CustomEvent(t, {
      detail: n,
      bubbles: (i == null ? void 0 : i.bubbles) ?? !0,
      cancelable: (i == null ? void 0 : i.cancelable) ?? !0
    });
    return e.dispatchEvent(s);
  }
  /**
   * Add event listener with automatic cleanup tracking
   */
  static addEventListener(e, t, n, i) {
    return e.addEventListener(t, n, i), () => {
      e.removeEventListener(t, n, i);
    };
  }
  /**
   * Handle generic events with delegation
   */
  static handleDelegatedEvent(e, t, n, i) {
    const s = i || document, a = (o) => {
      const l = o.target;
      let c = null;
      l instanceof Element && (c = l.closest(t)), c && n(c, o);
    };
    return this.addEventListener(s, e, a);
  }
  /**
   * Handle click events with delegation
   */
  static handleDelegatedClick(e, t, n) {
    const i = n || document, s = (a) => {
      const o = a, l = o.target;
      let c = null;
      l instanceof Element && (c = l.closest(e)), c && t(c, o);
    };
    return this.addEventListener(i, "click", s);
  }
  /**
   * Handle keydown events with delegation
   */
  static handleDelegatedKeydown(e, t, n) {
    const i = n || document, s = (a) => {
      const o = a, l = o.target;
      let c = null;
      l instanceof Element && (c = l.closest(e)), c && t(c, o);
    };
    return this.addEventListener(i, "keydown", s);
  }
  /**
   * Handle specific key presses
   */
  static handleKeyPress(e, t, n) {
    return (i) => {
      e.includes(i.key) && (n != null && n.preventDefault && i.preventDefault(), n != null && n.stopPropagation && i.stopPropagation(), t(i.key, i));
    };
  }
  /**
   * Handle input events with delegation
   */
  static handleDelegatedInput(e, t, n) {
    const i = n || document, s = (a) => {
      const o = a, l = o.target;
      let c = null;
      l instanceof Element && (c = l.closest(e)), c && t(c, o);
    };
    return this.addEventListener(i, "input", s);
  }
  /**
   * Handle change events with delegation
   */
  static handleDelegatedChange(e, t, n) {
    const i = n || document, s = (a) => {
      const o = a.target;
      let l = null;
      o instanceof Element && (l = o.closest(e)), l && t(l, a);
    };
    return this.addEventListener(i, "change", s);
  }
  /**
   * Handle focus events with delegation
   */
  static handleDelegatedFocus(e, t, n) {
    const i = n || document, s = (a) => {
      const o = a, l = o.target;
      let c = null;
      l instanceof Element && (c = l.closest(e)), c && t(c, o);
    };
    return this.addEventListener(i, "focusin", s);
  }
  /**
   * Create debounced event handler
   */
  static debounce(e, t) {
    let n = null;
    return (...i) => {
      n && clearTimeout(n), n = setTimeout(() => {
        e(...i);
      }, t);
    };
  }
  /**
   * Create throttled event handler
   */
  static throttle(e, t) {
    let n = !1;
    return (...i) => {
      n || (e(...i), n = !0, setTimeout(() => {
        n = !1;
      }, t));
    };
  }
  /**
   * Handle window resize with debouncing
   */
  static handleResize(e, t = 100) {
    const n = this.debounce(e, t);
    return this.addEventListener(window, "resize", n);
  }
  /**
   * Handle click outside element
   */
  static handleClickOutside(e, t) {
    const n = (i) => {
      const s = i, a = s.target;
      e.contains(a) || t(s);
    };
    return this.addEventListener(document, "click", n);
  }
  /**
   * Handle escape key globally
   */
  static handleEscape(e) {
    const t = this.handleKeyPress(["Escape"], (n, i) => e(i));
    return this.addEventListener(document, "keydown", (n) => t(n));
  }
  /**
   * Prevent default and stop propagation helper
   */
  static preventAndStop(e) {
    e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
  }
  /**
   * Check if event should be handled (not disabled/hidden)
   */
  static shouldHandleEvent(e) {
    return !e.hasAttribute("disabled") && e.dataset.disabled !== "true" && e.getAttribute("aria-disabled") !== "true" && e.offsetParent !== null;
  }
  /**
   * Handle form submission with validation
   */
  static handleFormSubmission(e, t, n) {
    const i = (s) => {
      const a = s;
      if (n && !n(e)) {
        s.preventDefault();
        return;
      }
      const o = new FormData(e);
      t(o, a);
    };
    return this.addEventListener(e, "submit", i);
  }
  /**
   * Create event cleanup manager
   */
  static createCleanupManager() {
    const e = [];
    return {
      add: (t) => {
        e.push(t);
      },
      cleanup: () => {
        e.forEach((t) => t()), e.length = 0;
      }
    };
  }
  /**
   * Common keyboard navigation handler
   */
  static createNavigationHandler(e) {
    return (t) => {
      var s, a, o, l, c, d, f, h, g, m, b;
      const { key: n } = t, i = ((s = e.preventDefault) == null ? void 0 : s.includes(n)) ?? !0;
      switch (n) {
        case "ArrowUp":
          i && t.preventDefault(), (a = e.onArrowUp) == null || a.call(e);
          break;
        case "ArrowDown":
          i && t.preventDefault(), (o = e.onArrowDown) == null || o.call(e);
          break;
        case "ArrowLeft":
          i && t.preventDefault(), (l = e.onArrowLeft) == null || l.call(e);
          break;
        case "ArrowRight":
          i && t.preventDefault(), (c = e.onArrowRight) == null || c.call(e);
          break;
        case "Enter":
          i && t.preventDefault(), (d = e.onEnter) == null || d.call(e);
          break;
        case " ":
          i && t.preventDefault(), (f = e.onSpace) == null || f.call(e);
          break;
        case "Escape":
          i && t.preventDefault(), (h = e.onEscape) == null || h.call(e);
          break;
        case "Home":
          i && t.preventDefault(), (g = e.onHome) == null || g.call(e);
          break;
        case "End":
          i && t.preventDefault(), (m = e.onEnd) == null || m.call(e);
          break;
        case "Tab":
          (b = e.onTab) == null || b.call(e);
          break;
      }
    };
  }
}
function su(r, e = "") {
  const t = window.KeysUITranslations;
  if (!t)
    return e;
  const n = r.split(".");
  let i = t;
  for (const s of n)
    if (i = i == null ? void 0 : i[s], i === void 0)
      return e;
  return i || e;
}
class Jl extends ne {
  /**
   * Initialize form elements - required by BaseActionClass
   */
  initializeElements() {
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    I.handleDelegatedClick("[data-action] button", (e, t) => {
      t.preventDefault(), this.handleActionClick(e);
    }), I.handleDelegatedKeydown("[data-action] button", (e, t) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleActionClick(e));
    });
  }
  /**
   * Handle action button click
   */
  async handleActionClick(e) {
    const t = v.findClosest(e, "[data-action]"), n = t == null ? void 0 : t.dataset.action;
    if (!n) return;
    const i = v.findFormElementForAction(e);
    if (!i) return;
    const s = n === "password_toggle" ? "toggle-password" : n;
    switch (s) {
      case "clear":
        this.clearValue(i);
        break;
      case "copy":
        await this.copyToClipboard(i, t);
        break;
      case "toggle-password":
        await this.togglePasswordVisibility(i, e, t);
        break;
      case "external":
        this.openExternalUrl(t.dataset.url);
        break;
      default:
        this.handleCustomAction(i, s);
        break;
    }
    this.dispatchActionEvent(i, s);
  }
  /**
   * Swap the icon using CSS classes and data attributes
   */
  async swapButtonIcon(e, t) {
    e.setAttribute("data-current-icon", t), this.updateButtonIconState(e, t);
  }
  /**
   * Update button icon state using Tailwind classes
   */
  updateButtonIconState(e, t) {
    const n = v.querySelector(".button-icon-default", e), i = v.querySelector(".button-icon-toggle", e), s = v.querySelector(".button-icon-success", e), a = e.dataset.iconDefault, o = e.dataset.iconToggle, l = e.dataset.iconSuccess;
    n && (n.classList.remove("opacity-100"), n.classList.add("opacity-0")), i && (i.classList.remove("opacity-100", "scale-110", "scale-90"), i.classList.add("opacity-0")), s && (s.classList.remove("opacity-100", "scale-110", "scale-90"), s.classList.add("opacity-0")), t === a && n ? (n.classList.remove("opacity-0"), n.classList.add("opacity-100")) : t === o && i ? (i.classList.remove("opacity-0"), i.classList.add("opacity-100")) : t === l && s && (s.classList.remove("opacity-0"), s.classList.add("opacity-100", "scale-110"));
  }
  /**
   * Animate icon success feedback using Tailwind classes
   */
  animateIconSuccess(e) {
    e.classList.add("scale-110"), setTimeout(() => {
      e.classList.remove("scale-110"), e.classList.add("scale-90"), setTimeout(() => {
        e.classList.remove("scale-90");
      }, 150);
    }, 150);
  }
  /**
   * Clear form element value
   */
  clearValue(e) {
    e.value = "", e.focus(), e.dispatchEvent(new Event("input", { bubbles: !0 })), e.dispatchEvent(new Event("change", { bubbles: !0 }));
  }
  /**
   * Copy form element value to clipboard
   */
  async copyToClipboard(e, t) {
    const n = v.querySelector("button", t);
    try {
      await navigator.clipboard.writeText(e.value), this.showFeedback(e, su("feedback.copied_clipboard", "Copied to clipboard"), "success"), n && await this.showCopySuccess(n, t);
    } catch {
      this.fallbackCopyToClipboard(e, t);
    }
  }
  /**
   * Fallback copy method for older browsers
   */
  fallbackCopyToClipboard(e, t) {
    const n = v.querySelector("button", t);
    e.select(), e instanceof HTMLInputElement && e.setSelectionRange(0, 99999);
    try {
      document.execCommand("copy"), this.showFeedback(e, su("feedback.copied_clipboard", "Copied to clipboard"), "success"), n && this.showCopySuccess(n, t);
    } catch {
      this.showFeedback(e, "Copy failed", "error");
    }
  }
  /**
   * Show copy success visual feedback
   */
  async showCopySuccess(e, t) {
    const n = e.dataset.iconSuccess, i = e.dataset.labelSuccess, s = e.dataset.iconDefault, a = v.querySelector(".sr-only", e);
    if (n && s)
      if (await this.swapButtonIcon(e, n), i && a) {
        const o = a.textContent;
        a.textContent = i, setTimeout(async () => {
          await this.swapButtonIcon(e, s), o && a && (a.textContent = o);
        }, 2e3);
      } else
        setTimeout(async () => {
          await this.swapButtonIcon(e, s);
        }, 2e3);
  }
  /**
   * Toggle password visibility
   */
  async togglePasswordVisibility(e, t, n) {
    var f;
    const i = e.type === "password", s = i ? "text" : "password", a = t.dataset.iconDefault, o = t.dataset.iconToggle, l = (f = v.querySelector(".sr-only", t)) == null ? void 0 : f.textContent, c = t.dataset.labelToggle;
    e.type = s;
    const d = v.querySelector(".sr-only", t);
    i ? (o && await this.swapButtonIcon(t, o), c && d && (d.textContent = c), t.setAttribute("aria-label", c || "Hide password")) : (a && await this.swapButtonIcon(t, a), l && d && (d.textContent = l), t.setAttribute("aria-label", l || "Show password"));
  }
  /**
   * Open external URL in new tab
   */
  openExternalUrl(e) {
    if (e)
      try {
        window.open(e, "_blank", "noopener,noreferrer");
      } catch (t) {
        console.error("Failed to open external URL:", t);
      }
  }
  /**
   * Handle custom actions
   */
  handleCustomAction(e, t) {
  }
  /**
   * Dispatch custom event for action
   */
  dispatchActionEvent(e, t) {
    I.dispatchCustomEvent(e, "form-action", {
      element: e,
      action: t,
      value: e.value
    });
  }
  /**
   * Show temporary feedback message
   */
  showFeedback(e, t, n = "success") {
    const i = document.createElement("div");
    i.className = `absolute top-full left-0 mt-1 px-2 py-1 text-xs rounded shadow-lg z-10 pointer-events-none ${n === "success" ? "bg-success text-white" : "bg-danger text-white"}`, i.textContent = t;
    const s = v.findClosest(e, ".relative");
    s && (s.appendChild(i), setTimeout(() => {
      i.parentNode && i.parentNode.removeChild(i);
    }, 2e3));
  }
  /**
   * Add a custom action handler with automatic cleanup
   */
  addActionHandler(e, t) {
    return I.addEventListener(document, "form-action", (n) => {
      const i = n;
      i.detail.action === e && t(i.detail.element);
    });
  }
  /**
   * Clean up FormActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
Jl.getInstance();
class ec extends ne {
  /**
   * Initialize textarea elements - required by BaseActionClass
   */
  initializeElements() {
    this.initializeAutoResize(), this.initializeCharacterCounts();
  }
  /**
   * Bind event listeners - required by BaseActionClass
   */
  bindEventListeners() {
    I.handleDelegatedEvent("input", 'textarea[data-auto-resize="true"]', (e) => {
      this.handleAutoResize(e);
    }), I.handleDelegatedEvent("input", 'textarea[data-show-character-count="true"]', (e) => {
      this.updateCharacterCount(e);
    }), I.handleDelegatedEvent("paste", 'textarea[data-show-character-count="true"]', (e) => {
      setTimeout(() => {
        this.updateCharacterCount(e);
      }, 0);
    }), I.handleDelegatedEvent("cut", 'textarea[data-show-character-count="true"]', (e) => {
      setTimeout(() => {
        this.updateCharacterCount(e);
      }, 0);
    });
  }
  /**
   * Initialize auto-resize functionality for existing textareas
   */
  initializeAutoResize() {
    v.querySelectorAll('textarea[data-auto-resize="true"]').forEach((t) => {
      this.setupAutoResize(t);
    });
  }
  /**
   * Initialize character count displays for existing textareas
   */
  initializeCharacterCounts() {
    v.querySelectorAll('textarea[data-show-character-count="true"]').forEach((t) => {
      this.updateCharacterCount(t);
    });
  }
  /**
   * Setup auto-resize for a textarea element
   */
  setupAutoResize(e) {
    const t = parseInt(e.getAttribute("rows") || "3"), n = this.getLineHeight(e), i = this.getVerticalPadding(e), s = t * n + i;
    e.style.minHeight = `${s}px`, e.style.resize = "none", e.style.overflow = "hidden", this.handleAutoResize(e);
  }
  /**
   * Handle auto-resize for textarea
   */
  handleAutoResize(e) {
    e.style.height = "auto";
    const t = e.scrollHeight, n = parseInt(e.style.minHeight || "0"), i = Math.max(t, n);
    e.style.height = `${i}px`, this.dispatchResizeEvent(e, i);
  }
  /**
   * Update character count display
   */
  updateCharacterCount(e) {
    const t = e.id || e.name;
    if (!t) return;
    const n = v.querySelector(`[data-character-count][data-target-id="${t}"]`);
    if (!n) return;
    const i = e.value.length, s = parseInt(n.dataset.maxLength || "0") || null, a = v.querySelector("[data-current-count]", n);
    a && (a.textContent = i.toString()), this.applyCharacterCountFeedback(n, e, i, s), this.dispatchCharacterCountEvent(e, i, s);
  }
  /**
   * Apply visual feedback for character count
   */
  applyCharacterCountFeedback(e, t, n, i) {
    if (!i) return;
    e.classList.remove("text-text-muted", "text-warning", "text-danger"), t.classList.remove("border-warning", "border-danger", "focus:border-warning", "focus:border-danger", "focus:ring-warning", "focus:ring-danger");
    const s = n / i * 100;
    n > i ? (e.classList.add("text-danger"), t.classList.add("border-danger", "focus:border-danger", "focus:ring-danger")) : s >= 90 ? (e.classList.add("text-warning"), t.classList.add("border-warning", "focus:border-warning", "focus:ring-warning")) : e.classList.add("text-text-muted");
  }
  /**
   * Get line height for textarea
   */
  getLineHeight(e) {
    const t = window.getComputedStyle(e), n = t.lineHeight;
    return n === "normal" ? parseFloat(t.fontSize) * 1.2 : parseFloat(n);
  }
  /**
   * Get vertical padding for textarea
   */
  getVerticalPadding(e) {
    const t = window.getComputedStyle(e), n = parseFloat(t.paddingTop), i = parseFloat(t.paddingBottom), s = parseFloat(t.borderTopWidth), a = parseFloat(t.borderBottomWidth);
    return n + i + s + a;
  }
  /**
   * Dispatch resize event
   */
  dispatchResizeEvent(e, t) {
    I.dispatchCustomEvent(e, "textarea-resize", {
      element: e,
      height: t
    });
  }
  /**
   * Dispatch character count event
   */
  dispatchCharacterCountEvent(e, t, n) {
    I.dispatchCustomEvent(e, "textarea-character-count", {
      element: e,
      currentLength: t,
      maxLength: n || void 0
    });
  }
  /**
   * Add a custom resize handler with automatic cleanup
   */
  addResizeHandler(e) {
    return I.addEventListener(document, "textarea-resize", (t) => {
      const n = t;
      e(n.detail.element, n.detail.height);
    });
  }
  /**
   * Add a custom character count handler with automatic cleanup
   */
  addCharacterCountHandler(e) {
    return I.addEventListener(document, "textarea-character-count", (t) => {
      e(t.detail);
    });
  }
  /**
   * Clean up TextareaActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = void 0);
  }
  /**
   * Manually trigger auto-resize for a specific textarea
   */
  triggerAutoResize(e) {
    e.dataset.autoResize === "true" && this.handleAutoResize(e);
  }
  /**
   * Manually trigger character count update for a specific textarea
   */
  triggerCharacterCountUpdate(e) {
    e.dataset.showCharacterCount === "true" && this.updateCharacterCount(e);
  }
}
ec.getInstance();
var xh = typeof global == "object" && global && global.Object === Object && global, zg = typeof self == "object" && self && self.Object === Object && self, Kt = xh || zg || Function("return this")(), Sn = Kt.Symbol, Sh = Object.prototype, Pg = Sh.hasOwnProperty, Bg = Sh.toString, mi = Sn ? Sn.toStringTag : void 0;
function Fg(r) {
  var e = Pg.call(r, mi), t = r[mi];
  try {
    r[mi] = void 0;
    var n = !0;
  } catch {
  }
  var i = Bg.call(r);
  return n && (e ? r[mi] = t : delete r[mi]), i;
}
var $g = Object.prototype, jg = $g.toString;
function Ug(r) {
  return jg.call(r);
}
var Hg = "[object Null]", Vg = "[object Undefined]", au = Sn ? Sn.toStringTag : void 0;
function Gr(r) {
  return r == null ? r === void 0 ? Vg : Hg : au && au in Object(r) ? Fg(r) : Ug(r);
}
function rn(r) {
  return r != null && typeof r == "object";
}
var Hn = Array.isArray;
function Tn(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
function Ah(r) {
  return r;
}
var Yg = "[object AsyncFunction]", Kg = "[object Function]", Gg = "[object GeneratorFunction]", Wg = "[object Proxy]";
function tc(r) {
  if (!Tn(r))
    return !1;
  var e = Gr(r);
  return e == Kg || e == Gg || e == Yg || e == Wg;
}
var Ao = Kt["__core-js_shared__"], ou = function() {
  var r = /[^.]+$/.exec(Ao && Ao.keys && Ao.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function Zg(r) {
  return !!ou && ou in r;
}
var Xg = Function.prototype, Qg = Xg.toString;
function Wn(r) {
  if (r != null) {
    try {
      return Qg.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
var Jg = /[\\^$.*+?()[\]{}|]/g, em = /^\[object .+?Constructor\]$/, tm = Function.prototype, nm = Object.prototype, rm = tm.toString, im = nm.hasOwnProperty, sm = RegExp(
  "^" + rm.call(im).replace(Jg, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function am(r) {
  if (!Tn(r) || Zg(r))
    return !1;
  var e = tc(r) ? sm : em;
  return e.test(Wn(r));
}
function om(r, e) {
  return r == null ? void 0 : r[e];
}
function Zn(r, e) {
  var t = om(r, e);
  return am(t) ? t : void 0;
}
var ll = Zn(Kt, "WeakMap"), lu = Object.create, lm = /* @__PURE__ */ function() {
  function r() {
  }
  return function(e) {
    if (!Tn(e))
      return {};
    if (lu)
      return lu(e);
    r.prototype = e;
    var t = new r();
    return r.prototype = void 0, t;
  };
}();
function cm(r, e, t) {
  switch (t.length) {
    case 0:
      return r.call(e);
    case 1:
      return r.call(e, t[0]);
    case 2:
      return r.call(e, t[0], t[1]);
    case 3:
      return r.call(e, t[0], t[1], t[2]);
  }
  return r.apply(e, t);
}
function um(r, e) {
  var t = -1, n = r.length;
  for (e || (e = Array(n)); ++t < n; )
    e[t] = r[t];
  return e;
}
var dm = 800, hm = 16, fm = Date.now;
function pm(r) {
  var e = 0, t = 0;
  return function() {
    var n = fm(), i = hm - (n - t);
    if (t = n, i > 0) {
      if (++e >= dm)
        return arguments[0];
    } else
      e = 0;
    return r.apply(void 0, arguments);
  };
}
function gm(r) {
  return function() {
    return r;
  };
}
var Ws = function() {
  try {
    var r = Zn(Object, "defineProperty");
    return r({}, "", {}), r;
  } catch {
  }
}(), mm = Ws ? function(r, e) {
  return Ws(r, "toString", {
    configurable: !0,
    enumerable: !1,
    value: gm(e),
    writable: !0
  });
} : Ah, bm = pm(mm);
function ym(r, e) {
  for (var t = -1, n = r == null ? 0 : r.length; ++t < n && e(r[t], t, r) !== !1; )
    ;
  return r;
}
var vm = 9007199254740991, wm = /^(?:0|[1-9]\d*)$/;
function Eh(r, e) {
  var t = typeof r;
  return e = e ?? vm, !!e && (t == "number" || t != "symbol" && wm.test(r)) && r > -1 && r % 1 == 0 && r < e;
}
function nc(r, e, t) {
  e == "__proto__" && Ws ? Ws(r, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : r[e] = t;
}
function Ki(r, e) {
  return r === e || r !== r && e !== e;
}
var km = Object.prototype, xm = km.hasOwnProperty;
function Ch(r, e, t) {
  var n = r[e];
  (!(xm.call(r, e) && Ki(n, t)) || t === void 0 && !(e in r)) && nc(r, e, t);
}
function Sm(r, e, t, n) {
  var i = !t;
  t || (t = {});
  for (var s = -1, a = e.length; ++s < a; ) {
    var o = e[s], l = void 0;
    l === void 0 && (l = r[o]), i ? nc(t, o, l) : Ch(t, o, l);
  }
  return t;
}
var cu = Math.max;
function Am(r, e, t) {
  return e = cu(e === void 0 ? r.length - 1 : e, 0), function() {
    for (var n = arguments, i = -1, s = cu(n.length - e, 0), a = Array(s); ++i < s; )
      a[i] = n[e + i];
    i = -1;
    for (var o = Array(e + 1); ++i < e; )
      o[i] = n[i];
    return o[e] = t(a), cm(r, this, o);
  };
}
function Em(r, e) {
  return bm(Am(r, e, Ah), r + "");
}
var Cm = 9007199254740991;
function Th(r) {
  return typeof r == "number" && r > -1 && r % 1 == 0 && r <= Cm;
}
function fa(r) {
  return r != null && Th(r.length) && !tc(r);
}
function Tm(r, e, t) {
  if (!Tn(t))
    return !1;
  var n = typeof e;
  return (n == "number" ? fa(t) && Eh(e, t.length) : n == "string" && e in t) ? Ki(t[e], r) : !1;
}
function Lm(r) {
  return Em(function(e, t) {
    var n = -1, i = t.length, s = i > 1 ? t[i - 1] : void 0, a = i > 2 ? t[2] : void 0;
    for (s = r.length > 3 && typeof s == "function" ? (i--, s) : void 0, a && Tm(t[0], t[1], a) && (s = i < 3 ? void 0 : s, i = 1), e = Object(e); ++n < i; ) {
      var o = t[n];
      o && r(e, o, n, s);
    }
    return e;
  });
}
var Dm = Object.prototype;
function rc(r) {
  var e = r && r.constructor, t = typeof e == "function" && e.prototype || Dm;
  return r === t;
}
function Im(r, e) {
  for (var t = -1, n = Array(r); ++t < r; )
    n[t] = e(t);
  return n;
}
var Om = "[object Arguments]";
function uu(r) {
  return rn(r) && Gr(r) == Om;
}
var Lh = Object.prototype, Nm = Lh.hasOwnProperty, Mm = Lh.propertyIsEnumerable, cl = uu(/* @__PURE__ */ function() {
  return arguments;
}()) ? uu : function(r) {
  return rn(r) && Nm.call(r, "callee") && !Mm.call(r, "callee");
};
function _m() {
  return !1;
}
var Dh = typeof exports == "object" && exports && !exports.nodeType && exports, du = Dh && typeof module == "object" && module && !module.nodeType && module, qm = du && du.exports === Dh, hu = qm ? Kt.Buffer : void 0, Rm = hu ? hu.isBuffer : void 0, _i = Rm || _m, zm = "[object Arguments]", Pm = "[object Array]", Bm = "[object Boolean]", Fm = "[object Date]", $m = "[object Error]", jm = "[object Function]", Um = "[object Map]", Hm = "[object Number]", Vm = "[object Object]", Ym = "[object RegExp]", Km = "[object Set]", Gm = "[object String]", Wm = "[object WeakMap]", Zm = "[object ArrayBuffer]", Xm = "[object DataView]", Qm = "[object Float32Array]", Jm = "[object Float64Array]", eb = "[object Int8Array]", tb = "[object Int16Array]", nb = "[object Int32Array]", rb = "[object Uint8Array]", ib = "[object Uint8ClampedArray]", sb = "[object Uint16Array]", ab = "[object Uint32Array]", oe = {};
oe[Qm] = oe[Jm] = oe[eb] = oe[tb] = oe[nb] = oe[rb] = oe[ib] = oe[sb] = oe[ab] = !0;
oe[zm] = oe[Pm] = oe[Zm] = oe[Bm] = oe[Xm] = oe[Fm] = oe[$m] = oe[jm] = oe[Um] = oe[Hm] = oe[Vm] = oe[Ym] = oe[Km] = oe[Gm] = oe[Wm] = !1;
function ob(r) {
  return rn(r) && Th(r.length) && !!oe[Gr(r)];
}
function ic(r) {
  return function(e) {
    return r(e);
  };
}
var Ih = typeof exports == "object" && exports && !exports.nodeType && exports, Ci = Ih && typeof module == "object" && module && !module.nodeType && module, lb = Ci && Ci.exports === Ih, Eo = lb && xh.process, Mr = function() {
  try {
    var r = Ci && Ci.require && Ci.require("util").types;
    return r || Eo && Eo.binding && Eo.binding("util");
  } catch {
  }
}(), fu = Mr && Mr.isTypedArray, sc = fu ? ic(fu) : ob, cb = Object.prototype, ub = cb.hasOwnProperty;
function Oh(r, e) {
  var t = Hn(r), n = !t && cl(r), i = !t && !n && _i(r), s = !t && !n && !i && sc(r), a = t || n || i || s, o = a ? Im(r.length, String) : [], l = o.length;
  for (var c in r)
    (e || ub.call(r, c)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    Eh(c, l))) && o.push(c);
  return o;
}
function Nh(r, e) {
  return function(t) {
    return r(e(t));
  };
}
var db = Nh(Object.keys, Object), hb = Object.prototype, fb = hb.hasOwnProperty;
function pb(r) {
  if (!rc(r))
    return db(r);
  var e = [];
  for (var t in Object(r))
    fb.call(r, t) && t != "constructor" && e.push(t);
  return e;
}
function gb(r) {
  return fa(r) ? Oh(r) : pb(r);
}
function mb(r) {
  var e = [];
  if (r != null)
    for (var t in Object(r))
      e.push(t);
  return e;
}
var bb = Object.prototype, yb = bb.hasOwnProperty;
function vb(r) {
  if (!Tn(r))
    return mb(r);
  var e = rc(r), t = [];
  for (var n in r)
    n == "constructor" && (e || !yb.call(r, n)) || t.push(n);
  return t;
}
function Mh(r) {
  return fa(r) ? Oh(r, !0) : vb(r);
}
var qi = Zn(Object, "create");
function wb() {
  this.__data__ = qi ? qi(null) : {}, this.size = 0;
}
function kb(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
var xb = "__lodash_hash_undefined__", Sb = Object.prototype, Ab = Sb.hasOwnProperty;
function Eb(r) {
  var e = this.__data__;
  if (qi) {
    var t = e[r];
    return t === xb ? void 0 : t;
  }
  return Ab.call(e, r) ? e[r] : void 0;
}
var Cb = Object.prototype, Tb = Cb.hasOwnProperty;
function Lb(r) {
  var e = this.__data__;
  return qi ? e[r] !== void 0 : Tb.call(e, r);
}
var Db = "__lodash_hash_undefined__";
function Ib(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = qi && e === void 0 ? Db : e, this;
}
function Vn(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var n = r[e];
    this.set(n[0], n[1]);
  }
}
Vn.prototype.clear = wb;
Vn.prototype.delete = kb;
Vn.prototype.get = Eb;
Vn.prototype.has = Lb;
Vn.prototype.set = Ib;
function Ob() {
  this.__data__ = [], this.size = 0;
}
function pa(r, e) {
  for (var t = r.length; t--; )
    if (Ki(r[t][0], e))
      return t;
  return -1;
}
var Nb = Array.prototype, Mb = Nb.splice;
function _b(r) {
  var e = this.__data__, t = pa(e, r);
  if (t < 0)
    return !1;
  var n = e.length - 1;
  return t == n ? e.pop() : Mb.call(e, t, 1), --this.size, !0;
}
function qb(r) {
  var e = this.__data__, t = pa(e, r);
  return t < 0 ? void 0 : e[t][1];
}
function Rb(r) {
  return pa(this.__data__, r) > -1;
}
function zb(r, e) {
  var t = this.__data__, n = pa(t, r);
  return n < 0 ? (++this.size, t.push([r, e])) : t[n][1] = e, this;
}
function ln(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var n = r[e];
    this.set(n[0], n[1]);
  }
}
ln.prototype.clear = Ob;
ln.prototype.delete = _b;
ln.prototype.get = qb;
ln.prototype.has = Rb;
ln.prototype.set = zb;
var Ri = Zn(Kt, "Map");
function Pb() {
  this.size = 0, this.__data__ = {
    hash: new Vn(),
    map: new (Ri || ln)(),
    string: new Vn()
  };
}
function Bb(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
function ga(r, e) {
  var t = r.__data__;
  return Bb(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function Fb(r) {
  var e = ga(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
function $b(r) {
  return ga(this, r).get(r);
}
function jb(r) {
  return ga(this, r).has(r);
}
function Ub(r, e) {
  var t = ga(this, r), n = t.size;
  return t.set(r, e), this.size += t.size == n ? 0 : 1, this;
}
function Xn(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var n = r[e];
    this.set(n[0], n[1]);
  }
}
Xn.prototype.clear = Pb;
Xn.prototype.delete = Fb;
Xn.prototype.get = $b;
Xn.prototype.has = jb;
Xn.prototype.set = Ub;
function Hb(r, e) {
  for (var t = -1, n = e.length, i = r.length; ++t < n; )
    r[i + t] = e[t];
  return r;
}
var _h = Nh(Object.getPrototypeOf, Object), Vb = "[object Object]", Yb = Function.prototype, Kb = Object.prototype, qh = Yb.toString, Gb = Kb.hasOwnProperty, Wb = qh.call(Object);
function Zb(r) {
  if (!rn(r) || Gr(r) != Vb)
    return !1;
  var e = _h(r);
  if (e === null)
    return !0;
  var t = Gb.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && qh.call(t) == Wb;
}
function Xb() {
  this.__data__ = new ln(), this.size = 0;
}
function Qb(r) {
  var e = this.__data__, t = e.delete(r);
  return this.size = e.size, t;
}
function Jb(r) {
  return this.__data__.get(r);
}
function ey(r) {
  return this.__data__.has(r);
}
var ty = 200;
function ny(r, e) {
  var t = this.__data__;
  if (t instanceof ln) {
    var n = t.__data__;
    if (!Ri || n.length < ty - 1)
      return n.push([r, e]), this.size = ++t.size, this;
    t = this.__data__ = new Xn(n);
  }
  return t.set(r, e), this.size = t.size, this;
}
function Ft(r) {
  var e = this.__data__ = new ln(r);
  this.size = e.size;
}
Ft.prototype.clear = Xb;
Ft.prototype.delete = Qb;
Ft.prototype.get = Jb;
Ft.prototype.has = ey;
Ft.prototype.set = ny;
var Rh = typeof exports == "object" && exports && !exports.nodeType && exports, pu = Rh && typeof module == "object" && module && !module.nodeType && module, ry = pu && pu.exports === Rh, gu = ry ? Kt.Buffer : void 0, mu = gu ? gu.allocUnsafe : void 0;
function zh(r, e) {
  if (e)
    return r.slice();
  var t = r.length, n = mu ? mu(t) : new r.constructor(t);
  return r.copy(n), n;
}
function iy(r, e) {
  for (var t = -1, n = r == null ? 0 : r.length, i = 0, s = []; ++t < n; ) {
    var a = r[t];
    e(a, t, r) && (s[i++] = a);
  }
  return s;
}
function sy() {
  return [];
}
var ay = Object.prototype, oy = ay.propertyIsEnumerable, bu = Object.getOwnPropertySymbols, ly = bu ? function(r) {
  return r == null ? [] : (r = Object(r), iy(bu(r), function(e) {
    return oy.call(r, e);
  }));
} : sy;
function cy(r, e, t) {
  var n = e(r);
  return Hn(r) ? n : Hb(n, t(r));
}
function ul(r) {
  return cy(r, gb, ly);
}
var dl = Zn(Kt, "DataView"), hl = Zn(Kt, "Promise"), fl = Zn(Kt, "Set"), yu = "[object Map]", uy = "[object Object]", vu = "[object Promise]", wu = "[object Set]", ku = "[object WeakMap]", xu = "[object DataView]", dy = Wn(dl), hy = Wn(Ri), fy = Wn(hl), py = Wn(fl), gy = Wn(ll), gt = Gr;
(dl && gt(new dl(new ArrayBuffer(1))) != xu || Ri && gt(new Ri()) != yu || hl && gt(hl.resolve()) != vu || fl && gt(new fl()) != wu || ll && gt(new ll()) != ku) && (gt = function(r) {
  var e = Gr(r), t = e == uy ? r.constructor : void 0, n = t ? Wn(t) : "";
  if (n)
    switch (n) {
      case dy:
        return xu;
      case hy:
        return yu;
      case fy:
        return vu;
      case py:
        return wu;
      case gy:
        return ku;
    }
  return e;
});
var my = Object.prototype, by = my.hasOwnProperty;
function yy(r) {
  var e = r.length, t = new r.constructor(e);
  return e && typeof r[0] == "string" && by.call(r, "index") && (t.index = r.index, t.input = r.input), t;
}
var Zs = Kt.Uint8Array;
function ac(r) {
  var e = new r.constructor(r.byteLength);
  return new Zs(e).set(new Zs(r)), e;
}
function vy(r, e) {
  var t = ac(r.buffer);
  return new r.constructor(t, r.byteOffset, r.byteLength);
}
var wy = /\w*$/;
function ky(r) {
  var e = new r.constructor(r.source, wy.exec(r));
  return e.lastIndex = r.lastIndex, e;
}
var Su = Sn ? Sn.prototype : void 0, Au = Su ? Su.valueOf : void 0;
function xy(r) {
  return Au ? Object(Au.call(r)) : {};
}
function Ph(r, e) {
  var t = e ? ac(r.buffer) : r.buffer;
  return new r.constructor(t, r.byteOffset, r.length);
}
var Sy = "[object Boolean]", Ay = "[object Date]", Ey = "[object Map]", Cy = "[object Number]", Ty = "[object RegExp]", Ly = "[object Set]", Dy = "[object String]", Iy = "[object Symbol]", Oy = "[object ArrayBuffer]", Ny = "[object DataView]", My = "[object Float32Array]", _y = "[object Float64Array]", qy = "[object Int8Array]", Ry = "[object Int16Array]", zy = "[object Int32Array]", Py = "[object Uint8Array]", By = "[object Uint8ClampedArray]", Fy = "[object Uint16Array]", $y = "[object Uint32Array]";
function jy(r, e, t) {
  var n = r.constructor;
  switch (e) {
    case Oy:
      return ac(r);
    case Sy:
    case Ay:
      return new n(+r);
    case Ny:
      return vy(r);
    case My:
    case _y:
    case qy:
    case Ry:
    case zy:
    case Py:
    case By:
    case Fy:
    case $y:
      return Ph(r, t);
    case Ey:
      return new n();
    case Cy:
    case Dy:
      return new n(r);
    case Ty:
      return ky(r);
    case Ly:
      return new n();
    case Iy:
      return xy(r);
  }
}
function Bh(r) {
  return typeof r.constructor == "function" && !rc(r) ? lm(_h(r)) : {};
}
var Uy = "[object Map]";
function Hy(r) {
  return rn(r) && gt(r) == Uy;
}
var Eu = Mr && Mr.isMap, Vy = Eu ? ic(Eu) : Hy, Yy = "[object Set]";
function Ky(r) {
  return rn(r) && gt(r) == Yy;
}
var Cu = Mr && Mr.isSet, Gy = Cu ? ic(Cu) : Ky, Wy = 1, Fh = "[object Arguments]", Zy = "[object Array]", Xy = "[object Boolean]", Qy = "[object Date]", Jy = "[object Error]", $h = "[object Function]", ev = "[object GeneratorFunction]", tv = "[object Map]", nv = "[object Number]", jh = "[object Object]", rv = "[object RegExp]", iv = "[object Set]", sv = "[object String]", av = "[object Symbol]", ov = "[object WeakMap]", lv = "[object ArrayBuffer]", cv = "[object DataView]", uv = "[object Float32Array]", dv = "[object Float64Array]", hv = "[object Int8Array]", fv = "[object Int16Array]", pv = "[object Int32Array]", gv = "[object Uint8Array]", mv = "[object Uint8ClampedArray]", bv = "[object Uint16Array]", yv = "[object Uint32Array]", se = {};
se[Fh] = se[Zy] = se[lv] = se[cv] = se[Xy] = se[Qy] = se[uv] = se[dv] = se[hv] = se[fv] = se[pv] = se[tv] = se[nv] = se[jh] = se[rv] = se[iv] = se[sv] = se[av] = se[gv] = se[mv] = se[bv] = se[yv] = !0;
se[Jy] = se[$h] = se[ov] = !1;
function Fs(r, e, t, n, i, s) {
  var a, o = e & Wy;
  if (a !== void 0)
    return a;
  if (!Tn(r))
    return r;
  var l = Hn(r);
  if (l)
    a = yy(r);
  else {
    var c = gt(r), d = c == $h || c == ev;
    if (_i(r))
      return zh(r, o);
    if (c == jh || c == Fh || d && !i)
      a = d ? {} : Bh(r);
    else {
      if (!se[c])
        return i ? r : {};
      a = jy(r, c, o);
    }
  }
  s || (s = new Ft());
  var f = s.get(r);
  if (f)
    return f;
  s.set(r, a), Gy(r) ? r.forEach(function(m) {
    a.add(Fs(m, e, t, m, r, s));
  }) : Vy(r) && r.forEach(function(m, b) {
    a.set(b, Fs(m, e, t, b, r, s));
  });
  var h = ul, g = l ? void 0 : h(r);
  return ym(g || r, function(m, b) {
    g && (b = m, m = r[b]), Ch(a, b, Fs(m, e, t, b, r, s));
  }), a;
}
var vv = 1, wv = 4;
function Cr(r) {
  return Fs(r, vv | wv);
}
var kv = "__lodash_hash_undefined__";
function xv(r) {
  return this.__data__.set(r, kv), this;
}
function Sv(r) {
  return this.__data__.has(r);
}
function Xs(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.__data__ = new Xn(); ++e < t; )
    this.add(r[e]);
}
Xs.prototype.add = Xs.prototype.push = xv;
Xs.prototype.has = Sv;
function Av(r, e) {
  for (var t = -1, n = r == null ? 0 : r.length; ++t < n; )
    if (e(r[t], t, r))
      return !0;
  return !1;
}
function Ev(r, e) {
  return r.has(e);
}
var Cv = 1, Tv = 2;
function Uh(r, e, t, n, i, s) {
  var a = t & Cv, o = r.length, l = e.length;
  if (o != l && !(a && l > o))
    return !1;
  var c = s.get(r), d = s.get(e);
  if (c && d)
    return c == e && d == r;
  var f = -1, h = !0, g = t & Tv ? new Xs() : void 0;
  for (s.set(r, e), s.set(e, r); ++f < o; ) {
    var m = r[f], b = e[f];
    if (n)
      var k = a ? n(b, m, f, e, r, s) : n(m, b, f, r, e, s);
    if (k !== void 0) {
      if (k)
        continue;
      h = !1;
      break;
    }
    if (g) {
      if (!Av(e, function(y, S) {
        if (!Ev(g, S) && (m === y || i(m, y, t, n, s)))
          return g.push(S);
      })) {
        h = !1;
        break;
      }
    } else if (!(m === b || i(m, b, t, n, s))) {
      h = !1;
      break;
    }
  }
  return s.delete(r), s.delete(e), h;
}
function Lv(r) {
  var e = -1, t = Array(r.size);
  return r.forEach(function(n, i) {
    t[++e] = [i, n];
  }), t;
}
function Dv(r) {
  var e = -1, t = Array(r.size);
  return r.forEach(function(n) {
    t[++e] = n;
  }), t;
}
var Iv = 1, Ov = 2, Nv = "[object Boolean]", Mv = "[object Date]", _v = "[object Error]", qv = "[object Map]", Rv = "[object Number]", zv = "[object RegExp]", Pv = "[object Set]", Bv = "[object String]", Fv = "[object Symbol]", $v = "[object ArrayBuffer]", jv = "[object DataView]", Tu = Sn ? Sn.prototype : void 0, Co = Tu ? Tu.valueOf : void 0;
function Uv(r, e, t, n, i, s, a) {
  switch (t) {
    case jv:
      if (r.byteLength != e.byteLength || r.byteOffset != e.byteOffset)
        return !1;
      r = r.buffer, e = e.buffer;
    case $v:
      return !(r.byteLength != e.byteLength || !s(new Zs(r), new Zs(e)));
    case Nv:
    case Mv:
    case Rv:
      return Ki(+r, +e);
    case _v:
      return r.name == e.name && r.message == e.message;
    case zv:
    case Bv:
      return r == e + "";
    case qv:
      var o = Lv;
    case Pv:
      var l = n & Iv;
      if (o || (o = Dv), r.size != e.size && !l)
        return !1;
      var c = a.get(r);
      if (c)
        return c == e;
      n |= Ov, a.set(r, e);
      var d = Uh(o(r), o(e), n, i, s, a);
      return a.delete(r), d;
    case Fv:
      if (Co)
        return Co.call(r) == Co.call(e);
  }
  return !1;
}
var Hv = 1, Vv = Object.prototype, Yv = Vv.hasOwnProperty;
function Kv(r, e, t, n, i, s) {
  var a = t & Hv, o = ul(r), l = o.length, c = ul(e), d = c.length;
  if (l != d && !a)
    return !1;
  for (var f = l; f--; ) {
    var h = o[f];
    if (!(a ? h in e : Yv.call(e, h)))
      return !1;
  }
  var g = s.get(r), m = s.get(e);
  if (g && m)
    return g == e && m == r;
  var b = !0;
  s.set(r, e), s.set(e, r);
  for (var k = a; ++f < l; ) {
    h = o[f];
    var y = r[h], S = e[h];
    if (n)
      var E = a ? n(S, y, h, e, r, s) : n(y, S, h, r, e, s);
    if (!(E === void 0 ? y === S || i(y, S, t, n, s) : E)) {
      b = !1;
      break;
    }
    k || (k = h == "constructor");
  }
  if (b && !k) {
    var C = r.constructor, D = e.constructor;
    C != D && "constructor" in r && "constructor" in e && !(typeof C == "function" && C instanceof C && typeof D == "function" && D instanceof D) && (b = !1);
  }
  return s.delete(r), s.delete(e), b;
}
var Gv = 1, Lu = "[object Arguments]", Du = "[object Array]", Es = "[object Object]", Wv = Object.prototype, Iu = Wv.hasOwnProperty;
function Zv(r, e, t, n, i, s) {
  var a = Hn(r), o = Hn(e), l = a ? Du : gt(r), c = o ? Du : gt(e);
  l = l == Lu ? Es : l, c = c == Lu ? Es : c;
  var d = l == Es, f = c == Es, h = l == c;
  if (h && _i(r)) {
    if (!_i(e))
      return !1;
    a = !0, d = !1;
  }
  if (h && !d)
    return s || (s = new Ft()), a || sc(r) ? Uh(r, e, t, n, i, s) : Uv(r, e, l, t, n, i, s);
  if (!(t & Gv)) {
    var g = d && Iu.call(r, "__wrapped__"), m = f && Iu.call(e, "__wrapped__");
    if (g || m) {
      var b = g ? r.value() : r, k = m ? e.value() : e;
      return s || (s = new Ft()), i(b, k, t, n, s);
    }
  }
  return h ? (s || (s = new Ft()), Kv(r, e, t, n, i, s)) : !1;
}
function Hh(r, e, t, n, i) {
  return r === e ? !0 : r == null || e == null || !rn(r) && !rn(e) ? r !== r && e !== e : Zv(r, e, t, n, Hh, i);
}
function Xv(r) {
  return function(e, t, n) {
    for (var i = -1, s = Object(e), a = n(e), o = a.length; o--; ) {
      var l = a[++i];
      if (t(s[l], l, s) === !1)
        break;
    }
    return e;
  };
}
var Qv = Xv();
function pl(r, e, t) {
  (t !== void 0 && !Ki(r[e], t) || t === void 0 && !(e in r)) && nc(r, e, t);
}
function Jv(r) {
  return rn(r) && fa(r);
}
function gl(r, e) {
  if (!(e === "constructor" && typeof r[e] == "function") && e != "__proto__")
    return r[e];
}
function e1(r) {
  return Sm(r, Mh(r));
}
function t1(r, e, t, n, i, s, a) {
  var o = gl(r, t), l = gl(e, t), c = a.get(l);
  if (c) {
    pl(r, t, c);
    return;
  }
  var d = s ? s(o, l, t + "", r, e, a) : void 0, f = d === void 0;
  if (f) {
    var h = Hn(l), g = !h && _i(l), m = !h && !g && sc(l);
    d = l, h || g || m ? Hn(o) ? d = o : Jv(o) ? d = um(o) : g ? (f = !1, d = zh(l, !0)) : m ? (f = !1, d = Ph(l, !0)) : d = [] : Zb(l) || cl(l) ? (d = o, cl(o) ? d = e1(o) : (!Tn(o) || tc(o)) && (d = Bh(l))) : f = !1;
  }
  f && (a.set(l, d), i(d, l, n, s, a), a.delete(l)), pl(r, t, d);
}
function Vh(r, e, t, n, i) {
  r !== e && Qv(e, function(s, a) {
    if (i || (i = new Ft()), Tn(s))
      t1(r, e, a, t, Vh, n, i);
    else {
      var o = n ? n(gl(r, a), s, a + "", r, e, i) : void 0;
      o === void 0 && (o = s), pl(r, a, o);
    }
  }, Mh);
}
function oc(r, e) {
  return Hh(r, e);
}
var xn = Lm(function(r, e, t) {
  Vh(r, e, t);
}), B = /* @__PURE__ */ ((r) => (r[r.TYPE = 3] = "TYPE", r[r.LEVEL = 12] = "LEVEL", r[r.ATTRIBUTE = 13] = "ATTRIBUTE", r[r.BLOT = 14] = "BLOT", r[r.INLINE = 7] = "INLINE", r[r.BLOCK = 11] = "BLOCK", r[r.BLOCK_BLOT = 10] = "BLOCK_BLOT", r[r.INLINE_BLOT = 6] = "INLINE_BLOT", r[r.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", r[r.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", r[r.ANY = 15] = "ANY", r))(B || {});
class jt {
  constructor(e, t, n = {}) {
    this.attrName = e, this.keyName = t;
    const i = B.TYPE & B.ATTRIBUTE;
    this.scope = n.scope != null ? (
      // Ignore type bits, force attribute bit
      n.scope & B.LEVEL | i
    ) : B.ATTRIBUTE, n.whitelist != null && (this.whitelist = n.whitelist);
  }
  static keys(e) {
    return Array.from(e.attributes).map((t) => t.name);
  }
  add(e, t) {
    return this.canAdd(e, t) ? (e.setAttribute(this.keyName, t), !0) : !1;
  }
  canAdd(e, t) {
    return this.whitelist == null ? !0 : typeof t == "string" ? this.whitelist.indexOf(t.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(t) > -1;
  }
  remove(e) {
    e.removeAttribute(this.keyName);
  }
  value(e) {
    const t = e.getAttribute(this.keyName);
    return this.canAdd(e, t) && t ? t : "";
  }
}
class Tr extends Error {
  constructor(e) {
    e = "[Parchment] " + e, super(e), this.message = e, this.name = this.constructor.name;
  }
}
const Yh = class ml {
  constructor() {
    this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
  }
  static find(e, t = !1) {
    if (e == null)
      return null;
    if (this.blots.has(e))
      return this.blots.get(e) || null;
    if (t) {
      let n = null;
      try {
        n = e.parentNode;
      } catch {
        return null;
      }
      return this.find(n, t);
    }
    return null;
  }
  create(e, t, n) {
    const i = this.query(t);
    if (i == null)
      throw new Tr(`Unable to create ${t} blot`);
    const s = i, a = (
      // @ts-expect-error Fix me later
      t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : s.create(n)
    ), o = new s(e, a, n);
    return ml.blots.set(o.domNode, o), o;
  }
  find(e, t = !1) {
    return ml.find(e, t);
  }
  query(e, t = B.ANY) {
    let n;
    return typeof e == "string" ? n = this.types[e] || this.attributes[e] : e instanceof Text || e.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof e == "number" ? e & B.LEVEL & B.BLOCK ? n = this.types.block : e & B.LEVEL & B.INLINE && (n = this.types.inline) : e instanceof Element && ((e.getAttribute("class") || "").split(/\s+/).some((i) => (n = this.classes[i], !!n)), n = n || this.tags[e.tagName]), n == null ? null : "scope" in n && t & B.LEVEL & n.scope && t & B.TYPE & n.scope ? n : null;
  }
  register(...e) {
    return e.map((t) => {
      const n = "blotName" in t, i = "attrName" in t;
      if (!n && !i)
        throw new Tr("Invalid definition");
      if (n && t.blotName === "abstract")
        throw new Tr("Cannot register abstract class");
      const s = n ? t.blotName : i ? t.attrName : void 0;
      return this.types[s] = t, i ? typeof t.keyName == "string" && (this.attributes[t.keyName] = t) : n && (t.className && (this.classes[t.className] = t), t.tagName && (Array.isArray(t.tagName) ? t.tagName = t.tagName.map((a) => a.toUpperCase()) : t.tagName = t.tagName.toUpperCase(), (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((a) => {
        (this.tags[a] == null || t.className == null) && (this.tags[a] = t);
      }))), t;
    });
  }
};
Yh.blots = /* @__PURE__ */ new WeakMap();
let _r = Yh;
function Ou(r, e) {
  return (r.getAttribute("class") || "").split(/\s+/).filter((t) => t.indexOf(`${e}-`) === 0);
}
class n1 extends jt {
  static keys(e) {
    return (e.getAttribute("class") || "").split(/\s+/).map((t) => t.split("-").slice(0, -1).join("-"));
  }
  add(e, t) {
    return this.canAdd(e, t) ? (this.remove(e), e.classList.add(`${this.keyName}-${t}`), !0) : !1;
  }
  remove(e) {
    Ou(e, this.keyName).forEach((t) => {
      e.classList.remove(t);
    }), e.classList.length === 0 && e.removeAttribute("class");
  }
  value(e) {
    const t = (Ou(e, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(e, t) ? t : "";
  }
}
const St = n1;
function To(r) {
  const e = r.split("-"), t = e.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return e[0] + t;
}
class r1 extends jt {
  static keys(e) {
    return (e.getAttribute("style") || "").split(";").map((t) => t.split(":")[0].trim());
  }
  add(e, t) {
    return this.canAdd(e, t) ? (e.style[To(this.keyName)] = t, !0) : !1;
  }
  remove(e) {
    e.style[To(this.keyName)] = "", e.getAttribute("style") || e.removeAttribute("style");
  }
  value(e) {
    const t = e.style[To(this.keyName)];
    return this.canAdd(e, t) ? t : "";
  }
}
const Ln = r1;
class i1 {
  constructor(e) {
    this.attributes = {}, this.domNode = e, this.build();
  }
  attribute(e, t) {
    t ? e.add(this.domNode, t) && (e.value(this.domNode) != null ? this.attributes[e.attrName] = e : delete this.attributes[e.attrName]) : (e.remove(this.domNode), delete this.attributes[e.attrName]);
  }
  build() {
    this.attributes = {};
    const e = _r.find(this.domNode);
    if (e == null)
      return;
    const t = jt.keys(this.domNode), n = St.keys(this.domNode), i = Ln.keys(this.domNode);
    t.concat(n).concat(i).forEach((s) => {
      const a = e.scroll.query(s, B.ATTRIBUTE);
      a instanceof jt && (this.attributes[a.attrName] = a);
    });
  }
  copy(e) {
    Object.keys(this.attributes).forEach((t) => {
      const n = this.attributes[t].value(this.domNode);
      e.format(t, n);
    });
  }
  move(e) {
    this.copy(e), Object.keys(this.attributes).forEach((t) => {
      this.attributes[t].remove(this.domNode);
    }), this.attributes = {};
  }
  values() {
    return Object.keys(this.attributes).reduce(
      (e, t) => (e[t] = this.attributes[t].value(this.domNode), e),
      {}
    );
  }
}
const ma = i1, Kh = class {
  constructor(e, t) {
    this.scroll = e, this.domNode = t, _r.blots.set(t, this), this.prev = null, this.next = null;
  }
  static create(e) {
    if (this.tagName == null)
      throw new Tr("Blot definition missing tagName");
    let t, n;
    return Array.isArray(this.tagName) ? (typeof e == "string" ? (n = e.toUpperCase(), parseInt(n, 10).toString() === n && (n = parseInt(n, 10))) : typeof e == "number" && (n = e), typeof n == "number" ? t = document.createElement(this.tagName[n - 1]) : n && this.tagName.indexOf(n) > -1 ? t = document.createElement(n) : t = document.createElement(this.tagName[0])) : t = document.createElement(this.tagName), this.className && t.classList.add(this.className), t;
  }
  // Hack for accessing inherited static methods
  get statics() {
    return this.constructor;
  }
  attach() {
  }
  clone() {
    const e = this.domNode.cloneNode(!1);
    return this.scroll.create(e);
  }
  detach() {
    this.parent != null && this.parent.removeChild(this), _r.blots.delete(this.domNode);
  }
  deleteAt(e, t) {
    this.isolate(e, t).remove();
  }
  formatAt(e, t, n, i) {
    const s = this.isolate(e, t);
    if (this.scroll.query(n, B.BLOT) != null && i)
      s.wrap(n, i);
    else if (this.scroll.query(n, B.ATTRIBUTE) != null) {
      const a = this.scroll.create(this.statics.scope);
      s.wrap(a), a.format(n, i);
    }
  }
  insertAt(e, t, n) {
    const i = n == null ? this.scroll.create("text", t) : this.scroll.create(t, n), s = this.split(e);
    this.parent.insertBefore(i, s || void 0);
  }
  isolate(e, t) {
    const n = this.split(e);
    if (n == null)
      throw new Error("Attempt to isolate at end");
    return n.split(t), n;
  }
  length() {
    return 1;
  }
  offset(e = this.parent) {
    return this.parent == null || this === e ? 0 : this.parent.children.offset(this) + this.parent.offset(e);
  }
  optimize(e) {
    this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer) && this.wrap(this.statics.requiredContainer.blotName);
  }
  remove() {
    this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
  }
  replaceWith(e, t) {
    const n = typeof e == "string" ? this.scroll.create(e, t) : e;
    return this.parent != null && (this.parent.insertBefore(n, this.next || void 0), this.remove()), n;
  }
  split(e, t) {
    return e === 0 ? this : this.next;
  }
  update(e, t) {
  }
  wrap(e, t) {
    const n = typeof e == "string" ? this.scroll.create(e, t) : e;
    if (this.parent != null && this.parent.insertBefore(n, this.next || void 0), typeof n.appendChild != "function")
      throw new Tr(`Cannot wrap ${e}`);
    return n.appendChild(this), n;
  }
};
Kh.blotName = "abstract";
let Gh = Kh;
const Wh = class extends Gh {
  /**
   * Returns the value represented by domNode if it is this Blot's type
   * No checking that domNode can represent this Blot type is required so
   * applications needing it should check externally before calling.
   */
  static value(e) {
    return !0;
  }
  /**
   * Given location represented by node and offset from DOM Selection Range,
   * return index to that location.
   */
  index(e, t) {
    return this.domNode === e || this.domNode.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(t, 1) : -1;
  }
  /**
   * Given index to location within blot, return node and offset representing
   * that location, consumable by DOM Selection Range
   */
  position(e, t) {
    let n = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
    return e > 0 && (n += 1), [this.parent.domNode, n];
  }
  /**
   * Return value represented by this blot
   * Should not change without interaction from API or
   * user change detectable by update()
   */
  value() {
    return {
      [this.statics.blotName]: this.statics.value(this.domNode) || !0
    };
  }
};
Wh.scope = B.INLINE_BLOT;
let s1 = Wh;
const De = s1;
class a1 {
  constructor() {
    this.head = null, this.tail = null, this.length = 0;
  }
  append(...e) {
    if (this.insertBefore(e[0], null), e.length > 1) {
      const t = e.slice(1);
      this.append(...t);
    }
  }
  at(e) {
    const t = this.iterator();
    let n = t();
    for (; n && e > 0; )
      e -= 1, n = t();
    return n;
  }
  contains(e) {
    const t = this.iterator();
    let n = t();
    for (; n; ) {
      if (n === e)
        return !0;
      n = t();
    }
    return !1;
  }
  indexOf(e) {
    const t = this.iterator();
    let n = t(), i = 0;
    for (; n; ) {
      if (n === e)
        return i;
      i += 1, n = t();
    }
    return -1;
  }
  insertBefore(e, t) {
    e != null && (this.remove(e), e.next = t, t != null ? (e.prev = t.prev, t.prev != null && (t.prev.next = e), t.prev = e, t === this.head && (this.head = e)) : this.tail != null ? (this.tail.next = e, e.prev = this.tail, this.tail = e) : (e.prev = null, this.head = this.tail = e), this.length += 1);
  }
  offset(e) {
    let t = 0, n = this.head;
    for (; n != null; ) {
      if (n === e)
        return t;
      t += n.length(), n = n.next;
    }
    return -1;
  }
  remove(e) {
    this.contains(e) && (e.prev != null && (e.prev.next = e.next), e.next != null && (e.next.prev = e.prev), e === this.head && (this.head = e.next), e === this.tail && (this.tail = e.prev), this.length -= 1);
  }
  iterator(e = this.head) {
    return () => {
      const t = e;
      return e != null && (e = e.next), t;
    };
  }
  find(e, t = !1) {
    const n = this.iterator();
    let i = n();
    for (; i; ) {
      const s = i.length();
      if (e < s || t && e === s && (i.next == null || i.next.length() !== 0))
        return [i, e];
      e -= s, i = n();
    }
    return [null, 0];
  }
  forEach(e) {
    const t = this.iterator();
    let n = t();
    for (; n; )
      e(n), n = t();
  }
  forEachAt(e, t, n) {
    if (t <= 0)
      return;
    const [i, s] = this.find(e);
    let a = e - s;
    const o = this.iterator(i);
    let l = o();
    for (; l && a < e + t; ) {
      const c = l.length();
      e > a ? n(
        l,
        e - a,
        Math.min(t, a + c - e)
      ) : n(l, 0, Math.min(c, e + t - a)), a += c, l = o();
    }
  }
  map(e) {
    return this.reduce((t, n) => (t.push(e(n)), t), []);
  }
  reduce(e, t) {
    const n = this.iterator();
    let i = n();
    for (; i; )
      t = e(t, i), i = n();
    return t;
  }
}
function Nu(r, e) {
  const t = e.find(r);
  if (t)
    return t;
  try {
    return e.create(r);
  } catch {
    const n = e.create(B.INLINE);
    return Array.from(r.childNodes).forEach((i) => {
      n.domNode.appendChild(i);
    }), r.parentNode && r.parentNode.replaceChild(n.domNode, r), n.attach(), n;
  }
}
const Zh = class mn extends Gh {
  constructor(e, t) {
    super(e, t), this.uiNode = null, this.build();
  }
  appendChild(e) {
    this.insertBefore(e);
  }
  attach() {
    super.attach(), this.children.forEach((e) => {
      e.attach();
    });
  }
  attachUI(e) {
    this.uiNode != null && this.uiNode.remove(), this.uiNode = e, mn.uiClass && this.uiNode.classList.add(mn.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new a1(), Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).reverse().forEach((e) => {
      try {
        const t = Nu(e, this.scroll);
        this.insertBefore(t, this.children.head || void 0);
      } catch (t) {
        if (t instanceof Tr)
          return;
        throw t;
      }
    });
  }
  deleteAt(e, t) {
    if (e === 0 && t === this.length())
      return this.remove();
    this.children.forEachAt(e, t, (n, i, s) => {
      n.deleteAt(i, s);
    });
  }
  descendant(e, t = 0) {
    const [n, i] = this.children.find(t);
    return e.blotName == null && e(n) || e.blotName != null && n instanceof e ? [n, i] : n instanceof mn ? n.descendant(e, i) : [null, -1];
  }
  descendants(e, t = 0, n = Number.MAX_VALUE) {
    let i = [], s = n;
    return this.children.forEachAt(
      t,
      n,
      (a, o, l) => {
        (e.blotName == null && e(a) || e.blotName != null && a instanceof e) && i.push(a), a instanceof mn && (i = i.concat(
          a.descendants(e, o, s)
        )), s -= l;
      }
    ), i;
  }
  detach() {
    this.children.forEach((e) => {
      e.detach();
    }), super.detach();
  }
  enforceAllowedChildren() {
    let e = !1;
    this.children.forEach((t) => {
      e || this.statics.allowedChildren.some(
        (n) => t instanceof n
      ) || (t.statics.scope === B.BLOCK_BLOT ? (t.next != null && this.splitAfter(t), t.prev != null && this.splitAfter(t.prev), t.parent.unwrap(), e = !0) : t instanceof mn ? t.unwrap() : t.remove());
    });
  }
  formatAt(e, t, n, i) {
    this.children.forEachAt(e, t, (s, a, o) => {
      s.formatAt(a, o, n, i);
    });
  }
  insertAt(e, t, n) {
    const [i, s] = this.children.find(e);
    if (i)
      i.insertAt(s, t, n);
    else {
      const a = n == null ? this.scroll.create("text", t) : this.scroll.create(t, n);
      this.appendChild(a);
    }
  }
  insertBefore(e, t) {
    e.parent != null && e.parent.children.remove(e);
    let n = null;
    this.children.insertBefore(e, t || null), e.parent = this, t != null && (n = t.domNode), (this.domNode.parentNode !== e.domNode || this.domNode.nextSibling !== n) && this.domNode.insertBefore(e.domNode, n), e.attach();
  }
  length() {
    return this.children.reduce((e, t) => e + t.length(), 0);
  }
  moveChildren(e, t) {
    this.children.forEach((n) => {
      e.insertBefore(n, t);
    });
  }
  optimize(e) {
    if (super.optimize(e), this.enforceAllowedChildren(), this.uiNode != null && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), this.children.length === 0)
      if (this.statics.defaultChild != null) {
        const t = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(t);
      } else
        this.remove();
  }
  path(e, t = !1) {
    const [n, i] = this.children.find(e, t), s = [[this, e]];
    return n instanceof mn ? s.concat(n.path(i, t)) : (n != null && s.push([n, i]), s);
  }
  removeChild(e) {
    this.children.remove(e);
  }
  replaceWith(e, t) {
    const n = typeof e == "string" ? this.scroll.create(e, t) : e;
    return n instanceof mn && this.moveChildren(n), super.replaceWith(n);
  }
  split(e, t = !1) {
    if (!t) {
      if (e === 0)
        return this;
      if (e === this.length())
        return this.next;
    }
    const n = this.clone();
    return this.parent && this.parent.insertBefore(n, this.next || void 0), this.children.forEachAt(e, this.length(), (i, s, a) => {
      const o = i.split(s, t);
      o != null && n.appendChild(o);
    }), n;
  }
  splitAfter(e) {
    const t = this.clone();
    for (; e.next != null; )
      t.appendChild(e.next);
    return this.parent && this.parent.insertBefore(t, this.next || void 0), t;
  }
  unwrap() {
    this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
  }
  update(e, t) {
    const n = [], i = [];
    e.forEach((s) => {
      s.target === this.domNode && s.type === "childList" && (n.push(...s.addedNodes), i.push(...s.removedNodes));
    }), i.forEach((s) => {
      if (s.parentNode != null && // @ts-expect-error Fix me later
      s.tagName !== "IFRAME" && document.body.compareDocumentPosition(s) & Node.DOCUMENT_POSITION_CONTAINED_BY)
        return;
      const a = this.scroll.find(s);
      a != null && (a.domNode.parentNode == null || a.domNode.parentNode === this.domNode) && a.detach();
    }), n.filter((s) => s.parentNode === this.domNode && s !== this.uiNode).sort((s, a) => s === a ? 0 : s.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((s) => {
      let a = null;
      s.nextSibling != null && (a = this.scroll.find(s.nextSibling));
      const o = Nu(s, this.scroll);
      (o.next !== a || o.next == null) && (o.parent != null && o.parent.removeChild(this), this.insertBefore(o, a || void 0));
    }), this.enforceAllowedChildren();
  }
};
Zh.uiClass = "";
let o1 = Zh;
const yt = o1;
function l1(r, e) {
  if (Object.keys(r).length !== Object.keys(e).length)
    return !1;
  for (const t in r)
    if (r[t] !== e[t])
      return !1;
  return !0;
}
const yr = class vr extends yt {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const n = t.query(vr.blotName);
    if (!(n != null && e.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return e.tagName.toLowerCase();
    }
  }
  constructor(e, t) {
    super(e, t), this.attributes = new ma(this.domNode);
  }
  format(e, t) {
    if (e === this.statics.blotName && !t)
      this.children.forEach((n) => {
        n instanceof vr || (n = n.wrap(vr.blotName, !0)), this.attributes.copy(n);
      }), this.unwrap();
    else {
      const n = this.scroll.query(e, B.INLINE);
      if (n == null)
        return;
      n instanceof jt ? this.attributes.attribute(n, t) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t);
    }
  }
  formats() {
    const e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
    return t != null && (e[this.statics.blotName] = t), e;
  }
  formatAt(e, t, n, i) {
    this.formats()[n] != null || this.scroll.query(n, B.ATTRIBUTE) ? this.isolate(e, t).format(n, i) : super.formatAt(e, t, n, i);
  }
  optimize(e) {
    super.optimize(e);
    const t = this.formats();
    if (Object.keys(t).length === 0)
      return this.unwrap();
    const n = this.next;
    n instanceof vr && n.prev === this && l1(t, n.formats()) && (n.moveChildren(this), n.remove());
  }
  replaceWith(e, t) {
    const n = super.replaceWith(e, t);
    return this.attributes.copy(n), n;
  }
  update(e, t) {
    super.update(e, t), e.some(
      (n) => n.target === this.domNode && n.type === "attributes"
    ) && this.attributes.build();
  }
  wrap(e, t) {
    const n = super.wrap(e, t);
    return n instanceof vr && this.attributes.move(n), n;
  }
};
yr.allowedChildren = [yr, De], yr.blotName = "inline", yr.scope = B.INLINE_BLOT, yr.tagName = "SPAN";
let c1 = yr;
const lc = c1, wr = class bl extends yt {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const n = t.query(bl.blotName);
    if (!(n != null && e.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return e.tagName.toLowerCase();
    }
  }
  constructor(e, t) {
    super(e, t), this.attributes = new ma(this.domNode);
  }
  format(e, t) {
    const n = this.scroll.query(e, B.BLOCK);
    n != null && (n instanceof jt ? this.attributes.attribute(n, t) : e === this.statics.blotName && !t ? this.replaceWith(bl.blotName) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t));
  }
  formats() {
    const e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
    return t != null && (e[this.statics.blotName] = t), e;
  }
  formatAt(e, t, n, i) {
    this.scroll.query(n, B.BLOCK) != null ? this.format(n, i) : super.formatAt(e, t, n, i);
  }
  insertAt(e, t, n) {
    if (n == null || this.scroll.query(t, B.INLINE) != null)
      super.insertAt(e, t, n);
    else {
      const i = this.split(e);
      if (i != null) {
        const s = this.scroll.create(t, n);
        i.parent.insertBefore(s, i);
      } else
        throw new Error("Attempt to insertAt after block boundaries");
    }
  }
  replaceWith(e, t) {
    const n = super.replaceWith(e, t);
    return this.attributes.copy(n), n;
  }
  update(e, t) {
    super.update(e, t), e.some(
      (n) => n.target === this.domNode && n.type === "attributes"
    ) && this.attributes.build();
  }
};
wr.blotName = "block", wr.scope = B.BLOCK_BLOT, wr.tagName = "P", wr.allowedChildren = [
  lc,
  wr,
  De
];
let u1 = wr;
const zi = u1, yl = class extends yt {
  checkMerge() {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  }
  deleteAt(e, t) {
    super.deleteAt(e, t), this.enforceAllowedChildren();
  }
  formatAt(e, t, n, i) {
    super.formatAt(e, t, n, i), this.enforceAllowedChildren();
  }
  insertAt(e, t, n) {
    super.insertAt(e, t, n), this.enforceAllowedChildren();
  }
  optimize(e) {
    super.optimize(e), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
  }
};
yl.blotName = "container", yl.scope = B.BLOCK_BLOT;
let d1 = yl;
const ba = d1;
class h1 extends De {
  static formats(e, t) {
  }
  format(e, t) {
    super.formatAt(0, this.length(), e, t);
  }
  formatAt(e, t, n, i) {
    e === 0 && t === this.length() ? this.format(n, i) : super.formatAt(e, t, n, i);
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll);
  }
}
const Ge = h1, f1 = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, p1 = 100, kr = class extends yt {
  constructor(e, t) {
    super(null, t), this.registry = e, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, f1), this.attach();
  }
  create(e, t) {
    return this.registry.create(this, e, t);
  }
  find(e, t = !1) {
    const n = this.registry.find(e, t);
    return n ? n.scroll === this ? n : t ? this.find(n.scroll.domNode.parentNode, !0) : null : null;
  }
  query(e, t = B.ANY) {
    return this.registry.query(e, t);
  }
  register(...e) {
    return this.registry.register(...e);
  }
  build() {
    this.scroll != null && super.build();
  }
  detach() {
    super.detach(), this.observer.disconnect();
  }
  deleteAt(e, t) {
    this.update(), e === 0 && t === this.length() ? this.children.forEach((n) => {
      n.remove();
    }) : super.deleteAt(e, t);
  }
  formatAt(e, t, n, i) {
    this.update(), super.formatAt(e, t, n, i);
  }
  insertAt(e, t, n) {
    this.update(), super.insertAt(e, t, n);
  }
  optimize(e = [], t = {}) {
    super.optimize(t);
    const n = t.mutationsMap || /* @__PURE__ */ new WeakMap();
    let i = Array.from(this.observer.takeRecords());
    for (; i.length > 0; )
      e.push(i.pop());
    const s = (l, c = !0) => {
      l == null || l === this || l.domNode.parentNode != null && (n.has(l.domNode) || n.set(l.domNode, []), c && s(l.parent));
    }, a = (l) => {
      n.has(l.domNode) && (l instanceof yt && l.children.forEach(a), n.delete(l.domNode), l.optimize(t));
    };
    let o = e;
    for (let l = 0; o.length > 0; l += 1) {
      if (l >= p1)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (o.forEach((c) => {
        const d = this.find(c.target, !0);
        d != null && (d.domNode === c.target && (c.type === "childList" ? (s(this.find(c.previousSibling, !1)), Array.from(c.addedNodes).forEach((f) => {
          const h = this.find(f, !1);
          s(h, !1), h instanceof yt && h.children.forEach((g) => {
            s(g, !1);
          });
        })) : c.type === "attributes" && s(d.prev)), s(d));
      }), this.children.forEach(a), o = Array.from(this.observer.takeRecords()), i = o.slice(); i.length > 0; )
        e.push(i.pop());
    }
  }
  update(e, t = {}) {
    e = e || this.observer.takeRecords();
    const n = /* @__PURE__ */ new WeakMap();
    e.map((i) => {
      const s = this.find(i.target, !0);
      return s == null ? null : n.has(s.domNode) ? (n.get(s.domNode).push(i), null) : (n.set(s.domNode, [i]), s);
    }).forEach((i) => {
      i != null && i !== this && n.has(i.domNode) && i.update(n.get(i.domNode) || [], t);
    }), t.mutationsMap = n, n.has(this.domNode) && super.update(n.get(this.domNode), t), this.optimize(e, t);
  }
};
kr.blotName = "scroll", kr.defaultChild = zi, kr.allowedChildren = [zi, ba], kr.scope = B.BLOCK_BLOT, kr.tagName = "DIV";
let g1 = kr;
const cc = g1, vl = class Xh extends De {
  static create(e) {
    return document.createTextNode(e);
  }
  static value(e) {
    return e.data;
  }
  constructor(e, t) {
    super(e, t), this.text = this.statics.value(this.domNode);
  }
  deleteAt(e, t) {
    this.domNode.data = this.text = this.text.slice(0, e) + this.text.slice(e + t);
  }
  index(e, t) {
    return this.domNode === e ? t : -1;
  }
  insertAt(e, t, n) {
    n == null ? (this.text = this.text.slice(0, e) + t + this.text.slice(e), this.domNode.data = this.text) : super.insertAt(e, t, n);
  }
  length() {
    return this.text.length;
  }
  optimize(e) {
    super.optimize(e), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof Xh && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
  }
  position(e, t = !1) {
    return [this.domNode, e];
  }
  split(e, t = !1) {
    if (!t) {
      if (e === 0)
        return this;
      if (e === this.length())
        return this.next;
    }
    const n = this.scroll.create(this.domNode.splitText(e));
    return this.parent.insertBefore(n, this.next || void 0), this.text = this.statics.value(this.domNode), n;
  }
  update(e, t) {
    e.some((n) => n.type === "characterData" && n.target === this.domNode) && (this.text = this.statics.value(this.domNode));
  }
  value() {
    return this.text;
  }
};
vl.blotName = "text", vl.scope = B.INLINE_BLOT;
let m1 = vl;
const Qs = m1, b1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: jt,
  AttributorStore: ma,
  BlockBlot: zi,
  ClassAttributor: St,
  ContainerBlot: ba,
  EmbedBlot: Ge,
  InlineBlot: lc,
  LeafBlot: De,
  ParentBlot: yt,
  Registry: _r,
  Scope: B,
  ScrollBlot: cc,
  StyleAttributor: Ln,
  TextBlot: Qs
}, Symbol.toStringTag, { value: "Module" }));
var vn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Qh(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var wl = { exports: {} }, Ye = -1, qe = 1, ye = 0;
function Pi(r, e, t, n, i) {
  if (r === e)
    return r ? [[ye, r]] : [];
  if (t != null) {
    var s = C1(r, e, t);
    if (s)
      return s;
  }
  var a = uc(r, e), o = r.substring(0, a);
  r = r.substring(a), e = e.substring(a), a = ya(r, e);
  var l = r.substring(r.length - a);
  r = r.substring(0, r.length - a), e = e.substring(0, e.length - a);
  var c = y1(r, e);
  return o && c.unshift([ye, o]), l && c.push([ye, l]), dc(c, i), n && k1(c), c;
}
function y1(r, e) {
  var t;
  if (!r)
    return [[qe, e]];
  if (!e)
    return [[Ye, r]];
  var n = r.length > e.length ? r : e, i = r.length > e.length ? e : r, s = n.indexOf(i);
  if (s !== -1)
    return t = [
      [qe, n.substring(0, s)],
      [ye, i],
      [qe, n.substring(s + i.length)]
    ], r.length > e.length && (t[0][0] = t[2][0] = Ye), t;
  if (i.length === 1)
    return [
      [Ye, r],
      [qe, e]
    ];
  var a = w1(r, e);
  if (a) {
    var o = a[0], l = a[1], c = a[2], d = a[3], f = a[4], h = Pi(o, c), g = Pi(l, d);
    return h.concat([[ye, f]], g);
  }
  return v1(r, e);
}
function v1(r, e) {
  for (var t = r.length, n = e.length, i = Math.ceil((t + n) / 2), s = i, a = 2 * i, o = new Array(a), l = new Array(a), c = 0; c < a; c++)
    o[c] = -1, l[c] = -1;
  o[s + 1] = 0, l[s + 1] = 0;
  for (var d = t - n, f = d % 2 !== 0, h = 0, g = 0, m = 0, b = 0, k = 0; k < i; k++) {
    for (var y = -k + h; y <= k - g; y += 2) {
      var S = s + y, E;
      y === -k || y !== k && o[S - 1] < o[S + 1] ? E = o[S + 1] : E = o[S - 1] + 1;
      for (var C = E - y; E < t && C < n && r.charAt(E) === e.charAt(C); )
        E++, C++;
      if (o[S] = E, E > t)
        g += 2;
      else if (C > n)
        h += 2;
      else if (f) {
        var D = s + d - y;
        if (D >= 0 && D < a && l[D] !== -1) {
          var M = t - l[D];
          if (E >= M)
            return Mu(r, e, E, C);
        }
      }
    }
    for (var N = -k + m; N <= k - b; N += 2) {
      var D = s + N, M;
      N === -k || N !== k && l[D - 1] < l[D + 1] ? M = l[D + 1] : M = l[D - 1] + 1;
      for (var x = M - N; M < t && x < n && r.charAt(t - M - 1) === e.charAt(n - x - 1); )
        M++, x++;
      if (l[D] = M, M > t)
        b += 2;
      else if (x > n)
        m += 2;
      else if (!f) {
        var S = s + d - N;
        if (S >= 0 && S < a && o[S] !== -1) {
          var E = o[S], C = s + E - S;
          if (M = t - M, E >= M)
            return Mu(r, e, E, C);
        }
      }
    }
  }
  return [
    [Ye, r],
    [qe, e]
  ];
}
function Mu(r, e, t, n) {
  var i = r.substring(0, t), s = e.substring(0, n), a = r.substring(t), o = e.substring(n), l = Pi(i, s), c = Pi(a, o);
  return l.concat(c);
}
function uc(r, e) {
  if (!r || !e || r.charAt(0) !== e.charAt(0))
    return 0;
  for (var t = 0, n = Math.min(r.length, e.length), i = n, s = 0; t < i; )
    r.substring(s, i) == e.substring(s, i) ? (t = i, s = t) : n = i, i = Math.floor((n - t) / 2 + t);
  return Jh(r.charCodeAt(i - 1)) && i--, i;
}
function _u(r, e) {
  var t = r.length, n = e.length;
  if (t == 0 || n == 0)
    return 0;
  t > n ? r = r.substring(t - n) : t < n && (e = e.substring(0, t));
  var i = Math.min(t, n);
  if (r == e)
    return i;
  for (var s = 0, a = 1; ; ) {
    var o = r.substring(i - a), l = e.indexOf(o);
    if (l == -1)
      return s;
    a += l, (l == 0 || r.substring(i - a) == e.substring(0, a)) && (s = a, a++);
  }
}
function ya(r, e) {
  if (!r || !e || r.slice(-1) !== e.slice(-1))
    return 0;
  for (var t = 0, n = Math.min(r.length, e.length), i = n, s = 0; t < i; )
    r.substring(r.length - i, r.length - s) == e.substring(e.length - i, e.length - s) ? (t = i, s = t) : n = i, i = Math.floor((n - t) / 2 + t);
  return ef(r.charCodeAt(r.length - i)) && i--, i;
}
function w1(r, e) {
  var t = r.length > e.length ? r : e, n = r.length > e.length ? e : r;
  if (t.length < 4 || n.length * 2 < t.length)
    return null;
  function i(g, m, b) {
    for (var k = g.substring(b, b + Math.floor(g.length / 4)), y = -1, S = "", E, C, D, M; (y = m.indexOf(k, y + 1)) !== -1; ) {
      var N = uc(
        g.substring(b),
        m.substring(y)
      ), x = ya(
        g.substring(0, b),
        m.substring(0, y)
      );
      S.length < x + N && (S = m.substring(y - x, y) + m.substring(y, y + N), E = g.substring(0, b - x), C = g.substring(b + N), D = m.substring(0, y - x), M = m.substring(y + N));
    }
    return S.length * 2 >= g.length ? [
      E,
      C,
      D,
      M,
      S
    ] : null;
  }
  var s = i(
    t,
    n,
    Math.ceil(t.length / 4)
  ), a = i(
    t,
    n,
    Math.ceil(t.length / 2)
  ), o;
  if (!s && !a)
    return null;
  a ? s ? o = s[4].length > a[4].length ? s : a : o = a : o = s;
  var l, c, d, f;
  r.length > e.length ? (l = o[0], c = o[1], d = o[2], f = o[3]) : (d = o[0], f = o[1], l = o[2], c = o[3]);
  var h = o[4];
  return [l, c, d, f, h];
}
function k1(r) {
  for (var e = !1, t = [], n = 0, i = null, s = 0, a = 0, o = 0, l = 0, c = 0; s < r.length; )
    r[s][0] == ye ? (t[n++] = s, a = l, o = c, l = 0, c = 0, i = r[s][1]) : (r[s][0] == qe ? l += r[s][1].length : c += r[s][1].length, i && i.length <= Math.max(a, o) && i.length <= Math.max(l, c) && (r.splice(t[n - 1], 0, [
      Ye,
      i
    ]), r[t[n - 1] + 1][0] = qe, n--, n--, s = n > 0 ? t[n - 1] : -1, a = 0, o = 0, l = 0, c = 0, i = null, e = !0)), s++;
  for (e && dc(r), A1(r), s = 1; s < r.length; ) {
    if (r[s - 1][0] == Ye && r[s][0] == qe) {
      var d = r[s - 1][1], f = r[s][1], h = _u(d, f), g = _u(f, d);
      h >= g ? (h >= d.length / 2 || h >= f.length / 2) && (r.splice(s, 0, [
        ye,
        f.substring(0, h)
      ]), r[s - 1][1] = d.substring(
        0,
        d.length - h
      ), r[s + 1][1] = f.substring(h), s++) : (g >= d.length / 2 || g >= f.length / 2) && (r.splice(s, 0, [
        ye,
        d.substring(0, g)
      ]), r[s - 1][0] = qe, r[s - 1][1] = f.substring(
        0,
        f.length - g
      ), r[s + 1][0] = Ye, r[s + 1][1] = d.substring(g), s++), s++;
    }
    s++;
  }
}
var qu = /[^a-zA-Z0-9]/, Ru = /\s/, zu = /[\r\n]/, x1 = /\n\r?\n$/, S1 = /^\r?\n\r?\n/;
function A1(r) {
  function e(g, m) {
    if (!g || !m)
      return 6;
    var b = g.charAt(g.length - 1), k = m.charAt(0), y = b.match(qu), S = k.match(qu), E = y && b.match(Ru), C = S && k.match(Ru), D = E && b.match(zu), M = C && k.match(zu), N = D && g.match(x1), x = M && m.match(S1);
    return N || x ? 5 : D || M ? 4 : y && !E && C ? 3 : E || C ? 2 : y || S ? 1 : 0;
  }
  for (var t = 1; t < r.length - 1; ) {
    if (r[t - 1][0] == ye && r[t + 1][0] == ye) {
      var n = r[t - 1][1], i = r[t][1], s = r[t + 1][1], a = ya(n, i);
      if (a) {
        var o = i.substring(i.length - a);
        n = n.substring(0, n.length - a), i = o + i.substring(0, i.length - a), s = o + s;
      }
      for (var l = n, c = i, d = s, f = e(n, i) + e(i, s); i.charAt(0) === s.charAt(0); ) {
        n += i.charAt(0), i = i.substring(1) + s.charAt(0), s = s.substring(1);
        var h = e(n, i) + e(i, s);
        h >= f && (f = h, l = n, c = i, d = s);
      }
      r[t - 1][1] != l && (l ? r[t - 1][1] = l : (r.splice(t - 1, 1), t--), r[t][1] = c, d ? r[t + 1][1] = d : (r.splice(t + 1, 1), t--));
    }
    t++;
  }
}
function dc(r, e) {
  r.push([ye, ""]);
  for (var t = 0, n = 0, i = 0, s = "", a = "", o; t < r.length; ) {
    if (t < r.length - 1 && !r[t][1]) {
      r.splice(t, 1);
      continue;
    }
    switch (r[t][0]) {
      case qe:
        i++, a += r[t][1], t++;
        break;
      case Ye:
        n++, s += r[t][1], t++;
        break;
      case ye:
        var l = t - i - n - 1;
        if (e) {
          if (l >= 0 && nf(r[l][1])) {
            var c = r[l][1].slice(-1);
            if (r[l][1] = r[l][1].slice(
              0,
              -1
            ), s = c + s, a = c + a, !r[l][1]) {
              r.splice(l, 1), t--;
              var d = l - 1;
              r[d] && r[d][0] === qe && (i++, a = r[d][1] + a, d--), r[d] && r[d][0] === Ye && (n++, s = r[d][1] + s, d--), l = d;
            }
          }
          if (tf(r[t][1])) {
            var c = r[t][1].charAt(0);
            r[t][1] = r[t][1].slice(1), s += c, a += c;
          }
        }
        if (t < r.length - 1 && !r[t][1]) {
          r.splice(t, 1);
          break;
        }
        if (s.length > 0 || a.length > 0) {
          s.length > 0 && a.length > 0 && (o = uc(a, s), o !== 0 && (l >= 0 ? r[l][1] += a.substring(
            0,
            o
          ) : (r.splice(0, 0, [
            ye,
            a.substring(0, o)
          ]), t++), a = a.substring(o), s = s.substring(o)), o = ya(a, s), o !== 0 && (r[t][1] = a.substring(a.length - o) + r[t][1], a = a.substring(
            0,
            a.length - o
          ), s = s.substring(
            0,
            s.length - o
          )));
          var f = i + n;
          s.length === 0 && a.length === 0 ? (r.splice(t - f, f), t = t - f) : s.length === 0 ? (r.splice(t - f, f, [qe, a]), t = t - f + 1) : a.length === 0 ? (r.splice(t - f, f, [Ye, s]), t = t - f + 1) : (r.splice(
            t - f,
            f,
            [Ye, s],
            [qe, a]
          ), t = t - f + 2);
        }
        t !== 0 && r[t - 1][0] === ye ? (r[t - 1][1] += r[t][1], r.splice(t, 1)) : t++, i = 0, n = 0, s = "", a = "";
        break;
    }
  }
  r[r.length - 1][1] === "" && r.pop();
  var h = !1;
  for (t = 1; t < r.length - 1; )
    r[t - 1][0] === ye && r[t + 1][0] === ye && (r[t][1].substring(
      r[t][1].length - r[t - 1][1].length
    ) === r[t - 1][1] ? (r[t][1] = r[t - 1][1] + r[t][1].substring(
      0,
      r[t][1].length - r[t - 1][1].length
    ), r[t + 1][1] = r[t - 1][1] + r[t + 1][1], r.splice(t - 1, 1), h = !0) : r[t][1].substring(0, r[t + 1][1].length) == r[t + 1][1] && (r[t - 1][1] += r[t + 1][1], r[t][1] = r[t][1].substring(r[t + 1][1].length) + r[t + 1][1], r.splice(t + 1, 1), h = !0)), t++;
  h && dc(r, e);
}
function Jh(r) {
  return r >= 55296 && r <= 56319;
}
function ef(r) {
  return r >= 56320 && r <= 57343;
}
function tf(r) {
  return ef(r.charCodeAt(0));
}
function nf(r) {
  return Jh(r.charCodeAt(r.length - 1));
}
function E1(r) {
  for (var e = [], t = 0; t < r.length; t++)
    r[t][1].length > 0 && e.push(r[t]);
  return e;
}
function Lo(r, e, t, n) {
  return nf(r) || tf(n) ? null : E1([
    [ye, r],
    [Ye, e],
    [qe, t],
    [ye, n]
  ]);
}
function C1(r, e, t) {
  var n = typeof t == "number" ? { index: t, length: 0 } : t.oldRange, i = typeof t == "number" ? null : t.newRange, s = r.length, a = e.length;
  if (n.length === 0 && (i === null || i.length === 0)) {
    var o = n.index, l = r.slice(0, o), c = r.slice(o), d = i ? i.index : null;
    e: {
      var f = o + a - s;
      if (d !== null && d !== f || f < 0 || f > a)
        break e;
      var h = e.slice(0, f), g = e.slice(f);
      if (g !== c)
        break e;
      var m = Math.min(o, f), b = l.slice(0, m), k = h.slice(0, m);
      if (b !== k)
        break e;
      var y = l.slice(m), S = h.slice(m);
      return Lo(b, y, S, c);
    }
    e: {
      if (d !== null && d !== o)
        break e;
      var E = o, h = e.slice(0, E), g = e.slice(E);
      if (h !== l)
        break e;
      var C = Math.min(s - E, a - E), D = c.slice(c.length - C), M = g.slice(g.length - C);
      if (D !== M)
        break e;
      var y = c.slice(0, c.length - C), S = g.slice(0, g.length - C);
      return Lo(l, y, S, D);
    }
  }
  if (n.length > 0 && i && i.length === 0)
    e: {
      var b = r.slice(0, n.index), D = r.slice(n.index + n.length), m = b.length, C = D.length;
      if (a < m + C)
        break e;
      var k = e.slice(0, m), M = e.slice(a - C);
      if (b !== k || D !== M)
        break e;
      var y = r.slice(m, s - C), S = e.slice(m, a - C);
      return Lo(b, y, S, D);
    }
  return null;
}
function va(r, e, t, n) {
  return Pi(r, e, t, n, !0);
}
va.INSERT = qe;
va.DELETE = Ye;
va.EQUAL = ye;
var T1 = va, Js = { exports: {} };
Js.exports;
(function(r, e) {
  var t = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", a = "[object Array]", o = "[object Boolean]", l = "[object Date]", c = "[object Error]", d = "[object Function]", f = "[object GeneratorFunction]", h = "[object Map]", g = "[object Number]", m = "[object Object]", b = "[object Promise]", k = "[object RegExp]", y = "[object Set]", S = "[object String]", E = "[object Symbol]", C = "[object WeakMap]", D = "[object ArrayBuffer]", M = "[object DataView]", N = "[object Float32Array]", x = "[object Float64Array]", A = "[object Int8Array]", q = "[object Int16Array]", O = "[object Int32Array]", V = "[object Uint8Array]", de = "[object Uint8ClampedArray]", re = "[object Uint16Array]", Ue = "[object Uint32Array]", ze = /[\\^$.*+?()[\]{}|]/g, Zr = /\w*$/, Ct = /^\[object .+?Constructor\]$/, Tt = /^(?:0|[1-9]\d*)$/, U = {};
  U[s] = U[a] = U[D] = U[M] = U[o] = U[l] = U[N] = U[x] = U[A] = U[q] = U[O] = U[h] = U[g] = U[m] = U[k] = U[y] = U[S] = U[E] = U[V] = U[de] = U[re] = U[Ue] = !0, U[c] = U[d] = U[C] = !1;
  var Lt = typeof vn == "object" && vn && vn.Object === Object && vn, Dt = typeof self == "object" && self && self.Object === Object && self, ot = Lt || Dt || Function("return this")(), es = e && !e.nodeType && e, J = es && !0 && r && !r.nodeType && r, ts = J && J.exports === es;
  function qa(u, p) {
    return u.set(p[0], p[1]), u;
  }
  function lt(u, p) {
    return u.add(p), u;
  }
  function ns(u, p) {
    for (var w = -1, T = u ? u.length : 0; ++w < T && p(u[w], w, u) !== !1; )
      ;
    return u;
  }
  function rs(u, p) {
    for (var w = -1, T = p.length, j = u.length; ++w < T; )
      u[j + w] = p[w];
    return u;
  }
  function Xr(u, p, w, T) {
    for (var j = -1, F = u ? u.length : 0; ++j < F; )
      w = p(w, u[j], j, u);
    return w;
  }
  function Qr(u, p) {
    for (var w = -1, T = Array(u); ++w < u; )
      T[w] = p(w);
    return T;
  }
  function is(u, p) {
    return u == null ? void 0 : u[p];
  }
  function Jr(u) {
    var p = !1;
    if (u != null && typeof u.toString != "function")
      try {
        p = !!(u + "");
      } catch {
      }
    return p;
  }
  function ss(u) {
    var p = -1, w = Array(u.size);
    return u.forEach(function(T, j) {
      w[++p] = [j, T];
    }), w;
  }
  function ei(u, p) {
    return function(w) {
      return u(p(w));
    };
  }
  function as(u) {
    var p = -1, w = Array(u.size);
    return u.forEach(function(T) {
      w[++p] = T;
    }), w;
  }
  var Ra = Array.prototype, za = Function.prototype, tr = Object.prototype, ti = ot["__core-js_shared__"], os = function() {
    var u = /[^.]+$/.exec(ti && ti.keys && ti.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), ls = za.toString, It = tr.hasOwnProperty, nr = tr.toString, Pa = RegExp(
    "^" + ls.call(It).replace(ze, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Dn = ts ? ot.Buffer : void 0, rr = ot.Symbol, ni = ot.Uint8Array, Ze = ei(Object.getPrototypeOf, Object), cs = Object.create, us = tr.propertyIsEnumerable, Ba = Ra.splice, ri = Object.getOwnPropertySymbols, ir = Dn ? Dn.isBuffer : void 0, ds = ei(Object.keys, Object), sr = ut(ot, "DataView"), In = ut(ot, "Map"), ct = ut(ot, "Promise"), ar = ut(ot, "Set"), ii = ut(ot, "WeakMap"), On = ut(Object, "create"), si = Me(sr), Nn = Me(In), ai = Me(ct), oi = Me(ar), li = Me(ii), dn = rr ? rr.prototype : void 0, hs = dn ? dn.valueOf : void 0;
  function Zt(u) {
    var p = -1, w = u ? u.length : 0;
    for (this.clear(); ++p < w; ) {
      var T = u[p];
      this.set(T[0], T[1]);
    }
  }
  function Fa() {
    this.__data__ = On ? On(null) : {};
  }
  function $a(u) {
    return this.has(u) && delete this.__data__[u];
  }
  function ja(u) {
    var p = this.__data__;
    if (On) {
      var w = p[u];
      return w === n ? void 0 : w;
    }
    return It.call(p, u) ? p[u] : void 0;
  }
  function fs(u) {
    var p = this.__data__;
    return On ? p[u] !== void 0 : It.call(p, u);
  }
  function ci(u, p) {
    var w = this.__data__;
    return w[u] = On && p === void 0 ? n : p, this;
  }
  Zt.prototype.clear = Fa, Zt.prototype.delete = $a, Zt.prototype.get = ja, Zt.prototype.has = fs, Zt.prototype.set = ci;
  function ke(u) {
    var p = -1, w = u ? u.length : 0;
    for (this.clear(); ++p < w; ) {
      var T = u[p];
      this.set(T[0], T[1]);
    }
  }
  function Ua() {
    this.__data__ = [];
  }
  function Ha(u) {
    var p = this.__data__, w = lr(p, u);
    if (w < 0)
      return !1;
    var T = p.length - 1;
    return w == T ? p.pop() : Ba.call(p, w, 1), !0;
  }
  function Va(u) {
    var p = this.__data__, w = lr(p, u);
    return w < 0 ? void 0 : p[w][1];
  }
  function Ya(u) {
    return lr(this.__data__, u) > -1;
  }
  function Ka(u, p) {
    var w = this.__data__, T = lr(w, u);
    return T < 0 ? w.push([u, p]) : w[T][1] = p, this;
  }
  ke.prototype.clear = Ua, ke.prototype.delete = Ha, ke.prototype.get = Va, ke.prototype.has = Ya, ke.prototype.set = Ka;
  function Ae(u) {
    var p = -1, w = u ? u.length : 0;
    for (this.clear(); ++p < w; ) {
      var T = u[p];
      this.set(T[0], T[1]);
    }
  }
  function Ga() {
    this.__data__ = {
      hash: new Zt(),
      map: new (In || ke)(),
      string: new Zt()
    };
  }
  function Wa(u) {
    return _n(this, u).delete(u);
  }
  function Za(u) {
    return _n(this, u).get(u);
  }
  function Xa(u) {
    return _n(this, u).has(u);
  }
  function Qa(u, p) {
    return _n(this, u).set(u, p), this;
  }
  Ae.prototype.clear = Ga, Ae.prototype.delete = Wa, Ae.prototype.get = Za, Ae.prototype.has = Xa, Ae.prototype.set = Qa;
  function Pe(u) {
    this.__data__ = new ke(u);
  }
  function Ja() {
    this.__data__ = new ke();
  }
  function eo(u) {
    return this.__data__.delete(u);
  }
  function to(u) {
    return this.__data__.get(u);
  }
  function no(u) {
    return this.__data__.has(u);
  }
  function ro(u, p) {
    var w = this.__data__;
    if (w instanceof ke) {
      var T = w.__data__;
      if (!In || T.length < t - 1)
        return T.push([u, p]), this;
      w = this.__data__ = new Ae(T);
    }
    return w.set(u, p), this;
  }
  Pe.prototype.clear = Ja, Pe.prototype.delete = eo, Pe.prototype.get = to, Pe.prototype.has = no, Pe.prototype.set = ro;
  function or(u, p) {
    var w = fi(u) || ur(u) ? Qr(u.length, String) : [], T = w.length, j = !!T;
    for (var F in u)
      It.call(u, F) && !(j && (F == "length" || yo(F, T))) && w.push(F);
    return w;
  }
  function ps(u, p, w) {
    var T = u[p];
    (!(It.call(u, p) && vs(T, w)) || w === void 0 && !(p in u)) && (u[p] = w);
  }
  function lr(u, p) {
    for (var w = u.length; w--; )
      if (vs(u[w][0], p))
        return w;
    return -1;
  }
  function Ot(u, p) {
    return u && hi(p, gi(p), u);
  }
  function ui(u, p, w, T, j, F, Z) {
    var W;
    if (T && (W = F ? T(u, j, F, Z) : T(u)), W !== void 0)
      return W;
    if (!Mt(u))
      return u;
    var he = fi(u);
    if (he) {
      if (W = mo(u), !p)
        return fo(u, W);
    } else {
      var Q = Qt(u), Ee = Q == d || Q == f;
      if (ws(u))
        return cr(u, p);
      if (Q == m || Q == s || Ee && !F) {
        if (Jr(u))
          return F ? u : {};
        if (W = Nt(Ee ? {} : u), !p)
          return po(u, Ot(W, u));
      } else {
        if (!U[Q])
          return F ? u : {};
        W = bo(u, Q, ui, p);
      }
    }
    Z || (Z = new Pe());
    var Be = Z.get(u);
    if (Be)
      return Be;
    if (Z.set(u, W), !he)
      var me = w ? go(u) : gi(u);
    return ns(me || u, function(Ce, xe) {
      me && (xe = Ce, Ce = u[xe]), ps(W, xe, ui(Ce, p, w, T, xe, u, Z));
    }), W;
  }
  function io(u) {
    return Mt(u) ? cs(u) : {};
  }
  function so(u, p, w) {
    var T = p(u);
    return fi(u) ? T : rs(T, w(u));
  }
  function ao(u) {
    return nr.call(u);
  }
  function oo(u) {
    if (!Mt(u) || wo(u))
      return !1;
    var p = pi(u) || Jr(u) ? Pa : Ct;
    return p.test(Me(u));
  }
  function lo(u) {
    if (!bs(u))
      return ds(u);
    var p = [];
    for (var w in Object(u))
      It.call(u, w) && w != "constructor" && p.push(w);
    return p;
  }
  function cr(u, p) {
    if (p)
      return u.slice();
    var w = new u.constructor(u.length);
    return u.copy(w), w;
  }
  function di(u) {
    var p = new u.constructor(u.byteLength);
    return new ni(p).set(new ni(u)), p;
  }
  function Mn(u, p) {
    var w = p ? di(u.buffer) : u.buffer;
    return new u.constructor(w, u.byteOffset, u.byteLength);
  }
  function gs(u, p, w) {
    var T = p ? w(ss(u), !0) : ss(u);
    return Xr(T, qa, new u.constructor());
  }
  function ms(u) {
    var p = new u.constructor(u.source, Zr.exec(u));
    return p.lastIndex = u.lastIndex, p;
  }
  function co(u, p, w) {
    var T = p ? w(as(u), !0) : as(u);
    return Xr(T, lt, new u.constructor());
  }
  function uo(u) {
    return hs ? Object(hs.call(u)) : {};
  }
  function ho(u, p) {
    var w = p ? di(u.buffer) : u.buffer;
    return new u.constructor(w, u.byteOffset, u.length);
  }
  function fo(u, p) {
    var w = -1, T = u.length;
    for (p || (p = Array(T)); ++w < T; )
      p[w] = u[w];
    return p;
  }
  function hi(u, p, w, T) {
    w || (w = {});
    for (var j = -1, F = p.length; ++j < F; ) {
      var Z = p[j], W = void 0;
      ps(w, Z, W === void 0 ? u[Z] : W);
    }
    return w;
  }
  function po(u, p) {
    return hi(u, Xt(u), p);
  }
  function go(u) {
    return so(u, gi, Xt);
  }
  function _n(u, p) {
    var w = u.__data__;
    return vo(p) ? w[typeof p == "string" ? "string" : "hash"] : w.map;
  }
  function ut(u, p) {
    var w = is(u, p);
    return oo(w) ? w : void 0;
  }
  var Xt = ri ? ei(ri, Object) : xo, Qt = ao;
  (sr && Qt(new sr(new ArrayBuffer(1))) != M || In && Qt(new In()) != h || ct && Qt(ct.resolve()) != b || ar && Qt(new ar()) != y || ii && Qt(new ii()) != C) && (Qt = function(u) {
    var p = nr.call(u), w = p == m ? u.constructor : void 0, T = w ? Me(w) : void 0;
    if (T)
      switch (T) {
        case si:
          return M;
        case Nn:
          return h;
        case ai:
          return b;
        case oi:
          return y;
        case li:
          return C;
      }
    return p;
  });
  function mo(u) {
    var p = u.length, w = u.constructor(p);
    return p && typeof u[0] == "string" && It.call(u, "index") && (w.index = u.index, w.input = u.input), w;
  }
  function Nt(u) {
    return typeof u.constructor == "function" && !bs(u) ? io(Ze(u)) : {};
  }
  function bo(u, p, w, T) {
    var j = u.constructor;
    switch (p) {
      case D:
        return di(u);
      case o:
      case l:
        return new j(+u);
      case M:
        return Mn(u, T);
      case N:
      case x:
      case A:
      case q:
      case O:
      case V:
      case de:
      case re:
      case Ue:
        return ho(u, T);
      case h:
        return gs(u, T, w);
      case g:
      case S:
        return new j(u);
      case k:
        return ms(u);
      case y:
        return co(u, T, w);
      case E:
        return uo(u);
    }
  }
  function yo(u, p) {
    return p = p ?? i, !!p && (typeof u == "number" || Tt.test(u)) && u > -1 && u % 1 == 0 && u < p;
  }
  function vo(u) {
    var p = typeof u;
    return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? u !== "__proto__" : u === null;
  }
  function wo(u) {
    return !!os && os in u;
  }
  function bs(u) {
    var p = u && u.constructor, w = typeof p == "function" && p.prototype || tr;
    return u === w;
  }
  function Me(u) {
    if (u != null) {
      try {
        return ls.call(u);
      } catch {
      }
      try {
        return u + "";
      } catch {
      }
    }
    return "";
  }
  function ys(u) {
    return ui(u, !0, !0);
  }
  function vs(u, p) {
    return u === p || u !== u && p !== p;
  }
  function ur(u) {
    return ko(u) && It.call(u, "callee") && (!us.call(u, "callee") || nr.call(u) == s);
  }
  var fi = Array.isArray;
  function dr(u) {
    return u != null && ks(u.length) && !pi(u);
  }
  function ko(u) {
    return xs(u) && dr(u);
  }
  var ws = ir || So;
  function pi(u) {
    var p = Mt(u) ? nr.call(u) : "";
    return p == d || p == f;
  }
  function ks(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= i;
  }
  function Mt(u) {
    var p = typeof u;
    return !!u && (p == "object" || p == "function");
  }
  function xs(u) {
    return !!u && typeof u == "object";
  }
  function gi(u) {
    return dr(u) ? or(u) : lo(u);
  }
  function xo() {
    return [];
  }
  function So() {
    return !1;
  }
  r.exports = ys;
})(Js, Js.exports);
var rf = Js.exports, ea = { exports: {} };
ea.exports;
(function(r, e) {
  var t = 200, n = "__lodash_hash_undefined__", i = 1, s = 2, a = 9007199254740991, o = "[object Arguments]", l = "[object Array]", c = "[object AsyncFunction]", d = "[object Boolean]", f = "[object Date]", h = "[object Error]", g = "[object Function]", m = "[object GeneratorFunction]", b = "[object Map]", k = "[object Number]", y = "[object Null]", S = "[object Object]", E = "[object Promise]", C = "[object Proxy]", D = "[object RegExp]", M = "[object Set]", N = "[object String]", x = "[object Symbol]", A = "[object Undefined]", q = "[object WeakMap]", O = "[object ArrayBuffer]", V = "[object DataView]", de = "[object Float32Array]", re = "[object Float64Array]", Ue = "[object Int8Array]", ze = "[object Int16Array]", Zr = "[object Int32Array]", Ct = "[object Uint8Array]", Tt = "[object Uint8ClampedArray]", U = "[object Uint16Array]", Lt = "[object Uint32Array]", Dt = /[\\^$.*+?()[\]{}|]/g, ot = /^\[object .+?Constructor\]$/, es = /^(?:0|[1-9]\d*)$/, J = {};
  J[de] = J[re] = J[Ue] = J[ze] = J[Zr] = J[Ct] = J[Tt] = J[U] = J[Lt] = !0, J[o] = J[l] = J[O] = J[d] = J[V] = J[f] = J[h] = J[g] = J[b] = J[k] = J[S] = J[D] = J[M] = J[N] = J[q] = !1;
  var ts = typeof vn == "object" && vn && vn.Object === Object && vn, qa = typeof self == "object" && self && self.Object === Object && self, lt = ts || qa || Function("return this")(), ns = e && !e.nodeType && e, rs = ns && !0 && r && !r.nodeType && r, Xr = rs && rs.exports === ns, Qr = Xr && ts.process, is = function() {
    try {
      return Qr && Qr.binding && Qr.binding("util");
    } catch {
    }
  }(), Jr = is && is.isTypedArray;
  function ss(u, p) {
    for (var w = -1, T = u == null ? 0 : u.length, j = 0, F = []; ++w < T; ) {
      var Z = u[w];
      p(Z, w, u) && (F[j++] = Z);
    }
    return F;
  }
  function ei(u, p) {
    for (var w = -1, T = p.length, j = u.length; ++w < T; )
      u[j + w] = p[w];
    return u;
  }
  function as(u, p) {
    for (var w = -1, T = u == null ? 0 : u.length; ++w < T; )
      if (p(u[w], w, u))
        return !0;
    return !1;
  }
  function Ra(u, p) {
    for (var w = -1, T = Array(u); ++w < u; )
      T[w] = p(w);
    return T;
  }
  function za(u) {
    return function(p) {
      return u(p);
    };
  }
  function tr(u, p) {
    return u.has(p);
  }
  function ti(u, p) {
    return u == null ? void 0 : u[p];
  }
  function os(u) {
    var p = -1, w = Array(u.size);
    return u.forEach(function(T, j) {
      w[++p] = [j, T];
    }), w;
  }
  function ls(u, p) {
    return function(w) {
      return u(p(w));
    };
  }
  function It(u) {
    var p = -1, w = Array(u.size);
    return u.forEach(function(T) {
      w[++p] = T;
    }), w;
  }
  var nr = Array.prototype, Pa = Function.prototype, Dn = Object.prototype, rr = lt["__core-js_shared__"], ni = Pa.toString, Ze = Dn.hasOwnProperty, cs = function() {
    var u = /[^.]+$/.exec(rr && rr.keys && rr.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), us = Dn.toString, Ba = RegExp(
    "^" + ni.call(Ze).replace(Dt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ri = Xr ? lt.Buffer : void 0, ir = lt.Symbol, ds = lt.Uint8Array, sr = Dn.propertyIsEnumerable, In = nr.splice, ct = ir ? ir.toStringTag : void 0, ar = Object.getOwnPropertySymbols, ii = ri ? ri.isBuffer : void 0, On = ls(Object.keys, Object), si = Xt(lt, "DataView"), Nn = Xt(lt, "Map"), ai = Xt(lt, "Promise"), oi = Xt(lt, "Set"), li = Xt(lt, "WeakMap"), dn = Xt(Object, "create"), hs = Me(si), Zt = Me(Nn), Fa = Me(ai), $a = Me(oi), ja = Me(li), fs = ir ? ir.prototype : void 0, ci = fs ? fs.valueOf : void 0;
  function ke(u) {
    var p = -1, w = u == null ? 0 : u.length;
    for (this.clear(); ++p < w; ) {
      var T = u[p];
      this.set(T[0], T[1]);
    }
  }
  function Ua() {
    this.__data__ = dn ? dn(null) : {}, this.size = 0;
  }
  function Ha(u) {
    var p = this.has(u) && delete this.__data__[u];
    return this.size -= p ? 1 : 0, p;
  }
  function Va(u) {
    var p = this.__data__;
    if (dn) {
      var w = p[u];
      return w === n ? void 0 : w;
    }
    return Ze.call(p, u) ? p[u] : void 0;
  }
  function Ya(u) {
    var p = this.__data__;
    return dn ? p[u] !== void 0 : Ze.call(p, u);
  }
  function Ka(u, p) {
    var w = this.__data__;
    return this.size += this.has(u) ? 0 : 1, w[u] = dn && p === void 0 ? n : p, this;
  }
  ke.prototype.clear = Ua, ke.prototype.delete = Ha, ke.prototype.get = Va, ke.prototype.has = Ya, ke.prototype.set = Ka;
  function Ae(u) {
    var p = -1, w = u == null ? 0 : u.length;
    for (this.clear(); ++p < w; ) {
      var T = u[p];
      this.set(T[0], T[1]);
    }
  }
  function Ga() {
    this.__data__ = [], this.size = 0;
  }
  function Wa(u) {
    var p = this.__data__, w = cr(p, u);
    if (w < 0)
      return !1;
    var T = p.length - 1;
    return w == T ? p.pop() : In.call(p, w, 1), --this.size, !0;
  }
  function Za(u) {
    var p = this.__data__, w = cr(p, u);
    return w < 0 ? void 0 : p[w][1];
  }
  function Xa(u) {
    return cr(this.__data__, u) > -1;
  }
  function Qa(u, p) {
    var w = this.__data__, T = cr(w, u);
    return T < 0 ? (++this.size, w.push([u, p])) : w[T][1] = p, this;
  }
  Ae.prototype.clear = Ga, Ae.prototype.delete = Wa, Ae.prototype.get = Za, Ae.prototype.has = Xa, Ae.prototype.set = Qa;
  function Pe(u) {
    var p = -1, w = u == null ? 0 : u.length;
    for (this.clear(); ++p < w; ) {
      var T = u[p];
      this.set(T[0], T[1]);
    }
  }
  function Ja() {
    this.size = 0, this.__data__ = {
      hash: new ke(),
      map: new (Nn || Ae)(),
      string: new ke()
    };
  }
  function eo(u) {
    var p = ut(this, u).delete(u);
    return this.size -= p ? 1 : 0, p;
  }
  function to(u) {
    return ut(this, u).get(u);
  }
  function no(u) {
    return ut(this, u).has(u);
  }
  function ro(u, p) {
    var w = ut(this, u), T = w.size;
    return w.set(u, p), this.size += w.size == T ? 0 : 1, this;
  }
  Pe.prototype.clear = Ja, Pe.prototype.delete = eo, Pe.prototype.get = to, Pe.prototype.has = no, Pe.prototype.set = ro;
  function or(u) {
    var p = -1, w = u == null ? 0 : u.length;
    for (this.__data__ = new Pe(); ++p < w; )
      this.add(u[p]);
  }
  function ps(u) {
    return this.__data__.set(u, n), this;
  }
  function lr(u) {
    return this.__data__.has(u);
  }
  or.prototype.add = or.prototype.push = ps, or.prototype.has = lr;
  function Ot(u) {
    var p = this.__data__ = new Ae(u);
    this.size = p.size;
  }
  function ui() {
    this.__data__ = new Ae(), this.size = 0;
  }
  function io(u) {
    var p = this.__data__, w = p.delete(u);
    return this.size = p.size, w;
  }
  function so(u) {
    return this.__data__.get(u);
  }
  function ao(u) {
    return this.__data__.has(u);
  }
  function oo(u, p) {
    var w = this.__data__;
    if (w instanceof Ae) {
      var T = w.__data__;
      if (!Nn || T.length < t - 1)
        return T.push([u, p]), this.size = ++w.size, this;
      w = this.__data__ = new Pe(T);
    }
    return w.set(u, p), this.size = w.size, this;
  }
  Ot.prototype.clear = ui, Ot.prototype.delete = io, Ot.prototype.get = so, Ot.prototype.has = ao, Ot.prototype.set = oo;
  function lo(u, p) {
    var w = ur(u), T = !w && vs(u), j = !w && !T && dr(u), F = !w && !T && !j && xs(u), Z = w || T || j || F, W = Z ? Ra(u.length, String) : [], he = W.length;
    for (var Q in u)
      Ze.call(u, Q) && !(Z && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Q == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      j && (Q == "offset" || Q == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      F && (Q == "buffer" || Q == "byteLength" || Q == "byteOffset") || // Skip index properties.
      bo(Q, he))) && W.push(Q);
    return W;
  }
  function cr(u, p) {
    for (var w = u.length; w--; )
      if (ys(u[w][0], p))
        return w;
    return -1;
  }
  function di(u, p, w) {
    var T = p(u);
    return ur(u) ? T : ei(T, w(u));
  }
  function Mn(u) {
    return u == null ? u === void 0 ? A : y : ct && ct in Object(u) ? Qt(u) : bs(u);
  }
  function gs(u) {
    return Mt(u) && Mn(u) == o;
  }
  function ms(u, p, w, T, j) {
    return u === p ? !0 : u == null || p == null || !Mt(u) && !Mt(p) ? u !== u && p !== p : co(u, p, w, T, ms, j);
  }
  function co(u, p, w, T, j, F) {
    var Z = ur(u), W = ur(p), he = Z ? l : Nt(u), Q = W ? l : Nt(p);
    he = he == o ? S : he, Q = Q == o ? S : Q;
    var Ee = he == S, Be = Q == S, me = he == Q;
    if (me && dr(u)) {
      if (!dr(p))
        return !1;
      Z = !0, Ee = !1;
    }
    if (me && !Ee)
      return F || (F = new Ot()), Z || xs(u) ? hi(u, p, w, T, j, F) : po(u, p, he, w, T, j, F);
    if (!(w & i)) {
      var Ce = Ee && Ze.call(u, "__wrapped__"), xe = Be && Ze.call(p, "__wrapped__");
      if (Ce || xe) {
        var hn = Ce ? u.value() : u, Jt = xe ? p.value() : p;
        return F || (F = new Ot()), j(hn, Jt, w, T, F);
      }
    }
    return me ? (F || (F = new Ot()), go(u, p, w, T, j, F)) : !1;
  }
  function uo(u) {
    if (!ks(u) || vo(u))
      return !1;
    var p = ws(u) ? Ba : ot;
    return p.test(Me(u));
  }
  function ho(u) {
    return Mt(u) && pi(u.length) && !!J[Mn(u)];
  }
  function fo(u) {
    if (!wo(u))
      return On(u);
    var p = [];
    for (var w in Object(u))
      Ze.call(u, w) && w != "constructor" && p.push(w);
    return p;
  }
  function hi(u, p, w, T, j, F) {
    var Z = w & i, W = u.length, he = p.length;
    if (W != he && !(Z && he > W))
      return !1;
    var Q = F.get(u);
    if (Q && F.get(p))
      return Q == p;
    var Ee = -1, Be = !0, me = w & s ? new or() : void 0;
    for (F.set(u, p), F.set(p, u); ++Ee < W; ) {
      var Ce = u[Ee], xe = p[Ee];
      if (T)
        var hn = Z ? T(xe, Ce, Ee, p, u, F) : T(Ce, xe, Ee, u, p, F);
      if (hn !== void 0) {
        if (hn)
          continue;
        Be = !1;
        break;
      }
      if (me) {
        if (!as(p, function(Jt, qn) {
          if (!tr(me, qn) && (Ce === Jt || j(Ce, Jt, w, T, F)))
            return me.push(qn);
        })) {
          Be = !1;
          break;
        }
      } else if (!(Ce === xe || j(Ce, xe, w, T, F))) {
        Be = !1;
        break;
      }
    }
    return F.delete(u), F.delete(p), Be;
  }
  function po(u, p, w, T, j, F, Z) {
    switch (w) {
      case V:
        if (u.byteLength != p.byteLength || u.byteOffset != p.byteOffset)
          return !1;
        u = u.buffer, p = p.buffer;
      case O:
        return !(u.byteLength != p.byteLength || !F(new ds(u), new ds(p)));
      case d:
      case f:
      case k:
        return ys(+u, +p);
      case h:
        return u.name == p.name && u.message == p.message;
      case D:
      case N:
        return u == p + "";
      case b:
        var W = os;
      case M:
        var he = T & i;
        if (W || (W = It), u.size != p.size && !he)
          return !1;
        var Q = Z.get(u);
        if (Q)
          return Q == p;
        T |= s, Z.set(u, p);
        var Ee = hi(W(u), W(p), T, j, F, Z);
        return Z.delete(u), Ee;
      case x:
        if (ci)
          return ci.call(u) == ci.call(p);
    }
    return !1;
  }
  function go(u, p, w, T, j, F) {
    var Z = w & i, W = _n(u), he = W.length, Q = _n(p), Ee = Q.length;
    if (he != Ee && !Z)
      return !1;
    for (var Be = he; Be--; ) {
      var me = W[Be];
      if (!(Z ? me in p : Ze.call(p, me)))
        return !1;
    }
    var Ce = F.get(u);
    if (Ce && F.get(p))
      return Ce == p;
    var xe = !0;
    F.set(u, p), F.set(p, u);
    for (var hn = Z; ++Be < he; ) {
      me = W[Be];
      var Jt = u[me], qn = p[me];
      if (T)
        var iu = Z ? T(qn, Jt, me, p, u, F) : T(Jt, qn, me, u, p, F);
      if (!(iu === void 0 ? Jt === qn || j(Jt, qn, w, T, F) : iu)) {
        xe = !1;
        break;
      }
      hn || (hn = me == "constructor");
    }
    if (xe && !hn) {
      var Ss = u.constructor, As = p.constructor;
      Ss != As && "constructor" in u && "constructor" in p && !(typeof Ss == "function" && Ss instanceof Ss && typeof As == "function" && As instanceof As) && (xe = !1);
    }
    return F.delete(u), F.delete(p), xe;
  }
  function _n(u) {
    return di(u, gi, mo);
  }
  function ut(u, p) {
    var w = u.__data__;
    return yo(p) ? w[typeof p == "string" ? "string" : "hash"] : w.map;
  }
  function Xt(u, p) {
    var w = ti(u, p);
    return uo(w) ? w : void 0;
  }
  function Qt(u) {
    var p = Ze.call(u, ct), w = u[ct];
    try {
      u[ct] = void 0;
      var T = !0;
    } catch {
    }
    var j = us.call(u);
    return T && (p ? u[ct] = w : delete u[ct]), j;
  }
  var mo = ar ? function(u) {
    return u == null ? [] : (u = Object(u), ss(ar(u), function(p) {
      return sr.call(u, p);
    }));
  } : xo, Nt = Mn;
  (si && Nt(new si(new ArrayBuffer(1))) != V || Nn && Nt(new Nn()) != b || ai && Nt(ai.resolve()) != E || oi && Nt(new oi()) != M || li && Nt(new li()) != q) && (Nt = function(u) {
    var p = Mn(u), w = p == S ? u.constructor : void 0, T = w ? Me(w) : "";
    if (T)
      switch (T) {
        case hs:
          return V;
        case Zt:
          return b;
        case Fa:
          return E;
        case $a:
          return M;
        case ja:
          return q;
      }
    return p;
  });
  function bo(u, p) {
    return p = p ?? a, !!p && (typeof u == "number" || es.test(u)) && u > -1 && u % 1 == 0 && u < p;
  }
  function yo(u) {
    var p = typeof u;
    return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? u !== "__proto__" : u === null;
  }
  function vo(u) {
    return !!cs && cs in u;
  }
  function wo(u) {
    var p = u && u.constructor, w = typeof p == "function" && p.prototype || Dn;
    return u === w;
  }
  function bs(u) {
    return us.call(u);
  }
  function Me(u) {
    if (u != null) {
      try {
        return ni.call(u);
      } catch {
      }
      try {
        return u + "";
      } catch {
      }
    }
    return "";
  }
  function ys(u, p) {
    return u === p || u !== u && p !== p;
  }
  var vs = gs(/* @__PURE__ */ function() {
    return arguments;
  }()) ? gs : function(u) {
    return Mt(u) && Ze.call(u, "callee") && !sr.call(u, "callee");
  }, ur = Array.isArray;
  function fi(u) {
    return u != null && pi(u.length) && !ws(u);
  }
  var dr = ii || So;
  function ko(u, p) {
    return ms(u, p);
  }
  function ws(u) {
    if (!ks(u))
      return !1;
    var p = Mn(u);
    return p == g || p == m || p == c || p == C;
  }
  function pi(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= a;
  }
  function ks(u) {
    var p = typeof u;
    return u != null && (p == "object" || p == "function");
  }
  function Mt(u) {
    return u != null && typeof u == "object";
  }
  var xs = Jr ? za(Jr) : ho;
  function gi(u) {
    return fi(u) ? lo(u) : fo(u);
  }
  function xo() {
    return [];
  }
  function So() {
    return !1;
  }
  r.exports = ko;
})(ea, ea.exports);
var sf = ea.exports, hc = {};
Object.defineProperty(hc, "__esModule", { value: !0 });
const L1 = rf, D1 = sf;
var kl;
(function(r) {
  function e(s = {}, a = {}, o = !1) {
    typeof s != "object" && (s = {}), typeof a != "object" && (a = {});
    let l = L1(a);
    o || (l = Object.keys(l).reduce((c, d) => (l[d] != null && (c[d] = l[d]), c), {}));
    for (const c in s)
      s[c] !== void 0 && a[c] === void 0 && (l[c] = s[c]);
    return Object.keys(l).length > 0 ? l : void 0;
  }
  r.compose = e;
  function t(s = {}, a = {}) {
    typeof s != "object" && (s = {}), typeof a != "object" && (a = {});
    const o = Object.keys(s).concat(Object.keys(a)).reduce((l, c) => (D1(s[c], a[c]) || (l[c] = a[c] === void 0 ? null : a[c]), l), {});
    return Object.keys(o).length > 0 ? o : void 0;
  }
  r.diff = t;
  function n(s = {}, a = {}) {
    s = s || {};
    const o = Object.keys(a).reduce((l, c) => (a[c] !== s[c] && s[c] !== void 0 && (l[c] = a[c]), l), {});
    return Object.keys(s).reduce((l, c) => (s[c] !== a[c] && a[c] === void 0 && (l[c] = null), l), o);
  }
  r.invert = n;
  function i(s, a, o = !1) {
    if (typeof s != "object")
      return a;
    if (typeof a != "object")
      return;
    if (!o)
      return a;
    const l = Object.keys(a).reduce((c, d) => (s[d] === void 0 && (c[d] = a[d]), c), {});
    return Object.keys(l).length > 0 ? l : void 0;
  }
  r.transform = i;
})(kl || (kl = {}));
hc.default = kl;
var wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
var xl;
(function(r) {
  function e(t) {
    return typeof t.delete == "number" ? t.delete : typeof t.retain == "number" ? t.retain : typeof t.retain == "object" && t.retain !== null ? 1 : typeof t.insert == "string" ? t.insert.length : 1;
  }
  r.length = e;
})(xl || (xl = {}));
wa.default = xl;
var fc = {};
Object.defineProperty(fc, "__esModule", { value: !0 });
const Pu = wa;
class I1 {
  constructor(e) {
    this.ops = e, this.index = 0, this.offset = 0;
  }
  hasNext() {
    return this.peekLength() < 1 / 0;
  }
  next(e) {
    e || (e = 1 / 0);
    const t = this.ops[this.index];
    if (t) {
      const n = this.offset, i = Pu.default.length(t);
      if (e >= i - n ? (e = i - n, this.index += 1, this.offset = 0) : this.offset += e, typeof t.delete == "number")
        return { delete: e };
      {
        const s = {};
        return t.attributes && (s.attributes = t.attributes), typeof t.retain == "number" ? s.retain = e : typeof t.retain == "object" && t.retain !== null ? s.retain = t.retain : typeof t.insert == "string" ? s.insert = t.insert.substr(n, e) : s.insert = t.insert, s;
      }
    } else
      return { retain: 1 / 0 };
  }
  peek() {
    return this.ops[this.index];
  }
  peekLength() {
    return this.ops[this.index] ? Pu.default.length(this.ops[this.index]) - this.offset : 1 / 0;
  }
  peekType() {
    const e = this.ops[this.index];
    return e ? typeof e.delete == "number" ? "delete" : typeof e.retain == "number" || typeof e.retain == "object" && e.retain !== null ? "retain" : "insert" : "retain";
  }
  rest() {
    if (this.hasNext()) {
      if (this.offset === 0)
        return this.ops.slice(this.index);
      {
        const e = this.offset, t = this.index, n = this.next(), i = this.ops.slice(this.index);
        return this.offset = e, this.index = t, [n].concat(i);
      }
    } else return [];
  }
}
fc.default = I1;
(function(r, e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
  const t = T1, n = rf, i = sf, s = hc;
  e.AttributeMap = s.default;
  const a = wa;
  e.Op = a.default;
  const o = fc;
  e.OpIterator = o.default;
  const l = "\0", c = (f, h) => {
    if (typeof f != "object" || f === null)
      throw new Error(`cannot retain a ${typeof f}`);
    if (typeof h != "object" || h === null)
      throw new Error(`cannot retain a ${typeof h}`);
    const g = Object.keys(f)[0];
    if (!g || g !== Object.keys(h)[0])
      throw new Error(`embed types not matched: ${g} != ${Object.keys(h)[0]}`);
    return [g, f[g], h[g]];
  };
  class d {
    constructor(h) {
      Array.isArray(h) ? this.ops = h : h != null && Array.isArray(h.ops) ? this.ops = h.ops : this.ops = [];
    }
    static registerEmbed(h, g) {
      this.handlers[h] = g;
    }
    static unregisterEmbed(h) {
      delete this.handlers[h];
    }
    static getHandler(h) {
      const g = this.handlers[h];
      if (!g)
        throw new Error(`no handlers for embed type "${h}"`);
      return g;
    }
    insert(h, g) {
      const m = {};
      return typeof h == "string" && h.length === 0 ? this : (m.insert = h, g != null && typeof g == "object" && Object.keys(g).length > 0 && (m.attributes = g), this.push(m));
    }
    delete(h) {
      return h <= 0 ? this : this.push({ delete: h });
    }
    retain(h, g) {
      if (typeof h == "number" && h <= 0)
        return this;
      const m = { retain: h };
      return g != null && typeof g == "object" && Object.keys(g).length > 0 && (m.attributes = g), this.push(m);
    }
    push(h) {
      let g = this.ops.length, m = this.ops[g - 1];
      if (h = n(h), typeof m == "object") {
        if (typeof h.delete == "number" && typeof m.delete == "number")
          return this.ops[g - 1] = { delete: m.delete + h.delete }, this;
        if (typeof m.delete == "number" && h.insert != null && (g -= 1, m = this.ops[g - 1], typeof m != "object"))
          return this.ops.unshift(h), this;
        if (i(h.attributes, m.attributes)) {
          if (typeof h.insert == "string" && typeof m.insert == "string")
            return this.ops[g - 1] = { insert: m.insert + h.insert }, typeof h.attributes == "object" && (this.ops[g - 1].attributes = h.attributes), this;
          if (typeof h.retain == "number" && typeof m.retain == "number")
            return this.ops[g - 1] = { retain: m.retain + h.retain }, typeof h.attributes == "object" && (this.ops[g - 1].attributes = h.attributes), this;
        }
      }
      return g === this.ops.length ? this.ops.push(h) : this.ops.splice(g, 0, h), this;
    }
    chop() {
      const h = this.ops[this.ops.length - 1];
      return h && typeof h.retain == "number" && !h.attributes && this.ops.pop(), this;
    }
    filter(h) {
      return this.ops.filter(h);
    }
    forEach(h) {
      this.ops.forEach(h);
    }
    map(h) {
      return this.ops.map(h);
    }
    partition(h) {
      const g = [], m = [];
      return this.forEach((b) => {
        (h(b) ? g : m).push(b);
      }), [g, m];
    }
    reduce(h, g) {
      return this.ops.reduce(h, g);
    }
    changeLength() {
      return this.reduce((h, g) => g.insert ? h + a.default.length(g) : g.delete ? h - g.delete : h, 0);
    }
    length() {
      return this.reduce((h, g) => h + a.default.length(g), 0);
    }
    slice(h = 0, g = 1 / 0) {
      const m = [], b = new o.default(this.ops);
      let k = 0;
      for (; k < g && b.hasNext(); ) {
        let y;
        k < h ? y = b.next(h - k) : (y = b.next(g - k), m.push(y)), k += a.default.length(y);
      }
      return new d(m);
    }
    compose(h) {
      const g = new o.default(this.ops), m = new o.default(h.ops), b = [], k = m.peek();
      if (k != null && typeof k.retain == "number" && k.attributes == null) {
        let S = k.retain;
        for (; g.peekType() === "insert" && g.peekLength() <= S; )
          S -= g.peekLength(), b.push(g.next());
        k.retain - S > 0 && m.next(k.retain - S);
      }
      const y = new d(b);
      for (; g.hasNext() || m.hasNext(); )
        if (m.peekType() === "insert")
          y.push(m.next());
        else if (g.peekType() === "delete")
          y.push(g.next());
        else {
          const S = Math.min(g.peekLength(), m.peekLength()), E = g.next(S), C = m.next(S);
          if (C.retain) {
            const D = {};
            if (typeof E.retain == "number")
              D.retain = typeof C.retain == "number" ? S : C.retain;
            else if (typeof C.retain == "number")
              E.retain == null ? D.insert = E.insert : D.retain = E.retain;
            else {
              const N = E.retain == null ? "insert" : "retain", [x, A, q] = c(E[N], C.retain), O = d.getHandler(x);
              D[N] = {
                [x]: O.compose(A, q, N === "retain")
              };
            }
            const M = s.default.compose(E.attributes, C.attributes, typeof E.retain == "number");
            if (M && (D.attributes = M), y.push(D), !m.hasNext() && i(y.ops[y.ops.length - 1], D)) {
              const N = new d(g.rest());
              return y.concat(N).chop();
            }
          } else typeof C.delete == "number" && (typeof E.retain == "number" || typeof E.retain == "object" && E.retain !== null) && y.push(C);
        }
      return y.chop();
    }
    concat(h) {
      const g = new d(this.ops.slice());
      return h.ops.length > 0 && (g.push(h.ops[0]), g.ops = g.ops.concat(h.ops.slice(1))), g;
    }
    diff(h, g) {
      if (this.ops === h.ops)
        return new d();
      const m = [this, h].map((E) => E.map((C) => {
        if (C.insert != null)
          return typeof C.insert == "string" ? C.insert : l;
        const D = E === h ? "on" : "with";
        throw new Error("diff() called " + D + " non-document");
      }).join("")), b = new d(), k = t(m[0], m[1], g, !0), y = new o.default(this.ops), S = new o.default(h.ops);
      return k.forEach((E) => {
        let C = E[1].length;
        for (; C > 0; ) {
          let D = 0;
          switch (E[0]) {
            case t.INSERT:
              D = Math.min(S.peekLength(), C), b.push(S.next(D));
              break;
            case t.DELETE:
              D = Math.min(C, y.peekLength()), y.next(D), b.delete(D);
              break;
            case t.EQUAL:
              D = Math.min(y.peekLength(), S.peekLength(), C);
              const M = y.next(D), N = S.next(D);
              i(M.insert, N.insert) ? b.retain(D, s.default.diff(M.attributes, N.attributes)) : b.push(N).delete(D);
              break;
          }
          C -= D;
        }
      }), b.chop();
    }
    eachLine(h, g = `
`) {
      const m = new o.default(this.ops);
      let b = new d(), k = 0;
      for (; m.hasNext(); ) {
        if (m.peekType() !== "insert")
          return;
        const y = m.peek(), S = a.default.length(y) - m.peekLength(), E = typeof y.insert == "string" ? y.insert.indexOf(g, S) - S : -1;
        if (E < 0)
          b.push(m.next());
        else if (E > 0)
          b.push(m.next(E));
        else {
          if (h(b, m.next(1).attributes || {}, k) === !1)
            return;
          k += 1, b = new d();
        }
      }
      b.length() > 0 && h(b, {}, k);
    }
    invert(h) {
      const g = new d();
      return this.reduce((m, b) => {
        if (b.insert)
          g.delete(a.default.length(b));
        else {
          if (typeof b.retain == "number" && b.attributes == null)
            return g.retain(b.retain), m + b.retain;
          if (b.delete || typeof b.retain == "number") {
            const k = b.delete || b.retain;
            return h.slice(m, m + k).forEach((S) => {
              b.delete ? g.push(S) : b.retain && b.attributes && g.retain(a.default.length(S), s.default.invert(b.attributes, S.attributes));
            }), m + k;
          } else if (typeof b.retain == "object" && b.retain !== null) {
            const k = h.slice(m, m + 1), y = new o.default(k.ops).next(), [S, E, C] = c(b.retain, y.insert), D = d.getHandler(S);
            return g.retain({ [S]: D.invert(E, C) }, s.default.invert(b.attributes, y.attributes)), m + 1;
          }
        }
        return m;
      }, 0), g.chop();
    }
    transform(h, g = !1) {
      if (g = !!g, typeof h == "number")
        return this.transformPosition(h, g);
      const m = h, b = new o.default(this.ops), k = new o.default(m.ops), y = new d();
      for (; b.hasNext() || k.hasNext(); )
        if (b.peekType() === "insert" && (g || k.peekType() !== "insert"))
          y.retain(a.default.length(b.next()));
        else if (k.peekType() === "insert")
          y.push(k.next());
        else {
          const S = Math.min(b.peekLength(), k.peekLength()), E = b.next(S), C = k.next(S);
          if (E.delete)
            continue;
          if (C.delete)
            y.push(C);
          else {
            const D = E.retain, M = C.retain;
            let N = typeof M == "object" && M !== null ? M : S;
            if (typeof D == "object" && D !== null && typeof M == "object" && M !== null) {
              const x = Object.keys(D)[0];
              if (x === Object.keys(M)[0]) {
                const A = d.getHandler(x);
                A && (N = {
                  [x]: A.transform(D[x], M[x], g)
                });
              }
            }
            y.retain(N, s.default.transform(E.attributes, C.attributes, g));
          }
        }
      return y.chop();
    }
    transformPosition(h, g = !1) {
      g = !!g;
      const m = new o.default(this.ops);
      let b = 0;
      for (; m.hasNext() && b <= h; ) {
        const k = m.peekLength(), y = m.peekType();
        if (m.next(), y === "delete") {
          h -= Math.min(k, h - b);
          continue;
        } else y === "insert" && (b < h || !g) && (h += k);
        b += k;
      }
      return h;
    }
  }
  d.Op = a.default, d.OpIterator = o.default, d.AttributeMap = s.default, d.handlers = {}, e.default = d, r.exports = d, r.exports.default = d;
})(wl, wl.exports);
var it = wl.exports;
const P = /* @__PURE__ */ Qh(it);
class At extends Ge {
  static value() {
  }
  optimize() {
    (this.prev || this.next) && this.remove();
  }
  length() {
    return 0;
  }
  value() {
    return "";
  }
}
At.blotName = "break";
At.tagName = "BR";
let wt = class extends Qs {
};
const O1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function ka(r) {
  return r.replace(/[&<>"']/g, (e) => O1[e]);
}
const Rt = class Rt extends lc {
  static compare(e, t) {
    const n = Rt.order.indexOf(e), i = Rt.order.indexOf(t);
    return n >= 0 || i >= 0 ? n - i : e === t ? 0 : e < t ? -1 : 1;
  }
  formatAt(e, t, n, i) {
    if (Rt.compare(this.statics.blotName, n) < 0 && this.scroll.query(n, B.BLOT)) {
      const s = this.isolate(e, t);
      i && s.wrap(n, i);
    } else
      super.formatAt(e, t, n, i);
  }
  optimize(e) {
    if (super.optimize(e), this.parent instanceof Rt && Rt.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const t = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(t), t.wrap(this);
    }
  }
};
_(Rt, "allowedChildren", [Rt, At, Ge, wt]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
_(Rt, "order", [
  "cursor",
  "inline",
  // Must be lower
  "link",
  // Chrome wants <a> to be lower
  "underline",
  "strike",
  "italic",
  "bold",
  "script",
  "code"
  // Must be higher
]);
let Ut = Rt;
const Bu = 1;
class Se extends zi {
  constructor() {
    super(...arguments);
    _(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = af(this)), this.cache.delta;
  }
  deleteAt(t, n) {
    super.deleteAt(t, n), this.cache = {};
  }
  formatAt(t, n, i, s) {
    n <= 0 || (this.scroll.query(i, B.BLOCK) ? t + n === this.length() && this.format(i, s) : super.formatAt(t, Math.min(n, this.length() - t - 1), i, s), this.cache = {});
  }
  insertAt(t, n, i) {
    if (i != null) {
      super.insertAt(t, n, i), this.cache = {};
      return;
    }
    if (n.length === 0) return;
    const s = n.split(`
`), a = s.shift();
    a.length > 0 && (t < this.length() - 1 || this.children.tail == null ? super.insertAt(Math.min(t, this.length() - 1), a) : this.children.tail.insertAt(this.children.tail.length(), a), this.cache = {});
    let o = this;
    s.reduce((l, c) => (o = o.split(l, !0), o.insertAt(0, c), c.length), t + a.length);
  }
  insertBefore(t, n) {
    const {
      head: i
    } = this.children;
    super.insertBefore(t, n), i instanceof At && i.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Bu), this.cache.length;
  }
  moveChildren(t, n) {
    super.moveChildren(t, n), this.cache = {};
  }
  optimize(t) {
    super.optimize(t), this.cache = {};
  }
  path(t) {
    return super.path(t, !0);
  }
  removeChild(t) {
    super.removeChild(t), this.cache = {};
  }
  split(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (n && (t === 0 || t >= this.length() - Bu)) {
      const s = this.clone();
      return t === 0 ? (this.parent.insertBefore(s, this), this) : (this.parent.insertBefore(s, this.next), s);
    }
    const i = super.split(t, n);
    return this.cache = {}, i;
  }
}
Se.blotName = "block";
Se.tagName = "P";
Se.defaultChild = At;
Se.allowedChildren = [At, Ut, Ge, wt];
class rt extends Ge {
  attach() {
    super.attach(), this.attributes = new ma(this.domNode);
  }
  delta() {
    return new P().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(e, t) {
    const n = this.scroll.query(e, B.BLOCK_ATTRIBUTE);
    n != null && this.attributes.attribute(n, t);
  }
  formatAt(e, t, n, i) {
    this.format(n, i);
  }
  insertAt(e, t, n) {
    if (n != null) {
      super.insertAt(e, t, n);
      return;
    }
    const i = t.split(`
`), s = i.pop(), a = i.map((l) => {
      const c = this.scroll.create(Se.blotName);
      return c.insertAt(0, l), c;
    }), o = this.split(e);
    a.forEach((l) => {
      this.parent.insertBefore(l, o);
    }), s && this.parent.insertBefore(this.scroll.create("text", s), o);
  }
}
rt.scope = B.BLOCK_BLOT;
function af(r) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return r.descendants(De).reduce((t, n) => n.length() === 0 ? t : t.insert(n.value(), et(n, {}, e)), new P()).insert(`
`, et(r));
}
function et(r) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return r == null || ("formats" in r && typeof r.formats == "function" && (e = {
    ...e,
    ...r.formats()
  }, t && delete e["code-token"]), r.parent == null || r.parent.statics.blotName === "scroll" || r.parent.statics.scope !== r.statics.scope) ? e : et(r.parent, e, t);
}
const Qe = class Qe extends Ge {
  // Zero width no break space
  static value() {
  }
  constructor(e, t, n) {
    super(e, t), this.selection = n, this.textNode = document.createTextNode(Qe.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
  }
  detach() {
    this.parent != null && this.parent.removeChild(this);
  }
  format(e, t) {
    if (this.savedLength !== 0) {
      super.format(e, t);
      return;
    }
    let n = this, i = 0;
    for (; n != null && n.statics.scope !== B.BLOCK_BLOT; )
      i += n.offset(n.parent), n = n.parent;
    n != null && (this.savedLength = Qe.CONTENTS.length, n.optimize(), n.formatAt(i, Qe.CONTENTS.length, e, t), this.savedLength = 0);
  }
  index(e, t) {
    return e === this.textNode ? 0 : super.index(e, t);
  }
  length() {
    return this.savedLength;
  }
  position() {
    return [this.textNode, this.textNode.data.length];
  }
  remove() {
    super.remove(), this.parent = null;
  }
  restore() {
    if (this.selection.composing || this.parent == null) return null;
    const e = this.selection.getNativeRange();
    for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
      this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
    const t = this.prev instanceof wt ? this.prev : null, n = t ? t.length() : 0, i = this.next instanceof wt ? this.next : null, s = i ? i.text : "", {
      textNode: a
    } = this, o = a.data.split(Qe.CONTENTS).join("");
    a.data = Qe.CONTENTS;
    let l;
    if (t)
      l = t, (o || i) && (t.insertAt(t.length(), o + s), i && i.remove());
    else if (i)
      l = i, i.insertAt(0, o);
    else {
      const c = document.createTextNode(o);
      l = this.scroll.create(c), this.parent.insertBefore(l, this);
    }
    if (this.remove(), e) {
      const c = (h, g) => t && h === t.domNode ? g : h === a ? n + g - 1 : i && h === i.domNode ? n + o.length + g : null, d = c(e.start.node, e.start.offset), f = c(e.end.node, e.end.offset);
      if (d !== null && f !== null)
        return {
          startNode: l.domNode,
          startOffset: d,
          endNode: l.domNode,
          endOffset: f
        };
    }
    return null;
  }
  update(e, t) {
    if (e.some((n) => n.type === "characterData" && n.target === this.textNode)) {
      const n = this.restore();
      n && (t.range = n);
    }
  }
  // Avoid .ql-cursor being a descendant of `<a/>`.
  // The reason is Safari pushes down `<a/>` on text insertion.
  // That will cause DOM nodes not sync with the model.
  //
  // For example ({I} is the caret), given the markup:
  //    <a><span class="ql-cursor">\uFEFF{I}</span></a>
  // When typing a char "x", `<a/>` will be pushed down inside the `<span>` first:
  //    <span class="ql-cursor"><a>\uFEFF{I}</a></span>
  // And then "x" will be inserted after `<a/>`:
  //    <span class="ql-cursor"><a>\uFEFF</a>d{I}</span>
  optimize(e) {
    super.optimize(e);
    let {
      parent: t
    } = this;
    for (; t; ) {
      if (t.domNode.tagName === "A") {
        this.savedLength = Qe.CONTENTS.length, t.isolate(this.offset(t), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      t = t.parent;
    }
  }
  value() {
    return "";
  }
};
_(Qe, "blotName", "cursor"), _(Qe, "className", "ql-cursor"), _(Qe, "tagName", "span"), _(Qe, "CONTENTS", "\uFEFF");
let qr = Qe;
var of = { exports: {} };
(function(r) {
  var e = Object.prototype.hasOwnProperty, t = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (t = !1));
  function i(l, c, d) {
    this.fn = l, this.context = c, this.once = d || !1;
  }
  function s(l, c, d, f, h) {
    if (typeof d != "function")
      throw new TypeError("The listener must be a function");
    var g = new i(d, f || l, h), m = t ? t + c : c;
    return l._events[m] ? l._events[m].fn ? l._events[m] = [l._events[m], g] : l._events[m].push(g) : (l._events[m] = g, l._eventsCount++), l;
  }
  function a(l, c) {
    --l._eventsCount === 0 ? l._events = new n() : delete l._events[c];
  }
  function o() {
    this._events = new n(), this._eventsCount = 0;
  }
  o.prototype.eventNames = function() {
    var c = [], d, f;
    if (this._eventsCount === 0) return c;
    for (f in d = this._events)
      e.call(d, f) && c.push(t ? f.slice(1) : f);
    return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(d)) : c;
  }, o.prototype.listeners = function(c) {
    var d = t ? t + c : c, f = this._events[d];
    if (!f) return [];
    if (f.fn) return [f.fn];
    for (var h = 0, g = f.length, m = new Array(g); h < g; h++)
      m[h] = f[h].fn;
    return m;
  }, o.prototype.listenerCount = function(c) {
    var d = t ? t + c : c, f = this._events[d];
    return f ? f.fn ? 1 : f.length : 0;
  }, o.prototype.emit = function(c, d, f, h, g, m) {
    var b = t ? t + c : c;
    if (!this._events[b]) return !1;
    var k = this._events[b], y = arguments.length, S, E;
    if (k.fn) {
      switch (k.once && this.removeListener(c, k.fn, void 0, !0), y) {
        case 1:
          return k.fn.call(k.context), !0;
        case 2:
          return k.fn.call(k.context, d), !0;
        case 3:
          return k.fn.call(k.context, d, f), !0;
        case 4:
          return k.fn.call(k.context, d, f, h), !0;
        case 5:
          return k.fn.call(k.context, d, f, h, g), !0;
        case 6:
          return k.fn.call(k.context, d, f, h, g, m), !0;
      }
      for (E = 1, S = new Array(y - 1); E < y; E++)
        S[E - 1] = arguments[E];
      k.fn.apply(k.context, S);
    } else {
      var C = k.length, D;
      for (E = 0; E < C; E++)
        switch (k[E].once && this.removeListener(c, k[E].fn, void 0, !0), y) {
          case 1:
            k[E].fn.call(k[E].context);
            break;
          case 2:
            k[E].fn.call(k[E].context, d);
            break;
          case 3:
            k[E].fn.call(k[E].context, d, f);
            break;
          case 4:
            k[E].fn.call(k[E].context, d, f, h);
            break;
          default:
            if (!S) for (D = 1, S = new Array(y - 1); D < y; D++)
              S[D - 1] = arguments[D];
            k[E].fn.apply(k[E].context, S);
        }
    }
    return !0;
  }, o.prototype.on = function(c, d, f) {
    return s(this, c, d, f, !1);
  }, o.prototype.once = function(c, d, f) {
    return s(this, c, d, f, !0);
  }, o.prototype.removeListener = function(c, d, f, h) {
    var g = t ? t + c : c;
    if (!this._events[g]) return this;
    if (!d)
      return a(this, g), this;
    var m = this._events[g];
    if (m.fn)
      m.fn === d && (!h || m.once) && (!f || m.context === f) && a(this, g);
    else {
      for (var b = 0, k = [], y = m.length; b < y; b++)
        (m[b].fn !== d || h && !m[b].once || f && m[b].context !== f) && k.push(m[b]);
      k.length ? this._events[g] = k.length === 1 ? k[0] : k : a(this, g);
    }
    return this;
  }, o.prototype.removeAllListeners = function(c) {
    var d;
    return c ? (d = t ? t + c : c, this._events[d] && a(this, d)) : (this._events = new n(), this._eventsCount = 0), this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = t, o.EventEmitter = o, r.exports = o;
})(of);
var N1 = of.exports;
const M1 = /* @__PURE__ */ Qh(N1), Sl = /* @__PURE__ */ new WeakMap(), Al = ["error", "warn", "log", "info"];
let El = "warn";
function lf(r) {
  if (El && Al.indexOf(r) <= Al.indexOf(El)) {
    for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
      t[n - 1] = arguments[n];
    console[r](...t);
  }
}
function cn(r) {
  return Al.reduce((e, t) => (e[t] = lf.bind(console, t, r), e), {});
}
cn.level = (r) => {
  El = r;
};
lf.level = cn.level;
const Do = cn("quill:events"), _1 = ["selectionchange", "mousedown", "mouseup", "click"];
_1.forEach((r) => {
  document.addEventListener(r, function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const s = Sl.get(i);
      s && s.emitter && s.emitter.handleDOM(...t);
    });
  });
});
class z extends M1 {
  constructor() {
    super(), this.domListeners = {}, this.on("error", Do.error);
  }
  emit() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return Do.log.call(Do, ...t), super.emit(...t);
  }
  handleDOM(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
      n[i - 1] = arguments[i];
    (this.domListeners[e.type] || []).forEach((s) => {
      let {
        node: a,
        handler: o
      } = s;
      (e.target === a || a.contains(e.target)) && o(e, ...n);
    });
  }
  listenDOM(e, t, n) {
    this.domListeners[e] || (this.domListeners[e] = []), this.domListeners[e].push({
      node: t,
      handler: n
    });
  }
}
_(z, "events", {
  EDITOR_CHANGE: "editor-change",
  SCROLL_BEFORE_UPDATE: "scroll-before-update",
  SCROLL_BLOT_MOUNT: "scroll-blot-mount",
  SCROLL_BLOT_UNMOUNT: "scroll-blot-unmount",
  SCROLL_OPTIMIZE: "scroll-optimize",
  SCROLL_UPDATE: "scroll-update",
  SCROLL_EMBED_UPDATE: "scroll-embed-update",
  SELECTION_CHANGE: "selection-change",
  TEXT_CHANGE: "text-change",
  COMPOSITION_BEFORE_START: "composition-before-start",
  COMPOSITION_START: "composition-start",
  COMPOSITION_BEFORE_END: "composition-before-end",
  COMPOSITION_END: "composition-end"
}), _(z, "sources", {
  API: "api",
  SILENT: "silent",
  USER: "user"
});
const Io = cn("quill:selection");
class Yn {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = e, this.length = t;
  }
}
class q1 {
  constructor(e, t) {
    this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Yn(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, z.sources.USER), 1);
    }), this.emitter.on(z.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const n = this.getNativeRange();
      n != null && n.start.node !== this.cursor.textNode && this.emitter.once(z.events.SCROLL_UPDATE, (i, s) => {
        try {
          this.root.contains(n.start.node) && this.root.contains(n.end.node) && this.setNativeRange(n.start.node, n.start.offset, n.end.node, n.end.offset);
          const a = s.some((o) => o.type === "characterData" || o.type === "childList" || o.type === "attributes" && o.target === this.root);
          this.update(a ? z.sources.SILENT : i);
        } catch {
        }
      });
    }), this.emitter.on(z.events.SCROLL_OPTIMIZE, (n, i) => {
      if (i.range) {
        const {
          startNode: s,
          startOffset: a,
          endNode: o,
          endOffset: l
        } = i.range;
        this.setNativeRange(s, a, o, l), this.update(z.sources.SILENT);
      }
    }), this.update(z.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(z.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(z.events.COMPOSITION_END, () => {
      if (this.composing = !1, this.cursor.parent) {
        const e = this.cursor.restore();
        if (!e) return;
        setTimeout(() => {
          this.setNativeRange(e.startNode, e.startOffset, e.endNode, e.endOffset);
        }, 1);
      }
    });
  }
  handleDragging() {
    this.emitter.listenDOM("mousedown", document.body, () => {
      this.mouseDown = !0;
    }), this.emitter.listenDOM("mouseup", document.body, () => {
      this.mouseDown = !1, this.update(z.sources.USER);
    });
  }
  focus() {
    this.hasFocus() || (this.root.focus({
      preventScroll: !0
    }), this.setRange(this.savedRange));
  }
  format(e, t) {
    this.scroll.update();
    const n = this.getNativeRange();
    if (!(n == null || !n.native.collapsed || this.scroll.query(e, B.BLOCK))) {
      if (n.start.node !== this.cursor.textNode) {
        const i = this.scroll.find(n.start.node, !1);
        if (i == null) return;
        if (i instanceof De) {
          const s = i.split(n.start.offset);
          i.parent.insertBefore(this.cursor, s);
        } else
          i.insertBefore(this.cursor, n.start.node);
        this.cursor.attach();
      }
      this.cursor.format(e, t), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
    }
  }
  getBounds(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const n = this.scroll.length();
    e = Math.min(e, n - 1), t = Math.min(e + t, n - 1) - e;
    let i, [s, a] = this.scroll.leaf(e);
    if (s == null) return null;
    if (t > 0 && a === s.length()) {
      const [d] = this.scroll.leaf(e + 1);
      if (d) {
        const [f] = this.scroll.line(e), [h] = this.scroll.line(e + 1);
        f === h && (s = d, a = 0);
      }
    }
    [i, a] = s.position(a, !0);
    const o = document.createRange();
    if (t > 0)
      return o.setStart(i, a), [s, a] = this.scroll.leaf(e + t), s == null ? null : ([i, a] = s.position(a, !0), o.setEnd(i, a), o.getBoundingClientRect());
    let l = "left", c;
    if (i instanceof Text) {
      if (!i.data.length)
        return null;
      a < i.data.length ? (o.setStart(i, a), o.setEnd(i, a + 1)) : (o.setStart(i, a - 1), o.setEnd(i, a), l = "right"), c = o.getBoundingClientRect();
    } else {
      if (!(s.domNode instanceof Element)) return null;
      c = s.domNode.getBoundingClientRect(), a > 0 && (l = "right");
    }
    return {
      bottom: c.top + c.height,
      height: c.height,
      left: c[l],
      right: c[l],
      top: c.top,
      width: 0
    };
  }
  getNativeRange() {
    const e = document.getSelection();
    if (e == null || e.rangeCount <= 0) return null;
    const t = e.getRangeAt(0);
    if (t == null) return null;
    const n = this.normalizeNative(t);
    return Io.info("getNativeRange", n), n;
  }
  getRange() {
    const e = this.scroll.domNode;
    if ("isConnected" in e && !e.isConnected)
      return [null, null];
    const t = this.getNativeRange();
    return t == null ? [null, null] : [this.normalizedToRange(t), t];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && Oo(this.root, document.activeElement);
  }
  normalizedToRange(e) {
    const t = [[e.start.node, e.start.offset]];
    e.native.collapsed || t.push([e.end.node, e.end.offset]);
    const n = t.map((a) => {
      const [o, l] = a, c = this.scroll.find(o, !0), d = c.offset(this.scroll);
      return l === 0 ? d : c instanceof De ? d + c.index(o, l) : d + c.length();
    }), i = Math.min(Math.max(...n), this.scroll.length() - 1), s = Math.min(i, ...n);
    return new Yn(s, i - s);
  }
  normalizeNative(e) {
    if (!Oo(this.root, e.startContainer) || !e.collapsed && !Oo(this.root, e.endContainer))
      return null;
    const t = {
      start: {
        node: e.startContainer,
        offset: e.startOffset
      },
      end: {
        node: e.endContainer,
        offset: e.endOffset
      },
      native: e
    };
    return [t.start, t.end].forEach((n) => {
      let {
        node: i,
        offset: s
      } = n;
      for (; !(i instanceof Text) && i.childNodes.length > 0; )
        if (i.childNodes.length > s)
          i = i.childNodes[s], s = 0;
        else if (i.childNodes.length === s)
          i = i.lastChild, i instanceof Text ? s = i.data.length : i.childNodes.length > 0 ? s = i.childNodes.length : s = i.childNodes.length + 1;
        else
          break;
      n.node = i, n.offset = s;
    }), t;
  }
  rangeToNative(e) {
    const t = this.scroll.length(), n = (i, s) => {
      i = Math.min(t - 1, i);
      const [a, o] = this.scroll.leaf(i);
      return a ? a.position(o, s) : [null, -1];
    };
    return [...n(e.index, !1), ...n(e.index + e.length, !0)];
  }
  setNativeRange(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : t, s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (Io.info("setNativeRange", e, t, n, i), e != null && (this.root.parentNode == null || e.parentNode == null || // @ts-expect-error Fix me later
    n.parentNode == null))
      return;
    const a = document.getSelection();
    if (a != null)
      if (e != null) {
        this.hasFocus() || this.root.focus({
          preventScroll: !0
        });
        const {
          native: o
        } = this.getNativeRange() || {};
        if (o == null || s || e !== o.startContainer || t !== o.startOffset || n !== o.endContainer || i !== o.endOffset) {
          e instanceof Element && e.tagName === "BR" && (t = Array.from(e.parentNode.childNodes).indexOf(e), e = e.parentNode), n instanceof Element && n.tagName === "BR" && (i = Array.from(n.parentNode.childNodes).indexOf(n), n = n.parentNode);
          const l = document.createRange();
          l.setStart(e, t), l.setEnd(n, i), a.removeAllRanges(), a.addRange(l);
        }
      } else
        a.removeAllRanges(), this.root.blur();
  }
  setRange(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : z.sources.API;
    if (typeof t == "string" && (n = t, t = !1), Io.info("setRange", e), e != null) {
      const i = this.rangeToNative(e);
      this.setNativeRange(...i, t);
    } else
      this.setNativeRange(null);
    this.update(n);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : z.sources.USER;
    const t = this.lastRange, [n, i] = this.getRange();
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !oc(t, this.lastRange)) {
      if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
        const a = this.cursor.restore();
        a && this.setNativeRange(a.startNode, a.startOffset, a.endNode, a.endOffset);
      }
      const s = [z.events.SELECTION_CHANGE, Cr(this.lastRange), Cr(t), e];
      this.emitter.emit(z.events.EDITOR_CHANGE, ...s), e !== z.sources.SILENT && this.emitter.emit(...s);
    }
  }
}
function Oo(r, e) {
  try {
    e.parentNode;
  } catch {
    return !1;
  }
  return r.contains(e);
}
const R1 = /^[ -~]*$/;
class z1 {
  constructor(e) {
    this.scroll = e, this.delta = this.getDelta();
  }
  applyDelta(e) {
    this.scroll.update();
    let t = this.scroll.length();
    this.scroll.batchStart();
    const n = Fu(e), i = new P();
    return B1(n.ops.slice()).reduce((a, o) => {
      const l = it.Op.length(o);
      let c = o.attributes || {}, d = !1, f = !1;
      if (o.insert != null) {
        if (i.retain(l), typeof o.insert == "string") {
          const m = o.insert;
          f = !m.endsWith(`
`) && (t <= a || !!this.scroll.descendant(rt, a)[0]), this.scroll.insertAt(a, m);
          const [b, k] = this.scroll.line(a);
          let y = xn({}, et(b));
          if (b instanceof Se) {
            const [S] = b.descendant(De, k);
            S && (y = xn(y, et(S)));
          }
          c = it.AttributeMap.diff(y, c) || {};
        } else if (typeof o.insert == "object") {
          const m = Object.keys(o.insert)[0];
          if (m == null) return a;
          const b = this.scroll.query(m, B.INLINE) != null;
          if (b)
            (t <= a || this.scroll.descendant(rt, a)[0]) && (f = !0);
          else if (a > 0) {
            const [k, y] = this.scroll.descendant(De, a - 1);
            k instanceof wt ? k.value()[y] !== `
` && (d = !0) : k instanceof Ge && k.statics.scope === B.INLINE_BLOT && (d = !0);
          }
          if (this.scroll.insertAt(a, m, o.insert[m]), b) {
            const [k] = this.scroll.descendant(De, a);
            if (k) {
              const y = xn({}, et(k));
              c = it.AttributeMap.diff(y, c) || {};
            }
          }
        }
        t += l;
      } else if (i.push(o), o.retain !== null && typeof o.retain == "object") {
        const m = Object.keys(o.retain)[0];
        if (m == null) return a;
        this.scroll.updateEmbedAt(a, m, o.retain[m]);
      }
      Object.keys(c).forEach((m) => {
        this.scroll.formatAt(a, l, m, c[m]);
      });
      const h = d ? 1 : 0, g = f ? 1 : 0;
      return t += h + g, i.retain(h), i.delete(g), a + l + h + g;
    }, 0), i.reduce((a, o) => typeof o.delete == "number" ? (this.scroll.deleteAt(a, o.delete), a) : a + it.Op.length(o), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
  }
  deleteText(e, t) {
    return this.scroll.deleteAt(e, t), this.update(new P().retain(e).delete(t));
  }
  formatLine(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(n).forEach((s) => {
      this.scroll.lines(e, Math.max(t, 1)).forEach((a) => {
        a.format(s, n[s]);
      });
    }), this.scroll.optimize();
    const i = new P().retain(e).retain(t, Cr(n));
    return this.update(i);
  }
  formatText(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((s) => {
      this.scroll.formatAt(e, t, s, n[s]);
    });
    const i = new P().retain(e).retain(t, Cr(n));
    return this.update(i);
  }
  getContents(e, t) {
    return this.delta.slice(e, e + t);
  }
  getDelta() {
    return this.scroll.lines().reduce((e, t) => e.concat(t.delta()), new P());
  }
  getFormat(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = [], i = [];
    t === 0 ? this.scroll.path(e).forEach((o) => {
      const [l] = o;
      l instanceof Se ? n.push(l) : l instanceof De && i.push(l);
    }) : (n = this.scroll.lines(e, t), i = this.scroll.descendants(De, e, t));
    const [s, a] = [n, i].map((o) => {
      const l = o.shift();
      if (l == null) return {};
      let c = et(l);
      for (; Object.keys(c).length > 0; ) {
        const d = o.shift();
        if (d == null) return c;
        c = P1(et(d), c);
      }
      return c;
    });
    return {
      ...s,
      ...a
    };
  }
  getHTML(e, t) {
    const [n, i] = this.scroll.line(e);
    if (n) {
      const s = n.length();
      return n.length() >= i + t && !(i === 0 && t === s) ? Bi(n, i, t, !0) : Bi(this.scroll, e, t, !0);
    }
    return "";
  }
  getText(e, t) {
    return this.getContents(e, t).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(e, t) {
    const n = Fu(t), i = new P().retain(e).concat(n);
    return this.scroll.insertContents(e, n), this.update(i);
  }
  insertEmbed(e, t, n) {
    return this.scroll.insertAt(e, t, n), this.update(new P().retain(e).insert({
      [t]: n
    }));
  }
  insertText(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return t = t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(e, t), Object.keys(n).forEach((i) => {
      this.scroll.formatAt(e, t.length, i, n[i]);
    }), this.update(new P().retain(e).insert(t, Cr(n)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const e = this.scroll.children.head;
    if ((e == null ? void 0 : e.statics.blotName) !== Se.blotName) return !1;
    const t = e;
    return t.children.length > 1 ? !1 : t.children.head instanceof At;
  }
  removeFormat(e, t) {
    const n = this.getText(e, t), [i, s] = this.scroll.line(e + t);
    let a = 0, o = new P();
    i != null && (a = i.length() - s, o = i.delta().slice(s, s + a - 1).insert(`
`));
    const c = this.getContents(e, t + a).diff(new P().insert(n).concat(o)), d = new P().retain(e).concat(c);
    return this.applyDelta(d);
  }
  update(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (t.length === 1 && t[0].type === "characterData" && // @ts-expect-error Fix me later
    t[0].target.data.match(R1) && this.scroll.find(t[0].target)) {
      const s = this.scroll.find(t[0].target), a = et(s), o = s.offset(this.scroll), l = t[0].oldValue.replace(qr.CONTENTS, ""), c = new P().insert(l), d = new P().insert(s.value()), f = n && {
        oldRange: $u(n.oldRange, -o),
        newRange: $u(n.newRange, -o)
      };
      e = new P().retain(o).concat(c.diff(d, f)).reduce((g, m) => m.insert ? g.insert(m.insert, a) : g.push(m), new P()), this.delta = i.compose(e);
    } else
      this.delta = this.getDelta(), (!e || !oc(i.compose(e), this.delta)) && (e = i.diff(this.delta, n));
    return e;
  }
}
function xr(r, e, t) {
  if (r.length === 0) {
    const [g] = No(t.pop());
    return e <= 0 ? `</li></${g}>` : `</li></${g}>${xr([], e - 1, t)}`;
  }
  const [{
    child: n,
    offset: i,
    length: s,
    indent: a,
    type: o
  }, ...l] = r, [c, d] = No(o);
  if (a > e)
    return t.push(o), a === e + 1 ? `<${c}><li${d}>${Bi(n, i, s)}${xr(l, a, t)}` : `<${c}><li>${xr(r, e + 1, t)}`;
  const f = t[t.length - 1];
  if (a === e && o === f)
    return `</li><li${d}>${Bi(n, i, s)}${xr(l, a, t)}`;
  const [h] = No(t.pop());
  return `</li></${h}>${xr(r, e - 1, t)}`;
}
function Bi(r, e, t) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in r && typeof r.html == "function")
    return r.html(e, t);
  if (r instanceof wt)
    return ka(r.value().slice(e, e + t)).replaceAll(" ", "&nbsp;");
  if (r instanceof yt) {
    if (r.statics.blotName === "list-container") {
      const c = [];
      return r.children.forEachAt(e, t, (d, f, h) => {
        const g = "formats" in d && typeof d.formats == "function" ? d.formats() : {};
        c.push({
          child: d,
          offset: f,
          length: h,
          indent: g.indent || 0,
          type: g.list
        });
      }), xr(c, -1, []);
    }
    const i = [];
    if (r.children.forEachAt(e, t, (c, d, f) => {
      i.push(Bi(c, d, f));
    }), n || r.statics.blotName === "list")
      return i.join("");
    const {
      outerHTML: s,
      innerHTML: a
    } = r.domNode, [o, l] = s.split(`>${a}<`);
    return o === "<table" ? `<table style="border: 1px solid #000;">${i.join("")}<${l}` : `${o}>${i.join("")}<${l}`;
  }
  return r.domNode instanceof Element ? r.domNode.outerHTML : "";
}
function P1(r, e) {
  return Object.keys(e).reduce((t, n) => {
    if (r[n] == null) return t;
    const i = e[n];
    return i === r[n] ? t[n] = i : Array.isArray(i) ? i.indexOf(r[n]) < 0 ? t[n] = i.concat([r[n]]) : t[n] = i : t[n] = [i, r[n]], t;
  }, {});
}
function No(r) {
  const e = r === "ordered" ? "ol" : "ul";
  switch (r) {
    case "checked":
      return [e, ' data-list="checked"'];
    case "unchecked":
      return [e, ' data-list="unchecked"'];
    default:
      return [e, ""];
  }
}
function Fu(r) {
  return r.reduce((e, t) => {
    if (typeof t.insert == "string") {
      const n = t.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return e.insert(n, t.attributes);
    }
    return e.push(t);
  }, new P());
}
function $u(r, e) {
  let {
    index: t,
    length: n
  } = r;
  return new Yn(t + e, n);
}
function B1(r) {
  const e = [];
  return r.forEach((t) => {
    typeof t.insert == "string" ? t.insert.split(`
`).forEach((i, s) => {
      s && e.push({
        insert: `
`,
        attributes: t.attributes
      }), i && e.push({
        insert: i,
        attributes: t.attributes
      });
    }) : e.push(t);
  }), e;
}
class Et {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = e, this.options = t;
  }
}
_(Et, "DEFAULTS", {});
const Cs = "\uFEFF";
class pc extends Ge {
  constructor(e, t) {
    super(e, t), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(Cs), this.rightGuard = document.createTextNode(Cs), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(e, t) {
    return e === this.leftGuard ? 0 : e === this.rightGuard ? 1 : super.index(e, t);
  }
  restore(e) {
    let t = null, n;
    const i = e.data.split(Cs).join("");
    if (e === this.leftGuard)
      if (this.prev instanceof wt) {
        const s = this.prev.length();
        this.prev.insertAt(s, i), t = {
          startNode: this.prev.domNode,
          startOffset: s + i.length
        };
      } else
        n = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(n), this), t = {
          startNode: n,
          startOffset: i.length
        };
    else e === this.rightGuard && (this.next instanceof wt ? (this.next.insertAt(0, i), t = {
      startNode: this.next.domNode,
      startOffset: i.length
    }) : (n = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(n), this.next), t = {
      startNode: n,
      startOffset: i.length
    }));
    return e.data = Cs, t;
  }
  update(e, t) {
    e.forEach((n) => {
      if (n.type === "characterData" && (n.target === this.leftGuard || n.target === this.rightGuard)) {
        const i = this.restore(n.target);
        i && (t.range = i);
      }
    });
  }
}
class F1 {
  constructor(e, t) {
    _(this, "isComposing", !1);
    this.scroll = e, this.emitter = t, this.setupListeners();
  }
  setupListeners() {
    this.scroll.domNode.addEventListener("compositionstart", (e) => {
      this.isComposing || this.handleCompositionStart(e);
    }), this.scroll.domNode.addEventListener("compositionend", (e) => {
      this.isComposing && queueMicrotask(() => {
        this.handleCompositionEnd(e);
      });
    });
  }
  handleCompositionStart(e) {
    const t = e.target instanceof Node ? this.scroll.find(e.target, !0) : null;
    t && !(t instanceof pc) && (this.emitter.emit(z.events.COMPOSITION_BEFORE_START, e), this.scroll.batchStart(), this.emitter.emit(z.events.COMPOSITION_START, e), this.isComposing = !0);
  }
  handleCompositionEnd(e) {
    this.emitter.emit(z.events.COMPOSITION_BEFORE_END, e), this.scroll.batchEnd(), this.emitter.emit(z.events.COMPOSITION_END, e), this.isComposing = !1;
  }
}
const Ni = class Ni {
  constructor(e, t) {
    _(this, "modules", {});
    this.quill = e, this.options = t;
  }
  init() {
    Object.keys(this.options.modules).forEach((e) => {
      this.modules[e] == null && this.addModule(e);
    });
  }
  addModule(e) {
    const t = this.quill.constructor.import(`modules/${e}`);
    return this.modules[e] = new t(this.quill, this.options.modules[e] || {}), this.modules[e];
  }
};
_(Ni, "DEFAULTS", {
  modules: {}
}), _(Ni, "themes", {
  default: Ni
});
let Rr = Ni;
const $1 = (r) => r.parentElement || r.getRootNode().host || null, j1 = (r) => {
  const e = r.getBoundingClientRect(), t = "offsetWidth" in r && Math.abs(e.width) / r.offsetWidth || 1, n = "offsetHeight" in r && Math.abs(e.height) / r.offsetHeight || 1;
  return {
    top: e.top,
    right: e.left + r.clientWidth * t,
    bottom: e.top + r.clientHeight * n,
    left: e.left
  };
}, Ts = (r) => {
  const e = parseInt(r, 10);
  return Number.isNaN(e) ? 0 : e;
}, ju = (r, e, t, n, i, s) => r < t && e > n ? 0 : r < t ? -(t - r + i) : e > n ? e - r > n - t ? r + i - t : e - n + s : 0, U1 = (r, e) => {
  var s, a, o;
  const t = r.ownerDocument;
  let n = e, i = r;
  for (; i; ) {
    const l = i === t.body, c = l ? {
      top: 0,
      right: ((s = window.visualViewport) == null ? void 0 : s.width) ?? t.documentElement.clientWidth,
      bottom: ((a = window.visualViewport) == null ? void 0 : a.height) ?? t.documentElement.clientHeight,
      left: 0
    } : j1(i), d = getComputedStyle(i), f = ju(n.left, n.right, c.left, c.right, Ts(d.scrollPaddingLeft), Ts(d.scrollPaddingRight)), h = ju(n.top, n.bottom, c.top, c.bottom, Ts(d.scrollPaddingTop), Ts(d.scrollPaddingBottom));
    if (f || h)
      if (l)
        (o = t.defaultView) == null || o.scrollBy(f, h);
      else {
        const {
          scrollLeft: g,
          scrollTop: m
        } = i;
        h && (i.scrollTop += h), f && (i.scrollLeft += f);
        const b = i.scrollLeft - g, k = i.scrollTop - m;
        n = {
          left: n.left - b,
          top: n.top - k,
          right: n.right - b,
          bottom: n.bottom - k
        };
      }
    i = l || d.position === "fixed" ? null : $1(i);
  }
}, H1 = 100, V1 = ["block", "break", "cursor", "inline", "scroll", "text"], Y1 = (r, e, t) => {
  const n = new _r();
  return V1.forEach((i) => {
    const s = e.query(i);
    s && n.register(s);
  }), r.forEach((i) => {
    let s = e.query(i);
    s || t.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let a = 0;
    for (; s; )
      if (n.register(s), s = "blotName" in s ? s.requiredContainer ?? null : null, a += 1, a > H1) {
        t.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, Lr = cn("quill"), Ls = new _r();
yt.uiClass = "ql-ui";
const ht = class ht {
  static debug(e) {
    e === !0 && (e = "log"), cn.level(e);
  }
  static find(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Sl.get(e) || Ls.find(e, t);
  }
  static import(e) {
    return this.imports[e] == null && Lr.error(`Cannot import ${e}. Are you sure it was registered?`), this.imports[e];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in e ? e.attrName : e.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, e, t) : Object.keys(e).forEach((i) => {
        this.register(i, e[i], t);
      });
    } else {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[e] != null && !n && Lr.warn(`Overwriting ${e} with`, t), this.imports[e] = t, (e.startsWith("blots/") || e.startsWith("formats/")) && t && typeof t != "boolean" && t.blotName !== "abstract" && Ls.register(t), typeof t.register == "function" && t.register(Ls);
    }
  }
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = K1(e, t), this.container = this.options.container, this.container == null) {
      Lr.error("Invalid Quill container", e);
      return;
    }
    this.options.debug && ht.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Sl.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new z();
    const i = cc.blotName, s = this.options.registry.query(i);
    if (!s || !("blotName" in s))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new s(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new z1(this.scroll), this.selection = new q1(this.scroll, this.emitter), this.composition = new F1(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(z.events.EDITOR_CHANGE, (a) => {
      a === z.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(z.events.SCROLL_UPDATE, (a, o) => {
      const l = this.selection.lastRange, [c] = this.selection.getRange(), d = l && c ? {
        oldRange: l,
        newRange: c
      } : void 0;
      dt.call(this, () => this.editor.update(null, o, d), a);
    }), this.emitter.on(z.events.SCROLL_EMBED_UPDATE, (a, o) => {
      const l = this.selection.lastRange, [c] = this.selection.getRange(), d = l && c ? {
        oldRange: l,
        newRange: c
      } : void 0;
      dt.call(this, () => {
        const f = new P().retain(a.offset(this)).retain({
          [a.statics.blotName]: o
        });
        return this.editor.update(f, [], d);
      }, ht.sources.USER);
    }), n) {
      const a = this.clipboard.convert({
        html: `${n}<p><br></p>`,
        text: `
`
      });
      this.setContents(a);
    }
    this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable(), this.allowReadOnlyEdits = !1;
  }
  addContainer(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (typeof e == "string") {
      const n = e;
      e = document.createElement("div"), e.classList.add(n);
    }
    return this.container.insertBefore(e, t), e;
  }
  blur() {
    this.selection.setRange(null);
  }
  deleteText(e, t, n) {
    return [e, t, , n] = en(e, t, n), dt.call(this, () => this.editor.deleteText(e, t), n, e, -1 * t);
  }
  disable() {
    this.enable(!1);
  }
  editReadOnly(e) {
    this.allowReadOnlyEdits = !0;
    const t = e();
    return this.allowReadOnlyEdits = !1, t;
  }
  enable() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.scroll.enable(e), this.container.classList.toggle("ql-disabled", !e);
  }
  focus() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.selection.focus(), e.preventScroll || this.scrollSelectionIntoView();
  }
  format(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : z.sources.API;
    return dt.call(this, () => {
      const i = this.getSelection(!0);
      let s = new P();
      if (i == null) return s;
      if (this.scroll.query(e, B.BLOCK))
        s = this.editor.formatLine(i.index, i.length, {
          [e]: t
        });
      else {
        if (i.length === 0)
          return this.selection.format(e, t), s;
        s = this.editor.formatText(i.index, i.length, {
          [e]: t
        });
      }
      return this.setSelection(i, z.sources.SILENT), s;
    }, n);
  }
  formatLine(e, t, n, i, s) {
    let a;
    return [e, t, a, s] = en(
      e,
      t,
      // @ts-expect-error
      n,
      i,
      s
    ), dt.call(this, () => this.editor.formatLine(e, t, a), s, e, 0);
  }
  formatText(e, t, n, i, s) {
    let a;
    return [e, t, a, s] = en(
      // @ts-expect-error
      e,
      t,
      n,
      i,
      s
    ), dt.call(this, () => this.editor.formatText(e, t, a), s, e, 0);
  }
  getBounds(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = null;
    if (typeof e == "number" ? n = this.selection.getBounds(e, t) : n = this.selection.getBounds(e.index, e.length), !n) return null;
    const i = this.container.getBoundingClientRect();
    return {
      bottom: n.bottom - i.top,
      height: n.height,
      left: n.left - i.left,
      right: n.right - i.left,
      top: n.top - i.top,
      width: n.width
    };
  }
  getContents() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - e;
    return [e, t] = en(e, t), this.editor.getContents(e, t);
  }
  getFormat() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return typeof e == "number" ? this.editor.getFormat(e, t) : this.editor.getFormat(e.index, e.length);
  }
  getIndex(e) {
    return e.offset(this.scroll);
  }
  getLength() {
    return this.scroll.length();
  }
  getLeaf(e) {
    return this.scroll.leaf(e);
  }
  getLine(e) {
    return this.scroll.line(e);
  }
  getLines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    return typeof e != "number" ? this.scroll.lines(e.index, e.length) : this.scroll.lines(e, t);
  }
  getModule(e) {
    return this.theme.modules[e];
  }
  getSelection() {
    return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) && this.focus(), this.update(), this.selection.getRange()[0];
  }
  getSemanticHTML() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = en(e, t), this.editor.getHTML(e, t);
  }
  getText() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = en(e, t), this.editor.getText(e, t);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(e, t, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ht.sources.API;
    return dt.call(this, () => this.editor.insertEmbed(e, t, n), i, e);
  }
  insertText(e, t, n, i, s) {
    let a;
    return [e, , a, s] = en(e, 0, n, i, s), dt.call(this, () => this.editor.insertText(e, t, a), s, e, t.length);
  }
  isEnabled() {
    return this.scroll.isEnabled();
  }
  off() {
    return this.emitter.off(...arguments);
  }
  on() {
    return this.emitter.on(...arguments);
  }
  once() {
    return this.emitter.once(...arguments);
  }
  removeFormat(e, t, n) {
    return [e, t, , n] = en(e, t, n), dt.call(this, () => this.editor.removeFormat(e, t), n, e);
  }
  scrollRectIntoView(e) {
    U1(this.root, e);
  }
  /**
   * @deprecated Use Quill#scrollSelectionIntoView() instead.
   */
  scrollIntoView() {
    console.warn("Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead."), this.scrollSelectionIntoView();
  }
  /**
   * Scroll the current selection into the visible area.
   * If the selection is already visible, no scrolling will occur.
   */
  scrollSelectionIntoView() {
    const e = this.selection.lastRange, t = e && this.selection.getBounds(e.index, e.length);
    t && this.scrollRectIntoView(t);
  }
  setContents(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : z.sources.API;
    return dt.call(this, () => {
      e = new P(e);
      const n = this.getLength(), i = this.editor.deleteText(0, n), s = this.editor.insertContents(0, e), a = this.editor.deleteText(this.getLength() - 1, 1);
      return i.compose(s).compose(a);
    }, t);
  }
  setSelection(e, t, n) {
    e == null ? this.selection.setRange(null, t || ht.sources.API) : ([e, t, , n] = en(e, t, n), this.selection.setRange(new Yn(Math.max(0, e), t), n), n !== z.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : z.sources.API;
    const n = new P().insert(e);
    return this.setContents(n, t);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : z.sources.USER;
    const t = this.scroll.update(e);
    return this.selection.update(e), t;
  }
  updateContents(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : z.sources.API;
    return dt.call(this, () => (e = new P(e), this.editor.applyDelta(e)), t, !0);
  }
};
_(ht, "DEFAULTS", {
  bounds: null,
  modules: {
    clipboard: !0,
    keyboard: !0,
    history: !0,
    uploader: !0
  },
  placeholder: "",
  readOnly: !1,
  registry: Ls,
  theme: "default"
}), _(ht, "events", z.events), _(ht, "sources", z.sources), _(ht, "version", "2.0.3"), _(ht, "imports", {
  delta: P,
  parchment: b1,
  "core/module": Et,
  "core/theme": Rr
});
let L = ht;
function Uu(r) {
  return typeof r == "string" ? document.querySelector(r) : r;
}
function Mo(r) {
  return Object.entries(r ?? {}).reduce((e, t) => {
    let [n, i] = t;
    return {
      ...e,
      [n]: i === !0 ? {} : i
    };
  }, {});
}
function Hu(r) {
  return Object.fromEntries(Object.entries(r).filter((e) => e[1] !== void 0));
}
function K1(r, e) {
  const t = Uu(r);
  if (!t)
    throw new Error("Invalid Quill container");
  const i = !e.theme || e.theme === L.DEFAULTS.theme ? Rr : L.import(`themes/${e.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
  const {
    modules: s,
    ...a
  } = L.DEFAULTS, {
    modules: o,
    ...l
  } = i.DEFAULTS;
  let c = Mo(e.modules);
  c != null && c.toolbar && c.toolbar.constructor !== Object && (c = {
    ...c,
    toolbar: {
      container: c.toolbar
    }
  });
  const d = xn({}, Mo(s), Mo(o), c), f = {
    ...a,
    ...Hu(l),
    ...Hu(e)
  };
  let h = e.registry;
  return h ? e.formats && Lr.warn('Ignoring "formats" option because "registry" is specified') : h = e.formats ? Y1(e.formats, f.registry, Lr) : f.registry, {
    ...f,
    registry: h,
    container: t,
    theme: i,
    modules: Object.entries(d).reduce((g, m) => {
      let [b, k] = m;
      if (!k) return g;
      const y = L.import(`modules/${b}`);
      return y == null ? (Lr.error(`Cannot load ${b} module. Are you sure you registered it?`), g) : {
        ...g,
        // @ts-expect-error
        [b]: xn({}, y.DEFAULTS || {}, k)
      };
    }, {}),
    bounds: Uu(f.bounds)
  };
}
function dt(r, e, t, n) {
  if (!this.isEnabled() && e === z.sources.USER && !this.allowReadOnlyEdits)
    return new P();
  let i = t == null ? null : this.getSelection();
  const s = this.editor.delta, a = r();
  if (i != null && (t === !0 && (t = i.index), n == null ? i = Vu(i, a, e) : n !== 0 && (i = Vu(i, t, n, e)), this.setSelection(i, z.sources.SILENT)), a.length() > 0) {
    const o = [z.events.TEXT_CHANGE, a, s, e];
    this.emitter.emit(z.events.EDITOR_CHANGE, ...o), e !== z.sources.SILENT && this.emitter.emit(...o);
  }
  return a;
}
function en(r, e, t, n, i) {
  let s = {};
  return typeof r.index == "number" && typeof r.length == "number" ? typeof e != "number" ? (i = n, n = t, t = e, e = r.length, r = r.index) : (e = r.length, r = r.index) : typeof e != "number" && (i = n, n = t, t = e, e = 0), typeof t == "object" ? (s = t, i = n) : typeof t == "string" && (n != null ? s[t] = n : i = t), i = i || z.sources.API, [r, e, s, i];
}
function Vu(r, e, t, n) {
  const i = typeof t == "number" ? t : 0;
  if (r == null) return null;
  let s, a;
  return e && typeof e.transformPosition == "function" ? [s, a] = [r.index, r.index + r.length].map((o) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    e.transformPosition(o, n !== z.sources.USER)
  )) : [s, a] = [r.index, r.index + r.length].map((o) => o < e || o === e && n === z.sources.USER ? o : i >= 0 ? o + i : Math.max(e, o + i)), new Yn(s, a - s);
}
class Qn extends ba {
}
function Yu(r) {
  return r instanceof Se || r instanceof rt;
}
function Ku(r) {
  return typeof r.updateContent == "function";
}
class Sr extends cc {
  constructor(e, t, n) {
    let {
      emitter: i
    } = n;
    super(e, t), this.emitter = i, this.batch = !1, this.optimize(), this.enable(), this.domNode.addEventListener("dragstart", (s) => this.handleDragStart(s));
  }
  batchStart() {
    Array.isArray(this.batch) || (this.batch = []);
  }
  batchEnd() {
    if (!this.batch) return;
    const e = this.batch;
    this.batch = !1, this.update(e);
  }
  emitMount(e) {
    this.emitter.emit(z.events.SCROLL_BLOT_MOUNT, e);
  }
  emitUnmount(e) {
    this.emitter.emit(z.events.SCROLL_BLOT_UNMOUNT, e);
  }
  emitEmbedUpdate(e, t) {
    this.emitter.emit(z.events.SCROLL_EMBED_UPDATE, e, t);
  }
  deleteAt(e, t) {
    const [n, i] = this.line(e), [s] = this.line(e + t);
    if (super.deleteAt(e, t), s != null && n !== s && i > 0) {
      if (n instanceof rt || s instanceof rt) {
        this.optimize();
        return;
      }
      const a = s.children.head instanceof At ? null : s.children.head;
      n.moveChildren(s, a), n.remove();
    }
    this.optimize();
  }
  enable() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.domNode.setAttribute("contenteditable", e ? "true" : "false");
  }
  formatAt(e, t, n, i) {
    super.formatAt(e, t, n, i), this.optimize();
  }
  insertAt(e, t, n) {
    if (e >= this.length())
      if (n == null || this.scroll.query(t, B.BLOCK) == null) {
        const i = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(i), n == null && t.endsWith(`
`) ? i.insertAt(0, t.slice(0, -1), n) : i.insertAt(0, t, n);
      } else {
        const i = this.scroll.create(t, n);
        this.appendChild(i);
      }
    else
      super.insertAt(e, t, n);
    this.optimize();
  }
  insertBefore(e, t) {
    if (e.statics.scope === B.INLINE_BLOT) {
      const n = this.scroll.create(this.statics.defaultChild.blotName);
      n.appendChild(e), super.insertBefore(n, t);
    } else
      super.insertBefore(e, t);
  }
  insertContents(e, t) {
    const n = this.deltaToRenderBlocks(t.concat(new P().insert(`
`))), i = n.pop();
    if (i == null) return;
    this.batchStart();
    const s = n.shift();
    if (s) {
      const l = s.type === "block" && (s.delta.length() === 0 || !this.descendant(rt, e)[0] && e < this.length()), c = s.type === "block" ? s.delta : new P().insert({
        [s.key]: s.value
      });
      _o(this, e, c);
      const d = s.type === "block" ? 1 : 0, f = e + c.length() + d;
      l && this.insertAt(f - 1, `
`);
      const h = et(this.line(e)[0]), g = it.AttributeMap.diff(h, s.attributes) || {};
      Object.keys(g).forEach((m) => {
        this.formatAt(f - 1, 1, m, g[m]);
      }), e = f;
    }
    let [a, o] = this.children.find(e);
    if (n.length && (a && (a = a.split(o), o = 0), n.forEach((l) => {
      if (l.type === "block") {
        const c = this.createBlock(l.attributes, a || void 0);
        _o(c, 0, l.delta);
      } else {
        const c = this.create(l.key, l.value);
        this.insertBefore(c, a || void 0), Object.keys(l.attributes).forEach((d) => {
          c.format(d, l.attributes[d]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const l = a ? a.offset(a.scroll) + o : this.length();
      _o(this, l, i.delta);
    }
    this.batchEnd(), this.optimize();
  }
  isEnabled() {
    return this.domNode.getAttribute("contenteditable") === "true";
  }
  leaf(e) {
    const t = this.path(e).pop();
    if (!t)
      return [null, -1];
    const [n, i] = t;
    return n instanceof De ? [n, i] : [null, -1];
  }
  line(e) {
    return e === this.length() ? this.line(e - 1) : this.descendant(Yu, e);
  }
  lines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, s, a) => {
      let o = [], l = a;
      return i.children.forEachAt(s, a, (c, d, f) => {
        Yu(c) ? o.push(c) : c instanceof ba && (o = o.concat(n(c, d, l))), l -= f;
      }), o;
    };
    return n(this, e, t);
  }
  optimize() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(e, t), e.length > 0 && this.emitter.emit(z.events.SCROLL_OPTIMIZE, e, t));
  }
  path(e) {
    return super.path(e).slice(1);
  }
  remove() {
  }
  update(e) {
    if (this.batch) {
      Array.isArray(e) && (this.batch = this.batch.concat(e));
      return;
    }
    let t = z.sources.USER;
    typeof e == "string" && (t = e), Array.isArray(e) || (e = this.observer.takeRecords()), e = e.filter((n) => {
      let {
        target: i
      } = n;
      const s = this.find(i, !0);
      return s && !Ku(s);
    }), e.length > 0 && this.emitter.emit(z.events.SCROLL_BEFORE_UPDATE, t, e), super.update(e.concat([])), e.length > 0 && this.emitter.emit(z.events.SCROLL_UPDATE, t, e);
  }
  updateEmbedAt(e, t, n) {
    const [i] = this.descendant((s) => s instanceof rt, e);
    i && i.statics.blotName === t && Ku(i) && i.updateContent(n);
  }
  handleDragStart(e) {
    e.preventDefault();
  }
  deltaToRenderBlocks(e) {
    const t = [];
    let n = new P();
    return e.forEach((i) => {
      const s = i == null ? void 0 : i.insert;
      if (s)
        if (typeof s == "string") {
          const a = s.split(`
`);
          a.slice(0, -1).forEach((l) => {
            n.insert(l, i.attributes), t.push({
              type: "block",
              delta: n,
              attributes: i.attributes ?? {}
            }), n = new P();
          });
          const o = a[a.length - 1];
          o && n.insert(o, i.attributes);
        } else {
          const a = Object.keys(s)[0];
          if (!a) return;
          this.query(a, B.INLINE) ? n.push(i) : (n.length() && t.push({
            type: "block",
            delta: n,
            attributes: {}
          }), n = new P(), t.push({
            type: "blockEmbed",
            key: a,
            value: s[a],
            attributes: i.attributes ?? {}
          }));
        }
    }), n.length() && t.push({
      type: "block",
      delta: n,
      attributes: {}
    }), t;
  }
  createBlock(e, t) {
    let n;
    const i = {};
    Object.entries(e).forEach((o) => {
      let [l, c] = o;
      this.query(l, B.BLOCK & B.BLOT) != null ? n = l : i[l] = c;
    });
    const s = this.create(n || this.statics.defaultChild.blotName, n ? e[n] : void 0);
    this.insertBefore(s, t || void 0);
    const a = s.length();
    return Object.entries(i).forEach((o) => {
      let [l, c] = o;
      s.formatAt(0, a, l, c);
    }), s;
  }
}
_(Sr, "blotName", "scroll"), _(Sr, "className", "ql-editor"), _(Sr, "tagName", "DIV"), _(Sr, "defaultChild", Se), _(Sr, "allowedChildren", [Se, rt, Qn]);
function _o(r, e, t) {
  t.reduce((n, i) => {
    const s = it.Op.length(i);
    let a = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const o = i.insert;
        r.insertAt(n, o);
        const [l] = r.descendant(De, n), c = et(l);
        a = it.AttributeMap.diff(c, a) || {};
      } else if (typeof i.insert == "object") {
        const o = Object.keys(i.insert)[0];
        if (o == null) return n;
        if (r.insertAt(n, o, i.insert[o]), r.scroll.query(o, B.INLINE) != null) {
          const [c] = r.descendant(De, n), d = et(c);
          a = it.AttributeMap.diff(d, a) || {};
        }
      }
    }
    return Object.keys(a).forEach((o) => {
      r.formatAt(n, s, o, a[o]);
    }), n + s;
  }, e);
}
const gc = {
  scope: B.BLOCK,
  whitelist: ["right", "center", "justify"]
}, G1 = new jt("align", "align", gc), cf = new St("align", "ql-align", gc), uf = new Ln("align", "text-align", gc);
class df extends Ln {
  value(e) {
    let t = super.value(e);
    return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : t;
  }
}
const W1 = new St("color", "ql-color", {
  scope: B.INLINE
}), mc = new df("color", "color", {
  scope: B.INLINE
}), Z1 = new St("background", "ql-bg", {
  scope: B.INLINE
}), bc = new df("background", "background-color", {
  scope: B.INLINE
});
class Jn extends Qn {
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("spellcheck", "false"), t;
  }
  code(e, t) {
    return this.children.map((n) => n.length() <= 1 ? "" : n.domNode.innerText).join(`
`).slice(e, e + t);
  }
  html(e, t) {
    return `<pre>
${ka(this.code(e, t))}
</pre>`;
  }
}
class Ie extends Se {
  static register() {
    L.register(Jn);
  }
}
_(Ie, "TAB", "  ");
class yc extends Ut {
}
yc.blotName = "code";
yc.tagName = "CODE";
Ie.blotName = "code-block";
Ie.className = "ql-code-block";
Ie.tagName = "DIV";
Jn.blotName = "code-block-container";
Jn.className = "ql-code-block-container";
Jn.tagName = "DIV";
Jn.allowedChildren = [Ie];
Ie.allowedChildren = [wt, At, qr];
Ie.requiredContainer = Jn;
const vc = {
  scope: B.BLOCK,
  whitelist: ["rtl"]
}, hf = new jt("direction", "dir", vc), ff = new St("direction", "ql-direction", vc), pf = new Ln("direction", "direction", vc), gf = {
  scope: B.INLINE,
  whitelist: ["serif", "monospace"]
}, mf = new St("font", "ql-font", gf);
class X1 extends Ln {
  value(e) {
    return super.value(e).replace(/["']/g, "");
  }
}
const bf = new X1("font", "font-family", gf), yf = new St("size", "ql-size", {
  scope: B.INLINE,
  whitelist: ["small", "large", "huge"]
}), vf = new Ln("size", "font-size", {
  scope: B.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), Q1 = cn("quill:keyboard"), J1 = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class xa extends Et {
  static match(e, t) {
    return ["altKey", "ctrlKey", "metaKey", "shiftKey"].some((n) => !!t[n] !== e[n] && t[n] !== null) ? !1 : t.key === e.key || t.key === e.which;
  }
  constructor(e, t) {
    super(e, t), this.bindings = {}, Object.keys(this.options.bindings).forEach((n) => {
      this.options.bindings[n] && this.addBinding(this.options.bindings[n]);
    }), this.addBinding({
      key: "Enter",
      shiftKey: null
    }, this.handleEnter), this.addBinding({
      key: "Enter",
      metaKey: null,
      ctrlKey: null,
      altKey: null
    }, () => {
    }), /Firefox/i.test(navigator.userAgent) ? (this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !0
    }, this.handleBackspace), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !0
    }, this.handleDelete)) : (this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !0,
      prefix: /^.?$/
    }, this.handleBackspace), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !0,
      suffix: /^.?$/
    }, this.handleDelete)), this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !1
    }, this.handleDeleteRange), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !1
    }, this.handleDeleteRange), this.addBinding({
      key: "Backspace",
      altKey: null,
      ctrlKey: null,
      metaKey: null,
      shiftKey: null
    }, {
      collapsed: !0,
      offset: 0
    }, this.handleBackspace), this.listen();
  }
  addBinding(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const i = t0(e);
    if (i == null) {
      Q1.warn("Attempted to add invalid keyboard binding", i);
      return;
    }
    typeof t == "function" && (t = {
      handler: t
    }), typeof n == "function" && (n = {
      handler: n
    }), (Array.isArray(i.key) ? i.key : [i.key]).forEach((a) => {
      const o = {
        ...i,
        key: a,
        ...t,
        ...n
      };
      this.bindings[o.key] = this.bindings[o.key] || [], this.bindings[o.key].push(o);
    });
  }
  listen() {
    this.quill.root.addEventListener("keydown", (e) => {
      if (e.defaultPrevented || e.isComposing || e.keyCode === 229 && (e.key === "Enter" || e.key === "Backspace")) return;
      const i = (this.bindings[e.key] || []).concat(this.bindings[e.which] || []).filter((y) => xa.match(e, y));
      if (i.length === 0) return;
      const s = L.find(e.target, !0);
      if (s && s.scroll !== this.quill.scroll) return;
      const a = this.quill.getSelection();
      if (a == null || !this.quill.hasFocus()) return;
      const [o, l] = this.quill.getLine(a.index), [c, d] = this.quill.getLeaf(a.index), [f, h] = a.length === 0 ? [c, d] : this.quill.getLeaf(a.index + a.length), g = c instanceof Qs ? c.value().slice(0, d) : "", m = f instanceof Qs ? f.value().slice(h) : "", b = {
        collapsed: a.length === 0,
        // @ts-expect-error Fix me later
        empty: a.length === 0 && o.length() <= 1,
        format: this.quill.getFormat(a),
        line: o,
        offset: l,
        prefix: g,
        suffix: m,
        event: e
      };
      i.some((y) => {
        if (y.collapsed != null && y.collapsed !== b.collapsed || y.empty != null && y.empty !== b.empty || y.offset != null && y.offset !== b.offset)
          return !1;
        if (Array.isArray(y.format)) {
          if (y.format.every((S) => b.format[S] == null))
            return !1;
        } else if (typeof y.format == "object" && !Object.keys(y.format).every((S) => y.format[S] === !0 ? b.format[S] != null : y.format[S] === !1 ? b.format[S] == null : oc(y.format[S], b.format[S])))
          return !1;
        return y.prefix != null && !y.prefix.test(b.prefix) || y.suffix != null && !y.suffix.test(b.suffix) ? !1 : y.handler.call(this, a, b, y) !== !0;
      }) && e.preventDefault();
    });
  }
  handleBackspace(e, t) {
    const n = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(t.prefix) ? 2 : 1;
    if (e.index === 0 || this.quill.getLength() <= 1) return;
    let i = {};
    const [s] = this.quill.getLine(e.index);
    let a = new P().retain(e.index - n).delete(n);
    if (t.offset === 0) {
      const [o] = this.quill.getLine(e.index - 1);
      if (o && !(o.statics.blotName === "block" && o.length() <= 1)) {
        const c = s.formats(), d = this.quill.getFormat(e.index - 1, 1);
        if (i = it.AttributeMap.diff(c, d) || {}, Object.keys(i).length > 0) {
          const f = new P().retain(e.index + s.length() - 2).retain(1, i);
          a = a.compose(f);
        }
      }
    }
    this.quill.updateContents(a, L.sources.USER), this.quill.focus();
  }
  handleDelete(e, t) {
    const n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(t.suffix) ? 2 : 1;
    if (e.index >= this.quill.getLength() - n) return;
    let i = {};
    const [s] = this.quill.getLine(e.index);
    let a = new P().retain(e.index).delete(n);
    if (t.offset >= s.length() - 1) {
      const [o] = this.quill.getLine(e.index + 1);
      if (o) {
        const l = s.formats(), c = this.quill.getFormat(e.index, 1);
        i = it.AttributeMap.diff(l, c) || {}, Object.keys(i).length > 0 && (a = a.retain(o.length() - 1).retain(1, i));
      }
    }
    this.quill.updateContents(a, L.sources.USER), this.quill.focus();
  }
  handleDeleteRange(e) {
    wc({
      range: e,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(e, t) {
    const n = Object.keys(t.format).reduce((s, a) => (this.quill.scroll.query(a, B.BLOCK) && !Array.isArray(t.format[a]) && (s[a] = t.format[a]), s), {}), i = new P().retain(e.index).delete(e.length).insert(`
`, n);
    this.quill.updateContents(i, L.sources.USER), this.quill.setSelection(e.index + 1, L.sources.SILENT), this.quill.focus();
  }
}
const e0 = {
  bindings: {
    bold: qo("bold"),
    italic: qo("italic"),
    underline: qo("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(r, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "+1", L.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(r, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "-1", L.sources.USER), !1);
      }
    },
    "outdent backspace": {
      key: "Backspace",
      collapsed: !0,
      shiftKey: null,
      metaKey: null,
      ctrlKey: null,
      altKey: null,
      format: ["indent", "list"],
      offset: 0,
      handler(r, e) {
        e.format.indent != null ? this.quill.format("indent", "-1", L.sources.USER) : e.format.list != null && this.quill.format("list", !1, L.sources.USER);
      }
    },
    "indent code-block": Gu(!0),
    "outdent code-block": Gu(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(r) {
        this.quill.deleteText(r.index - 1, 1, L.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(r, e) {
        if (e.format.table) return !0;
        this.quill.history.cutoff();
        const t = new P().retain(r.index).delete(r.length).insert("	");
        return this.quill.updateContents(t, L.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(r.index + 1, L.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, L.sources.USER);
      }
    },
    "list empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["list"],
      empty: !0,
      handler(r, e) {
        const t = {
          list: !1
        };
        e.format.indent && (t.indent = !1), this.quill.formatLine(r.index, r.length, t, L.sources.USER);
      }
    },
    "checklist enter": {
      key: "Enter",
      collapsed: !0,
      format: {
        list: "checked"
      },
      handler(r) {
        const [e, t] = this.quill.getLine(r.index), n = {
          // @ts-expect-error Fix me later
          ...e.formats(),
          list: "checked"
        }, i = new P().retain(r.index).insert(`
`, n).retain(e.length() - t - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(i, L.sources.USER), this.quill.setSelection(r.index + 1, L.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(r, e) {
        const [t, n] = this.quill.getLine(r.index), i = new P().retain(r.index).insert(`
`, e.format).retain(t.length() - n - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(i, L.sources.USER), this.quill.setSelection(r.index + 1, L.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "table backspace": {
      key: "Backspace",
      format: ["table"],
      collapsed: !0,
      offset: 0,
      handler() {
      }
    },
    "table delete": {
      key: "Delete",
      format: ["table"],
      collapsed: !0,
      suffix: /^$/,
      handler() {
      }
    },
    "table enter": {
      key: "Enter",
      shiftKey: null,
      format: ["table"],
      handler(r) {
        const e = this.quill.getModule("table");
        if (e) {
          const [t, n, i, s] = e.getTable(r), a = n0(t, n, i, s);
          if (a == null) return;
          let o = t.offset();
          if (a < 0) {
            const l = new P().retain(o).insert(`
`);
            this.quill.updateContents(l, L.sources.USER), this.quill.setSelection(r.index + 1, r.length, L.sources.SILENT);
          } else if (a > 0) {
            o += t.length();
            const l = new P().retain(o).insert(`
`);
            this.quill.updateContents(l, L.sources.USER), this.quill.setSelection(o, L.sources.USER);
          }
        }
      }
    },
    "table tab": {
      key: "Tab",
      shiftKey: null,
      format: ["table"],
      handler(r, e) {
        const {
          event: t,
          line: n
        } = e, i = n.offset(this.quill.scroll);
        t.shiftKey ? this.quill.setSelection(i - 1, L.sources.USER) : this.quill.setSelection(i + n.length(), L.sources.USER);
      }
    },
    "list autofill": {
      key: " ",
      shiftKey: null,
      collapsed: !0,
      format: {
        "code-block": !1,
        blockquote: !1,
        table: !1
      },
      prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
      handler(r, e) {
        if (this.quill.scroll.query("list") == null) return !0;
        const {
          length: t
        } = e.prefix, [n, i] = this.quill.getLine(r.index);
        if (i > t) return !0;
        let s;
        switch (e.prefix.trim()) {
          case "[]":
          case "[ ]":
            s = "unchecked";
            break;
          case "[x]":
            s = "checked";
            break;
          case "-":
          case "*":
            s = "bullet";
            break;
          default:
            s = "ordered";
        }
        this.quill.insertText(r.index, " ", L.sources.USER), this.quill.history.cutoff();
        const a = new P().retain(r.index - i).delete(t + 1).retain(n.length() - 2 - i).retain(1, {
          list: s
        });
        return this.quill.updateContents(a, L.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(r.index - t, L.sources.SILENT), !1;
      }
    },
    "code exit": {
      key: "Enter",
      collapsed: !0,
      format: ["code-block"],
      prefix: /^$/,
      suffix: /^\s*$/,
      handler(r) {
        const [e, t] = this.quill.getLine(r.index);
        let n = 2, i = e;
        for (; i != null && i.length() <= 1 && i.formats()["code-block"]; )
          if (i = i.prev, n -= 1, n <= 0) {
            const s = new P().retain(r.index + e.length() - t - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(s, L.sources.USER), this.quill.setSelection(r.index - 1, L.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": Ds("ArrowLeft", !1),
    "embed left shift": Ds("ArrowLeft", !0),
    "embed right": Ds("ArrowRight", !1),
    "embed right shift": Ds("ArrowRight", !0),
    "table down": Wu(!1),
    "table up": Wu(!0)
  }
};
xa.DEFAULTS = e0;
function Gu(r) {
  return {
    key: "Tab",
    shiftKey: !r,
    format: {
      "code-block": !0
    },
    handler(e, t) {
      let {
        event: n
      } = t;
      const i = this.quill.scroll.query("code-block"), {
        TAB: s
      } = i;
      if (e.length === 0 && !n.shiftKey) {
        this.quill.insertText(e.index, s, L.sources.USER), this.quill.setSelection(e.index + s.length, L.sources.SILENT);
        return;
      }
      const a = e.length === 0 ? this.quill.getLines(e.index, 1) : this.quill.getLines(e);
      let {
        index: o,
        length: l
      } = e;
      a.forEach((c, d) => {
        r ? (c.insertAt(0, s), d === 0 ? o += s.length : l += s.length) : c.domNode.textContent.startsWith(s) && (c.deleteAt(0, s.length), d === 0 ? o -= s.length : l -= s.length);
      }), this.quill.update(L.sources.USER), this.quill.setSelection(o, l, L.sources.SILENT);
    }
  };
}
function Ds(r, e) {
  return {
    key: r,
    shiftKey: e,
    altKey: null,
    [r === "ArrowLeft" ? "prefix" : "suffix"]: /^$/,
    handler(n) {
      let {
        index: i
      } = n;
      r === "ArrowRight" && (i += n.length + 1);
      const [s] = this.quill.getLeaf(i);
      return s instanceof Ge ? (r === "ArrowLeft" ? e ? this.quill.setSelection(n.index - 1, n.length + 1, L.sources.USER) : this.quill.setSelection(n.index - 1, L.sources.USER) : e ? this.quill.setSelection(n.index, n.length + 1, L.sources.USER) : this.quill.setSelection(n.index + n.length + 1, L.sources.USER), !1) : !0;
    }
  };
}
function qo(r) {
  return {
    key: r[0],
    shortKey: !0,
    handler(e, t) {
      this.quill.format(r, !t.format[r], L.sources.USER);
    }
  };
}
function Wu(r) {
  return {
    key: r ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(e, t) {
      const n = r ? "prev" : "next", i = t.line, s = i.parent[n];
      if (s != null) {
        if (s.statics.blotName === "table-row") {
          let a = s.children.head, o = i;
          for (; o.prev != null; )
            o = o.prev, a = a.next;
          const l = a.offset(this.quill.scroll) + Math.min(t.offset, a.length() - 1);
          this.quill.setSelection(l, 0, L.sources.USER);
        }
      } else {
        const a = i.table()[n];
        a != null && (r ? this.quill.setSelection(a.offset(this.quill.scroll) + a.length() - 1, 0, L.sources.USER) : this.quill.setSelection(a.offset(this.quill.scroll), 0, L.sources.USER));
      }
      return !1;
    }
  };
}
function t0(r) {
  if (typeof r == "string" || typeof r == "number")
    r = {
      key: r
    };
  else if (typeof r == "object")
    r = Cr(r);
  else
    return null;
  return r.shortKey && (r[J1] = r.shortKey, delete r.shortKey), r;
}
function wc(r) {
  let {
    quill: e,
    range: t
  } = r;
  const n = e.getLines(t);
  let i = {};
  if (n.length > 1) {
    const s = n[0].formats(), a = n[n.length - 1].formats();
    i = it.AttributeMap.diff(a, s) || {};
  }
  e.deleteText(t, L.sources.USER), Object.keys(i).length > 0 && e.formatLine(t.index, 1, i, L.sources.USER), e.setSelection(t.index, L.sources.SILENT);
}
function n0(r, e, t, n) {
  return e.prev == null && e.next == null ? t.prev == null && t.next == null ? n === 0 ? -1 : 1 : t.prev == null ? -1 : 1 : e.prev == null ? -1 : e.next == null ? 1 : null;
}
const r0 = /font-weight:\s*normal/, i0 = ["P", "OL", "UL"], Zu = (r) => r && i0.includes(r.tagName), s0 = (r) => {
  Array.from(r.querySelectorAll("br")).filter((e) => Zu(e.previousElementSibling) && Zu(e.nextElementSibling)).forEach((e) => {
    var t;
    (t = e.parentNode) == null || t.removeChild(e);
  });
}, a0 = (r) => {
  Array.from(r.querySelectorAll('b[style*="font-weight"]')).filter((e) => {
    var t;
    return (t = e.getAttribute("style")) == null ? void 0 : t.match(r0);
  }).forEach((e) => {
    var n;
    const t = r.createDocumentFragment();
    t.append(...e.childNodes), (n = e.parentNode) == null || n.replaceChild(t, e);
  });
};
function o0(r) {
  r.querySelector('[id^="docs-internal-guid-"]') && (a0(r), s0(r));
}
const l0 = /\bmso-list:[^;]*ignore/i, c0 = /\bmso-list:[^;]*\bl(\d+)/i, u0 = /\bmso-list:[^;]*\blevel(\d+)/i, d0 = (r, e) => {
  const t = r.getAttribute("style"), n = t == null ? void 0 : t.match(c0);
  if (!n)
    return null;
  const i = Number(n[1]), s = t == null ? void 0 : t.match(u0), a = s ? Number(s[1]) : 1, o = new RegExp(`@list l${i}:level${a}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), l = e.match(o), c = l && l[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: a,
    type: c,
    element: r
  };
}, h0 = (r) => {
  var a, o;
  const e = Array.from(r.querySelectorAll("[style*=mso-list]")), t = [], n = [];
  e.forEach((l) => {
    (l.getAttribute("style") || "").match(l0) ? t.push(l) : n.push(l);
  }), t.forEach((l) => {
    var c;
    return (c = l.parentNode) == null ? void 0 : c.removeChild(l);
  });
  const i = r.documentElement.innerHTML, s = n.map((l) => d0(l, i)).filter((l) => l);
  for (; s.length; ) {
    const l = [];
    let c = s.shift();
    for (; c; )
      l.push(c), c = s.length && ((a = s[0]) == null ? void 0 : a.element) === c.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      s[0].id === c.id ? s.shift() : null;
    const d = document.createElement("ul");
    l.forEach((g) => {
      const m = document.createElement("li");
      m.setAttribute("data-list", g.type), g.indent > 1 && m.setAttribute("class", `ql-indent-${g.indent - 1}`), m.innerHTML = g.element.innerHTML, d.appendChild(m);
    });
    const f = (o = l[0]) == null ? void 0 : o.element, {
      parentNode: h
    } = f ?? {};
    f && (h == null || h.replaceChild(d, f)), l.slice(1).forEach((g) => {
      let {
        element: m
      } = g;
      h == null || h.removeChild(m);
    });
  }
};
function f0(r) {
  r.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && h0(r);
}
const p0 = [f0, o0], g0 = (r) => {
  r.documentElement && p0.forEach((e) => {
    e(r);
  });
}, m0 = cn("quill:clipboard"), b0 = [[Node.TEXT_NODE, D0], [Node.TEXT_NODE, Qu], ["br", x0], [Node.ELEMENT_NODE, Qu], [Node.ELEMENT_NODE, k0], [Node.ELEMENT_NODE, w0], [Node.ELEMENT_NODE, T0], ["li", E0], ["ol, ul", C0], ["pre", S0], ["tr", L0], ["b", Ro("bold")], ["i", Ro("italic")], ["strike", Ro("strike")], ["style", A0]], y0 = [G1, hf].reduce((r, e) => (r[e.keyName] = e, r), {}), Xu = [uf, bc, mc, pf, bf, vf].reduce((r, e) => (r[e.keyName] = e, r), {});
class wf extends Et {
  constructor(e, t) {
    super(e, t), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], b0.concat(this.options.matchers ?? []).forEach((n) => {
      let [i, s] = n;
      this.addMatcher(i, s);
    });
  }
  addMatcher(e, t) {
    this.matchers.push([e, t]);
  }
  convert(e) {
    let {
      html: t,
      text: n
    } = e, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (i[Ie.blotName])
      return new P().insert(n || "", {
        [Ie.blotName]: i[Ie.blotName]
      });
    if (!t)
      return new P().insert(n || "", i);
    const s = this.convertHTML(t);
    return Gi(s, `
`) && (s.ops[s.ops.length - 1].attributes == null || i.table) ? s.compose(new P().retain(s.length() - 1).delete(1)) : s;
  }
  normalizeHTML(e) {
    g0(e);
  }
  convertHTML(e) {
    const t = new DOMParser().parseFromString(e, "text/html");
    this.normalizeHTML(t);
    const n = t.body, i = /* @__PURE__ */ new WeakMap(), [s, a] = this.prepareMatching(n, i);
    return kc(this.quill.scroll, n, s, a, i);
  }
  dangerouslyPasteHTML(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : L.sources.API;
    if (typeof e == "string") {
      const i = this.convert({
        html: e,
        text: ""
      });
      this.quill.setContents(i, t), this.quill.setSelection(0, L.sources.SILENT);
    } else {
      const i = this.convert({
        html: t,
        text: ""
      });
      this.quill.updateContents(new P().retain(e).concat(i), n), this.quill.setSelection(e + i.length(), L.sources.SILENT);
    }
  }
  onCaptureCopy(e) {
    var a, o;
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (e.defaultPrevented) return;
    e.preventDefault();
    const [n] = this.quill.selection.getRange();
    if (n == null) return;
    const {
      html: i,
      text: s
    } = this.onCopy(n, t);
    (a = e.clipboardData) == null || a.setData("text/plain", s), (o = e.clipboardData) == null || o.setData("text/html", i), t && wc({
      range: n,
      quill: this.quill
    });
  }
  /*
   * https://www.iana.org/assignments/media-types/text/uri-list
   */
  normalizeURIList(e) {
    return e.split(/\r?\n/).filter((t) => t[0] !== "#").join(`
`);
  }
  onCapturePaste(e) {
    var a, o, l, c, d;
    if (e.defaultPrevented || !this.quill.isEnabled()) return;
    e.preventDefault();
    const t = this.quill.getSelection(!0);
    if (t == null) return;
    const n = (a = e.clipboardData) == null ? void 0 : a.getData("text/html");
    let i = (o = e.clipboardData) == null ? void 0 : o.getData("text/plain");
    if (!n && !i) {
      const f = (l = e.clipboardData) == null ? void 0 : l.getData("text/uri-list");
      f && (i = this.normalizeURIList(f));
    }
    const s = Array.from(((c = e.clipboardData) == null ? void 0 : c.files) || []);
    if (!n && s.length > 0) {
      this.quill.uploader.upload(t, s);
      return;
    }
    if (n && s.length > 0) {
      const f = new DOMParser().parseFromString(n, "text/html");
      if (f.body.childElementCount === 1 && ((d = f.body.firstElementChild) == null ? void 0 : d.tagName) === "IMG") {
        this.quill.uploader.upload(t, s);
        return;
      }
    }
    this.onPaste(t, {
      html: n,
      text: i
    });
  }
  onCopy(e) {
    const t = this.quill.getText(e);
    return {
      html: this.quill.getSemanticHTML(e),
      text: t
    };
  }
  onPaste(e, t) {
    let {
      text: n,
      html: i
    } = t;
    const s = this.quill.getFormat(e.index), a = this.convert({
      text: n,
      html: i
    }, s);
    m0.log("onPaste", a, {
      text: n,
      html: i
    });
    const o = new P().retain(e.index).delete(e.length).concat(a);
    this.quill.updateContents(o, L.sources.USER), this.quill.setSelection(o.length() - e.length, L.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(e, t) {
    const n = [], i = [];
    return this.matchers.forEach((s) => {
      const [a, o] = s;
      switch (a) {
        case Node.TEXT_NODE:
          i.push(o);
          break;
        case Node.ELEMENT_NODE:
          n.push(o);
          break;
        default:
          Array.from(e.querySelectorAll(a)).forEach((l) => {
            if (t.has(l)) {
              const c = t.get(l);
              c == null || c.push(o);
            } else
              t.set(l, [o]);
          });
          break;
      }
    }), [n, i];
  }
}
_(wf, "DEFAULTS", {
  matchers: []
});
function er(r, e, t, n) {
  return n.query(e) ? r.reduce((i, s) => {
    if (!s.insert) return i;
    if (s.attributes && s.attributes[e])
      return i.push(s);
    const a = t ? {
      [e]: t
    } : {};
    return i.insert(s.insert, {
      ...a,
      ...s.attributes
    });
  }, new P()) : r;
}
function Gi(r, e) {
  let t = "";
  for (let n = r.ops.length - 1; n >= 0 && t.length < e.length; --n) {
    const i = r.ops[n];
    if (typeof i.insert != "string") break;
    t = i.insert + t;
  }
  return t.slice(-1 * e.length) === e;
}
function wn(r, e) {
  if (!(r instanceof Element)) return !1;
  const t = e.query(r);
  return t && t.prototype instanceof Ge ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(r.tagName.toLowerCase());
}
function v0(r, e) {
  return r.previousElementSibling && r.nextElementSibling && !wn(r.previousElementSibling, e) && !wn(r.nextElementSibling, e);
}
const Is = /* @__PURE__ */ new WeakMap();
function kf(r) {
  return r == null ? !1 : (Is.has(r) || (r.tagName === "PRE" ? Is.set(r, !0) : Is.set(r, kf(r.parentNode))), Is.get(r));
}
function kc(r, e, t, n, i) {
  return e.nodeType === e.TEXT_NODE ? n.reduce((s, a) => a(e, s, r), new P()) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((s, a) => {
    let o = kc(r, a, t, n, i);
    return a.nodeType === e.ELEMENT_NODE && (o = t.reduce((l, c) => c(a, l, r), o), o = (i.get(a) || []).reduce((l, c) => c(a, l, r), o)), s.concat(o);
  }, new P()) : new P();
}
function Ro(r) {
  return (e, t, n) => er(t, r, !0, n);
}
function w0(r, e, t) {
  const n = jt.keys(r), i = St.keys(r), s = Ln.keys(r), a = {};
  return n.concat(i).concat(s).forEach((o) => {
    let l = t.query(o, B.ATTRIBUTE);
    l != null && (a[l.attrName] = l.value(r), a[l.attrName]) || (l = y0[o], l != null && (l.attrName === o || l.keyName === o) && (a[l.attrName] = l.value(r) || void 0), l = Xu[o], l != null && (l.attrName === o || l.keyName === o) && (l = Xu[o], a[l.attrName] = l.value(r) || void 0));
  }), Object.entries(a).reduce((o, l) => {
    let [c, d] = l;
    return er(o, c, d, t);
  }, e);
}
function k0(r, e, t) {
  const n = t.query(r);
  if (n == null) return e;
  if (n.prototype instanceof Ge) {
    const i = {}, s = n.value(r);
    if (s != null)
      return i[n.blotName] = s, new P().insert(i, n.formats(r, t));
  } else if (n.prototype instanceof zi && !Gi(e, `
`) && e.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return er(e, n.blotName, n.formats(r, t), t);
  return e;
}
function x0(r, e) {
  return Gi(e, `
`) || e.insert(`
`), e;
}
function S0(r, e, t) {
  const n = t.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(r, t) : !0;
  return er(e, "code-block", i, t);
}
function A0() {
  return new P();
}
function E0(r, e, t) {
  const n = t.query(r);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !Gi(e, `
`))
    return e;
  let i = -1, s = r.parentNode;
  for (; s != null; )
    ["OL", "UL"].includes(s.tagName) && (i += 1), s = s.parentNode;
  return i <= 0 ? e : e.reduce((a, o) => o.insert ? o.attributes && typeof o.attributes.indent == "number" ? a.push(o) : a.insert(o.insert, {
    indent: i,
    ...o.attributes || {}
  }) : a, new P());
}
function C0(r, e, t) {
  const n = r;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const s = n.getAttribute("data-checked");
  return s && (i = s === "true" ? "checked" : "unchecked"), er(e, "list", i, t);
}
function Qu(r, e, t) {
  if (!Gi(e, `
`)) {
    if (wn(r, t) && (r.childNodes.length > 0 || r instanceof HTMLParagraphElement))
      return e.insert(`
`);
    if (e.length() > 0 && r.nextSibling) {
      let n = r.nextSibling;
      for (; n != null; ) {
        if (wn(n, t))
          return e.insert(`
`);
        const i = t.query(n);
        if (i && i.prototype instanceof rt)
          return e.insert(`
`);
        n = n.firstChild;
      }
    }
  }
  return e;
}
function T0(r, e, t) {
  var s;
  const n = {}, i = r.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), ((s = i.fontWeight) != null && s.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), e = Object.entries(n).reduce((a, o) => {
    let [l, c] = o;
    return er(a, l, c, t);
  }, e), parseFloat(i.textIndent || 0) > 0 ? new P().insert("	").concat(e) : e;
}
function L0(r, e, t) {
  var i, s;
  const n = ((i = r.parentElement) == null ? void 0 : i.tagName) === "TABLE" ? r.parentElement : (s = r.parentElement) == null ? void 0 : s.parentElement;
  if (n != null) {
    const o = Array.from(n.querySelectorAll("tr")).indexOf(r) + 1;
    return er(e, "table", o, t);
  }
  return e;
}
function D0(r, e, t) {
  var i;
  let n = r.data;
  if (((i = r.parentElement) == null ? void 0 : i.tagName) === "O:P")
    return e.insert(n.trim());
  if (!kf(r)) {
    if (n.trim().length === 0 && n.includes(`
`) && !v0(r, t))
      return e;
    n = n.replace(/[^\S\u00a0]/g, " "), n = n.replace(/ {2,}/g, " "), (r.previousSibling == null && r.parentElement != null && wn(r.parentElement, t) || r.previousSibling instanceof Element && wn(r.previousSibling, t)) && (n = n.replace(/^ /, "")), (r.nextSibling == null && r.parentElement != null && wn(r.parentElement, t) || r.nextSibling instanceof Element && wn(r.nextSibling, t)) && (n = n.replace(/ $/, "")), n = n.replaceAll(" ", " ");
  }
  return e.insert(n);
}
class xf extends Et {
  constructor(t, n) {
    super(t, n);
    _(this, "lastRecorded", 0);
    _(this, "ignoreChange", !1);
    _(this, "stack", {
      undo: [],
      redo: []
    });
    _(this, "currentRange", null);
    this.quill.on(L.events.EDITOR_CHANGE, (i, s, a, o) => {
      i === L.events.SELECTION_CHANGE ? s && o !== L.sources.SILENT && (this.currentRange = s) : i === L.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || o === L.sources.USER ? this.record(s, a) : this.transform(s)), this.currentRange = Cl(this.currentRange, s));
    }), this.quill.keyboard.addBinding({
      key: "z",
      shortKey: !0
    }, this.undo.bind(this)), this.quill.keyboard.addBinding({
      key: ["z", "Z"],
      shortKey: !0,
      shiftKey: !0
    }, this.redo.bind(this)), /Win/i.test(navigator.platform) && this.quill.keyboard.addBinding({
      key: "y",
      shortKey: !0
    }, this.redo.bind(this)), this.quill.root.addEventListener("beforeinput", (i) => {
      i.inputType === "historyUndo" ? (this.undo(), i.preventDefault()) : i.inputType === "historyRedo" && (this.redo(), i.preventDefault());
    });
  }
  change(t, n) {
    if (this.stack[t].length === 0) return;
    const i = this.stack[t].pop();
    if (!i) return;
    const s = this.quill.getContents(), a = i.delta.invert(s);
    this.stack[n].push({
      delta: a,
      range: Cl(i.range, a)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(i.delta, L.sources.USER), this.ignoreChange = !1, this.restoreSelection(i);
  }
  clear() {
    this.stack = {
      undo: [],
      redo: []
    };
  }
  cutoff() {
    this.lastRecorded = 0;
  }
  record(t, n) {
    if (t.ops.length === 0) return;
    this.stack.redo = [];
    let i = t.invert(n), s = this.currentRange;
    const a = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > a && this.stack.undo.length > 0
    ) {
      const o = this.stack.undo.pop();
      o && (i = i.compose(o.delta), s = o.range);
    } else
      this.lastRecorded = a;
    i.length() !== 0 && (this.stack.undo.push({
      delta: i,
      range: s
    }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
  }
  redo() {
    this.change("redo", "undo");
  }
  transform(t) {
    Ju(this.stack.undo, t), Ju(this.stack.redo, t);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(t) {
    if (t.range)
      this.quill.setSelection(t.range, L.sources.USER);
    else {
      const n = O0(this.quill.scroll, t.delta);
      this.quill.setSelection(n, L.sources.USER);
    }
  }
}
_(xf, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: !1
});
function Ju(r, e) {
  let t = e;
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = r[n];
    r[n] = {
      delta: t.transform(i.delta, !0),
      range: i.range && Cl(i.range, t)
    }, t = i.delta.transform(t), r[n].delta.length() === 0 && r.splice(n, 1);
  }
}
function I0(r, e) {
  const t = e.ops[e.ops.length - 1];
  return t == null ? !1 : t.insert != null ? typeof t.insert == "string" && t.insert.endsWith(`
`) : t.attributes != null ? Object.keys(t.attributes).some((n) => r.query(n, B.BLOCK) != null) : !1;
}
function O0(r, e) {
  const t = e.reduce((i, s) => i + (s.delete || 0), 0);
  let n = e.length() - t;
  return I0(r, e) && (n -= 1), n;
}
function Cl(r, e) {
  if (!r) return r;
  const t = e.transformPosition(r.index), n = e.transformPosition(r.index + r.length);
  return {
    index: t,
    length: n - t
  };
}
class Sf extends Et {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("drop", (n) => {
      var a;
      n.preventDefault();
      let i = null;
      if (document.caretRangeFromPoint)
        i = document.caretRangeFromPoint(n.clientX, n.clientY);
      else if (document.caretPositionFromPoint) {
        const o = document.caretPositionFromPoint(n.clientX, n.clientY);
        i = document.createRange(), i.setStart(o.offsetNode, o.offset), i.setEnd(o.offsetNode, o.offset);
      }
      const s = i && e.selection.normalizeNative(i);
      if (s) {
        const o = e.selection.normalizedToRange(s);
        (a = n.dataTransfer) != null && a.files && this.upload(o, n.dataTransfer.files);
      }
    });
  }
  upload(e, t) {
    const n = [];
    Array.from(t).forEach((i) => {
      var s;
      i && ((s = this.options.mimetypes) != null && s.includes(i.type)) && n.push(i);
    }), n.length > 0 && this.options.handler.call(this, e, n);
  }
}
Sf.DEFAULTS = {
  mimetypes: ["image/png", "image/jpeg"],
  handler(r, e) {
    if (!this.quill.scroll.query("image"))
      return;
    const t = e.map((n) => new Promise((i) => {
      const s = new FileReader();
      s.onload = () => {
        i(s.result);
      }, s.readAsDataURL(n);
    }));
    Promise.all(t).then((n) => {
      const i = n.reduce((s, a) => s.insert({
        image: a
      }), new P().retain(r.index).delete(r.length));
      this.quill.updateContents(i, z.sources.USER), this.quill.setSelection(r.index + n.length, z.sources.SILENT);
    });
  }
};
const N0 = ["insertText", "insertReplacementText"];
class M0 extends Et {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("beforeinput", (n) => {
      this.handleBeforeInput(n);
    }), /Android/i.test(navigator.userAgent) || e.on(L.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(e) {
    wc({
      range: e,
      quill: this.quill
    });
  }
  replaceText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (e.length === 0) return !1;
    if (t) {
      const n = this.quill.getFormat(e.index, 1);
      this.deleteRange(e), this.quill.updateContents(new P().retain(e.index).insert(t, n), L.sources.USER);
    } else
      this.deleteRange(e);
    return this.quill.setSelection(e.index + t.length, 0, L.sources.SILENT), !0;
  }
  handleBeforeInput(e) {
    if (this.quill.composition.isComposing || e.defaultPrevented || !N0.includes(e.inputType))
      return;
    const t = e.getTargetRanges ? e.getTargetRanges()[0] : null;
    if (!t || t.collapsed === !0)
      return;
    const n = _0(e);
    if (n == null)
      return;
    const i = this.quill.selection.normalizeNative(t), s = i ? this.quill.selection.normalizedToRange(i) : null;
    s && this.replaceText(s, n) && e.preventDefault();
  }
  handleCompositionStart() {
    const e = this.quill.getSelection();
    e && this.replaceText(e);
  }
}
function _0(r) {
  var e;
  return typeof r.data == "string" ? r.data : (e = r.dataTransfer) != null && e.types.includes("text/plain") ? r.dataTransfer.getData("text/plain") : null;
}
const q0 = /Mac/i.test(navigator.platform), R0 = 100, z0 = (r) => !!(r.key === "ArrowLeft" || r.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
r.key === "ArrowUp" || r.key === "ArrowDown" || r.key === "Home" || q0 && r.key === "a" && r.ctrlKey === !0);
class P0 extends Et {
  constructor(t, n) {
    super(t, n);
    _(this, "isListening", !1);
    _(this, "selectionChangeDeadline", 0);
    this.handleArrowKeys(), this.handleNavigationShortcuts();
  }
  handleArrowKeys() {
    this.quill.keyboard.addBinding({
      key: ["ArrowLeft", "ArrowRight"],
      offset: 0,
      shiftKey: null,
      handler(t, n) {
        let {
          line: i,
          event: s
        } = n;
        if (!(i instanceof yt) || !i.uiNode)
          return !0;
        const a = getComputedStyle(i.domNode).direction === "rtl";
        return a && s.key !== "ArrowRight" || !a && s.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(t.index - 1, t.length + (s.shiftKey ? 1 : 0), L.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (t) => {
      !t.defaultPrevented && z0(t) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + R0, this.isListening) return;
    this.isListening = !0;
    const t = () => {
      this.isListening = !1, Date.now() <= this.selectionChangeDeadline && this.handleSelectionChange();
    };
    document.addEventListener("selectionchange", t, {
      once: !0
    });
  }
  handleSelectionChange() {
    const t = document.getSelection();
    if (!t) return;
    const n = t.getRangeAt(0);
    if (n.collapsed !== !0 || n.startOffset !== 0) return;
    const i = this.quill.scroll.find(n.startContainer);
    if (!(i instanceof yt) || !i.uiNode) return;
    const s = document.createRange();
    s.setStartAfter(i.uiNode), s.setEndAfter(i.uiNode), t.removeAllRanges(), t.addRange(s);
  }
}
L.register({
  "blots/block": Se,
  "blots/block/embed": rt,
  "blots/break": At,
  "blots/container": Qn,
  "blots/cursor": qr,
  "blots/embed": pc,
  "blots/inline": Ut,
  "blots/scroll": Sr,
  "blots/text": wt,
  "modules/clipboard": wf,
  "modules/history": xf,
  "modules/keyboard": xa,
  "modules/uploader": Sf,
  "modules/input": M0,
  "modules/uiNode": P0
});
class B0 extends St {
  add(e, t) {
    let n = 0;
    if (t === "+1" || t === "-1") {
      const i = this.value(e) || 0;
      n = t === "+1" ? i + 1 : i - 1;
    } else typeof t == "number" && (n = t);
    return n === 0 ? (this.remove(e), !0) : super.add(e, n.toString());
  }
  canAdd(e, t) {
    return super.canAdd(e, t) || super.canAdd(e, parseInt(t, 10));
  }
  value(e) {
    return parseInt(super.value(e), 10) || void 0;
  }
}
const F0 = new B0("indent", "ql-indent", {
  scope: B.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Tl extends Se {
}
_(Tl, "blotName", "blockquote"), _(Tl, "tagName", "blockquote");
class Ll extends Se {
  static formats(e) {
    return this.tagName.indexOf(e.tagName) + 1;
  }
}
_(Ll, "blotName", "header"), _(Ll, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class Wi extends Qn {
}
Wi.blotName = "list-container";
Wi.tagName = "OL";
class Zi extends Se {
  static create(e) {
    const t = super.create();
    return t.setAttribute("data-list", e), t;
  }
  static formats(e) {
    return e.getAttribute("data-list") || void 0;
  }
  static register() {
    L.register(Wi);
  }
  constructor(e, t) {
    super(e, t);
    const n = t.ownerDocument.createElement("span"), i = (s) => {
      if (!e.isEnabled()) return;
      const a = this.statics.formats(t, e);
      a === "checked" ? (this.format("list", "unchecked"), s.preventDefault()) : a === "unchecked" && (this.format("list", "checked"), s.preventDefault());
    };
    n.addEventListener("mousedown", i), n.addEventListener("touchstart", i), this.attachUI(n);
  }
  format(e, t) {
    e === this.statics.blotName && t ? this.domNode.setAttribute("data-list", t) : super.format(e, t);
  }
}
Zi.blotName = "list";
Zi.tagName = "LI";
Wi.allowedChildren = [Zi];
Zi.requiredContainer = Wi;
class Fi extends Ut {
  static create() {
    return super.create();
  }
  static formats() {
    return !0;
  }
  optimize(e) {
    super.optimize(e), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
  }
}
_(Fi, "blotName", "bold"), _(Fi, "tagName", ["STRONG", "B"]);
class Dl extends Fi {
}
_(Dl, "blotName", "italic"), _(Dl, "tagName", ["EM", "I"]);
class kn extends Ut {
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("href", this.sanitize(e)), t.setAttribute("rel", "noopener noreferrer"), t.setAttribute("target", "_blank"), t;
  }
  static formats(e) {
    return e.getAttribute("href");
  }
  static sanitize(e) {
    return Af(e, this.PROTOCOL_WHITELIST) ? e : this.SANITIZED_URL;
  }
  format(e, t) {
    e !== this.statics.blotName || !t ? super.format(e, t) : this.domNode.setAttribute("href", this.constructor.sanitize(t));
  }
}
_(kn, "blotName", "link"), _(kn, "tagName", "A"), _(kn, "SANITIZED_URL", "about:blank"), _(kn, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function Af(r, e) {
  const t = document.createElement("a");
  t.href = r;
  const n = t.href.slice(0, t.href.indexOf(":"));
  return e.indexOf(n) > -1;
}
class Il extends Ut {
  static create(e) {
    return e === "super" ? document.createElement("sup") : e === "sub" ? document.createElement("sub") : super.create(e);
  }
  static formats(e) {
    if (e.tagName === "SUB") return "sub";
    if (e.tagName === "SUP") return "super";
  }
}
_(Il, "blotName", "script"), _(Il, "tagName", ["SUB", "SUP"]);
class Ol extends Fi {
}
_(Ol, "blotName", "strike"), _(Ol, "tagName", ["S", "STRIKE"]);
class Nl extends Ut {
}
_(Nl, "blotName", "underline"), _(Nl, "tagName", "U");
class $s extends pc {
  static create(e) {
    if (window.katex == null)
      throw new Error("Formula module requires KaTeX.");
    const t = super.create(e);
    return typeof e == "string" && (window.katex.render(e, t, {
      throwOnError: !1,
      errorColor: "#f00"
    }), t.setAttribute("data-value", e)), t;
  }
  static value(e) {
    return e.getAttribute("data-value");
  }
  html() {
    const {
      formula: e
    } = this.value();
    return `<span>${e}</span>`;
  }
}
_($s, "blotName", "formula"), _($s, "className", "ql-formula"), _($s, "tagName", "SPAN");
const ed = ["alt", "height", "width"];
class Ml extends Ge {
  static create(e) {
    const t = super.create(e);
    return typeof e == "string" && t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return ed.reduce((t, n) => (e.hasAttribute(n) && (t[n] = e.getAttribute(n)), t), {});
  }
  static match(e) {
    return /\.(jpe?g|gif|png)$/.test(e) || /^data:image\/.+;base64/.test(e);
  }
  static sanitize(e) {
    return Af(e, ["http", "https", "data"]) ? e : "//:0";
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    ed.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
}
_(Ml, "blotName", "image"), _(Ml, "tagName", "IMG");
const td = ["height", "width"];
class js extends rt {
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("frameborder", "0"), t.setAttribute("allowfullscreen", "true"), t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return td.reduce((t, n) => (e.hasAttribute(n) && (t[n] = e.getAttribute(n)), t), {});
  }
  static sanitize(e) {
    return kn.sanitize(e);
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    td.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
  html() {
    const {
      video: e
    } = this.value();
    return `<a href="${e}">${e}</a>`;
  }
}
_(js, "blotName", "video"), _(js, "className", "ql-video"), _(js, "tagName", "IFRAME");
const wi = new St("code-token", "hljs", {
  scope: B.INLINE
});
class sn extends Ut {
  static formats(e, t) {
    for (; e != null && e !== t.domNode; ) {
      if (e.classList && e.classList.contains(Ie.className))
        return super.formats(e, t);
      e = e.parentNode;
    }
  }
  constructor(e, t, n) {
    super(e, t, n), wi.add(this.domNode, n);
  }
  format(e, t) {
    e !== sn.blotName ? super.format(e, t) : t ? wi.add(this.domNode, t) : (wi.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), wi.value(this.domNode) || this.unwrap();
  }
}
sn.blotName = "code-token";
sn.className = "ql-token";
class tt extends Ie {
  static create(e) {
    const t = super.create(e);
    return typeof e == "string" && t.setAttribute("data-language", e), t;
  }
  static formats(e) {
    return e.getAttribute("data-language") || "plain";
  }
  static register() {
  }
  // Syntax module will register
  format(e, t) {
    e === this.statics.blotName && t ? this.domNode.setAttribute("data-language", t) : super.format(e, t);
  }
  replaceWith(e, t) {
    return this.formatAt(0, this.length(), sn.blotName, !1), super.replaceWith(e, t);
  }
}
class Ti extends Jn {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(e, t) {
    e === tt.blotName && (this.forceNext = !0, this.children.forEach((n) => {
      n.format(e, t);
    }));
  }
  formatAt(e, t, n, i) {
    n === tt.blotName && (this.forceNext = !0), super.formatAt(e, t, n, i);
  }
  highlight(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const i = `${Array.from(this.domNode.childNodes).filter((a) => a !== this.uiNode).map((a) => a.textContent).join(`
`)}
`, s = tt.formats(this.children.head.domNode);
    if (t || this.forceNext || this.cachedText !== i) {
      if (i.trim().length > 0 || this.cachedText == null) {
        const a = this.children.reduce((l, c) => l.concat(af(c, !1)), new P()), o = e(i, s);
        a.diff(o).reduce((l, c) => {
          let {
            retain: d,
            attributes: f
          } = c;
          return d ? (f && Object.keys(f).forEach((h) => {
            [tt.blotName, sn.blotName].includes(h) && this.formatAt(l, d, h, f[h]);
          }), l + d) : l;
        }, 0);
      }
      this.cachedText = i, this.forceNext = !1;
    }
  }
  html(e, t) {
    const [n] = this.children.find(e);
    return `<pre data-language="${n ? tt.formats(n.domNode) : "plain"}">
${ka(this.code(e, t))}
</pre>`;
  }
  optimize(e) {
    if (super.optimize(e), this.parent != null && this.children.head != null && this.uiNode != null) {
      const t = tt.formats(this.children.head.domNode);
      t !== this.uiNode.value && (this.uiNode.value = t);
    }
  }
}
Ti.allowedChildren = [tt];
tt.requiredContainer = Ti;
tt.allowedChildren = [sn, qr, wt, At];
const $0 = (r, e, t) => {
  if (typeof r.versionString == "string") {
    const n = r.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return r.highlight(t, {
        language: e
      }).value;
  }
  return r.highlight(e, t).value;
};
class Ef extends Et {
  static register() {
    L.register(sn, !0), L.register(tt, !0), L.register(Ti, !0);
  }
  constructor(e, t) {
    if (super(e, t), this.options.hljs == null)
      throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
    this.languages = this.options.languages.reduce((n, i) => {
      let {
        key: s
      } = i;
      return n[s] = !0, n;
    }, {}), this.highlightBlot = this.highlightBlot.bind(this), this.initListener(), this.initTimer();
  }
  initListener() {
    this.quill.on(L.events.SCROLL_BLOT_MOUNT, (e) => {
      if (!(e instanceof Ti)) return;
      const t = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((n) => {
        let {
          key: i,
          label: s
        } = n;
        const a = t.ownerDocument.createElement("option");
        a.textContent = s, a.setAttribute("value", i), t.appendChild(a);
      }), t.addEventListener("change", () => {
        e.format(tt.blotName, t.value), this.quill.root.focus(), this.highlight(e, !0);
      }), e.uiNode == null && (e.attachUI(t), e.children.head && (t.value = tt.formats(e.children.head.domNode)));
    });
  }
  initTimer() {
    let e = null;
    this.quill.on(L.events.SCROLL_OPTIMIZE, () => {
      e && clearTimeout(e), e = setTimeout(() => {
        this.highlight(), e = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(L.sources.USER);
    const n = this.quill.getSelection();
    (e == null ? this.quill.scroll.descendants(Ti) : [e]).forEach((s) => {
      s.highlight(this.highlightBlot, t);
    }), this.quill.update(L.sources.SILENT), n != null && this.quill.setSelection(n, L.sources.SILENT);
  }
  highlightBlot(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (t = this.languages[t] ? t : "plain", t === "plain")
      return ka(e).split(`
`).reduce((i, s, a) => (a !== 0 && i.insert(`
`, {
        [Ie.blotName]: t
      }), i.insert(s)), new P());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(Ie.className), n.innerHTML = $0(this.options.hljs, t, e), kc(this.quill.scroll, n, [(i, s) => {
      const a = wi.value(i);
      return a ? s.compose(new P().retain(s.length(), {
        [sn.blotName]: a
      })) : s;
    }], [(i, s) => i.data.split(`
`).reduce((a, o, l) => (l !== 0 && a.insert(`
`, {
      [Ie.blotName]: t
    }), a.insert(o)), s)], /* @__PURE__ */ new WeakMap());
  }
}
Ef.DEFAULTS = {
  hljs: window.hljs,
  interval: 1e3,
  languages: [{
    key: "plain",
    label: "Plain"
  }, {
    key: "bash",
    label: "Bash"
  }, {
    key: "cpp",
    label: "C++"
  }, {
    key: "cs",
    label: "C#"
  }, {
    key: "css",
    label: "CSS"
  }, {
    key: "diff",
    label: "Diff"
  }, {
    key: "xml",
    label: "HTML/XML"
  }, {
    key: "java",
    label: "Java"
  }, {
    key: "javascript",
    label: "JavaScript"
  }, {
    key: "markdown",
    label: "Markdown"
  }, {
    key: "php",
    label: "PHP"
  }, {
    key: "python",
    label: "Python"
  }, {
    key: "ruby",
    label: "Ruby"
  }, {
    key: "sql",
    label: "SQL"
  }]
};
const Mi = class Mi extends Se {
  static create(e) {
    const t = super.create();
    return e ? t.setAttribute("data-row", e) : t.setAttribute("data-row", xc()), t;
  }
  static formats(e) {
    if (e.hasAttribute("data-row"))
      return e.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(e, t) {
    e === Mi.blotName && t ? this.domNode.setAttribute("data-row", t) : super.format(e, t);
  }
  row() {
    return this.parent;
  }
  rowOffset() {
    return this.row() ? this.row().rowOffset() : -1;
  }
  table() {
    return this.row() && this.row().table();
  }
};
_(Mi, "blotName", "table"), _(Mi, "tagName", "TD");
let mt = Mi;
class an extends Qn {
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const e = this.children.head.formats(), t = this.children.tail.formats(), n = this.next.children.head.formats(), i = this.next.children.tail.formats();
      return e.table === t.table && e.table === n.table && e.table === i.table;
    }
    return !1;
  }
  optimize(e) {
    super.optimize(e), this.children.forEach((t) => {
      if (t.next == null) return;
      const n = t.formats(), i = t.next.formats();
      if (n.table !== i.table) {
        const s = this.splitAfter(t);
        s && s.optimize(), this.prev && this.prev.optimize();
      }
    });
  }
  rowOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  table() {
    return this.parent && this.parent.parent;
  }
}
_(an, "blotName", "table-row"), _(an, "tagName", "TR");
class $t extends Qn {
}
_($t, "blotName", "table-body"), _($t, "tagName", "TBODY");
class zr extends Qn {
  balanceCells() {
    const e = this.descendants(an), t = e.reduce((n, i) => Math.max(i.children.length, n), 0);
    e.forEach((n) => {
      new Array(t - n.children.length).fill(0).forEach(() => {
        let i;
        n.children.head != null && (i = mt.formats(n.children.head.domNode));
        const s = this.scroll.create(mt.blotName, i);
        n.appendChild(s), s.optimize();
      });
    });
  }
  cells(e) {
    return this.rows().map((t) => t.children.at(e));
  }
  deleteColumn(e) {
    const [t] = this.descendant($t);
    t == null || t.children.head == null || t.children.forEach((n) => {
      const i = n.children.at(e);
      i != null && i.remove();
    });
  }
  insertColumn(e) {
    const [t] = this.descendant($t);
    t == null || t.children.head == null || t.children.forEach((n) => {
      const i = n.children.at(e), s = mt.formats(n.children.head.domNode), a = this.scroll.create(mt.blotName, s);
      n.insertBefore(a, i);
    });
  }
  insertRow(e) {
    const [t] = this.descendant($t);
    if (t == null || t.children.head == null) return;
    const n = xc(), i = this.scroll.create(an.blotName);
    t.children.head.children.forEach(() => {
      const a = this.scroll.create(mt.blotName, n);
      i.appendChild(a);
    });
    const s = t.children.at(e);
    t.insertBefore(i, s);
  }
  rows() {
    const e = this.children.head;
    return e == null ? [] : e.children.map((t) => t);
  }
}
_(zr, "blotName", "table-container"), _(zr, "tagName", "TABLE");
zr.allowedChildren = [$t];
$t.requiredContainer = zr;
$t.allowedChildren = [an];
an.requiredContainer = $t;
an.allowedChildren = [mt];
mt.requiredContainer = an;
function xc() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class j0 extends Et {
  static register() {
    L.register(mt), L.register(an), L.register($t), L.register(zr);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(zr).forEach((e) => {
      e.balanceCells();
    });
  }
  deleteColumn() {
    const [e, , t] = this.getTable();
    t != null && (e.deleteColumn(t.cellOffset()), this.quill.update(L.sources.USER));
  }
  deleteRow() {
    const [, e] = this.getTable();
    e != null && (e.remove(), this.quill.update(L.sources.USER));
  }
  deleteTable() {
    const [e] = this.getTable();
    if (e == null) return;
    const t = e.offset();
    e.remove(), this.quill.update(L.sources.USER), this.quill.setSelection(t, L.sources.SILENT);
  }
  getTable() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (e == null) return [null, null, null, -1];
    const [t, n] = this.quill.getLine(e.index);
    if (t == null || t.statics.blotName !== mt.blotName)
      return [null, null, null, -1];
    const i = t.parent;
    return [i.parent.parent, i, t, n];
  }
  insertColumn(e) {
    const t = this.quill.getSelection();
    if (!t) return;
    const [n, i, s] = this.getTable(t);
    if (s == null) return;
    const a = s.cellOffset();
    n.insertColumn(a + e), this.quill.update(L.sources.USER);
    let o = i.rowOffset();
    e === 0 && (o += 1), this.quill.setSelection(t.index + o, t.length, L.sources.SILENT);
  }
  insertColumnLeft() {
    this.insertColumn(0);
  }
  insertColumnRight() {
    this.insertColumn(1);
  }
  insertRow(e) {
    const t = this.quill.getSelection();
    if (!t) return;
    const [n, i, s] = this.getTable(t);
    if (s == null) return;
    const a = i.rowOffset();
    n.insertRow(a + e), this.quill.update(L.sources.USER), e > 0 ? this.quill.setSelection(t, L.sources.SILENT) : this.quill.setSelection(t.index + i.children.length, t.length, L.sources.SILENT);
  }
  insertRowAbove() {
    this.insertRow(0);
  }
  insertRowBelow() {
    this.insertRow(1);
  }
  insertTable(e, t) {
    const n = this.quill.getSelection();
    if (n == null) return;
    const i = new Array(e).fill(0).reduce((s) => {
      const a = new Array(t).fill(`
`).join("");
      return s.insert(a, {
        table: xc()
      });
    }, new P().retain(n.index));
    this.quill.updateContents(i, L.sources.USER), this.quill.setSelection(n.index, L.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(L.events.SCROLL_OPTIMIZE, (e) => {
      e.some((t) => ["TD", "TR", "TBODY", "TABLE"].includes(t.target.tagName) ? (this.quill.once(L.events.TEXT_CHANGE, (n, i, s) => {
        s === L.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const nd = cn("quill:toolbar");
class Sc extends Et {
  constructor(e, t) {
    var n, i;
    if (super(e, t), Array.isArray(this.options.container)) {
      const s = document.createElement("div");
      s.setAttribute("role", "toolbar"), U0(s, this.options.container), (i = (n = e.container) == null ? void 0 : n.parentNode) == null || i.insertBefore(s, e.container), this.container = s;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      nd.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((s) => {
      var o;
      const a = (o = this.options.handlers) == null ? void 0 : o[s];
      a && this.addHandler(s, a);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((s) => {
      this.attach(s);
    }), this.quill.on(L.events.EDITOR_CHANGE, () => {
      const [s] = this.quill.selection.getRange();
      this.update(s);
    });
  }
  addHandler(e, t) {
    this.handlers[e] = t;
  }
  attach(e) {
    let t = Array.from(e.classList).find((i) => i.indexOf("ql-") === 0);
    if (!t) return;
    if (t = t.slice(3), e.tagName === "BUTTON" && e.setAttribute("type", "button"), this.handlers[t] == null && this.quill.scroll.query(t) == null) {
      nd.warn("ignoring attaching to nonexistent format", t, e);
      return;
    }
    const n = e.tagName === "SELECT" ? "change" : "click";
    e.addEventListener(n, (i) => {
      let s;
      if (e.tagName === "SELECT") {
        if (e.selectedIndex < 0) return;
        const o = e.options[e.selectedIndex];
        o.hasAttribute("selected") ? s = !1 : s = o.value || !1;
      } else
        e.classList.contains("ql-active") ? s = !1 : s = e.value || !e.hasAttribute("value"), i.preventDefault();
      this.quill.focus();
      const [a] = this.quill.selection.getRange();
      if (this.handlers[t] != null)
        this.handlers[t].call(this, s);
      else if (
        // @ts-expect-error
        this.quill.scroll.query(t).prototype instanceof Ge
      ) {
        if (s = prompt(`Enter ${t}`), !s) return;
        this.quill.updateContents(new P().retain(a.index).delete(a.length).insert({
          [t]: s
        }), L.sources.USER);
      } else
        this.quill.format(t, s, L.sources.USER);
      this.update(a);
    }), this.controls.push([t, e]);
  }
  update(e) {
    const t = e == null ? {} : this.quill.getFormat(e);
    this.controls.forEach((n) => {
      const [i, s] = n;
      if (s.tagName === "SELECT") {
        let a = null;
        if (e == null)
          a = null;
        else if (t[i] == null)
          a = s.querySelector("option[selected]");
        else if (!Array.isArray(t[i])) {
          let o = t[i];
          typeof o == "string" && (o = o.replace(/"/g, '\\"')), a = s.querySelector(`option[value="${o}"]`);
        }
        a == null ? (s.value = "", s.selectedIndex = -1) : a.selected = !0;
      } else if (e == null)
        s.classList.remove("ql-active"), s.setAttribute("aria-pressed", "false");
      else if (s.hasAttribute("value")) {
        const a = t[i], o = a === s.getAttribute("value") || a != null && a.toString() === s.getAttribute("value") || a == null && !s.getAttribute("value");
        s.classList.toggle("ql-active", o), s.setAttribute("aria-pressed", o.toString());
      } else {
        const a = t[i] != null;
        s.classList.toggle("ql-active", a), s.setAttribute("aria-pressed", a.toString());
      }
    });
  }
}
Sc.DEFAULTS = {};
function rd(r, e, t) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${e}`), n.setAttribute("aria-pressed", "false"), t != null ? (n.value = t, n.setAttribute("aria-label", `${e}: ${t}`)) : n.setAttribute("aria-label", e), r.appendChild(n);
}
function U0(r, e) {
  Array.isArray(e[0]) || (e = [e]), e.forEach((t) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), t.forEach((i) => {
      if (typeof i == "string")
        rd(n, i);
      else {
        const s = Object.keys(i)[0], a = i[s];
        Array.isArray(a) ? H0(n, s, a) : rd(n, s, a);
      }
    }), r.appendChild(n);
  });
}
function H0(r, e, t) {
  const n = document.createElement("select");
  n.classList.add(`ql-${e}`), t.forEach((i) => {
    const s = document.createElement("option");
    i !== !1 ? s.setAttribute("value", String(i)) : s.setAttribute("selected", "selected"), n.appendChild(s);
  }), r.appendChild(n);
}
Sc.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const r = this.quill.getSelection();
      if (r != null)
        if (r.length === 0) {
          const e = this.quill.getFormat();
          Object.keys(e).forEach((t) => {
            this.quill.scroll.query(t, B.INLINE) != null && this.quill.format(t, !1, L.sources.USER);
          });
        } else
          this.quill.removeFormat(r.index, r.length, L.sources.USER);
    },
    direction(r) {
      const {
        align: e
      } = this.quill.getFormat();
      r === "rtl" && e == null ? this.quill.format("align", "right", L.sources.USER) : !r && e === "right" && this.quill.format("align", !1, L.sources.USER), this.quill.format("direction", r, L.sources.USER);
    },
    indent(r) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e), n = parseInt(t.indent || 0, 10);
      if (r === "+1" || r === "-1") {
        let i = r === "+1" ? 1 : -1;
        t.direction === "rtl" && (i *= -1), this.quill.format("indent", n + i, L.sources.USER);
      }
    },
    link(r) {
      r === !0 && (r = prompt("Enter link URL:")), this.quill.format("link", r, L.sources.USER);
    },
    list(r) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e);
      r === "check" ? t.list === "checked" || t.list === "unchecked" ? this.quill.format("list", !1, L.sources.USER) : this.quill.format("list", "unchecked", L.sources.USER) : this.quill.format("list", r, L.sources.USER);
    }
  }
};
const V0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', Y0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', K0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', G0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', W0 = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', Z0 = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', X0 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', Q0 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', id = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', J0 = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', ew = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', tw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', nw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', rw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', iw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', sw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', aw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', ow = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', lw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', cw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', uw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', dw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', hw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', fw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', pw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', gw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', mw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', bw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', yw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', vw = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', ww = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', kw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', xw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', $i = {
  align: {
    "": V0,
    center: Y0,
    right: K0,
    justify: G0
  },
  background: W0,
  blockquote: Z0,
  bold: X0,
  clean: Q0,
  code: id,
  "code-block": id,
  color: J0,
  direction: {
    "": ew,
    rtl: tw
  },
  formula: nw,
  header: {
    1: rw,
    2: iw,
    3: sw,
    4: aw,
    5: ow,
    6: lw
  },
  italic: cw,
  image: uw,
  indent: {
    "+1": dw,
    "-1": hw
  },
  link: fw,
  list: {
    bullet: pw,
    check: gw,
    ordered: mw
  },
  script: {
    sub: bw,
    super: yw
  },
  strike: vw,
  table: ww,
  underline: kw,
  video: xw
}, Sw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let sd = 0;
function ad(r, e) {
  r.setAttribute(e, `${r.getAttribute(e) !== "true"}`);
}
class Sa {
  constructor(e) {
    this.select = e, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", () => {
      this.togglePicker();
    }), this.label.addEventListener("keydown", (t) => {
      switch (t.key) {
        case "Enter":
          this.togglePicker();
          break;
        case "Escape":
          this.escape(), t.preventDefault();
          break;
      }
    }), this.select.addEventListener("change", this.update.bind(this));
  }
  togglePicker() {
    this.container.classList.toggle("ql-expanded"), ad(this.label, "aria-expanded"), ad(this.options, "aria-hidden");
  }
  buildItem(e) {
    const t = document.createElement("span");
    t.tabIndex = "0", t.setAttribute("role", "button"), t.classList.add("ql-picker-item");
    const n = e.getAttribute("value");
    return n && t.setAttribute("data-value", n), e.textContent && t.setAttribute("data-label", e.textContent), t.addEventListener("click", () => {
      this.selectItem(t, !0);
    }), t.addEventListener("keydown", (i) => {
      switch (i.key) {
        case "Enter":
          this.selectItem(t, !0), i.preventDefault();
          break;
        case "Escape":
          this.escape(), i.preventDefault();
          break;
      }
    }), t;
  }
  buildLabel() {
    const e = document.createElement("span");
    return e.classList.add("ql-picker-label"), e.innerHTML = Sw, e.tabIndex = "0", e.setAttribute("role", "button"), e.setAttribute("aria-expanded", "false"), this.container.appendChild(e), e;
  }
  buildOptions() {
    const e = document.createElement("span");
    e.classList.add("ql-picker-options"), e.setAttribute("aria-hidden", "true"), e.tabIndex = "-1", e.id = `ql-picker-options-${sd}`, sd += 1, this.label.setAttribute("aria-controls", e.id), this.options = e, Array.from(this.select.options).forEach((t) => {
      const n = this.buildItem(t);
      e.appendChild(n), t.selected === !0 && this.selectItem(n);
    }), this.container.appendChild(e);
  }
  buildPicker() {
    Array.from(this.select.attributes).forEach((e) => {
      this.container.setAttribute(e.name, e.value);
    }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
  }
  escape() {
    this.close(), setTimeout(() => this.label.focus(), 1);
  }
  close() {
    this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
  }
  selectItem(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    const n = this.container.querySelector(".ql-selected");
    e !== n && (n != null && n.classList.remove("ql-selected"), e != null && (e.classList.add("ql-selected"), this.select.selectedIndex = Array.from(e.parentNode.children).indexOf(e), e.hasAttribute("data-value") ? this.label.setAttribute("data-value", e.getAttribute("data-value")) : this.label.removeAttribute("data-value"), e.hasAttribute("data-label") ? this.label.setAttribute("data-label", e.getAttribute("data-label")) : this.label.removeAttribute("data-label"), t && (this.select.dispatchEvent(new Event("change")), this.close())));
  }
  update() {
    let e;
    if (this.select.selectedIndex > -1) {
      const n = (
        // @ts-expect-error Fix me later
        this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex]
      );
      e = this.select.options[this.select.selectedIndex], this.selectItem(n);
    } else
      this.selectItem(null);
    const t = e != null && e !== this.select.querySelector("option[selected]");
    this.label.classList.toggle("ql-active", t);
  }
}
class Cf extends Sa {
  constructor(e, t) {
    super(e), this.label.innerHTML = t, this.container.classList.add("ql-color-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((n) => {
      n.classList.add("ql-primary");
    });
  }
  buildItem(e) {
    const t = super.buildItem(e);
    return t.style.backgroundColor = e.getAttribute("value") || "", t;
  }
  selectItem(e, t) {
    super.selectItem(e, t);
    const n = this.label.querySelector(".ql-color-label"), i = e && e.getAttribute("data-value") || "";
    n && (n.tagName === "line" ? n.style.stroke = i : n.style.fill = i);
  }
}
class Tf extends Sa {
  constructor(e, t) {
    super(e), this.container.classList.add("ql-icon-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((n) => {
      n.innerHTML = t[n.getAttribute("data-value") || ""];
    }), this.defaultItem = this.container.querySelector(".ql-selected"), this.selectItem(this.defaultItem);
  }
  selectItem(e, t) {
    super.selectItem(e, t);
    const n = e || this.defaultItem;
    if (n != null) {
      if (this.label.innerHTML === n.innerHTML) return;
      this.label.innerHTML = n.innerHTML;
    }
  }
}
const Aw = (r) => {
  const {
    overflowY: e
  } = getComputedStyle(r, null);
  return e !== "visible" && e !== "clip";
};
class Lf {
  constructor(e, t) {
    this.quill = e, this.boundsContainer = t || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, Aw(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
      this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
    }), this.hide();
  }
  hide() {
    this.root.classList.add("ql-hidden");
  }
  position(e) {
    const t = e.left + e.width / 2 - this.root.offsetWidth / 2, n = e.bottom + this.quill.root.scrollTop;
    this.root.style.left = `${t}px`, this.root.style.top = `${n}px`, this.root.classList.remove("ql-flip");
    const i = this.boundsContainer.getBoundingClientRect(), s = this.root.getBoundingClientRect();
    let a = 0;
    if (s.right > i.right && (a = i.right - s.right, this.root.style.left = `${t + a}px`), s.left < i.left && (a = i.left - s.left, this.root.style.left = `${t + a}px`), s.bottom > i.bottom) {
      const o = s.bottom - s.top, l = e.bottom - e.top + o;
      this.root.style.top = `${n - l}px`, this.root.classList.add("ql-flip");
    }
    return a;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const Ew = [!1, "center", "right", "justify"], Cw = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], Tw = [!1, "serif", "monospace"], Lw = ["1", "2", "3", !1], Dw = ["small", !1, "large", "huge"];
class Xi extends Rr {
  constructor(e, t) {
    super(e, t);
    const n = (i) => {
      if (!document.body.contains(e.root)) {
        document.body.removeEventListener("click", n);
        return;
      }
      this.tooltip != null && // @ts-expect-error
      !this.tooltip.root.contains(i.target) && // @ts-expect-error
      document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus() && this.tooltip.hide(), this.pickers != null && this.pickers.forEach((s) => {
        s.container.contains(i.target) || s.close();
      });
    };
    e.emitter.listenDOM("click", document.body, n);
  }
  addModule(e) {
    const t = super.addModule(e);
    return e === "toolbar" && this.extendToolbar(t), t;
  }
  buildButtons(e, t) {
    Array.from(e).forEach((n) => {
      (n.getAttribute("class") || "").split(/\s+/).forEach((s) => {
        if (s.startsWith("ql-") && (s = s.slice(3), t[s] != null))
          if (s === "direction")
            n.innerHTML = t[s][""] + t[s].rtl;
          else if (typeof t[s] == "string")
            n.innerHTML = t[s];
          else {
            const a = n.value || "";
            a != null && t[s][a] && (n.innerHTML = t[s][a]);
          }
      });
    });
  }
  buildPickers(e, t) {
    this.pickers = Array.from(e).map((i) => {
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && bi(i, Ew), typeof t.align == "object"))
        return new Tf(i, t.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const s = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && bi(i, Cw, s === "background" ? "#ffffff" : "#000000"), new Cf(i, t[s]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? bi(i, Tw) : i.classList.contains("ql-header") ? bi(i, Lw) : i.classList.contains("ql-size") && bi(i, Dw)), new Sa(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(z.events.EDITOR_CHANGE, n);
  }
}
Xi.DEFAULTS = xn({}, Rr.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula() {
          this.quill.theme.tooltip.edit("formula");
        },
        image() {
          let r = this.container.querySelector("input.ql-image[type=file]");
          r == null && (r = document.createElement("input"), r.setAttribute("type", "file"), r.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", ")), r.classList.add("ql-image"), r.addEventListener("change", () => {
            const e = this.quill.getSelection(!0);
            this.quill.uploader.upload(e, r.files), r.value = "";
          }), this.container.appendChild(r)), r.click();
        },
        video() {
          this.quill.theme.tooltip.edit("video");
        }
      }
    }
  }
});
class Df extends Lf {
  constructor(e, t) {
    super(e, t), this.textbox = this.root.querySelector('input[type="text"]'), this.listen();
  }
  listen() {
    this.textbox.addEventListener("keydown", (e) => {
      e.key === "Enter" ? (this.save(), e.preventDefault()) : e.key === "Escape" && (this.cancel(), e.preventDefault());
    });
  }
  cancel() {
    this.hide(), this.restoreFocus();
  }
  edit() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), this.textbox == null) return;
    t != null ? this.textbox.value = t : e !== this.root.getAttribute("data-mode") && (this.textbox.value = "");
    const n = this.quill.getBounds(this.quill.selection.savedRange);
    n != null && this.position(n), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute(`data-${e}`) || ""), this.root.setAttribute("data-mode", e);
  }
  restoreFocus() {
    this.quill.focus({
      preventScroll: !0
    });
  }
  save() {
    let {
      value: e
    } = this.textbox;
    switch (this.root.getAttribute("data-mode")) {
      case "link": {
        const {
          scrollTop: t
        } = this.quill.root;
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", e, z.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", e, z.sources.USER)), this.quill.root.scrollTop = t;
        break;
      }
      case "video":
        e = Iw(e);
      case "formula": {
        if (!e) break;
        const t = this.quill.getSelection(!0);
        if (t != null) {
          const n = t.index + t.length;
          this.quill.insertEmbed(
            n,
            // @ts-expect-error Fix me later
            this.root.getAttribute("data-mode"),
            e,
            z.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(n + 1, " ", z.sources.USER), this.quill.setSelection(n + 2, z.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function Iw(r) {
  let e = r.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || r.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return e ? `${e[1] || "https"}://www.youtube.com/embed/${e[2]}?showinfo=0` : (e = r.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${e[1] || "https"}://player.vimeo.com/video/${e[2]}/` : r;
}
function bi(r, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  e.forEach((n) => {
    const i = document.createElement("option");
    n === t ? i.setAttribute("selected", "selected") : i.setAttribute("value", String(n)), r.appendChild(i);
  });
}
const Ow = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class If extends Df {
  constructor(e, t) {
    super(e, t), this.quill.on(z.events.EDITOR_CHANGE, (n, i, s, a) => {
      if (n === z.events.SELECTION_CHANGE)
        if (i != null && i.length > 0 && a === z.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const o = this.quill.getLines(i.index, i.length);
          if (o.length === 1) {
            const l = this.quill.getBounds(i);
            l != null && this.position(l);
          } else {
            const l = o[o.length - 1], c = this.quill.getIndex(l), d = Math.min(l.length() - 1, i.index + i.length - c), f = this.quill.getBounds(new Yn(c, d));
            f != null && this.position(f);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(z.events.SCROLL_OPTIMIZE, () => {
      setTimeout(() => {
        if (this.root.classList.contains("ql-hidden")) return;
        const e = this.quill.getSelection();
        if (e != null) {
          const t = this.quill.getBounds(e);
          t != null && this.position(t);
        }
      }, 1);
    });
  }
  cancel() {
    this.show();
  }
  position(e) {
    const t = super.position(e), n = this.root.querySelector(".ql-tooltip-arrow");
    return n.style.marginLeft = "", t !== 0 && (n.style.marginLeft = `${-1 * t - n.offsetWidth / 2}px`), t;
  }
}
_(If, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class Of extends Xi {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = Ow), super(e, t), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(e) {
    this.tooltip = new If(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), $i), this.buildPickers(e.container.querySelectorAll("select"), $i));
  }
}
Of.DEFAULTS = xn({}, Xi.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(r) {
          r ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, L.sources.USER);
        }
      }
    }
  }
});
const Nw = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class Nf extends Df {
  constructor() {
    super(...arguments);
    _(this, "preview", this.root.querySelector("a.ql-preview"));
  }
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (t) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), t.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (t) => {
      if (this.linkRange != null) {
        const n = this.linkRange;
        this.restoreFocus(), this.quill.formatText(n, "link", !1, z.sources.USER), delete this.linkRange;
      }
      t.preventDefault(), this.hide();
    }), this.quill.on(z.events.SELECTION_CHANGE, (t, n, i) => {
      if (t != null) {
        if (t.length === 0 && i === z.sources.USER) {
          const [s, a] = this.quill.scroll.descendant(kn, t.index);
          if (s != null) {
            this.linkRange = new Yn(t.index - a, s.length());
            const o = kn.formats(s.domNode);
            this.preview.textContent = o, this.preview.setAttribute("href", o), this.show();
            const l = this.quill.getBounds(this.linkRange);
            l != null && this.position(l);
            return;
          }
        } else
          delete this.linkRange;
        this.hide();
      }
    });
  }
  show() {
    super.show(), this.root.removeAttribute("data-mode");
  }
}
_(Nf, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Mf extends Xi {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = Nw), super(e, t), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(e) {
    e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), $i), this.buildPickers(e.container.querySelectorAll("select"), $i), this.tooltip = new Nf(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (t, n) => {
      e.handlers.link.call(e, !n.format.link);
    }));
  }
}
Mf.DEFAULTS = xn({}, Xi.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(r) {
          if (r) {
            const e = this.quill.getSelection();
            if (e == null || e.length === 0) return;
            let t = this.quill.getText(e);
            /^\S+@\S+\.\S+$/.test(t) && t.indexOf("mailto:") !== 0 && (t = `mailto:${t}`);
            const {
              tooltip: n
            } = this.quill.theme;
            n.edit("link", t);
          } else
            this.quill.format("link", !1, L.sources.USER);
        }
      }
    }
  }
});
L.register({
  "attributors/attribute/direction": hf,
  "attributors/class/align": cf,
  "attributors/class/background": Z1,
  "attributors/class/color": W1,
  "attributors/class/direction": ff,
  "attributors/class/font": mf,
  "attributors/class/size": yf,
  "attributors/style/align": uf,
  "attributors/style/background": bc,
  "attributors/style/color": mc,
  "attributors/style/direction": pf,
  "attributors/style/font": bf,
  "attributors/style/size": vf
}, !0);
L.register({
  "formats/align": cf,
  "formats/direction": ff,
  "formats/indent": F0,
  "formats/background": bc,
  "formats/color": mc,
  "formats/font": mf,
  "formats/size": yf,
  "formats/blockquote": Tl,
  "formats/code-block": Ie,
  "formats/header": Ll,
  "formats/list": Zi,
  "formats/bold": Fi,
  "formats/code": yc,
  "formats/italic": Dl,
  "formats/link": kn,
  "formats/script": Il,
  "formats/strike": Ol,
  "formats/underline": Nl,
  "formats/formula": $s,
  "formats/image": Ml,
  "formats/video": js,
  "modules/syntax": Ef,
  "modules/table": j0,
  "modules/toolbar": Sc,
  "themes/bubble": Of,
  "themes/snow": Mf,
  "ui/icons": $i,
  "ui/picker": Sa,
  "ui/icon-picker": Tf,
  "ui/color-picker": Cf,
  "ui/tooltip": Lf
}, !0);
class Ac extends ne {
  /**
   * Initialize editor elements - required by BaseActionClass
   */
  initializeElements() {
    this.initializeEditors();
  }
  /**
   * Bind event listeners - required by BaseActionClass
   */
  bindEventListeners() {
    I.handleDelegatedEvent("click", '[data-action="clear"]', (e) => {
      const t = v.getClosest(e, "[data-keys-editor]");
      t && this.handleClearAction(t);
    }), I.handleDelegatedEvent("click", '[data-action="copy"]', (e) => {
      const t = v.getClosest(e, "[data-keys-editor]");
      t && this.handleCopyAction(t);
    });
  }
  /**
   * Initialize all editor instances on the page
   */
  initializeEditors() {
    v.querySelectorAll("[data-editor-container]").forEach((t) => {
      this.setupEditor(t);
    });
  }
  /**
   * Setup a single editor instance
   */
  setupEditor(e) {
    if (this.hasState(e))
      return;
    const t = e.id, n = t.replace("-editor", ""), i = v.querySelector(`#${n}[data-editor-input]`);
    if (!i) {
      console.warn(`[EditorActions] Textarea not found for editor: ${t}`);
      return;
    }
    const s = e.dataset.theme || "snow", a = e.dataset.placeholder || "", o = e.dataset.disabled === "true", l = e.dataset.readonly === "true", c = this.parseToolbarConfig(e.dataset.toolbar), d = new L(e, {
      theme: s,
      placeholder: a,
      readOnly: l || o,
      modules: {
        toolbar: c
      }
    }), f = i.value;
    f && (d.root.innerHTML = f), this.setState(e, {
      quillInstance: d,
      textarea: i,
      container: e,
      disabled: o,
      readonly: l
    }), d.on("text-change", () => {
      this.syncContent(e);
    }), o ? (d.enable(!1), e.classList.add("pointer-events-none")) : l && d.enable(!1), this.dispatchReadyEvent(e, d);
  }
  /**
   * Parse toolbar configuration from JSON string
   */
  parseToolbarConfig(e) {
    if (!e)
      return !0;
    try {
      return JSON.parse(e);
    } catch (t) {
      return console.warn("[EditorActions] Invalid toolbar configuration:", t), !0;
    }
  }
  /**
   * Sync Quill content to hidden textarea
   */
  syncContent(e) {
    const t = this.getState(e);
    if (!t) return;
    const { quillInstance: n, textarea: i } = t, s = n.root.innerHTML;
    i.value = s;
    const a = new Event("input", { bubbles: !0 });
    i.dispatchEvent(a), this.dispatchChangeEvent(e, n);
  }
  /**
   * Handle clear action
   */
  handleClearAction(e) {
    const t = this.getState(e);
    if (!t) return;
    const { quillInstance: n } = t;
    n.setText(""), this.syncContent(e);
  }
  /**
   * Handle copy action
   */
  handleCopyAction(e) {
    const t = this.getState(e);
    if (!t) return;
    const { quillInstance: n } = t, i = n.root.innerHTML;
    navigator.clipboard.writeText(i).then(() => {
      console.log("[EditorActions] Content copied to clipboard");
    }).catch((s) => {
      console.warn("[EditorActions] Failed to copy content:", s);
    });
  }
  /**
   * Dispatch ready event
   */
  dispatchReadyEvent(e, t) {
    I.dispatchCustomEvent(e, "editor-ready", {
      element: e,
      quillInstance: t,
      content: t.getText(),
      html: t.root.innerHTML
    });
  }
  /**
   * Dispatch change event
   */
  dispatchChangeEvent(e, t) {
    I.dispatchCustomEvent(e, "editor-change", {
      element: e,
      quillInstance: t,
      content: t.getText(),
      html: t.root.innerHTML
    });
  }
  /**
   * Get editor value (HTML content)
   */
  getValue(e) {
    const t = this.getState(e);
    return t ? t.quillInstance.root.innerHTML : null;
  }
  /**
   * Set editor value (HTML content)
   */
  setValue(e, t) {
    const n = this.getState(e);
    n && (n.quillInstance.root.innerHTML = t, this.syncContent(e));
  }
  /**
   * Get editor text content (without HTML)
   */
  getText(e) {
    const t = this.getState(e);
    return t ? t.quillInstance.getText() : null;
  }
  /**
   * Enable editor
   */
  enable(e) {
    const t = this.getState(e);
    t && (t.quillInstance.enable(!0), t.disabled = !1, t.readonly = !1, e.classList.remove("pointer-events-none"));
  }
  /**
   * Disable editor
   */
  disable(e) {
    const t = this.getState(e);
    t && (t.quillInstance.enable(!1), t.disabled = !0, e.classList.add("pointer-events-none"));
  }
  /**
   * Set editor to readonly
   */
  setReadOnly(e, t) {
    const n = this.getState(e);
    n && (n.quillInstance.enable(!t), n.readonly = t);
  }
  /**
   * Get Quill instance for a container
   */
  getQuillInstance(e) {
    const t = this.getState(e);
    return t ? t.quillInstance : null;
  }
  /**
   * Add a custom ready handler with automatic cleanup
   */
  addReadyHandler(e) {
    return I.addEventListener(document, "editor-ready", (t) => {
      e(t.detail);
    });
  }
  /**
   * Add a custom change handler with automatic cleanup
   */
  addChangeHandler(e) {
    return I.addEventListener(document, "editor-change", (t) => {
      e(t.detail);
    });
  }
  /**
   * Clean up EditorActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.getAllStates().forEach((e) => {
      e.quillInstance.setText("");
    });
  }
  /**
   * Setup dynamic observer for new editors
   */
  setupDynamicObserver() {
    this.createDynamicObserver((e) => {
      e.forEach((t) => {
        if (t.nodeType === Node.ELEMENT_NODE) {
          const n = t;
          n.hasAttribute("data-editor-container") && this.setupEditor(n), v.querySelectorAll("[data-editor-container]", n).forEach((s) => {
            this.setupEditor(s);
          });
        }
      });
    });
  }
}
Ac.getInstance();
class Ec extends ne {
  /**
   * Initialize alert elements - required by BaseActionClass
   */
  initializeElements() {
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    I.handleDelegatedClick("[data-dismiss-alert]", (e, t) => {
      t.preventDefault(), this.handleDismissClick(e);
    }), I.handleDelegatedKeydown("[data-dismiss-alert]", (e, t) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleDismissClick(e));
    });
  }
  /**
   * Handle dismiss button click
   */
  handleDismissClick(e) {
    const t = this.findAlertForButton(e);
    t && (this.dismissAlert(t), this.dispatchAlertEvent(t, "dismiss"));
  }
  /**
   * Find the alert element associated with a dismiss button
   */
  findAlertForButton(e) {
    return v.findClosest(e, '[data-dismissible="true"]');
  }
  /**
   * Dismiss an alert with smooth animation
   */
  dismissAlert(e) {
    e.classList.add("alert-dismissing"), e.style.transition = "opacity 300ms ease-out, transform 300ms ease-out", e.style.opacity = "0", e.style.transform = "translateX(100px)", setTimeout(() => {
      e.parentNode && e.parentNode.removeChild(e);
    }, 300);
  }
  /**
   * Show an alert programmatically
   */
  showAlert(e) {
    e.style.display = "block", e.style.transition = "opacity 300ms ease-out, transform 300ms ease-out", e.style.opacity = "1", e.style.transform = "translateX(0)", setTimeout(() => {
      this.dispatchAlertEvent(e, "show");
    }, 300);
  }
  /**
   * Create and show a new alert dynamically
   */
  createAlert(e) {
    const {
      variant: t = "info",
      title: n,
      message: i,
      dismissible: s = !0,
      duration: a,
      container: o = document.body
    } = e, l = document.createElement("div");
    l.className = this.getAlertClasses(t), l.setAttribute("role", "alert"), s && l.setAttribute("data-dismissible", "true");
    const c = this.buildAlertContent(t, n, i, s);
    return l.innerHTML = c, o.appendChild(l), l.style.opacity = "0", l.style.transform = "translateX(100%)", setTimeout(() => {
      this.showAlert(l);
    }, 10), a && a > 0 && setTimeout(() => {
      this.dismissAlert(l);
    }, a), this.dispatchAlertEvent(l, "create"), l;
  }
  /**
   * Get CSS classes for alert variant
   */
  getAlertClasses(e) {
    const t = "rounded-lg border p-4 space-y-3", n = {
      info: "bg-info/5 border-info/20 text-info-foreground",
      success: "bg-success/5 border-success/20 text-success-foreground",
      warning: "bg-warning/5 border-warning/20 text-warning-foreground",
      danger: "bg-danger/5 border-danger/20 text-danger-foreground",
      neutral: "bg-neutral/5 border-neutral/20 text-neutral-foreground"
    };
    return `${t} ${n[e] || n.info}`;
  }
  /**
   * Build alert content HTML
   */
  buildAlertContent(e, t, n, i) {
    const s = this.getVariantIcon(e), a = this.getVariantIconColor(e);
    return `
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="w-5 h-5 ${a}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${this.getIconSvg(s)}
                    </svg>
                </div>
                <div class="ml-3 flex-1">
                    ${t ? `<div class="text-base font-medium">${t}</div>` : ""}
                    <div class="text-sm opacity-90 ${t ? "mt-1" : ""}">${n || ""}</div>
                </div>
                ${i ? `
                    <div class="ml-auto pl-3">
                        <button type="button" data-dismiss-alert class="inline-flex rounded-md p-1 ${a} hover:bg-current hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current" aria-label="Dismiss">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                ` : ""}
            </div>
        `;
  }
  /**
   * Get icon name for variant
   */
  getVariantIcon(e) {
    const t = {
      info: "information-circle",
      success: "check-circle",
      warning: "exclamation-triangle",
      danger: "x-circle",
      neutral: "chat-bubble-left-ellipsis"
    };
    return t[e] || t.info;
  }
  /**
   * Get icon color for variant
   */
  getVariantIconColor(e) {
    const t = {
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
      neutral: "text-neutral"
    };
    return t[e] || t.info;
  }
  /**
   * Get SVG path for icon
   */
  getIconSvg(e) {
    const t = {
      "information-circle": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      "check-circle": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      "exclamation-triangle": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>',
      "x-circle": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      "chat-bubble-left-ellipsis": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>'
    };
    return t[e] || t["information-circle"];
  }
  /**
   * Dispatch custom event for alert action
   */
  dispatchAlertEvent(e, t) {
    I.dispatchCustomEvent(e, "alert-action", {
      alert: e,
      action: t
    }), I.dispatchCustomEvent(document.body, "alert-action", {
      alert: e,
      action: t
    });
  }
  /**
   * Add a custom alert action handler with automatic cleanup
   */
  addActionHandler(e, t) {
    return I.addEventListener(document, "alert-action", (n) => {
      const i = n;
      i.detail.action === e && t(i.detail.alert);
    });
  }
  /**
   * Dismiss all alerts of a specific variant
   */
  dismissAllByVariant(e) {
    v.querySelectorAll(`[data-dismissible="true"][class*="${e}"]`).forEach((n) => {
      this.dismissAlert(n);
    });
  }
  /**
   * Dismiss all dismissible alerts
   */
  dismissAll() {
    v.querySelectorAll('[data-dismissible="true"]').forEach((t) => {
      this.dismissAlert(t);
    });
  }
  /**
   * Clean up AlertActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
Ec.getInstance();
class _f extends ne {
  constructor() {
    super(...arguments), this.failedUrls = /* @__PURE__ */ new Set(), this.MAX_RETRIES = 2, this.RETRY_DELAY = 1e3;
  }
  /**
   * Bind event listeners - required by BaseActionClass
   */
  bindEventListeners() {
  }
  /**
   * Set up dynamic observer for newly added avatars
   */
  setupDynamicObserver() {
    this.createDynamicObserver((e) => {
      e.forEach((t) => {
        if (t.nodeType === Node.ELEMENT_NODE) {
          const n = t;
          n.hasAttribute("data-keys-avatar") && this.initializeAvatar(n), n.querySelectorAll('[data-keys-avatar="true"]').forEach((s) => {
            this.initializeAvatar(s);
          });
        }
      });
    });
  }
  /**
   * Initialize avatar elements - required by BaseActionClass
   */
  initializeElements() {
    v.querySelectorAll('[data-keys-avatar="true"]').forEach((t) => {
      this.initializeAvatar(t);
    });
  }
  /**
   * Initialize a single avatar element
   */
  initializeAvatar(e) {
    const t = e.querySelector("img"), n = e.querySelector('[data-avatar-fallback="true"]');
    if (!t)
      return;
    const i = e.getAttribute("data-fallback-type") || "icon", s = {
      element: e,
      img: t,
      fallbackContainer: n,
      hasInitials: i === "initials",
      hasIcon: i === "icon",
      retryCount: 0,
      maxRetries: this.MAX_RETRIES,
      isLoading: !1,
      hasFailed: !1
    };
    this.setState(e, s), this.setupImageErrorHandling(s), t.complete && !t.naturalWidth && this.handleImageError(s);
  }
  /**
   * Set up error handling for avatar image
   */
  setupImageErrorHandling(e) {
    e.img && (I.addEventListener(e.img, "error", () => {
      this.handleImageError(e);
    }), I.addEventListener(e.img, "load", () => {
      this.handleImageLoad(e);
    }), e.img.loading === "lazy" && this.setupLazyLoadingSupport(e));
  }
  /**
   * Handle image load error
   */
  handleImageError(e) {
    if (!e.img || e.hasFailed) return;
    const t = e.img.src;
    if (this.failedUrls.add(t), e.retryCount < e.maxRetries && !this.failedUrls.has(t)) {
      this.retryImageLoad(e);
      return;
    }
    e.hasFailed = !0, this.showFallback(e);
  }
  /**
   * Handle successful image load
   */
  handleImageLoad(e) {
    if (!e.img) return;
    const t = e.img.src;
    this.failedUrls.delete(t), e.hasFailed = !1, e.retryCount = 0, e.isLoading = !1, this.showImage(e);
  }
  /**
   * Retry loading the image after a delay
   */
  retryImageLoad(e) {
    !e.img || e.retryCount >= e.maxRetries || (e.retryCount++, e.isLoading = !0, e.element.setAttribute("data-avatar-loading", "true"), setTimeout(() => {
      if (!e.img || e.hasFailed) return;
      const t = e.img.src;
      e.img.src = "", requestAnimationFrame(() => {
        e.img && (e.img.src = t);
      });
    }, this.RETRY_DELAY * e.retryCount));
  }
  /**
   * Show the fallback (initials or icon) using existing styled template structure
   */
  showFallback(e) {
    e.img && (e.img.style.display = "none", e.fallbackContainer && (e.fallbackContainer.style.display = "block"), e.element.setAttribute("data-avatar-fallback-active", "true"), e.element.removeAttribute("data-avatar-image-active"), e.element.removeAttribute("data-avatar-loading"), this.updateAccessibility(e, "fallback"), this.dispatchAvatarEvent(e.element, "fallback", {
      hasInitials: e.hasInitials,
      hasIcon: e.hasIcon
    }));
  }
  /**
   * Show the image (hide fallback) using existing template structure
   */
  showImage(e) {
    e.img && (e.img.style.display = "block", e.fallbackContainer && (e.fallbackContainer.style.display = "none"), e.element.setAttribute("data-avatar-image-active", "true"), e.element.removeAttribute("data-avatar-fallback-active"), e.element.removeAttribute("data-avatar-loading"), this.updateAccessibility(e, "image"), this.dispatchAvatarEvent(e.element, "imageLoad", {
      src: e.img.src
    }));
  }
  /**
   * Set up lazy loading support
   */
  setupLazyLoadingSupport(e) {
    if (!e.img || !("IntersectionObserver" in window)) return;
    const t = new IntersectionObserver((n) => {
      n.forEach((i) => {
        i.isIntersecting && t.unobserve(i.target);
      });
    }, {
      rootMargin: "50px"
    });
    t.observe(e.img);
  }
  /**
   * Update accessibility attributes based on current state
   */
  updateAccessibility(e, t) {
    var s;
    const n = e.element.getAttribute("data-avatar-name"), i = (s = e.img) == null ? void 0 : s.getAttribute("alt");
    if (t === "fallback") {
      const a = e.hasInitials && n ? `Initials for ${n}` : "Avatar placeholder";
      e.element.setAttribute("aria-label", a);
    } else t === "image" && i && e.element.setAttribute("aria-label", i);
  }
  /**
   * Dispatch custom avatar events
   */
  dispatchAvatarEvent(e, t, n = {}) {
    const i = new CustomEvent(`avatar:${t}`, {
      detail: {
        element: e,
        ...n
      },
      bubbles: !0
    });
    e.dispatchEvent(i);
  }
  /**
   * Public method to manually trigger fallback for an avatar
   */
  triggerFallback(e) {
    const t = this.getState(e);
    t && !t.hasFailed && this.handleImageError(t);
  }
  /**
   * Public method to retry loading an avatar image
   */
  retryAvatar(e) {
    const t = this.getState(e);
    t && t.hasFailed && t.img && (t.hasFailed = !1, t.retryCount = 0, this.handleImageLoad(t));
  }
  /**
   * Public method to check if an avatar has failed
   */
  hasAvatarFailed(e) {
    const t = this.getState(e);
    return t ? t.hasFailed : !1;
  }
  /**
   * Clear failed URLs cache (useful for network recovery scenarios)
   */
  clearFailedUrlsCache() {
    this.failedUrls.clear();
  }
}
class Cc extends ne {
  /**
   * Initialize badge elements - required by BaseActionClass
   */
  initializeElements() {
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    I.handleDelegatedClick("[data-dismiss-target]", (e, t) => {
      t.preventDefault(), this.handleDismissClick(e);
    }), I.handleDelegatedKeydown("[data-dismiss-target]", (e, t) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleDismissClick(e));
    });
  }
  /**
   * Handle dismiss button click
   */
  handleDismissClick(e) {
    const t = this.findBadgeForButton(e);
    t && (this.dismissBadge(t), this.dispatchBadgeEvent(t, "dismiss"));
  }
  /**
   * Find the badge element associated with a dismiss button
   */
  findBadgeForButton(e) {
    const t = e.getAttribute("data-dismiss-target");
    if (!t) return null;
    const n = t.startsWith("#") ? t.slice(1) : t;
    return v.querySelector(`#${n}`);
  }
  /**
   * Dismiss a badge with smooth animation
   */
  dismissBadge(e) {
    e.classList.add("badge-dismissing"), e.style.transition = "all 250ms ease-out", e.style.transform = "scale(0.8)", e.style.opacity = "0", setTimeout(() => {
      e.parentNode && e.parentNode.removeChild(e);
    }, 250);
  }
  /**
   * Show a badge programmatically
   */
  showBadge(e) {
    e.style.display = "inline-flex", e.style.opacity = "0", e.style.transform = "scale(0.8)", setTimeout(() => {
      e.style.transition = "all 250ms ease-out", e.style.opacity = "1", e.style.transform = "scale(1)", this.dispatchBadgeEvent(e, "show");
    }, 10);
  }
  /**
   * Create and show a new badge dynamically
   */
  createBadge(e) {
    const {
      variant: t = "simple",
      color: n = "blue",
      size: i = "sm",
      text: s,
      icon: a,
      dismissible: o = !1,
      container: l = document.body
    } = e, c = document.createElement(o ? "button" : "span"), d = o ? `badge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` : void 0;
    c.className = this.getBadgeClasses(t, n, i), d && (c.id = d), o && (c.setAttribute("type", "button"), c.setAttribute("data-dismiss-target", `#${d}`), c.setAttribute("aria-label", "Remove badge"));
    const f = this.buildBadgeContent(s, a, o);
    return c.innerHTML = f, l.appendChild(c), c.style.opacity = "0", c.style.transform = "scale(0.8)", setTimeout(() => {
      this.showBadge(c);
    }, 10), this.dispatchBadgeEvent(c, "create"), c;
  }
  /**
   * Get CSS classes for badge
   */
  getBadgeClasses(e, t, n) {
    const i = "inline-flex items-center font-medium", s = {
      xs: "px-1.5 py-0.5 text-xs",
      sm: "px-2.5 py-0.5 text-xs",
      md: "px-3 py-1 text-sm"
    }, a = {
      simple: "rounded-full",
      chip: "rounded-sm",
      subtle: ""
    }, o = this.getColorClasses(e, t);
    return `${i} ${s[n] || s.sm} ${a[e] || a.simple} ${o}`;
  }
  /**
   * Get color classes for badge
   */
  getColorClasses(e, t) {
    if (e === "subtle") {
      const i = {
        brand: "text-brand",
        success: "text-success",
        warning: "text-warning",
        danger: "text-danger",
        neutral: "text-neutral",
        blue: "text-blue-600",
        green: "text-green-600",
        red: "text-red-600",
        purple: "text-purple-600",
        yellow: "text-yellow-600"
      };
      return i[t] || i.blue;
    }
    const n = {
      brand: "bg-brand/10 text-brand",
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      danger: "bg-danger/10 text-danger",
      neutral: "bg-neutral/10 text-neutral",
      blue: "bg-blue-500/10 text-blue-600",
      green: "bg-green-500/10 text-green-600",
      red: "bg-red-500/10 text-red-600",
      purple: "bg-purple-500/10 text-purple-600",
      yellow: "bg-yellow-500/10 text-yellow-600"
    };
    return n[t] || n.blue;
  }
  /**
   * Build badge content HTML
   */
  buildBadgeContent(e, t, n) {
    let i = "";
    return t && (i += `<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <!-- Icon would be rendered here -->
            </svg>`), i += e, n && (i += `<svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>`), i;
  }
  /**
   * Dispatch custom event for badge action
   */
  dispatchBadgeEvent(e, t) {
    I.dispatchCustomEvent(e, "badge-action", {
      badge: e,
      action: t
    }), I.dispatchCustomEvent(document.body, "badge-action", {
      badge: e,
      action: t
    });
  }
  /**
   * Add a custom badge action handler with automatic cleanup
   */
  addActionHandler(e, t) {
    return I.addEventListener(document, "badge-action", (n) => {
      const i = n;
      i.detail.action === e && t(i.detail.badge);
    });
  }
  /**
   * Dismiss all badges of a specific color
   */
  dismissAllByColor(e) {
    v.querySelectorAll(`[data-dismissible="true"][class*="${e}"]`).forEach((n) => {
      this.dismissBadge(n);
    });
  }
  /**
   * Dismiss all dismissible badges
   */
  dismissAll() {
    v.querySelectorAll("[data-dismiss-target]").forEach((t) => {
      const n = this.findBadgeForButton(t);
      n && this.dismissBadge(n);
    });
  }
  /**
   * Clean up BadgeActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
Cc.getInstance();
class Tc extends ne {
  constructor() {
    super(...arguments), this.buttonStates = /* @__PURE__ */ new Map();
  }
  /**
   * Initialize multi-state button elements - required by BaseActionClass
   */
  initializeElements() {
    v.querySelectorAll('[data-multi-state="true"]').forEach((t) => {
      this.initializeButton(t);
    });
  }
  /**
   * Initialize a single multi-state button
   */
  initializeButton(e) {
    this.buttonStates.set(e, {
      current: "default",
      cycling: !1,
      element: e
    }), this.updateIconState(e, "default");
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    I.handleDelegatedClick('[data-multi-state="true"]', (e, t) => {
      t.preventDefault(), this.handleButtonClick(e);
    }), I.handleDelegatedKeydown('[data-multi-state="true"]', (e, t) => {
      (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleButtonClick(e));
    });
  }
  /**
   * Handle multi-state button click
   */
  async handleButtonClick(e) {
    const t = this.buttonStates.get(e);
    if (!t || t.cycling) return;
    const n = this.getNextState(t.current, e);
    t.cycling = !0, await this.transitionToState(e, n), t.current = n, t.cycling = !1, n === "success" && setTimeout(async () => {
      t.current === "success" && (t.cycling = !0, await this.transitionToState(e, "default"), t.current = "default", t.cycling = !1);
    }, 2e3), this.dispatchButtonEvent(e, n);
  }
  /**
   * Determine the next state for a button
   */
  getNextState(e, t) {
    const n = t.dataset.iconToggle, i = t.dataset.iconSuccess;
    switch (e) {
      case "default":
        return n ? "toggle" : i ? "success" : "default";
      case "toggle":
        return i ? "success" : "default";
      case "success":
      default:
        return "default";
    }
  }
  /**
   * Transition button to a specific state
   */
  async transitionToState(e, t) {
    this.updateIconState(e, t), this.updateButtonLabel(e, t), t === "success" && this.animateSuccessFeedback(e);
  }
  /**
   * Update button icon state using CSS classes
   */
  updateIconState(e, t) {
    const n = v.querySelector(".button-icon-default", e), i = v.querySelector(".button-icon-toggle", e), s = v.querySelector(".button-icon-success", e);
    [n, i, s].forEach((o) => {
      o && (o.classList.remove("opacity-100", "scale-110"), o.classList.add("opacity-0"));
    });
    let a = null;
    switch (t) {
      case "default":
        a = n;
        break;
      case "toggle":
        a = i;
        break;
      case "success":
        a = s, a && a.classList.add("scale-110");
        break;
    }
    a && (a.classList.remove("opacity-0"), a.classList.add("opacity-100"));
  }
  /**
   * Update button label and accessibility attributes
   */
  updateButtonLabel(e, t) {
    const n = v.querySelector(".sr-only", e);
    let i = null, s = null;
    switch (t) {
      case "default":
        const a = this.getOriginalLabel(e);
        i = a, s = a;
        break;
      case "toggle":
        i = e.dataset.labelToggle || null, s = e.dataset.labelToggle || null;
        break;
      case "success":
        i = e.dataset.labelSuccess || null, s = e.dataset.labelSuccess || null;
        break;
    }
    i && n && (n.textContent = i), s && e.setAttribute("aria-label", s), t === "toggle" ? e.setAttribute("aria-pressed", "true") : e.removeAttribute("aria-pressed");
  }
  /**
   * Get the original label for a button
   */
  getOriginalLabel(e) {
    var n;
    if (e.dataset.originalLabel)
      return e.dataset.originalLabel;
    const t = (n = e.textContent) == null ? void 0 : n.trim();
    return t ? (e.dataset.originalLabel = t, t) : e.getAttribute("aria-label") || "Button";
  }
  /**
   * Animate success feedback with scale and timing
   */
  animateSuccessFeedback(e) {
    e.classList.add("scale-105"), setTimeout(() => {
      e.classList.remove("scale-105");
    }, 200);
  }
  /**
   * Dispatch custom event for button state change
   */
  dispatchButtonEvent(e, t) {
    I.dispatchCustomEvent(e, "button-state-change", {
      element: e,
      state: t,
      timestamp: Date.now()
    });
  }
  /**
   * Public method to manually set button state
   */
  setButtonState(e, t) {
    const n = this.buttonStates.get(e);
    n || this.initializeButton(e), this.transitionToState(e, t), n && (n.current = t);
  }
  /**
   * Public method to get current button state
   */
  getButtonState(e) {
    const t = this.buttonStates.get(e);
    return t ? t.current : "default";
  }
  /**
   * Add a custom state change handler with automatic cleanup
   */
  addStateChangeHandler(e) {
    return I.addEventListener(document, "button-state-change", (t) => {
      const n = t;
      e(n.detail.element, n.detail.state);
    });
  }
  /**
   * Clean up ButtonActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.buttonStates.clear();
  }
}
Tc.getInstance();
const ha = class ha {
  /**
   * Format Date object to string using custom format
   */
  static formatDate(e, t) {
    if (!e || isNaN(e.getTime()))
      return "";
    const n = e.getFullYear(), i = e.getMonth() + 1, s = e.getDate(), a = [
      ["YYYY", String(n)],
      ["YY", String(n).slice(-2)],
      ["Y", String(n)],
      ["y", String(n).slice(-2)],
      ["MMMM", this.MONTH_NAMES[i - 1]],
      ["MMM", this.MONTH_NAMES_SHORT[i - 1]],
      ["MM", String(i).padStart(2, "0")],
      ["M", this.MONTH_NAMES_SHORT[i - 1]],
      ["mm", String(i).padStart(2, "0")],
      ["m", String(i).padStart(2, "0")],
      ["n", String(i)],
      ["F", this.MONTH_NAMES[i - 1]],
      ["DD", String(s).padStart(2, "0")],
      ["dd", String(s).padStart(2, "0")],
      ["d", String(s).padStart(2, "0")],
      ["j", String(s)]
    ];
    let o = t;
    for (const [l, c] of a)
      o = o.replace(new RegExp(l, "g"), c);
    return o;
  }
  /**
   * Format Date object to YYYY-MM-DD string
   */
  static formatDateString(e) {
    if (!e || isNaN(e.getTime()))
      return "";
    const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), i = String(e.getDate()).padStart(2, "0");
    return `${t}-${n}-${i}`;
  }
  /**
   * Parse date string to Date object
   */
  static parseDate(e) {
    if (!e || typeof e != "string" || !e.trim())
      return null;
    try {
      const t = new Date(e);
      return isNaN(t.getTime()) ? null : t;
    } catch {
      return null;
    }
  }
  /**
   * Format date for display using specified format
   */
  static formatDateForDisplay(e, t) {
    if (!e) return "";
    const n = this.parseDate(e);
    return n ? this.formatDate(n, t) : "";
  }
  /**
   * Format date range for display
   */
  static formatRangeForDisplay(e, t, n, i = " - ") {
    if (!e) return "";
    const s = this.formatDateForDisplay(e, n), a = t ? this.formatDateForDisplay(t, n) : "";
    return a ? `${s}${i}${a}` : s;
  }
  /**
   * Format date range for form submission
   */
  static formatRangeForSubmission(e, t, n = "Y-m-d") {
    if (!e) return null;
    const i = this.formatDateForSubmission(e, n), s = t ? this.formatDateForSubmission(t, n) : "";
    return s ? `${i},${s}` : i;
  }
  /**
   * Format single date for form submission
   */
  static formatDateForSubmission(e, t = "Y-m-d") {
    if (!e) return "";
    const n = this.parseDate(e);
    return n ? this.formatDate(n, t) : "";
  }
  /**
   * Add days to a date string
   */
  static addDaysToDate(e, t) {
    const n = this.parseDate(e);
    return n ? (n.setDate(n.getDate() + t), this.formatDateString(n)) : e;
  }
  /**
   * Add months to a date string
   */
  static addMonthsToDate(e, t) {
    const n = this.parseDate(e);
    return n ? (n.setMonth(n.getMonth() + t), this.formatDateString(n)) : e;
  }
  /**
   * Get first day of month for a date string
   */
  static getFirstDayOfMonth(e) {
    const t = this.parseDate(e);
    return t ? (t.setDate(1), this.formatDateString(t)) : e;
  }
  /**
   * Get last day of month for a date string
   */
  static getLastDayOfMonth(e) {
    const t = this.parseDate(e);
    return t ? (t.setMonth(t.getMonth() + 1, 0), this.formatDateString(t)) : e;
  }
  /**
   * Get current year-month string (YYYY-MM)
   */
  static getCurrentYearMonth() {
    const e = /* @__PURE__ */ new Date();
    return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}`;
  }
  /**
   * Get today's date string (YYYY-MM-DD)
   */
  static getTodayDate() {
    return this.formatDateString(/* @__PURE__ */ new Date());
  }
  /**
   * Check if date string is today
   */
  static isToday(e) {
    return e === this.getTodayDate();
  }
  /**
   * Check if a date is within a range
   */
  static isDateInRange(e, t, n) {
    if (!t || !n) return !1;
    const i = this.parseDate(e), s = this.parseDate(t), a = this.parseDate(n);
    return !i || !s || !a ? !1 : i >= s && i <= a;
  }
  /**
   * Check if a date matches start of range
   */
  static isDateRangeStart(e, t) {
    return t === e;
  }
  /**
   * Check if a date matches end of range
   */
  static isDateRangeEnd(e, t) {
    return t === e;
  }
  /**
   * Get placeholder text for date format
   */
  static getFormatPlaceholder(e) {
    return {
      "Y-m-d": "YYYY-MM-DD",
      "Y/m/d": "YYYY/MM/DD",
      "d-m-Y": "DD-MM-YYYY",
      "d/m/Y": "DD/MM/YYYY",
      "m/d/Y": "MM/DD/YYYY",
      "m-d-Y": "MM-DD-YYYY",
      "F j, Y": "Month DD, YYYY",
      "M j, Y": "Mon DD, YYYY",
      "j F Y": "DD Month YYYY"
    }[e] || "YYYY-MM-DD";
  }
  /**
   * Parse input date string with multiple format support
   */
  static parseInputDate(e, t) {
    if (!e || !e.trim()) return null;
    try {
      const n = new Date(e);
      if (!isNaN(n.getTime()))
        return n;
    } catch {
    }
    return null;
  }
  /**
   * Create ARIA label for date with contextual information
   */
  static createDateAriaLabel(e, t = !1, n = !1, i = !1, s = !1, a = !1) {
    const o = this.parseDate(e);
    if (!o) return e;
    let c = o.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    return t && (c += ", Today"), n ? c += ", Selected" : i ? c += ", Range start" : s ? c += ", Range end" : a && (c += ", In selected range"), c;
  }
  /**
   * Validate date string format
   */
  static isValidDateString(e) {
    const t = this.parseDate(e);
    return t !== null && !isNaN(t.getTime());
  }
  /**
   * Compare two date strings
   */
  static compareDates(e, t) {
    const n = this.parseDate(e), i = this.parseDate(t);
    return !n || !i ? 0 : n.getTime() - i.getTime();
  }
  /**
   * Get quick selector date ranges
   */
  static getQuickSelectorDate(e) {
    const t = /* @__PURE__ */ new Date();
    let n = null, i = null;
    switch (e) {
      case "today":
        n = t, i = t;
        break;
      case "yesterday":
        n = new Date(t), n.setDate(t.getDate() - 1), i = n;
        break;
      case "last7days":
        i = t, n = new Date(t), n.setDate(t.getDate() - 6);
        break;
      case "last30days":
        i = t, n = new Date(t), n.setDate(t.getDate() - 29);
        break;
      case "thismonth":
        n = new Date(t.getFullYear(), t.getMonth(), 1), i = new Date(t.getFullYear(), t.getMonth() + 1, 0);
        break;
      case "lastmonth":
        n = new Date(t.getFullYear(), t.getMonth() - 1, 1), i = new Date(t.getFullYear(), t.getMonth(), 0);
        break;
      case "thisyear":
        n = new Date(t.getFullYear(), 0, 1), i = new Date(t.getFullYear(), 11, 31);
        break;
    }
    return { start: n, end: i };
  }
};
ha.MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], ha.MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let be = ha;
class pt {
  /**
   * Handle date selection for both single and range modes
   */
  static selectDate(e, t, n, i) {
    n.isDisabled || (n.isRange ? this.handleRangeSelection(e, t, n, i) : i({
      selectedDate: t,
      focusedDate: t
    }));
  }
  /**
   * Handle range selection logic with proper start/end management
   */
  static handleRangeSelection(e, t, n, i) {
    const s = new Date(t);
    if (!n.startDate || n.rangeSelectionState === "none") {
      i({
        startDate: t,
        endDate: null,
        focusedDate: t,
        rangeSelectionState: "selecting-end"
      });
      return;
    }
    if (n.startDate && !n.endDate) {
      const a = new Date(n.startDate);
      s < a ? i({
        startDate: t,
        endDate: null,
        focusedDate: t,
        rangeSelectionState: "selecting-end"
      }) : s.getTime() === a.getTime() ? i({
        startDate: null,
        endDate: null,
        focusedDate: t,
        rangeSelectionState: "none"
      }) : i({
        endDate: t,
        focusedDate: t,
        rangeSelectionState: "none"
      });
      return;
    }
    i({
      startDate: t,
      endDate: null,
      focusedDate: t,
      rangeSelectionState: "selecting-end"
    });
  }
  /**
   * Clear selected dates (single or range)
   */
  static clearSelection(e, t, n) {
    t.isRange ? n({
      startDate: null,
      endDate: null,
      rangeSelectionState: "none"
    }) : n({
      selectedDate: null
    });
  }
  /**
   * Select today's date
   */
  static selectToday(e, t, n) {
    const i = this.getTodayDate();
    t.isRange ? n({
      startDate: i,
      endDate: i,
      focusedDate: i,
      rangeSelectionState: "none"
    }) : n({
      selectedDate: i,
      focusedDate: i
    });
  }
  /**
   * Format range dates for display
   */
  static formatRangeForDisplay(e, t) {
    return !e && !t ? "" : e && t ? `${e},${t}` : e ? `${e},` : "";
  }
  /**
   * Check if a date is within the selected range
   */
  static isDateInRange(e, t, n) {
    if (!t || !n) return !1;
    const i = new Date(e), s = new Date(t), a = new Date(n);
    return i >= s && i <= a;
  }
  /**
   * Check if a date is the range start
   */
  static isDateRangeStart(e, t) {
    return t === e;
  }
  /**
   * Check if a date is the range end
   */
  static isDateRangeEnd(e, t) {
    return t === e;
  }
  /**
   * Get range attributes for styling
   */
  static getRangeAttributes(e, t) {
    if (!t.isRange) return "";
    const n = [];
    return e.isInRange && n.push('data-is-in-range="true"'), e.isRangeStart && n.push('data-is-range-start="true"'), e.isRangeEnd && n.push('data-is-range-end="true"'), e.isInHoverRange && n.push('data-is-hover-range="true"'), n.join(" ");
  }
  /**
   * Get today's date in YYYY-MM-DD format
   */
  static getTodayDate() {
    const e = /* @__PURE__ */ new Date();
    return e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0") + "-" + String(e.getDate()).padStart(2, "0");
  }
  /**
   * Check if a date string represents today
   */
  static isToday(e) {
    return e === this.getTodayDate();
  }
  /**
   * Check if a date is in the hover preview range
   * Shows preview when user has selected start date and is hovering to select end date
   */
  static isDateInHoverRange(e, t) {
    if (!t.isRange || !t.hoveredDate || t.rangeSelectionState !== "selecting-end" || !t.startDate || t.endDate)
      return !1;
    const n = new Date(e), i = new Date(t.startDate), s = new Date(t.hoveredDate);
    return s >= i ? n >= i && n <= s : n >= s && n <= i;
  }
}
class Mw {
  /**
   * Generate calendar grid data for a specific month
   */
  static generateCalendarGrid(e, t, n = 0) {
    const i = this.addMonthsToDate(t.currentMonth + "-01", n), s = parseInt(i.substring(0, 4)), a = parseInt(i.substring(5, 7)) - 1, o = new Date(s, a, 1), l = new Date(o);
    l.setDate(l.getDate() - o.getDay());
    const c = [];
    let d = [];
    for (let f = 0; f < 42; f++) {
      const h = new Date(l);
      h.setDate(l.getDate() + f);
      const g = this.formatDateString(h), m = h.getMonth() === a, b = pt.isToday(g), k = t.selectedDate === g, y = this.isDateDisabled(e, h, t), S = t.isRange ? pt.isDateInRange(g, t.startDate, t.endDate) : !1, E = t.isRange ? pt.isDateRangeStart(g, t.startDate) : !1, C = t.isRange ? pt.isDateRangeEnd(g, t.endDate) : !1, D = t.isRange ? pt.isDateInHoverRange(g, t) : !1, M = {
        date: g,
        day: h.getDate(),
        isCurrentMonth: m,
        isToday: b,
        isSelected: k,
        isDisabled: y,
        isInRange: S,
        isRangeStart: E,
        isRangeEnd: C,
        isInHoverRange: D
      };
      d.push(M), d.length === 7 && (c.push(d), d = []);
    }
    return c;
  }
  /**
   * Render the complete calendar grid
   */
  static renderCalendarGrid(e, t) {
    t.monthsToShow > 1 ? this.renderMultipleMonths(e, t) : this.renderSingleMonth(e, t);
  }
  /**
   * Render a single month calendar
   */
  static renderSingleMonth(e, t) {
    const n = e.querySelector("[data-calendar-grid-container]");
    if (!n) return;
    const i = this.generateCalendarGrid(e, t), s = this.getCellClasses(e), a = t.weekdays.map(
      (c) => `<div class="${s} font-semibold text-text-muted text-center text-xs">${c}</div>`
    ).join(""), o = i.map(
      (c) => c.map((d) => {
        const f = this.getDayButtonClasses(d, e, t), h = pt.getRangeAttributes(d, t), g = this.getDateAriaLabel(d, t);
        return `
                    <div class="calendar-day ${s}">
                        <button
                            type="button"
                            class="${f}"
                            data-date="${d.date}"
                            data-calendar-day-btn
                            ${d.isToday ? 'data-is-today="true"' : ""}
                            ${d.isDisabled ? "disabled" : ""}
                            ${h}
                            aria-label="${g}"
                            tabindex="${d.date === t.focusedDate ? "0" : "-1"}"
                        >
                            ${d.day}
                        </button>
                    </div>
                `;
      }).join("")
    ).join(""), l = `
            <div class="calendar-weekdays-grid grid grid-cols-7 gap-0">
                ${a}
            </div>
            <div class="calendar-days-grid grid grid-cols-7 gap-0">
                ${o}
            </div>
        `;
    n.innerHTML = l;
  }
  /**
   * Render multiple months calendar
   */
  static renderMultipleMonths(e, t) {
    e.querySelectorAll("[data-calendar-grid-container]").forEach((i, s) => {
      if (s >= t.monthsToShow) return;
      const a = this.generateCalendarGrid(e, t, s), o = this.getCellClasses(e), l = this.addMonthsToDate(t.currentMonth + "-01", s), c = t.monthNames[parseInt(l.substring(5, 7)) - 1], d = l.substring(0, 4), f = `
                <div class="calendar-month-header text-center font-semibold text-sm mb-2 text-text-muted">
                    ${c} ${d}
                </div>
            `, h = t.weekdays.map(
        (b) => `<div class="${o} font-semibold text-text-muted text-center text-xs">${b}</div>`
      ).join(""), g = a.map(
        (b) => b.map((k) => {
          const y = this.getDayButtonClasses(k, e, t), S = pt.getRangeAttributes(k, t), E = this.getDateAriaLabel(k, t);
          return `
                        <div class="calendar-day ${o}">
                            <button
                                type="button"
                                class="${y}"
                                data-date="${k.date}"
                                data-calendar-day-btn
                                data-month-index="${s}"
                                ${k.isToday ? 'data-is-today="true"' : ""}
                                ${k.isDisabled ? "disabled" : ""}
                                ${S}
                                aria-label="${E}"
                                tabindex="${k.date === t.focusedDate ? "0" : "-1"}"
                            >
                                ${k.day}
                            </button>
                        </div>
                    `;
        }).join("")
      ).join(""), m = `
                ${f}
                <div class="calendar-weekdays-grid grid grid-cols-7 gap-0 mb-1">
                    ${h}
                </div>
                <div class="calendar-days-grid grid grid-cols-7 gap-0">
                    ${g}
                </div>
            `;
      i.innerHTML = m;
    });
  }
  /**
   * Get responsive cell classes based on calendar size
   */
  static getCellClasses(e) {
    const t = e.dataset.size || "sm";
    return {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base"
    }[t] || "w-8 h-8 text-xs";
  }
  /**
   * Get day button classes with proper state styling
   */
  static getDayButtonClasses(e, t, n) {
    const i = t.dataset.size || "sm", s = "w-full h-full rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1", a = {
      sm: "text-xs",
      md: "text-sm font-medium",
      lg: "text-base font-medium"
    }[i] || "text-sm font-medium";
    let o = "";
    return e.isDisabled ? o = "bg-card text-text-muted border-transparent cursor-not-allowed opacity-40 hover:bg-card hover:border-transparent" : e.isSelected && !n.isRange ? o = "bg-brand text-white border-brand-600 font-bold shadow-sm" : e.isToday ? o = "bg-neutral-50 text-brand border-brand font-semibold" : e.isCurrentMonth ? o = "text-text border-transparent hover:bg-neutral-hover hover:border-border" : o = "text-text-muted border-transparent hover:bg-neutral-hover hover:border-border", `${s} ${a} ${o}`.trim();
  }
  /**
   * Generate accessible aria-label for date buttons
   */
  static getDateAriaLabel(e, t) {
    const n = new Date(e.date), i = n.toLocaleDateString("en-US", { weekday: "long" }), s = n.toLocaleDateString("en-US", { month: "long" });
    let a = `${i}, ${s} ${e.day}, ${n.getFullYear()}`;
    return e.isToday && (a += ", today"), e.isSelected && (a += ", selected"), e.isRangeStart && (a += ", range start"), e.isRangeEnd && (a += ", range end"), e.isInRange && (a += ", in range"), e.isDisabled && (a += ", disabled"), a;
  }
  /**
   * Check if a date should be disabled
   */
  static isDateDisabled(e, t, n) {
    if (n.isDisabled) return !0;
    const i = this.formatDateString(t);
    return n.minDate && i < n.minDate || n.maxDate && i > n.maxDate ? !0 : n.disabledDates && Array.isArray(n.disabledDates) ? n.disabledDates.includes(i) : !1;
  }
  /**
   * Format date as YYYY-MM-DD string
   */
  static formatDateString(e) {
    return e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0") + "-" + String(e.getDate()).padStart(2, "0");
  }
  /**
   * Add months to a date string
   */
  static addMonthsToDate(e, t) {
    const n = new Date(e);
    return n.setMonth(n.getMonth() + t), this.formatDateString(n);
  }
}
class yn {
  /**
   * Navigate to previous or next month
   */
  static navigateMonth(e, t, n, i, s) {
    if (n.isDisabled) return;
    const a = /* @__PURE__ */ new Date(n.currentMonth + "-01"), o = new Date(a);
    t === "prev" ? o.setMonth(a.getMonth() - 1) : o.setMonth(a.getMonth() + 1);
    const l = this.formatYearMonth(o);
    this.canNavigateToMonth(o, n) && (i({
      currentMonth: l,
      viewMode: "calendar"
    }), s(), this.updateMonthYearDisplay(e, n.monthNames, l));
  }
  /**
   * Navigate to today's month
   */
  static navigateToToday(e, t, n, i) {
    const s = /* @__PURE__ */ new Date(), a = this.formatYearMonth(s);
    a !== t.currentMonth && (n({
      currentMonth: a,
      viewMode: "calendar"
    }), i(), this.updateMonthYearDisplay(e, t.monthNames, a));
  }
  /**
   * Toggle month/year dropdown
   */
  static toggleMonthYearDropdown(e, t, n, i) {
    t.isDisabled || (t.viewMode === "calendar" ? (n({ viewMode: "month" }), this.renderMonthGrid(e, t, n, i)) : t.viewMode === "month" ? (n({ viewMode: "year" }), this.renderYearGrid(e, t, n, i)) : (n({ viewMode: "calendar" }), i()));
  }
  /**
   * Render month selection grid
   */
  static renderMonthGrid(e, t, n, i) {
    const s = e.querySelector("[data-calendar-grid-container]");
    if (!s) return;
    const a = parseInt(t.currentMonth.substring(0, 4)), o = parseInt(t.currentMonth.substring(5, 7)) - 1, l = t.monthNames.map((f, h) => {
      const g = h === o, m = this.isMonthDisabled(e, a, h, t);
      return `
                <button
                    type="button"
                    class="${this.getMonthButtonClasses(g, m)} month-option"
                    data-month="${h}"
                    data-calendar-month-btn
                    ${m ? "disabled" : ""}
                    aria-label="Select ${f} ${a}"
                >
                    ${f}
                </button>
            `;
    }).join(""), d = `
            ${`
            <div class="flex items-center justify-between mb-4">
                <button
                    type="button"
                    class="p-2 rounded-md hover:bg-neutral-hover focus:outline-none focus:ring-2 focus:ring-brand"
                    data-calendar-year-nav="prev"
                    aria-label="Previous year"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    type="button"
                    class="text-lg font-semibold px-4 py-2 rounded-md hover:bg-neutral-hover focus:outline-none focus:ring-2 focus:ring-brand"
                    data-calendar-year-btn
                    aria-label="Select year ${a}"
                >
                    ${a}
                </button>

                <button
                    type="button"
                    class="p-2 rounded-md hover:bg-neutral-hover focus:outline-none focus:ring-2 focus:ring-brand"
                    data-calendar-year-nav="next"
                    aria-label="Next year"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        `}
            <div class="month-grid grid grid-cols-3 gap-2">
                ${l}
            </div>
        `;
    s.innerHTML = d, this.bindMonthGridEvents(e, t, n, i);
  }
  /**
   * Render year selection grid
   */
  static renderYearGrid(e, t, n, i) {
    const s = e.querySelector("[data-calendar-grid-container]");
    if (!s) return;
    const a = parseInt(t.currentMonth.substring(0, 4)), o = Math.floor(a / 10) * 10, c = Array.from({ length: 12 }, (h, g) => o - 1 + g).map((h) => {
      const g = h === a, m = this.isYearDisabled(e, h, t), b = h < o || h >= o + 10;
      return `
                <button
                    type="button"
                    class="${this.getYearButtonClasses(g, m, b)} year-option"
                    data-year="${h}"
                    data-calendar-year-option
                    ${m ? "disabled" : ""}
                    aria-label="Select year ${h}"
                >
                    ${h}
                </button>
            `;
    }).join(""), f = `
            ${`
            <div class="flex items-center justify-between mb-4">
                <button
                    type="button"
                    class="p-2 rounded-md hover:bg-neutral-hover focus:outline-none focus:ring-2 focus:ring-brand"
                    data-calendar-decade-nav="prev"
                    aria-label="Previous decade"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <span class="text-lg font-semibold">
                    ${o} - ${o + 9}
                </span>

                <button
                    type="button"
                    class="p-2 rounded-md hover:bg-neutral-hover focus:outline-none focus:ring-2 focus:ring-brand"
                    data-calendar-decade-nav="next"
                    aria-label="Next decade"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        `}
            <div class="year-grid grid grid-cols-4 gap-2">
                ${c}
            </div>
        `;
    s.innerHTML = f, this.bindYearGridEvents(e, t, n, i);
  }
  /**
   * Select a specific month
   */
  static selectMonth(e, t, n, i, s) {
    const o = `${n.currentMonth.substring(0, 4)}-${String(t + 1).padStart(2, "0")}`;
    i({
      currentMonth: o,
      viewMode: "calendar"
    }), s(), this.updateMonthYearDisplay(e, n.monthNames, o);
  }
  /**
   * Select a specific year
   */
  static selectYear(e, t, n, i, s) {
    const a = n.currentMonth.substring(5, 7), o = `${t}-${a}`;
    i({
      currentMonth: o,
      viewMode: "month"
    }), this.renderMonthGrid(e, n, i, s);
  }
  /**
   * Navigate year in month/year picker
   */
  static navigateYear(e, t, n, i, s) {
    if (n.isDisabled) return;
    const a = parseInt(n.currentMonth.substring(0, 4)), o = t === "prev" ? a - 1 : a + 1, l = n.currentMonth.substring(5, 7), c = `${o}-${l}`;
    i({
      currentMonth: c
    }), n.viewMode === "year" ? this.renderYearGrid(e, n, i, s) : n.viewMode === "month" && this.renderMonthGrid(e, n, i, s);
  }
  /**
   * Check if navigation to a specific month is allowed
   */
  static canNavigateToMonth(e, t) {
    if (t.minDate) {
      const n = new Date(t.minDate), i = new Date(n.getFullYear(), n.getMonth(), 1);
      if (e < i) return !1;
    }
    if (t.maxDate) {
      const n = new Date(t.maxDate), i = new Date(n.getFullYear(), n.getMonth(), 1);
      if (e > i) return !1;
    }
    return !0;
  }
  /**
   * Check if a specific month is disabled
   */
  static isMonthDisabled(e, t, n, i) {
    if (i.minDate) {
      const s = new Date(i.minDate);
      if (t < s.getFullYear() || t === s.getFullYear() && n < s.getMonth())
        return !0;
    }
    if (i.maxDate) {
      const s = new Date(i.maxDate);
      if (t > s.getFullYear() || t === s.getFullYear() && n > s.getMonth())
        return !0;
    }
    return !1;
  }
  /**
   * Check if a specific year is disabled
   */
  static isYearDisabled(e, t, n) {
    return !!(n.minDate && t < new Date(n.minDate).getFullYear() || n.maxDate && t > new Date(n.maxDate).getFullYear());
  }
  /**
   * Update month/year display in header
   */
  static updateMonthYearDisplay(e, t, n) {
    const i = e.querySelector(".calendar-month-year-display");
    if (!i) return;
    const s = n.substring(0, 4), a = parseInt(n.substring(5, 7)) - 1, o = t[a];
    i.textContent = `${o} ${s}`;
  }
  /**
   * Get month button classes
   */
  static getMonthButtonClasses(e, t) {
    const n = "w-full p-3 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand";
    return t ? `${n} bg-card text-text-muted cursor-not-allowed opacity-50` : e ? `${n} bg-brand text-white font-semibold shadow-sm` : `${n} text-text hover:bg-neutral-hover hover:scale-105`;
  }
  /**
   * Get year button classes
   */
  static getYearButtonClasses(e, t, n) {
    const i = "w-full p-3 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand";
    return t ? `${i} bg-card text-text-muted cursor-not-allowed opacity-50` : e ? `${i} bg-brand text-white font-semibold shadow-sm` : n ? `${i} text-text-muted hover:bg-neutral-hover opacity-75` : `${i} text-text hover:bg-neutral-hover hover:scale-105`;
  }
  /**
   * Format date as YYYY-MM string
   */
  static formatYearMonth(e) {
    return e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0");
  }
  /**
   * Bind month grid event listeners
   */
  static bindMonthGridEvents(e, t, n, i) {
    var s;
    e.querySelectorAll("[data-calendar-month-btn]").forEach((a) => {
      a.addEventListener("click", (o) => {
        const l = parseInt(o.target.dataset.month || "0");
        this.selectMonth(e, l, t, n, i);
      });
    }), (s = e.querySelector("[data-calendar-year-btn]")) == null || s.addEventListener("click", () => {
      n({ viewMode: "year" }), this.renderYearGrid(e, t, n, i);
    });
  }
  /**
   * Bind year grid event listeners
   */
  static bindYearGridEvents(e, t, n, i) {
    e.querySelectorAll("[data-calendar-year-option]").forEach((s) => {
      s.addEventListener("click", (a) => {
        const o = parseInt(a.target.dataset.year || "0");
        this.selectYear(e, o, t, n, i);
      });
    }), e.querySelectorAll("[data-calendar-decade-nav]").forEach((s) => {
      s.addEventListener("click", (a) => {
        const o = a.target.dataset.calendarDecadeNav, l = parseInt(t.currentMonth.substring(0, 4)), c = Math.floor(l / 10) * 10, h = `${(o === "prev" ? c - 10 : c + 10) + l % 10}-${t.currentMonth.substring(5, 7)}`;
        n({ currentMonth: h }), this.renderYearGrid(e, t, n, i);
      });
    });
  }
}
class zo {
  /**
   * Handle keyboard navigation
   */
  static handleKeydown(e, t, n, i, s, a) {
    if (n.isDisabled || !n.focusedDate) return;
    const { key: o, ctrlKey: l, shiftKey: c } = t;
    switch (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End", "Enter", " ", "Escape"].includes(o) && t.preventDefault(), o) {
      case "ArrowLeft":
        this.navigateByDays(e, -1, n, i, a);
        break;
      case "ArrowRight":
        this.navigateByDays(e, 1, n, i, a);
        break;
      case "ArrowUp":
        this.navigateByDays(e, -7, n, i, a);
        break;
      case "ArrowDown":
        this.navigateByDays(e, 7, n, i, a);
        break;
      case "PageUp":
        c ? this.navigateByYears(e, -1, n, i, a) : this.navigateByMonths(e, -1, n, i, a);
        break;
      case "PageDown":
        c ? this.navigateByYears(e, 1, n, i, a) : this.navigateByMonths(e, 1, n, i, a);
        break;
      case "Home":
        l ? this.navigateToToday(e, n, i, a) : this.navigateToWeekStart(e, n, i, a);
        break;
      case "End":
        this.navigateToWeekEnd(e, n, i, a);
        break;
      case "Enter":
      case " ":
        n.focusedDate && s(n.focusedDate);
        break;
      case "Escape":
        this.handleEscape(e, n, i, a);
        break;
      case "t":
      case "T":
        !l && !c && this.navigateToToday(e, n, i, a);
        break;
    }
  }
  /**
   * Navigate by a specific number of days
   */
  static navigateByDays(e, t, n, i, s) {
    if (!n.focusedDate) return;
    const a = this.addDaysToDate(n.focusedDate, t);
    this.isDateNavigable(a, n) && this.focusDate(e, a, n, i, s);
  }
  /**
   * Navigate by a specific number of months
   */
  static navigateByMonths(e, t, n, i, s) {
    if (!n.focusedDate) return;
    const a = new Date(n.focusedDate), o = new Date(a);
    o.setMonth(a.getMonth() + t), o.getDate() !== a.getDate() && o.setDate(0);
    const l = this.formatDateString(o);
    if (this.isDateNavigable(l, n)) {
      const c = this.formatYearMonth(o);
      c !== n.currentMonth ? (i({
        currentMonth: c,
        focusedDate: l
      }), s()) : this.focusDate(e, l, n, i, s);
    }
  }
  /**
   * Navigate by a specific number of years
   */
  static navigateByYears(e, t, n, i, s) {
    if (!n.focusedDate) return;
    const a = new Date(n.focusedDate), o = new Date(a);
    o.setFullYear(a.getFullYear() + t), o.getMonth() !== a.getMonth() && o.setDate(0);
    const l = this.formatDateString(o);
    if (this.isDateNavigable(l, n)) {
      const c = this.formatYearMonth(o);
      i({
        currentMonth: c,
        focusedDate: l
      }), setTimeout(() => s(), 100);
    }
  }
  /**
   * Navigate to the start of the current week (Sunday)
   */
  static navigateToWeekStart(e, t, n, i) {
    if (!t.focusedDate) return;
    const s = new Date(t.focusedDate), a = s.getDay(), o = new Date(s);
    o.setDate(s.getDate() - a);
    const l = this.formatDateString(o);
    this.isDateNavigable(l, t) && this.focusDate(e, l, t, n, i);
  }
  /**
   * Navigate to the end of the current week (Saturday)
   */
  static navigateToWeekEnd(e, t, n, i) {
    if (!t.focusedDate) return;
    const s = new Date(t.focusedDate), a = 6 - s.getDay(), o = new Date(s);
    o.setDate(s.getDate() + a);
    const l = this.formatDateString(o);
    this.isDateNavigable(l, t) && this.focusDate(e, l, t, n, i);
  }
  /**
   * Navigate to today's date
   */
  static navigateToToday(e, t, n, i) {
    const s = this.getTodayDate();
    if (this.isDateNavigable(s, t)) {
      const a = this.formatYearMonth(new Date(s));
      a !== t.currentMonth ? (n({
        currentMonth: a,
        focusedDate: s
      }), i()) : this.focusDate(e, s, t, n, i);
    }
  }
  /**
   * Handle Escape key - close dropdowns or cancel operations
   */
  static handleEscape(e, t, n, i) {
    t.viewMode !== "calendar" ? (n({ viewMode: "calendar" }), setTimeout(() => i(), 100)) : t.isRange && t.rangeSelectionState === "selecting-end" && (n({
      rangeSelectionState: "none",
      startDate: null,
      endDate: null
    }), setTimeout(() => i(), 100));
  }
  /**
   * Focus a specific date and update visual state
   */
  static focusDate(e, t, n, i, s) {
    i({ focusedDate: t }), e.querySelectorAll("[data-calendar-day-btn]").forEach((o) => {
      o.setAttribute("tabindex", "-1");
    });
    const a = e.querySelector(`[data-calendar-day-btn][data-date="${t}"]`);
    a && (a.setAttribute("tabindex", "0"), a.focus());
  }
  /**
   * Check if a date can be navigated to (not disabled)
   */
  static isDateNavigable(e, t) {
    return !(t.minDate && e < t.minDate || t.maxDate && e > t.maxDate || t.disabledDates.includes(e));
  }
  /**
   * Add days to a date string
   */
  static addDaysToDate(e, t) {
    const n = new Date(e);
    return n.setDate(n.getDate() + t), this.formatDateString(n);
  }
  /**
   * Format date as YYYY-MM-DD string
   */
  static formatDateString(e) {
    return e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0") + "-" + String(e.getDate()).padStart(2, "0");
  }
  /**
   * Format date as YYYY-MM string
   */
  static formatYearMonth(e) {
    return e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0");
  }
  /**
   * Get today's date in YYYY-MM-DD format
   */
  static getTodayDate() {
    const e = /* @__PURE__ */ new Date();
    return this.formatDateString(e);
  }
  /**
   * Set up keyboard event listeners for a calendar
   */
  static bindKeyboardEvents(e, t, n, i, s) {
    e.removeEventListener("keydown", e.dataset.keydownHandler);
    const a = (o) => {
      this.handleKeydown(e, o, t, n, i, s);
    };
    e.dataset.keydownHandler = a.toString(), e.addEventListener("keydown", a), e.hasAttribute("tabindex") || e.setAttribute("tabindex", "0");
  }
  /**
   * Initialize focus for a calendar
   */
  static initializeFocus(e, t) {
    const n = t.focusedDate || this.getTodayDate(), i = e.querySelector(`[data-calendar-day-btn][data-date="${n}"]`);
    i && (i.setAttribute("tabindex", "0"), document.activeElement === e && i.focus());
  }
  /**
   * Cleanup keyboard event listeners
   */
  static unbindKeyboardEvents(e) {
    const t = e.dataset.keydownHandler;
    t && (e.removeEventListener("keydown", t), delete e.dataset.keydownHandler);
  }
}
class tn {
  /**
   * Update hidden form inputs based on current selection
   */
  static updateHiddenInput(e, t) {
    t.isRange ? this.updateRangeInputs(e, t) : this.updateSingleInput(e, t);
  }
  /**
   * Update hidden inputs for range mode
   */
  static updateRangeInputs(e, t) {
    const n = e.querySelector(".calendar-start-input"), i = e.querySelector(".calendar-end-input"), s = e.querySelector(".calendar-range-input");
    n && (n.value = t.startDate || ""), i && (i.value = t.endDate || ""), s && (s.value = pt.formatRangeForDisplay(t.startDate, t.endDate)), [n, i, s].forEach((a) => {
      a && this.dispatchInputChangeEvent(a);
    });
  }
  /**
   * Update hidden input for single date mode
   */
  static updateSingleInput(e, t) {
    const n = e.querySelector(".calendar-hidden-input");
    n && (n.value = t.selectedDate || "", this.dispatchInputChangeEvent(n));
  }
  /**
   * Dispatch change event on input for framework integration
   */
  static dispatchInputChangeEvent(e) {
    const t = new Event("input", { bubbles: !0 }), n = new Event("change", { bubbles: !0 });
    e.dispatchEvent(t), e.dispatchEvent(n), window.Livewire && e.hasAttribute("wire:model") && window.Livewire.hook("message.processed", () => {
    });
  }
  /**
   * Handle quick selector actions
   */
  static handleQuickSelector(e, t, n, i, s) {
    const a = /* @__PURE__ */ new Date();
    let o = null, l = null, c = null;
    switch (t) {
      case "today":
        if (c = this.formatDateString(a), this.isDateDisabled(c, n)) {
          console.warn("Today is disabled and cannot be selected");
          return;
        }
        n.isRange && (o = c, l = c);
        break;
      case "yesterday":
        const g = new Date(a);
        if (g.setDate(g.getDate() - 1), c = this.formatDateString(g), this.isDateDisabled(c, n)) {
          console.warn("Yesterday is disabled and cannot be selected");
          return;
        }
        n.isRange && (o = c, l = c);
        break;
      case "last7days":
        if (n.isRange) {
          l = this.formatDateString(a);
          const m = new Date(a);
          m.setDate(a.getDate() - 6), o = this.formatDateString(m);
        }
        break;
      case "last30days":
        if (n.isRange) {
          l = this.formatDateString(a);
          const m = new Date(a);
          m.setDate(a.getDate() - 29), o = this.formatDateString(m);
        }
        break;
      case "thismonth":
        if (n.isRange) {
          const m = new Date(a.getFullYear(), a.getMonth(), 1), b = new Date(a.getFullYear(), a.getMonth() + 1, 0);
          o = this.formatDateString(m), l = this.formatDateString(b);
        }
        break;
      case "lastmonth":
        if (n.isRange) {
          const m = new Date(a.getFullYear(), a.getMonth() - 1, 1), b = new Date(a.getFullYear(), a.getMonth(), 0);
          o = this.formatDateString(m), l = this.formatDateString(b);
        }
        break;
      case "thisyear":
        if (n.isRange) {
          const m = new Date(a.getFullYear(), 0, 1), b = new Date(a.getFullYear(), 11, 31);
          o = this.formatDateString(m), l = this.formatDateString(b);
        }
        break;
      default:
        console.warn(`Unknown quick selector value: ${t}`);
        return;
    }
    const d = l || c;
    let f = n.currentMonth;
    d && (f = this.formatYearMonth(new Date(d))), n.isRange && o && l ? i({
      startDate: o,
      endDate: l,
      rangeSelectionState: "none",
      focusedDate: l,
      viewMode: "calendar",
      currentMonth: f
    }) : !n.isRange && c && i({
      selectedDate: c,
      focusedDate: c,
      viewMode: "calendar",
      currentMonth: f
    }), s(), yn.updateMonthYearDisplay(e, n.monthNames, f), this.updateHiddenInput(e, n);
    const h = c ? be.formatDateForDisplay(c, n.displayFormat) : null;
    o && be.formatDateForDisplay(o, n.displayFormat), l && be.formatDateForDisplay(l, n.displayFormat), n.isRange && o && l ? this.dispatchCalendarEvent(e, "rangeSelected", {
      startDate: o,
      endDate: l,
      formattedRange: be.formatRangeForDisplay(o, l, n.displayFormat),
      source: "quickSelector"
    }) : !n.isRange && c && this.dispatchCalendarEvent(e, "dateSelected", {
      selectedDate: c,
      formattedDate: h,
      source: "quickSelector"
    });
  }
  /**
   * Check if a date is disabled based on calendar constraints
   */
  static isDateDisabled(e, t) {
    const n = be.parseDate(e);
    if (!n) return !0;
    if (t.minDate) {
      const i = be.parseDate(t.minDate);
      if (i && n < i)
        return !0;
    }
    if (t.maxDate) {
      const i = be.parseDate(t.maxDate);
      if (i && n > i)
        return !0;
    }
    return !!(t.disabledDates && t.disabledDates.includes(e));
  }
  /**
   * Handle footer actions (clear, today)
   */
  static handleFooterAction(e, t, n, i, s) {
    switch (t) {
      case "clear":
        pt.clearSelection(e, n, i), s(), this.updateHiddenInput(e, n), this.dispatchCalendarEvent(e, "cleared", {
          source: "footerAction"
        });
        break;
      case "today":
        const a = this.formatDateString(/* @__PURE__ */ new Date()), o = this.formatYearMonth(/* @__PURE__ */ new Date());
        if (this.isDateDisabled(a, n)) {
          console.warn("Today is disabled and cannot be selected");
          return;
        }
        n.isRange ? i({
          startDate: a,
          endDate: a,
          focusedDate: a,
          rangeSelectionState: "none",
          currentMonth: o
        }) : i({
          selectedDate: a,
          focusedDate: a,
          currentMonth: o
        }), s(), yn.updateMonthYearDisplay(e, n.monthNames, o), this.updateHiddenInput(e, n);
        const l = be.formatDateForDisplay(a, n.displayFormat);
        this.dispatchCalendarEvent(e, "dateSelected", {
          selectedDate: n.isRange ? null : a,
          startDate: n.isRange ? a : null,
          endDate: n.isRange ? a : null,
          formattedDate: n.isRange ? null : l,
          formattedRange: n.isRange ? `${l} - ${l}` : null,
          source: "footerAction"
        });
        break;
      default:
        console.warn(`Unknown footer action: ${t}`);
    }
  }
  /**
   * Dispatch custom calendar events for framework integration
   */
  static dispatchCalendarEvent(e, t, n = null) {
    const i = new CustomEvent(`calendar:${t}`, {
      bubbles: !0,
      cancelable: !0,
      detail: {
        calendar: e,
        ...n
      }
    });
    e.dispatchEvent(i), document.dispatchEvent(new CustomEvent(`keys:calendar:${t}`, {
      bubbles: !0,
      cancelable: !0,
      detail: {
        calendar: e,
        ...n
      }
    }));
  }
  /**
   * Bind form integration event listeners
   */
  static bindFormEvents(e, t, n, i) {
    e.addEventListener("quickSelector:clicked", (s) => {
      var o;
      const a = (o = s.detail) == null ? void 0 : o.value;
      a && this.handleQuickSelector(e, a, t, n, i);
    }), e.addEventListener("click", (s) => {
      const a = s.target.closest("[data-quick-selector]");
      if (a && !e.closest("[data-keys-date-picker]")) {
        const l = a.dataset.quickSelector;
        l && this.handleQuickSelector(e, l, t, n, i);
      }
    }), e.addEventListener("click", (s) => {
      const a = s.target.closest("[data-calendar-action]");
      if (a) {
        const o = a.dataset.calendarAction;
        o && this.handleFooterAction(e, o, t, n, i);
      }
    });
  }
  /**
   * Get current calendar state for external access
   */
  static getCalendarState(e, t) {
    return {
      currentMonth: t.currentMonth,
      selectedDate: t.selectedDate,
      startDate: t.startDate,
      endDate: t.endDate,
      focusedDate: t.focusedDate,
      isRange: t.isRange,
      isDisabled: t.isDisabled,
      viewMode: t.viewMode,
      rangeSelectionState: t.rangeSelectionState,
      formattedValue: t.isRange ? pt.formatRangeForDisplay(t.startDate, t.endDate) : t.selectedDate
    };
  }
  /**
   * Set selected date programmatically (external API)
   */
  static setSelectedDate(e, t, n, i, s) {
    if (n.isRange) {
      console.warn("Use setSelectedRange for range calendars");
      return;
    }
    if (i({
      selectedDate: t,
      focusedDate: t
    }), t) {
      const a = this.formatYearMonth(new Date(t));
      a !== n.currentMonth && i({ currentMonth: a });
    }
    s(), this.updateHiddenInput(e, n), this.dispatchCalendarEvent(e, "dateChanged", {
      selectedDate: t,
      source: "programmatic"
    });
  }
  /**
   * Set selected range programmatically (external API)
   */
  static setSelectedRange(e, t, n, i, s, a) {
    if (!i.isRange) {
      console.warn("Use setSelectedDate for single date calendars");
      return;
    }
    if (s({
      startDate: t,
      endDate: n,
      rangeSelectionState: "none",
      focusedDate: n || t
    }), n || t) {
      const o = n || t, l = this.formatYearMonth(new Date(o));
      l !== i.currentMonth && s({ currentMonth: l });
    }
    a(), this.updateHiddenInput(e, i), this.dispatchCalendarEvent(e, "rangeChanged", {
      startDate: t,
      endDate: n,
      source: "programmatic"
    });
  }
  /**
   * Format date as YYYY-MM-DD string
   */
  static formatDateString(e) {
    return e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0") + "-" + String(e.getDate()).padStart(2, "0");
  }
  /**
   * Format date as YYYY-MM string
   */
  static formatYearMonth(e) {
    return e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0");
  }
}
class qf extends ne {
  /**
   * Initialize calendar elements - required by BaseActionClass
   */
  initializeElements() {
    v.findByDataAttribute("keys-calendar", "true").forEach((e) => {
      this.initializeCalendar(e);
    });
  }
  /**
   * Initialize a single calendar element
   */
  initializeCalendar(e) {
    if (this.hasState(e))
      return;
    const t = e.dataset.keysCalendarConfig, n = e.dataset.disabled === "true";
    let i;
    try {
      i = t ? JSON.parse(t) : {};
    } catch (a) {
      console.error("Failed to parse calendar data:", a), i = {};
    }
    const s = {
      currentMonth: i.currentMonth || this.getCurrentYearMonth(),
      selectedDate: i.selectedDate || null,
      startDate: i.startDate || null,
      endDate: i.endDate || null,
      focusedDate: i.selectedDate || i.startDate || this.getTodayDate(),
      hoveredDate: null,
      isRange: i.isRange || !1,
      monthsToShow: i.monthsToShow || 1,
      rangeSelectionState: "none",
      isDisabled: n,
      minDate: i.minDate || null,
      maxDate: i.maxDate || null,
      disabledDates: i.disabledDates || [],
      weekdays: i.weekdays || ["S", "M", "T", "W", "T", "F", "S"],
      monthNames: i.monthNames || [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      viewMode: "calendar",
      format: i.format || "Y-m-d",
      displayFormat: i.displayFormat || i.format || "Y-m-d"
    };
    this.setState(e, s), this.renderCalendar(e), this.bindAllEventListeners(e), tn.updateHiddenInput(e, s), tn.dispatchCalendarEvent(e, "initialized", { state: s });
  }
  /**
   * Bind all event listeners for a calendar
   */
  bindEventListeners() {
  }
  /**
   * Bind all event listeners for a specific calendar
   */
  bindAllEventListeners(e) {
    const t = this.getState(e);
    t && (this.bindDateSelectionEvents(e), this.bindNavigationEvents(e), tn.bindFormEvents(
      e,
      t,
      (n) => this.updateState(e, n),
      () => this.renderCalendar(e)
    ), zo.bindKeyboardEvents(
      e,
      t,
      (n) => this.updateState(e, n),
      (n) => this.selectDate(e, n),
      () => this.renderCalendar(e)
    ));
  }
  /**
   * Bind date selection event listeners
   */
  bindDateSelectionEvents(e) {
    e.addEventListener("click", (t) => {
      const n = t.target;
      if (n.dataset.calendarDayBtn !== void 0) {
        const i = n.dataset.date, s = n.hasAttribute("disabled") || n.getAttribute("aria-disabled") === "true";
        i && !s && this.selectDate(e, i);
      }
    }), e.addEventListener("mouseover", (t) => {
      const n = t.target, i = this.getState(e);
      if (!(!i || !i.isRange) && n.dataset.calendarDayBtn !== void 0) {
        const s = n.dataset.date, a = n.hasAttribute("disabled") || n.getAttribute("aria-disabled") === "true";
        s && !a && i.rangeSelectionState === "selecting-end" && (this.updateState(e, { hoveredDate: s }), this.renderCalendar(e));
      }
    }), e.addEventListener("mouseleave", (t) => {
      const n = this.getState(e);
      n && n.isRange && n.hoveredDate && (this.updateState(e, { hoveredDate: null }), this.renderCalendar(e));
    });
  }
  /**
   * Bind navigation event listeners
   */
  bindNavigationEvents(e) {
    e.addEventListener("click", (t) => {
      const n = t.target, i = this.getState(e);
      if (!i) return;
      const s = n.closest("[data-calendar-nav]");
      if (s) {
        const d = s.dataset.calendarNav;
        yn.navigateMonth(
          e,
          d,
          i,
          (f) => this.updateState(e, f),
          () => this.renderCalendar(e)
        );
        return;
      }
      if (n.closest("[data-calendar-month-year-btn]")) {
        yn.toggleMonthYearDropdown(
          e,
          i,
          (d) => this.updateState(e, d),
          () => this.renderCalendar(e)
        );
        return;
      }
      const o = n.closest("[data-calendar-month-btn]");
      if (o) {
        const d = parseInt(o.dataset.month || "0");
        yn.selectMonth(
          e,
          d,
          i,
          (f) => this.updateState(e, f),
          () => this.renderCalendar(e)
        );
        return;
      }
      const l = n.closest("[data-calendar-year-option]");
      if (l) {
        const d = parseInt(l.dataset.year || "0");
        yn.selectYear(
          e,
          d,
          i,
          (f) => this.updateState(e, f),
          () => this.renderCalendar(e)
        );
        return;
      }
      const c = n.closest("[data-calendar-year-nav]");
      if (c) {
        const d = c.dataset.calendarYearNav;
        yn.navigateYear(
          e,
          d,
          i,
          (f) => this.updateState(e, f),
          () => this.renderCalendar(e)
        );
        return;
      }
    });
  }
  /**
   * Handle date selection
   */
  selectDate(e, t) {
    const n = this.getState(e);
    if (!n) return;
    pt.selectDate(
      e,
      t,
      n,
      (s) => this.updateState(e, s)
    ), this.renderCalendar(e), tn.updateHiddenInput(e, this.getState(e));
    const i = this.getState(e);
    if (n.isRange) {
      const s = i.startDate && i.endDate ? be.formatRangeForDisplay(i.startDate, i.endDate, i.displayFormat) : i.startDate ? be.formatDateForDisplay(i.startDate, i.displayFormat) : "";
      tn.dispatchCalendarEvent(e, "rangeSelected", {
        startDate: i.startDate,
        endDate: i.endDate,
        formattedRange: s,
        source: "userClick"
      });
    } else {
      const s = be.formatDateForDisplay(t, i.displayFormat);
      tn.dispatchCalendarEvent(e, "dateSelected", {
        selectedDate: t,
        formattedDate: s,
        source: "userClick"
      });
    }
  }
  /**
   * Render the calendar
   */
  renderCalendar(e) {
    const t = this.getState(e);
    t && (this.toggleQuickSelectors(e, t.viewMode), t.viewMode === "calendar" ? (Mw.renderCalendarGrid(e, t), zo.initializeFocus(e, t)) : t.viewMode === "month" || t.viewMode === "year" && yn.renderYearGrid(
      e,
      t,
      (n) => this.updateState(e, n),
      () => this.renderCalendar(e)
    ));
  }
  /**
   * Toggle quick selectors visibility based on view mode, isRange, and selector configuration
   */
  toggleQuickSelectors(e, t) {
    const n = this.getState(e), i = e.querySelector('[data-view-mode-show="calendar"]');
    if (i) {
      const a = i.querySelectorAll("[data-quick-selector]").length > 0;
      t === "calendar" && (n != null && n.isRange) && a ? i.style.display = "" : i.style.display = "none";
    }
  }
  /**
   * Update state and trigger re-render
   */
  updateState(e, t) {
    const n = this.getState(e);
    if (!n) return;
    const i = { ...n, ...t };
    this.setState(e, i);
  }
  /**
   * Setup dynamic observer for dynamically added calendars
   */
  setupDynamicObserver() {
    new MutationObserver((t) => {
      t.forEach((n) => {
        n.addedNodes.forEach((i) => {
          if (i.nodeType === Node.ELEMENT_NODE) {
            const s = i;
            s.dataset.keysCalendar === "true" && this.initializeCalendar(s), s.querySelectorAll('[data-keys-calendar="true"]').forEach((o) => {
              this.initializeCalendar(o);
            });
          }
        });
      });
    }).observe(document.body, {
      childList: !0,
      subtree: !0
    });
  }
  /**
   * Public API: Get calendar state
   */
  getCalendarState(e) {
    const t = this.getState(e);
    return t ? tn.getCalendarState(e, t) : null;
  }
  /**
   * Public API: Set selected date
   */
  setSelectedDate(e, t) {
    const n = this.getState(e);
    n && tn.setSelectedDate(
      e,
      t,
      n,
      (i) => this.updateState(e, i),
      () => this.renderCalendar(e)
    );
  }
  /**
   * Public API: Set selected range
   */
  setSelectedRange(e, t, n) {
    const i = this.getState(e);
    i && tn.setSelectedRange(
      e,
      t,
      n,
      i,
      (s) => this.updateState(e, s),
      () => this.renderCalendar(e)
    );
  }
  /**
   * Cleanup when component is destroyed
   */
  onDestroy() {
    v.findByDataAttribute("keys-calendar", "true").forEach((e) => {
      zo.unbindKeyboardEvents(e);
    });
  }
  /**
   * Get current year-month string
   */
  getCurrentYearMonth() {
    const e = /* @__PURE__ */ new Date();
    return e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0");
  }
  /**
   * Get today's date string
   */
  getTodayDate() {
    const e = /* @__PURE__ */ new Date();
    return e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0") + "-" + String(e.getDate()).padStart(2, "0");
  }
}
class Lc extends ne {
  /**
   * Initialize radio elements - required by BaseActionClass
   */
  initializeElements() {
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    I.handleDelegatedClick("label[for]", (e) => {
      const t = e.getAttribute("for");
      if (!t) return;
      const n = v.getElementById(t);
      !n || n.type !== "radio" || this.focusRadioInput(n);
    }), I.handleDelegatedKeydown('input[type="radio"]', (e, t) => {
      I.createNavigationHandler({
        onArrowDown: () => this.focusNextRadio(e),
        onArrowRight: () => this.focusNextRadio(e),
        onArrowUp: () => this.focusPreviousRadio(e),
        onArrowLeft: () => this.focusPreviousRadio(e),
        preventDefault: ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"]
      })(t);
    });
  }
  /**
   * Focus a radio input with proper timing
   */
  focusRadioInput(e) {
    v.focus(e, 0), this.dispatchFocusEvent(e);
  }
  /**
   * Focus the next radio in the same group
   */
  focusNextRadio(e) {
    const t = this.getRadioGroup(e), i = (t.indexOf(e) + 1) % t.length, s = t[i];
    s && (s.focus(), s.checked = !0, s.dispatchEvent(new Event("change", { bubbles: !0 })), this.dispatchFocusEvent(s));
  }
  /**
   * Focus the previous radio in the same group
   */
  focusPreviousRadio(e) {
    const t = this.getRadioGroup(e), n = t.indexOf(e), i = n === 0 ? t.length - 1 : n - 1, s = t[i];
    s && (s.focus(), s.checked = !0, s.dispatchEvent(new Event("change", { bubbles: !0 })), this.dispatchFocusEvent(s));
  }
  /**
   * Get all radio inputs in the same group
   */
  getRadioGroup(e) {
    const t = e.name;
    return t ? Array.from(v.querySelectorAll(`input[type="radio"][name="${t}"]`)).filter((i) => !i.disabled) : [e];
  }
  /**
   * Dispatch custom event for radio focus
   */
  dispatchFocusEvent(e) {
    I.dispatchCustomEvent(e, "radio-focus", {
      radio: e,
      name: e.name,
      value: e.value,
      checked: e.checked
    });
  }
  /**
   * Add a custom radio focus handler with automatic cleanup
   */
  addFocusHandler(e) {
    return I.addEventListener(document, "radio-focus", (t) => {
      e(t.detail.radio);
    });
  }
  /**
   * Clean up RadioActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
Lc.getInstance();
class Pr extends ne {
  /**
   * Initialize range elements - required by BaseActionClass
   */
  initializeElements() {
    v.findByDataAttribute("range", "true").forEach((e) => {
      this.initializeRange(e);
    });
  }
  /**
   * Initialize a single range component
   */
  initializeRange(e) {
    var a, o, l;
    if (this.hasState(e))
      return;
    const t = v.querySelector(".range-track", e);
    if (!t) return;
    const n = {
      min: parseFloat(t.dataset.min || "0"),
      max: parseFloat(t.dataset.max || "100"),
      step: parseFloat(t.dataset.step || "1"),
      dual: t.dataset.dual === "true",
      ticks: t.dataset.ticks ? JSON.parse(t.dataset.ticks) : [],
      disabled: t.dataset.disabled === "true"
    }, i = this.getElements(e, n);
    if (!i.track) return;
    const s = {
      minValue: n.dual ? parseFloat(((a = i.inputs.min) == null ? void 0 : a.value) || n.min.toString()) : n.min,
      maxValue: n.dual ? parseFloat(((o = i.inputs.max) == null ? void 0 : o.value) || n.max.toString()) : n.max,
      singleValue: n.dual ? n.min : parseFloat(((l = i.inputs.single) == null ? void 0 : l.value) || n.min.toString()),
      isDragging: !1,
      activeHandle: null
    };
    this.setState(e, { config: n, state: s, elements: i }), n.disabled || this.setupHandleInteractions(e, i);
  }
  /**
   * Get all relevant elements for a range component
   */
  getElements(e, t) {
    const n = v.querySelector(".range-track", e), i = v.querySelector(".range-fill", e), s = {}, a = {}, o = {}, l = {};
    return t.dual ? (s.min = v.querySelector('[data-handle="min"]', e), s.max = v.querySelector('[data-handle="max"]', e), a.min = v.querySelector('[data-native-input="min"]', e), a.max = v.querySelector('[data-native-input="max"]', e), o.min = v.querySelector('[data-range-input="min"]', e), o.max = v.querySelector('[data-range-input="max"]', e), l.min = v.querySelector('[data-value-display="min"]', e), l.max = v.querySelector('[data-value-display="max"]', e)) : (s.single = v.querySelector('[data-handle="single"]', e), a.single = v.querySelector('[data-native-input="single"]', e), o.single = v.querySelector('[data-range-input="single"]', e), l.single = v.querySelector('[data-value-display="single"]', e)), {
      container: e,
      track: n,
      fill: i,
      handles: s,
      inputs: a,
      hiddenInputs: o,
      valueDisplays: l
    };
  }
  /**
   * Set up handle interactions (mouse, touch, keyboard)
   */
  setupHandleInteractions(e, t) {
    const { handles: n } = t;
    Object.entries(n).forEach(([i, s]) => {
      s && (s.addEventListener("mousedown", (a) => this.handleStart(a, e, i)), s.addEventListener("touchstart", (a) => this.handleStart(a, e, i), { passive: !1 }), s.addEventListener("keydown", (a) => this.handleKeydown(a, e, i)), s.addEventListener("focus", () => this.handleFocus(e, i)), s.addEventListener("blur", () => this.handleBlur(e, i)));
    }), t.track.addEventListener("click", (i) => this.handleTrackClick(i, e));
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    I.addEventListener(document, "mousemove", (e) => this.handleMove(e)), I.addEventListener(document, "mouseup", (e) => this.handleEnd(e)), I.addEventListener(document, "touchmove", (e) => this.handleMove(e), { passive: !1 }), I.addEventListener(document, "touchend", (e) => this.handleEnd(e)), I.addEventListener(document, "touchcancel", (e) => this.handleEnd(e));
  }
  /**
   * Setup dynamic observer for new ranges - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((e) => {
      e.forEach((t) => {
        if (t.nodeType === Node.ELEMENT_NODE) {
          const n = t;
          v.hasDataAttribute(n, "range", "true") && this.initializeRange(n), v.findByDataAttribute("range", "true", n).forEach((i) => {
            this.initializeRange(i);
          });
        }
      });
    });
  }
  /**
   * Handle drag start
   */
  handleStart(e, t, n) {
    e.preventDefault();
    const i = this.getState(t);
    if (!i || i.config.disabled) return;
    i.state.isDragging = !0, i.state.activeHandle = n;
    const s = i.elements.handles[n];
    s && (s.classList.add("dragging"), s.focus()), t.classList.add("dragging"), document.body.style.userSelect = "none";
  }
  /**
   * Handle drag move
   */
  handleMove(e) {
    const t = Array.from(this.getAllStates().entries()).find(([h, g]) => g.state.isDragging);
    if (!t) return;
    e.preventDefault();
    const [n, i] = t, { config: s, state: a, elements: o } = i, l = "touches" in e ? e.touches[0].clientX : e.clientX, c = o.track.getBoundingClientRect(), d = Math.max(0, Math.min(1, (l - c.left) / c.width));
    let f = this.percentageToValue(d, s);
    f = this.snapToTickIfNeeded(f, s), this.updateValue(n, a.activeHandle, f);
  }
  /**
   * Handle drag end
   */
  handleEnd(e) {
    const t = Array.from(this.getAllStates().entries()).find(([a, o]) => o.state.isDragging);
    if (!t) return;
    const [n, i] = t;
    i.state.isDragging = !1;
    const s = i.elements.handles[i.state.activeHandle];
    s && s.classList.remove("dragging"), n.classList.remove("dragging"), i.state.activeHandle = null, document.body.style.userSelect = "", this.dispatchChangeEvent(n);
  }
  /**
   * Handle keyboard navigation
   */
  handleKeydown(e, t, n) {
    const i = this.getState(t);
    if (!i || i.config.disabled) return;
    const { config: s, state: a } = i;
    let o = !1, l;
    const c = n === "min" ? a.minValue : n === "max" ? a.maxValue : a.singleValue;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        l = Math.max(s.min, c - s.step), o = !0;
        break;
      case "ArrowRight":
      case "ArrowUp":
        l = Math.min(s.max, c + s.step), o = !0;
        break;
      case "PageDown":
        l = Math.max(s.min, c - s.step * 10), o = !0;
        break;
      case "PageUp":
        l = Math.min(s.max, c + s.step * 10), o = !0;
        break;
      case "Home":
        l = s.min, o = !0;
        break;
      case "End":
        l = s.max, o = !0;
        break;
    }
    o && (e.preventDefault(), l = this.snapToTickIfNeeded(l, s), this.updateValue(t, n, l), this.dispatchChangeEvent(t));
  }
  /**
   * Handle track click to jump to position
   */
  handleTrackClick(e, t) {
    const n = this.getState(t);
    if (!n || n.config.disabled) return;
    const { config: i, state: s } = n, a = n.elements.track.getBoundingClientRect(), o = (e.clientX - a.left) / a.width;
    let l = this.percentageToValue(o, i);
    if (l = this.snapToTickIfNeeded(l, i), i.dual) {
      const c = Math.abs(l - s.minValue), d = Math.abs(l - s.maxValue), f = c <= d ? "min" : "max";
      this.updateValue(t, f, l);
    } else
      this.updateValue(t, "single", l);
    this.dispatchChangeEvent(t);
  }
  /**
   * Update a handle's value and visual position
   */
  updateValue(e, t, n) {
    const i = this.getState(e);
    if (!i) return;
    const { config: s, state: a, elements: o } = i;
    s.dual ? t === "min" ? (n = Math.min(n, a.maxValue), a.minValue = n) : t === "max" && (n = Math.max(n, a.minValue), a.maxValue = n) : a.singleValue = n, this.updateVisualElements(e), this.updateFormInputs(e), this.dispatchInputEvent(e);
  }
  /**
   * Update visual elements (handles, fill, value displays)
   */
  updateVisualElements(e) {
    const t = this.getState(e);
    if (!t) return;
    const { config: n, state: i, elements: s } = t;
    if (n.dual) {
      const a = this.valueToPercentage(i.minValue, n), o = this.valueToPercentage(i.maxValue, n);
      s.handles.min && (s.handles.min.style.left = `${a}%`, s.handles.min.setAttribute("aria-valuenow", i.minValue.toString()), s.handles.min.setAttribute("aria-valuetext", i.minValue.toString())), s.handles.max && (s.handles.max.style.left = `${o}%`, s.handles.max.setAttribute("aria-valuenow", i.maxValue.toString()), s.handles.max.setAttribute("aria-valuetext", i.maxValue.toString())), s.fill.style.left = `${a}%`, s.fill.style.width = `${o - a}%`, s.valueDisplays.min && (s.valueDisplays.min.textContent = i.minValue.toString()), s.valueDisplays.max && (s.valueDisplays.max.textContent = i.maxValue.toString());
    } else {
      const a = this.valueToPercentage(i.singleValue, n);
      s.handles.single && (s.handles.single.style.left = `${a}%`, s.handles.single.setAttribute("aria-valuenow", i.singleValue.toString()), s.handles.single.setAttribute("aria-valuetext", i.singleValue.toString())), s.fill.style.width = `${a}%`, s.valueDisplays.single && (s.valueDisplays.single.textContent = i.singleValue.toString());
    }
  }
  /**
   * Update form inputs for submission
   */
  updateFormInputs(e) {
    const t = this.getState(e);
    if (!t) return;
    const { config: n, state: i, elements: s } = t;
    n.dual ? (s.inputs.min && (s.inputs.min.value = i.minValue.toString()), s.inputs.max && (s.inputs.max.value = i.maxValue.toString()), s.hiddenInputs.min && (s.hiddenInputs.min.value = i.minValue.toString()), s.hiddenInputs.max && (s.hiddenInputs.max.value = i.maxValue.toString())) : (s.inputs.single && (s.inputs.single.value = i.singleValue.toString()), s.hiddenInputs.single && (s.hiddenInputs.single.value = i.singleValue.toString()));
  }
  /**
   * Convert percentage to value
   */
  percentageToValue(e, t) {
    const n = t.max - t.min;
    let i = t.min + e * n;
    return i = Math.round(i / t.step) * t.step, Math.max(t.min, Math.min(t.max, i));
  }
  /**
   * Convert value to percentage
   */
  valueToPercentage(e, t) {
    return (e - t.min) / (t.max - t.min) * 100;
  }
  /**
   * Snap value to nearest tick if ticks are enabled
   */
  snapToTickIfNeeded(e, t) {
    if (t.ticks.length === 0)
      return e;
    let n = t.ticks[0], i = Math.abs(e - n);
    for (const s of t.ticks) {
      const a = Math.abs(e - s);
      a < i && (n = s, i = a);
    }
    return n;
  }
  /**
   * Handle focus events
   */
  handleFocus(e, t) {
  }
  /**
   * Handle blur events
   */
  handleBlur(e, t) {
  }
  /**
   * Dispatch input event for real-time updates (e.g., Livewire)
   */
  dispatchInputEvent(e) {
    var a, o, l;
    const t = this.getState(e);
    if (!t) return;
    const { config: n, state: i } = t, s = n.dual ? [i.minValue, i.maxValue] : i.singleValue;
    I.dispatchCustomEvent(e, "range-input", {
      value: s,
      dual: n.dual
    }, {
      bubbles: !0,
      cancelable: !0
    }), n.dual ? ((a = t.elements.hiddenInputs.min) == null || a.dispatchEvent(new Event("input", { bubbles: !0 })), (o = t.elements.hiddenInputs.max) == null || o.dispatchEvent(new Event("input", { bubbles: !0 }))) : (l = t.elements.hiddenInputs.single) == null || l.dispatchEvent(new Event("input", { bubbles: !0 }));
  }
  /**
   * Dispatch change event when interaction is complete
   */
  dispatchChangeEvent(e) {
    var a, o, l;
    const t = this.getState(e);
    if (!t) return;
    const { config: n, state: i } = t, s = n.dual ? [i.minValue, i.maxValue] : i.singleValue;
    I.dispatchCustomEvent(e, "range-change", {
      value: s,
      dual: n.dual
    }, {
      bubbles: !0,
      cancelable: !0
    }), n.dual ? ((a = t.elements.hiddenInputs.min) == null || a.dispatchEvent(new Event("change", { bubbles: !0 })), (o = t.elements.hiddenInputs.max) == null || o.dispatchEvent(new Event("change", { bubbles: !0 }))) : (l = t.elements.hiddenInputs.single) == null || l.dispatchEvent(new Event("change", { bubbles: !0 }));
  }
  /**
   * Get current value for a range component
   */
  getValue(e) {
    const t = this.getState(e);
    if (!t) return null;
    const { config: n, state: i } = t;
    return n.dual ? [i.minValue, i.maxValue] : i.singleValue;
  }
  /**
   * Set value for a range component
   */
  setValue(e, t) {
    const n = this.getState(e);
    if (!n) return;
    const { config: i } = n;
    i.dual && Array.isArray(t) ? (this.updateValue(e, "min", t[0]), this.updateValue(e, "max", t[1])) : !i.dual && typeof t == "number" && this.updateValue(e, "single", t), this.dispatchChangeEvent(e);
  }
  /**
   * Destroy range component
   */
  destroyRange(e) {
    this.removeState(e);
  }
  /**
   * Destroy all range components and clean up
   */
  destroyAll() {
    this.clearAllStates();
  }
  /**
   * Clean up RangeActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  Pr.getInstance().init();
}) : Pr.getInstance().init();
window.RangeActions = Pr;
Pr.getInstance();
class _t {
  static isLivewireAvailable() {
    return typeof window < "u" && "Livewire" in window;
  }
  static isLivewireEnabled(e) {
    return e.dataset.livewireEnabled === "true" || e.dataset.livewireMode === "true" || !!e.dataset.wireModel;
  }
  static getLivewireComponent(e) {
    if (!this.isLivewireAvailable()) return null;
    const t = e.closest("[wire\\:id]");
    return t ? window.Livewire.find(t.getAttribute("wire:id")) : null;
  }
  static getWireModelProperty(e) {
    return e.dataset.wireModel || e.dataset.livewireProperty || null;
  }
  static updateLivewireProperty(e, t) {
    const n = this.getLivewireComponent(e), i = this.getWireModelProperty(e);
    if (!(!n || !i))
      try {
        n.set(i, t);
      } catch (s) {
        console.warn("Failed to update Livewire property:", i, s);
      }
  }
  static formatValueForLivewire(e, t) {
    return t ? Array.isArray(e) ? e : [] : Array.isArray(e) ? e[0] || "" : e || "";
  }
}
class Dc extends ne {
  initializeElements() {
    v.findByDataAttribute("select", "true").forEach((t, n) => {
      this.initializeSelect(t);
    });
  }
  initializeSelect(e) {
    const t = e.dataset.multiple === "true", i = {
      selectedValues: this.readInitialValues(e, t),
      searchTerm: "",
      filteredOptions: []
    };
    this.setState(e, i), this.updateOptions(e), this.updateOptionsSelectedState(e), this.updateDisplay(e), this.updateStableInputs(e), e.dataset.searchable === "true" && this.setupSearchAutofocus(e), window.addEventListener("keys-ui-reset", () => {
      const s = _t.getLivewireComponent(e), a = _t.getWireModelProperty(e);
      if (s && a) {
        const o = s[a];
        e.dataset.multiple === "true" ? this.setSelectedValues(e, Array.isArray(o) ? o : []) : this.setSelectedValues(e, o ? [o] : []);
      }
    });
  }
  /**
   * Setup autofocus for search input when searchable select opens
   * Also handles clearing search when dropdown closes
   */
  setupSearchAutofocus(e) {
    const t = e.querySelector("button[data-select-trigger]");
    if (!t || !t.id)
      return;
    const n = `select-dropdown-${t.id}`, i = document.getElementById(n);
    i && i.addEventListener("toggle", (s) => {
      const a = i.querySelector("input[data-select-search]");
      s.newState === "open" ? a && requestAnimationFrame(() => {
        setTimeout(() => {
          v.isHidden(a) || a.focus();
        }, 50);
      }) : s.newState === "closed" && a && (a.value = "", this.handleSearch(e, ""));
    });
  }
  readInitialValues(e, t) {
    const i = this.getAllOptions(e).filter(
      (s) => s.element.hasAttribute("selected") || s.element.dataset.selected === "true"
    );
    if (i.length > 0)
      return i.map((s) => s.value);
    if (_t.isLivewireEnabled(e))
      return [];
    if (t) {
      const s = v.querySelectorAll(".select-pool-input", e), a = [];
      return s.forEach((o) => {
        o.dataset.poolActive === "true" && o.value !== void 0 && a.push(o.value);
      }), a;
    } else {
      const s = v.querySelector(".select-single-input", e);
      return s && s.value !== void 0 ? [s.value] : [];
    }
  }
  bindEventListeners() {
    I.handleDelegatedEvent("click", "[data-chip-remove]", (e, t) => {
      t.preventDefault(), t.stopPropagation();
      const n = e.dataset.chipValue, i = v.findClosest(e, '[data-select="true"]');
      i && n && this.removeChip(i, n);
    }), I.handleDelegatedEvent("click", "[data-select-clear]", (e, t) => {
      t.preventDefault(), t.stopPropagation();
      const n = v.findClosest(e, '[data-select="true"]');
      n && this.clearSelection(n);
    }), I.handleDelegatedEvent("click", "[data-select-option]", (e, t) => {
      t.preventDefault();
      const n = v.findClosest(e, '[data-select="true"]');
      n && this.selectOption(n, e);
    }), I.handleDelegatedEvent("input", "input[data-select-search]", (e, t) => {
      const n = v.findClosest(e, '[data-select="true"]');
      n && n.dataset.searchable === "true" && this.handleSearch(n, e.value);
    });
  }
  selectOption(e, t) {
    const n = this.getState(e), i = t.dataset.value;
    if (!n || i === null || i === void 0 || t.getAttribute("aria-disabled") === "true")
      return;
    if (e.dataset.multiple === "true") {
      const a = n.selectedValues.indexOf(i);
      a > -1 ? n.selectedValues.splice(a, 1) : n.selectedValues.push(i);
    } else {
      n.selectedValues = [i];
      const a = e.querySelector("button[data-select-trigger]");
      if (a && a.id) {
        const o = `select-dropdown-${a.id}`, l = document.getElementById(o);
        if (l)
          try {
            typeof l.hidePopover == "function" ? l.hidePopover() : (l.style.display = "none", l.removeAttribute("open"));
          } catch (c) {
            console.warn("Failed to close select dropdown:", c), l.style.display = "none", l.removeAttribute("open");
          }
      }
    }
    this.setState(e, n), this.updateDisplay(e), this.updateStableInputs(e), this.updateOptionsSelectedState(e), _t.isLivewireEnabled(e) && this.syncToLivewire(e);
  }
  removeChip(e, t) {
    const n = this.getState(e);
    if (!n) return;
    const i = n.selectedValues.indexOf(t);
    i > -1 && (n.selectedValues.splice(i, 1), this.setState(e, n), this.updateDisplay(e), this.updateStableInputs(e), this.updateOptionsSelectedState(e), _t.isLivewireEnabled(e) && this.syncToLivewire(e));
  }
  clearSelection(e) {
    const t = this.getState(e);
    t && (t.selectedValues = [], this.setState(e, t), this.updateDisplay(e), this.updateStableInputs(e), this.updateOptionsSelectedState(e), _t.isLivewireEnabled(e) && this.syncToLivewire(e));
  }
  handleSearch(e, t) {
    const n = this.getState(e);
    n && (n.searchTerm = t.trim().toLowerCase(), this.setState(e, n), this.updateFilteredOptions(e), this.updateOptionsVisibility(e));
  }
  updateFilteredOptions(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = this.getAllOptions(e);
    t.searchTerm ? t.filteredOptions = n.filter(
      (i) => i.searchableText.includes(t.searchTerm)
    ) : t.filteredOptions = n, this.setState(e, t);
  }
  updateOptionsVisibility(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = v.querySelectorAll("[data-select-option]", e), i = v.querySelector("[data-select-no-results]", e);
    let s = 0;
    n.forEach((a) => {
      const o = a, l = o.dataset.value || "";
      t.filteredOptions.some((d) => d.value === l) ? (o.style.display = "", s++) : o.style.display = "none";
    }), i && (s === 0 && t.searchTerm ? i.classList.remove("hidden") : i.classList.add("hidden"));
  }
  updateDisplay(e) {
    if (!this.getState(e)) return;
    e.dataset.multiple === "true" ? this.updateChipsDisplay(e) : this.updateSingleValueDisplay(e), this.updateClearButtonVisibility(e);
  }
  updateClearButtonVisibility(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = v.querySelector("[data-select-clear]", e);
    if (!n) return;
    const i = t.selectedValues.length > 0, s = e.dataset.disabled === "true", a = e.dataset.clearable === "true";
    i && !s && a ? (n.classList.remove("opacity-0", "pointer-events-none"), n.classList.add("opacity-100", "pointer-events-auto")) : (n.classList.remove("opacity-100", "pointer-events-auto"), n.classList.add("opacity-0", "pointer-events-none"));
  }
  updateChipsDisplay(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = v.querySelector("[data-select-chips]", e);
    if (!n) return;
    const i = v.querySelectorAll('[data-select-chip="true"]', n), s = v.querySelector("[data-select-placeholder]", e), a = v.querySelector("[data-select-spacer]", e);
    if (t.selectedValues.length === 0)
      i.forEach((o) => o.remove()), s && s.classList.remove("hidden"), a && a.classList.add("hidden");
    else {
      s && s.classList.add("hidden"), a && a.classList.remove("hidden");
      const o = Array.from(i).map(
        (l) => l.dataset.chipValue
      ).filter((l) => l);
      i.forEach((l) => {
        const c = l.dataset.chipValue;
        c && !t.selectedValues.includes(c) && l.remove();
      }), t.selectedValues.forEach((l) => {
        o.includes(l) || this.createChipElement(e, n, l);
      });
    }
  }
  createChipElement(e, t, n) {
    const i = this.findOptionByValue(e, n), s = i ? i.displayLabel : n, a = i ? i.htmlContent : s, o = document.createElement("span");
    o.className = "inline-flex items-center font-medium px-2 py-0.5 text-xs rounded-full bg-card text-text border border-border gap-1.5", o.setAttribute("data-select-chip", "true"), o.setAttribute("data-chip-value", n), o.innerHTML = `
            <span class="chip-content inline-flex items-center gap-1.5">${a}</span>
            <button type="button" class="w-4 h-4 flex items-center justify-center rounded-full hover:bg-hover transition-colors focus:outline-none focus:ring-1 focus:ring-line ml-0.5" data-chip-remove data-chip-value="${n}">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span class="sr-only">Remove ${s}</span>
            </button>
        `, t.appendChild(o);
  }
  updateSingleValueDisplay(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = v.querySelector(".select-value", e);
    if (n)
      if (t.selectedValues.length === 0 || t.selectedValues[0] === "") {
        const i = e.dataset.placeholder || "Select option...";
        n.innerHTML = `<span class="text-text-muted select-placeholder">${i}</span>`;
      } else {
        const i = t.selectedValues[0], s = this.findOptionByValue(e, i), a = s ? s.htmlContent : i;
        n.innerHTML = a;
      }
  }
  updateStableInputs(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = e.dataset.multiple === "true";
    _t.isLivewireEnabled(e) ? this.syncToLivewire(e) : n ? this.updateMultipleInputPool(e, t.selectedValues) : this.updateSingleInput(e, t.selectedValues[0] || "");
  }
  updateSingleInput(e, t) {
    const n = v.querySelector(".select-single-input", e);
    n && n.value !== t && (n.value = t, n.dispatchEvent(new Event("change", { bubbles: !0 })));
  }
  updateMultipleInputPool(e, t) {
    const n = v.querySelectorAll(".select-pool-input", e);
    n.forEach((s, a) => {
      const o = a < t.length, l = o ? t[a] : "";
      s.value !== l && (s.value = l), s.dataset.poolActive = o ? "true" : "false", s.style.display = o ? "" : "none";
    });
    const i = n[0];
    i && i.dispatchEvent(new Event("change", { bubbles: !0 }));
  }
  updateOptionsSelectedState(e) {
    const t = this.getState(e);
    if (!t) return;
    v.querySelectorAll("[data-select-option]", e).forEach((i) => {
      const s = i, a = s.dataset.value || "", o = t.selectedValues.includes(a);
      s.setAttribute("aria-selected", o ? "true" : "false");
    });
  }
  updateOptions(e) {
    const t = this.getAllOptions(e), n = this.getState(e);
    n && (n.filteredOptions = t, this.setState(e, n));
  }
  getAllOptions(e) {
    const t = v.querySelectorAll("[data-select-option]", e);
    return Array.from(t).map((n) => {
      var c, d;
      const i = n, s = i.dataset.displayLabel || ((c = i.textContent) == null ? void 0 : c.trim()) || "", a = i.cloneNode(!0), o = a.querySelector(".flex-shrink-0.ml-2");
      o && o.remove();
      const l = a.innerHTML.trim();
      return {
        element: i,
        value: i.dataset.value ?? "",
        label: ((d = i.textContent) == null ? void 0 : d.trim()) || "",
        displayLabel: s,
        searchableText: i.dataset.searchableText || s.toLowerCase(),
        disabled: i.getAttribute("aria-disabled") === "true",
        htmlContent: l
      };
    });
  }
  findOptionByValue(e, t) {
    return this.getAllOptions(e).find((i) => i.value === t) || null;
  }
  syncToLivewire(e) {
    const t = this.getState(e);
    if (!t || !_t.isLivewireEnabled(e)) return;
    const n = e.dataset.multiple === "true", i = _t.formatValueForLivewire(t.selectedValues, n);
    _t.updateLivewireProperty(e, i);
  }
  setSelectedValues(e, t) {
    const n = this.getState(e);
    if (!n) return;
    const i = e.dataset.multiple === "true";
    n.selectedValues = i ? t : t.slice(0, 1), this.setState(e, n), this.updateDisplay(e), this.updateStableInputs(e), this.updateOptionsSelectedState(e);
  }
  getSelectValue(e) {
    const t = this.getState(e);
    return t ? e.dataset.multiple === "true" ? t.selectedValues : t.selectedValues[0] || null : null;
  }
}
Dc.getInstance();
class Ic extends ne {
  /**
   * Initialize modal elements - required by BaseActionClass
   */
  initializeElements() {
    v.querySelectorAll("dialog[data-modal]").forEach((e) => {
      this.initializeModal(e);
    }), this.setupLivewireIntegration();
  }
  /**
   * Initialize a single modal element
   */
  initializeModal(e) {
    if (this.hasState(e))
      return;
    const t = {
      lastFocusedElement: null
    };
    this.setState(e, t), e.addEventListener("close", () => {
      this.handleModalClose(e);
    }), e.addEventListener("cancel", (n) => {
      this.handleModalCancel(e, n);
    });
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    I.handleDelegatedClick("[commandfor]", (e, t) => {
      const n = e.getAttribute("command"), i = e.getAttribute("commandfor");
      if (n === "show-modal" && i) {
        const s = v.getElementById(i);
        s && s.matches("dialog[data-modal]") && this.handleModalOpen(s, e);
      }
    }), I.handleDelegatedClick("[data-modal-close]", (e, t) => {
      const n = v.findClosest(e, "dialog[data-modal]");
      n && n.close();
    });
  }
  /**
   * Setup dynamic observer for new modals - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((e) => {
      e.forEach((t) => {
        if (t.nodeType === Node.ELEMENT_NODE) {
          const n = t;
          n.matches && n.matches("dialog[data-modal]") && this.initializeModal(n), v.querySelectorAll("dialog[data-modal]", n).forEach((s) => {
            this.initializeModal(s);
          });
        }
      });
    });
  }
  /**
   * Handle modal cancel event (ESC key)
   */
  handleModalCancel(e, t) {
    this.dispatchModalEvent(e, "modal:cancel", { originalEvent: t });
  }
  /**
   * Set initial focus when modal opens
   */
  setInitialFocus(e) {
    const t = v.querySelector("[autofocus]", e);
    if (t) {
      t.focus();
      return;
    }
    const n = e.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    n.length > 0 && n[0].focus();
  }
  /**
   * Check if a modal is open
   */
  isModalOpen(e) {
    const t = v.getElementById(e);
    return t ? t.open : !1;
  }
  /**
   * Dispatch custom modal events
   */
  dispatchModalEvent(e, t, n = {}) {
    I.dispatchCustomEvent(e, t, {
      modal: e,
      ...n
    }, {
      bubbles: !0,
      cancelable: !0
    });
  }
  /**
   * Get modal state (for external access)
   */
  getModalState(e) {
    const t = v.getElementById(e);
    return t && this.getState(t) || null;
  }
  /**
   * Set up Livewire integration if available
   */
  setupLivewireIntegration() {
    typeof window.Livewire > "u" || (window.Livewire.on("openModal", (e) => {
      const t = e.id || e.modal;
      t && (this.openModal(t), e.wireModel && this.updateWireModel(t, !0));
    }), window.Livewire.on("closeModal", (e) => {
      const t = e.id || e.modal;
      t ? (this.closeModal(t), e.wireModel && this.updateWireModel(t, !1)) : this.closeAllModals();
    }), window.Livewire.on("toggleModal", (e) => {
      const t = e.id || e.modal;
      t && this.toggleModal(t);
    }));
  }
  /**
   * Update Livewire wire:model for modal state
   */
  updateWireModel(e, t) {
    var s;
    const n = v.getElementById(e);
    if (!n) return;
    const i = n.getAttribute("wire:model");
    if (i && typeof window.Livewire < "u" && window.Livewire.find) {
      const a = (s = v.findClosest(n, "[wire\\:id]")) == null ? void 0 : s.getAttribute("wire:id");
      if (a) {
        const o = window.Livewire.find(a);
        o && o.set(i, t);
      }
    }
  }
  /**
   * Toggle a modal's open state
   */
  toggleModal(e) {
    const t = v.getElementById(e);
    return !t || !t.matches("dialog[data-modal]") ? (console.warn(`Modal with id "${e}" not found`), !1) : t.open ? this.closeModal(e) : this.openModal(e);
  }
  /**
   * Close all open modals
   */
  closeAllModals() {
    v.querySelectorAll("dialog[data-modal][open]").forEach((e) => {
      e.id && this.closeModal(e.id);
    });
  }
  /**
   * Enhanced modal open with Livewire event dispatching
   */
  openModal(e, t) {
    const n = v.getElementById(e);
    return !n || !n.matches("dialog[data-modal]") ? (console.warn(`Modal with id "${e}" not found`), !1) : (this.handleModalOpen(n, t), n.showModal(), this.dispatchLivewireEvent("modalOpened", { id: e, modal: e }), !0);
  }
  /**
   * Enhanced modal close with Livewire event dispatching
   */
  closeModal(e) {
    const t = v.getElementById(e);
    return !t || !t.matches("dialog[data-modal]") ? (console.warn(`Modal with id "${e}" not found`), !1) : (t.close(), this.dispatchLivewireEvent("modalClosed", { id: e, modal: e }), !0);
  }
  /**
   * Dispatch Livewire events
   */
  dispatchLivewireEvent(e, t) {
    typeof window.Livewire < "u" && window.Livewire.dispatch && window.Livewire.dispatch(e, t);
  }
  /**
   * Handle modal close event with Livewire integration
   */
  handleModalClose(e) {
    const t = this.getState(e);
    if (!t) return;
    e.getAttribute("wire:model") && this.updateWireModel(e.id, !1), t.lastFocusedElement && document.contains(t.lastFocusedElement) && t.lastFocusedElement.focus(), t.lastFocusedElement = null, this.setState(e, t), this.dispatchModalEvent(e, "modal:close"), this.dispatchLivewireEvent("modalClosed", { id: e.id, modal: e.id });
  }
  /**
   * Handle modal opening with Livewire integration
   */
  handleModalOpen(e, t) {
    const n = this.getState(e);
    if (!n) return;
    e.getAttribute("wire:model") && this.updateWireModel(e.id, !0), n.lastFocusedElement = t || document.activeElement, this.setState(e, n), this.dispatchModalEvent(e, "modal:open", { trigger: t }), this.dispatchLivewireEvent("modalOpened", { id: e.id, modal: e.id }), setTimeout(() => {
      this.setInitialFocus(e);
    }, 50);
  }
  /**
   * Clean up ModalActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
Ic.getInstance();
const hr = {
  DEFAULT_TIMEOUT: 5e3,
  STACK_OFFSET: 72,
  ANIMATION_DURATION: 300
}, fn = {
  TOAST: '[data-keys-toast="true"]',
  DISMISS_BUTTON: "[data-toast-dismiss]"
};
class Br extends ne {
  /**
   * Initialize toast elements - required by BaseActionClass
   */
  initializeElements() {
    this.initializeToastSystem(), this.setupLivewireIntegration();
  }
  /**
   * Initialize the global toast system
   */
  initializeToastSystem() {
    const e = document.documentElement;
    if (!this.hasState(e)) {
      const t = {
        toasts: /* @__PURE__ */ new Map(),
        timers: /* @__PURE__ */ new Map(),
        pausedTimers: /* @__PURE__ */ new Map(),
        toastCounter: 0
      };
      this.setState(e, t);
    }
    this.discoverToasts();
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    I.handleDelegatedClick(`${fn.TOAST}[popover] [data-keys-button]${fn.DISMISS_BUTTON}`, (e, t) => {
      const n = e.getAttribute("data-toast-dismiss");
      n && (t.preventDefault(), t.stopPropagation(), this.dismiss(n));
    }), I.handleDelegatedEvent("toggle", `${fn.TOAST}[popover]`, (e) => {
      const t = e.id;
      if (t) {
        const n = e.matches(":popover-open");
        this.dispatchToastEvent(n ? "toast:show" : "toast:close", t);
      }
    }), I.handleDelegatedClick(`${fn.TOAST}[popover] [data-toast-action]`, (e, t) => {
      const n = e.getAttribute("data-toast-action"), i = v.findClosest(e, `${fn.TOAST}[popover]`);
      n && i && (t.preventDefault(), t.stopPropagation(), this.dispatchToastEvent("toast:action", i.id, { action: n }));
    }), I.handleDelegatedEvent("mouseenter", `${fn.TOAST}[popover]`, (e) => {
      this.pauseTimer(e.id);
    }), I.handleDelegatedEvent("mouseleave", `${fn.TOAST}[popover]`, (e) => {
      this.resumeTimer(e.id);
    }), I.handleDelegatedEvent("keydown", `${fn.TOAST}[popover]`, (e, t) => {
      const n = t;
      n.key === "Escape" && e.hasAttribute("data-dismissible") && (n.preventDefault(), this.dismiss(e.id));
    });
  }
  /**
   * Setup dynamic observer for new toasts - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((e) => {
      e.forEach((t) => {
        t.nodeType === Node.ELEMENT_NODE && t.querySelectorAll("[data-keys-toast][popover]").length > 0 && this.discoverToasts();
      });
    });
  }
  /**
   * Discover and register existing toasts (no containers needed)
   */
  discoverToasts() {
    const e = this.getGlobalState();
    e && document.querySelectorAll("[data-keys-toast][popover]").forEach((t) => {
      const n = t.id;
      n && e.toasts.set(n, t);
    });
  }
  /**
   * Get global toast state
   */
  getGlobalState() {
    return this.getState(document.documentElement) || null;
  }
  /**
   * Register a toast element for management
   */
  registerToast(e, t) {
    const n = this.getGlobalState();
    n && n.toasts.set(e, t);
  }
  /**
   * Setup Livewire integration
   */
  setupLivewireIntegration() {
    typeof window.Livewire > "u" || (window.Livewire.on("showToast", (e) => {
      const t = e.variant || "info";
      this.show(t, e);
    }), window.Livewire.on("hideToast", (e) => {
      e.id ? this.dismiss(e.id) : this.dismissAll();
    }));
  }
  /**
   * Show a toast programmatically
   * @param variant Toast type (info, success, warning, danger, neutral)
   * @param data Toast configuration object
   * @returns Whether the toast was successfully created and shown
   */
  show(e, t = { message: "" }) {
    const n = this.getGlobalState();
    if (!n) return !1;
    const i = t.position || "top-right", s = `toast-${e}-${i}-${++n.toastCounter}`, a = this.createToastElement(s, e, i, t), l = this.calculateStackPosition(i) * hr.STACK_OFFSET;
    a.style.setProperty("--stack-offset", `${l}px`), document.body.appendChild(a), this.showToastElement(a), a.setAttribute("data-toast-visible", "true");
    const c = t.duration || hr.DEFAULT_TIMEOUT;
    return !(t.persistent === !0) && c > 0 && this.setTimer(s, c), n.toasts.set(s, a), this.dispatchToastEvent("toast:show", s, t), !0;
  }
  /**
   * Calculate stack position for toasts at a specific position
   */
  calculateStackPosition(e) {
    const t = this.getGlobalState();
    if (!t) return 0;
    let n = 0;
    return t.toasts.forEach((i) => {
      i.getAttribute("data-position") === e && i.getAttribute("data-toast-visible") === "true" && n++;
    }), n;
  }
  /**
   * Show toast element using Popover API with fallback
   */
  showToastElement(e) {
    try {
      e.showPopover();
    } catch {
      console.warn("Popover API not supported, using fallback display"), e.style.display = "block";
    }
  }
  /**
   * Hide toast element using Popover API with fallback
   */
  hideToastElement(e) {
    try {
      e.hidePopover();
    } catch {
      console.warn("Popover API hide failed, using manual hide"), e.style.display = "none";
    }
  }
  /**
   * Create a toast popover element dynamically to match Blade template
   */
  createToastElement(e, t, n, i) {
    const s = t === "error" ? "danger" : t, a = document.createElement("div");
    a.className = this.getPopoverClasses(n, s), a.setAttribute("data-keys-toast", "true"), a.setAttribute("data-variant", t), a.setAttribute("data-position", n), a.setAttribute("data-element-type", "popover"), a.setAttribute("data-dismissible", "true"), a.setAttribute("data-has-icon", "true"), a.setAttribute("popover", "manual"), a.setAttribute("role", "status");
    const o = s === "danger" || s === "warning" ? "assertive" : "polite";
    return a.setAttribute("aria-live", o), a.setAttribute("aria-atomic", "true"), a.id = e, i.title && (a.setAttribute("aria-labelledby", `${e}-title`), a.setAttribute("data-has-title", "true")), a.setAttribute("aria-describedby", `${e}-message`), a.innerHTML = `
            <div class="px-4 pt-4 pb-3">
                <div class="flex ${i.title ? "items-start" : "items-center"} gap-3">
                    <div class="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${this.getIconWrapperClasses(s)}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-icon="true">
                            ${this.getIconPath(s)}
                        </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 id="${e}-title" class="hidden text-sm text-heading font-semibold tracking-tight mb-1"></h3>
                        <div id="${e}-message" class="text-sm text-text font-normal text-left leading-tight opacity-90"></div>
                    </div>
                    <div class="flex-shrink-0">
                        <button type="button"
                                class="inline-flex items-center justify-center rounded-md bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-6 w-6 text-xs hover:bg-card active:bg-hover focus:ring-brand text-current opacity-60 hover:opacity-100 -m-1"
                                data-keys-button="true"
                                data-variant="ghost"
                                data-size="xs"
                                data-element-type="button"
                                data-icon-only="true"
                                data-has-icon="true"
                                data-toast-dismiss="${e}"
                                aria-label="Dismiss notification">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span class="sr-only">Dismiss</span>
                        </button>
                    </div>
                </div>
            </div>
        `, this.updateToastContent(a, i), a;
  }
  /**
   * Get popover classes for toast styling - matches Blade template exactly
   */
  getPopoverClasses(e, t) {
    let n = "max-w-sm w-fit h-fit rounded-lg shadow-lg text-text z-[9999] p-0 overflow-visible opacity-100";
    return n += " " + this.getVariantClasses(t), n;
  }
  /**
   * Get variant classes - adaptive backgrounds that switch between light and dark mode
   */
  getVariantClasses(e) {
    const t = {
      info: "border border-info bg-info-subtle",
      success: "border border-success bg-success-subtle",
      warning: "border border-warning bg-warning-subtle",
      danger: "border border-danger bg-danger-subtle",
      neutral: "border border-border bg-card"
    };
    return t[e] || t.info;
  }
  /**
   * Get icon wrapper classes for variant - optimized for text contrast
   */
  getIconWrapperClasses(e) {
    const t = {
      info: "bg-info text-info-foreground",
      success: "bg-success text-success-foreground",
      warning: "bg-warning text-warning-foreground",
      danger: "bg-danger text-danger-foreground",
      neutral: "bg-text-muted text-white"
    };
    return t[e] || t.info;
  }
  /**
   * Get icon SVG path for variant
   */
  getIconPath(e) {
    const t = {
      info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      warning: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>',
      danger: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      neutral: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>'
    };
    return t[e] || t.info;
  }
  /**
   * Dismiss a toast
   */
  dismiss(e) {
    const t = this.getGlobalState();
    if (!t) return !1;
    const n = t.toasts.get(e);
    if (!n)
      return !1;
    const i = n.getAttribute("data-position");
    return this.clearTimer(e), t.pausedTimers.delete(e), n.setAttribute("data-toast-visible", "false"), this.hideToastElement(n), t.toasts.delete(e), i && this.recalculateStackPositions(i), window.setTimeout(() => {
      n.parentNode && n.parentNode.removeChild(n);
    }, hr.ANIMATION_DURATION), this.dispatchToastEvent("toast:dismiss", e), !0;
  }
  /**
   * Recalculate stack positions for all toasts at a specific position
   */
  recalculateStackPositions(e) {
    const t = this.getGlobalState();
    if (!t) return;
    const n = [];
    t.toasts.forEach((i) => {
      i.getAttribute("data-position") === e && i.getAttribute("data-toast-visible") === "true" && n.push(i);
    }), n.forEach((i, s) => {
      const a = s * hr.STACK_OFFSET;
      i.style.setProperty("--stack-offset", `${a}px`);
    });
  }
  /**
   * Dismiss all visible toasts
   */
  dismissAll() {
    const e = this.getGlobalState();
    e && e.toasts.forEach((t, n) => {
      t.getAttribute("data-toast-visible") === "true" && this.dismiss(n);
    });
  }
  /**
   * Convenience methods for common toast types
   */
  /**
   * Show a success toast
   * @param message Toast message
   * @param options Additional toast options
   * @returns Whether the toast was successfully created
   */
  success(e, t = {}) {
    return this.show("success", { message: e, ...t });
  }
  /**
   * Show an error toast
   * @param message Toast message
   * @param options Additional toast options
   * @returns Whether the toast was successfully created
   */
  error(e, t = {}) {
    return this.show("danger", { message: e, ...t });
  }
  /**
   * Show a warning toast
   * @param message Toast message
   * @param options Additional toast options
   * @returns Whether the toast was successfully created
   */
  warning(e, t = {}) {
    return this.show("warning", { message: e, ...t });
  }
  /**
   * Show an info toast
   * @param message Toast message
   * @param options Additional toast options
   * @returns Whether the toast was successfully created
   */
  info(e, t = {}) {
    return this.show("info", { message: e, ...t });
  }
  /**
   * Update toast content with provided data
   */
  updateToastContent(e, t) {
    const n = e.querySelector(`#${e.id}-title`), i = e.querySelector(`#${e.id}-message`), s = e.querySelector("[data-toast-actions]");
    n && (t.title ? (n.textContent = t.title, n.classList.remove("hidden"), e.setAttribute("data-has-title", "true")) : (n.classList.add("hidden"), e.removeAttribute("data-has-title"))), i && t.message && (i.textContent = t.message), s && (t.actions ? (s.innerHTML = t.actions, s.classList.remove("hidden")) : s.classList.add("hidden"));
    const a = t.duration || hr.DEFAULT_TIMEOUT;
    e.setAttribute("data-timeout", String(a)), t.persistent === !0 && e.setAttribute("data-persistent", "true"), a > 0 && !t.persistent && e.setAttribute("data-auto-hide", "true");
  }
  /**
   * Set auto-dismiss timer
   */
  setTimer(e, t) {
    const n = this.getGlobalState();
    if (!n) return;
    this.clearTimer(e);
    const i = n.toasts.get(e);
    i && i.setAttribute("data-toast-start-time", String(Date.now()));
    const s = window.setTimeout(() => {
      this.dismiss(e);
    }, t);
    n.timers.set(e, s);
  }
  /**
   * Clear timer
   */
  clearTimer(e) {
    const t = this.getGlobalState();
    if (!t) return;
    const n = t.timers.get(e);
    n && (window.clearTimeout(n), t.timers.delete(e));
  }
  /**
   * Pause timer (on hover)
   */
  pauseTimer(e) {
    const t = this.getGlobalState();
    if (!t) return;
    const n = t.timers.get(e), i = t.toasts.get(e);
    if (n && i) {
      const s = parseInt(i.getAttribute("data-timeout") || String(hr.DEFAULT_TIMEOUT)), a = parseInt(i.getAttribute("data-toast-start-time") || "0"), o = Date.now() - a, l = Math.max(0, s - o);
      this.clearTimer(e), t.pausedTimers.set(e, {
        remaining: l,
        startTime: Date.now()
      });
    }
  }
  /**
   * Resume timer (on mouse leave)
   */
  resumeTimer(e) {
    const t = this.getGlobalState();
    if (!t) return;
    const n = t.toasts.get(e), i = t.timers.get(e), s = t.pausedTimers.get(e);
    if (n && i)
      n.getAttribute("data-persistent") === "true" || t.pausedTimers.delete(e);
    else if (n && s) {
      const a = n.getAttribute("data-persistent") === "true", o = n.getAttribute("data-auto-hide") === "true";
      !a && o && s.remaining > 0 && (this.setTimer(e, s.remaining), t.pausedTimers.delete(e));
    }
  }
  /**
   * Dispatch custom toast events
   */
  dispatchToastEvent(e, t, n = {}) {
    const i = this.getGlobalState();
    if (!i) return;
    const s = { id: t, toast: t, ...n };
    I.dispatchCustomEvent(document.documentElement, e, s, {
      bubbles: !0,
      cancelable: !0
    });
    const a = i.toasts.get(t);
    if (a && I.dispatchCustomEvent(a, e, s, {
      bubbles: !0,
      cancelable: !0
    }), typeof window.Livewire < "u") {
      const o = e.replace("toast:", "toast");
      window.Livewire.dispatch(o, s);
    }
  }
  /**
   * Get toast state (for external access)
   */
  getToastState(e) {
    const t = this.getGlobalState();
    if (!t) return null;
    const n = t.toasts.get(e);
    return n ? {
      id: e,
      visible: n.getAttribute("data-toast-visible") === "true",
      open: n.matches(":popover-open") || !1,
      variant: n.getAttribute("data-variant"),
      position: n.getAttribute("data-position"),
      duration: parseInt(n.getAttribute("data-timeout") || "0"),
      persistent: n.getAttribute("data-persistent") === "true",
      autoHide: n.getAttribute("data-auto-hide") === "true",
      hasTitle: n.getAttribute("data-has-title") === "true",
      hasContent: n.getAttribute("data-has-content") === "true"
    } : null;
  }
  /**
   * Clean up ToastActions - extends BaseActionClass destroy
   */
  onDestroy() {
    const e = this.getGlobalState();
    e && (e.timers.forEach((t) => window.clearTimeout(t)), e.timers.clear(), e.pausedTimers.clear(), e.toasts.forEach((t) => {
      this.hideToastElement(t), t.setAttribute("data-toast-visible", "false");
    }), e.toasts.clear());
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  Br.getInstance().init();
}) : Br.getInstance().init();
const _w = Br.getInstance();
window.ToastActions = _w;
Br.getInstance();
class Oc extends ne {
  /**
   * Initialize dropdown elements - required by BaseActionClass
   */
  initializeElements() {
    v.findByDataAttribute("dropdown", "true").forEach((e) => {
      this.initializeDropdown(e);
    }), v.findByDataAttribute("submenu", "true").forEach((e) => {
      this.initializeDropdown(e);
    });
  }
  /**
   * Initialize a single dropdown element
   */
  initializeDropdown(e) {
    const t = {
      isOpen: !1,
      focusedIndex: -1,
      menuItems: [],
      children: []
    }, n = v.findClosest(e, '[data-submenu="true"]');
    n && n !== e && (t.parent = n), this.setupTriggerButton(e), this.setState(e, t), this.updateMenuItems(e), this.initializeSubmenus(e);
  }
  /**
   * Automatically add popovertarget and data-dropdown-trigger to user's button
   */
  setupTriggerButton(e) {
    const t = e.previousElementSibling;
    if (!t || !t.hasAttribute("data-popover-trigger"))
      return;
    const n = t.getAttribute("data-popover-trigger");
    if (!n)
      return;
    const i = t.querySelector("button");
    i && (i.setAttribute("popovertarget", n), i.setAttribute("data-dropdown-trigger", ""), i.setAttribute("aria-expanded", "false"));
  }
  /**
   * Initialize submenus within a dropdown
   */
  initializeSubmenus(e) {
    const t = v.querySelectorAll('[data-submenu="true"]', e), n = this.getState(e);
    n && (n.children = Array.from(t), this.setState(e, n)), t.forEach((i) => {
      this.hasState(i) || this.initializeDropdown(i);
    });
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    I.addEventListener(document, "toggle", (t) => {
      const n = t.target;
      if (n && v.hasDataAttribute(n, "dropdown", "true")) {
        const i = this.getState(n);
        if (!i) return;
        const s = n.matches(":popover-open");
        i.isOpen = s, this.setState(n, i);
        const a = n.previousElementSibling, o = a == null ? void 0 : a.querySelector("[data-dropdown-trigger]");
        o && o.setAttribute("aria-expanded", s ? "true" : "false"), s ? (this.updateMenuItems(n), this.dispatchDropdownEvent(n, "dropdown:open")) : this.dispatchDropdownEvent(n, "dropdown:close");
      }
    }, !0), I.handleDelegatedClick("[data-submenu-trigger], [data-menu-item], [data-menu-checkbox], [data-menu-radio], [data-dropdown-panel], [data-submenu-panel]", (t, n) => {
      if (t.matches("[data-submenu-trigger]")) {
        n.preventDefault(), n.stopPropagation();
        const i = t.getAttribute("popovertarget"), s = i ? document.getElementById(i) : null;
        s && !this.isDisabled(s) && this.toggleSubmenu(s);
        return;
      }
      if (t.matches("[data-menu-item]")) {
        const i = v.findClosest(t, '[data-dropdown="true"]');
        i && (t.dataset.keepOpen === "true" || this.closeDropdown(i));
        return;
      }
      if (t.matches("[data-menu-checkbox], [data-menu-radio]")) {
        if (n.stopPropagation(), !(t.dataset.keepOpen !== "false")) {
          const s = v.findClosest(t, '[data-dropdown="true"]');
          s && this.closeDropdown(s);
        }
        return;
      }
      if (t.matches("[data-dropdown-panel], [data-submenu-panel]")) {
        n.stopPropagation();
        return;
      }
    }), I.addEventListener(document, "click", (t) => {
      const n = t.target;
      n && n instanceof Element && (n.closest("[data-submenu-trigger], [data-dropdown-trigger], [data-menu-item], [data-menu-checkbox], [data-menu-radio], [data-dropdown-panel], [data-submenu-panel]") || this.closeAllDropdowns());
    });
    let e = null;
    I.addEventListener(document, "mouseenter", (t) => {
      const n = v.findClosest(t.target, "[data-submenu-trigger]");
      if (n && !this.isMobile()) {
        e && (clearTimeout(e), e = null);
        const i = v.findClosest(n, "[data-popover-trigger]");
        if (i) {
          const s = i.getAttribute("data-popover-trigger"), a = s ? document.getElementById(s) : null;
          if (a && !a.matches(":popover-open")) {
            const o = v.findClosest(n, '[role="menu"]');
            o && v.querySelectorAll("[data-submenu-trigger]", o).forEach((c) => {
              var d;
              if (c !== n) {
                const f = c.getAttribute("data-popover-trigger");
                if (f) {
                  const h = document.getElementById(f);
                  if (h && h.matches(":popover-open")) {
                    const g = h.style.transition;
                    h.style.transition = "none", (d = h.hidePopover) == null || d.call(h), requestAnimationFrame(() => {
                      h.style.transition = g;
                    });
                  }
                }
              }
            }), n.click();
          }
        }
      }
    }, { capture: !0 }), I.addEventListener(document, "mouseleave", (t) => {
      const n = v.findClosest(t.target, "[data-submenu-trigger]");
      if (n && !this.isMobile()) {
        const i = v.findClosest(n, "[data-popover-trigger]");
        if (i) {
          const s = i.getAttribute("data-popover-trigger"), a = s ? document.getElementById(s) : null;
          if (a && a.matches(":popover-open")) {
            const o = t.relatedTarget;
            if (o && (v.findClosest(o, `#${s}`) || o.id === s))
              return;
            e = window.setTimeout(() => {
              var d;
              if (a.matches(":hover"))
                return;
              const l = document.querySelector(":hover"), c = l ? v.findClosest(l, "[data-submenu-trigger]") : null;
              (!c || c === n) && ((d = a.hidePopover) == null || d.call(a));
            }, 200);
          }
        }
      }
    }, { capture: !0 }), I.handleDelegatedKeydown('[data-dropdown="true"]', (t, n) => {
      this.handleKeydown(t, n);
    });
  }
  /**
   * Setup dynamic observer for new dropdowns - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((e) => {
      e.forEach((t) => {
        if (t.nodeType === Node.ELEMENT_NODE) {
          const n = t;
          v.hasDataAttribute(n, "dropdown", "true") && (this.hasState(n) || this.initializeDropdown(n)), v.hasDataAttribute(n, "submenu", "true") && (this.hasState(n) || this.initializeDropdown(n)), v.findByDataAttribute("dropdown", "true", n).forEach((a) => {
            this.hasState(a) || this.initializeDropdown(a);
          }), v.findByDataAttribute("submenu", "true", n).forEach((a) => {
            this.hasState(a) || this.initializeDropdown(a);
          });
        }
      });
    });
  }
  /**
   * Toggle dropdown open/closed state using native popover API
   */
  toggleDropdown(e) {
    this.getState(e) && e.togglePopover && e.togglePopover();
  }
  /**
   * Open dropdown using native popover API
   */
  openDropdown(e) {
    if (!(!this.getState(e) || this.isDisabled(e)) && (this.closeSiblingDropdowns(e), e.showPopover))
      try {
        e.showPopover();
      } catch {
      }
  }
  /**
   * Open submenu using HTML Popover API
   */
  openSubmenu(e) {
    const t = this.getState(e);
    if (!t || this.isDisabled(e))
      return;
    t.isOpen = !0, t.focusedIndex = -1, this.closeSiblingSubmenus(e), this.setState(e, t);
    const n = e, i = e.previousElementSibling, s = i == null ? void 0 : i.querySelector("[data-submenu-trigger]");
    if (n && n.showPopover)
      try {
        n.showPopover();
      } catch {
      }
    s && s.setAttribute("aria-expanded", "true"), this.updateMenuItems(e), this.dispatchDropdownEvent(e, "submenu:open");
  }
  /**
   * Close dropdown using native popover API
   */
  closeDropdown(e) {
    const t = this.getState(e);
    if (!(!t || !t.isOpen) && (this.closeChildSubmenus(e), e.hidePopover))
      try {
        e.hidePopover();
      } catch {
      }
  }
  /**
   * Close submenu using HTML Popover API
   */
  closeSubmenu(e) {
    const t = this.getState(e);
    if (!t || !t.isOpen) return;
    this.closeChildSubmenus(e), t.isOpen = !1, t.focusedIndex = -1, this.setState(e, t);
    const n = e, i = e.previousElementSibling, s = i == null ? void 0 : i.querySelector("[data-submenu-trigger]");
    n && n.hidePopover && n.hidePopover(), s && s.setAttribute("aria-expanded", "false"), this.dispatchDropdownEvent(e, "submenu:close");
  }
  /**
   * Close all open dropdowns
   */
  closeAllDropdowns() {
    this.getAllStates().forEach((e, t) => {
      e.isOpen && (e.parent || this.closeDropdown(t));
    });
  }
  /**
   * Close sibling dropdowns but preserve parent-child relationships
   */
  closeSiblingDropdowns(e) {
    const t = this.getState(e);
    this.getAllStates().forEach((n, i) => {
      if (i !== e && n.isOpen) {
        const s = (t == null ? void 0 : t.parent) === i, a = n.parent === e;
        !s && !a && this.closeDropdown(i);
      }
    });
  }
  /**
   * Close sibling submenus
   */
  closeSiblingSubmenus(e) {
    const t = this.getState(e), n = t == null ? void 0 : t.parent;
    if (n) {
      const i = this.getState(n);
      i == null || i.children.forEach((s) => {
        s !== e && this.closeSubmenu(s);
      });
    }
  }
  /**
   * Close all child submenus
   */
  closeChildSubmenus(e) {
    const t = this.getState(e);
    t == null || t.children.forEach((n) => {
      this.closeSubmenu(n);
    });
  }
  /**
   * Toggle submenu open/closed state
   */
  toggleSubmenu(e) {
    const t = this.getState(e);
    t && (t.isOpen ? this.closeSubmenu(e) : this.openSubmenu(e));
  }
  /**
   * Check if device is mobile
   */
  isMobile() {
    return window.innerWidth < 768 || "ontouchstart" in window;
  }
  /**
   * Handle keyboard navigation
   */
  handleKeydown(e, t) {
    const n = this.getState(e);
    if (n)
      switch (t.key) {
        case "Enter":
        case " ":
          if (!n.isOpen)
            t.preventDefault(), this.openDropdown(e);
          else if (n.focusedIndex >= 0) {
            t.preventDefault();
            const i = n.menuItems[n.focusedIndex];
            i && i.click();
          }
          break;
        case "Escape":
          if (n.isOpen) {
            t.preventDefault(), this.closeDropdown(e);
            const i = e.previousElementSibling, s = i == null ? void 0 : i.querySelector("[data-dropdown-trigger]");
            s && s.focus();
          }
          break;
        case "ArrowDown":
          n.isOpen ? (t.preventDefault(), this.navigateItems(e, 1)) : (t.preventDefault(), this.openDropdown(e));
          break;
        case "ArrowUp":
          n.isOpen && (t.preventDefault(), this.navigateItems(e, -1));
          break;
        case "Tab":
          n.isOpen && this.closeDropdown(e);
          break;
      }
  }
  /**
   * Navigate through menu items with arrow keys
   */
  navigateItems(e, t) {
    const n = this.getState(e);
    if (!n || !n.isOpen) return;
    const i = n.menuItems.length;
    i !== 0 && (n.focusedIndex === -1 ? n.focusedIndex = t > 0 ? 0 : i - 1 : (n.focusedIndex += t, n.focusedIndex >= i ? n.focusedIndex = 0 : n.focusedIndex < 0 && (n.focusedIndex = i - 1)), this.setState(e, n), this.updateItemFocus(e));
  }
  /**
   * Update visual focus state of menu items
   */
  updateItemFocus(e) {
    const t = this.getState(e);
    t && t.menuItems.forEach((n, i) => {
      i === t.focusedIndex ? (n.classList.add("bg-neutral-100", "dark:bg-neutral-800"), n.scrollIntoView({ block: "nearest" })) : n.classList.remove("bg-neutral-100", "dark:bg-neutral-800");
    });
  }
  /**
   * Update menu items list for keyboard navigation
   */
  updateMenuItems(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = v.querySelectorAll("[data-menu-item], [data-menu-checkbox], [data-menu-radio], [data-submenu-trigger]", e);
    t.menuItems = Array.from(n).filter((i) => {
      const s = i;
      return !s.hasAttribute("disabled") && s.offsetParent !== null;
    }), this.setState(e, t);
  }
  /**
   * Check if dropdown is disabled
   */
  isDisabled(e) {
    return e.dataset.disabled === "true";
  }
  /**
   * Dispatch custom dropdown event
   */
  dispatchDropdownEvent(e, t, n = null) {
    I.dispatchCustomEvent(e, t, {
      dropdown: e,
      ...n
    }, {
      bubbles: !0
    });
  }
  /**
   * Clean up DropdownActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
Oc.getInstance();
class Fr extends ne {
  /**
   * Initialize table elements - required by BaseActionClass
   */
  initializeElements() {
    v.findByDataAttribute("table", "true").forEach((e) => {
      this.initializeTable(e);
    }), this.setupLivewireIntegration();
  }
  /**
   * Initialize a single table
   */
  initializeTable(e) {
    var i;
    if (this.hasState(e))
      return;
    const t = {
      selectedRows: /* @__PURE__ */ new Set(),
      sortColumn: null,
      sortDirection: null,
      selectAllState: "none"
    };
    this.setState(e, t);
    const n = v.querySelector('[data-sorted="true"]', e);
    if (n) {
      const s = n.getAttribute("data-sort-key") || ((i = n.textContent) == null ? void 0 : i.trim()) || "", a = n.getAttribute("data-direction");
      t.sortColumn = s, t.sortDirection = a;
    }
    this.updateSelectionState(e);
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    I.handleDelegatedClick('[data-sortable="true"]', (e, t) => {
      t.preventDefault(), this.handleSort(e);
    }), I.handleDelegatedChange("[data-table-row-select]", (e) => {
      this.handleRowSelection(e);
    }), I.handleDelegatedChange("[data-table-select-all]", (e) => {
      this.handleSelectAll(e);
    }), I.handleDelegatedKeydown('[data-table="true"]', (e, t) => {
      this.handleKeyboard(t);
    });
  }
  /**
   * Setup dynamic observer for new tables - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((e) => {
      e.forEach((t) => {
        if (t.nodeType === Node.ELEMENT_NODE) {
          const n = t;
          v.hasDataAttribute(n, "table", "true") && this.initializeTable(n), v.findByDataAttribute("table", "true", n).forEach((i) => {
            this.initializeTable(i);
          });
        }
      });
    });
  }
  /**
   * Setup Livewire integration
   */
  setupLivewireIntegration() {
    typeof window.Livewire > "u" || I.addEventListener(document, "livewire:navigated", () => {
      this.reinitialize();
    });
  }
  /**
   * Handle sortable header clicks
   */
  handleSort(e) {
    var a;
    const t = v.findClosest(e, '[data-table="true"]');
    if (!t) return;
    const n = this.getState(t);
    if (!n) return;
    const i = e.getAttribute("data-sort-key") || ((a = e.textContent) == null ? void 0 : a.trim()) || "";
    let s = "asc";
    n.sortColumn === i && (n.sortDirection === "asc" ? s = "desc" : n.sortDirection === "desc" && (s = null)), n.sortColumn = s ? i : null, n.sortDirection = s, this.updateSortUI(t, i, s), this.dispatchSortEvent(t, {
      column: i,
      direction: s || "asc",
      url: e.getAttribute("data-sort-url") || void 0,
      livewireMethod: e.getAttribute("data-sort-method") || void 0
    });
  }
  /**
   * Update sort UI indicators
   */
  updateSortUI(e, t, n) {
    if (v.querySelectorAll('[data-sortable="true"]', e).forEach((s) => {
      s.setAttribute("data-sorted", "false"), s.removeAttribute("data-direction"), v.querySelectorAll(".table-sort-icon", s).forEach((o) => {
        o.setAttribute("data-icon", "heroicon-o-chevron-up-down"), o.classList.remove("opacity-100"), o.classList.add("opacity-0", "group-hover:opacity-100");
      });
    }), n) {
      const s = e.querySelector(`[data-sort-key="${t}"]`);
      if (s) {
        s.setAttribute("data-sorted", "true"), s.setAttribute("data-direction", n);
        const a = v.querySelector(".table-sort-icon", s);
        if (a) {
          const o = n === "asc" ? "heroicon-o-chevron-up" : "heroicon-o-chevron-down";
          a.setAttribute("data-icon", o), a.classList.remove("opacity-0", "group-hover:opacity-100"), a.classList.add("opacity-100");
        }
      }
    }
  }
  /**
   * Handle individual row selection
   */
  handleRowSelection(e) {
    const t = v.findClosest(e, '[data-table="true"]');
    if (!t) return;
    const n = this.getState(t);
    if (!n) return;
    const i = e.getAttribute("data-row-id");
    i && (e.checked ? n.selectedRows.add(i) : n.selectedRows.delete(i), this.updateSelectionState(t), this.dispatchSelectionEvent(t, Array.from(n.selectedRows)));
  }
  /**
   * Handle select all checkbox
   */
  handleSelectAll(e) {
    const t = v.findClosest(e, '[data-table="true"]');
    if (!t) return;
    const n = this.getState(t);
    if (!n) return;
    const i = v.querySelectorAll("[data-table-row-select]", t);
    e.checked ? i.forEach((s) => {
      s.checked = !0;
      const a = s.getAttribute("data-row-id");
      a && n.selectedRows.add(a);
    }) : i.forEach((s) => {
      s.checked = !1;
      const a = s.getAttribute("data-row-id");
      a && n.selectedRows.delete(a);
    }), this.updateSelectionState(t), this.dispatchSelectionEvent(t, Array.from(n.selectedRows));
  }
  /**
   * Update selection state and UI
   */
  updateSelectionState(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = v.querySelectorAll("[data-table-row-select]", e), i = v.querySelector("[data-table-select-all]", e), s = n.length, a = t.selectedRows.size;
    a === 0 ? (t.selectAllState = "none", i && (i.checked = !1, i.indeterminate = !1)) : a === s ? (t.selectAllState = "all", i && (i.checked = !0, i.indeterminate = !1)) : (t.selectAllState = "some", i && (i.checked = !1, i.indeterminate = !0)), v.querySelectorAll("[data-table-row]", e).forEach((l) => {
      const c = l.getAttribute("data-row-id");
      c && t.selectedRows.has(c) ? l.setAttribute("data-selected", "true") : l.setAttribute("data-selected", "false");
    });
  }
  /**
   * Handle keyboard navigation
   */
  handleKeyboard(e) {
    const t = e.target;
    e.key === " " && t.matches('[data-sortable="true"]') && (e.preventDefault(), this.handleSort(t)), e.key === "Enter" && t.matches('[data-sortable="true"]') && (e.preventDefault(), this.handleSort(t));
  }
  /**
   * Dispatch sort event
   */
  dispatchSortEvent(e, t) {
    if (I.dispatchCustomEvent(e, "table:sort", t, {
      bubbles: !0,
      cancelable: !0
    }), t.livewireMethod && window.Livewire) {
      const n = e.getAttribute("wire:id");
      if (n) {
        const i = window.Livewire.find(n);
        i && i.call(t.livewireMethod, t.column, t.direction);
      }
    }
  }
  /**
   * Dispatch selection event
   */
  dispatchSelectionEvent(e, t) {
    I.dispatchCustomEvent(e, "table:selection", { selectedIds: t }, {
      bubbles: !0,
      cancelable: !0
    });
    const n = e.getAttribute("data-selection-method");
    if (n && window.Livewire) {
      const i = e.getAttribute("wire:id");
      if (i) {
        const s = window.Livewire.find(i);
        s && s.call(n, t);
      }
    }
  }
  /**
   * Reinitialize after page changes
   */
  reinitialize() {
    this.clearAllStates(), this.initializeElements();
  }
  /**
   * Get selected rows for a table
   */
  getSelectedRows(e) {
    const t = this.getState(e);
    return t ? Array.from(t.selectedRows) : [];
  }
  /**
   * Clear selection for a table
   */
  clearSelection(e) {
    const t = this.getState(e);
    t && (t.selectedRows.clear(), this.updateSelectionState(e), this.dispatchSelectionEvent(e, []));
  }
  /**
   * Clean up TableActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  Fr.getInstance().init();
}) : Fr.getInstance().init();
window.TableActions = Fr;
Fr.getInstance();
class $r extends ne {
  /**
   * Initialize timepicker elements - required by BaseActionClass
   */
  initializeElements() {
    v.querySelectorAll("[data-keys-timepicker]").forEach((e) => {
      this.initializeTimePicker(e);
    });
  }
  /**
   * Initialize a single timepicker element
   */
  initializeTimePicker(e) {
    if (console.log("🕒 Initializing TimePicker:", e), this.hasState(e)) {
      console.log("🕒 TimePicker already initialized, skipping");
      return;
    }
    const t = e.dataset.format || "24", n = e.dataset.showSeconds === "true", i = parseInt(e.dataset.step || "1"), s = e.dataset.minTime || null, a = e.dataset.maxTime || null, o = e.dataset.value || null;
    console.log("🕒 TimePicker config:", { format: t, showSeconds: n, step: i, minTime: s, maxTime: a, initialValue: o });
    const l = this.parseTime(o) || this.getCurrentTime(), c = {
      isOpen: !1,
      format: t,
      showSeconds: n,
      hour: l.hour,
      minute: l.minute,
      second: l.second,
      period: l.period || "AM",
      step: i,
      minTime: s,
      maxTime: a,
      value: o
    };
    this.setState(e, c), this.updateDisplay(e), this.updateSelectedStates(e), this.updateClearButtonVisibility(e, o || ""), console.log("🕒 TimePicker initialized successfully with state:", c);
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    I.handleDelegatedClick("[data-timepicker-trigger]", (e, t) => {
      console.log("🕒 TimePicker trigger clicked:", e);
      const n = v.findClosest(e, "[data-keys-timepicker]");
      if (n && !this.isDisabled(n)) {
        console.log("🕒 Native popover will handle toggle for:", n);
        const i = this.getState(n);
        i && console.log("🕒 Current TimePicker state:", i);
      } else
        console.log("🕒 TimePicker trigger ignored - disabled or not found"), t.preventDefault();
    }), I.handleDelegatedClick("[data-timepicker-clear]", (e, t) => {
      console.log("🕒 TimePicker clear button clicked:", e), t.preventDefault(), t.stopPropagation();
      const n = v.findClosest(e, "[data-keys-timepicker]");
      n && (console.log("🕒 Clearing TimePicker value for:", n), this.clearTime(n));
    }), I.handleDelegatedClick("[data-timepicker-hour]", (e, t) => {
      t.preventDefault();
      const n = v.findClosest(e, "[data-keys-timepicker]"), i = parseInt(e.dataset.timepickerHour || "0");
      n && this.setHour(n, i);
    }), I.handleDelegatedClick("[data-timepicker-minute]", (e, t) => {
      t.preventDefault();
      const n = v.findClosest(e, "[data-keys-timepicker]"), i = parseInt(e.dataset.timepickerMinute || "0");
      n && this.setMinute(n, i);
    }), I.handleDelegatedClick("[data-timepicker-second]", (e, t) => {
      t.preventDefault();
      const n = v.findClosest(e, "[data-keys-timepicker]"), i = parseInt(e.dataset.timepickerSecond || "0");
      n && this.setSecond(n, i);
    }), I.handleDelegatedClick("[data-timepicker-period]", (e, t) => {
      t.preventDefault();
      const n = v.findClosest(e, "[data-keys-timepicker]"), i = e.dataset.timepickerPeriod;
      n && this.setPeriod(n, i);
    }), I.handleDelegatedClick("[data-timepicker-format]", (e, t) => {
      t.preventDefault();
      const n = v.findClosest(e, "[data-keys-timepicker]"), i = e.dataset.timepickerFormat;
      n && this.setFormat(n, i);
    }), I.handleDelegatedClick("[data-timepicker-now]", (e, t) => {
      t.preventDefault();
      const n = v.findClosest(e, "[data-keys-timepicker]");
      n && this.setToCurrentTime(n);
    }), I.handleDelegatedClick("[data-timepicker-apply]", (e, t) => {
      t.preventDefault();
      const n = v.findClosest(e, "[data-keys-timepicker]");
      n && this.applyTime(n);
    }), I.handleDelegatedClick("[data-timepicker-cancel]", (e, t) => {
      t.preventDefault();
      const n = v.findClosest(e, "[data-keys-timepicker]");
      n && this.closeDropdown(n);
    }), I.handleDelegatedClick("[data-timepicker-preset]", (e, t) => {
      t.preventDefault();
      const n = v.findClosest(e, "[data-keys-timepicker]"), i = e.dataset.timepickerPreset;
      n && i && this.setPresetTime(n, i);
    }), I.addEventListener(document, "click", (e) => {
      const t = e.target;
      t && t instanceof Element && (t.closest("[data-keys-timepicker]") || this.closeAllDropdowns());
    }), I.handleDelegatedKeydown("[data-keys-timepicker]", (e, t) => {
      this.handleKeydown(e, t);
    });
  }
  /**
   * Setup dynamic observer for new timepickers - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((e) => {
      e.forEach((t) => {
        if (t.nodeType === Node.ELEMENT_NODE) {
          const n = t;
          n.matches && n.matches("[data-keys-timepicker]") && this.initializeTimePicker(n), v.querySelectorAll("[data-keys-timepicker]", n).forEach((i) => {
            this.initializeTimePicker(i);
          });
        }
      });
    });
  }
  /**
   * Toggle dropdown open/closed state
   */
  toggleDropdown(e) {
    const t = this.getState(e);
    t && (t.isOpen ? this.closeDropdown(e) : this.openDropdown(e));
  }
  /**
   * Open dropdown
   */
  openDropdown(e) {
    const t = this.getState(e);
    if (!t || this.isDisabled(e)) return;
    this.closeAllDropdowns(), t.isOpen = !0, this.setState(e, t);
    const n = v.querySelector("[data-timepicker-trigger]", e);
    n && n.setAttribute("aria-expanded", "true"), this.updateSelectedStates(e), this.scrollToSelectedOptions(e), this.dispatchTimePickerEvent(e, "timepicker:open");
  }
  /**
   * Close dropdown
   */
  closeDropdown(e) {
    const t = this.getState(e);
    if (!t) return;
    t.isOpen = !1, this.setState(e, t);
    const n = v.querySelector("[data-timepicker-trigger]", e), i = v.querySelector("[data-popover]", e);
    if (n && n.setAttribute("aria-expanded", "false"), i && "hidePopover" in i)
      try {
        i.hidePopover();
      } catch {
        console.log("Fallback: triggering click to close popover"), n && n.click();
      }
    else n && n.click();
    this.dispatchTimePickerEvent(e, "timepicker:close");
  }
  /**
   * Close all open dropdowns
   */
  closeAllDropdowns() {
    this.getAllStates().forEach((e, t) => {
      e.isOpen && this.closeDropdown(t);
    });
  }
  /**
   * Set hour value
   */
  setHour(e, t) {
    const n = this.getState(e);
    n && (n.hour = t, this.setState(e, n), this.updateSelectedStates(e), this.updatePreview(e));
  }
  /**
   * Set minute value
   */
  setMinute(e, t) {
    const n = this.getState(e);
    n && (n.minute = t, this.setState(e, n), this.updateSelectedStates(e), this.updatePreview(e));
  }
  /**
   * Set second value
   */
  setSecond(e, t) {
    const n = this.getState(e);
    n && (n.second = t, this.setState(e, n), this.updateSelectedStates(e), this.updatePreview(e));
  }
  /**
   * Set period (AM/PM)
   */
  setPeriod(e, t) {
    const n = this.getState(e);
    n && (n.period = t, this.setState(e, n), this.updateSelectedStates(e), this.updatePreview(e));
  }
  /**
   * Convert hour between 12h and 24h formats
   */
  convertHourBetweenFormats(e, t, n, i) {
    if (t === n)
      return { hour: e, period: i };
    if (t === "24" && n === "12")
      return e === 0 ? { hour: 12, period: "AM" } : e >= 1 && e <= 11 ? { hour: e, period: "AM" } : e === 12 ? { hour: 12, period: "PM" } : { hour: e - 12, period: "PM" };
    if (t === "12" && n === "24") {
      if (!i)
        throw new Error("Period (AM/PM) required for 12h to 24h conversion");
      return i === "AM" ? e === 12 ? { hour: 0 } : { hour: e } : e === 12 ? { hour: 12 } : { hour: e + 12 };
    }
    return { hour: e, period: i };
  }
  /**
   * Set format (12/24 hour)
   */
  setFormat(e, t) {
    const n = this.getState(e);
    if (!n) return;
    const i = e.dataset.formatMode;
    if (i === "12" || i === "24") {
      console.warn(`TimePicker format is locked to ${i}h mode. Cannot switch to ${t}h.`);
      return;
    }
    if (n.format !== t) {
      const s = this.convertHourBetweenFormats(n.hour, n.format, t, n.period);
      n.hour = s.hour, s.period && (n.period = s.period), n.format = t, this.setState(e, n), this.updateFormatButtons(e), this.updatePeriodSectionVisibility(e), this.updateGridLayout(e), this.updateHourOptions(e), this.updateSelectedStates(e), this.updateDisplay(e), this.updatePreview(e);
    }
  }
  /**
   * Set to current time
   */
  setToCurrentTime(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = this.getCurrentTime();
    if (t.format === "12") {
      const i = this.convertHourBetweenFormats(n.hour, "24", "12");
      t.hour = i.hour, t.period = i.period;
    } else
      t.hour = n.hour;
    t.minute = n.minute, t.second = n.second, this.setState(e, t), this.updateSelectedStates(e), this.scrollToSelectedOptions(e), this.updatePreview(e);
  }
  /**
   * Set preset time
   */
  setPresetTime(e, t) {
    const n = this.getState(e);
    if (!n) return;
    const i = this.parseTime(t);
    if (i) {
      if (n.format === "12")
        if (i.period)
          n.hour = i.hour, n.period = i.period;
        else {
          const s = this.convertHourBetweenFormats(i.hour, "24", "12");
          n.hour = s.hour, n.period = s.period;
        }
      else if (i.period) {
        const s = this.convertHourBetweenFormats(i.hour, "12", "24", i.period);
        n.hour = s.hour;
      } else
        n.hour = i.hour;
      n.minute = i.minute, n.second = i.second, this.setState(e, n), this.updateSelectedStates(e), this.scrollToSelectedOptions(e), this.updatePreview(e);
    }
  }
  /**
   * Apply time selection
   */
  applyTime(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = this.formatTimeValue(t);
    this.setValue(e, n), this.closeDropdown(e), this.dispatchTimePickerEvent(e, "timepicker:change", {
      value: n,
      state: { ...t }
    });
  }
  /**
   * Clear time value
   */
  clearTime(e) {
    this.setValue(e, ""), this.dispatchTimePickerEvent(e, "timepicker:change", {
      value: "",
      state: null
    });
  }
  /**
   * Handle keyboard navigation
   */
  handleKeydown(e, t) {
    const n = this.getState(e);
    if (n)
      switch (t.key) {
        case "Enter":
        case " ":
          n.isOpen ? (t.preventDefault(), this.applyTime(e)) : (t.preventDefault(), this.openDropdown(e));
          break;
        case "Escape":
          n.isOpen && (t.preventDefault(), this.closeDropdown(e));
          break;
        case "ArrowUp":
          n.isOpen ? t.preventDefault() : (t.preventDefault(), this.incrementTime(e, "minute", 1));
          break;
        case "ArrowDown":
          n.isOpen ? t.preventDefault() : (t.preventDefault(), this.incrementTime(e, "minute", -1));
          break;
        case "ArrowLeft":
          n.isOpen || (t.preventDefault(), this.incrementTime(e, "hour", -1));
          break;
        case "ArrowRight":
          n.isOpen || (t.preventDefault(), this.incrementTime(e, "hour", 1));
          break;
      }
  }
  /**
   * Increment/decrement time values
   */
  incrementTime(e, t, n) {
    const i = this.getState(e);
    if (i) {
      switch (t) {
        case "hour":
          i.format === "12" ? (i.hour = i.hour + n, i.hour > 12 && (i.hour = 1), i.hour < 1 && (i.hour = 12)) : (i.hour = i.hour + n, i.hour > 23 && (i.hour = 0), i.hour < 0 && (i.hour = 23));
          break;
        case "minute":
          i.minute = i.minute + n * i.step, i.minute >= 60 ? i.minute = i.minute % 60 : i.minute < 0 && (i.minute = 60 + i.minute % 60, i.minute === 60 && (i.minute = 0));
          break;
        case "second":
          i.second = i.second + n, i.second >= 60 ? i.second = 0 : i.second < 0 && (i.second = 59);
          break;
      }
      this.setState(e, i), this.updateDisplay(e), this.dispatchTimePickerEvent(e, "timepicker:increment", {
        unit: t,
        direction: n,
        value: this.formatTimeValue(i)
      });
    }
  }
  /**
   * Update display value
   */
  updateDisplay(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = this.formatTimeValue(t), i = v.querySelector("[data-timepicker-display]", e);
    if (i)
      if (n)
        i.innerHTML = n;
      else {
        const s = e.dataset.placeholder || "Select time...";
        i.innerHTML = `<span class="text-text-muted timepicker-placeholder">${s}</span>`;
      }
    n ? e.dataset.hasValue = "true" : delete e.dataset.hasValue, this.updateClearButtonVisibility(e, n);
  }
  /**
   * Update preview in dropdown
   */
  updatePreview(e) {
    this.updateDisplay(e);
  }
  /**
   * Set value and update hidden input
   */
  setValue(e, t) {
    const n = v.querySelector("[data-timepicker-hidden-input]", e), i = v.querySelector("[data-timepicker-display]", e);
    if (n) {
      n.value = t;
      const a = new Event("input", { bubbles: !0 }), o = new Event("change", { bubbles: !0 });
      n.dispatchEvent(a), n.dispatchEvent(o), window.Livewire && n.hasAttribute("wire:model") && window.Livewire.hook("message.processed", () => {
      });
    }
    if (i)
      if (t)
        i.innerHTML = t;
      else {
        const a = e.dataset.placeholder || "Select time...";
        i.innerHTML = `<span class="text-text-muted timepicker-placeholder">${a}</span>`;
      }
    t ? e.dataset.hasValue = "true" : delete e.dataset.hasValue, this.updateClearButtonVisibility(e, t);
    const s = this.getState(e);
    s && (s.value = t, this.setState(e, s));
  }
  /**
   * Update clear button visibility based on value
   */
  updateClearButtonVisibility(e, t) {
    const n = v.querySelector("[data-timepicker-clear]", e);
    console.log("🕒 Updating clear button visibility:", { value: t, clearButton: !!n, disabled: e.dataset.disabled }), n && (t && !e.dataset.disabled ? (n.classList.remove("invisible"), console.log("🕒 Clear button shown")) : (n.classList.add("invisible"), console.log("🕒 Clear button hidden")));
  }
  /**
   * Update selected states in dropdown
   */
  updateSelectedStates(e) {
    const t = this.getState(e);
    if (!t) return;
    v.querySelectorAll(".selected", e).forEach((s) => {
      s.classList.remove("selected"), s.hasAttribute("aria-selected") && s.setAttribute("aria-selected", "false"), s.hasAttribute("aria-checked") && s.setAttribute("aria-checked", "false");
    });
    const n = v.querySelector(`[data-timepicker-hour="${t.hour}"]`, e);
    n && (n.classList.add("selected"), n.setAttribute("aria-selected", "true"));
    const i = v.querySelector(`[data-timepicker-minute="${t.minute}"]`, e);
    if (i && (i.classList.add("selected"), i.setAttribute("aria-selected", "true")), t.showSeconds) {
      const s = e.querySelector(`[data-timepicker-second="${t.second}"]`);
      s && (s.classList.add("selected"), s.setAttribute("aria-selected", "true"));
    }
    if (t.format === "12") {
      const s = e.querySelector(`[data-timepicker-period="${t.period}"]`);
      s && (s.classList.add("selected"), s.setAttribute("aria-checked", "true"));
    }
  }
  /**
   * Update format toggle buttons
   */
  updateFormatButtons(e) {
    const t = this.getState(e);
    if (!t) return;
    v.querySelectorAll("[data-timepicker-format]", e).forEach((i) => {
      i.dataset.timepickerFormat === t.format ? (i.dataset.selected = "true", i.setAttribute("aria-pressed", "true")) : (delete i.dataset.selected, i.setAttribute("aria-pressed", "false"));
    });
  }
  /**
   * Update hour options based on current format
   */
  updateHourOptions(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = v.querySelector("[data-timepicker-hours]", e);
    if (!n) return;
    const i = t.format === "12" ? Array.from({ length: 12 }, (s, a) => a + 1) : Array.from({ length: 24 }, (s, a) => a);
    n.innerHTML = "", i.forEach((s) => {
      const a = document.createElement("button");
      a.type = "button", a.dataset.timepickerHour = s.toString(), a.className = "w-full px-3 py-2 text-sm text-text text-left hover:bg-hover focus-visible:bg-brand focus-visible:text-white [&.selected]:bg-brand [&.selected]:text-white transition-colors", a.textContent = s.toString().padStart(2, "0"), n.appendChild(a);
    }), t.format === "12" && (t.hour < 1 || t.hour > 12) ? (t.hour = Math.max(1, Math.min(12, t.hour)), this.setState(e, t), this.updateDisplay(e), this.updatePreview(e)) : t.format === "24" && (t.hour < 0 || t.hour > 23) && (t.hour = Math.max(0, Math.min(23, t.hour)), this.setState(e, t), this.updateDisplay(e), this.updatePreview(e));
  }
  /**
   * Update visibility of the period (AM/PM) section based on current format
   */
  updatePeriodSectionVisibility(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = v.querySelector("[data-timepicker-period-section]", e);
    n && (t.format === "12" ? (n.classList.remove("hidden"), n.classList.add("flex", "flex-col")) : (n.classList.add("hidden"), n.classList.remove("flex", "flex-col")));
  }
  /**
   * Update grid layout based on current format and settings
   * Note: Grid columns are now calculated in Blade, this method updates the classes dynamically
   */
  updateGridLayout(e) {
    const t = this.getState(e);
    if (!t) return;
    const n = v.querySelector("[data-timepicker-grid]", e);
    if (!n) return;
    n.classList.remove("grid-cols-2", "grid-cols-3", "grid-cols-4");
    let i = 2;
    t.showSeconds && i++, t.format === "12" && i++, n.classList.add(`grid-cols-${i}`);
  }
  /**
   * Scroll to selected options in dropdown lists
   */
  scrollToSelectedOptions(e) {
    v.querySelectorAll(".selected", e).forEach((n) => {
      n.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }
  /**
   * Parse time string into components
   */
  parseTime(e) {
    var t;
    if (!e) return null;
    try {
      const n = [
        /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i,
        /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/
      ];
      for (const i of n) {
        const s = e.match(i);
        if (s) {
          const a = parseInt(s[1]), o = parseInt(s[2]), l = parseInt(s[3] || "0"), c = (t = s[4]) == null ? void 0 : t.toUpperCase();
          return { hour: a, minute: o, second: l, period: c };
        }
      }
    } catch {
    }
    return null;
  }
  /**
   * Get current time
   */
  getCurrentTime() {
    const e = /* @__PURE__ */ new Date();
    return {
      hour: e.getHours(),
      minute: e.getMinutes(),
      second: e.getSeconds()
    };
  }
  /**
   * Format time value from state
   */
  formatTimeValue(e) {
    const { hour: t, minute: n, second: i, period: s, format: a, showSeconds: o } = e;
    if (a === "12") {
      const l = t.toString(), c = n.toString().padStart(2, "0"), d = i.toString().padStart(2, "0");
      return o ? `${l}:${c}:${d} ${s}` : `${l}:${c} ${s}`;
    } else {
      const l = t.toString().padStart(2, "0"), c = n.toString().padStart(2, "0"), d = i.toString().padStart(2, "0");
      return o ? `${l}:${c}:${d}` : `${l}:${c}`;
    }
  }
  /**
   * Check if timepicker is disabled
   */
  isDisabled(e) {
    return e.dataset.disabled === "true";
  }
  /**
   * Dispatch custom timepicker event
   */
  dispatchTimePickerEvent(e, t, n = null) {
    I.dispatchCustomEvent(e, t, {
      timepicker: e,
      ...n
    }, {
      bubbles: !0,
      cancelable: !0
    });
  }
  /**
   * Get timepicker state (for external access)
   */
  getTimePickerState(e) {
    return this.getState(e) || null;
  }
  /**
   * Set time programmatically
   */
  setTime(e, t) {
    const n = this.parseTime(t), i = this.getState(e);
    !n || !i || (i.hour = n.hour, i.minute = n.minute, i.second = n.second, n.period && (i.period = n.period), this.setState(e, i), this.updateDisplay(e), this.updateSelectedStates(e), this.dispatchTimePickerEvent(e, "timepicker:change", {
      value: this.formatTimeValue(i),
      state: { ...i }
    }));
  }
  /**
   * Clean up TimePickerActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  $r.getInstance().init();
}) : $r.getInstance().init();
window.TimePickerActions = $r;
$r.getInstance();
class jr extends ne {
  initializeElements() {
    v.querySelectorAll("[data-keys-date-picker]").forEach((e) => {
      this.initializeDatePicker(e);
    });
  }
  initializeDatePicker(e) {
    if (this.hasState(e)) return;
    const t = e.dataset.keysDatePickerConfig;
    let n = {};
    try {
      n = t ? JSON.parse(t) : {};
    } catch (s) {
      console.error("Failed to parse date picker config:", s);
    }
    const i = {
      selectedDate: n.selectedDate || null,
      startDate: n.startDate || null,
      endDate: n.endDate || null,
      format: n.format || "Y-m-d",
      displayFormat: n.displayFormat || n.format || "Y-m-d",
      isRange: n.isRange || !1,
      closeOnSelect: n.closeOnSelect !== !1,
      isInline: e.dataset.inline === "true",
      isDisabled: e.dataset.disabled === "true"
    };
    this.setState(e, i), this.setupCalendarEventListeners(e);
  }
  bindEventListeners() {
    I.handleDelegatedClick("[data-date-picker-clear]", (e, t) => {
      t.preventDefault(), t.stopPropagation();
      const n = v.findClosest(e, "[data-keys-date-picker]");
      n && !this.isDisabled(n) && this.clearDate(n);
    }), I.handleDelegatedClick("[data-quick-selector]", (e, t) => {
      var s;
      t.preventDefault();
      const n = v.findClosest(e, "[data-keys-date-picker]"), i = n ? v.querySelector('[data-keys-calendar="true"]', n) : null;
      if (i && ((s = window.KeysUI) != null && s.CalendarCore)) {
        const a = e.dataset.quickSelector;
        a && i.dispatchEvent(new CustomEvent("quickSelector:clicked", {
          detail: { value: a },
          bubbles: !0
        }));
      }
    }), I.handleDelegatedInput("[data-date-picker-input]", (e) => {
      if (!e.readOnly) {
        const t = v.findClosest(e, "[data-keys-date-picker]");
        t && !this.isDisabled(t) && this.handleManualInput(t, e.value);
      }
    });
  }
  setupCalendarEventListeners(e) {
    const t = v.querySelector('[data-keys-calendar="true"]', e);
    if (!t) {
      const n = new MutationObserver(() => {
        const i = v.querySelector('[data-keys-calendar="true"]', e);
        i && (n.disconnect(), this.attachCalendarListeners(e, i));
      });
      n.observe(e, {
        childList: !0,
        subtree: !0
      }), setTimeout(() => n.disconnect(), 5e3);
      return;
    }
    this.attachCalendarListeners(e, t);
  }
  attachCalendarListeners(e, t) {
    t.addEventListener("calendar:dateSelected", (n) => {
      n.stopPropagation();
      const { selectedDate: i, formattedDate: s } = n.detail;
      this.handleDateSelected(e, i, s);
    }), t.addEventListener("calendar:rangeSelected", (n) => {
      n.stopPropagation();
      const { startDate: i, endDate: s, formattedRange: a } = n.detail;
      this.handleRangeSelected(e, i, s, a);
    }), t.addEventListener("calendar:cleared", (n) => {
      n.stopPropagation(), this.handleCalendarCleared(e);
    });
  }
  handleDateSelected(e, t, n) {
    const i = this.getState(e);
    i && (i.selectedDate = t, this.setState(e, i), this.updateDisplay(e, t ? this.formatDateForDisplay(t, i.displayFormat) : null), this.updateHiddenInput(e, t ? be.formatDateForSubmission(t, i.format) : ""), i.closeOnSelect && !i.isInline && !i.isRange && this.closePopover(e), this.dispatchDatePickerEvent(e, "datepicker:change", {
      value: t,
      formatted: n
    }));
  }
  handleRangeSelected(e, t, n, i) {
    const s = this.getState(e);
    if (!s) return;
    s.startDate = t, s.endDate = n, this.setState(e, s);
    const a = be.formatRangeForDisplay(t, n, s.displayFormat);
    this.updateDisplay(e, a);
    const o = be.formatRangeForSubmission(t, n, s.format);
    this.updateHiddenInput(e, o || ""), s.closeOnSelect && t && n && !s.isInline && this.closePopover(e), this.dispatchDatePickerEvent(e, "datepicker:change", {
      startDate: t,
      endDate: n,
      formatted: i
    });
  }
  handleCalendarCleared(e) {
    this.clearDate(e);
  }
  clearDate(e) {
    var i;
    const t = this.getState(e);
    if (!t) return;
    t.selectedDate = null, t.startDate = null, t.endDate = null, this.setState(e, t), this.updateDisplay(e, null), this.updateHiddenInput(e, "");
    const n = v.querySelector('[data-keys-calendar="true"]', e);
    if (n && ((i = window.KeysUI) != null && i.CalendarCore))
      try {
        const s = window.KeysUI.CalendarCore;
        t.isRange ? s.setSelectedRange(n, null, null) : s.setSelectedDate(n, null);
      } catch {
      }
    t.isInline || this.closePopover(e), this.dispatchDatePickerEvent(e, "datepicker:cleared");
  }
  updateDisplay(e, t) {
    const n = v.querySelector("[data-date-picker-display]", e);
    if (n)
      if (t)
        n.innerHTML = t;
      else {
        const i = e.dataset.placeholder || "Select date...";
        n.innerHTML = `<span class="text-text-muted date-picker-placeholder">${i}</span>`;
      }
  }
  updateHiddenInput(e, t) {
    const n = v.querySelector("[data-date-picker-value]", e);
    if (n) {
      n.value = t;
      const i = new Event("input", { bubbles: !0 }), s = new Event("change", { bubbles: !0 });
      n.dispatchEvent(i), n.dispatchEvent(s);
    }
  }
  closePopover(e) {
    const t = parseInt(e.dataset.closeDelay || "150");
    setTimeout(() => {
      const n = v.findClosest(e, "[data-keys-popover]") || v.querySelector("[data-keys-popover]", e);
      if (n && "hidePopover" in n)
        try {
          n.hidePopover();
        } catch {
        }
    }, t);
  }
  handleManualInput(e, t) {
    var s;
    const n = this.getState(e);
    if (!n) return;
    const i = be.parseInputDate(t, n.displayFormat);
    if (i) {
      const a = be.formatDateString(i);
      this.updateDisplay(e, this.formatDateForDisplay(a, n.displayFormat));
      const o = v.querySelector('[data-keys-calendar="true"]', e);
      if (o && ((s = window.KeysUI) != null && s.CalendarCore))
        try {
          window.KeysUI.CalendarCore.setSelectedDate(o, a);
        } catch (l) {
          console.warn("Calendar core not available or failed:", l);
        }
    }
  }
  isDisabled(e) {
    const t = this.getState(e);
    return t ? t.isDisabled : !1;
  }
  dispatchDatePickerEvent(e, t, n = null) {
    I.dispatchCustomEvent(e, t, {
      datePicker: e,
      ...n
    }, {
      bubbles: !0,
      cancelable: !0
    });
  }
  setupDynamicObserver() {
    this.createDynamicObserver((e) => {
      e.forEach((t) => {
        if (t.nodeType === Node.ELEMENT_NODE) {
          const n = t;
          v.hasDataAttribute(n, "keys-date-picker", "true") && this.initializeDatePicker(n), v.findByDataAttribute("keys-date-picker", "true", n).forEach((i) => {
            this.initializeDatePicker(i);
          });
        }
      });
    });
  }
  formatDateForDisplay(e, t) {
    try {
      const n = /* @__PURE__ */ new Date(e + "T00:00:00");
      return isNaN(n.getTime()) ? e : be.formatDateForDisplay(e, t) || e;
    } catch (n) {
      return console.warn("Date formatting error:", n), e;
    }
  }
  onDestroy() {
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  jr.getInstance().init();
}) : jr.getInstance().init();
window.DatePickerActions = jr;
jr.getInstance();
class Nc extends ne {
  /**
   * Initialize popover elements - required by BaseActionClass
   */
  initializeElements() {
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
  }
  /**
   * Clean up PopoverActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
Nc.getInstance();
class Rf extends ne {
  constructor() {
    super(...arguments), this.failedUrls = /* @__PURE__ */ new Set(), this.DEFAULT_MAX_RETRIES = 2, this.RETRY_DELAY = 1e3;
  }
  /**
   * Bind event listeners - required by BaseActionClass
   */
  bindEventListeners() {
  }
  /**
   * Set up dynamic observer for newly added images
   */
  setupDynamicObserver() {
    this.createDynamicObserver((e) => {
      e.forEach((t) => {
        if (t.nodeType === Node.ELEMENT_NODE) {
          const n = t;
          n.hasAttribute("data-keys-image") && this.initializeImage(n), n.querySelectorAll('[data-keys-image="true"]').forEach((s) => {
            this.initializeImage(s);
          });
        }
      });
    });
  }
  /**
   * Initialize image elements - required by BaseActionClass
   */
  initializeElements() {
    v.querySelectorAll('[data-keys-image="true"]').forEach((t) => {
      this.initializeImage(t);
    });
  }
  /**
   * Initialize a single image element
   */
  initializeImage(e) {
    const t = e.querySelector("img"), n = e.querySelector('[data-image-fallback="true"]');
    if (!t)
      return;
    const i = e.getAttribute("data-fallback-icon") || "heroicon-o-photo", s = e.getAttribute("data-fallback-text") || "Image placeholder", a = parseInt(e.getAttribute("data-retry-attempts") || "2", 10), o = e.hasAttribute("data-lightbox"), l = {
      element: e,
      img: t,
      fallbackContainer: n,
      fallbackIcon: i,
      fallbackText: s,
      retryCount: 0,
      maxRetries: Math.max(0, Math.min(a, 5)),
      isLoading: !1,
      hasFailed: !1,
      hasLightbox: o
    };
    this.setState(e, l), this.setupImageErrorHandling(l), t.complete && !t.naturalWidth && this.handleImageError(l);
  }
  /**
   * Set up error handling for image
   */
  setupImageErrorHandling(e) {
    e.img && (I.addEventListener(e.img, "error", () => {
      this.handleImageError(e);
    }), I.addEventListener(e.img, "load", () => {
      this.handleImageLoad(e);
    }), e.img.loading === "lazy" && this.setupLazyLoadingSupport(e));
  }
  /**
   * Handle image load error with retry logic
   *
   * Implements progressive retry strategy with exponential backoff.
   * Tracks failed URLs globally to avoid repeated retry attempts.
   * Falls back to placeholder icon after max retries exceeded.
   *
   * @param state - Current image component state
   */
  handleImageError(e) {
    if (!e.img || e.hasFailed) return;
    const t = e.img.src;
    if (this.failedUrls.add(t), e.retryCount < e.maxRetries && !this.isKnownFailedUrl(t)) {
      this.retryImageLoad(e);
      return;
    }
    e.hasFailed = !0, this.showFallback(e);
  }
  /**
   * Handle successful image load
   */
  handleImageLoad(e) {
    if (!e.img) return;
    const t = e.img.src;
    this.failedUrls.delete(t), e.hasFailed = !1, e.retryCount = 0, e.isLoading = !1, this.showImage(e);
  }
  /**
   * Retry loading the image after a delay
   */
  retryImageLoad(e) {
    !e.img || e.retryCount >= e.maxRetries || (e.retryCount++, e.isLoading = !0, e.element.setAttribute("data-image-loading", "true"), setTimeout(() => {
      if (!e.img || e.hasFailed) return;
      const t = e.img.src;
      e.img.src = "", requestAnimationFrame(() => {
        e.img && (e.img.src = t);
      });
    }, this.RETRY_DELAY * e.retryCount));
  }
  /**
   * Show the fallback placeholder using existing styled template structure
   */
  showFallback(e) {
    e.img && (e.img.style.display = "none", e.fallbackContainer && (e.fallbackContainer.style.display = "flex"), e.element.setAttribute("data-fallback-active", "true"), e.element.removeAttribute("data-image-active"), e.element.removeAttribute("data-image-loading"), e.hasLightbox && this.disableLightbox(e), this.updateAccessibility(e, "fallback"), this.dispatchImageEvent(e.element, "fallback", {
      fallbackIcon: e.fallbackIcon,
      fallbackText: e.fallbackText,
      originalSrc: e.img.src
    }));
  }
  /**
   * Show the image (hide fallback) using existing template structure
   */
  showImage(e) {
    e.img && (e.img.style.display = "block", e.fallbackContainer && (e.fallbackContainer.style.display = "none"), e.element.setAttribute("data-image-active", "true"), e.element.removeAttribute("data-fallback-active"), e.element.removeAttribute("data-image-loading"), e.hasLightbox && this.enableLightbox(e), this.updateAccessibility(e, "image"), this.dispatchImageEvent(e.element, "imageLoad", {
      src: e.img.src
    }));
  }
  /**
   * Set up lazy loading support
   */
  setupLazyLoadingSupport(e) {
    if (!e.img || !("IntersectionObserver" in window)) return;
    const t = new IntersectionObserver((n) => {
      n.forEach((i) => {
        i.isIntersecting && t.unobserve(i.target);
      });
    }, {
      rootMargin: "50px"
    });
    t.observe(e.img);
  }
  /**
   * Update accessibility attributes based on current state
   */
  updateAccessibility(e, t) {
    var i;
    const n = (i = e.img) == null ? void 0 : i.getAttribute("alt");
    t === "fallback" ? (e.element.setAttribute("aria-label", e.fallbackText), e.img && (e.img.setAttribute("alt", ""), e.img.setAttribute("aria-hidden", "true"))) : t === "image" && n && (e.element.removeAttribute("aria-label"), e.img && (e.img.setAttribute("alt", n), e.img.removeAttribute("aria-hidden")));
  }
  /**
   * Disable lightbox functionality for fallback state
   */
  disableLightbox(e) {
    e.element.removeAttribute("role"), e.element.removeAttribute("tabindex"), e.element.style.cursor = "default", e.element.getAttribute("data-lightbox-trigger") && e.element.setAttribute("data-lightbox-disabled", "true");
  }
  /**
   * Enable lightbox functionality for image state
   */
  enableLightbox(e) {
    e.hasLightbox && (e.element.setAttribute("role", "button"), e.element.setAttribute("tabindex", "0"), e.element.style.cursor = "pointer", e.element.removeAttribute("data-lightbox-disabled"));
  }
  /**
   * Check if URL is known to be failed
   */
  isKnownFailedUrl(e) {
    return this.failedUrls.has(e);
  }
  /**
   * Dispatch custom image events
   */
  dispatchImageEvent(e, t, n = {}) {
    const i = new CustomEvent(`image:${t}`, {
      detail: {
        element: e,
        ...n
      },
      bubbles: !0
    });
    e.dispatchEvent(i);
  }
  /**
   * Public method to manually trigger fallback for an image
   */
  triggerFallback(e) {
    const t = this.getState(e);
    t && !t.hasFailed && this.handleImageError(t);
  }
  /**
   * Public method to retry loading an image
   */
  retryImage(e) {
    const t = this.getState(e);
    t && t.hasFailed && t.img && (t.hasFailed = !1, t.retryCount = 0, this.handleImageLoad(t));
  }
  /**
   * Public method to check if an image has failed
   */
  hasImageFailed(e) {
    const t = this.getState(e);
    return t ? t.hasFailed : !1;
  }
  /**
   * Clear failed URLs cache (useful for network recovery scenarios)
   */
  clearFailedUrlsCache() {
    this.failedUrls.clear();
  }
  /**
   * Get image loading state
   */
  isImageLoading(e) {
    const t = this.getState(e);
    return t ? t.isLoading : !1;
  }
  /**
   * Force reload an image (useful for updating dynamic sources)
   */
  reloadImage(e, t) {
    const n = this.getState(e);
    if (n && n.img)
      if (t)
        n.img.src = t;
      else {
        const i = n.img.src;
        n.img.src = "", requestAnimationFrame(() => {
          n.img && (n.img.src = i);
        });
      }
  }
}
class Mc extends ne {
  constructor() {
    super(), this.cleanupFunctions = [], this.currentModal = null;
  }
  bindEventListeners() {
    this.cleanupFunctions.push(
      I.handleDelegatedClick(
        "[data-lightbox-trigger]",
        (e, t) => this.handleThumbnailClick(e, t)
      )
    ), this.cleanupFunctions.push(
      I.handleDelegatedClick(
        "[data-lightbox-close]",
        (e, t) => this.handleCloseClick(e, t)
      )
    ), this.cleanupFunctions.push(
      I.handleDelegatedClick(
        "[data-lightbox-prev]",
        (e, t) => this.handlePrevClick(e, t)
      )
    ), this.cleanupFunctions.push(
      I.handleDelegatedClick(
        "[data-lightbox-next]",
        (e, t) => this.handleNextClick(e, t)
      )
    ), this.cleanupFunctions.push(
      I.addEventListener(document, "keydown", (e) => {
        this.handleKeydown(e);
      })
    ), this.cleanupFunctions.push(
      I.handleDelegatedClick(
        "[data-lightbox-modal]",
        (e, t) => this.handleModalBackgroundClick(e, t)
      )
    ), this.cleanupFunctions.push(
      I.handleDelegatedClick(
        "[data-lightbox-trigger]",
        (e, t) => this.handleTriggerClick(e, t)
      )
    );
  }
  initializeElements() {
    console.log("[Lightbox] Initializing lightbox elements...");
    const e = v.findByDataAttribute("file-upload-zone");
    console.log("[Lightbox] Found file upload zones:", e.length), e.forEach((i) => {
      if (i.getAttribute("data-lightbox") === "true") {
        const a = i.parentElement;
        a && (console.log("[Lightbox] Initializing lightbox for upload zone"), this.initializeLightboxForUpload(a));
      }
    });
    const t = v.findByDataAttribute("lightbox-image");
    console.log("[Lightbox] Found standalone images:", t.length), t.forEach((i) => {
      console.log("[Lightbox] Initializing lightbox for image:", i), this.initializeLightboxForImage(i);
    });
    const n = v.findByDataAttribute("gallery");
    console.log("[Lightbox] Found gallery containers:", n.length), n.forEach((i) => {
      const s = i.getAttribute("data-lightbox") === "true";
      console.log("[Lightbox] Gallery has lightbox enabled:", s, i), s && (console.log("[Lightbox] Initializing lightbox for gallery"), this.initializeLightboxForGallery(i));
    }), console.log("[Lightbox] Initialization complete");
  }
  initializeLightboxForUpload(e) {
    const t = e.getAttribute("data-file-upload-id") || e.id || "upload-" + Date.now();
    this.setState(e, {
      currentImageIndex: 0,
      images: [],
      isOpen: !1,
      elementId: t
    });
  }
  initializeLightboxForImage(e) {
    const t = e.id || "image-" + Date.now(), n = e.closest("[data-lightbox-container]") || e, i = e.querySelector("img") || e;
    if (i && i.tagName === "IMG") {
      const s = this.extractImageData(i, t);
      this.setState(n, {
        currentImageIndex: 0,
        images: [s],
        isOpen: !1,
        elementId: t
      });
    }
  }
  initializeLightboxForGallery(e) {
    const t = e.getAttribute("data-gallery-id") || e.id || "gallery-" + Date.now(), n = [];
    e.querySelectorAll("[data-gallery-image]").forEach((s, a) => {
      const o = s.querySelector("img") || s;
      o && o.tagName === "IMG" && n.push(this.extractImageData(o, `${t}-${a}`, a));
    }), this.setState(e, {
      currentImageIndex: 0,
      images: n,
      isOpen: !1,
      elementId: t
    });
  }
  getFilenameFromSrc(e) {
    try {
      return new URL(e).pathname.split("/").pop() || "image";
    } catch {
      return e.split("/").pop() || "image";
    }
  }
  /**
   * Extract image data from HTML image element for lightbox display
   *
   * Reads image source, alt text, and metadata attributes to build LightboxImage object.
   * Falls back to extracting filename from src URL if data-filename not provided.
   *
   * @param img - The HTML image element to extract data from
   * @param id - Unique identifier for this image in the lightbox
   * @param index - Optional index for auto-generating alt text
   * @returns LightboxImage object with all metadata for display
   */
  extractImageData(e, t, n) {
    return {
      id: t,
      src: e.src,
      alt: e.alt || (n !== void 0 ? `Gallery image ${n + 1}` : "Image"),
      fileName: e.getAttribute("data-filename") || this.getFilenameFromSrc(e.src),
      fileSize: e.getAttribute("data-filesize") || "Unknown size",
      fileType: e.getAttribute("data-filetype") || "image"
    };
  }
  /**
   * Handle click on lightbox trigger element (image preview)
   */
  handleTriggerClick(e, t) {
    console.log("[Lightbox] Trigger clicked:", e), t.preventDefault(), t.stopPropagation();
    const n = e.closest(".file-upload-wrapper") || e.closest("[data-gallery]") || e.closest("[data-lightbox-container]") || e.closest("[data-keys-file-upload]");
    if (!n) {
      console.warn("[Lightbox] No container found for trigger:", e);
      return;
    }
    console.log("[Lightbox] Found container:", n);
    const i = this.getState(n);
    if (!i) {
      console.warn("[Lightbox] No state found for container");
      return;
    }
    console.log("[Lightbox] State:", i);
    const s = e.getAttribute("data-lightbox-trigger");
    if (!s) {
      console.warn("[Lightbox] No image ID on trigger");
      return;
    }
    const a = i.images.findIndex((o) => o.id === s);
    if (a === -1) {
      console.warn("[Lightbox] Image not found in state:", s);
      return;
    }
    console.log("[Lightbox] Opening lightbox at index:", a), this.openLightbox(n, a);
  }
  handleThumbnailClick(e, t) {
    t.preventDefault(), t.stopPropagation();
    const n = this.findLightboxContainer(e);
    if (!n)
      return;
    const i = this.getState(n);
    if (!i)
      return;
    let s = 0;
    const a = e.getAttribute("data-lightbox-trigger");
    a && (s = i.images.findIndex((l) => l.id === a));
    const o = e.getAttribute("data-gallery-image");
    o !== null && (s = parseInt(o, 10)), e.hasAttribute("data-lightbox-image") && (s = 0), !(s === -1 || s >= i.images.length) && this.openLightbox(n, s);
  }
  handleCloseClick(e, t) {
    t.preventDefault(), this.closeLightbox();
  }
  handlePrevClick(e, t) {
    t.preventDefault(), this.navigateToPrevious();
  }
  handleNextClick(e, t) {
    t.preventDefault(), this.navigateToNext();
  }
  handleKeydown(e) {
    if (!(!this.currentModal || !this.currentModal.open))
      switch (e.key) {
        case "Escape":
          e.preventDefault(), this.closeLightbox();
          break;
        case "ArrowLeft":
          e.preventDefault(), this.navigateToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault(), this.navigateToNext();
          break;
      }
  }
  handleModalBackgroundClick(e, t) {
    t.target === e && this.closeLightbox();
  }
  openLightbox(e, t) {
    const n = this.getState(e);
    if (!n || !n.images.length)
      return;
    n.currentImageIndex = t, n.isOpen = !0, this.setState(e, n);
    const i = this.getOrCreateLightboxModal(e);
    this.currentModal = i, this.updateModalContent(i, n), i.showModal(), I.dispatchCustomEvent(e, "lightbox:open", {
      imageIndex: t,
      image: n.images[t]
    });
  }
  closeLightbox() {
    if (!this.currentModal)
      return;
    const e = this.findContainerElementFromModal(this.currentModal);
    if (e) {
      const t = this.getState(e);
      t && (t.isOpen = !1, this.setState(e, t)), I.dispatchCustomEvent(e, "lightbox:close", {});
    }
    this.currentModal.close(), this.currentModal = null;
  }
  navigateToPrevious() {
    if (!this.currentModal) return;
    const e = this.findContainerElementFromModal(this.currentModal);
    if (!e) return;
    const t = this.getState(e);
    if (!t || !t.images.length) return;
    const n = t.currentImageIndex > 0 ? t.currentImageIndex - 1 : t.images.length - 1;
    t.currentImageIndex = n, this.setState(e, t), this.updateModalContent(this.currentModal, t), I.dispatchCustomEvent(e, "lightbox:navigate", {
      direction: "previous",
      imageIndex: n,
      image: t.images[n]
    });
  }
  navigateToNext() {
    if (!this.currentModal) return;
    const e = this.findContainerElementFromModal(this.currentModal);
    if (!e) return;
    const t = this.getState(e);
    if (!t || !t.images.length) return;
    const n = t.currentImageIndex < t.images.length - 1 ? t.currentImageIndex + 1 : 0;
    t.currentImageIndex = n, this.setState(e, t), this.updateModalContent(this.currentModal, t), I.dispatchCustomEvent(e, "lightbox:navigate", {
      direction: "next",
      imageIndex: n,
      image: t.images[n]
    });
  }
  getOrCreateLightboxModal(e) {
    const n = this.getElementId(e) + "-lightbox-modal";
    let i = document.getElementById(n);
    return i || (i = this.createLightboxModal(n), document.body.appendChild(i)), i;
  }
  getElementId(e) {
    const t = e.getAttribute("data-file-upload-id");
    if (t)
      return t;
    const n = e.getAttribute("data-gallery-id");
    return n || e.id || "lightbox-" + Date.now();
  }
  createLightboxModal(e) {
    const t = v.createElement("dialog", {
      attributes: {
        id: e,
        "data-lightbox-modal": "true",
        "data-modal": "true",
        class: "lightbox-modal p-0 m-0 w-full h-full max-w-none max-h-none bg-black/90 backdrop:bg-black/50"
      }
    });
    return t.innerHTML = `
            <div class="lightbox-content relative w-full h-full flex items-center justify-center p-8">
                <!-- Close button -->
                <button
                    type="button"
                    class="lightbox-close absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 flex items-center justify-center"
                    data-lightbox-close="true"
                    aria-label="Close lightbox"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <!-- Previous button -->
                <button
                    type="button"
                    class="lightbox-nav lightbox-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 flex items-center justify-center"
                    data-lightbox-prev="true"
                    aria-label="Previous image"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                <!-- Next button -->
                <button
                    type="button"
                    class="lightbox-nav lightbox-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 flex items-center justify-center"
                    data-lightbox-next="true"
                    aria-label="Next image"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>

                <!-- Image container -->
                <div class="lightbox-image-container flex-1 flex items-center justify-center">
                    <img
                        class="lightbox-image max-w-full max-h-full object-contain"
                        src=""
                        alt=""
                        data-lightbox-image="true"
                    />
                </div>

                <!-- Image info -->
                <div class="lightbox-info absolute bottom-4 left-4 right-4 z-20 bg-black/70 text-white p-4 rounded-lg">
                    <h3 class="lightbox-title text-lg font-semibold mb-1" data-lightbox-title="true"></h3>
                    <div class="lightbox-meta text-sm text-white/80 flex items-center gap-4">
                        <span data-lightbox-size="true"></span>
                        <span data-lightbox-counter="true"></span>
                    </div>
                </div>
            </div>
        `, t;
  }
  updateModalContent(e, t) {
    const n = t.images[t.currentImageIndex];
    if (!n) return;
    const i = e.querySelector("[data-lightbox-image]");
    i && (i.src = n.src, i.alt = n.alt);
    const s = e.querySelector("[data-lightbox-title]");
    s && (s.textContent = n.fileName);
    const a = e.querySelector("[data-lightbox-size]");
    a && (a.textContent = n.fileSize);
    const o = e.querySelector("[data-lightbox-counter]");
    o && (o.textContent = `${t.currentImageIndex + 1} of ${t.images.length}`);
    const l = e.querySelector("[data-lightbox-prev]"), c = e.querySelector("[data-lightbox-next]");
    if (l && c) {
      const d = t.images.length > 1;
      l.style.display = d ? "flex" : "none", c.style.display = d ? "flex" : "none";
    }
  }
  findLightboxContainer(e) {
    const t = v.findClosest(e, "[data-file-upload-id]");
    if (t)
      return t;
    const n = v.findClosest(e, "[data-gallery]");
    if (n)
      return n;
    const i = v.findClosest(e, "[data-lightbox-container]");
    return i || (e.hasAttribute("data-lightbox-image") ? e : null);
  }
  findContainerElementFromModal(e) {
    const n = e.id.replace("-lightbox-modal", "");
    let i = document.querySelector(`[data-file-upload-id="${n}"]`);
    return i || (i = document.querySelector(`[data-gallery-id="${n}"]`), i) || (i = document.getElementById(n), i) ? i : null;
  }
  addImage(e, t) {
    const n = this.getState(e);
    n && (n.images.push(t), this.setState(e, n));
  }
  addImages(e, t) {
    const n = this.getState(e);
    n && (n.images.push(...t), this.setState(e, n));
  }
  setImages(e, t) {
    const n = this.getState(e);
    n && (n.images = t, this.setState(e, n));
  }
  removeImage(e, t) {
    const n = this.getState(e);
    if (!n) return;
    const i = n.images.findIndex((s) => s.id === t);
    i !== -1 && (n.images.splice(i, 1), n.currentImageIndex >= n.images.length && (n.currentImageIndex = Math.max(0, n.images.length - 1)), this.setState(e, n), n.images.length === 0 && n.isOpen && this.closeLightbox());
  }
  destroy() {
    this.cleanupFunctions.forEach((e) => e()), this.cleanupFunctions = [], this.currentModal && (this.currentModal.close(), this.currentModal = null), super.destroy();
  }
}
class zf extends ne {
  constructor() {
    super(...arguments), this.chartStates = /* @__PURE__ */ new Map(), this.outsideClickHandlers = /* @__PURE__ */ new WeakMap();
  }
  /**
   * Bind event listeners - required by BaseActionClass
   */
  bindEventListeners() {
  }
  /**
   * Initialize chart elements - required by BaseActionClass
   */
  initializeElements() {
    v.querySelectorAll('[data-keys-chart="true"]').forEach((t) => {
      this.initializeChart(t);
    });
  }
  /**
   * Initialize a single chart element
   */
  initializeChart(e) {
    const t = e.getAttribute("data-interactive") === "true", n = e.getAttribute("data-animated") === "true", i = Array.from(e.querySelectorAll('[data-chart-item="true"]')), s = {
      element: e,
      isInteractive: t,
      isAnimated: n,
      dataItems: i,
      activeClickedItem: void 0,
      tooltipPinned: !1
    };
    this.chartStates.set(e, s), t && i.length > 0 && this.setupInteractiveEvents(s), this.setupKeyboardNavigation(s), this.setupOutsideClickHandler(s), n && this.triggerAnimations(s);
  }
  /**
   * Set up interactive event listeners for chart data items
   */
  setupInteractiveEvents(e) {
    e.dataItems.forEach((t, n) => {
      t.addEventListener("mouseenter", (i) => {
        const s = i.target;
        (!e.tooltipPinned || e.activeClickedItem === s) && this.showTooltip(e, s);
      }), t.addEventListener("mouseleave", () => {
        e.tooltipPinned || this.hideTooltip(e);
      }), t.addEventListener("click", (i) => {
        this.handleDataItemClick(e, i.target);
      });
    });
  }
  /**
   * Set up keyboard navigation for chart accessibility
   */
  setupKeyboardNavigation(e) {
    if (!e.isInteractive || e.dataItems.length === 0)
      return;
    const t = e.dataItems[0];
    if (t) {
      t.setAttribute("tabindex", "0"), t.setAttribute("role", "button");
      const n = t.getAttribute("data-label") || "", i = t.getAttribute("data-value") || "";
      t.setAttribute("aria-label", `${n}: ${i}`);
    }
    e.dataItems.forEach((n, i) => {
      if (!n.getAttribute("aria-label")) {
        const a = n.getAttribute("data-label") || "", o = n.getAttribute("data-value") || "";
        n.setAttribute("aria-label", `${a}: ${o}`);
      }
      n.addEventListener("keydown", (a) => {
        this.handleKeyboardNavigation(e, a, i);
      });
    });
  }
  /**
   * Set up outside click handler for pinned tooltips
   */
  setupOutsideClickHandler(e) {
    const t = (n) => {
      const i = n.target;
      e.tooltipPinned && !e.element.contains(i) && (this.hideTooltip(e), e.tooltipPinned = !1, e.activeClickedItem = void 0);
    };
    this.outsideClickHandlers.set(e.element, t), document.addEventListener("click", t);
  }
  /**
   * Clean up event listeners for a chart (prevents memory leaks)
   */
  destroyChart(e) {
    const t = this.outsideClickHandlers.get(e);
    t && (document.removeEventListener("click", t), this.outsideClickHandlers.delete(e)), this.chartStates.delete(e);
  }
  /**
   * Handle keyboard navigation between chart data items
   */
  handleKeyboardNavigation(e, t, n) {
    let i = -1;
    switch (t.key) {
      case "ArrowRight":
      case "ArrowDown":
        i = (n + 1) % e.dataItems.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        i = n === 0 ? e.dataItems.length - 1 : n - 1;
        break;
      case "Home":
        i = 0;
        break;
      case "End":
        i = e.dataItems.length - 1;
        break;
      case "Enter":
      case " ":
        this.handleDataItemClick(e, t.target), t.preventDefault();
        return;
    }
    i !== -1 && (t.preventDefault(), this.focusDataItem(e, i));
  }
  /**
   * Focus on a specific data item
   */
  focusDataItem(e, t) {
    e.dataItems.forEach((i) => {
      i.setAttribute("tabindex", "-1");
    });
    const n = e.dataItems[t];
    n && (n.setAttribute("tabindex", "0"), n.focus());
  }
  /**
   * Show tooltip for chart item on hover
   */
  showTooltip(e, t) {
    const n = this.extractItemData(t);
    if (!n) return;
    let i = e.element.querySelector("[data-chart-tooltip]");
    i || (i = this.createTooltip(e));
    const s = t.hasAttribute("data-chart-pie-slice");
    let a;
    if (s) {
      const o = t.getAttribute("data-percentage") || "0";
      a = `${n.label}: ${this.formatTooltipValue(n.value)} (${o}%)`;
    } else
      a = `${n.label}: ${this.formatTooltipValue(n.value)}`;
    i.textContent = a, this.positionTooltip(i, t), i.style.opacity = "1", i.style.pointerEvents = "none";
  }
  /**
   * Hide tooltip
   */
  hideTooltip(e) {
    const t = e.element.querySelector("[data-chart-tooltip]");
    t && (t.style.opacity = "0");
  }
  /**
   * Create tooltip element
   */
  createTooltip(e) {
    const t = document.createElement("div");
    return t.setAttribute("data-chart-tooltip", "true"), t.className = "chart-tooltip absolute px-2 py-1 text-xs font-medium pointer-events-none opacity-0 transition-opacity duration-200", e.element.appendChild(t), t;
  }
  /**
   * Position tooltip relative to chart item
   */
  positionTooltip(e, t) {
    var o;
    const n = t.getBoundingClientRect(), i = ((o = e.offsetParent) == null ? void 0 : o.getBoundingClientRect()) || { left: 0, top: 0 }, s = n.left - i.left + n.width / 2 - e.offsetWidth / 2, a = n.top - i.top - e.offsetHeight - 8;
    e.style.left = `${Math.max(0, s)}px`, e.style.top = `${Math.max(0, a)}px`;
  }
  /**
   * Format tooltip value for display
   */
  formatTooltipValue(e) {
    const t = parseFloat(e);
    return isNaN(t) ? e : t.toLocaleString();
  }
  /**
   * Extract data from chart item element for click handling
   */
  extractItemData(e) {
    const t = e.getAttribute("data-index"), n = e.getAttribute("data-value"), i = e.getAttribute("data-label");
    return t === null || n === null || i === null ? null : {
      index: parseInt(t),
      value: n,
      label: i
    };
  }
  /**
   * Handle click events on chart data items
   */
  handleDataItemClick(e, t) {
    var s;
    const n = this.extractItemData(t);
    if (!n) return;
    e.activeClickedItem === t && e.tooltipPinned ? (this.hideTooltip(e), e.tooltipPinned = !1, e.activeClickedItem = void 0) : (this.showTooltip(e, t), e.tooltipPinned = !0, e.activeClickedItem = t), t.blur();
    const i = new CustomEvent("chart:item:click", {
      detail: {
        ...n,
        element: t,
        chart: e.element
      },
      bubbles: !0,
      cancelable: !0
    });
    if (e.element.dispatchEvent(i), "Livewire" in window) {
      const a = e.element.closest("[wire\\:id]");
      if (a) {
        const o = a.getAttribute("wire:id");
        o && ((s = window.Livewire.find(o)) == null || s.$dispatch("chart-item-clicked", {
          index: n.index,
          value: n.value,
          label: n.label
        }));
      }
    }
  }
  /**
   * Trigger chart animations
   * Note: Animations are now handled by CSS @keyframes with animation-delay attributes
   * This method dispatches the animation complete event for framework integration
   */
  triggerAnimations(e) {
    const i = e.dataItems.length * 100 + 800;
    setTimeout(() => {
      const s = new CustomEvent("chart:animation:complete", {
        detail: { chart: e.element },
        bubbles: !0
      });
      e.element.dispatchEvent(s);
    }, i);
  }
  /**
   * Public API: Refresh chart (useful for dynamic data updates)
   */
  refreshChart(e) {
    const t = this.chartStates.get(e);
    t && (t.dataItems = Array.from(e.querySelectorAll('[data-chart-item="true"]')), t.isInteractive && this.setupInteractiveEvents(t), t.isAnimated && this.triggerAnimations(t));
  }
  /**
   * Public API: Update chart data (for dynamic charts)
   */
  updateChartData(e, t) {
    const n = new CustomEvent("chart:data:update", {
      detail: { chart: e, data: t },
      bubbles: !0
    });
    e.dispatchEvent(n);
  }
}
class qw extends ne {
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    document.addEventListener("input", (e) => {
      const t = e.target;
      t.matches("[data-color-input]") && this.handleColorInput(e), t.matches("[data-text-input]") && this.handleTextInput(e);
    }), document.addEventListener("blur", (e) => {
      e.target.matches("[data-text-input]") && this.handleTextBlur(e);
    }, !0), document.addEventListener("keydown", (e) => {
      e.target.matches("[data-text-input]") && this.handleKeydown(e);
    });
  }
  /**
   * Initialize color picker elements - required by BaseActionClass
   */
  initializeElements() {
    v.querySelectorAll('[data-keys-color-picker="true"]').forEach((t) => {
      this.initializeColorPicker(t);
    });
  }
  /**
   * Initialize a single color picker element
   */
  initializeColorPicker(e) {
    const t = v.querySelector("[data-color-input]", e), n = v.querySelector("[data-text-input]", e);
    if (!t || !n) {
      console.warn("ColorPicker: Required input elements not found");
      return;
    }
    const i = {
      colorInput: t,
      textInput: n,
      isUpdating: !1
    };
    this.setState(e, i);
  }
  /**
   * Handle color picker input changes
   */
  handleColorInput(e) {
    const t = e.target, n = t.closest('[data-keys-color-picker="true"]');
    if (!n) return;
    const i = this.getState(n);
    if (!i || i.isUpdating) return;
    const s = t.value.toUpperCase();
    i.isUpdating = !0, i.textInput.value = s, this.dispatchChangeEvent(i.colorInput), i.isUpdating = !1;
  }
  /**
   * Handle text input changes
   */
  handleTextInput(e) {
    const t = e.target, n = t.closest('[data-keys-color-picker="true"]');
    if (!n) return;
    const i = this.getState(n);
    if (!i || i.isUpdating) return;
    const s = t.value;
    this.isValidHexColor(s) && (i.isUpdating = !0, i.colorInput.value = s.toUpperCase(), i.isUpdating = !1);
  }
  /**
   * Handle text input blur - validate and correct format
   */
  handleTextBlur(e) {
    const t = e.target, n = t.closest('[data-keys-color-picker="true"]');
    if (!n) return;
    const i = this.getState(n);
    if (!i) return;
    let s = t.value.trim();
    s.length > 0 && !s.startsWith("#") && (s = "#" + s), this.isValidHexColor(s) ? (s = s.toUpperCase(), i.isUpdating = !0, i.textInput.value = s, i.colorInput.value = s, this.dispatchChangeEvent(i.colorInput), i.isUpdating = !1) : s !== "" && (i.isUpdating = !0, i.textInput.value = i.colorInput.value, i.isUpdating = !1);
  }
  /**
   * Handle keyboard events
   */
  handleKeydown(e) {
    const n = e.target.closest('[data-keys-color-picker="true"]');
    if (!n) return;
    const i = this.getState(n);
    i && e.key === "Enter" && (e.preventDefault(), i.colorInput.focus(), i.colorInput.click());
  }
  /**
   * Validate hex color format
   */
  isValidHexColor(e) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e);
  }
  /**
   * Dispatch change event for form integration
   */
  dispatchChangeEvent(e) {
    const t = new Event("change", { bubbles: !0 });
    e.dispatchEvent(t);
  }
  /**
   * Clean up ColorPickerActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
class Pf extends ne {
  constructor() {
    super(...arguments), this.sidebars = /* @__PURE__ */ new Map();
  }
  initializeElements() {
    v.querySelectorAll('[data-keys-sidebar="true"]').forEach((t) => {
      const n = t.id;
      if (!n) return;
      const i = v.querySelector(`[data-sidebar-overlay][data-sidebar-target="${n}"]`), s = Array.from(v.querySelectorAll(`[data-sidebar-toggle="${n}"]`));
      v.querySelectorAll("details[data-keys-sidebar-section]", t).forEach((o) => {
        o.hasAttribute("open") || o.setAttribute("data-originally-collapsed", "true");
      }), this.sidebars.set(n, {
        sidebar: t,
        overlay: i,
        toggleButtons: s
      });
    }), this.updateAllToggleIcons();
  }
  bindEventListeners() {
    document.addEventListener("click", (e) => {
      const t = e.target, n = t.closest("[data-sidebar-toggle]");
      if (n) {
        const s = n.dataset.sidebarToggle;
        s && this.toggleSidebar(s);
      }
      const i = t.closest("[data-sidebar-overlay]");
      if (i) {
        const s = i.getAttribute("data-sidebar-target");
        s && this.closeSidebar(s);
      }
    }), document.addEventListener("keydown", (e) => {
      e.key === "Escape" && this.closeAllSidebars();
    }), window.addEventListener("resize", () => {
      this.updateAllToggleIcons();
    }), document.addEventListener("sidebar:toggle", (e) => {
      e.detail.sidebarId && this.toggleSidebar(e.detail.sidebarId);
    }), document.addEventListener("sidebar:open", (e) => {
      e.detail.sidebarId && this.openSidebar(e.detail.sidebarId);
    }), document.addEventListener("sidebar:close", (e) => {
      e.detail.sidebarId && this.closeSidebar(e.detail.sidebarId);
    });
  }
  toggleSidebar(e) {
    const t = this.sidebars.get(e);
    if (!t) return;
    t.sidebar.classList.contains("sidebar-collapsed") ? this.openSidebar(e) : this.closeSidebar(e);
  }
  openSidebar(e) {
    const t = this.sidebars.get(e);
    if (!t) return;
    const { sidebar: n, overlay: i, toggleButtons: s } = t;
    n.dataset.collapsed = "false", n.classList.remove("sidebar-collapsed"), v.querySelectorAll("details[data-keys-sidebar-section]", n).forEach((o) => {
      o.hasAttribute("data-originally-collapsed") ? o.open = !1 : o.open = !0;
    }), i && (i.classList.remove("opacity-0", "pointer-events-none"), i.classList.add("opacity-100")), this.updateToggleIcons(s, e), n.dispatchEvent(new CustomEvent("sidebar:opened", { detail: { sidebarId: e } }));
  }
  closeSidebar(e) {
    const t = this.sidebars.get(e);
    if (!t) return;
    const { sidebar: n, overlay: i, toggleButtons: s } = t;
    n.dataset.collapsed = "true", n.classList.add("sidebar-collapsed"), v.querySelectorAll("details[data-keys-sidebar-section]", n).forEach((o) => {
      o.open = !0;
    }), i && (i.classList.remove("opacity-100"), i.classList.add("opacity-0", "pointer-events-none")), this.updateToggleIcons(s, e), n.dispatchEvent(new CustomEvent("sidebar:closed", { detail: { sidebarId: e } }));
  }
  closeAllSidebars() {
    this.sidebars.forEach((e, t) => {
      const n = this.sidebars.get(t);
      n && !n.sidebar.classList.contains("sidebar-collapsed") && this.closeSidebar(t);
    });
  }
  updateAllToggleIcons() {
    this.sidebars.forEach(({ toggleButtons: e }, t) => {
      this.updateToggleIcons(e, t);
    });
  }
  updateToggleIcons(e, t) {
    const n = window.innerWidth < 1024, i = this.sidebars.get(t);
    if (!i) return;
    const s = i.sidebar.classList.contains("sidebar-collapsed");
    e.forEach((a) => {
      const o = a.dataset.mobileIcon || "heroicon-o-x-mark", l = a.dataset.desktopIcon || "heroicon-o-chevron-up-down", c = a.querySelector("[data-icon]");
      if (!c) return;
      const d = n && !s ? o : l;
      c.getAttribute("data-original-name") !== d && (c.setAttribute("data-original-name", d), this.updateIconSvg(c, d));
    });
  }
  updateIconSvg(e, t) {
    const n = {
      "heroicon-o-x-mark": '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />',
      "heroicon-o-chevron-up-down": '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />',
      "heroicon-o-bars-3": '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />'
    }, i = e.querySelector("svg");
    i && n[t] && (i.innerHTML = n[t]);
  }
  onDestroy() {
    this.sidebars.clear();
  }
}
class Bf extends ne {
  initializeElements() {
    v.querySelectorAll('[data-keys-countdown="true"]').forEach((t) => this.initializeCountdown(t));
  }
  initializeCountdown(e) {
    const t = parseInt(e.dataset.target || "0", 10) * 1e3, n = JSON.parse(e.dataset.units || "[]"), i = {};
    n.forEach((a) => {
      const o = v.querySelector(`[data-unit-container="${a}"]`, e), l = v.querySelector(`[data-span-a-for="${a}"]`, e), c = v.querySelector(`[data-span-b-for="${a}"]`, e);
      o && l && c && (i[a] = { container: o, spanA: l, spanB: c, isA_Active: !0 });
    });
    const s = {
      targetTimestamp: t,
      isComplete: !1,
      units: i,
      timeLeft: {}
    };
    this.stateManager.set(e, s), this.updateCountdown(e, s);
  }
  bindEventListeners() {
    this.intervalId && clearInterval(this.intervalId), this.intervalId = window.setInterval(() => this.updateAllCountdowns(), 1e3);
  }
  updateAllCountdowns() {
    this.stateManager.forEach((e, t) => {
      e.isComplete || this.updateCountdown(t, e);
    });
  }
  updateCountdown(e, t) {
    const n = Date.now(), i = t.targetTimestamp - n;
    if (i <= 0) {
      this.completeCountdown(e, t);
      return;
    }
    const s = {
      days: Math.floor(i / (1e3 * 60 * 60 * 24)),
      hours: Math.floor(i % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)),
      minutes: Math.floor(i % (1e3 * 60 * 60) / (1e3 * 60)),
      seconds: Math.floor(i % (1e3 * 60) / 1e3)
    };
    Object.entries(t.units).forEach(([a, o]) => {
      const l = s[a];
      t.timeLeft[a] === void 0 ? o.spanA.textContent = String(l).padStart(2, "0") : l !== t.timeLeft[a] && this.animate(o, l);
    }), t.timeLeft = s;
  }
  /**
   * Animate by swapping the roles of two span elements.
   */
  animate(e, t) {
    const n = e.isA_Active ? e.spanA : e.spanB, i = e.isA_Active ? e.spanB : e.spanA;
    i.textContent = String(t).padStart(2, "0"), n.classList.add("translate-y-full", "opacity-0"), i.classList.remove("-translate-y-full", "opacity-0"), setTimeout(() => {
      n.classList.remove("duration-300"), n.classList.remove("translate-y-full"), n.classList.add("-translate-y-full"), requestAnimationFrame(() => {
        n.classList.add("duration-300");
      });
    }, 300), e.isA_Active = !e.isA_Active;
  }
  completeCountdown(e, t) {
    t.isComplete = !0, Object.values(t.units).forEach((i) => i.container.classList.add("hidden"));
    const n = v.querySelector(".countdown-complete", e);
    n && n.classList.remove("hidden"), I.dispatchCustomEvent(e, "countdown-complete", { countdown: e });
  }
  setupDynamicObserver() {
    new MutationObserver((t) => {
      t.forEach((n) => {
        n.addedNodes.forEach((i) => {
          i instanceof HTMLElement && (i.matches('[data-keys-countdown="true"]') && this.initializeCountdown(i), i.querySelectorAll('[data-keys-countdown="true"]').forEach((a) => this.initializeCountdown(a)));
        });
      });
    }).observe(document.body, { childList: !0, subtree: !0 });
  }
  onDestroy() {
    this.intervalId && clearInterval(this.intervalId);
  }
}
class fr {
  /**
   * @description Checks if the global Livewire object is available on the window.
   * @returns {boolean} True if Livewire is available, false otherwise.
   */
  static isLivewireAvailable() {
    return typeof window < "u" && "Livewire" in window && window.Livewire !== void 0;
  }
  /**
   * @description Determines if a component is configured to interact with Livewire.
   * It checks for various data attributes commonly used for Livewire integration.
   * @param {HTMLElement} element The component's main HTML element.
   * @returns {boolean} True if the element is Livewire-enabled.
   */
  static isLivewireEnabled(e) {
    return e.dataset.livewire === "true" || e.dataset.livewireEnabled === "true" || !!e.dataset.wireModel;
  }
  /**
   * @description Finds the associated Livewire component instance for a given HTML element.
   * It traverses up the DOM tree to find the closest element with a `wire:id`.
   * @param {HTMLElement} element The HTML element inside a Livewire component.
   * @returns {any | null} The Livewire component instance, or null if not found.
   */
  static getLivewireComponent(e) {
    if (!this.isLivewireAvailable())
      return null;
    const t = v.findClosest(e, "[wire\\:id]");
    if (!t)
      return null;
    const n = t.getAttribute("wire:id");
    return n && window.Livewire.find ? window.Livewire.find(n) : null;
  }
  /**
   * @description Extracts the `wire:model` property name from a component's element.
   * It checks for `data-wire-model`, `data-livewire-property`, and the actual `wire:model` attribute.
   * @param {HTMLElement} element The component's HTML element.
   * @returns {string | null} The name of the `wire:model` property, or null if not found.
   */
  static getWireModelProperty(e) {
    const t = e.dataset.wireModel || e.dataset.livewireProperty;
    if (t)
      return t;
    const n = e.getAttribute("wire:model");
    return n || null;
  }
  /**
   * @description Updates a property on a Livewire component with a new value.
   * This is the primary method for syncing state from the frontend to Livewire.
   * @param {HTMLElement} element The element associated with the Livewire component.
   * @param {any} value The new value to set on the component's property.
   * @returns {void}
   */
  static updateLivewireProperty(e, t) {
    const n = this.getLivewireComponent(e), i = this.getWireModelProperty(e);
    if (n && i)
      try {
        n.set(i, t);
      } catch (s) {
        console.warn(`[LivewireUtils] Failed to update Livewire property '${i}'.`, s);
      }
  }
  /**
   * @description Dispatches the necessary DOM events on an input element to trigger
   * a `wire:model` update in Livewire.
   * @param {HTMLInputElement} input The input element tied to a `wire:model`.
   * @returns {void}
   */
  static dispatchInputEvent(e) {
    const t = new Event("input", { bubbles: !0, cancelable: !0 });
    e.dispatchEvent(t);
    const n = new Event("change", { bubbles: !0, cancelable: !0 });
    e.dispatchEvent(n);
  }
}
function qt(r, e = "", t = {}) {
  const n = window.KeysUITranslations;
  if (!n)
    return e;
  const i = r.split(".");
  let s = n;
  for (const o of i)
    if (s = s == null ? void 0 : s[o], s === void 0)
      return e;
  let a = s || e;
  for (const o in t)
    a = a.replace(`:${o}`, String(t[o]));
  return a;
}
class Ff extends ne {
  constructor() {
    super(...arguments), this.lightboxActions = Mc.getInstance();
  }
  initializeElements() {
    v.querySelectorAll("[data-keys-file-upload]").forEach((e) => {
      e.dataset.initialized !== "true" && this.initializeFileUpload(e);
    });
  }
  bindEventListeners() {
  }
  setupDynamicObserver() {
    this.createDynamicObserver((e) => {
      e.forEach((t) => {
        t instanceof Element && (t.matches("[data-keys-file-upload]") && t.getAttribute("data-initialized") !== "true" && this.initializeFileUpload(t), v.querySelectorAll("[data-keys-file-upload]", t).forEach((n) => {
          n.getAttribute("data-initialized") !== "true" && this.initializeFileUpload(n);
        }));
      });
    });
  }
  initializeFileUpload(e) {
    const t = v.querySelector("[data-file-input]", e);
    !t || this.hasState(e) || (this.setState(e, { files: [] }), this.setupFileHandling(e, t), this.setupDragDrop(e, t), this.setupClickHandlers(e, t), this.setupLivewireIntegration(e, t), this.lightboxActions.setState(e, {
      currentImageIndex: 0,
      images: [],
      isOpen: !1,
      elementId: e.id || `upload-${Date.now()}`
    }), e.setAttribute("data-initialized", "true"));
  }
  setupFileHandling(e, t) {
    t.addEventListener("change", () => {
      t.files && t.files.length > 0 ? this.handleFiles(e, t, Array.from(t.files)) : (this.setState(e, { files: [] }), this.renderFileList(e));
    });
  }
  setupDragDrop(e, t) {
    const n = e.dataset.dragDrop === "true", i = e.dataset.disabled === "true";
    if (!n || i) return;
    const s = v.querySelector("[data-file-dropzone]", e);
    if (!s) return;
    ["dragenter", "dragover", "dragleave", "drop"].forEach((o) => s.addEventListener(o, this.preventDefault)), ["dragenter", "dragover"].forEach((o) => s.addEventListener(o, () => s.classList.add("dragover"))), ["dragleave", "drop"].forEach((o) => s.addEventListener(o, () => s.classList.remove("dragover"))), s.addEventListener("drop", (o) => {
      var c;
      const l = (c = o.dataTransfer) == null ? void 0 : c.files;
      l && l.length > 0 && this.handleFiles(e, t, Array.from(l));
    });
  }
  setupClickHandlers(e, t) {
    I.handleDelegatedClick("[data-file-dropzone]", (n, i) => {
      i.target.closest("[data-file-input]") || e.hasAttribute("data-is-removing") || t.disabled || t.click();
    }, e), I.handleDelegatedClick("[data-add-more-btn]", () => {
      t.disabled || t.click();
    }, e), I.handleDelegatedClick("[data-file-delete]", (n) => {
      const i = n.closest("[data-file-card]"), s = parseInt((i == null ? void 0 : i.getAttribute("data-file-index")) || "0");
      this.removeFileAtIndex(e, t, s);
    }, e), I.handleDelegatedClick("[data-file-retry]", (n) => {
      const i = n.closest("[data-file-card]"), s = parseInt((i == null ? void 0 : i.getAttribute("data-file-index")) || "0");
      this.retryFileUpload(e, t, s);
    }, e), I.handleDelegatedClick("[data-image-fill-replace]", () => {
      t.disabled || t.click();
    }, e), I.handleDelegatedClick("[data-image-fill-delete]", () => {
      this.clearImageFillPreview(e, t);
    }, e);
  }
  setupLivewireIntegration(e, t) {
    !fr.isLivewireEnabled(e) || !fr.isLivewireAvailable() || (t.addEventListener("livewire-upload-start", () => {
      const n = this.getState(e);
      n && n.files.length > 0 && n.files.forEach((i, s) => this.setFileStatus(e, s, "uploading"));
    }), t.addEventListener("livewire-upload-progress", (n) => {
      const i = n.detail.progress, s = this.getState(e);
      s && s.files.length > 0 && s.files.forEach((a, o) => this.setFileProgress(e, o, i));
    }), t.addEventListener("livewire-upload-finish", () => {
      const n = this.getState(e);
      n && n.files.length > 0 && n.files.forEach((i, s) => this.setFileStatus(e, s, "complete"));
    }), t.addEventListener("livewire-upload-error", (n) => {
      var a;
      const i = ((a = n.detail) == null ? void 0 : a.message) || qt("file_upload.upload_failed", "Upload failed. Please try again."), s = this.getState(e);
      s && s.files.length > 0 && s.files.forEach((o, l) => {
        o.error = i, this.setFileStatus(e, l, "error");
      });
    }), t.addEventListener("livewire-upload-cancel", () => {
      const n = this.getState(e);
      n && n.files.length > 0 && n.files.forEach((i, s) => this.setFileStatus(e, s, "idle"));
    }), window.addEventListener("keys-ui-reset", () => {
      const n = fr.getLivewireComponent(t), i = fr.getWireModelProperty(t);
      n && i && (t.value = "", this.setState(e, { files: [] }), this.renderFileList(e));
    }));
  }
  handleFiles(e, t, n) {
    const i = e.dataset.maxFiles, s = i ? parseInt(i) : null, a = e.dataset.multiple === "true", o = [], l = this.getState(e), d = [...a && l ? [...l.files] : []];
    for (const f of n) {
      const h = this.validateFile(e, f);
      if (!h.valid) {
        o.push(`${f.name}: ${h.error || qt("file_upload.invalid_file", "Invalid file selected.")}`);
        continue;
      }
      if (s && d.length >= s) {
        o.push(qt("file_upload.max_files_error", "Maximum :max file(s) allowed.", { max: s }));
        break;
      }
      if (d.push({
        file: f,
        status: "idle",
        progress: 0
      }), !a)
        break;
    }
    if (o.length > 0 ? this.showError(e, o.join(" | ")) : this.clearError(e), d.length === 0) {
      this.setState(e, { files: [] }), this.renderFileList(e);
      return;
    }
    this.setState(e, { files: d }), this.updateFileInputFiles(t, d.map((f) => f.file)), this.renderFileList(e);
  }
  removeFileAtIndex(e, t, n) {
    const i = this.getState(e);
    if (!i) return;
    const s = i.files;
    if (n < 0 || n >= s.length) return;
    const a = `preview-${n}-`, o = this.lightboxActions.getState(e);
    o && o.images && o.images.filter((c) => c.id.startsWith(a)).forEach((c) => this.lightboxActions.removeImage(e, c.id)), s.splice(n, 1), this.setState(e, { files: s }), s.length === 0 ? (t.value = "", this.renderFileList(e), this.announceChange(e, qt("file_upload.file_removed", "File removed."))) : (this.updateFileInputFiles(t, s.map((l) => l.file)), this.renderFileList(e), this.announceChange(e, `${qt("file_upload.file_removed", "File removed.")} ${s.length} file(s) remaining`));
  }
  retryFileUpload(e, t, n) {
    const i = this.getState(e);
    !i || !i.files[n] || (i.files[n].status = "idle", i.files[n].progress = 0, i.files[n].error = void 0, this.renderFileList(e), fr.isLivewireEnabled(e) && fr.dispatchInputEvent(t));
  }
  updateFileInputFiles(e, t) {
    const n = new DataTransfer();
    t.forEach((i) => n.items.add(i)), e.files = n.files;
  }
  validateFile(e, t) {
    const n = e.dataset.accept, i = e.dataset.maxSize, s = e.dataset.maxSizeFormatted;
    if (n && n !== "*") {
      const a = n.split(",").map((l) => l.trim());
      if (!a.some((l) => l.startsWith(".") ? t.name.toLowerCase().endsWith(l.toLowerCase()) : l.includes("*") ? t.type.startsWith(l.split("/")[0] + "/") : t.type === l)) return { valid: !1, error: qt("file_upload.file_type_error", "File type not allowed. Accepted: :types", { types: a.join(", ") }) };
    }
    return i && t.size > parseInt(i) ? { valid: !1, error: qt("file_upload.file_size_error", "File too large. Maximum size: :size", { size: s || "10MB" }) } : { valid: !0 };
  }
  /**
   * Unified method to render the file list (replaces showFileState and showMultipleFilesState)
   */
  renderFileList(e) {
    if (e.dataset.variant === "image-fill") {
      this.renderImageFillPreview(e);
      return;
    }
    const n = v.querySelector("[data-file-list]", e), i = v.querySelector("[data-add-more-container]", e);
    if (!n) return;
    const s = this.getState(e), a = e.dataset.multiple === "true";
    if (!s || s.files.length === 0) {
      n.classList.add("hidden"), n.innerHTML = "", i && i.classList.add("hidden");
      return;
    }
    n.classList.remove("hidden"), n.classList.add("flex"), n.innerHTML = "", s.files.forEach((o, l) => {
      const c = this.createFileCard(e, o, l);
      n.appendChild(c);
    }), i && a && i.classList.remove("hidden"), this.announceChange(e, qt("file_upload.files_selected", ":count file(s) selected", { count: s.files.length }));
  }
  createFileCard(e, t, n) {
    const i = v.querySelector("[data-file-card-template]", e);
    if (!i) {
      console.error("File card template not found. Make sure the template with [data-file-card-template] exists in the DOM.");
      const c = document.createElement("li");
      return c.className = "file-card p-4 border rounded", c.textContent = t.file.name, c;
    }
    const s = i.content.cloneNode(!0), a = s.querySelector("[data-file-card]");
    if (!a) return s;
    a.setAttribute("data-file-index", n.toString()), a.setAttribute("data-file-status", t.status);
    const o = v.querySelector("[data-file-name]", a), l = v.querySelector("[data-file-size]", a);
    return o && (o.textContent = t.file.name, o.title = t.file.name), l && (l.textContent = this.formatFileSize(t.file.size)), this.setupFileIcon(a, t.file, n, e), this.updateCardStatus(a, t), this.updateCardProgress(a, t), this.applyRingState(a, t.status), a;
  }
  setupFileIcon(e, t, n, i) {
    const s = v.querySelector("[data-file-preview-image]", e), a = v.querySelector("[data-file-icon-wrapper]", e), o = v.querySelector("[data-file-type-icon]", e);
    if (t.type.startsWith("image/")) {
      const l = new FileReader();
      l.onload = (c) => {
        var d;
        if (s && ((d = c.target) != null && d.result)) {
          const f = c.target.result;
          s.src = f, s.alt = t.name, s.classList.remove("hidden"), a && a.classList.add("hidden");
          const h = `preview-${n}-${Date.now()}`;
          s.setAttribute("data-lightbox-trigger", h), s.style.cursor = "pointer", this.lightboxActions.addImage(i, {
            id: h,
            src: f,
            alt: t.name,
            fileName: t.name,
            fileSize: this.formatFileSize(t.size),
            fileType: t.type
          });
        }
      }, l.readAsDataURL(t);
    } else if (a && o) {
      const l = this.getFileTypeColor(t.name);
      a.style.backgroundColor = l, o.innerHTML = this.getFileTypeIcon(t.name, i);
    }
  }
  updateCardStatus(e, t) {
    const n = v.querySelector("[data-file-status-icon]", e), i = v.querySelector("[data-file-status-text]", e), s = v.querySelector("[data-file-status]", e), a = v.querySelector("[data-file-status-separator]", e), o = v.querySelector("[data-file-retry-container]", e);
    if (!(!n || !i))
      switch (t.status) {
        case "uploading":
          s == null || s.classList.remove("hidden"), a == null || a.classList.remove("hidden"), n.innerHTML = this.getUploadingIcon(), i.textContent = "Uploading...", i.className = "text-sm font-medium text-text-muted", o && o.classList.add("hidden");
          break;
        case "complete":
          s == null || s.classList.remove("hidden"), a == null || a.classList.remove("hidden"), n.innerHTML = this.getCompleteIcon(), i.textContent = "Complete", i.className = "text-sm font-medium text-success", o && o.classList.add("hidden");
          break;
        case "error":
          s == null || s.classList.remove("hidden"), a == null || a.classList.remove("hidden"), n.innerHTML = this.getErrorIcon(), i.textContent = "Failed", i.className = "text-sm font-medium text-danger", o && o.classList.remove("hidden");
          break;
        case "idle":
        default:
          s == null || s.classList.add("hidden"), a == null || a.classList.add("hidden"), n.innerHTML = "", i.textContent = "", o && o.classList.add("hidden");
          break;
      }
  }
  updateCardProgress(e, t) {
    const n = v.querySelector("[data-file-progress]", e), i = v.querySelector("[data-file-progress-bar]", e), s = v.querySelector("[data-file-progress-percent]", e);
    n && (t.status === "uploading" ? (n.classList.remove("hidden"), n.classList.add("flex"), i && (i.style.width = `${t.progress}%`), s && (s.textContent = `${t.progress}%`)) : n.classList.add("hidden"));
  }
  applyRingState(e, t) {
    switch (e.classList.remove("ring-1", "ring-2", "ring-border", "ring-brand", "ring-success", "ring-danger"), t) {
      case "uploading":
        e.classList.add("ring-1", "ring-brand");
        break;
      case "complete":
        e.classList.add("ring-1", "ring-success");
        break;
      case "error":
        e.classList.add("ring-2", "ring-danger");
        break;
      case "idle":
      default:
        e.classList.add("ring-1", "ring-border");
        break;
    }
  }
  setFileStatus(e, t, n) {
    const i = this.getState(e);
    !i || !i.files[t] || (i.files[t].status = n, this.renderFileList(e));
  }
  setFileProgress(e, t, n) {
    const i = this.getState(e);
    if (!i || !i.files[t]) return;
    i.files[t].progress = Math.round(n);
    const s = v.querySelector("[data-file-list]", e);
    if (!s) return;
    const a = s.querySelector(`[data-file-index="${t}"]`);
    if (!a) return;
    const o = i.files[t];
    this.updateCardProgress(a, o);
  }
  showError(e, t) {
    e.setAttribute("data-invalid", "true"), console.error("File Upload Error:", t);
  }
  clearError(e) {
    e.removeAttribute("data-invalid");
  }
  formatFileSize(e) {
    if (e === 0) return "0 Bytes";
    const t = 1024, n = ["Bytes", "KB", "MB", "GB"], i = Math.floor(Math.log(e) / Math.log(t));
    return parseFloat((e / Math.pow(t, i)).toFixed(2)) + " " + n[i];
  }
  preventDefault(e) {
    e.preventDefault(), e.stopPropagation();
  }
  announceChange(e, t) {
    const n = v.createElement("div", {
      attributes: { "aria-live": "polite", "aria-atomic": "true" },
      classes: ["sr-only"],
      textContent: t
    });
    e.appendChild(n), setTimeout(() => {
      e.contains(n) && e.removeChild(n);
    }, 1e3);
  }
  // File type icon detection using Blade templates
  getFileTypeIcon(e, t) {
    var c;
    const n = ((c = e.split(".").pop()) == null ? void 0 : c.toLowerCase()) || "", s = {
      // PDF
      pdf: "pdf",
      // Documents
      doc: "document",
      docx: "document",
      ppt: "document",
      pptx: "document",
      xls: "document",
      xlsx: "document",
      odt: "document",
      ods: "document",
      odp: "document",
      // Code files
      js: "code",
      ts: "code",
      jsx: "code",
      tsx: "code",
      php: "code",
      py: "code",
      java: "code",
      cpp: "code",
      c: "code",
      html: "code",
      css: "code",
      scss: "code",
      json: "code",
      xml: "code",
      sql: "code",
      // Video
      mp4: "video",
      avi: "video",
      mov: "video",
      wmv: "video",
      flv: "video",
      mkv: "video",
      // Archives
      zip: "archive",
      rar: "archive",
      "7z": "archive",
      tar: "archive",
      gz: "archive"
    }[n] || "default", a = t.querySelector(`[data-icon-template="${s}"]`);
    if (!a) {
      console.warn(`Icon template "${s}" not found. Using default.`);
      const d = t.querySelector('[data-icon-template="default"]');
      if (d) {
        const f = d.content.cloneNode(!0), h = document.createElement("div");
        return h.appendChild(f), h.innerHTML;
      }
      return '<svg class="size-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/></svg>';
    }
    const o = a.content.cloneNode(!0), l = document.createElement("div");
    return l.appendChild(o), l.innerHTML;
  }
  getFileTypeColor(e) {
    var i;
    const t = ((i = e.split(".").pop()) == null ? void 0 : i.toLowerCase()) || "";
    return {
      // Documents - Red
      pdf: "#D92D20",
      // Office Docs - Purple
      doc: "#7F56D9",
      docx: "#7F56D9",
      ppt: "#7F56D9",
      pptx: "#7F56D9",
      xls: "#7F56D9",
      xlsx: "#7F56D9",
      // Code - Indigo
      js: "#444CE7",
      ts: "#444CE7",
      jsx: "#444CE7",
      tsx: "#444CE7",
      php: "#444CE7",
      py: "#444CE7",
      java: "#444CE7",
      cpp: "#444CE7",
      c: "#444CE7",
      html: "#444CE7",
      css: "#444CE7",
      scss: "#444CE7",
      // Video - Blue
      mp4: "#155EEF",
      avi: "#155EEF",
      mov: "#155EEF",
      wmv: "#155EEF",
      flv: "#155EEF",
      // Archives - Gray
      zip: "#667085",
      rar: "#667085",
      "7z": "#667085",
      tar: "#667085",
      gz: "#667085"
    }[t] || "#D5D7DA";
  }
  // Status icon helpers
  getUploadingIcon() {
    return `<svg class="size-4 animate-spin text-text-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>`;
  }
  getCompleteIcon() {
    return `<svg class="size-4 text-success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m7.5 12 3 3 6-6m5.5 3c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"/>
        </svg>`;
  }
  getErrorIcon() {
    return `<svg class="size-4 text-danger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15 9-6 6m0-6 6 6m7-3c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"/>
        </svg>`;
  }
  /**
   * Render image-fill variant preview
   */
  renderImageFillPreview(e) {
    const t = this.getState(e), n = v.querySelector("[data-file-dropzone]", e), i = v.querySelector("[data-image-fill-preview]", e), s = v.querySelector("[data-image-fill-img]", e), a = v.querySelector("[data-file-input]", e);
    if (!n || !i || !s || !a) return;
    if (!t || t.files.length === 0) {
      n.classList.remove("hidden"), i.classList.add("hidden"), a.classList.remove("pointer-events-none");
      return;
    }
    const l = t.files[0].file;
    if (!l.type.startsWith("image/")) {
      console.warn("Image-fill variant only supports image files.");
      return;
    }
    const c = new FileReader();
    c.onload = (d) => {
      var f;
      if ((f = d.target) != null && f.result) {
        const h = d.target.result;
        s.src = h, s.alt = l.name, i.classList.remove("hidden"), n.classList.add("hidden"), a.classList.add("pointer-events-none"), this.announceChange(e, qt("file_upload.file_selected", "File selected: :name", { name: l.name }));
      }
    }, c.readAsDataURL(l);
  }
  /**
   * Clear image-fill variant preview and restore dropzone
   */
  clearImageFillPreview(e, t) {
    const n = v.querySelector("[data-file-dropzone]", e), i = v.querySelector("[data-image-fill-preview]", e), s = v.querySelector("[data-image-fill-img]", e);
    !n || !i || !s || (this.setState(e, { files: [] }), t.value = "", s.src = "", s.alt = "", n.classList.remove("hidden"), i.classList.add("hidden"), t.classList.remove("pointer-events-none"), this.announceChange(e, qt("file_upload.file_removed", "File removed.")));
  }
}
function od() {
  console.log("[Tabs] Initializing tabs...");
  const r = document.querySelectorAll("[data-keys-tabs]");
  console.log("[Tabs] Found tabs containers:", r.length), r.forEach((e) => {
    const t = e.querySelectorAll("[data-tab]"), n = e.querySelectorAll("[data-tab-panel]"), i = e.querySelector("[data-tab-slider]"), s = e.querySelector('[role="tablist"]'), a = e.getAttribute("data-value");
    if (!t.length || !n.length || !s)
      return;
    function o(h) {
      const g = h.getAttribute("data-tab");
      if (!g) return;
      l(h);
      const b = (e.getAttribute("data-variant") || "default") === "pills";
      t.forEach((k) => {
        const y = k === h;
        b ? (k.classList.toggle("text-brand-foreground", y), k.classList.toggle("text-text", !1)) : (k.classList.toggle("text-text", y), k.classList.toggle("text-brand-foreground", !1)), k.classList.toggle("font-semibold", y), k.classList.toggle("text-text-muted", !y), k.setAttribute("aria-selected", String(y)), k.setAttribute("tabindex", y ? "0" : "-1");
      }), n.forEach((k) => {
        const S = k.getAttribute("data-tab-panel") === g;
        k.classList.toggle("hidden", !S), k.setAttribute("aria-hidden", String(!S)), S ? k.classList.add("block") : k.classList.remove("block");
      }), e.setAttribute("data-value", g);
    }
    function l(h) {
      if (!i) return;
      const g = s.getBoundingClientRect(), m = h.getBoundingClientRect(), b = m.left - g.left, k = i.classList.contains("inset-y-1");
      if (i.style.width = `${m.width}px`, i.style.left = `${b}px`, k) {
        const y = m.top - g.top;
        i.style.height = `${m.height}px`, i.style.top = `${y}px`;
      }
    }
    function c(h) {
      const g = h.target, m = Array.from(t).indexOf(g);
      let b = null;
      const y = (e.getAttribute("data-orientation") || "horizontal") === "horizontal";
      switch (h.key) {
        case (y ? "ArrowLeft" : "ArrowUp"):
          h.preventDefault(), b = t[m - 1] || t[t.length - 1];
          break;
        case (y ? "ArrowRight" : "ArrowDown"):
          h.preventDefault(), b = t[m + 1] || t[0];
          break;
        case "Home":
          h.preventDefault(), b = t[0];
          break;
        case "End":
          h.preventDefault(), b = t[t.length - 1];
          break;
      }
      b && (o(b), b.focus());
    }
    t.forEach((h) => {
      h.addEventListener("click", () => {
        h.hasAttribute("disabled") || o(h);
      }), h.addEventListener("keydown", c);
    });
    const d = a ? e.querySelector(`[data-tab="${a}"]`) : t[0];
    d && setTimeout(() => {
      o(d);
    }, 50);
    let f;
    window.addEventListener("resize", () => {
      clearTimeout(f), f = window.setTimeout(() => {
        const h = e.querySelector('[data-tab][aria-selected="true"]');
        h && i && l(h);
      }, 100);
    });
  });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", od) : od();
const ru = class ru {
  /**
   * Detect if the current document is in RTL mode
   */
  static isRTL() {
    var t;
    if (this.cachedDirection !== null)
      return this.cachedDirection === "rtl";
    const e = [
      document.documentElement.getAttribute("dir"),
      this.getDirectionFromLanguage(document.documentElement.getAttribute("lang")),
      (t = document.body) == null ? void 0 : t.getAttribute("dir"),
      window.getComputedStyle(document.documentElement).direction
    ];
    for (const n of e) {
      if (n === "rtl")
        return this.cachedDirection = "rtl", !0;
      if (n === "ltr")
        return this.cachedDirection = "ltr", !1;
    }
    return this.cachedDirection = "ltr", !1;
  }
  /**
   * Get direction based on language code
   */
  static getDirectionFromLanguage(e) {
    if (!e) return null;
    const t = [
      "ar",
      "he",
      "fa",
      "ur",
      "ps",
      "sd",
      "ug",
      "yi",
      "arc",
      "ckb",
      "dv",
      "ha",
      "ji",
      "ku",
      "ks",
      "ms",
      "nqo",
      "pnb",
      "prs",
      "ug",
      "uz"
    ], n = e.toLowerCase().split("-")[0];
    return t.includes(n) ? "rtl" : "ltr";
  }
  /**
   * Clear cached direction (useful for dynamic changes)
   */
  static clearCache() {
    this.cachedDirection = null;
  }
  /**
   * Transform directional class names for RTL
   */
  static transformDirectionalClasses(e) {
    if (!this.isRTL())
      return e;
    const t = /* @__PURE__ */ new Map([
      ["ml-", "mr-"],
      ["mr-", "ml-"],
      ["ms-", "me-"],
      ["me-", "ms-"],
      ["pl-", "pr-"],
      ["pr-", "pl-"],
      ["ps-", "pe-"],
      ["pe-", "ps-"],
      ["border-l-", "border-r-"],
      ["border-r-", "border-l-"],
      ["border-s-", "border-e-"],
      ["border-e-", "border-s-"],
      ["rounded-l-", "rounded-r-"],
      ["rounded-r-", "rounded-l-"],
      ["rounded-s-", "rounded-e-"],
      ["rounded-e-", "rounded-s-"],
      ["rounded-tl-", "rounded-tr-"],
      ["rounded-tr-", "rounded-tl-"],
      ["rounded-bl-", "rounded-br-"],
      ["rounded-br-", "rounded-bl-"],
      ["rounded-ss-", "rounded-se-"],
      ["rounded-se-", "rounded-ss-"],
      ["rounded-es-", "rounded-ee-"],
      ["rounded-ee-", "rounded-es-"],
      ["left-", "right-"],
      ["right-", "left-"],
      ["start-", "end-"],
      ["end-", "start-"],
      ["text-left", "text-right"],
      ["text-right", "text-left"],
      ["justify-start", "justify-end"],
      ["justify-end", "justify-start"],
      ["items-start", "items-end"],
      ["items-end", "items-start"],
      ["self-start", "self-end"],
      ["self-end", "self-start"],
      ["float-left", "float-right"],
      ["float-right", "float-left"],
      ["clear-left", "clear-right"],
      ["clear-right", "clear-left"]
    ]);
    let n = e;
    for (const [i, s] of t) {
      const a = new RegExp(`\\b${i.replace("-", "\\-")}([\\w\\-\\.\\[\\]%\\/]+)?\\b`, "g");
      new RegExp(`\\b${s.replace("-", "\\-")}([\\w\\-\\.\\[\\]%\\/]+)?\\b`, "g"), n = n.replace(a, (o, l) => s + (l || ""));
    }
    return n;
  }
  /**
   * Get the opposite direction for icon positioning
   */
  static getOppositePosition(e) {
    return this.isRTL() ? e === "left" ? "right" : "left" : e;
  }
  /**
   * Get logical position (start/end) based on physical position (left/right)
   */
  static getLogicalPosition(e) {
    return this.isRTL() ? e === "left" ? "end" : "start" : e === "left" ? "start" : "end";
  }
  /**
   * Get physical position from logical position
   */
  static getPhysicalPosition(e) {
    return this.isRTL() ? e === "start" ? "right" : "left" : e === "start" ? "left" : "right";
  }
  /**
   * Add RTL-aware classes to an element
   */
  static addRTLClasses(e, t) {
    const n = this.transformDirectionalClasses(t);
    e.classList.add(...n.split(" ").filter((i) => i.trim()));
  }
  /**
   * Remove RTL-aware classes from an element
   */
  static removeRTLClasses(e, t) {
    const n = this.transformDirectionalClasses(t);
    e.classList.remove(...n.split(" ").filter((i) => i.trim()));
  }
  /**
   * Listen for direction changes and clear cache
   */
  static observeDirectionChanges() {
    const e = new MutationObserver((t) => {
      for (const n of t)
        if (n.type === "attributes" && (n.attributeName === "dir" || n.attributeName === "lang")) {
          this.clearCache(), document.dispatchEvent(new CustomEvent("keys:direction-change", {
            detail: { isRTL: this.isRTL() }
          }));
          break;
        }
    });
    e.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["dir", "lang"]
    }), e.observe(document.body, {
      attributes: !0,
      attributeFilter: ["dir", "lang"]
    });
  }
  /**
   * Get dropdown positioning for RTL
   */
  static getDropdownPosition(e, t) {
    let n = e, i = t;
    return this.isRTL() && (n === "left" ? n = "right" : n === "right" && (n = "left"), (e === "top" || e === "bottom") && (t === "start" ? i = "end" : t === "end" && (i = "start"))), { position: n, align: i };
  }
  /**
   * Initialize RTL support globally
   */
  static initialize() {
    this.isRTL() ? (document.documentElement.classList.add("rtl"), document.documentElement.setAttribute("dir", "rtl")) : (document.documentElement.classList.add("ltr"), document.documentElement.setAttribute("dir", "ltr")), this.observeDirectionChanges();
    const e = document.createElement("style");
    e.textContent = `
            :root {
                --direction-factor: ${this.isRTL() ? "-1" : "1"};
                --text-align-start: ${this.isRTL() ? "right" : "left"};
                --text-align-end: ${this.isRTL() ? "left" : "right"};
            }
        `, document.head.appendChild(e);
  }
};
ru.cachedDirection = null;
let _l = ru;
var Rw = Object.defineProperty, zw = Object.defineProperties, Pw = Object.getOwnPropertyDescriptors, ld = Object.getOwnPropertySymbols, Bw = Object.prototype.hasOwnProperty, Fw = Object.prototype.propertyIsEnumerable, cd = (r, e, t) => e in r ? Rw(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, H = (r, e) => {
  for (var t in e || (e = {}))
    Bw.call(e, t) && cd(r, t, e[t]);
  if (ld)
    for (var t of ld(e))
      Fw.call(e, t) && cd(r, t, e[t]);
  return r;
}, _e = (r, e) => zw(r, Pw(e)), ge = (r, e, t) => new Promise((n, i) => {
  var s = (l) => {
    try {
      o(t.next(l));
    } catch (c) {
      i(c);
    }
  }, a = (l) => {
    try {
      o(t.throw(l));
    } catch (c) {
      i(c);
    }
  }, o = (l) => l.done ? n(l.value) : Promise.resolve(l.value).then(s, a);
  o((t = t.apply(r, e)).next());
});
const ql = Math.min, Dr = Math.max, ta = Math.round, Os = Math.floor, An = (r) => ({
  x: r,
  y: r
});
function $w(r, e) {
  return typeof r == "function" ? r(e) : r;
}
function jw(r) {
  return H({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, r);
}
function Uw(r) {
  return typeof r != "number" ? jw(r) : {
    top: r,
    right: r,
    bottom: r,
    left: r
  };
}
function na(r) {
  const {
    x: e,
    y: t,
    width: n,
    height: i
  } = r;
  return {
    width: n,
    height: i,
    top: t,
    left: e,
    right: e + n,
    bottom: t + i,
    x: e,
    y: t
  };
}
function Hw(r, e) {
  return ge(this, null, function* () {
    var t;
    e === void 0 && (e = {});
    const {
      x: n,
      y: i,
      platform: s,
      rects: a,
      elements: o,
      strategy: l
    } = r, {
      boundary: c = "clippingAncestors",
      rootBoundary: d = "viewport",
      elementContext: f = "floating",
      altBoundary: h = !1,
      padding: g = 0
    } = $w(e, r), m = Uw(g), b = o[h ? f === "floating" ? "reference" : "floating" : f], k = na(yield s.getClippingRect({
      element: (t = yield s.isElement == null ? void 0 : s.isElement(b)) == null || t ? b : b.contextElement || (yield s.getDocumentElement == null ? void 0 : s.getDocumentElement(o.floating)),
      boundary: c,
      rootBoundary: d,
      strategy: l
    })), y = f === "floating" ? {
      x: n,
      y: i,
      width: a.floating.width,
      height: a.floating.height
    } : a.reference, S = yield s.getOffsetParent == null ? void 0 : s.getOffsetParent(o.floating), E = (yield s.isElement == null ? void 0 : s.isElement(S)) ? (yield s.getScale == null ? void 0 : s.getScale(S)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    }, C = na(s.convertOffsetParentRelativeRectToViewportRelativeRect ? yield s.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements: o,
      rect: y,
      offsetParent: S,
      strategy: l
    }) : y);
    return {
      top: (k.top - C.top + m.top) / E.y,
      bottom: (C.bottom - k.bottom + m.bottom) / E.y,
      left: (k.left - C.left + m.left) / E.x,
      right: (C.right - k.right + m.right) / E.x
    };
  });
}
function Wr(r) {
  return $f(r) ? (r.nodeName || "").toLowerCase() : "#document";
}
function Ke(r) {
  var e;
  return (r == null || (e = r.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function un(r) {
  var e;
  return (e = ($f(r) ? r.ownerDocument : r.document) || window.document) == null ? void 0 : e.documentElement;
}
function $f(r) {
  return r instanceof Node || r instanceof Ke(r).Node;
}
function Ht(r) {
  return r instanceof Element || r instanceof Ke(r).Element;
}
function Vt(r) {
  return r instanceof HTMLElement || r instanceof Ke(r).HTMLElement;
}
function ud(r) {
  return typeof ShadowRoot > "u" ? !1 : r instanceof ShadowRoot || r instanceof Ke(r).ShadowRoot;
}
function Qi(r) {
  const {
    overflow: e,
    overflowX: t,
    overflowY: n,
    display: i
  } = kt(r);
  return /auto|scroll|overlay|hidden|clip/.test(e + n + t) && !["inline", "contents"].includes(i);
}
function Vw(r) {
  return ["table", "td", "th"].includes(Wr(r));
}
function Aa(r) {
  return [":popover-open", ":modal"].some((e) => {
    try {
      return r.matches(e);
    } catch {
      return !1;
    }
  });
}
function _c(r) {
  const e = qc(), t = kt(r);
  return t.transform !== "none" || t.perspective !== "none" || (t.containerType ? t.containerType !== "normal" : !1) || !e && (t.backdropFilter ? t.backdropFilter !== "none" : !1) || !e && (t.filter ? t.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((n) => (t.willChange || "").includes(n)) || ["paint", "layout", "strict", "content"].some((n) => (t.contain || "").includes(n));
}
function Yw(r) {
  let e = En(r);
  for (; Vt(e) && !Ur(e); ) {
    if (Aa(e))
      return null;
    if (_c(e))
      return e;
    e = En(e);
  }
  return null;
}
function qc() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Ur(r) {
  return ["html", "body", "#document"].includes(Wr(r));
}
function kt(r) {
  return Ke(r).getComputedStyle(r);
}
function Ea(r) {
  return Ht(r) ? {
    scrollLeft: r.scrollLeft,
    scrollTop: r.scrollTop
  } : {
    scrollLeft: r.scrollX,
    scrollTop: r.scrollY
  };
}
function En(r) {
  if (Wr(r) === "html")
    return r;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    r.assignedSlot || // DOM Element detected.
    r.parentNode || // ShadowRoot detected.
    ud(r) && r.host || // Fallback.
    un(r)
  );
  return ud(e) ? e.host : e;
}
function jf(r) {
  const e = En(r);
  return Ur(e) ? r.ownerDocument ? r.ownerDocument.body : r.body : Vt(e) && Qi(e) ? e : jf(e);
}
function ji(r, e, t) {
  var n;
  e === void 0 && (e = []), t === void 0 && (t = !0);
  const i = jf(r), s = i === ((n = r.ownerDocument) == null ? void 0 : n.body), a = Ke(i);
  return s ? e.concat(a, a.visualViewport || [], Qi(i) ? i : [], a.frameElement && t ? ji(a.frameElement) : []) : e.concat(i, ji(i, [], t));
}
function Uf(r) {
  const e = kt(r);
  let t = parseFloat(e.width) || 0, n = parseFloat(e.height) || 0;
  const i = Vt(r), s = i ? r.offsetWidth : t, a = i ? r.offsetHeight : n, o = ta(t) !== s || ta(n) !== a;
  return o && (t = s, n = a), {
    width: t,
    height: n,
    $: o
  };
}
function Rc(r) {
  return Ht(r) ? r : r.contextElement;
}
function Ir(r) {
  const e = Rc(r);
  if (!Vt(e))
    return An(1);
  const t = e.getBoundingClientRect(), {
    width: n,
    height: i,
    $: s
  } = Uf(e);
  let a = (s ? ta(t.width) : t.width) / n, o = (s ? ta(t.height) : t.height) / i;
  return (!a || !Number.isFinite(a)) && (a = 1), (!o || !Number.isFinite(o)) && (o = 1), {
    x: a,
    y: o
  };
}
const Kw = /* @__PURE__ */ An(0);
function Hf(r) {
  const e = Ke(r);
  return !qc() || !e.visualViewport ? Kw : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Gw(r, e, t) {
  return e === void 0 && (e = !1), !t || e && t !== Ke(r) ? !1 : e;
}
function Kn(r, e, t, n) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  const i = r.getBoundingClientRect(), s = Rc(r);
  let a = An(1);
  e && (n ? Ht(n) && (a = Ir(n)) : a = Ir(r));
  const o = Gw(s, t, n) ? Hf(s) : An(0);
  let l = (i.left + o.x) / a.x, c = (i.top + o.y) / a.y, d = i.width / a.x, f = i.height / a.y;
  if (s) {
    const h = Ke(s), g = n && Ht(n) ? Ke(n) : n;
    let m = h, b = m.frameElement;
    for (; b && n && g !== m; ) {
      const k = Ir(b), y = b.getBoundingClientRect(), S = kt(b), E = y.left + (b.clientLeft + parseFloat(S.paddingLeft)) * k.x, C = y.top + (b.clientTop + parseFloat(S.paddingTop)) * k.y;
      l *= k.x, c *= k.y, d *= k.x, f *= k.y, l += E, c += C, m = Ke(b), b = m.frameElement;
    }
  }
  return na({
    width: d,
    height: f,
    x: l,
    y: c
  });
}
function Ww(r) {
  let {
    elements: e,
    rect: t,
    offsetParent: n,
    strategy: i
  } = r;
  const s = i === "fixed", a = un(n), o = e ? Aa(e.floating) : !1;
  if (n === a || o && s)
    return t;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = An(1);
  const d = An(0), f = Vt(n);
  if ((f || !f && !s) && ((Wr(n) !== "body" || Qi(a)) && (l = Ea(n)), Vt(n))) {
    const h = Kn(n);
    c = Ir(n), d.x = h.x + n.clientLeft, d.y = h.y + n.clientTop;
  }
  return {
    width: t.width * c.x,
    height: t.height * c.y,
    x: t.x * c.x - l.scrollLeft * c.x + d.x,
    y: t.y * c.y - l.scrollTop * c.y + d.y
  };
}
function Zw(r) {
  return Array.from(r.getClientRects());
}
function Vf(r) {
  return Kn(un(r)).left + Ea(r).scrollLeft;
}
function Xw(r) {
  const e = un(r), t = Ea(r), n = r.ownerDocument.body, i = Dr(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), s = Dr(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
  let a = -t.scrollLeft + Vf(r);
  const o = -t.scrollTop;
  return kt(n).direction === "rtl" && (a += Dr(e.clientWidth, n.clientWidth) - i), {
    width: i,
    height: s,
    x: a,
    y: o
  };
}
function Qw(r, e) {
  const t = Ke(r), n = un(r), i = t.visualViewport;
  let s = n.clientWidth, a = n.clientHeight, o = 0, l = 0;
  if (i) {
    s = i.width, a = i.height;
    const c = qc();
    (!c || c && e === "fixed") && (o = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: s,
    height: a,
    x: o,
    y: l
  };
}
function Jw(r, e) {
  const t = Kn(r, !0, e === "fixed"), n = t.top + r.clientTop, i = t.left + r.clientLeft, s = Vt(r) ? Ir(r) : An(1), a = r.clientWidth * s.x, o = r.clientHeight * s.y, l = i * s.x, c = n * s.y;
  return {
    width: a,
    height: o,
    x: l,
    y: c
  };
}
function dd(r, e, t) {
  let n;
  if (e === "viewport")
    n = Qw(r, t);
  else if (e === "document")
    n = Xw(un(r));
  else if (Ht(e))
    n = Jw(e, t);
  else {
    const i = Hf(r);
    n = _e(H({}, e), {
      x: e.x - i.x,
      y: e.y - i.y
    });
  }
  return na(n);
}
function Yf(r, e) {
  const t = En(r);
  return t === e || !Ht(t) || Ur(t) ? !1 : kt(t).position === "fixed" || Yf(t, e);
}
function ek(r, e) {
  const t = e.get(r);
  if (t)
    return t;
  let n = ji(r, [], !1).filter((o) => Ht(o) && Wr(o) !== "body"), i = null;
  const s = kt(r).position === "fixed";
  let a = s ? En(r) : r;
  for (; Ht(a) && !Ur(a); ) {
    const o = kt(a), l = _c(a);
    !l && o.position === "fixed" && (i = null), (s ? !l && !i : !l && o.position === "static" && i && ["absolute", "fixed"].includes(i.position) || Qi(a) && !l && Yf(r, a)) ? n = n.filter((c) => c !== a) : i = o, a = En(a);
  }
  return e.set(r, n), n;
}
function tk(r) {
  let {
    element: e,
    boundary: t,
    rootBoundary: n,
    strategy: i
  } = r;
  const s = [...t === "clippingAncestors" ? Aa(e) ? [] : ek(e, this._c) : [].concat(t), n], a = s[0], o = s.reduce((l, c) => {
    const d = dd(e, c, i);
    return l.top = Dr(d.top, l.top), l.right = ql(d.right, l.right), l.bottom = ql(d.bottom, l.bottom), l.left = Dr(d.left, l.left), l;
  }, dd(e, a, i));
  return {
    width: o.right - o.left,
    height: o.bottom - o.top,
    x: o.left,
    y: o.top
  };
}
function nk(r) {
  const {
    width: e,
    height: t
  } = Uf(r);
  return {
    width: e,
    height: t
  };
}
function rk(r, e, t) {
  const n = Vt(e), i = un(e), s = t === "fixed", a = Kn(r, !0, s, e);
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = An(0);
  if (n || !n && !s)
    if ((Wr(e) !== "body" || Qi(i)) && (o = Ea(e)), n) {
      const f = Kn(e, !0, s, e);
      l.x = f.x + e.clientLeft, l.y = f.y + e.clientTop;
    } else i && (l.x = Vf(i));
  const c = a.left + o.scrollLeft - l.x, d = a.top + o.scrollTop - l.y;
  return {
    x: c,
    y: d,
    width: a.width,
    height: a.height
  };
}
function Po(r) {
  return kt(r).position === "static";
}
function hd(r, e) {
  return !Vt(r) || kt(r).position === "fixed" ? null : e ? e(r) : r.offsetParent;
}
function Kf(r, e) {
  const t = Ke(r);
  if (Aa(r))
    return t;
  if (!Vt(r)) {
    let i = En(r);
    for (; i && !Ur(i); ) {
      if (Ht(i) && !Po(i))
        return i;
      i = En(i);
    }
    return t;
  }
  let n = hd(r, e);
  for (; n && Vw(n) && Po(n); )
    n = hd(n, e);
  return n && Ur(n) && Po(n) && !_c(n) ? t : n || Yw(r) || t;
}
const ik = function(r) {
  return ge(this, null, function* () {
    const e = this.getOffsetParent || Kf, t = this.getDimensions, n = yield t(r.floating);
    return {
      reference: rk(r.reference, yield e(r.floating), r.strategy),
      floating: {
        x: 0,
        y: 0,
        width: n.width,
        height: n.height
      }
    };
  });
};
function sk(r) {
  return kt(r).direction === "rtl";
}
const nt = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ww,
  getDocumentElement: un,
  getClippingRect: tk,
  getOffsetParent: Kf,
  getElementRects: ik,
  getClientRects: Zw,
  getDimensions: nk,
  getScale: Ir,
  isElement: Ht,
  isRTL: sk
};
function ak(r, e) {
  let t = null, n;
  const i = un(r);
  function s() {
    var o;
    clearTimeout(n), (o = t) == null || o.disconnect(), t = null;
  }
  function a(o, l) {
    o === void 0 && (o = !1), l === void 0 && (l = 1), s();
    const {
      left: c,
      top: d,
      width: f,
      height: h
    } = r.getBoundingClientRect();
    if (o || e(), !f || !h)
      return;
    const g = Os(d), m = Os(i.clientWidth - (c + f)), b = Os(i.clientHeight - (d + h)), k = Os(c), y = {
      rootMargin: -g + "px " + -m + "px " + -b + "px " + -k + "px",
      threshold: Dr(0, ql(1, l)) || 1
    };
    let S = !0;
    function E(C) {
      const D = C[0].intersectionRatio;
      if (D !== l) {
        if (!S)
          return a();
        D ? a(!1, D) : n = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      S = !1;
    }
    try {
      t = new IntersectionObserver(E, _e(H({}, y), {
        // Handle <iframe>s
        root: i.ownerDocument
      }));
    } catch {
      t = new IntersectionObserver(E, y);
    }
    t.observe(r);
  }
  return a(!0), s;
}
function Gf(r, e, t, n) {
  n === void 0 && (n = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: o = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = n, c = Rc(r), d = i || s ? [...c ? ji(c) : [], ...ji(e)] : [];
  d.forEach((y) => {
    i && y.addEventListener("scroll", t, {
      passive: !0
    }), s && y.addEventListener("resize", t);
  });
  const f = c && o ? ak(c, t) : null;
  let h = -1, g = null;
  a && (g = new ResizeObserver((y) => {
    let [S] = y;
    S && S.target === c && g && (g.unobserve(e), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var E;
      (E = g) == null || E.observe(e);
    })), t();
  }), c && !l && g.observe(c), g.observe(e));
  let m, b = l ? Kn(r) : null;
  l && k();
  function k() {
    const y = Kn(r);
    b && (y.x !== b.x || y.y !== b.y || y.width !== b.width || y.height !== b.height) && t(), b = y, m = requestAnimationFrame(k);
  }
  return t(), () => {
    var y;
    d.forEach((S) => {
      i && S.removeEventListener("scroll", t), s && S.removeEventListener("resize", t);
    }), f == null || f(), (y = g) == null || y.disconnect(), g = null, l && cancelAnimationFrame(m);
  };
}
const ok = Hw, Bo = 0, R = 1, G = 2, pe = 3, ae = 4, Gt = 5, Ca = 6, Le = 7, Fe = 8, K = 9, $ = 10, le = 11, Y = 12, ce = 13, Ji = 14, $e = 15, Oe = 16, je = 17, Wt = 18, We = 19, xt = 20, ve = 21, te = 22, Ne = 23, st = 24, Re = 25, lk = 0;
function we(r) {
  return r >= 48 && r <= 57;
}
function Cn(r) {
  return we(r) || // 0 .. 9
  r >= 65 && r <= 70 || // A .. F
  r >= 97 && r <= 102;
}
function zc(r) {
  return r >= 65 && r <= 90;
}
function ck(r) {
  return r >= 97 && r <= 122;
}
function uk(r) {
  return zc(r) || ck(r);
}
function dk(r) {
  return r >= 128;
}
function ra(r) {
  return uk(r) || dk(r) || r === 95;
}
function Wf(r) {
  return ra(r) || we(r) || r === 45;
}
function hk(r) {
  return r >= 0 && r <= 8 || r === 11 || r >= 14 && r <= 31 || r === 127;
}
function ia(r) {
  return r === 10 || r === 13 || r === 12;
}
function Gn(r) {
  return ia(r) || r === 32 || r === 9;
}
function Bt(r, e) {
  return !(r !== 92 || ia(e) || e === lk);
}
function Us(r, e, t) {
  return r === 45 ? ra(e) || e === 45 || Bt(e, t) : ra(r) ? !0 : r === 92 ? Bt(r, e) : !1;
}
function Fo(r, e, t) {
  return r === 43 || r === 45 ? we(e) ? 2 : e === 46 && we(t) ? 3 : 0 : r === 46 ? we(e) ? 2 : 0 : we(r) ? 1 : 0;
}
function Zf(r) {
  return r === 65279 || r === 65534 ? 1 : 0;
}
const Rl = new Array(128), fk = 128, Hs = 130, Xf = 131, Pc = 132, Qf = 133;
for (let r = 0; r < Rl.length; r++)
  Rl[r] = Gn(r) && Hs || we(r) && Xf || ra(r) && Pc || hk(r) && Qf || r || fk;
function $o(r) {
  return r < 128 ? Rl[r] : Pc;
}
function Or(r, e) {
  return e < r.length ? r.charCodeAt(e) : 0;
}
function zl(r, e, t) {
  return t === 13 && Or(r, e + 1) === 10 ? 2 : 1;
}
function Nr(r, e, t) {
  let n = r.charCodeAt(e);
  return zc(n) && (n = n | 32), n === t;
}
function Ui(r, e, t, n) {
  if (t - e !== n.length || e < 0 || t > r.length)
    return !1;
  for (let i = e; i < t; i++) {
    const s = n.charCodeAt(i - e);
    let a = r.charCodeAt(i);
    if (zc(a) && (a = a | 32), a !== s)
      return !1;
  }
  return !0;
}
function pk(r, e) {
  for (; e >= 0 && Gn(r.charCodeAt(e)); e--)
    ;
  return e + 1;
}
function Ns(r, e) {
  for (; e < r.length && Gn(r.charCodeAt(e)); e++)
    ;
  return e;
}
function jo(r, e) {
  for (; e < r.length && we(r.charCodeAt(e)); e++)
    ;
  return e;
}
function Hr(r, e) {
  if (e += 2, Cn(Or(r, e - 1))) {
    for (const n = Math.min(r.length, e + 5); e < n && Cn(Or(r, e)); e++)
      ;
    const t = Or(r, e);
    Gn(t) && (e += zl(r, e, t));
  }
  return e;
}
function Ms(r, e) {
  for (; e < r.length; e++) {
    const t = r.charCodeAt(e);
    if (!Wf(t)) {
      if (Bt(t, Or(r, e + 1))) {
        e = Hr(r, e) - 1;
        continue;
      }
      break;
    }
  }
  return e;
}
function Ta(r, e) {
  let t = r.charCodeAt(e);
  if ((t === 43 || t === 45) && (t = r.charCodeAt(e += 1)), we(t) && (e = jo(r, e + 1), t = r.charCodeAt(e)), t === 46 && we(r.charCodeAt(e + 1)) && (e += 2, e = jo(r, e)), Nr(
    r,
    e,
    101
    /* e */
  )) {
    let n = 0;
    t = r.charCodeAt(e + 1), (t === 45 || t === 43) && (n = 1, t = r.charCodeAt(e + 2)), we(t) && (e = jo(r, e + 1 + n + 1));
  }
  return e;
}
function Uo(r, e) {
  for (; e < r.length; e++) {
    const t = r.charCodeAt(e);
    if (t === 41) {
      e++;
      break;
    }
    Bt(t, Or(r, e + 1)) && (e = Hr(r, e));
  }
  return e;
}
function Jf(r) {
  if (r.length === 1 && !Cn(r.charCodeAt(0)))
    return r[0];
  let e = parseInt(r, 16);
  return (e === 0 || // If this number is zero,
  e >= 55296 && e <= 57343 || // or is for a surrogate,
  e > 1114111) && (e = 65533), String.fromCodePoint(e);
}
const ep = [
  "EOF-token",
  "ident-token",
  "function-token",
  "at-keyword-token",
  "hash-token",
  "string-token",
  "bad-string-token",
  "url-token",
  "bad-url-token",
  "delim-token",
  "number-token",
  "percentage-token",
  "dimension-token",
  "whitespace-token",
  "CDO-token",
  "CDC-token",
  "colon-token",
  "semicolon-token",
  "comma-token",
  "[-token",
  "]-token",
  "(-token",
  ")-token",
  "{-token",
  "}-token"
], gk = 16 * 1024;
function sa(r = null, e) {
  return r === null || r.length < e ? new Uint32Array(Math.max(e + 1024, gk)) : r;
}
const fd = 10, mk = 12, pd = 13;
function gd(r) {
  const e = r.source, t = e.length, n = e.length > 0 ? Zf(e.charCodeAt(0)) : 0, i = sa(r.lines, t), s = sa(r.columns, t);
  let a = r.startLine, o = r.startColumn;
  for (let l = n; l < t; l++) {
    const c = e.charCodeAt(l);
    i[l] = a, s[l] = o++, (c === fd || c === pd || c === mk) && (c === pd && l + 1 < t && e.charCodeAt(l + 1) === fd && (l++, i[l] = a, s[l] = o), a++, o = 1);
  }
  i[t] = a, s[t] = o, r.lines = i, r.columns = s, r.computed = !0;
}
class bk {
  constructor() {
    this.lines = null, this.columns = null, this.computed = !1;
  }
  setSource(e, t = 0, n = 1, i = 1) {
    this.source = e, this.startOffset = t, this.startLine = n, this.startColumn = i, this.computed = !1;
  }
  getLocation(e, t) {
    return this.computed || gd(this), {
      source: t,
      offset: this.startOffset + e,
      line: this.lines[e],
      column: this.columns[e]
    };
  }
  getLocationRange(e, t, n) {
    return this.computed || gd(this), {
      source: n,
      start: {
        offset: this.startOffset + e,
        line: this.lines[e],
        column: this.columns[e]
      },
      end: {
        offset: this.startOffset + t,
        line: this.lines[t],
        column: this.columns[t]
      }
    };
  }
}
const Xe = 16777215, pn = 24, yk = /* @__PURE__ */ new Map([
  [G, te],
  [ve, te],
  [We, xt],
  [Ne, st]
]);
class vk {
  constructor(e, t) {
    this.setSource(e, t);
  }
  reset() {
    this.eof = !1, this.tokenIndex = -1, this.tokenType = 0, this.tokenStart = this.firstCharOffset, this.tokenEnd = this.firstCharOffset;
  }
  setSource(e = "", t = () => {
  }) {
    e = String(e || "");
    const n = e.length, i = sa(this.offsetAndType, e.length + 1), s = sa(this.balance, e.length + 1);
    let a = 0, o = 0, l = 0, c = -1;
    for (this.offsetAndType = null, this.balance = null, t(e, (d, f, h) => {
      switch (d) {
        default:
          s[a] = n;
          break;
        case o: {
          let g = l & Xe;
          for (l = s[g], o = l >> pn, s[a] = g, s[g++] = a; g < a; g++)
            s[g] === n && (s[g] = a);
          break;
        }
        case ve:
        case G:
        case We:
        case Ne:
          s[a] = l, o = yk.get(d), l = o << pn | a;
          break;
      }
      i[a++] = d << pn | h, c === -1 && (c = f);
    }), i[a] = Bo << pn | n, s[a] = n, s[n] = n; l !== 0; ) {
      const d = l & Xe;
      l = s[d], s[d] = n;
    }
    this.source = e, this.firstCharOffset = c === -1 ? 0 : c, this.tokenCount = a, this.offsetAndType = i, this.balance = s, this.reset(), this.next();
  }
  lookupType(e) {
    return e += this.tokenIndex, e < this.tokenCount ? this.offsetAndType[e] >> pn : Bo;
  }
  lookupOffset(e) {
    return e += this.tokenIndex, e < this.tokenCount ? this.offsetAndType[e - 1] & Xe : this.source.length;
  }
  lookupValue(e, t) {
    return e += this.tokenIndex, e < this.tokenCount ? Ui(
      this.source,
      this.offsetAndType[e - 1] & Xe,
      this.offsetAndType[e] & Xe,
      t
    ) : !1;
  }
  getTokenStart(e) {
    return e === this.tokenIndex ? this.tokenStart : e > 0 ? e < this.tokenCount ? this.offsetAndType[e - 1] & Xe : this.offsetAndType[this.tokenCount] & Xe : this.firstCharOffset;
  }
  substrToCursor(e) {
    return this.source.substring(e, this.tokenStart);
  }
  isBalanceEdge(e) {
    return this.balance[this.tokenIndex] < e;
  }
  isDelim(e, t) {
    return t ? this.lookupType(t) === K && this.source.charCodeAt(this.lookupOffset(t)) === e : this.tokenType === K && this.source.charCodeAt(this.tokenStart) === e;
  }
  skip(e) {
    let t = this.tokenIndex + e;
    t < this.tokenCount ? (this.tokenIndex = t, this.tokenStart = this.offsetAndType[t - 1] & Xe, t = this.offsetAndType[t], this.tokenType = t >> pn, this.tokenEnd = t & Xe) : (this.tokenIndex = this.tokenCount, this.next());
  }
  next() {
    let e = this.tokenIndex + 1;
    e < this.tokenCount ? (this.tokenIndex = e, this.tokenStart = this.tokenEnd, e = this.offsetAndType[e], this.tokenType = e >> pn, this.tokenEnd = e & Xe) : (this.eof = !0, this.tokenIndex = this.tokenCount, this.tokenType = Bo, this.tokenStart = this.tokenEnd = this.source.length);
  }
  skipSC() {
    for (; this.tokenType === ce || this.tokenType === Re; )
      this.next();
  }
  skipUntilBalanced(e, t) {
    let n = e, i, s;
    e:
      for (; n < this.tokenCount; n++) {
        if (i = this.balance[n], i < e)
          break e;
        switch (s = n > 0 ? this.offsetAndType[n - 1] & Xe : this.firstCharOffset, t(this.source.charCodeAt(s))) {
          case 1:
            break e;
          case 2:
            n++;
            break e;
          default:
            this.balance[i] === n && (n = i);
        }
      }
    this.skip(n - this.tokenIndex);
  }
  forEachToken(e) {
    for (let t = 0, n = this.firstCharOffset; t < this.tokenCount; t++) {
      const i = n, s = this.offsetAndType[t], a = s & Xe, o = s >> pn;
      n = a, e(o, i, a, t);
    }
  }
  dump() {
    const e = new Array(this.tokenCount);
    return this.forEachToken((t, n, i, s) => {
      e[s] = {
        idx: s,
        type: ep[t],
        chunk: this.source.substring(n, i),
        balance: this.balance[s]
      };
    }), e;
  }
}
function La(r, e) {
  function t(f) {
    return f < o ? r.charCodeAt(f) : 0;
  }
  function n() {
    if (c = Ta(r, c), Us(t(c), t(c + 1), t(c + 2))) {
      d = Y, c = Ms(r, c);
      return;
    }
    if (t(c) === 37) {
      d = le, c++;
      return;
    }
    d = $;
  }
  function i() {
    const f = c;
    if (c = Ms(r, c), Ui(r, f, c, "url") && t(c) === 40) {
      if (c = Ns(r, c + 1), t(c) === 34 || t(c) === 39) {
        d = G, c = f + 4;
        return;
      }
      a();
      return;
    }
    if (t(c) === 40) {
      d = G, c++;
      return;
    }
    d = R;
  }
  function s(f) {
    for (f || (f = t(c++)), d = Gt; c < r.length; c++) {
      const h = r.charCodeAt(c);
      switch ($o(h)) {
        case f:
          c++;
          return;
        case Hs:
          if (ia(h)) {
            c += zl(r, c, h), d = Ca;
            return;
          }
          break;
        case 92:
          if (c === r.length - 1)
            break;
          const g = t(c + 1);
          ia(g) ? c += zl(r, c + 1, g) : Bt(h, g) && (c = Hr(r, c) - 1);
          break;
      }
    }
  }
  function a() {
    for (d = Le, c = Ns(r, c); c < r.length; c++) {
      const f = r.charCodeAt(c);
      switch ($o(f)) {
        case 41:
          c++;
          return;
        case Hs:
          if (c = Ns(r, c), t(c) === 41 || c >= r.length) {
            c < r.length && c++;
            return;
          }
          c = Uo(r, c), d = Fe;
          return;
        case 34:
        case 39:
        case 40:
        case Qf:
          c = Uo(r, c), d = Fe;
          return;
        case 92:
          if (Bt(f, t(c + 1))) {
            c = Hr(r, c) - 1;
            break;
          }
          c = Uo(r, c), d = Fe;
          return;
      }
    }
  }
  r = String(r || "");
  const o = r.length;
  let l = Zf(t(0)), c = l, d;
  for (; c < o; ) {
    const f = r.charCodeAt(c);
    switch ($o(f)) {
      case Hs:
        d = ce, c = Ns(r, c + 1);
        break;
      case 34:
        s();
        break;
      case 35:
        Wf(t(c + 1)) || Bt(t(c + 1), t(c + 2)) ? (d = ae, c = Ms(r, c + 1)) : (d = K, c++);
        break;
      case 39:
        s();
        break;
      case 40:
        d = ve, c++;
        break;
      case 41:
        d = te, c++;
        break;
      case 43:
        Fo(f, t(c + 1), t(c + 2)) ? n() : (d = K, c++);
        break;
      case 44:
        d = Wt, c++;
        break;
      case 45:
        Fo(f, t(c + 1), t(c + 2)) ? n() : t(c + 1) === 45 && t(c + 2) === 62 ? (d = $e, c = c + 3) : Us(f, t(c + 1), t(c + 2)) ? i() : (d = K, c++);
        break;
      case 46:
        Fo(f, t(c + 1), t(c + 2)) ? n() : (d = K, c++);
        break;
      case 47:
        t(c + 1) === 42 ? (d = Re, c = r.indexOf("*/", c + 2), c = c === -1 ? r.length : c + 2) : (d = K, c++);
        break;
      case 58:
        d = Oe, c++;
        break;
      case 59:
        d = je, c++;
        break;
      case 60:
        t(c + 1) === 33 && t(c + 2) === 45 && t(c + 3) === 45 ? (d = Ji, c = c + 4) : (d = K, c++);
        break;
      case 64:
        Us(t(c + 1), t(c + 2), t(c + 3)) ? (d = pe, c = Ms(r, c + 1)) : (d = K, c++);
        break;
      case 91:
        d = We, c++;
        break;
      case 92:
        Bt(f, t(c + 1)) ? i() : (d = K, c++);
        break;
      case 93:
        d = xt, c++;
        break;
      case 123:
        d = Ne, c++;
        break;
      case 125:
        d = st, c++;
        break;
      case Xf:
        n();
        break;
      case Pc:
        i();
        break;
      default:
        d = K, c++;
    }
    e(d, l, l = c);
  }
}
let pr = null;
class fe {
  static createItem(e) {
    return {
      prev: null,
      next: null,
      data: e
    };
  }
  constructor() {
    this.head = null, this.tail = null, this.cursor = null;
  }
  createItem(e) {
    return fe.createItem(e);
  }
  // cursor helpers
  allocateCursor(e, t) {
    let n;
    return pr !== null ? (n = pr, pr = pr.cursor, n.prev = e, n.next = t, n.cursor = this.cursor) : n = {
      prev: e,
      next: t,
      cursor: this.cursor
    }, this.cursor = n, n;
  }
  releaseCursor() {
    const { cursor: e } = this;
    this.cursor = e.cursor, e.prev = null, e.next = null, e.cursor = pr, pr = e;
  }
  updateCursors(e, t, n, i) {
    let { cursor: s } = this;
    for (; s !== null; )
      s.prev === e && (s.prev = t), s.next === n && (s.next = i), s = s.cursor;
  }
  *[Symbol.iterator]() {
    for (let e = this.head; e !== null; e = e.next)
      yield e.data;
  }
  // getters
  get size() {
    let e = 0;
    for (let t = this.head; t !== null; t = t.next)
      e++;
    return e;
  }
  get isEmpty() {
    return this.head === null;
  }
  get first() {
    return this.head && this.head.data;
  }
  get last() {
    return this.tail && this.tail.data;
  }
  // convertors
  fromArray(e) {
    let t = null;
    this.head = null;
    for (let n of e) {
      const i = fe.createItem(n);
      t !== null ? t.next = i : this.head = i, i.prev = t, t = i;
    }
    return this.tail = t, this;
  }
  toArray() {
    return [...this];
  }
  toJSON() {
    return [...this];
  }
  // array-like methods
  forEach(e, t = this) {
    const n = this.allocateCursor(null, this.head);
    for (; n.next !== null; ) {
      const i = n.next;
      n.next = i.next, e.call(t, i.data, i, this);
    }
    this.releaseCursor();
  }
  forEachRight(e, t = this) {
    const n = this.allocateCursor(this.tail, null);
    for (; n.prev !== null; ) {
      const i = n.prev;
      n.prev = i.prev, e.call(t, i.data, i, this);
    }
    this.releaseCursor();
  }
  reduce(e, t, n = this) {
    let i = this.allocateCursor(null, this.head), s = t, a;
    for (; i.next !== null; )
      a = i.next, i.next = a.next, s = e.call(n, s, a.data, a, this);
    return this.releaseCursor(), s;
  }
  reduceRight(e, t, n = this) {
    let i = this.allocateCursor(this.tail, null), s = t, a;
    for (; i.prev !== null; )
      a = i.prev, i.prev = a.prev, s = e.call(n, s, a.data, a, this);
    return this.releaseCursor(), s;
  }
  some(e, t = this) {
    for (let n = this.head; n !== null; n = n.next)
      if (e.call(t, n.data, n, this))
        return !0;
    return !1;
  }
  map(e, t = this) {
    const n = new fe();
    for (let i = this.head; i !== null; i = i.next)
      n.appendData(e.call(t, i.data, i, this));
    return n;
  }
  filter(e, t = this) {
    const n = new fe();
    for (let i = this.head; i !== null; i = i.next)
      e.call(t, i.data, i, this) && n.appendData(i.data);
    return n;
  }
  nextUntil(e, t, n = this) {
    if (e === null)
      return;
    const i = this.allocateCursor(null, e);
    for (; i.next !== null; ) {
      const s = i.next;
      if (i.next = s.next, t.call(n, s.data, s, this))
        break;
    }
    this.releaseCursor();
  }
  prevUntil(e, t, n = this) {
    if (e === null)
      return;
    const i = this.allocateCursor(e, null);
    for (; i.prev !== null; ) {
      const s = i.prev;
      if (i.prev = s.prev, t.call(n, s.data, s, this))
        break;
    }
    this.releaseCursor();
  }
  // mutation
  clear() {
    this.head = null, this.tail = null;
  }
  copy() {
    const e = new fe();
    for (let t of this)
      e.appendData(t);
    return e;
  }
  prepend(e) {
    return this.updateCursors(null, e, this.head, e), this.head !== null ? (this.head.prev = e, e.next = this.head) : this.tail = e, this.head = e, this;
  }
  prependData(e) {
    return this.prepend(fe.createItem(e));
  }
  append(e) {
    return this.insert(e);
  }
  appendData(e) {
    return this.insert(fe.createItem(e));
  }
  insert(e, t = null) {
    if (t !== null)
      if (this.updateCursors(t.prev, e, t, e), t.prev === null) {
        if (this.head !== t)
          throw new Error("before doesn't belong to list");
        this.head = e, t.prev = e, e.next = t, this.updateCursors(null, e);
      } else
        t.prev.next = e, e.prev = t.prev, t.prev = e, e.next = t;
    else
      this.updateCursors(this.tail, e, null, e), this.tail !== null ? (this.tail.next = e, e.prev = this.tail) : this.head = e, this.tail = e;
    return this;
  }
  insertData(e, t) {
    return this.insert(fe.createItem(e), t);
  }
  remove(e) {
    if (this.updateCursors(e, e.prev, e, e.next), e.prev !== null)
      e.prev.next = e.next;
    else {
      if (this.head !== e)
        throw new Error("item doesn't belong to list");
      this.head = e.next;
    }
    if (e.next !== null)
      e.next.prev = e.prev;
    else {
      if (this.tail !== e)
        throw new Error("item doesn't belong to list");
      this.tail = e.prev;
    }
    return e.prev = null, e.next = null, e;
  }
  push(e) {
    this.insert(fe.createItem(e));
  }
  pop() {
    return this.tail !== null ? this.remove(this.tail) : null;
  }
  unshift(e) {
    this.prepend(fe.createItem(e));
  }
  shift() {
    return this.head !== null ? this.remove(this.head) : null;
  }
  prependList(e) {
    return this.insertList(e, this.head);
  }
  appendList(e) {
    return this.insertList(e);
  }
  insertList(e, t) {
    return e.head === null ? this : (t != null ? (this.updateCursors(t.prev, e.tail, t, e.head), t.prev !== null ? (t.prev.next = e.head, e.head.prev = t.prev) : this.head = e.head, t.prev = e.tail, e.tail.next = t) : (this.updateCursors(this.tail, e.tail, null, e.head), this.tail !== null ? (this.tail.next = e.head, e.head.prev = this.tail) : this.head = e.head, this.tail = e.tail), e.head = null, e.tail = null, this);
  }
  replace(e, t) {
    "head" in t ? this.insertList(t, e) : this.insert(t, e), this.remove(e);
  }
}
function Da(r, e) {
  const t = Object.create(SyntaxError.prototype), n = new Error();
  return Object.assign(t, {
    name: r,
    message: e,
    get stack() {
      return (n.stack || "").replace(/^(.+\n){1,3}/, `${r}: ${e}
`);
    }
  });
}
const Ho = 100, md = 60, bd = "    ";
function yd({ source: r, line: e, column: t }, n) {
  function i(d, f) {
    return s.slice(d, f).map(
      (h, g) => String(d + g + 1).padStart(l) + " |" + h
    ).join(`
`);
  }
  const s = r.split(/\r\n?|\n|\f/), a = Math.max(1, e - n) - 1, o = Math.min(e + n, s.length + 1), l = Math.max(4, String(o).length) + 1;
  let c = 0;
  t += (bd.length - 1) * (s[e - 1].substr(0, t - 1).match(/\t/g) || []).length, t > Ho && (c = t - md + 3, t = md - 2);
  for (let d = a; d <= o; d++)
    d >= 0 && d < s.length && (s[d] = s[d].replace(/\t/g, bd), s[d] = (c > 0 && s[d].length > c ? "…" : "") + s[d].substr(c, Ho - 2) + (s[d].length > c + Ho - 1 ? "…" : ""));
  return [
    i(a, e),
    new Array(t + l + 2).join("-") + "^",
    i(e, o)
  ].filter(Boolean).join(`
`);
}
function vd(r, e, t, n, i) {
  return Object.assign(Da("SyntaxError", r), {
    source: e,
    offset: t,
    line: n,
    column: i,
    sourceFragment(s) {
      return yd({ source: e, line: n, column: i }, isNaN(s) ? 0 : s);
    },
    get formattedMessage() {
      return `Parse error: ${r}
` + yd({ source: e, line: n, column: i }, 2);
    }
  });
}
function wk(r) {
  const e = this.createList();
  let t = !1;
  const n = {
    recognizer: r
  };
  for (; !this.eof; ) {
    switch (this.tokenType) {
      case Re:
        this.next();
        continue;
      case ce:
        t = !0, this.next();
        continue;
    }
    let i = r.getNode.call(this, n);
    if (i === void 0)
      break;
    t && (r.onWhiteSpace && r.onWhiteSpace.call(this, i, e, n), t = !1), e.push(i);
  }
  return t && r.onWhiteSpace && r.onWhiteSpace.call(this, null, e, n), e;
}
const wd = () => {
}, kk = 33, xk = 35, Vo = 59, kd = 123, xd = 0;
function Sk(r) {
  return function() {
    return this[r]();
  };
}
function Yo(r) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const t in r) {
    const n = r[t], i = n.parse || n;
    i && (e[t] = i);
  }
  return e;
}
function Ak(r) {
  const e = {
    context: /* @__PURE__ */ Object.create(null),
    scope: Object.assign(/* @__PURE__ */ Object.create(null), r.scope),
    atrule: Yo(r.atrule),
    pseudo: Yo(r.pseudo),
    node: Yo(r.node)
  };
  for (const t in r.parseContext)
    switch (typeof r.parseContext[t]) {
      case "function":
        e.context[t] = r.parseContext[t];
        break;
      case "string":
        e.context[t] = Sk(r.parseContext[t]);
        break;
    }
  return H(H({
    config: e
  }, e), e.node);
}
function Ek(r) {
  let e = "", t = "<unknown>", n = !1, i = wd, s = !1;
  const a = new bk(), o = Object.assign(new vk(), Ak(r || {}), {
    parseAtrulePrelude: !0,
    parseRulePrelude: !0,
    parseValue: !0,
    parseCustomProperty: !1,
    readSequence: wk,
    consumeUntilBalanceEnd: () => 0,
    consumeUntilLeftCurlyBracket(l) {
      return l === kd ? 1 : 0;
    },
    consumeUntilLeftCurlyBracketOrSemicolon(l) {
      return l === kd || l === Vo ? 1 : 0;
    },
    consumeUntilExclamationMarkOrSemicolon(l) {
      return l === kk || l === Vo ? 1 : 0;
    },
    consumeUntilSemicolonIncluded(l) {
      return l === Vo ? 2 : 0;
    },
    createList() {
      return new fe();
    },
    createSingleNodeList(l) {
      return new fe().appendData(l);
    },
    getFirstListNode(l) {
      return l && l.first;
    },
    getLastListNode(l) {
      return l && l.last;
    },
    parseWithFallback(l, c) {
      const d = this.tokenIndex;
      try {
        return l.call(this);
      } catch (f) {
        if (s)
          throw f;
        const h = c.call(this, d);
        return s = !0, i(f, h), s = !1, h;
      }
    },
    lookupNonWSType(l) {
      let c;
      do
        if (c = this.lookupType(l++), c !== ce)
          return c;
      while (c !== xd);
      return xd;
    },
    charCodeAt(l) {
      return l >= 0 && l < e.length ? e.charCodeAt(l) : 0;
    },
    substring(l, c) {
      return e.substring(l, c);
    },
    substrToCursor(l) {
      return this.source.substring(l, this.tokenStart);
    },
    cmpChar(l, c) {
      return Nr(e, l, c);
    },
    cmpStr(l, c, d) {
      return Ui(e, l, c, d);
    },
    consume(l) {
      const c = this.tokenStart;
      return this.eat(l), this.substrToCursor(c);
    },
    consumeFunctionName() {
      const l = e.substring(this.tokenStart, this.tokenEnd - 1);
      return this.eat(G), l;
    },
    consumeNumber(l) {
      const c = e.substring(this.tokenStart, Ta(e, this.tokenStart));
      return this.eat(l), c;
    },
    eat(l) {
      if (this.tokenType !== l) {
        const c = ep[l].slice(0, -6).replace(/-/g, " ").replace(/^./, (h) => h.toUpperCase());
        let d = `${/[[\](){}]/.test(c) ? `"${c}"` : c} is expected`, f = this.tokenStart;
        switch (l) {
          case R:
            this.tokenType === G || this.tokenType === Le ? (f = this.tokenEnd - 1, d = "Identifier is expected but function found") : d = "Identifier is expected";
            break;
          case ae:
            this.isDelim(xk) && (this.next(), f++, d = "Name is expected");
            break;
          case le:
            this.tokenType === $ && (f = this.tokenEnd, d = "Percent sign is expected");
            break;
        }
        this.error(d, f);
      }
      this.next();
    },
    eatIdent(l) {
      (this.tokenType !== R || this.lookupValue(0, l) === !1) && this.error(`Identifier "${l}" is expected`), this.next();
    },
    eatDelim(l) {
      this.isDelim(l) || this.error(`Delim "${String.fromCharCode(l)}" is expected`), this.next();
    },
    getLocation(l, c) {
      return n ? a.getLocationRange(
        l,
        c,
        t
      ) : null;
    },
    getLocationFromList(l) {
      if (n) {
        const c = this.getFirstListNode(l), d = this.getLastListNode(l);
        return a.getLocationRange(
          c !== null ? c.loc.start.offset - a.startOffset : this.tokenStart,
          d !== null ? d.loc.end.offset - a.startOffset : this.tokenStart,
          t
        );
      }
      return null;
    },
    error(l, c) {
      const d = typeof c < "u" && c < e.length ? a.getLocation(c) : this.eof ? a.getLocation(pk(e, e.length - 1)) : a.getLocation(this.tokenStart);
      throw new vd(
        l || "Unexpected input",
        e,
        d.offset,
        d.line,
        d.column
      );
    }
  });
  return Object.assign(function(l, c) {
    e = l, c = c || {}, o.setSource(e, La), a.setSource(
      e,
      c.offset,
      c.line,
      c.column
    ), t = c.filename || "<unknown>", n = !!c.positions, i = typeof c.onParseError == "function" ? c.onParseError : wd, s = !1, o.parseAtrulePrelude = "parseAtrulePrelude" in c ? !!c.parseAtrulePrelude : !0, o.parseRulePrelude = "parseRulePrelude" in c ? !!c.parseRulePrelude : !0, o.parseValue = "parseValue" in c ? !!c.parseValue : !0, o.parseCustomProperty = "parseCustomProperty" in c ? !!c.parseCustomProperty : !1;
    const { context: d = "default", onComment: f } = c;
    if (!(d in o.context))
      throw new Error("Unknown context `" + d + "`");
    typeof f == "function" && o.forEachToken((g, m, b) => {
      if (g === Re) {
        const k = o.getLocation(m, b), y = Ui(e, b - 2, b, "*/") ? e.slice(m + 2, b - 2) : e.slice(m + 2, b);
        f(y, k);
      }
    });
    const h = o.context[d].call(o, c);
    return o.eof || o.error(), h;
  }, {
    SyntaxError: vd,
    config: o.config
  });
}
var Bc = {}, Fc = {}, Sd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
Fc.encode = function(r) {
  if (0 <= r && r < Sd.length)
    return Sd[r];
  throw new TypeError("Must be between 0 and 63: " + r);
};
Fc.decode = function(r) {
  var e = 65, t = 90, n = 97, i = 122, s = 48, a = 57, o = 43, l = 47, c = 26, d = 52;
  return e <= r && r <= t ? r - e : n <= r && r <= i ? r - n + c : s <= r && r <= a ? r - s + d : r == o ? 62 : r == l ? 63 : -1;
};
var tp = Fc, $c = 5, np = 1 << $c, rp = np - 1, ip = np;
function Ck(r) {
  return r < 0 ? (-r << 1) + 1 : (r << 1) + 0;
}
function Tk(r) {
  var e = (r & 1) === 1, t = r >> 1;
  return e ? -t : t;
}
Bc.encode = function(r) {
  var e = "", t, n = Ck(r);
  do
    t = n & rp, n >>>= $c, n > 0 && (t |= ip), e += tp.encode(t);
  while (n > 0);
  return e;
};
Bc.decode = function(r, e, t) {
  var n = r.length, i = 0, s = 0, a, o;
  do {
    if (e >= n)
      throw new Error("Expected more digits in base 64 VLQ value.");
    if (o = tp.decode(r.charCodeAt(e++)), o === -1)
      throw new Error("Invalid base64 digit: " + r.charAt(e - 1));
    a = !!(o & ip), o &= rp, i = i + (o << s), s += $c;
  } while (a);
  t.value = Tk(i), t.rest = e;
};
var Ia = {};
(function(r) {
  function e(x, A, q) {
    if (A in x)
      return x[A];
    if (arguments.length === 3)
      return q;
    throw new Error('"' + A + '" is a required argument.');
  }
  r.getArg = e;
  var t = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, n = /^data:.+\,.+$/;
  function i(x) {
    var A = x.match(t);
    return A ? {
      scheme: A[1],
      auth: A[2],
      host: A[3],
      port: A[4],
      path: A[5]
    } : null;
  }
  r.urlParse = i;
  function s(x) {
    var A = "";
    return x.scheme && (A += x.scheme + ":"), A += "//", x.auth && (A += x.auth + "@"), x.host && (A += x.host), x.port && (A += ":" + x.port), x.path && (A += x.path), A;
  }
  r.urlGenerate = s;
  var a = 32;
  function o(x) {
    var A = [];
    return function(q) {
      for (var O = 0; O < A.length; O++)
        if (A[O].input === q) {
          var V = A[0];
          return A[0] = A[O], A[O] = V, A[0].result;
        }
      var de = x(q);
      return A.unshift({
        input: q,
        result: de
      }), A.length > a && A.pop(), de;
    };
  }
  var l = o(function(x) {
    var A = x, q = i(x);
    if (q) {
      if (!q.path)
        return x;
      A = q.path;
    }
    for (var O = r.isAbsolute(A), V = [], de = 0, re = 0; ; )
      if (de = re, re = A.indexOf("/", de), re === -1) {
        V.push(A.slice(de));
        break;
      } else
        for (V.push(A.slice(de, re)); re < A.length && A[re] === "/"; )
          re++;
    for (var Ue, ze = 0, re = V.length - 1; re >= 0; re--)
      Ue = V[re], Ue === "." ? V.splice(re, 1) : Ue === ".." ? ze++ : ze > 0 && (Ue === "" ? (V.splice(re + 1, ze), ze = 0) : (V.splice(re, 2), ze--));
    return A = V.join("/"), A === "" && (A = O ? "/" : "."), q ? (q.path = A, s(q)) : A;
  });
  r.normalize = l;
  function c(x, A) {
    x === "" && (x = "."), A === "" && (A = ".");
    var q = i(A), O = i(x);
    if (O && (x = O.path || "/"), q && !q.scheme)
      return O && (q.scheme = O.scheme), s(q);
    if (q || A.match(n))
      return A;
    if (O && !O.host && !O.path)
      return O.host = A, s(O);
    var V = A.charAt(0) === "/" ? A : l(x.replace(/\/+$/, "") + "/" + A);
    return O ? (O.path = V, s(O)) : V;
  }
  r.join = c, r.isAbsolute = function(x) {
    return x.charAt(0) === "/" || t.test(x);
  };
  function d(x, A) {
    x === "" && (x = "."), x = x.replace(/\/$/, "");
    for (var q = 0; A.indexOf(x + "/") !== 0; ) {
      var O = x.lastIndexOf("/");
      if (O < 0 || (x = x.slice(0, O), x.match(/^([^\/]+:\/)?\/*$/)))
        return A;
      ++q;
    }
    return Array(q + 1).join("../") + A.substr(x.length + 1);
  }
  r.relative = d;
  var f = function() {
    var x = /* @__PURE__ */ Object.create(null);
    return !("__proto__" in x);
  }();
  function h(x) {
    return x;
  }
  function g(x) {
    return b(x) ? "$" + x : x;
  }
  r.toSetString = f ? h : g;
  function m(x) {
    return b(x) ? x.slice(1) : x;
  }
  r.fromSetString = f ? h : m;
  function b(x) {
    if (!x)
      return !1;
    var A = x.length;
    if (A < 9 || x.charCodeAt(A - 1) !== 95 || x.charCodeAt(A - 2) !== 95 || x.charCodeAt(A - 3) !== 111 || x.charCodeAt(A - 4) !== 116 || x.charCodeAt(A - 5) !== 111 || x.charCodeAt(A - 6) !== 114 || x.charCodeAt(A - 7) !== 112 || x.charCodeAt(A - 8) !== 95 || x.charCodeAt(A - 9) !== 95)
      return !1;
    for (var q = A - 10; q >= 0; q--)
      if (x.charCodeAt(q) !== 36)
        return !1;
    return !0;
  }
  function k(x, A, q) {
    var O = C(x.source, A.source);
    return O !== 0 || (O = x.originalLine - A.originalLine, O !== 0) || (O = x.originalColumn - A.originalColumn, O !== 0 || q) || (O = x.generatedColumn - A.generatedColumn, O !== 0) || (O = x.generatedLine - A.generatedLine, O !== 0) ? O : C(x.name, A.name);
  }
  r.compareByOriginalPositions = k;
  function y(x, A, q) {
    var O;
    return O = x.originalLine - A.originalLine, O !== 0 || (O = x.originalColumn - A.originalColumn, O !== 0 || q) || (O = x.generatedColumn - A.generatedColumn, O !== 0) || (O = x.generatedLine - A.generatedLine, O !== 0) ? O : C(x.name, A.name);
  }
  r.compareByOriginalPositionsNoSource = y;
  function S(x, A, q) {
    var O = x.generatedLine - A.generatedLine;
    return O !== 0 || (O = x.generatedColumn - A.generatedColumn, O !== 0 || q) || (O = C(x.source, A.source), O !== 0) || (O = x.originalLine - A.originalLine, O !== 0) || (O = x.originalColumn - A.originalColumn, O !== 0) ? O : C(x.name, A.name);
  }
  r.compareByGeneratedPositionsDeflated = S;
  function E(x, A, q) {
    var O = x.generatedColumn - A.generatedColumn;
    return O !== 0 || q || (O = C(x.source, A.source), O !== 0) || (O = x.originalLine - A.originalLine, O !== 0) || (O = x.originalColumn - A.originalColumn, O !== 0) ? O : C(x.name, A.name);
  }
  r.compareByGeneratedPositionsDeflatedNoLine = E;
  function C(x, A) {
    return x === A ? 0 : x === null ? 1 : A === null ? -1 : x > A ? 1 : -1;
  }
  function D(x, A) {
    var q = x.generatedLine - A.generatedLine;
    return q !== 0 || (q = x.generatedColumn - A.generatedColumn, q !== 0) || (q = C(x.source, A.source), q !== 0) || (q = x.originalLine - A.originalLine, q !== 0) || (q = x.originalColumn - A.originalColumn, q !== 0) ? q : C(x.name, A.name);
  }
  r.compareByGeneratedPositionsInflated = D;
  function M(x) {
    return JSON.parse(x.replace(/^\)]}'[^\n]*\n/, ""));
  }
  r.parseSourceMapInput = M;
  function N(x, A, q) {
    if (A = A || "", x && (x[x.length - 1] !== "/" && A[0] !== "/" && (x += "/"), A = x + A), q) {
      var O = i(q);
      if (!O)
        throw new Error("sourceMapURL could not be parsed");
      if (O.path) {
        var V = O.path.lastIndexOf("/");
        V >= 0 && (O.path = O.path.substring(0, V + 1));
      }
      A = c(s(O), A);
    }
    return l(A);
  }
  r.computeSourceURL = N;
})(Ia);
var sp = {}, jc = Ia, Uc = Object.prototype.hasOwnProperty, Un = typeof Map < "u";
function on() {
  this._array = [], this._set = Un ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
}
on.fromArray = function(r, e) {
  for (var t = new on(), n = 0, i = r.length; n < i; n++)
    t.add(r[n], e);
  return t;
};
on.prototype.size = function() {
  return Un ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};
on.prototype.add = function(r, e) {
  var t = Un ? r : jc.toSetString(r), n = Un ? this.has(r) : Uc.call(this._set, t), i = this._array.length;
  (!n || e) && this._array.push(r), n || (Un ? this._set.set(r, i) : this._set[t] = i);
};
on.prototype.has = function(r) {
  if (Un)
    return this._set.has(r);
  var e = jc.toSetString(r);
  return Uc.call(this._set, e);
};
on.prototype.indexOf = function(r) {
  if (Un) {
    var e = this._set.get(r);
    if (e >= 0)
      return e;
  } else {
    var t = jc.toSetString(r);
    if (Uc.call(this._set, t))
      return this._set[t];
  }
  throw new Error('"' + r + '" is not in the set.');
};
on.prototype.at = function(r) {
  if (r >= 0 && r < this._array.length)
    return this._array[r];
  throw new Error("No element indexed by " + r);
};
on.prototype.toArray = function() {
  return this._array.slice();
};
sp.ArraySet = on;
var ap = {}, op = Ia;
function Lk(r, e) {
  var t = r.generatedLine, n = e.generatedLine, i = r.generatedColumn, s = e.generatedColumn;
  return n > t || n == t && s >= i || op.compareByGeneratedPositionsInflated(r, e) <= 0;
}
function Oa() {
  this._array = [], this._sorted = !0, this._last = { generatedLine: -1, generatedColumn: 0 };
}
Oa.prototype.unsortedForEach = function(r, e) {
  this._array.forEach(r, e);
};
Oa.prototype.add = function(r) {
  Lk(this._last, r) ? (this._last = r, this._array.push(r)) : (this._sorted = !1, this._array.push(r));
};
Oa.prototype.toArray = function() {
  return this._sorted || (this._array.sort(op.compareByGeneratedPositionsInflated), this._sorted = !0), this._array;
};
ap.MappingList = Oa;
var yi = Bc, ue = Ia, aa = sp.ArraySet, Dk = ap.MappingList;
function at(r) {
  r || (r = {}), this._file = ue.getArg(r, "file", null), this._sourceRoot = ue.getArg(r, "sourceRoot", null), this._skipValidation = ue.getArg(r, "skipValidation", !1), this._ignoreInvalidMapping = ue.getArg(r, "ignoreInvalidMapping", !1), this._sources = new aa(), this._names = new aa(), this._mappings = new Dk(), this._sourcesContents = null;
}
at.prototype._version = 3;
at.fromSourceMap = function(r, e) {
  var t = r.sourceRoot, n = new at(Object.assign(e || {}, {
    file: r.file,
    sourceRoot: t
  }));
  return r.eachMapping(function(i) {
    var s = {
      generated: {
        line: i.generatedLine,
        column: i.generatedColumn
      }
    };
    i.source != null && (s.source = i.source, t != null && (s.source = ue.relative(t, s.source)), s.original = {
      line: i.originalLine,
      column: i.originalColumn
    }, i.name != null && (s.name = i.name)), n.addMapping(s);
  }), r.sources.forEach(function(i) {
    var s = i;
    t !== null && (s = ue.relative(t, i)), n._sources.has(s) || n._sources.add(s);
    var a = r.sourceContentFor(i);
    a != null && n.setSourceContent(i, a);
  }), n;
};
at.prototype.addMapping = function(r) {
  var e = ue.getArg(r, "generated"), t = ue.getArg(r, "original", null), n = ue.getArg(r, "source", null), i = ue.getArg(r, "name", null);
  !this._skipValidation && this._validateMapping(e, t, n, i) === !1 || (n != null && (n = String(n), this._sources.has(n) || this._sources.add(n)), i != null && (i = String(i), this._names.has(i) || this._names.add(i)), this._mappings.add({
    generatedLine: e.line,
    generatedColumn: e.column,
    originalLine: t != null && t.line,
    originalColumn: t != null && t.column,
    source: n,
    name: i
  }));
};
at.prototype.setSourceContent = function(r, e) {
  var t = r;
  this._sourceRoot != null && (t = ue.relative(this._sourceRoot, t)), e != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[ue.toSetString(t)] = e) : this._sourcesContents && (delete this._sourcesContents[ue.toSetString(t)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
};
at.prototype.applySourceMap = function(r, e, t) {
  var n = e;
  if (e == null) {
    if (r.file == null)
      throw new Error(
        `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
      );
    n = r.file;
  }
  var i = this._sourceRoot;
  i != null && (n = ue.relative(i, n));
  var s = new aa(), a = new aa();
  this._mappings.unsortedForEach(function(o) {
    if (o.source === n && o.originalLine != null) {
      var l = r.originalPositionFor({
        line: o.originalLine,
        column: o.originalColumn
      });
      l.source != null && (o.source = l.source, t != null && (o.source = ue.join(t, o.source)), i != null && (o.source = ue.relative(i, o.source)), o.originalLine = l.line, o.originalColumn = l.column, l.name != null && (o.name = l.name));
    }
    var c = o.source;
    c != null && !s.has(c) && s.add(c);
    var d = o.name;
    d != null && !a.has(d) && a.add(d);
  }, this), this._sources = s, this._names = a, r.sources.forEach(function(o) {
    var l = r.sourceContentFor(o);
    l != null && (t != null && (o = ue.join(t, o)), i != null && (o = ue.relative(i, o)), this.setSourceContent(o, l));
  }, this);
};
at.prototype._validateMapping = function(r, e, t, n) {
  if (e && typeof e.line != "number" && typeof e.column != "number") {
    var i = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
    if (this._ignoreInvalidMapping)
      return typeof console < "u" && console.warn && console.warn(i), !1;
    throw new Error(i);
  }
  if (!(r && "line" in r && "column" in r && r.line > 0 && r.column >= 0 && !e && !t && !n)) {
    if (r && "line" in r && "column" in r && e && "line" in e && "column" in e && r.line > 0 && r.column >= 0 && e.line > 0 && e.column >= 0 && t)
      return;
    var i = "Invalid mapping: " + JSON.stringify({
      generated: r,
      source: t,
      original: e,
      name: n
    });
    if (this._ignoreInvalidMapping)
      return typeof console < "u" && console.warn && console.warn(i), !1;
    throw new Error(i);
  }
};
at.prototype._serializeMappings = function() {
  for (var r = 0, e = 1, t = 0, n = 0, i = 0, s = 0, a = "", o, l, c, d, f = this._mappings.toArray(), h = 0, g = f.length; h < g; h++) {
    if (l = f[h], o = "", l.generatedLine !== e)
      for (r = 0; l.generatedLine !== e; )
        o += ";", e++;
    else if (h > 0) {
      if (!ue.compareByGeneratedPositionsInflated(l, f[h - 1]))
        continue;
      o += ",";
    }
    o += yi.encode(l.generatedColumn - r), r = l.generatedColumn, l.source != null && (d = this._sources.indexOf(l.source), o += yi.encode(d - s), s = d, o += yi.encode(l.originalLine - 1 - n), n = l.originalLine - 1, o += yi.encode(l.originalColumn - t), t = l.originalColumn, l.name != null && (c = this._names.indexOf(l.name), o += yi.encode(c - i), i = c)), a += o;
  }
  return a;
};
at.prototype._generateSourcesContent = function(r, e) {
  return r.map(function(t) {
    if (!this._sourcesContents)
      return null;
    e != null && (t = ue.relative(e, t));
    var n = ue.toSetString(t);
    return Object.prototype.hasOwnProperty.call(this._sourcesContents, n) ? this._sourcesContents[n] : null;
  }, this);
};
at.prototype.toJSON = function() {
  var r = {
    version: this._version,
    sources: this._sources.toArray(),
    names: this._names.toArray(),
    mappings: this._serializeMappings()
  };
  return this._file != null && (r.file = this._file), this._sourceRoot != null && (r.sourceRoot = this._sourceRoot), this._sourcesContents && (r.sourcesContent = this._generateSourcesContent(r.sources, r.sourceRoot)), r;
};
at.prototype.toString = function() {
  return JSON.stringify(this.toJSON());
};
var Ik = at;
const Ad = /* @__PURE__ */ new Set(["Atrule", "Selector", "Declaration"]);
function Ok(r) {
  const e = new Ik(), t = {
    line: 1,
    column: 0
  }, n = {
    line: 0,
    // should be zero to add first mapping
    column: 0
  }, i = {
    line: 1,
    column: 0
  }, s = {
    generated: i
  };
  let a = 1, o = 0, l = !1;
  const c = r.node;
  r.node = function(h) {
    if (h.loc && h.loc.start && Ad.has(h.type)) {
      const g = h.loc.start.line, m = h.loc.start.column - 1;
      (n.line !== g || n.column !== m) && (n.line = g, n.column = m, t.line = a, t.column = o, l && (l = !1, (t.line !== i.line || t.column !== i.column) && e.addMapping(s)), l = !0, e.addMapping({
        source: h.loc.source,
        original: n,
        generated: t
      }));
    }
    c.call(this, h), l && Ad.has(h.type) && (i.line = a, i.column = o);
  };
  const d = r.emit;
  r.emit = function(h, g, m) {
    for (let b = 0; b < h.length; b++)
      h.charCodeAt(b) === 10 ? (a++, o = 0) : o++;
    d(h, g, m);
  };
  const f = r.result;
  return r.result = function() {
    return l && e.addMapping(s), {
      css: f(),
      map: e
    };
  }, r;
}
const Nk = 43, Mk = 45, Ko = (r, e) => {
  if (r === K && (r = e), typeof r == "string") {
    const t = r.charCodeAt(0);
    return t > 127 ? 32768 : t << 8;
  }
  return r;
}, lp = [
  [R, R],
  [R, G],
  [R, Le],
  [R, Fe],
  [R, "-"],
  [R, $],
  [R, le],
  [R, Y],
  [R, $e],
  [R, ve],
  [pe, R],
  [pe, G],
  [pe, Le],
  [pe, Fe],
  [pe, "-"],
  [pe, $],
  [pe, le],
  [pe, Y],
  [pe, $e],
  [ae, R],
  [ae, G],
  [ae, Le],
  [ae, Fe],
  [ae, "-"],
  [ae, $],
  [ae, le],
  [ae, Y],
  [ae, $e],
  [Y, R],
  [Y, G],
  [Y, Le],
  [Y, Fe],
  [Y, "-"],
  [Y, $],
  [Y, le],
  [Y, Y],
  [Y, $e],
  ["#", R],
  ["#", G],
  ["#", Le],
  ["#", Fe],
  ["#", "-"],
  ["#", $],
  ["#", le],
  ["#", Y],
  ["#", $e],
  // https://github.com/w3c/csswg-drafts/pull/6874
  ["-", R],
  ["-", G],
  ["-", Le],
  ["-", Fe],
  ["-", "-"],
  ["-", $],
  ["-", le],
  ["-", Y],
  ["-", $e],
  // https://github.com/w3c/csswg-drafts/pull/6874
  [$, R],
  [$, G],
  [$, Le],
  [$, Fe],
  [$, $],
  [$, le],
  [$, Y],
  [$, "%"],
  [$, $e],
  // https://github.com/w3c/csswg-drafts/pull/6874
  ["@", R],
  ["@", G],
  ["@", Le],
  ["@", Fe],
  ["@", "-"],
  ["@", $e],
  // https://github.com/w3c/csswg-drafts/pull/6874
  [".", $],
  [".", le],
  [".", Y],
  ["+", $],
  ["+", le],
  ["+", Y],
  ["/", "*"]
], _k = lp.concat([
  [R, ae],
  [Y, ae],
  [ae, ae],
  [pe, ve],
  [pe, Gt],
  [pe, Oe],
  [le, le],
  [le, Y],
  [le, G],
  [le, "-"],
  [te, R],
  [te, G],
  [te, le],
  [te, Y],
  [te, ae],
  [te, "-"]
]);
function cp(r) {
  const e = new Set(
    r.map(([t, n]) => Ko(t) << 16 | Ko(n))
  );
  return function(t, n, i) {
    const s = Ko(n, i), a = i.charCodeAt(0);
    return (a === Mk && n !== R && n !== G && n !== $e || a === Nk ? e.has(t << 16 | a << 8) : e.has(t << 16 | s)) && this.emit(" ", ce, !0), s;
  };
}
const qk = cp(lp), up = cp(_k), Ed = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  safe: up,
  spec: qk
}, Symbol.toStringTag, { value: "Module" })), Rk = 92;
function zk(r, e) {
  if (typeof e == "function") {
    let t = null;
    r.children.forEach((n) => {
      t !== null && e.call(this, t), this.node(n), t = n;
    });
    return;
  }
  r.children.forEach(this.node, this);
}
function Pk(r) {
  La(r, (e, t, n) => {
    this.token(e, r.slice(t, n));
  });
}
function Bk(r) {
  const e = /* @__PURE__ */ new Map();
  for (let t in r.node) {
    const n = r.node[t];
    typeof (n.generate || n) == "function" && e.set(t, n.generate || n);
  }
  return function(t, n) {
    let i = "", s = 0, a = {
      node(l) {
        if (e.has(l.type))
          e.get(l.type).call(o, l);
        else
          throw new Error("Unknown node type: " + l.type);
      },
      tokenBefore: up,
      token(l, c) {
        s = this.tokenBefore(s, l, c), this.emit(c, l, !1), l === K && c.charCodeAt(0) === Rk && this.emit(`
`, ce, !0);
      },
      emit(l) {
        i += l;
      },
      result() {
        return i;
      }
    };
    n && (typeof n.decorator == "function" && (a = n.decorator(a)), n.sourceMap && (a = Ok(a)), n.mode in Ed && (a.tokenBefore = Ed[n.mode]));
    const o = {
      node: (l) => a.node(l),
      children: zk,
      token: (l, c) => a.token(l, c),
      tokenize: Pk
    };
    return a.node(t), a.result();
  };
}
function Fk(r) {
  return {
    fromPlainObject(e) {
      return r(e, {
        enter(t) {
          t.children && !(t.children instanceof fe) && (t.children = new fe().fromArray(t.children));
        }
      }), e;
    },
    toPlainObject(e) {
      return r(e, {
        leave(t) {
          t.children && t.children instanceof fe && (t.children = t.children.toArray());
        }
      }), e;
    }
  };
}
const { hasOwnProperty: Hc } = Object.prototype, ki = function() {
};
function Cd(r) {
  return typeof r == "function" ? r : ki;
}
function Td(r, e) {
  return function(t, n, i) {
    t.type === e && r.call(this, t, n, i);
  };
}
function $k(r, e) {
  const t = e.structure, n = [];
  for (const i in t) {
    if (Hc.call(t, i) === !1)
      continue;
    let s = t[i];
    const a = {
      name: i,
      type: !1,
      nullable: !1
    };
    Array.isArray(s) || (s = [s]);
    for (const o of s)
      o === null ? a.nullable = !0 : typeof o == "string" ? a.type = "node" : Array.isArray(o) && (a.type = "list");
    a.type && n.push(a);
  }
  return n.length ? {
    context: e.walkContext,
    fields: n
  } : null;
}
function jk(r) {
  const e = {};
  for (const t in r.node)
    if (Hc.call(r.node, t)) {
      const n = r.node[t];
      if (!n.structure)
        throw new Error("Missed `structure` field in `" + t + "` node type definition");
      e[t] = $k(t, n);
    }
  return e;
}
function Ld(r, e) {
  const t = r.fields.slice(), n = r.context, i = typeof n == "string";
  return e && t.reverse(), function(s, a, o, l) {
    let c;
    i && (c = a[n], a[n] = s);
    for (const d of t) {
      const f = s[d.name];
      if (!d.nullable || f) {
        if (d.type === "list") {
          if (e ? f.reduceRight(l, !1) : f.reduce(l, !1))
            return !0;
        } else if (o(f))
          return !0;
      }
    }
    i && (a[n] = c);
  };
}
function Dd({
  StyleSheet: r,
  Atrule: e,
  Rule: t,
  Block: n,
  DeclarationList: i
}) {
  return {
    Atrule: {
      StyleSheet: r,
      Atrule: e,
      Rule: t,
      Block: n
    },
    Rule: {
      StyleSheet: r,
      Atrule: e,
      Rule: t,
      Block: n
    },
    Declaration: {
      StyleSheet: r,
      Atrule: e,
      Rule: t,
      Block: n,
      DeclarationList: i
    }
  };
}
function Uk(r) {
  const e = jk(r), t = {}, n = {}, i = Symbol("break-walk"), s = Symbol("skip-node");
  for (const c in e)
    Hc.call(e, c) && e[c] !== null && (t[c] = Ld(e[c], !1), n[c] = Ld(e[c], !0));
  const a = Dd(t), o = Dd(n), l = function(c, d) {
    function f(y, S, E) {
      const C = h.call(k, y, S, E);
      return C === i ? !0 : C === s ? !1 : !!(m.hasOwnProperty(y.type) && m[y.type](y, k, f, b) || g.call(k, y, S, E) === i);
    }
    let h = ki, g = ki, m = t, b = (y, S, E, C) => y || f(S, E, C);
    const k = {
      break: i,
      skip: s,
      root: c,
      stylesheet: null,
      atrule: null,
      atrulePrelude: null,
      rule: null,
      selector: null,
      block: null,
      declaration: null,
      function: null
    };
    if (typeof d == "function")
      h = d;
    else if (d && (h = Cd(d.enter), g = Cd(d.leave), d.reverse && (m = n), d.visit)) {
      if (a.hasOwnProperty(d.visit))
        m = d.reverse ? o[d.visit] : a[d.visit];
      else if (!e.hasOwnProperty(d.visit))
        throw new Error("Bad value `" + d.visit + "` for `visit` option (should be: " + Object.keys(e).sort().join(", ") + ")");
      h = Td(h, d.visit), g = Td(g, d.visit);
    }
    if (h === ki && g === ki)
      throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
    f(c);
  };
  return l.break = i, l.skip = s, l.find = function(c, d) {
    let f = null;
    return l(c, function(h, g, m) {
      if (d.call(this, h, g, m))
        return f = h, i;
    }), f;
  }, l.findLast = function(c, d) {
    let f = null;
    return l(c, {
      reverse: !0,
      enter(h, g, m) {
        if (d.call(this, h, g, m))
          return f = h, i;
      }
    }), f;
  }, l.findAll = function(c, d) {
    const f = [];
    return l(c, function(h, g, m) {
      d.call(this, h, g, m) && f.push(h);
    }), f;
  }, l;
}
function Hk(r) {
  return r;
}
function Vk(r) {
  const { min: e, max: t, comma: n } = r;
  return e === 0 && t === 0 ? n ? "#?" : "*" : e === 0 && t === 1 ? "?" : e === 1 && t === 0 ? n ? "#" : "+" : e === 1 && t === 1 ? "" : (n ? "#" : "") + (e === t ? "{" + e + "}" : "{" + e + "," + (t !== 0 ? t : "") + "}");
}
function Yk(r) {
  switch (r.type) {
    case "Range":
      return " [" + (r.min === null ? "-∞" : r.min) + "," + (r.max === null ? "∞" : r.max) + "]";
    default:
      throw new Error("Unknown node type `" + r.type + "`");
  }
}
function Kk(r, e, t, n) {
  const i = r.combinator === " " || n ? r.combinator : " " + r.combinator + " ", s = r.terms.map((a) => Vc(a, e, t, n)).join(i);
  return r.explicit || t ? (n || s[0] === "," ? "[" : "[ ") + s + (n ? "]" : " ]") : s;
}
function Vc(r, e, t, n) {
  let i;
  switch (r.type) {
    case "Group":
      i = Kk(r, e, t, n) + (r.disallowEmpty ? "!" : "");
      break;
    case "Multiplier":
      return Vc(r.term, e, t, n) + e(Vk(r), r);
    case "Type":
      i = "<" + r.name + (r.opts ? e(Yk(r.opts), r.opts) : "") + ">";
      break;
    case "Property":
      i = "<'" + r.name + "'>";
      break;
    case "Keyword":
      i = r.name;
      break;
    case "AtKeyword":
      i = "@" + r.name;
      break;
    case "Function":
      i = r.name + "(";
      break;
    case "String":
    case "Token":
      i = r.value;
      break;
    case "Comma":
      i = ",";
      break;
    default:
      throw new Error("Unknown node type `" + r.type + "`");
  }
  return e(i, r);
}
function Yc(r, e) {
  let t = Hk, n = !1, i = !1;
  return typeof e == "function" ? t = e : e && (n = !!e.forceBraces, i = !!e.compact, typeof e.decorate == "function" && (t = e.decorate)), Vc(r, t, n, i);
}
const Id = { offset: 0, line: 1, column: 1 };
function Gk(r, e) {
  const t = r.tokens, n = r.longestMatch, i = n < t.length && t[n].node || null, s = i !== e ? i : null;
  let a = 0, o = 0, l = 0, c = "", d, f;
  for (let h = 0; h < t.length; h++) {
    const g = t[h].value;
    h === n && (o = g.length, a = c.length), s !== null && t[h].node === s && (h <= n ? l++ : l = 0), c += g;
  }
  return n === t.length || l > 1 ? (d = _s(s || e, "end") || xi(Id, c), f = xi(d)) : (d = _s(s, "start") || xi(_s(e, "start") || Id, c.slice(0, a)), f = _s(s, "end") || xi(d, c.substr(a, o))), {
    css: c,
    mismatchOffset: a,
    mismatchLength: o,
    start: d,
    end: f
  };
}
function _s(r, e) {
  const t = r && r.loc && r.loc[e];
  return t ? "line" in t ? xi(t) : t : null;
}
function xi({ offset: r, line: e, column: t }, n) {
  const i = {
    offset: r,
    line: e,
    column: t
  };
  if (n) {
    const s = n.split(/\n|\r\n?|\f/);
    i.offset += n.length, i.line += s.length - 1, i.column = s.length === 1 ? i.column + n.length : s.pop().length + 1;
  }
  return i;
}
const vi = function(r, e) {
  const t = Da(
    "SyntaxReferenceError",
    r + (e ? " `" + e + "`" : "")
  );
  return t.reference = e, t;
}, Wk = function(r, e, t, n) {
  const i = Da("SyntaxMatchError", r), {
    css: s,
    mismatchOffset: a,
    mismatchLength: o,
    start: l,
    end: c
  } = Gk(n, t);
  return i.rawMessage = r, i.syntax = e ? Yc(e) : "<generic>", i.css = s, i.mismatchOffset = a, i.mismatchLength = o, i.message = r + `
  syntax: ` + i.syntax + `
   value: ` + (s || "<empty string>") + `
  --------` + new Array(i.mismatchOffset + 1).join("-") + "^", Object.assign(i, l), i.loc = {
    source: t && t.loc && t.loc.source || "<unknown>",
    start: l,
    end: c
  }, i;
}, qs = /* @__PURE__ */ new Map(), gr = /* @__PURE__ */ new Map(), oa = 45, Go = Zk, Od = Xk;
function Kc(r, e) {
  return e = e || 0, r.length - e >= 2 && r.charCodeAt(e) === oa && r.charCodeAt(e + 1) === oa;
}
function dp(r, e) {
  if (e = e || 0, r.length - e >= 3 && r.charCodeAt(e) === oa && r.charCodeAt(e + 1) !== oa) {
    const t = r.indexOf("-", e + 2);
    if (t !== -1)
      return r.substring(e, t + 1);
  }
  return "";
}
function Zk(r) {
  if (qs.has(r))
    return qs.get(r);
  const e = r.toLowerCase();
  let t = qs.get(e);
  if (t === void 0) {
    const n = Kc(e, 0), i = n ? "" : dp(e, 0);
    t = Object.freeze({
      basename: e.substr(i.length),
      name: e,
      prefix: i,
      vendor: i,
      custom: n
    });
  }
  return qs.set(r, t), t;
}
function Xk(r) {
  if (gr.has(r))
    return gr.get(r);
  let e = r, t = r[0];
  t === "/" ? t = r[1] === "/" ? "//" : "/" : t !== "_" && t !== "*" && t !== "$" && t !== "#" && t !== "+" && t !== "&" && (t = "");
  const n = Kc(e, t.length);
  if (!n && (e = e.toLowerCase(), gr.has(e))) {
    const o = gr.get(e);
    return gr.set(r, o), o;
  }
  const i = n ? "" : dp(e, t.length), s = e.substr(0, t.length + i.length), a = Object.freeze({
    basename: e.substr(s.length),
    name: e.substr(t.length),
    hack: t,
    vendor: i,
    prefix: s,
    custom: n
  });
  return gr.set(r, a), a;
}
const hp = [
  "initial",
  "inherit",
  "unset",
  "revert",
  "revert-layer"
], Hi = 43, zt = 45, Wo = 110, mr = !0, Qk = !1;
function Pl(r, e) {
  return r !== null && r.type === K && r.value.charCodeAt(0) === e;
}
function Li(r, e, t) {
  for (; r !== null && (r.type === ce || r.type === Re); )
    r = t(++e);
  return e;
}
function bn(r, e, t, n) {
  if (!r)
    return 0;
  const i = r.value.charCodeAt(e);
  if (i === Hi || i === zt) {
    if (t)
      return 0;
    e++;
  }
  for (; e < r.value.length; e++)
    if (!we(r.value.charCodeAt(e)))
      return 0;
  return n + 1;
}
function Zo(r, e, t) {
  let n = !1, i = Li(r, e, t);
  if (r = t(i), r === null)
    return e;
  if (r.type !== $)
    if (Pl(r, Hi) || Pl(r, zt)) {
      if (n = !0, i = Li(t(++i), i, t), r = t(i), r === null || r.type !== $)
        return 0;
    } else
      return e;
  if (!n) {
    const s = r.value.charCodeAt(0);
    if (s !== Hi && s !== zt)
      return 0;
  }
  return bn(r, n ? 0 : 1, n, i);
}
function Jk(r, e) {
  let t = 0;
  if (!r)
    return 0;
  if (r.type === $)
    return bn(r, 0, Qk, t);
  if (r.type === R && r.value.charCodeAt(0) === zt) {
    if (!Nr(r.value, 1, Wo))
      return 0;
    switch (r.value.length) {
      case 2:
        return Zo(e(++t), t, e);
      case 3:
        return r.value.charCodeAt(2) !== zt ? 0 : (t = Li(e(++t), t, e), r = e(t), bn(r, 0, mr, t));
      default:
        return r.value.charCodeAt(2) !== zt ? 0 : bn(r, 3, mr, t);
    }
  } else if (r.type === R || Pl(r, Hi) && e(t + 1).type === R) {
    if (r.type !== R && (r = e(++t)), r === null || !Nr(r.value, 0, Wo))
      return 0;
    switch (r.value.length) {
      case 1:
        return Zo(e(++t), t, e);
      case 2:
        return r.value.charCodeAt(1) !== zt ? 0 : (t = Li(e(++t), t, e), r = e(t), bn(r, 0, mr, t));
      default:
        return r.value.charCodeAt(1) !== zt ? 0 : bn(r, 2, mr, t);
    }
  } else if (r.type === Y) {
    let n = r.value.charCodeAt(0), i = n === Hi || n === zt ? 1 : 0, s = i;
    for (; s < r.value.length && we(r.value.charCodeAt(s)); s++)
      ;
    return s === i || !Nr(r.value, s, Wo) ? 0 : s + 1 === r.value.length ? Zo(e(++t), t, e) : r.value.charCodeAt(s + 1) !== zt ? 0 : s + 2 === r.value.length ? (t = Li(e(++t), t, e), r = e(t), bn(r, 0, mr, t)) : bn(r, s + 2, mr, t);
  }
  return 0;
}
const ex = 43, fp = 45, pp = 63, tx = 117;
function Bl(r, e) {
  return r !== null && r.type === K && r.value.charCodeAt(0) === e;
}
function nx(r, e) {
  return r.value.charCodeAt(0) === e;
}
function Si(r, e, t) {
  let n = 0;
  for (let i = e; i < r.value.length; i++) {
    const s = r.value.charCodeAt(i);
    if (s === fp && t && n !== 0)
      return Si(r, e + n + 1, !1), 6;
    if (!Cn(s) || ++n > 6)
      return 0;
  }
  return n;
}
function Rs(r, e, t) {
  if (!r)
    return 0;
  for (; Bl(t(e), pp); ) {
    if (++r > 6)
      return 0;
    e++;
  }
  return e;
}
function rx(r, e) {
  let t = 0;
  if (r === null || r.type !== R || !Nr(r.value, 0, tx) || (r = e(++t), r === null))
    return 0;
  if (Bl(r, ex))
    return r = e(++t), r === null ? 0 : r.type === R ? Rs(Si(r, 0, !0), ++t, e) : Bl(r, pp) ? Rs(1, ++t, e) : 0;
  if (r.type === $) {
    const n = Si(r, 1, !0);
    return n === 0 ? 0 : (r = e(++t), r === null ? t : r.type === Y || r.type === $ ? !nx(r, fp) || !Si(r, 1, !1) ? 0 : t + 1 : Rs(n, t, e));
  }
  return r.type === Y ? Rs(Si(r, 1, !0), ++t, e) : 0;
}
const ix = ["calc(", "-moz-calc(", "-webkit-calc("], Gc = /* @__PURE__ */ new Map([
  [G, te],
  [ve, te],
  [We, xt],
  [Ne, st]
]);
function vt(r, e) {
  return e < r.length ? r.charCodeAt(e) : 0;
}
function gp(r, e) {
  return Ui(r, 0, r.length, e);
}
function mp(r, e) {
  for (let t = 0; t < e.length; t++)
    if (gp(r, e[t]))
      return !0;
  return !1;
}
function bp(r, e) {
  return e !== r.length - 2 ? !1 : vt(r, e) === 92 && // U+005C REVERSE SOLIDUS (\)
  we(vt(r, e + 1));
}
function Na(r, e, t) {
  if (r && r.type === "Range") {
    const n = Number(
      t !== void 0 && t !== e.length ? e.substr(0, t) : e
    );
    if (isNaN(n) || r.min !== null && n < r.min && typeof r.min != "string" || r.max !== null && n > r.max && typeof r.max != "string")
      return !0;
  }
  return !1;
}
function sx(r, e) {
  let t = 0, n = [], i = 0;
  e:
    do {
      switch (r.type) {
        case st:
        case te:
        case xt:
          if (r.type !== t)
            break e;
          if (t = n.pop(), n.length === 0) {
            i++;
            break e;
          }
          break;
        case G:
        case ve:
        case We:
        case Ne:
          n.push(t), t = Gc.get(r.type);
          break;
      }
      i++;
    } while (r = e(i));
  return i;
}
function Je(r) {
  return function(e, t, n) {
    return e === null ? 0 : e.type === G && mp(e.value, ix) ? sx(e, t) : r(e, t, n);
  };
}
function ie(r) {
  return function(e) {
    return e === null || e.type !== r ? 0 : 1;
  };
}
function ax(r) {
  if (r === null || r.type !== R)
    return 0;
  const e = r.value.toLowerCase();
  return mp(e, hp) || gp(e, "default") ? 0 : 1;
}
function ox(r) {
  return r === null || r.type !== R || vt(r.value, 0) !== 45 || vt(r.value, 1) !== 45 ? 0 : 1;
}
function lx(r) {
  if (r === null || r.type !== ae)
    return 0;
  const e = r.value.length;
  if (e !== 4 && e !== 5 && e !== 7 && e !== 9)
    return 0;
  for (let t = 1; t < e; t++)
    if (!Cn(vt(r.value, t)))
      return 0;
  return 1;
}
function cx(r) {
  return r === null || r.type !== ae || !Us(vt(r.value, 1), vt(r.value, 2), vt(r.value, 3)) ? 0 : 1;
}
function ux(r, e) {
  if (!r)
    return 0;
  let t = 0, n = [], i = 0;
  e:
    do {
      switch (r.type) {
        case Ca:
        case Fe:
          break e;
        case st:
        case te:
        case xt:
          if (r.type !== t)
            break e;
          t = n.pop();
          break;
        case je:
          if (t === 0)
            break e;
          break;
        case K:
          if (t === 0 && r.value === "!")
            break e;
          break;
        case G:
        case ve:
        case We:
        case Ne:
          n.push(t), t = Gc.get(r.type);
          break;
      }
      i++;
    } while (r = e(i));
  return i;
}
function dx(r, e) {
  if (!r)
    return 0;
  let t = 0, n = [], i = 0;
  e:
    do {
      switch (r.type) {
        case Ca:
        case Fe:
          break e;
        case st:
        case te:
        case xt:
          if (r.type !== t)
            break e;
          t = n.pop();
          break;
        case G:
        case ve:
        case We:
        case Ne:
          n.push(t), t = Gc.get(r.type);
          break;
      }
      i++;
    } while (r = e(i));
  return i;
}
function nn(r) {
  return r && (r = new Set(r)), function(e, t, n) {
    if (e === null || e.type !== Y)
      return 0;
    const i = Ta(e.value, 0);
    if (r !== null) {
      const s = e.value.indexOf("\\", i), a = s === -1 || !bp(e.value, s) ? e.value.substr(i) : e.value.substring(i, s);
      if (r.has(a.toLowerCase()) === !1)
        return 0;
    }
    return Na(n, e.value, i) ? 0 : 1;
  };
}
function hx(r, e, t) {
  return r === null || r.type !== le || Na(t, r.value, r.value.length - 1) ? 0 : 1;
}
function yp(r) {
  return typeof r != "function" && (r = function() {
    return 0;
  }), function(e, t, n) {
    return e !== null && e.type === $ && Number(e.value) === 0 ? 1 : r(e, t, n);
  };
}
function fx(r, e, t) {
  if (r === null)
    return 0;
  const n = Ta(r.value, 0);
  return n !== r.value.length && !bp(r.value, n) || Na(t, r.value, n) ? 0 : 1;
}
function px(r, e, t) {
  if (r === null || r.type !== $)
    return 0;
  let n = vt(r.value, 0) === 43 || // U+002B PLUS SIGN (+)
  vt(r.value, 0) === 45 ? 1 : 0;
  for (; n < r.value.length; n++)
    if (!we(vt(r.value, n)))
      return 0;
  return Na(t, r.value, n) ? 0 : 1;
}
const gx = {
  "ident-token": ie(R),
  "function-token": ie(G),
  "at-keyword-token": ie(pe),
  "hash-token": ie(ae),
  "string-token": ie(Gt),
  "bad-string-token": ie(Ca),
  "url-token": ie(Le),
  "bad-url-token": ie(Fe),
  "delim-token": ie(K),
  "number-token": ie($),
  "percentage-token": ie(le),
  "dimension-token": ie(Y),
  "whitespace-token": ie(ce),
  "CDO-token": ie(Ji),
  "CDC-token": ie($e),
  "colon-token": ie(Oe),
  "semicolon-token": ie(je),
  "comma-token": ie(Wt),
  "[-token": ie(We),
  "]-token": ie(xt),
  "(-token": ie(ve),
  ")-token": ie(te),
  "{-token": ie(Ne),
  "}-token": ie(st)
}, mx = {
  // token type aliases
  string: ie(Gt),
  ident: ie(R),
  // percentage
  percentage: Je(hx),
  // numeric
  zero: yp(),
  number: Je(fx),
  integer: Je(px),
  // complex types
  "custom-ident": ax,
  "custom-property-name": ox,
  "hex-color": lx,
  "id-selector": cx,
  // element( <id-selector> )
  "an-plus-b": Jk,
  urange: rx,
  "declaration-value": ux,
  "any-value": dx
};
function bx(r) {
  const {
    angle: e,
    decibel: t,
    frequency: n,
    flex: i,
    length: s,
    resolution: a,
    semitones: o,
    time: l
  } = r || {};
  return {
    dimension: Je(nn(null)),
    angle: Je(nn(e)),
    decibel: Je(nn(t)),
    frequency: Je(nn(n)),
    flex: Je(nn(i)),
    length: Je(yp(nn(s))),
    resolution: Je(nn(a)),
    semitones: Je(nn(o)),
    time: Je(nn(l))
  };
}
function yx(r) {
  return H(H(H({}, gx), mx), bx(r));
}
const vx = [
  // absolute length units https://www.w3.org/TR/css-values-3/#lengths
  "cm",
  "mm",
  "q",
  "in",
  "pt",
  "pc",
  "px",
  // font-relative length units https://drafts.csswg.org/css-values-4/#font-relative-lengths
  "em",
  "rem",
  "ex",
  "rex",
  "cap",
  "rcap",
  "ch",
  "rch",
  "ic",
  "ric",
  "lh",
  "rlh",
  // viewport-percentage lengths https://drafts.csswg.org/css-values-4/#viewport-relative-lengths
  "vw",
  "svw",
  "lvw",
  "dvw",
  "vh",
  "svh",
  "lvh",
  "dvh",
  "vi",
  "svi",
  "lvi",
  "dvi",
  "vb",
  "svb",
  "lvb",
  "dvb",
  "vmin",
  "svmin",
  "lvmin",
  "dvmin",
  "vmax",
  "svmax",
  "lvmax",
  "dvmax",
  // container relative lengths https://drafts.csswg.org/css-contain-3/#container-lengths
  "cqw",
  "cqh",
  "cqi",
  "cqb",
  "cqmin",
  "cqmax"
], wx = ["deg", "grad", "rad", "turn"], kx = ["s", "ms"], xx = ["hz", "khz"], Sx = ["dpi", "dpcm", "dppx", "x"], Ax = ["fr"], Ex = ["db"], Cx = ["st"], Nd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  angle: wx,
  decibel: Ex,
  flex: Ax,
  frequency: xx,
  length: vx,
  resolution: Sx,
  semitones: Cx,
  time: kx
}, Symbol.toStringTag, { value: "Module" }));
function Tx(r, e, t) {
  return Object.assign(Da("SyntaxError", r), {
    input: e,
    offset: t,
    rawMessage: r,
    message: r + `
  ` + e + `
--` + new Array((t || e.length) + 1).join("-") + "^"
  });
}
const Lx = 9, Dx = 10, Ix = 12, Ox = 13, Nx = 32;
class Mx {
  constructor(e) {
    this.str = e, this.pos = 0;
  }
  charCodeAt(e) {
    return e < this.str.length ? this.str.charCodeAt(e) : 0;
  }
  charCode() {
    return this.charCodeAt(this.pos);
  }
  nextCharCode() {
    return this.charCodeAt(this.pos + 1);
  }
  nextNonWsCode(e) {
    return this.charCodeAt(this.findWsEnd(e));
  }
  findWsEnd(e) {
    for (; e < this.str.length; e++) {
      const t = this.str.charCodeAt(e);
      if (t !== Ox && t !== Dx && t !== Ix && t !== Nx && t !== Lx)
        break;
    }
    return e;
  }
  substringToPos(e) {
    return this.str.substring(this.pos, this.pos = e);
  }
  eat(e) {
    this.charCode() !== e && this.error("Expect `" + String.fromCharCode(e) + "`"), this.pos++;
  }
  peek() {
    return this.pos < this.str.length ? this.str.charAt(this.pos++) : "";
  }
  error(e) {
    throw new Tx(e, this.str, this.pos);
  }
}
const _x = 9, qx = 10, Rx = 12, zx = 13, Px = 32, vp = 33, Wc = 35, Md = 38, la = 39, wp = 40, Bx = 41, kp = 42, Zc = 43, Xc = 44, _d = 45, Qc = 60, xp = 62, Fl = 63, Fx = 64, Ma = 91, Jc = 93, ca = 123, qd = 124, Rd = 125, zd = 8734, Vi = new Uint8Array(128).map(
  (r, e) => /[a-zA-Z0-9\-]/.test(String.fromCharCode(e)) ? 1 : 0
), Pd = {
  " ": 1,
  "&&": 2,
  "||": 3,
  "|": 4
};
function ua(r) {
  return r.substringToPos(
    r.findWsEnd(r.pos)
  );
}
function Vr(r) {
  let e = r.pos;
  for (; e < r.str.length; e++) {
    const t = r.str.charCodeAt(e);
    if (t >= 128 || Vi[t] === 0)
      break;
  }
  return r.pos === e && r.error("Expect a keyword"), r.substringToPos(e);
}
function da(r) {
  let e = r.pos;
  for (; e < r.str.length; e++) {
    const t = r.str.charCodeAt(e);
    if (t < 48 || t > 57)
      break;
  }
  return r.pos === e && r.error("Expect a number"), r.substringToPos(e);
}
function $x(r) {
  const e = r.str.indexOf("'", r.pos + 1);
  return e === -1 && (r.pos = r.str.length, r.error("Expect an apostrophe")), r.substringToPos(e + 1);
}
function Bd(r) {
  let e = null, t = null;
  return r.eat(ca), e = da(r), r.charCode() === Xc ? (r.pos++, r.charCode() !== Rd && (t = da(r))) : t = e, r.eat(Rd), {
    min: Number(e),
    max: t ? Number(t) : 0
  };
}
function jx(r) {
  let e = null, t = !1;
  switch (r.charCode()) {
    case kp:
      r.pos++, e = {
        min: 0,
        max: 0
      };
      break;
    case Zc:
      r.pos++, e = {
        min: 1,
        max: 0
      };
      break;
    case Fl:
      r.pos++, e = {
        min: 0,
        max: 1
      };
      break;
    case Wc:
      r.pos++, t = !0, r.charCode() === ca ? e = Bd(r) : r.charCode() === Fl ? (r.pos++, e = {
        min: 0,
        max: 0
      }) : e = {
        min: 1,
        max: 0
      };
      break;
    case ca:
      e = Bd(r);
      break;
    default:
      return null;
  }
  return {
    type: "Multiplier",
    comma: t,
    min: e.min,
    max: e.max,
    term: null
  };
}
function Yr(r, e) {
  const t = jx(r);
  return t !== null ? (t.term = e, r.charCode() === Wc && r.charCodeAt(r.pos - 1) === Zc ? Yr(r, t) : t) : e;
}
function Xo(r) {
  const e = r.peek();
  return e === "" ? null : {
    type: "Token",
    value: e
  };
}
function Ux(r) {
  let e;
  return r.eat(Qc), r.eat(la), e = Vr(r), r.eat(la), r.eat(xp), Yr(r, {
    type: "Property",
    name: e
  });
}
function Hx(r) {
  let e = null, t = null, n = 1;
  return r.eat(Ma), r.charCode() === _d && (r.peek(), n = -1), n == -1 && r.charCode() === zd ? r.peek() : (e = n * Number(da(r)), Vi[r.charCode()] !== 0 && (e += Vr(r))), ua(r), r.eat(Xc), ua(r), r.charCode() === zd ? r.peek() : (n = 1, r.charCode() === _d && (r.peek(), n = -1), t = n * Number(da(r)), Vi[r.charCode()] !== 0 && (t += Vr(r))), r.eat(Jc), {
    type: "Range",
    min: e,
    max: t
  };
}
function Vx(r) {
  let e, t = null;
  return r.eat(Qc), e = Vr(r), r.charCode() === wp && r.nextCharCode() === Bx && (r.pos += 2, e += "()"), r.charCodeAt(r.findWsEnd(r.pos)) === Ma && (ua(r), t = Hx(r)), r.eat(xp), Yr(r, {
    type: "Type",
    name: e,
    opts: t
  });
}
function Yx(r) {
  const e = Vr(r);
  return r.charCode() === wp ? (r.pos++, {
    type: "Function",
    name: e
  }) : Yr(r, {
    type: "Keyword",
    name: e
  });
}
function Kx(r, e) {
  function t(i, s) {
    return {
      type: "Group",
      terms: i,
      combinator: s,
      disallowEmpty: !1,
      explicit: !1
    };
  }
  let n;
  for (e = Object.keys(e).sort((i, s) => Pd[i] - Pd[s]); e.length > 0; ) {
    n = e.shift();
    let i = 0, s = 0;
    for (; i < r.length; i++) {
      const a = r[i];
      a.type === "Combinator" && (a.value === n ? (s === -1 && (s = i - 1), r.splice(i, 1), i--) : (s !== -1 && i - s > 1 && (r.splice(
        s,
        i - s,
        t(r.slice(s, i), n)
      ), i = s + 1), s = -1));
    }
    s !== -1 && e.length && r.splice(
      s,
      i - s,
      t(r.slice(s, i), n)
    );
  }
  return n;
}
function Sp(r) {
  const e = [], t = {};
  let n, i = null, s = r.pos;
  for (; n = Wx(r); )
    n.type !== "Spaces" && (n.type === "Combinator" ? ((i === null || i.type === "Combinator") && (r.pos = s, r.error("Unexpected combinator")), t[n.value] = !0) : i !== null && i.type !== "Combinator" && (t[" "] = !0, e.push({
      type: "Combinator",
      value: " "
    })), e.push(n), i = n, s = r.pos);
  return i !== null && i.type === "Combinator" && (r.pos -= s, r.error("Unexpected combinator")), {
    type: "Group",
    terms: e,
    combinator: Kx(e, t) || " ",
    disallowEmpty: !1,
    explicit: !1
  };
}
function Gx(r) {
  let e;
  return r.eat(Ma), e = Sp(r), r.eat(Jc), e.explicit = !0, r.charCode() === vp && (r.pos++, e.disallowEmpty = !0), e;
}
function Wx(r) {
  let e = r.charCode();
  if (e < 128 && Vi[e] === 1)
    return Yx(r);
  switch (e) {
    case Jc:
      break;
    case Ma:
      return Yr(r, Gx(r));
    case Qc:
      return r.nextCharCode() === la ? Ux(r) : Vx(r);
    case qd:
      return {
        type: "Combinator",
        value: r.substringToPos(
          r.pos + (r.nextCharCode() === qd ? 2 : 1)
        )
      };
    case Md:
      return r.pos++, r.eat(Md), {
        type: "Combinator",
        value: "&&"
      };
    case Xc:
      return r.pos++, {
        type: "Comma"
      };
    case la:
      return Yr(r, {
        type: "String",
        value: $x(r)
      });
    case Px:
    case _x:
    case qx:
    case zx:
    case Rx:
      return {
        type: "Spaces",
        value: ua(r)
      };
    case Fx:
      return e = r.nextCharCode(), e < 128 && Vi[e] === 1 ? (r.pos++, {
        type: "AtKeyword",
        name: Vr(r)
      }) : Xo(r);
    case kp:
    case Zc:
    case Fl:
    case Wc:
    case vp:
      break;
    case ca:
      if (e = r.nextCharCode(), e < 48 || e > 57)
        return Xo(r);
      break;
    default:
      return Xo(r);
  }
}
function Ap(r) {
  const e = new Mx(r), t = Sp(e);
  return e.pos !== r.length && e.error("Unexpected input"), t.terms.length === 1 && t.terms[0].type === "Group" ? t.terms[0] : t;
}
const Ai = function() {
};
function Fd(r) {
  return typeof r == "function" ? r : Ai;
}
function Zx(r, e, t) {
  function n(a) {
    switch (i.call(t, a), a.type) {
      case "Group":
        a.terms.forEach(n);
        break;
      case "Multiplier":
        n(a.term);
        break;
      case "Type":
      case "Property":
      case "Keyword":
      case "AtKeyword":
      case "Function":
      case "String":
      case "Token":
      case "Comma":
        break;
      default:
        throw new Error("Unknown type: " + a.type);
    }
    s.call(t, a);
  }
  let i = Ai, s = Ai;
  if (typeof e == "function" ? i = e : e && (i = Fd(e.enter), s = Fd(e.leave)), i === Ai && s === Ai)
    throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
  n(r);
}
const Xx = {
  decorator(r) {
    const e = [];
    let t = null;
    return _e(H({}, r), {
      node(n) {
        const i = t;
        t = n, r.node.call(this, n), t = i;
      },
      emit(n, i, s) {
        e.push({
          type: i,
          value: n,
          node: s ? null : t
        });
      },
      result() {
        return e;
      }
    });
  }
};
function Qx(r) {
  const e = [];
  return La(
    r,
    (t, n, i) => e.push({
      type: t,
      value: r.slice(n, i),
      node: null
    })
  ), e;
}
function Jx(r, e) {
  return typeof r == "string" ? Qx(r) : e.generate(r, Xx);
}
const X = { type: "Match" }, ee = { type: "Mismatch" }, eu = { type: "DisallowEmpty" }, eS = 40, tS = 41;
function Te(r, e, t) {
  return e === X && t === ee || r === X && e === X && t === X ? r : (r.type === "If" && r.else === ee && e === X && (e = r.then, r = r.match), {
    type: "If",
    match: r,
    then: e,
    else: t
  });
}
function Ep(r) {
  return r.length > 2 && r.charCodeAt(r.length - 2) === eS && r.charCodeAt(r.length - 1) === tS;
}
function $d(r) {
  return r.type === "Keyword" || r.type === "AtKeyword" || r.type === "Function" || r.type === "Type" && Ep(r.name);
}
function $l(r, e, t) {
  switch (r) {
    case " ": {
      let n = X;
      for (let i = e.length - 1; i >= 0; i--) {
        const s = e[i];
        n = Te(
          s,
          n,
          ee
        );
      }
      return n;
    }
    case "|": {
      let n = ee, i = null;
      for (let s = e.length - 1; s >= 0; s--) {
        let a = e[s];
        if ($d(a) && (i === null && s > 0 && $d(e[s - 1]) && (i = /* @__PURE__ */ Object.create(null), n = Te(
          {
            type: "Enum",
            map: i
          },
          X,
          n
        )), i !== null)) {
          const o = (Ep(a.name) ? a.name.slice(0, -1) : a.name).toLowerCase();
          if (!(o in i)) {
            i[o] = a;
            continue;
          }
        }
        i = null, n = Te(
          a,
          X,
          n
        );
      }
      return n;
    }
    case "&&": {
      if (e.length > 5)
        return {
          type: "MatchOnce",
          terms: e,
          all: !0
        };
      let n = ee;
      for (let i = e.length - 1; i >= 0; i--) {
        const s = e[i];
        let a;
        e.length > 1 ? a = $l(
          r,
          e.filter(function(o) {
            return o !== s;
          }),
          !1
        ) : a = X, n = Te(
          s,
          a,
          n
        );
      }
      return n;
    }
    case "||": {
      if (e.length > 5)
        return {
          type: "MatchOnce",
          terms: e,
          all: !1
        };
      let n = t ? X : ee;
      for (let i = e.length - 1; i >= 0; i--) {
        const s = e[i];
        let a;
        e.length > 1 ? a = $l(
          r,
          e.filter(function(o) {
            return o !== s;
          }),
          !0
        ) : a = X, n = Te(
          s,
          a,
          n
        );
      }
      return n;
    }
  }
}
function nS(r) {
  let e = X, t = tu(r.term);
  if (r.max === 0)
    t = Te(
      t,
      eu,
      ee
    ), e = Te(
      t,
      null,
      // will be a loop
      ee
    ), e.then = Te(
      X,
      X,
      e
      // make a loop
    ), r.comma && (e.then.else = Te(
      { type: "Comma", syntax: r },
      e,
      ee
    ));
  else
    for (let n = r.min || 1; n <= r.max; n++)
      r.comma && e !== X && (e = Te(
        { type: "Comma", syntax: r },
        e,
        ee
      )), e = Te(
        t,
        Te(
          X,
          X,
          e
        ),
        ee
      );
  if (r.min === 0)
    e = Te(
      X,
      X,
      e
    );
  else
    for (let n = 0; n < r.min - 1; n++)
      r.comma && e !== X && (e = Te(
        { type: "Comma", syntax: r },
        e,
        ee
      )), e = Te(
        t,
        e,
        ee
      );
  return e;
}
function tu(r) {
  if (typeof r == "function")
    return {
      type: "Generic",
      fn: r
    };
  switch (r.type) {
    case "Group": {
      let e = $l(
        r.combinator,
        r.terms.map(tu),
        !1
      );
      return r.disallowEmpty && (e = Te(
        e,
        eu,
        ee
      )), e;
    }
    case "Multiplier":
      return nS(r);
    case "Type":
    case "Property":
      return {
        type: r.type,
        name: r.name,
        syntax: r
      };
    case "Keyword":
      return {
        type: r.type,
        name: r.name.toLowerCase(),
        syntax: r
      };
    case "AtKeyword":
      return {
        type: r.type,
        name: "@" + r.name.toLowerCase(),
        syntax: r
      };
    case "Function":
      return {
        type: r.type,
        name: r.name.toLowerCase() + "(",
        syntax: r
      };
    case "String":
      return r.value.length === 3 ? {
        type: "Token",
        value: r.value.charAt(1),
        syntax: r
      } : {
        type: r.type,
        value: r.value.substr(1, r.value.length - 2).replace(/\\'/g, "'"),
        syntax: r
      };
    case "Token":
      return {
        type: r.type,
        value: r.value,
        syntax: r
      };
    case "Comma":
      return {
        type: r.type,
        syntax: r
      };
    default:
      throw new Error("Unknown node type:", r.type);
  }
}
function jl(r, e) {
  return typeof r == "string" && (r = Ap(r)), {
    type: "MatchGraph",
    match: tu(r),
    syntax: e || null,
    source: r
  };
}
const { hasOwnProperty: jd } = Object.prototype, rS = 0, iS = 1, Ul = 2, Cp = 3, Ud = "Match", sS = "Mismatch", aS = "Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)", Hd = 15e3;
function oS(r) {
  let e = null, t = null, n = r;
  for (; n !== null; )
    t = n.prev, n.prev = e, e = n, n = t;
  return e;
}
function Qo(r, e) {
  if (r.length !== e.length)
    return !1;
  for (let t = 0; t < r.length; t++) {
    const n = e.charCodeAt(t);
    let i = r.charCodeAt(t);
    if (i >= 65 && i <= 90 && (i = i | 32), i !== n)
      return !1;
  }
  return !0;
}
function lS(r) {
  return r.type !== K ? !1 : r.value !== "?";
}
function Vd(r) {
  return r === null ? !0 : r.type === Wt || r.type === G || r.type === ve || r.type === We || r.type === Ne || lS(r);
}
function Yd(r) {
  return r === null ? !0 : r.type === te || r.type === xt || r.type === st || r.type === K && r.value === "/";
}
function cS(r, e, t) {
  function n() {
    do
      S++, y = S < r.length ? r[S] : null;
    while (y !== null && (y.type === ce || y.type === Re));
  }
  function i(D) {
    const M = S + D;
    return M < r.length ? r[M] : null;
  }
  function s(D, M) {
    return {
      nextState: D,
      matchStack: C,
      syntaxStack: f,
      thenStack: h,
      tokenIndex: S,
      prev: M
    };
  }
  function a(D) {
    h = {
      nextState: D,
      matchStack: C,
      syntaxStack: f,
      prev: h
    };
  }
  function o(D) {
    g = s(D, g);
  }
  function l() {
    C = {
      type: iS,
      syntax: e.syntax,
      token: y,
      prev: C
    }, n(), m = null, S > E && (E = S);
  }
  function c() {
    f = {
      syntax: e.syntax,
      opts: e.syntax.opts || f !== null && f.opts || null,
      prev: f
    }, C = {
      type: Ul,
      syntax: e.syntax,
      token: C.token,
      prev: C
    };
  }
  function d() {
    C.type === Ul ? C = C.prev : C = {
      type: Cp,
      syntax: f.syntax,
      token: C.token,
      prev: C
    }, f = f.prev;
  }
  let f = null, h = null, g = null, m = null, b = 0, k = null, y = null, S = -1, E = 0, C = {
    type: rS,
    syntax: null,
    token: null,
    prev: null
  };
  for (n(); k === null && ++b < Hd; )
    switch (e.type) {
      case "Match":
        if (h === null) {
          if (y !== null && (S !== r.length - 1 || y.value !== "\\0" && y.value !== "\\9")) {
            e = ee;
            break;
          }
          k = Ud;
          break;
        }
        if (e = h.nextState, e === eu)
          if (h.matchStack === C) {
            e = ee;
            break;
          } else
            e = X;
        for (; h.syntaxStack !== f; )
          d();
        h = h.prev;
        break;
      case "Mismatch":
        if (m !== null && m !== !1)
          (g === null || S > g.tokenIndex) && (g = m, m = !1);
        else if (g === null) {
          k = sS;
          break;
        }
        e = g.nextState, h = g.thenStack, f = g.syntaxStack, C = g.matchStack, S = g.tokenIndex, y = S < r.length ? r[S] : null, g = g.prev;
        break;
      case "MatchGraph":
        e = e.match;
        break;
      case "If":
        e.else !== ee && o(e.else), e.then !== X && a(e.then), e = e.match;
        break;
      case "MatchOnce":
        e = {
          type: "MatchOnceBuffer",
          syntax: e,
          index: 0,
          mask: 0
        };
        break;
      case "MatchOnceBuffer": {
        const N = e.syntax.terms;
        if (e.index === N.length) {
          if (e.mask === 0 || e.syntax.all) {
            e = ee;
            break;
          }
          e = X;
          break;
        }
        if (e.mask === (1 << N.length) - 1) {
          e = X;
          break;
        }
        for (; e.index < N.length; e.index++) {
          const x = 1 << e.index;
          if (!(e.mask & x)) {
            o(e), a({
              type: "AddMatchOnce",
              syntax: e.syntax,
              mask: e.mask | x
            }), e = N[e.index++];
            break;
          }
        }
        break;
      }
      case "AddMatchOnce":
        e = {
          type: "MatchOnceBuffer",
          syntax: e.syntax,
          index: 0,
          mask: e.mask
        };
        break;
      case "Enum":
        if (y !== null) {
          let N = y.value.toLowerCase();
          if (N.indexOf("\\") !== -1 && (N = N.replace(/\\[09].*$/, "")), jd.call(e.map, N)) {
            e = e.map[N];
            break;
          }
        }
        e = ee;
        break;
      case "Generic": {
        const N = f !== null ? f.opts : null, x = S + Math.floor(e.fn(y, i, N));
        if (!isNaN(x) && x > S) {
          for (; S < x; )
            l();
          e = X;
        } else
          e = ee;
        break;
      }
      case "Type":
      case "Property": {
        const N = e.type === "Type" ? "types" : "properties", x = jd.call(t, N) ? t[N][e.name] : null;
        if (!x || !x.match)
          throw new Error(
            "Bad syntax reference: " + (e.type === "Type" ? "<" + e.name + ">" : "<'" + e.name + "'>")
          );
        if (m !== !1 && y !== null && e.type === "Type" && // https://drafts.csswg.org/css-values-4/#custom-idents
        // When parsing positionally-ambiguous keywords in a property value, a <custom-ident> production
        // can only claim the keyword if no other unfulfilled production can claim it.
        (e.name === "custom-ident" && y.type === R || // https://drafts.csswg.org/css-values-4/#lengths
        // ... if a `0` could be parsed as either a <number> or a <length> in a property (such as line-height),
        // it must parse as a <number>
        e.name === "length" && y.value === "0")) {
          m === null && (m = s(e, g)), e = ee;
          break;
        }
        c(), e = x.match;
        break;
      }
      case "Keyword": {
        const N = e.name;
        if (y !== null) {
          let x = y.value;
          if (x.indexOf("\\") !== -1 && (x = x.replace(/\\[09].*$/, "")), Qo(x, N)) {
            l(), e = X;
            break;
          }
        }
        e = ee;
        break;
      }
      case "AtKeyword":
      case "Function":
        if (y !== null && Qo(y.value, e.name)) {
          l(), e = X;
          break;
        }
        e = ee;
        break;
      case "Token":
        if (y !== null && y.value === e.value) {
          l(), e = X;
          break;
        }
        e = ee;
        break;
      case "Comma":
        y !== null && y.type === Wt ? Vd(C.token) ? e = ee : (l(), e = Yd(y) ? ee : X) : e = Vd(C.token) || Yd(y) ? X : ee;
        break;
      case "String":
        let D = "", M = S;
        for (; M < r.length && D.length < e.value.length; M++)
          D += r[M].value;
        if (Qo(D, e.value)) {
          for (; S < M; )
            l();
          e = X;
        } else
          e = ee;
        break;
      default:
        throw new Error("Unknown node type: " + e.type);
    }
  switch (k) {
    case null:
      console.warn("[csstree-match] BREAK after " + Hd + " iterations"), k = aS, C = null;
      break;
    case Ud:
      for (; f !== null; )
        d();
      break;
    default:
      C = null;
  }
  return {
    tokens: r,
    reason: k,
    iterations: b,
    match: C,
    longestMatch: E
  };
}
function Kd(r, e, t) {
  const n = cS(r, e, t || {});
  if (n.match === null)
    return n;
  let i = n.match, s = n.match = {
    syntax: e.syntax || null,
    match: []
  };
  const a = [s];
  for (i = oS(i).prev; i !== null; ) {
    switch (i.type) {
      case Ul:
        s.match.push(s = {
          syntax: i.syntax,
          match: []
        }), a.push(s);
        break;
      case Cp:
        a.pop(), s = a[a.length - 1];
        break;
      default:
        s.match.push({
          syntax: i.syntax || null,
          token: i.token.value,
          node: i.token.node
        });
    }
    i = i.prev;
  }
  return n;
}
function Tp(r) {
  function e(i) {
    return i === null ? !1 : i.type === "Type" || i.type === "Property" || i.type === "Keyword";
  }
  function t(i) {
    if (Array.isArray(i.match)) {
      for (let s = 0; s < i.match.length; s++)
        if (t(i.match[s]))
          return e(i.syntax) && n.unshift(i.syntax), !0;
    } else if (i.node === r)
      return n = e(i.syntax) ? [i.syntax] : [], !0;
    return !1;
  }
  let n = null;
  return this.matched !== null && t(this.matched), n;
}
function uS(r, e) {
  return nu(this, r, (t) => t.type === "Type" && t.name === e);
}
function dS(r, e) {
  return nu(this, r, (t) => t.type === "Property" && t.name === e);
}
function hS(r) {
  return nu(this, r, (e) => e.type === "Keyword");
}
function nu(r, e, t) {
  const n = Tp.call(r, e);
  return n === null ? !1 : n.some(t);
}
const fS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getTrace: Tp,
  isKeyword: hS,
  isProperty: dS,
  isType: uS
}, Symbol.toStringTag, { value: "Module" }));
function Lp(r) {
  return "node" in r ? r.node : Lp(r.match[0]);
}
function Dp(r) {
  return "node" in r ? r.node : Dp(r.match[r.match.length - 1]);
}
function Gd(r, e, t, n, i) {
  function s(o) {
    if (o.syntax !== null && o.syntax.type === n && o.syntax.name === i) {
      const l = Lp(o), c = Dp(o);
      r.syntax.walk(e, function(d, f, h) {
        if (d === l) {
          const g = new fe();
          do {
            if (g.appendData(f.data), f.data === c)
              break;
            f = f.next;
          } while (f !== null);
          a.push({
            parent: h,
            nodes: g
          });
        }
      });
    }
    Array.isArray(o.match) && o.match.forEach(s);
  }
  const a = [];
  return t.matched !== null && s(t.matched), a;
}
const { hasOwnProperty: Di } = Object.prototype;
function Jo(r) {
  return typeof r == "number" && isFinite(r) && Math.floor(r) === r && r >= 0;
}
function Wd(r) {
  return !!r && Jo(r.offset) && Jo(r.line) && Jo(r.column);
}
function pS(r, e) {
  return function(t, n) {
    if (!t || t.constructor !== Object)
      return n(t, "Type of node should be an Object");
    for (let i in t) {
      let s = !0;
      if (Di.call(t, i) !== !1) {
        if (i === "type")
          t.type !== r && n(t, "Wrong node type `" + t.type + "`, expected `" + r + "`");
        else if (i === "loc") {
          if (t.loc === null)
            continue;
          if (t.loc && t.loc.constructor === Object)
            if (typeof t.loc.source != "string")
              i += ".source";
            else if (!Wd(t.loc.start))
              i += ".start";
            else if (!Wd(t.loc.end))
              i += ".end";
            else
              continue;
          s = !1;
        } else if (e.hasOwnProperty(i)) {
          s = !1;
          for (let a = 0; !s && a < e[i].length; a++) {
            const o = e[i][a];
            switch (o) {
              case String:
                s = typeof t[i] == "string";
                break;
              case Boolean:
                s = typeof t[i] == "boolean";
                break;
              case null:
                s = t[i] === null;
                break;
              default:
                typeof o == "string" ? s = t[i] && t[i].type === o : Array.isArray(o) && (s = t[i] instanceof fe);
            }
          }
        } else
          n(t, "Unknown field `" + i + "` for " + r + " node type");
        s || n(t, "Bad value for `" + r + "." + i + "`");
      }
    }
    for (const i in e)
      Di.call(e, i) && Di.call(t, i) === !1 && n(t, "Field `" + r + "." + i + "` is missed");
  };
}
function gS(r, e) {
  const t = e.structure, n = {
    type: String,
    loc: !0
  }, i = {
    type: '"' + r + '"'
  };
  for (const s in t) {
    if (Di.call(t, s) === !1)
      continue;
    const a = [], o = n[s] = Array.isArray(t[s]) ? t[s].slice() : [t[s]];
    for (let l = 0; l < o.length; l++) {
      const c = o[l];
      if (c === String || c === Boolean)
        a.push(c.name);
      else if (c === null)
        a.push("null");
      else if (typeof c == "string")
        a.push("<" + c + ">");
      else if (Array.isArray(c))
        a.push("List");
      else
        throw new Error("Wrong value `" + c + "` in `" + r + "." + s + "` structure definition");
    }
    i[s] = a.join(" | ");
  }
  return {
    docs: i,
    check: pS(r, n)
  };
}
function mS(r) {
  const e = {};
  if (r.node) {
    for (const t in r.node)
      if (Di.call(r.node, t)) {
        const n = r.node[t];
        if (n.structure)
          e[t] = gS(t, n);
        else
          throw new Error("Missed `structure` field in `" + t + "` node type definition");
      }
  }
  return e;
}
const bS = jl(hp.join(" | "));
function Hl(r, e, t) {
  const n = {};
  for (const i in r)
    r[i].syntax && (n[i] = t ? r[i].syntax : Yc(r[i].syntax, { compact: e }));
  return n;
}
function yS(r, e, t) {
  const n = {};
  for (const [i, s] of Object.entries(r))
    n[i] = {
      prelude: s.prelude && (t ? s.prelude.syntax : Yc(s.prelude.syntax, { compact: e })),
      descriptors: s.descriptors && Hl(s.descriptors, e, t)
    };
  return n;
}
function vS(r) {
  for (let e = 0; e < r.length; e++)
    if (r[e].value.toLowerCase() === "var(")
      return !0;
  return !1;
}
function ft(r, e, t) {
  return H({
    matched: r,
    iterations: t,
    error: e
  }, fS);
}
function br(r, e, t, n) {
  const i = Jx(t, r.syntax);
  let s;
  return vS(i) ? ft(null, new Error("Matching for a tree with var() is not supported")) : (n && (s = Kd(i, r.cssWideKeywordsSyntax, r)), (!n || !s.match) && (s = Kd(i, e.match, r), !s.match) ? ft(
    null,
    new Wk(s.reason, e.syntax, t, s),
    s.iterations
  ) : ft(s.match, null, s.iterations));
}
class Zd {
  constructor(e, t, n) {
    if (this.cssWideKeywordsSyntax = bS, this.syntax = t, this.generic = !1, this.units = H({}, Nd), this.atrules = /* @__PURE__ */ Object.create(null), this.properties = /* @__PURE__ */ Object.create(null), this.types = /* @__PURE__ */ Object.create(null), this.structure = n || mS(e), e) {
      if (e.units)
        for (const i of Object.keys(Nd))
          Array.isArray(e.units[i]) && (this.units[i] = e.units[i]);
      if (e.types)
        for (const i in e.types)
          this.addType_(i, e.types[i]);
      if (e.generic) {
        this.generic = !0;
        for (const [i, s] of Object.entries(yx(this.units)))
          this.addType_(i, s);
      }
      if (e.atrules)
        for (const i in e.atrules)
          this.addAtrule_(i, e.atrules[i]);
      if (e.properties)
        for (const i in e.properties)
          this.addProperty_(i, e.properties[i]);
    }
  }
  checkStructure(e) {
    function t(s, a) {
      i.push({ node: s, message: a });
    }
    const n = this.structure, i = [];
    return this.syntax.walk(e, function(s) {
      n.hasOwnProperty(s.type) ? n[s.type].check(s, t) : t(s, "Unknown node type `" + s.type + "`");
    }), i.length ? i : !1;
  }
  createDescriptor(e, t, n, i = null) {
    const s = {
      type: t,
      name: n
    }, a = {
      type: t,
      name: n,
      parent: i,
      serializable: typeof e == "string" || e && typeof e.type == "string",
      syntax: null,
      match: null
    };
    return typeof e == "function" ? a.match = jl(e, s) : (typeof e == "string" ? Object.defineProperty(a, "syntax", {
      get() {
        return Object.defineProperty(a, "syntax", {
          value: Ap(e)
        }), a.syntax;
      }
    }) : a.syntax = e, Object.defineProperty(a, "match", {
      get() {
        return Object.defineProperty(a, "match", {
          value: jl(a.syntax, s)
        }), a.match;
      }
    })), a;
  }
  addAtrule_(e, t) {
    t && (this.atrules[e] = {
      type: "Atrule",
      name: e,
      prelude: t.prelude ? this.createDescriptor(t.prelude, "AtrulePrelude", e) : null,
      descriptors: t.descriptors ? Object.keys(t.descriptors).reduce(
        (n, i) => (n[i] = this.createDescriptor(t.descriptors[i], "AtruleDescriptor", i, e), n),
        /* @__PURE__ */ Object.create(null)
      ) : null
    });
  }
  addProperty_(e, t) {
    t && (this.properties[e] = this.createDescriptor(t, "Property", e));
  }
  addType_(e, t) {
    t && (this.types[e] = this.createDescriptor(t, "Type", e));
  }
  checkAtruleName(e) {
    if (!this.getAtrule(e))
      return new vi("Unknown at-rule", "@" + e);
  }
  checkAtrulePrelude(e, t) {
    const n = this.checkAtruleName(e);
    if (n)
      return n;
    const i = this.getAtrule(e);
    if (!i.prelude && t)
      return new SyntaxError("At-rule `@" + e + "` should not contain a prelude");
    if (i.prelude && !t && !br(this, i.prelude, "", !1).matched)
      return new SyntaxError("At-rule `@" + e + "` should contain a prelude");
  }
  checkAtruleDescriptorName(e, t) {
    const n = this.checkAtruleName(e);
    if (n)
      return n;
    const i = this.getAtrule(e), s = Go(t);
    if (!i.descriptors)
      return new SyntaxError("At-rule `@" + e + "` has no known descriptors");
    if (!i.descriptors[s.name] && !i.descriptors[s.basename])
      return new vi("Unknown at-rule descriptor", t);
  }
  checkPropertyName(e) {
    if (!this.getProperty(e))
      return new vi("Unknown property", e);
  }
  matchAtrulePrelude(e, t) {
    const n = this.checkAtrulePrelude(e, t);
    if (n)
      return ft(null, n);
    const i = this.getAtrule(e);
    return i.prelude ? br(this, i.prelude, t || "", !1) : ft(null, null);
  }
  matchAtruleDescriptor(e, t, n) {
    const i = this.checkAtruleDescriptorName(e, t);
    if (i)
      return ft(null, i);
    const s = this.getAtrule(e), a = Go(t);
    return br(this, s.descriptors[a.name] || s.descriptors[a.basename], n, !1);
  }
  matchDeclaration(e) {
    return e.type !== "Declaration" ? ft(null, new Error("Not a Declaration node")) : this.matchProperty(e.property, e.value);
  }
  matchProperty(e, t) {
    if (Od(e).custom)
      return ft(null, new Error("Lexer matching doesn't applicable for custom properties"));
    const n = this.checkPropertyName(e);
    return n ? ft(null, n) : br(this, this.getProperty(e), t, !0);
  }
  matchType(e, t) {
    const n = this.getType(e);
    return n ? br(this, n, t, !1) : ft(null, new vi("Unknown type", e));
  }
  match(e, t) {
    return typeof e != "string" && (!e || !e.type) ? ft(null, new vi("Bad syntax")) : ((typeof e == "string" || !e.match) && (e = this.createDescriptor(e, "Type", "anonymous")), br(this, e, t, !1));
  }
  findValueFragments(e, t, n, i) {
    return Gd(this, t, this.matchProperty(e, t), n, i);
  }
  findDeclarationValueFragments(e, t, n) {
    return Gd(this, e.value, this.matchDeclaration(e), t, n);
  }
  findAllFragments(e, t, n) {
    const i = [];
    return this.syntax.walk(e, {
      visit: "Declaration",
      enter: (s) => {
        i.push.apply(i, this.findDeclarationValueFragments(s, t, n));
      }
    }), i;
  }
  getAtrule(e, t = !0) {
    const n = Go(e);
    return (n.vendor && t ? this.atrules[n.name] || this.atrules[n.basename] : this.atrules[n.name]) || null;
  }
  getAtrulePrelude(e, t = !0) {
    const n = this.getAtrule(e, t);
    return n && n.prelude || null;
  }
  getAtruleDescriptor(e, t) {
    return this.atrules.hasOwnProperty(e) && this.atrules.declarators && this.atrules[e].declarators[t] || null;
  }
  getProperty(e, t = !0) {
    const n = Od(e);
    return (n.vendor && t ? this.properties[n.name] || this.properties[n.basename] : this.properties[n.name]) || null;
  }
  getType(e) {
    return hasOwnProperty.call(this.types, e) ? this.types[e] : null;
  }
  validate() {
    function e(i, s, a, o) {
      if (a.has(s))
        return a.get(s);
      a.set(s, !1), o.syntax !== null && Zx(o.syntax, function(l) {
        if (l.type !== "Type" && l.type !== "Property")
          return;
        const c = l.type === "Type" ? i.types : i.properties, d = l.type === "Type" ? t : n;
        (!hasOwnProperty.call(c, l.name) || e(i, l.name, d, c[l.name])) && a.set(s, !0);
      }, this);
    }
    let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    for (const i in this.types)
      e(this, i, t, this.types[i]);
    for (const i in this.properties)
      e(this, i, n, this.properties[i]);
    return t = [...t.keys()].filter((i) => t.get(i)), n = [...n.keys()].filter((i) => n.get(i)), t.length || n.length ? {
      types: t,
      properties: n
    } : null;
  }
  dump(e, t) {
    return {
      generic: this.generic,
      units: this.units,
      types: Hl(this.types, !t, e),
      properties: Hl(this.properties, !t, e),
      atrules: yS(this.atrules, !t, e)
    };
  }
  toString() {
    return JSON.stringify(this.dump());
  }
}
function el(r, e) {
  return typeof e == "string" && /^\s*\|/.test(e) ? typeof r == "string" ? r + e : e.replace(/^\s*\|\s*/, "") : e || null;
}
function Xd(r, e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const [n, i] of Object.entries(r))
    if (i) {
      t[n] = {};
      for (const s of Object.keys(i))
        e.includes(s) && (t[n][s] = i[s]);
    }
  return t;
}
function Vl(r, e) {
  const t = H({}, r);
  for (const [n, i] of Object.entries(e))
    switch (n) {
      case "generic":
        t[n] = !!i;
        break;
      case "units":
        t[n] = H({}, r[n]);
        for (const [s, a] of Object.entries(i))
          t[n][s] = Array.isArray(a) ? a : [];
        break;
      case "atrules":
        t[n] = H({}, r[n]);
        for (const [s, a] of Object.entries(i)) {
          const o = t[n][s] || {}, l = t[n][s] = {
            prelude: o.prelude || null,
            descriptors: H({}, o.descriptors)
          };
          if (a) {
            l.prelude = a.prelude ? el(l.prelude, a.prelude) : l.prelude || null;
            for (const [c, d] of Object.entries(a.descriptors || {}))
              l.descriptors[c] = d ? el(l.descriptors[c], d) : null;
            Object.keys(l.descriptors).length || (l.descriptors = null);
          }
        }
        break;
      case "types":
      case "properties":
        t[n] = H({}, r[n]);
        for (const [s, a] of Object.entries(i))
          t[n][s] = el(t[n][s], a);
        break;
      case "scope":
        t[n] = H({}, r[n]);
        for (const [s, a] of Object.entries(i))
          t[n][s] = H(H({}, t[n][s]), a);
        break;
      case "parseContext":
        t[n] = H(H({}, r[n]), i);
        break;
      case "atrule":
      case "pseudo":
        t[n] = H(H({}, r[n]), Xd(i, ["parse"]));
        break;
      case "node":
        t[n] = H(H({}, r[n]), Xd(i, ["name", "structure", "parse", "generate", "walkContext"]));
        break;
    }
  return t;
}
function Ip(r) {
  const e = Ek(r), t = Uk(r), n = Bk(r), { fromPlainObject: i, toPlainObject: s } = Fk(t), a = {
    lexer: null,
    createLexer: (o) => new Zd(o, a, a.lexer.structure),
    tokenize: La,
    parse: e,
    generate: n,
    walk: t,
    find: t.find,
    findLast: t.findLast,
    findAll: t.findAll,
    fromPlainObject: i,
    toPlainObject: s,
    fork(o) {
      const l = Vl({}, r);
      return Ip(
        typeof o == "function" ? o(l, Object.assign) : Vl(l, o)
      );
    }
  };
  return a.lexer = new Zd({
    generic: !0,
    units: r.units,
    types: r.types,
    atrules: r.atrules,
    properties: r.properties,
    node: r.node
  }, a), a;
}
const wS = (r) => Ip(Vl({}, r)), kS = {
  generic: !0,
  units: {
    angle: [
      "deg",
      "grad",
      "rad",
      "turn"
    ],
    decibel: [
      "db"
    ],
    flex: [
      "fr"
    ],
    frequency: [
      "hz",
      "khz"
    ],
    length: [
      "cm",
      "mm",
      "q",
      "in",
      "pt",
      "pc",
      "px",
      "em",
      "rem",
      "ex",
      "rex",
      "cap",
      "rcap",
      "ch",
      "rch",
      "ic",
      "ric",
      "lh",
      "rlh",
      "vw",
      "svw",
      "lvw",
      "dvw",
      "vh",
      "svh",
      "lvh",
      "dvh",
      "vi",
      "svi",
      "lvi",
      "dvi",
      "vb",
      "svb",
      "lvb",
      "dvb",
      "vmin",
      "svmin",
      "lvmin",
      "dvmin",
      "vmax",
      "svmax",
      "lvmax",
      "dvmax",
      "cqw",
      "cqh",
      "cqi",
      "cqb",
      "cqmin",
      "cqmax"
    ],
    resolution: [
      "dpi",
      "dpcm",
      "dppx",
      "x"
    ],
    semitones: [
      "st"
    ],
    time: [
      "s",
      "ms"
    ]
  },
  types: {
    "abs()": "abs( <calc-sum> )",
    "absolute-size": "xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large",
    "acos()": "acos( <calc-sum> )",
    "alpha-value": "<number>|<percentage>",
    "angle-percentage": "<angle>|<percentage>",
    "angular-color-hint": "<angle-percentage>",
    "angular-color-stop": "<color>&&<color-stop-angle>?",
    "angular-color-stop-list": "[<angular-color-stop> [, <angular-color-hint>]?]# , <angular-color-stop>",
    "animateable-feature": "scroll-position|contents|<custom-ident>",
    "asin()": "asin( <calc-sum> )",
    "atan()": "atan( <calc-sum> )",
    "atan2()": "atan2( <calc-sum> , <calc-sum> )",
    attachment: "scroll|fixed|local",
    "attr()": "attr( <attr-name> <type-or-unit>? [, <attr-fallback>]? )",
    "attr-matcher": "['~'|'|'|'^'|'$'|'*']? '='",
    "attr-modifier": "i|s",
    "attribute-selector": "'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'",
    "auto-repeat": "repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )",
    "auto-track-list": "[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?",
    axis: "block|inline|vertical|horizontal",
    "baseline-position": "[first|last]? baseline",
    "basic-shape": "<inset()>|<circle()>|<ellipse()>|<polygon()>|<path()>",
    "bg-image": "none|<image>",
    "bg-layer": "<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
    "bg-position": "[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]",
    "bg-size": "[<length-percentage>|auto]{1,2}|cover|contain",
    "blur()": "blur( <length> )",
    "blend-mode": "normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity",
    box: "border-box|padding-box|content-box",
    "brightness()": "brightness( <number-percentage> )",
    "calc()": "calc( <calc-sum> )",
    "calc-sum": "<calc-product> [['+'|'-'] <calc-product>]*",
    "calc-product": "<calc-value> ['*' <calc-value>|'/' <number>]*",
    "calc-value": "<number>|<dimension>|<percentage>|<calc-constant>|( <calc-sum> )",
    "calc-constant": "e|pi|infinity|-infinity|NaN",
    "cf-final-image": "<image>|<color>",
    "cf-mixing-image": "<percentage>?&&<image>",
    "circle()": "circle( [<shape-radius>]? [at <position>]? )",
    "clamp()": "clamp( <calc-sum>#{3} )",
    "class-selector": "'.' <ident-token>",
    "clip-source": "<url>",
    color: "<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<hex-color>|<named-color>|currentcolor|<deprecated-system-color>",
    "color-stop": "<color-stop-length>|<color-stop-angle>",
    "color-stop-angle": "<angle-percentage>{1,2}",
    "color-stop-length": "<length-percentage>{1,2}",
    "color-stop-list": "[<linear-color-stop> [, <linear-color-hint>]?]# , <linear-color-stop>",
    combinator: "'>'|'+'|'~'|['||']",
    "common-lig-values": "[common-ligatures|no-common-ligatures]",
    "compat-auto": "searchfield|textarea|push-button|slider-horizontal|checkbox|radio|square-button|menulist|listbox|meter|progress-bar|button",
    "composite-style": "clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor",
    "compositing-operator": "add|subtract|intersect|exclude",
    "compound-selector": "[<type-selector>? <subclass-selector>* [<pseudo-element-selector> <pseudo-class-selector>*]*]!",
    "compound-selector-list": "<compound-selector>#",
    "complex-selector": "<compound-selector> [<combinator>? <compound-selector>]*",
    "complex-selector-list": "<complex-selector>#",
    "conic-gradient()": "conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )",
    "contextual-alt-values": "[contextual|no-contextual]",
    "content-distribution": "space-between|space-around|space-evenly|stretch",
    "content-list": "[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+",
    "content-position": "center|start|end|flex-start|flex-end",
    "content-replacement": "<image>",
    "contrast()": "contrast( [<number-percentage>] )",
    "cos()": "cos( <calc-sum> )",
    counter: "<counter()>|<counters()>",
    "counter()": "counter( <counter-name> , <counter-style>? )",
    "counter-name": "<custom-ident>",
    "counter-style": "<counter-style-name>|symbols( )",
    "counter-style-name": "<custom-ident>",
    "counters()": "counters( <counter-name> , <string> , <counter-style>? )",
    "cross-fade()": "cross-fade( <cf-mixing-image> , <cf-final-image>? )",
    "cubic-bezier-timing-function": "ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )",
    "deprecated-system-color": "ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText",
    "discretionary-lig-values": "[discretionary-ligatures|no-discretionary-ligatures]",
    "display-box": "contents|none",
    "display-inside": "flow|flow-root|table|flex|grid|ruby",
    "display-internal": "table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container",
    "display-legacy": "inline-block|inline-list-item|inline-table|inline-flex|inline-grid",
    "display-listitem": "<display-outside>?&&[flow|flow-root]?&&list-item",
    "display-outside": "block|inline|run-in",
    "drop-shadow()": "drop-shadow( <length>{2,3} <color>? )",
    "east-asian-variant-values": "[jis78|jis83|jis90|jis04|simplified|traditional]",
    "east-asian-width-values": "[full-width|proportional-width]",
    "element()": "element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )",
    "ellipse()": "ellipse( [<shape-radius>{2}]? [at <position>]? )",
    "ending-shape": "circle|ellipse",
    "env()": "env( <custom-ident> , <declaration-value>? )",
    "exp()": "exp( <calc-sum> )",
    "explicit-track-list": "[<line-names>? <track-size>]+ <line-names>?",
    "family-name": "<string>|<custom-ident>+",
    "feature-tag-value": "<string> [<integer>|on|off]?",
    "feature-type": "@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation",
    "feature-value-block": "<feature-type> '{' <feature-value-declaration-list> '}'",
    "feature-value-block-list": "<feature-value-block>+",
    "feature-value-declaration": "<custom-ident> : <integer>+ ;",
    "feature-value-declaration-list": "<feature-value-declaration>",
    "feature-value-name": "<custom-ident>",
    "fill-rule": "nonzero|evenodd",
    "filter-function": "<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>",
    "filter-function-list": "[<filter-function>|<url>]+",
    "final-bg-layer": "<'background-color'>||<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
    "fixed-breadth": "<length-percentage>",
    "fixed-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <fixed-size>]+ <line-names>? )",
    "fixed-size": "<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )",
    "font-stretch-absolute": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>",
    "font-variant-css21": "[normal|small-caps]",
    "font-weight-absolute": "normal|bold|<number [1,1000]>",
    "frequency-percentage": "<frequency>|<percentage>",
    "general-enclosed": "[<function-token> <any-value> )]|( <ident> <any-value> )",
    "generic-family": "serif|sans-serif|cursive|fantasy|monospace|-apple-system",
    "generic-name": "serif|sans-serif|cursive|fantasy|monospace",
    "geometry-box": "<shape-box>|fill-box|stroke-box|view-box",
    gradient: "<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>",
    "grayscale()": "grayscale( <number-percentage> )",
    "grid-line": "auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]",
    "historical-lig-values": "[historical-ligatures|no-historical-ligatures]",
    "hsl()": "hsl( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )",
    "hsla()": "hsla( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )",
    hue: "<number>|<angle>",
    "hue-rotate()": "hue-rotate( <angle> )",
    "hwb()": "hwb( [<hue>|none] [<percentage>|none] [<percentage>|none] [/ [<alpha-value>|none]]? )",
    "hypot()": "hypot( <calc-sum># )",
    image: "<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>",
    "image()": "image( <image-tags>? [<image-src>? , <color>?]! )",
    "image-set()": "image-set( <image-set-option># )",
    "image-set-option": "[<image>|<string>] [<resolution>||type( <string> )]",
    "image-src": "<url>|<string>",
    "image-tags": "ltr|rtl",
    "inflexible-breadth": "<length-percentage>|min-content|max-content|auto",
    "inset()": "inset( <length-percentage>{1,4} [round <'border-radius'>]? )",
    "invert()": "invert( <number-percentage> )",
    "keyframes-name": "<custom-ident>|<string>",
    "keyframe-block": "<keyframe-selector># { <declaration-list> }",
    "keyframe-block-list": "<keyframe-block>+",
    "keyframe-selector": "from|to|<percentage>",
    "lab()": "lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
    "layer()": "layer( <layer-name> )",
    "layer-name": "<ident> ['.' <ident>]*",
    "lch()": "lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
    "leader()": "leader( <leader-type> )",
    "leader-type": "dotted|solid|space|<string>",
    "length-percentage": "<length>|<percentage>",
    "line-names": "'[' <custom-ident>* ']'",
    "line-name-list": "[<line-names>|<name-repeat>]+",
    "line-style": "none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset",
    "line-width": "<length>|thin|medium|thick",
    "linear-color-hint": "<length-percentage>",
    "linear-color-stop": "<color> <color-stop-length>?",
    "linear-gradient()": "linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )",
    "log()": "log( <calc-sum> , <calc-sum>? )",
    "mask-layer": "<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>",
    "mask-position": "[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?",
    "mask-reference": "none|<image>|<mask-source>",
    "mask-source": "<url>",
    "masking-mode": "alpha|luminance|match-source",
    "matrix()": "matrix( <number>#{6} )",
    "matrix3d()": "matrix3d( <number>#{16} )",
    "max()": "max( <calc-sum># )",
    "media-and": "<media-in-parens> [and <media-in-parens>]+",
    "media-condition": "<media-not>|<media-and>|<media-or>|<media-in-parens>",
    "media-condition-without-or": "<media-not>|<media-and>|<media-in-parens>",
    "media-feature": "( [<mf-plain>|<mf-boolean>|<mf-range>] )",
    "media-in-parens": "( <media-condition> )|<media-feature>|<general-enclosed>",
    "media-not": "not <media-in-parens>",
    "media-or": "<media-in-parens> [or <media-in-parens>]+",
    "media-query": "<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?",
    "media-query-list": "<media-query>#",
    "media-type": "<ident>",
    "mf-boolean": "<mf-name>",
    "mf-name": "<ident>",
    "mf-plain": "<mf-name> : <mf-value>",
    "mf-range": "<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>",
    "mf-value": "<number>|<dimension>|<ident>|<ratio>",
    "min()": "min( <calc-sum># )",
    "minmax()": "minmax( [<length-percentage>|min-content|max-content|auto] , [<length-percentage>|<flex>|min-content|max-content|auto] )",
    "mod()": "mod( <calc-sum> , <calc-sum> )",
    "name-repeat": "repeat( [<integer [1,∞]>|auto-fill] , <line-names>+ )",
    "named-color": "transparent|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen|<-non-standard-color>",
    "namespace-prefix": "<ident>",
    "ns-prefix": "[<ident-token>|'*']? '|'",
    "number-percentage": "<number>|<percentage>",
    "numeric-figure-values": "[lining-nums|oldstyle-nums]",
    "numeric-fraction-values": "[diagonal-fractions|stacked-fractions]",
    "numeric-spacing-values": "[proportional-nums|tabular-nums]",
    nth: "<an-plus-b>|even|odd",
    "opacity()": "opacity( [<number-percentage>] )",
    "overflow-position": "unsafe|safe",
    "outline-radius": "<length>|<percentage>",
    "page-body": "<declaration>? [; <page-body>]?|<page-margin-box> <page-body>",
    "page-margin-box": "<page-margin-box-type> '{' <declaration-list> '}'",
    "page-margin-box-type": "@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom",
    "page-selector-list": "[<page-selector>#]?",
    "page-selector": "<pseudo-page>+|<ident> <pseudo-page>*",
    "page-size": "A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger",
    "path()": "path( [<fill-rule> ,]? <string> )",
    "paint()": "paint( <ident> , <declaration-value>? )",
    "perspective()": "perspective( [<length [0,∞]>|none] )",
    "polygon()": "polygon( <fill-rule>? , [<length-percentage> <length-percentage>]# )",
    position: "[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]",
    "pow()": "pow( <calc-sum> , <calc-sum> )",
    "pseudo-class-selector": "':' <ident-token>|':' <function-token> <any-value> ')'",
    "pseudo-element-selector": "':' <pseudo-class-selector>",
    "pseudo-page": ": [left|right|first|blank]",
    quote: "open-quote|close-quote|no-open-quote|no-close-quote",
    "radial-gradient()": "radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
    ratio: "<number [0,∞]> [/ <number [0,∞]>]?",
    "relative-selector": "<combinator>? <complex-selector>",
    "relative-selector-list": "<relative-selector>#",
    "relative-size": "larger|smaller",
    "rem()": "rem( <calc-sum> , <calc-sum> )",
    "repeat-style": "repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}",
    "repeating-conic-gradient()": "repeating-conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )",
    "repeating-linear-gradient()": "repeating-linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )",
    "repeating-radial-gradient()": "repeating-radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
    "reversed-counter-name": "reversed( <counter-name> )",
    "rgb()": "rgb( <percentage>{3} [/ <alpha-value>]? )|rgb( <number>{3} [/ <alpha-value>]? )|rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )",
    "rgba()": "rgba( <percentage>{3} [/ <alpha-value>]? )|rgba( <number>{3} [/ <alpha-value>]? )|rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )",
    "rotate()": "rotate( [<angle>|<zero>] )",
    "rotate3d()": "rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )",
    "rotateX()": "rotateX( [<angle>|<zero>] )",
    "rotateY()": "rotateY( [<angle>|<zero>] )",
    "rotateZ()": "rotateZ( [<angle>|<zero>] )",
    "round()": "round( <rounding-strategy>? , <calc-sum> , <calc-sum> )",
    "rounding-strategy": "nearest|up|down|to-zero",
    "saturate()": "saturate( <number-percentage> )",
    "scale()": "scale( [<number>|<percentage>]#{1,2} )",
    "scale3d()": "scale3d( [<number>|<percentage>]#{3} )",
    "scaleX()": "scaleX( [<number>|<percentage>] )",
    "scaleY()": "scaleY( [<number>|<percentage>] )",
    "scaleZ()": "scaleZ( [<number>|<percentage>] )",
    scroller: "root|nearest",
    "self-position": "center|start|end|self-start|self-end|flex-start|flex-end",
    "shape-radius": "<length-percentage>|closest-side|farthest-side",
    "sign()": "sign( <calc-sum> )",
    "skew()": "skew( [<angle>|<zero>] , [<angle>|<zero>]? )",
    "skewX()": "skewX( [<angle>|<zero>] )",
    "skewY()": "skewY( [<angle>|<zero>] )",
    "sepia()": "sepia( <number-percentage> )",
    shadow: "inset?&&<length>{2,4}&&<color>?",
    "shadow-t": "[<length>{2,3}&&<color>?]",
    shape: "rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )",
    "shape-box": "<box>|margin-box",
    "side-or-corner": "[left|right]||[top|bottom]",
    "sin()": "sin( <calc-sum> )",
    "single-animation": "<time>||<easing-function>||<time>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]",
    "single-animation-direction": "normal|reverse|alternate|alternate-reverse",
    "single-animation-fill-mode": "none|forwards|backwards|both",
    "single-animation-iteration-count": "infinite|<number>",
    "single-animation-play-state": "running|paused",
    "single-animation-timeline": "auto|none|<timeline-name>|scroll( <axis>? <scroller>? )",
    "single-transition": "[none|<single-transition-property>]||<time>||<easing-function>||<time>",
    "single-transition-property": "all|<custom-ident>",
    size: "closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}",
    "sqrt()": "sqrt( <calc-sum> )",
    "step-position": "jump-start|jump-end|jump-none|jump-both|start|end",
    "step-timing-function": "step-start|step-end|steps( <integer> [, <step-position>]? )",
    "subclass-selector": "<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>",
    "supports-condition": "not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*",
    "supports-in-parens": "( <supports-condition> )|<supports-feature>|<general-enclosed>",
    "supports-feature": "<supports-decl>|<supports-selector-fn>",
    "supports-decl": "( <declaration> )",
    "supports-selector-fn": "selector( <complex-selector> )",
    symbol: "<string>|<image>|<custom-ident>",
    "tan()": "tan( <calc-sum> )",
    target: "<target-counter()>|<target-counters()>|<target-text()>",
    "target-counter()": "target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )",
    "target-counters()": "target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )",
    "target-text()": "target-text( [<string>|<url>] , [content|before|after|first-letter]? )",
    "time-percentage": "<time>|<percentage>",
    "timeline-name": "<custom-ident>|<string>",
    "easing-function": "linear|<cubic-bezier-timing-function>|<step-timing-function>",
    "track-breadth": "<length-percentage>|<flex>|min-content|max-content|auto",
    "track-list": "[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?",
    "track-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <track-size>]+ <line-names>? )",
    "track-size": "<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( <length-percentage> )",
    "transform-function": "<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>",
    "transform-list": "<transform-function>+",
    "translate()": "translate( <length-percentage> , <length-percentage>? )",
    "translate3d()": "translate3d( <length-percentage> , <length-percentage> , <length> )",
    "translateX()": "translateX( <length-percentage> )",
    "translateY()": "translateY( <length-percentage> )",
    "translateZ()": "translateZ( <length> )",
    "type-or-unit": "string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%",
    "type-selector": "<wq-name>|<ns-prefix>? '*'",
    "var()": "var( <custom-property-name> , <declaration-value>? )",
    "viewport-length": "auto|<length-percentage>",
    "visual-box": "content-box|padding-box|border-box",
    "wq-name": "<ns-prefix>? <ident-token>",
    "-legacy-gradient": "<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>",
    "-legacy-linear-gradient": "-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )",
    "-legacy-repeating-linear-gradient": "-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )",
    "-legacy-linear-gradient-arguments": "[<angle>|<side-or-corner>]? , <color-stop-list>",
    "-legacy-radial-gradient": "-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )",
    "-legacy-repeating-radial-gradient": "-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )",
    "-legacy-radial-gradient-arguments": "[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>",
    "-legacy-radial-gradient-size": "closest-side|closest-corner|farthest-side|farthest-corner|contain|cover",
    "-legacy-radial-gradient-shape": "circle|ellipse",
    "-non-standard-font": "-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body",
    "-non-standard-color": "-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text",
    "-non-standard-image-rendering": "optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast",
    "-non-standard-overflow": "-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable",
    "-non-standard-width": "fill-available|min-intrinsic|intrinsic|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content|-webkit-min-content|-webkit-max-content",
    "-webkit-gradient()": "-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )",
    "-webkit-gradient-color-stop": "from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )",
    "-webkit-gradient-point": "[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]",
    "-webkit-gradient-radius": "<length>|<percentage>",
    "-webkit-gradient-type": "linear|radial",
    "-webkit-mask-box-repeat": "repeat|stretch|round",
    "-webkit-mask-clip-style": "border|border-box|padding|padding-box|content|content-box|text",
    "-ms-filter-function-list": "<-ms-filter-function>+",
    "-ms-filter-function": "<-ms-filter-function-progid>|<-ms-filter-function-legacy>",
    "-ms-filter-function-progid": "'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]",
    "-ms-filter-function-legacy": "<ident-token>|<function-token> <any-value>? )",
    "-ms-filter": "<string>",
    age: "child|young|old",
    "attr-name": "<wq-name>",
    "attr-fallback": "<any-value>",
    "bg-clip": "<box>|border|text",
    bottom: "<length>|auto",
    "generic-voice": "[<age>? <gender> <integer>?]",
    gender: "male|female|neutral",
    left: "<length>|auto",
    "mask-image": "<mask-reference>#",
    paint: "none|<color>|<url> [none|<color>]?|context-fill|context-stroke",
    right: "<length>|auto",
    "scroll-timeline-axis": "block|inline|vertical|horizontal",
    "scroll-timeline-name": "none|<custom-ident>",
    "single-animation-composition": "replace|add|accumulate",
    "svg-length": "<percentage>|<length>|<number>",
    "svg-writing-mode": "lr-tb|rl-tb|tb-rl|lr|rl|tb",
    top: "<length>|auto",
    x: "<number>",
    y: "<number>",
    declaration: "<ident-token> : <declaration-value>? ['!' important]?",
    "declaration-list": "[<declaration>? ';']* <declaration>?",
    url: "url( <string> <url-modifier>* )|<url-token>",
    "url-modifier": "<ident>|<function-token> <any-value> )",
    "number-zero-one": "<number [0,1]>",
    "number-one-or-greater": "<number [1,∞]>",
    "-non-standard-display": "-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box"
  },
  properties: {
    "--*": "<declaration-value>",
    "-ms-accelerator": "false|true",
    "-ms-block-progression": "tb|rl|bt|lr",
    "-ms-content-zoom-chaining": "none|chained",
    "-ms-content-zooming": "none|zoom",
    "-ms-content-zoom-limit": "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>",
    "-ms-content-zoom-limit-max": "<percentage>",
    "-ms-content-zoom-limit-min": "<percentage>",
    "-ms-content-zoom-snap": "<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>",
    "-ms-content-zoom-snap-points": "snapInterval( <percentage> , <percentage> )|snapList( <percentage># )",
    "-ms-content-zoom-snap-type": "none|proximity|mandatory",
    "-ms-filter": "<string>",
    "-ms-flow-from": "[none|<custom-ident>]#",
    "-ms-flow-into": "[none|<custom-ident>]#",
    "-ms-grid-columns": "none|<track-list>|<auto-track-list>",
    "-ms-grid-rows": "none|<track-list>|<auto-track-list>",
    "-ms-high-contrast-adjust": "auto|none",
    "-ms-hyphenate-limit-chars": "auto|<integer>{1,3}",
    "-ms-hyphenate-limit-lines": "no-limit|<integer>",
    "-ms-hyphenate-limit-zone": "<percentage>|<length>",
    "-ms-ime-align": "auto|after",
    "-ms-overflow-style": "auto|none|scrollbar|-ms-autohiding-scrollbar",
    "-ms-scrollbar-3dlight-color": "<color>",
    "-ms-scrollbar-arrow-color": "<color>",
    "-ms-scrollbar-base-color": "<color>",
    "-ms-scrollbar-darkshadow-color": "<color>",
    "-ms-scrollbar-face-color": "<color>",
    "-ms-scrollbar-highlight-color": "<color>",
    "-ms-scrollbar-shadow-color": "<color>",
    "-ms-scrollbar-track-color": "<color>",
    "-ms-scroll-chaining": "chained|none",
    "-ms-scroll-limit": "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>",
    "-ms-scroll-limit-x-max": "auto|<length>",
    "-ms-scroll-limit-x-min": "<length>",
    "-ms-scroll-limit-y-max": "auto|<length>",
    "-ms-scroll-limit-y-min": "<length>",
    "-ms-scroll-rails": "none|railed",
    "-ms-scroll-snap-points-x": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
    "-ms-scroll-snap-points-y": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
    "-ms-scroll-snap-type": "none|proximity|mandatory",
    "-ms-scroll-snap-x": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>",
    "-ms-scroll-snap-y": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>",
    "-ms-scroll-translation": "none|vertical-to-horizontal",
    "-ms-text-autospace": "none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space",
    "-ms-touch-select": "grippers|none",
    "-ms-user-select": "none|element|text",
    "-ms-wrap-flow": "auto|both|start|end|maximum|clear",
    "-ms-wrap-margin": "<length>",
    "-ms-wrap-through": "wrap|none",
    "-moz-appearance": "none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized",
    "-moz-binding": "<url>|none",
    "-moz-border-bottom-colors": "<color>+|none",
    "-moz-border-left-colors": "<color>+|none",
    "-moz-border-right-colors": "<color>+|none",
    "-moz-border-top-colors": "<color>+|none",
    "-moz-context-properties": "none|[fill|fill-opacity|stroke|stroke-opacity]#",
    "-moz-float-edge": "border-box|content-box|margin-box|padding-box",
    "-moz-force-broken-image-icon": "0|1",
    "-moz-image-region": "<shape>|auto",
    "-moz-orient": "inline|block|horizontal|vertical",
    "-moz-outline-radius": "<outline-radius>{1,4} [/ <outline-radius>{1,4}]?",
    "-moz-outline-radius-bottomleft": "<outline-radius>",
    "-moz-outline-radius-bottomright": "<outline-radius>",
    "-moz-outline-radius-topleft": "<outline-radius>",
    "-moz-outline-radius-topright": "<outline-radius>",
    "-moz-stack-sizing": "ignore|stretch-to-fit",
    "-moz-text-blink": "none|blink",
    "-moz-user-focus": "ignore|normal|select-after|select-before|select-menu|select-same|select-all|none",
    "-moz-user-input": "auto|none|enabled|disabled",
    "-moz-user-modify": "read-only|read-write|write-only",
    "-moz-window-dragging": "drag|no-drag",
    "-moz-window-shadow": "default|menu|tooltip|sheet|none",
    "-webkit-appearance": "none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button",
    "-webkit-border-before": "<'border-width'>||<'border-style'>||<color>",
    "-webkit-border-before-color": "<color>",
    "-webkit-border-before-style": "<'border-style'>",
    "-webkit-border-before-width": "<'border-width'>",
    "-webkit-box-reflect": "[above|below|right|left]? <length>? <image>?",
    "-webkit-line-clamp": "none|<integer>",
    "-webkit-mask": "[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<box>|border|padding|content|text]||[<box>|border|padding|content]]#",
    "-webkit-mask-attachment": "<attachment>#",
    "-webkit-mask-clip": "[<box>|border|padding|content|text]#",
    "-webkit-mask-composite": "<composite-style>#",
    "-webkit-mask-image": "<mask-reference>#",
    "-webkit-mask-origin": "[<box>|border|padding|content]#",
    "-webkit-mask-position": "<position>#",
    "-webkit-mask-position-x": "[<length-percentage>|left|center|right]#",
    "-webkit-mask-position-y": "[<length-percentage>|top|center|bottom]#",
    "-webkit-mask-repeat": "<repeat-style>#",
    "-webkit-mask-repeat-x": "repeat|no-repeat|space|round",
    "-webkit-mask-repeat-y": "repeat|no-repeat|space|round",
    "-webkit-mask-size": "<bg-size>#",
    "-webkit-overflow-scrolling": "auto|touch",
    "-webkit-tap-highlight-color": "<color>",
    "-webkit-text-fill-color": "<color>",
    "-webkit-text-stroke": "<length>||<color>",
    "-webkit-text-stroke-color": "<color>",
    "-webkit-text-stroke-width": "<length>",
    "-webkit-touch-callout": "default|none",
    "-webkit-user-modify": "read-only|read-write|read-write-plaintext-only",
    "accent-color": "auto|<color>",
    "align-content": "normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>",
    "align-items": "normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]",
    "align-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>",
    "align-tracks": "[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#",
    all: "initial|inherit|unset|revert|revert-layer",
    animation: "<single-animation>#",
    "animation-composition": "<single-animation-composition>#",
    "animation-delay": "<time>#",
    "animation-direction": "<single-animation-direction>#",
    "animation-duration": "<time>#",
    "animation-fill-mode": "<single-animation-fill-mode>#",
    "animation-iteration-count": "<single-animation-iteration-count>#",
    "animation-name": "[none|<keyframes-name>]#",
    "animation-play-state": "<single-animation-play-state>#",
    "animation-timing-function": "<easing-function>#",
    "animation-timeline": "<single-animation-timeline>#",
    appearance: "none|auto|textfield|menulist-button|<compat-auto>",
    "aspect-ratio": "auto|<ratio>",
    azimuth: "<angle>|[[left-side|far-left|left|center-left|center|center-right|right|far-right|right-side]||behind]|leftwards|rightwards",
    "backdrop-filter": "none|<filter-function-list>",
    "backface-visibility": "visible|hidden",
    background: "[<bg-layer> ,]* <final-bg-layer>",
    "background-attachment": "<attachment>#",
    "background-blend-mode": "<blend-mode>#",
    "background-clip": "<bg-clip>#",
    "background-color": "<color>",
    "background-image": "<bg-image>#",
    "background-origin": "<box>#",
    "background-position": "<bg-position>#",
    "background-position-x": "[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#",
    "background-position-y": "[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#",
    "background-repeat": "<repeat-style>#",
    "background-size": "<bg-size>#",
    "block-overflow": "clip|ellipsis|<string>",
    "block-size": "<'width'>",
    border: "<line-width>||<line-style>||<color>",
    "border-block": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-block-color": "<'border-top-color'>{1,2}",
    "border-block-style": "<'border-top-style'>",
    "border-block-width": "<'border-top-width'>",
    "border-block-end": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-block-end-color": "<'border-top-color'>",
    "border-block-end-style": "<'border-top-style'>",
    "border-block-end-width": "<'border-top-width'>",
    "border-block-start": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-block-start-color": "<'border-top-color'>",
    "border-block-start-style": "<'border-top-style'>",
    "border-block-start-width": "<'border-top-width'>",
    "border-bottom": "<line-width>||<line-style>||<color>",
    "border-bottom-color": "<'border-top-color'>",
    "border-bottom-left-radius": "<length-percentage>{1,2}",
    "border-bottom-right-radius": "<length-percentage>{1,2}",
    "border-bottom-style": "<line-style>",
    "border-bottom-width": "<line-width>",
    "border-collapse": "collapse|separate",
    "border-color": "<color>{1,4}",
    "border-end-end-radius": "<length-percentage>{1,2}",
    "border-end-start-radius": "<length-percentage>{1,2}",
    "border-image": "<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>",
    "border-image-outset": "[<length>|<number>]{1,4}",
    "border-image-repeat": "[stretch|repeat|round|space]{1,2}",
    "border-image-slice": "<number-percentage>{1,4}&&fill?",
    "border-image-source": "none|<image>",
    "border-image-width": "[<length-percentage>|<number>|auto]{1,4}",
    "border-inline": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-inline-end": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-inline-color": "<'border-top-color'>{1,2}",
    "border-inline-style": "<'border-top-style'>",
    "border-inline-width": "<'border-top-width'>",
    "border-inline-end-color": "<'border-top-color'>",
    "border-inline-end-style": "<'border-top-style'>",
    "border-inline-end-width": "<'border-top-width'>",
    "border-inline-start": "<'border-top-width'>||<'border-top-style'>||<color>",
    "border-inline-start-color": "<'border-top-color'>",
    "border-inline-start-style": "<'border-top-style'>",
    "border-inline-start-width": "<'border-top-width'>",
    "border-left": "<line-width>||<line-style>||<color>",
    "border-left-color": "<color>",
    "border-left-style": "<line-style>",
    "border-left-width": "<line-width>",
    "border-radius": "<length-percentage>{1,4} [/ <length-percentage>{1,4}]?",
    "border-right": "<line-width>||<line-style>||<color>",
    "border-right-color": "<color>",
    "border-right-style": "<line-style>",
    "border-right-width": "<line-width>",
    "border-spacing": "<length> <length>?",
    "border-start-end-radius": "<length-percentage>{1,2}",
    "border-start-start-radius": "<length-percentage>{1,2}",
    "border-style": "<line-style>{1,4}",
    "border-top": "<line-width>||<line-style>||<color>",
    "border-top-color": "<color>",
    "border-top-left-radius": "<length-percentage>{1,2}",
    "border-top-right-radius": "<length-percentage>{1,2}",
    "border-top-style": "<line-style>",
    "border-top-width": "<line-width>",
    "border-width": "<line-width>{1,4}",
    bottom: "<length>|<percentage>|auto",
    "box-align": "start|center|end|baseline|stretch",
    "box-decoration-break": "slice|clone",
    "box-direction": "normal|reverse|inherit",
    "box-flex": "<number>",
    "box-flex-group": "<integer>",
    "box-lines": "single|multiple",
    "box-ordinal-group": "<integer>",
    "box-orient": "horizontal|vertical|inline-axis|block-axis|inherit",
    "box-pack": "start|center|end|justify",
    "box-shadow": "none|<shadow>#",
    "box-sizing": "content-box|border-box",
    "break-after": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
    "break-before": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
    "break-inside": "auto|avoid|avoid-page|avoid-column|avoid-region",
    "caption-side": "top|bottom|block-start|block-end|inline-start|inline-end",
    caret: "<'caret-color'>||<'caret-shape'>",
    "caret-color": "auto|<color>",
    "caret-shape": "auto|bar|block|underscore",
    clear: "none|left|right|both|inline-start|inline-end",
    clip: "<shape>|auto",
    "clip-path": "<clip-source>|[<basic-shape>||<geometry-box>]|none",
    color: "<color>",
    "print-color-adjust": "economy|exact",
    "color-scheme": "normal|[light|dark|<custom-ident>]+&&only?",
    "column-count": "<integer>|auto",
    "column-fill": "auto|balance|balance-all",
    "column-gap": "normal|<length-percentage>",
    "column-rule": "<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>",
    "column-rule-color": "<color>",
    "column-rule-style": "<'border-style'>",
    "column-rule-width": "<'border-width'>",
    "column-span": "none|all",
    "column-width": "<length>|auto",
    columns: "<'column-width'>||<'column-count'>",
    contain: "none|strict|content|[[size||inline-size]||layout||style||paint]",
    "contain-intrinsic-size": "[none|<length>|auto <length>]{1,2}",
    "contain-intrinsic-block-size": "none|<length>|auto <length>",
    "contain-intrinsic-height": "none|<length>|auto <length>",
    "contain-intrinsic-inline-size": "none|<length>|auto <length>",
    "contain-intrinsic-width": "none|<length>|auto <length>",
    content: "normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>]+]?",
    "content-visibility": "visible|auto|hidden",
    "counter-increment": "[<counter-name> <integer>?]+|none",
    "counter-reset": "[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none",
    "counter-set": "[<counter-name> <integer>?]+|none",
    cursor: "[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]",
    direction: "ltr|rtl",
    display: "[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>",
    "empty-cells": "show|hide",
    filter: "none|<filter-function-list>|<-ms-filter-function-list>",
    flex: "none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]",
    "flex-basis": "content|<'width'>",
    "flex-direction": "row|row-reverse|column|column-reverse",
    "flex-flow": "<'flex-direction'>||<'flex-wrap'>",
    "flex-grow": "<number>",
    "flex-shrink": "<number>",
    "flex-wrap": "nowrap|wrap|wrap-reverse",
    float: "left|right|none|inline-start|inline-end",
    font: "[[<'font-style'>||<font-variant-css21>||<'font-weight'>||<'font-stretch'>]? <'font-size'> [/ <'line-height'>]? <'font-family'>]|caption|icon|menu|message-box|small-caption|status-bar",
    "font-family": "[<family-name>|<generic-family>]#",
    "font-feature-settings": "normal|<feature-tag-value>#",
    "font-kerning": "auto|normal|none",
    "font-language-override": "normal|<string>",
    "font-optical-sizing": "auto|none",
    "font-variation-settings": "normal|[<string> <number>]#",
    "font-size": "<absolute-size>|<relative-size>|<length-percentage>",
    "font-size-adjust": "none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]",
    "font-smooth": "auto|never|always|<absolute-size>|<length>",
    "font-stretch": "<font-stretch-absolute>",
    "font-style": "normal|italic|oblique <angle>?",
    "font-synthesis": "none|[weight||style||small-caps]",
    "font-variant": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]",
    "font-variant-alternates": "normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]",
    "font-variant-caps": "normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps",
    "font-variant-east-asian": "normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]",
    "font-variant-ligatures": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]",
    "font-variant-numeric": "normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]",
    "font-variant-position": "normal|sub|super",
    "font-weight": "<font-weight-absolute>|bolder|lighter",
    "forced-color-adjust": "auto|none",
    gap: "<'row-gap'> <'column-gap'>?",
    grid: "<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>",
    "grid-area": "<grid-line> [/ <grid-line>]{0,3}",
    "grid-auto-columns": "<track-size>+",
    "grid-auto-flow": "[row|column]||dense",
    "grid-auto-rows": "<track-size>+",
    "grid-column": "<grid-line> [/ <grid-line>]?",
    "grid-column-end": "<grid-line>",
    "grid-column-gap": "<length-percentage>",
    "grid-column-start": "<grid-line>",
    "grid-gap": "<'grid-row-gap'> <'grid-column-gap'>?",
    "grid-row": "<grid-line> [/ <grid-line>]?",
    "grid-row-end": "<grid-line>",
    "grid-row-gap": "<length-percentage>",
    "grid-row-start": "<grid-line>",
    "grid-template": "none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?",
    "grid-template-areas": "none|<string>+",
    "grid-template-columns": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
    "grid-template-rows": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
    "hanging-punctuation": "none|[first||[force-end|allow-end]||last]",
    height: "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )",
    "hyphenate-character": "auto|<string>",
    hyphens: "none|manual|auto",
    "image-orientation": "from-image|<angle>|[<angle>? flip]",
    "image-rendering": "auto|crisp-edges|pixelated|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>",
    "image-resolution": "[from-image||<resolution>]&&snap?",
    "ime-mode": "auto|normal|active|inactive|disabled",
    "initial-letter": "normal|[<number> <integer>?]",
    "initial-letter-align": "[auto|alphabetic|hanging|ideographic]",
    "inline-size": "<'width'>",
    "input-security": "auto|none",
    inset: "<'top'>{1,4}",
    "inset-block": "<'top'>{1,2}",
    "inset-block-end": "<'top'>",
    "inset-block-start": "<'top'>",
    "inset-inline": "<'top'>{1,2}",
    "inset-inline-end": "<'top'>",
    "inset-inline-start": "<'top'>",
    isolation: "auto|isolate",
    "justify-content": "normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]",
    "justify-items": "normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]",
    "justify-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]",
    "justify-tracks": "[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#",
    left: "<length>|<percentage>|auto",
    "letter-spacing": "normal|<length-percentage>",
    "line-break": "auto|loose|normal|strict|anywhere",
    "line-clamp": "none|<integer>",
    "line-height": "normal|<number>|<length>|<percentage>",
    "line-height-step": "<length>",
    "list-style": "<'list-style-type'>||<'list-style-position'>||<'list-style-image'>",
    "list-style-image": "<image>|none",
    "list-style-position": "inside|outside",
    "list-style-type": "<counter-style>|<string>|none",
    margin: "[<length>|<percentage>|auto]{1,4}",
    "margin-block": "<'margin-left'>{1,2}",
    "margin-block-end": "<'margin-left'>",
    "margin-block-start": "<'margin-left'>",
    "margin-bottom": "<length>|<percentage>|auto",
    "margin-inline": "<'margin-left'>{1,2}",
    "margin-inline-end": "<'margin-left'>",
    "margin-inline-start": "<'margin-left'>",
    "margin-left": "<length>|<percentage>|auto",
    "margin-right": "<length>|<percentage>|auto",
    "margin-top": "<length>|<percentage>|auto",
    "margin-trim": "none|in-flow|all",
    mask: "<mask-layer>#",
    "mask-border": "<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>",
    "mask-border-mode": "luminance|alpha",
    "mask-border-outset": "[<length>|<number>]{1,4}",
    "mask-border-repeat": "[stretch|repeat|round|space]{1,2}",
    "mask-border-slice": "<number-percentage>{1,4} fill?",
    "mask-border-source": "none|<image>",
    "mask-border-width": "[<length-percentage>|<number>|auto]{1,4}",
    "mask-clip": "[<geometry-box>|no-clip]#",
    "mask-composite": "<compositing-operator>#",
    "mask-image": "<mask-reference>#",
    "mask-mode": "<masking-mode>#",
    "mask-origin": "<geometry-box>#",
    "mask-position": "<position>#",
    "mask-repeat": "<repeat-style>#",
    "mask-size": "<bg-size>#",
    "mask-type": "luminance|alpha",
    "masonry-auto-flow": "[pack|next]||[definite-first|ordered]",
    "math-depth": "auto-add|add( <integer> )|<integer>",
    "math-shift": "normal|compact",
    "math-style": "normal|compact",
    "max-block-size": "<'max-width'>",
    "max-height": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )",
    "max-inline-size": "<'max-width'>",
    "max-lines": "none|<integer>",
    "max-width": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|<-non-standard-width>",
    "min-block-size": "<'min-width'>",
    "min-height": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )",
    "min-inline-size": "<'min-width'>",
    "min-width": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|<-non-standard-width>",
    "mix-blend-mode": "<blend-mode>|plus-lighter",
    "object-fit": "fill|contain|cover|none|scale-down",
    "object-position": "<position>",
    offset: "[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?",
    "offset-anchor": "auto|<position>",
    "offset-distance": "<length-percentage>",
    "offset-path": "none|ray( [<angle>&&<size>&&contain?] )|<path()>|<url>|[<basic-shape>||<geometry-box>]",
    "offset-position": "auto|<position>",
    "offset-rotate": "[auto|reverse]||<angle>",
    opacity: "<alpha-value>",
    order: "<integer>",
    orphans: "<integer>",
    outline: "[<'outline-color'>||<'outline-style'>||<'outline-width'>]",
    "outline-color": "<color>|invert",
    "outline-offset": "<length>",
    "outline-style": "auto|<'border-style'>",
    "outline-width": "<line-width>",
    overflow: "[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>",
    "overflow-anchor": "auto|none",
    "overflow-block": "visible|hidden|clip|scroll|auto",
    "overflow-clip-box": "padding-box|content-box",
    "overflow-clip-margin": "<visual-box>||<length [0,∞]>",
    "overflow-inline": "visible|hidden|clip|scroll|auto",
    "overflow-wrap": "normal|break-word|anywhere",
    "overflow-x": "visible|hidden|clip|scroll|auto",
    "overflow-y": "visible|hidden|clip|scroll|auto",
    "overscroll-behavior": "[contain|none|auto]{1,2}",
    "overscroll-behavior-block": "contain|none|auto",
    "overscroll-behavior-inline": "contain|none|auto",
    "overscroll-behavior-x": "contain|none|auto",
    "overscroll-behavior-y": "contain|none|auto",
    padding: "[<length>|<percentage>]{1,4}",
    "padding-block": "<'padding-left'>{1,2}",
    "padding-block-end": "<'padding-left'>",
    "padding-block-start": "<'padding-left'>",
    "padding-bottom": "<length>|<percentage>",
    "padding-inline": "<'padding-left'>{1,2}",
    "padding-inline-end": "<'padding-left'>",
    "padding-inline-start": "<'padding-left'>",
    "padding-left": "<length>|<percentage>",
    "padding-right": "<length>|<percentage>",
    "padding-top": "<length>|<percentage>",
    "page-break-after": "auto|always|avoid|left|right|recto|verso",
    "page-break-before": "auto|always|avoid|left|right|recto|verso",
    "page-break-inside": "auto|avoid",
    "paint-order": "normal|[fill||stroke||markers]",
    perspective: "none|<length>",
    "perspective-origin": "<position>",
    "place-content": "<'align-content'> <'justify-content'>?",
    "place-items": "<'align-items'> <'justify-items'>?",
    "place-self": "<'align-self'> <'justify-self'>?",
    "pointer-events": "auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit",
    position: "static|relative|absolute|sticky|fixed|-webkit-sticky",
    quotes: "none|auto|[<string> <string>]+",
    resize: "none|both|horizontal|vertical|block|inline",
    right: "<length>|<percentage>|auto",
    rotate: "none|<angle>|[x|y|z|<number>{3}]&&<angle>",
    "row-gap": "normal|<length-percentage>",
    "ruby-align": "start|center|space-between|space-around",
    "ruby-merge": "separate|collapse|auto",
    "ruby-position": "[alternate||[over|under]]|inter-character",
    scale: "none|<number>{1,3}",
    "scrollbar-color": "auto|<color>{2}",
    "scrollbar-gutter": "auto|stable&&both-edges?",
    "scrollbar-width": "auto|thin|none",
    "scroll-behavior": "auto|smooth",
    "scroll-margin": "<length>{1,4}",
    "scroll-margin-block": "<length>{1,2}",
    "scroll-margin-block-start": "<length>",
    "scroll-margin-block-end": "<length>",
    "scroll-margin-bottom": "<length>",
    "scroll-margin-inline": "<length>{1,2}",
    "scroll-margin-inline-start": "<length>",
    "scroll-margin-inline-end": "<length>",
    "scroll-margin-left": "<length>",
    "scroll-margin-right": "<length>",
    "scroll-margin-top": "<length>",
    "scroll-padding": "[auto|<length-percentage>]{1,4}",
    "scroll-padding-block": "[auto|<length-percentage>]{1,2}",
    "scroll-padding-block-start": "auto|<length-percentage>",
    "scroll-padding-block-end": "auto|<length-percentage>",
    "scroll-padding-bottom": "auto|<length-percentage>",
    "scroll-padding-inline": "[auto|<length-percentage>]{1,2}",
    "scroll-padding-inline-start": "auto|<length-percentage>",
    "scroll-padding-inline-end": "auto|<length-percentage>",
    "scroll-padding-left": "auto|<length-percentage>",
    "scroll-padding-right": "auto|<length-percentage>",
    "scroll-padding-top": "auto|<length-percentage>",
    "scroll-snap-align": "[none|start|end|center]{1,2}",
    "scroll-snap-coordinate": "none|<position>#",
    "scroll-snap-destination": "<position>",
    "scroll-snap-points-x": "none|repeat( <length-percentage> )",
    "scroll-snap-points-y": "none|repeat( <length-percentage> )",
    "scroll-snap-stop": "normal|always",
    "scroll-snap-type": "none|[x|y|block|inline|both] [mandatory|proximity]?",
    "scroll-snap-type-x": "none|mandatory|proximity",
    "scroll-snap-type-y": "none|mandatory|proximity",
    "scroll-timeline": "<scroll-timeline-name>||<scroll-timeline-axis>",
    "scroll-timeline-axis": "block|inline|vertical|horizontal",
    "scroll-timeline-name": "none|<custom-ident>",
    "shape-image-threshold": "<alpha-value>",
    "shape-margin": "<length-percentage>",
    "shape-outside": "none|[<shape-box>||<basic-shape>]|<image>",
    "tab-size": "<integer>|<length>",
    "table-layout": "auto|fixed",
    "text-align": "start|end|left|right|center|justify|match-parent",
    "text-align-last": "auto|start|end|left|right|center|justify",
    "text-combine-upright": "none|all|[digits <integer>?]",
    "text-decoration": "<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>",
    "text-decoration-color": "<color>",
    "text-decoration-line": "none|[underline||overline||line-through||blink]|spelling-error|grammar-error",
    "text-decoration-skip": "none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]",
    "text-decoration-skip-ink": "auto|all|none",
    "text-decoration-style": "solid|double|dotted|dashed|wavy",
    "text-decoration-thickness": "auto|from-font|<length>|<percentage>",
    "text-emphasis": "<'text-emphasis-style'>||<'text-emphasis-color'>",
    "text-emphasis-color": "<color>",
    "text-emphasis-position": "[over|under]&&[right|left]",
    "text-emphasis-style": "none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>",
    "text-indent": "<length-percentage>&&hanging?&&each-line?",
    "text-justify": "auto|inter-character|inter-word|none",
    "text-orientation": "mixed|upright|sideways",
    "text-overflow": "[clip|ellipsis|<string>]{1,2}",
    "text-rendering": "auto|optimizeSpeed|optimizeLegibility|geometricPrecision",
    "text-shadow": "none|<shadow-t>#",
    "text-size-adjust": "none|auto|<percentage>",
    "text-transform": "none|capitalize|uppercase|lowercase|full-width|full-size-kana",
    "text-underline-offset": "auto|<length>|<percentage>",
    "text-underline-position": "auto|from-font|[under||[left|right]]",
    top: "<length>|<percentage>|auto",
    "touch-action": "auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation",
    transform: "none|<transform-list>",
    "transform-box": "content-box|border-box|fill-box|stroke-box|view-box",
    "transform-origin": "[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?",
    "transform-style": "flat|preserve-3d",
    transition: "<single-transition>#",
    "transition-delay": "<time>#",
    "transition-duration": "<time>#",
    "transition-property": "none|<single-transition-property>#",
    "transition-timing-function": "<easing-function>#",
    translate: "none|<length-percentage> [<length-percentage> <length>?]?",
    "unicode-bidi": "normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext",
    "user-select": "auto|text|none|contain|all",
    "vertical-align": "baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>",
    visibility: "visible|hidden|collapse",
    "white-space": "normal|pre|nowrap|pre-wrap|pre-line|break-spaces",
    widows: "<integer>",
    width: "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|fill|stretch|intrinsic|-moz-max-content|-webkit-max-content|-moz-fit-content|-webkit-fit-content",
    "will-change": "auto|<animateable-feature>#",
    "word-break": "normal|break-all|keep-all|break-word",
    "word-spacing": "normal|<length>",
    "word-wrap": "normal|break-word",
    "writing-mode": "horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>",
    "z-index": "auto|<integer>",
    zoom: "normal|reset|<number>|<percentage>",
    "-moz-background-clip": "padding|border",
    "-moz-border-radius-bottomleft": "<'border-bottom-left-radius'>",
    "-moz-border-radius-bottomright": "<'border-bottom-right-radius'>",
    "-moz-border-radius-topleft": "<'border-top-left-radius'>",
    "-moz-border-radius-topright": "<'border-bottom-right-radius'>",
    "-moz-control-character-visibility": "visible|hidden",
    "-moz-osx-font-smoothing": "auto|grayscale",
    "-moz-user-select": "none|text|all|-moz-none",
    "-ms-flex-align": "start|end|center|baseline|stretch",
    "-ms-flex-item-align": "auto|start|end|center|baseline|stretch",
    "-ms-flex-line-pack": "start|end|center|justify|distribute|stretch",
    "-ms-flex-negative": "<'flex-shrink'>",
    "-ms-flex-pack": "start|end|center|justify|distribute",
    "-ms-flex-order": "<integer>",
    "-ms-flex-positive": "<'flex-grow'>",
    "-ms-flex-preferred-size": "<'flex-basis'>",
    "-ms-interpolation-mode": "nearest-neighbor|bicubic",
    "-ms-grid-column-align": "start|end|center|stretch",
    "-ms-grid-row-align": "start|end|center|stretch",
    "-ms-hyphenate-limit-last": "none|always|column|page|spread",
    "-webkit-background-clip": "[<box>|border|padding|content|text]#",
    "-webkit-column-break-after": "always|auto|avoid",
    "-webkit-column-break-before": "always|auto|avoid",
    "-webkit-column-break-inside": "always|auto|avoid",
    "-webkit-font-smoothing": "auto|none|antialiased|subpixel-antialiased",
    "-webkit-mask-box-image": "[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?",
    "-webkit-print-color-adjust": "economy|exact",
    "-webkit-text-security": "none|circle|disc|square",
    "-webkit-user-drag": "none|element|auto",
    "-webkit-user-select": "auto|none|text|all",
    "alignment-baseline": "auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical",
    "baseline-shift": "baseline|sub|super|<svg-length>",
    behavior: "<url>+",
    "clip-rule": "nonzero|evenodd",
    cue: "<'cue-before'> <'cue-after'>?",
    "cue-after": "<url> <decibel>?|none",
    "cue-before": "<url> <decibel>?|none",
    "dominant-baseline": "auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge",
    fill: "<paint>",
    "fill-opacity": "<number-zero-one>",
    "fill-rule": "nonzero|evenodd",
    "glyph-orientation-horizontal": "<angle>",
    "glyph-orientation-vertical": "<angle>",
    kerning: "auto|<svg-length>",
    marker: "none|<url>",
    "marker-end": "none|<url>",
    "marker-mid": "none|<url>",
    "marker-start": "none|<url>",
    pause: "<'pause-before'> <'pause-after'>?",
    "pause-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
    "pause-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
    rest: "<'rest-before'> <'rest-after'>?",
    "rest-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
    "rest-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
    "shape-rendering": "auto|optimizeSpeed|crispEdges|geometricPrecision",
    src: "[<url> [format( <string># )]?|local( <family-name> )]#",
    speak: "auto|none|normal",
    "speak-as": "normal|spell-out||digits||[literal-punctuation|no-punctuation]",
    stroke: "<paint>",
    "stroke-dasharray": "none|[<svg-length>+]#",
    "stroke-dashoffset": "<svg-length>",
    "stroke-linecap": "butt|round|square",
    "stroke-linejoin": "miter|round|bevel",
    "stroke-miterlimit": "<number-one-or-greater>",
    "stroke-opacity": "<number-zero-one>",
    "stroke-width": "<svg-length>",
    "text-anchor": "start|middle|end",
    "unicode-range": "<urange>#",
    "voice-balance": "<number>|left|center|right|leftwards|rightwards",
    "voice-duration": "auto|<time>",
    "voice-family": "[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve",
    "voice-pitch": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
    "voice-range": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
    "voice-rate": "[normal|x-slow|slow|medium|fast|x-fast]||<percentage>",
    "voice-stress": "normal|strong|moderate|none|reduced",
    "voice-volume": "silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]"
  },
  atrules: {
    charset: {
      prelude: "<string>",
      descriptors: null
    },
    "counter-style": {
      prelude: "<counter-style-name>",
      descriptors: {
        "additive-symbols": "[<integer>&&<symbol>]#",
        fallback: "<counter-style-name>",
        negative: "<symbol> <symbol>?",
        pad: "<integer>&&<symbol>",
        prefix: "<symbol>",
        range: "[[<integer>|infinite]{2}]#|auto",
        "speak-as": "auto|bullets|numbers|words|spell-out|<counter-style-name>",
        suffix: "<symbol>",
        symbols: "<symbol>+",
        system: "cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]"
      }
    },
    document: {
      prelude: "[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#",
      descriptors: null
    },
    "font-face": {
      prelude: null,
      descriptors: {
        "ascent-override": "normal|<percentage>",
        "descent-override": "normal|<percentage>",
        "font-display": "[auto|block|swap|fallback|optional]",
        "font-family": "<family-name>",
        "font-feature-settings": "normal|<feature-tag-value>#",
        "font-variation-settings": "normal|[<string> <number>]#",
        "font-stretch": "<font-stretch-absolute>{1,2}",
        "font-style": "normal|italic|oblique <angle>{0,2}",
        "font-weight": "<font-weight-absolute>{1,2}",
        "font-variant": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]",
        "line-gap-override": "normal|<percentage>",
        "size-adjust": "<percentage>",
        src: "[<url> [format( <string># )]?|local( <family-name> )]#",
        "unicode-range": "<urange>#"
      }
    },
    "font-feature-values": {
      prelude: "<family-name>#",
      descriptors: null
    },
    import: {
      prelude: "[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?",
      descriptors: null
    },
    keyframes: {
      prelude: "<keyframes-name>",
      descriptors: null
    },
    layer: {
      prelude: "[<layer-name>#|<layer-name>?]",
      descriptors: null
    },
    media: {
      prelude: "<media-query-list>",
      descriptors: null
    },
    namespace: {
      prelude: "<namespace-prefix>? [<string>|<url>]",
      descriptors: null
    },
    page: {
      prelude: "<page-selector-list>",
      descriptors: {
        bleed: "auto|<length>",
        marks: "none|[crop||cross]",
        size: "<length>{1,2}|auto|[<page-size>||[portrait|landscape]]"
      }
    },
    property: {
      prelude: "<custom-property-name>",
      descriptors: {
        syntax: "<string>",
        inherits: "true|false",
        "initial-value": "<string>"
      }
    },
    "scroll-timeline": {
      prelude: "<timeline-name>",
      descriptors: null
    },
    supports: {
      prelude: "<supports-condition>",
      descriptors: null
    },
    viewport: {
      prelude: null,
      descriptors: {
        height: "<viewport-length>{1,2}",
        "max-height": "<viewport-length>",
        "max-width": "<viewport-length>",
        "max-zoom": "auto|<number>|<percentage>",
        "min-height": "<viewport-length>",
        "min-width": "<viewport-length>",
        "min-zoom": "auto|<number>|<percentage>",
        orientation: "auto|portrait|landscape",
        "user-zoom": "zoom|fixed",
        "viewport-fit": "auto|contain|cover",
        width: "<viewport-length>{1,2}",
        zoom: "auto|<number>|<percentage>"
      }
    },
    nest: {
      prelude: "<complex-selector-list>",
      descriptors: null
    }
  }
}, Pt = 43, He = 45, Vs = 110, zn = !0, xS = !1;
function Ys(r, e) {
  let t = this.tokenStart + r;
  const n = this.charCodeAt(t);
  for ((n === Pt || n === He) && (e && this.error("Number sign is not allowed"), t++); t < this.tokenEnd; t++)
    we(this.charCodeAt(t)) || this.error("Integer is expected", t);
}
function Ar(r) {
  return Ys.call(this, 0, r);
}
function gn(r, e) {
  if (!this.cmpChar(this.tokenStart + r, e)) {
    let t = "";
    switch (e) {
      case Vs:
        t = "N is expected";
        break;
      case He:
        t = "HyphenMinus is expected";
        break;
    }
    this.error(t, this.tokenStart + r);
  }
}
function tl() {
  let r = 0, e = 0, t = this.tokenType;
  for (; t === ce || t === Re; )
    t = this.lookupType(++r);
  if (t !== $)
    if (this.isDelim(Pt, r) || this.isDelim(He, r)) {
      e = this.isDelim(Pt, r) ? Pt : He;
      do
        t = this.lookupType(++r);
      while (t === ce || t === Re);
      t !== $ && (this.skip(r), Ar.call(this, zn));
    } else
      return null;
  return r > 0 && this.skip(r), e === 0 && (t = this.charCodeAt(this.tokenStart), t !== Pt && t !== He && this.error("Number sign is expected")), Ar.call(this, e !== 0), e === He ? "-" + this.consume($) : this.consume($);
}
const SS = "AnPlusB", AS = {
  a: [String, null],
  b: [String, null]
};
function Op() {
  const r = this.tokenStart;
  let e = null, t = null;
  if (this.tokenType === $)
    Ar.call(this, xS), t = this.consume($);
  else if (this.tokenType === R && this.cmpChar(this.tokenStart, He))
    switch (e = "-1", gn.call(this, 1, Vs), this.tokenEnd - this.tokenStart) {
      case 2:
        this.next(), t = tl.call(this);
        break;
      case 3:
        gn.call(this, 2, He), this.next(), this.skipSC(), Ar.call(this, zn), t = "-" + this.consume($);
        break;
      default:
        gn.call(this, 2, He), Ys.call(this, 3, zn), this.next(), t = this.substrToCursor(r + 2);
    }
  else if (this.tokenType === R || this.isDelim(Pt) && this.lookupType(1) === R) {
    let n = 0;
    switch (e = "1", this.isDelim(Pt) && (n = 1, this.next()), gn.call(this, 0, Vs), this.tokenEnd - this.tokenStart) {
      case 1:
        this.next(), t = tl.call(this);
        break;
      case 2:
        gn.call(this, 1, He), this.next(), this.skipSC(), Ar.call(this, zn), t = "-" + this.consume($);
        break;
      default:
        gn.call(this, 1, He), Ys.call(this, 2, zn), this.next(), t = this.substrToCursor(r + n + 1);
    }
  } else if (this.tokenType === Y) {
    const n = this.charCodeAt(this.tokenStart), i = n === Pt || n === He;
    let s = this.tokenStart + i;
    for (; s < this.tokenEnd && we(this.charCodeAt(s)); s++)
      ;
    s === this.tokenStart + i && this.error("Integer is expected", this.tokenStart + i), gn.call(this, s - this.tokenStart, Vs), e = this.substring(r, s), s + 1 === this.tokenEnd ? (this.next(), t = tl.call(this)) : (gn.call(this, s - this.tokenStart + 1, He), s + 2 === this.tokenEnd ? (this.next(), this.skipSC(), Ar.call(this, zn), t = "-" + this.consume($)) : (Ys.call(this, s - this.tokenStart + 2, zn), this.next(), t = this.substrToCursor(s + 1)));
  } else
    this.error();
  return e !== null && e.charCodeAt(0) === Pt && (e = e.substr(1)), t !== null && t.charCodeAt(0) === Pt && (t = t.substr(1)), {
    type: "AnPlusB",
    loc: this.getLocation(r, this.tokenStart),
    a: e,
    b: t
  };
}
function ES(r) {
  if (r.a) {
    const e = r.a === "+1" && "n" || r.a === "1" && "n" || r.a === "-1" && "-n" || r.a + "n";
    if (r.b) {
      const t = r.b[0] === "-" || r.b[0] === "+" ? r.b : "+" + r.b;
      this.tokenize(e + t);
    } else
      this.tokenize(e);
  } else
    this.tokenize(r.b);
}
const CS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: ES,
  name: SS,
  parse: Op,
  structure: AS
}, Symbol.toStringTag, { value: "Module" }));
function Qd(r) {
  return this.Raw(r, this.consumeUntilLeftCurlyBracketOrSemicolon, !0);
}
function TS() {
  for (let r = 1, e; e = this.lookupType(r); r++) {
    if (e === st)
      return !0;
    if (e === Ne || e === pe)
      return !1;
  }
  return !1;
}
const LS = "Atrule", DS = "atrule", IS = {
  name: String,
  prelude: ["AtrulePrelude", "Raw", null],
  block: ["Block", null]
};
function Np(r = !1) {
  const e = this.tokenStart;
  let t, n, i = null, s = null;
  switch (this.eat(pe), t = this.substrToCursor(e + 1), n = t.toLowerCase(), this.skipSC(), this.eof === !1 && this.tokenType !== Ne && this.tokenType !== je && (this.parseAtrulePrelude ? i = this.parseWithFallback(this.AtrulePrelude.bind(this, t, r), Qd) : i = Qd.call(this, this.tokenIndex), this.skipSC()), this.tokenType) {
    case je:
      this.next();
      break;
    case Ne:
      hasOwnProperty.call(this.atrule, n) && typeof this.atrule[n].block == "function" ? s = this.atrule[n].block.call(this, r) : s = this.Block(TS.call(this));
      break;
  }
  return {
    type: "Atrule",
    loc: this.getLocation(e, this.tokenStart),
    name: t,
    prelude: i,
    block: s
  };
}
function OS(r) {
  this.token(pe, "@" + r.name), r.prelude !== null && this.node(r.prelude), r.block ? this.node(r.block) : this.token(je, ";");
}
const NS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: OS,
  name: LS,
  parse: Np,
  structure: IS,
  walkContext: DS
}, Symbol.toStringTag, { value: "Module" })), MS = "AtrulePrelude", _S = "atrulePrelude", qS = {
  children: [[]]
};
function Mp(r) {
  let e = null;
  return r !== null && (r = r.toLowerCase()), this.skipSC(), hasOwnProperty.call(this.atrule, r) && typeof this.atrule[r].prelude == "function" ? e = this.atrule[r].prelude.call(this) : e = this.readSequence(this.scope.AtrulePrelude), this.skipSC(), this.eof !== !0 && this.tokenType !== Ne && this.tokenType !== je && this.error("Semicolon or block is expected"), {
    type: "AtrulePrelude",
    loc: this.getLocationFromList(e),
    children: e
  };
}
function RS(r) {
  this.children(r);
}
const zS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: RS,
  name: MS,
  parse: Mp,
  structure: qS,
  walkContext: _S
}, Symbol.toStringTag, { value: "Module" })), PS = 36, _p = 42, Ks = 61, BS = 94, Yl = 124, FS = 126;
function $S() {
  this.eof && this.error("Unexpected end of input");
  const r = this.tokenStart;
  let e = !1;
  return this.isDelim(_p) ? (e = !0, this.next()) : this.isDelim(Yl) || this.eat(R), this.isDelim(Yl) ? this.charCodeAt(this.tokenStart + 1) !== Ks ? (this.next(), this.eat(R)) : e && this.error("Identifier is expected", this.tokenEnd) : e && this.error("Vertical line is expected"), {
    type: "Identifier",
    loc: this.getLocation(r, this.tokenStart),
    name: this.substrToCursor(r)
  };
}
function jS() {
  const r = this.tokenStart, e = this.charCodeAt(r);
  return e !== Ks && // =
  e !== FS && // ~=
  e !== BS && // ^=
  e !== PS && // $=
  e !== _p && // *=
  e !== Yl && this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"), this.next(), e !== Ks && (this.isDelim(Ks) || this.error("Equal sign is expected"), this.next()), this.substrToCursor(r);
}
const US = "AttributeSelector", HS = {
  name: "Identifier",
  matcher: [String, null],
  value: ["String", "Identifier", null],
  flags: [String, null]
};
function qp() {
  const r = this.tokenStart;
  let e, t = null, n = null, i = null;
  return this.eat(We), this.skipSC(), e = $S.call(this), this.skipSC(), this.tokenType !== xt && (this.tokenType !== R && (t = jS.call(this), this.skipSC(), n = this.tokenType === Gt ? this.String() : this.Identifier(), this.skipSC()), this.tokenType === R && (i = this.consume(R), this.skipSC())), this.eat(xt), {
    type: "AttributeSelector",
    loc: this.getLocation(r, this.tokenStart),
    name: e,
    matcher: t,
    value: n,
    flags: i
  };
}
function VS(r) {
  this.token(K, "["), this.node(r.name), r.matcher !== null && (this.tokenize(r.matcher), this.node(r.value)), r.flags !== null && this.token(R, r.flags), this.token(K, "]");
}
const YS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: VS,
  name: US,
  parse: qp,
  structure: HS
}, Symbol.toStringTag, { value: "Module" })), KS = 38;
function Rp(r) {
  return this.Raw(r, null, !0);
}
function Jd() {
  return this.parseWithFallback(this.Rule, Rp);
}
function eh(r) {
  return this.Raw(r, this.consumeUntilSemicolonIncluded, !0);
}
function GS() {
  if (this.tokenType === je)
    return eh.call(this, this.tokenIndex);
  const r = this.parseWithFallback(this.Declaration, eh);
  return this.tokenType === je && this.next(), r;
}
const WS = "Block", ZS = "block", XS = {
  children: [[
    "Atrule",
    "Rule",
    "Declaration"
  ]]
};
function zp(r) {
  const e = r ? GS : Jd, t = this.tokenStart;
  let n = this.createList();
  this.eat(Ne);
  e:
    for (; !this.eof; )
      switch (this.tokenType) {
        case st:
          break e;
        case ce:
        case Re:
          this.next();
          break;
        case pe:
          n.push(this.parseWithFallback(this.Atrule.bind(this, r), Rp));
          break;
        default:
          r && this.isDelim(KS) ? n.push(Jd.call(this)) : n.push(e.call(this));
      }
  return this.eof || this.eat(st), {
    type: "Block",
    loc: this.getLocation(t, this.tokenStart),
    children: n
  };
}
function QS(r) {
  this.token(Ne, "{"), this.children(r, (e) => {
    e.type === "Declaration" && this.token(je, ";");
  }), this.token(st, "}");
}
const JS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: QS,
  name: WS,
  parse: zp,
  structure: XS,
  walkContext: ZS
}, Symbol.toStringTag, { value: "Module" })), eA = "Brackets", tA = {
  children: [[]]
};
function Pp(r, e) {
  const t = this.tokenStart;
  let n = null;
  return this.eat(We), n = r.call(this, e), this.eof || this.eat(xt), {
    type: "Brackets",
    loc: this.getLocation(t, this.tokenStart),
    children: n
  };
}
function nA(r) {
  this.token(K, "["), this.children(r), this.token(K, "]");
}
const rA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: nA,
  name: eA,
  parse: Pp,
  structure: tA
}, Symbol.toStringTag, { value: "Module" })), iA = "CDC", sA = [];
function Bp() {
  const r = this.tokenStart;
  return this.eat($e), {
    type: "CDC",
    loc: this.getLocation(r, this.tokenStart)
  };
}
function aA() {
  this.token($e, "-->");
}
const oA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: aA,
  name: iA,
  parse: Bp,
  structure: sA
}, Symbol.toStringTag, { value: "Module" })), lA = "CDO", cA = [];
function Fp() {
  const r = this.tokenStart;
  return this.eat(Ji), {
    type: "CDO",
    loc: this.getLocation(r, this.tokenStart)
  };
}
function uA() {
  this.token(Ji, "<!--");
}
const dA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: uA,
  name: lA,
  parse: Fp,
  structure: cA
}, Symbol.toStringTag, { value: "Module" })), hA = 46, fA = "ClassSelector", pA = {
  name: String
};
function $p() {
  return this.eatDelim(hA), {
    type: "ClassSelector",
    loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
    name: this.consume(R)
  };
}
function gA(r) {
  this.token(K, "."), this.token(R, r.name);
}
const mA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: gA,
  name: fA,
  parse: $p,
  structure: pA
}, Symbol.toStringTag, { value: "Module" })), bA = 43, th = 47, yA = 62, vA = 126, wA = "Combinator", kA = {
  name: String
};
function jp() {
  const r = this.tokenStart;
  let e;
  switch (this.tokenType) {
    case ce:
      e = " ";
      break;
    case K:
      switch (this.charCodeAt(this.tokenStart)) {
        case yA:
        case bA:
        case vA:
          this.next();
          break;
        case th:
          this.next(), this.eatIdent("deep"), this.eatDelim(th);
          break;
        default:
          this.error("Combinator is expected");
      }
      e = this.substrToCursor(r);
      break;
  }
  return {
    type: "Combinator",
    loc: this.getLocation(r, this.tokenStart),
    name: e
  };
}
function xA(r) {
  this.tokenize(r.name);
}
const SA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: xA,
  name: wA,
  parse: jp,
  structure: kA
}, Symbol.toStringTag, { value: "Module" })), AA = 42, EA = 47, CA = "Comment", TA = {
  value: String
};
function Up() {
  const r = this.tokenStart;
  let e = this.tokenEnd;
  return this.eat(Re), e - r + 2 >= 2 && this.charCodeAt(e - 2) === AA && this.charCodeAt(e - 1) === EA && (e -= 2), {
    type: "Comment",
    loc: this.getLocation(r, this.tokenStart),
    value: this.substring(r + 2, e)
  };
}
function LA(r) {
  this.token(Re, "/*" + r.value + "*/");
}
const DA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: LA,
  name: CA,
  parse: Up,
  structure: TA
}, Symbol.toStringTag, { value: "Module" })), Hp = 33, IA = 35, OA = 36, NA = 38, MA = 42, _A = 43, nh = 47;
function qA(r) {
  return this.Raw(r, this.consumeUntilExclamationMarkOrSemicolon, !0);
}
function RA(r) {
  return this.Raw(r, this.consumeUntilExclamationMarkOrSemicolon, !1);
}
function zA() {
  const r = this.tokenIndex, e = this.Value();
  return e.type !== "Raw" && this.eof === !1 && this.tokenType !== je && this.isDelim(Hp) === !1 && this.isBalanceEdge(r) === !1 && this.error(), e;
}
const PA = "Declaration", BA = "declaration", FA = {
  important: [Boolean, String],
  property: String,
  value: ["Value", "Raw"]
};
function Vp() {
  const r = this.tokenStart, e = this.tokenIndex, t = jA.call(this), n = Kc(t), i = n ? this.parseCustomProperty : this.parseValue, s = n ? RA : qA;
  let a = !1, o;
  this.skipSC(), this.eat(Oe);
  const l = this.tokenIndex;
  if (n || this.skipSC(), i ? o = this.parseWithFallback(zA, s) : o = s.call(this, this.tokenIndex), n && o.type === "Value" && o.children.isEmpty) {
    for (let c = l - this.tokenIndex; c <= 0; c++)
      if (this.lookupType(c) === ce) {
        o.children.appendData({
          type: "WhiteSpace",
          loc: null,
          value: " "
        });
        break;
      }
  }
  return this.isDelim(Hp) && (a = UA.call(this), this.skipSC()), this.eof === !1 && this.tokenType !== je && this.isBalanceEdge(e) === !1 && this.error(), {
    type: "Declaration",
    loc: this.getLocation(r, this.tokenStart),
    important: a,
    property: t,
    value: o
  };
}
function $A(r) {
  this.token(R, r.property), this.token(Oe, ":"), this.node(r.value), r.important && (this.token(K, "!"), this.token(R, r.important === !0 ? "important" : r.important));
}
function jA() {
  const r = this.tokenStart;
  if (this.tokenType === K)
    switch (this.charCodeAt(this.tokenStart)) {
      case MA:
      case OA:
      case _A:
      case IA:
      case NA:
        this.next();
        break;
      case nh:
        this.next(), this.isDelim(nh) && this.next();
        break;
    }
  return this.tokenType === ae ? this.eat(ae) : this.eat(R), this.substrToCursor(r);
}
function UA() {
  this.eat(K), this.skipSC();
  const r = this.consume(R);
  return r === "important" ? !0 : r;
}
const HA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: $A,
  name: PA,
  parse: Vp,
  structure: FA,
  walkContext: BA
}, Symbol.toStringTag, { value: "Module" })), VA = 38;
function nl(r) {
  return this.Raw(r, this.consumeUntilSemicolonIncluded, !0);
}
const YA = "DeclarationList", KA = {
  children: [[
    "Declaration",
    "Atrule",
    "Rule"
  ]]
};
function Yp() {
  const r = this.createList();
  for (; !this.eof; )
    switch (this.tokenType) {
      case ce:
      case Re:
      case je:
        this.next();
        break;
      case pe:
        r.push(this.parseWithFallback(this.Atrule.bind(this, !0), nl));
        break;
      default:
        this.isDelim(VA) ? r.push(this.parseWithFallback(this.Rule, nl)) : r.push(this.parseWithFallback(this.Declaration, nl));
    }
  return {
    type: "DeclarationList",
    loc: this.getLocationFromList(r),
    children: r
  };
}
function GA(r) {
  this.children(r, (e) => {
    e.type === "Declaration" && this.token(je, ";");
  });
}
const WA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: GA,
  name: YA,
  parse: Yp,
  structure: KA
}, Symbol.toStringTag, { value: "Module" })), ZA = "Dimension", XA = {
  value: String,
  unit: String
};
function Kp() {
  const r = this.tokenStart, e = this.consumeNumber(Y);
  return {
    type: "Dimension",
    loc: this.getLocation(r, this.tokenStart),
    value: e,
    unit: this.substring(r + e.length, this.tokenStart)
  };
}
function QA(r) {
  this.token(Y, r.value + r.unit);
}
const JA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: QA,
  name: ZA,
  parse: Kp,
  structure: XA
}, Symbol.toStringTag, { value: "Module" })), eE = "Function", tE = "function", nE = {
  name: String,
  children: [[]]
};
function Gp(r, e) {
  const t = this.tokenStart, n = this.consumeFunctionName(), i = n.toLowerCase();
  let s;
  return s = e.hasOwnProperty(i) ? e[i].call(this, e) : r.call(this, e), this.eof || this.eat(te), {
    type: "Function",
    loc: this.getLocation(t, this.tokenStart),
    name: n,
    children: s
  };
}
function rE(r) {
  this.token(G, r.name + "("), this.children(r), this.token(te, ")");
}
const iE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: rE,
  name: eE,
  parse: Gp,
  structure: nE,
  walkContext: tE
}, Symbol.toStringTag, { value: "Module" })), sE = "XXX", aE = "Hash", oE = {
  value: String
};
function Wp() {
  const r = this.tokenStart;
  return this.eat(ae), {
    type: "Hash",
    loc: this.getLocation(r, this.tokenStart),
    value: this.substrToCursor(r + 1)
  };
}
function lE(r) {
  this.token(ae, "#" + r.value);
}
const cE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: lE,
  name: aE,
  parse: Wp,
  structure: oE,
  xxx: sE
}, Symbol.toStringTag, { value: "Module" })), uE = "Identifier", dE = {
  name: String
};
function Zp() {
  return {
    type: "Identifier",
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    name: this.consume(R)
  };
}
function hE(r) {
  this.token(R, r.name);
}
const fE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: hE,
  name: uE,
  parse: Zp,
  structure: dE
}, Symbol.toStringTag, { value: "Module" })), pE = "IdSelector", gE = {
  name: String
};
function Xp() {
  const r = this.tokenStart;
  return this.eat(ae), {
    type: "IdSelector",
    loc: this.getLocation(r, this.tokenStart),
    name: this.substrToCursor(r + 1)
  };
}
function mE(r) {
  this.token(K, "#" + r.name);
}
const bE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: mE,
  name: pE,
  parse: Xp,
  structure: gE
}, Symbol.toStringTag, { value: "Module" })), yE = "MediaFeature", vE = {
  name: String,
  value: ["Identifier", "Number", "Dimension", "Ratio", null]
};
function Qp() {
  const r = this.tokenStart;
  let e, t = null;
  if (this.eat(ve), this.skipSC(), e = this.consume(R), this.skipSC(), this.tokenType !== te) {
    switch (this.eat(Oe), this.skipSC(), this.tokenType) {
      case $:
        this.lookupNonWSType(1) === K ? t = this.Ratio() : t = this.Number();
        break;
      case Y:
        t = this.Dimension();
        break;
      case R:
        t = this.Identifier();
        break;
      default:
        this.error("Number, dimension, ratio or identifier is expected");
    }
    this.skipSC();
  }
  return this.eat(te), {
    type: "MediaFeature",
    loc: this.getLocation(r, this.tokenStart),
    name: e,
    value: t
  };
}
function wE(r) {
  this.token(ve, "("), this.token(R, r.name), r.value !== null && (this.token(Oe, ":"), this.node(r.value)), this.token(te, ")");
}
const kE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: wE,
  name: yE,
  parse: Qp,
  structure: vE
}, Symbol.toStringTag, { value: "Module" })), xE = "MediaQuery", SE = {
  children: [[
    "Identifier",
    "MediaFeature",
    "WhiteSpace"
  ]]
};
function Jp() {
  const r = this.createList();
  let e = null;
  this.skipSC();
  e:
    for (; !this.eof; ) {
      switch (this.tokenType) {
        case Re:
        case ce:
          this.next();
          continue;
        case R:
          e = this.Identifier();
          break;
        case ve:
          e = this.MediaFeature();
          break;
        default:
          break e;
      }
      r.push(e);
    }
  return e === null && this.error("Identifier or parenthesis is expected"), {
    type: "MediaQuery",
    loc: this.getLocationFromList(r),
    children: r
  };
}
function AE(r) {
  this.children(r);
}
const EE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: AE,
  name: xE,
  parse: Jp,
  structure: SE
}, Symbol.toStringTag, { value: "Module" })), CE = "MediaQueryList", TE = {
  children: [[
    "MediaQuery"
  ]]
};
function eg() {
  const r = this.createList();
  for (this.skipSC(); !this.eof && (r.push(this.MediaQuery()), this.tokenType === Wt); )
    this.next();
  return {
    type: "MediaQueryList",
    loc: this.getLocationFromList(r),
    children: r
  };
}
function LE(r) {
  this.children(r, () => this.token(Wt, ","));
}
const DE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: LE,
  name: CE,
  parse: eg,
  structure: TE
}, Symbol.toStringTag, { value: "Module" })), IE = 38, OE = "NestingSelector", NE = {};
function tg() {
  const r = this.tokenStart;
  return this.eatDelim(IE), {
    type: "NestingSelector",
    loc: this.getLocation(r, this.tokenStart)
  };
}
function ME() {
  this.token(K, "&");
}
const _E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: ME,
  name: OE,
  parse: tg,
  structure: NE
}, Symbol.toStringTag, { value: "Module" })), qE = "Nth", RE = {
  nth: ["AnPlusB", "Identifier"],
  selector: ["SelectorList", null]
};
function ng() {
  this.skipSC();
  const r = this.tokenStart;
  let e = r, t = null, n;
  return this.lookupValue(0, "odd") || this.lookupValue(0, "even") ? n = this.Identifier() : n = this.AnPlusB(), e = this.tokenStart, this.skipSC(), this.lookupValue(0, "of") && (this.next(), t = this.SelectorList(), e = this.tokenStart), {
    type: "Nth",
    loc: this.getLocation(r, e),
    nth: n,
    selector: t
  };
}
function zE(r) {
  this.node(r.nth), r.selector !== null && (this.token(R, "of"), this.node(r.selector));
}
const PE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: zE,
  name: qE,
  parse: ng,
  structure: RE
}, Symbol.toStringTag, { value: "Module" })), BE = "Number", FE = {
  value: String
};
function rg() {
  return {
    type: "Number",
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    value: this.consume($)
  };
}
function $E(r) {
  this.token($, r.value);
}
const jE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: $E,
  name: BE,
  parse: rg,
  structure: FE
}, Symbol.toStringTag, { value: "Module" })), UE = "Operator", HE = {
  value: String
};
function ig() {
  const r = this.tokenStart;
  return this.next(), {
    type: "Operator",
    loc: this.getLocation(r, this.tokenStart),
    value: this.substrToCursor(r)
  };
}
function VE(r) {
  this.tokenize(r.value);
}
const YE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: VE,
  name: UE,
  parse: ig,
  structure: HE
}, Symbol.toStringTag, { value: "Module" })), KE = "Parentheses", GE = {
  children: [[]]
};
function sg(r, e) {
  const t = this.tokenStart;
  let n = null;
  return this.eat(ve), n = r.call(this, e), this.eof || this.eat(te), {
    type: "Parentheses",
    loc: this.getLocation(t, this.tokenStart),
    children: n
  };
}
function WE(r) {
  this.token(ve, "("), this.children(r), this.token(te, ")");
}
const ZE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: WE,
  name: KE,
  parse: sg,
  structure: GE
}, Symbol.toStringTag, { value: "Module" })), XE = "Percentage", QE = {
  value: String
};
function ag() {
  return {
    type: "Percentage",
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    value: this.consumeNumber(le)
  };
}
function JE(r) {
  this.token(le, r.value + "%");
}
const eC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: JE,
  name: XE,
  parse: ag,
  structure: QE
}, Symbol.toStringTag, { value: "Module" })), tC = "PseudoClassSelector", nC = "function", rC = {
  name: String,
  children: [["Raw"], null]
};
function og() {
  const r = this.tokenStart;
  let e = null, t, n;
  return this.eat(Oe), this.tokenType === G ? (t = this.consumeFunctionName(), n = t.toLowerCase(), hasOwnProperty.call(this.pseudo, n) ? (this.skipSC(), e = this.pseudo[n].call(this), this.skipSC()) : (e = this.createList(), e.push(
    this.Raw(this.tokenIndex, null, !1)
  )), this.eat(te)) : t = this.consume(R), {
    type: "PseudoClassSelector",
    loc: this.getLocation(r, this.tokenStart),
    name: t,
    children: e
  };
}
function iC(r) {
  this.token(Oe, ":"), r.children === null ? this.token(R, r.name) : (this.token(G, r.name + "("), this.children(r), this.token(te, ")"));
}
const sC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: iC,
  name: tC,
  parse: og,
  structure: rC,
  walkContext: nC
}, Symbol.toStringTag, { value: "Module" })), aC = "PseudoElementSelector", oC = "function", lC = {
  name: String,
  children: [["Raw"], null]
};
function lg() {
  const r = this.tokenStart;
  let e = null, t, n;
  return this.eat(Oe), this.eat(Oe), this.tokenType === G ? (t = this.consumeFunctionName(), n = t.toLowerCase(), hasOwnProperty.call(this.pseudo, n) ? (this.skipSC(), e = this.pseudo[n].call(this), this.skipSC()) : (e = this.createList(), e.push(
    this.Raw(this.tokenIndex, null, !1)
  )), this.eat(te)) : t = this.consume(R), {
    type: "PseudoElementSelector",
    loc: this.getLocation(r, this.tokenStart),
    name: t,
    children: e
  };
}
function cC(r) {
  this.token(Oe, ":"), this.token(Oe, ":"), r.children === null ? this.token(R, r.name) : (this.token(G, r.name + "("), this.children(r), this.token(te, ")"));
}
const uC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: cC,
  name: aC,
  parse: lg,
  structure: lC,
  walkContext: oC
}, Symbol.toStringTag, { value: "Module" })), dC = 47, hC = 46;
function rh() {
  this.skipSC();
  const r = this.consume($);
  for (let e = 0; e < r.length; e++) {
    const t = r.charCodeAt(e);
    !we(t) && t !== hC && this.error("Unsigned number is expected", this.tokenStart - r.length + e);
  }
  return Number(r) === 0 && this.error("Zero number is not allowed", this.tokenStart - r.length), r;
}
const fC = "Ratio", pC = {
  left: String,
  right: String
};
function cg() {
  const r = this.tokenStart, e = rh.call(this);
  let t;
  return this.skipSC(), this.eatDelim(dC), t = rh.call(this), {
    type: "Ratio",
    loc: this.getLocation(r, this.tokenStart),
    left: e,
    right: t
  };
}
function gC(r) {
  this.token($, r.left), this.token(K, "/"), this.token($, r.right);
}
const mC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: gC,
  name: fC,
  parse: cg,
  structure: pC
}, Symbol.toStringTag, { value: "Module" }));
function bC() {
  return this.tokenIndex > 0 && this.lookupType(-1) === ce ? this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset : this.tokenStart;
}
const yC = "Raw", vC = {
  value: String
};
function ug(r, e, t) {
  const n = this.getTokenStart(r);
  let i;
  return this.skipUntilBalanced(r, e || this.consumeUntilBalanceEnd), t && this.tokenStart > n ? i = bC.call(this) : i = this.tokenStart, {
    type: "Raw",
    loc: this.getLocation(n, i),
    value: this.substring(n, i)
  };
}
function wC(r) {
  this.tokenize(r.value);
}
const kC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: wC,
  name: yC,
  parse: ug,
  structure: vC
}, Symbol.toStringTag, { value: "Module" }));
function ih(r) {
  return this.Raw(r, this.consumeUntilLeftCurlyBracket, !0);
}
function xC() {
  const r = this.SelectorList();
  return r.type !== "Raw" && this.eof === !1 && this.tokenType !== Ne && this.error(), r;
}
const SC = "Rule", AC = "rule", EC = {
  prelude: ["SelectorList", "Raw"],
  block: ["Block"]
};
function dg() {
  const r = this.tokenIndex, e = this.tokenStart;
  let t, n;
  return this.parseRulePrelude ? t = this.parseWithFallback(xC, ih) : t = ih.call(this, r), n = this.Block(!0), {
    type: "Rule",
    loc: this.getLocation(e, this.tokenStart),
    prelude: t,
    block: n
  };
}
function CC(r) {
  this.node(r.prelude), this.node(r.block);
}
const TC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: CC,
  name: SC,
  parse: dg,
  structure: EC,
  walkContext: AC
}, Symbol.toStringTag, { value: "Module" })), LC = "Selector", DC = {
  children: [[
    "TypeSelector",
    "IdSelector",
    "ClassSelector",
    "AttributeSelector",
    "PseudoClassSelector",
    "PseudoElementSelector",
    "Combinator",
    "WhiteSpace"
  ]]
};
function hg() {
  const r = this.readSequence(this.scope.Selector);
  return this.getFirstListNode(r) === null && this.error("Selector is expected"), {
    type: "Selector",
    loc: this.getLocationFromList(r),
    children: r
  };
}
function IC(r) {
  this.children(r);
}
const OC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: IC,
  name: LC,
  parse: hg,
  structure: DC
}, Symbol.toStringTag, { value: "Module" })), NC = "SelectorList", MC = "selector", _C = {
  children: [[
    "Selector",
    "Raw"
  ]]
};
function fg() {
  const r = this.createList();
  for (; !this.eof; ) {
    if (r.push(this.Selector()), this.tokenType === Wt) {
      this.next();
      continue;
    }
    break;
  }
  return {
    type: "SelectorList",
    loc: this.getLocationFromList(r),
    children: r
  };
}
function qC(r) {
  this.children(r, () => this.token(Wt, ","));
}
const RC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: qC,
  name: NC,
  parse: fg,
  structure: _C,
  walkContext: MC
}, Symbol.toStringTag, { value: "Module" })), Kl = 92, pg = 34, zC = 39;
function gg(r) {
  const e = r.length, t = r.charCodeAt(0), n = t === pg || t === zC ? 1 : 0, i = n === 1 && e > 1 && r.charCodeAt(e - 1) === t ? e - 2 : e - 1;
  let s = "";
  for (let a = n; a <= i; a++) {
    let o = r.charCodeAt(a);
    if (o === Kl) {
      if (a === i) {
        a !== e - 1 && (s = r.substr(a + 1));
        break;
      }
      if (o = r.charCodeAt(++a), Bt(Kl, o)) {
        const l = a - 1, c = Hr(r, l);
        a = c - 1, s += Jf(r.substring(l + 1, c));
      } else
        o === 13 && r.charCodeAt(a + 1) === 10 && a++;
    } else
      s += r[a];
  }
  return s;
}
function PC(r, e) {
  const t = '"', n = pg;
  let i = "", s = !1;
  for (let a = 0; a < r.length; a++) {
    const o = r.charCodeAt(a);
    if (o === 0) {
      i += "�";
      continue;
    }
    if (o <= 31 || o === 127) {
      i += "\\" + o.toString(16), s = !0;
      continue;
    }
    o === n || o === Kl ? (i += "\\" + r.charAt(a), s = !1) : (s && (Cn(o) || Gn(o)) && (i += " "), i += r.charAt(a), s = !1);
  }
  return t + i + t;
}
const BC = "String", FC = {
  value: String
};
function mg() {
  return {
    type: "String",
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    value: gg(this.consume(Gt))
  };
}
function $C(r) {
  this.token(Gt, PC(r.value));
}
const jC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: $C,
  name: BC,
  parse: mg,
  structure: FC
}, Symbol.toStringTag, { value: "Module" })), UC = 33;
function sh(r) {
  return this.Raw(r, null, !1);
}
const HC = "StyleSheet", VC = "stylesheet", YC = {
  children: [[
    "Comment",
    "CDO",
    "CDC",
    "Atrule",
    "Rule",
    "Raw"
  ]]
};
function bg() {
  const r = this.tokenStart, e = this.createList();
  let t;
  for (; !this.eof; ) {
    switch (this.tokenType) {
      case ce:
        this.next();
        continue;
      case Re:
        if (this.charCodeAt(this.tokenStart + 2) !== UC) {
          this.next();
          continue;
        }
        t = this.Comment();
        break;
      case Ji:
        t = this.CDO();
        break;
      case $e:
        t = this.CDC();
        break;
      case pe:
        t = this.parseWithFallback(this.Atrule, sh);
        break;
      default:
        t = this.parseWithFallback(this.Rule, sh);
    }
    e.push(t);
  }
  return {
    type: "StyleSheet",
    loc: this.getLocation(r, this.tokenStart),
    children: e
  };
}
function KC(r) {
  this.children(r);
}
const GC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: KC,
  name: HC,
  parse: bg,
  structure: YC,
  walkContext: VC
}, Symbol.toStringTag, { value: "Module" })), WC = 42, ah = 124;
function rl() {
  this.tokenType !== R && this.isDelim(WC) === !1 && this.error("Identifier or asterisk is expected"), this.next();
}
const ZC = "TypeSelector", XC = {
  name: String
};
function yg() {
  const r = this.tokenStart;
  return this.isDelim(ah) ? (this.next(), rl.call(this)) : (rl.call(this), this.isDelim(ah) && (this.next(), rl.call(this))), {
    type: "TypeSelector",
    loc: this.getLocation(r, this.tokenStart),
    name: this.substrToCursor(r)
  };
}
function QC(r) {
  this.tokenize(r.name);
}
const JC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: QC,
  name: ZC,
  parse: yg,
  structure: XC
}, Symbol.toStringTag, { value: "Module" })), vg = 43, wg = 45, Gl = 63;
function Ei(r, e) {
  let t = 0;
  for (let n = this.tokenStart + r; n < this.tokenEnd; n++) {
    const i = this.charCodeAt(n);
    if (i === wg && e && t !== 0)
      return Ei.call(this, r + t + 1, !1), -1;
    Cn(i) || this.error(
      e && t !== 0 ? "Hyphen minus" + (t < 6 ? " or hex digit" : "") + " is expected" : t < 6 ? "Hex digit is expected" : "Unexpected input",
      n
    ), ++t > 6 && this.error("Too many hex digits", n);
  }
  return this.next(), t;
}
function zs(r) {
  let e = 0;
  for (; this.isDelim(Gl); )
    ++e > r && this.error("Too many question marks"), this.next();
}
function eT(r) {
  this.charCodeAt(this.tokenStart) !== r && this.error((r === vg ? "Plus sign" : "Hyphen minus") + " is expected");
}
function tT() {
  let r = 0;
  switch (this.tokenType) {
    case $:
      if (r = Ei.call(this, 1, !0), this.isDelim(Gl)) {
        zs.call(this, 6 - r);
        break;
      }
      if (this.tokenType === Y || this.tokenType === $) {
        eT.call(this, wg), Ei.call(this, 1, !1);
        break;
      }
      break;
    case Y:
      r = Ei.call(this, 1, !0), r > 0 && zs.call(this, 6 - r);
      break;
    default:
      if (this.eatDelim(vg), this.tokenType === R) {
        r = Ei.call(this, 0, !0), r > 0 && zs.call(this, 6 - r);
        break;
      }
      if (this.isDelim(Gl)) {
        this.next(), zs.call(this, 5);
        break;
      }
      this.error("Hex digit or question mark is expected");
  }
}
const nT = "UnicodeRange", rT = {
  value: String
};
function kg() {
  const r = this.tokenStart;
  return this.eatIdent("u"), tT.call(this), {
    type: "UnicodeRange",
    loc: this.getLocation(r, this.tokenStart),
    value: this.substrToCursor(r)
  };
}
function iT(r) {
  this.tokenize(r.value);
}
const sT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: iT,
  name: nT,
  parse: kg,
  structure: rT
}, Symbol.toStringTag, { value: "Module" })), aT = 32, Wl = 92, oT = 34, lT = 39, cT = 40, xg = 41;
function uT(r) {
  const e = r.length;
  let t = 4, n = r.charCodeAt(e - 1) === xg ? e - 2 : e - 1, i = "";
  for (; t < n && Gn(r.charCodeAt(t)); )
    t++;
  for (; t < n && Gn(r.charCodeAt(n)); )
    n--;
  for (let s = t; s <= n; s++) {
    let a = r.charCodeAt(s);
    if (a === Wl) {
      if (s === n) {
        s !== e - 1 && (i = r.substr(s + 1));
        break;
      }
      if (a = r.charCodeAt(++s), Bt(Wl, a)) {
        const o = s - 1, l = Hr(r, o);
        s = l - 1, i += Jf(r.substring(o + 1, l));
      } else
        a === 13 && r.charCodeAt(s + 1) === 10 && s++;
    } else
      i += r[s];
  }
  return i;
}
function dT(r) {
  let e = "", t = !1;
  for (let n = 0; n < r.length; n++) {
    const i = r.charCodeAt(n);
    if (i === 0) {
      e += "�";
      continue;
    }
    if (i <= 31 || i === 127) {
      e += "\\" + i.toString(16), t = !0;
      continue;
    }
    i === aT || i === Wl || i === oT || i === lT || i === cT || i === xg ? (e += "\\" + r.charAt(n), t = !1) : (t && Cn(i) && (e += " "), e += r.charAt(n), t = !1);
  }
  return "url(" + e + ")";
}
const hT = "Url", fT = {
  value: String
};
function Sg() {
  const r = this.tokenStart;
  let e;
  switch (this.tokenType) {
    case Le:
      e = uT(this.consume(Le));
      break;
    case G:
      this.cmpStr(this.tokenStart, this.tokenEnd, "url(") || this.error("Function name must be `url`"), this.eat(G), this.skipSC(), e = gg(this.consume(Gt)), this.skipSC(), this.eof || this.eat(te);
      break;
    default:
      this.error("Url or Function is expected");
  }
  return {
    type: "Url",
    loc: this.getLocation(r, this.tokenStart),
    value: e
  };
}
function pT(r) {
  this.token(Le, dT(r.value));
}
const gT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: pT,
  name: hT,
  parse: Sg,
  structure: fT
}, Symbol.toStringTag, { value: "Module" })), mT = "Value", bT = {
  children: [[]]
};
function Ag() {
  const r = this.tokenStart, e = this.readSequence(this.scope.Value);
  return {
    type: "Value",
    loc: this.getLocation(r, this.tokenStart),
    children: e
  };
}
function yT(r) {
  this.children(r);
}
const vT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: yT,
  name: mT,
  parse: Ag,
  structure: bT
}, Symbol.toStringTag, { value: "Module" })), wT = Object.freeze({
  type: "WhiteSpace",
  loc: null,
  value: " "
}), kT = "WhiteSpace", xT = {
  value: String
};
function Eg() {
  return this.eat(ce), wT;
}
function ST(r) {
  this.token(ce, r.value);
}
const AT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generate: ST,
  name: kT,
  parse: Eg,
  structure: xT
}, Symbol.toStringTag, { value: "Module" })), Cg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AnPlusB: CS,
  Atrule: NS,
  AtrulePrelude: zS,
  AttributeSelector: YS,
  Block: JS,
  Brackets: rA,
  CDC: oA,
  CDO: dA,
  ClassSelector: mA,
  Combinator: SA,
  Comment: DA,
  Declaration: HA,
  DeclarationList: WA,
  Dimension: JA,
  Function: iE,
  Hash: cE,
  IdSelector: bE,
  Identifier: fE,
  MediaFeature: kE,
  MediaQuery: EE,
  MediaQueryList: DE,
  NestingSelector: _E,
  Nth: PE,
  Number: jE,
  Operator: YE,
  Parentheses: ZE,
  Percentage: eC,
  PseudoClassSelector: sC,
  PseudoElementSelector: uC,
  Ratio: mC,
  Raw: kC,
  Rule: TC,
  Selector: OC,
  SelectorList: RC,
  String: jC,
  StyleSheet: GC,
  TypeSelector: JC,
  UnicodeRange: sT,
  Url: gT,
  Value: vT,
  WhiteSpace: AT
}, Symbol.toStringTag, { value: "Module" })), ET = _e(H({
  generic: !0
}, kS), {
  node: Cg
}), CT = 35, TT = 42, oh = 43, LT = 45, DT = 47, IT = 117;
function Tg(r) {
  switch (this.tokenType) {
    case ae:
      return this.Hash();
    case Wt:
      return this.Operator();
    case ve:
      return this.Parentheses(this.readSequence, r.recognizer);
    case We:
      return this.Brackets(this.readSequence, r.recognizer);
    case Gt:
      return this.String();
    case Y:
      return this.Dimension();
    case le:
      return this.Percentage();
    case $:
      return this.Number();
    case G:
      return this.cmpStr(this.tokenStart, this.tokenEnd, "url(") ? this.Url() : this.Function(this.readSequence, r.recognizer);
    case Le:
      return this.Url();
    case R:
      return this.cmpChar(this.tokenStart, IT) && this.cmpChar(this.tokenStart + 1, oh) ? this.UnicodeRange() : this.Identifier();
    case K: {
      const e = this.charCodeAt(this.tokenStart);
      if (e === DT || e === TT || e === oh || e === LT)
        return this.Operator();
      e === CT && this.error("Hex or identifier is expected", this.tokenStart + 1);
      break;
    }
  }
}
const OT = {
  getNode: Tg
}, NT = 35, MT = 38, _T = 42, qT = 43, RT = 47, lh = 46, zT = 62, PT = 124, BT = 126;
function FT(r, e) {
  e.last !== null && e.last.type !== "Combinator" && r !== null && r.type !== "Combinator" && e.push({
    // FIXME: this.Combinator() should be used instead
    type: "Combinator",
    loc: null,
    name: " "
  });
}
function $T() {
  switch (this.tokenType) {
    case We:
      return this.AttributeSelector();
    case ae:
      return this.IdSelector();
    case Oe:
      return this.lookupType(1) === Oe ? this.PseudoElementSelector() : this.PseudoClassSelector();
    case R:
      return this.TypeSelector();
    case $:
    case le:
      return this.Percentage();
    case Y:
      this.charCodeAt(this.tokenStart) === lh && this.error("Identifier is expected", this.tokenStart + 1);
      break;
    case K: {
      switch (this.charCodeAt(this.tokenStart)) {
        case qT:
        case zT:
        case BT:
        case RT:
          return this.Combinator();
        case lh:
          return this.ClassSelector();
        case _T:
        case PT:
          return this.TypeSelector();
        case NT:
          return this.IdSelector();
        case MT:
          return this.NestingSelector();
      }
      break;
    }
  }
}
const jT = {
  onWhiteSpace: FT,
  getNode: $T
};
function UT() {
  return this.createSingleNodeList(
    this.Raw(this.tokenIndex, null, !1)
  );
}
function HT() {
  const r = this.createList();
  if (this.skipSC(), r.push(this.Identifier()), this.skipSC(), this.tokenType === Wt) {
    r.push(this.Operator());
    const e = this.tokenIndex, t = this.parseCustomProperty ? this.Value(null) : this.Raw(this.tokenIndex, this.consumeUntilExclamationMarkOrSemicolon, !1);
    if (t.type === "Value" && t.children.isEmpty) {
      for (let n = e - this.tokenIndex; n <= 0; n++)
        if (this.lookupType(n) === ce) {
          t.children.appendData({
            type: "WhiteSpace",
            loc: null,
            value: " "
          });
          break;
        }
    }
    r.push(t);
  }
  return r;
}
function ch(r) {
  return r !== null && r.type === "Operator" && (r.value[r.value.length - 1] === "-" || r.value[r.value.length - 1] === "+");
}
const VT = {
  getNode: Tg,
  onWhiteSpace(r, e) {
    ch(r) && (r.value = " " + r.value), ch(e.last) && (e.last.value += " ");
  },
  expression: UT,
  var: HT
}, YT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AtrulePrelude: OT,
  Selector: jT,
  Value: VT
}, Symbol.toStringTag, { value: "Module" })), KT = {
  parse: {
    prelude: null,
    block() {
      return this.Block(!0);
    }
  }
}, GT = {
  parse: {
    prelude() {
      const r = this.createList();
      switch (this.skipSC(), this.tokenType) {
        case Gt:
          r.push(this.String());
          break;
        case Le:
        case G:
          r.push(this.Url());
          break;
        default:
          this.error("String or url() is expected");
      }
      return (this.lookupNonWSType(0) === R || this.lookupNonWSType(0) === ve) && r.push(this.MediaQueryList()), r;
    },
    block: null
  }
}, WT = {
  parse: {
    prelude() {
      return this.createSingleNodeList(
        this.MediaQueryList()
      );
    },
    block(r = !1) {
      return this.Block(r);
    }
  }
}, ZT = {
  parse: {
    prelude() {
      return this.createSingleNodeList(
        this.SelectorList()
      );
    },
    block() {
      return this.Block(!0);
    }
  }
}, XT = {
  parse: {
    prelude() {
      return this.createSingleNodeList(
        this.SelectorList()
      );
    },
    block() {
      return this.Block(!0);
    }
  }
};
function QT() {
  return this.createSingleNodeList(
    this.Raw(this.tokenIndex, null, !1)
  );
}
function JT() {
  return this.skipSC(), this.tokenType === R && this.lookupNonWSType(1) === Oe ? this.createSingleNodeList(
    this.Declaration()
  ) : Lg.call(this);
}
function Lg() {
  const r = this.createList();
  let e;
  this.skipSC();
  e:
    for (; !this.eof; ) {
      switch (this.tokenType) {
        case Re:
        case ce:
          this.next();
          continue;
        case G:
          e = this.Function(QT, this.scope.AtrulePrelude);
          break;
        case R:
          e = this.Identifier();
          break;
        case ve:
          e = this.Parentheses(JT, this.scope.AtrulePrelude);
          break;
        default:
          break e;
      }
      r.push(e);
    }
  return r;
}
const eL = {
  parse: {
    prelude() {
      const r = Lg.call(this);
      return this.getFirstListNode(r) === null && this.error("Condition is expected"), r;
    },
    block(r = !1) {
      return this.Block(r);
    }
  }
}, tL = {
  "font-face": KT,
  import: GT,
  media: WT,
  nest: ZT,
  page: XT,
  supports: eL
}, Rn = {
  parse() {
    return this.createSingleNodeList(
      this.SelectorList()
    );
  }
}, il = {
  parse() {
    return this.createSingleNodeList(
      this.Selector()
    );
  }
}, uh = {
  parse() {
    return this.createSingleNodeList(
      this.Identifier()
    );
  }
}, Ps = {
  parse() {
    return this.createSingleNodeList(
      this.Nth()
    );
  }
}, nL = {
  dir: uh,
  has: Rn,
  lang: uh,
  matches: Rn,
  is: Rn,
  "-moz-any": Rn,
  "-webkit-any": Rn,
  where: Rn,
  not: Rn,
  "nth-child": Ps,
  "nth-last-child": Ps,
  "nth-last-of-type": Ps,
  "nth-of-type": Ps,
  slotted: il,
  host: il,
  "host-context": il
}, rL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AnPlusB: Op,
  Atrule: Np,
  AtrulePrelude: Mp,
  AttributeSelector: qp,
  Block: zp,
  Brackets: Pp,
  CDC: Bp,
  CDO: Fp,
  ClassSelector: $p,
  Combinator: jp,
  Comment: Up,
  Declaration: Vp,
  DeclarationList: Yp,
  Dimension: Kp,
  Function: Gp,
  Hash: Wp,
  IdSelector: Xp,
  Identifier: Zp,
  MediaFeature: Qp,
  MediaQuery: Jp,
  MediaQueryList: eg,
  NestingSelector: tg,
  Nth: ng,
  Number: rg,
  Operator: ig,
  Parentheses: sg,
  Percentage: ag,
  PseudoClassSelector: og,
  PseudoElementSelector: lg,
  Ratio: cg,
  Raw: ug,
  Rule: dg,
  Selector: hg,
  SelectorList: fg,
  String: mg,
  StyleSheet: bg,
  TypeSelector: yg,
  UnicodeRange: kg,
  Url: Sg,
  Value: Ag,
  WhiteSpace: Eg
}, Symbol.toStringTag, { value: "Module" })), iL = {
  parseContext: {
    default: "StyleSheet",
    stylesheet: "StyleSheet",
    atrule: "Atrule",
    atrulePrelude(r) {
      return this.AtrulePrelude(r.atrule ? String(r.atrule) : null);
    },
    mediaQueryList: "MediaQueryList",
    mediaQuery: "MediaQuery",
    rule: "Rule",
    selectorList: "SelectorList",
    selector: "Selector",
    block() {
      return this.Block(!0);
    },
    declarationList: "DeclarationList",
    declaration: "Declaration",
    value: "Value"
  },
  scope: YT,
  atrule: tL,
  pseudo: nL,
  node: rL
}, sL = {
  node: Cg
}, aL = wS(H(H(H({}, ET), iL), sL));
function Zl(r) {
  const e = {};
  for (const t in r) {
    let n = r[t];
    n && (Array.isArray(n) || n instanceof fe ? n = n.map(Zl) : n.constructor === Object && (n = Zl(n))), e[t] = n;
  }
  return e;
}
const {
  tokenize: uD,
  parse: oL,
  generate: lL,
  lexer: dD,
  createLexer: hD,
  walk: Pn,
  find: fD,
  findLast: pD,
  findAll: gD,
  toPlainObject: mD,
  fromPlainObject: bD,
  fork: yD
} = aL;
let cL = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", bt = (r = 21) => {
  let e = "", t = r;
  for (; t--; )
    e += cL[Math.random() * 64 | 0];
  return e;
};
function Bn(r) {
  return oL(r, {
    parseAtrulePrelude: !1,
    parseCustomProperty: !0
  });
}
function Ve(r) {
  return lL(r, {
    // Default `safe` adds extra (potentially breaking) spaces for compatibility
    // with old browsers.
    mode: "spec"
  });
}
function Dg(r) {
  return r.type === "Declaration";
}
function uL(r) {
  return r.value.children.first.name;
}
const Xl = {
  "position-anchor": `--position-anchor-${bt(12)}`,
  "anchor-scope": `--anchor-scope-${bt(12)}`,
  "anchor-name": `--anchor-name-${bt(12)}`
};
function dL(r, e) {
  return Dg(r) && Xl[r.property] && e ? (e.children.appendData(_e(H({}, r), {
    property: Xl[r.property]
  })), { updated: !0 }) : {};
}
function hL(r) {
  for (const e of r) {
    let t = !1;
    const n = Bn(e.css);
    Pn(n, {
      visit: "Declaration",
      enter(i) {
        var s;
        const a = (s = this.rule) == null ? void 0 : s.block, { updated: o } = dL(i, a);
        o && (t = !0);
      }
    }), t && (e.css = Ve(n), e.changed = !0);
  }
  return r.some((e) => e.changed === !0);
}
var Ig = /* @__PURE__ */ ((r) => (r.All = "all", r.None = "none", r))(Ig || {});
function Yt(r, e) {
  var t;
  return e = (t = Xl[e]) != null ? t : e, (r instanceof HTMLElement ? getComputedStyle(r) : r.computedStyle).getPropertyValue(e).trim();
}
function Kr(r, e, t) {
  return Yt(r, e) === t;
}
function fL(r, { selector: e, pseudoElementPart: t }) {
  const n = getComputedStyle(r, t), i = document.createElement("div"), s = document.createElement("style");
  i.id = `fake-pseudo-element-${bt()}`;
  for (const o of Array.from(n)) {
    const l = n.getPropertyValue(o);
    i.style.setProperty(o, l);
  }
  s.textContent += `#${i.id}${t} { content: ${n.content}; }`, s.textContent += `${e} { display: none !important; }`, document.head.append(s);
  const a = t === "::before" ? "afterbegin" : "beforeend";
  return r.insertAdjacentElement(a, i), { fakePseudoElement: i, sheet: s, computedStyle: n };
}
function pL(r) {
  let e = r;
  for (; e; ) {
    if (Kr(e, "overflow", "scroll"))
      return e;
    e = e.parentElement;
  }
  return e;
}
function gL(r) {
  let e = pL(r);
  return e === document.documentElement && (e = null), e ?? { scrollTop: 0, scrollLeft: 0 };
}
function mL(r) {
  const { elementPart: e, pseudoElementPart: t } = r, n = [];
  if (t && !(t === "::before" || t === "::after")) return n;
  const i = Array.from(
    document.querySelectorAll(e)
  );
  if (!t)
    return n.push(...i), n;
  for (const s of i) {
    const { fakePseudoElement: a, sheet: o, computedStyle: l } = fL(
      s,
      r
    ), c = a.getBoundingClientRect(), { scrollY: d, scrollX: f } = globalThis, h = gL(s);
    n.push({
      fakePseudoElement: a,
      computedStyle: l,
      removeFakePseudoElement() {
        a.remove(), o.remove();
      },
      // For https://floating-ui.com/docs/autoupdate#ancestorscroll to work on
      // `VirtualElement`s.
      contextElement: s,
      // https://floating-ui.com/docs/virtual-elements
      getBoundingClientRect() {
        const { scrollY: g, scrollX: m } = globalThis, { scrollTop: b, scrollLeft: k } = h;
        return DOMRect.fromRect({
          y: c.y + (d - g) + (h.scrollTop - b),
          x: c.x + (f - m) + (h.scrollLeft - k),
          width: c.width,
          height: c.height
        });
      }
    });
  }
  return n;
}
function bL(r, e) {
  const t = Yt(r, "anchor-name");
  return e ? t.split(",").map((n) => n.trim()).includes(e) : !t;
}
function yL(r, e) {
  const t = Yt(r, "anchor-scope");
  return t === e || t === "all";
}
function vL(r) {
  return !!((r.type === "text/css" || r.rel === "stylesheet") && r.href);
}
function wL(r) {
  const e = new URL(r.href, document.baseURI);
  if (vL(r) && e.origin === location.origin)
    return e;
}
function kL(r) {
  return ge(this, null, function* () {
    return Promise.all(
      r.map((e) => ge(this, null, function* () {
        if (!e.url)
          return e;
        const t = yield (yield fetch(e.url.toString())).text();
        return _e(H({}, e), { css: t });
      }))
    );
  });
}
function xL() {
  const r = document.querySelectorAll('[style*="anchor"]'), e = [];
  return r.forEach((t) => {
    const n = bt(12), i = "data-has-inline-styles";
    t.setAttribute(i, n);
    const s = t.getAttribute("style"), a = `[${i}="${n}"] { ${s} }`;
    e.push({ el: t, css: a });
  }), e;
}
function SL() {
  return ge(this, null, function* () {
    const r = document.querySelectorAll("link, style"), e = [];
    r.forEach((n) => {
      if (n.tagName.toLowerCase() === "link") {
        const i = wL(n);
        i && e.push({ el: n, url: i });
      }
      n.tagName.toLowerCase() === "style" && e.push({ el: n, css: n.innerHTML });
    });
    const t = xL();
    return yield kL([...e, ...t]);
  });
}
function AL(r, e) {
  return !r || r === e ? !1 : Og(r) ? r.document.contains(e) : r.contains(e);
}
function Og(r) {
  return !!(r && r === r.window);
}
function EL(r) {
  return Kr(r, "position", "fixed");
}
function Ql(r) {
  return !!(r && (EL(r) || Kr(r, "position", "absolute")));
}
function dh(r, e) {
  return r.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING;
}
function CL(r) {
  return ge(this, null, function* () {
    return yield nt.getOffsetParent(r);
  });
}
function sl(r) {
  return ge(this, null, function* () {
    if (!["absolute", "fixed"].includes(Yt(r, "position")))
      return yield CL(r);
    let e = r.parentElement;
    for (; e; ) {
      if (!Kr(e, "position", "static") && Kr(e, "display", "block"))
        return e;
      e = e.parentElement;
    }
    return window;
  });
}
function TL(r, e, t, n) {
  return ge(this, null, function* () {
    const i = yield sl(r), s = yield sl(t);
    if (!(AL(s, r) || Og(s)) || i === s && !(!Ql(r) || dh(r, t)))
      return !1;
    if (i !== s) {
      let a;
      const o = [];
      for (a = i; a && a !== s && a !== window; )
        o.push(a), a = yield sl(a);
      const l = o[o.length - 1];
      if (l instanceof HTMLElement && !(!Ql(l) || dh(l, t)))
        return !1;
    }
    {
      let a = r.parentElement;
      for (; a; ) {
        if (Kr(a, "content-visibility", "hidden"))
          return !1;
        a = a.parentElement;
      }
    }
    return !(e && n && hh(r, e, n) !== hh(t, e, n));
  });
}
function hh(r, e, t) {
  for (; !(r.matches(t) && yL(r, e)); ) {
    if (!r.parentElement)
      return null;
    r = r.parentElement;
  }
  return r;
}
function fh(r, e, t, n) {
  return ge(this, null, function* () {
    if (!(r instanceof HTMLElement && t.length && Ql(r)))
      return null;
    const i = t.flatMap(mL).filter((a) => bL(a, e)), s = n.map((a) => a.selector).join(",") || null;
    for (let a = i.length - 1; a >= 0; a--) {
      const o = i[a], l = "fakePseudoElement" in o;
      if (yield TL(
        l ? o.fakePseudoElement : o,
        e,
        r,
        s
      ))
        return l && o.removeFakePseudoElement(), o;
    }
    return null;
  });
}
const LL = [
  "left",
  "right",
  "top",
  "bottom",
  "inset-block-start",
  "inset-block-end",
  "inset-inline-start",
  "inset-inline-end",
  "inset-block",
  "inset-inline",
  "inset"
], DL = [
  "width",
  "height",
  "min-width",
  "min-height",
  "max-width",
  "max-height"
], IL = [
  "justify-content",
  "align-content",
  "justify-self",
  "align-self",
  "justify-items",
  "align-items"
], OL = [
  "top",
  "left",
  "right",
  "bottom",
  "start",
  "end",
  "self-start",
  "self-end",
  "center"
], NL = [
  "width",
  "height",
  "block",
  "inline",
  "self-block",
  "self-inline"
];
function ML(r) {
  return r.type === "Declaration" && r.property === "anchor-name";
}
function _L(r) {
  return r.type === "Declaration" && r.property === "anchor-scope";
}
function Ng(r) {
  return !!(r && r.type === "Function" && r.name === "anchor");
}
function Mg(r) {
  return !!(r && r.type === "Function" && r.name === "anchor-size");
}
function Gs(r) {
  return !!(r && r.type === "Function" && r.name === "var");
}
function qL(r) {
  return r.type === "Declaration" && r.property === "position-fallback";
}
function RL(r) {
  return r.type === "Atrule" && r.name === "position-fallback";
}
function zL(r) {
  return r.type === "Atrule" && r.name === "try";
}
function al(r) {
  return !!(r.type === "Identifier" && r.name);
}
function PL(r) {
  return !!(r.type === "Percentage" && r.value);
}
function Yi(r) {
  return LL.includes(r);
}
function BL(r) {
  return OL.includes(r);
}
function _a(r) {
  return DL.includes(r);
}
function FL(r) {
  return NL.includes(r);
}
function $L(r) {
  return IL.includes(r);
}
function ph(r, e) {
  let t, n, i, s = "", a = !1, o;
  const l = [];
  r.children.toArray().forEach((h) => {
    if (a) {
      s = `${s}${Ve(h)}`;
      return;
    }
    if (h.type === "Operator" && h.value === ",") {
      a = !0;
      return;
    }
    l.push(h);
  });
  let [c, d] = l;
  if (d || (d = c, c = void 0), c && (al(c) ? c.name === "implicit" ? c = void 0 : c.name.startsWith("--") && (t = c.name) : Gs(c) && c.children.first && (o = c.children.first.name)), d)
    if (Ng(r)) {
      if (al(d) && BL(d.name))
        n = d.name;
      else if (PL(d)) {
        const h = Number(d.value);
        n = Number.isNaN(h) ? void 0 : h;
      }
    } else Mg(r) && al(d) && FL(d.name) && (i = d.name);
  const f = `--anchor-${bt(12)}`;
  return Object.assign(r, {
    type: "Raw",
    value: `var(${f})`,
    children: null
  }), Reflect.deleteProperty(r, "name"), {
    anchorName: t,
    anchorSide: n,
    anchorSize: i,
    fallbackValue: s || "0px",
    customPropName: o,
    uuid: f
  };
}
function gh(r) {
  return r.value.children.map(
    ({ name: e }) => e
  );
}
function ol(r) {
  return r ? r.children.map((e) => {
    var t;
    let n;
    ((t = e.children.last) == null ? void 0 : t.type) === "PseudoElementSelector" && (e = Zl(e), n = Ve(e.children.last), e.children.pop());
    const i = Ve(e);
    return {
      selector: i + (n ?? ""),
      elementPart: i,
      pseudoElementPart: n
    };
  }).toArray() : [];
}
let Ii = {}, $n = {}, jn = {}, Oi = {}, Fn = {};
function jL() {
  Ii = {}, $n = {}, jn = {}, Oi = {}, Fn = {};
}
function UL(r, e) {
  var t;
  if ((Ng(r) || Mg(r)) && e) {
    if (e.property.startsWith("--")) {
      const n = Ve(e.value), i = ph(r);
      return Oi[i.uuid] = n, jn[e.property] = [
        ...(t = jn[e.property]) != null ? t : [],
        i
      ], { changed: !0 };
    }
    if (Yi(e.property) || _a(e.property)) {
      const n = ph(r);
      return { prop: e.property, data: n, changed: !0 };
    }
  }
  return {};
}
function HL(r) {
  return qL(r) && r.value.children.first ? uL(r) : null;
}
function VL(r) {
  var e, t;
  if (RL(r) && (e = r.prelude) != null && e.value && (t = r.block) != null && t.children) {
    const n = r.prelude.value, i = [];
    return r.block.children.filter(zL).forEach((s) => {
      var a;
      if ((a = s.block) != null && a.children) {
        const o = s.block.children.filter(
          (c) => Dg(c) && (Yi(c.property) || _a(c.property) || $L(c.property))
        ), l = {
          uuid: `${n}-try-${bt(12)}`,
          declarations: Object.fromEntries(
            o.map((c) => [c.property, Ve(c.value)])
          )
        };
        i.push(l);
      }
    }), { name: n, blocks: i };
  }
  return {};
}
function YL(r, e) {
  return ge(this, null, function* () {
    let t = e.anchorName;
    const n = e.customPropName;
    if (r && !t) {
      const o = r.getAttribute("anchor"), l = Yt(
        r,
        "position-anchor"
      );
      if (l)
        t = l;
      else if (n)
        t = Yt(r, n);
      else if (o) {
        const c = `#${CSS.escape(o)}`;
        return yield fh(
          r,
          null,
          [{ selector: c, elementPart: c }],
          []
        );
      }
    }
    const i = t ? Ii[t] || [] : [], s = t ? $n[Ig.All] || [] : [], a = t ? $n[t] || [] : [];
    return yield fh(
      r,
      t || null,
      i,
      [...s, ...a]
    );
  });
}
function KL(r) {
  return ge(this, null, function* () {
    var e, t, n, i, s, a;
    const o = {}, l = {}, c = {}, d = {};
    jL();
    for (const b of r) {
      const k = Bn(b.css);
      Pn(k, {
        visit: "Atrule",
        enter(y) {
          const { name: S, blocks: E } = VL(y);
          S && E != null && E.length && (c[S] = {
            targets: [],
            blocks: E
          });
        }
      });
    }
    for (const b of r) {
      let k = !1;
      const y = Bn(b.css);
      Pn(y, {
        visit: "Declaration",
        enter(S) {
          var E, C;
          const D = (E = this.rule) == null ? void 0 : E.prelude, M = ol(D), N = HL(S);
          if (N && M.length && c[N]) {
            for (const { selector: x } of M)
              d[x] = { fallbacks: c[N].blocks }, c[N].targets.includes(x) || c[N].targets.push(x);
            for (const x of c[N].blocks) {
              const A = `[data-anchor-polyfill="${x.uuid}"]`;
              (C = this.stylesheet) == null || C.children.prependData({
                type: "Rule",
                prelude: {
                  type: "Raw",
                  value: A
                },
                block: {
                  type: "Block",
                  children: new fe().fromArray(
                    Object.entries(x.declarations).map(([q, O]) => ({
                      type: "Declaration",
                      important: !0,
                      property: q,
                      value: {
                        type: "Raw",
                        value: O
                      }
                    }))
                  )
                }
              }), l[A] = M.map(({ selector: q }) => q).join(", ");
            }
            k = !0;
          }
        }
      }), k && (b.css = Ve(y), b.changed = !0);
    }
    for (const b of r) {
      let k = !1;
      const y = Bn(b.css);
      Pn(y, function(S) {
        var E, C, D;
        const M = (E = this.rule) == null ? void 0 : E.prelude, N = ol(M);
        if (ML(S) && N.length)
          for (const O of gh(S))
            Ii[O] != null || (Ii[O] = []), Ii[O].push(...N);
        if (_L(S) && N.length)
          for (const O of gh(S))
            $n[O] != null || ($n[O] = []), $n[O].push(...N);
        const {
          prop: x,
          data: A,
          changed: q
        } = UL(S, this.declaration);
        if (x && A && N.length)
          for (const { selector: O } of N)
            o[O] = _e(H({}, o[O]), {
              [x]: [...(D = (C = o[O]) == null ? void 0 : C[x]) != null ? D : [], A]
            });
        q && (k = !0);
      }), k && (b.css = Ve(y), b.changed = !0);
    }
    const f = new Set(Object.keys(jn)), h = {}, g = (b) => {
      var k, y, S, E, C;
      const D = [], M = new Set((y = (k = h[b]) == null ? void 0 : k.names) != null ? y : []);
      for (; M.size > 0; )
        for (const N of M)
          D.push(...(S = jn[N]) != null ? S : []), M.delete(N), (C = (E = h[N]) == null ? void 0 : E.names) != null && C.length && h[N].names.forEach((x) => M.add(x));
      return D;
    };
    for (; f.size > 0; ) {
      const b = [];
      for (const k of r) {
        let y = !1;
        const S = Bn(k.css);
        Pn(S, {
          visit: "Function",
          enter(E) {
            var C, D;
            const M = (C = this.rule) == null ? void 0 : C.prelude, N = this.declaration, x = N == null ? void 0 : N.property;
            if ((M == null ? void 0 : M.children.isEmpty) === !1 && Gs(E) && N && x && E.children.first && f.has(
              E.children.first.name
            ) && // For now, we only want assignments to other CSS custom properties
            x.startsWith("--")) {
              const A = E.children.first, q = (D = jn[A.name]) != null ? D : [], O = g(A.name);
              if (!(q.length || O.length))
                return;
              const V = `${A.name}-anchor-${bt(12)}`, de = Ve(N.value);
              Oi[V] = de, h[x] || (h[x] = { names: [], uuids: [] });
              const re = h[x];
              re.names.includes(A.name) || re.names.push(A.name), re.uuids.push(V), b.push(x), A.name = V, y = !0;
            }
          }
        }), y && (k.css = Ve(S), k.changed = !0);
      }
      f.clear(), b.forEach((k) => f.add(k));
    }
    for (const b of r) {
      let k = !1;
      const y = Bn(b.css);
      Pn(y, {
        visit: "Function",
        enter(S) {
          var E, C, D, M, N, x, A;
          const q = (E = this.rule) == null ? void 0 : E.prelude, O = this.declaration, V = O == null ? void 0 : O.property;
          if ((q == null ? void 0 : q.children.isEmpty) === !1 && Gs(S) && O && V && S.children.first && // Now we only want assignments to inset/sizing properties
          (Yi(V) || _a(V))) {
            const de = S.children.first, re = (C = jn[de.name]) != null ? C : [], Ue = g(de.name);
            if (!(re.length || Ue.length))
              return;
            const ze = `${V}-${bt(12)}`;
            if (Ue.length) {
              const Ct = /* @__PURE__ */ new Set([de.name]);
              for (; Ct.size > 0; )
                for (const Tt of Ct) {
                  const U = h[Tt];
                  if ((D = U == null ? void 0 : U.names) != null && D.length && (M = U == null ? void 0 : U.uuids) != null && M.length)
                    for (const Lt of U.names)
                      for (const Dt of U.uuids)
                        Fn[Dt] = _e(H({}, Fn[Dt]), {
                          // - `key` (`propUuid`) is the property-specific
                          //   uuid to append to the new custom property name
                          // - `value` is the new property-specific custom
                          //   property value to use
                          [ze]: `${Lt}-${ze}`
                        });
                  Ct.delete(Tt), (N = U == null ? void 0 : U.names) != null && N.length && U.names.forEach((Lt) => Ct.add(Lt));
                }
            }
            const Zr = ol(q);
            for (const Ct of [...re, ...Ue]) {
              const Tt = H({}, Ct), U = `--anchor-${bt(12)}-${V}`, Lt = Tt.uuid;
              Tt.uuid = U;
              for (const { selector: Dt } of Zr)
                o[Dt] = _e(H({}, o[Dt]), {
                  [V]: [...(A = (x = o[Dt]) == null ? void 0 : x[V]) != null ? A : [], Tt]
                });
              Fn[Lt] = _e(H({}, Fn[Lt]), {
                // - `key` (`propUuid`) is the property-specific
                //   uuid to append to the new custom property name
                // - `value` is the new property-specific custom
                //   property value to use
                [ze]: U
              });
            }
            de.name = `${de.name}-${ze}`, k = !0;
          }
        }
      }), k && (b.css = Ve(y), b.changed = !0);
    }
    if (Object.keys(Fn).length > 0)
      for (const b of r) {
        let k = !1;
        const y = Bn(b.css);
        Pn(y, {
          visit: "Function",
          enter(S) {
            var E, C, D, M;
            if (Gs(S) && (C = (E = S.children.first) == null ? void 0 : E.name) != null && C.startsWith(
              "--"
            ) && (M = (D = this.declaration) == null ? void 0 : D.property) != null && M.startsWith("--") && this.block) {
              const N = S.children.first, x = Fn[N.name];
              if (x)
                for (const [A, q] of Object.entries(x))
                  this.block.children.appendData({
                    type: "Declaration",
                    important: !1,
                    property: `${this.declaration.property}-${A}`,
                    value: {
                      type: "Raw",
                      value: Ve(this.declaration.value).replace(
                        `var(${N.name})`,
                        `var(${q})`
                      )
                    }
                  }), k = !0;
              Oi[N.name] && (this.declaration.value = {
                type: "Raw",
                value: Oi[N.name]
              }, k = !0);
            }
          }
        }), k && (b.css = Ve(y), b.changed = !0);
      }
    const m = /* @__PURE__ */ new Map();
    for (const [b, k] of Object.entries(o)) {
      let y;
      b.startsWith("[data-anchor-polyfill=") && l[b] ? y = document.querySelectorAll(l[b]) : y = document.querySelectorAll(b);
      for (const [S, E] of Object.entries(k))
        for (const C of E)
          for (const D of y) {
            const M = yield YL(D, C), N = `--anchor-${bt(12)}`;
            m.set(D, _e(H({}, (e = m.get(D)) != null ? e : {}), {
              [C.uuid]: N
            })), D.setAttribute(
              "style",
              `${C.uuid}: var(${N}); ${(t = D.getAttribute("style")) != null ? t : ""}`
            ), d[b] = _e(H({}, d[b]), {
              declarations: _e(H({}, (n = d[b]) == null ? void 0 : n.declarations), {
                [S]: [
                  ...(a = (s = (i = d[b]) == null ? void 0 : i.declarations) == null ? void 0 : s[S]) != null ? a : [],
                  _e(H({}, C), { anchorEl: M, targetEl: D, uuid: N })
                ]
              })
            });
          }
    }
    return { rules: d, inlineStyles: m, anchorScopes: $n };
  });
}
function mh(r, e, t = !1) {
  return ge(this, null, function* () {
    const n = [];
    for (const { el: i, css: s, changed: a } of r) {
      const o = { el: i, css: s, changed: !1 };
      if (a) {
        if (i.tagName.toLowerCase() === "style")
          i.innerHTML = s;
        else if (i.tagName.toLowerCase() === "link") {
          const l = new Blob([s], { type: "text/css" }), c = URL.createObjectURL(l), d = document.createElement("link");
          d.rel = "stylesheet", d.href = c;
          const f = new Promise((h) => {
            d.onload = h;
          });
          i.replaceWith(d), yield f, URL.revokeObjectURL(c), o.el = d;
        } else if (i.hasAttribute("data-has-inline-styles")) {
          const l = i.getAttribute("data-has-inline-styles");
          if (l) {
            const c = `[data-has-inline-styles="${l}"]{`;
            let d = s.slice(c.length, -1);
            const f = e == null ? void 0 : e.get(i);
            if (f)
              for (const [h, g] of Object.entries(f))
                d = `${h}: var(${g}); ${d}`;
            i.setAttribute("style", d);
          }
        }
      }
      t && i.hasAttribute("data-has-inline-styles") && i.removeAttribute("data-has-inline-styles"), n.push(o);
    }
    return n;
  });
}
const GL = _e(H({}, nt), { _c: /* @__PURE__ */ new Map() }), _g = (r) => ge(void 0, null, function* () {
  var e, t, n;
  let i = yield (e = nt.getOffsetParent) == null ? void 0 : e.call(nt, r);
  return (yield (t = nt.isElement) == null ? void 0 : t.call(nt, i)) || (i = (yield (n = nt.getDocumentElement) == null ? void 0 : n.call(nt, r)) || window.document.documentElement), i;
}), WL = (r, e) => {
  let t;
  switch (r) {
    case "start":
    case "self-start":
      t = 0;
      break;
    case "end":
    case "self-end":
      t = 100;
      break;
    default:
      typeof r == "number" && !Number.isNaN(r) && (t = r);
  }
  if (t !== void 0)
    return e ? 100 - t : t;
}, ZL = (r, e) => {
  let t;
  switch (r) {
    case "block":
    case "self-block":
      t = e ? "width" : "height";
      break;
    case "inline":
    case "self-inline":
      t = e ? "height" : "width";
      break;
  }
  return t;
}, bh = (r) => {
  switch (r) {
    case "top":
    case "bottom":
      return "y";
    case "left":
    case "right":
      return "x";
  }
  return null;
}, XL = (r) => {
  switch (r) {
    case "x":
      return "width";
    case "y":
      return "height";
  }
  return null;
}, yh = (r) => Yt(r, "display") === "inline", vh = (r, e) => (e === "x" ? ["border-left-width", "border-right-width"] : ["border-top-width", "border-bottom-width"]).reduce(
  (t, n) => t + parseInt(Yt(r, n), 10),
  0
) || 0, Bs = (r, e) => parseInt(Yt(r, `margin-${e}`), 10) || 0, QL = (r) => ({
  top: Bs(r, "top"),
  right: Bs(r, "right"),
  bottom: Bs(r, "bottom"),
  left: Bs(r, "left")
}), wh = (r) => ge(void 0, [r], function* ({
  targetEl: e,
  targetProperty: t,
  anchorRect: n,
  anchorSide: i,
  anchorSize: s,
  fallback: a
}) {
  var o;
  if (!((s || i !== void 0) && e && n))
    return a;
  if (s) {
    if (!_a(t))
      return a;
    let l;
    switch (s) {
      case "width":
      case "height":
        l = s;
        break;
      default: {
        let c = !1;
        const d = Yt(e, "writing-mode");
        c = d.startsWith("vertical-") || d.startsWith("sideways-"), l = ZL(s, c);
      }
    }
    return l ? `${n[l]}px` : a;
  }
  if (i !== void 0) {
    let l, c;
    const d = bh(t);
    if (!(Yi(t) && d && (!Yi(i) || d === bh(i))))
      return a;
    switch (i) {
      case "left":
        l = 0;
        break;
      case "right":
        l = 100;
        break;
      case "top":
        l = 0;
        break;
      case "bottom":
        l = 100;
        break;
      case "center":
        l = 50;
        break;
      default:
        if (e) {
          const g = (yield (o = nt.isRTL) == null ? void 0 : o.call(nt, e)) || !1;
          l = WL(i, g);
        }
    }
    const f = typeof l == "number" && !Number.isNaN(l), h = XL(d);
    if (f && h) {
      (t === "bottom" || t === "right") && (c = yield _g(e));
      let g = n[d] + n[h] * (l / 100);
      switch (t) {
        case "bottom": {
          if (!c)
            break;
          let m = c.clientHeight;
          if (m === 0 && yh(c)) {
            const b = vh(c, d);
            m = c.offsetHeight - b;
          }
          g = m - g;
          break;
        }
        case "right": {
          if (!c)
            break;
          let m = c.clientWidth;
          if (m === 0 && yh(c)) {
            const b = vh(c, d);
            m = c.offsetWidth - b;
          }
          g = m - g;
          break;
        }
      }
      return `${g}px`;
    }
  }
  return a;
});
function JL(r, e = !1) {
  return ge(this, null, function* () {
    const t = document.documentElement;
    for (const [n, i] of Object.entries(r))
      for (const s of i) {
        const a = s.anchorEl, o = s.targetEl;
        if (a && o)
          Gf(
            a,
            o,
            () => ge(this, null, function* () {
              const l = yield nt.getElementRects({
                reference: a,
                floating: o,
                strategy: "absolute"
              }), c = yield wh({
                targetEl: o,
                targetProperty: n,
                anchorRect: l.reference,
                anchorSide: s.anchorSide,
                anchorSize: s.anchorSize,
                fallback: s.fallbackValue
              });
              t.style.setProperty(s.uuid, c);
            }),
            { animationFrame: e }
          );
        else {
          const l = yield wh({
            targetProperty: n,
            anchorSide: s.anchorSide,
            anchorSize: s.anchorSize,
            fallback: s.fallbackValue
          });
          t.style.setProperty(s.uuid, l);
        }
      }
  });
}
function eD(r, e, t = !1) {
  return ge(this, null, function* () {
    if (!e.length)
      return;
    const n = document.querySelectorAll(r);
    for (const i of n) {
      let s = !1;
      const a = yield _g(i);
      Gf(
        i,
        i,
        () => ge(this, null, function* () {
          if (!s) {
            s = !0;
            for (const [o, { uuid: l }] of e.entries()) {
              if (i.setAttribute("data-anchor-polyfill", l), o === e.length - 1) {
                s = !1;
                break;
              }
              const c = yield nt.getElementRects({
                reference: i,
                floating: i,
                strategy: "absolute"
              }), d = yield ok(
                {
                  x: i.offsetLeft,
                  y: i.offsetTop,
                  platform: GL,
                  rects: c,
                  elements: { floating: i },
                  strategy: "absolute"
                },
                {
                  boundary: a,
                  rootBoundary: "document",
                  padding: QL(i)
                }
              );
              if (Object.values(d).every((f) => f <= 0)) {
                s = !1;
                break;
              }
            }
          }
        }),
        { animationFrame: t }
      );
    }
  });
}
function tD(r, e = !1) {
  return ge(this, null, function* () {
    var t, n;
    for (const i of Object.values(r))
      yield JL((t = i.declarations) != null ? t : {}, e);
    for (const [i, s] of Object.entries(r))
      yield eD(
        i,
        (n = s.fallbacks) != null ? n : [],
        e
      );
  });
}
function nD(r) {
  return ge(this, null, function* () {
    const e = !!window.UPDATE_ANCHOR_ON_ANIMATION_FRAME;
    let t = yield SL();
    (yield hL(t)) && (t = yield mh(t));
    const { rules: n, inlineStyles: i } = yield KL(t);
    return Object.values(n).length && (yield mh(t, i, !0), yield tD(n, e)), n;
  });
}
function kh() {
  console.log("[Keys UI] Starting initialization..."), "anchorName" in document.documentElement.style || nD(), _l.initialize(), Jl.getInstance().init(), ec.getInstance().init(), Ac.getInstance().init(), Ec.getInstance().init(), Ff.getInstance().init(), _f.getInstance().init(), Cc.getInstance().init(), Tc.getInstance().init(), qf.getInstance().init(), Lc.getInstance().init(), Pr.getInstance().init(), Dc.getInstance().init(), Ic.getInstance().init(), Br.getInstance().init(), Oc.getInstance().init(), Fr.getInstance().init(), $r.getInstance().init(), jr.getInstance().init(), Rf.getInstance().init(), console.log("[Keys UI] Initializing LightboxActions..."), Mc.getInstance().init(), zf.getInstance().init(), Nc.getInstance().init(), qw.getInstance().init(), Pf.getInstance().init(), Bf.getInstance().init(), console.log("[Keys UI] Initialization complete!");
}
const rD = {
  FormActions: Jl.getInstance(),
  TextareaActions: ec.getInstance(),
  EditorActions: Ac.getInstance(),
  AlertActions: Ec.getInstance(),
  AvatarActions: _f.getInstance(),
  BadgeActions: Cc.getInstance(),
  ButtonActions: Tc.getInstance(),
  CalendarCore: qf.getInstance(),
  RadioActions: Lc.getInstance(),
  RangeActions: Pr.getInstance(),
  SelectActions: Dc.getInstance(),
  ModalActions: Ic.getInstance(),
  ToastActions: Br.getInstance(),
  DropdownActions: Oc.getInstance(),
  TableActions: Fr.getInstance(),
  TimePickerActions: $r.getInstance(),
  DatePickerActions: jr.getInstance(),
  ImageActions: Rf.getInstance(),
  LightboxActions: Mc.getInstance(),
  ChartActions: zf.getInstance(),
  PopoverActions: Nc.getInstance(),
  SidebarActions: Pf.getInstance(),
  CountdownActions: Bf.getInstance(),
  FileUploadActions: Ff.getInstance(),
  init: kh,
  initialize: kh
};
typeof window < "u" && (window.KeysUI = rD);
export {
  Ec as AlertActions,
  _f as AvatarActions,
  Cc as BadgeActions,
  ne as BaseActionClass,
  Tc as ButtonActions,
  qf as CalendarCore,
  zf as ChartActions,
  qw as ColorPickerActions,
  Bf as CountdownActions,
  v as DOMUtils,
  jr as DatePickerActions,
  Oc as DropdownActions,
  Ac as EditorActions,
  I as EventUtils,
  Ff as FileUploadActions,
  Jl as FormActions,
  Rf as ImageActions,
  Mc as LightboxActions,
  fr as LivewireUtils,
  Ic as ModalActions,
  Nc as PopoverActions,
  _l as RTLUtils,
  Lc as RadioActions,
  Pr as RangeActions,
  Dc as SelectActions,
  Pf as SidebarActions,
  Fr as TableActions,
  ec as TextareaActions,
  $r as TimePickerActions,
  Br as ToastActions,
  rD as default,
  kh as initializeKeysUI
};
