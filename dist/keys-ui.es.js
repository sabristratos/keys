var Rc = Object.defineProperty;
var _c = (r, t, e) => t in r ? Rc(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var I = (r, t, e) => _c(r, typeof t != "symbol" ? t + "" : t, e);
const us = class us {
  constructor() {
    this.initialized = !1, this.stateManager = /* @__PURE__ */ new Map();
  }
  /**
   * Singleton pattern implementation
   * Automatically handles instance management based on class name
   */
  static getInstance() {
    const t = this.name;
    return us.instances.has(t) || us.instances.set(t, new this()), us.instances.get(t);
  }
  /**
   * Standardized initialization flow
   * Prevents double initialization and provides lifecycle hooks
   */
  init() {
    var t, e, s;
    this.initialized || ((t = this.onBeforeInit) == null || t.call(this), this.bindEventListeners(), this.initializeElements(), (e = this.setupDynamicObserver) == null || e.call(this), (s = this.onAfterInit) == null || s.call(this), this.initialized = !0);
  }
  /**
   * Standardized cleanup and destroy
   * Handles state cleanup and provides extension point
   */
  destroy() {
    var t;
    (t = this.onDestroy) == null || t.call(this), this.stateManager.clear(), this.initialized = !1;
  }
  /**
   * State management utilities
   * Common operations used across multiple action classes
   */
  getState(t) {
    return this.stateManager.get(t);
  }
  setState(t, e) {
    this.stateManager.set(t, e);
  }
  removeState(t) {
    return this.stateManager.delete(t);
  }
  hasState(t) {
    return this.stateManager.has(t);
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
  createDynamicObserver(t) {
    const e = new MutationObserver((s) => {
      s.forEach((n) => {
        n.addedNodes.length > 0 && t(n.addedNodes);
      });
    });
    return e.observe(document.body, {
      childList: !0,
      subtree: !0
    }), e;
  }
  /**
   * Debounced resize handler utility
   * Used by positioning-aware components
   */
  createResizeHandler(t, e = 100) {
    let s = null;
    return () => {
      s && clearTimeout(s), s = setTimeout(t, e);
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
us.instances = /* @__PURE__ */ new Map();
let K = us;
class h {
  /**
   * Safely find the closest ancestor element matching selector
   */
  static findClosest(t, e) {
    return !t || !(t instanceof Element) ? null : t.closest(e) || null;
  }
  /**
   * Find closest element with data attribute
   */
  static findClosestWithData(t, e) {
    return (t == null ? void 0 : t.closest(`[data-${e}]`)) || null;
  }
  /**
   * Safely query selector within element or document
   */
  static querySelector(t, e) {
    return (e || document).querySelector(t) || null;
  }
  /**
   * Safely query all elements matching selector
   */
  static querySelectorAll(t, e) {
    const s = e || document;
    return Array.from(s.querySelectorAll(t));
  }
  /**
   * Find elements with specific data attribute
   */
  static findByDataAttribute(t, e, s) {
    const n = e ? `[data-${t}="${e}"]` : `[data-${t}]`;
    return this.querySelectorAll(n, s);
  }
  /**
   * Find single element with data attribute
   */
  static findFirstByDataAttribute(t, e, s) {
    const n = e ? `[data-${t}="${e}"]` : `[data-${t}]`;
    return this.querySelector(n, s);
  }
  /**
   * Check if element has data attribute with optional value
   */
  static hasDataAttribute(t, e, s) {
    if (!t) return !1;
    const n = t.dataset[e];
    return s !== void 0 ? n === s : n !== void 0;
  }
  /**
   * Get data attribute value safely
   */
  static getDataAttribute(t, e) {
    return t == null ? void 0 : t.dataset[e];
  }
  /**
   * Set data attribute safely
   */
  static setDataAttribute(t, e, s) {
    t && (t.dataset[e] = s);
  }
  /**
   * Remove data attribute safely
   */
  static removeDataAttribute(t, e) {
    t && delete t.dataset[e];
  }
  /**
   * Check if element is disabled (multiple ways)
   */
  static isDisabled(t) {
    return t ? t.hasAttribute("disabled") || t.dataset.disabled === "true" || t.getAttribute("aria-disabled") === "true" : !0;
  }
  /**
   * Check if element is hidden
   */
  static isHidden(t) {
    return t ? t.hidden || t.style.display === "none" || t.getAttribute("aria-hidden") === "true" || !t.offsetParent : !0;
  }
  /**
   * Find form element (input/textarea) within container
   */
  static findFormElement(t) {
    return (t == null ? void 0 : t.querySelector("input, textarea")) || null;
  }
  /**
   * Find form element associated with action button
   */
  static findFormElementForAction(t) {
    const e = this.findClosest(t, ".relative");
    return this.findFormElement(e);
  }
  /**
   * Get element by ID safely
   */
  static getElementById(t) {
    return document.getElementById(t) || null;
  }
  /**
   * Check if element matches selector
   */
  static matches(t, e) {
    var s;
    return ((s = t == null ? void 0 : t.matches) == null ? void 0 : s.call(t, e)) ?? !1;
  }
  /**
   * Find all child elements matching selector
   */
  static findChildren(t, e) {
    return t ? Array.from(t.children).filter(
      (s) => this.matches(s, e)
    ) : [];
  }
  /**
   * Get next sibling element matching selector
   */
  static getNextSibling(t, e) {
    let s = t == null ? void 0 : t.nextElementSibling;
    for (; s; ) {
      if (!e || this.matches(s, e))
        return s;
      s = s.nextElementSibling;
    }
    return null;
  }
  /**
   * Get previous sibling element matching selector
   */
  static getPreviousSibling(t, e) {
    let s = t == null ? void 0 : t.previousElementSibling;
    for (; s; ) {
      if (!e || this.matches(s, e))
        return s;
      s = s.previousElementSibling;
    }
    return null;
  }
  /**
   * Add class safely
   */
  static addClass(t, e) {
    t == null || t.classList.add(e);
  }
  /**
   * Remove class safely
   */
  static removeClass(t, e) {
    t == null || t.classList.remove(e);
  }
  /**
   * Toggle class safely
   */
  static toggleClass(t, e, s) {
    return (t == null ? void 0 : t.classList.toggle(e, s)) ?? !1;
  }
  /**
   * Check if element has class
   */
  static hasClass(t, e) {
    return (t == null ? void 0 : t.classList.contains(e)) ?? !1;
  }
  /**
   * Remove multiple classes safely
   */
  static removeClasses(t, e) {
    t && t.classList.remove(...e);
  }
  /**
   * Add multiple classes safely
   */
  static addClasses(t, e) {
    t && t.classList.add(...e);
  }
  /**
   * Set or remove attribute based on condition
   */
  static toggleAttribute(t, e, s) {
    t && (s !== void 0 ? t.setAttribute(e, s) : t.removeAttribute(e));
  }
  /**
   * Get element's computed style property
   */
  static getComputedStyle(t, e) {
    return t ? window.getComputedStyle(t).getPropertyValue(e) : "";
  }
  /**
   * Check if element is visible in viewport
   */
  static isInViewport(t) {
    if (!t) return !1;
    const e = t.getBoundingClientRect();
    return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
  /**
   * Get element's offset relative to document
   */
  static getElementOffset(t) {
    if (!t) return { top: 0, left: 0 };
    const e = t.getBoundingClientRect();
    return {
      top: e.top + window.pageYOffset,
      left: e.left + window.pageXOffset
    };
  }
  /**
   * Focus element safely with optional delay
   */
  static focus(t, e) {
    t && (e ? setTimeout(() => t.focus(), e) : t.focus());
  }
  /**
   * Scroll element into view safely
   */
  static scrollIntoView(t, e) {
    t && t.scrollIntoView(e || { block: "nearest" });
  }
  /**
   * Remove element from DOM safely
   */
  static removeElement(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  /**
   * Create element with optional classes and attributes
   */
  static createElement(t, e) {
    const s = document.createElement(t);
    return e != null && e.classes && s.classList.add(...e.classes), e != null && e.attributes && Object.entries(e.attributes).forEach(([n, i]) => {
      s.setAttribute(n, i);
    }), e != null && e.textContent && (s.textContent = e.textContent), e != null && e.innerHTML && (s.innerHTML = e.innerHTML), s;
  }
}
class x {
  /**
   * Create and dispatch custom event
   */
  static dispatchCustomEvent(t, e, s, n) {
    const i = new CustomEvent(e, {
      detail: s,
      bubbles: (n == null ? void 0 : n.bubbles) ?? !0,
      cancelable: (n == null ? void 0 : n.cancelable) ?? !0
    });
    return t.dispatchEvent(i);
  }
  /**
   * Add event listener with automatic cleanup tracking
   */
  static addEventListener(t, e, s, n) {
    return t.addEventListener(e, s, n), () => {
      t.removeEventListener(e, s, n);
    };
  }
  /**
   * Handle generic events with delegation
   */
  static handleDelegatedEvent(t, e, s, n) {
    const i = n || document, a = (o) => {
      const l = o.target;
      let c = null;
      l instanceof Element && (c = l.closest(e)), c && s(c, o);
    };
    return this.addEventListener(i, t, a);
  }
  /**
   * Handle click events with delegation
   */
  static handleDelegatedClick(t, e, s) {
    const n = s || document, i = (a) => {
      const o = a, l = o.target;
      let c = null;
      l instanceof Element && (c = l.closest(t)), c && e(c, o);
    };
    return this.addEventListener(n, "click", i);
  }
  /**
   * Handle keydown events with delegation
   */
  static handleDelegatedKeydown(t, e, s) {
    const n = s || document, i = (a) => {
      const o = a, l = o.target;
      let c = null;
      l instanceof Element && (c = l.closest(t)), c && e(c, o);
    };
    return this.addEventListener(n, "keydown", i);
  }
  /**
   * Handle specific key presses
   */
  static handleKeyPress(t, e, s) {
    return (n) => {
      t.includes(n.key) && (s != null && s.preventDefault && n.preventDefault(), s != null && s.stopPropagation && n.stopPropagation(), e(n.key, n));
    };
  }
  /**
   * Handle input events with delegation
   */
  static handleDelegatedInput(t, e, s) {
    const n = s || document, i = (a) => {
      const o = a, l = o.target;
      let c = null;
      l instanceof Element && (c = l.closest(t)), c && e(c, o);
    };
    return this.addEventListener(n, "input", i);
  }
  /**
   * Handle change events with delegation
   */
  static handleDelegatedChange(t, e, s) {
    const n = s || document, i = (a) => {
      const o = a.target;
      let l = null;
      o instanceof Element && (l = o.closest(t)), l && e(l, a);
    };
    return this.addEventListener(n, "change", i);
  }
  /**
   * Handle focus events with delegation
   */
  static handleDelegatedFocus(t, e, s) {
    const n = s || document, i = (a) => {
      const o = a, l = o.target;
      let c = null;
      l instanceof Element && (c = l.closest(t)), c && e(c, o);
    };
    return this.addEventListener(n, "focusin", i);
  }
  /**
   * Create debounced event handler
   */
  static debounce(t, e) {
    let s = null;
    return (...n) => {
      s && clearTimeout(s), s = setTimeout(() => {
        t(...n);
      }, e);
    };
  }
  /**
   * Create throttled event handler
   */
  static throttle(t, e) {
    let s = !1;
    return (...n) => {
      s || (t(...n), s = !0, setTimeout(() => {
        s = !1;
      }, e));
    };
  }
  /**
   * Handle window resize with debouncing
   */
  static handleResize(t, e = 100) {
    const s = this.debounce(t, e);
    return this.addEventListener(window, "resize", s);
  }
  /**
   * Handle click outside element
   */
  static handleClickOutside(t, e) {
    const s = (n) => {
      const i = n, a = i.target;
      t.contains(a) || e(i);
    };
    return this.addEventListener(document, "click", s);
  }
  /**
   * Handle escape key globally
   */
  static handleEscape(t) {
    const e = this.handleKeyPress(["Escape"], (s, n) => t(n));
    return this.addEventListener(document, "keydown", (s) => e(s));
  }
  /**
   * Prevent default and stop propagation helper
   */
  static preventAndStop(t) {
    t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation();
  }
  /**
   * Check if event should be handled (not disabled/hidden)
   */
  static shouldHandleEvent(t) {
    return !t.hasAttribute("disabled") && t.dataset.disabled !== "true" && t.getAttribute("aria-disabled") !== "true" && t.offsetParent !== null;
  }
  /**
   * Handle form submission with validation
   */
  static handleFormSubmission(t, e, s) {
    const n = (i) => {
      const a = i;
      if (s && !s(t)) {
        i.preventDefault();
        return;
      }
      const o = new FormData(t);
      e(o, a);
    };
    return this.addEventListener(t, "submit", n);
  }
  /**
   * Create event cleanup manager
   */
  static createCleanupManager() {
    const t = [];
    return {
      add: (e) => {
        t.push(e);
      },
      cleanup: () => {
        t.forEach((e) => e()), t.length = 0;
      }
    };
  }
  /**
   * Common keyboard navigation handler
   */
  static createNavigationHandler(t) {
    return (e) => {
      var i, a, o, l, c, d, f, p, m, b, v;
      const { key: s } = e, n = ((i = t.preventDefault) == null ? void 0 : i.includes(s)) ?? !0;
      switch (s) {
        case "ArrowUp":
          n && e.preventDefault(), (a = t.onArrowUp) == null || a.call(t);
          break;
        case "ArrowDown":
          n && e.preventDefault(), (o = t.onArrowDown) == null || o.call(t);
          break;
        case "ArrowLeft":
          n && e.preventDefault(), (l = t.onArrowLeft) == null || l.call(t);
          break;
        case "ArrowRight":
          n && e.preventDefault(), (c = t.onArrowRight) == null || c.call(t);
          break;
        case "Enter":
          n && e.preventDefault(), (d = t.onEnter) == null || d.call(t);
          break;
        case " ":
          n && e.preventDefault(), (f = t.onSpace) == null || f.call(t);
          break;
        case "Escape":
          n && e.preventDefault(), (p = t.onEscape) == null || p.call(t);
          break;
        case "Home":
          n && e.preventDefault(), (m = t.onHome) == null || m.call(t);
          break;
        case "End":
          n && e.preventDefault(), (b = t.onEnd) == null || b.call(t);
          break;
        case "Tab":
          (v = t.onTab) == null || v.call(t);
          break;
      }
    };
  }
}
function Xa(r, t = "") {
  const e = window.KeysUITranslations;
  if (!e)
    return t;
  const s = r.split(".");
  let n = e;
  for (const i of s)
    if (n = n == null ? void 0 : n[i], n === void 0)
      return t;
  return n || t;
}
class la extends K {
  /**
   * Initialize form elements - required by BaseActionClass
   */
  initializeElements() {
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick(".input-action", (t, e) => {
      e.preventDefault(), this.handleActionClick(t);
    }), x.handleDelegatedKeydown(".input-action", (t, e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.handleActionClick(t));
    });
  }
  /**
   * Handle action button click
   */
  async handleActionClick(t) {
    const e = h.findClosest(t, ".input-action"), s = e == null ? void 0 : e.dataset.action;
    if (!s) return;
    const n = h.findFormElementForAction(t);
    if (n) {
      switch (s) {
        case "clear":
          this.clearValue(n);
          break;
        case "copy":
          await this.copyToClipboard(n, e);
          break;
        case "toggle-password":
          await this.togglePasswordVisibility(n, t, e);
          break;
        case "external":
          this.openExternalUrl(t.dataset.url);
          break;
        default:
          this.handleCustomAction(n, s);
          break;
      }
      this.dispatchActionEvent(n, s);
    }
  }
  /**
   * Swap the icon using CSS classes and data attributes
   */
  async swapButtonIcon(t, e) {
    t.setAttribute("data-current-icon", e), this.updateButtonIconState(t, e);
  }
  /**
   * Update button icon state using Tailwind classes
   */
  updateButtonIconState(t, e) {
    const s = h.querySelector(".button-icon-default", t), n = h.querySelector(".button-icon-toggle", t), i = h.querySelector(".button-icon-success", t), a = t.dataset.iconDefault, o = t.dataset.iconToggle, l = t.dataset.iconSuccess;
    s && (s.classList.remove("opacity-100"), s.classList.add("opacity-0")), n && (n.classList.remove("opacity-100", "scale-110", "scale-90"), n.classList.add("opacity-0")), i && (i.classList.remove("opacity-100", "scale-110", "scale-90"), i.classList.add("opacity-0")), e === a && s ? (s.classList.remove("opacity-0"), s.classList.add("opacity-100")) : e === o && n ? (n.classList.remove("opacity-0"), n.classList.add("opacity-100")) : e === l && i && (i.classList.remove("opacity-0"), i.classList.add("opacity-100", "scale-110"));
  }
  /**
   * Animate icon success feedback using Tailwind classes
   */
  animateIconSuccess(t) {
    t.classList.add("scale-110"), setTimeout(() => {
      t.classList.remove("scale-110"), t.classList.add("scale-90"), setTimeout(() => {
        t.classList.remove("scale-90");
      }, 150);
    }, 150);
  }
  /**
   * Clear form element value
   */
  clearValue(t) {
    t.value = "", t.focus(), t.dispatchEvent(new Event("input", { bubbles: !0 })), t.dispatchEvent(new Event("change", { bubbles: !0 }));
  }
  /**
   * Copy form element value to clipboard
   */
  async copyToClipboard(t, e) {
    const s = h.querySelector("button", e);
    try {
      await navigator.clipboard.writeText(t.value), this.showFeedback(t, Xa("feedback.copied_clipboard", "Copied to clipboard"), "success"), s && await this.showCopySuccess(s, e);
    } catch {
      this.fallbackCopyToClipboard(t, e);
    }
  }
  /**
   * Fallback copy method for older browsers
   */
  fallbackCopyToClipboard(t, e) {
    const s = h.querySelector("button", e);
    t.select(), t instanceof HTMLInputElement && t.setSelectionRange(0, 99999);
    try {
      document.execCommand("copy"), this.showFeedback(t, Xa("feedback.copied_clipboard", "Copied to clipboard"), "success"), s && this.showCopySuccess(s, e);
    } catch {
      this.showFeedback(t, "Copy failed", "error");
    }
  }
  /**
   * Show copy success visual feedback
   */
  async showCopySuccess(t, e) {
    const s = t.dataset.iconSuccess, n = t.dataset.labelSuccess, i = t.dataset.iconDefault, a = h.querySelector(".sr-only", t);
    if (s && i)
      if (await this.swapButtonIcon(t, s), n && a) {
        const o = a.textContent;
        a.textContent = n, setTimeout(async () => {
          await this.swapButtonIcon(t, i), o && a && (a.textContent = o);
        }, 2e3);
      } else
        setTimeout(async () => {
          await this.swapButtonIcon(t, i);
        }, 2e3);
  }
  /**
   * Toggle password visibility
   */
  async togglePasswordVisibility(t, e, s) {
    var f;
    const n = t.type === "password", i = n ? "text" : "password", a = e.dataset.iconDefault, o = e.dataset.iconToggle, l = (f = h.querySelector(".sr-only", e)) == null ? void 0 : f.textContent, c = e.dataset.labelToggle;
    t.type = i;
    const d = h.querySelector(".sr-only", e);
    n ? (o && await this.swapButtonIcon(e, o), c && d && (d.textContent = c), e.setAttribute("aria-label", c || "Hide password")) : (a && await this.swapButtonIcon(e, a), l && d && (d.textContent = l), e.setAttribute("aria-label", l || "Show password"));
  }
  /**
   * Open external URL in new tab
   */
  openExternalUrl(t) {
    if (t)
      try {
        window.open(t, "_blank", "noopener,noreferrer");
      } catch (e) {
        console.error("Failed to open external URL:", e);
      }
  }
  /**
   * Handle custom actions
   */
  handleCustomAction(t, e) {
  }
  /**
   * Dispatch custom event for action
   */
  dispatchActionEvent(t, e) {
    x.dispatchCustomEvent(t, "form-action", {
      element: t,
      action: e,
      value: t.value
    });
  }
  /**
   * Show temporary feedback message
   */
  showFeedback(t, e, s = "success") {
    const n = document.createElement("div");
    n.className = `absolute top-full left-0 mt-1 px-2 py-1 text-xs rounded shadow-lg z-10 pointer-events-none ${s === "success" ? "bg-success text-foreground-success" : "bg-danger text-foreground-danger"}`, n.textContent = e;
    const i = h.findClosest(t, ".relative");
    i && (i.appendChild(n), setTimeout(() => {
      n.parentNode && n.parentNode.removeChild(n);
    }, 2e3));
  }
  /**
   * Add a custom action handler with automatic cleanup
   */
  addActionHandler(t, e) {
    return x.addEventListener(document, "form-action", (s) => {
      const n = s;
      n.detail.action === t && e(n.detail.element);
    });
  }
  /**
   * Clean up FormActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
la.getInstance();
const fi = class fi {
  /**
   * Check if user prefers reduced motion
   */
  static prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  /**
   * Fade in animation with optional scale transform
   */
  static fadeIn(t, e = {}) {
    var f;
    if (this.prefersReducedMotion())
      return t.style.opacity = "1", e.scale && (t.style.transform = "scale(1)"), (f = e.onComplete) == null || f.call(e), null;
    const {
      duration: s = 300,
      easing: n = "ease-out",
      delay: i = 0,
      fill: a = "forwards",
      scale: o = !1,
      onComplete: l
    } = e, c = o ? [
      { opacity: "0", transform: "scale(0.95)" },
      { opacity: "1", transform: "scale(1)" }
    ] : [
      { opacity: "0" },
      { opacity: "1" }
    ], d = t.animate(c, {
      duration: s,
      easing: n,
      delay: i,
      fill: a
    });
    return l && d.addEventListener("finish", l, { once: !0 }), d;
  }
  /**
   * Fade out animation with optional scale transform
   */
  static fadeOut(t, e = {}) {
    var f;
    if (this.prefersReducedMotion())
      return t.style.opacity = "0", e.scale && (t.style.transform = "scale(0.95)"), (f = e.onComplete) == null || f.call(e), null;
    const {
      duration: s = 300,
      easing: n = "ease-in",
      delay: i = 0,
      fill: a = "forwards",
      scale: o = !1,
      onComplete: l
    } = e, c = o ? [
      { opacity: "1", transform: "scale(1)" },
      { opacity: "0", transform: "scale(0.95)" }
    ] : [
      { opacity: "1" },
      { opacity: "0" }
    ], d = t.animate(c, {
      duration: s,
      easing: n,
      delay: i,
      fill: a
    });
    return l && d.addEventListener("finish", l, { once: !0 }), d;
  }
  /**
   * Expand height animation (for accordions, dropdowns, etc.)
   */
  static expandHeight(t, e = {}) {
    var f;
    if (this.prefersReducedMotion())
      return t.style.height = e.toHeight === "auto" ? "" : `${e.toHeight}px`, (f = e.onComplete) == null || f.call(e), null;
    const {
      duration: s = 300,
      easing: n = "ease-out",
      fromHeight: i = 0,
      toHeight: a = "auto",
      onComplete: o
    } = e, l = i === "auto" ? t.offsetHeight : i;
    let c;
    if (a === "auto") {
      const p = t.style.height;
      t.style.height = "auto", c = t.offsetHeight, t.style.height = p;
    } else
      c = a;
    t.style.height = `${l}px`, t.style.overflow = "hidden";
    const d = t.animate([
      { height: `${l}px` },
      { height: `${c}px` }
    ], {
      duration: s,
      easing: n,
      fill: "forwards"
    });
    return d.addEventListener("finish", () => {
      a === "auto" && (t.style.height = ""), t.style.overflow = "", o == null || o();
    }, { once: !0 }), d;
  }
  /**
   * Collapse height animation
   */
  static collapseHeight(t, e = {}) {
    var c;
    if (this.prefersReducedMotion())
      return t.style.height = `${e.toHeight || 0}px`, (c = e.onComplete) == null || c.call(e), null;
    const {
      duration: s = 300,
      easing: n = "ease-out",
      toHeight: i = 0,
      onComplete: a
    } = e, o = t.offsetHeight;
    t.style.height = `${o}px`, t.style.overflow = "hidden";
    const l = t.animate([
      { height: `${o}px` },
      { height: `${i}px` }
    ], {
      duration: s,
      easing: n,
      fill: "forwards"
    });
    return l.addEventListener("finish", () => {
      i === 0 && (t.style.display = "none"), t.style.overflow = "", a == null || a();
    }, { once: !0 }), l;
  }
  /**
   * Slide in animation (for panels, tooltips, etc.)
   */
  static slideIn(t, e, s = {}) {
    var d;
    if (this.prefersReducedMotion())
      return t.style.transform = "translate(0, 0)", t.style.opacity = "1", (d = s.onComplete) == null || d.call(s), null;
    const {
      duration: n = 200,
      easing: i = "ease-out",
      distance: a = 10,
      onComplete: o
    } = s, l = {
      up: `translateY(${a}px)`,
      down: `translateY(-${a}px)`,
      left: `translateX(${a}px)`,
      right: `translateX(-${a}px)`
    }, c = t.animate([
      {
        transform: l[e],
        opacity: "0"
      },
      {
        transform: "translate(0, 0)",
        opacity: "1"
      }
    ], {
      duration: n,
      easing: i,
      fill: "forwards"
    });
    return o && c.addEventListener("finish", o, { once: !0 }), c;
  }
  /**
   * Slide out animation
   */
  static slideOut(t, e, s = {}) {
    var d;
    if (this.prefersReducedMotion())
      return t.style.opacity = "0", (d = s.onComplete) == null || d.call(s), null;
    const {
      duration: n = 200,
      easing: i = "ease-in",
      distance: a = 10,
      onComplete: o
    } = s, l = {
      up: `translateY(-${a}px)`,
      down: `translateY(${a}px)`,
      left: `translateX(-${a}px)`,
      right: `translateX(${a}px)`
    }, c = t.animate([
      {
        transform: "translate(0, 0)",
        opacity: "1"
      },
      {
        transform: l[e],
        opacity: "0"
      }
    ], {
      duration: n,
      easing: i,
      fill: "forwards"
    });
    return o && c.addEventListener("finish", o, { once: !0 }), c;
  }
  /**
   * Cancel an animation if it exists
   */
  static cancelAnimation(t) {
    t && t.playState !== "finished" && t.cancel();
  }
  /**
   * Wait for an animation to complete
   */
  static async waitForAnimation(t) {
    if (t)
      return new Promise((e) => {
        t.playState === "finished" ? e() : t.addEventListener("finish", () => e(), { once: !0 });
      });
  }
  /**
   * Animate with automatic cleanup
   */
  static animateWithCleanup(t, e, s = {}) {
    var o;
    if (this.prefersReducedMotion())
      return (o = s.cleanup) == null || o.call(s), null;
    const { cleanup: n, ...i } = s, a = t.animate(e, i);
    return a.addEventListener("finish", () => {
      n == null || n();
    }, { once: !0 }), a.addEventListener("cancel", () => {
      n == null || n();
    }, { once: !0 }), a;
  }
  /**
   * Create a managed timer that can be paused/resumed
   */
  static createTimer(t, e) {
    const s = ++this.timerCounter, n = {
      id: s,
      callback: t,
      delay: e,
      startTime: Date.now(),
      paused: !1
    }, i = window.setTimeout(() => {
      this.timers.delete(s), t();
    }, e);
    return n.id = i, this.timers.set(s, n), s;
  }
  /**
   * Clear a timer
   */
  static clearTimer(t) {
    const e = this.timers.get(t);
    e && (clearTimeout(e.id), this.timers.delete(t));
  }
  /**
   * Pause a timer
   */
  static pauseTimer(t) {
    const e = this.timers.get(t);
    if (e && !e.paused) {
      clearTimeout(e.id);
      const s = Date.now() - e.startTime;
      e.remaining = Math.max(0, e.delay - s), e.paused = !0;
    }
  }
  /**
   * Resume a paused timer
   */
  static resumeTimer(t) {
    const e = this.timers.get(t);
    if (e && e.paused && e.remaining !== void 0) {
      e.paused = !1, e.startTime = Date.now(), e.delay = e.remaining;
      const s = window.setTimeout(() => {
        this.timers.delete(t), e.callback();
      }, e.remaining);
      e.id = s;
    }
  }
  /**
   * Clear all timers (useful for cleanup)
   */
  static clearAllTimers() {
    this.timers.forEach((t) => {
      clearTimeout(t.id);
    }), this.timers.clear();
  }
  /**
   * Apply transition classes for CSS-based animations
   */
  static applyTransitionClasses(t, e, s, n = 300) {
    t.classList.add(e), t.offsetHeight, t.classList.add(s), setTimeout(() => {
      t.classList.remove(e);
    }, n);
  }
};
fi.timers = /* @__PURE__ */ new Map(), fi.timerCounter = 0;
let B = fi;
typeof window < "u" && (window.AnimationUtils = B);
class ca extends K {
  /**
   * Initialize alert elements - required by BaseActionClass
   */
  initializeElements() {
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("[data-dismiss-alert]", (t, e) => {
      e.preventDefault(), this.handleDismissClick(t);
    }), x.handleDelegatedKeydown("[data-dismiss-alert]", (t, e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.handleDismissClick(t));
    });
  }
  /**
   * Handle dismiss button click
   */
  handleDismissClick(t) {
    const e = this.findAlertForButton(t);
    e && (this.dismissAlert(e), this.dispatchAlertEvent(e, "dismiss"));
  }
  /**
   * Find the alert element associated with a dismiss button
   */
  findAlertForButton(t) {
    return h.findClosest(t, '[data-dismissible="true"]');
  }
  /**
   * Dismiss an alert with smooth animation
   */
  dismissAlert(t) {
    t.classList.add("alert-dismissing"), B.slideOut(t, "right", {
      duration: 300,
      easing: "ease-out",
      distance: 100
    }), B.collapseHeight(t, {
      toHeight: 0,
      duration: 300,
      easing: "ease-out",
      onComplete: () => {
        t.parentNode && t.parentNode.removeChild(t);
      }
    });
  }
  /**
   * Show an alert programmatically
   */
  showAlert(t) {
    t.style.display = "block", B.slideIn(t, "right", {
      duration: 300,
      easing: "ease-out",
      distance: 100,
      onComplete: () => {
        this.dispatchAlertEvent(t, "show");
      }
    });
  }
  /**
   * Create and show a new alert dynamically
   */
  createAlert(t) {
    const {
      variant: e = "info",
      title: s,
      message: n,
      dismissible: i = !0,
      duration: a,
      container: o = document.body
    } = t, l = document.createElement("div");
    l.className = this.getAlertClasses(e), l.setAttribute("role", "alert"), i && l.setAttribute("data-dismissible", "true");
    const c = this.buildAlertContent(e, s, n, i);
    return l.innerHTML = c, o.appendChild(l), l.style.opacity = "0", l.style.transform = "translateX(100%)", setTimeout(() => {
      this.showAlert(l);
    }, 10), a && a > 0 && B.createTimer(() => {
      this.dismissAlert(l);
    }, a), this.dispatchAlertEvent(l, "create"), l;
  }
  /**
   * Get CSS classes for alert variant
   */
  getAlertClasses(t) {
    const e = "rounded-lg border p-4 space-y-3", s = {
      info: "bg-info/5 border-info/20 text-info-foreground",
      success: "bg-success/5 border-success/20 text-success-foreground",
      warning: "bg-warning/5 border-warning/20 text-warning-foreground",
      danger: "bg-danger/5 border-danger/20 text-danger-foreground",
      neutral: "bg-neutral/5 border-neutral/20 text-neutral-foreground"
    };
    return `${e} ${s[t] || s.info}`;
  }
  /**
   * Build alert content HTML
   */
  buildAlertContent(t, e, s, n) {
    const i = this.getVariantIcon(t), a = this.getVariantIconColor(t);
    return `
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="w-5 h-5 ${a}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${this.getIconSvg(i)}
                    </svg>
                </div>
                <div class="ml-3 flex-1">
                    ${e ? `<div class="text-base font-medium">${e}</div>` : ""}
                    <div class="text-sm opacity-90 ${e ? "mt-1" : ""}">${s || ""}</div>
                </div>
                ${n ? `
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
  getVariantIcon(t) {
    const e = {
      info: "information-circle",
      success: "check-circle",
      warning: "exclamation-triangle",
      danger: "x-circle",
      neutral: "chat-bubble-left-ellipsis"
    };
    return e[t] || e.info;
  }
  /**
   * Get icon color for variant
   */
  getVariantIconColor(t) {
    const e = {
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
      neutral: "text-neutral"
    };
    return e[t] || e.info;
  }
  /**
   * Get SVG path for icon
   */
  getIconSvg(t) {
    const e = {
      "information-circle": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      "check-circle": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      "exclamation-triangle": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>',
      "x-circle": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      "chat-bubble-left-ellipsis": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>'
    };
    return e[t] || e["information-circle"];
  }
  /**
   * Dispatch custom event for alert action
   */
  dispatchAlertEvent(t, e) {
    x.dispatchCustomEvent(t, "alert-action", {
      alert: t,
      action: e
    }), x.dispatchCustomEvent(document.body, "alert-action", {
      alert: t,
      action: e
    });
  }
  /**
   * Add a custom alert action handler with automatic cleanup
   */
  addActionHandler(t, e) {
    return x.addEventListener(document, "alert-action", (s) => {
      const n = s;
      n.detail.action === t && e(n.detail.alert);
    });
  }
  /**
   * Dismiss all alerts of a specific variant
   */
  dismissAllByVariant(t) {
    h.querySelectorAll(`[data-dismissible="true"][class*="${t}"]`).forEach((s) => {
      this.dismissAlert(s);
    });
  }
  /**
   * Dismiss all dismissible alerts
   */
  dismissAll() {
    h.querySelectorAll('[data-dismissible="true"]').forEach((e) => {
      this.dismissAlert(e);
    });
  }
  /**
   * Clean up AlertActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
ca.getInstance();
class ua extends K {
  /**
   * Initialize badge elements - required by BaseActionClass
   */
  initializeElements() {
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("[data-dismiss-target]", (t, e) => {
      e.preventDefault(), this.handleDismissClick(t);
    }), x.handleDelegatedKeydown("[data-dismiss-target]", (t, e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.handleDismissClick(t));
    });
  }
  /**
   * Handle dismiss button click
   */
  handleDismissClick(t) {
    const e = this.findBadgeForButton(t);
    e && (this.dismissBadge(e), this.dispatchBadgeEvent(e, "dismiss"));
  }
  /**
   * Find the badge element associated with a dismiss button
   */
  findBadgeForButton(t) {
    const e = t.getAttribute("data-dismiss-target");
    if (!e) return null;
    const s = e.startsWith("#") ? e.slice(1) : e;
    return h.querySelector(`#${s}`);
  }
  /**
   * Dismiss a badge with smooth animation
   */
  dismissBadge(t) {
    t.classList.add("badge-dismissing"), t.style.transition = "all 250ms ease-out", t.style.transform = "scale(0.8)", t.style.opacity = "0", B.createTimer(() => {
      t.parentNode && t.parentNode.removeChild(t);
    }, 250);
  }
  /**
   * Show a badge programmatically
   */
  showBadge(t) {
    t.style.display = "inline-flex", t.style.opacity = "0", t.style.transform = "scale(0.8)", setTimeout(() => {
      t.style.transition = "all 250ms ease-out", t.style.opacity = "1", t.style.transform = "scale(1)", this.dispatchBadgeEvent(t, "show");
    }, 10);
  }
  /**
   * Create and show a new badge dynamically
   */
  createBadge(t) {
    const {
      variant: e = "simple",
      color: s = "blue",
      size: n = "sm",
      text: i,
      icon: a,
      dismissible: o = !1,
      container: l = document.body
    } = t, c = document.createElement(o ? "button" : "span"), d = o ? `badge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` : void 0;
    c.className = this.getBadgeClasses(e, s, n), d && (c.id = d), o && (c.setAttribute("type", "button"), c.setAttribute("data-dismiss-target", `#${d}`), c.setAttribute("aria-label", "Remove badge"));
    const f = this.buildBadgeContent(i, a, o);
    return c.innerHTML = f, l.appendChild(c), c.style.opacity = "0", c.style.transform = "scale(0.8)", setTimeout(() => {
      this.showBadge(c);
    }, 10), this.dispatchBadgeEvent(c, "create"), c;
  }
  /**
   * Get CSS classes for badge
   */
  getBadgeClasses(t, e, s) {
    const n = "inline-flex items-center font-medium", i = {
      xs: "px-1.5 py-0.5 text-xs",
      sm: "px-2.5 py-0.5 text-xs",
      md: "px-3 py-1 text-sm"
    }, a = {
      simple: "rounded-full",
      chip: "rounded-sm",
      subtle: ""
    }, o = this.getColorClasses(t, e);
    return `${n} ${i[s] || i.sm} ${a[t] || a.simple} ${o}`;
  }
  /**
   * Get color classes for badge
   */
  getColorClasses(t, e) {
    if (t === "subtle") {
      const n = {
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
      return n[e] || n.blue;
    }
    const s = {
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
    return s[e] || s.blue;
  }
  /**
   * Build badge content HTML
   */
  buildBadgeContent(t, e, s) {
    let n = "";
    return e && (n += `<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <!-- Icon would be rendered here -->
            </svg>`), n += t, s && (n += `<svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>`), n;
  }
  /**
   * Dispatch custom event for badge action
   */
  dispatchBadgeEvent(t, e) {
    x.dispatchCustomEvent(t, "badge-action", {
      badge: t,
      action: e
    }), x.dispatchCustomEvent(document.body, "badge-action", {
      badge: t,
      action: e
    });
  }
  /**
   * Add a custom badge action handler with automatic cleanup
   */
  addActionHandler(t, e) {
    return x.addEventListener(document, "badge-action", (s) => {
      const n = s;
      n.detail.action === t && e(n.detail.badge);
    });
  }
  /**
   * Dismiss all badges of a specific color
   */
  dismissAllByColor(t) {
    h.querySelectorAll(`[data-dismissible="true"][class*="${t}"]`).forEach((s) => {
      this.dismissBadge(s);
    });
  }
  /**
   * Dismiss all dismissible badges
   */
  dismissAll() {
    h.querySelectorAll("[data-dismiss-target]").forEach((e) => {
      const s = this.findBadgeForButton(e);
      s && this.dismissBadge(s);
    });
  }
  /**
   * Clean up BadgeActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
ua.getInstance();
const gi = class gi {
  /**
   * Format Date object to string using custom format
   */
  static formatDate(t, e) {
    if (!t || isNaN(t.getTime()))
      return "";
    const s = t.getFullYear(), n = t.getMonth() + 1, i = t.getDate(), a = {
      Y: String(s),
      y: String(s).slice(-2),
      F: this.MONTH_NAMES[n - 1],
      M: this.MONTH_NAMES_SHORT[n - 1],
      m: String(n).padStart(2, "0"),
      n: String(n),
      d: String(i).padStart(2, "0"),
      j: String(i)
    };
    let o = e;
    for (const [l, c] of Object.entries(a))
      o = o.replace(new RegExp(l, "g"), c);
    return o;
  }
  /**
   * Format Date object to YYYY-MM-DD string
   */
  static formatDateString(t) {
    if (!t || isNaN(t.getTime()))
      return "";
    const e = t.getFullYear(), s = String(t.getMonth() + 1).padStart(2, "0"), n = String(t.getDate()).padStart(2, "0");
    return `${e}-${s}-${n}`;
  }
  /**
   * Parse date string to Date object
   */
  static parseDate(t) {
    if (!t || typeof t != "string" || !t.trim())
      return null;
    try {
      const e = new Date(t);
      return isNaN(e.getTime()) ? null : e;
    } catch {
      return null;
    }
  }
  /**
   * Format date for display using specified format
   */
  static formatDateForDisplay(t, e) {
    if (!t) return "";
    const s = this.parseDate(t);
    return s ? this.formatDate(s, e) : "";
  }
  /**
   * Format date range for display
   */
  static formatRangeForDisplay(t, e, s, n = " - ") {
    if (!t) return "";
    const i = this.formatDateForDisplay(t, s), a = e ? this.formatDateForDisplay(e, s) : "";
    return a ? `${i}${n}${a}` : i;
  }
  /**
   * Format date range for form submission
   */
  static formatRangeForSubmission(t, e, s = "Y-m-d") {
    if (!t) return null;
    const n = this.formatDateForSubmission(t, s), i = e ? this.formatDateForSubmission(e, s) : "";
    return i ? `${n},${i}` : n;
  }
  /**
   * Format single date for form submission
   */
  static formatDateForSubmission(t, e = "Y-m-d") {
    if (!t) return "";
    const s = this.parseDate(t);
    return s ? this.formatDate(s, e) : "";
  }
  /**
   * Add days to a date string
   */
  static addDaysToDate(t, e) {
    const s = this.parseDate(t);
    return s ? (s.setDate(s.getDate() + e), this.formatDateString(s)) : t;
  }
  /**
   * Add months to a date string
   */
  static addMonthsToDate(t, e) {
    const s = this.parseDate(t);
    return s ? (s.setMonth(s.getMonth() + e), this.formatDateString(s)) : t;
  }
  /**
   * Get first day of month for a date string
   */
  static getFirstDayOfMonth(t) {
    const e = this.parseDate(t);
    return e ? (e.setDate(1), this.formatDateString(e)) : t;
  }
  /**
   * Get last day of month for a date string
   */
  static getLastDayOfMonth(t) {
    const e = this.parseDate(t);
    return e ? (e.setMonth(e.getMonth() + 1, 0), this.formatDateString(e)) : t;
  }
  /**
   * Get current year-month string (YYYY-MM)
   */
  static getCurrentYearMonth() {
    const t = /* @__PURE__ */ new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}`;
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
  static isToday(t) {
    return t === this.getTodayDate();
  }
  /**
   * Check if a date is within a range
   */
  static isDateInRange(t, e, s) {
    if (!e || !s) return !1;
    const n = this.parseDate(t), i = this.parseDate(e), a = this.parseDate(s);
    return !n || !i || !a ? !1 : n >= i && n <= a;
  }
  /**
   * Check if a date matches start of range
   */
  static isDateRangeStart(t, e) {
    return e === t;
  }
  /**
   * Check if a date matches end of range
   */
  static isDateRangeEnd(t, e) {
    return e === t;
  }
  /**
   * Get placeholder text for date format
   */
  static getFormatPlaceholder(t) {
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
    }[t] || "YYYY-MM-DD";
  }
  /**
   * Parse input date string with multiple format support
   */
  static parseInputDate(t, e) {
    if (!t || !t.trim()) return null;
    try {
      const s = new Date(t);
      if (!isNaN(s.getTime()))
        return s;
    } catch {
    }
    return null;
  }
  /**
   * Create ARIA label for date with contextual information
   */
  static createDateAriaLabel(t, e = !1, s = !1, n = !1, i = !1, a = !1) {
    const o = this.parseDate(t);
    if (!o) return t;
    let c = o.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    return e && (c += ", Today"), s ? c += ", Selected" : n ? c += ", Range start" : i ? c += ", Range end" : a && (c += ", In selected range"), c;
  }
  /**
   * Validate date string format
   */
  static isValidDateString(t) {
    const e = this.parseDate(t);
    return e !== null && !isNaN(e.getTime());
  }
  /**
   * Compare two date strings
   */
  static compareDates(t, e) {
    const s = this.parseDate(t), n = this.parseDate(e);
    return !s || !n ? 0 : s.getTime() - n.getTime();
  }
  /**
   * Get quick selector date ranges
   */
  static getQuickSelectorDate(t) {
    const e = /* @__PURE__ */ new Date();
    let s = null, n = null;
    switch (t) {
      case "today":
        s = e, n = e;
        break;
      case "yesterday":
        s = new Date(e), s.setDate(e.getDate() - 1), n = s;
        break;
      case "last7days":
        n = e, s = new Date(e), s.setDate(e.getDate() - 6);
        break;
      case "last30days":
        n = e, s = new Date(e), s.setDate(e.getDate() - 29);
        break;
      case "thismonth":
        s = new Date(e.getFullYear(), e.getMonth(), 1), n = new Date(e.getFullYear(), e.getMonth() + 1, 0);
        break;
      case "lastmonth":
        s = new Date(e.getFullYear(), e.getMonth() - 1, 1), n = new Date(e.getFullYear(), e.getMonth(), 0);
        break;
      case "thisyear":
        s = new Date(e.getFullYear(), 0, 1), n = new Date(e.getFullYear(), 11, 31);
        break;
    }
    return { start: s, end: n };
  }
};
gi.MONTH_NAMES = [
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
], gi.MONTH_NAMES_SHORT = [
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
let mt = gi;
class ps extends K {
  /**
   * Initialize calendar elements - required by BaseActionClass
   */
  initializeElements() {
    h.findByDataAttribute("calendar", "true").forEach((t) => {
      this.initializeCalendar(t);
    });
  }
  /**
   * Initialize a single calendar element
   */
  initializeCalendar(t) {
    if (this.hasState(t))
      return;
    const e = t.dataset.calendarData, s = t.dataset.disabled === "true";
    let n;
    try {
      n = e ? JSON.parse(e) : {};
    } catch (a) {
      console.error("Failed to parse calendar data:", a), n = {};
    }
    const i = {
      currentMonth: n.currentMonth || this.getCurrentYearMonth(),
      selectedDate: n.selectedDate || null,
      startDate: n.startDate || null,
      endDate: n.endDate || null,
      focusedDate: n.selectedDate || n.startDate || this.getTodayDate(),
      isRange: n.isRange || !1,
      monthsToShow: n.monthsToShow || 1,
      rangeSelectionState: "none",
      isDisabled: s,
      minDate: n.minDate || null,
      maxDate: n.maxDate || null,
      disabledDates: n.disabledDates || [],
      weekdays: n.weekdays || ["S", "M", "T", "W", "T", "F", "S"],
      monthNames: n.monthNames || [
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
      viewMode: "calendar"
    };
    this.setState(t, i), this.renderCalendarGrid(t), this.updateMonthYearDisplay(t);
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("[data-calendar-date]", (t, e) => {
      if (!t.disabled) {
        e.preventDefault(), e.stopPropagation();
        const s = h.findClosest(t, '[data-calendar="true"]');
        s && !this.isCalendarDisabled(s) && this.selectDate(s, t.dataset.calendarDate);
      }
    }), x.handleDelegatedClick("[data-calendar-nav]", (t, e) => {
      if (!t.disabled) {
        e.preventDefault();
        const s = h.findClosest(t, '[data-calendar="true"]'), n = t.dataset.calendarNav;
        s && !this.isCalendarDisabled(s) && this.navigateMonth(s, n);
      }
    }), x.handleDelegatedClick("[data-calendar-action]", (t, e) => {
      if (!t.disabled) {
        e.preventDefault();
        const s = h.findClosest(t, '[data-calendar="true"]'), n = t.dataset.calendarAction;
        s && !this.isCalendarDisabled(s) && this.handleFooterAction(s, n);
      }
    }), x.handleDelegatedClick("[data-calendar-month-year-btn]", (t, e) => {
      if (!t.disabled) {
        e.preventDefault();
        const s = h.findClosest(t, '[data-calendar="true"]');
        s && !this.isCalendarDisabled(s) && this.toggleMonthYearDropdown(s);
      }
    }), x.handleDelegatedClick("[data-calendar-month]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-calendar="true"]'), n = parseInt(t.dataset.calendarMonth);
      s && !this.isCalendarDisabled(s) && this.selectMonth(s, n);
    }), x.handleDelegatedClick("[data-calendar-year]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-calendar="true"]'), n = parseInt(t.dataset.calendarYear);
      s && !this.isCalendarDisabled(s) && this.selectYear(s, n);
    }), x.handleDelegatedKeydown('[data-calendar="true"]', (t, e) => {
      if (e.key === "Escape") {
        const s = this.getState(t);
        if (s && s.viewMode !== "calendar") {
          e.preventDefault(), s.viewMode = "calendar", this.setState(t, s), this.renderCalendarGrid(t);
          const n = h.querySelector("[data-calendar-month-year-btn]", t);
          n && n.focus();
          return;
        }
      }
      this.handleKeydown(t, e);
    }), x.handleDelegatedFocus("[data-calendar-date]", (t) => {
      const e = h.findClosest(t, '[data-calendar="true"]');
      if (e) {
        const s = this.getState(e);
        s && (s.focusedDate = t.dataset.calendarDate, this.setState(e, s));
      }
    });
  }
  /**
   * Setup dynamic observer for new calendars - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.hasDataAttribute(s, "calendar", "true") && this.initializeCalendar(s), h.findByDataAttribute("calendar", "true", s).forEach((n) => {
            this.initializeCalendar(n);
          });
        }
      });
    });
  }
  /**
   * Select a date (handles both single date and range selection)
   */
  selectDate(t, e) {
    const s = this.getState(t);
    !s || s.isDisabled || (s.isRange ? this.handleRangeSelection(t, e) : (s.selectedDate = e, s.focusedDate = e, this.setState(t, s), this.renderCalendarGrid(t), this.updateHiddenInput(t), this.dispatchCalendarEvent(t, "calendar:dateSelected", {
      selectedDate: e,
      formattedDate: this.formatDateForDisplay(e)
    })));
  }
  /**
   * Handle range selection logic
   */
  handleRangeSelection(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const n = new Date(e);
    if (s.rangeSelectionState === "none" || s.rangeSelectionState === "selecting-start")
      s.startDate = e, s.endDate = null, s.rangeSelectionState = "selecting-end", s.focusedDate = e;
    else if (s.rangeSelectionState === "selecting-end") {
      const i = new Date(s.startDate);
      n < i ? (s.endDate = s.startDate, s.startDate = e) : s.endDate = e, s.rangeSelectionState = "none", s.focusedDate = e;
    }
    this.setState(t, s), this.renderCalendarGrid(t), this.updateHiddenInput(t), this.dispatchCalendarEvent(t, "calendar:rangeSelected", {
      startDate: s.startDate,
      endDate: s.endDate,
      formattedRange: this.formatRangeForDisplay(s.startDate, s.endDate)
    });
  }
  /**
   * Format range for display
   */
  formatRangeForDisplay(t, e) {
    return !t && !e ? "" : t && !e ? this.formatDateForDisplay(t) : !t && e ? this.formatDateForDisplay(e) : `${this.formatDateForDisplay(t)} - ${this.formatDateForDisplay(e)}`;
  }
  /**
   * Check if a date is in range
   */
  isDateInRange(t, e, s) {
    if (!e || !s) return !1;
    const n = new Date(t), i = new Date(e), a = new Date(s);
    return n >= i && n <= a;
  }
  /**
   * Check if a date is range start
   */
  isDateRangeStart(t, e) {
    return e === t;
  }
  /**
   * Check if a date is range end
   */
  isDateRangeEnd(t, e) {
    return e === t;
  }
  /**
   * Navigate to previous or next month
   */
  navigateMonth(t, e) {
    const s = this.getState(t);
    if (!s || s.isDisabled) return;
    const [n, i] = s.currentMonth.split("-").map(Number), a = new Date(n, i - 1, 1);
    e === "prev" ? a.setMonth(a.getMonth() - 1) : a.setMonth(a.getMonth() + 1);
    const o = `${a.getFullYear()}-${String(a.getMonth() + 1).padStart(2, "0")}`;
    s.currentMonth = o, this.setState(t, s), this.renderCalendarGrid(t), this.updateMonthYearDisplay(t), this.dispatchCalendarEvent(t, "calendar:monthChanged", {
      currentMonth: o,
      year: a.getFullYear(),
      month: a.getMonth() + 1
    });
  }
  /**
   * Handle keyboard navigation
   */
  handleKeydown(t, e) {
    const s = this.getState(t);
    if (!s || s.isDisabled) return;
    const n = s.focusedDate;
    if (!n) return;
    let i = null;
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault(), i = this.addDaysToDate(n, -1);
        break;
      case "ArrowRight":
        e.preventDefault(), i = this.addDaysToDate(n, 1);
        break;
      case "ArrowUp":
        e.preventDefault(), i = this.addDaysToDate(n, -7);
        break;
      case "ArrowDown":
        e.preventDefault(), i = this.addDaysToDate(n, 7);
        break;
      case "Enter":
      case " ":
        e.preventDefault(), this.selectDate(t, n);
        return;
      case "Home":
        e.preventDefault(), i = this.getFirstDayOfMonth(n);
        break;
      case "End":
        e.preventDefault(), i = this.getLastDayOfMonth(n);
        break;
      case "PageUp":
        e.preventDefault(), i = this.addMonthsToDate(n, e.shiftKey ? -12 : -1);
        break;
      case "PageDown":
        e.preventDefault(), i = this.addMonthsToDate(n, e.shiftKey ? 12 : 1);
        break;
    }
    i && this.focusDate(t, i);
  }
  /**
   * Generate calendar grid for a given month
   */
  generateCalendarGrid(t) {
    const e = this.getState(t);
    if (!e) return [];
    const [s, n] = e.currentMonth.split("-").map(Number), i = new Date(s, n - 1, 1), a = new Date(s, n, 0), o = new Date(i);
    o.setDate(o.getDate() - o.getDay());
    const l = new Date(a);
    l.setDate(l.getDate() + (6 - l.getDay()));
    const c = [], d = new Date(o);
    for (; d <= l; ) {
      const p = this.formatDateString(d), m = d.getMonth() === n - 1 && d.getFullYear() === s, b = {
        date: p,
        day: d.getDate(),
        isCurrentMonth: m,
        isToday: this.isToday(p),
        isSelected: p === e.selectedDate,
        isDisabled: this.isDateDisabled(t, d)
      };
      e.isRange && (b.isInRange = this.isDateInRange(p, e.startDate, e.endDate), b.isRangeStart = this.isDateRangeStart(p, e.startDate), b.isRangeEnd = this.isDateRangeEnd(p, e.endDate), b.isSelected = b.isRangeStart || b.isRangeEnd), c.push(b), d.setDate(d.getDate() + 1);
    }
    const f = [];
    for (let p = 0; p < c.length; p += 7)
      f.push(c.slice(p, p + 7));
    return f;
  }
  /**
   * Check if a date is disabled
   */
  isDateDisabled(t, e) {
    const s = this.getState(t);
    if (!s || s.isDisabled) return !0;
    const n = this.formatDateString(e);
    return s.minDate && n < s.minDate || s.maxDate && n > s.maxDate ? !0 : s.disabledDates.includes(n);
  }
  /**
   * Render calendar grid to DOM (supports multiple months)
   */
  renderCalendarGrid(t) {
    const e = this.getState(t);
    e && (e.monthsToShow > 1 ? this.renderMultipleMonths(t) : this.renderSingleMonth(t));
  }
  /**
   * Render single month view
   */
  renderSingleMonth(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = h.querySelector("[data-calendar-grid-container]", t);
    if (!s) return;
    const n = this.generateCalendarGrid(t);
    let i = '<table class="w-full" role="grid" aria-label="Calendar">';
    i += '<thead><tr role="row">', e.weekdays.forEach((a) => {
      const l = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][e.weekdays.indexOf(a)];
      i += `<th class="calendar-weekday text-center text-muted font-medium p-1" role="columnheader" aria-label="${l}">${a}</th>`;
    }), i += "</tr></thead>", i += "<tbody>", n.forEach((a) => {
      i += '<tr role="row">', a.forEach((o) => {
        const l = this.getDayButtonClasses(o), c = mt.createDateAriaLabel(o.date, o.isToday, o.isSelected, o.isRangeStart, o.isRangeEnd, o.isInRange), d = this.getRangeAttributes(o, e);
        i += `
                    <td class="calendar-day text-center relative" role="gridcell">
                        <button type="button"
                                class="${l}"
                                data-calendar-date="${o.date}"
                                data-is-current-month="${o.isCurrentMonth}"
                                ${o.isDisabled ? "disabled" : ""}
                                aria-selected="${o.isSelected}"
                                aria-label="${c}"
                                data-is-today="${o.isToday}"
                                ${d}>
                            ${o.day}
                        </button>
                    </td>
                `;
      }), i += "</tr>";
    }), i += "</tbody></table>", s.innerHTML = i;
  }
  /**
   * Get cell classes based on calendar size
   */
  getCellClasses(t) {
    return "";
  }
  /**
   * Get button classes for a day
   */
  getDayButtonClasses(t) {
    let e = "flex items-center justify-center rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1";
    return t.isCurrentMonth ? t.isDisabled ? e += " text-neutral-400 dark:text-neutral-600 cursor-not-allowed opacity-50" : t.isSelected ? t.isInRange || t.isRangeStart || t.isRangeEnd ? e += " font-semibold" : e += " bg-brand text-foreground-brand font-semibold" : t.isToday ? e += " bg-brand/10 text-brand font-semibold border border-brand/20" : t.isInRange ? e += " text-foreground" : e += " text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800" : e += " text-neutral-400 dark:text-neutral-600", e;
  }
  /**
   * Update month/year display
   */
  updateMonthYearDisplay(t) {
    const e = this.getState(t);
    if (!e) return;
    const [s, n] = e.currentMonth.split("-").map(Number), a = `${e.monthNames[n - 1]} ${s}`, o = h.querySelector(".calendar-month-year-display", t);
    o && (o.textContent = a);
  }
  /**
   * Toggle between calendar, month, and year views
   */
  toggleMonthYearDropdown(t) {
    const e = this.getState(t);
    if (e) {
      switch (e.viewMode) {
        case "calendar":
          e.viewMode = "month", this.renderMonthGrid(t);
          break;
        case "month":
          e.viewMode = "year", this.renderYearGrid(t);
          break;
        case "year":
          e.viewMode = "calendar", this.renderCalendarGrid(t);
          break;
      }
      this.setState(t, e);
    }
  }
  /**
   * Render month selection grid
   */
  renderMonthGrid(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = h.querySelector("[data-calendar-grid-container]", t);
    if (!s) return;
    const [n, i] = e.currentMonth.split("-").map(Number);
    let a = '<div class="month-grid grid grid-cols-3 gap-1 p-2">';
    e.monthNames.forEach((o, l) => {
      const c = l + 1, d = c === i, f = this.isMonthDisabled(t, n, c);
      a += `
                <button type="button"
                        class="month-option px-2 py-1.5 text-sm font-medium rounded-lg transition-colors border focus:outline-none focus:ring-2 focus:ring-brand ${d ? "bg-brand text-foreground-brand border-brand" : "bg-surface text-foreground border-border"} ${f ? "opacity-50 cursor-not-allowed" : ""}"
                        data-calendar-month="${c}"
                        ${f ? "disabled" : ""}>
                    ${o}
                </button>
            `;
    }), a += "</div>", this.animateViewTransition(s, a);
  }
  /**
   * Render year selection grid
   */
  renderYearGrid(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = h.querySelector("[data-calendar-grid-container]", t);
    if (!s) return;
    const [n] = e.currentMonth.split("-").map(Number), i = n - 10, a = n + 10;
    let o = '<div class="year-grid grid grid-cols-4 gap-1 p-2 max-h-64 overflow-y-auto">';
    for (let l = i; l <= a; l++) {
      const c = l === n, d = this.isYearDisabled(t, l);
      o += `
                <button type="button"
                        class="year-option px-2 py-1.5 text-sm font-medium rounded-lg transition-colors border focus:outline-none focus:ring-2 focus:ring-brand ${c ? "bg-brand text-foreground-brand border-brand" : "bg-surface text-foreground border-border"} ${d ? "opacity-50 cursor-not-allowed" : ""}"
                        data-calendar-year="${l}"
                        ${d ? "disabled" : ""}>
                    ${l}
                </button>
            `;
    }
    o += "</div>", s.innerHTML = o;
  }
  /**
   * Select a month
   */
  selectMonth(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const [n] = s.currentMonth.split("-").map(Number), i = `${n}-${String(e).padStart(2, "0")}`;
    s.currentMonth = i, s.viewMode = "calendar", this.setState(t, s), this.renderCalendarGrid(t), this.updateMonthYearDisplay(t), this.dispatchCalendarEvent(t, "calendar:monthChanged", {
      currentMonth: i,
      year: n,
      month: e
    });
  }
  /**
   * Select a year
   */
  selectYear(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const [, n] = s.currentMonth.split("-").map(Number), i = `${e}-${String(n).padStart(2, "0")}`;
    s.currentMonth = i, s.viewMode = "calendar", this.setState(t, s), this.renderCalendarGrid(t), this.updateMonthYearDisplay(t), this.dispatchCalendarEvent(t, "calendar:monthChanged", {
      currentMonth: i,
      year: e,
      month: n
    });
  }
  /**
   * Check if a month is disabled
   */
  isMonthDisabled(t, e, s) {
    const n = this.getState(t);
    if (!n) return !1;
    const i = `${e}-${String(s).padStart(2, "0")}-01`, a = new Date(e, s, 0).getDate(), o = `${e}-${String(s).padStart(2, "0")}-${String(a).padStart(2, "0")}`;
    return !!(n.minDate && o < n.minDate || n.maxDate && i > n.maxDate);
  }
  /**
   * Check if a year is disabled
   */
  isYearDisabled(t, e) {
    const s = this.getState(t);
    if (!s) return !1;
    const n = `${e}-01-01`, i = `${e}-12-31`;
    return !!(s.minDate && i < s.minDate || s.maxDate && n > s.maxDate);
  }
  /**
   * Focus a specific date
   */
  focusDate(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const [n, i] = e.split("-").map(Number), [a, o] = s.currentMonth.split("-").map(Number);
    if (n !== a || i !== o) {
      const l = `${n}-${String(i).padStart(2, "0")}`;
      s.currentMonth = l, this.setState(t, s), this.renderCalendarGrid(t), this.updateMonthYearDisplay(t), this.dispatchCalendarEvent(t, "calendar:monthChanged", {
        currentMonth: l,
        year: n,
        month: i
      });
    }
    s.focusedDate = e, this.setState(t, s), B.createTimer(() => {
      const l = t.querySelector(`[data-calendar-date="${e}"]`);
      l && l.focus();
    }, 10);
  }
  /**
   * Update calendar visual display
   */
  updateCalendarDisplay(t) {
    this.renderCalendarGrid(t);
  }
  /**
   * Utility: Add days to a date string
   */
  addDaysToDate(t, e) {
    const s = new Date(t);
    return s.setDate(s.getDate() + e), this.formatDateString(s);
  }
  /**
   * Utility: Add months to a date string
   */
  addMonthsToDate(t, e) {
    const s = new Date(t);
    return s.setMonth(s.getMonth() + e), this.formatDateString(s);
  }
  /**
   * Utility: Get first day of month for a date string
   */
  getFirstDayOfMonth(t) {
    const e = new Date(t);
    return e.setDate(1), this.formatDateString(e);
  }
  /**
   * Utility: Get last day of month for a date string
   */
  getLastDayOfMonth(t) {
    const e = new Date(t);
    return e.setMonth(e.getMonth() + 1, 0), this.formatDateString(e);
  }
  /**
   * Utility: Format Date object to YYYY-MM-DD string
   */
  formatDateString(t) {
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }
  /**
   * Utility: Get current year-month string
   */
  getCurrentYearMonth() {
    const t = /* @__PURE__ */ new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}`;
  }
  /**
   * Utility: Get today's date string
   */
  getTodayDate() {
    return this.formatDateString(/* @__PURE__ */ new Date());
  }
  /**
   * Utility: Check if date string is today
   */
  isToday(t) {
    return t === this.getTodayDate();
  }
  /**
   * Animate view transitions for smooth UX
   */
  animateViewTransition(t, e) {
    t.style.opacity = "0.7", t.style.transform = "scale(0.98)", B.createTimer(() => {
      t.innerHTML = e, t.style.opacity = "1", t.style.transform = "scale(1)";
    }, 100);
  }
  /**
   * Utility: Format date for display
   */
  formatDateForDisplay(t) {
    return new Date(t).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  /**
   * Check if calendar is disabled
   */
  isCalendarDisabled(t) {
    const e = this.getState(t);
    return e ? e.isDisabled : !1;
  }
  /**
   * Dispatch custom calendar event
   */
  dispatchCalendarEvent(t, e, s = null) {
    x.dispatchCustomEvent(t, e, {
      calendar: t,
      ...s
    }, {
      bubbles: !0,
      cancelable: !0
    });
  }
  /**
   * Get calendar state (for external access)
   */
  getCalendarState(t) {
    return this.getState(t) || null;
  }
  /**
   * Set selected date programmatically
   */
  setSelectedDate(t, e) {
    const s = this.getState(t);
    s && (s.selectedDate = e, e && (s.focusedDate = e), this.setState(t, s), this.updateCalendarDisplay(t), this.updateHiddenInput(t), this.dispatchCalendarEvent(t, "calendar:dateSelected", {
      selectedDate: e,
      formattedDate: e ? this.formatDateForDisplay(e) : null
    }));
  }
  /**
   * Render multiple months view
   */
  renderMultipleMonths(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = h.querySelectorAll("[data-calendar-grid-container]", t);
    if (s.length === 0) return;
    const n = /* @__PURE__ */ new Date(e.currentMonth + "-01");
    s.forEach((i, a) => {
      const o = new Date(n);
      o.setMonth(n.getMonth() + a);
      const l = {
        ...e,
        currentMonth: `${o.getFullYear()}-${String(o.getMonth() + 1).padStart(2, "0")}`
      }, c = this.generateCalendarGridForMonth(t, l, a, s.length);
      let d = `<div class="calendar-month-header">${e.monthNames[o.getMonth()]} ${o.getFullYear()}</div>`;
      d += '<table class="w-full" role="grid" aria-label="Calendar">', d += '<thead><tr role="row">', e.weekdays.forEach((f) => {
        const m = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][e.weekdays.indexOf(f)];
        d += `<th class="calendar-weekday text-center text-muted font-medium p-1" role="columnheader" aria-label="${m}">${f}</th>`;
      }), d += "</tr></thead>", d += "<tbody>", c.forEach((f) => {
        d += '<tr role="row">', f.forEach((p) => {
          const m = this.getDayButtonClasses(p), b = mt.createDateAriaLabel(p.date, p.isToday, p.isSelected, p.isRangeStart, p.isRangeEnd, p.isInRange), v = this.getRangeAttributes(p, e);
          d += `
                        <td class="calendar-day text-center relative" role="gridcell">
                            <button type="button"
                                    class="${m}"
                                    data-calendar-date="${p.date}"
                                    data-is-current-month="${p.isCurrentMonth}"
                                    ${p.isDisabled ? "disabled" : ""}
                                    aria-selected="${p.isSelected}"
                                    aria-label="${b}"
                                    data-is-today="${p.isToday}"
                                    ${v}>
                                ${p.day}
                            </button>
                        </td>
                    `;
        }), d += "</tr>";
      }), d += "</tbody></table>", i.innerHTML = d;
    });
  }
  /**
   * Generate calendar grid for a specific month
   */
  generateCalendarGridForMonth(t, e, s = 0, n = 1) {
    const i = this.getState(t);
    if (!i) return [];
    this.setState(t, { ...i, currentMonth: e.currentMonth });
    let a = this.generateCalendarGrid(t);
    return n > 1 && s < n - 1 && a[a.length - 1].some((c) => !c.isCurrentMonth && c.day <= 15) && (a = a.slice(0, -1)), this.setState(t, i), a;
  }
  /**
   * Get range attributes for a day button
   */
  getRangeAttributes(t, e) {
    if (!e.isRange) return "";
    const s = [];
    return t.isInRange && s.push('data-is-in-range="true"'), t.isRangeStart && s.push('data-is-range-start="true"'), t.isRangeEnd && s.push('data-is-range-end="true"'), s.join(" ");
  }
  /**
   * Update hidden input for range selection
   */
  updateHiddenInput(t) {
    const e = this.getState(t);
    if (e)
      if (e.isRange) {
        const s = h.querySelector(".calendar-start-input", t), n = h.querySelector(".calendar-end-input", t), i = h.querySelector(".calendar-range-input", t);
        if (s && (s.value = e.startDate || ""), n && (n.value = e.endDate || ""), i) {
          const a = e.startDate && e.endDate ? `${e.startDate},${e.endDate}` : e.startDate || "";
          i.value = a;
        }
      } else {
        const s = h.querySelector(".calendar-hidden-input", t);
        s && (s.value = e.selectedDate || "");
      }
  }
  /**
   * Clear all selected dates (both single and range modes)
   */
  clearSelection(t) {
    const e = this.getState(t);
    !e || e.isDisabled || (e.selectedDate = null, e.startDate = null, e.endDate = null, e.focusedDate = null, this.setState(t, e), this.updateHiddenInput(t), this.renderCalendarGrid(t), this.dispatchCalendarEvent(t, "calendar:cleared", {
      isRange: e.isRange
    }));
  }
  /**
   * Navigate to today's date and select it
   */
  selectToday(t) {
    const e = this.getState(t);
    if (!e || e.isDisabled) return;
    const s = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    this.isDateDisabled(t, /* @__PURE__ */ new Date()) || (this.navigateToToday(t), this.selectDate(t, s));
  }
  /**
   * Navigate calendar to show today's month
   */
  navigateToToday(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = /* @__PURE__ */ new Date(), n = `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}`;
    e.currentMonth !== n && (e.currentMonth = n, this.setState(t, e), this.updateCalendarDisplay(t));
  }
  /**
   * Handle calendar footer action buttons
   */
  handleFooterAction(t, e) {
    switch (e) {
      case "clear":
        this.clearSelection(t);
        break;
      case "today":
        this.selectToday(t);
        break;
    }
  }
  /**
   * Clean up CalendarActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  ps.getInstance().init();
}) : ps.getInstance().init();
window.CalendarActions = ps;
ps.getInstance();
class da extends K {
  /**
   * Initialize radio elements - required by BaseActionClass
   */
  initializeElements() {
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("label[for]", (t) => {
      const e = t.getAttribute("for");
      if (!e) return;
      const s = h.getElementById(e);
      !s || s.type !== "radio" || this.focusRadioInput(s);
    }), x.handleDelegatedKeydown('input[type="radio"]', (t, e) => {
      x.createNavigationHandler({
        onArrowDown: () => this.focusNextRadio(t),
        onArrowRight: () => this.focusNextRadio(t),
        onArrowUp: () => this.focusPreviousRadio(t),
        onArrowLeft: () => this.focusPreviousRadio(t),
        preventDefault: ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"]
      })(e);
    });
  }
  /**
   * Focus a radio input with proper timing
   */
  focusRadioInput(t) {
    h.focus(t, 0), this.dispatchFocusEvent(t);
  }
  /**
   * Focus the next radio in the same group
   */
  focusNextRadio(t) {
    const e = this.getRadioGroup(t), n = (e.indexOf(t) + 1) % e.length, i = e[n];
    i && (i.focus(), i.checked = !0, i.dispatchEvent(new Event("change", { bubbles: !0 })), this.dispatchFocusEvent(i));
  }
  /**
   * Focus the previous radio in the same group
   */
  focusPreviousRadio(t) {
    const e = this.getRadioGroup(t), s = e.indexOf(t), n = s === 0 ? e.length - 1 : s - 1, i = e[n];
    i && (i.focus(), i.checked = !0, i.dispatchEvent(new Event("change", { bubbles: !0 })), this.dispatchFocusEvent(i));
  }
  /**
   * Get all radio inputs in the same group
   */
  getRadioGroup(t) {
    const e = t.name;
    return e ? Array.from(h.querySelectorAll(`input[type="radio"][name="${e}"]`)).filter((n) => !n.disabled) : [t];
  }
  /**
   * Dispatch custom event for radio focus
   */
  dispatchFocusEvent(t) {
    x.dispatchCustomEvent(t, "radio-focus", {
      radio: t,
      name: t.name,
      value: t.value,
      checked: t.checked
    });
  }
  /**
   * Add a custom radio focus handler with automatic cleanup
   */
  addFocusHandler(t) {
    return x.addEventListener(document, "radio-focus", (e) => {
      t(e.detail.radio);
    });
  }
  /**
   * Clean up RadioActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
da.getInstance();
class ms extends K {
  /**
   * Initialize range elements - required by BaseActionClass
   */
  initializeElements() {
    h.findByDataAttribute("range", "true").forEach((t) => {
      this.initializeRange(t);
    });
  }
  /**
   * Initialize a single range component
   */
  initializeRange(t) {
    var a, o, l;
    if (this.hasState(t))
      return;
    const e = h.querySelector(".range-track", t);
    if (!e) return;
    const s = {
      min: parseFloat(e.dataset.min || "0"),
      max: parseFloat(e.dataset.max || "100"),
      step: parseFloat(e.dataset.step || "1"),
      dual: e.dataset.dual === "true",
      ticks: e.dataset.ticks ? JSON.parse(e.dataset.ticks) : [],
      disabled: e.dataset.disabled === "true"
    }, n = this.getElements(t, s);
    if (!n.track) return;
    const i = {
      minValue: s.dual ? parseFloat(((a = n.inputs.min) == null ? void 0 : a.value) || s.min.toString()) : s.min,
      maxValue: s.dual ? parseFloat(((o = n.inputs.max) == null ? void 0 : o.value) || s.max.toString()) : s.max,
      singleValue: s.dual ? s.min : parseFloat(((l = n.inputs.single) == null ? void 0 : l.value) || s.min.toString()),
      isDragging: !1,
      activeHandle: null
    };
    this.setState(t, { config: s, state: i, elements: n }), s.disabled || this.setupHandleInteractions(t, n);
  }
  /**
   * Get all relevant elements for a range component
   */
  getElements(t, e) {
    const s = h.querySelector(".range-track", t), n = h.querySelector(".range-fill", t), i = {}, a = {}, o = {}, l = {};
    return e.dual ? (i.min = h.querySelector('[data-handle="min"]', t), i.max = h.querySelector('[data-handle="max"]', t), a.min = h.querySelector('[data-native-input="min"]', t), a.max = h.querySelector('[data-native-input="max"]', t), o.min = h.querySelector('[data-range-input="min"]', t), o.max = h.querySelector('[data-range-input="max"]', t), l.min = h.querySelector('[data-value-display="min"]', t), l.max = h.querySelector('[data-value-display="max"]', t)) : (i.single = h.querySelector('[data-handle="single"]', t), a.single = h.querySelector('[data-native-input="single"]', t), o.single = h.querySelector('[data-range-input="single"]', t), l.single = h.querySelector('[data-value-display="single"]', t)), {
      container: t,
      track: s,
      fill: n,
      handles: i,
      inputs: a,
      hiddenInputs: o,
      valueDisplays: l
    };
  }
  /**
   * Set up handle interactions (mouse, touch, keyboard)
   */
  setupHandleInteractions(t, e) {
    const { handles: s } = e;
    Object.entries(s).forEach(([n, i]) => {
      i && (i.addEventListener("mousedown", (a) => this.handleStart(a, t, n)), i.addEventListener("touchstart", (a) => this.handleStart(a, t, n), { passive: !1 }), i.addEventListener("keydown", (a) => this.handleKeydown(a, t, n)), i.addEventListener("focus", () => this.handleFocus(t, n)), i.addEventListener("blur", () => this.handleBlur(t, n)));
    }), e.track.addEventListener("click", (n) => this.handleTrackClick(n, t));
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.addEventListener(document, "mousemove", (t) => this.handleMove(t)), x.addEventListener(document, "mouseup", (t) => this.handleEnd(t)), x.addEventListener(document, "touchmove", (t) => this.handleMove(t), { passive: !1 }), x.addEventListener(document, "touchend", (t) => this.handleEnd(t)), x.addEventListener(document, "touchcancel", (t) => this.handleEnd(t));
  }
  /**
   * Setup dynamic observer for new ranges - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.hasDataAttribute(s, "range", "true") && this.initializeRange(s), h.findByDataAttribute("range", "true", s).forEach((n) => {
            this.initializeRange(n);
          });
        }
      });
    });
  }
  /**
   * Handle drag start
   */
  handleStart(t, e, s) {
    t.preventDefault();
    const n = this.getState(e);
    if (!n || n.config.disabled) return;
    n.state.isDragging = !0, n.state.activeHandle = s;
    const i = n.elements.handles[s];
    i && (i.classList.add("dragging"), i.focus()), e.classList.add("dragging"), document.body.style.userSelect = "none";
  }
  /**
   * Handle drag move
   */
  handleMove(t) {
    const e = Array.from(this.getAllStates().entries()).find(([p, m]) => m.state.isDragging);
    if (!e) return;
    t.preventDefault();
    const [s, n] = e, { config: i, state: a, elements: o } = n, l = "touches" in t ? t.touches[0].clientX : t.clientX, c = o.track.getBoundingClientRect(), d = Math.max(0, Math.min(1, (l - c.left) / c.width));
    let f = this.percentageToValue(d, i);
    f = this.snapToTickIfNeeded(f, i), this.updateValue(s, a.activeHandle, f);
  }
  /**
   * Handle drag end
   */
  handleEnd(t) {
    const e = Array.from(this.getAllStates().entries()).find(([a, o]) => o.state.isDragging);
    if (!e) return;
    const [s, n] = e;
    n.state.isDragging = !1;
    const i = n.elements.handles[n.state.activeHandle];
    i && i.classList.remove("dragging"), s.classList.remove("dragging"), n.state.activeHandle = null, document.body.style.userSelect = "", this.dispatchChangeEvent(s);
  }
  /**
   * Handle keyboard navigation
   */
  handleKeydown(t, e, s) {
    const n = this.getState(e);
    if (!n || n.config.disabled) return;
    const { config: i, state: a } = n;
    let o = !1, l;
    const c = s === "min" ? a.minValue : s === "max" ? a.maxValue : a.singleValue;
    switch (t.key) {
      case "ArrowLeft":
      case "ArrowDown":
        l = Math.max(i.min, c - i.step), o = !0;
        break;
      case "ArrowRight":
      case "ArrowUp":
        l = Math.min(i.max, c + i.step), o = !0;
        break;
      case "PageDown":
        l = Math.max(i.min, c - i.step * 10), o = !0;
        break;
      case "PageUp":
        l = Math.min(i.max, c + i.step * 10), o = !0;
        break;
      case "Home":
        l = i.min, o = !0;
        break;
      case "End":
        l = i.max, o = !0;
        break;
    }
    o && (t.preventDefault(), l = this.snapToTickIfNeeded(l, i), this.updateValue(e, s, l), this.dispatchChangeEvent(e));
  }
  /**
   * Handle track click to jump to position
   */
  handleTrackClick(t, e) {
    const s = this.getState(e);
    if (!s || s.config.disabled) return;
    const { config: n, state: i } = s, a = s.elements.track.getBoundingClientRect(), o = (t.clientX - a.left) / a.width;
    let l = this.percentageToValue(o, n);
    if (l = this.snapToTickIfNeeded(l, n), n.dual) {
      const c = Math.abs(l - i.minValue), d = Math.abs(l - i.maxValue), f = c <= d ? "min" : "max";
      this.updateValue(e, f, l);
    } else
      this.updateValue(e, "single", l);
    this.dispatchChangeEvent(e);
  }
  /**
   * Update a handle's value and visual position
   */
  updateValue(t, e, s) {
    const n = this.getState(t);
    if (!n) return;
    const { config: i, state: a, elements: o } = n;
    i.dual ? e === "min" ? (s = Math.min(s, a.maxValue), a.minValue = s) : e === "max" && (s = Math.max(s, a.minValue), a.maxValue = s) : a.singleValue = s, this.updateVisualElements(t), this.updateFormInputs(t), this.dispatchInputEvent(t);
  }
  /**
   * Update visual elements (handles, fill, value displays)
   */
  updateVisualElements(t) {
    const e = this.getState(t);
    if (!e) return;
    const { config: s, state: n, elements: i } = e;
    if (s.dual) {
      const a = this.valueToPercentage(n.minValue, s), o = this.valueToPercentage(n.maxValue, s);
      i.handles.min && (i.handles.min.style.left = `${a}%`, i.handles.min.setAttribute("aria-valuenow", n.minValue.toString()), i.handles.min.setAttribute("aria-valuetext", n.minValue.toString())), i.handles.max && (i.handles.max.style.left = `${o}%`, i.handles.max.setAttribute("aria-valuenow", n.maxValue.toString()), i.handles.max.setAttribute("aria-valuetext", n.maxValue.toString())), i.fill.style.left = `${a}%`, i.fill.style.width = `${o - a}%`, i.valueDisplays.min && (i.valueDisplays.min.textContent = n.minValue.toString()), i.valueDisplays.max && (i.valueDisplays.max.textContent = n.maxValue.toString());
    } else {
      const a = this.valueToPercentage(n.singleValue, s);
      i.handles.single && (i.handles.single.style.left = `${a}%`, i.handles.single.setAttribute("aria-valuenow", n.singleValue.toString()), i.handles.single.setAttribute("aria-valuetext", n.singleValue.toString())), i.fill.style.width = `${a}%`, i.valueDisplays.single && (i.valueDisplays.single.textContent = n.singleValue.toString());
    }
  }
  /**
   * Update form inputs for submission
   */
  updateFormInputs(t) {
    const e = this.getState(t);
    if (!e) return;
    const { config: s, state: n, elements: i } = e;
    s.dual ? (i.inputs.min && (i.inputs.min.value = n.minValue.toString()), i.inputs.max && (i.inputs.max.value = n.maxValue.toString()), i.hiddenInputs.min && (i.hiddenInputs.min.value = n.minValue.toString()), i.hiddenInputs.max && (i.hiddenInputs.max.value = n.maxValue.toString())) : (i.inputs.single && (i.inputs.single.value = n.singleValue.toString()), i.hiddenInputs.single && (i.hiddenInputs.single.value = n.singleValue.toString()));
  }
  /**
   * Convert percentage to value
   */
  percentageToValue(t, e) {
    const s = e.max - e.min;
    let n = e.min + t * s;
    return n = Math.round(n / e.step) * e.step, Math.max(e.min, Math.min(e.max, n));
  }
  /**
   * Convert value to percentage
   */
  valueToPercentage(t, e) {
    return (t - e.min) / (e.max - e.min) * 100;
  }
  /**
   * Snap value to nearest tick if ticks are enabled
   */
  snapToTickIfNeeded(t, e) {
    if (e.ticks.length === 0)
      return t;
    let s = e.ticks[0], n = Math.abs(t - s);
    for (const i of e.ticks) {
      const a = Math.abs(t - i);
      a < n && (s = i, n = a);
    }
    return s;
  }
  /**
   * Handle focus events
   */
  handleFocus(t, e) {
  }
  /**
   * Handle blur events
   */
  handleBlur(t, e) {
  }
  /**
   * Dispatch input event for real-time updates (e.g., Livewire)
   */
  dispatchInputEvent(t) {
    var a, o, l;
    const e = this.getState(t);
    if (!e) return;
    const { config: s, state: n } = e, i = s.dual ? [n.minValue, n.maxValue] : n.singleValue;
    x.dispatchCustomEvent(t, "range-input", {
      value: i,
      dual: s.dual
    }, {
      bubbles: !0,
      cancelable: !0
    }), s.dual ? ((a = e.elements.hiddenInputs.min) == null || a.dispatchEvent(new Event("input", { bubbles: !0 })), (o = e.elements.hiddenInputs.max) == null || o.dispatchEvent(new Event("input", { bubbles: !0 }))) : (l = e.elements.hiddenInputs.single) == null || l.dispatchEvent(new Event("input", { bubbles: !0 }));
  }
  /**
   * Dispatch change event when interaction is complete
   */
  dispatchChangeEvent(t) {
    var a, o, l;
    const e = this.getState(t);
    if (!e) return;
    const { config: s, state: n } = e, i = s.dual ? [n.minValue, n.maxValue] : n.singleValue;
    x.dispatchCustomEvent(t, "range-change", {
      value: i,
      dual: s.dual
    }, {
      bubbles: !0,
      cancelable: !0
    }), s.dual ? ((a = e.elements.hiddenInputs.min) == null || a.dispatchEvent(new Event("change", { bubbles: !0 })), (o = e.elements.hiddenInputs.max) == null || o.dispatchEvent(new Event("change", { bubbles: !0 }))) : (l = e.elements.hiddenInputs.single) == null || l.dispatchEvent(new Event("change", { bubbles: !0 }));
  }
  /**
   * Get current value for a range component
   */
  getValue(t) {
    const e = this.getState(t);
    if (!e) return null;
    const { config: s, state: n } = e;
    return s.dual ? [n.minValue, n.maxValue] : n.singleValue;
  }
  /**
   * Set value for a range component
   */
  setValue(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const { config: n } = s;
    n.dual && Array.isArray(e) ? (this.updateValue(t, "min", e[0]), this.updateValue(t, "max", e[1])) : !n.dual && typeof e == "number" && this.updateValue(t, "single", e), this.dispatchChangeEvent(t);
  }
  /**
   * Destroy range component
   */
  destroyRange(t) {
    this.removeState(t);
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
  ms.getInstance().init();
}) : ms.getInstance().init();
window.RangeActions = ms;
ms.getInstance();
const $c = ["top", "right", "bottom", "left"], Pt = Math.min, ht = Math.max, ii = Math.round, Kn = Math.floor, Jt = (r) => ({
  x: r,
  y: r
}), Bc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Fc = {
  start: "end",
  end: "start"
};
function Mr(r, t, e) {
  return ht(r, Pt(t, e));
}
function Ce(r, t) {
  return typeof r == "function" ? r(t) : r;
}
function se(r) {
  return r.split("-")[0];
}
function ks(r) {
  return r.split("-")[1];
}
function dl(r) {
  return r === "x" ? "y" : "x";
}
function ha(r) {
  return r === "y" ? "height" : "width";
}
const Pc = /* @__PURE__ */ new Set(["top", "bottom"]);
function Qt(r) {
  return Pc.has(se(r)) ? "y" : "x";
}
function fa(r) {
  return dl(Qt(r));
}
function jc(r, t, e) {
  e === void 0 && (e = !1);
  const s = ks(r), n = fa(r), i = ha(n);
  let a = n === "x" ? s === (e ? "end" : "start") ? "right" : "left" : s === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (a = ri(a)), [a, ri(a)];
}
function Hc(r) {
  const t = ri(r);
  return [Rr(r), t, Rr(t)];
}
function Rr(r) {
  return r.replace(/start|end/g, (t) => Fc[t]);
}
const Qa = ["left", "right"], Ja = ["right", "left"], zc = ["top", "bottom"], Uc = ["bottom", "top"];
function Vc(r, t, e) {
  switch (r) {
    case "top":
    case "bottom":
      return e ? t ? Ja : Qa : t ? Qa : Ja;
    case "left":
    case "right":
      return t ? zc : Uc;
    default:
      return [];
  }
}
function Gc(r, t, e, s) {
  const n = ks(r);
  let i = Vc(se(r), e === "start", s);
  return n && (i = i.map((a) => a + "-" + n), t && (i = i.concat(i.map(Rr)))), i;
}
function ri(r) {
  return r.replace(/left|right|bottom|top/g, (t) => Bc[t]);
}
function Kc(r) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...r
  };
}
function ga(r) {
  return typeof r != "number" ? Kc(r) : {
    top: r,
    right: r,
    bottom: r,
    left: r
  };
}
function bs(r) {
  const {
    x: t,
    y: e,
    width: s,
    height: n
  } = r;
  return {
    width: s,
    height: n,
    top: e,
    left: t,
    right: t + s,
    bottom: e + n,
    x: t,
    y: e
  };
}
function to(r, t, e) {
  let {
    reference: s,
    floating: n
  } = r;
  const i = Qt(t), a = fa(t), o = ha(a), l = se(t), c = i === "y", d = s.x + s.width / 2 - n.width / 2, f = s.y + s.height / 2 - n.height / 2, p = s[o] / 2 - n[o] / 2;
  let m;
  switch (l) {
    case "top":
      m = {
        x: d,
        y: s.y - n.height
      };
      break;
    case "bottom":
      m = {
        x: d,
        y: s.y + s.height
      };
      break;
    case "right":
      m = {
        x: s.x + s.width,
        y: f
      };
      break;
    case "left":
      m = {
        x: s.x - n.width,
        y: f
      };
      break;
    default:
      m = {
        x: s.x,
        y: s.y
      };
  }
  switch (ks(t)) {
    case "start":
      m[a] -= p * (e && c ? -1 : 1);
      break;
    case "end":
      m[a] += p * (e && c ? -1 : 1);
      break;
  }
  return m;
}
const Yc = async (r, t, e) => {
  const {
    placement: s = "bottom",
    strategy: n = "absolute",
    middleware: i = [],
    platform: a
  } = e, o = i.filter(Boolean), l = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let c = await a.getElementRects({
    reference: r,
    floating: t,
    strategy: n
  }), {
    x: d,
    y: f
  } = to(c, s, l), p = s, m = {}, b = 0;
  for (let v = 0; v < o.length; v++) {
    const {
      name: w,
      fn: S
    } = o[v], {
      x: A,
      y: D,
      data: L,
      reset: C
    } = await S({
      x: d,
      y: f,
      initialPlacement: s,
      placement: p,
      strategy: n,
      middlewareData: m,
      rects: c,
      platform: a,
      elements: {
        reference: r,
        floating: t
      }
    });
    d = A ?? d, f = D ?? f, m = {
      ...m,
      [w]: {
        ...m[w],
        ...L
      }
    }, C && b <= 50 && (b++, typeof C == "object" && (C.placement && (p = C.placement), C.rects && (c = C.rects === !0 ? await a.getElementRects({
      reference: r,
      floating: t,
      strategy: n
    }) : C.rects), {
      x: d,
      y: f
    } = to(c, p, l)), v = -1);
  }
  return {
    x: d,
    y: f,
    placement: p,
    strategy: n,
    middlewareData: m
  };
};
async function an(r, t) {
  var e;
  t === void 0 && (t = {});
  const {
    x: s,
    y: n,
    platform: i,
    rects: a,
    elements: o,
    strategy: l
  } = r, {
    boundary: c = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: f = "floating",
    altBoundary: p = !1,
    padding: m = 0
  } = Ce(t, r), b = ga(m), w = o[p ? f === "floating" ? "reference" : "floating" : f], S = bs(await i.getClippingRect({
    element: (e = await (i.isElement == null ? void 0 : i.isElement(w))) == null || e ? w : w.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: l
  })), A = f === "floating" ? {
    x: s,
    y: n,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, D = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), L = await (i.isElement == null ? void 0 : i.isElement(D)) ? await (i.getScale == null ? void 0 : i.getScale(D)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = bs(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: o,
    rect: A,
    offsetParent: D,
    strategy: l
  }) : A);
  return {
    top: (S.top - C.top + b.top) / L.y,
    bottom: (C.bottom - S.bottom + b.bottom) / L.y,
    left: (S.left - C.left + b.left) / L.x,
    right: (C.right - S.right + b.right) / L.x
  };
}
const Wc = (r) => ({
  name: "arrow",
  options: r,
  async fn(t) {
    const {
      x: e,
      y: s,
      placement: n,
      rects: i,
      platform: a,
      elements: o,
      middlewareData: l
    } = t, {
      element: c,
      padding: d = 0
    } = Ce(r, t) || {};
    if (c == null)
      return {};
    const f = ga(d), p = {
      x: e,
      y: s
    }, m = fa(n), b = ha(m), v = await a.getDimensions(c), w = m === "y", S = w ? "top" : "left", A = w ? "bottom" : "right", D = w ? "clientHeight" : "clientWidth", L = i.reference[b] + i.reference[m] - p[m] - i.floating[b], C = p[m] - i.reference[m], N = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let R = N ? N[D] : 0;
    (!R || !await (a.isElement == null ? void 0 : a.isElement(N))) && (R = o.floating[D] || i.floating[b]);
    const $ = L / 2 - C / 2, W = R / 2 - v[b] / 2 - 1, P = Pt(f[S], W), X = Pt(f[A], W), Z = P, et = R - v[b] - X, Y = R / 2 - v[b] / 2 + $, ot = Mr(Z, Y, et), lt = !l.arrow && ks(n) != null && Y !== ot && i.reference[b] / 2 - (Y < Z ? P : X) - v[b] / 2 < 0, st = lt ? Y < Z ? Y - Z : Y - et : 0;
    return {
      [m]: p[m] + st,
      data: {
        [m]: ot,
        centerOffset: Y - ot - st,
        ...lt && {
          alignmentOffset: st
        }
      },
      reset: lt
    };
  }
}), Zc = function(r) {
  return r === void 0 && (r = {}), {
    name: "flip",
    options: r,
    async fn(t) {
      var e, s;
      const {
        placement: n,
        middlewareData: i,
        rects: a,
        initialPlacement: o,
        platform: l,
        elements: c
      } = t, {
        mainAxis: d = !0,
        crossAxis: f = !0,
        fallbackPlacements: p,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: v = !0,
        ...w
      } = Ce(r, t);
      if ((e = i.arrow) != null && e.alignmentOffset)
        return {};
      const S = se(n), A = Qt(o), D = se(o) === o, L = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), C = p || (D || !v ? [ri(o)] : Hc(o)), N = b !== "none";
      !p && N && C.push(...Gc(o, v, b, L));
      const R = [o, ...C], $ = await an(t, w), W = [];
      let P = ((s = i.flip) == null ? void 0 : s.overflows) || [];
      if (d && W.push($[S]), f) {
        const Y = jc(n, a, L);
        W.push($[Y[0]], $[Y[1]]);
      }
      if (P = [...P, {
        placement: n,
        overflows: W
      }], !W.every((Y) => Y <= 0)) {
        var X, Z;
        const Y = (((X = i.flip) == null ? void 0 : X.index) || 0) + 1, ot = R[Y];
        if (ot && (!(f === "alignment" ? A !== Qt(ot) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        P.every((nt) => Qt(nt.placement) === A ? nt.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Y,
              overflows: P
            },
            reset: {
              placement: ot
            }
          };
        let lt = (Z = P.filter((st) => st.overflows[0] <= 0).sort((st, nt) => st.overflows[1] - nt.overflows[1])[0]) == null ? void 0 : Z.placement;
        if (!lt)
          switch (m) {
            case "bestFit": {
              var et;
              const st = (et = P.filter((nt) => {
                if (N) {
                  const Et = Qt(nt.placement);
                  return Et === A || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Et === "y";
                }
                return !0;
              }).map((nt) => [nt.placement, nt.overflows.filter((Et) => Et > 0).reduce((Et, H) => Et + H, 0)]).sort((nt, Et) => nt[1] - Et[1])[0]) == null ? void 0 : et[0];
              st && (lt = st);
              break;
            }
            case "initialPlacement":
              lt = o;
              break;
          }
        if (n !== lt)
          return {
            reset: {
              placement: lt
            }
          };
      }
      return {};
    }
  };
};
function eo(r, t) {
  return {
    top: r.top - t.height,
    right: r.right - t.width,
    bottom: r.bottom - t.height,
    left: r.left - t.width
  };
}
function so(r) {
  return $c.some((t) => r[t] >= 0);
}
const Xc = function(r) {
  return r === void 0 && (r = {}), {
    name: "hide",
    options: r,
    async fn(t) {
      const {
        rects: e
      } = t, {
        strategy: s = "referenceHidden",
        ...n
      } = Ce(r, t);
      switch (s) {
        case "referenceHidden": {
          const i = await an(t, {
            ...n,
            elementContext: "reference"
          }), a = eo(i, e.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: so(a)
            }
          };
        }
        case "escaped": {
          const i = await an(t, {
            ...n,
            altBoundary: !0
          }), a = eo(i, e.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: so(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
function hl(r) {
  const t = Pt(...r.map((i) => i.left)), e = Pt(...r.map((i) => i.top)), s = ht(...r.map((i) => i.right)), n = ht(...r.map((i) => i.bottom));
  return {
    x: t,
    y: e,
    width: s - t,
    height: n - e
  };
}
function Qc(r) {
  const t = r.slice().sort((n, i) => n.y - i.y), e = [];
  let s = null;
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    !s || i.y - s.y > s.height / 2 ? e.push([i]) : e[e.length - 1].push(i), s = i;
  }
  return e.map((n) => bs(hl(n)));
}
const Jc = function(r) {
  return r === void 0 && (r = {}), {
    name: "inline",
    options: r,
    async fn(t) {
      const {
        placement: e,
        elements: s,
        rects: n,
        platform: i,
        strategy: a
      } = t, {
        padding: o = 2,
        x: l,
        y: c
      } = Ce(r, t), d = Array.from(await (i.getClientRects == null ? void 0 : i.getClientRects(s.reference)) || []), f = Qc(d), p = bs(hl(d)), m = ga(o);
      function b() {
        if (f.length === 2 && f[0].left > f[1].right && l != null && c != null)
          return f.find((w) => l > w.left - m.left && l < w.right + m.right && c > w.top - m.top && c < w.bottom + m.bottom) || p;
        if (f.length >= 2) {
          if (Qt(e) === "y") {
            const P = f[0], X = f[f.length - 1], Z = se(e) === "top", et = P.top, Y = X.bottom, ot = Z ? P.left : X.left, lt = Z ? P.right : X.right, st = lt - ot, nt = Y - et;
            return {
              top: et,
              bottom: Y,
              left: ot,
              right: lt,
              width: st,
              height: nt,
              x: ot,
              y: et
            };
          }
          const w = se(e) === "left", S = ht(...f.map((P) => P.right)), A = Pt(...f.map((P) => P.left)), D = f.filter((P) => w ? P.left === A : P.right === S), L = D[0].top, C = D[D.length - 1].bottom, N = A, R = S, $ = R - N, W = C - L;
          return {
            top: L,
            bottom: C,
            left: N,
            right: R,
            width: $,
            height: W,
            x: N,
            y: L
          };
        }
        return p;
      }
      const v = await i.getElementRects({
        reference: {
          getBoundingClientRect: b
        },
        floating: s.floating,
        strategy: a
      });
      return n.reference.x !== v.reference.x || n.reference.y !== v.reference.y || n.reference.width !== v.reference.width || n.reference.height !== v.reference.height ? {
        reset: {
          rects: v
        }
      } : {};
    }
  };
}, tu = /* @__PURE__ */ new Set(["left", "top"]);
async function eu(r, t) {
  const {
    placement: e,
    platform: s,
    elements: n
  } = r, i = await (s.isRTL == null ? void 0 : s.isRTL(n.floating)), a = se(e), o = ks(e), l = Qt(e) === "y", c = tu.has(a) ? -1 : 1, d = i && l ? -1 : 1, f = Ce(t, r);
  let {
    mainAxis: p,
    crossAxis: m,
    alignmentAxis: b
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return o && typeof b == "number" && (m = o === "end" ? b * -1 : b), l ? {
    x: m * d,
    y: p * c
  } : {
    x: p * c,
    y: m * d
  };
}
const su = function(r) {
  return r === void 0 && (r = 0), {
    name: "offset",
    options: r,
    async fn(t) {
      var e, s;
      const {
        x: n,
        y: i,
        placement: a,
        middlewareData: o
      } = t, l = await eu(t, r);
      return a === ((e = o.offset) == null ? void 0 : e.placement) && (s = o.arrow) != null && s.alignmentOffset ? {} : {
        x: n + l.x,
        y: i + l.y,
        data: {
          ...l,
          placement: a
        }
      };
    }
  };
}, nu = function(r) {
  return r === void 0 && (r = {}), {
    name: "shift",
    options: r,
    async fn(t) {
      const {
        x: e,
        y: s,
        placement: n
      } = t, {
        mainAxis: i = !0,
        crossAxis: a = !1,
        limiter: o = {
          fn: (w) => {
            let {
              x: S,
              y: A
            } = w;
            return {
              x: S,
              y: A
            };
          }
        },
        ...l
      } = Ce(r, t), c = {
        x: e,
        y: s
      }, d = await an(t, l), f = Qt(se(n)), p = dl(f);
      let m = c[p], b = c[f];
      if (i) {
        const w = p === "y" ? "top" : "left", S = p === "y" ? "bottom" : "right", A = m + d[w], D = m - d[S];
        m = Mr(A, m, D);
      }
      if (a) {
        const w = f === "y" ? "top" : "left", S = f === "y" ? "bottom" : "right", A = b + d[w], D = b - d[S];
        b = Mr(A, b, D);
      }
      const v = o.fn({
        ...t,
        [p]: m,
        [f]: b
      });
      return {
        ...v,
        data: {
          x: v.x - e,
          y: v.y - s,
          enabled: {
            [p]: i,
            [f]: a
          }
        }
      };
    }
  };
}, iu = function(r) {
  return r === void 0 && (r = {}), {
    name: "size",
    options: r,
    async fn(t) {
      var e, s;
      const {
        placement: n,
        rects: i,
        platform: a,
        elements: o
      } = t, {
        apply: l = () => {
        },
        ...c
      } = Ce(r, t), d = await an(t, c), f = se(n), p = ks(n), m = Qt(n) === "y", {
        width: b,
        height: v
      } = i.floating;
      let w, S;
      f === "top" || f === "bottom" ? (w = f, S = p === (await (a.isRTL == null ? void 0 : a.isRTL(o.floating)) ? "start" : "end") ? "left" : "right") : (S = f, w = p === "end" ? "top" : "bottom");
      const A = v - d.top - d.bottom, D = b - d.left - d.right, L = Pt(v - d[w], A), C = Pt(b - d[S], D), N = !t.middlewareData.shift;
      let R = L, $ = C;
      if ((e = t.middlewareData.shift) != null && e.enabled.x && ($ = D), (s = t.middlewareData.shift) != null && s.enabled.y && (R = A), N && !p) {
        const P = ht(d.left, 0), X = ht(d.right, 0), Z = ht(d.top, 0), et = ht(d.bottom, 0);
        m ? $ = b - 2 * (P !== 0 || X !== 0 ? P + X : ht(d.left, d.right)) : R = v - 2 * (Z !== 0 || et !== 0 ? Z + et : ht(d.top, d.bottom));
      }
      await l({
        ...t,
        availableWidth: $,
        availableHeight: R
      });
      const W = await a.getDimensions(o.floating);
      return b !== W.width || v !== W.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function pi() {
  return typeof window < "u";
}
function Ns(r) {
  return fl(r) ? (r.nodeName || "").toLowerCase() : "#document";
}
function xt(r) {
  var t;
  return (r == null || (t = r.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ae(r) {
  var t;
  return (t = (fl(r) ? r.ownerDocument : r.document) || window.document) == null ? void 0 : t.documentElement;
}
function fl(r) {
  return pi() ? r instanceof Node || r instanceof xt(r).Node : !1;
}
function jt(r) {
  return pi() ? r instanceof Element || r instanceof xt(r).Element : !1;
}
function ne(r) {
  return pi() ? r instanceof HTMLElement || r instanceof xt(r).HTMLElement : !1;
}
function no(r) {
  return !pi() || typeof ShadowRoot > "u" ? !1 : r instanceof ShadowRoot || r instanceof xt(r).ShadowRoot;
}
const ru = /* @__PURE__ */ new Set(["inline", "contents"]);
function mn(r) {
  const {
    overflow: t,
    overflowX: e,
    overflowY: s,
    display: n
  } = Ht(r);
  return /auto|scroll|overlay|hidden|clip/.test(t + s + e) && !ru.has(n);
}
const au = /* @__PURE__ */ new Set(["table", "td", "th"]);
function ou(r) {
  return au.has(Ns(r));
}
const lu = [":popover-open", ":modal"];
function mi(r) {
  return lu.some((t) => {
    try {
      return r.matches(t);
    } catch {
      return !1;
    }
  });
}
const cu = ["transform", "translate", "scale", "rotate", "perspective"], uu = ["transform", "translate", "scale", "rotate", "perspective", "filter"], du = ["paint", "layout", "strict", "content"];
function pa(r) {
  const t = ma(), e = jt(r) ? Ht(r) : r;
  return cu.some((s) => e[s] ? e[s] !== "none" : !1) || (e.containerType ? e.containerType !== "normal" : !1) || !t && (e.backdropFilter ? e.backdropFilter !== "none" : !1) || !t && (e.filter ? e.filter !== "none" : !1) || uu.some((s) => (e.willChange || "").includes(s)) || du.some((s) => (e.contain || "").includes(s));
}
function hu(r) {
  let t = De(r);
  for (; ne(t) && !ys(t); ) {
    if (pa(t))
      return t;
    if (mi(t))
      return null;
    t = De(t);
  }
  return null;
}
function ma() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const fu = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function ys(r) {
  return fu.has(Ns(r));
}
function Ht(r) {
  return xt(r).getComputedStyle(r);
}
function bi(r) {
  return jt(r) ? {
    scrollLeft: r.scrollLeft,
    scrollTop: r.scrollTop
  } : {
    scrollLeft: r.scrollX,
    scrollTop: r.scrollY
  };
}
function De(r) {
  if (Ns(r) === "html")
    return r;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    r.assignedSlot || // DOM Element detected.
    r.parentNode || // ShadowRoot detected.
    no(r) && r.host || // Fallback.
    ae(r)
  );
  return no(t) ? t.host : t;
}
function gl(r) {
  const t = De(r);
  return ys(t) ? r.ownerDocument ? r.ownerDocument.body : r.body : ne(t) && mn(t) ? t : gl(t);
}
function on(r, t, e) {
  var s;
  t === void 0 && (t = []), e === void 0 && (e = !0);
  const n = gl(r), i = n === ((s = r.ownerDocument) == null ? void 0 : s.body), a = xt(n);
  if (i) {
    const o = _r(a);
    return t.concat(a, a.visualViewport || [], mn(n) ? n : [], o && e ? on(o) : []);
  }
  return t.concat(n, on(n, [], e));
}
function _r(r) {
  return r.parent && Object.getPrototypeOf(r.parent) ? r.frameElement : null;
}
function pl(r) {
  const t = Ht(r);
  let e = parseFloat(t.width) || 0, s = parseFloat(t.height) || 0;
  const n = ne(r), i = n ? r.offsetWidth : e, a = n ? r.offsetHeight : s, o = ii(e) !== i || ii(s) !== a;
  return o && (e = i, s = a), {
    width: e,
    height: s,
    $: o
  };
}
function ba(r) {
  return jt(r) ? r : r.contextElement;
}
function ds(r) {
  const t = ba(r);
  if (!ne(t))
    return Jt(1);
  const e = t.getBoundingClientRect(), {
    width: s,
    height: n,
    $: i
  } = pl(t);
  let a = (i ? ii(e.width) : e.width) / s, o = (i ? ii(e.height) : e.height) / n;
  return (!a || !Number.isFinite(a)) && (a = 1), (!o || !Number.isFinite(o)) && (o = 1), {
    x: a,
    y: o
  };
}
const gu = /* @__PURE__ */ Jt(0);
function ml(r) {
  const t = xt(r);
  return !ma() || !t.visualViewport ? gu : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function pu(r, t, e) {
  return t === void 0 && (t = !1), !e || t && e !== xt(r) ? !1 : t;
}
function $e(r, t, e, s) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  const n = r.getBoundingClientRect(), i = ba(r);
  let a = Jt(1);
  t && (s ? jt(s) && (a = ds(s)) : a = ds(r));
  const o = pu(i, e, s) ? ml(i) : Jt(0);
  let l = (n.left + o.x) / a.x, c = (n.top + o.y) / a.y, d = n.width / a.x, f = n.height / a.y;
  if (i) {
    const p = xt(i), m = s && jt(s) ? xt(s) : s;
    let b = p, v = _r(b);
    for (; v && s && m !== b; ) {
      const w = ds(v), S = v.getBoundingClientRect(), A = Ht(v), D = S.left + (v.clientLeft + parseFloat(A.paddingLeft)) * w.x, L = S.top + (v.clientTop + parseFloat(A.paddingTop)) * w.y;
      l *= w.x, c *= w.y, d *= w.x, f *= w.y, l += D, c += L, b = xt(v), v = _r(b);
    }
  }
  return bs({
    width: d,
    height: f,
    x: l,
    y: c
  });
}
function yi(r, t) {
  const e = bi(r).scrollLeft;
  return t ? t.left + e : $e(ae(r)).left + e;
}
function bl(r, t) {
  const e = r.getBoundingClientRect(), s = e.left + t.scrollLeft - yi(r, e), n = e.top + t.scrollTop;
  return {
    x: s,
    y: n
  };
}
function mu(r) {
  let {
    elements: t,
    rect: e,
    offsetParent: s,
    strategy: n
  } = r;
  const i = n === "fixed", a = ae(s), o = t ? mi(t.floating) : !1;
  if (s === a || o && i)
    return e;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = Jt(1);
  const d = Jt(0), f = ne(s);
  if ((f || !f && !i) && ((Ns(s) !== "body" || mn(a)) && (l = bi(s)), ne(s))) {
    const m = $e(s);
    c = ds(s), d.x = m.x + s.clientLeft, d.y = m.y + s.clientTop;
  }
  const p = a && !f && !i ? bl(a, l) : Jt(0);
  return {
    width: e.width * c.x,
    height: e.height * c.y,
    x: e.x * c.x - l.scrollLeft * c.x + d.x + p.x,
    y: e.y * c.y - l.scrollTop * c.y + d.y + p.y
  };
}
function bu(r) {
  return Array.from(r.getClientRects());
}
function yu(r) {
  const t = ae(r), e = bi(r), s = r.ownerDocument.body, n = ht(t.scrollWidth, t.clientWidth, s.scrollWidth, s.clientWidth), i = ht(t.scrollHeight, t.clientHeight, s.scrollHeight, s.clientHeight);
  let a = -e.scrollLeft + yi(r);
  const o = -e.scrollTop;
  return Ht(s).direction === "rtl" && (a += ht(t.clientWidth, s.clientWidth) - n), {
    width: n,
    height: i,
    x: a,
    y: o
  };
}
const io = 25;
function vu(r, t) {
  const e = xt(r), s = ae(r), n = e.visualViewport;
  let i = s.clientWidth, a = s.clientHeight, o = 0, l = 0;
  if (n) {
    i = n.width, a = n.height;
    const d = ma();
    (!d || d && t === "fixed") && (o = n.offsetLeft, l = n.offsetTop);
  }
  const c = yi(s);
  if (c <= 0) {
    const d = s.ownerDocument, f = d.body, p = getComputedStyle(f), m = d.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, b = Math.abs(s.clientWidth - f.clientWidth - m);
    b <= io && (i -= b);
  } else c <= io && (i += c);
  return {
    width: i,
    height: a,
    x: o,
    y: l
  };
}
const wu = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Su(r, t) {
  const e = $e(r, !0, t === "fixed"), s = e.top + r.clientTop, n = e.left + r.clientLeft, i = ne(r) ? ds(r) : Jt(1), a = r.clientWidth * i.x, o = r.clientHeight * i.y, l = n * i.x, c = s * i.y;
  return {
    width: a,
    height: o,
    x: l,
    y: c
  };
}
function ro(r, t, e) {
  let s;
  if (t === "viewport")
    s = vu(r, e);
  else if (t === "document")
    s = yu(ae(r));
  else if (jt(t))
    s = Su(t, e);
  else {
    const n = ml(r);
    s = {
      x: t.x - n.x,
      y: t.y - n.y,
      width: t.width,
      height: t.height
    };
  }
  return bs(s);
}
function yl(r, t) {
  const e = De(r);
  return e === t || !jt(e) || ys(e) ? !1 : Ht(e).position === "fixed" || yl(e, t);
}
function xu(r, t) {
  const e = t.get(r);
  if (e)
    return e;
  let s = on(r, [], !1).filter((o) => jt(o) && Ns(o) !== "body"), n = null;
  const i = Ht(r).position === "fixed";
  let a = i ? De(r) : r;
  for (; jt(a) && !ys(a); ) {
    const o = Ht(a), l = pa(a);
    !l && o.position === "fixed" && (n = null), (i ? !l && !n : !l && o.position === "static" && !!n && wu.has(n.position) || mn(a) && !l && yl(r, a)) ? s = s.filter((d) => d !== a) : n = o, a = De(a);
  }
  return t.set(r, s), s;
}
function Au(r) {
  let {
    element: t,
    boundary: e,
    rootBoundary: s,
    strategy: n
  } = r;
  const a = [...e === "clippingAncestors" ? mi(t) ? [] : xu(t, this._c) : [].concat(e), s], o = a[0], l = a.reduce((c, d) => {
    const f = ro(t, d, n);
    return c.top = ht(f.top, c.top), c.right = Pt(f.right, c.right), c.bottom = Pt(f.bottom, c.bottom), c.left = ht(f.left, c.left), c;
  }, ro(t, o, n));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Eu(r) {
  const {
    width: t,
    height: e
  } = pl(r);
  return {
    width: t,
    height: e
  };
}
function Du(r, t, e) {
  const s = ne(t), n = ae(t), i = e === "fixed", a = $e(r, !0, i, t);
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Jt(0);
  function c() {
    l.x = yi(n);
  }
  if (s || !s && !i)
    if ((Ns(t) !== "body" || mn(n)) && (o = bi(t)), s) {
      const m = $e(t, !0, i, t);
      l.x = m.x + t.clientLeft, l.y = m.y + t.clientTop;
    } else n && c();
  i && !s && n && c();
  const d = n && !s && !i ? bl(n, o) : Jt(0), f = a.left + o.scrollLeft - l.x - d.x, p = a.top + o.scrollTop - l.y - d.y;
  return {
    x: f,
    y: p,
    width: a.width,
    height: a.height
  };
}
function wr(r) {
  return Ht(r).position === "static";
}
function ao(r, t) {
  if (!ne(r) || Ht(r).position === "fixed")
    return null;
  if (t)
    return t(r);
  let e = r.offsetParent;
  return ae(r) === e && (e = e.ownerDocument.body), e;
}
function vl(r, t) {
  const e = xt(r);
  if (mi(r))
    return e;
  if (!ne(r)) {
    let n = De(r);
    for (; n && !ys(n); ) {
      if (jt(n) && !wr(n))
        return n;
      n = De(n);
    }
    return e;
  }
  let s = ao(r, t);
  for (; s && ou(s) && wr(s); )
    s = ao(s, t);
  return s && ys(s) && wr(s) && !pa(s) ? e : s || hu(r) || e;
}
const Tu = async function(r) {
  const t = this.getOffsetParent || vl, e = this.getDimensions, s = await e(r.floating);
  return {
    reference: Du(r.reference, await t(r.floating), r.strategy),
    floating: {
      x: 0,
      y: 0,
      width: s.width,
      height: s.height
    }
  };
};
function Cu(r) {
  return Ht(r).direction === "rtl";
}
const Lu = {
  convertOffsetParentRelativeRectToViewportRelativeRect: mu,
  getDocumentElement: ae,
  getClippingRect: Au,
  getOffsetParent: vl,
  getElementRects: Tu,
  getClientRects: bu,
  getDimensions: Eu,
  getScale: ds,
  isElement: jt,
  isRTL: Cu
};
function wl(r, t) {
  return r.x === t.x && r.y === t.y && r.width === t.width && r.height === t.height;
}
function Iu(r, t) {
  let e = null, s;
  const n = ae(r);
  function i() {
    var o;
    clearTimeout(s), (o = e) == null || o.disconnect(), e = null;
  }
  function a(o, l) {
    o === void 0 && (o = !1), l === void 0 && (l = 1), i();
    const c = r.getBoundingClientRect(), {
      left: d,
      top: f,
      width: p,
      height: m
    } = c;
    if (o || t(), !p || !m)
      return;
    const b = Kn(f), v = Kn(n.clientWidth - (d + p)), w = Kn(n.clientHeight - (f + m)), S = Kn(d), D = {
      rootMargin: -b + "px " + -v + "px " + -w + "px " + -S + "px",
      threshold: ht(0, Pt(1, l)) || 1
    };
    let L = !0;
    function C(N) {
      const R = N[0].intersectionRatio;
      if (R !== l) {
        if (!L)
          return a();
        R ? a(!1, R) : s = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      R === 1 && !wl(c, r.getBoundingClientRect()) && a(), L = !1;
    }
    try {
      e = new IntersectionObserver(C, {
        ...D,
        // Handle <iframe>s
        root: n.ownerDocument
      });
    } catch {
      e = new IntersectionObserver(C, D);
    }
    e.observe(r);
  }
  return a(!0), i;
}
function ku(r, t, e, s) {
  s === void 0 && (s = {});
  const {
    ancestorScroll: n = !0,
    ancestorResize: i = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: o = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = s, c = ba(r), d = n || i ? [...c ? on(c) : [], ...on(t)] : [];
  d.forEach((S) => {
    n && S.addEventListener("scroll", e, {
      passive: !0
    }), i && S.addEventListener("resize", e);
  });
  const f = c && o ? Iu(c, e) : null;
  let p = -1, m = null;
  a && (m = new ResizeObserver((S) => {
    let [A] = S;
    A && A.target === c && m && (m.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var D;
      (D = m) == null || D.observe(t);
    })), e();
  }), c && !l && m.observe(c), m.observe(t));
  let b, v = l ? $e(r) : null;
  l && w();
  function w() {
    const S = $e(r);
    v && !wl(v, S) && e(), v = S, b = requestAnimationFrame(w);
  }
  return e(), () => {
    var S;
    d.forEach((A) => {
      n && A.removeEventListener("scroll", e), i && A.removeEventListener("resize", e);
    }), f == null || f(), (S = m) == null || S.disconnect(), m = null, l && cancelAnimationFrame(b);
  };
}
const oo = su, Nu = nu, Ou = Zc, qu = iu, Mu = Xc, Ru = Wc, _u = Jc, $u = (r, t, e) => {
  const s = /* @__PURE__ */ new Map(), n = {
    platform: Lu,
    ...e
  }, i = {
    ...n.platform,
    _c: s
  };
  return Yc(r, t, {
    ...n,
    platform: i
  });
};
class wt {
  constructor() {
    this.floatingElements = /* @__PURE__ */ new Map(), this.bindEvents();
  }
  static getInstance() {
    return wt.instance || (wt.instance = new wt()), wt.instance;
  }
  /**
   * Create a floating element with proper anchoring to trigger
   */
  createFloating(t, e, s = {}) {
    if (s.useFloating === !1)
      return this.createFallbackFloating(t, e, s);
    const n = this.generateFloatingId(), i = [];
    if (s.offset !== void 0 ? i.push(oo(s.offset)) : i.push(oo(8)), s.inline) {
      const f = typeof s.inline == "object" ? s.inline : {};
      i.push(_u(f));
    }
    if (s.flip !== !1) {
      const f = typeof s.flip == "object" ? s.flip : {};
      i.push(Ou({
        boundary: f.boundary || s.boundary,
        rootBoundary: f.rootBoundary || s.rootBoundary || "viewport",
        fallbackPlacements: f.fallbackPlacements || this.getFallbackPlacements(s.placement || "bottom"),
        fallbackStrategy: f.fallbackStrategy || s.fallbackStrategy || "bestFit",
        padding: f.padding || 8
      }));
    }
    if (s.shift !== !1) {
      const f = typeof s.shift == "object" ? s.shift : {};
      i.push(Nu({
        boundary: f.boundary || s.boundary,
        rootBoundary: f.rootBoundary || s.rootBoundary || "viewport",
        padding: f.padding || 8,
        limiter: f.limiter,
        crossAxis: f.crossAxis !== !1
      }));
    }
    if (s.size) {
      const f = typeof s.size == "object" ? s.size : {};
      i.push(qu({
        boundary: f.boundary || s.boundary,
        rootBoundary: f.rootBoundary || s.rootBoundary || "viewport",
        padding: f.padding || 8,
        apply: f.apply || (({ availableWidth: p, availableHeight: m }) => {
          Object.assign(e.style, {
            maxWidth: `${p}px`,
            maxHeight: `${m}px`
          });
        })
      }));
    }
    if (s.hide !== !1) {
      const f = typeof s.hide == "object" ? s.hide : {};
      i.push(Mu({
        strategy: f.strategy || "referenceHidden",
        boundary: f.boundary || s.boundary,
        rootBoundary: f.rootBoundary || s.rootBoundary || "viewport",
        padding: f.padding || 8
      }));
    }
    s.arrow && s.arrow !== !0 && i.push(Ru({ element: s.arrow }));
    const a = async () => {
      const { x: f, y: p, placement: m, middlewareData: b } = await $u(t, e, {
        placement: s.placement || "bottom-start",
        strategy: s.strategy || "absolute",
        middleware: i
      }), v = this.floatingElements.get(n);
      if (v && (v.x = f, v.y = p, v.placement = m, v.middlewareData = b), Object.assign(e.style, {
        left: `${f}px`,
        top: `${p}px`,
        position: s.strategy || "absolute"
      }), e.setAttribute("data-floating-placement", m), b.hide) {
        const { referenceHidden: w, escaped: S } = b.hide;
        e.style.visibility = w || S ? "hidden" : "visible";
      }
      if (s.arrow && s.arrow !== !0 && b.arrow) {
        const w = s.arrow, { x: S, y: A } = b.arrow, D = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[m.split("-")[0]];
        Object.assign(w.style, {
          left: S != null ? `${S}px` : "",
          top: A != null ? `${A}px` : "",
          right: "",
          bottom: "",
          [D]: "-4px"
        });
      }
    }, o = s.autoUpdate !== !1 ? typeof s.autoUpdate == "object" ? s.autoUpdate : {} : null;
    let l = null;
    o && (l = ku(t, e, a, {
      ancestorScroll: o.ancestorScroll !== !1,
      ancestorResize: o.ancestorResize !== !1,
      elementResize: o.elementResize !== !1,
      layoutShift: o.layoutShift !== !1,
      animationFrame: o.animationFrame === !0
    }));
    const d = {
      id: n,
      trigger: t,
      floating: e,
      cleanup: () => {
        l && l(), this.destroyFloating(n);
      },
      update: a
    };
    return this.floatingElements.set(n, d), a(), d;
  }
  /**
   * Create fallback floating element when Floating UI is disabled
   * Uses CSS-based positioning as fallback
   */
  createFallbackFloating(t, e, s = {}) {
    const n = this.generateFloatingId(), i = async () => {
      const c = t.getBoundingClientRect(), d = e.getBoundingClientRect();
      let f = 0, p = 0;
      const m = s.placement || "bottom-start", b = typeof s.offset == "number" ? s.offset : 8;
      m.startsWith("bottom") ? f = c.bottom + b : m.startsWith("top") ? f = c.top - d.height - b : m.startsWith("right") ? p = c.right + b : m.startsWith("left") && (p = c.left - d.width - b), m.includes("start") ? m.startsWith("top") || m.startsWith("bottom") ? p = c.left : f = c.top : m.includes("end") ? m.startsWith("top") || m.startsWith("bottom") ? p = c.right - d.width : f = c.bottom - d.height : m.startsWith("top") || m.startsWith("bottom") ? p = c.left + (c.width - d.width) / 2 : f = c.top + (c.height - d.height) / 2, Object.assign(e.style, {
        position: "fixed",
        top: `${f}px`,
        left: `${p}px`
      }), e.setAttribute("data-floating-placement", m);
    }, o = {
      id: n,
      trigger: t,
      floating: e,
      cleanup: () => {
        this.destroyFloating(n);
      },
      update: i
    };
    this.floatingElements.set(n, o), i();
    const l = () => i();
    return window.addEventListener("resize", l), window.addEventListener("scroll", l, !0), o.cleanup = () => {
      window.removeEventListener("resize", l), window.removeEventListener("scroll", l, !0), this.destroyFloating(n);
    }, o;
  }
  /**
   * Destroy a specific floating element
   */
  destroyFloating(t) {
    this.floatingElements.get(t) && this.floatingElements.delete(t);
  }
  /**
   * Destroy all floating elements
   */
  destroyAllFloating() {
    this.floatingElements.forEach((t) => {
      t.cleanup();
    }), this.floatingElements.clear();
  }
  /**
   * Get a floating instance by ID
   */
  getFloating(t) {
    return this.floatingElements.get(t);
  }
  /**
   * Update all floating elements
   */
  async updateAllFloating() {
    const t = Array.from(this.floatingElements.values()).map(
      (e) => e.update()
    );
    await Promise.all(t);
  }
  /**
   * Generate unique floating ID
   */
  generateFloatingId() {
    return `floating-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  /**
   * Get fallback placements for flip middleware
   */
  getFallbackPlacements(t) {
    return {
      bottom: ["top", "bottom-end", "bottom-start"],
      "bottom-start": ["top-start", "bottom-end", "bottom"],
      "bottom-end": ["top-end", "bottom-start", "bottom"],
      top: ["bottom", "top-end", "top-start"],
      "top-start": ["bottom-start", "top-end", "top"],
      "top-end": ["bottom-end", "top-start", "top"],
      right: ["left", "right-end", "right-start"],
      "right-start": ["left-start", "right-end", "right"],
      "right-end": ["left-end", "right-start", "right"],
      left: ["right", "left-end", "left-start"],
      "left-start": ["right-start", "left-end", "left"],
      "left-end": ["right-end", "left-start", "left"]
    }[t] || ["bottom", "top", "right", "left"];
  }
  /**
   * Bind global events for floating management
   */
  bindEvents() {
    window.addEventListener("beforeunload", () => {
      this.destroyAllFloating();
    }), document.addEventListener("keydown", (t) => {
      t.key;
    });
  }
  /**
   * Cleanup manager and all floating elements
   */
  destroy() {
    this.destroyAllFloating();
  }
}
const Bb = wt.getInstance();
class ya extends K {
  /**
   * Initialize select elements - required by BaseActionClass
   */
  initializeElements() {
    h.findByDataAttribute("select", "true").forEach((t) => {
      this.initializeSelect(t);
    });
  }
  /**
   * Initialize a single select element
   */
  initializeSelect(t) {
    const e = t.dataset.multiple === "true", s = t.dataset.value;
    let n = [];
    if (s)
      try {
        n = e ? JSON.parse(s) : [s];
      } catch {
        n = e ? [] : [s];
      }
    const i = {
      isOpen: !1,
      selectedValues: n,
      searchTerm: "",
      focusedIndex: -1,
      filteredOptions: []
    };
    this.setState(t, i), this.updateOptions(t), this.updateOptionsSelectedState(t), this.updateDisplay(t);
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("[data-remove-chip], [data-select-clear], [data-select-option], [data-select-trigger]", (t, e) => {
      if (t.matches("[data-remove-chip]")) {
        e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
        const s = t.dataset.removeChip, n = h.findClosest(t, '[data-select="true"]');
        n && s && this.removeChip(n, s);
        return;
      }
      if (t.matches("[data-select-clear]")) {
        e.preventDefault(), e.stopPropagation();
        const s = h.findClosest(t, '[data-select="true"]');
        s && this.clearSelection(s);
        return;
      }
      if (t.matches("[data-select-option]")) {
        e.preventDefault(), e.stopPropagation();
        const s = h.findClosest(t, '[data-select="true"]');
        s && this.selectOption(s, t);
        return;
      }
      if (t.matches("[data-select-trigger]")) {
        e.preventDefault(), e.stopPropagation();
        const s = h.findClosest(t, '[data-select="true"]');
        s && !this.isDisabled(s) && this.toggleDropdown(s);
        return;
      }
    }), x.addEventListener(document, "click", (t) => {
      const e = t.target;
      if (e && e instanceof Element) {
        const s = e.closest('[data-select="true"], [data-select-dropdown], [data-select-search], [data-remove-chip], [data-select-clear], [data-select-option], [data-select-trigger]'), n = e.matches("input, button") && e.closest('[data-select="true"]');
        if (s || n)
          return;
        this.closeAllDropdowns();
      }
    }), x.handleDelegatedInput('input[type="text"]', (t, e) => {
      const s = h.findClosest(t, '[data-select="true"]'), n = s && s.dataset.searchable === "true", i = t.closest("[data-select-dropdown]");
      s && n && i && this.handleSearch(s, t.value);
    }), x.handleDelegatedKeydown('[data-select="true"]', (t, e) => {
      this.handleKeydown(t, e);
    }), x.handleDelegatedFocus('[data-select="true"]', (t, e) => {
      this.isOpen(t);
    });
  }
  /**
   * Setup dynamic observer for new selects - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.hasDataAttribute(s, "select", "true") && (this.hasState(s) || this.initializeSelect(s)), h.findByDataAttribute("select", "true", s).forEach((i) => {
            this.hasState(i) || this.initializeSelect(i);
          });
        }
      });
    });
  }
  /**
   * Toggle dropdown open/closed state
   */
  toggleDropdown(t) {
    const e = this.getState(t);
    e && (e.isOpen ? this.closeDropdown(t) : this.openDropdown(t));
  }
  /**
   * Open dropdown
   */
  openDropdown(t) {
    const e = this.getState(t);
    if (!e || this.isDisabled(t)) return;
    this.closeAllDropdowns(), e.isOpen = !0, this.setState(t, e);
    const s = h.querySelector("[data-select-dropdown]", t), n = h.querySelector("[data-select-trigger]", t), i = h.querySelector("[data-select-search]", t);
    if (s && (s.classList.remove("hidden"), this.isFloatingEnabled(t) ? this.setupFloating(t, s) : this.positionDropdown(t)), n) {
      n.setAttribute("aria-expanded", "true");
      const a = h.querySelector(".select-arrow", n);
      a && a.classList.add("rotate-180");
    }
    i && t.dataset.searchable === "true" && B.createTimer(() => i.focus(), 10), this.updateFilteredOptions(t), this.dispatchSelectEvent(t, "select:open");
  }
  /**
   * Close dropdown
   */
  closeDropdown(t) {
    const e = this.getState(t);
    if (!e || !e.isOpen)
      return;
    this.cleanupFloating(t), e.isOpen = !1, e.searchTerm = "", e.focusedIndex = -1, this.setState(t, e);
    const s = h.querySelector("[data-select-dropdown]", t), n = h.querySelector("[data-select-trigger]", t), i = h.querySelector("[data-select-search]", t);
    if (s && s.classList.add("hidden"), n) {
      n.setAttribute("aria-expanded", "false");
      const a = h.querySelector(".select-arrow", n);
      a && a.classList.remove("rotate-180");
    }
    i && (i.value = ""), this.handleSearch(t, ""), this.dispatchSelectEvent(t, "select:close");
  }
  /**
   * Close all open dropdowns
   */
  closeAllDropdowns() {
    this.getAllStates().forEach((t, e) => {
      t.isOpen && this.closeDropdown(e);
    });
  }
  /**
   * Handle option selection
   */
  selectOption(t, e) {
    const s = this.getState(t), n = e.dataset.value;
    if (!s || !n || e.getAttribute("aria-disabled") === "true")
      return;
    const i = t.dataset.multiple === "true";
    if (i) {
      const a = s.selectedValues.indexOf(n);
      a > -1 ? s.selectedValues.splice(a, 1) : s.selectedValues.push(n);
    } else
      s.selectedValues = [n], this.closeDropdown(t);
    this.setState(t, s), this.updateDisplay(t), this.updateHiddenInputs(t), this.updateOptionsSelectedState(t), this.dispatchSelectEvent(t, "select:change", {
      value: i ? s.selectedValues : n,
      selectedValues: s.selectedValues
    });
  }
  /**
   * Remove chip (for multiple selection)
   */
  removeChip(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const n = s.selectedValues.indexOf(e);
    n > -1 && (s.selectedValues.splice(n, 1), this.setState(t, s), this.updateDisplay(t), this.updateHiddenInputs(t), this.updateOptionsSelectedState(t), this.dispatchSelectEvent(t, "select:change", {
      value: s.selectedValues,
      selectedValues: s.selectedValues
    }));
  }
  /**
   * Clear all selections
   */
  clearSelection(t) {
    const e = this.getState(t);
    e && (e.selectedValues = [], this.setState(t, e), this.updateDisplay(t), this.updateHiddenInputs(t), this.updateOptionsSelectedState(t), this.dispatchSelectEvent(t, "select:change", {
      value: t.dataset.multiple === "true" ? [] : "",
      selectedValues: []
    }));
  }
  /**
   * Handle search functionality
   */
  handleSearch(t, e) {
    const s = this.getState(t);
    s && (s.searchTerm = e.toLowerCase(), this.setState(t, s), this.updateFilteredOptions(t), this.updateOptionsVisibility(t));
  }
  /**
   * Update filtered options based on search term
   */
  updateFilteredOptions(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = this.getAllOptions(t);
    e.searchTerm ? e.filteredOptions = s.filter(
      (n) => n.searchableText.includes(e.searchTerm)
    ) : e.filteredOptions = s, this.setState(t, e);
  }
  /**
   * Update options visibility based on filter
   */
  updateOptionsVisibility(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = h.querySelectorAll("[data-select-option]", t), n = h.querySelector("[data-select-no-results]", t);
    let i = 0;
    s.forEach((a) => {
      const o = a, l = o.dataset.value || "";
      e.filteredOptions.some((d) => d.value === l) ? (o.style.display = "", i++) : o.style.display = "none";
    }), n && (i === 0 && e.searchTerm ? n.classList.remove("hidden") : n.classList.add("hidden"));
  }
  /**
   * Handle keyboard navigation
   */
  handleKeydown(t, e) {
    const s = this.getState(t);
    if (s)
      switch (e.key) {
        case "Enter":
        case " ":
          if (!s.isOpen)
            e.preventDefault(), this.openDropdown(t);
          else if (s.focusedIndex >= 0) {
            e.preventDefault();
            const n = s.filteredOptions[s.focusedIndex];
            n && this.selectOption(t, n.element);
          }
          break;
        case "Escape":
          if (s.isOpen) {
            e.preventDefault(), this.closeDropdown(t);
            const n = h.querySelector("[data-select-trigger]", t);
            n && n.focus();
          }
          break;
        case "ArrowDown":
          s.isOpen ? (e.preventDefault(), this.navigateOptions(t, 1)) : (e.preventDefault(), this.openDropdown(t));
          break;
        case "ArrowUp":
          s.isOpen && (e.preventDefault(), this.navigateOptions(t, -1));
          break;
        case "Tab":
          s.isOpen && this.closeDropdown(t);
          break;
      }
  }
  /**
   * Navigate through options with arrow keys
   */
  navigateOptions(t, e) {
    const s = this.getState(t);
    if (!s || !s.isOpen) return;
    const n = s.filteredOptions.length;
    n !== 0 && (s.focusedIndex === -1 ? s.focusedIndex = e > 0 ? 0 : n - 1 : (s.focusedIndex += e, s.focusedIndex >= n ? s.focusedIndex = 0 : s.focusedIndex < 0 && (s.focusedIndex = n - 1)), this.setState(t, s), this.updateOptionFocus(t));
  }
  /**
   * Update visual focus state of options
   */
  updateOptionFocus(t) {
    const e = this.getState(t);
    if (!e) return;
    h.querySelectorAll("[data-select-option]", t).forEach((n, i) => {
      const a = n;
      i === e.focusedIndex ? (a.classList.add("bg-neutral-100", "dark:bg-neutral-800"), a.scrollIntoView({ block: "nearest" })) : a.classList.remove("bg-neutral-100", "dark:bg-neutral-800");
    });
  }
  /**
   * Update display of selected values
   */
  updateDisplay(t) {
    if (!this.getState(t)) return;
    t.dataset.multiple === "true" ? this.updateChipsDisplay(t) : this.updateSingleValueDisplay(t);
  }
  /**
   * Update chips display for multiple selection using Badge components
   */
  updateChipsDisplay(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = h.querySelector("[data-select-chips]", t);
    if (s)
      if (s.innerHTML = "", e.selectedValues.length === 0) {
        const n = t.dataset.placeholder || "Select options...";
        s.innerHTML = `<span class="text-neutral-500 select-placeholder">${n}</span>`;
      } else
        e.selectedValues.forEach((n) => {
          const i = this.findOptionByValue(t, n), a = i ? i.displayLabel : n, o = t.dataset.clearable === "true" && !this.isDisabled(t), l = `select-chip-${this.generateChipId(n)}`, c = document.createElement("button");
          c.type = "button", c.className = "inline-flex items-center gap-1 font-medium cursor-pointer transition-colors px-1.5 py-0.5 text-xs rounded-sm", c.style.cssText = `
                    background-color: var(--color-brand-50);
                    color: var(--color-brand-700);
                    border: 1px solid var(--color-brand-200);
                `, c.setAttribute("data-chip-value", n), c.setAttribute("data-remove-chip", n), c.setAttribute("data-dismiss-target", `#${l}`), c.setAttribute("aria-label", "Remove badge"), c.id = l, c.addEventListener("mouseenter", () => {
            c.style.backgroundColor = "var(--color-brand-100)";
          }), c.addEventListener("mouseleave", () => {
            c.style.backgroundColor = "var(--color-brand-50)";
          });
          const d = document.createElement("span");
          if (d.textContent = a, c.appendChild(d), o) {
            const f = document.createElement("span");
            f.className = "text-brand-600 hover:text-brand-700 ml-1 flex-shrink-0 font-bold leading-none", f.textContent = "×", f.setAttribute("aria-hidden", "true"), c.appendChild(f);
            const p = document.createElement("span");
            p.className = "sr-only", p.textContent = "Remove badge", c.appendChild(p);
          }
          s.appendChild(c);
        });
  }
  /**
   * Update single value display
   */
  updateSingleValueDisplay(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = h.querySelector(".select-value", t);
    if (s)
      if (e.selectedValues.length === 0) {
        const n = t.dataset.placeholder || "Select option...";
        s.innerHTML = `<span class="text-neutral-500 select-placeholder">${n}</span>`;
      } else {
        const n = e.selectedValues[0], i = this.findOptionByValue(t, n), a = i ? i.displayLabel : n;
        s.textContent = a;
      }
  }
  /**
   * Update hidden form inputs
   */
  updateHiddenInputs(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = t.dataset.multiple === "true", n = t.dataset.name;
    if (!n) return;
    if (h.querySelectorAll(".select-hidden-input", t).forEach((a) => a.remove()), s)
      e.selectedValues.forEach((a) => {
        const o = document.createElement("input");
        o.type = "hidden", o.name = `${n}[]`, o.value = a, o.className = "select-hidden-input", t.appendChild(o);
      });
    else {
      const a = document.createElement("input");
      a.type = "hidden", a.name = n, a.value = e.selectedValues[0] || "", a.className = "select-hidden-input", t.appendChild(a);
    }
  }
  /**
   * Update options selected state attributes
   */
  updateOptionsSelectedState(t) {
    const e = this.getState(t);
    if (!e) return;
    h.querySelectorAll("[data-select-option]", t).forEach((n) => {
      var l, c, d, f;
      const i = n, a = i.dataset.value || "", o = e.selectedValues.includes(a);
      if (i.setAttribute("aria-selected", o ? "true" : "false"), o) {
        i.classList.add("bg-brand-50", "text-brand-700", "dark:bg-brand-900/20", "dark:text-brand-300");
        const p = h.querySelector(".text-brand-600", i);
        p && ((l = p.parentElement) == null || l.classList.remove("opacity-0"), (c = p.parentElement) == null || c.classList.add("opacity-100"));
      } else {
        i.classList.remove("bg-brand-50", "text-brand-700", "dark:bg-brand-900/20", "dark:text-brand-300");
        const p = h.querySelector(".text-brand-600", i);
        p && ((d = p.parentElement) == null || d.classList.add("opacity-0"), (f = p.parentElement) == null || f.classList.remove("opacity-100"));
      }
    });
  }
  /**
   * Update options list
   */
  updateOptions(t) {
    const e = this.getAllOptions(t), s = this.getState(t);
    s && (s.filteredOptions = e, this.setState(t, s));
  }
  /**
   * Get all options from select element
   */
  getAllOptions(t) {
    const e = h.querySelectorAll("[data-select-option]", t);
    return Array.from(e).map((s) => {
      var a, o;
      const n = s, i = n.dataset.displayLabel || ((a = n.textContent) == null ? void 0 : a.trim()) || "";
      return {
        element: n,
        value: n.dataset.value || "",
        label: ((o = n.textContent) == null ? void 0 : o.trim()) || "",
        displayLabel: i,
        searchableText: n.dataset.searchableText || "",
        disabled: n.getAttribute("aria-disabled") === "true"
      };
    });
  }
  /**
   * Find option by value
   */
  findOptionByValue(t, e) {
    return this.getAllOptions(t).find((n) => n.value === e) || null;
  }
  /**
   * Position dropdown relative to trigger
   */
  positionDropdown(t) {
    const e = h.querySelector("[data-select-dropdown]", t), s = h.querySelector("[data-select-trigger]", t);
    if (!e || !s) return;
    const n = s.getBoundingClientRect(), i = e.getBoundingClientRect(), o = window.innerHeight - n.bottom, l = n.top, c = i.height || 240;
    o < c && l > c ? (e.style.bottom = "100%", e.style.top = "auto", e.style.marginBottom = "4px", e.style.marginTop = "0") : (e.style.top = "100%", e.style.bottom = "auto", e.style.marginTop = "4px", e.style.marginBottom = "0");
  }
  /**
   * Reposition all open dropdowns
   */
  repositionDropdowns() {
    this.getAllStates().forEach((t, e) => {
      t.isOpen && this.positionDropdown(e);
    });
  }
  /**
   * Check if select is disabled
   */
  isDisabled(t) {
    return t.dataset.disabled === "true";
  }
  /**
   * Check if dropdown is open
   */
  isOpen(t) {
    const e = this.getState(t);
    return e ? e.isOpen : !1;
  }
  /**
   * Generate unique chip ID for a value
   */
  generateChipId(t) {
    return btoa(t).replace(/[^a-zA-Z0-9]/g, "").substring(0, 8) + Date.now().toString(36);
  }
  /**
   * Dispatch custom select event
   */
  dispatchSelectEvent(t, e, s = null) {
    x.dispatchCustomEvent(t, e, {
      select: t,
      ...s
    }, {
      bubbles: !0
    });
  }
  /**
   * Get select state (for external access)
   */
  getSelectState(t) {
    return this.getState(t) || null;
  }
  /**
   * Set selected values programmatically
   */
  setSelectedValues(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const n = t.dataset.multiple === "true";
    s.selectedValues = n ? e : e.slice(0, 1), this.setState(t, s), this.updateDisplay(t), this.updateHiddenInputs(t), this.updateOptionsSelectedState(t), this.dispatchSelectEvent(t, "select:change", {
      value: n ? s.selectedValues : s.selectedValues[0] || "",
      selectedValues: s.selectedValues
    });
  }
  /**
   * Check if floating is enabled for select (always true now)
   */
  isFloatingEnabled(t) {
    return !0;
  }
  /**
   * Setup floating for dropdown using Floating UI
   */
  setupFloating(t, e) {
    const s = this.getState(t);
    if (!s) return;
    this.cleanupFloating(t);
    const n = h.querySelector("[data-select-trigger]", t);
    if (!n) return;
    const i = t.dataset.floatingPlacement || "bottom-start", a = parseInt(t.dataset.floatingOffset || "4", 10), o = wt.getInstance().createFloating(n, e, {
      placement: i,
      offset: a,
      flip: {
        fallbackStrategy: "bestFit",
        padding: 8
      },
      shift: {
        padding: 8,
        crossAxis: !0
      },
      size: {
        apply: ({ availableHeight: l }) => {
          const c = h.querySelector("[data-select-options]", e);
          c && Object.assign(c.style, {
            maxHeight: `${Math.min(l - 20, 320)}px`,
            overflowY: "auto"
          });
        }
      },
      hide: {
        strategy: "escaped"
      },
      autoUpdate: {
        ancestorScroll: !0,
        ancestorResize: !0,
        elementResize: !0,
        layoutShift: !0
      }
    });
    s.floating = o, this.setState(t, s);
  }
  /**
   * Clean up floating for select
   */
  cleanupFloating(t) {
    const e = this.getState(t);
    e && (e.floating && (e.floating.cleanup(), e.floating = void 0), this.setState(t, e));
  }
  /**
   * Clean up SelectActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.getAllStates().forEach((t, e) => {
      this.cleanupFloating(e);
    });
  }
}
ya.getInstance();
class va extends K {
  constructor() {
    super(...arguments), this.resizeCleanup = null;
  }
  /**
   * Initialize tabs elements - required by BaseActionClass
   */
  initializeElements() {
    h.findByDataAttribute("tabs", "true").forEach((t) => {
      this.initializeTabsElement(t);
    });
  }
  /**
   * Initialize a single tabs element
   */
  initializeTabsElement(t) {
    const e = t.dataset.orientation || "horizontal", s = t.dataset.variant || "default", n = t.dataset.disabled === "true", i = t.dataset.value, a = Array.from(h.querySelectorAll('[data-tabs-trigger="true"]', t)), o = Array.from(h.querySelectorAll('[data-tabs-panel="true"]', t));
    let l = i || null;
    if (!l && a.length > 0) {
      const d = a.find((f) => f.getAttribute("aria-disabled") !== "true");
      l = (d == null ? void 0 : d.dataset.value) || null;
    }
    const c = {
      activeTab: l,
      tabs: a,
      panels: o,
      orientation: e,
      variant: s,
      disabled: n
    };
    this.setState(t, c), this.updateTabsState(t), this.initializeMarker(t), t.classList.add("tabs-initialized");
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick('[data-tabs-trigger="true"]', (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-tabs="true"]');
      s && t.getAttribute("aria-disabled") !== "true" && this.activateTab(s, t.dataset.value || "");
    }), x.handleDelegatedKeydown('[data-tabs-trigger="true"]', (t, e) => {
      const s = h.findClosest(t, '[data-tabs="true"]');
      s && this.handleKeydown(s, e);
    }), this.resizeCleanup = x.handleResize(() => {
      this.handleResize();
    }, 100);
  }
  /**
   * Setup dynamic observer for new tabs - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.hasDataAttribute(s, "tabs", "true") && (this.hasState(s) || this.initializeTabsElement(s)), h.findByDataAttribute("tabs", "true", s).forEach((i) => {
            this.hasState(i) || this.initializeTabsElement(i);
          });
        }
      });
    });
  }
  /**
   * Activate a specific tab
   */
  activateTab(t, e, s = !1) {
    const n = this.getState(t);
    if (!n || n.disabled) return;
    const i = n.tabs.find((o) => o.dataset.value === e);
    if (!i || i.getAttribute("aria-disabled") === "true")
      return;
    const a = n.activeTab;
    n.activeTab = e, this.setState(t, n), this.updateTabsState(t), this.repositionMarker(t, i), s && i.focus(), x.dispatchCustomEvent(t, "tabs:change", {
      tabs: t,
      activeTab: e,
      previousTab: a
    });
  }
  /**
   * Update tabs visual state and panel visibility
   */
  updateTabsState(t) {
    const e = this.getState(t);
    e && (e.tabs.forEach((s) => {
      const n = s.dataset.value === e.activeTab, i = s.getAttribute("aria-disabled") === "true";
      s.setAttribute("aria-selected", n ? "true" : "false"), s.setAttribute("data-state", n ? "active" : "inactive"), i ? s.setAttribute("tabindex", "-1") : n ? s.setAttribute("tabindex", "0") : s.setAttribute("tabindex", "-1"), s.id = `tab-${s.dataset.value}`;
    }), e.panels.forEach((s) => {
      const n = s.dataset.value === e.activeTab;
      s.setAttribute("data-state", n ? "active" : "inactive"), s.style.display = n ? "block" : "none", s.setAttribute("aria-labelledby", `tab-${s.dataset.value}`);
    }));
  }
  /**
   * Handle keyboard navigation
   */
  handleKeydown(t, e) {
    const s = this.getState(t);
    if (!s || s.disabled) return;
    const n = e.target, i = s.tabs.indexOf(n);
    let a = -1;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault(), a = s.orientation === "horizontal" ? this.getPreviousEnabledTabIndex(s, i) : e.key === "ArrowUp" ? this.getPreviousEnabledTabIndex(s, i) : i;
        break;
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault(), a = s.orientation === "horizontal" ? this.getNextEnabledTabIndex(s, i) : e.key === "ArrowDown" ? this.getNextEnabledTabIndex(s, i) : i;
        break;
      case "Home":
        e.preventDefault(), a = this.getFirstEnabledTabIndex(s);
        break;
      case "End":
        e.preventDefault(), a = this.getLastEnabledTabIndex(s);
        break;
      case "Enter":
      case " ":
        e.preventDefault(), n.dataset.value && this.activateTab(t, n.dataset.value, !0);
        return;
    }
    if (a >= 0 && a < s.tabs.length) {
      const o = s.tabs[a];
      o.dataset.value && this.activateTab(t, o.dataset.value, !0);
    }
  }
  /**
   * Get next enabled tab index
   */
  getNextEnabledTabIndex(t, e) {
    for (let s = 1; s < t.tabs.length; s++) {
      const n = (e + s) % t.tabs.length;
      if (t.tabs[n].getAttribute("aria-disabled") !== "true")
        return n;
    }
    return e;
  }
  /**
   * Get previous enabled tab index
   */
  getPreviousEnabledTabIndex(t, e) {
    for (let s = 1; s < t.tabs.length; s++) {
      const n = (e - s + t.tabs.length) % t.tabs.length;
      if (t.tabs[n].getAttribute("aria-disabled") !== "true")
        return n;
    }
    return e;
  }
  /**
   * Get first enabled tab index
   */
  getFirstEnabledTabIndex(t) {
    for (let e = 0; e < t.tabs.length; e++)
      if (t.tabs[e].getAttribute("aria-disabled") !== "true")
        return e;
    return 0;
  }
  /**
   * Get last enabled tab index
   */
  getLastEnabledTabIndex(t) {
    for (let e = t.tabs.length - 1; e >= 0; e--)
      if (t.tabs[e].getAttribute("aria-disabled") !== "true")
        return e;
    return t.tabs.length - 1;
  }
  /**
   * Get tabs state (for external access)
   */
  getTabsState(t) {
    return this.getState(t) || null;
  }
  /**
   * Set active tab programmatically
   */
  setActiveTab(t, e, s = !1) {
    this.activateTab(t, e, s);
  }
  /**
   * Initialize marker position for the active tab
   */
  initializeMarker(t) {
    const e = this.getState(t);
    if (!e || !e.activeTab) return;
    const s = e.tabs.find((n) => n.dataset.value === e.activeTab);
    s && B.createTimer(() => {
      this.repositionMarker(t, s);
    }, 10);
  }
  /**
   * Reposition marker to match the given tab
   */
  repositionMarker(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const n = h.querySelector('[data-tab-marker="true"]', t);
    if (!n) return;
    const { orientation: i, variant: a } = s;
    i === "vertical" ? this.repositionVerticalMarker(n, e, a) : this.repositionHorizontalMarker(n, e, a);
  }
  /**
   * Reposition marker for horizontal orientation
   */
  repositionHorizontalMarker(t, e, s) {
    const n = e.offsetWidth, i = e.offsetLeft;
    if (t.style.width = `${n}px`, s === "pills") {
      const a = e.offsetHeight, o = e.offsetTop;
      t.style.height = `${a}px`, t.style.transform = `translate(${i}px, ${o}px)`;
    } else
      t.style.transform = `translateX(${i}px)`;
  }
  /**
   * Reposition marker for vertical orientation
   */
  repositionVerticalMarker(t, e, s) {
    const n = e.offsetHeight, i = e.offsetTop;
    if (t.style.height = `${n}px`, s === "pills") {
      const a = e.offsetWidth, o = e.offsetLeft;
      t.style.width = `${a}px`, t.style.transform = `translate(${o}px, ${i}px)`;
    } else
      t.style.transform = `translateY(${i}px)`;
  }
  /**
   * Handle window resize - reposition all markers
   */
  handleResize() {
    this.getAllStates().forEach((t, e) => {
      if (t.activeTab) {
        const s = t.tabs.find((n) => n.dataset.value === t.activeTab);
        s && this.repositionMarker(e, s);
      }
    });
  }
  /**
   * Clean up TabsActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.resizeCleanup && (this.resizeCleanup(), this.resizeCleanup = null);
  }
}
va.getInstance();
class wa extends K {
  /**
   * Initialize modal elements - required by BaseActionClass
   */
  initializeElements() {
    h.querySelectorAll("dialog[data-modal]").forEach((t) => {
      this.initializeModal(t);
    }), this.setupLivewireIntegration();
  }
  /**
   * Initialize a single modal element
   */
  initializeModal(t) {
    if (this.hasState(t))
      return;
    const e = {
      lastFocusedElement: null,
      isAnimating: !1
    };
    this.setState(t, e), t.addEventListener("close", () => {
      this.handleModalClose(t);
    }), t.addEventListener("cancel", (s) => {
      this.handleModalCancel(t, s);
    });
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("[commandfor]", (t, e) => {
      const s = t.getAttribute("command"), n = t.getAttribute("commandfor");
      if (s === "show-modal" && n) {
        const i = h.getElementById(n);
        i && i.matches("dialog[data-modal]") && this.handleModalOpen(i, t);
      }
    }), x.handleDelegatedClick("[data-modal-close]", (t, e) => {
      const s = h.findClosest(t, "dialog[data-modal]");
      s && s.close();
    });
  }
  /**
   * Setup dynamic observer for new modals - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          s.matches && s.matches("dialog[data-modal]") && this.initializeModal(s), h.querySelectorAll("dialog[data-modal]", s).forEach((i) => {
            this.initializeModal(i);
          });
        }
      });
    });
  }
  /**
   * Handle modal cancel event (ESC key)
   */
  handleModalCancel(t, e) {
    this.dispatchModalEvent(t, "modal:cancel", { originalEvent: e });
  }
  /**
   * Set initial focus when modal opens
   */
  setInitialFocus(t) {
    const e = h.querySelector("[autofocus]", t);
    if (e) {
      e.focus();
      return;
    }
    const s = t.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    s.length > 0 && s[0].focus();
  }
  /**
   * Check if a modal is open
   */
  isModalOpen(t) {
    const e = h.getElementById(t);
    return e ? e.open : !1;
  }
  /**
   * Dispatch custom modal events
   */
  dispatchModalEvent(t, e, s = {}) {
    x.dispatchCustomEvent(t, e, {
      modal: t,
      ...s
    }, {
      bubbles: !0,
      cancelable: !0
    });
  }
  /**
   * Get modal state (for external access)
   */
  getModalState(t) {
    const e = h.getElementById(t);
    return e && this.getState(e) || null;
  }
  /**
   * Set up Livewire integration if available
   */
  setupLivewireIntegration() {
    typeof window.Livewire > "u" || (window.Livewire.on("openModal", (t) => {
      const e = t.id || t.modal;
      e && (this.openModal(e), t.wireModel && this.updateWireModel(e, !0));
    }), window.Livewire.on("closeModal", (t) => {
      const e = t.id || t.modal;
      e ? (this.closeModal(e), t.wireModel && this.updateWireModel(e, !1)) : this.closeAllModals();
    }), window.Livewire.on("toggleModal", (t) => {
      const e = t.id || t.modal;
      e && this.toggleModal(e);
    }));
  }
  /**
   * Update Livewire wire:model for modal state
   */
  updateWireModel(t, e) {
    var i;
    const s = h.getElementById(t);
    if (!s) return;
    const n = s.getAttribute("wire:model");
    if (n && typeof window.Livewire < "u" && window.Livewire.find) {
      const a = (i = h.findClosest(s, "[wire\\:id]")) == null ? void 0 : i.getAttribute("wire:id");
      if (a) {
        const o = window.Livewire.find(a);
        o && o.set(n, e);
      }
    }
  }
  /**
   * Toggle a modal's open state
   */
  toggleModal(t) {
    const e = h.getElementById(t);
    return !e || !e.matches("dialog[data-modal]") ? (console.warn(`Modal with id "${t}" not found`), !1) : e.open ? this.closeModal(t) : this.openModal(t);
  }
  /**
   * Close all open modals
   */
  closeAllModals() {
    h.querySelectorAll("dialog[data-modal][open]").forEach((t) => {
      t.id && this.closeModal(t.id);
    });
  }
  /**
   * Enhanced modal open with Livewire event dispatching
   */
  openModal(t, e) {
    const s = h.getElementById(t);
    return !s || !s.matches("dialog[data-modal]") ? (console.warn(`Modal with id "${t}" not found`), !1) : (this.handleModalOpen(s, e), s.showModal(), this.dispatchLivewireEvent("modalOpened", { id: t, modal: t }), !0);
  }
  /**
   * Enhanced modal close with Livewire event dispatching
   */
  closeModal(t) {
    const e = h.getElementById(t);
    return !e || !e.matches("dialog[data-modal]") ? (console.warn(`Modal with id "${t}" not found`), !1) : (e.close(), this.dispatchLivewireEvent("modalClosed", { id: t, modal: t }), !0);
  }
  /**
   * Dispatch Livewire events
   */
  dispatchLivewireEvent(t, e) {
    typeof window.Livewire < "u" && window.Livewire.dispatch && window.Livewire.dispatch(t, e);
  }
  /**
   * Handle modal close event with Livewire integration
   */
  handleModalClose(t) {
    const e = this.getState(t);
    if (!e) return;
    t.getAttribute("wire:model") && this.updateWireModel(t.id, !1), e.lastFocusedElement && document.contains(e.lastFocusedElement) && e.lastFocusedElement.focus(), e.lastFocusedElement = null, e.isAnimating = !1, this.setState(t, e), this.dispatchModalEvent(t, "modal:close"), this.dispatchLivewireEvent("modalClosed", { id: t.id, modal: t.id });
  }
  /**
   * Handle modal opening with Livewire integration
   */
  handleModalOpen(t, e) {
    const s = this.getState(t);
    if (!s) return;
    t.getAttribute("wire:model") && this.updateWireModel(t.id, !0), s.lastFocusedElement = e || document.activeElement, this.setState(t, s), this.dispatchModalEvent(t, "modal:open", { trigger: e }), this.dispatchLivewireEvent("modalOpened", { id: t.id, modal: t.id }), setTimeout(() => {
      this.setInitialFocus(t);
    }, 50);
  }
  /**
   * Clean up ModalActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
wa.getInstance();
class vs extends K {
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
    const t = document.documentElement;
    if (!this.hasState(t)) {
      const e = {
        toasts: /* @__PURE__ */ new Map(),
        containers: /* @__PURE__ */ new Map(),
        timers: /* @__PURE__ */ new Map(),
        pausedTimers: /* @__PURE__ */ new Map(),
        toastCounter: 0
      };
      this.setState(t, e);
    }
    this.discoverToasts();
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("[data-toast-dismiss]", (t, e) => {
      const s = t.getAttribute("data-toast-dismiss");
      s && (e.preventDefault(), e.stopPropagation(), this.dismiss(s));
    }), x.handleDelegatedClick("[data-toast-action]", (t, e) => {
      const s = t.getAttribute("data-toast-action"), n = h.findClosest(t, '[data-toast="true"]');
      s && n && (e.preventDefault(), e.stopPropagation(), this.dispatchToastEvent("toast:action", n.id, { action: s }));
    }), x.handleDelegatedEvent("mouseenter", '[data-toast="true"]', (t) => {
      this.pauseTimer(t.id);
    }), x.handleDelegatedEvent("mouseleave", '[data-toast="true"]', (t) => {
      this.resumeTimer(t.id);
    });
  }
  /**
   * Setup dynamic observer for new toast containers - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.hasDataAttribute(s, "toast-container") && this.discoverToasts(), h.findByDataAttribute("toast-container").forEach(() => {
            this.discoverToasts();
          });
        }
      });
    });
  }
  /**
   * Discover and register toast containers
   */
  discoverToasts() {
    const t = this.getGlobalState();
    t && h.findByDataAttribute("toast-container").forEach((e) => {
      const s = e.getAttribute("data-toast-container");
      s && t.containers.set(s, e);
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
  registerToast(t, e) {
    const s = this.getGlobalState();
    s && (s.toasts.set(t, e), this.setupToastListeners(e));
  }
  /**
   * Set up individual toast event listeners (no longer needed with event delegation)
   */
  setupToastListeners(t) {
  }
  /**
   * Setup Livewire integration
   */
  setupLivewireIntegration() {
    typeof window.Livewire > "u" || (window.Livewire.on("showToast", (t) => {
      const e = t.variant || "info";
      this.show(e, t);
    }), window.Livewire.on("hideToast", (t) => {
      t.id ? this.dismiss(t.id) : this.dismissAll();
    }));
  }
  /**
   * Show a toast programmatically
   */
  show(t, e = {}) {
    const s = this.getGlobalState();
    if (!s) return !1;
    const n = e.position || "top-right", i = s.containers.get(n);
    if (!i)
      return !1;
    const a = `toast-${t}-${n}-${++s.toastCounter}`, o = this.createToastElement(a, t, n, e);
    i.appendChild(o), B.fadeIn(o, {
      scale: !0,
      duration: 300,
      onComplete: () => {
        o.setAttribute("data-toast-visible", "true");
      }
    });
    const l = e.duration || 5e3;
    return !(e.persistent === !0) && l > 0 && this.setTimer(a, l), s.toasts.set(a, o), this.setupToastListeners(o), this.dispatchToastEvent("toast:show", a, e), !0;
  }
  /**
   * Create a toast element dynamically
   */
  createToastElement(t, e, s, n) {
    const i = e === "error" ? "danger" : e, a = document.createElement("div");
    return a.className = "pointer-events-auto transform transition-all duration-300 ease-out opacity-0 scale-95 translate-y-2", a.setAttribute("data-toast", "true"), a.setAttribute("data-toast-variant", e), a.setAttribute("data-toast-position", s), a.setAttribute("data-toast-visible", "false"), a.setAttribute("role", "alert"), a.setAttribute("aria-live", "polite"), a.id = t, a.innerHTML = `
            <div class="rounded-lg border p-4 space-y-3 ${this.getVariantClasses(i)}" role="alert" data-dismissible="true">
                <div class="flex">
                    <div class="flex-shrink-0 mt-1">
                        <svg class="w-5 h-5 ${this.getIconColor(i)}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            ${this.getIconPath(i)}
                        </svg>
                    </div>
                    <div class="ml-3 flex-1">
                        <div data-toast-title class="hidden font-medium text-base"></div>
                        <div data-toast-message class="text-sm opacity-90"></div>
                        <div class="flex space-x-2 [&:not(:has(.hidden))]:mt-3">
                            <div data-toast-actions class="hidden"></div>
                        </div>
                    </div>
                    <div class="ml-auto pl-3">
                        <button type="button" class="inline-flex items-center justify-center rounded-md bg-transparent p-1.5 text-sm font-medium transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${this.getIconColor(i)}" data-toast-dismiss="${t}" aria-label="Dismiss">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span class="sr-only">Dismiss</span>
                        </button>
                    </div>
                </div>
            </div>
        `, this.updateToastContent(a, n), a;
  }
  /**
   * Get variant classes for alert styling
   */
  getVariantClasses(t) {
    const e = {
      info: "bg-info-100 border-info-200 text-info-foreground",
      success: "bg-success-100 border-success-200 text-success-foreground",
      warning: "bg-warning-100 border-warning-200 text-warning-foreground",
      danger: "bg-danger-100 border-danger-200 text-danger-foreground",
      neutral: "bg-neutral-100 border-neutral-200 text-neutral-foreground"
    };
    return e[t] || e.info;
  }
  /**
   * Get icon color for variant
   */
  getIconColor(t) {
    const e = {
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
      neutral: "text-neutral"
    };
    return e[t] || e.info;
  }
  /**
   * Get icon SVG path for variant
   */
  getIconPath(t) {
    const e = {
      info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      warning: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>',
      danger: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
      neutral: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>'
    };
    return e[t] || e.info;
  }
  /**
   * Dismiss a toast
   */
  dismiss(t) {
    const e = this.getGlobalState();
    if (!e) return !1;
    const s = e.toasts.get(t);
    return s ? (this.clearTimer(t), e.pausedTimers.delete(t), s.setAttribute("data-toast-visible", "false"), s.setAttribute("data-toast-exiting", "true"), B.fadeOut(s, {
      scale: !0,
      duration: 300,
      onComplete: () => {
        s.parentNode && s.parentNode.removeChild(s), e.toasts.delete(t);
      }
    }), this.dispatchToastEvent("toast:dismiss", t), !0) : !1;
  }
  /**
   * Dismiss all visible toasts
   */
  dismissAll() {
    const t = this.getGlobalState();
    t && t.toasts.forEach((e, s) => {
      e.getAttribute("data-toast-visible") === "true" && this.dismiss(s);
    });
  }
  /**
   * Helper methods for convenience
   */
  success(t, e = {}) {
    return this.show("success", { message: t, ...e });
  }
  error(t, e = {}) {
    return this.show("error", { message: t, ...e });
  }
  warning(t, e = {}) {
    return this.show("warning", { message: t, ...e });
  }
  info(t, e = {}) {
    return this.show("info", { message: t, ...e });
  }
  /**
   * Update toast content
   */
  updateToastContent(t, e) {
    const s = h.querySelector("[data-toast-title]", t), n = h.querySelector("[data-toast-message]", t), i = h.querySelector("[data-toast-actions]", t);
    s && e.title ? (s.textContent = e.title, s.classList.remove("hidden")) : s && s.classList.add("hidden"), n && e.message && (n.textContent = e.message), i && e.actions ? (i.innerHTML = e.actions, i.classList.remove("hidden")) : i && i.classList.add("hidden"), t.setAttribute("data-toast-duration", String(e.duration || 5e3)), t.setAttribute("data-toast-persistent", String(e.persistent === !0));
  }
  /**
   * Reset toast content for reuse
   */
  resetToastContent(t) {
    const e = h.querySelector("[data-toast-title]", t), s = h.querySelector("[data-toast-message]", t), n = h.querySelector("[data-toast-actions]", t);
    e && (e.textContent = "", e.classList.add("hidden")), s && (s.textContent = ""), n && (n.innerHTML = "", n.classList.add("hidden")), t.removeAttribute("data-toast-duration"), t.removeAttribute("data-toast-persistent");
  }
  /**
   * Set auto-dismiss timer
   */
  setTimer(t, e) {
    const s = this.getGlobalState();
    if (!s) return;
    this.clearTimer(t);
    const n = s.toasts.get(t);
    n && n.setAttribute("data-toast-start-time", String(Date.now()));
    const i = B.createTimer(() => {
      this.dismiss(t);
    }, e);
    s.timers.set(t, i);
  }
  /**
   * Clear timer
   */
  clearTimer(t) {
    const e = this.getGlobalState();
    if (!e) return;
    const s = e.timers.get(t);
    s && (B.clearTimer(s), e.timers.delete(t));
  }
  /**
   * Pause timer (on hover)
   */
  pauseTimer(t) {
    const e = this.getGlobalState();
    if (!e) return;
    const s = e.timers.get(t), n = e.toasts.get(t);
    if (s && n) {
      B.pauseTimer(s);
      const i = parseInt(n.getAttribute("data-toast-duration") || "5000"), a = parseInt(n.getAttribute("data-toast-start-time") || "0"), o = Date.now() - a, l = Math.max(0, i - o);
      e.pausedTimers.set(t, {
        remaining: l,
        startTime: Date.now()
      });
    }
  }
  /**
   * Resume timer (on mouse leave)
   */
  resumeTimer(t) {
    const e = this.getGlobalState();
    if (!e) return;
    const s = e.toasts.get(t), n = e.timers.get(t), i = e.pausedTimers.get(t);
    s && n ? s.getAttribute("data-toast-persistent") === "true" || (B.resumeTimer(n), e.pausedTimers.delete(t)) : s && i && !(s.getAttribute("data-toast-persistent") === "true") && i.remaining > 0 && (this.setTimer(t, i.remaining), e.pausedTimers.delete(t));
  }
  /**
   * Dispatch custom toast events
   */
  dispatchToastEvent(t, e, s = {}) {
    const n = this.getGlobalState();
    if (!n) return;
    const i = { id: e, toast: e, ...s };
    x.dispatchCustomEvent(document.documentElement, t, i, {
      bubbles: !0,
      cancelable: !0
    });
    const a = n.toasts.get(e);
    if (a && x.dispatchCustomEvent(a, t, i, {
      bubbles: !0,
      cancelable: !0
    }), typeof window.Livewire < "u") {
      const o = t.replace("toast:", "toast");
      window.Livewire.dispatch(o, i);
    }
  }
  /**
   * Get toast state (for external access)
   */
  getToastState(t) {
    const e = this.getGlobalState();
    if (!e) return null;
    const s = e.toasts.get(t);
    return s ? {
      id: t,
      visible: s.getAttribute("data-toast-visible") === "true",
      variant: s.getAttribute("data-toast-variant"),
      position: s.getAttribute("data-toast-position"),
      duration: parseInt(s.getAttribute("data-toast-duration") || "0"),
      persistent: s.getAttribute("data-toast-persistent") === "true"
    } : null;
  }
  /**
   * Clean up ToastActions - extends BaseActionClass destroy
   */
  onDestroy() {
    const t = this.getGlobalState();
    t && (t.timers.forEach((e) => B.clearTimer(e)), t.timers.clear(), t.pausedTimers.clear(), t.toasts.forEach((e) => {
      this.resetToastContent(e), e.style.display = "none", e.setAttribute("data-toast-visible", "false");
    }), t.toasts.clear(), t.containers.clear());
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  vs.getInstance().init();
}) : vs.getInstance().init();
window.ToastActions = vs;
vs.getInstance();
const Wa = class Wa {
  /**
   * Detect if the current document is in RTL mode
   */
  static isRTL() {
    var e;
    if (this.cachedDirection !== null)
      return this.cachedDirection === "rtl";
    const t = [
      // Check document direction
      document.documentElement.getAttribute("dir"),
      // Check html lang attribute for RTL languages
      this.getDirectionFromLanguage(document.documentElement.getAttribute("lang")),
      // Check body direction
      (e = document.body) == null ? void 0 : e.getAttribute("dir"),
      // Check computed style
      window.getComputedStyle(document.documentElement).direction
    ];
    for (const s of t) {
      if (s === "rtl")
        return this.cachedDirection = "rtl", !0;
      if (s === "ltr")
        return this.cachedDirection = "ltr", !1;
    }
    return this.cachedDirection = "ltr", !1;
  }
  /**
   * Get direction based on language code
   */
  static getDirectionFromLanguage(t) {
    if (!t) return null;
    const e = [
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
    ], s = t.toLowerCase().split("-")[0];
    return e.includes(s) ? "rtl" : "ltr";
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
  static transformDirectionalClasses(t) {
    if (!this.isRTL())
      return t;
    const e = /* @__PURE__ */ new Map([
      // Margin classes
      ["ml-", "mr-"],
      ["mr-", "ml-"],
      ["ms-", "me-"],
      ["me-", "ms-"],
      // Padding classes
      ["pl-", "pr-"],
      ["pr-", "pl-"],
      ["ps-", "pe-"],
      ["pe-", "ps-"],
      // Border classes
      ["border-l-", "border-r-"],
      ["border-r-", "border-l-"],
      ["border-s-", "border-e-"],
      ["border-e-", "border-s-"],
      // Border radius classes
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
      // Position classes
      ["left-", "right-"],
      ["right-", "left-"],
      ["start-", "end-"],
      ["end-", "start-"],
      // Text alignment
      ["text-left", "text-right"],
      ["text-right", "text-left"],
      // Flexbox
      ["justify-start", "justify-end"],
      ["justify-end", "justify-start"],
      ["items-start", "items-end"],
      ["items-end", "items-start"],
      ["self-start", "self-end"],
      ["self-end", "self-start"],
      // Float
      ["float-left", "float-right"],
      ["float-right", "float-left"],
      // Clear
      ["clear-left", "clear-right"],
      ["clear-right", "clear-left"]
    ]);
    let s = t;
    for (const [n, i] of e) {
      const a = new RegExp(`\\b${n.replace("-", "\\-")}([\\w\\-\\.\\[\\]%\\/]+)?\\b`, "g");
      new RegExp(`\\b${i.replace("-", "\\-")}([\\w\\-\\.\\[\\]%\\/]+)?\\b`, "g"), s = s.replace(a, (o, l) => i + (l || ""));
    }
    return s;
  }
  /**
   * Get the opposite direction for icon positioning
   */
  static getOppositePosition(t) {
    return this.isRTL() ? t === "left" ? "right" : "left" : t;
  }
  /**
   * Get logical position (start/end) based on physical position (left/right)
   */
  static getLogicalPosition(t) {
    return this.isRTL() ? t === "left" ? "end" : "start" : t === "left" ? "start" : "end";
  }
  /**
   * Get physical position from logical position
   */
  static getPhysicalPosition(t) {
    return this.isRTL() ? t === "start" ? "right" : "left" : t === "start" ? "left" : "right";
  }
  /**
   * Add RTL-aware classes to an element
   */
  static addRTLClasses(t, e) {
    const s = this.transformDirectionalClasses(e);
    t.classList.add(...s.split(" ").filter((n) => n.trim()));
  }
  /**
   * Remove RTL-aware classes from an element
   */
  static removeRTLClasses(t, e) {
    const s = this.transformDirectionalClasses(e);
    t.classList.remove(...s.split(" ").filter((n) => n.trim()));
  }
  /**
   * Listen for direction changes and clear cache
   */
  static observeDirectionChanges() {
    const t = new MutationObserver((e) => {
      for (const s of e)
        if (s.type === "attributes" && (s.attributeName === "dir" || s.attributeName === "lang")) {
          this.clearCache(), document.dispatchEvent(new CustomEvent("keys:direction-change", {
            detail: { isRTL: this.isRTL() }
          }));
          break;
        }
    });
    t.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["dir", "lang"]
    }), t.observe(document.body, {
      attributes: !0,
      attributeFilter: ["dir", "lang"]
    });
  }
  /**
   * Get dropdown positioning for RTL
   */
  static getDropdownPosition(t, e) {
    let s = t, n = e;
    return this.isRTL() && (s === "left" ? s = "right" : s === "right" && (s = "left"), (t === "top" || t === "bottom") && (e === "start" ? n = "end" : e === "end" && (n = "start"))), { position: s, align: n };
  }
  /**
   * Initialize RTL support globally
   */
  static initialize() {
    this.isRTL() ? (document.documentElement.classList.add("rtl"), document.documentElement.setAttribute("dir", "rtl")) : (document.documentElement.classList.add("ltr"), document.documentElement.setAttribute("dir", "ltr")), this.observeDirectionChanges();
    const t = document.createElement("style");
    t.textContent = `
            :root {
                --direction-factor: ${this.isRTL() ? "-1" : "1"};
                --text-align-start: ${this.isRTL() ? "right" : "left"};
                --text-align-end: ${this.isRTL() ? "left" : "right"};
            }
        `, document.head.appendChild(t);
  }
};
Wa.cachedDirection = null;
let ai = Wa;
class Sa extends K {
  /**
   * Initialize dropdown elements - required by BaseActionClass
   */
  initializeElements() {
    h.findByDataAttribute("dropdown", "true").forEach((t) => {
      this.initializeDropdown(t);
    });
  }
  /**
   * Initialize a single dropdown element
   */
  initializeDropdown(t) {
    const e = {
      isOpen: !1,
      focusedIndex: -1,
      menuItems: [],
      children: []
    }, s = h.findClosest(t, '[data-submenu="true"]');
    s && s !== t && (e.parent = s), this.setState(t, e), this.updateMenuItems(t), this.initializeSubmenus(t);
  }
  /**
   * Initialize submenus within a dropdown
   */
  initializeSubmenus(t) {
    const e = h.querySelectorAll('[data-submenu="true"]', t), s = this.getState(t);
    s && (s.children = Array.from(e), this.setState(t, s)), e.forEach((n) => {
      this.hasState(n) || this.initializeDropdown(n);
    });
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("[data-submenu-trigger], [data-dropdown-trigger], [data-menu-item], [data-menu-checkbox], [data-menu-radio], [data-dropdown-panel], [data-submenu-panel]", (t, e) => {
      if (t.matches("[data-submenu-trigger]")) {
        e.preventDefault(), e.stopPropagation();
        const s = h.findClosest(t, '[data-submenu="true"]');
        s && !this.isDisabled(s) && this.toggleSubmenu(s);
        return;
      }
      if (t.matches("[data-dropdown-trigger]")) {
        e.preventDefault(), e.stopPropagation();
        const s = h.findClosest(t, '[data-dropdown="true"]');
        s && !this.isDisabled(s) && this.toggleDropdown(s);
        return;
      }
      if (t.matches("[data-menu-item]")) {
        const s = h.findClosest(t, '[data-dropdown="true"]');
        s && (t.dataset.keepOpen === "true" || this.closeDropdown(s));
        return;
      }
      if (t.matches("[data-menu-checkbox], [data-menu-radio]")) {
        if (e.stopPropagation(), !(t.dataset.keepOpen !== "false")) {
          const n = h.findClosest(t, '[data-dropdown="true"]');
          n && this.closeDropdown(n);
        }
        return;
      }
      if (t.matches("[data-dropdown-panel], [data-submenu-panel]")) {
        e.stopPropagation();
        return;
      }
    }), x.addEventListener(document, "click", (t) => {
      const e = t.target;
      e && e instanceof Element && (e.closest("[data-submenu-trigger], [data-dropdown-trigger], [data-menu-item], [data-menu-checkbox], [data-menu-radio], [data-dropdown-panel], [data-submenu-panel]") || this.closeAllDropdowns());
    }), x.addEventListener(document, "mouseenter", (t) => {
      const e = h.findClosest(t.target, "[data-submenu-trigger]");
      if (e && !this.isMobile()) {
        const s = h.findClosest(e, '[data-submenu="true"]');
        s && !this.isDisabled(s) && (this.closeSiblingSubmenus(s), setTimeout(() => {
          e.matches(":hover") && this.openSubmenu(s);
        }, 100));
      }
    }, { capture: !0 }), x.addEventListener(document, "mouseleave", (t) => {
      const e = h.findClosest(t.target, '[data-submenu="true"]');
      if (e && !this.isMobile()) {
        const s = this.getState(e);
        s != null && s.isOpen && setTimeout(() => {
          e.matches(":hover") || this.closeSubmenu(e);
        }, 150);
      }
    }, { capture: !0 }), x.handleDelegatedKeydown('[data-dropdown="true"]', (t, e) => {
      this.handleKeydown(t, e);
    });
  }
  /**
   * Setup dynamic observer for new dropdowns - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.hasDataAttribute(s, "dropdown", "true") && (this.hasState(s) || this.initializeDropdown(s)), h.findByDataAttribute("dropdown", "true", s).forEach((i) => {
            this.hasState(i) || this.initializeDropdown(i);
          });
        }
      });
    });
  }
  /**
   * Toggle dropdown open/closed state
   */
  toggleDropdown(t) {
    const e = this.getState(t);
    e && (e.isOpen ? this.closeDropdown(t) : this.openDropdown(t));
  }
  /**
   * Open dropdown
   */
  openDropdown(t) {
    const e = this.getState(t);
    if (!e || this.isDisabled(t)) return;
    this.closeSiblingDropdowns(t), e.isOpen = !0, e.focusedIndex = -1, this.setState(t, e);
    const s = h.querySelector("[data-dropdown-panel]", t), n = h.querySelector("[data-dropdown-trigger]", t);
    s && (s.classList.remove("hidden"), this.positionDropdown(t)), n && n.setAttribute("aria-expanded", "true"), this.updateMenuItems(t), this.dispatchDropdownEvent(t, "dropdown:open");
  }
  /**
   * Open submenu
   */
  openSubmenu(t) {
    const e = this.getState(t);
    if (!e || this.isDisabled(t)) return;
    e.isOpen = !0, e.focusedIndex = -1, this.setState(t, e);
    const s = h.querySelector("[data-submenu-panel]", t), n = h.querySelector("[data-submenu-trigger]", t);
    s && (s.classList.remove("hidden"), this.positionSubmenu(t)), n && n.setAttribute("aria-expanded", "true"), this.updateMenuItems(t), this.dispatchDropdownEvent(t, "submenu:open");
  }
  /**
   * Close dropdown
   */
  closeDropdown(t) {
    const e = this.getState(t);
    if (!e || !e.isOpen) return;
    this.closeChildSubmenus(t), e.floating && (e.floating.cleanup(), e.floating = void 0), e.isOpen = !1, e.focusedIndex = -1, this.setState(t, e);
    const s = h.querySelector("[data-dropdown-panel]", t), n = h.querySelector("[data-dropdown-trigger]", t);
    s && s.classList.add("hidden"), n && n.setAttribute("aria-expanded", "false"), this.dispatchDropdownEvent(t, "dropdown:close");
  }
  /**
   * Close submenu
   */
  closeSubmenu(t) {
    const e = this.getState(t);
    if (!e || !e.isOpen) return;
    this.closeChildSubmenus(t), e.floating && (e.floating.cleanup(), e.floating = void 0), e.isOpen = !1, e.focusedIndex = -1, this.setState(t, e);
    const s = h.querySelector("[data-submenu-panel]", t), n = h.querySelector("[data-submenu-trigger]", t);
    s && s.classList.add("hidden"), n && n.setAttribute("aria-expanded", "false"), this.dispatchDropdownEvent(t, "submenu:close");
  }
  /**
   * Close all open dropdowns
   */
  closeAllDropdowns() {
    this.getAllStates().forEach((t, e) => {
      t.isOpen && (t.parent || this.closeDropdown(e));
    });
  }
  /**
   * Close sibling dropdowns but preserve parent-child relationships
   */
  closeSiblingDropdowns(t) {
    const e = this.getState(t);
    this.getAllStates().forEach((s, n) => {
      if (n !== t && s.isOpen) {
        const i = (e == null ? void 0 : e.parent) === n, a = s.parent === t;
        !i && !a && this.closeDropdown(n);
      }
    });
  }
  /**
   * Close sibling submenus
   */
  closeSiblingSubmenus(t) {
    const e = this.getState(t), s = e == null ? void 0 : e.parent;
    if (s) {
      const n = this.getState(s);
      n == null || n.children.forEach((i) => {
        i !== t && this.closeSubmenu(i);
      });
    }
  }
  /**
   * Close all child submenus
   */
  closeChildSubmenus(t) {
    const e = this.getState(t);
    e == null || e.children.forEach((s) => {
      this.closeSubmenu(s);
    });
  }
  /**
   * Toggle submenu open/closed state
   */
  toggleSubmenu(t) {
    const e = this.getState(t);
    e && (e.isOpen ? this.closeSubmenu(t) : this.openSubmenu(t));
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
  handleKeydown(t, e) {
    const s = this.getState(t);
    if (s)
      switch (e.key) {
        case "Enter":
        case " ":
          if (!s.isOpen)
            e.preventDefault(), this.openDropdown(t);
          else if (s.focusedIndex >= 0) {
            e.preventDefault();
            const n = s.menuItems[s.focusedIndex];
            n && n.click();
          }
          break;
        case "Escape":
          if (s.isOpen) {
            e.preventDefault(), this.closeDropdown(t);
            const n = h.querySelector("[data-dropdown-trigger]", t);
            n && n.focus();
          }
          break;
        case "ArrowDown":
          s.isOpen ? (e.preventDefault(), this.navigateItems(t, 1)) : (e.preventDefault(), this.openDropdown(t));
          break;
        case "ArrowUp":
          s.isOpen && (e.preventDefault(), this.navigateItems(t, -1));
          break;
        case "Tab":
          s.isOpen && this.closeDropdown(t);
          break;
      }
  }
  /**
   * Navigate through menu items with arrow keys
   */
  navigateItems(t, e) {
    const s = this.getState(t);
    if (!s || !s.isOpen) return;
    const n = s.menuItems.length;
    n !== 0 && (s.focusedIndex === -1 ? s.focusedIndex = e > 0 ? 0 : n - 1 : (s.focusedIndex += e, s.focusedIndex >= n ? s.focusedIndex = 0 : s.focusedIndex < 0 && (s.focusedIndex = n - 1)), this.setState(t, s), this.updateItemFocus(t));
  }
  /**
   * Update visual focus state of menu items
   */
  updateItemFocus(t) {
    const e = this.getState(t);
    e && e.menuItems.forEach((s, n) => {
      n === e.focusedIndex ? (s.classList.add("bg-neutral-100", "dark:bg-neutral-800"), s.scrollIntoView({ block: "nearest" })) : s.classList.remove("bg-neutral-100", "dark:bg-neutral-800");
    });
  }
  /**
   * Update menu items list for keyboard navigation
   */
  updateMenuItems(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = h.querySelectorAll("[data-menu-item], [data-menu-checkbox], [data-menu-radio], [data-submenu-trigger]", t);
    e.menuItems = Array.from(s).filter((n) => {
      const i = n;
      return !i.hasAttribute("disabled") && i.offsetParent !== null;
    }), this.setState(t, e);
  }
  /**
   * Setup floating for dropdown using Floating UI
   */
  setupFloating(t, e, s) {
    const n = this.getState(t);
    if (!n) return;
    n.floating && n.floating.cleanup();
    const i = t.dataset.position || "bottom", a = t.dataset.align || "start", o = parseInt(t.dataset.offset || "8");
    let l = i;
    i === "bottom" || i === "top" ? a === "start" ? l = `${i}-start` : a === "end" && (l = `${i}-end`) : (i === "left" || i === "right") && (a === "start" ? l = `${i}-start` : a === "end" && (l = `${i}-end`));
    const c = wt.getInstance().createFloating(e, s, {
      placement: l,
      offset: o,
      flip: {
        fallbackStrategy: "bestFit",
        padding: 8
      },
      shift: {
        padding: 8,
        crossAxis: !0
      },
      hide: {
        strategy: "escaped"
      },
      autoUpdate: {
        ancestorScroll: !0,
        ancestorResize: !0,
        elementResize: !0,
        layoutShift: !0
      }
    });
    n.floating = c, this.setState(t, n);
  }
  /**
   * Setup floating for submenu using Floating UI
   */
  setupSubmenuFloating(t, e, s) {
    const n = this.getState(t);
    if (!n) return;
    n.floating && n.floating.cleanup();
    const i = t.dataset.position || "right", a = t.dataset.align || "start", o = parseInt(t.dataset.offset || "4"), l = ai.getDropdownPosition(
      i,
      a
    );
    let c = l.position;
    l.position === "right" || l.position === "left" ? l.align === "start" ? c = `${l.position}-start` : l.align === "end" && (c = `${l.position}-end`) : (l.position === "top" || l.position === "bottom") && (l.align === "start" ? c = `${l.position}-start` : l.align === "end" && (c = `${l.position}-end`));
    const d = wt.getInstance().createFloating(e, s, {
      placement: c,
      offset: o,
      flip: {
        fallbackStrategy: "bestFit",
        padding: 8
      },
      shift: {
        padding: 8,
        crossAxis: !0
      },
      hide: {
        strategy: "escaped"
      },
      autoUpdate: {
        ancestorScroll: !0,
        ancestorResize: !0,
        elementResize: !0,
        layoutShift: !0
      }
    });
    n.floating = d, this.setState(t, n);
  }
  /**
   * Position dropdown relative to trigger using Floating UI
   */
  positionDropdown(t) {
    const e = h.querySelector("[data-dropdown-panel]", t), s = h.querySelector("[data-dropdown-trigger]", t);
    !e || !s || !this.getState(t) || this.setupFloating(t, s, e);
  }
  /**
   * Position submenu relative to trigger using Floating UI
   */
  positionSubmenu(t) {
    const e = h.querySelector("[data-submenu-panel]", t), s = h.querySelector("[data-submenu-trigger]", t);
    !e || !s || this.setupSubmenuFloating(t, s, e);
  }
  /**
   * Reposition all open dropdowns and submenus
   */
  repositionDropdowns() {
    this.getAllStates().forEach((t, e) => {
      t.isOpen && (e.hasAttribute("data-submenu") ? this.positionSubmenu(e) : this.positionDropdown(e));
    });
  }
  /**
   * Check if dropdown is disabled
   */
  isDisabled(t) {
    return t.dataset.disabled === "true";
  }
  /**
   * Dispatch custom dropdown event
   */
  dispatchDropdownEvent(t, e, s = null) {
    x.dispatchCustomEvent(t, e, {
      dropdown: t,
      ...s
    }, {
      bubbles: !0
    });
  }
  /**
   * Clean up DropdownActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.getAllStates().forEach((t, e) => {
      t.floating && t.floating.cleanup();
    });
  }
}
Sa.getInstance();
class ws extends K {
  /**
   * Initialize table elements - required by BaseActionClass
   */
  initializeElements() {
    h.findByDataAttribute("table", "true").forEach((t) => {
      this.initializeTable(t);
    }), this.setupLivewireIntegration();
  }
  /**
   * Initialize a single table
   */
  initializeTable(t) {
    var n;
    if (this.hasState(t))
      return;
    const e = {
      selectedRows: /* @__PURE__ */ new Set(),
      sortColumn: null,
      sortDirection: null,
      selectAllState: "none"
    };
    this.setState(t, e);
    const s = h.querySelector('[data-sorted="true"]', t);
    if (s) {
      const i = s.getAttribute("data-sort-key") || ((n = s.textContent) == null ? void 0 : n.trim()) || "", a = s.getAttribute("data-direction");
      e.sortColumn = i, e.sortDirection = a;
    }
    this.updateSelectionState(t);
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick('[data-sortable="true"]', (t, e) => {
      e.preventDefault(), this.handleSort(t);
    }), x.handleDelegatedChange("[data-table-row-select]", (t) => {
      this.handleRowSelection(t);
    }), x.handleDelegatedChange("[data-table-select-all]", (t) => {
      this.handleSelectAll(t);
    }), x.handleDelegatedKeydown('[data-table="true"]', (t, e) => {
      this.handleKeyboard(e);
    });
  }
  /**
   * Setup dynamic observer for new tables - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.hasDataAttribute(s, "table", "true") && this.initializeTable(s), h.findByDataAttribute("table", "true", s).forEach((n) => {
            this.initializeTable(n);
          });
        }
      });
    });
  }
  /**
   * Setup Livewire integration
   */
  setupLivewireIntegration() {
    typeof window.Livewire > "u" || x.addEventListener(document, "livewire:navigated", () => {
      this.reinitialize();
    });
  }
  /**
   * Handle sortable header clicks
   */
  handleSort(t) {
    var a;
    const e = h.findClosest(t, '[data-table="true"]');
    if (!e) return;
    const s = this.getState(e);
    if (!s) return;
    const n = t.getAttribute("data-sort-key") || ((a = t.textContent) == null ? void 0 : a.trim()) || "";
    let i = "asc";
    s.sortColumn === n && (s.sortDirection === "asc" ? i = "desc" : s.sortDirection === "desc" && (i = null)), s.sortColumn = i ? n : null, s.sortDirection = i, this.updateSortUI(e, n, i), this.dispatchSortEvent(e, {
      column: n,
      direction: i || "asc",
      url: t.getAttribute("data-sort-url") || void 0,
      livewireMethod: t.getAttribute("data-sort-method") || void 0
    });
  }
  /**
   * Update sort UI indicators
   */
  updateSortUI(t, e, s) {
    if (h.querySelectorAll('[data-sortable="true"]', t).forEach((i) => {
      i.setAttribute("data-sorted", "false"), i.removeAttribute("data-direction"), h.querySelectorAll(".table-sort-icon", i).forEach((o) => {
        o.setAttribute("data-icon", "heroicon-o-chevron-up-down"), o.classList.remove("opacity-100"), o.classList.add("opacity-0", "group-hover:opacity-100");
      });
    }), s) {
      const i = t.querySelector(`[data-sort-key="${e}"]`);
      if (i) {
        i.setAttribute("data-sorted", "true"), i.setAttribute("data-direction", s);
        const a = h.querySelector(".table-sort-icon", i);
        if (a) {
          const o = s === "asc" ? "heroicon-o-chevron-up" : "heroicon-o-chevron-down";
          a.setAttribute("data-icon", o), a.classList.remove("opacity-0", "group-hover:opacity-100"), a.classList.add("opacity-100");
        }
      }
    }
  }
  /**
   * Handle individual row selection
   */
  handleRowSelection(t) {
    const e = h.findClosest(t, '[data-table="true"]');
    if (!e) return;
    const s = this.getState(e);
    if (!s) return;
    const n = t.getAttribute("data-row-id");
    n && (t.checked ? s.selectedRows.add(n) : s.selectedRows.delete(n), this.updateSelectionState(e), this.dispatchSelectionEvent(e, Array.from(s.selectedRows)));
  }
  /**
   * Handle select all checkbox
   */
  handleSelectAll(t) {
    const e = h.findClosest(t, '[data-table="true"]');
    if (!e) return;
    const s = this.getState(e);
    if (!s) return;
    const n = h.querySelectorAll("[data-table-row-select]", e);
    t.checked ? n.forEach((i) => {
      i.checked = !0;
      const a = i.getAttribute("data-row-id");
      a && s.selectedRows.add(a);
    }) : n.forEach((i) => {
      i.checked = !1;
      const a = i.getAttribute("data-row-id");
      a && s.selectedRows.delete(a);
    }), this.updateSelectionState(e), this.dispatchSelectionEvent(e, Array.from(s.selectedRows));
  }
  /**
   * Update selection state and UI
   */
  updateSelectionState(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = h.querySelectorAll("[data-table-row-select]", t), n = h.querySelector("[data-table-select-all]", t), i = s.length, a = e.selectedRows.size;
    a === 0 ? (e.selectAllState = "none", n && (n.checked = !1, n.indeterminate = !1)) : a === i ? (e.selectAllState = "all", n && (n.checked = !0, n.indeterminate = !1)) : (e.selectAllState = "some", n && (n.checked = !1, n.indeterminate = !0)), h.querySelectorAll("[data-table-row]", t).forEach((l) => {
      const c = l.getAttribute("data-row-id");
      c && e.selectedRows.has(c) ? (l.setAttribute("data-selected", "true"), l.classList.add("table-row-selected")) : (l.setAttribute("data-selected", "false"), l.classList.remove("table-row-selected"));
    });
  }
  /**
   * Handle keyboard navigation
   */
  handleKeyboard(t) {
    const e = t.target;
    t.key === " " && e.matches('[data-sortable="true"]') && (t.preventDefault(), this.handleSort(e)), t.key === "Enter" && e.matches('[data-sortable="true"]') && (t.preventDefault(), this.handleSort(e));
  }
  /**
   * Dispatch sort event
   */
  dispatchSortEvent(t, e) {
    if (x.dispatchCustomEvent(t, "table:sort", e, {
      bubbles: !0,
      cancelable: !0
    }), e.livewireMethod && window.Livewire) {
      const s = t.getAttribute("wire:id");
      if (s) {
        const n = window.Livewire.find(s);
        n && n.call(e.livewireMethod, e.column, e.direction);
      }
    }
  }
  /**
   * Dispatch selection event
   */
  dispatchSelectionEvent(t, e) {
    x.dispatchCustomEvent(t, "table:selection", { selectedIds: e }, {
      bubbles: !0,
      cancelable: !0
    });
    const s = t.getAttribute("data-selection-method");
    if (s && window.Livewire) {
      const n = t.getAttribute("wire:id");
      if (n) {
        const i = window.Livewire.find(n);
        i && i.call(s, e);
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
  getSelectedRows(t) {
    const e = this.getState(t);
    return e ? Array.from(e.selectedRows) : [];
  }
  /**
   * Clear selection for a table
   */
  clearSelection(t) {
    const e = this.getState(t);
    e && (e.selectedRows.clear(), this.updateSelectionState(t), this.dispatchSelectionEvent(t, []));
  }
  /**
   * Clean up TableActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  ws.getInstance().init();
}) : ws.getInstance().init();
window.TableActions = ws;
ws.getInstance();
class xa extends K {
  /**
   * Initialize button group elements - required by BaseActionClass
   */
  initializeElements() {
    this.processButtonGroups();
  }
  /**
   * Process all existing button groups on the page
   */
  processButtonGroups() {
    h.findByDataAttribute("button-group", "true").filter(
      (e) => h.hasDataAttribute(e, "attached", "true")
    ).forEach((e) => this.processButtonGroup(e));
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
  }
  /**
   * Setup dynamic observer for new button groups - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.hasDataAttribute(s, "button-group", "true") && h.hasDataAttribute(s, "attached", "true") && this.processButtonGroup(s), h.findByDataAttribute("button-group", "true", s).filter(
            (i) => h.hasDataAttribute(i, "attached", "true")
          ).forEach((i) => this.processButtonGroup(i));
        }
      });
    });
  }
  /**
   * Process a single button group element
   */
  processButtonGroup(t) {
    const e = t.getAttribute("data-orientation") || "horizontal", s = Array.from(t.children).filter(
      (n) => n.tagName === "BUTTON" || n.tagName === "A"
    );
    s.length <= 1 || s.forEach((n, i) => {
      const a = i === 0, o = i === s.length - 1, l = !a && !o;
      this.clearBorderRadiusClasses(n), e === "horizontal" ? a ? n.classList.add("rounded-r-none") : o ? n.classList.add("rounded-l-none") : l && n.classList.add("rounded-none") : e === "vertical" && (a ? n.classList.add("rounded-b-none") : o ? n.classList.add("rounded-t-none") : l && n.classList.add("rounded-none"));
    });
  }
  /**
   * Clear existing border radius classes from a button
   */
  clearBorderRadiusClasses(t) {
    [
      "rounded-none",
      "rounded-r-none",
      "rounded-l-none",
      "rounded-t-none",
      "rounded-b-none"
    ].forEach((s) => {
      t.classList.remove(s);
    });
  }
  /**
   * Re-process all button groups (useful after dynamic content changes)
   */
  refresh() {
    this.processButtonGroups();
  }
  /**
   * Process a specific button group by element reference
   */
  processGroup(t) {
    t.matches('[data-button-group="true"][data-attached="true"]') && this.processButtonGroup(t);
  }
  /**
   * Clean up ButtonGroupActions - extends BaseActionClass destroy
   */
  onDestroy() {
  }
}
xa.getInstance();
class Ss extends K {
  /**
   * Initialize tooltip elements - required by BaseActionClass
   */
  initializeElements() {
    h.querySelectorAll("[data-tooltip-target]").forEach((t) => {
      const e = t.getAttribute("data-tooltip-target");
      if (e) {
        const s = h.getElementById(e);
        s && this.initializeTooltip(t, s);
      }
    }), h.findByDataAttribute("tooltip", "true").forEach((t) => {
      const e = t.getAttribute("data-target");
      if (e) {
        const s = h.querySelector(e);
        s && this.initializeTooltip(s, t);
      }
    }), this.setupLivewireIntegration();
  }
  /**
   * Initialize a single tooltip
   */
  initializeTooltip(t, e) {
    if (this.hasState(e))
      return;
    const s = t.getAttribute("data-tooltip-trigger") || e.getAttribute("data-trigger") || "hover", n = parseInt(t.getAttribute("data-tooltip-delay") || e.getAttribute("data-delay") || "100"), i = {
      isVisible: !1,
      trigger: t,
      tooltip: e,
      triggerType: s,
      delay: n
    };
    this.setState(e, i), this.bindTooltipEvents(t, e, i), this.hideTooltip(e);
  }
  /**
   * Bind events for a specific tooltip
   */
  bindTooltipEvents(t, e, s) {
    switch (s.triggerType) {
      case "hover":
        t.addEventListener("mouseenter", () => this.scheduleShow(e)), t.addEventListener("mouseleave", () => this.scheduleHide(e)), e.addEventListener("mouseenter", () => this.cancelHide(e)), e.addEventListener("mouseleave", () => this.scheduleHide(e));
        break;
      case "click":
        t.addEventListener("click", (n) => {
          n.preventDefault(), this.toggleTooltip(e);
        });
        break;
      case "focus":
        t.addEventListener("focus", () => this.scheduleShow(e)), t.addEventListener("blur", () => this.scheduleHide(e));
        break;
    }
    t.addEventListener("keydown", (n) => {
      n.key === "Escape" && s.isVisible && this.hideTooltip(e);
    });
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.addEventListener(document, "click", (t) => {
      const e = t.target;
      e && e instanceof Element && this.getAllStates().forEach((s, n) => {
        var i;
        if (s.triggerType === "click" && s.isVisible) {
          const a = e;
          !((i = s.trigger) != null && i.contains(a)) && !n.contains(a) && this.hideTooltip(n);
        }
      });
    }), x.addEventListener(document, "scroll", () => {
      this.getAllStates().forEach((t, e) => {
        t.isVisible && this.hideTooltip(e);
      });
    }, { passive: !0 }), x.handleResize(() => {
      this.getAllStates().forEach((t, e) => {
        t.isVisible && this.positionTooltip(t.trigger, e);
      });
    }, 100);
  }
  /**
   * Setup dynamic observer for new tooltips - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.querySelectorAll("[data-tooltip-target]", s).forEach((n) => {
            const i = n.getAttribute("data-tooltip-target");
            if (i) {
              const a = h.getElementById(i);
              a && !this.hasState(a) && this.initializeTooltip(n, a);
            }
          }), h.findByDataAttribute("tooltip", "true", s).forEach((n) => {
            const i = n.getAttribute("data-target");
            if (i) {
              const a = h.querySelector(i);
              a && !this.hasState(n) && this.initializeTooltip(a, n);
            }
          });
        }
      });
    });
  }
  /**
   * Schedule tooltip to show with delay
   */
  scheduleShow(t) {
    const e = this.getState(t);
    !e || t.getAttribute("data-disabled") === "true" || (this.cancelHide(t), e.showTimer = B.createTimer(() => {
      this.showTooltip(t);
    }, e.delay));
  }
  /**
   * Schedule tooltip to hide with delay
   */
  scheduleHide(t) {
    const e = this.getState(t);
    e && (this.cancelShow(t), e.hideTimer = B.createTimer(() => {
      this.hideTooltip(t);
    }, 100));
  }
  /**
   * Cancel scheduled show
   */
  cancelShow(t) {
    const e = this.getState(t);
    e != null && e.showTimer && (B.clearTimer(e.showTimer), delete e.showTimer);
  }
  /**
   * Cancel scheduled hide
   */
  cancelHide(t) {
    const e = this.getState(t);
    e != null && e.hideTimer && (B.clearTimer(e.hideTimer), delete e.hideTimer);
  }
  /**
   * Show tooltip
   */
  showTooltip(t) {
    const e = this.getState(t);
    !e || e.isVisible || (e.trigger && this.positionTooltip(e.trigger, t), B.fadeIn(t, {
      duration: 200,
      onComplete: () => {
        t.setAttribute("data-show", "true"), e.isVisible = !0, this.dispatchTooltipEvent(t, "tooltip:show", { trigger: e.trigger });
      }
    }));
  }
  /**
   * Hide tooltip
   */
  hideTooltip(t) {
    const e = this.getState(t);
    !e || !e.isVisible || (e.floating && (e.floating.cleanup(), e.floating = void 0), B.fadeOut(t, {
      duration: 150,
      onComplete: () => {
        t.setAttribute("data-show", "false"), e.isVisible = !1, this.dispatchTooltipEvent(t, "tooltip:hide", { trigger: e.trigger });
      }
    }));
  }
  /**
   * Toggle tooltip visibility
   */
  toggleTooltip(t) {
    const e = this.getState(t);
    e && (e.isVisible ? this.hideTooltip(t) : this.showTooltip(t));
  }
  /**
   * Position tooltip relative to trigger using Floating UI
   */
  positionTooltip(t, e) {
    this.getState(e) && this.setupFloating(t, e);
  }
  /**
   * Setup floating for tooltip using Floating UI
   */
  setupFloating(t, e) {
    const s = this.getState(e);
    if (!s) return;
    s.floating && s.floating.cleanup();
    const n = e.getAttribute("data-placement") || "top", i = h.querySelector("[data-tooltip-arrow]", e), a = wt.getInstance().createFloating(t, e, {
      placement: n,
      offset: 8,
      flip: {
        fallbackStrategy: "bestFit",
        padding: 8
      },
      shift: {
        padding: 8,
        crossAxis: !0
      },
      arrow: i || void 0,
      hide: {
        strategy: "referenceHidden"
      },
      autoUpdate: {
        ancestorScroll: !0,
        ancestorResize: !0,
        elementResize: !0,
        layoutShift: !0
      }
    });
    s.floating = a;
  }
  /**
   * Dispatch tooltip events
   */
  dispatchTooltipEvent(t, e, s = {}) {
    x.dispatchCustomEvent(t, e, {
      tooltip: t,
      ...s
    }, {
      bubbles: !0,
      cancelable: !0
    });
  }
  /**
   * Setup Livewire integration
   */
  setupLivewireIntegration() {
    typeof window.Livewire > "u" || document.addEventListener("livewire:navigated", () => {
      this.reinitialize();
    });
  }
  /**
   * Reinitialize tooltips (useful after dynamic content changes)
   */
  reinitialize() {
    this.clearAllStates(), this.initializeElements();
  }
  /**
   * Public API: Show tooltip programmatically
   */
  show(t) {
    const e = h.getElementById(t);
    return e && this.hasState(e) ? (this.showTooltip(e), !0) : !1;
  }
  /**
   * Public API: Hide tooltip programmatically
   */
  hide(t) {
    const e = h.getElementById(t);
    return e && this.hasState(e) ? (this.hideTooltip(e), !0) : !1;
  }
  /**
   * Public API: Toggle tooltip programmatically
   */
  toggle(t) {
    const e = h.getElementById(t);
    return e && this.hasState(e) ? (this.toggleTooltip(e), !0) : !1;
  }
  /**
   * Public API: Destroy tooltip instance
   */
  destroyTooltip(t) {
    const e = h.getElementById(t);
    return e && this.hasState(e) ? (this.hideTooltip(e), this.removeState(e), !0) : !1;
  }
  /**
   * Clean up TooltipActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.getAllStates().forEach((t, e) => {
      t.floating && t.floating.cleanup();
    });
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  Ss.getInstance().init();
}) : Ss.getInstance().init();
window.TooltipActions = Ss;
Ss.getInstance();
class xs extends K {
  /**
   * Initialize timepicker elements - required by BaseActionClass
   */
  initializeElements() {
    h.querySelectorAll('[data-timepicker="true"]').forEach((t) => {
      this.initializeTimePicker(t);
    });
  }
  /**
   * Initialize a single timepicker element
   */
  initializeTimePicker(t) {
    if (this.hasState(t))
      return;
    const e = t.dataset.format || "24", s = t.dataset.showSeconds === "true", n = parseInt(t.dataset.step || "1"), i = t.dataset.minTime || null, a = t.dataset.maxTime || null, o = t.dataset.value || null, l = this.parseTime(o) || this.getCurrentTime(), c = {
      isOpen: !1,
      format: e,
      showSeconds: s,
      hour: l.hour,
      minute: l.minute,
      second: l.second,
      period: l.period || "AM",
      step: n,
      minTime: i,
      maxTime: a,
      value: o
    };
    this.setState(t, c), this.updateDisplay(t), this.updateSelectedStates(t);
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("[data-timepicker-trigger]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-timepicker="true"]');
      s && !this.isDisabled(s) && this.toggleDropdown(s);
    }), x.handleDelegatedClick("[data-timepicker-clear]", (t, e) => {
      e.preventDefault(), e.stopPropagation();
      const s = h.findClosest(t, '[data-timepicker="true"]');
      s && this.clearTime(s);
    }), x.handleDelegatedClick("[data-timepicker-hour]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-timepicker="true"]'), n = parseInt(t.dataset.timepickerHour || "0");
      s && this.setHour(s, n);
    }), x.handleDelegatedClick("[data-timepicker-minute]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-timepicker="true"]'), n = parseInt(t.dataset.timepickerMinute || "0");
      s && this.setMinute(s, n);
    }), x.handleDelegatedClick("[data-timepicker-second]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-timepicker="true"]'), n = parseInt(t.dataset.timepickerSecond || "0");
      s && this.setSecond(s, n);
    }), x.handleDelegatedClick("[data-timepicker-period]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-timepicker="true"]'), n = t.dataset.timepickerPeriod;
      s && this.setPeriod(s, n);
    }), x.handleDelegatedClick("[data-timepicker-format]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-timepicker="true"]'), n = t.dataset.timepickerFormat;
      s && this.setFormat(s, n);
    }), x.handleDelegatedClick("[data-timepicker-now]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-timepicker="true"]');
      s && this.setToCurrentTime(s);
    }), x.handleDelegatedClick("[data-timepicker-apply]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-timepicker="true"]');
      s && this.applyTime(s);
    }), x.handleDelegatedClick("[data-timepicker-cancel]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-timepicker="true"]');
      s && this.closeDropdown(s);
    }), x.addEventListener(document, "click", (t) => {
      const e = t.target;
      e && e instanceof Element && (e.closest('[data-timepicker="true"]') || this.closeAllDropdowns());
    }), x.handleDelegatedKeydown('[data-timepicker="true"]', (t, e) => {
      this.handleKeydown(t, e);
    });
  }
  /**
   * Setup dynamic observer for new timepickers - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          s.matches && s.matches('[data-timepicker="true"]') && this.initializeTimePicker(s), h.querySelectorAll('[data-timepicker="true"]', s).forEach((n) => {
            this.initializeTimePicker(n);
          });
        }
      });
    });
  }
  /**
   * Toggle dropdown open/closed state
   */
  toggleDropdown(t) {
    const e = this.getState(t);
    e && (e.isOpen ? this.closeDropdown(t) : this.openDropdown(t));
  }
  /**
   * Open dropdown
   */
  openDropdown(t) {
    const e = this.getState(t);
    if (!e || this.isDisabled(t)) return;
    this.closeAllDropdowns(), e.isOpen = !0, this.setState(t, e);
    const s = h.querySelector("[data-timepicker-dropdown]", t), n = h.querySelector("[data-timepicker-trigger]", t);
    s && (s.classList.remove("hidden"), this.positionDropdown(t)), n && n.setAttribute("aria-expanded", "true"), this.updateSelectedStates(t), this.scrollToSelectedOptions(t), this.dispatchTimePickerEvent(t, "timepicker:open");
  }
  /**
   * Close dropdown
   */
  closeDropdown(t) {
    const e = this.getState(t);
    if (!e || !e.isOpen) return;
    e.floating && (e.floating.cleanup(), e.floating = void 0), e.isOpen = !1, this.setState(t, e);
    const s = h.querySelector("[data-timepicker-dropdown]", t), n = h.querySelector("[data-timepicker-trigger]", t);
    s && s.classList.add("hidden"), n && n.setAttribute("aria-expanded", "false"), this.dispatchTimePickerEvent(t, "timepicker:close");
  }
  /**
   * Close all open dropdowns
   */
  closeAllDropdowns() {
    this.getAllStates().forEach((t, e) => {
      t.isOpen && this.closeDropdown(e);
    });
  }
  /**
   * Set hour value
   */
  setHour(t, e) {
    const s = this.getState(t);
    s && (s.hour = e, this.setState(t, s), this.updateSelectedStates(t), this.updatePreview(t));
  }
  /**
   * Set minute value
   */
  setMinute(t, e) {
    const s = this.getState(t);
    s && (s.minute = e, this.setState(t, s), this.updateSelectedStates(t), this.updatePreview(t));
  }
  /**
   * Set second value
   */
  setSecond(t, e) {
    const s = this.getState(t);
    s && (s.second = e, this.setState(t, s), this.updateSelectedStates(t), this.updatePreview(t));
  }
  /**
   * Set period (AM/PM)
   */
  setPeriod(t, e) {
    const s = this.getState(t);
    s && (s.period = e, this.setState(t, s), this.updateSelectedStates(t), this.updatePreview(t));
  }
  /**
   * Convert hour between 12h and 24h formats
   */
  convertHourBetweenFormats(t, e, s, n) {
    if (e === s)
      return { hour: t, period: n };
    if (e === "24" && s === "12")
      return t === 0 ? { hour: 12, period: "AM" } : t >= 1 && t <= 11 ? { hour: t, period: "AM" } : t === 12 ? { hour: 12, period: "PM" } : { hour: t - 12, period: "PM" };
    if (e === "12" && s === "24") {
      if (!n)
        throw new Error("Period (AM/PM) required for 12h to 24h conversion");
      return n === "AM" ? t === 12 ? { hour: 0 } : { hour: t } : t === 12 ? { hour: 12 } : { hour: t + 12 };
    }
    return { hour: t, period: n };
  }
  /**
   * Set format (12/24 hour)
   */
  setFormat(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const n = t.dataset.formatMode;
    if (n === "12" || n === "24") {
      console.warn(`TimePicker format is locked to ${n}h mode. Cannot switch to ${e}h.`);
      return;
    }
    if (s.format !== e) {
      const i = this.convertHourBetweenFormats(s.hour, s.format, e, s.period);
      s.hour = i.hour, i.period && (s.period = i.period), s.format = e, this.setState(t, s), this.updateFormatButtons(t), this.updateHourOptions(t), this.updateSelectedStates(t), this.updateDisplay(t), this.updatePreview(t);
    }
  }
  /**
   * Set to current time
   */
  setToCurrentTime(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = this.getCurrentTime();
    e.format === "12" ? (e.hour = s.hour > 12 ? s.hour - 12 : s.hour === 0 ? 12 : s.hour, e.period = s.hour >= 12 ? "PM" : "AM") : e.hour = s.hour, e.minute = s.minute, e.second = s.second, this.setState(t, e), this.updateSelectedStates(t), this.scrollToSelectedOptions(t), this.updatePreview(t);
  }
  /**
   * Apply time selection
   */
  applyTime(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = this.formatTimeValue(e);
    this.setValue(t, s), this.closeDropdown(t), this.dispatchTimePickerEvent(t, "timepicker:change", {
      value: s,
      state: { ...e }
    });
  }
  /**
   * Clear time value
   */
  clearTime(t) {
    this.setValue(t, ""), this.dispatchTimePickerEvent(t, "timepicker:change", {
      value: "",
      state: null
    });
  }
  /**
   * Handle keyboard navigation
   */
  handleKeydown(t, e) {
    const s = this.getState(t);
    if (s)
      switch (e.key) {
        case "Enter":
        case " ":
          s.isOpen ? (e.preventDefault(), this.applyTime(t)) : (e.preventDefault(), this.openDropdown(t));
          break;
        case "Escape":
          s.isOpen && (e.preventDefault(), this.closeDropdown(t));
          break;
        case "ArrowUp":
          s.isOpen ? e.preventDefault() : (e.preventDefault(), this.incrementTime(t, "minute", 1));
          break;
        case "ArrowDown":
          s.isOpen ? e.preventDefault() : (e.preventDefault(), this.incrementTime(t, "minute", -1));
          break;
        case "ArrowLeft":
          s.isOpen || (e.preventDefault(), this.incrementTime(t, "hour", -1));
          break;
        case "ArrowRight":
          s.isOpen || (e.preventDefault(), this.incrementTime(t, "hour", 1));
          break;
      }
  }
  /**
   * Increment/decrement time values
   */
  incrementTime(t, e, s) {
    const n = this.getState(t);
    if (n) {
      switch (e) {
        case "hour":
          n.format === "12" ? (n.hour = n.hour + s, n.hour > 12 && (n.hour = 1), n.hour < 1 && (n.hour = 12)) : (n.hour = n.hour + s, n.hour > 23 && (n.hour = 0), n.hour < 0 && (n.hour = 23));
          break;
        case "minute":
          n.minute = n.minute + s * n.step, n.minute >= 60 ? n.minute = n.minute % 60 : n.minute < 0 && (n.minute = 60 + n.minute % 60, n.minute === 60 && (n.minute = 0));
          break;
        case "second":
          n.second = n.second + s, n.second >= 60 ? n.second = 0 : n.second < 0 && (n.second = 59);
          break;
      }
      this.setState(t, n), this.updateDisplay(t), this.dispatchTimePickerEvent(t, "timepicker:increment", {
        unit: e,
        direction: s,
        value: this.formatTimeValue(n)
      });
    }
  }
  /**
   * Update display value
   */
  updateDisplay(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = this.formatTimeValue(e), n = h.querySelector("[data-timepicker-trigger]", t);
    n && (n.value = s || "");
  }
  /**
   * Update preview in dropdown
   */
  updatePreview(t) {
    this.updateDisplay(t);
  }
  /**
   * Set value and update hidden input
   */
  setValue(t, e) {
    const s = h.querySelector(".timepicker-hidden-input", t), n = h.querySelector("[data-timepicker-trigger]", t);
    s && (s.value = e), n && (n.value = e);
    const i = this.getState(t);
    i && (i.value = e, this.setState(t, i));
  }
  /**
   * Update selected states in dropdown
   */
  updateSelectedStates(t) {
    const e = this.getState(t);
    if (!e) return;
    h.querySelectorAll(".selected", t).forEach((i) => i.classList.remove("selected"));
    const s = h.querySelector(`[data-timepicker-hour="${e.hour}"]`, t);
    s && s.classList.add("selected");
    const n = h.querySelector(`[data-timepicker-minute="${e.minute}"]`, t);
    if (n && n.classList.add("selected"), e.showSeconds) {
      const i = t.querySelector(`[data-timepicker-second="${e.second}"]`);
      i && i.classList.add("selected");
    }
    if (e.format === "12") {
      const i = t.querySelector(`[data-timepicker-period="${e.period}"]`);
      i && i.classList.add("selected");
    }
  }
  /**
   * Update format toggle buttons
   */
  updateFormatButtons(t) {
    const e = this.getState(t);
    if (!e) return;
    h.querySelectorAll("[data-timepicker-format]", t).forEach((n) => {
      n.dataset.timepickerFormat === e.format ? (n.classList.add("bg-brand", "text-foreground-brand"), n.classList.remove("bg-surface", "text-muted")) : (n.classList.remove("bg-brand", "text-foreground-brand"), n.classList.add("bg-surface", "text-muted"));
    });
  }
  /**
   * Update hour options based on current format
   */
  updateHourOptions(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = h.querySelector("[data-timepicker-dropdown] .h-24:first-child", t);
    if (!s) return;
    const n = e.format === "12" ? Array.from({ length: 12 }, (i, a) => a + 1) : (
      // 1-12 for 12h
      Array.from({ length: 24 }, (i, a) => a)
    );
    s.innerHTML = "", n.forEach((i) => {
      const a = document.createElement("button");
      a.type = "button", a.dataset.timepickerHour = i.toString(), a.className = "w-full px-2 py-1 text-sm text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-brand focus:text-foreground-brand transition-colors", a.textContent = i.toString().padStart(2, "0"), s.appendChild(a);
    }), e.format === "12" && (e.hour < 1 || e.hour > 12) ? (e.hour = Math.max(1, Math.min(12, e.hour)), this.setState(t, e), this.updateDisplay(t), this.updatePreview(t)) : e.format === "24" && (e.hour < 0 || e.hour > 23) && (e.hour = Math.max(0, Math.min(23, e.hour)), this.setState(t, e), this.updateDisplay(t), this.updatePreview(t));
  }
  /**
   * Scroll to selected options in dropdown lists
   */
  scrollToSelectedOptions(t) {
    h.querySelectorAll(".selected", t).forEach((s) => {
      s.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }
  /**
   * Position dropdown using Floating UI
   */
  positionDropdown(t) {
    const e = h.querySelector("[data-timepicker-dropdown]", t), s = h.querySelector("[data-timepicker-trigger]", t);
    !e || !s || this.setupFloating(t, s, e);
  }
  /**
   * Setup floating for time picker using Floating UI
   */
  setupFloating(t, e, s) {
    const n = this.getState(t);
    if (!n) return;
    n.floating && n.floating.cleanup();
    const i = t.dataset.position || "bottom", a = t.dataset.align || "start", o = parseInt(t.dataset.offset || "8");
    let l = i;
    (i === "bottom" || i === "top") && (a === "start" ? l = `${i}-start` : a === "end" && (l = `${i}-end`));
    const c = wt.getInstance().createFloating(e, s, {
      placement: l,
      offset: o,
      flip: {
        fallbackStrategy: "bestFit",
        padding: 8
      },
      shift: {
        padding: 8,
        crossAxis: !0
      },
      size: {
        apply: ({ availableHeight: d }) => {
          const p = Math.max(d - 16, 200);
          s.style.maxHeight = `${p}px`, s.style.overflowY = "auto";
        }
      },
      hide: {
        strategy: "escaped"
      },
      autoUpdate: {
        ancestorScroll: !0,
        ancestorResize: !0,
        elementResize: !0,
        layoutShift: !0
      }
    });
    n.floating = c, this.setState(t, n);
  }
  /**
   * Parse time string into components
   */
  parseTime(t) {
    var e;
    if (!t) return null;
    try {
      const s = [
        /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i,
        /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/
      ];
      for (const n of s) {
        const i = t.match(n);
        if (i) {
          const a = parseInt(i[1]), o = parseInt(i[2]), l = parseInt(i[3] || "0"), c = (e = i[4]) == null ? void 0 : e.toUpperCase();
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
    const t = /* @__PURE__ */ new Date();
    return {
      hour: t.getHours(),
      minute: t.getMinutes(),
      second: t.getSeconds()
    };
  }
  /**
   * Format time value from state
   */
  formatTimeValue(t) {
    const { hour: e, minute: s, second: n, period: i, format: a, showSeconds: o } = t;
    if (a === "12") {
      const l = e.toString(), c = s.toString().padStart(2, "0"), d = n.toString().padStart(2, "0");
      return o ? `${l}:${c}:${d} ${i}` : `${l}:${c} ${i}`;
    } else {
      const l = e.toString().padStart(2, "0"), c = s.toString().padStart(2, "0"), d = n.toString().padStart(2, "0");
      return o ? `${l}:${c}:${d}` : `${l}:${c}`;
    }
  }
  /**
   * Check if timepicker is disabled
   */
  isDisabled(t) {
    return t.dataset.disabled === "true";
  }
  /**
   * Dispatch custom timepicker event
   */
  dispatchTimePickerEvent(t, e, s = null) {
    x.dispatchCustomEvent(t, e, {
      timepicker: t,
      ...s
    }, {
      bubbles: !0,
      cancelable: !0
    });
  }
  /**
   * Get timepicker state (for external access)
   */
  getTimePickerState(t) {
    return this.getState(t) || null;
  }
  /**
   * Set time programmatically
   */
  setTime(t, e) {
    const s = this.parseTime(e), n = this.getState(t);
    !s || !n || (n.hour = s.hour, n.minute = s.minute, n.second = s.second, s.period && (n.period = s.period), this.setState(t, n), this.updateDisplay(t), this.updateSelectedStates(t), this.dispatchTimePickerEvent(t, "timepicker:change", {
      value: this.formatTimeValue(n),
      state: { ...n }
    }));
  }
  /**
   * Clean up TimePickerActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.getAllStates().forEach((t, e) => {
      t.floating && t.floating.cleanup();
    });
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  xs.getInstance().init();
}) : xs.getInstance().init();
window.TimePickerActions = xs;
xs.getInstance();
class As extends K {
  /**
   * Initialize accordion elements - required by BaseActionClass
   */
  initializeElements() {
    h.querySelectorAll("details[data-accordion]").forEach((t) => {
      this.initializeAccordion(t);
    });
  }
  /**
   * Initialize a single accordion element
   */
  initializeAccordion(t) {
    if (this.hasState(t))
      return;
    const e = {
      isAnimating: !1,
      animation: null,
      isExpanding: !1
    };
    this.setState(t, e);
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("details[data-accordion] summary", (t, e) => {
      const s = h.findClosest(t, "details[data-accordion]");
      s && this.handleSummaryClick(s, e);
    }), x.handleDelegatedEvent("toggle", "details[data-accordion]", (t) => {
      this.handleToggle(t);
    });
  }
  /**
   * Setup dynamic observer for new accordions - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          s.matches && s.matches("details[data-accordion]") && this.initializeAccordion(s), h.querySelectorAll("details[data-accordion]", s).forEach((n) => {
            this.initializeAccordion(n);
          });
        }
      });
    });
  }
  /**
   * Handle summary click with animation
   */
  handleSummaryClick(t, e) {
    const s = this.getState(t);
    if (!s) return;
    if (s.isAnimating) {
      e.preventDefault();
      return;
    }
    if (B.prefersReducedMotion())
      return;
    e.preventDefault();
    const n = !t.open;
    s.isExpanding = n, n ? this.expand(t) : this.shrink(t);
  }
  /**
   * Handle toggle events (for keyboard navigation)
   */
  handleToggle(t) {
    this.dispatchAccordionEvent(t, "accordion:toggle", {
      isExpanded: t.open
    });
  }
  /**
   * Expand accordion with animation
   */
  expand(t) {
    const e = this.getState(t);
    if (!e) return;
    e.isAnimating = !0, t.setAttribute("animating", ""), t.open = !0;
    const s = h.querySelector("summary", t), n = s ? s.offsetHeight : 0, i = t.offsetHeight;
    e.animation = B.expandHeight(t, {
      fromHeight: n,
      toHeight: i,
      duration: 300,
      easing: "ease-out",
      onComplete: () => {
        this.onAnimationFinish(t);
      }
    }), this.dispatchAccordionEvent(t, "accordion:expanding");
  }
  /**
   * Shrink accordion with animation
   */
  shrink(t) {
    const e = this.getState(t);
    if (!e) return;
    e.isAnimating = !0, t.setAttribute("animating", "");
    const s = h.querySelector("summary", t), n = s ? s.offsetHeight : 0;
    e.animation = B.collapseHeight(t, {
      toHeight: n,
      duration: 300,
      easing: "ease-out",
      onComplete: () => {
        t.open = !1, this.onAnimationFinish(t);
      }
    }), this.dispatchAccordionEvent(t, "accordion:collapsing");
  }
  /**
   * Clean up after animation finishes
   */
  onAnimationFinish(t) {
    const e = this.getState(t);
    e && (t.removeAttribute("animating"), t.style.height = "", t.style.overflow = "", e.animation = null, e.isAnimating = !1, this.setState(t, e), this.dispatchAccordionEvent(t, "accordion:animated", {
      isExpanded: t.open
    }));
  }
  /**
   * Programmatically open an accordion
   */
  openAccordion(t) {
    const e = h.getElementById(t);
    if (!e || !e.matches("details[data-accordion]"))
      return console.warn(`Accordion with id "${t}" not found`), !1;
    if (e.open)
      return !0;
    const s = this.getState(e);
    return s && s.isAnimating ? !1 : B.prefersReducedMotion() ? (e.open = !0, !0) : (this.expand(e), !0);
  }
  /**
   * Programmatically close an accordion
   */
  closeAccordion(t) {
    const e = h.getElementById(t);
    if (!e || !e.matches("details[data-accordion]"))
      return console.warn(`Accordion with id "${t}" not found`), !1;
    if (!e.open)
      return !0;
    const s = this.getState(e);
    return s && s.isAnimating ? !1 : B.prefersReducedMotion() ? (e.open = !1, !0) : (this.shrink(e), !0);
  }
  /**
   * Toggle an accordion's state
   */
  toggleAccordion(t) {
    const e = h.getElementById(t);
    return !e || !e.matches("details[data-accordion]") ? (console.warn(`Accordion with id "${t}" not found`), !1) : e.open ? this.closeAccordion(t) : this.openAccordion(t);
  }
  /**
   * Check if accordion is open
   */
  isAccordionOpen(t) {
    const e = h.getElementById(t);
    return e ? e.open : !1;
  }
  /**
   * Check if accordion is animating
   */
  isAccordionAnimating(t) {
    const e = h.getElementById(t);
    if (!e) return !1;
    const s = this.getState(e);
    return s ? s.isAnimating : !1;
  }
  /**
   * Get accordion state
   */
  getAccordionState(t) {
    const e = h.getElementById(t);
    return e && this.getState(e) || null;
  }
  /**
   * Dispatch custom accordion events
   */
  dispatchAccordionEvent(t, e, s = {}) {
    x.dispatchCustomEvent(t, e, {
      accordion: t,
      ...s
    }, {
      bubbles: !0,
      cancelable: !0
    });
  }
  /**
   * Clean up AccordionActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.getAllStates().forEach((t, e) => {
      B.cancelAnimation(t.animation), e.removeAttribute("animating"), e.style.height = "", e.style.overflow = "";
    });
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  As.getInstance().init();
}) : As.getInstance().init();
window.AccordionActions = As;
As.getInstance();
var Sl = typeof global == "object" && global && global.Object === Object && global, Bu = typeof self == "object" && self && self.Object === Object && self, oe = Sl || Bu || Function("return this")(), Te = oe.Symbol, xl = Object.prototype, Fu = xl.hasOwnProperty, Pu = xl.toString, Qs = Te ? Te.toStringTag : void 0;
function ju(r) {
  var t = Fu.call(r, Qs), e = r[Qs];
  try {
    r[Qs] = void 0;
    var s = !0;
  } catch {
  }
  var n = Pu.call(r);
  return s && (t ? r[Qs] = e : delete r[Qs]), n;
}
var Hu = Object.prototype, zu = Hu.toString;
function Uu(r) {
  return zu.call(r);
}
var Vu = "[object Null]", Gu = "[object Undefined]", lo = Te ? Te.toStringTag : void 0;
function Os(r) {
  return r == null ? r === void 0 ? Gu : Vu : lo && lo in Object(r) ? ju(r) : Uu(r);
}
function fe(r) {
  return r != null && typeof r == "object";
}
var Be = Array.isArray;
function Le(r) {
  var t = typeof r;
  return r != null && (t == "object" || t == "function");
}
function Al(r) {
  return r;
}
var Ku = "[object AsyncFunction]", Yu = "[object Function]", Wu = "[object GeneratorFunction]", Zu = "[object Proxy]";
function Aa(r) {
  if (!Le(r))
    return !1;
  var t = Os(r);
  return t == Yu || t == Wu || t == Ku || t == Zu;
}
var Sr = oe["__core-js_shared__"], co = function() {
  var r = /[^.]+$/.exec(Sr && Sr.keys && Sr.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function Xu(r) {
  return !!co && co in r;
}
var Qu = Function.prototype, Ju = Qu.toString;
function je(r) {
  if (r != null) {
    try {
      return Ju.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
var td = /[\\^$.*+?()[\]{}|]/g, ed = /^\[object .+?Constructor\]$/, sd = Function.prototype, nd = Object.prototype, id = sd.toString, rd = nd.hasOwnProperty, ad = RegExp(
  "^" + id.call(rd).replace(td, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function od(r) {
  if (!Le(r) || Xu(r))
    return !1;
  var t = Aa(r) ? ad : ed;
  return t.test(je(r));
}
function ld(r, t) {
  return r == null ? void 0 : r[t];
}
function He(r, t) {
  var e = ld(r, t);
  return od(e) ? e : void 0;
}
var $r = He(oe, "WeakMap"), uo = Object.create, cd = /* @__PURE__ */ function() {
  function r() {
  }
  return function(t) {
    if (!Le(t))
      return {};
    if (uo)
      return uo(t);
    r.prototype = t;
    var e = new r();
    return r.prototype = void 0, e;
  };
}();
function ud(r, t, e) {
  switch (e.length) {
    case 0:
      return r.call(t);
    case 1:
      return r.call(t, e[0]);
    case 2:
      return r.call(t, e[0], e[1]);
    case 3:
      return r.call(t, e[0], e[1], e[2]);
  }
  return r.apply(t, e);
}
function dd(r, t) {
  var e = -1, s = r.length;
  for (t || (t = Array(s)); ++e < s; )
    t[e] = r[e];
  return t;
}
var hd = 800, fd = 16, gd = Date.now;
function pd(r) {
  var t = 0, e = 0;
  return function() {
    var s = gd(), n = fd - (s - e);
    if (e = s, n > 0) {
      if (++t >= hd)
        return arguments[0];
    } else
      t = 0;
    return r.apply(void 0, arguments);
  };
}
function md(r) {
  return function() {
    return r;
  };
}
var oi = function() {
  try {
    var r = He(Object, "defineProperty");
    return r({}, "", {}), r;
  } catch {
  }
}(), bd = oi ? function(r, t) {
  return oi(r, "toString", {
    configurable: !0,
    enumerable: !1,
    value: md(t),
    writable: !0
  });
} : Al, yd = pd(bd);
function vd(r, t) {
  for (var e = -1, s = r == null ? 0 : r.length; ++e < s && t(r[e], e, r) !== !1; )
    ;
  return r;
}
var wd = 9007199254740991, Sd = /^(?:0|[1-9]\d*)$/;
function El(r, t) {
  var e = typeof r;
  return t = t ?? wd, !!t && (e == "number" || e != "symbol" && Sd.test(r)) && r > -1 && r % 1 == 0 && r < t;
}
function Ea(r, t, e) {
  t == "__proto__" && oi ? oi(r, t, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  }) : r[t] = e;
}
function bn(r, t) {
  return r === t || r !== r && t !== t;
}
var xd = Object.prototype, Ad = xd.hasOwnProperty;
function Dl(r, t, e) {
  var s = r[t];
  (!(Ad.call(r, t) && bn(s, e)) || e === void 0 && !(t in r)) && Ea(r, t, e);
}
function Ed(r, t, e, s) {
  var n = !e;
  e || (e = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var o = t[i], l = void 0;
    l === void 0 && (l = r[o]), n ? Ea(e, o, l) : Dl(e, o, l);
  }
  return e;
}
var ho = Math.max;
function Dd(r, t, e) {
  return t = ho(t === void 0 ? r.length - 1 : t, 0), function() {
    for (var s = arguments, n = -1, i = ho(s.length - t, 0), a = Array(i); ++n < i; )
      a[n] = s[t + n];
    n = -1;
    for (var o = Array(t + 1); ++n < t; )
      o[n] = s[n];
    return o[t] = e(a), ud(r, this, o);
  };
}
function Td(r, t) {
  return yd(Dd(r, t, Al), r + "");
}
var Cd = 9007199254740991;
function Tl(r) {
  return typeof r == "number" && r > -1 && r % 1 == 0 && r <= Cd;
}
function vi(r) {
  return r != null && Tl(r.length) && !Aa(r);
}
function Ld(r, t, e) {
  if (!Le(e))
    return !1;
  var s = typeof t;
  return (s == "number" ? vi(e) && El(t, e.length) : s == "string" && t in e) ? bn(e[t], r) : !1;
}
function Id(r) {
  return Td(function(t, e) {
    var s = -1, n = e.length, i = n > 1 ? e[n - 1] : void 0, a = n > 2 ? e[2] : void 0;
    for (i = r.length > 3 && typeof i == "function" ? (n--, i) : void 0, a && Ld(e[0], e[1], a) && (i = n < 3 ? void 0 : i, n = 1), t = Object(t); ++s < n; ) {
      var o = e[s];
      o && r(t, o, s, i);
    }
    return t;
  });
}
var kd = Object.prototype;
function Da(r) {
  var t = r && r.constructor, e = typeof t == "function" && t.prototype || kd;
  return r === e;
}
function Nd(r, t) {
  for (var e = -1, s = Array(r); ++e < r; )
    s[e] = t(e);
  return s;
}
var Od = "[object Arguments]";
function fo(r) {
  return fe(r) && Os(r) == Od;
}
var Cl = Object.prototype, qd = Cl.hasOwnProperty, Md = Cl.propertyIsEnumerable, Br = fo(/* @__PURE__ */ function() {
  return arguments;
}()) ? fo : function(r) {
  return fe(r) && qd.call(r, "callee") && !Md.call(r, "callee");
};
function Rd() {
  return !1;
}
var Ll = typeof exports == "object" && exports && !exports.nodeType && exports, go = Ll && typeof module == "object" && module && !module.nodeType && module, _d = go && go.exports === Ll, po = _d ? oe.Buffer : void 0, $d = po ? po.isBuffer : void 0, ln = $d || Rd, Bd = "[object Arguments]", Fd = "[object Array]", Pd = "[object Boolean]", jd = "[object Date]", Hd = "[object Error]", zd = "[object Function]", Ud = "[object Map]", Vd = "[object Number]", Gd = "[object Object]", Kd = "[object RegExp]", Yd = "[object Set]", Wd = "[object String]", Zd = "[object WeakMap]", Xd = "[object ArrayBuffer]", Qd = "[object DataView]", Jd = "[object Float32Array]", th = "[object Float64Array]", eh = "[object Int8Array]", sh = "[object Int16Array]", nh = "[object Int32Array]", ih = "[object Uint8Array]", rh = "[object Uint8ClampedArray]", ah = "[object Uint16Array]", oh = "[object Uint32Array]", G = {};
G[Jd] = G[th] = G[eh] = G[sh] = G[nh] = G[ih] = G[rh] = G[ah] = G[oh] = !0;
G[Bd] = G[Fd] = G[Xd] = G[Pd] = G[Qd] = G[jd] = G[Hd] = G[zd] = G[Ud] = G[Vd] = G[Gd] = G[Kd] = G[Yd] = G[Wd] = G[Zd] = !1;
function lh(r) {
  return fe(r) && Tl(r.length) && !!G[Os(r)];
}
function Ta(r) {
  return function(t) {
    return r(t);
  };
}
var Il = typeof exports == "object" && exports && !exports.nodeType && exports, en = Il && typeof module == "object" && module && !module.nodeType && module, ch = en && en.exports === Il, xr = ch && Sl.process, Es = function() {
  try {
    var r = en && en.require && en.require("util").types;
    return r || xr && xr.binding && xr.binding("util");
  } catch {
  }
}(), mo = Es && Es.isTypedArray, Ca = mo ? Ta(mo) : lh, uh = Object.prototype, dh = uh.hasOwnProperty;
function kl(r, t) {
  var e = Be(r), s = !e && Br(r), n = !e && !s && ln(r), i = !e && !s && !n && Ca(r), a = e || s || n || i, o = a ? Nd(r.length, String) : [], l = o.length;
  for (var c in r)
    (t || dh.call(r, c)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    n && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    El(c, l))) && o.push(c);
  return o;
}
function Nl(r, t) {
  return function(e) {
    return r(t(e));
  };
}
var hh = Nl(Object.keys, Object), fh = Object.prototype, gh = fh.hasOwnProperty;
function ph(r) {
  if (!Da(r))
    return hh(r);
  var t = [];
  for (var e in Object(r))
    gh.call(r, e) && e != "constructor" && t.push(e);
  return t;
}
function mh(r) {
  return vi(r) ? kl(r) : ph(r);
}
function bh(r) {
  var t = [];
  if (r != null)
    for (var e in Object(r))
      t.push(e);
  return t;
}
var yh = Object.prototype, vh = yh.hasOwnProperty;
function wh(r) {
  if (!Le(r))
    return bh(r);
  var t = Da(r), e = [];
  for (var s in r)
    s == "constructor" && (t || !vh.call(r, s)) || e.push(s);
  return e;
}
function Ol(r) {
  return vi(r) ? kl(r, !0) : wh(r);
}
var cn = He(Object, "create");
function Sh() {
  this.__data__ = cn ? cn(null) : {}, this.size = 0;
}
function xh(r) {
  var t = this.has(r) && delete this.__data__[r];
  return this.size -= t ? 1 : 0, t;
}
var Ah = "__lodash_hash_undefined__", Eh = Object.prototype, Dh = Eh.hasOwnProperty;
function Th(r) {
  var t = this.__data__;
  if (cn) {
    var e = t[r];
    return e === Ah ? void 0 : e;
  }
  return Dh.call(t, r) ? t[r] : void 0;
}
var Ch = Object.prototype, Lh = Ch.hasOwnProperty;
function Ih(r) {
  var t = this.__data__;
  return cn ? t[r] !== void 0 : Lh.call(t, r);
}
var kh = "__lodash_hash_undefined__";
function Nh(r, t) {
  var e = this.__data__;
  return this.size += this.has(r) ? 0 : 1, e[r] = cn && t === void 0 ? kh : t, this;
}
function Fe(r) {
  var t = -1, e = r == null ? 0 : r.length;
  for (this.clear(); ++t < e; ) {
    var s = r[t];
    this.set(s[0], s[1]);
  }
}
Fe.prototype.clear = Sh;
Fe.prototype.delete = xh;
Fe.prototype.get = Th;
Fe.prototype.has = Ih;
Fe.prototype.set = Nh;
function Oh() {
  this.__data__ = [], this.size = 0;
}
function wi(r, t) {
  for (var e = r.length; e--; )
    if (bn(r[e][0], t))
      return e;
  return -1;
}
var qh = Array.prototype, Mh = qh.splice;
function Rh(r) {
  var t = this.__data__, e = wi(t, r);
  if (e < 0)
    return !1;
  var s = t.length - 1;
  return e == s ? t.pop() : Mh.call(t, e, 1), --this.size, !0;
}
function _h(r) {
  var t = this.__data__, e = wi(t, r);
  return e < 0 ? void 0 : t[e][1];
}
function $h(r) {
  return wi(this.__data__, r) > -1;
}
function Bh(r, t) {
  var e = this.__data__, s = wi(e, r);
  return s < 0 ? (++this.size, e.push([r, t])) : e[s][1] = t, this;
}
function me(r) {
  var t = -1, e = r == null ? 0 : r.length;
  for (this.clear(); ++t < e; ) {
    var s = r[t];
    this.set(s[0], s[1]);
  }
}
me.prototype.clear = Oh;
me.prototype.delete = Rh;
me.prototype.get = _h;
me.prototype.has = $h;
me.prototype.set = Bh;
var un = He(oe, "Map");
function Fh() {
  this.size = 0, this.__data__ = {
    hash: new Fe(),
    map: new (un || me)(),
    string: new Fe()
  };
}
function Ph(r) {
  var t = typeof r;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? r !== "__proto__" : r === null;
}
function Si(r, t) {
  var e = r.__data__;
  return Ph(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
function jh(r) {
  var t = Si(this, r).delete(r);
  return this.size -= t ? 1 : 0, t;
}
function Hh(r) {
  return Si(this, r).get(r);
}
function zh(r) {
  return Si(this, r).has(r);
}
function Uh(r, t) {
  var e = Si(this, r), s = e.size;
  return e.set(r, t), this.size += e.size == s ? 0 : 1, this;
}
function ze(r) {
  var t = -1, e = r == null ? 0 : r.length;
  for (this.clear(); ++t < e; ) {
    var s = r[t];
    this.set(s[0], s[1]);
  }
}
ze.prototype.clear = Fh;
ze.prototype.delete = jh;
ze.prototype.get = Hh;
ze.prototype.has = zh;
ze.prototype.set = Uh;
function Vh(r, t) {
  for (var e = -1, s = t.length, n = r.length; ++e < s; )
    r[n + e] = t[e];
  return r;
}
var ql = Nl(Object.getPrototypeOf, Object), Gh = "[object Object]", Kh = Function.prototype, Yh = Object.prototype, Ml = Kh.toString, Wh = Yh.hasOwnProperty, Zh = Ml.call(Object);
function Xh(r) {
  if (!fe(r) || Os(r) != Gh)
    return !1;
  var t = ql(r);
  if (t === null)
    return !0;
  var e = Wh.call(t, "constructor") && t.constructor;
  return typeof e == "function" && e instanceof e && Ml.call(e) == Zh;
}
function Qh() {
  this.__data__ = new me(), this.size = 0;
}
function Jh(r) {
  var t = this.__data__, e = t.delete(r);
  return this.size = t.size, e;
}
function tf(r) {
  return this.__data__.get(r);
}
function ef(r) {
  return this.__data__.has(r);
}
var sf = 200;
function nf(r, t) {
  var e = this.__data__;
  if (e instanceof me) {
    var s = e.__data__;
    if (!un || s.length < sf - 1)
      return s.push([r, t]), this.size = ++e.size, this;
    e = this.__data__ = new ze(s);
  }
  return e.set(r, t), this.size = e.size, this;
}
function te(r) {
  var t = this.__data__ = new me(r);
  this.size = t.size;
}
te.prototype.clear = Qh;
te.prototype.delete = Jh;
te.prototype.get = tf;
te.prototype.has = ef;
te.prototype.set = nf;
var Rl = typeof exports == "object" && exports && !exports.nodeType && exports, bo = Rl && typeof module == "object" && module && !module.nodeType && module, rf = bo && bo.exports === Rl, yo = rf ? oe.Buffer : void 0, vo = yo ? yo.allocUnsafe : void 0;
function _l(r, t) {
  if (t)
    return r.slice();
  var e = r.length, s = vo ? vo(e) : new r.constructor(e);
  return r.copy(s), s;
}
function af(r, t) {
  for (var e = -1, s = r == null ? 0 : r.length, n = 0, i = []; ++e < s; ) {
    var a = r[e];
    t(a, e, r) && (i[n++] = a);
  }
  return i;
}
function of() {
  return [];
}
var lf = Object.prototype, cf = lf.propertyIsEnumerable, wo = Object.getOwnPropertySymbols, uf = wo ? function(r) {
  return r == null ? [] : (r = Object(r), af(wo(r), function(t) {
    return cf.call(r, t);
  }));
} : of;
function df(r, t, e) {
  var s = t(r);
  return Be(r) ? s : Vh(s, e(r));
}
function Fr(r) {
  return df(r, mh, uf);
}
var Pr = He(oe, "DataView"), jr = He(oe, "Promise"), Hr = He(oe, "Set"), So = "[object Map]", hf = "[object Object]", xo = "[object Promise]", Ao = "[object Set]", Eo = "[object WeakMap]", Do = "[object DataView]", ff = je(Pr), gf = je(un), pf = je(jr), mf = je(Hr), bf = je($r), $t = Os;
(Pr && $t(new Pr(new ArrayBuffer(1))) != Do || un && $t(new un()) != So || jr && $t(jr.resolve()) != xo || Hr && $t(new Hr()) != Ao || $r && $t(new $r()) != Eo) && ($t = function(r) {
  var t = Os(r), e = t == hf ? r.constructor : void 0, s = e ? je(e) : "";
  if (s)
    switch (s) {
      case ff:
        return Do;
      case gf:
        return So;
      case pf:
        return xo;
      case mf:
        return Ao;
      case bf:
        return Eo;
    }
  return t;
});
var yf = Object.prototype, vf = yf.hasOwnProperty;
function wf(r) {
  var t = r.length, e = new r.constructor(t);
  return t && typeof r[0] == "string" && vf.call(r, "index") && (e.index = r.index, e.input = r.input), e;
}
var li = oe.Uint8Array;
function La(r) {
  var t = new r.constructor(r.byteLength);
  return new li(t).set(new li(r)), t;
}
function Sf(r, t) {
  var e = La(r.buffer);
  return new r.constructor(e, r.byteOffset, r.byteLength);
}
var xf = /\w*$/;
function Af(r) {
  var t = new r.constructor(r.source, xf.exec(r));
  return t.lastIndex = r.lastIndex, t;
}
var To = Te ? Te.prototype : void 0, Co = To ? To.valueOf : void 0;
function Ef(r) {
  return Co ? Object(Co.call(r)) : {};
}
function $l(r, t) {
  var e = t ? La(r.buffer) : r.buffer;
  return new r.constructor(e, r.byteOffset, r.length);
}
var Df = "[object Boolean]", Tf = "[object Date]", Cf = "[object Map]", Lf = "[object Number]", If = "[object RegExp]", kf = "[object Set]", Nf = "[object String]", Of = "[object Symbol]", qf = "[object ArrayBuffer]", Mf = "[object DataView]", Rf = "[object Float32Array]", _f = "[object Float64Array]", $f = "[object Int8Array]", Bf = "[object Int16Array]", Ff = "[object Int32Array]", Pf = "[object Uint8Array]", jf = "[object Uint8ClampedArray]", Hf = "[object Uint16Array]", zf = "[object Uint32Array]";
function Uf(r, t, e) {
  var s = r.constructor;
  switch (t) {
    case qf:
      return La(r);
    case Df:
    case Tf:
      return new s(+r);
    case Mf:
      return Sf(r);
    case Rf:
    case _f:
    case $f:
    case Bf:
    case Ff:
    case Pf:
    case jf:
    case Hf:
    case zf:
      return $l(r, e);
    case Cf:
      return new s();
    case Lf:
    case Nf:
      return new s(r);
    case If:
      return Af(r);
    case kf:
      return new s();
    case Of:
      return Ef(r);
  }
}
function Bl(r) {
  return typeof r.constructor == "function" && !Da(r) ? cd(ql(r)) : {};
}
var Vf = "[object Map]";
function Gf(r) {
  return fe(r) && $t(r) == Vf;
}
var Lo = Es && Es.isMap, Kf = Lo ? Ta(Lo) : Gf, Yf = "[object Set]";
function Wf(r) {
  return fe(r) && $t(r) == Yf;
}
var Io = Es && Es.isSet, Zf = Io ? Ta(Io) : Wf, Xf = 1, Fl = "[object Arguments]", Qf = "[object Array]", Jf = "[object Boolean]", tg = "[object Date]", eg = "[object Error]", Pl = "[object Function]", sg = "[object GeneratorFunction]", ng = "[object Map]", ig = "[object Number]", jl = "[object Object]", rg = "[object RegExp]", ag = "[object Set]", og = "[object String]", lg = "[object Symbol]", cg = "[object WeakMap]", ug = "[object ArrayBuffer]", dg = "[object DataView]", hg = "[object Float32Array]", fg = "[object Float64Array]", gg = "[object Int8Array]", pg = "[object Int16Array]", mg = "[object Int32Array]", bg = "[object Uint8Array]", yg = "[object Uint8ClampedArray]", vg = "[object Uint16Array]", wg = "[object Uint32Array]", V = {};
V[Fl] = V[Qf] = V[ug] = V[dg] = V[Jf] = V[tg] = V[hg] = V[fg] = V[gg] = V[pg] = V[mg] = V[ng] = V[ig] = V[jl] = V[rg] = V[ag] = V[og] = V[lg] = V[bg] = V[yg] = V[vg] = V[wg] = !0;
V[eg] = V[Pl] = V[cg] = !1;
function ei(r, t, e, s, n, i) {
  var a, o = t & Xf;
  if (a !== void 0)
    return a;
  if (!Le(r))
    return r;
  var l = Be(r);
  if (l)
    a = wf(r);
  else {
    var c = $t(r), d = c == Pl || c == sg;
    if (ln(r))
      return _l(r, o);
    if (c == jl || c == Fl || d && !n)
      a = d ? {} : Bl(r);
    else {
      if (!V[c])
        return n ? r : {};
      a = Uf(r, c, o);
    }
  }
  i || (i = new te());
  var f = i.get(r);
  if (f)
    return f;
  i.set(r, a), Zf(r) ? r.forEach(function(b) {
    a.add(ei(b, t, e, b, r, i));
  }) : Kf(r) && r.forEach(function(b, v) {
    a.set(v, ei(b, t, e, v, r, i));
  });
  var p = Fr, m = l ? void 0 : p(r);
  return vd(m || r, function(b, v) {
    m && (v = b, b = r[v]), Dl(a, v, ei(b, t, e, v, r, i));
  }), a;
}
var Sg = 1, xg = 4;
function hs(r) {
  return ei(r, Sg | xg);
}
var Ag = "__lodash_hash_undefined__";
function Eg(r) {
  return this.__data__.set(r, Ag), this;
}
function Dg(r) {
  return this.__data__.has(r);
}
function ci(r) {
  var t = -1, e = r == null ? 0 : r.length;
  for (this.__data__ = new ze(); ++t < e; )
    this.add(r[t]);
}
ci.prototype.add = ci.prototype.push = Eg;
ci.prototype.has = Dg;
function Tg(r, t) {
  for (var e = -1, s = r == null ? 0 : r.length; ++e < s; )
    if (t(r[e], e, r))
      return !0;
  return !1;
}
function Cg(r, t) {
  return r.has(t);
}
var Lg = 1, Ig = 2;
function Hl(r, t, e, s, n, i) {
  var a = e & Lg, o = r.length, l = t.length;
  if (o != l && !(a && l > o))
    return !1;
  var c = i.get(r), d = i.get(t);
  if (c && d)
    return c == t && d == r;
  var f = -1, p = !0, m = e & Ig ? new ci() : void 0;
  for (i.set(r, t), i.set(t, r); ++f < o; ) {
    var b = r[f], v = t[f];
    if (s)
      var w = a ? s(v, b, f, t, r, i) : s(b, v, f, r, t, i);
    if (w !== void 0) {
      if (w)
        continue;
      p = !1;
      break;
    }
    if (m) {
      if (!Tg(t, function(S, A) {
        if (!Cg(m, A) && (b === S || n(b, S, e, s, i)))
          return m.push(A);
      })) {
        p = !1;
        break;
      }
    } else if (!(b === v || n(b, v, e, s, i))) {
      p = !1;
      break;
    }
  }
  return i.delete(r), i.delete(t), p;
}
function kg(r) {
  var t = -1, e = Array(r.size);
  return r.forEach(function(s, n) {
    e[++t] = [n, s];
  }), e;
}
function Ng(r) {
  var t = -1, e = Array(r.size);
  return r.forEach(function(s) {
    e[++t] = s;
  }), e;
}
var Og = 1, qg = 2, Mg = "[object Boolean]", Rg = "[object Date]", _g = "[object Error]", $g = "[object Map]", Bg = "[object Number]", Fg = "[object RegExp]", Pg = "[object Set]", jg = "[object String]", Hg = "[object Symbol]", zg = "[object ArrayBuffer]", Ug = "[object DataView]", ko = Te ? Te.prototype : void 0, Ar = ko ? ko.valueOf : void 0;
function Vg(r, t, e, s, n, i, a) {
  switch (e) {
    case Ug:
      if (r.byteLength != t.byteLength || r.byteOffset != t.byteOffset)
        return !1;
      r = r.buffer, t = t.buffer;
    case zg:
      return !(r.byteLength != t.byteLength || !i(new li(r), new li(t)));
    case Mg:
    case Rg:
    case Bg:
      return bn(+r, +t);
    case _g:
      return r.name == t.name && r.message == t.message;
    case Fg:
    case jg:
      return r == t + "";
    case $g:
      var o = kg;
    case Pg:
      var l = s & Og;
      if (o || (o = Ng), r.size != t.size && !l)
        return !1;
      var c = a.get(r);
      if (c)
        return c == t;
      s |= qg, a.set(r, t);
      var d = Hl(o(r), o(t), s, n, i, a);
      return a.delete(r), d;
    case Hg:
      if (Ar)
        return Ar.call(r) == Ar.call(t);
  }
  return !1;
}
var Gg = 1, Kg = Object.prototype, Yg = Kg.hasOwnProperty;
function Wg(r, t, e, s, n, i) {
  var a = e & Gg, o = Fr(r), l = o.length, c = Fr(t), d = c.length;
  if (l != d && !a)
    return !1;
  for (var f = l; f--; ) {
    var p = o[f];
    if (!(a ? p in t : Yg.call(t, p)))
      return !1;
  }
  var m = i.get(r), b = i.get(t);
  if (m && b)
    return m == t && b == r;
  var v = !0;
  i.set(r, t), i.set(t, r);
  for (var w = a; ++f < l; ) {
    p = o[f];
    var S = r[p], A = t[p];
    if (s)
      var D = a ? s(A, S, p, t, r, i) : s(S, A, p, r, t, i);
    if (!(D === void 0 ? S === A || n(S, A, e, s, i) : D)) {
      v = !1;
      break;
    }
    w || (w = p == "constructor");
  }
  if (v && !w) {
    var L = r.constructor, C = t.constructor;
    L != C && "constructor" in r && "constructor" in t && !(typeof L == "function" && L instanceof L && typeof C == "function" && C instanceof C) && (v = !1);
  }
  return i.delete(r), i.delete(t), v;
}
var Zg = 1, No = "[object Arguments]", Oo = "[object Array]", Yn = "[object Object]", Xg = Object.prototype, qo = Xg.hasOwnProperty;
function Qg(r, t, e, s, n, i) {
  var a = Be(r), o = Be(t), l = a ? Oo : $t(r), c = o ? Oo : $t(t);
  l = l == No ? Yn : l, c = c == No ? Yn : c;
  var d = l == Yn, f = c == Yn, p = l == c;
  if (p && ln(r)) {
    if (!ln(t))
      return !1;
    a = !0, d = !1;
  }
  if (p && !d)
    return i || (i = new te()), a || Ca(r) ? Hl(r, t, e, s, n, i) : Vg(r, t, l, e, s, n, i);
  if (!(e & Zg)) {
    var m = d && qo.call(r, "__wrapped__"), b = f && qo.call(t, "__wrapped__");
    if (m || b) {
      var v = m ? r.value() : r, w = b ? t.value() : t;
      return i || (i = new te()), n(v, w, e, s, i);
    }
  }
  return p ? (i || (i = new te()), Wg(r, t, e, s, n, i)) : !1;
}
function zl(r, t, e, s, n) {
  return r === t ? !0 : r == null || t == null || !fe(r) && !fe(t) ? r !== r && t !== t : Qg(r, t, e, s, zl, n);
}
function Jg(r) {
  return function(t, e, s) {
    for (var n = -1, i = Object(t), a = s(t), o = a.length; o--; ) {
      var l = a[++n];
      if (e(i[l], l, i) === !1)
        break;
    }
    return t;
  };
}
var tp = Jg();
function zr(r, t, e) {
  (e !== void 0 && !bn(r[t], e) || e === void 0 && !(t in r)) && Ea(r, t, e);
}
function ep(r) {
  return fe(r) && vi(r);
}
function Ur(r, t) {
  if (!(t === "constructor" && typeof r[t] == "function") && t != "__proto__")
    return r[t];
}
function sp(r) {
  return Ed(r, Ol(r));
}
function np(r, t, e, s, n, i, a) {
  var o = Ur(r, e), l = Ur(t, e), c = a.get(l);
  if (c) {
    zr(r, e, c);
    return;
  }
  var d = i ? i(o, l, e + "", r, t, a) : void 0, f = d === void 0;
  if (f) {
    var p = Be(l), m = !p && ln(l), b = !p && !m && Ca(l);
    d = l, p || m || b ? Be(o) ? d = o : ep(o) ? d = dd(o) : m ? (f = !1, d = _l(l, !0)) : b ? (f = !1, d = $l(l, !0)) : d = [] : Xh(l) || Br(l) ? (d = o, Br(o) ? d = sp(o) : (!Le(o) || Aa(o)) && (d = Bl(l))) : f = !1;
  }
  f && (a.set(l, d), n(d, l, s, i, a), a.delete(l)), zr(r, e, d);
}
function Ul(r, t, e, s, n) {
  r !== t && tp(t, function(i, a) {
    if (n || (n = new te()), Le(i))
      np(r, t, a, e, Ul, s, n);
    else {
      var o = s ? s(Ur(r, a), i, a + "", r, t, n) : void 0;
      o === void 0 && (o = i), zr(r, a, o);
    }
  }, Ol);
}
function Ia(r, t) {
  return zl(r, t);
}
var Ee = Id(function(r, t, e) {
  Ul(r, t, e);
}), q = /* @__PURE__ */ ((r) => (r[r.TYPE = 3] = "TYPE", r[r.LEVEL = 12] = "LEVEL", r[r.ATTRIBUTE = 13] = "ATTRIBUTE", r[r.BLOT = 14] = "BLOT", r[r.INLINE = 7] = "INLINE", r[r.BLOCK = 11] = "BLOCK", r[r.BLOCK_BLOT = 10] = "BLOCK_BLOT", r[r.INLINE_BLOT = 6] = "INLINE_BLOT", r[r.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", r[r.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", r[r.ANY = 15] = "ANY", r))(q || {});
class ie {
  constructor(t, e, s = {}) {
    this.attrName = t, this.keyName = e;
    const n = q.TYPE & q.ATTRIBUTE;
    this.scope = s.scope != null ? (
      // Ignore type bits, force attribute bit
      s.scope & q.LEVEL | n
    ) : q.ATTRIBUTE, s.whitelist != null && (this.whitelist = s.whitelist);
  }
  static keys(t) {
    return Array.from(t.attributes).map((e) => e.name);
  }
  add(t, e) {
    return this.canAdd(t, e) ? (t.setAttribute(this.keyName, e), !0) : !1;
  }
  canAdd(t, e) {
    return this.whitelist == null ? !0 : typeof e == "string" ? this.whitelist.indexOf(e.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(e) > -1;
  }
  remove(t) {
    t.removeAttribute(this.keyName);
  }
  value(t) {
    const e = t.getAttribute(this.keyName);
    return this.canAdd(t, e) && e ? e : "";
  }
}
class fs extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const Vl = class Vr {
  constructor() {
    this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
  }
  static find(t, e = !1) {
    if (t == null)
      return null;
    if (this.blots.has(t))
      return this.blots.get(t) || null;
    if (e) {
      let s = null;
      try {
        s = t.parentNode;
      } catch {
        return null;
      }
      return this.find(s, e);
    }
    return null;
  }
  create(t, e, s) {
    const n = this.query(e);
    if (n == null)
      throw new fs(`Unable to create ${e} blot`);
    const i = n, a = (
      // @ts-expect-error Fix me later
      e instanceof Node || e.nodeType === Node.TEXT_NODE ? e : i.create(s)
    ), o = new i(t, a, s);
    return Vr.blots.set(o.domNode, o), o;
  }
  find(t, e = !1) {
    return Vr.find(t, e);
  }
  query(t, e = q.ANY) {
    let s;
    return typeof t == "string" ? s = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? s = this.types.text : typeof t == "number" ? t & q.LEVEL & q.BLOCK ? s = this.types.block : t & q.LEVEL & q.INLINE && (s = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((n) => (s = this.classes[n], !!s)), s = s || this.tags[t.tagName]), s == null ? null : "scope" in s && e & q.LEVEL & s.scope && e & q.TYPE & s.scope ? s : null;
  }
  register(...t) {
    return t.map((e) => {
      const s = "blotName" in e, n = "attrName" in e;
      if (!s && !n)
        throw new fs("Invalid definition");
      if (s && e.blotName === "abstract")
        throw new fs("Cannot register abstract class");
      const i = s ? e.blotName : n ? e.attrName : void 0;
      return this.types[i] = e, n ? typeof e.keyName == "string" && (this.attributes[e.keyName] = e) : s && (e.className && (this.classes[e.className] = e), e.tagName && (Array.isArray(e.tagName) ? e.tagName = e.tagName.map((a) => a.toUpperCase()) : e.tagName = e.tagName.toUpperCase(), (Array.isArray(e.tagName) ? e.tagName : [e.tagName]).forEach((a) => {
        (this.tags[a] == null || e.className == null) && (this.tags[a] = e);
      }))), e;
    });
  }
};
Vl.blots = /* @__PURE__ */ new WeakMap();
let Ds = Vl;
function Mo(r, t) {
  return (r.getAttribute("class") || "").split(/\s+/).filter((e) => e.indexOf(`${t}-`) === 0);
}
class ip extends ie {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((e) => e.split("-").slice(0, -1).join("-"));
  }
  add(t, e) {
    return this.canAdd(t, e) ? (this.remove(t), t.classList.add(`${this.keyName}-${e}`), !0) : !1;
  }
  remove(t) {
    Mo(t, this.keyName).forEach((e) => {
      t.classList.remove(e);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const e = (Mo(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, e) ? e : "";
  }
}
const Ut = ip;
function Er(r) {
  const t = r.split("-"), e = t.slice(1).map((s) => s[0].toUpperCase() + s.slice(1)).join("");
  return t[0] + e;
}
class rp extends ie {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((e) => e.split(":")[0].trim());
  }
  add(t, e) {
    return this.canAdd(t, e) ? (t.style[Er(this.keyName)] = e, !0) : !1;
  }
  remove(t) {
    t.style[Er(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const e = t.style[Er(this.keyName)];
    return this.canAdd(t, e) ? e : "";
  }
}
const Ie = rp;
class ap {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, e) {
    e ? t.add(this.domNode, e) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = Ds.find(this.domNode);
    if (t == null)
      return;
    const e = ie.keys(this.domNode), s = Ut.keys(this.domNode), n = Ie.keys(this.domNode);
    e.concat(s).concat(n).forEach((i) => {
      const a = t.scroll.query(i, q.ATTRIBUTE);
      a instanceof ie && (this.attributes[a.attrName] = a);
    });
  }
  copy(t) {
    Object.keys(this.attributes).forEach((e) => {
      const s = this.attributes[e].value(this.domNode);
      t.format(e, s);
    });
  }
  move(t) {
    this.copy(t), Object.keys(this.attributes).forEach((e) => {
      this.attributes[e].remove(this.domNode);
    }), this.attributes = {};
  }
  values() {
    return Object.keys(this.attributes).reduce(
      (t, e) => (t[e] = this.attributes[e].value(this.domNode), t),
      {}
    );
  }
}
const xi = ap, Gl = class {
  constructor(t, e) {
    this.scroll = t, this.domNode = e, Ds.blots.set(e, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new fs("Blot definition missing tagName");
    let e, s;
    return Array.isArray(this.tagName) ? (typeof t == "string" ? (s = t.toUpperCase(), parseInt(s, 10).toString() === s && (s = parseInt(s, 10))) : typeof t == "number" && (s = t), typeof s == "number" ? e = document.createElement(this.tagName[s - 1]) : s && this.tagName.indexOf(s) > -1 ? e = document.createElement(s) : e = document.createElement(this.tagName[0])) : e = document.createElement(this.tagName), this.className && e.classList.add(this.className), e;
  }
  // Hack for accessing inherited static methods
  get statics() {
    return this.constructor;
  }
  attach() {
  }
  clone() {
    const t = this.domNode.cloneNode(!1);
    return this.scroll.create(t);
  }
  detach() {
    this.parent != null && this.parent.removeChild(this), Ds.blots.delete(this.domNode);
  }
  deleteAt(t, e) {
    this.isolate(t, e).remove();
  }
  formatAt(t, e, s, n) {
    const i = this.isolate(t, e);
    if (this.scroll.query(s, q.BLOT) != null && n)
      i.wrap(s, n);
    else if (this.scroll.query(s, q.ATTRIBUTE) != null) {
      const a = this.scroll.create(this.statics.scope);
      i.wrap(a), a.format(s, n);
    }
  }
  insertAt(t, e, s) {
    const n = s == null ? this.scroll.create("text", e) : this.scroll.create(e, s), i = this.split(t);
    this.parent.insertBefore(n, i || void 0);
  }
  isolate(t, e) {
    const s = this.split(t);
    if (s == null)
      throw new Error("Attempt to isolate at end");
    return s.split(e), s;
  }
  length() {
    return 1;
  }
  offset(t = this.parent) {
    return this.parent == null || this === t ? 0 : this.parent.children.offset(this) + this.parent.offset(t);
  }
  optimize(t) {
    this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer) && this.wrap(this.statics.requiredContainer.blotName);
  }
  remove() {
    this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
  }
  replaceWith(t, e) {
    const s = typeof t == "string" ? this.scroll.create(t, e) : t;
    return this.parent != null && (this.parent.insertBefore(s, this.next || void 0), this.remove()), s;
  }
  split(t, e) {
    return t === 0 ? this : this.next;
  }
  update(t, e) {
  }
  wrap(t, e) {
    const s = typeof t == "string" ? this.scroll.create(t, e) : t;
    if (this.parent != null && this.parent.insertBefore(s, this.next || void 0), typeof s.appendChild != "function")
      throw new fs(`Cannot wrap ${t}`);
    return s.appendChild(this), s;
  }
};
Gl.blotName = "abstract";
let Kl = Gl;
const Yl = class extends Kl {
  /**
   * Returns the value represented by domNode if it is this Blot's type
   * No checking that domNode can represent this Blot type is required so
   * applications needing it should check externally before calling.
   */
  static value(t) {
    return !0;
  }
  /**
   * Given location represented by node and offset from DOM Selection Range,
   * return index to that location.
   */
  index(t, e) {
    return this.domNode === t || this.domNode.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(e, 1) : -1;
  }
  /**
   * Given index to location within blot, return node and offset representing
   * that location, consumable by DOM Selection Range
   */
  position(t, e) {
    let s = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
    return t > 0 && (s += 1), [this.parent.domNode, s];
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
Yl.scope = q.INLINE_BLOT;
let op = Yl;
const ft = op;
class lp {
  constructor() {
    this.head = null, this.tail = null, this.length = 0;
  }
  append(...t) {
    if (this.insertBefore(t[0], null), t.length > 1) {
      const e = t.slice(1);
      this.append(...e);
    }
  }
  at(t) {
    const e = this.iterator();
    let s = e();
    for (; s && t > 0; )
      t -= 1, s = e();
    return s;
  }
  contains(t) {
    const e = this.iterator();
    let s = e();
    for (; s; ) {
      if (s === t)
        return !0;
      s = e();
    }
    return !1;
  }
  indexOf(t) {
    const e = this.iterator();
    let s = e(), n = 0;
    for (; s; ) {
      if (s === t)
        return n;
      n += 1, s = e();
    }
    return -1;
  }
  insertBefore(t, e) {
    t != null && (this.remove(t), t.next = e, e != null ? (t.prev = e.prev, e.prev != null && (e.prev.next = t), e.prev = t, e === this.head && (this.head = t)) : this.tail != null ? (this.tail.next = t, t.prev = this.tail, this.tail = t) : (t.prev = null, this.head = this.tail = t), this.length += 1);
  }
  offset(t) {
    let e = 0, s = this.head;
    for (; s != null; ) {
      if (s === t)
        return e;
      e += s.length(), s = s.next;
    }
    return -1;
  }
  remove(t) {
    this.contains(t) && (t.prev != null && (t.prev.next = t.next), t.next != null && (t.next.prev = t.prev), t === this.head && (this.head = t.next), t === this.tail && (this.tail = t.prev), this.length -= 1);
  }
  iterator(t = this.head) {
    return () => {
      const e = t;
      return t != null && (t = t.next), e;
    };
  }
  find(t, e = !1) {
    const s = this.iterator();
    let n = s();
    for (; n; ) {
      const i = n.length();
      if (t < i || e && t === i && (n.next == null || n.next.length() !== 0))
        return [n, t];
      t -= i, n = s();
    }
    return [null, 0];
  }
  forEach(t) {
    const e = this.iterator();
    let s = e();
    for (; s; )
      t(s), s = e();
  }
  forEachAt(t, e, s) {
    if (e <= 0)
      return;
    const [n, i] = this.find(t);
    let a = t - i;
    const o = this.iterator(n);
    let l = o();
    for (; l && a < t + e; ) {
      const c = l.length();
      t > a ? s(
        l,
        t - a,
        Math.min(e, a + c - t)
      ) : s(l, 0, Math.min(c, t + e - a)), a += c, l = o();
    }
  }
  map(t) {
    return this.reduce((e, s) => (e.push(t(s)), e), []);
  }
  reduce(t, e) {
    const s = this.iterator();
    let n = s();
    for (; n; )
      e = t(e, n), n = s();
    return e;
  }
}
function Ro(r, t) {
  const e = t.find(r);
  if (e)
    return e;
  try {
    return t.create(r);
  } catch {
    const s = t.create(q.INLINE);
    return Array.from(r.childNodes).forEach((n) => {
      s.domNode.appendChild(n);
    }), r.parentNode && r.parentNode.replaceChild(s.domNode, r), s.attach(), s;
  }
}
const Wl = class we extends Kl {
  constructor(t, e) {
    super(t, e), this.uiNode = null, this.build();
  }
  appendChild(t) {
    this.insertBefore(t);
  }
  attach() {
    super.attach(), this.children.forEach((t) => {
      t.attach();
    });
  }
  attachUI(t) {
    this.uiNode != null && this.uiNode.remove(), this.uiNode = t, we.uiClass && this.uiNode.classList.add(we.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new lp(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const e = Ro(t, this.scroll);
        this.insertBefore(e, this.children.head || void 0);
      } catch (e) {
        if (e instanceof fs)
          return;
        throw e;
      }
    });
  }
  deleteAt(t, e) {
    if (t === 0 && e === this.length())
      return this.remove();
    this.children.forEachAt(t, e, (s, n, i) => {
      s.deleteAt(n, i);
    });
  }
  descendant(t, e = 0) {
    const [s, n] = this.children.find(e);
    return t.blotName == null && t(s) || t.blotName != null && s instanceof t ? [s, n] : s instanceof we ? s.descendant(t, n) : [null, -1];
  }
  descendants(t, e = 0, s = Number.MAX_VALUE) {
    let n = [], i = s;
    return this.children.forEachAt(
      e,
      s,
      (a, o, l) => {
        (t.blotName == null && t(a) || t.blotName != null && a instanceof t) && n.push(a), a instanceof we && (n = n.concat(
          a.descendants(t, o, i)
        )), i -= l;
      }
    ), n;
  }
  detach() {
    this.children.forEach((t) => {
      t.detach();
    }), super.detach();
  }
  enforceAllowedChildren() {
    let t = !1;
    this.children.forEach((e) => {
      t || this.statics.allowedChildren.some(
        (s) => e instanceof s
      ) || (e.statics.scope === q.BLOCK_BLOT ? (e.next != null && this.splitAfter(e), e.prev != null && this.splitAfter(e.prev), e.parent.unwrap(), t = !0) : e instanceof we ? e.unwrap() : e.remove());
    });
  }
  formatAt(t, e, s, n) {
    this.children.forEachAt(t, e, (i, a, o) => {
      i.formatAt(a, o, s, n);
    });
  }
  insertAt(t, e, s) {
    const [n, i] = this.children.find(t);
    if (n)
      n.insertAt(i, e, s);
    else {
      const a = s == null ? this.scroll.create("text", e) : this.scroll.create(e, s);
      this.appendChild(a);
    }
  }
  insertBefore(t, e) {
    t.parent != null && t.parent.children.remove(t);
    let s = null;
    this.children.insertBefore(t, e || null), t.parent = this, e != null && (s = e.domNode), (this.domNode.parentNode !== t.domNode || this.domNode.nextSibling !== s) && this.domNode.insertBefore(t.domNode, s), t.attach();
  }
  length() {
    return this.children.reduce((t, e) => t + e.length(), 0);
  }
  moveChildren(t, e) {
    this.children.forEach((s) => {
      t.insertBefore(s, e);
    });
  }
  optimize(t) {
    if (super.optimize(t), this.enforceAllowedChildren(), this.uiNode != null && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), this.children.length === 0)
      if (this.statics.defaultChild != null) {
        const e = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(e);
      } else
        this.remove();
  }
  path(t, e = !1) {
    const [s, n] = this.children.find(t, e), i = [[this, t]];
    return s instanceof we ? i.concat(s.path(n, e)) : (s != null && i.push([s, n]), i);
  }
  removeChild(t) {
    this.children.remove(t);
  }
  replaceWith(t, e) {
    const s = typeof t == "string" ? this.scroll.create(t, e) : t;
    return s instanceof we && this.moveChildren(s), super.replaceWith(s);
  }
  split(t, e = !1) {
    if (!e) {
      if (t === 0)
        return this;
      if (t === this.length())
        return this.next;
    }
    const s = this.clone();
    return this.parent && this.parent.insertBefore(s, this.next || void 0), this.children.forEachAt(t, this.length(), (n, i, a) => {
      const o = n.split(i, e);
      o != null && s.appendChild(o);
    }), s;
  }
  splitAfter(t) {
    const e = this.clone();
    for (; t.next != null; )
      e.appendChild(t.next);
    return this.parent && this.parent.insertBefore(e, this.next || void 0), e;
  }
  unwrap() {
    this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
  }
  update(t, e) {
    const s = [], n = [];
    t.forEach((i) => {
      i.target === this.domNode && i.type === "childList" && (s.push(...i.addedNodes), n.push(...i.removedNodes));
    }), n.forEach((i) => {
      if (i.parentNode != null && // @ts-expect-error Fix me later
      i.tagName !== "IFRAME" && document.body.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY)
        return;
      const a = this.scroll.find(i);
      a != null && (a.domNode.parentNode == null || a.domNode.parentNode === this.domNode) && a.detach();
    }), s.filter((i) => i.parentNode === this.domNode && i !== this.uiNode).sort((i, a) => i === a ? 0 : i.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((i) => {
      let a = null;
      i.nextSibling != null && (a = this.scroll.find(i.nextSibling));
      const o = Ro(i, this.scroll);
      (o.next !== a || o.next == null) && (o.parent != null && o.parent.removeChild(this), this.insertBefore(o, a || void 0));
    }), this.enforceAllowedChildren();
  }
};
Wl.uiClass = "";
let cp = Wl;
const Ft = cp;
function up(r, t) {
  if (Object.keys(r).length !== Object.keys(t).length)
    return !1;
  for (const e in r)
    if (r[e] !== t[e])
      return !1;
  return !0;
}
const is = class rs extends Ft {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const s = e.query(rs.blotName);
    if (!(s != null && t.tagName === s.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new xi(this.domNode);
  }
  format(t, e) {
    if (t === this.statics.blotName && !e)
      this.children.forEach((s) => {
        s instanceof rs || (s = s.wrap(rs.blotName, !0)), this.attributes.copy(s);
      }), this.unwrap();
    else {
      const s = this.scroll.query(t, q.INLINE);
      if (s == null)
        return;
      s instanceof ie ? this.attributes.attribute(s, e) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e);
    }
  }
  formats() {
    const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
    return e != null && (t[this.statics.blotName] = e), t;
  }
  formatAt(t, e, s, n) {
    this.formats()[s] != null || this.scroll.query(s, q.ATTRIBUTE) ? this.isolate(t, e).format(s, n) : super.formatAt(t, e, s, n);
  }
  optimize(t) {
    super.optimize(t);
    const e = this.formats();
    if (Object.keys(e).length === 0)
      return this.unwrap();
    const s = this.next;
    s instanceof rs && s.prev === this && up(e, s.formats()) && (s.moveChildren(this), s.remove());
  }
  replaceWith(t, e) {
    const s = super.replaceWith(t, e);
    return this.attributes.copy(s), s;
  }
  update(t, e) {
    super.update(t, e), t.some(
      (s) => s.target === this.domNode && s.type === "attributes"
    ) && this.attributes.build();
  }
  wrap(t, e) {
    const s = super.wrap(t, e);
    return s instanceof rs && this.attributes.move(s), s;
  }
};
is.allowedChildren = [is, ft], is.blotName = "inline", is.scope = q.INLINE_BLOT, is.tagName = "SPAN";
let dp = is;
const ka = dp, as = class Gr extends Ft {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const s = e.query(Gr.blotName);
    if (!(s != null && t.tagName === s.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new xi(this.domNode);
  }
  format(t, e) {
    const s = this.scroll.query(t, q.BLOCK);
    s != null && (s instanceof ie ? this.attributes.attribute(s, e) : t === this.statics.blotName && !e ? this.replaceWith(Gr.blotName) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e));
  }
  formats() {
    const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
    return e != null && (t[this.statics.blotName] = e), t;
  }
  formatAt(t, e, s, n) {
    this.scroll.query(s, q.BLOCK) != null ? this.format(s, n) : super.formatAt(t, e, s, n);
  }
  insertAt(t, e, s) {
    if (s == null || this.scroll.query(e, q.INLINE) != null)
      super.insertAt(t, e, s);
    else {
      const n = this.split(t);
      if (n != null) {
        const i = this.scroll.create(e, s);
        n.parent.insertBefore(i, n);
      } else
        throw new Error("Attempt to insertAt after block boundaries");
    }
  }
  replaceWith(t, e) {
    const s = super.replaceWith(t, e);
    return this.attributes.copy(s), s;
  }
  update(t, e) {
    super.update(t, e), t.some(
      (s) => s.target === this.domNode && s.type === "attributes"
    ) && this.attributes.build();
  }
};
as.blotName = "block", as.scope = q.BLOCK_BLOT, as.tagName = "P", as.allowedChildren = [
  ka,
  as,
  ft
];
let hp = as;
const dn = hp, Kr = class extends Ft {
  checkMerge() {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  }
  deleteAt(t, e) {
    super.deleteAt(t, e), this.enforceAllowedChildren();
  }
  formatAt(t, e, s, n) {
    super.formatAt(t, e, s, n), this.enforceAllowedChildren();
  }
  insertAt(t, e, s) {
    super.insertAt(t, e, s), this.enforceAllowedChildren();
  }
  optimize(t) {
    super.optimize(t), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
  }
};
Kr.blotName = "container", Kr.scope = q.BLOCK_BLOT;
let fp = Kr;
const Ai = fp;
class gp extends ft {
  static formats(t, e) {
  }
  format(t, e) {
    super.formatAt(0, this.length(), t, e);
  }
  formatAt(t, e, s, n) {
    t === 0 && e === this.length() ? this.format(s, n) : super.formatAt(t, e, s, n);
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll);
  }
}
const At = gp, pp = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, mp = 100, os = class extends Ft {
  constructor(t, e) {
    super(null, e), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((s) => {
      this.update(s);
    }), this.observer.observe(this.domNode, pp), this.attach();
  }
  create(t, e) {
    return this.registry.create(this, t, e);
  }
  find(t, e = !1) {
    const s = this.registry.find(t, e);
    return s ? s.scroll === this ? s : e ? this.find(s.scroll.domNode.parentNode, !0) : null : null;
  }
  query(t, e = q.ANY) {
    return this.registry.query(t, e);
  }
  register(...t) {
    return this.registry.register(...t);
  }
  build() {
    this.scroll != null && super.build();
  }
  detach() {
    super.detach(), this.observer.disconnect();
  }
  deleteAt(t, e) {
    this.update(), t === 0 && e === this.length() ? this.children.forEach((s) => {
      s.remove();
    }) : super.deleteAt(t, e);
  }
  formatAt(t, e, s, n) {
    this.update(), super.formatAt(t, e, s, n);
  }
  insertAt(t, e, s) {
    this.update(), super.insertAt(t, e, s);
  }
  optimize(t = [], e = {}) {
    super.optimize(e);
    const s = e.mutationsMap || /* @__PURE__ */ new WeakMap();
    let n = Array.from(this.observer.takeRecords());
    for (; n.length > 0; )
      t.push(n.pop());
    const i = (l, c = !0) => {
      l == null || l === this || l.domNode.parentNode != null && (s.has(l.domNode) || s.set(l.domNode, []), c && i(l.parent));
    }, a = (l) => {
      s.has(l.domNode) && (l instanceof Ft && l.children.forEach(a), s.delete(l.domNode), l.optimize(e));
    };
    let o = t;
    for (let l = 0; o.length > 0; l += 1) {
      if (l >= mp)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (o.forEach((c) => {
        const d = this.find(c.target, !0);
        d != null && (d.domNode === c.target && (c.type === "childList" ? (i(this.find(c.previousSibling, !1)), Array.from(c.addedNodes).forEach((f) => {
          const p = this.find(f, !1);
          i(p, !1), p instanceof Ft && p.children.forEach((m) => {
            i(m, !1);
          });
        })) : c.type === "attributes" && i(d.prev)), i(d));
      }), this.children.forEach(a), o = Array.from(this.observer.takeRecords()), n = o.slice(); n.length > 0; )
        t.push(n.pop());
    }
  }
  update(t, e = {}) {
    t = t || this.observer.takeRecords();
    const s = /* @__PURE__ */ new WeakMap();
    t.map((n) => {
      const i = this.find(n.target, !0);
      return i == null ? null : s.has(i.domNode) ? (s.get(i.domNode).push(n), null) : (s.set(i.domNode, [n]), i);
    }).forEach((n) => {
      n != null && n !== this && s.has(n.domNode) && n.update(s.get(n.domNode) || [], e);
    }), e.mutationsMap = s, s.has(this.domNode) && super.update(s.get(this.domNode), e), this.optimize(t, e);
  }
};
os.blotName = "scroll", os.defaultChild = dn, os.allowedChildren = [dn, Ai], os.scope = q.BLOCK_BLOT, os.tagName = "DIV";
let bp = os;
const Na = bp, Yr = class Zl extends ft {
  static create(t) {
    return document.createTextNode(t);
  }
  static value(t) {
    return t.data;
  }
  constructor(t, e) {
    super(t, e), this.text = this.statics.value(this.domNode);
  }
  deleteAt(t, e) {
    this.domNode.data = this.text = this.text.slice(0, t) + this.text.slice(t + e);
  }
  index(t, e) {
    return this.domNode === t ? e : -1;
  }
  insertAt(t, e, s) {
    s == null ? (this.text = this.text.slice(0, t) + e + this.text.slice(t), this.domNode.data = this.text) : super.insertAt(t, e, s);
  }
  length() {
    return this.text.length;
  }
  optimize(t) {
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof Zl && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
  }
  position(t, e = !1) {
    return [this.domNode, t];
  }
  split(t, e = !1) {
    if (!e) {
      if (t === 0)
        return this;
      if (t === this.length())
        return this.next;
    }
    const s = this.scroll.create(this.domNode.splitText(t));
    return this.parent.insertBefore(s, this.next || void 0), this.text = this.statics.value(this.domNode), s;
  }
  update(t, e) {
    t.some((s) => s.type === "characterData" && s.target === this.domNode) && (this.text = this.statics.value(this.domNode));
  }
  value() {
    return this.text;
  }
};
Yr.blotName = "text", Yr.scope = q.INLINE_BLOT;
let yp = Yr;
const ui = yp, vp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: ie,
  AttributorStore: xi,
  BlockBlot: dn,
  ClassAttributor: Ut,
  ContainerBlot: Ai,
  EmbedBlot: At,
  InlineBlot: ka,
  LeafBlot: ft,
  ParentBlot: Ft,
  Registry: Ds,
  Scope: q,
  ScrollBlot: Na,
  StyleAttributor: Ie,
  TextBlot: ui
}, Symbol.toStringTag, { value: "Module" }));
var Se = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xl(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Wr = { exports: {} }, St = -1, bt = 1, tt = 0;
function hn(r, t, e, s, n) {
  if (r === t)
    return r ? [[tt, r]] : [];
  if (e != null) {
    var i = Lp(r, t, e);
    if (i)
      return i;
  }
  var a = Oa(r, t), o = r.substring(0, a);
  r = r.substring(a), t = t.substring(a), a = Ei(r, t);
  var l = r.substring(r.length - a);
  r = r.substring(0, r.length - a), t = t.substring(0, t.length - a);
  var c = wp(r, t);
  return o && c.unshift([tt, o]), l && c.push([tt, l]), qa(c, n), s && Ap(c), c;
}
function wp(r, t) {
  var e;
  if (!r)
    return [[bt, t]];
  if (!t)
    return [[St, r]];
  var s = r.length > t.length ? r : t, n = r.length > t.length ? t : r, i = s.indexOf(n);
  if (i !== -1)
    return e = [
      [bt, s.substring(0, i)],
      [tt, n],
      [bt, s.substring(i + n.length)]
    ], r.length > t.length && (e[0][0] = e[2][0] = St), e;
  if (n.length === 1)
    return [
      [St, r],
      [bt, t]
    ];
  var a = xp(r, t);
  if (a) {
    var o = a[0], l = a[1], c = a[2], d = a[3], f = a[4], p = hn(o, c), m = hn(l, d);
    return p.concat([[tt, f]], m);
  }
  return Sp(r, t);
}
function Sp(r, t) {
  for (var e = r.length, s = t.length, n = Math.ceil((e + s) / 2), i = n, a = 2 * n, o = new Array(a), l = new Array(a), c = 0; c < a; c++)
    o[c] = -1, l[c] = -1;
  o[i + 1] = 0, l[i + 1] = 0;
  for (var d = e - s, f = d % 2 !== 0, p = 0, m = 0, b = 0, v = 0, w = 0; w < n; w++) {
    for (var S = -w + p; S <= w - m; S += 2) {
      var A = i + S, D;
      S === -w || S !== w && o[A - 1] < o[A + 1] ? D = o[A + 1] : D = o[A - 1] + 1;
      for (var L = D - S; D < e && L < s && r.charAt(D) === t.charAt(L); )
        D++, L++;
      if (o[A] = D, D > e)
        m += 2;
      else if (L > s)
        p += 2;
      else if (f) {
        var C = i + d - S;
        if (C >= 0 && C < a && l[C] !== -1) {
          var N = e - l[C];
          if (D >= N)
            return _o(r, t, D, L);
        }
      }
    }
    for (var R = -w + b; R <= w - v; R += 2) {
      var C = i + R, N;
      R === -w || R !== w && l[C - 1] < l[C + 1] ? N = l[C + 1] : N = l[C - 1] + 1;
      for (var $ = N - R; N < e && $ < s && r.charAt(e - N - 1) === t.charAt(s - $ - 1); )
        N++, $++;
      if (l[C] = N, N > e)
        v += 2;
      else if ($ > s)
        b += 2;
      else if (!f) {
        var A = i + d - R;
        if (A >= 0 && A < a && o[A] !== -1) {
          var D = o[A], L = i + D - A;
          if (N = e - N, D >= N)
            return _o(r, t, D, L);
        }
      }
    }
  }
  return [
    [St, r],
    [bt, t]
  ];
}
function _o(r, t, e, s) {
  var n = r.substring(0, e), i = t.substring(0, s), a = r.substring(e), o = t.substring(s), l = hn(n, i), c = hn(a, o);
  return l.concat(c);
}
function Oa(r, t) {
  if (!r || !t || r.charAt(0) !== t.charAt(0))
    return 0;
  for (var e = 0, s = Math.min(r.length, t.length), n = s, i = 0; e < n; )
    r.substring(i, n) == t.substring(i, n) ? (e = n, i = e) : s = n, n = Math.floor((s - e) / 2 + e);
  return Ql(r.charCodeAt(n - 1)) && n--, n;
}
function $o(r, t) {
  var e = r.length, s = t.length;
  if (e == 0 || s == 0)
    return 0;
  e > s ? r = r.substring(e - s) : e < s && (t = t.substring(0, e));
  var n = Math.min(e, s);
  if (r == t)
    return n;
  for (var i = 0, a = 1; ; ) {
    var o = r.substring(n - a), l = t.indexOf(o);
    if (l == -1)
      return i;
    a += l, (l == 0 || r.substring(n - a) == t.substring(0, a)) && (i = a, a++);
  }
}
function Ei(r, t) {
  if (!r || !t || r.slice(-1) !== t.slice(-1))
    return 0;
  for (var e = 0, s = Math.min(r.length, t.length), n = s, i = 0; e < n; )
    r.substring(r.length - n, r.length - i) == t.substring(t.length - n, t.length - i) ? (e = n, i = e) : s = n, n = Math.floor((s - e) / 2 + e);
  return Jl(r.charCodeAt(r.length - n)) && n--, n;
}
function xp(r, t) {
  var e = r.length > t.length ? r : t, s = r.length > t.length ? t : r;
  if (e.length < 4 || s.length * 2 < e.length)
    return null;
  function n(m, b, v) {
    for (var w = m.substring(v, v + Math.floor(m.length / 4)), S = -1, A = "", D, L, C, N; (S = b.indexOf(w, S + 1)) !== -1; ) {
      var R = Oa(
        m.substring(v),
        b.substring(S)
      ), $ = Ei(
        m.substring(0, v),
        b.substring(0, S)
      );
      A.length < $ + R && (A = b.substring(S - $, S) + b.substring(S, S + R), D = m.substring(0, v - $), L = m.substring(v + R), C = b.substring(0, S - $), N = b.substring(S + R));
    }
    return A.length * 2 >= m.length ? [
      D,
      L,
      C,
      N,
      A
    ] : null;
  }
  var i = n(
    e,
    s,
    Math.ceil(e.length / 4)
  ), a = n(
    e,
    s,
    Math.ceil(e.length / 2)
  ), o;
  if (!i && !a)
    return null;
  a ? i ? o = i[4].length > a[4].length ? i : a : o = a : o = i;
  var l, c, d, f;
  r.length > t.length ? (l = o[0], c = o[1], d = o[2], f = o[3]) : (d = o[0], f = o[1], l = o[2], c = o[3]);
  var p = o[4];
  return [l, c, d, f, p];
}
function Ap(r) {
  for (var t = !1, e = [], s = 0, n = null, i = 0, a = 0, o = 0, l = 0, c = 0; i < r.length; )
    r[i][0] == tt ? (e[s++] = i, a = l, o = c, l = 0, c = 0, n = r[i][1]) : (r[i][0] == bt ? l += r[i][1].length : c += r[i][1].length, n && n.length <= Math.max(a, o) && n.length <= Math.max(l, c) && (r.splice(e[s - 1], 0, [
      St,
      n
    ]), r[e[s - 1] + 1][0] = bt, s--, s--, i = s > 0 ? e[s - 1] : -1, a = 0, o = 0, l = 0, c = 0, n = null, t = !0)), i++;
  for (t && qa(r), Tp(r), i = 1; i < r.length; ) {
    if (r[i - 1][0] == St && r[i][0] == bt) {
      var d = r[i - 1][1], f = r[i][1], p = $o(d, f), m = $o(f, d);
      p >= m ? (p >= d.length / 2 || p >= f.length / 2) && (r.splice(i, 0, [
        tt,
        f.substring(0, p)
      ]), r[i - 1][1] = d.substring(
        0,
        d.length - p
      ), r[i + 1][1] = f.substring(p), i++) : (m >= d.length / 2 || m >= f.length / 2) && (r.splice(i, 0, [
        tt,
        d.substring(0, m)
      ]), r[i - 1][0] = bt, r[i - 1][1] = f.substring(
        0,
        f.length - m
      ), r[i + 1][0] = St, r[i + 1][1] = d.substring(m), i++), i++;
    }
    i++;
  }
}
var Bo = /[^a-zA-Z0-9]/, Fo = /\s/, Po = /[\r\n]/, Ep = /\n\r?\n$/, Dp = /^\r?\n\r?\n/;
function Tp(r) {
  function t(m, b) {
    if (!m || !b)
      return 6;
    var v = m.charAt(m.length - 1), w = b.charAt(0), S = v.match(Bo), A = w.match(Bo), D = S && v.match(Fo), L = A && w.match(Fo), C = D && v.match(Po), N = L && w.match(Po), R = C && m.match(Ep), $ = N && b.match(Dp);
    return R || $ ? 5 : C || N ? 4 : S && !D && L ? 3 : D || L ? 2 : S || A ? 1 : 0;
  }
  for (var e = 1; e < r.length - 1; ) {
    if (r[e - 1][0] == tt && r[e + 1][0] == tt) {
      var s = r[e - 1][1], n = r[e][1], i = r[e + 1][1], a = Ei(s, n);
      if (a) {
        var o = n.substring(n.length - a);
        s = s.substring(0, s.length - a), n = o + n.substring(0, n.length - a), i = o + i;
      }
      for (var l = s, c = n, d = i, f = t(s, n) + t(n, i); n.charAt(0) === i.charAt(0); ) {
        s += n.charAt(0), n = n.substring(1) + i.charAt(0), i = i.substring(1);
        var p = t(s, n) + t(n, i);
        p >= f && (f = p, l = s, c = n, d = i);
      }
      r[e - 1][1] != l && (l ? r[e - 1][1] = l : (r.splice(e - 1, 1), e--), r[e][1] = c, d ? r[e + 1][1] = d : (r.splice(e + 1, 1), e--));
    }
    e++;
  }
}
function qa(r, t) {
  r.push([tt, ""]);
  for (var e = 0, s = 0, n = 0, i = "", a = "", o; e < r.length; ) {
    if (e < r.length - 1 && !r[e][1]) {
      r.splice(e, 1);
      continue;
    }
    switch (r[e][0]) {
      case bt:
        n++, a += r[e][1], e++;
        break;
      case St:
        s++, i += r[e][1], e++;
        break;
      case tt:
        var l = e - n - s - 1;
        if (t) {
          if (l >= 0 && ec(r[l][1])) {
            var c = r[l][1].slice(-1);
            if (r[l][1] = r[l][1].slice(
              0,
              -1
            ), i = c + i, a = c + a, !r[l][1]) {
              r.splice(l, 1), e--;
              var d = l - 1;
              r[d] && r[d][0] === bt && (n++, a = r[d][1] + a, d--), r[d] && r[d][0] === St && (s++, i = r[d][1] + i, d--), l = d;
            }
          }
          if (tc(r[e][1])) {
            var c = r[e][1].charAt(0);
            r[e][1] = r[e][1].slice(1), i += c, a += c;
          }
        }
        if (e < r.length - 1 && !r[e][1]) {
          r.splice(e, 1);
          break;
        }
        if (i.length > 0 || a.length > 0) {
          i.length > 0 && a.length > 0 && (o = Oa(a, i), o !== 0 && (l >= 0 ? r[l][1] += a.substring(
            0,
            o
          ) : (r.splice(0, 0, [
            tt,
            a.substring(0, o)
          ]), e++), a = a.substring(o), i = i.substring(o)), o = Ei(a, i), o !== 0 && (r[e][1] = a.substring(a.length - o) + r[e][1], a = a.substring(
            0,
            a.length - o
          ), i = i.substring(
            0,
            i.length - o
          )));
          var f = n + s;
          i.length === 0 && a.length === 0 ? (r.splice(e - f, f), e = e - f) : i.length === 0 ? (r.splice(e - f, f, [bt, a]), e = e - f + 1) : a.length === 0 ? (r.splice(e - f, f, [St, i]), e = e - f + 1) : (r.splice(
            e - f,
            f,
            [St, i],
            [bt, a]
          ), e = e - f + 2);
        }
        e !== 0 && r[e - 1][0] === tt ? (r[e - 1][1] += r[e][1], r.splice(e, 1)) : e++, n = 0, s = 0, i = "", a = "";
        break;
    }
  }
  r[r.length - 1][1] === "" && r.pop();
  var p = !1;
  for (e = 1; e < r.length - 1; )
    r[e - 1][0] === tt && r[e + 1][0] === tt && (r[e][1].substring(
      r[e][1].length - r[e - 1][1].length
    ) === r[e - 1][1] ? (r[e][1] = r[e - 1][1] + r[e][1].substring(
      0,
      r[e][1].length - r[e - 1][1].length
    ), r[e + 1][1] = r[e - 1][1] + r[e + 1][1], r.splice(e - 1, 1), p = !0) : r[e][1].substring(0, r[e + 1][1].length) == r[e + 1][1] && (r[e - 1][1] += r[e + 1][1], r[e][1] = r[e][1].substring(r[e + 1][1].length) + r[e + 1][1], r.splice(e + 1, 1), p = !0)), e++;
  p && qa(r, t);
}
function Ql(r) {
  return r >= 55296 && r <= 56319;
}
function Jl(r) {
  return r >= 56320 && r <= 57343;
}
function tc(r) {
  return Jl(r.charCodeAt(0));
}
function ec(r) {
  return Ql(r.charCodeAt(r.length - 1));
}
function Cp(r) {
  for (var t = [], e = 0; e < r.length; e++)
    r[e][1].length > 0 && t.push(r[e]);
  return t;
}
function Dr(r, t, e, s) {
  return ec(r) || tc(s) ? null : Cp([
    [tt, r],
    [St, t],
    [bt, e],
    [tt, s]
  ]);
}
function Lp(r, t, e) {
  var s = typeof e == "number" ? { index: e, length: 0 } : e.oldRange, n = typeof e == "number" ? null : e.newRange, i = r.length, a = t.length;
  if (s.length === 0 && (n === null || n.length === 0)) {
    var o = s.index, l = r.slice(0, o), c = r.slice(o), d = n ? n.index : null;
    t: {
      var f = o + a - i;
      if (d !== null && d !== f || f < 0 || f > a)
        break t;
      var p = t.slice(0, f), m = t.slice(f);
      if (m !== c)
        break t;
      var b = Math.min(o, f), v = l.slice(0, b), w = p.slice(0, b);
      if (v !== w)
        break t;
      var S = l.slice(b), A = p.slice(b);
      return Dr(v, S, A, c);
    }
    t: {
      if (d !== null && d !== o)
        break t;
      var D = o, p = t.slice(0, D), m = t.slice(D);
      if (p !== l)
        break t;
      var L = Math.min(i - D, a - D), C = c.slice(c.length - L), N = m.slice(m.length - L);
      if (C !== N)
        break t;
      var S = c.slice(0, c.length - L), A = m.slice(0, m.length - L);
      return Dr(l, S, A, C);
    }
  }
  if (s.length > 0 && n && n.length === 0)
    t: {
      var v = r.slice(0, s.index), C = r.slice(s.index + s.length), b = v.length, L = C.length;
      if (a < b + L)
        break t;
      var w = t.slice(0, b), N = t.slice(a - L);
      if (v !== w || C !== N)
        break t;
      var S = r.slice(b, i - L), A = t.slice(b, a - L);
      return Dr(v, S, A, C);
    }
  return null;
}
function Di(r, t, e, s) {
  return hn(r, t, e, s, !0);
}
Di.INSERT = bt;
Di.DELETE = St;
Di.EQUAL = tt;
var Ip = Di, di = { exports: {} };
di.exports;
(function(r, t) {
  var e = 200, s = "__lodash_hash_undefined__", n = 9007199254740991, i = "[object Arguments]", a = "[object Array]", o = "[object Boolean]", l = "[object Date]", c = "[object Error]", d = "[object Function]", f = "[object GeneratorFunction]", p = "[object Map]", m = "[object Number]", b = "[object Object]", v = "[object Promise]", w = "[object RegExp]", S = "[object Set]", A = "[object String]", D = "[object Symbol]", L = "[object WeakMap]", C = "[object ArrayBuffer]", N = "[object DataView]", R = "[object Float32Array]", $ = "[object Float64Array]", W = "[object Int8Array]", P = "[object Int16Array]", X = "[object Int32Array]", Z = "[object Uint8Array]", et = "[object Uint8ClampedArray]", Y = "[object Uint16Array]", ot = "[object Uint32Array]", lt = /[\\^$.*+?()[\]{}|]/g, st = /\w*$/, nt = /^\[object .+?Constructor\]$/, Et = /^(?:0|[1-9]\d*)$/, H = {};
  H[i] = H[a] = H[C] = H[N] = H[o] = H[l] = H[R] = H[$] = H[W] = H[P] = H[X] = H[p] = H[m] = H[b] = H[w] = H[S] = H[A] = H[D] = H[Z] = H[et] = H[Y] = H[ot] = !0, H[c] = H[d] = H[L] = !1;
  var ki = typeof Se == "object" && Se && Se.Object === Object && Se, Ni = typeof self == "object" && self && self.Object === Object && self, Nt = ki || Ni || Function("return this")(), xn = t && !t.nodeType && t, U = xn && !0 && r && !r.nodeType && r, An = U && U.exports === xn;
  function Oi(u, g) {
    return u.set(g[0], g[1]), u;
  }
  function Ot(u, g) {
    return u.add(g), u;
  }
  function En(u, g) {
    for (var y = -1, E = u ? u.length : 0; ++y < E && g(u[y], y, u) !== !1; )
      ;
    return u;
  }
  function Dn(u, g) {
    for (var y = -1, E = g.length, _ = u.length; ++y < E; )
      u[_ + y] = g[y];
    return u;
  }
  function qs(u, g, y, E) {
    for (var _ = -1, M = u ? u.length : 0; ++_ < M; )
      y = g(y, u[_], _, u);
    return y;
  }
  function Ms(u, g) {
    for (var y = -1, E = Array(u); ++y < u; )
      E[y] = g(y);
    return E;
  }
  function Tn(u, g) {
    return u == null ? void 0 : u[g];
  }
  function Rs(u) {
    var g = !1;
    if (u != null && typeof u.toString != "function")
      try {
        g = !!(u + "");
      } catch {
      }
    return g;
  }
  function Cn(u) {
    var g = -1, y = Array(u.size);
    return u.forEach(function(E, _) {
      y[++g] = [_, E];
    }), y;
  }
  function _s(u, g) {
    return function(y) {
      return u(g(y));
    };
  }
  function Ln(u) {
    var g = -1, y = Array(u.size);
    return u.forEach(function(E) {
      y[++g] = E;
    }), y;
  }
  var qi = Array.prototype, Mi = Function.prototype, Ke = Object.prototype, $s = Nt["__core-js_shared__"], In = function() {
    var u = /[^.]+$/.exec($s && $s.keys && $s.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), kn = Mi.toString, Kt = Ke.hasOwnProperty, Ye = Ke.toString, Ri = RegExp(
    "^" + kn.call(Kt).replace(lt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ke = An ? Nt.Buffer : void 0, We = Nt.Symbol, Bs = Nt.Uint8Array, Dt = _s(Object.getPrototypeOf, Object), Nn = Object.create, On = Ke.propertyIsEnumerable, _i = qi.splice, Fs = Object.getOwnPropertySymbols, Ze = ke ? ke.isBuffer : void 0, qn = _s(Object.keys, Object), Xe = Mt(Nt, "DataView"), Ne = Mt(Nt, "Map"), qt = Mt(Nt, "Promise"), Qe = Mt(Nt, "Set"), Ps = Mt(Nt, "WeakMap"), Oe = Mt(Object, "create"), js = pt(Xe), qe = pt(Ne), Hs = pt(qt), zs = pt(Qe), Us = pt(Ps), ye = We ? We.prototype : void 0, Mn = ye ? ye.valueOf : void 0;
  function le(u) {
    var g = -1, y = u ? u.length : 0;
    for (this.clear(); ++g < y; ) {
      var E = u[g];
      this.set(E[0], E[1]);
    }
  }
  function $i() {
    this.__data__ = Oe ? Oe(null) : {};
  }
  function Bi(u) {
    return this.has(u) && delete this.__data__[u];
  }
  function Fi(u) {
    var g = this.__data__;
    if (Oe) {
      var y = g[u];
      return y === s ? void 0 : y;
    }
    return Kt.call(g, u) ? g[u] : void 0;
  }
  function Rn(u) {
    var g = this.__data__;
    return Oe ? g[u] !== void 0 : Kt.call(g, u);
  }
  function Vs(u, g) {
    var y = this.__data__;
    return y[u] = Oe && g === void 0 ? s : g, this;
  }
  le.prototype.clear = $i, le.prototype.delete = Bi, le.prototype.get = Fi, le.prototype.has = Rn, le.prototype.set = Vs;
  function it(u) {
    var g = -1, y = u ? u.length : 0;
    for (this.clear(); ++g < y; ) {
      var E = u[g];
      this.set(E[0], E[1]);
    }
  }
  function Pi() {
    this.__data__ = [];
  }
  function ji(u) {
    var g = this.__data__, y = ts(g, u);
    if (y < 0)
      return !1;
    var E = g.length - 1;
    return y == E ? g.pop() : _i.call(g, y, 1), !0;
  }
  function Hi(u) {
    var g = this.__data__, y = ts(g, u);
    return y < 0 ? void 0 : g[y][1];
  }
  function zi(u) {
    return ts(this.__data__, u) > -1;
  }
  function Ui(u, g) {
    var y = this.__data__, E = ts(y, u);
    return E < 0 ? y.push([u, g]) : y[E][1] = g, this;
  }
  it.prototype.clear = Pi, it.prototype.delete = ji, it.prototype.get = Hi, it.prototype.has = zi, it.prototype.set = Ui;
  function ct(u) {
    var g = -1, y = u ? u.length : 0;
    for (this.clear(); ++g < y; ) {
      var E = u[g];
      this.set(E[0], E[1]);
    }
  }
  function Vi() {
    this.__data__ = {
      hash: new le(),
      map: new (Ne || it)(),
      string: new le()
    };
  }
  function Gi(u) {
    return Re(this, u).delete(u);
  }
  function Ki(u) {
    return Re(this, u).get(u);
  }
  function Yi(u) {
    return Re(this, u).has(u);
  }
  function Wi(u, g) {
    return Re(this, u).set(u, g), this;
  }
  ct.prototype.clear = Vi, ct.prototype.delete = Gi, ct.prototype.get = Ki, ct.prototype.has = Yi, ct.prototype.set = Wi;
  function yt(u) {
    this.__data__ = new it(u);
  }
  function Zi() {
    this.__data__ = new it();
  }
  function Xi(u) {
    return this.__data__.delete(u);
  }
  function Qi(u) {
    return this.__data__.get(u);
  }
  function Ji(u) {
    return this.__data__.has(u);
  }
  function tr(u, g) {
    var y = this.__data__;
    if (y instanceof it) {
      var E = y.__data__;
      if (!Ne || E.length < e - 1)
        return E.push([u, g]), this;
      y = this.__data__ = new ct(E);
    }
    return y.set(u, g), this;
  }
  yt.prototype.clear = Zi, yt.prototype.delete = Xi, yt.prototype.get = Qi, yt.prototype.has = Ji, yt.prototype.set = tr;
  function Je(u, g) {
    var y = Ws(u) || ss(u) ? Ms(u.length, String) : [], E = y.length, _ = !!E;
    for (var M in u)
      Kt.call(u, M) && !(_ && (M == "length" || gr(M, E))) && y.push(M);
    return y;
  }
  function _n(u, g, y) {
    var E = u[g];
    (!(Kt.call(u, g) && jn(E, y)) || y === void 0 && !(g in u)) && (u[g] = y);
  }
  function ts(u, g) {
    for (var y = u.length; y--; )
      if (jn(u[y][0], g))
        return y;
    return -1;
  }
  function Yt(u, g) {
    return u && Ys(g, Xs(g), u);
  }
  function Gs(u, g, y, E, _, M, j) {
    var F;
    if (E && (F = M ? E(u, _, M, j) : E(u)), F !== void 0)
      return F;
    if (!Zt(u))
      return u;
    var Q = Ws(u);
    if (Q) {
      if (F = hr(u), !g)
        return cr(u, F);
    } else {
      var z = ue(u), ut = z == d || z == f;
      if (Hn(u))
        return es(u, g);
      if (z == b || z == i || ut && !M) {
        if (Rs(u))
          return M ? u : {};
        if (F = Wt(ut ? {} : u), !g)
          return ur(u, Yt(F, u));
      } else {
        if (!H[z])
          return M ? u : {};
        F = fr(u, z, Gs, g);
      }
    }
    j || (j = new yt());
    var vt = j.get(u);
    if (vt)
      return vt;
    if (j.set(u, F), !Q)
      var J = y ? dr(u) : Xs(u);
    return En(J || u, function(dt, rt) {
      J && (rt = dt, dt = u[rt]), _n(F, rt, Gs(dt, g, y, E, rt, u, j));
    }), F;
  }
  function er(u) {
    return Zt(u) ? Nn(u) : {};
  }
  function sr(u, g, y) {
    var E = g(u);
    return Ws(u) ? E : Dn(E, y(u));
  }
  function nr(u) {
    return Ye.call(u);
  }
  function ir(u) {
    if (!Zt(u) || mr(u))
      return !1;
    var g = Zs(u) || Rs(u) ? Ri : nt;
    return g.test(pt(u));
  }
  function rr(u) {
    if (!Fn(u))
      return qn(u);
    var g = [];
    for (var y in Object(u))
      Kt.call(u, y) && y != "constructor" && g.push(y);
    return g;
  }
  function es(u, g) {
    if (g)
      return u.slice();
    var y = new u.constructor(u.length);
    return u.copy(y), y;
  }
  function Ks(u) {
    var g = new u.constructor(u.byteLength);
    return new Bs(g).set(new Bs(u)), g;
  }
  function Me(u, g) {
    var y = g ? Ks(u.buffer) : u.buffer;
    return new u.constructor(y, u.byteOffset, u.byteLength);
  }
  function $n(u, g, y) {
    var E = g ? y(Cn(u), !0) : Cn(u);
    return qs(E, Oi, new u.constructor());
  }
  function Bn(u) {
    var g = new u.constructor(u.source, st.exec(u));
    return g.lastIndex = u.lastIndex, g;
  }
  function ar(u, g, y) {
    var E = g ? y(Ln(u), !0) : Ln(u);
    return qs(E, Ot, new u.constructor());
  }
  function or(u) {
    return Mn ? Object(Mn.call(u)) : {};
  }
  function lr(u, g) {
    var y = g ? Ks(u.buffer) : u.buffer;
    return new u.constructor(y, u.byteOffset, u.length);
  }
  function cr(u, g) {
    var y = -1, E = u.length;
    for (g || (g = Array(E)); ++y < E; )
      g[y] = u[y];
    return g;
  }
  function Ys(u, g, y, E) {
    y || (y = {});
    for (var _ = -1, M = g.length; ++_ < M; ) {
      var j = g[_], F = void 0;
      _n(y, j, F === void 0 ? u[j] : F);
    }
    return y;
  }
  function ur(u, g) {
    return Ys(u, ce(u), g);
  }
  function dr(u) {
    return sr(u, Xs, ce);
  }
  function Re(u, g) {
    var y = u.__data__;
    return pr(g) ? y[typeof g == "string" ? "string" : "hash"] : y.map;
  }
  function Mt(u, g) {
    var y = Tn(u, g);
    return ir(y) ? y : void 0;
  }
  var ce = Fs ? _s(Fs, Object) : yr, ue = nr;
  (Xe && ue(new Xe(new ArrayBuffer(1))) != N || Ne && ue(new Ne()) != p || qt && ue(qt.resolve()) != v || Qe && ue(new Qe()) != S || Ps && ue(new Ps()) != L) && (ue = function(u) {
    var g = Ye.call(u), y = g == b ? u.constructor : void 0, E = y ? pt(y) : void 0;
    if (E)
      switch (E) {
        case js:
          return N;
        case qe:
          return p;
        case Hs:
          return v;
        case zs:
          return S;
        case Us:
          return L;
      }
    return g;
  });
  function hr(u) {
    var g = u.length, y = u.constructor(g);
    return g && typeof u[0] == "string" && Kt.call(u, "index") && (y.index = u.index, y.input = u.input), y;
  }
  function Wt(u) {
    return typeof u.constructor == "function" && !Fn(u) ? er(Dt(u)) : {};
  }
  function fr(u, g, y, E) {
    var _ = u.constructor;
    switch (g) {
      case C:
        return Ks(u);
      case o:
      case l:
        return new _(+u);
      case N:
        return Me(u, E);
      case R:
      case $:
      case W:
      case P:
      case X:
      case Z:
      case et:
      case Y:
      case ot:
        return lr(u, E);
      case p:
        return $n(u, E, y);
      case m:
      case A:
        return new _(u);
      case w:
        return Bn(u);
      case S:
        return ar(u, E, y);
      case D:
        return or(u);
    }
  }
  function gr(u, g) {
    return g = g ?? n, !!g && (typeof u == "number" || Et.test(u)) && u > -1 && u % 1 == 0 && u < g;
  }
  function pr(u) {
    var g = typeof u;
    return g == "string" || g == "number" || g == "symbol" || g == "boolean" ? u !== "__proto__" : u === null;
  }
  function mr(u) {
    return !!In && In in u;
  }
  function Fn(u) {
    var g = u && u.constructor, y = typeof g == "function" && g.prototype || Ke;
    return u === y;
  }
  function pt(u) {
    if (u != null) {
      try {
        return kn.call(u);
      } catch {
      }
      try {
        return u + "";
      } catch {
      }
    }
    return "";
  }
  function Pn(u) {
    return Gs(u, !0, !0);
  }
  function jn(u, g) {
    return u === g || u !== u && g !== g;
  }
  function ss(u) {
    return br(u) && Kt.call(u, "callee") && (!On.call(u, "callee") || Ye.call(u) == i);
  }
  var Ws = Array.isArray;
  function ns(u) {
    return u != null && zn(u.length) && !Zs(u);
  }
  function br(u) {
    return Un(u) && ns(u);
  }
  var Hn = Ze || vr;
  function Zs(u) {
    var g = Zt(u) ? Ye.call(u) : "";
    return g == d || g == f;
  }
  function zn(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= n;
  }
  function Zt(u) {
    var g = typeof u;
    return !!u && (g == "object" || g == "function");
  }
  function Un(u) {
    return !!u && typeof u == "object";
  }
  function Xs(u) {
    return ns(u) ? Je(u) : rr(u);
  }
  function yr() {
    return [];
  }
  function vr() {
    return !1;
  }
  r.exports = Pn;
})(di, di.exports);
var sc = di.exports, hi = { exports: {} };
hi.exports;
(function(r, t) {
  var e = 200, s = "__lodash_hash_undefined__", n = 1, i = 2, a = 9007199254740991, o = "[object Arguments]", l = "[object Array]", c = "[object AsyncFunction]", d = "[object Boolean]", f = "[object Date]", p = "[object Error]", m = "[object Function]", b = "[object GeneratorFunction]", v = "[object Map]", w = "[object Number]", S = "[object Null]", A = "[object Object]", D = "[object Promise]", L = "[object Proxy]", C = "[object RegExp]", N = "[object Set]", R = "[object String]", $ = "[object Symbol]", W = "[object Undefined]", P = "[object WeakMap]", X = "[object ArrayBuffer]", Z = "[object DataView]", et = "[object Float32Array]", Y = "[object Float64Array]", ot = "[object Int8Array]", lt = "[object Int16Array]", st = "[object Int32Array]", nt = "[object Uint8Array]", Et = "[object Uint8ClampedArray]", H = "[object Uint16Array]", ki = "[object Uint32Array]", Ni = /[\\^$.*+?()[\]{}|]/g, Nt = /^\[object .+?Constructor\]$/, xn = /^(?:0|[1-9]\d*)$/, U = {};
  U[et] = U[Y] = U[ot] = U[lt] = U[st] = U[nt] = U[Et] = U[H] = U[ki] = !0, U[o] = U[l] = U[X] = U[d] = U[Z] = U[f] = U[p] = U[m] = U[v] = U[w] = U[A] = U[C] = U[N] = U[R] = U[P] = !1;
  var An = typeof Se == "object" && Se && Se.Object === Object && Se, Oi = typeof self == "object" && self && self.Object === Object && self, Ot = An || Oi || Function("return this")(), En = t && !t.nodeType && t, Dn = En && !0 && r && !r.nodeType && r, qs = Dn && Dn.exports === En, Ms = qs && An.process, Tn = function() {
    try {
      return Ms && Ms.binding && Ms.binding("util");
    } catch {
    }
  }(), Rs = Tn && Tn.isTypedArray;
  function Cn(u, g) {
    for (var y = -1, E = u == null ? 0 : u.length, _ = 0, M = []; ++y < E; ) {
      var j = u[y];
      g(j, y, u) && (M[_++] = j);
    }
    return M;
  }
  function _s(u, g) {
    for (var y = -1, E = g.length, _ = u.length; ++y < E; )
      u[_ + y] = g[y];
    return u;
  }
  function Ln(u, g) {
    for (var y = -1, E = u == null ? 0 : u.length; ++y < E; )
      if (g(u[y], y, u))
        return !0;
    return !1;
  }
  function qi(u, g) {
    for (var y = -1, E = Array(u); ++y < u; )
      E[y] = g(y);
    return E;
  }
  function Mi(u) {
    return function(g) {
      return u(g);
    };
  }
  function Ke(u, g) {
    return u.has(g);
  }
  function $s(u, g) {
    return u == null ? void 0 : u[g];
  }
  function In(u) {
    var g = -1, y = Array(u.size);
    return u.forEach(function(E, _) {
      y[++g] = [_, E];
    }), y;
  }
  function kn(u, g) {
    return function(y) {
      return u(g(y));
    };
  }
  function Kt(u) {
    var g = -1, y = Array(u.size);
    return u.forEach(function(E) {
      y[++g] = E;
    }), y;
  }
  var Ye = Array.prototype, Ri = Function.prototype, ke = Object.prototype, We = Ot["__core-js_shared__"], Bs = Ri.toString, Dt = ke.hasOwnProperty, Nn = function() {
    var u = /[^.]+$/.exec(We && We.keys && We.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), On = ke.toString, _i = RegExp(
    "^" + Bs.call(Dt).replace(Ni, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Fs = qs ? Ot.Buffer : void 0, Ze = Ot.Symbol, qn = Ot.Uint8Array, Xe = ke.propertyIsEnumerable, Ne = Ye.splice, qt = Ze ? Ze.toStringTag : void 0, Qe = Object.getOwnPropertySymbols, Ps = Fs ? Fs.isBuffer : void 0, Oe = kn(Object.keys, Object), js = ce(Ot, "DataView"), qe = ce(Ot, "Map"), Hs = ce(Ot, "Promise"), zs = ce(Ot, "Set"), Us = ce(Ot, "WeakMap"), ye = ce(Object, "create"), Mn = pt(js), le = pt(qe), $i = pt(Hs), Bi = pt(zs), Fi = pt(Us), Rn = Ze ? Ze.prototype : void 0, Vs = Rn ? Rn.valueOf : void 0;
  function it(u) {
    var g = -1, y = u == null ? 0 : u.length;
    for (this.clear(); ++g < y; ) {
      var E = u[g];
      this.set(E[0], E[1]);
    }
  }
  function Pi() {
    this.__data__ = ye ? ye(null) : {}, this.size = 0;
  }
  function ji(u) {
    var g = this.has(u) && delete this.__data__[u];
    return this.size -= g ? 1 : 0, g;
  }
  function Hi(u) {
    var g = this.__data__;
    if (ye) {
      var y = g[u];
      return y === s ? void 0 : y;
    }
    return Dt.call(g, u) ? g[u] : void 0;
  }
  function zi(u) {
    var g = this.__data__;
    return ye ? g[u] !== void 0 : Dt.call(g, u);
  }
  function Ui(u, g) {
    var y = this.__data__;
    return this.size += this.has(u) ? 0 : 1, y[u] = ye && g === void 0 ? s : g, this;
  }
  it.prototype.clear = Pi, it.prototype.delete = ji, it.prototype.get = Hi, it.prototype.has = zi, it.prototype.set = Ui;
  function ct(u) {
    var g = -1, y = u == null ? 0 : u.length;
    for (this.clear(); ++g < y; ) {
      var E = u[g];
      this.set(E[0], E[1]);
    }
  }
  function Vi() {
    this.__data__ = [], this.size = 0;
  }
  function Gi(u) {
    var g = this.__data__, y = es(g, u);
    if (y < 0)
      return !1;
    var E = g.length - 1;
    return y == E ? g.pop() : Ne.call(g, y, 1), --this.size, !0;
  }
  function Ki(u) {
    var g = this.__data__, y = es(g, u);
    return y < 0 ? void 0 : g[y][1];
  }
  function Yi(u) {
    return es(this.__data__, u) > -1;
  }
  function Wi(u, g) {
    var y = this.__data__, E = es(y, u);
    return E < 0 ? (++this.size, y.push([u, g])) : y[E][1] = g, this;
  }
  ct.prototype.clear = Vi, ct.prototype.delete = Gi, ct.prototype.get = Ki, ct.prototype.has = Yi, ct.prototype.set = Wi;
  function yt(u) {
    var g = -1, y = u == null ? 0 : u.length;
    for (this.clear(); ++g < y; ) {
      var E = u[g];
      this.set(E[0], E[1]);
    }
  }
  function Zi() {
    this.size = 0, this.__data__ = {
      hash: new it(),
      map: new (qe || ct)(),
      string: new it()
    };
  }
  function Xi(u) {
    var g = Mt(this, u).delete(u);
    return this.size -= g ? 1 : 0, g;
  }
  function Qi(u) {
    return Mt(this, u).get(u);
  }
  function Ji(u) {
    return Mt(this, u).has(u);
  }
  function tr(u, g) {
    var y = Mt(this, u), E = y.size;
    return y.set(u, g), this.size += y.size == E ? 0 : 1, this;
  }
  yt.prototype.clear = Zi, yt.prototype.delete = Xi, yt.prototype.get = Qi, yt.prototype.has = Ji, yt.prototype.set = tr;
  function Je(u) {
    var g = -1, y = u == null ? 0 : u.length;
    for (this.__data__ = new yt(); ++g < y; )
      this.add(u[g]);
  }
  function _n(u) {
    return this.__data__.set(u, s), this;
  }
  function ts(u) {
    return this.__data__.has(u);
  }
  Je.prototype.add = Je.prototype.push = _n, Je.prototype.has = ts;
  function Yt(u) {
    var g = this.__data__ = new ct(u);
    this.size = g.size;
  }
  function Gs() {
    this.__data__ = new ct(), this.size = 0;
  }
  function er(u) {
    var g = this.__data__, y = g.delete(u);
    return this.size = g.size, y;
  }
  function sr(u) {
    return this.__data__.get(u);
  }
  function nr(u) {
    return this.__data__.has(u);
  }
  function ir(u, g) {
    var y = this.__data__;
    if (y instanceof ct) {
      var E = y.__data__;
      if (!qe || E.length < e - 1)
        return E.push([u, g]), this.size = ++y.size, this;
      y = this.__data__ = new yt(E);
    }
    return y.set(u, g), this.size = y.size, this;
  }
  Yt.prototype.clear = Gs, Yt.prototype.delete = er, Yt.prototype.get = sr, Yt.prototype.has = nr, Yt.prototype.set = ir;
  function rr(u, g) {
    var y = ss(u), E = !y && jn(u), _ = !y && !E && ns(u), M = !y && !E && !_ && Un(u), j = y || E || _ || M, F = j ? qi(u.length, String) : [], Q = F.length;
    for (var z in u)
      Dt.call(u, z) && !(j && // Safari 9 has enumerable `arguments.length` in strict mode.
      (z == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      _ && (z == "offset" || z == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      M && (z == "buffer" || z == "byteLength" || z == "byteOffset") || // Skip index properties.
      fr(z, Q))) && F.push(z);
    return F;
  }
  function es(u, g) {
    for (var y = u.length; y--; )
      if (Pn(u[y][0], g))
        return y;
    return -1;
  }
  function Ks(u, g, y) {
    var E = g(u);
    return ss(u) ? E : _s(E, y(u));
  }
  function Me(u) {
    return u == null ? u === void 0 ? W : S : qt && qt in Object(u) ? ue(u) : Fn(u);
  }
  function $n(u) {
    return Zt(u) && Me(u) == o;
  }
  function Bn(u, g, y, E, _) {
    return u === g ? !0 : u == null || g == null || !Zt(u) && !Zt(g) ? u !== u && g !== g : ar(u, g, y, E, Bn, _);
  }
  function ar(u, g, y, E, _, M) {
    var j = ss(u), F = ss(g), Q = j ? l : Wt(u), z = F ? l : Wt(g);
    Q = Q == o ? A : Q, z = z == o ? A : z;
    var ut = Q == A, vt = z == A, J = Q == z;
    if (J && ns(u)) {
      if (!ns(g))
        return !1;
      j = !0, ut = !1;
    }
    if (J && !ut)
      return M || (M = new Yt()), j || Un(u) ? Ys(u, g, y, E, _, M) : ur(u, g, Q, y, E, _, M);
    if (!(y & n)) {
      var dt = ut && Dt.call(u, "__wrapped__"), rt = vt && Dt.call(g, "__wrapped__");
      if (dt || rt) {
        var ve = dt ? u.value() : u, de = rt ? g.value() : g;
        return M || (M = new Yt()), _(ve, de, y, E, M);
      }
    }
    return J ? (M || (M = new Yt()), dr(u, g, y, E, _, M)) : !1;
  }
  function or(u) {
    if (!zn(u) || pr(u))
      return !1;
    var g = Hn(u) ? _i : Nt;
    return g.test(pt(u));
  }
  function lr(u) {
    return Zt(u) && Zs(u.length) && !!U[Me(u)];
  }
  function cr(u) {
    if (!mr(u))
      return Oe(u);
    var g = [];
    for (var y in Object(u))
      Dt.call(u, y) && y != "constructor" && g.push(y);
    return g;
  }
  function Ys(u, g, y, E, _, M) {
    var j = y & n, F = u.length, Q = g.length;
    if (F != Q && !(j && Q > F))
      return !1;
    var z = M.get(u);
    if (z && M.get(g))
      return z == g;
    var ut = -1, vt = !0, J = y & i ? new Je() : void 0;
    for (M.set(u, g), M.set(g, u); ++ut < F; ) {
      var dt = u[ut], rt = g[ut];
      if (E)
        var ve = j ? E(rt, dt, ut, g, u, M) : E(dt, rt, ut, u, g, M);
      if (ve !== void 0) {
        if (ve)
          continue;
        vt = !1;
        break;
      }
      if (J) {
        if (!Ln(g, function(de, _e) {
          if (!Ke(J, _e) && (dt === de || _(dt, de, y, E, M)))
            return J.push(_e);
        })) {
          vt = !1;
          break;
        }
      } else if (!(dt === rt || _(dt, rt, y, E, M))) {
        vt = !1;
        break;
      }
    }
    return M.delete(u), M.delete(g), vt;
  }
  function ur(u, g, y, E, _, M, j) {
    switch (y) {
      case Z:
        if (u.byteLength != g.byteLength || u.byteOffset != g.byteOffset)
          return !1;
        u = u.buffer, g = g.buffer;
      case X:
        return !(u.byteLength != g.byteLength || !M(new qn(u), new qn(g)));
      case d:
      case f:
      case w:
        return Pn(+u, +g);
      case p:
        return u.name == g.name && u.message == g.message;
      case C:
      case R:
        return u == g + "";
      case v:
        var F = In;
      case N:
        var Q = E & n;
        if (F || (F = Kt), u.size != g.size && !Q)
          return !1;
        var z = j.get(u);
        if (z)
          return z == g;
        E |= i, j.set(u, g);
        var ut = Ys(F(u), F(g), E, _, M, j);
        return j.delete(u), ut;
      case $:
        if (Vs)
          return Vs.call(u) == Vs.call(g);
    }
    return !1;
  }
  function dr(u, g, y, E, _, M) {
    var j = y & n, F = Re(u), Q = F.length, z = Re(g), ut = z.length;
    if (Q != ut && !j)
      return !1;
    for (var vt = Q; vt--; ) {
      var J = F[vt];
      if (!(j ? J in g : Dt.call(g, J)))
        return !1;
    }
    var dt = M.get(u);
    if (dt && M.get(g))
      return dt == g;
    var rt = !0;
    M.set(u, g), M.set(g, u);
    for (var ve = j; ++vt < Q; ) {
      J = F[vt];
      var de = u[J], _e = g[J];
      if (E)
        var Za = j ? E(_e, de, J, g, u, M) : E(de, _e, J, u, g, M);
      if (!(Za === void 0 ? de === _e || _(de, _e, y, E, M) : Za)) {
        rt = !1;
        break;
      }
      ve || (ve = J == "constructor");
    }
    if (rt && !ve) {
      var Vn = u.constructor, Gn = g.constructor;
      Vn != Gn && "constructor" in u && "constructor" in g && !(typeof Vn == "function" && Vn instanceof Vn && typeof Gn == "function" && Gn instanceof Gn) && (rt = !1);
    }
    return M.delete(u), M.delete(g), rt;
  }
  function Re(u) {
    return Ks(u, Xs, hr);
  }
  function Mt(u, g) {
    var y = u.__data__;
    return gr(g) ? y[typeof g == "string" ? "string" : "hash"] : y.map;
  }
  function ce(u, g) {
    var y = $s(u, g);
    return or(y) ? y : void 0;
  }
  function ue(u) {
    var g = Dt.call(u, qt), y = u[qt];
    try {
      u[qt] = void 0;
      var E = !0;
    } catch {
    }
    var _ = On.call(u);
    return E && (g ? u[qt] = y : delete u[qt]), _;
  }
  var hr = Qe ? function(u) {
    return u == null ? [] : (u = Object(u), Cn(Qe(u), function(g) {
      return Xe.call(u, g);
    }));
  } : yr, Wt = Me;
  (js && Wt(new js(new ArrayBuffer(1))) != Z || qe && Wt(new qe()) != v || Hs && Wt(Hs.resolve()) != D || zs && Wt(new zs()) != N || Us && Wt(new Us()) != P) && (Wt = function(u) {
    var g = Me(u), y = g == A ? u.constructor : void 0, E = y ? pt(y) : "";
    if (E)
      switch (E) {
        case Mn:
          return Z;
        case le:
          return v;
        case $i:
          return D;
        case Bi:
          return N;
        case Fi:
          return P;
      }
    return g;
  });
  function fr(u, g) {
    return g = g ?? a, !!g && (typeof u == "number" || xn.test(u)) && u > -1 && u % 1 == 0 && u < g;
  }
  function gr(u) {
    var g = typeof u;
    return g == "string" || g == "number" || g == "symbol" || g == "boolean" ? u !== "__proto__" : u === null;
  }
  function pr(u) {
    return !!Nn && Nn in u;
  }
  function mr(u) {
    var g = u && u.constructor, y = typeof g == "function" && g.prototype || ke;
    return u === y;
  }
  function Fn(u) {
    return On.call(u);
  }
  function pt(u) {
    if (u != null) {
      try {
        return Bs.call(u);
      } catch {
      }
      try {
        return u + "";
      } catch {
      }
    }
    return "";
  }
  function Pn(u, g) {
    return u === g || u !== u && g !== g;
  }
  var jn = $n(/* @__PURE__ */ function() {
    return arguments;
  }()) ? $n : function(u) {
    return Zt(u) && Dt.call(u, "callee") && !Xe.call(u, "callee");
  }, ss = Array.isArray;
  function Ws(u) {
    return u != null && Zs(u.length) && !Hn(u);
  }
  var ns = Ps || vr;
  function br(u, g) {
    return Bn(u, g);
  }
  function Hn(u) {
    if (!zn(u))
      return !1;
    var g = Me(u);
    return g == m || g == b || g == c || g == L;
  }
  function Zs(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= a;
  }
  function zn(u) {
    var g = typeof u;
    return u != null && (g == "object" || g == "function");
  }
  function Zt(u) {
    return u != null && typeof u == "object";
  }
  var Un = Rs ? Mi(Rs) : lr;
  function Xs(u) {
    return Ws(u) ? rr(u) : cr(u);
  }
  function yr() {
    return [];
  }
  function vr() {
    return !1;
  }
  r.exports = br;
})(hi, hi.exports);
var nc = hi.exports, Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const kp = sc, Np = nc;
var Zr;
(function(r) {
  function t(i = {}, a = {}, o = !1) {
    typeof i != "object" && (i = {}), typeof a != "object" && (a = {});
    let l = kp(a);
    o || (l = Object.keys(l).reduce((c, d) => (l[d] != null && (c[d] = l[d]), c), {}));
    for (const c in i)
      i[c] !== void 0 && a[c] === void 0 && (l[c] = i[c]);
    return Object.keys(l).length > 0 ? l : void 0;
  }
  r.compose = t;
  function e(i = {}, a = {}) {
    typeof i != "object" && (i = {}), typeof a != "object" && (a = {});
    const o = Object.keys(i).concat(Object.keys(a)).reduce((l, c) => (Np(i[c], a[c]) || (l[c] = a[c] === void 0 ? null : a[c]), l), {});
    return Object.keys(o).length > 0 ? o : void 0;
  }
  r.diff = e;
  function s(i = {}, a = {}) {
    i = i || {};
    const o = Object.keys(a).reduce((l, c) => (a[c] !== i[c] && i[c] !== void 0 && (l[c] = a[c]), l), {});
    return Object.keys(i).reduce((l, c) => (i[c] !== a[c] && a[c] === void 0 && (l[c] = null), l), o);
  }
  r.invert = s;
  function n(i, a, o = !1) {
    if (typeof i != "object")
      return a;
    if (typeof a != "object")
      return;
    if (!o)
      return a;
    const l = Object.keys(a).reduce((c, d) => (i[d] === void 0 && (c[d] = a[d]), c), {});
    return Object.keys(l).length > 0 ? l : void 0;
  }
  r.transform = n;
})(Zr || (Zr = {}));
Ma.default = Zr;
var Ti = {};
Object.defineProperty(Ti, "__esModule", { value: !0 });
var Xr;
(function(r) {
  function t(e) {
    return typeof e.delete == "number" ? e.delete : typeof e.retain == "number" ? e.retain : typeof e.retain == "object" && e.retain !== null ? 1 : typeof e.insert == "string" ? e.insert.length : 1;
  }
  r.length = t;
})(Xr || (Xr = {}));
Ti.default = Xr;
var Ra = {};
Object.defineProperty(Ra, "__esModule", { value: !0 });
const jo = Ti;
class Op {
  constructor(t) {
    this.ops = t, this.index = 0, this.offset = 0;
  }
  hasNext() {
    return this.peekLength() < 1 / 0;
  }
  next(t) {
    t || (t = 1 / 0);
    const e = this.ops[this.index];
    if (e) {
      const s = this.offset, n = jo.default.length(e);
      if (t >= n - s ? (t = n - s, this.index += 1, this.offset = 0) : this.offset += t, typeof e.delete == "number")
        return { delete: t };
      {
        const i = {};
        return e.attributes && (i.attributes = e.attributes), typeof e.retain == "number" ? i.retain = t : typeof e.retain == "object" && e.retain !== null ? i.retain = e.retain : typeof e.insert == "string" ? i.insert = e.insert.substr(s, t) : i.insert = e.insert, i;
      }
    } else
      return { retain: 1 / 0 };
  }
  peek() {
    return this.ops[this.index];
  }
  peekLength() {
    return this.ops[this.index] ? jo.default.length(this.ops[this.index]) - this.offset : 1 / 0;
  }
  peekType() {
    const t = this.ops[this.index];
    return t ? typeof t.delete == "number" ? "delete" : typeof t.retain == "number" || typeof t.retain == "object" && t.retain !== null ? "retain" : "insert" : "retain";
  }
  rest() {
    if (this.hasNext()) {
      if (this.offset === 0)
        return this.ops.slice(this.index);
      {
        const t = this.offset, e = this.index, s = this.next(), n = this.ops.slice(this.index);
        return this.offset = t, this.index = e, [s].concat(n);
      }
    } else return [];
  }
}
Ra.default = Op;
(function(r, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
  const e = Ip, s = sc, n = nc, i = Ma;
  t.AttributeMap = i.default;
  const a = Ti;
  t.Op = a.default;
  const o = Ra;
  t.OpIterator = o.default;
  const l = "\0", c = (f, p) => {
    if (typeof f != "object" || f === null)
      throw new Error(`cannot retain a ${typeof f}`);
    if (typeof p != "object" || p === null)
      throw new Error(`cannot retain a ${typeof p}`);
    const m = Object.keys(f)[0];
    if (!m || m !== Object.keys(p)[0])
      throw new Error(`embed types not matched: ${m} != ${Object.keys(p)[0]}`);
    return [m, f[m], p[m]];
  };
  class d {
    constructor(p) {
      Array.isArray(p) ? this.ops = p : p != null && Array.isArray(p.ops) ? this.ops = p.ops : this.ops = [];
    }
    static registerEmbed(p, m) {
      this.handlers[p] = m;
    }
    static unregisterEmbed(p) {
      delete this.handlers[p];
    }
    static getHandler(p) {
      const m = this.handlers[p];
      if (!m)
        throw new Error(`no handlers for embed type "${p}"`);
      return m;
    }
    insert(p, m) {
      const b = {};
      return typeof p == "string" && p.length === 0 ? this : (b.insert = p, m != null && typeof m == "object" && Object.keys(m).length > 0 && (b.attributes = m), this.push(b));
    }
    delete(p) {
      return p <= 0 ? this : this.push({ delete: p });
    }
    retain(p, m) {
      if (typeof p == "number" && p <= 0)
        return this;
      const b = { retain: p };
      return m != null && typeof m == "object" && Object.keys(m).length > 0 && (b.attributes = m), this.push(b);
    }
    push(p) {
      let m = this.ops.length, b = this.ops[m - 1];
      if (p = s(p), typeof b == "object") {
        if (typeof p.delete == "number" && typeof b.delete == "number")
          return this.ops[m - 1] = { delete: b.delete + p.delete }, this;
        if (typeof b.delete == "number" && p.insert != null && (m -= 1, b = this.ops[m - 1], typeof b != "object"))
          return this.ops.unshift(p), this;
        if (n(p.attributes, b.attributes)) {
          if (typeof p.insert == "string" && typeof b.insert == "string")
            return this.ops[m - 1] = { insert: b.insert + p.insert }, typeof p.attributes == "object" && (this.ops[m - 1].attributes = p.attributes), this;
          if (typeof p.retain == "number" && typeof b.retain == "number")
            return this.ops[m - 1] = { retain: b.retain + p.retain }, typeof p.attributes == "object" && (this.ops[m - 1].attributes = p.attributes), this;
        }
      }
      return m === this.ops.length ? this.ops.push(p) : this.ops.splice(m, 0, p), this;
    }
    chop() {
      const p = this.ops[this.ops.length - 1];
      return p && typeof p.retain == "number" && !p.attributes && this.ops.pop(), this;
    }
    filter(p) {
      return this.ops.filter(p);
    }
    forEach(p) {
      this.ops.forEach(p);
    }
    map(p) {
      return this.ops.map(p);
    }
    partition(p) {
      const m = [], b = [];
      return this.forEach((v) => {
        (p(v) ? m : b).push(v);
      }), [m, b];
    }
    reduce(p, m) {
      return this.ops.reduce(p, m);
    }
    changeLength() {
      return this.reduce((p, m) => m.insert ? p + a.default.length(m) : m.delete ? p - m.delete : p, 0);
    }
    length() {
      return this.reduce((p, m) => p + a.default.length(m), 0);
    }
    slice(p = 0, m = 1 / 0) {
      const b = [], v = new o.default(this.ops);
      let w = 0;
      for (; w < m && v.hasNext(); ) {
        let S;
        w < p ? S = v.next(p - w) : (S = v.next(m - w), b.push(S)), w += a.default.length(S);
      }
      return new d(b);
    }
    compose(p) {
      const m = new o.default(this.ops), b = new o.default(p.ops), v = [], w = b.peek();
      if (w != null && typeof w.retain == "number" && w.attributes == null) {
        let A = w.retain;
        for (; m.peekType() === "insert" && m.peekLength() <= A; )
          A -= m.peekLength(), v.push(m.next());
        w.retain - A > 0 && b.next(w.retain - A);
      }
      const S = new d(v);
      for (; m.hasNext() || b.hasNext(); )
        if (b.peekType() === "insert")
          S.push(b.next());
        else if (m.peekType() === "delete")
          S.push(m.next());
        else {
          const A = Math.min(m.peekLength(), b.peekLength()), D = m.next(A), L = b.next(A);
          if (L.retain) {
            const C = {};
            if (typeof D.retain == "number")
              C.retain = typeof L.retain == "number" ? A : L.retain;
            else if (typeof L.retain == "number")
              D.retain == null ? C.insert = D.insert : C.retain = D.retain;
            else {
              const R = D.retain == null ? "insert" : "retain", [$, W, P] = c(D[R], L.retain), X = d.getHandler($);
              C[R] = {
                [$]: X.compose(W, P, R === "retain")
              };
            }
            const N = i.default.compose(D.attributes, L.attributes, typeof D.retain == "number");
            if (N && (C.attributes = N), S.push(C), !b.hasNext() && n(S.ops[S.ops.length - 1], C)) {
              const R = new d(m.rest());
              return S.concat(R).chop();
            }
          } else typeof L.delete == "number" && (typeof D.retain == "number" || typeof D.retain == "object" && D.retain !== null) && S.push(L);
        }
      return S.chop();
    }
    concat(p) {
      const m = new d(this.ops.slice());
      return p.ops.length > 0 && (m.push(p.ops[0]), m.ops = m.ops.concat(p.ops.slice(1))), m;
    }
    diff(p, m) {
      if (this.ops === p.ops)
        return new d();
      const b = [this, p].map((D) => D.map((L) => {
        if (L.insert != null)
          return typeof L.insert == "string" ? L.insert : l;
        const C = D === p ? "on" : "with";
        throw new Error("diff() called " + C + " non-document");
      }).join("")), v = new d(), w = e(b[0], b[1], m, !0), S = new o.default(this.ops), A = new o.default(p.ops);
      return w.forEach((D) => {
        let L = D[1].length;
        for (; L > 0; ) {
          let C = 0;
          switch (D[0]) {
            case e.INSERT:
              C = Math.min(A.peekLength(), L), v.push(A.next(C));
              break;
            case e.DELETE:
              C = Math.min(L, S.peekLength()), S.next(C), v.delete(C);
              break;
            case e.EQUAL:
              C = Math.min(S.peekLength(), A.peekLength(), L);
              const N = S.next(C), R = A.next(C);
              n(N.insert, R.insert) ? v.retain(C, i.default.diff(N.attributes, R.attributes)) : v.push(R).delete(C);
              break;
          }
          L -= C;
        }
      }), v.chop();
    }
    eachLine(p, m = `
`) {
      const b = new o.default(this.ops);
      let v = new d(), w = 0;
      for (; b.hasNext(); ) {
        if (b.peekType() !== "insert")
          return;
        const S = b.peek(), A = a.default.length(S) - b.peekLength(), D = typeof S.insert == "string" ? S.insert.indexOf(m, A) - A : -1;
        if (D < 0)
          v.push(b.next());
        else if (D > 0)
          v.push(b.next(D));
        else {
          if (p(v, b.next(1).attributes || {}, w) === !1)
            return;
          w += 1, v = new d();
        }
      }
      v.length() > 0 && p(v, {}, w);
    }
    invert(p) {
      const m = new d();
      return this.reduce((b, v) => {
        if (v.insert)
          m.delete(a.default.length(v));
        else {
          if (typeof v.retain == "number" && v.attributes == null)
            return m.retain(v.retain), b + v.retain;
          if (v.delete || typeof v.retain == "number") {
            const w = v.delete || v.retain;
            return p.slice(b, b + w).forEach((A) => {
              v.delete ? m.push(A) : v.retain && v.attributes && m.retain(a.default.length(A), i.default.invert(v.attributes, A.attributes));
            }), b + w;
          } else if (typeof v.retain == "object" && v.retain !== null) {
            const w = p.slice(b, b + 1), S = new o.default(w.ops).next(), [A, D, L] = c(v.retain, S.insert), C = d.getHandler(A);
            return m.retain({ [A]: C.invert(D, L) }, i.default.invert(v.attributes, S.attributes)), b + 1;
          }
        }
        return b;
      }, 0), m.chop();
    }
    transform(p, m = !1) {
      if (m = !!m, typeof p == "number")
        return this.transformPosition(p, m);
      const b = p, v = new o.default(this.ops), w = new o.default(b.ops), S = new d();
      for (; v.hasNext() || w.hasNext(); )
        if (v.peekType() === "insert" && (m || w.peekType() !== "insert"))
          S.retain(a.default.length(v.next()));
        else if (w.peekType() === "insert")
          S.push(w.next());
        else {
          const A = Math.min(v.peekLength(), w.peekLength()), D = v.next(A), L = w.next(A);
          if (D.delete)
            continue;
          if (L.delete)
            S.push(L);
          else {
            const C = D.retain, N = L.retain;
            let R = typeof N == "object" && N !== null ? N : A;
            if (typeof C == "object" && C !== null && typeof N == "object" && N !== null) {
              const $ = Object.keys(C)[0];
              if ($ === Object.keys(N)[0]) {
                const W = d.getHandler($);
                W && (R = {
                  [$]: W.transform(C[$], N[$], m)
                });
              }
            }
            S.retain(R, i.default.transform(D.attributes, L.attributes, m));
          }
        }
      return S.chop();
    }
    transformPosition(p, m = !1) {
      m = !!m;
      const b = new o.default(this.ops);
      let v = 0;
      for (; b.hasNext() && v <= p; ) {
        const w = b.peekLength(), S = b.peekType();
        if (b.next(), S === "delete") {
          p -= Math.min(w, p - v);
          continue;
        } else S === "insert" && (v < p || !m) && (p += w);
        v += w;
      }
      return p;
    }
  }
  d.Op = a.default, d.OpIterator = o.default, d.AttributeMap = i.default, d.handlers = {}, t.default = d, r.exports = d, r.exports.default = d;
})(Wr, Wr.exports);
var kt = Wr.exports;
const O = /* @__PURE__ */ Xl(kt);
class Vt extends At {
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
Vt.blotName = "break";
Vt.tagName = "BR";
let zt = class extends ui {
};
const qp = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Ci(r) {
  return r.replace(/[&<>"']/g, (t) => qp[t]);
}
const Xt = class Xt extends ka {
  static compare(t, e) {
    const s = Xt.order.indexOf(t), n = Xt.order.indexOf(e);
    return s >= 0 || n >= 0 ? s - n : t === e ? 0 : t < e ? -1 : 1;
  }
  formatAt(t, e, s, n) {
    if (Xt.compare(this.statics.blotName, s) < 0 && this.scroll.query(s, q.BLOT)) {
      const i = this.isolate(t, e);
      n && i.wrap(s, n);
    } else
      super.formatAt(t, e, s, n);
  }
  optimize(t) {
    if (super.optimize(t), this.parent instanceof Xt && Xt.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const e = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(e), e.wrap(this);
    }
  }
};
I(Xt, "allowedChildren", [Xt, Vt, At, zt]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
I(Xt, "order", [
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
let re = Xt;
const Ho = 1;
class at extends dn {
  constructor() {
    super(...arguments);
    I(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = ic(this)), this.cache.delta;
  }
  deleteAt(e, s) {
    super.deleteAt(e, s), this.cache = {};
  }
  formatAt(e, s, n, i) {
    s <= 0 || (this.scroll.query(n, q.BLOCK) ? e + s === this.length() && this.format(n, i) : super.formatAt(e, Math.min(s, this.length() - e - 1), n, i), this.cache = {});
  }
  insertAt(e, s, n) {
    if (n != null) {
      super.insertAt(e, s, n), this.cache = {};
      return;
    }
    if (s.length === 0) return;
    const i = s.split(`
`), a = i.shift();
    a.length > 0 && (e < this.length() - 1 || this.children.tail == null ? super.insertAt(Math.min(e, this.length() - 1), a) : this.children.tail.insertAt(this.children.tail.length(), a), this.cache = {});
    let o = this;
    i.reduce((l, c) => (o = o.split(l, !0), o.insertAt(0, c), c.length), e + a.length);
  }
  insertBefore(e, s) {
    const {
      head: n
    } = this.children;
    super.insertBefore(e, s), n instanceof Vt && n.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Ho), this.cache.length;
  }
  moveChildren(e, s) {
    super.moveChildren(e, s), this.cache = {};
  }
  optimize(e) {
    super.optimize(e), this.cache = {};
  }
  path(e) {
    return super.path(e, !0);
  }
  removeChild(e) {
    super.removeChild(e), this.cache = {};
  }
  split(e) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (s && (e === 0 || e >= this.length() - Ho)) {
      const i = this.clone();
      return e === 0 ? (this.parent.insertBefore(i, this), this) : (this.parent.insertBefore(i, this.next), i);
    }
    const n = super.split(e, s);
    return this.cache = {}, n;
  }
}
at.blotName = "block";
at.tagName = "P";
at.defaultChild = Vt;
at.allowedChildren = [Vt, re, At, zt];
class It extends At {
  attach() {
    super.attach(), this.attributes = new xi(this.domNode);
  }
  delta() {
    return new O().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(t, e) {
    const s = this.scroll.query(t, q.BLOCK_ATTRIBUTE);
    s != null && this.attributes.attribute(s, e);
  }
  formatAt(t, e, s, n) {
    this.format(s, n);
  }
  insertAt(t, e, s) {
    if (s != null) {
      super.insertAt(t, e, s);
      return;
    }
    const n = e.split(`
`), i = n.pop(), a = n.map((l) => {
      const c = this.scroll.create(at.blotName);
      return c.insertAt(0, l), c;
    }), o = this.split(t);
    a.forEach((l) => {
      this.parent.insertBefore(l, o);
    }), i && this.parent.insertBefore(this.scroll.create("text", i), o);
  }
}
It.scope = q.BLOCK_BLOT;
function ic(r) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return r.descendants(ft).reduce((e, s) => s.length() === 0 ? e : e.insert(s.value(), Ct(s, {}, t)), new O()).insert(`
`, Ct(r));
}
function Ct(r) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return r == null || ("formats" in r && typeof r.formats == "function" && (t = {
    ...t,
    ...r.formats()
  }, e && delete t["code-token"]), r.parent == null || r.parent.statics.blotName === "scroll" || r.parent.statics.scope !== r.statics.scope) ? t : Ct(r.parent, t, e);
}
const Tt = class Tt extends At {
  // Zero width no break space
  static value() {
  }
  constructor(t, e, s) {
    super(t, e), this.selection = s, this.textNode = document.createTextNode(Tt.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
  }
  detach() {
    this.parent != null && this.parent.removeChild(this);
  }
  format(t, e) {
    if (this.savedLength !== 0) {
      super.format(t, e);
      return;
    }
    let s = this, n = 0;
    for (; s != null && s.statics.scope !== q.BLOCK_BLOT; )
      n += s.offset(s.parent), s = s.parent;
    s != null && (this.savedLength = Tt.CONTENTS.length, s.optimize(), s.formatAt(n, Tt.CONTENTS.length, t, e), this.savedLength = 0);
  }
  index(t, e) {
    return t === this.textNode ? 0 : super.index(t, e);
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
    const t = this.selection.getNativeRange();
    for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
      this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
    const e = this.prev instanceof zt ? this.prev : null, s = e ? e.length() : 0, n = this.next instanceof zt ? this.next : null, i = n ? n.text : "", {
      textNode: a
    } = this, o = a.data.split(Tt.CONTENTS).join("");
    a.data = Tt.CONTENTS;
    let l;
    if (e)
      l = e, (o || n) && (e.insertAt(e.length(), o + i), n && n.remove());
    else if (n)
      l = n, n.insertAt(0, o);
    else {
      const c = document.createTextNode(o);
      l = this.scroll.create(c), this.parent.insertBefore(l, this);
    }
    if (this.remove(), t) {
      const c = (p, m) => e && p === e.domNode ? m : p === a ? s + m - 1 : n && p === n.domNode ? s + o.length + m : null, d = c(t.start.node, t.start.offset), f = c(t.end.node, t.end.offset);
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
  update(t, e) {
    if (t.some((s) => s.type === "characterData" && s.target === this.textNode)) {
      const s = this.restore();
      s && (e.range = s);
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
  optimize(t) {
    super.optimize(t);
    let {
      parent: e
    } = this;
    for (; e; ) {
      if (e.domNode.tagName === "A") {
        this.savedLength = Tt.CONTENTS.length, e.isolate(this.offset(e), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      e = e.parent;
    }
  }
  value() {
    return "";
  }
};
I(Tt, "blotName", "cursor"), I(Tt, "className", "ql-cursor"), I(Tt, "tagName", "span"), I(Tt, "CONTENTS", "\uFEFF");
let Ts = Tt;
var rc = { exports: {} };
(function(r) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function s() {
  }
  Object.create && (s.prototype = /* @__PURE__ */ Object.create(null), new s().__proto__ || (e = !1));
  function n(l, c, d) {
    this.fn = l, this.context = c, this.once = d || !1;
  }
  function i(l, c, d, f, p) {
    if (typeof d != "function")
      throw new TypeError("The listener must be a function");
    var m = new n(d, f || l, p), b = e ? e + c : c;
    return l._events[b] ? l._events[b].fn ? l._events[b] = [l._events[b], m] : l._events[b].push(m) : (l._events[b] = m, l._eventsCount++), l;
  }
  function a(l, c) {
    --l._eventsCount === 0 ? l._events = new s() : delete l._events[c];
  }
  function o() {
    this._events = new s(), this._eventsCount = 0;
  }
  o.prototype.eventNames = function() {
    var c = [], d, f;
    if (this._eventsCount === 0) return c;
    for (f in d = this._events)
      t.call(d, f) && c.push(e ? f.slice(1) : f);
    return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(d)) : c;
  }, o.prototype.listeners = function(c) {
    var d = e ? e + c : c, f = this._events[d];
    if (!f) return [];
    if (f.fn) return [f.fn];
    for (var p = 0, m = f.length, b = new Array(m); p < m; p++)
      b[p] = f[p].fn;
    return b;
  }, o.prototype.listenerCount = function(c) {
    var d = e ? e + c : c, f = this._events[d];
    return f ? f.fn ? 1 : f.length : 0;
  }, o.prototype.emit = function(c, d, f, p, m, b) {
    var v = e ? e + c : c;
    if (!this._events[v]) return !1;
    var w = this._events[v], S = arguments.length, A, D;
    if (w.fn) {
      switch (w.once && this.removeListener(c, w.fn, void 0, !0), S) {
        case 1:
          return w.fn.call(w.context), !0;
        case 2:
          return w.fn.call(w.context, d), !0;
        case 3:
          return w.fn.call(w.context, d, f), !0;
        case 4:
          return w.fn.call(w.context, d, f, p), !0;
        case 5:
          return w.fn.call(w.context, d, f, p, m), !0;
        case 6:
          return w.fn.call(w.context, d, f, p, m, b), !0;
      }
      for (D = 1, A = new Array(S - 1); D < S; D++)
        A[D - 1] = arguments[D];
      w.fn.apply(w.context, A);
    } else {
      var L = w.length, C;
      for (D = 0; D < L; D++)
        switch (w[D].once && this.removeListener(c, w[D].fn, void 0, !0), S) {
          case 1:
            w[D].fn.call(w[D].context);
            break;
          case 2:
            w[D].fn.call(w[D].context, d);
            break;
          case 3:
            w[D].fn.call(w[D].context, d, f);
            break;
          case 4:
            w[D].fn.call(w[D].context, d, f, p);
            break;
          default:
            if (!A) for (C = 1, A = new Array(S - 1); C < S; C++)
              A[C - 1] = arguments[C];
            w[D].fn.apply(w[D].context, A);
        }
    }
    return !0;
  }, o.prototype.on = function(c, d, f) {
    return i(this, c, d, f, !1);
  }, o.prototype.once = function(c, d, f) {
    return i(this, c, d, f, !0);
  }, o.prototype.removeListener = function(c, d, f, p) {
    var m = e ? e + c : c;
    if (!this._events[m]) return this;
    if (!d)
      return a(this, m), this;
    var b = this._events[m];
    if (b.fn)
      b.fn === d && (!p || b.once) && (!f || b.context === f) && a(this, m);
    else {
      for (var v = 0, w = [], S = b.length; v < S; v++)
        (b[v].fn !== d || p && !b[v].once || f && b[v].context !== f) && w.push(b[v]);
      w.length ? this._events[m] = w.length === 1 ? w[0] : w : a(this, m);
    }
    return this;
  }, o.prototype.removeAllListeners = function(c) {
    var d;
    return c ? (d = e ? e + c : c, this._events[d] && a(this, d)) : (this._events = new s(), this._eventsCount = 0), this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = e, o.EventEmitter = o, r.exports = o;
})(rc);
var Mp = rc.exports;
const Rp = /* @__PURE__ */ Xl(Mp), Qr = /* @__PURE__ */ new WeakMap(), Jr = ["error", "warn", "log", "info"];
let ta = "warn";
function ac(r) {
  if (ta && Jr.indexOf(r) <= Jr.indexOf(ta)) {
    for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      e[s - 1] = arguments[s];
    console[r](...e);
  }
}
function be(r) {
  return Jr.reduce((t, e) => (t[e] = ac.bind(console, e, r), t), {});
}
be.level = (r) => {
  ta = r;
};
ac.level = be.level;
const Tr = be("quill:events"), _p = ["selectionchange", "mousedown", "mouseup", "click"];
_p.forEach((r) => {
  document.addEventListener(r, function() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++)
      e[s] = arguments[s];
    Array.from(document.querySelectorAll(".ql-container")).forEach((n) => {
      const i = Qr.get(n);
      i && i.emitter && i.emitter.handleDOM(...e);
    });
  });
});
class k extends Rp {
  constructor() {
    super(), this.domListeners = {}, this.on("error", Tr.error);
  }
  emit() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++)
      e[s] = arguments[s];
    return Tr.log.call(Tr, ...e), super.emit(...e);
  }
  handleDOM(t) {
    for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
      s[n - 1] = arguments[n];
    (this.domListeners[t.type] || []).forEach((i) => {
      let {
        node: a,
        handler: o
      } = i;
      (t.target === a || a.contains(t.target)) && o(t, ...s);
    });
  }
  listenDOM(t, e, s) {
    this.domListeners[t] || (this.domListeners[t] = []), this.domListeners[t].push({
      node: e,
      handler: s
    });
  }
}
I(k, "events", {
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
}), I(k, "sources", {
  API: "api",
  SILENT: "silent",
  USER: "user"
});
const Cr = be("quill:selection");
class Pe {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = e;
  }
}
class $p {
  constructor(t, e) {
    this.emitter = e, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Pe(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, k.sources.USER), 1);
    }), this.emitter.on(k.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const s = this.getNativeRange();
      s != null && s.start.node !== this.cursor.textNode && this.emitter.once(k.events.SCROLL_UPDATE, (n, i) => {
        try {
          this.root.contains(s.start.node) && this.root.contains(s.end.node) && this.setNativeRange(s.start.node, s.start.offset, s.end.node, s.end.offset);
          const a = i.some((o) => o.type === "characterData" || o.type === "childList" || o.type === "attributes" && o.target === this.root);
          this.update(a ? k.sources.SILENT : n);
        } catch {
        }
      });
    }), this.emitter.on(k.events.SCROLL_OPTIMIZE, (s, n) => {
      if (n.range) {
        const {
          startNode: i,
          startOffset: a,
          endNode: o,
          endOffset: l
        } = n.range;
        this.setNativeRange(i, a, o, l), this.update(k.sources.SILENT);
      }
    }), this.update(k.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(k.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(k.events.COMPOSITION_END, () => {
      if (this.composing = !1, this.cursor.parent) {
        const t = this.cursor.restore();
        if (!t) return;
        setTimeout(() => {
          this.setNativeRange(t.startNode, t.startOffset, t.endNode, t.endOffset);
        }, 1);
      }
    });
  }
  handleDragging() {
    this.emitter.listenDOM("mousedown", document.body, () => {
      this.mouseDown = !0;
    }), this.emitter.listenDOM("mouseup", document.body, () => {
      this.mouseDown = !1, this.update(k.sources.USER);
    });
  }
  focus() {
    this.hasFocus() || (this.root.focus({
      preventScroll: !0
    }), this.setRange(this.savedRange));
  }
  format(t, e) {
    this.scroll.update();
    const s = this.getNativeRange();
    if (!(s == null || !s.native.collapsed || this.scroll.query(t, q.BLOCK))) {
      if (s.start.node !== this.cursor.textNode) {
        const n = this.scroll.find(s.start.node, !1);
        if (n == null) return;
        if (n instanceof ft) {
          const i = n.split(s.start.offset);
          n.parent.insertBefore(this.cursor, i);
        } else
          n.insertBefore(this.cursor, s.start.node);
        this.cursor.attach();
      }
      this.cursor.format(t, e), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
    }
  }
  getBounds(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const s = this.scroll.length();
    t = Math.min(t, s - 1), e = Math.min(t + e, s - 1) - t;
    let n, [i, a] = this.scroll.leaf(t);
    if (i == null) return null;
    if (e > 0 && a === i.length()) {
      const [d] = this.scroll.leaf(t + 1);
      if (d) {
        const [f] = this.scroll.line(t), [p] = this.scroll.line(t + 1);
        f === p && (i = d, a = 0);
      }
    }
    [n, a] = i.position(a, !0);
    const o = document.createRange();
    if (e > 0)
      return o.setStart(n, a), [i, a] = this.scroll.leaf(t + e), i == null ? null : ([n, a] = i.position(a, !0), o.setEnd(n, a), o.getBoundingClientRect());
    let l = "left", c;
    if (n instanceof Text) {
      if (!n.data.length)
        return null;
      a < n.data.length ? (o.setStart(n, a), o.setEnd(n, a + 1)) : (o.setStart(n, a - 1), o.setEnd(n, a), l = "right"), c = o.getBoundingClientRect();
    } else {
      if (!(i.domNode instanceof Element)) return null;
      c = i.domNode.getBoundingClientRect(), a > 0 && (l = "right");
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
    const t = document.getSelection();
    if (t == null || t.rangeCount <= 0) return null;
    const e = t.getRangeAt(0);
    if (e == null) return null;
    const s = this.normalizeNative(e);
    return Cr.info("getNativeRange", s), s;
  }
  getRange() {
    const t = this.scroll.domNode;
    if ("isConnected" in t && !t.isConnected)
      return [null, null];
    const e = this.getNativeRange();
    return e == null ? [null, null] : [this.normalizedToRange(e), e];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && Lr(this.root, document.activeElement);
  }
  normalizedToRange(t) {
    const e = [[t.start.node, t.start.offset]];
    t.native.collapsed || e.push([t.end.node, t.end.offset]);
    const s = e.map((a) => {
      const [o, l] = a, c = this.scroll.find(o, !0), d = c.offset(this.scroll);
      return l === 0 ? d : c instanceof ft ? d + c.index(o, l) : d + c.length();
    }), n = Math.min(Math.max(...s), this.scroll.length() - 1), i = Math.min(n, ...s);
    return new Pe(i, n - i);
  }
  normalizeNative(t) {
    if (!Lr(this.root, t.startContainer) || !t.collapsed && !Lr(this.root, t.endContainer))
      return null;
    const e = {
      start: {
        node: t.startContainer,
        offset: t.startOffset
      },
      end: {
        node: t.endContainer,
        offset: t.endOffset
      },
      native: t
    };
    return [e.start, e.end].forEach((s) => {
      let {
        node: n,
        offset: i
      } = s;
      for (; !(n instanceof Text) && n.childNodes.length > 0; )
        if (n.childNodes.length > i)
          n = n.childNodes[i], i = 0;
        else if (n.childNodes.length === i)
          n = n.lastChild, n instanceof Text ? i = n.data.length : n.childNodes.length > 0 ? i = n.childNodes.length : i = n.childNodes.length + 1;
        else
          break;
      s.node = n, s.offset = i;
    }), e;
  }
  rangeToNative(t) {
    const e = this.scroll.length(), s = (n, i) => {
      n = Math.min(e - 1, n);
      const [a, o] = this.scroll.leaf(n);
      return a ? a.position(o, i) : [null, -1];
    };
    return [...s(t.index, !1), ...s(t.index + t.length, !0)];
  }
  setNativeRange(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : e, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (Cr.info("setNativeRange", t, e, s, n), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
    s.parentNode == null))
      return;
    const a = document.getSelection();
    if (a != null)
      if (t != null) {
        this.hasFocus() || this.root.focus({
          preventScroll: !0
        });
        const {
          native: o
        } = this.getNativeRange() || {};
        if (o == null || i || t !== o.startContainer || e !== o.startOffset || s !== o.endContainer || n !== o.endOffset) {
          t instanceof Element && t.tagName === "BR" && (e = Array.from(t.parentNode.childNodes).indexOf(t), t = t.parentNode), s instanceof Element && s.tagName === "BR" && (n = Array.from(s.parentNode.childNodes).indexOf(s), s = s.parentNode);
          const l = document.createRange();
          l.setStart(t, e), l.setEnd(s, n), a.removeAllRanges(), a.addRange(l);
        }
      } else
        a.removeAllRanges(), this.root.blur();
  }
  setRange(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : k.sources.API;
    if (typeof e == "string" && (s = e, e = !1), Cr.info("setRange", t), t != null) {
      const n = this.rangeToNative(t);
      this.setNativeRange(...n, e);
    } else
      this.setNativeRange(null);
    this.update(s);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : k.sources.USER;
    const e = this.lastRange, [s, n] = this.getRange();
    if (this.lastRange = s, this.lastNative = n, this.lastRange != null && (this.savedRange = this.lastRange), !Ia(e, this.lastRange)) {
      if (!this.composing && n != null && n.native.collapsed && n.start.node !== this.cursor.textNode) {
        const a = this.cursor.restore();
        a && this.setNativeRange(a.startNode, a.startOffset, a.endNode, a.endOffset);
      }
      const i = [k.events.SELECTION_CHANGE, hs(this.lastRange), hs(e), t];
      this.emitter.emit(k.events.EDITOR_CHANGE, ...i), t !== k.sources.SILENT && this.emitter.emit(...i);
    }
  }
}
function Lr(r, t) {
  try {
    t.parentNode;
  } catch {
    return !1;
  }
  return r.contains(t);
}
const Bp = /^[ -~]*$/;
class Fp {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let e = this.scroll.length();
    this.scroll.batchStart();
    const s = zo(t), n = new O();
    return jp(s.ops.slice()).reduce((a, o) => {
      const l = kt.Op.length(o);
      let c = o.attributes || {}, d = !1, f = !1;
      if (o.insert != null) {
        if (n.retain(l), typeof o.insert == "string") {
          const b = o.insert;
          f = !b.endsWith(`
`) && (e <= a || !!this.scroll.descendant(It, a)[0]), this.scroll.insertAt(a, b);
          const [v, w] = this.scroll.line(a);
          let S = Ee({}, Ct(v));
          if (v instanceof at) {
            const [A] = v.descendant(ft, w);
            A && (S = Ee(S, Ct(A)));
          }
          c = kt.AttributeMap.diff(S, c) || {};
        } else if (typeof o.insert == "object") {
          const b = Object.keys(o.insert)[0];
          if (b == null) return a;
          const v = this.scroll.query(b, q.INLINE) != null;
          if (v)
            (e <= a || this.scroll.descendant(It, a)[0]) && (f = !0);
          else if (a > 0) {
            const [w, S] = this.scroll.descendant(ft, a - 1);
            w instanceof zt ? w.value()[S] !== `
` && (d = !0) : w instanceof At && w.statics.scope === q.INLINE_BLOT && (d = !0);
          }
          if (this.scroll.insertAt(a, b, o.insert[b]), v) {
            const [w] = this.scroll.descendant(ft, a);
            if (w) {
              const S = Ee({}, Ct(w));
              c = kt.AttributeMap.diff(S, c) || {};
            }
          }
        }
        e += l;
      } else if (n.push(o), o.retain !== null && typeof o.retain == "object") {
        const b = Object.keys(o.retain)[0];
        if (b == null) return a;
        this.scroll.updateEmbedAt(a, b, o.retain[b]);
      }
      Object.keys(c).forEach((b) => {
        this.scroll.formatAt(a, l, b, c[b]);
      });
      const p = d ? 1 : 0, m = f ? 1 : 0;
      return e += p + m, n.retain(p), n.delete(m), a + l + p + m;
    }, 0), n.reduce((a, o) => typeof o.delete == "number" ? (this.scroll.deleteAt(a, o.delete), a) : a + kt.Op.length(o), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(s);
  }
  deleteText(t, e) {
    return this.scroll.deleteAt(t, e), this.update(new O().retain(t).delete(e));
  }
  formatLine(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(s).forEach((i) => {
      this.scroll.lines(t, Math.max(e, 1)).forEach((a) => {
        a.format(i, s[i]);
      });
    }), this.scroll.optimize();
    const n = new O().retain(t).retain(e, hs(s));
    return this.update(n);
  }
  formatText(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(s).forEach((i) => {
      this.scroll.formatAt(t, e, i, s[i]);
    });
    const n = new O().retain(t).retain(e, hs(s));
    return this.update(n);
  }
  getContents(t, e) {
    return this.delta.slice(t, t + e);
  }
  getDelta() {
    return this.scroll.lines().reduce((t, e) => t.concat(e.delta()), new O());
  }
  getFormat(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, s = [], n = [];
    e === 0 ? this.scroll.path(t).forEach((o) => {
      const [l] = o;
      l instanceof at ? s.push(l) : l instanceof ft && n.push(l);
    }) : (s = this.scroll.lines(t, e), n = this.scroll.descendants(ft, t, e));
    const [i, a] = [s, n].map((o) => {
      const l = o.shift();
      if (l == null) return {};
      let c = Ct(l);
      for (; Object.keys(c).length > 0; ) {
        const d = o.shift();
        if (d == null) return c;
        c = Pp(Ct(d), c);
      }
      return c;
    });
    return {
      ...i,
      ...a
    };
  }
  getHTML(t, e) {
    const [s, n] = this.scroll.line(t);
    if (s) {
      const i = s.length();
      return s.length() >= n + e && !(n === 0 && e === i) ? fn(s, n, e, !0) : fn(this.scroll, t, e, !0);
    }
    return "";
  }
  getText(t, e) {
    return this.getContents(t, e).filter((s) => typeof s.insert == "string").map((s) => s.insert).join("");
  }
  insertContents(t, e) {
    const s = zo(e), n = new O().retain(t).concat(s);
    return this.scroll.insertContents(t, s), this.update(n);
  }
  insertEmbed(t, e, s) {
    return this.scroll.insertAt(t, e, s), this.update(new O().retain(t).insert({
      [e]: s
    }));
  }
  insertText(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return e = e.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(t, e), Object.keys(s).forEach((n) => {
      this.scroll.formatAt(t, e.length, n, s[n]);
    }), this.update(new O().retain(t).insert(e, hs(s)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const t = this.scroll.children.head;
    if ((t == null ? void 0 : t.statics.blotName) !== at.blotName) return !1;
    const e = t;
    return e.children.length > 1 ? !1 : e.children.head instanceof Vt;
  }
  removeFormat(t, e) {
    const s = this.getText(t, e), [n, i] = this.scroll.line(t + e);
    let a = 0, o = new O();
    n != null && (a = n.length() - i, o = n.delta().slice(i, i + a - 1).insert(`
`));
    const c = this.getContents(t, e + a).diff(new O().insert(s).concat(o)), d = new O().retain(t).concat(c);
    return this.applyDelta(d);
  }
  update(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const n = this.delta;
    if (e.length === 1 && e[0].type === "characterData" && // @ts-expect-error Fix me later
    e[0].target.data.match(Bp) && this.scroll.find(e[0].target)) {
      const i = this.scroll.find(e[0].target), a = Ct(i), o = i.offset(this.scroll), l = e[0].oldValue.replace(Ts.CONTENTS, ""), c = new O().insert(l), d = new O().insert(i.value()), f = s && {
        oldRange: Uo(s.oldRange, -o),
        newRange: Uo(s.newRange, -o)
      };
      t = new O().retain(o).concat(c.diff(d, f)).reduce((m, b) => b.insert ? m.insert(b.insert, a) : m.push(b), new O()), this.delta = n.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !Ia(n.compose(t), this.delta)) && (t = n.diff(this.delta, s));
    return t;
  }
}
function ls(r, t, e) {
  if (r.length === 0) {
    const [m] = Ir(e.pop());
    return t <= 0 ? `</li></${m}>` : `</li></${m}>${ls([], t - 1, e)}`;
  }
  const [{
    child: s,
    offset: n,
    length: i,
    indent: a,
    type: o
  }, ...l] = r, [c, d] = Ir(o);
  if (a > t)
    return e.push(o), a === t + 1 ? `<${c}><li${d}>${fn(s, n, i)}${ls(l, a, e)}` : `<${c}><li>${ls(r, t + 1, e)}`;
  const f = e[e.length - 1];
  if (a === t && o === f)
    return `</li><li${d}>${fn(s, n, i)}${ls(l, a, e)}`;
  const [p] = Ir(e.pop());
  return `</li></${p}>${ls(r, t - 1, e)}`;
}
function fn(r, t, e) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in r && typeof r.html == "function")
    return r.html(t, e);
  if (r instanceof zt)
    return Ci(r.value().slice(t, t + e)).replaceAll(" ", "&nbsp;");
  if (r instanceof Ft) {
    if (r.statics.blotName === "list-container") {
      const c = [];
      return r.children.forEachAt(t, e, (d, f, p) => {
        const m = "formats" in d && typeof d.formats == "function" ? d.formats() : {};
        c.push({
          child: d,
          offset: f,
          length: p,
          indent: m.indent || 0,
          type: m.list
        });
      }), ls(c, -1, []);
    }
    const n = [];
    if (r.children.forEachAt(t, e, (c, d, f) => {
      n.push(fn(c, d, f));
    }), s || r.statics.blotName === "list")
      return n.join("");
    const {
      outerHTML: i,
      innerHTML: a
    } = r.domNode, [o, l] = i.split(`>${a}<`);
    return o === "<table" ? `<table style="border: 1px solid #000;">${n.join("")}<${l}` : `${o}>${n.join("")}<${l}`;
  }
  return r.domNode instanceof Element ? r.domNode.outerHTML : "";
}
function Pp(r, t) {
  return Object.keys(t).reduce((e, s) => {
    if (r[s] == null) return e;
    const n = t[s];
    return n === r[s] ? e[s] = n : Array.isArray(n) ? n.indexOf(r[s]) < 0 ? e[s] = n.concat([r[s]]) : e[s] = n : e[s] = [n, r[s]], e;
  }, {});
}
function Ir(r) {
  const t = r === "ordered" ? "ol" : "ul";
  switch (r) {
    case "checked":
      return [t, ' data-list="checked"'];
    case "unchecked":
      return [t, ' data-list="unchecked"'];
    default:
      return [t, ""];
  }
}
function zo(r) {
  return r.reduce((t, e) => {
    if (typeof e.insert == "string") {
      const s = e.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return t.insert(s, e.attributes);
    }
    return t.push(e);
  }, new O());
}
function Uo(r, t) {
  let {
    index: e,
    length: s
  } = r;
  return new Pe(e + t, s);
}
function jp(r) {
  const t = [];
  return r.forEach((e) => {
    typeof e.insert == "string" ? e.insert.split(`
`).forEach((n, i) => {
      i && t.push({
        insert: `
`,
        attributes: e.attributes
      }), n && t.push({
        insert: n,
        attributes: e.attributes
      });
    }) : t.push(e);
  }), t;
}
class Gt {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = t, this.options = e;
  }
}
I(Gt, "DEFAULTS", {});
const Wn = "\uFEFF";
class _a extends At {
  constructor(t, e) {
    super(t, e), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((s) => {
      this.contentNode.appendChild(s);
    }), this.leftGuard = document.createTextNode(Wn), this.rightGuard = document.createTextNode(Wn), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, e) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, e);
  }
  restore(t) {
    let e = null, s;
    const n = t.data.split(Wn).join("");
    if (t === this.leftGuard)
      if (this.prev instanceof zt) {
        const i = this.prev.length();
        this.prev.insertAt(i, n), e = {
          startNode: this.prev.domNode,
          startOffset: i + n.length
        };
      } else
        s = document.createTextNode(n), this.parent.insertBefore(this.scroll.create(s), this), e = {
          startNode: s,
          startOffset: n.length
        };
    else t === this.rightGuard && (this.next instanceof zt ? (this.next.insertAt(0, n), e = {
      startNode: this.next.domNode,
      startOffset: n.length
    }) : (s = document.createTextNode(n), this.parent.insertBefore(this.scroll.create(s), this.next), e = {
      startNode: s,
      startOffset: n.length
    }));
    return t.data = Wn, e;
  }
  update(t, e) {
    t.forEach((s) => {
      if (s.type === "characterData" && (s.target === this.leftGuard || s.target === this.rightGuard)) {
        const n = this.restore(s.target);
        n && (e.range = n);
      }
    });
  }
}
class Hp {
  constructor(t, e) {
    I(this, "isComposing", !1);
    this.scroll = t, this.emitter = e, this.setupListeners();
  }
  setupListeners() {
    this.scroll.domNode.addEventListener("compositionstart", (t) => {
      this.isComposing || this.handleCompositionStart(t);
    }), this.scroll.domNode.addEventListener("compositionend", (t) => {
      this.isComposing && queueMicrotask(() => {
        this.handleCompositionEnd(t);
      });
    });
  }
  handleCompositionStart(t) {
    const e = t.target instanceof Node ? this.scroll.find(t.target, !0) : null;
    e && !(e instanceof _a) && (this.emitter.emit(k.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(k.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(k.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(k.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
const nn = class nn {
  constructor(t, e) {
    I(this, "modules", {});
    this.quill = t, this.options = e;
  }
  init() {
    Object.keys(this.options.modules).forEach((t) => {
      this.modules[t] == null && this.addModule(t);
    });
  }
  addModule(t) {
    const e = this.quill.constructor.import(`modules/${t}`);
    return this.modules[t] = new e(this.quill, this.options.modules[t] || {}), this.modules[t];
  }
};
I(nn, "DEFAULTS", {
  modules: {}
}), I(nn, "themes", {
  default: nn
});
let Cs = nn;
const zp = (r) => r.parentElement || r.getRootNode().host || null, Up = (r) => {
  const t = r.getBoundingClientRect(), e = "offsetWidth" in r && Math.abs(t.width) / r.offsetWidth || 1, s = "offsetHeight" in r && Math.abs(t.height) / r.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + r.clientWidth * e,
    bottom: t.top + r.clientHeight * s,
    left: t.left
  };
}, Zn = (r) => {
  const t = parseInt(r, 10);
  return Number.isNaN(t) ? 0 : t;
}, Vo = (r, t, e, s, n, i) => r < e && t > s ? 0 : r < e ? -(e - r + n) : t > s ? t - r > s - e ? r + n - e : t - s + i : 0, Vp = (r, t) => {
  var i, a, o;
  const e = r.ownerDocument;
  let s = t, n = r;
  for (; n; ) {
    const l = n === e.body, c = l ? {
      top: 0,
      right: ((i = window.visualViewport) == null ? void 0 : i.width) ?? e.documentElement.clientWidth,
      bottom: ((a = window.visualViewport) == null ? void 0 : a.height) ?? e.documentElement.clientHeight,
      left: 0
    } : Up(n), d = getComputedStyle(n), f = Vo(s.left, s.right, c.left, c.right, Zn(d.scrollPaddingLeft), Zn(d.scrollPaddingRight)), p = Vo(s.top, s.bottom, c.top, c.bottom, Zn(d.scrollPaddingTop), Zn(d.scrollPaddingBottom));
    if (f || p)
      if (l)
        (o = e.defaultView) == null || o.scrollBy(f, p);
      else {
        const {
          scrollLeft: m,
          scrollTop: b
        } = n;
        p && (n.scrollTop += p), f && (n.scrollLeft += f);
        const v = n.scrollLeft - m, w = n.scrollTop - b;
        s = {
          left: s.left - v,
          top: s.top - w,
          right: s.right - v,
          bottom: s.bottom - w
        };
      }
    n = l || d.position === "fixed" ? null : zp(n);
  }
}, Gp = 100, Kp = ["block", "break", "cursor", "inline", "scroll", "text"], Yp = (r, t, e) => {
  const s = new Ds();
  return Kp.forEach((n) => {
    const i = t.query(n);
    i && s.register(i);
  }), r.forEach((n) => {
    let i = t.query(n);
    i || e.error(`Cannot register "${n}" specified in "formats" config. Are you sure it was registered?`);
    let a = 0;
    for (; i; )
      if (s.register(i), i = "blotName" in i ? i.requiredContainer ?? null : null, a += 1, a > Gp) {
        e.error(`Cycle detected in registering blot requiredContainer: "${n}"`);
        break;
      }
  }), s;
}, gs = be("quill"), Xn = new Ds();
Ft.uiClass = "ql-ui";
const _t = class _t {
  static debug(t) {
    t === !0 && (t = "log"), be.level(t);
  }
  static find(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Qr.get(t) || Xn.find(t, e);
  }
  static import(t) {
    return this.imports[t] == null && gs.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = !!(!(arguments.length <= 1) && arguments[1]), s = "attrName" in t ? t.attrName : t.blotName;
      typeof s == "string" ? this.register(`formats/${s}`, t, e) : Object.keys(t).forEach((n) => {
        this.register(n, t[n], e);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = arguments.length <= 1 ? void 0 : arguments[1], s = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !s && gs.warn(`Overwriting ${t} with`, e), this.imports[t] = e, (t.startsWith("blots/") || t.startsWith("formats/")) && e && typeof e != "boolean" && e.blotName !== "abstract" && Xn.register(e), typeof e.register == "function" && e.register(Xn);
    }
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = Wp(t, e), this.container = this.options.container, this.container == null) {
      gs.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && _t.debug(this.options.debug);
    const s = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Qr.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new k();
    const n = Na.blotName, i = this.options.registry.query(n);
    if (!i || !("blotName" in i))
      throw new Error(`Cannot initialize Quill without "${n}" blot`);
    if (this.scroll = new i(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Fp(this.scroll), this.selection = new $p(this.scroll, this.emitter), this.composition = new Hp(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(k.events.EDITOR_CHANGE, (a) => {
      a === k.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(k.events.SCROLL_UPDATE, (a, o) => {
      const l = this.selection.lastRange, [c] = this.selection.getRange(), d = l && c ? {
        oldRange: l,
        newRange: c
      } : void 0;
      Rt.call(this, () => this.editor.update(null, o, d), a);
    }), this.emitter.on(k.events.SCROLL_EMBED_UPDATE, (a, o) => {
      const l = this.selection.lastRange, [c] = this.selection.getRange(), d = l && c ? {
        oldRange: l,
        newRange: c
      } : void 0;
      Rt.call(this, () => {
        const f = new O().retain(a.offset(this)).retain({
          [a.statics.blotName]: o
        });
        return this.editor.update(f, [], d);
      }, _t.sources.USER);
    }), s) {
      const a = this.clipboard.convert({
        html: `${s}<p><br></p>`,
        text: `
`
      });
      this.setContents(a);
    }
    this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable(), this.allowReadOnlyEdits = !1;
  }
  addContainer(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (typeof t == "string") {
      const s = t;
      t = document.createElement("div"), t.classList.add(s);
    }
    return this.container.insertBefore(t, e), t;
  }
  blur() {
    this.selection.setRange(null);
  }
  deleteText(t, e, s) {
    return [t, e, , s] = he(t, e, s), Rt.call(this, () => this.editor.deleteText(t, e), s, t, -1 * e);
  }
  disable() {
    this.enable(!1);
  }
  editReadOnly(t) {
    this.allowReadOnlyEdits = !0;
    const e = t();
    return this.allowReadOnlyEdits = !1, e;
  }
  enable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.scroll.enable(t), this.container.classList.toggle("ql-disabled", !t);
  }
  focus() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.selection.focus(), t.preventScroll || this.scrollSelectionIntoView();
  }
  format(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : k.sources.API;
    return Rt.call(this, () => {
      const n = this.getSelection(!0);
      let i = new O();
      if (n == null) return i;
      if (this.scroll.query(t, q.BLOCK))
        i = this.editor.formatLine(n.index, n.length, {
          [t]: e
        });
      else {
        if (n.length === 0)
          return this.selection.format(t, e), i;
        i = this.editor.formatText(n.index, n.length, {
          [t]: e
        });
      }
      return this.setSelection(n, k.sources.SILENT), i;
    }, s);
  }
  formatLine(t, e, s, n, i) {
    let a;
    return [t, e, a, i] = he(
      t,
      e,
      // @ts-expect-error
      s,
      n,
      i
    ), Rt.call(this, () => this.editor.formatLine(t, e, a), i, t, 0);
  }
  formatText(t, e, s, n, i) {
    let a;
    return [t, e, a, i] = he(
      // @ts-expect-error
      t,
      e,
      s,
      n,
      i
    ), Rt.call(this, () => this.editor.formatText(t, e, a), i, t, 0);
  }
  getBounds(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, s = null;
    if (typeof t == "number" ? s = this.selection.getBounds(t, e) : s = this.selection.getBounds(t.index, t.length), !s) return null;
    const n = this.container.getBoundingClientRect();
    return {
      bottom: s.bottom - n.top,
      height: s.height,
      left: s.left - n.left,
      right: s.right - n.left,
      top: s.top - n.top,
      width: s.width
    };
  }
  getContents() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - t;
    return [t, e] = he(t, e), this.editor.getContents(t, e);
  }
  getFormat() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return typeof t == "number" ? this.editor.getFormat(t, e) : this.editor.getFormat(t.index, t.length);
  }
  getIndex(t) {
    return t.offset(this.scroll);
  }
  getLength() {
    return this.scroll.length();
  }
  getLeaf(t) {
    return this.scroll.leaf(t);
  }
  getLine(t) {
    return this.scroll.line(t);
  }
  getLines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    return typeof t != "number" ? this.scroll.lines(t.index, t.length) : this.scroll.lines(t, e);
  }
  getModule(t) {
    return this.theme.modules[t];
  }
  getSelection() {
    return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) && this.focus(), this.update(), this.selection.getRange()[0];
  }
  getSemanticHTML() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (e = e ?? this.getLength() - t), [t, e] = he(t, e), this.editor.getHTML(t, e);
  }
  getText() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (e = e ?? this.getLength() - t), [t, e] = he(t, e), this.editor.getText(t, e);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(t, e, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : _t.sources.API;
    return Rt.call(this, () => this.editor.insertEmbed(t, e, s), n, t);
  }
  insertText(t, e, s, n, i) {
    let a;
    return [t, , a, i] = he(t, 0, s, n, i), Rt.call(this, () => this.editor.insertText(t, e, a), i, t, e.length);
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
  removeFormat(t, e, s) {
    return [t, e, , s] = he(t, e, s), Rt.call(this, () => this.editor.removeFormat(t, e), s, t);
  }
  scrollRectIntoView(t) {
    Vp(this.root, t);
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
    const t = this.selection.lastRange, e = t && this.selection.getBounds(t.index, t.length);
    e && this.scrollRectIntoView(e);
  }
  setContents(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : k.sources.API;
    return Rt.call(this, () => {
      t = new O(t);
      const s = this.getLength(), n = this.editor.deleteText(0, s), i = this.editor.insertContents(0, t), a = this.editor.deleteText(this.getLength() - 1, 1);
      return n.compose(i).compose(a);
    }, e);
  }
  setSelection(t, e, s) {
    t == null ? this.selection.setRange(null, e || _t.sources.API) : ([t, e, , s] = he(t, e, s), this.selection.setRange(new Pe(Math.max(0, t), e), s), s !== k.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : k.sources.API;
    const s = new O().insert(t);
    return this.setContents(s, e);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : k.sources.USER;
    const e = this.scroll.update(t);
    return this.selection.update(t), e;
  }
  updateContents(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : k.sources.API;
    return Rt.call(this, () => (t = new O(t), this.editor.applyDelta(t)), e, !0);
  }
};
I(_t, "DEFAULTS", {
  bounds: null,
  modules: {
    clipboard: !0,
    keyboard: !0,
    history: !0,
    uploader: !0
  },
  placeholder: "",
  readOnly: !1,
  registry: Xn,
  theme: "default"
}), I(_t, "events", k.events), I(_t, "sources", k.sources), I(_t, "version", "2.0.3"), I(_t, "imports", {
  delta: O,
  parchment: vp,
  "core/module": Gt,
  "core/theme": Cs
});
let T = _t;
function Go(r) {
  return typeof r == "string" ? document.querySelector(r) : r;
}
function kr(r) {
  return Object.entries(r ?? {}).reduce((t, e) => {
    let [s, n] = e;
    return {
      ...t,
      [s]: n === !0 ? {} : n
    };
  }, {});
}
function Ko(r) {
  return Object.fromEntries(Object.entries(r).filter((t) => t[1] !== void 0));
}
function Wp(r, t) {
  const e = Go(r);
  if (!e)
    throw new Error("Invalid Quill container");
  const n = !t.theme || t.theme === T.DEFAULTS.theme ? Cs : T.import(`themes/${t.theme}`);
  if (!n)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: i,
    ...a
  } = T.DEFAULTS, {
    modules: o,
    ...l
  } = n.DEFAULTS;
  let c = kr(t.modules);
  c != null && c.toolbar && c.toolbar.constructor !== Object && (c = {
    ...c,
    toolbar: {
      container: c.toolbar
    }
  });
  const d = Ee({}, kr(i), kr(o), c), f = {
    ...a,
    ...Ko(l),
    ...Ko(t)
  };
  let p = t.registry;
  return p ? t.formats && gs.warn('Ignoring "formats" option because "registry" is specified') : p = t.formats ? Yp(t.formats, f.registry, gs) : f.registry, {
    ...f,
    registry: p,
    container: e,
    theme: n,
    modules: Object.entries(d).reduce((m, b) => {
      let [v, w] = b;
      if (!w) return m;
      const S = T.import(`modules/${v}`);
      return S == null ? (gs.error(`Cannot load ${v} module. Are you sure you registered it?`), m) : {
        ...m,
        // @ts-expect-error
        [v]: Ee({}, S.DEFAULTS || {}, w)
      };
    }, {}),
    bounds: Go(f.bounds)
  };
}
function Rt(r, t, e, s) {
  if (!this.isEnabled() && t === k.sources.USER && !this.allowReadOnlyEdits)
    return new O();
  let n = e == null ? null : this.getSelection();
  const i = this.editor.delta, a = r();
  if (n != null && (e === !0 && (e = n.index), s == null ? n = Yo(n, a, t) : s !== 0 && (n = Yo(n, e, s, t)), this.setSelection(n, k.sources.SILENT)), a.length() > 0) {
    const o = [k.events.TEXT_CHANGE, a, i, t];
    this.emitter.emit(k.events.EDITOR_CHANGE, ...o), t !== k.sources.SILENT && this.emitter.emit(...o);
  }
  return a;
}
function he(r, t, e, s, n) {
  let i = {};
  return typeof r.index == "number" && typeof r.length == "number" ? typeof t != "number" ? (n = s, s = e, e = t, t = r.length, r = r.index) : (t = r.length, r = r.index) : typeof t != "number" && (n = s, s = e, e = t, t = 0), typeof e == "object" ? (i = e, n = s) : typeof e == "string" && (s != null ? i[e] = s : n = e), n = n || k.sources.API, [r, t, i, n];
}
function Yo(r, t, e, s) {
  const n = typeof e == "number" ? e : 0;
  if (r == null) return null;
  let i, a;
  return t && typeof t.transformPosition == "function" ? [i, a] = [r.index, r.index + r.length].map((o) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(o, s !== k.sources.USER)
  )) : [i, a] = [r.index, r.index + r.length].map((o) => o < t || o === t && s === k.sources.USER ? o : n >= 0 ? o + n : Math.max(t, o + n)), new Pe(i, a - i);
}
class Ue extends Ai {
}
function Wo(r) {
  return r instanceof at || r instanceof It;
}
function Zo(r) {
  return typeof r.updateContent == "function";
}
class cs extends Na {
  constructor(t, e, s) {
    let {
      emitter: n
    } = s;
    super(t, e), this.emitter = n, this.batch = !1, this.optimize(), this.enable(), this.domNode.addEventListener("dragstart", (i) => this.handleDragStart(i));
  }
  batchStart() {
    Array.isArray(this.batch) || (this.batch = []);
  }
  batchEnd() {
    if (!this.batch) return;
    const t = this.batch;
    this.batch = !1, this.update(t);
  }
  emitMount(t) {
    this.emitter.emit(k.events.SCROLL_BLOT_MOUNT, t);
  }
  emitUnmount(t) {
    this.emitter.emit(k.events.SCROLL_BLOT_UNMOUNT, t);
  }
  emitEmbedUpdate(t, e) {
    this.emitter.emit(k.events.SCROLL_EMBED_UPDATE, t, e);
  }
  deleteAt(t, e) {
    const [s, n] = this.line(t), [i] = this.line(t + e);
    if (super.deleteAt(t, e), i != null && s !== i && n > 0) {
      if (s instanceof It || i instanceof It) {
        this.optimize();
        return;
      }
      const a = i.children.head instanceof Vt ? null : i.children.head;
      s.moveChildren(i, a), s.remove();
    }
    this.optimize();
  }
  enable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.domNode.setAttribute("contenteditable", t ? "true" : "false");
  }
  formatAt(t, e, s, n) {
    super.formatAt(t, e, s, n), this.optimize();
  }
  insertAt(t, e, s) {
    if (t >= this.length())
      if (s == null || this.scroll.query(e, q.BLOCK) == null) {
        const n = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(n), s == null && e.endsWith(`
`) ? n.insertAt(0, e.slice(0, -1), s) : n.insertAt(0, e, s);
      } else {
        const n = this.scroll.create(e, s);
        this.appendChild(n);
      }
    else
      super.insertAt(t, e, s);
    this.optimize();
  }
  insertBefore(t, e) {
    if (t.statics.scope === q.INLINE_BLOT) {
      const s = this.scroll.create(this.statics.defaultChild.blotName);
      s.appendChild(t), super.insertBefore(s, e);
    } else
      super.insertBefore(t, e);
  }
  insertContents(t, e) {
    const s = this.deltaToRenderBlocks(e.concat(new O().insert(`
`))), n = s.pop();
    if (n == null) return;
    this.batchStart();
    const i = s.shift();
    if (i) {
      const l = i.type === "block" && (i.delta.length() === 0 || !this.descendant(It, t)[0] && t < this.length()), c = i.type === "block" ? i.delta : new O().insert({
        [i.key]: i.value
      });
      Nr(this, t, c);
      const d = i.type === "block" ? 1 : 0, f = t + c.length() + d;
      l && this.insertAt(f - 1, `
`);
      const p = Ct(this.line(t)[0]), m = kt.AttributeMap.diff(p, i.attributes) || {};
      Object.keys(m).forEach((b) => {
        this.formatAt(f - 1, 1, b, m[b]);
      }), t = f;
    }
    let [a, o] = this.children.find(t);
    if (s.length && (a && (a = a.split(o), o = 0), s.forEach((l) => {
      if (l.type === "block") {
        const c = this.createBlock(l.attributes, a || void 0);
        Nr(c, 0, l.delta);
      } else {
        const c = this.create(l.key, l.value);
        this.insertBefore(c, a || void 0), Object.keys(l.attributes).forEach((d) => {
          c.format(d, l.attributes[d]);
        });
      }
    })), n.type === "block" && n.delta.length()) {
      const l = a ? a.offset(a.scroll) + o : this.length();
      Nr(this, l, n.delta);
    }
    this.batchEnd(), this.optimize();
  }
  isEnabled() {
    return this.domNode.getAttribute("contenteditable") === "true";
  }
  leaf(t) {
    const e = this.path(t).pop();
    if (!e)
      return [null, -1];
    const [s, n] = e;
    return s instanceof ft ? [s, n] : [null, -1];
  }
  line(t) {
    return t === this.length() ? this.line(t - 1) : this.descendant(Wo, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const s = (n, i, a) => {
      let o = [], l = a;
      return n.children.forEachAt(i, a, (c, d, f) => {
        Wo(c) ? o.push(c) : c instanceof Ai && (o = o.concat(s(c, d, l))), l -= f;
      }), o;
    };
    return s(this, t, e);
  }
  optimize() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(t, e), t.length > 0 && this.emitter.emit(k.events.SCROLL_OPTIMIZE, t, e));
  }
  path(t) {
    return super.path(t).slice(1);
  }
  remove() {
  }
  update(t) {
    if (this.batch) {
      Array.isArray(t) && (this.batch = this.batch.concat(t));
      return;
    }
    let e = k.sources.USER;
    typeof t == "string" && (e = t), Array.isArray(t) || (t = this.observer.takeRecords()), t = t.filter((s) => {
      let {
        target: n
      } = s;
      const i = this.find(n, !0);
      return i && !Zo(i);
    }), t.length > 0 && this.emitter.emit(k.events.SCROLL_BEFORE_UPDATE, e, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(k.events.SCROLL_UPDATE, e, t);
  }
  updateEmbedAt(t, e, s) {
    const [n] = this.descendant((i) => i instanceof It, t);
    n && n.statics.blotName === e && Zo(n) && n.updateContent(s);
  }
  handleDragStart(t) {
    t.preventDefault();
  }
  deltaToRenderBlocks(t) {
    const e = [];
    let s = new O();
    return t.forEach((n) => {
      const i = n == null ? void 0 : n.insert;
      if (i)
        if (typeof i == "string") {
          const a = i.split(`
`);
          a.slice(0, -1).forEach((l) => {
            s.insert(l, n.attributes), e.push({
              type: "block",
              delta: s,
              attributes: n.attributes ?? {}
            }), s = new O();
          });
          const o = a[a.length - 1];
          o && s.insert(o, n.attributes);
        } else {
          const a = Object.keys(i)[0];
          if (!a) return;
          this.query(a, q.INLINE) ? s.push(n) : (s.length() && e.push({
            type: "block",
            delta: s,
            attributes: {}
          }), s = new O(), e.push({
            type: "blockEmbed",
            key: a,
            value: i[a],
            attributes: n.attributes ?? {}
          }));
        }
    }), s.length() && e.push({
      type: "block",
      delta: s,
      attributes: {}
    }), e;
  }
  createBlock(t, e) {
    let s;
    const n = {};
    Object.entries(t).forEach((o) => {
      let [l, c] = o;
      this.query(l, q.BLOCK & q.BLOT) != null ? s = l : n[l] = c;
    });
    const i = this.create(s || this.statics.defaultChild.blotName, s ? t[s] : void 0);
    this.insertBefore(i, e || void 0);
    const a = i.length();
    return Object.entries(n).forEach((o) => {
      let [l, c] = o;
      i.formatAt(0, a, l, c);
    }), i;
  }
}
I(cs, "blotName", "scroll"), I(cs, "className", "ql-editor"), I(cs, "tagName", "DIV"), I(cs, "defaultChild", at), I(cs, "allowedChildren", [at, It, Ue]);
function Nr(r, t, e) {
  e.reduce((s, n) => {
    const i = kt.Op.length(n);
    let a = n.attributes || {};
    if (n.insert != null) {
      if (typeof n.insert == "string") {
        const o = n.insert;
        r.insertAt(s, o);
        const [l] = r.descendant(ft, s), c = Ct(l);
        a = kt.AttributeMap.diff(c, a) || {};
      } else if (typeof n.insert == "object") {
        const o = Object.keys(n.insert)[0];
        if (o == null) return s;
        if (r.insertAt(s, o, n.insert[o]), r.scroll.query(o, q.INLINE) != null) {
          const [c] = r.descendant(ft, s), d = Ct(c);
          a = kt.AttributeMap.diff(d, a) || {};
        }
      }
    }
    return Object.keys(a).forEach((o) => {
      r.formatAt(s, i, o, a[o]);
    }), s + i;
  }, t);
}
const $a = {
  scope: q.BLOCK,
  whitelist: ["right", "center", "justify"]
}, Zp = new ie("align", "align", $a), oc = new Ut("align", "ql-align", $a), lc = new Ie("align", "text-align", $a);
class cc extends Ie {
  value(t) {
    let e = super.value(t);
    return e.startsWith("rgb(") ? (e = e.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${e.split(",").map((n) => `00${parseInt(n, 10).toString(16)}`.slice(-2)).join("")}`) : e;
  }
}
const Xp = new Ut("color", "ql-color", {
  scope: q.INLINE
}), Ba = new cc("color", "color", {
  scope: q.INLINE
}), Qp = new Ut("background", "ql-bg", {
  scope: q.INLINE
}), Fa = new cc("background", "background-color", {
  scope: q.INLINE
});
class Ve extends Ue {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("spellcheck", "false"), e;
  }
  code(t, e) {
    return this.children.map((s) => s.length() <= 1 ? "" : s.domNode.innerText).join(`
`).slice(t, t + e);
  }
  html(t, e) {
    return `<pre>
${Ci(this.code(t, e))}
</pre>`;
  }
}
class gt extends at {
  static register() {
    T.register(Ve);
  }
}
I(gt, "TAB", "  ");
class Pa extends re {
}
Pa.blotName = "code";
Pa.tagName = "CODE";
gt.blotName = "code-block";
gt.className = "ql-code-block";
gt.tagName = "DIV";
Ve.blotName = "code-block-container";
Ve.className = "ql-code-block-container";
Ve.tagName = "DIV";
Ve.allowedChildren = [gt];
gt.allowedChildren = [zt, Vt, Ts];
gt.requiredContainer = Ve;
const ja = {
  scope: q.BLOCK,
  whitelist: ["rtl"]
}, uc = new ie("direction", "dir", ja), dc = new Ut("direction", "ql-direction", ja), hc = new Ie("direction", "direction", ja), fc = {
  scope: q.INLINE,
  whitelist: ["serif", "monospace"]
}, gc = new Ut("font", "ql-font", fc);
class Jp extends Ie {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const pc = new Jp("font", "font-family", fc), mc = new Ut("size", "ql-size", {
  scope: q.INLINE,
  whitelist: ["small", "large", "huge"]
}), bc = new Ie("size", "font-size", {
  scope: q.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), tm = be("quill:keyboard"), em = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class Li extends Gt {
  static match(t, e) {
    return ["altKey", "ctrlKey", "metaKey", "shiftKey"].some((s) => !!e[s] !== t[s] && e[s] !== null) ? !1 : e.key === t.key || e.key === t.which;
  }
  constructor(t, e) {
    super(t, e), this.bindings = {}, Object.keys(this.options.bindings).forEach((s) => {
      this.options.bindings[s] && this.addBinding(this.options.bindings[s]);
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
  addBinding(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const n = nm(t);
    if (n == null) {
      tm.warn("Attempted to add invalid keyboard binding", n);
      return;
    }
    typeof e == "function" && (e = {
      handler: e
    }), typeof s == "function" && (s = {
      handler: s
    }), (Array.isArray(n.key) ? n.key : [n.key]).forEach((a) => {
      const o = {
        ...n,
        key: a,
        ...e,
        ...s
      };
      this.bindings[o.key] = this.bindings[o.key] || [], this.bindings[o.key].push(o);
    });
  }
  listen() {
    this.quill.root.addEventListener("keydown", (t) => {
      if (t.defaultPrevented || t.isComposing || t.keyCode === 229 && (t.key === "Enter" || t.key === "Backspace")) return;
      const n = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((S) => Li.match(t, S));
      if (n.length === 0) return;
      const i = T.find(t.target, !0);
      if (i && i.scroll !== this.quill.scroll) return;
      const a = this.quill.getSelection();
      if (a == null || !this.quill.hasFocus()) return;
      const [o, l] = this.quill.getLine(a.index), [c, d] = this.quill.getLeaf(a.index), [f, p] = a.length === 0 ? [c, d] : this.quill.getLeaf(a.index + a.length), m = c instanceof ui ? c.value().slice(0, d) : "", b = f instanceof ui ? f.value().slice(p) : "", v = {
        collapsed: a.length === 0,
        // @ts-expect-error Fix me later
        empty: a.length === 0 && o.length() <= 1,
        format: this.quill.getFormat(a),
        line: o,
        offset: l,
        prefix: m,
        suffix: b,
        event: t
      };
      n.some((S) => {
        if (S.collapsed != null && S.collapsed !== v.collapsed || S.empty != null && S.empty !== v.empty || S.offset != null && S.offset !== v.offset)
          return !1;
        if (Array.isArray(S.format)) {
          if (S.format.every((A) => v.format[A] == null))
            return !1;
        } else if (typeof S.format == "object" && !Object.keys(S.format).every((A) => S.format[A] === !0 ? v.format[A] != null : S.format[A] === !1 ? v.format[A] == null : Ia(S.format[A], v.format[A])))
          return !1;
        return S.prefix != null && !S.prefix.test(v.prefix) || S.suffix != null && !S.suffix.test(v.suffix) ? !1 : S.handler.call(this, a, v, S) !== !0;
      }) && t.preventDefault();
    });
  }
  handleBackspace(t, e) {
    const s = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e.prefix) ? 2 : 1;
    if (t.index === 0 || this.quill.getLength() <= 1) return;
    let n = {};
    const [i] = this.quill.getLine(t.index);
    let a = new O().retain(t.index - s).delete(s);
    if (e.offset === 0) {
      const [o] = this.quill.getLine(t.index - 1);
      if (o && !(o.statics.blotName === "block" && o.length() <= 1)) {
        const c = i.formats(), d = this.quill.getFormat(t.index - 1, 1);
        if (n = kt.AttributeMap.diff(c, d) || {}, Object.keys(n).length > 0) {
          const f = new O().retain(t.index + i.length() - 2).retain(1, n);
          a = a.compose(f);
        }
      }
    }
    this.quill.updateContents(a, T.sources.USER), this.quill.focus();
  }
  handleDelete(t, e) {
    const s = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e.suffix) ? 2 : 1;
    if (t.index >= this.quill.getLength() - s) return;
    let n = {};
    const [i] = this.quill.getLine(t.index);
    let a = new O().retain(t.index).delete(s);
    if (e.offset >= i.length() - 1) {
      const [o] = this.quill.getLine(t.index + 1);
      if (o) {
        const l = i.formats(), c = this.quill.getFormat(t.index, 1);
        n = kt.AttributeMap.diff(l, c) || {}, Object.keys(n).length > 0 && (a = a.retain(o.length() - 1).retain(1, n));
      }
    }
    this.quill.updateContents(a, T.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    Ha({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, e) {
    const s = Object.keys(e.format).reduce((i, a) => (this.quill.scroll.query(a, q.BLOCK) && !Array.isArray(e.format[a]) && (i[a] = e.format[a]), i), {}), n = new O().retain(t.index).delete(t.length).insert(`
`, s);
    this.quill.updateContents(n, T.sources.USER), this.quill.setSelection(t.index + 1, T.sources.SILENT), this.quill.focus();
  }
}
const sm = {
  bindings: {
    bold: Or("bold"),
    italic: Or("italic"),
    underline: Or("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(r, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "+1", T.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(r, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "-1", T.sources.USER), !1);
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
      handler(r, t) {
        t.format.indent != null ? this.quill.format("indent", "-1", T.sources.USER) : t.format.list != null && this.quill.format("list", !1, T.sources.USER);
      }
    },
    "indent code-block": Xo(!0),
    "outdent code-block": Xo(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(r) {
        this.quill.deleteText(r.index - 1, 1, T.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(r, t) {
        if (t.format.table) return !0;
        this.quill.history.cutoff();
        const e = new O().retain(r.index).delete(r.length).insert("	");
        return this.quill.updateContents(e, T.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(r.index + 1, T.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, T.sources.USER);
      }
    },
    "list empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["list"],
      empty: !0,
      handler(r, t) {
        const e = {
          list: !1
        };
        t.format.indent && (e.indent = !1), this.quill.formatLine(r.index, r.length, e, T.sources.USER);
      }
    },
    "checklist enter": {
      key: "Enter",
      collapsed: !0,
      format: {
        list: "checked"
      },
      handler(r) {
        const [t, e] = this.quill.getLine(r.index), s = {
          // @ts-expect-error Fix me later
          ...t.formats(),
          list: "checked"
        }, n = new O().retain(r.index).insert(`
`, s).retain(t.length() - e - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(n, T.sources.USER), this.quill.setSelection(r.index + 1, T.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(r, t) {
        const [e, s] = this.quill.getLine(r.index), n = new O().retain(r.index).insert(`
`, t.format).retain(e.length() - s - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(n, T.sources.USER), this.quill.setSelection(r.index + 1, T.sources.SILENT), this.quill.scrollSelectionIntoView();
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
        const t = this.quill.getModule("table");
        if (t) {
          const [e, s, n, i] = t.getTable(r), a = im(e, s, n, i);
          if (a == null) return;
          let o = e.offset();
          if (a < 0) {
            const l = new O().retain(o).insert(`
`);
            this.quill.updateContents(l, T.sources.USER), this.quill.setSelection(r.index + 1, r.length, T.sources.SILENT);
          } else if (a > 0) {
            o += e.length();
            const l = new O().retain(o).insert(`
`);
            this.quill.updateContents(l, T.sources.USER), this.quill.setSelection(o, T.sources.USER);
          }
        }
      }
    },
    "table tab": {
      key: "Tab",
      shiftKey: null,
      format: ["table"],
      handler(r, t) {
        const {
          event: e,
          line: s
        } = t, n = s.offset(this.quill.scroll);
        e.shiftKey ? this.quill.setSelection(n - 1, T.sources.USER) : this.quill.setSelection(n + s.length(), T.sources.USER);
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
      handler(r, t) {
        if (this.quill.scroll.query("list") == null) return !0;
        const {
          length: e
        } = t.prefix, [s, n] = this.quill.getLine(r.index);
        if (n > e) return !0;
        let i;
        switch (t.prefix.trim()) {
          case "[]":
          case "[ ]":
            i = "unchecked";
            break;
          case "[x]":
            i = "checked";
            break;
          case "-":
          case "*":
            i = "bullet";
            break;
          default:
            i = "ordered";
        }
        this.quill.insertText(r.index, " ", T.sources.USER), this.quill.history.cutoff();
        const a = new O().retain(r.index - n).delete(e + 1).retain(s.length() - 2 - n).retain(1, {
          list: i
        });
        return this.quill.updateContents(a, T.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(r.index - e, T.sources.SILENT), !1;
      }
    },
    "code exit": {
      key: "Enter",
      collapsed: !0,
      format: ["code-block"],
      prefix: /^$/,
      suffix: /^\s*$/,
      handler(r) {
        const [t, e] = this.quill.getLine(r.index);
        let s = 2, n = t;
        for (; n != null && n.length() <= 1 && n.formats()["code-block"]; )
          if (n = n.prev, s -= 1, s <= 0) {
            const i = new O().retain(r.index + t.length() - e - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(i, T.sources.USER), this.quill.setSelection(r.index - 1, T.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": Qn("ArrowLeft", !1),
    "embed left shift": Qn("ArrowLeft", !0),
    "embed right": Qn("ArrowRight", !1),
    "embed right shift": Qn("ArrowRight", !0),
    "table down": Qo(!1),
    "table up": Qo(!0)
  }
};
Li.DEFAULTS = sm;
function Xo(r) {
  return {
    key: "Tab",
    shiftKey: !r,
    format: {
      "code-block": !0
    },
    handler(t, e) {
      let {
        event: s
      } = e;
      const n = this.quill.scroll.query("code-block"), {
        TAB: i
      } = n;
      if (t.length === 0 && !s.shiftKey) {
        this.quill.insertText(t.index, i, T.sources.USER), this.quill.setSelection(t.index + i.length, T.sources.SILENT);
        return;
      }
      const a = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t);
      let {
        index: o,
        length: l
      } = t;
      a.forEach((c, d) => {
        r ? (c.insertAt(0, i), d === 0 ? o += i.length : l += i.length) : c.domNode.textContent.startsWith(i) && (c.deleteAt(0, i.length), d === 0 ? o -= i.length : l -= i.length);
      }), this.quill.update(T.sources.USER), this.quill.setSelection(o, l, T.sources.SILENT);
    }
  };
}
function Qn(r, t) {
  return {
    key: r,
    shiftKey: t,
    altKey: null,
    [r === "ArrowLeft" ? "prefix" : "suffix"]: /^$/,
    handler(s) {
      let {
        index: n
      } = s;
      r === "ArrowRight" && (n += s.length + 1);
      const [i] = this.quill.getLeaf(n);
      return i instanceof At ? (r === "ArrowLeft" ? t ? this.quill.setSelection(s.index - 1, s.length + 1, T.sources.USER) : this.quill.setSelection(s.index - 1, T.sources.USER) : t ? this.quill.setSelection(s.index, s.length + 1, T.sources.USER) : this.quill.setSelection(s.index + s.length + 1, T.sources.USER), !1) : !0;
    }
  };
}
function Or(r) {
  return {
    key: r[0],
    shortKey: !0,
    handler(t, e) {
      this.quill.format(r, !e.format[r], T.sources.USER);
    }
  };
}
function Qo(r) {
  return {
    key: r ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(t, e) {
      const s = r ? "prev" : "next", n = e.line, i = n.parent[s];
      if (i != null) {
        if (i.statics.blotName === "table-row") {
          let a = i.children.head, o = n;
          for (; o.prev != null; )
            o = o.prev, a = a.next;
          const l = a.offset(this.quill.scroll) + Math.min(e.offset, a.length() - 1);
          this.quill.setSelection(l, 0, T.sources.USER);
        }
      } else {
        const a = n.table()[s];
        a != null && (r ? this.quill.setSelection(a.offset(this.quill.scroll) + a.length() - 1, 0, T.sources.USER) : this.quill.setSelection(a.offset(this.quill.scroll), 0, T.sources.USER));
      }
      return !1;
    }
  };
}
function nm(r) {
  if (typeof r == "string" || typeof r == "number")
    r = {
      key: r
    };
  else if (typeof r == "object")
    r = hs(r);
  else
    return null;
  return r.shortKey && (r[em] = r.shortKey, delete r.shortKey), r;
}
function Ha(r) {
  let {
    quill: t,
    range: e
  } = r;
  const s = t.getLines(e);
  let n = {};
  if (s.length > 1) {
    const i = s[0].formats(), a = s[s.length - 1].formats();
    n = kt.AttributeMap.diff(a, i) || {};
  }
  t.deleteText(e, T.sources.USER), Object.keys(n).length > 0 && t.formatLine(e.index, 1, n, T.sources.USER), t.setSelection(e.index, T.sources.SILENT);
}
function im(r, t, e, s) {
  return t.prev == null && t.next == null ? e.prev == null && e.next == null ? s === 0 ? -1 : 1 : e.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const rm = /font-weight:\s*normal/, am = ["P", "OL", "UL"], Jo = (r) => r && am.includes(r.tagName), om = (r) => {
  Array.from(r.querySelectorAll("br")).filter((t) => Jo(t.previousElementSibling) && Jo(t.nextElementSibling)).forEach((t) => {
    var e;
    (e = t.parentNode) == null || e.removeChild(t);
  });
}, lm = (r) => {
  Array.from(r.querySelectorAll('b[style*="font-weight"]')).filter((t) => {
    var e;
    return (e = t.getAttribute("style")) == null ? void 0 : e.match(rm);
  }).forEach((t) => {
    var s;
    const e = r.createDocumentFragment();
    e.append(...t.childNodes), (s = t.parentNode) == null || s.replaceChild(e, t);
  });
};
function cm(r) {
  r.querySelector('[id^="docs-internal-guid-"]') && (lm(r), om(r));
}
const um = /\bmso-list:[^;]*ignore/i, dm = /\bmso-list:[^;]*\bl(\d+)/i, hm = /\bmso-list:[^;]*\blevel(\d+)/i, fm = (r, t) => {
  const e = r.getAttribute("style"), s = e == null ? void 0 : e.match(dm);
  if (!s)
    return null;
  const n = Number(s[1]), i = e == null ? void 0 : e.match(hm), a = i ? Number(i[1]) : 1, o = new RegExp(`@list l${n}:level${a}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), l = t.match(o), c = l && l[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: n,
    indent: a,
    type: c,
    element: r
  };
}, gm = (r) => {
  var a, o;
  const t = Array.from(r.querySelectorAll("[style*=mso-list]")), e = [], s = [];
  t.forEach((l) => {
    (l.getAttribute("style") || "").match(um) ? e.push(l) : s.push(l);
  }), e.forEach((l) => {
    var c;
    return (c = l.parentNode) == null ? void 0 : c.removeChild(l);
  });
  const n = r.documentElement.innerHTML, i = s.map((l) => fm(l, n)).filter((l) => l);
  for (; i.length; ) {
    const l = [];
    let c = i.shift();
    for (; c; )
      l.push(c), c = i.length && ((a = i[0]) == null ? void 0 : a.element) === c.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      i[0].id === c.id ? i.shift() : null;
    const d = document.createElement("ul");
    l.forEach((m) => {
      const b = document.createElement("li");
      b.setAttribute("data-list", m.type), m.indent > 1 && b.setAttribute("class", `ql-indent-${m.indent - 1}`), b.innerHTML = m.element.innerHTML, d.appendChild(b);
    });
    const f = (o = l[0]) == null ? void 0 : o.element, {
      parentNode: p
    } = f ?? {};
    f && (p == null || p.replaceChild(d, f)), l.slice(1).forEach((m) => {
      let {
        element: b
      } = m;
      p == null || p.removeChild(b);
    });
  }
};
function pm(r) {
  r.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && gm(r);
}
const mm = [pm, cm], bm = (r) => {
  r.documentElement && mm.forEach((t) => {
    t(r);
  });
}, ym = be("quill:clipboard"), vm = [[Node.TEXT_NODE, Nm], [Node.TEXT_NODE, el], ["br", Em], [Node.ELEMENT_NODE, el], [Node.ELEMENT_NODE, Am], [Node.ELEMENT_NODE, xm], [Node.ELEMENT_NODE, Im], ["li", Cm], ["ol, ul", Lm], ["pre", Dm], ["tr", km], ["b", qr("bold")], ["i", qr("italic")], ["strike", qr("strike")], ["style", Tm]], wm = [Zp, uc].reduce((r, t) => (r[t.keyName] = t, r), {}), tl = [lc, Fa, Ba, hc, pc, bc].reduce((r, t) => (r[t.keyName] = t, r), {});
class yc extends Gt {
  constructor(t, e) {
    super(t, e), this.quill.root.addEventListener("copy", (s) => this.onCaptureCopy(s, !1)), this.quill.root.addEventListener("cut", (s) => this.onCaptureCopy(s, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], vm.concat(this.options.matchers ?? []).forEach((s) => {
      let [n, i] = s;
      this.addMatcher(n, i);
    });
  }
  addMatcher(t, e) {
    this.matchers.push([t, e]);
  }
  convert(t) {
    let {
      html: e,
      text: s
    } = t, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (n[gt.blotName])
      return new O().insert(s || "", {
        [gt.blotName]: n[gt.blotName]
      });
    if (!e)
      return new O().insert(s || "", n);
    const i = this.convertHTML(e);
    return yn(i, `
`) && (i.ops[i.ops.length - 1].attributes == null || n.table) ? i.compose(new O().retain(i.length() - 1).delete(1)) : i;
  }
  normalizeHTML(t) {
    bm(t);
  }
  convertHTML(t) {
    const e = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(e);
    const s = e.body, n = /* @__PURE__ */ new WeakMap(), [i, a] = this.prepareMatching(s, n);
    return za(this.quill.scroll, s, i, a, n);
  }
  dangerouslyPasteHTML(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : T.sources.API;
    if (typeof t == "string") {
      const n = this.convert({
        html: t,
        text: ""
      });
      this.quill.setContents(n, e), this.quill.setSelection(0, T.sources.SILENT);
    } else {
      const n = this.convert({
        html: e,
        text: ""
      });
      this.quill.updateContents(new O().retain(t).concat(n), s), this.quill.setSelection(t + n.length(), T.sources.SILENT);
    }
  }
  onCaptureCopy(t) {
    var a, o;
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (t.defaultPrevented) return;
    t.preventDefault();
    const [s] = this.quill.selection.getRange();
    if (s == null) return;
    const {
      html: n,
      text: i
    } = this.onCopy(s, e);
    (a = t.clipboardData) == null || a.setData("text/plain", i), (o = t.clipboardData) == null || o.setData("text/html", n), e && Ha({
      range: s,
      quill: this.quill
    });
  }
  /*
   * https://www.iana.org/assignments/media-types/text/uri-list
   */
  normalizeURIList(t) {
    return t.split(/\r?\n/).filter((e) => e[0] !== "#").join(`
`);
  }
  onCapturePaste(t) {
    var a, o, l, c, d;
    if (t.defaultPrevented || !this.quill.isEnabled()) return;
    t.preventDefault();
    const e = this.quill.getSelection(!0);
    if (e == null) return;
    const s = (a = t.clipboardData) == null ? void 0 : a.getData("text/html");
    let n = (o = t.clipboardData) == null ? void 0 : o.getData("text/plain");
    if (!s && !n) {
      const f = (l = t.clipboardData) == null ? void 0 : l.getData("text/uri-list");
      f && (n = this.normalizeURIList(f));
    }
    const i = Array.from(((c = t.clipboardData) == null ? void 0 : c.files) || []);
    if (!s && i.length > 0) {
      this.quill.uploader.upload(e, i);
      return;
    }
    if (s && i.length > 0) {
      const f = new DOMParser().parseFromString(s, "text/html");
      if (f.body.childElementCount === 1 && ((d = f.body.firstElementChild) == null ? void 0 : d.tagName) === "IMG") {
        this.quill.uploader.upload(e, i);
        return;
      }
    }
    this.onPaste(e, {
      html: s,
      text: n
    });
  }
  onCopy(t) {
    const e = this.quill.getText(t);
    return {
      html: this.quill.getSemanticHTML(t),
      text: e
    };
  }
  onPaste(t, e) {
    let {
      text: s,
      html: n
    } = e;
    const i = this.quill.getFormat(t.index), a = this.convert({
      text: s,
      html: n
    }, i);
    ym.log("onPaste", a, {
      text: s,
      html: n
    });
    const o = new O().retain(t.index).delete(t.length).concat(a);
    this.quill.updateContents(o, T.sources.USER), this.quill.setSelection(o.length() - t.length, T.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(t, e) {
    const s = [], n = [];
    return this.matchers.forEach((i) => {
      const [a, o] = i;
      switch (a) {
        case Node.TEXT_NODE:
          n.push(o);
          break;
        case Node.ELEMENT_NODE:
          s.push(o);
          break;
        default:
          Array.from(t.querySelectorAll(a)).forEach((l) => {
            if (e.has(l)) {
              const c = e.get(l);
              c == null || c.push(o);
            } else
              e.set(l, [o]);
          });
          break;
      }
    }), [s, n];
  }
}
I(yc, "DEFAULTS", {
  matchers: []
});
function Ge(r, t, e, s) {
  return s.query(t) ? r.reduce((n, i) => {
    if (!i.insert) return n;
    if (i.attributes && i.attributes[t])
      return n.push(i);
    const a = e ? {
      [t]: e
    } : {};
    return n.insert(i.insert, {
      ...a,
      ...i.attributes
    });
  }, new O()) : r;
}
function yn(r, t) {
  let e = "";
  for (let s = r.ops.length - 1; s >= 0 && e.length < t.length; --s) {
    const n = r.ops[s];
    if (typeof n.insert != "string") break;
    e = n.insert + e;
  }
  return e.slice(-1 * t.length) === t;
}
function xe(r, t) {
  if (!(r instanceof Element)) return !1;
  const e = t.query(r);
  return e && e.prototype instanceof At ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(r.tagName.toLowerCase());
}
function Sm(r, t) {
  return r.previousElementSibling && r.nextElementSibling && !xe(r.previousElementSibling, t) && !xe(r.nextElementSibling, t);
}
const Jn = /* @__PURE__ */ new WeakMap();
function vc(r) {
  return r == null ? !1 : (Jn.has(r) || (r.tagName === "PRE" ? Jn.set(r, !0) : Jn.set(r, vc(r.parentNode))), Jn.get(r));
}
function za(r, t, e, s, n) {
  return t.nodeType === t.TEXT_NODE ? s.reduce((i, a) => a(t, i, r), new O()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((i, a) => {
    let o = za(r, a, e, s, n);
    return a.nodeType === t.ELEMENT_NODE && (o = e.reduce((l, c) => c(a, l, r), o), o = (n.get(a) || []).reduce((l, c) => c(a, l, r), o)), i.concat(o);
  }, new O()) : new O();
}
function qr(r) {
  return (t, e, s) => Ge(e, r, !0, s);
}
function xm(r, t, e) {
  const s = ie.keys(r), n = Ut.keys(r), i = Ie.keys(r), a = {};
  return s.concat(n).concat(i).forEach((o) => {
    let l = e.query(o, q.ATTRIBUTE);
    l != null && (a[l.attrName] = l.value(r), a[l.attrName]) || (l = wm[o], l != null && (l.attrName === o || l.keyName === o) && (a[l.attrName] = l.value(r) || void 0), l = tl[o], l != null && (l.attrName === o || l.keyName === o) && (l = tl[o], a[l.attrName] = l.value(r) || void 0));
  }), Object.entries(a).reduce((o, l) => {
    let [c, d] = l;
    return Ge(o, c, d, e);
  }, t);
}
function Am(r, t, e) {
  const s = e.query(r);
  if (s == null) return t;
  if (s.prototype instanceof At) {
    const n = {}, i = s.value(r);
    if (i != null)
      return n[s.blotName] = i, new O().insert(n, s.formats(r, e));
  } else if (s.prototype instanceof dn && !yn(t, `
`) && t.insert(`
`), "blotName" in s && "formats" in s && typeof s.formats == "function")
    return Ge(t, s.blotName, s.formats(r, e), e);
  return t;
}
function Em(r, t) {
  return yn(t, `
`) || t.insert(`
`), t;
}
function Dm(r, t, e) {
  const s = e.query("code-block"), n = s && "formats" in s && typeof s.formats == "function" ? s.formats(r, e) : !0;
  return Ge(t, "code-block", n, e);
}
function Tm() {
  return new O();
}
function Cm(r, t, e) {
  const s = e.query(r);
  if (s == null || // @ts-expect-error
  s.blotName !== "list" || !yn(t, `
`))
    return t;
  let n = -1, i = r.parentNode;
  for (; i != null; )
    ["OL", "UL"].includes(i.tagName) && (n += 1), i = i.parentNode;
  return n <= 0 ? t : t.reduce((a, o) => o.insert ? o.attributes && typeof o.attributes.indent == "number" ? a.push(o) : a.insert(o.insert, {
    indent: n,
    ...o.attributes || {}
  }) : a, new O());
}
function Lm(r, t, e) {
  const s = r;
  let n = s.tagName === "OL" ? "ordered" : "bullet";
  const i = s.getAttribute("data-checked");
  return i && (n = i === "true" ? "checked" : "unchecked"), Ge(t, "list", n, e);
}
function el(r, t, e) {
  if (!yn(t, `
`)) {
    if (xe(r, e) && (r.childNodes.length > 0 || r instanceof HTMLParagraphElement))
      return t.insert(`
`);
    if (t.length() > 0 && r.nextSibling) {
      let s = r.nextSibling;
      for (; s != null; ) {
        if (xe(s, e))
          return t.insert(`
`);
        const n = e.query(s);
        if (n && n.prototype instanceof It)
          return t.insert(`
`);
        s = s.firstChild;
      }
    }
  }
  return t;
}
function Im(r, t, e) {
  var i;
  const s = {}, n = r.style || {};
  return n.fontStyle === "italic" && (s.italic = !0), n.textDecoration === "underline" && (s.underline = !0), n.textDecoration === "line-through" && (s.strike = !0), ((i = n.fontWeight) != null && i.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(n.fontWeight, 10) >= 700) && (s.bold = !0), t = Object.entries(s).reduce((a, o) => {
    let [l, c] = o;
    return Ge(a, l, c, e);
  }, t), parseFloat(n.textIndent || 0) > 0 ? new O().insert("	").concat(t) : t;
}
function km(r, t, e) {
  var n, i;
  const s = ((n = r.parentElement) == null ? void 0 : n.tagName) === "TABLE" ? r.parentElement : (i = r.parentElement) == null ? void 0 : i.parentElement;
  if (s != null) {
    const o = Array.from(s.querySelectorAll("tr")).indexOf(r) + 1;
    return Ge(t, "table", o, e);
  }
  return t;
}
function Nm(r, t, e) {
  var n;
  let s = r.data;
  if (((n = r.parentElement) == null ? void 0 : n.tagName) === "O:P")
    return t.insert(s.trim());
  if (!vc(r)) {
    if (s.trim().length === 0 && s.includes(`
`) && !Sm(r, e))
      return t;
    s = s.replace(/[^\S\u00a0]/g, " "), s = s.replace(/ {2,}/g, " "), (r.previousSibling == null && r.parentElement != null && xe(r.parentElement, e) || r.previousSibling instanceof Element && xe(r.previousSibling, e)) && (s = s.replace(/^ /, "")), (r.nextSibling == null && r.parentElement != null && xe(r.parentElement, e) || r.nextSibling instanceof Element && xe(r.nextSibling, e)) && (s = s.replace(/ $/, "")), s = s.replaceAll(" ", " ");
  }
  return t.insert(s);
}
class wc extends Gt {
  constructor(e, s) {
    super(e, s);
    I(this, "lastRecorded", 0);
    I(this, "ignoreChange", !1);
    I(this, "stack", {
      undo: [],
      redo: []
    });
    I(this, "currentRange", null);
    this.quill.on(T.events.EDITOR_CHANGE, (n, i, a, o) => {
      n === T.events.SELECTION_CHANGE ? i && o !== T.sources.SILENT && (this.currentRange = i) : n === T.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || o === T.sources.USER ? this.record(i, a) : this.transform(i)), this.currentRange = ea(this.currentRange, i));
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
    }, this.redo.bind(this)), this.quill.root.addEventListener("beforeinput", (n) => {
      n.inputType === "historyUndo" ? (this.undo(), n.preventDefault()) : n.inputType === "historyRedo" && (this.redo(), n.preventDefault());
    });
  }
  change(e, s) {
    if (this.stack[e].length === 0) return;
    const n = this.stack[e].pop();
    if (!n) return;
    const i = this.quill.getContents(), a = n.delta.invert(i);
    this.stack[s].push({
      delta: a,
      range: ea(n.range, a)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(n.delta, T.sources.USER), this.ignoreChange = !1, this.restoreSelection(n);
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
  record(e, s) {
    if (e.ops.length === 0) return;
    this.stack.redo = [];
    let n = e.invert(s), i = this.currentRange;
    const a = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > a && this.stack.undo.length > 0
    ) {
      const o = this.stack.undo.pop();
      o && (n = n.compose(o.delta), i = o.range);
    } else
      this.lastRecorded = a;
    n.length() !== 0 && (this.stack.undo.push({
      delta: n,
      range: i
    }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
  }
  redo() {
    this.change("redo", "undo");
  }
  transform(e) {
    sl(this.stack.undo, e), sl(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, T.sources.USER);
    else {
      const s = qm(this.quill.scroll, e.delta);
      this.quill.setSelection(s, T.sources.USER);
    }
  }
}
I(wc, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: !1
});
function sl(r, t) {
  let e = t;
  for (let s = r.length - 1; s >= 0; s -= 1) {
    const n = r[s];
    r[s] = {
      delta: e.transform(n.delta, !0),
      range: n.range && ea(n.range, e)
    }, e = n.delta.transform(e), r[s].delta.length() === 0 && r.splice(s, 1);
  }
}
function Om(r, t) {
  const e = t.ops[t.ops.length - 1];
  return e == null ? !1 : e.insert != null ? typeof e.insert == "string" && e.insert.endsWith(`
`) : e.attributes != null ? Object.keys(e.attributes).some((s) => r.query(s, q.BLOCK) != null) : !1;
}
function qm(r, t) {
  const e = t.reduce((n, i) => n + (i.delete || 0), 0);
  let s = t.length() - e;
  return Om(r, t) && (s -= 1), s;
}
function ea(r, t) {
  if (!r) return r;
  const e = t.transformPosition(r.index), s = t.transformPosition(r.index + r.length);
  return {
    index: e,
    length: s - e
  };
}
class Sc extends Gt {
  constructor(t, e) {
    super(t, e), t.root.addEventListener("drop", (s) => {
      var a;
      s.preventDefault();
      let n = null;
      if (document.caretRangeFromPoint)
        n = document.caretRangeFromPoint(s.clientX, s.clientY);
      else if (document.caretPositionFromPoint) {
        const o = document.caretPositionFromPoint(s.clientX, s.clientY);
        n = document.createRange(), n.setStart(o.offsetNode, o.offset), n.setEnd(o.offsetNode, o.offset);
      }
      const i = n && t.selection.normalizeNative(n);
      if (i) {
        const o = t.selection.normalizedToRange(i);
        (a = s.dataTransfer) != null && a.files && this.upload(o, s.dataTransfer.files);
      }
    });
  }
  upload(t, e) {
    const s = [];
    Array.from(e).forEach((n) => {
      var i;
      n && ((i = this.options.mimetypes) != null && i.includes(n.type)) && s.push(n);
    }), s.length > 0 && this.options.handler.call(this, t, s);
  }
}
Sc.DEFAULTS = {
  mimetypes: ["image/png", "image/jpeg"],
  handler(r, t) {
    if (!this.quill.scroll.query("image"))
      return;
    const e = t.map((s) => new Promise((n) => {
      const i = new FileReader();
      i.onload = () => {
        n(i.result);
      }, i.readAsDataURL(s);
    }));
    Promise.all(e).then((s) => {
      const n = s.reduce((i, a) => i.insert({
        image: a
      }), new O().retain(r.index).delete(r.length));
      this.quill.updateContents(n, k.sources.USER), this.quill.setSelection(r.index + s.length, k.sources.SILENT);
    });
  }
};
const Mm = ["insertText", "insertReplacementText"];
class Rm extends Gt {
  constructor(t, e) {
    super(t, e), t.root.addEventListener("beforeinput", (s) => {
      this.handleBeforeInput(s);
    }), /Android/i.test(navigator.userAgent) || t.on(T.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(t) {
    Ha({
      range: t,
      quill: this.quill
    });
  }
  replaceText(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (t.length === 0) return !1;
    if (e) {
      const s = this.quill.getFormat(t.index, 1);
      this.deleteRange(t), this.quill.updateContents(new O().retain(t.index).insert(e, s), T.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + e.length, 0, T.sources.SILENT), !0;
  }
  handleBeforeInput(t) {
    if (this.quill.composition.isComposing || t.defaultPrevented || !Mm.includes(t.inputType))
      return;
    const e = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!e || e.collapsed === !0)
      return;
    const s = _m(t);
    if (s == null)
      return;
    const n = this.quill.selection.normalizeNative(e), i = n ? this.quill.selection.normalizedToRange(n) : null;
    i && this.replaceText(i, s) && t.preventDefault();
  }
  handleCompositionStart() {
    const t = this.quill.getSelection();
    t && this.replaceText(t);
  }
}
function _m(r) {
  var t;
  return typeof r.data == "string" ? r.data : (t = r.dataTransfer) != null && t.types.includes("text/plain") ? r.dataTransfer.getData("text/plain") : null;
}
const $m = /Mac/i.test(navigator.platform), Bm = 100, Fm = (r) => !!(r.key === "ArrowLeft" || r.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
r.key === "ArrowUp" || r.key === "ArrowDown" || r.key === "Home" || $m && r.key === "a" && r.ctrlKey === !0);
class Pm extends Gt {
  constructor(e, s) {
    super(e, s);
    I(this, "isListening", !1);
    I(this, "selectionChangeDeadline", 0);
    this.handleArrowKeys(), this.handleNavigationShortcuts();
  }
  handleArrowKeys() {
    this.quill.keyboard.addBinding({
      key: ["ArrowLeft", "ArrowRight"],
      offset: 0,
      shiftKey: null,
      handler(e, s) {
        let {
          line: n,
          event: i
        } = s;
        if (!(n instanceof Ft) || !n.uiNode)
          return !0;
        const a = getComputedStyle(n.domNode).direction === "rtl";
        return a && i.key !== "ArrowRight" || !a && i.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (i.shiftKey ? 1 : 0), T.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (e) => {
      !e.defaultPrevented && Fm(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + Bm, this.isListening) return;
    this.isListening = !0;
    const e = () => {
      this.isListening = !1, Date.now() <= this.selectionChangeDeadline && this.handleSelectionChange();
    };
    document.addEventListener("selectionchange", e, {
      once: !0
    });
  }
  handleSelectionChange() {
    const e = document.getSelection();
    if (!e) return;
    const s = e.getRangeAt(0);
    if (s.collapsed !== !0 || s.startOffset !== 0) return;
    const n = this.quill.scroll.find(s.startContainer);
    if (!(n instanceof Ft) || !n.uiNode) return;
    const i = document.createRange();
    i.setStartAfter(n.uiNode), i.setEndAfter(n.uiNode), e.removeAllRanges(), e.addRange(i);
  }
}
T.register({
  "blots/block": at,
  "blots/block/embed": It,
  "blots/break": Vt,
  "blots/container": Ue,
  "blots/cursor": Ts,
  "blots/embed": _a,
  "blots/inline": re,
  "blots/scroll": cs,
  "blots/text": zt,
  "modules/clipboard": yc,
  "modules/history": wc,
  "modules/keyboard": Li,
  "modules/uploader": Sc,
  "modules/input": Rm,
  "modules/uiNode": Pm
});
class jm extends Ut {
  add(t, e) {
    let s = 0;
    if (e === "+1" || e === "-1") {
      const n = this.value(t) || 0;
      s = e === "+1" ? n + 1 : n - 1;
    } else typeof e == "number" && (s = e);
    return s === 0 ? (this.remove(t), !0) : super.add(t, s.toString());
  }
  canAdd(t, e) {
    return super.canAdd(t, e) || super.canAdd(t, parseInt(e, 10));
  }
  value(t) {
    return parseInt(super.value(t), 10) || void 0;
  }
}
const Hm = new jm("indent", "ql-indent", {
  scope: q.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class sa extends at {
}
I(sa, "blotName", "blockquote"), I(sa, "tagName", "blockquote");
class na extends at {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
I(na, "blotName", "header"), I(na, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class vn extends Ue {
}
vn.blotName = "list-container";
vn.tagName = "OL";
class wn extends at {
  static create(t) {
    const e = super.create();
    return e.setAttribute("data-list", t), e;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    T.register(vn);
  }
  constructor(t, e) {
    super(t, e);
    const s = e.ownerDocument.createElement("span"), n = (i) => {
      if (!t.isEnabled()) return;
      const a = this.statics.formats(e, t);
      a === "checked" ? (this.format("list", "unchecked"), i.preventDefault()) : a === "unchecked" && (this.format("list", "checked"), i.preventDefault());
    };
    s.addEventListener("mousedown", n), s.addEventListener("touchstart", n), this.attachUI(s);
  }
  format(t, e) {
    t === this.statics.blotName && e ? this.domNode.setAttribute("data-list", e) : super.format(t, e);
  }
}
wn.blotName = "list";
wn.tagName = "LI";
vn.allowedChildren = [wn];
wn.requiredContainer = vn;
class gn extends re {
  static create() {
    return super.create();
  }
  static formats() {
    return !0;
  }
  optimize(t) {
    super.optimize(t), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
  }
}
I(gn, "blotName", "bold"), I(gn, "tagName", ["STRONG", "B"]);
class ia extends gn {
}
I(ia, "blotName", "italic"), I(ia, "tagName", ["EM", "I"]);
class Ae extends re {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("href", this.sanitize(t)), e.setAttribute("rel", "noopener noreferrer"), e.setAttribute("target", "_blank"), e;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return xc(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, e) {
    t !== this.statics.blotName || !e ? super.format(t, e) : this.domNode.setAttribute("href", this.constructor.sanitize(e));
  }
}
I(Ae, "blotName", "link"), I(Ae, "tagName", "A"), I(Ae, "SANITIZED_URL", "about:blank"), I(Ae, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function xc(r, t) {
  const e = document.createElement("a");
  e.href = r;
  const s = e.href.slice(0, e.href.indexOf(":"));
  return t.indexOf(s) > -1;
}
class ra extends re {
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
I(ra, "blotName", "script"), I(ra, "tagName", ["SUB", "SUP"]);
class aa extends gn {
}
I(aa, "blotName", "strike"), I(aa, "tagName", ["S", "STRIKE"]);
class oa extends re {
}
I(oa, "blotName", "underline"), I(oa, "tagName", "U");
class si extends _a {
  static create(t) {
    if (window.katex == null)
      throw new Error("Formula module requires KaTeX.");
    const e = super.create(t);
    return typeof t == "string" && (window.katex.render(t, e, {
      throwOnError: !1,
      errorColor: "#f00"
    }), e.setAttribute("data-value", t)), e;
  }
  static value(t) {
    return t.getAttribute("data-value");
  }
  html() {
    const {
      formula: t
    } = this.value();
    return `<span>${t}</span>`;
  }
}
I(si, "blotName", "formula"), I(si, "className", "ql-formula"), I(si, "tagName", "SPAN");
const nl = ["alt", "height", "width"];
var ti;
let zm = (ti = class extends At {
  static create(t) {
    const e = super.create(t);
    return typeof t == "string" && e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return nl.reduce((e, s) => (t.hasAttribute(s) && (e[s] = t.getAttribute(s)), e), {});
  }
  static match(t) {
    return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
  }
  static sanitize(t) {
    return xc(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    nl.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
}, I(ti, "blotName", "image"), I(ti, "tagName", "IMG"), ti);
const il = ["height", "width"];
class ni extends It {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("frameborder", "0"), e.setAttribute("allowfullscreen", "true"), e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return il.reduce((e, s) => (t.hasAttribute(s) && (e[s] = t.getAttribute(s)), e), {});
  }
  static sanitize(t) {
    return Ae.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    il.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
I(ni, "blotName", "video"), I(ni, "className", "ql-video"), I(ni, "tagName", "IFRAME");
const tn = new Ut("code-token", "hljs", {
  scope: q.INLINE
});
class ge extends re {
  static formats(t, e) {
    for (; t != null && t !== e.domNode; ) {
      if (t.classList && t.classList.contains(gt.className))
        return super.formats(t, e);
      t = t.parentNode;
    }
  }
  constructor(t, e, s) {
    super(t, e, s), tn.add(this.domNode, s);
  }
  format(t, e) {
    t !== ge.blotName ? super.format(t, e) : e ? tn.add(this.domNode, e) : (tn.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), tn.value(this.domNode) || this.unwrap();
  }
}
ge.blotName = "code-token";
ge.className = "ql-token";
class Lt extends gt {
  static create(t) {
    const e = super.create(t);
    return typeof t == "string" && e.setAttribute("data-language", t), e;
  }
  static formats(t) {
    return t.getAttribute("data-language") || "plain";
  }
  static register() {
  }
  // Syntax module will register
  format(t, e) {
    t === this.statics.blotName && e ? this.domNode.setAttribute("data-language", e) : super.format(t, e);
  }
  replaceWith(t, e) {
    return this.formatAt(0, this.length(), ge.blotName, !1), super.replaceWith(t, e);
  }
}
class sn extends Ve {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(t, e) {
    t === Lt.blotName && (this.forceNext = !0, this.children.forEach((s) => {
      s.format(t, e);
    }));
  }
  formatAt(t, e, s, n) {
    s === Lt.blotName && (this.forceNext = !0), super.formatAt(t, e, s, n);
  }
  highlight(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const n = `${Array.from(this.domNode.childNodes).filter((a) => a !== this.uiNode).map((a) => a.textContent).join(`
`)}
`, i = Lt.formats(this.children.head.domNode);
    if (e || this.forceNext || this.cachedText !== n) {
      if (n.trim().length > 0 || this.cachedText == null) {
        const a = this.children.reduce((l, c) => l.concat(ic(c, !1)), new O()), o = t(n, i);
        a.diff(o).reduce((l, c) => {
          let {
            retain: d,
            attributes: f
          } = c;
          return d ? (f && Object.keys(f).forEach((p) => {
            [Lt.blotName, ge.blotName].includes(p) && this.formatAt(l, d, p, f[p]);
          }), l + d) : l;
        }, 0);
      }
      this.cachedText = n, this.forceNext = !1;
    }
  }
  html(t, e) {
    const [s] = this.children.find(t);
    return `<pre data-language="${s ? Lt.formats(s.domNode) : "plain"}">
${Ci(this.code(t, e))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const e = Lt.formats(this.children.head.domNode);
      e !== this.uiNode.value && (this.uiNode.value = e);
    }
  }
}
sn.allowedChildren = [Lt];
Lt.requiredContainer = sn;
Lt.allowedChildren = [ge, Ts, zt, Vt];
const Um = (r, t, e) => {
  if (typeof r.versionString == "string") {
    const s = r.versionString.split(".")[0];
    if (parseInt(s, 10) >= 11)
      return r.highlight(e, {
        language: t
      }).value;
  }
  return r.highlight(t, e).value;
};
class Ac extends Gt {
  static register() {
    T.register(ge, !0), T.register(Lt, !0), T.register(sn, !0);
  }
  constructor(t, e) {
    if (super(t, e), this.options.hljs == null)
      throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
    this.languages = this.options.languages.reduce((s, n) => {
      let {
        key: i
      } = n;
      return s[i] = !0, s;
    }, {}), this.highlightBlot = this.highlightBlot.bind(this), this.initListener(), this.initTimer();
  }
  initListener() {
    this.quill.on(T.events.SCROLL_BLOT_MOUNT, (t) => {
      if (!(t instanceof sn)) return;
      const e = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((s) => {
        let {
          key: n,
          label: i
        } = s;
        const a = e.ownerDocument.createElement("option");
        a.textContent = i, a.setAttribute("value", n), e.appendChild(a);
      }), e.addEventListener("change", () => {
        t.format(Lt.blotName, e.value), this.quill.root.focus(), this.highlight(t, !0);
      }), t.uiNode == null && (t.attachUI(e), t.children.head && (e.value = Lt.formats(t.children.head.domNode)));
    });
  }
  initTimer() {
    let t = null;
    this.quill.on(T.events.SCROLL_OPTIMIZE, () => {
      t && clearTimeout(t), t = setTimeout(() => {
        this.highlight(), t = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(T.sources.USER);
    const s = this.quill.getSelection();
    (t == null ? this.quill.scroll.descendants(sn) : [t]).forEach((i) => {
      i.highlight(this.highlightBlot, e);
    }), this.quill.update(T.sources.SILENT), s != null && this.quill.setSelection(s, T.sources.SILENT);
  }
  highlightBlot(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (e = this.languages[e] ? e : "plain", e === "plain")
      return Ci(t).split(`
`).reduce((n, i, a) => (a !== 0 && n.insert(`
`, {
        [gt.blotName]: e
      }), n.insert(i)), new O());
    const s = this.quill.root.ownerDocument.createElement("div");
    return s.classList.add(gt.className), s.innerHTML = Um(this.options.hljs, e, t), za(this.quill.scroll, s, [(n, i) => {
      const a = tn.value(n);
      return a ? i.compose(new O().retain(i.length(), {
        [ge.blotName]: a
      })) : i;
    }], [(n, i) => n.data.split(`
`).reduce((a, o, l) => (l !== 0 && a.insert(`
`, {
      [gt.blotName]: e
    }), a.insert(o)), i)], /* @__PURE__ */ new WeakMap());
  }
}
Ac.DEFAULTS = {
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
const rn = class rn extends at {
  static create(t) {
    const e = super.create();
    return t ? e.setAttribute("data-row", t) : e.setAttribute("data-row", Ua()), e;
  }
  static formats(t) {
    if (t.hasAttribute("data-row"))
      return t.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(t, e) {
    t === rn.blotName && e ? this.domNode.setAttribute("data-row", e) : super.format(t, e);
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
I(rn, "blotName", "table"), I(rn, "tagName", "TD");
let Bt = rn;
class pe extends Ue {
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const t = this.children.head.formats(), e = this.children.tail.formats(), s = this.next.children.head.formats(), n = this.next.children.tail.formats();
      return t.table === e.table && t.table === s.table && t.table === n.table;
    }
    return !1;
  }
  optimize(t) {
    super.optimize(t), this.children.forEach((e) => {
      if (e.next == null) return;
      const s = e.formats(), n = e.next.formats();
      if (s.table !== n.table) {
        const i = this.splitAfter(e);
        i && i.optimize(), this.prev && this.prev.optimize();
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
I(pe, "blotName", "table-row"), I(pe, "tagName", "TR");
class ee extends Ue {
}
I(ee, "blotName", "table-body"), I(ee, "tagName", "TBODY");
class Ls extends Ue {
  balanceCells() {
    const t = this.descendants(pe), e = t.reduce((s, n) => Math.max(n.children.length, s), 0);
    t.forEach((s) => {
      new Array(e - s.children.length).fill(0).forEach(() => {
        let n;
        s.children.head != null && (n = Bt.formats(s.children.head.domNode));
        const i = this.scroll.create(Bt.blotName, n);
        s.appendChild(i), i.optimize();
      });
    });
  }
  cells(t) {
    return this.rows().map((e) => e.children.at(t));
  }
  deleteColumn(t) {
    const [e] = this.descendant(ee);
    e == null || e.children.head == null || e.children.forEach((s) => {
      const n = s.children.at(t);
      n != null && n.remove();
    });
  }
  insertColumn(t) {
    const [e] = this.descendant(ee);
    e == null || e.children.head == null || e.children.forEach((s) => {
      const n = s.children.at(t), i = Bt.formats(s.children.head.domNode), a = this.scroll.create(Bt.blotName, i);
      s.insertBefore(a, n);
    });
  }
  insertRow(t) {
    const [e] = this.descendant(ee);
    if (e == null || e.children.head == null) return;
    const s = Ua(), n = this.scroll.create(pe.blotName);
    e.children.head.children.forEach(() => {
      const a = this.scroll.create(Bt.blotName, s);
      n.appendChild(a);
    });
    const i = e.children.at(t);
    e.insertBefore(n, i);
  }
  rows() {
    const t = this.children.head;
    return t == null ? [] : t.children.map((e) => e);
  }
}
I(Ls, "blotName", "table-container"), I(Ls, "tagName", "TABLE");
Ls.allowedChildren = [ee];
ee.requiredContainer = Ls;
ee.allowedChildren = [pe];
pe.requiredContainer = ee;
pe.allowedChildren = [Bt];
Bt.requiredContainer = pe;
function Ua() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class Vm extends Gt {
  static register() {
    T.register(Bt), T.register(pe), T.register(ee), T.register(Ls);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(Ls).forEach((t) => {
      t.balanceCells();
    });
  }
  deleteColumn() {
    const [t, , e] = this.getTable();
    e != null && (t.deleteColumn(e.cellOffset()), this.quill.update(T.sources.USER));
  }
  deleteRow() {
    const [, t] = this.getTable();
    t != null && (t.remove(), this.quill.update(T.sources.USER));
  }
  deleteTable() {
    const [t] = this.getTable();
    if (t == null) return;
    const e = t.offset();
    t.remove(), this.quill.update(T.sources.USER), this.quill.setSelection(e, T.sources.SILENT);
  }
  getTable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (t == null) return [null, null, null, -1];
    const [e, s] = this.quill.getLine(t.index);
    if (e == null || e.statics.blotName !== Bt.blotName)
      return [null, null, null, -1];
    const n = e.parent;
    return [n.parent.parent, n, e, s];
  }
  insertColumn(t) {
    const e = this.quill.getSelection();
    if (!e) return;
    const [s, n, i] = this.getTable(e);
    if (i == null) return;
    const a = i.cellOffset();
    s.insertColumn(a + t), this.quill.update(T.sources.USER);
    let o = n.rowOffset();
    t === 0 && (o += 1), this.quill.setSelection(e.index + o, e.length, T.sources.SILENT);
  }
  insertColumnLeft() {
    this.insertColumn(0);
  }
  insertColumnRight() {
    this.insertColumn(1);
  }
  insertRow(t) {
    const e = this.quill.getSelection();
    if (!e) return;
    const [s, n, i] = this.getTable(e);
    if (i == null) return;
    const a = n.rowOffset();
    s.insertRow(a + t), this.quill.update(T.sources.USER), t > 0 ? this.quill.setSelection(e, T.sources.SILENT) : this.quill.setSelection(e.index + n.children.length, e.length, T.sources.SILENT);
  }
  insertRowAbove() {
    this.insertRow(0);
  }
  insertRowBelow() {
    this.insertRow(1);
  }
  insertTable(t, e) {
    const s = this.quill.getSelection();
    if (s == null) return;
    const n = new Array(t).fill(0).reduce((i) => {
      const a = new Array(e).fill(`
`).join("");
      return i.insert(a, {
        table: Ua()
      });
    }, new O().retain(s.index));
    this.quill.updateContents(n, T.sources.USER), this.quill.setSelection(s.index, T.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(T.events.SCROLL_OPTIMIZE, (t) => {
      t.some((e) => ["TD", "TR", "TBODY", "TABLE"].includes(e.target.tagName) ? (this.quill.once(T.events.TEXT_CHANGE, (s, n, i) => {
        i === T.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const rl = be("quill:toolbar");
class Va extends Gt {
  constructor(t, e) {
    var s, n;
    if (super(t, e), Array.isArray(this.options.container)) {
      const i = document.createElement("div");
      i.setAttribute("role", "toolbar"), Gm(i, this.options.container), (n = (s = t.container) == null ? void 0 : s.parentNode) == null || n.insertBefore(i, t.container), this.container = i;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      rl.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((i) => {
      var o;
      const a = (o = this.options.handlers) == null ? void 0 : o[i];
      a && this.addHandler(i, a);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((i) => {
      this.attach(i);
    }), this.quill.on(T.events.EDITOR_CHANGE, () => {
      const [i] = this.quill.selection.getRange();
      this.update(i);
    });
  }
  addHandler(t, e) {
    this.handlers[t] = e;
  }
  attach(t) {
    let e = Array.from(t.classList).find((n) => n.indexOf("ql-") === 0);
    if (!e) return;
    if (e = e.slice(3), t.tagName === "BUTTON" && t.setAttribute("type", "button"), this.handlers[e] == null && this.quill.scroll.query(e) == null) {
      rl.warn("ignoring attaching to nonexistent format", e, t);
      return;
    }
    const s = t.tagName === "SELECT" ? "change" : "click";
    t.addEventListener(s, (n) => {
      let i;
      if (t.tagName === "SELECT") {
        if (t.selectedIndex < 0) return;
        const o = t.options[t.selectedIndex];
        o.hasAttribute("selected") ? i = !1 : i = o.value || !1;
      } else
        t.classList.contains("ql-active") ? i = !1 : i = t.value || !t.hasAttribute("value"), n.preventDefault();
      this.quill.focus();
      const [a] = this.quill.selection.getRange();
      if (this.handlers[e] != null)
        this.handlers[e].call(this, i);
      else if (
        // @ts-expect-error
        this.quill.scroll.query(e).prototype instanceof At
      ) {
        if (i = prompt(`Enter ${e}`), !i) return;
        this.quill.updateContents(new O().retain(a.index).delete(a.length).insert({
          [e]: i
        }), T.sources.USER);
      } else
        this.quill.format(e, i, T.sources.USER);
      this.update(a);
    }), this.controls.push([e, t]);
  }
  update(t) {
    const e = t == null ? {} : this.quill.getFormat(t);
    this.controls.forEach((s) => {
      const [n, i] = s;
      if (i.tagName === "SELECT") {
        let a = null;
        if (t == null)
          a = null;
        else if (e[n] == null)
          a = i.querySelector("option[selected]");
        else if (!Array.isArray(e[n])) {
          let o = e[n];
          typeof o == "string" && (o = o.replace(/"/g, '\\"')), a = i.querySelector(`option[value="${o}"]`);
        }
        a == null ? (i.value = "", i.selectedIndex = -1) : a.selected = !0;
      } else if (t == null)
        i.classList.remove("ql-active"), i.setAttribute("aria-pressed", "false");
      else if (i.hasAttribute("value")) {
        const a = e[n], o = a === i.getAttribute("value") || a != null && a.toString() === i.getAttribute("value") || a == null && !i.getAttribute("value");
        i.classList.toggle("ql-active", o), i.setAttribute("aria-pressed", o.toString());
      } else {
        const a = e[n] != null;
        i.classList.toggle("ql-active", a), i.setAttribute("aria-pressed", a.toString());
      }
    });
  }
}
Va.DEFAULTS = {};
function al(r, t, e) {
  const s = document.createElement("button");
  s.setAttribute("type", "button"), s.classList.add(`ql-${t}`), s.setAttribute("aria-pressed", "false"), e != null ? (s.value = e, s.setAttribute("aria-label", `${t}: ${e}`)) : s.setAttribute("aria-label", t), r.appendChild(s);
}
function Gm(r, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((e) => {
    const s = document.createElement("span");
    s.classList.add("ql-formats"), e.forEach((n) => {
      if (typeof n == "string")
        al(s, n);
      else {
        const i = Object.keys(n)[0], a = n[i];
        Array.isArray(a) ? Km(s, i, a) : al(s, i, a);
      }
    }), r.appendChild(s);
  });
}
function Km(r, t, e) {
  const s = document.createElement("select");
  s.classList.add(`ql-${t}`), e.forEach((n) => {
    const i = document.createElement("option");
    n !== !1 ? i.setAttribute("value", String(n)) : i.setAttribute("selected", "selected"), s.appendChild(i);
  }), r.appendChild(s);
}
Va.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const r = this.quill.getSelection();
      if (r != null)
        if (r.length === 0) {
          const t = this.quill.getFormat();
          Object.keys(t).forEach((e) => {
            this.quill.scroll.query(e, q.INLINE) != null && this.quill.format(e, !1, T.sources.USER);
          });
        } else
          this.quill.removeFormat(r.index, r.length, T.sources.USER);
    },
    direction(r) {
      const {
        align: t
      } = this.quill.getFormat();
      r === "rtl" && t == null ? this.quill.format("align", "right", T.sources.USER) : !r && t === "right" && this.quill.format("align", !1, T.sources.USER), this.quill.format("direction", r, T.sources.USER);
    },
    indent(r) {
      const t = this.quill.getSelection(), e = this.quill.getFormat(t), s = parseInt(e.indent || 0, 10);
      if (r === "+1" || r === "-1") {
        let n = r === "+1" ? 1 : -1;
        e.direction === "rtl" && (n *= -1), this.quill.format("indent", s + n, T.sources.USER);
      }
    },
    link(r) {
      r === !0 && (r = prompt("Enter link URL:")), this.quill.format("link", r, T.sources.USER);
    },
    list(r) {
      const t = this.quill.getSelection(), e = this.quill.getFormat(t);
      r === "check" ? e.list === "checked" || e.list === "unchecked" ? this.quill.format("list", !1, T.sources.USER) : this.quill.format("list", "unchecked", T.sources.USER) : this.quill.format("list", r, T.sources.USER);
    }
  }
};
const Ym = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', Wm = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', Zm = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', Xm = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', Qm = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', Jm = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', tb = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', eb = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', ol = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', sb = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', nb = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', ib = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', rb = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', ab = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', ob = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', lb = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', cb = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', ub = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', db = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', hb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', fb = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', gb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', pb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', mb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', bb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', yb = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', vb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', wb = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', Sb = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', xb = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', Ab = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', Eb = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', Db = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', pn = {
  align: {
    "": Ym,
    center: Wm,
    right: Zm,
    justify: Xm
  },
  background: Qm,
  blockquote: Jm,
  bold: tb,
  clean: eb,
  code: ol,
  "code-block": ol,
  color: sb,
  direction: {
    "": nb,
    rtl: ib
  },
  formula: rb,
  header: {
    1: ab,
    2: ob,
    3: lb,
    4: cb,
    5: ub,
    6: db
  },
  italic: hb,
  image: fb,
  indent: {
    "+1": gb,
    "-1": pb
  },
  link: mb,
  list: {
    bullet: bb,
    check: yb,
    ordered: vb
  },
  script: {
    sub: wb,
    super: Sb
  },
  strike: xb,
  table: Ab,
  underline: Eb,
  video: Db
}, Tb = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let ll = 0;
function cl(r, t) {
  r.setAttribute(t, `${r.getAttribute(t) !== "true"}`);
}
class Ii {
  constructor(t) {
    this.select = t, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", () => {
      this.togglePicker();
    }), this.label.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Enter":
          this.togglePicker();
          break;
        case "Escape":
          this.escape(), e.preventDefault();
          break;
      }
    }), this.select.addEventListener("change", this.update.bind(this));
  }
  togglePicker() {
    this.container.classList.toggle("ql-expanded"), cl(this.label, "aria-expanded"), cl(this.options, "aria-hidden");
  }
  buildItem(t) {
    const e = document.createElement("span");
    e.tabIndex = "0", e.setAttribute("role", "button"), e.classList.add("ql-picker-item");
    const s = t.getAttribute("value");
    return s && e.setAttribute("data-value", s), t.textContent && e.setAttribute("data-label", t.textContent), e.addEventListener("click", () => {
      this.selectItem(e, !0);
    }), e.addEventListener("keydown", (n) => {
      switch (n.key) {
        case "Enter":
          this.selectItem(e, !0), n.preventDefault();
          break;
        case "Escape":
          this.escape(), n.preventDefault();
          break;
      }
    }), e;
  }
  buildLabel() {
    const t = document.createElement("span");
    return t.classList.add("ql-picker-label"), t.innerHTML = Tb, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
  }
  buildOptions() {
    const t = document.createElement("span");
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${ll}`, ll += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((e) => {
      const s = this.buildItem(e);
      t.appendChild(s), e.selected === !0 && this.selectItem(s);
    }), this.container.appendChild(t);
  }
  buildPicker() {
    Array.from(this.select.attributes).forEach((t) => {
      this.container.setAttribute(t.name, t.value);
    }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
  }
  escape() {
    this.close(), setTimeout(() => this.label.focus(), 1);
  }
  close() {
    this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
  }
  selectItem(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    const s = this.container.querySelector(".ql-selected");
    t !== s && (s != null && s.classList.remove("ql-selected"), t != null && (t.classList.add("ql-selected"), this.select.selectedIndex = Array.from(t.parentNode.children).indexOf(t), t.hasAttribute("data-value") ? this.label.setAttribute("data-value", t.getAttribute("data-value")) : this.label.removeAttribute("data-value"), t.hasAttribute("data-label") ? this.label.setAttribute("data-label", t.getAttribute("data-label")) : this.label.removeAttribute("data-label"), e && (this.select.dispatchEvent(new Event("change")), this.close())));
  }
  update() {
    let t;
    if (this.select.selectedIndex > -1) {
      const s = (
        // @ts-expect-error Fix me later
        this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex]
      );
      t = this.select.options[this.select.selectedIndex], this.selectItem(s);
    } else
      this.selectItem(null);
    const e = t != null && t !== this.select.querySelector("option[selected]");
    this.label.classList.toggle("ql-active", e);
  }
}
class Ec extends Ii {
  constructor(t, e) {
    super(t), this.label.innerHTML = e, this.container.classList.add("ql-color-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((s) => {
      s.classList.add("ql-primary");
    });
  }
  buildItem(t) {
    const e = super.buildItem(t);
    return e.style.backgroundColor = t.getAttribute("value") || "", e;
  }
  selectItem(t, e) {
    super.selectItem(t, e);
    const s = this.label.querySelector(".ql-color-label"), n = t && t.getAttribute("data-value") || "";
    s && (s.tagName === "line" ? s.style.stroke = n : s.style.fill = n);
  }
}
class Dc extends Ii {
  constructor(t, e) {
    super(t), this.container.classList.add("ql-icon-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((s) => {
      s.innerHTML = e[s.getAttribute("data-value") || ""];
    }), this.defaultItem = this.container.querySelector(".ql-selected"), this.selectItem(this.defaultItem);
  }
  selectItem(t, e) {
    super.selectItem(t, e);
    const s = t || this.defaultItem;
    if (s != null) {
      if (this.label.innerHTML === s.innerHTML) return;
      this.label.innerHTML = s.innerHTML;
    }
  }
}
const Cb = (r) => {
  const {
    overflowY: t
  } = getComputedStyle(r, null);
  return t !== "visible" && t !== "clip";
};
class Tc {
  constructor(t, e) {
    this.quill = t, this.boundsContainer = e || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, Cb(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
      this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
    }), this.hide();
  }
  hide() {
    this.root.classList.add("ql-hidden");
  }
  position(t) {
    const e = t.left + t.width / 2 - this.root.offsetWidth / 2, s = t.bottom + this.quill.root.scrollTop;
    this.root.style.left = `${e}px`, this.root.style.top = `${s}px`, this.root.classList.remove("ql-flip");
    const n = this.boundsContainer.getBoundingClientRect(), i = this.root.getBoundingClientRect();
    let a = 0;
    if (i.right > n.right && (a = n.right - i.right, this.root.style.left = `${e + a}px`), i.left < n.left && (a = n.left - i.left, this.root.style.left = `${e + a}px`), i.bottom > n.bottom) {
      const o = i.bottom - i.top, l = t.bottom - t.top + o;
      this.root.style.top = `${s - l}px`, this.root.classList.add("ql-flip");
    }
    return a;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const Lb = [!1, "center", "right", "justify"], Ib = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], kb = [!1, "serif", "monospace"], Nb = ["1", "2", "3", !1], Ob = ["small", !1, "large", "huge"];
class Sn extends Cs {
  constructor(t, e) {
    super(t, e);
    const s = (n) => {
      if (!document.body.contains(t.root)) {
        document.body.removeEventListener("click", s);
        return;
      }
      this.tooltip != null && // @ts-expect-error
      !this.tooltip.root.contains(n.target) && // @ts-expect-error
      document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus() && this.tooltip.hide(), this.pickers != null && this.pickers.forEach((i) => {
        i.container.contains(n.target) || i.close();
      });
    };
    t.emitter.listenDOM("click", document.body, s);
  }
  addModule(t) {
    const e = super.addModule(t);
    return t === "toolbar" && this.extendToolbar(e), e;
  }
  buildButtons(t, e) {
    Array.from(t).forEach((s) => {
      (s.getAttribute("class") || "").split(/\s+/).forEach((i) => {
        if (i.startsWith("ql-") && (i = i.slice(3), e[i] != null))
          if (i === "direction")
            s.innerHTML = e[i][""] + e[i].rtl;
          else if (typeof e[i] == "string")
            s.innerHTML = e[i];
          else {
            const a = s.value || "";
            a != null && e[i][a] && (s.innerHTML = e[i][a]);
          }
      });
    });
  }
  buildPickers(t, e) {
    this.pickers = Array.from(t).map((n) => {
      if (n.classList.contains("ql-align") && (n.querySelector("option") == null && Js(n, Lb), typeof e.align == "object"))
        return new Dc(n, e.align);
      if (n.classList.contains("ql-background") || n.classList.contains("ql-color")) {
        const i = n.classList.contains("ql-background") ? "background" : "color";
        return n.querySelector("option") == null && Js(n, Ib, i === "background" ? "#ffffff" : "#000000"), new Ec(n, e[i]);
      }
      return n.querySelector("option") == null && (n.classList.contains("ql-font") ? Js(n, kb) : n.classList.contains("ql-header") ? Js(n, Nb) : n.classList.contains("ql-size") && Js(n, Ob)), new Ii(n);
    });
    const s = () => {
      this.pickers.forEach((n) => {
        n.update();
      });
    };
    this.quill.on(k.events.EDITOR_CHANGE, s);
  }
}
Sn.DEFAULTS = Ee({}, Cs.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula() {
          this.quill.theme.tooltip.edit("formula");
        },
        image() {
          let r = this.container.querySelector("input.ql-image[type=file]");
          r == null && (r = document.createElement("input"), r.setAttribute("type", "file"), r.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", ")), r.classList.add("ql-image"), r.addEventListener("change", () => {
            const t = this.quill.getSelection(!0);
            this.quill.uploader.upload(t, r.files), r.value = "";
          }), this.container.appendChild(r)), r.click();
        },
        video() {
          this.quill.theme.tooltip.edit("video");
        }
      }
    }
  }
});
class Cc extends Tc {
  constructor(t, e) {
    super(t, e), this.textbox = this.root.querySelector('input[type="text"]'), this.listen();
  }
  listen() {
    this.textbox.addEventListener("keydown", (t) => {
      t.key === "Enter" ? (this.save(), t.preventDefault()) : t.key === "Escape" && (this.cancel(), t.preventDefault());
    });
  }
  cancel() {
    this.hide(), this.restoreFocus();
  }
  edit() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), this.textbox == null) return;
    e != null ? this.textbox.value = e : t !== this.root.getAttribute("data-mode") && (this.textbox.value = "");
    const s = this.quill.getBounds(this.quill.selection.savedRange);
    s != null && this.position(s), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute(`data-${t}`) || ""), this.root.setAttribute("data-mode", t);
  }
  restoreFocus() {
    this.quill.focus({
      preventScroll: !0
    });
  }
  save() {
    let {
      value: t
    } = this.textbox;
    switch (this.root.getAttribute("data-mode")) {
      case "link": {
        const {
          scrollTop: e
        } = this.quill.root;
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", t, k.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", t, k.sources.USER)), this.quill.root.scrollTop = e;
        break;
      }
      case "video":
        t = qb(t);
      case "formula": {
        if (!t) break;
        const e = this.quill.getSelection(!0);
        if (e != null) {
          const s = e.index + e.length;
          this.quill.insertEmbed(
            s,
            // @ts-expect-error Fix me later
            this.root.getAttribute("data-mode"),
            t,
            k.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(s + 1, " ", k.sources.USER), this.quill.setSelection(s + 2, k.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function qb(r) {
  let t = r.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || r.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return t ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0` : (t = r.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/` : r;
}
function Js(r, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  t.forEach((s) => {
    const n = document.createElement("option");
    s === e ? n.setAttribute("selected", "selected") : n.setAttribute("value", String(s)), r.appendChild(n);
  });
}
const Mb = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Lc extends Cc {
  constructor(t, e) {
    super(t, e), this.quill.on(k.events.EDITOR_CHANGE, (s, n, i, a) => {
      if (s === k.events.SELECTION_CHANGE)
        if (n != null && n.length > 0 && a === k.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const o = this.quill.getLines(n.index, n.length);
          if (o.length === 1) {
            const l = this.quill.getBounds(n);
            l != null && this.position(l);
          } else {
            const l = o[o.length - 1], c = this.quill.getIndex(l), d = Math.min(l.length() - 1, n.index + n.length - c), f = this.quill.getBounds(new Pe(c, d));
            f != null && this.position(f);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(k.events.SCROLL_OPTIMIZE, () => {
      setTimeout(() => {
        if (this.root.classList.contains("ql-hidden")) return;
        const t = this.quill.getSelection();
        if (t != null) {
          const e = this.quill.getBounds(t);
          e != null && this.position(e);
        }
      }, 1);
    });
  }
  cancel() {
    this.show();
  }
  position(t) {
    const e = super.position(t), s = this.root.querySelector(".ql-tooltip-arrow");
    return s.style.marginLeft = "", e !== 0 && (s.style.marginLeft = `${-1 * e - s.offsetWidth / 2}px`), e;
  }
}
I(Lc, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class Ic extends Sn {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = Mb), super(t, e), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new Lc(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), pn), this.buildPickers(t.container.querySelectorAll("select"), pn));
  }
}
Ic.DEFAULTS = Ee({}, Sn.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(r) {
          r ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, T.sources.USER);
        }
      }
    }
  }
});
const Rb = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class kc extends Cc {
  constructor() {
    super(...arguments);
    I(this, "preview", this.root.querySelector("a.ql-preview"));
  }
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (e) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), e.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (e) => {
      if (this.linkRange != null) {
        const s = this.linkRange;
        this.restoreFocus(), this.quill.formatText(s, "link", !1, k.sources.USER), delete this.linkRange;
      }
      e.preventDefault(), this.hide();
    }), this.quill.on(k.events.SELECTION_CHANGE, (e, s, n) => {
      if (e != null) {
        if (e.length === 0 && n === k.sources.USER) {
          const [i, a] = this.quill.scroll.descendant(Ae, e.index);
          if (i != null) {
            this.linkRange = new Pe(e.index - a, i.length());
            const o = Ae.formats(i.domNode);
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
I(kc, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Nc extends Sn {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = Rb), super(t, e), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), pn), this.buildPickers(t.container.querySelectorAll("select"), pn), this.tooltip = new kc(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (e, s) => {
      t.handlers.link.call(t, !s.format.link);
    }));
  }
}
Nc.DEFAULTS = Ee({}, Sn.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(r) {
          if (r) {
            const t = this.quill.getSelection();
            if (t == null || t.length === 0) return;
            let e = this.quill.getText(t);
            /^\S+@\S+\.\S+$/.test(e) && e.indexOf("mailto:") !== 0 && (e = `mailto:${e}`);
            const {
              tooltip: s
            } = this.quill.theme;
            s.edit("link", e);
          } else
            this.quill.format("link", !1, T.sources.USER);
        }
      }
    }
  }
});
T.register({
  "attributors/attribute/direction": uc,
  "attributors/class/align": oc,
  "attributors/class/background": Qp,
  "attributors/class/color": Xp,
  "attributors/class/direction": dc,
  "attributors/class/font": gc,
  "attributors/class/size": mc,
  "attributors/style/align": lc,
  "attributors/style/background": Fa,
  "attributors/style/color": Ba,
  "attributors/style/direction": hc,
  "attributors/style/font": pc,
  "attributors/style/size": bc
}, !0);
T.register({
  "formats/align": oc,
  "formats/direction": dc,
  "formats/indent": Hm,
  "formats/background": Fa,
  "formats/color": Ba,
  "formats/font": gc,
  "formats/size": mc,
  "formats/blockquote": sa,
  "formats/code-block": gt,
  "formats/header": na,
  "formats/list": wn,
  "formats/bold": gn,
  "formats/code": Pa,
  "formats/italic": ia,
  "formats/link": Ae,
  "formats/script": ra,
  "formats/strike": aa,
  "formats/underline": oa,
  "formats/formula": si,
  "formats/image": zm,
  "formats/video": ni,
  "modules/syntax": Ac,
  "modules/table": Vm,
  "modules/toolbar": Va,
  "themes/bubble": Ic,
  "themes/snow": Nc,
  "ui/icons": pn,
  "ui/picker": Ii,
  "ui/icon-picker": Dc,
  "ui/color-picker": Ec,
  "ui/tooltip": Tc
}, !0);
class Ga extends K {
  /**
   * Initialize editor elements - required by BaseActionClass
   */
  initializeElements() {
    this.processQuillEditors();
  }
  /**
   * Process all existing Quill editors on the page
   */
  processQuillEditors() {
    h.findByDataAttribute("quill-editor", "true").forEach((e) => this.initializeQuillEditor(e));
  }
  /**
   * Bind event listeners - minimal for Quill integration
   */
  bindEventListeners() {
  }
  /**
   * Setup dynamic observer for new editors - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.hasDataAttribute(s, "quill-editor", "true") && this.initializeQuillEditor(s), h.findByDataAttribute("quill-editor", "true", s).forEach((i) => this.initializeQuillEditor(i));
        }
      });
    });
  }
  /**
   * Initialize a single Quill editor element
   */
  initializeQuillEditor(t) {
    if (!h.getDataAttribute(t, "editorId"))
      return;
    const s = h.querySelector('[data-quill-container="true"]', t), n = h.querySelector('[data-quill-input="true"]', t), i = h.querySelector('[data-quill-live-region="true"]', t);
    if (!s)
      return;
    const a = h.getDataAttribute(s, "quillConfig"), o = h.getDataAttribute(s, "quillValue");
    let l = {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          [{ header: [1, 2, !1] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"]
        ]
      }
    };
    if (a)
      try {
        const f = JSON.parse(a);
        l = { ...l, ...f };
      } catch {
      }
    let c;
    try {
      c = new T(s, l);
    } catch {
      return;
    }
    if (o)
      try {
        c.root.innerHTML = o;
      } catch {
      }
    const d = {
      quillInstance: c,
      containerElement: s,
      hiddenInput: n,
      config: l,
      liveRegion: i,
      lastAnnouncementTime: 0
    };
    this.setState(t, d), this.setupContentSync(d), this.setupAccessibilityFeatures(d);
  }
  /**
   * Set up content synchronization between Quill and hidden input
   */
  setupContentSync(t) {
    t.quillInstance.on("text-change", () => {
      this.syncQuillToInput(t);
    }), this.syncQuillToInput(t);
  }
  /**
   * Sync Quill content to hidden input
   */
  syncQuillToInput(t) {
    t.hiddenInput && (t.hiddenInput.value = t.quillInstance.root.innerHTML);
  }
  /**
   * Get editor content as HTML
   */
  getEditorContent(t) {
    const e = this.getState(t);
    return e ? e.quillInstance.root.innerHTML : "";
  }
  /**
   * Set editor content
   */
  setEditorContent(t, e) {
    const s = this.getState(t);
    s && (s.quillInstance.root.innerHTML = e, this.syncQuillToInput(s));
  }
  /**
   * Clear editor content
   */
  clearEditor(t) {
    const e = this.getState(t);
    e && (e.quillInstance.setText(""), this.syncQuillToInput(e));
  }
  /**
   * Focus specific editor
   */
  focusEditor(t) {
    const e = this.getState(t);
    e && e.quillInstance.focus();
  }
  /**
   * Get Quill instance for advanced usage
   */
  getQuillInstance(t) {
    const e = this.getState(t);
    return e ? e.quillInstance : null;
  }
  /**
   * Set up accessibility features for the editor
   */
  setupAccessibilityFeatures(t) {
    this.setupKeyboardNavigation(t), this.setupContentAnnouncements(t), this.setupToolbarAccessibility(t);
  }
  /**
   * Set up keyboard navigation enhancements
   */
  setupKeyboardNavigation(t) {
    t.quillInstance.keyboard.addBinding({
      key: "F1",
      handler: () => (this.announceKeyboardHelp(t), !1)
    }), t.containerElement.addEventListener("focus", () => {
      t.liveRegion && this.announceToLiveRegion(t, "Rich text editor focused. Press F1 for keyboard shortcuts.");
    });
  }
  /**
   * Set up content change announcements for screen readers
   */
  setupContentAnnouncements(t) {
    let e = null;
    const s = 2e3;
    t.quillInstance.on("text-change", (n, i, a) => {
      a === "user" && (e && clearTimeout(e), e = window.setTimeout(() => {
        const o = t.quillInstance.getText().trim(), l = o ? o.split(/\s+/).length : 0;
        l > 0 && this.announceToLiveRegion(t, `${l} words written`);
      }, s));
    }), t.quillInstance.on("selection-change", (n, i, a) => {
      if (n && a === "user") {
        const o = t.quillInstance.getFormat(n);
        this.announceFormattingChanges(t, o);
      }
    });
  }
  /**
   * Set up toolbar accessibility enhancements
   */
  setupToolbarAccessibility(t) {
    const e = t.containerElement.querySelector(".ql-toolbar");
    if (!e) return;
    e.setAttribute("role", "toolbar"), e.setAttribute("aria-label", "Rich text editor toolbar");
    const s = e.querySelectorAll("button");
    s.forEach((n, i) => {
      this.enhanceButtonAccessibility(n), n.setAttribute("tabindex", i === 0 ? "0" : "-1");
    }), e.addEventListener("keydown", (n) => {
      this.handleToolbarKeyboard(n, s);
    });
  }
  /**
   * Enhance individual button accessibility
   */
  enhanceButtonAccessibility(t) {
    const e = {
      "ql-bold": "Bold",
      "ql-italic": "Italic",
      "ql-underline": "Underline",
      "ql-strike": "Strikethrough",
      "ql-link": "Insert link",
      "ql-clean": "Remove formatting",
      'ql-list[value="ordered"]': "Numbered list",
      'ql-list[value="bullet"]': "Bullet list",
      'ql-header[value="1"]': "Heading 1",
      'ql-header[value="2"]': "Heading 2"
    };
    for (const [s, n] of Object.entries(e))
      if (t.classList.contains(s.split("[")[0]) || t.matches(`[${s.split("[")[1]}`)) {
        t.setAttribute("aria-label", n), t.setAttribute("title", n);
        break;
      }
  }
  /**
   * Handle toolbar keyboard navigation
   */
  handleToolbarKeyboard(t, e) {
    const s = Array.from(e).findIndex((i) => i === document.activeElement);
    if (s === -1) return;
    let n = s;
    switch (t.key) {
      case "ArrowLeft":
      case "ArrowUp":
        n = s > 0 ? s - 1 : e.length - 1, t.preventDefault();
        break;
      case "ArrowRight":
      case "ArrowDown":
        n = s < e.length - 1 ? s + 1 : 0, t.preventDefault();
        break;
      case "Home":
        n = 0, t.preventDefault();
        break;
      case "End":
        n = e.length - 1, t.preventDefault();
        break;
      default:
        return;
    }
    e[s].setAttribute("tabindex", "-1"), e[n].setAttribute("tabindex", "0"), e[n].focus();
  }
  /**
   * Announce text to the live region
   */
  announceToLiveRegion(t, e) {
    if (!t.liveRegion) return;
    const s = Date.now();
    s - t.lastAnnouncementTime < 1e3 || (t.liveRegion.textContent = e, t.lastAnnouncementTime = s, setTimeout(() => {
      t.liveRegion && (t.liveRegion.textContent = "");
    }, 3e3));
  }
  /**
   * Announce formatting changes
   */
  announceFormattingChanges(t, e) {
    const s = Object.keys(e).filter((n) => e[n]);
    if (s.length > 0) {
      const n = s.map((i) => {
        switch (i) {
          case "bold":
            return "bold";
          case "italic":
            return "italic";
          case "underline":
            return "underlined";
          case "strike":
            return "strikethrough";
          case "header":
            return `heading ${e[i]}`;
          case "list":
            return `${e[i]} list`;
          default:
            return i;
        }
      });
      this.announceToLiveRegion(t, `Formatting: ${n.join(", ")}`);
    }
  }
  /**
   * Announce keyboard shortcuts help
   */
  announceKeyboardHelp(t) {
    this.announceToLiveRegion(t, "Keyboard shortcuts: Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline, Ctrl+K for link. Use arrow keys to navigate toolbar buttons.");
  }
  /**
   * Clean up EditorActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.stateManager.forEach((t) => {
      t.quillInstance.off("text-change");
    });
  }
}
Ga.getInstance();
class Is extends K {
  /**
   * Initialize date picker elements - required by BaseActionClass
   */
  initializeElements() {
    h.findByDataAttribute("date-picker", "true").forEach((t) => {
      this.initializeDatePicker(t);
    });
  }
  /**
   * Initialize a single date picker element
   */
  initializeDatePicker(t) {
    if (this.hasState(t))
      return;
    const e = t.dataset.datePickerConfig, s = t.dataset.inline === "true", n = t.dataset.disabled === "true";
    let i;
    try {
      i = e ? JSON.parse(e) : {};
    } catch (o) {
      console.error("Failed to parse date picker config:", o), i = {};
    }
    const a = {
      isOpen: s,
      selectedDate: i.selectedDate || null,
      startDate: i.startDate || null,
      endDate: i.endDate || null,
      format: i.format || "Y-m-d",
      displayFormat: i.displayFormat || i.format || "Y-m-d",
      isRange: i.isRange || !1,
      closeOnSelect: i.closeOnSelect !== !1,
      isInline: s,
      isDisabled: n,
      position: "bottom"
    };
    this.setState(t, a), this.setupCalendarEventListeners(t), s && this.openDropdown(t);
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("[data-date-picker-input]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-date-picker="true"]');
      s && !this.isDisabled(s) && this.toggleDropdown(s);
    }), x.handleDelegatedClick("[data-date-picker-trigger]", (t, e) => {
      e.preventDefault(), e.stopPropagation();
      const s = h.findClosest(t, '[data-date-picker="true"]');
      s && !this.isDisabled(s) && this.toggleDropdown(s);
    }), x.handleDelegatedClick("[data-date-picker-clear]", (t, e) => {
      e.preventDefault(), e.stopPropagation();
      const s = h.findClosest(t, '[data-date-picker="true"]');
      s && !this.isDisabled(s) && this.clearDate(s);
    }), x.handleDelegatedClick("[data-quick-selector]", (t, e) => {
      e.preventDefault();
      const s = h.findClosest(t, '[data-date-picker="true"]'), n = t.dataset.quickSelector;
      s && n && !this.isDisabled(s) && this.applyQuickSelector(s, n);
    }), x.handleDelegatedKeydown("[data-date-picker-input]", (t, e) => {
      const s = h.findClosest(t, '[data-date-picker="true"]');
      if (!s) return;
      const n = this.getState(s);
      if (n)
        switch (e.key) {
          case "Escape":
            n.isOpen && (e.preventDefault(), this.closeDropdown(s));
            break;
          case "Enter":
            e.preventDefault(), n.isOpen || this.openDropdown(s);
            break;
          case "ArrowDown":
            n.isOpen || (e.preventDefault(), this.openDropdown(s));
            break;
          case "Tab":
            if (n.isOpen && !e.shiftKey) {
              const i = h.querySelector('[data-calendar="true"]', s);
              i && B.createTimer(() => {
                const a = i.querySelector("button:not(:disabled)");
                a && a.focus();
              }, 10);
            }
            break;
        }
    }), x.handleDelegatedInput("[data-date-picker-input]", (t) => {
      if (!t.readOnly) {
        const e = h.findClosest(t, '[data-date-picker="true"]');
        e && !this.isDisabled(e) && this.handleManualInput(e, t.value);
      }
    }), x.addEventListener(document, "click", (t) => {
      const e = t.target;
      h.findByDataAttribute("date-picker", "true").forEach((s) => {
        const n = this.getState(s);
        if (n && n.isOpen && !n.isInline) {
          const i = !s.contains(e), a = e.closest('[data-calendar="true"]') || e.hasAttribute("data-calendar-date") || e.hasAttribute("data-calendar-nav") || e.hasAttribute("data-calendar-action") || e.hasAttribute("data-quick-selector");
          i && !a && this.closeDropdown(s);
        }
      });
    }), x.handleResize(() => {
      h.findByDataAttribute("date-picker", "true").forEach((t) => {
        const e = this.getState(t);
        e && e.isOpen && !e.isInline && this.updateDropdownPosition(t);
      });
    });
  }
  /**
   * Setup calendar event listeners for a date picker
   */
  setupCalendarEventListeners(t) {
    const e = h.querySelector('[data-calendar="true"]', t);
    e && (e.addEventListener("calendar:dateSelected", (s) => {
      s.stopPropagation();
      const n = s.detail;
      this.handleDateSelected(t, n.selectedDate, n.formattedDate);
    }), e.addEventListener("calendar:rangeSelected", (s) => {
      s.stopPropagation();
      const n = s.detail;
      this.handleRangeSelected(t, n.startDate, n.endDate, n.formattedRange);
    }), e.addEventListener("calendar:cleared", (s) => {
      s.stopPropagation(), this.handleCalendarCleared(t);
    }));
  }
  /**
   * Toggle dropdown open/closed
   */
  toggleDropdown(t) {
    const e = this.getState(t);
    !e || e.isInline || (e.isOpen ? this.closeDropdown(t) : this.openDropdown(t));
  }
  /**
   * Open dropdown
   */
  openDropdown(t) {
    const e = this.getState(t);
    if (!e || e.isOpen || e.isDisabled) return;
    e.isOpen = !0, this.setState(t, e);
    const s = h.querySelector("[data-date-picker-dropdown]", t);
    s && (this.updateDropdownPosition(t), s.classList.add("animating-in"), s.classList.add("open"), B.createTimer(() => {
      s.classList.remove("animating-in");
      const n = h.querySelector('[data-calendar="true"]', t);
      if (n) {
        const i = n.querySelector('button:not(:disabled), [tabindex="0"]');
        i && i.focus();
      }
    }, 200), this.dispatchDatePickerEvent(t, "datepicker:opened"));
  }
  /**
   * Close dropdown
   */
  closeDropdown(t) {
    const e = this.getState(t);
    if (!e || !e.isOpen || e.isInline) return;
    e.floating && (e.floating.cleanup(), e.floating = void 0), e.isOpen = !1, this.setState(t, e);
    const s = h.querySelector("[data-date-picker-dropdown]", t);
    if (!s) return;
    s.classList.remove("open");
    const n = h.querySelector("[data-date-picker-input]", t);
    n && n.focus(), this.dispatchDatePickerEvent(t, "datepicker:closed");
  }
  /**
   * Update dropdown position using Floating UI
   */
  updateDropdownPosition(t) {
    const e = h.querySelector("[data-date-picker-dropdown]", t);
    !e || !this.getState(t) || this.setupFloating(t, e);
  }
  /**
   * Setup floating for date picker using Floating UI
   */
  setupFloating(t, e) {
    const s = this.getState(t);
    if (!s) return;
    s.floating && s.floating.cleanup();
    const i = h.querySelector("[data-date-picker-input]", t) || t, a = t.dataset.position || "bottom", o = t.dataset.align || "start", l = parseInt(t.dataset.offset || "8");
    let c = a;
    (a === "bottom" || a === "top") && (o === "start" ? c = `${a}-start` : o === "end" && (c = `${a}-end`));
    const d = wt.getInstance().createFloating(i, e, {
      placement: c,
      offset: l,
      flip: {
        fallbackStrategy: "bestFit",
        padding: 8
      },
      shift: {
        padding: 8,
        crossAxis: !0
      },
      hide: {
        strategy: "escaped"
      },
      autoUpdate: {
        ancestorScroll: !0,
        ancestorResize: !0,
        elementResize: !0,
        layoutShift: !0
      }
    });
    s.floating = d, this.setState(t, s);
  }
  /**
   * Handle date selection from calendar
   */
  handleDateSelected(t, e, s) {
    const n = this.getState(t);
    if (!n) return;
    n.selectedDate = e, this.setState(t, n);
    const i = h.querySelector("[data-date-picker-input]", t);
    i && s && (i.value = mt.formatDateForDisplay(e, n.displayFormat));
    const a = h.querySelector("[data-date-picker-value]", t);
    a && (a.value = e ? mt.formatDateForSubmission(e, n.format) : ""), n.closeOnSelect && !n.isInline && !n.isRange && B.createTimer(() => {
      this.closeDropdown(t);
    }, 150), this.dispatchDatePickerEvent(t, "datepicker:change", {
      value: e,
      formatted: s
    });
  }
  /**
   * Handle range selection from calendar
   */
  handleRangeSelected(t, e, s, n) {
    const i = this.getState(t);
    if (!i) return;
    i.startDate = e, i.endDate = s, this.setState(t, i);
    const a = h.querySelector("[data-date-picker-input]", t);
    a && (a.value = mt.formatRangeForDisplay(e, s, i.displayFormat));
    const o = h.querySelector("[data-date-picker-value]", t);
    if (o) {
      const l = mt.formatRangeForSubmission(e, s, i.format);
      o.value = l || "";
    }
    i.closeOnSelect && e && s && !i.isInline && B.createTimer(() => {
      this.closeDropdown(t);
    }, 150), this.dispatchDatePickerEvent(t, "datepicker:change", {
      startDate: e,
      endDate: s,
      formatted: n
    });
  }
  /**
   * Handle calendar cleared event
   */
  handleCalendarCleared(t) {
    this.clearDate(t);
  }
  /**
   * Clear selected date(s)
   */
  clearDate(t) {
    const e = this.getState(t);
    if (!e) return;
    e.selectedDate = null, e.startDate = null, e.endDate = null, this.setState(t, e);
    const s = h.querySelector("[data-date-picker-input]", t);
    s && (s.value = "");
    const n = h.querySelector("[data-date-picker-value]", t);
    n && (n.value = "");
    const i = h.querySelector('[data-calendar="true"]', t);
    if (i && window.CalendarActions)
      try {
        const a = window.CalendarActions.getInstance();
        if (e.isRange) {
          const o = a.getCalendarState(i);
          o && (o.startDate = null, o.endDate = null, o.rangeSelectionState = "none", a.setState(i, o), i.dispatchEvent(new CustomEvent("calendar:cleared")));
        } else
          a.setSelectedDate(i, null);
      } catch (a) {
        console.warn("Calendar actions not available or failed:", a);
      }
    e.isInline || this.closeDropdown(t), this.dispatchDatePickerEvent(t, "datepicker:cleared");
  }
  /**
   * Apply quick selector
   */
  applyQuickSelector(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const { start: n, end: i } = mt.getQuickSelectorDate(e);
    let a = n, o = n, l = i;
    const c = h.querySelector('[data-calendar="true"]', t);
    if (c && window.CalendarActions)
      try {
        const d = window.CalendarActions.getInstance();
        if (s.isRange && o && l) {
          const f = d.getCalendarState(c);
          f && (f.startDate = mt.formatDateString(o), f.endDate = mt.formatDateString(l), f.rangeSelectionState = "none", d.setState(c, f), c.dispatchEvent(new CustomEvent("calendar:rangeSelected", {
            detail: {
              startDate: f.startDate,
              endDate: f.endDate,
              formattedRange: mt.formatRangeForDisplay(f.startDate, f.endDate, s.displayFormat)
            }
          })));
        } else if (a) {
          const f = mt.formatDateString(a);
          d.setSelectedDate(c, f);
        }
      } catch (d) {
        console.warn("Calendar actions not available or failed:", d);
      }
  }
  /**
   * Handle manual input
   */
  handleManualInput(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const n = mt.parseInputDate(e, s.displayFormat);
    if (n) {
      const i = mt.formatDateString(n), a = h.querySelector('[data-calendar="true"]', t);
      if (a && window.CalendarActions)
        try {
          window.CalendarActions.getInstance().setSelectedDate(a, i);
        } catch (o) {
          console.warn("Calendar actions not available or failed:", o);
        }
    }
  }
  // updateClearButtonVisibility method removed - visibility handled by template conditional rendering
  /**
   * Check if date picker is disabled
   */
  isDisabled(t) {
    const e = this.getState(t);
    return e ? e.isDisabled : !1;
  }
  /**
   * Dispatch custom date picker event
   */
  dispatchDatePickerEvent(t, e, s = null) {
    x.dispatchCustomEvent(t, e, {
      datePicker: t,
      ...s
    }, {
      bubbles: !0,
      cancelable: !0
    });
  }
  /**
   * Setup dynamic observer for new date pickers - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.hasDataAttribute(s, "date-picker", "true") && this.initializeDatePicker(s), h.findByDataAttribute("date-picker", "true", s).forEach((n) => {
            this.initializeDatePicker(n);
          });
        }
      });
    });
  }
  /**
   * Clean up DatePickerActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.getAllStates().forEach((t, e) => {
      t.floating && t.floating.cleanup();
    });
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  Is.getInstance().init();
}) : Is.getInstance().init();
window.DatePickerActions = Is;
Is.getInstance();
class Ka extends K {
  constructor() {
    super(...arguments), this.cleanupFunctions = [];
  }
  bindEventListeners() {
    this.cleanupFunctions.push(
      x.handleDelegatedClick(
        '[data-add-to-cart="true"]',
        (t, e) => this.handleAddToCart(t, e)
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedClick(
        ".qty-decrease",
        (t, e) => this.handleQuantityChange(t, e, "decrease")
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedClick(
        ".qty-increase",
        (t, e) => this.handleQuantityChange(t, e, "increase")
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedInput(
        ".qty-input",
        (t, e) => this.handleQuantityInput(t, e)
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedKeydown(
        ".qty-input",
        (t, e) => this.handleQuantityKeydown(t, e)
      )
    );
  }
  initializeElements() {
    h.findByDataAttribute("add-to-cart", "true").forEach((e) => this.initializeButton(e));
  }
  initializeButton(t) {
    const e = this.extractStateFromButton(t);
    if (e) {
      const s = h.querySelector(".button-text", t);
      s && (e.originalText = s.textContent || ""), this.setState(t, e), this.updateButtonState(t), this.updateQuantityControls(t);
    }
  }
  extractStateFromButton(t) {
    const e = h.getDataAttribute(t, "productId");
    return e ? {
      productId: e,
      variantId: h.getDataAttribute(t, "variantId"),
      quantity: parseInt(h.getDataAttribute(t, "quantity") || "1"),
      maxQuantity: parseInt(h.getDataAttribute(t, "maxQuantity") || "99"),
      stockLevel: h.getDataAttribute(t, "stockLevel") ? parseInt(h.getDataAttribute(t, "stockLevel")) : void 0,
      price: h.getDataAttribute(t, "price"),
      ajaxUrl: h.getDataAttribute(t, "ajaxUrl") || "/cart/add",
      inCart: h.getDataAttribute(t, "inCart") === "true",
      isProcessing: !1
    } : (console.warn("AddToCart button missing required data-product-id attribute"), null);
  }
  async handleAddToCart(t, e) {
    if (e.preventDefault(), h.isDisabled(t))
      return;
    const s = this.getState(t);
    if (!s || s.isProcessing)
      return;
    const n = this.getQuantityInput(t);
    if (n && (s.quantity = parseInt(n.value) || 1), !this.validateQuantity(s.quantity, s)) {
      this.showError(t, "Invalid quantity");
      return;
    }
    s.isProcessing = !0, this.setState(t, s), this.setButtonState(t, "adding");
    try {
      const i = await this.sendCartRequest(s);
      if (i.success)
        s.inCart = i.inCart ?? !0, s.isProcessing = !1, i.stockLevel !== void 0 && (s.stockLevel = i.stockLevel, h.setDataAttribute(t, "stockLevel", i.stockLevel.toString())), this.setState(t, s), this.setButtonState(t, "added"), this.dispatchCartEvent(t, "cart:added", {
          productId: s.productId,
          variantId: s.variantId,
          quantity: s.quantity,
          cartCount: i.cartCount
        }), setTimeout(() => {
          var a;
          (a = this.getState(t)) != null && a.inCart && this.setButtonState(t, "default");
        }, 2e3);
      else
        throw new Error(i.error || i.message || "Failed to add to cart");
    } catch (i) {
      s.isProcessing = !1, this.setState(t, s), this.setButtonState(t, "default"), this.showError(t, i instanceof Error ? i.message : "An error occurred");
    }
    this.updateQuantityControls(t);
  }
  handleQuantityChange(t, e, s) {
    e.preventDefault();
    const n = h.getDataAttribute(t, "target");
    if (!n) return;
    const i = h.getElementById(n);
    if (!i) return;
    const a = h.findClosest(t, ".add-to-cart-wrapper"), o = a ? h.querySelector('[data-add-to-cart="true"]', a) : null;
    if (!o) return;
    const l = this.getState(o);
    if (!l) return;
    const c = parseInt(i.value) || 1;
    let d = c;
    s === "increase" ? d = Math.min(c + 1, l.maxQuantity) : d = Math.max(c - 1, 1), d !== c && (i.value = d.toString(), l.quantity = d, this.setState(o, l), this.dispatchCartEvent(o, "cart:quantity-changed", {
      productId: l.productId,
      quantity: d,
      previousQuantity: c
    })), this.updateQuantityControls(o);
  }
  handleQuantityInput(t, e) {
    const s = h.findClosest(t, ".add-to-cart-wrapper"), n = s ? h.querySelector('[data-add-to-cart="true"]', s) : null;
    if (!n) return;
    const i = this.getState(n);
    if (!i) return;
    let a = parseInt(t.value) || 1;
    a = Math.max(1, Math.min(a, i.maxQuantity)), t.value !== a.toString() && (t.value = a.toString()), i.quantity = a, this.setState(n, i), this.updateQuantityControls(n);
  }
  handleQuantityKeydown(t, e) {
    [8, 9, 27, 13, 35, 36, 37, 39, 38, 40].includes(e.keyCode) || // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode) || (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.preventDefault();
  }
  validateQuantity(t, e) {
    return !(t < 1 || t > e.maxQuantity || e.stockLevel !== void 0 && t > e.stockLevel);
  }
  async sendCartRequest(t) {
    var i;
    const e = new FormData();
    e.append("product_id", t.productId), e.append("quantity", t.quantity.toString()), t.variantId && e.append("variant_id", t.variantId);
    const s = (i = h.querySelector('meta[name="csrf-token"]')) == null ? void 0 : i.getAttribute("content");
    s && e.append("_token", s);
    const n = await fetch(t.ajaxUrl, {
      method: "POST",
      body: e,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json"
      }
    });
    if (!n.ok)
      throw new Error(`HTTP ${n.status}: ${n.statusText}`);
    return await n.json();
  }
  setButtonState(t, e) {
    h.removeClasses(t, ["adding", "added"]), e !== "default" && h.addClass(t, e);
    const s = h.querySelector(".button-text", t);
    if (s) {
      const n = this.getState(t);
      switch (e) {
        case "adding":
          const i = h.getDataAttribute(t, "labelToggle");
          i && (s.textContent = i);
          break;
        case "added":
          const a = h.getDataAttribute(t, "labelSuccess");
          a && (s.textContent = a);
          break;
        case "default":
          n != null && n.originalText && (s.textContent = n.originalText);
          break;
      }
    }
  }
  updateButtonState(t) {
    const e = this.getState(t);
    e && (e.stockLevel !== void 0 && e.stockLevel <= 0 ? (h.toggleAttribute(t, "disabled", "true"), h.addClasses(t, ["cursor-not-allowed", "opacity-50"])) : (h.toggleAttribute(t, "disabled"), h.removeClasses(t, ["cursor-not-allowed", "opacity-50"])));
  }
  updateQuantityControls(t) {
    const e = this.getState(t);
    if (!e) return;
    const s = h.findClosest(t, ".add-to-cart-wrapper");
    if (!s) return;
    const n = h.querySelector(".qty-decrease", s);
    n && h.toggleAttribute(n, "disabled", e.quantity <= 1 ? "true" : void 0);
    const i = h.querySelector(".qty-increase", s);
    if (i) {
      const o = e.quantity >= e.maxQuantity || e.stockLevel !== void 0 && e.quantity >= e.stockLevel;
      h.toggleAttribute(i, "disabled", o ? "true" : void 0);
    }
    const a = this.getQuantityInput(t);
    a && (a.max = e.maxQuantity.toString(), e.stockLevel !== void 0 && (a.max = Math.min(e.maxQuantity, e.stockLevel).toString()));
  }
  getQuantityInput(t) {
    const e = h.findClosest(t, ".add-to-cart-wrapper");
    return e ? h.querySelector(".qty-input", e) : null;
  }
  showError(t, e) {
    this.dispatchCartEvent(t, "cart:error", { message: e }), console.error("Add to Cart Error:", e);
  }
  dispatchCartEvent(t, e, s) {
    x.dispatchCustomEvent(t, e, s);
  }
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        e instanceof Element && h.findByDataAttribute("add-to-cart", "true", e).forEach((n) => this.initializeButton(n));
      });
    });
  }
  destroy() {
    this.cleanupFunctions.forEach((t) => t()), this.cleanupFunctions = [], super.destroy();
  }
}
if (typeof document < "u") {
  const r = () => {
    Ka.getInstance().init();
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", r) : r();
}
class Oc extends K {
  constructor() {
    super(), this.cleanupFunctions = [], this.currentModal = null;
  }
  bindEventListeners() {
    this.cleanupFunctions.push(
      x.handleDelegatedClick(
        "[data-lightbox-trigger]",
        (t, e) => this.handleThumbnailClick(t, e)
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedClick(
        "[data-lightbox-close]",
        (t, e) => this.handleCloseClick(t, e)
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedClick(
        "[data-lightbox-prev]",
        (t, e) => this.handlePrevClick(t, e)
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedClick(
        "[data-lightbox-next]",
        (t, e) => this.handleNextClick(t, e)
      )
    ), this.cleanupFunctions.push(
      x.addEventListener(document, "keydown", (t) => {
        this.handleKeydown(t);
      })
    ), this.cleanupFunctions.push(
      x.handleDelegatedClick(
        "[data-lightbox-modal]",
        (t, e) => this.handleModalBackgroundClick(t, e)
      )
    );
  }
  initializeElements() {
    h.findByDataAttribute("file-upload-zone").forEach((n) => {
      if (n.getAttribute("data-lightbox") === "true") {
        const a = n.parentElement;
        a && this.initializeLightboxForUpload(a);
      }
    }), h.findByDataAttribute("lightbox-image").forEach((n) => {
      this.initializeLightboxForImage(n);
    }), h.findByDataAttribute("gallery").forEach((n) => {
      n.getAttribute("data-lightbox") === "true" && this.initializeLightboxForGallery(n);
    });
  }
  initializeLightboxForUpload(t) {
    const e = t.getAttribute("data-file-upload-id") || t.id || "upload-" + Date.now();
    this.setState(t, {
      currentImageIndex: 0,
      images: [],
      isOpen: !1,
      elementId: e
    });
  }
  initializeLightboxForImage(t) {
    const e = t.id || "image-" + Date.now(), s = t.closest("[data-lightbox-container]") || t, n = t.querySelector("img") || t;
    if (n && n.tagName === "IMG") {
      const i = this.extractImageData(n, e);
      this.setState(s, {
        currentImageIndex: 0,
        images: [i],
        isOpen: !1,
        elementId: e
      });
    }
  }
  initializeLightboxForGallery(t) {
    const e = t.getAttribute("data-gallery-id") || t.id || "gallery-" + Date.now(), s = [];
    t.querySelectorAll("[data-gallery-image]").forEach((i, a) => {
      const o = i.querySelector("img") || i;
      o && o.tagName === "IMG" && s.push(this.extractImageData(o, `${e}-${a}`, a));
    }), this.setState(t, {
      currentImageIndex: 0,
      images: s,
      isOpen: !1,
      elementId: e
    });
  }
  getFilenameFromSrc(t) {
    try {
      return new URL(t).pathname.split("/").pop() || "image";
    } catch {
      return t.split("/").pop() || "image";
    }
  }
  extractImageData(t, e, s) {
    return {
      id: e,
      src: t.src,
      alt: t.alt || (s !== void 0 ? `Gallery image ${s + 1}` : "Image"),
      fileName: t.getAttribute("data-filename") || this.getFilenameFromSrc(t.src),
      fileSize: t.getAttribute("data-filesize") || "Unknown size",
      fileType: t.getAttribute("data-filetype") || "image"
    };
  }
  handleThumbnailClick(t, e) {
    e.preventDefault(), e.stopPropagation();
    const s = this.findLightboxContainer(t);
    if (!s)
      return;
    const n = this.getState(s);
    if (!n)
      return;
    let i = 0;
    const a = t.getAttribute("data-lightbox-trigger");
    a && (i = n.images.findIndex((l) => l.id === a));
    const o = t.getAttribute("data-gallery-image");
    o !== null && (i = parseInt(o, 10)), t.hasAttribute("data-lightbox-image") && (i = 0), !(i === -1 || i >= n.images.length) && this.openLightbox(s, i);
  }
  handleCloseClick(t, e) {
    e.preventDefault(), this.closeLightbox();
  }
  handlePrevClick(t, e) {
    e.preventDefault(), this.navigateToPrevious();
  }
  handleNextClick(t, e) {
    e.preventDefault(), this.navigateToNext();
  }
  handleKeydown(t) {
    if (!(!this.currentModal || !this.currentModal.open))
      switch (t.key) {
        case "Escape":
          t.preventDefault(), this.closeLightbox();
          break;
        case "ArrowLeft":
          t.preventDefault(), this.navigateToPrevious();
          break;
        case "ArrowRight":
          t.preventDefault(), this.navigateToNext();
          break;
      }
  }
  handleModalBackgroundClick(t, e) {
    e.target === t && this.closeLightbox();
  }
  openLightbox(t, e) {
    const s = this.getState(t);
    if (!s || !s.images.length)
      return;
    s.currentImageIndex = e, s.isOpen = !0, this.setState(t, s);
    const n = this.getOrCreateLightboxModal(t);
    this.currentModal = n, this.updateModalContent(n, s), n.showModal(), x.dispatchCustomEvent(t, "lightbox:open", {
      imageIndex: e,
      image: s.images[e]
    });
  }
  closeLightbox() {
    if (!this.currentModal)
      return;
    const t = this.findContainerElementFromModal(this.currentModal);
    if (t) {
      const e = this.getState(t);
      e && (e.isOpen = !1, this.setState(t, e)), x.dispatchCustomEvent(t, "lightbox:close", {});
    }
    this.currentModal.close(), this.currentModal = null;
  }
  navigateToPrevious() {
    if (!this.currentModal) return;
    const t = this.findContainerElementFromModal(this.currentModal);
    if (!t) return;
    const e = this.getState(t);
    if (!e || !e.images.length) return;
    const s = e.currentImageIndex > 0 ? e.currentImageIndex - 1 : e.images.length - 1;
    e.currentImageIndex = s, this.setState(t, e), this.updateModalContent(this.currentModal, e), x.dispatchCustomEvent(t, "lightbox:navigate", {
      direction: "previous",
      imageIndex: s,
      image: e.images[s]
    });
  }
  navigateToNext() {
    if (!this.currentModal) return;
    const t = this.findContainerElementFromModal(this.currentModal);
    if (!t) return;
    const e = this.getState(t);
    if (!e || !e.images.length) return;
    const s = e.currentImageIndex < e.images.length - 1 ? e.currentImageIndex + 1 : 0;
    e.currentImageIndex = s, this.setState(t, e), this.updateModalContent(this.currentModal, e), x.dispatchCustomEvent(t, "lightbox:navigate", {
      direction: "next",
      imageIndex: s,
      image: e.images[s]
    });
  }
  getOrCreateLightboxModal(t) {
    const s = this.getElementId(t) + "-lightbox-modal";
    let n = document.getElementById(s);
    return n || (n = this.createLightboxModal(s), document.body.appendChild(n)), n;
  }
  getElementId(t) {
    const e = t.getAttribute("data-file-upload-id");
    if (e)
      return e;
    const s = t.getAttribute("data-gallery-id");
    return s || t.id || "lightbox-" + Date.now();
  }
  createLightboxModal(t) {
    const e = h.createElement("dialog", {
      attributes: {
        id: t,
        "data-lightbox-modal": "true",
        "data-modal": "true",
        class: "lightbox-modal p-0 m-0 w-full h-full max-w-none max-h-none bg-black/90 backdrop:bg-black/50"
      }
    });
    return e.innerHTML = `
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
        `, e;
  }
  updateModalContent(t, e) {
    const s = e.images[e.currentImageIndex];
    if (!s) return;
    const n = t.querySelector("[data-lightbox-image]");
    n && (n.src = s.src, n.alt = s.alt);
    const i = t.querySelector("[data-lightbox-title]");
    i && (i.textContent = s.fileName);
    const a = t.querySelector("[data-lightbox-size]");
    a && (a.textContent = s.fileSize);
    const o = t.querySelector("[data-lightbox-counter]");
    o && (o.textContent = `${e.currentImageIndex + 1} of ${e.images.length}`);
    const l = t.querySelector("[data-lightbox-prev]"), c = t.querySelector("[data-lightbox-next]");
    if (l && c) {
      const d = e.images.length > 1;
      l.style.display = d ? "flex" : "none", c.style.display = d ? "flex" : "none";
    }
  }
  findLightboxContainer(t) {
    const e = h.findClosest(t, "[data-file-upload-id]");
    if (e)
      return e;
    const s = h.findClosest(t, "[data-gallery]");
    if (s)
      return s;
    const n = h.findClosest(t, "[data-lightbox-container]");
    return n || (t.hasAttribute("data-lightbox-image") ? t : null);
  }
  findContainerElementFromModal(t) {
    const s = t.id.replace("-lightbox-modal", "");
    let n = document.querySelector(`[data-file-upload-id="${s}"]`);
    return n || (n = document.querySelector(`[data-gallery-id="${s}"]`), n) || (n = document.getElementById(s), n) ? n : null;
  }
  // Public method to add an image to the lightbox
  addImage(t, e) {
    const s = this.getState(t);
    s && (s.images.push(e), this.setState(t, s));
  }
  // Public method to add multiple images (for galleries)
  addImages(t, e) {
    const s = this.getState(t);
    s && (s.images.push(...e), this.setState(t, s));
  }
  // Public method to set images (replace all)
  setImages(t, e) {
    const s = this.getState(t);
    s && (s.images = e, this.setState(t, s));
  }
  // Public method to remove an image from the lightbox
  removeImage(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const n = s.images.findIndex((i) => i.id === e);
    n !== -1 && (s.images.splice(n, 1), s.currentImageIndex >= s.images.length && (s.currentImageIndex = Math.max(0, s.images.length - 1)), this.setState(t, s), s.images.length === 0 && s.isOpen && this.closeLightbox());
  }
  destroy() {
    this.cleanupFunctions.forEach((t) => t()), this.cleanupFunctions = [], this.currentModal && (this.currentModal.close(), this.currentModal = null), super.destroy();
  }
}
class qc extends K {
  constructor() {
    super(...arguments), this.cleanupFunctions = [], this.filePreviewsMap = /* @__PURE__ */ new Map();
  }
  bindEventListeners() {
    this.cleanupFunctions.push(
      x.handleDelegatedClick(
        "[data-file-upload-zone]",
        (t, e) => this.handleDropZoneClick(t, e)
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedEvent(
        "keydown",
        "[data-file-upload-zone]",
        (t, e) => this.handleDropZoneKeydown(t, e)
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedChange(
        "[data-file-input]",
        (t, e) => this.handleFileInputChange(t, e)
      )
    ), this.setupDragAndDropEvents(), this.cleanupFunctions.push(
      x.handleDelegatedClick(
        "[data-remove-file]",
        (t, e) => this.handleRemoveFile(t, e)
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedClick(
        "[data-remove-existing-file]",
        (t, e) => this.handleRemoveExistingFile(t, e)
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedClick(
        "[data-dismiss-error]",
        (t, e) => this.handleDismissError(t, e)
      )
    ), this.cleanupFunctions.push(
      x.handleDelegatedClick(
        "[data-add-more-files]",
        (t, e) => this.handleAddMoreFiles(t, e)
      )
    );
  }
  initializeElements() {
    console.log("🔍 FileUploadActions: Initializing lightbox actions"), this.lightboxActions = new Oc(), this.lightboxActions.init();
    const t = h.findByDataAttribute("file-upload-zone");
    console.log("🔍 FileUploadActions: Found upload zones:", t.length), t.forEach((e, s) => {
      this.initializeZone(e);
    });
  }
  initializeZone(t) {
    const e = this.findFileInput(t);
    if (!e)
      return;
    const s = h.getDataAttribute(t, "preview"), n = h.getDataAttribute(t, "progress"), i = h.getDataAttribute(t, "auto-upload"), a = {
      files: [],
      isUploading: !1,
      isDragOver: !1,
      hasLivewire: this.detectLivewire(e),
      livewireProperty: this.getLivewireProperty(e),
      validationRules: this.parseValidationRules(t),
      preview: s === "true",
      progress: n === "true",
      autoUpload: i === "true",
      fileUploadZone: t
    };
    this.setState(t, a), this.filePreviewsMap.set(t, /* @__PURE__ */ new Map());
  }
  setupDragAndDropEvents() {
    this.cleanupFunctions.push(
      x.addEventListener(document, "dragenter", (t) => t.preventDefault()),
      x.addEventListener(document, "dragover", (t) => t.preventDefault()),
      x.addEventListener(document, "drop", (t) => t.preventDefault())
    ), this.cleanupFunctions.push(
      x.handleDelegatedEvent(
        "dragenter",
        "[data-file-upload-zone]",
        (t, e) => this.handleDragEnter(t, e)
      ),
      x.handleDelegatedEvent(
        "dragover",
        "[data-file-upload-zone]",
        (t, e) => this.handleDragOver(t, e)
      ),
      x.handleDelegatedEvent(
        "dragleave",
        "[data-file-upload-zone]",
        (t, e) => this.handleDragLeave(t, e)
      ),
      x.handleDelegatedEvent(
        "drop",
        "[data-file-upload-zone]",
        (t, e) => this.handleDrop(t, e)
      )
    );
  }
  handleDropZoneClick(t, e) {
    if (h.isDisabled(t))
      return;
    const s = e.target;
    if (s === t || s.closest("[data-file-upload-zone]") === t) {
      if (s.closest('button, a, [role="button"]:not([data-file-upload-zone])') && !s.closest(".pointer-events-none"))
        return;
      this.triggerFileSelect(t);
    }
  }
  handleDropZoneKeydown(t, e) {
    h.isDisabled(t) || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.triggerFileSelect(t));
  }
  triggerFileSelect(t) {
    const e = this.findFileInput(t);
    e && (e.click(), this.announceToScreenReader("File selection dialog opened"));
  }
  // Browse button functionality removed - now handled by drop zone click
  handleFileInputChange(t, e) {
    const s = t.parentElement, n = s ? s.querySelector("[data-file-upload-zone]") : null;
    if (!n) return;
    const i = Array.from(t.files || []);
    this.processFiles(n, i);
  }
  handleDragEnter(t, e) {
    h.isDisabled(t) || (e.preventDefault(), this.setDragState(t, !0));
  }
  handleDragOver(t, e) {
    h.isDisabled(t) || (e.preventDefault(), e.dataTransfer.dropEffect = "copy");
  }
  handleDragLeave(t, e) {
    if (h.isDisabled(t)) return;
    const s = t.getBoundingClientRect(), n = e.clientX, i = e.clientY;
    (n < s.left || n > s.right || i < s.top || i > s.bottom) && this.setDragState(t, !1);
  }
  handleDrop(t, e) {
    var n;
    if (h.isDisabled(t)) return;
    e.preventDefault(), this.setDragState(t, !1);
    const s = Array.from(((n = e.dataTransfer) == null ? void 0 : n.files) || []);
    s.length > 0 && this.processFiles(t, s);
  }
  handleRemoveFile(t, e) {
    e.stopPropagation();
    const s = t.getAttribute("data-remove-file"), n = h.findClosest(t, "[data-file-previews]"), i = n == null ? void 0 : n.parentElement, a = i ? i.querySelector("[data-file-upload-zone]") : null;
    a && s && this.removeFile(a, s);
  }
  handleRemoveExistingFile(t, e) {
    e.stopPropagation();
    const s = t.getAttribute("data-remove-existing-file");
    x.dispatchCustomEvent(t, "file-upload:remove-existing", {
      fileId: s
    });
  }
  handleAddMoreFiles(t, e) {
    e.stopPropagation();
    const s = h.findClosest(t, "[data-file-previews]"), n = s == null ? void 0 : s.parentElement, i = n ? n.querySelector("[data-file-upload-zone]") : null;
    if (!i)
      return;
    const a = this.findFileInput(i);
    a && (a.click(), this.announceToScreenReader("File selection dialog opened for additional files"));
  }
  processFiles(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const n = this.validateFiles(e, s.validationRules, s.files.length);
    if (!n.valid) {
      this.showError(t, n.errors.join(", "));
      return;
    }
    const i = n.validFiles, a = i, o = this.findFileInput(t);
    !((o == null ? void 0 : o.hasAttribute("multiple")) ?? !1) && s.files.length > 0 ? (s.files = [...a], this.clearAllPreviews(t)) : s.files.push(...a), this.setState(t, s), s.preview && this.createFilePreviews(t, i), s.hasLivewire && this.updateLivewireFiles(t, s.files), s.autoUpload && this.uploadFiles(t, a);
    const c = i.length, d = s.files.length, f = c === 1 ? `Selected ${i[0].name}` : `Selected ${c} files`, p = d > c ? ` (${d} files total)` : "";
    this.announceToScreenReader(f + p), x.dispatchCustomEvent(t, "file-upload:files-added", {
      files: a,
      allFiles: s.files
    });
  }
  validateFiles(t, e, s) {
    const n = [], i = [];
    if (e.maxFiles && s + t.length > e.maxFiles)
      return n.push(`Maximum ${e.maxFiles} files allowed`), { valid: !1, validFiles: [], errors: n };
    for (const a of t) {
      const o = [];
      e.accept && !this.isFileTypeAllowed(a, e.accept) && o.push(`${a.name}: File type not allowed`), e.maxSize && a.size > e.maxSize && o.push(`${a.name}: File too large (max ${this.formatFileSize(e.maxSize)})`), o.length === 0 ? i.push(a) : n.push(...o);
    }
    return { valid: n.length === 0, validFiles: i, errors: n };
  }
  isFileTypeAllowed(t, e) {
    return e.split(",").map((n) => n.trim()).some((n) => {
      if (n.startsWith("."))
        return t.name.toLowerCase().endsWith(n.toLowerCase());
      if (n.includes("*")) {
        const i = n.replace("*", ".*");
        return new RegExp(i).test(t.type);
      } else
        return t.type === n;
    });
  }
  createFilePreviews(t, e) {
    var i;
    const s = (i = t.parentElement) == null ? void 0 : i.querySelector("[data-preview-list]");
    if (!s)
      return;
    const n = this.filePreviewsMap.get(t) || /* @__PURE__ */ new Map();
    e.forEach((a) => {
      const o = this.generateFileId(a), l = {
        file: a,
        id: o,
        progress: 0,
        status: "pending"
      };
      n.set(o, l), this.renderFilePreview(s, l, t);
    }), this.filePreviewsMap.set(t, n), this.updatePreviewLayout(t), this.showPreviewArea(t);
  }
  renderFilePreview(t, e, s) {
    this.renderFilePreviewForLayout(t, e, "file-list", s);
  }
  /**
   * Renders a file preview for a specific layout type
   */
  renderFilePreviewForLayout(t, e, s, n) {
    const i = e.file.type.startsWith("image/"), a = this.formatFileSize(e.file.size), o = this.getFileTypeIconName(e.file), l = this.createFileListPreview(e, a, o, i, n);
    t.appendChild(l), i && this.loadImagePreview(l, e, n), this.updatePreviewStatus(l, e.status);
  }
  createFileListPreview(t, e, s, n, i) {
    const a = i.getAttribute("data-lightbox") === "true", o = h.createElement("div", {
      classes: ["file-preview-item", "group", "relative", "flex", "items-center", "justify-between", "p-4", "border", "border-border", "rounded-lg", "bg-surface", "hover:bg-surface/80", "transition-all", "duration-200"],
      attributes: {
        "data-file-id": t.id,
        "data-file-status": t.status,
        role: "listitem"
      }
    });
    return o.innerHTML = `
            <div class="flex items-center space-x-4 flex-1 min-w-0">
                <div class="file-preview-thumbnail flex-shrink-0">
                    ${n ? `<div class="relative w-12 h-12 rounded-md overflow-hidden bg-surface border border-border ${a ? "cursor-pointer hover:ring-2 hover:ring-brand/50 transition-all" : ""}"
                              ${a ? `data-lightbox-trigger="${t.id}" role="button" tabindex="0" aria-label="View ${this.escapeHtml(t.file.name)} in lightbox"` : ""}>
                            <img src="" alt="Preview of ${this.escapeHtml(t.file.name)}" class="w-full h-full object-cover opacity-50" data-image-preview="true" />
                            ${a ? `
                                <div class="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 pointer-events-none">
                                    <svg class="w-4 h-4 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                                    </svg>
                                </div>
                            ` : ""}
                        </div>` : `<div class="w-12 h-12 rounded-md bg-surface border border-border flex items-center justify-center text-muted group-hover:text-foreground transition-colors">
                            ${this.getHeroiconSvg(s, "w-6 h-6")}
                        </div>`}
                </div>

                <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-foreground truncate group-hover:text-brand transition-colors" title="${this.escapeHtml(t.file.name)}">
                        ${this.escapeHtml(t.file.name)}
                    </p>
                    <div class="flex items-center space-x-2 text-xs text-muted">
                        <span>${e}</span>
                        ${t.status !== "pending" ? `
                            <span class="text-muted/50">•</span>
                            <span class="capitalize ${this.getStatusColor(t.status)}">
                                ${t.status}
                            </span>
                        ` : ""}
                    </div>
                </div>
            </div>

            <div class="flex items-center space-x-2 flex-shrink-0">
                ${t.status === "uploading" ? `
                    <div class="w-4 h-4 animate-spin text-brand">
                        <svg fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ` : ""}

                ${t.status === "success" ? `
                    ${this.getHeroiconSvg("heroicon-o-check-circle", "w-5 h-5 text-success")}
                ` : ""}

                ${t.status === "error" ? `
                    ${this.getHeroiconSvg("heroicon-o-exclamation-triangle", "w-5 h-5 text-danger")}
                ` : ""}

                <button
                    type="button"
                    class="p-2 opacity-60 group-hover:opacity-100 hover:bg-danger/10 text-danger hover:text-danger-hover rounded transition-all duration-200"
                    data-remove-file="${t.id}"
                    aria-label="Remove ${this.escapeHtml(t.file.name)}"
                >
                    ${this.getHeroiconSvg("heroicon-o-trash", "w-4 h-4")}
                </button>
            </div>

            ${t.status === "uploading" ? `
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-border rounded-b-lg overflow-hidden">
                    <div
                        class="h-full bg-brand transition-all duration-300 ease-out"
                        style="width: ${t.progress}%"
                        data-progress-bar="${t.id}"
                    ></div>
                </div>
            ` : ""}
        `, o;
  }
  escapeHtml(t) {
    const e = document.createElement("div");
    return e.textContent = t, e.innerHTML;
  }
  truncateText(t, e) {
    return t.length > e ? t.substring(0, e) + "..." : t;
  }
  getStatusColor(t) {
    switch (t) {
      case "success":
        return "text-success";
      case "error":
        return "text-danger";
      case "uploading":
        return "text-brand";
      default:
        return "text-muted";
    }
  }
  loadImagePreview(t, e, s) {
    const n = t.querySelector("[data-image-preview]");
    if (n && e.file.type.startsWith("image/")) {
      const i = new FileReader();
      i.onload = (a) => {
        var o;
        if ((o = a.target) != null && o.result) {
          n.src = a.target.result, n.classList.remove("opacity-50"), e.preview = a.target.result;
          const l = s.getAttribute("data-lightbox") === "true";
          if (console.log("🔍 FileUploadActions: Lightbox enabled:", l, "for zone:", s), l && this.lightboxActions) {
            const c = s.parentElement;
            if (c && c.hasAttribute("data-file-upload-id")) {
              const d = {
                id: e.id,
                src: a.target.result,
                alt: `Preview of ${e.file.name}`,
                fileName: e.file.name,
                fileSize: this.formatFileSize(e.file.size),
                fileType: e.file.type
              };
              console.log("🔍 FileUploadActions: Adding image to lightbox:", d), this.lightboxActions.addImage(c, d);
            }
          }
        }
      }, i.onerror = () => {
        this.announceToScreenReader(`Failed to load preview for ${e.file.name}`);
      }, i.readAsDataURL(e.file);
    }
  }
  updatePreviewStatus(t, e) {
    t.classList.remove("upload-success", "upload-error", "uploading"), e === "success" ? t.classList.add("upload-success") : e === "error" ? t.classList.add("upload-error") : e === "uploading" && t.classList.add("uploading"), t.setAttribute("data-file-status", e);
  }
  updatePreviewLayout(t) {
    var s;
    const e = (s = t.parentElement) == null ? void 0 : s.querySelector("[data-preview-list]");
    e && (e.classList.remove("image-grid-layout", "mixed-layout"), e.classList.add("file-list-layout"), e.setAttribute("data-layout-type", "file-list"));
  }
  updateFilePreviewProgress(t, e, s) {
    const n = document.querySelector(`[data-file-id="${t}"]`);
    if (!n) return;
    const i = n.querySelector("[data-progress-bar]");
    i && (i.style.width = `${e}%`), s && this.updatePreviewStatus(n, s);
  }
  removeFile(t, e) {
    var c;
    const s = this.getState(t);
    if (!s)
      return;
    const n = s.files.find((d) => this.generateFileId(d) === e), i = (n == null ? void 0 : n.name) || "File";
    s.files = s.files.filter((d) => this.generateFileId(d) !== e), this.setState(t, s);
    const a = this.filePreviewsMap.get(t);
    if (a && a.delete(e), t.getAttribute("data-lightbox") === "true" && this.lightboxActions) {
      const d = t.parentElement;
      d && d.hasAttribute("data-file-upload-id") && this.lightboxActions.removeImage(d, e);
    }
    const l = (c = t.parentElement) == null ? void 0 : c.querySelector(`[data-file-id="${e}"]`);
    l && h.removeElement(l), s.hasLivewire && this.updateLivewireFiles(t, s.files), s.files.length === 0 && this.hidePreviewArea(t), this.announceToScreenReader(`${i} removed`), x.dispatchCustomEvent(t, "file-upload:file-removed", {
      fileId: e,
      fileName: i,
      allFiles: s.files
    });
  }
  uploadFiles(t, e) {
    const s = this.getState(t);
    !s || s.isUploading || (s.isUploading = !0, this.setState(t, s), this.setUploadingState(t, !0), x.dispatchCustomEvent(t, "file-upload:upload-start", {
      files: e
    }), this.simulateUpload(t, e));
  }
  simulateUpload(t, e) {
    const s = t.querySelector("[data-upload-progress]");
    this.getState(t) && e.forEach((o) => {
      const l = this.generateFileId(o);
      this.updateFilePreviewProgress(l, 0, "uploading");
    });
    let i = 0;
    const a = setInterval(() => {
      if (i += Math.random() * 10, i >= 100 && (i = 100, clearInterval(a), this.completeUpload(t, e)), s) {
        const o = s.querySelector(".progress-bar");
        o && (o.style.width = `${i}%`);
      }
      e.forEach((o) => {
        const l = this.generateFileId(o);
        this.updateFilePreviewProgress(l, i);
      });
    }, 100);
  }
  completeUpload(t, e) {
    const s = this.getState(t);
    if (!s) return;
    s.isUploading = !1, this.setState(t, s), this.setUploadingState(t, !1), e.forEach((a) => {
      const o = this.generateFileId(a);
      this.updateFilePreviewProgress(o, 100, "success");
    });
    const n = e.length, i = n === 1 ? `File ${e[0].name} uploaded successfully` : `${n} files uploaded successfully`;
    this.announceToScreenReader(i), x.dispatchCustomEvent(t, "file-upload:upload-complete", {
      files: e
    });
  }
  // Helper methods
  findFileInput(t) {
    const e = t.parentElement;
    return e && e.querySelector("[data-file-input]") || null;
  }
  detectLivewire(t) {
    return Array.from(t.attributes).some((e) => e.name.startsWith("wire:"));
  }
  getLivewireProperty(t) {
    return t.getAttribute("wire:model") || t.getAttribute("wire:model.live") || void 0;
  }
  parseValidationRules(t) {
    const e = h.getDataAttribute(t, "validation-rules");
    try {
      return e ? JSON.parse(e) : {};
    } catch {
      return {};
    }
  }
  updateLivewireFiles(t, e) {
    const s = this.findFileInput(t);
    if (!s) return;
    const n = new DataTransfer();
    e.forEach((i) => n.items.add(i)), s.files = n.files, s.dispatchEvent(new Event("change", { bubbles: !0 }));
  }
  setDragState(t, e) {
    const s = this.getState(t);
    s && (s.isDragOver = e, this.setState(t, s), h.toggleClass(t, "drag-over", e));
  }
  setUploadingState(t, e) {
    h.toggleClass(t, "uploading", e);
  }
  showPreviewArea(t) {
    var s;
    const e = (s = t.parentElement) == null ? void 0 : s.querySelector("[data-file-previews]");
    if (e) {
      h.removeClass(e, "hidden");
      const n = e.querySelector("[data-add-more-files]");
      n && h.removeClass(n, "hidden");
    }
  }
  hidePreviewArea(t) {
    var s;
    const e = (s = t.parentElement) == null ? void 0 : s.querySelector("[data-file-previews]");
    e && h.addClass(e, "hidden");
  }
  clearAllPreviews(t) {
    var s;
    const e = (s = t.parentElement) == null ? void 0 : s.querySelector("[data-preview-list]");
    e && e.querySelectorAll("[data-file-id]").forEach((i) => {
      h.removeElement(i);
    }), this.filePreviewsMap.set(t, /* @__PURE__ */ new Map()), this.updatePreviewLayout(t);
  }
  handleDismissError(t, e) {
    e.stopPropagation();
    const s = h.findClosest(t, "[data-file-upload-errors]");
    s && h.addClass(s, "hidden");
  }
  showError(t, e) {
    var n;
    const s = (n = t.parentElement) == null ? void 0 : n.querySelector("[data-file-upload-errors]");
    if (s) {
      const i = s.querySelector("[data-error-message]");
      i && (i.textContent = e), h.removeClass(s, "hidden"), s.focus();
    }
    this.announceToScreenReader(`Error: ${e}`), x.dispatchCustomEvent(t, "file-upload:error", {
      message: e
    });
  }
  announceToScreenReader(t) {
    let e = document.getElementById("file-upload-live-region");
    e || (e = document.createElement("div"), e.id = "file-upload-live-region", e.setAttribute("aria-live", "polite"), e.setAttribute("aria-atomic", "true"), e.className = "sr-only", document.body.appendChild(e)), e.__clearTimeout && clearTimeout(e.__clearTimeout), e.textContent = t, e.__clearTimeout = setTimeout(() => {
      e.textContent = "";
    }, 5e3);
  }
  generateFileId(t) {
    return `${t.name}-${t.size}-${Date.now()}`;
  }
  getFileTypeIconName(t) {
    var n;
    const e = t.type.toLowerCase(), s = (n = t.name.split(".").pop()) == null ? void 0 : n.toLowerCase();
    return e.startsWith("image/") ? "heroicon-o-photo" : e.startsWith("video/") ? "heroicon-o-video-camera" : e.startsWith("audio/") ? "heroicon-o-musical-note" : e === "application/pdf" ? "heroicon-o-document-text" : ["zip", "rar", "7z", "tar", "gz"].includes(s || "") || e.includes("zip") || e.includes("compressed") ? "heroicon-o-archive-box" : ["js", "ts", "html", "css", "php", "py", "java", "cpp", "c", "json", "xml"].includes(s || "") || e.includes("text") ? "heroicon-o-code-bracket" : ["ppt", "pptx"].includes(s || "") || e.includes("presentation") ? "heroicon-o-presentation-chart-bar" : ["xls", "xlsx", "csv"].includes(s || "") || e.includes("spreadsheet") ? "heroicon-o-table-cells" : "heroicon-o-document";
  }
  getHeroiconSvg(t, e) {
    const s = `${e} fill="none" stroke="currentColor" viewBox="0 0 24 24"`;
    switch (t) {
      case "heroicon-o-photo":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>`;
      case "heroicon-o-video-camera":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>`;
      case "heroicon-o-musical-note":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                </svg>`;
      case "heroicon-o-document-text":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>`;
      case "heroicon-o-archive-box":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>`;
      case "heroicon-o-code-bracket":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>`;
      case "heroicon-o-presentation-chart-bar":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0-1-3m1 3-1-3m-16.5-3h12.75" />
                </svg>`;
      case "heroicon-o-table-cells":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625a1.125 1.125 0 0 0 1.125-1.125m-1.125 1.125h-1.5A1.125 1.125 0 0 1 18 18.375m3.375 1.125V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75V5.625M3.375 4.5c0-.621.504-1.125 1.125-1.125M4.5 4.5h1.5" />
                </svg>`;
      case "heroicon-o-x-mark":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18 18 6M6 6l12 12" />
                </svg>`;
      case "heroicon-o-check":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m4.5 12.75 6 6 9-13.5" />
                </svg>`;
      case "heroicon-o-check-circle":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>`;
      case "heroicon-o-exclamation-triangle":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>`;
      case "heroicon-o-trash":
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>`;
      case "heroicon-o-document":
      default:
        return `<svg class="${s}">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>`;
    }
  }
  formatFileSize(t) {
    if (t === 0) return "0 Bytes";
    const e = 1024, s = ["Bytes", "KB", "MB", "GB"], n = Math.floor(Math.log(t) / Math.log(e));
    return parseFloat((t / Math.pow(e, n)).toFixed(2)) + " " + s[n];
  }
  destroy() {
    this.cleanupFunctions.forEach((t) => t()), this.cleanupFunctions = [], this.filePreviewsMap.clear(), super.destroy();
  }
}
class Mc extends K {
  constructor() {
    super(), this.lightboxActions = new Oc(), this.init();
  }
  /**
   * Initialize gallery elements - required by BaseActionClass
   */
  initializeElements() {
    this.lightboxActions.init(), h.findByDataAttribute("gallery", "true").forEach((t) => {
      this.initializeGallery(t);
    });
  }
  /**
   * Bind event listeners - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedKeydown('[data-gallery="true"]', (t, e) => {
      const s = t.dataset.galleryId;
      s && this.handleKeyboardNavigation(e, s, t);
    });
  }
  /**
   * Extract image data from gallery DOM elements
   */
  extractImageData(t) {
    const e = [];
    return t.querySelectorAll("[data-gallery-slide]").forEach((n, i) => {
      const a = n.querySelector("img");
      a && e.push({
        id: n.getAttribute("data-gallery-slide") || `img-${i}`,
        src: a.src,
        alt: a.alt || `Image ${i + 1}`,
        caption: a.getAttribute("data-caption"),
        thumbnail: a.src,
        // Default to same as src
        title: a.getAttribute("data-title"),
        description: a.getAttribute("data-description")
      });
    }), e;
  }
  /**
   * Initialize a single gallery element
   */
  initializeGallery(t) {
    const e = t.dataset.galleryId;
    if (!e) return;
    const s = parseInt(t.dataset.totalImages || "0"), n = this.extractImageData(t);
    this.setState(t, {
      currentIndex: 0,
      isAutoplayActive: t.dataset.autoplay === "true",
      autoplayInterval: null,
      touchStartX: 0,
      touchEndX: 0,
      isDragging: !1,
      totalImages: s,
      images: n
    }), this.setupGalleryEventListeners(t, e), t.dataset.autoplay === "true" && this.startAutoplay(e, t), this.updateAccessibility(t, e), this.initializeImageErrorHandling(t), this.preloadAdjacentImages(t, 0);
  }
  /**
   * Set up event listeners for gallery interactions
   */
  setupGalleryEventListeners(t, e) {
    const s = t.querySelector('[data-gallery-action="prev"]'), n = t.querySelector('[data-gallery-action="next"]');
    s && x.addEventListener(s, "click", () => {
      this.navigateToImage(e, t, "prev");
    }), n && x.addEventListener(n, "click", () => {
      this.navigateToImage(e, t, "next");
    }), t.querySelectorAll("[data-gallery-thumbnail]").forEach((o, l) => {
      x.addEventListener(o, "click", () => {
        this.goToImage(e, t, l);
      }), x.addEventListener(o, "keydown", (c) => {
        const d = c;
        (d.key === "Enter" || d.key === " ") && (d.preventDefault(), this.goToImage(e, t, l));
      });
    });
    const a = t.querySelector('[data-gallery-action="toggle-autoplay"]');
    a && x.addEventListener(a, "click", () => {
      this.toggleAutoplay(e, t);
    }), this.setupTouchEvents(t, e), x.addEventListener(t, "mouseenter", () => {
      this.pauseAutoplayOnHover(e);
    }), x.addEventListener(t, "mouseleave", () => {
      this.resumeAutoplayOnHover(e, t);
    });
  }
  /**
   * Set up touch/swipe event listeners
   */
  setupTouchEvents(t, e) {
    const s = t.querySelector(".gallery-main");
    s && (x.addEventListener(s, "touchstart", (n) => {
      const i = n, a = this.getState(t);
      a && (a.touchStartX = i.touches[0].clientX, a.isDragging = !0, this.setState(t, a));
    }), x.addEventListener(s, "touchmove", (n) => {
      const i = n, a = this.getState(t);
      a != null && a.isDragging && (a.touchEndX = i.touches[0].clientX, this.setState(t, a));
    }), x.addEventListener(s, "touchend", () => {
      const n = this.getState(t);
      if (!(n != null && n.isDragging)) return;
      n.isDragging = !1;
      const i = n.touchStartX - n.touchEndX;
      Math.abs(i) > 50 && (i > 0 ? this.navigateToImage(e, t, "next") : this.navigateToImage(e, t, "prev")), this.setState(t, n);
    }));
  }
  /**
   * Handle keyboard navigation
   */
  handleKeyboardNavigation(t, e, s) {
    switch (t.key) {
      case "ArrowLeft":
        t.preventDefault(), this.navigateToImage(e, s, "prev");
        break;
      case "ArrowRight":
        t.preventDefault(), this.navigateToImage(e, s, "next");
        break;
      case "Home":
        t.preventDefault(), this.goToImage(e, s, 0);
        break;
      case "End":
        t.preventDefault();
        const n = this.getState(s);
        n && this.goToImage(e, s, n.totalImages - 1);
        break;
      case "Escape":
        t.preventDefault(), this.handleEscapeKey(e, s);
        break;
      case " ":
      case "Spacebar":
        t.preventDefault(), this.toggleAutoplay(e, s);
        break;
      case "Enter":
        const i = t.target;
        if (i.hasAttribute("data-gallery-thumbnail")) {
          t.preventDefault();
          const a = parseInt(i.getAttribute("data-gallery-thumbnail") || "0");
          this.goToImage(e, s, a);
        }
        break;
    }
  }
  /**
   * Handle escape key with proper lightbox and autoplay logic
   */
  handleEscapeKey(t, e) {
    const s = e.dataset.lightbox === "true", n = this.getState(e);
    s ? this.closeLightbox(e) : n != null && n.isAutoplayActive && this.pauseAutoplay(t, e), this.announceAction(e, "Gallery navigation closed");
  }
  /**
   * Close lightbox using the unified LightboxActions
   */
  closeLightbox(t) {
    const e = this.lightboxActions.getState(t);
    e && e.isOpen && (this.emitGalleryEvent(t, "gallery:lightboxClose", {}), this.announceAction(t, "Lightbox closed"));
  }
  /**
   * Announce actions to screen readers
   */
  announceAction(t, e) {
    const s = t.querySelector("[data-gallery-live]");
    s && (s.textContent = e, setTimeout(() => {
      s.textContent === e && (s.textContent = "");
    }, 1e3));
  }
  /**
   * Navigate to previous or next image
   */
  navigateToImage(t, e, s) {
    const n = this.getState(e);
    if (!n) return;
    const i = parseInt(e.dataset.totalImages || "0"), a = e.dataset.loop === "true";
    let o = n.currentIndex;
    s === "next" ? (o = n.currentIndex + 1, o >= i && (o = a ? 0 : i - 1)) : (o = n.currentIndex - 1, o < 0 && (o = a ? i - 1 : 0)), this.goToImage(t, e, o);
  }
  /**
   * Go to a specific image by index
   */
  goToImage(t, e, s) {
    const n = this.getState(e);
    if (!n) return;
    const i = parseInt(e.dataset.totalImages || "0");
    s < 0 || s >= i || (n.currentIndex = s, this.setState(e, n), this.updateImageDisplay(e, s), this.updateThumbnails(e, s), this.updateCounter(e, s), this.updateImageDetails(e, s), this.updateNavigationButtons(e, s, i), this.updateAccessibility(e, t), this.announceImageChange(e, s, i), this.preloadAdjacentImages(e, s), this.emitGalleryEvent(e, "gallery:imageChanged", {
      currentIndex: s,
      galleryId: t
    }));
  }
  /**
   * Update image display
   */
  updateImageDisplay(t, e) {
    t.querySelectorAll(".gallery-slide").forEach((n, i) => {
      const a = n;
      i === e ? (a.classList.remove("opacity-0"), a.classList.add("opacity-100", "active")) : (a.classList.remove("opacity-100", "active"), a.classList.add("opacity-0"));
    });
  }
  /**
   * Update thumbnail highlighting
   */
  updateThumbnails(t, e) {
    t.querySelectorAll(".gallery-thumbnail").forEach((n, i) => {
      const a = n;
      i === e ? (a.classList.add("active", "border-brand-500"), a.classList.remove("border-transparent"), a.setAttribute("aria-current", "true")) : (a.classList.remove("active", "border-brand-500"), a.classList.add("border-transparent"), a.removeAttribute("aria-current"));
    });
  }
  /**
   * Update image counter
   */
  updateCounter(t, e) {
    const s = t.querySelector("[data-gallery-current]");
    s && (s.textContent = (e + 1).toString());
  }
  /**
   * Update image details for ecommerce type
   */
  updateImageDetails(t, e) {
    t.querySelector("[data-gallery-title]"), t.querySelector("[data-gallery-description]");
  }
  /**
   * Update navigation button states
   */
  updateNavigationButtons(t, e, s) {
    const n = t.querySelector('[data-gallery-action="prev"]'), i = t.querySelector('[data-gallery-action="next"]'), a = t.dataset.loop === "true";
    n && (n.disabled = !a && e === 0), i && (i.disabled = !a && e === s - 1);
  }
  /**
   * Start autoplay
   */
  startAutoplay(t, e) {
    const s = this.getState(e);
    if (!s) return;
    const n = parseInt(e.dataset.autoplayDelay || "3000");
    s.autoplayInterval = window.setInterval(() => {
      this.navigateToImage(t, e, "next");
    }, n), s.isAutoplayActive = !0, this.setState(e, s), this.updateAutoplayButton(e, !0);
  }
  /**
   * Pause autoplay
   */
  pauseAutoplay(t, e) {
    const s = this.getState(e);
    s && (s.autoplayInterval && (clearInterval(s.autoplayInterval), s.autoplayInterval = null), s.isAutoplayActive = !1, this.setState(e, s), this.updateAutoplayButton(e, !1));
  }
  /**
   * Toggle autoplay
   */
  toggleAutoplay(t, e) {
    const s = this.getState(e);
    s && (s.isAutoplayActive ? this.pauseAutoplay(t, e) : this.startAutoplay(t, e));
  }
  /**
   * Update autoplay button state using Button component's multi-state functionality
   */
  updateAutoplayButton(t, e) {
    const s = t.querySelector(".gallery-autoplay-toggle");
    if (s) {
      s.setAttribute("aria-pressed", e.toString()), s.setAttribute("aria-label", e ? "Pause autoplay" : "Resume autoplay");
      const n = s.querySelector(".button-icon-default"), i = s.querySelector(".button-icon-toggle");
      n && i && (e ? (n.classList.remove("opacity-0"), n.classList.add("opacity-100"), i.classList.remove("opacity-100"), i.classList.add("opacity-0")) : (n.classList.remove("opacity-100"), n.classList.add("opacity-0"), i.classList.remove("opacity-0"), i.classList.add("opacity-100")));
    }
  }
  /**
   * Pause autoplay on hover
   */
  pauseAutoplayOnHover(t) {
    const e = document.querySelector(`[data-gallery-id="${t}"]`);
    if (!e) return;
    const s = this.getState(e);
    !(s != null && s.isAutoplayActive) || !s.autoplayInterval || (clearInterval(s.autoplayInterval), s.autoplayInterval = null, this.setState(e, s));
  }
  /**
   * Resume autoplay when hover ends
   */
  resumeAutoplayOnHover(t, e) {
    const s = this.getState(e);
    if (!(s != null && s.isAutoplayActive) || s.autoplayInterval) return;
    const n = parseInt(e.dataset.autoplayDelay || "3000");
    s.autoplayInterval = window.setInterval(() => {
      this.navigateToImage(t, e, "next");
    }, n), this.setState(e, s);
  }
  /**
   * Update accessibility attributes
   */
  updateAccessibility(t, e) {
    const s = this.getState(t);
    if (!s) return;
    const n = parseInt(t.dataset.totalImages || "0"), i = t.querySelector(`[data-gallery-slide="${s.currentIndex}"]`);
    i && (i.setAttribute("aria-current", "true"), i.setAttribute("aria-label", `Image ${s.currentIndex + 1} of ${n}`)), t.querySelectorAll("[data-gallery-slide]").forEach((o, l) => {
      l !== s.currentIndex && o.removeAttribute("aria-current");
    });
  }
  /**
   * Emit custom gallery events
   */
  emitGalleryEvent(t, e, s) {
    const n = new CustomEvent(e, { detail: s, bubbles: !0 });
    t.dispatchEvent(n);
  }
  /**
   * Announce image change to screen readers
   */
  announceImageChange(t, e, s) {
    const n = t.querySelector("[data-gallery-live]");
    if (n) {
      const a = t.querySelectorAll("[data-gallery-slide]")[e], o = a == null ? void 0 : a.querySelector("img"), c = `Showing ${(o == null ? void 0 : o.getAttribute("alt")) || `Image ${e + 1}`}, image ${e + 1} of ${s}`;
      n.textContent = c, setTimeout(() => {
        n.textContent === c && (n.textContent = "");
      }, 1e3);
    }
  }
  /**
   * Initialize error handling for gallery images
   */
  initializeImageErrorHandling(t) {
    t.querySelectorAll(".gallery-slide img").forEach((n) => {
      const i = n;
      i.complete || this.setImageLoadingState(i, !0), i.addEventListener("load", () => {
        this.setImageLoadingState(i, !1), this.setImageErrorState(i, !1);
      }), i.addEventListener("error", () => {
        this.setImageLoadingState(i, !1), this.setImageErrorState(i, !0), this.handleImageError(i, t), console.warn(`Failed to load gallery image: ${i.src}`);
      });
    }), t.querySelectorAll(".gallery-thumbnail img").forEach((n) => {
      const i = n;
      i.addEventListener("error", () => {
        this.setThumbnailErrorState(i, !0), console.warn(`Failed to load gallery thumbnail: ${i.src}`);
      });
    });
  }
  /**
   * Set loading state for an image
   */
  setImageLoadingState(t, e) {
    const s = t.closest(".gallery-slide");
    s && (e ? (s.classList.add("gallery-image-loading"), s.setAttribute("aria-busy", "true")) : (s.classList.remove("gallery-image-loading"), s.removeAttribute("aria-busy")));
  }
  /**
   * Set error state for an image
   */
  setImageErrorState(t, e) {
    const s = t.closest(".gallery-slide");
    if (s)
      if (e)
        s.classList.add("gallery-image-error"), s.setAttribute("aria-label", "Image failed to load"), s.querySelector(".gallery-error-placeholder") || this.createImageErrorPlaceholder(s);
      else {
        s.classList.remove("gallery-image-error"), s.removeAttribute("aria-label");
        const n = s.querySelector(".gallery-error-placeholder");
        n && n.remove();
      }
  }
  /**
   * Set error state for thumbnail images
   */
  setThumbnailErrorState(t, e) {
    const s = t.closest(".gallery-thumbnail");
    s && e && (s.classList.add("gallery-thumbnail-error"), t.style.display = "none", s.querySelector(".gallery-thumbnail-error-placeholder") || this.createThumbnailErrorPlaceholder(s));
  }
  /**
   * Create error placeholder for main images
   */
  createImageErrorPlaceholder(t) {
    const e = document.createElement("div");
    e.className = "gallery-error-placeholder absolute inset-0 flex items-center justify-center bg-surface border border-border rounded-lg", e.innerHTML = `
            <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-3 text-muted opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
                <p class="text-sm text-muted">Image failed to load</p>
            </div>
        `, t.appendChild(e);
  }
  /**
   * Create error placeholder for thumbnail images
   */
  createThumbnailErrorPlaceholder(t) {
    const e = document.createElement("div");
    e.className = "gallery-thumbnail-error-placeholder absolute inset-0 flex items-center justify-center bg-surface border border-border rounded text-muted", e.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
        `, t.appendChild(e);
  }
  /**
   * Preload adjacent images for smoother transitions
   */
  preloadAdjacentImages(t, e) {
    const s = parseInt(t.dataset.totalImages || "0"), n = t.dataset.loop === "true", i = [], a = e - 1;
    a >= 0 ? i.push(a) : n && s > 1 && i.push(s - 1);
    const o = e + 1;
    o < s ? i.push(o) : n && s > 1 && i.push(0), i.forEach((l) => {
      const c = t.querySelector(`[data-gallery-slide="${l}"]`);
      if (c) {
        const d = c.querySelector("img");
        if (d && d.src && !d.complete) {
          const f = new Image();
          f.src = d.src, f.onerror = () => {
            console.warn(`Failed to preload image: ${f.src}`);
          };
        }
      }
    });
  }
  /**
   * Handle image load errors with retry logic
   */
  handleImageError(t, e) {
    const s = parseInt(t.dataset.retryCount || "0");
    s < 2 ? (t.dataset.retryCount = (s + 1).toString(), setTimeout(() => {
      const i = t.src;
      t.src = "", t.src = i + "?retry=" + s;
    }, 1e3 * (s + 1))) : (this.checkGalleryHealth(e), this.announceAction(e, "Image failed to load"));
  }
  /**
   * Check if gallery has too many failed images
   */
  checkGalleryHealth(t) {
    const e = t.querySelectorAll(".gallery-slide img").length;
    t.querySelectorAll(".gallery-image-error").length > e / 2 && this.setGalleryErrorState(t, !0);
  }
  /**
   * Set error state for entire gallery
   */
  setGalleryErrorState(t, e) {
    e ? (t.classList.add("gallery-has-errors"), this.announceAction(t, "Gallery has loading issues. Some images may not be available.")) : t.classList.remove("gallery-has-errors");
  }
  /**
   * Clean up when gallery is removed
   */
  cleanup(t) {
    const e = document.querySelector(`[data-gallery-id="${t}"]`);
    if (!e) return;
    const s = this.getState(e);
    s != null && s.autoplayInterval && clearInterval(s.autoplayInterval), this.removeState(e);
  }
}
class Ya extends K {
  /**
   * Initialize popover elements - required by BaseActionClass
   */
  initializeElements() {
    h.findByDataAttribute("popover", "true").forEach((t) => {
      this.initializePopover(t);
    });
  }
  /**
   * Initialize a single popover element
   */
  initializePopover(t) {
    const s = {
      isOpen: !1,
      trigger: t.dataset.trigger || "click"
    };
    this.setState(t, s);
  }
  /**
   * Bind event listeners using event delegation - required by BaseActionClass
   */
  bindEventListeners() {
    x.handleDelegatedClick("[data-popover-trigger]", (t, e) => {
      e.preventDefault(), e.stopPropagation();
      const s = h.findClosest(t, '[data-popover="true"]');
      if (s && !this.isDisabled(s)) {
        const n = this.getState(s);
        (n == null ? void 0 : n.trigger) === "click" && this.togglePopover(s);
      }
    }), x.addEventListener(document, "mouseenter", (t) => {
      const e = h.findClosest(t.target, "[data-popover-trigger]");
      if (e) {
        const s = h.findClosest(e, '[data-popover="true"]');
        if (s && !this.isDisabled(s)) {
          const n = this.getState(s);
          (n == null ? void 0 : n.trigger) === "hover" && this.showPopover(s);
        }
      }
    }, { capture: !0 }), x.addEventListener(document, "mouseleave", (t) => {
      const e = h.findClosest(t.target, "[data-popover-trigger]");
      if (e) {
        const s = h.findClosest(e, '[data-popover="true"]');
        if (s && !this.isDisabled(s)) {
          const n = this.getState(s);
          (n == null ? void 0 : n.trigger) === "hover" && this.hidePopover(s);
        }
      }
    }, { capture: !0 }), x.addEventListener(document, "focus", (t) => {
      const e = h.findClosest(t.target, "[data-popover-trigger]");
      if (e) {
        const s = h.findClosest(e, '[data-popover="true"]');
        if (s && !this.isDisabled(s)) {
          const n = this.getState(s);
          (n == null ? void 0 : n.trigger) === "focus" && this.showPopover(s);
        }
      }
    }, { capture: !0 }), x.addEventListener(document, "blur", (t) => {
      const e = h.findClosest(t.target, "[data-popover-trigger]");
      if (e) {
        const s = h.findClosest(e, '[data-popover="true"]');
        if (s && !this.isDisabled(s)) {
          const n = this.getState(s);
          (n == null ? void 0 : n.trigger) === "focus" && this.hidePopover(s);
        }
      }
    }, { capture: !0 }), x.addEventListener(document, "click", (t) => {
      const e = t.target;
      e && e instanceof Element && (e.closest("[data-popover-trigger], [data-popover-panel]") || this.closeAllPopovers());
    }), x.addEventListener(document, "keydown", (t) => {
      t.key === "Escape" && this.closeAllPopovers();
    });
  }
  /**
   * Setup dynamic observer for new popovers - uses BaseActionClass utility
   */
  setupDynamicObserver() {
    this.createDynamicObserver((t) => {
      t.forEach((e) => {
        if (e.nodeType === Node.ELEMENT_NODE) {
          const s = e;
          h.hasDataAttribute(s, "popover", "true") && (this.hasState(s) || this.initializePopover(s)), h.findByDataAttribute("popover", "true", s).forEach((i) => {
            this.hasState(i) || this.initializePopover(i);
          });
        }
      });
    });
  }
  /**
   * Toggle popover open/closed state
   */
  togglePopover(t) {
    const e = this.getState(t);
    e && (e.isOpen ? this.hidePopover(t) : this.showPopover(t));
  }
  /**
   * Show popover
   */
  showPopover(t) {
    const e = this.getState(t);
    if (!e || this.isDisabled(t) || e.isOpen) return;
    this.clearTimeouts(e);
    const s = parseInt(t.dataset.delay || "0"), n = () => {
      this.closeSiblingPopovers(t), e.isOpen = !0, this.setState(t, e);
      const i = h.querySelector("[data-popover-panel]", t), a = h.querySelector("[data-popover-trigger]", t);
      i && (i.classList.remove("hidden"), this.positionPopover(t)), a && a.setAttribute("aria-expanded", "true"), this.dispatchPopoverEvent(t, "popover:show");
    };
    s > 0 ? (e.showTimeout = window.setTimeout(n, s), this.setState(t, e)) : n();
  }
  /**
   * Hide popover
   */
  hidePopover(t) {
    const e = this.getState(t);
    if (!e || !e.isOpen) return;
    this.clearTimeouts(e);
    const s = parseInt(t.dataset.hideDelay || "0"), n = () => {
      e.floating && (e.floating.cleanup(), e.floating = void 0), e.isOpen = !1, this.setState(t, e);
      const i = h.querySelector("[data-popover-panel]", t), a = h.querySelector("[data-popover-trigger]", t);
      i && i.classList.add("hidden"), a && a.setAttribute("aria-expanded", "false"), this.dispatchPopoverEvent(t, "popover:hide");
    };
    s > 0 ? (e.hideTimeout = window.setTimeout(n, s), this.setState(t, e)) : n();
  }
  /**
   * Close all open popovers
   */
  closeAllPopovers() {
    this.getAllStates().forEach((t, e) => {
      if (t.isOpen) {
        const s = e.dataset.closeOnOutsideClick !== "false", n = e.dataset.closeOnEscape !== "false";
        (s || n) && this.hidePopover(e);
      }
    });
  }
  /**
   * Close sibling popovers
   */
  closeSiblingPopovers(t) {
    this.getAllStates().forEach((e, s) => {
      s !== t && e.isOpen && this.hidePopover(s);
    });
  }
  /**
   * Position popover using FloatingManager
   */
  positionPopover(t) {
    const e = h.querySelector("[data-popover-panel]", t), s = h.querySelector("[data-popover-trigger]", t);
    if (!e || !s) return;
    const n = this.getState(t);
    if (!n) return;
    n.floating && n.floating.cleanup();
    const i = t.dataset.placement || "bottom", a = t.dataset.align || "center", o = parseInt(t.dataset.offset || "8");
    let l = i;
    i === "bottom" || i === "top" ? a === "start" ? l = `${i}-start` : a === "end" && (l = `${i}-end`) : (i === "left" || i === "right") && (a === "start" ? l = `${i}-start` : a === "end" && (l = `${i}-end`));
    const c = wt.getInstance().createFloating(s, e, {
      placement: l,
      offset: o,
      flip: {
        fallbackStrategy: "bestFit",
        padding: 8
      },
      shift: {
        padding: 8,
        crossAxis: !0
      },
      hide: {
        strategy: "escaped"
      },
      autoUpdate: {
        ancestorScroll: !0,
        ancestorResize: !0,
        elementResize: !0,
        layoutShift: !0
      }
    });
    n.floating = c, this.setState(t, n);
  }
  /**
   * Clear timeouts for a state
   */
  clearTimeouts(t) {
    t.showTimeout && (clearTimeout(t.showTimeout), t.showTimeout = void 0), t.hideTimeout && (clearTimeout(t.hideTimeout), t.hideTimeout = void 0);
  }
  /**
   * Check if popover is disabled
   */
  isDisabled(t) {
    return t.dataset.disabled === "true";
  }
  /**
   * Dispatch custom popover event
   */
  dispatchPopoverEvent(t, e, s = null) {
    x.dispatchCustomEvent(t, e, {
      popover: t,
      ...s
    }, {
      bubbles: !0
    });
  }
  /**
   * Clean up PopoverActions - extends BaseActionClass destroy
   */
  onDestroy() {
    this.getAllStates().forEach((t, e) => {
      this.clearTimeouts(t), t.floating && t.floating.cleanup();
    });
  }
  /**
   * Public API for manual control
   */
  showById(t) {
    const e = document.getElementById(t);
    e && h.hasDataAttribute(e, "popover", "true") && this.showPopover(e);
  }
  hideById(t) {
    const e = document.getElementById(t);
    e && h.hasDataAttribute(e, "popover", "true") && this.hidePopover(e);
  }
  toggleById(t) {
    const e = document.getElementById(t);
    e && h.hasDataAttribute(e, "popover", "true") && this.togglePopover(e);
  }
  hideAll() {
    this.closeAllPopovers();
  }
}
Ya.getInstance();
function ul() {
  ai.initialize(), la.getInstance().init(), ca.getInstance().init(), ua.getInstance().init(), ps.getInstance().init(), da.getInstance().init(), ms.getInstance().init(), ya.getInstance().init(), va.getInstance().init(), wa.getInstance().init(), vs.getInstance().init(), Sa.getInstance().init(), ws.getInstance().init(), xa.getInstance().init(), Ss.getInstance().init(), xs.getInstance().init(), As.getInstance().init(), Ga.getInstance().init(), Is.getInstance().init(), Ka.getInstance().init(), qc.getInstance().init(), Mc.getInstance().init(), Ya.getInstance().init();
}
const _b = {
  FormActions: la.getInstance(),
  AlertActions: ca.getInstance(),
  BadgeActions: ua.getInstance(),
  CalendarActions: ps.getInstance(),
  RadioActions: da.getInstance(),
  RangeActions: ms.getInstance(),
  SelectActions: ya.getInstance(),
  TabsActions: va.getInstance(),
  ModalActions: wa.getInstance(),
  ToastActions: vs.getInstance(),
  DropdownActions: Sa.getInstance(),
  TableActions: ws.getInstance(),
  ButtonGroupActions: xa.getInstance(),
  TooltipActions: Ss.getInstance(),
  TimePickerActions: xs.getInstance(),
  AccordionActions: As.getInstance(),
  EditorActions: Ga.getInstance(),
  DatePickerActions: Is.getInstance(),
  AddToCartActions: Ka.getInstance(),
  FileUploadActions: qc.getInstance(),
  GalleryActions: Mc.getInstance(),
  PopoverActions: Ya.getInstance(),
  init: ul,
  initialize: ul
  // Alias for consistency
};
typeof window < "u" && (window.KeysUI = _b);
export {
  As as AccordionActions,
  Ka as AddToCartActions,
  ca as AlertActions,
  ua as BadgeActions,
  K as BaseActionClass,
  xa as ButtonGroupActions,
  ps as CalendarActions,
  h as DOMUtils,
  Is as DatePickerActions,
  Sa as DropdownActions,
  Ga as EditorActions,
  x as EventUtils,
  qc as FileUploadActions,
  Bb as FloatingManager,
  la as FormActions,
  Mc as GalleryActions,
  wa as ModalActions,
  Ya as PopoverActions,
  ai as RTLUtils,
  da as RadioActions,
  ms as RangeActions,
  ya as SelectActions,
  ws as TableActions,
  va as TabsActions,
  xs as TimePickerActions,
  vs as ToastActions,
  Ss as TooltipActions,
  _b as default,
  ul as initializeKeysUI
};
