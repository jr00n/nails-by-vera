/* @ds-bundle: {"format":3,"namespace":"NailsByVeraDesignSystem_5e657c","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"ArchFrame","sourcePath":"components/core/ArchFrame.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"ServiceCard","sourcePath":"components/core/ServiceCard.jsx"},{"name":"Sparkle","sourcePath":"components/core/Sparkle.jsx"},{"name":"StarRating","sourcePath":"components/core/StarRating.jsx"},{"name":"StatBlock","sourcePath":"components/core/StatBlock.jsx"},{"name":"TestimonialCard","sourcePath":"components/core/TestimonialCard.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"f407ed7dbb8e","components/core/ArchFrame.jsx":"5ea6c6564bc1","components/core/Button.jsx":"fb41ef0af3e9","components/core/Eyebrow.jsx":"5191b194698c","components/core/SectionHeading.jsx":"f3f2554c9c01","components/core/ServiceCard.jsx":"d1da698fb4fa","components/core/Sparkle.jsx":"35027a601823","components/core/StarRating.jsx":"b9641560c19a","components/core/StatBlock.jsx":"bf734233e005","components/core/TestimonialCard.jsx":"f559195c5a02","ui_kits/website/SectionsBottom.jsx":"9e58c65ffc75","ui_kits/website/SectionsTop.jsx":"fa2f98e3725f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NailsByVeraDesignSystem_5e657c = window.NailsByVeraDesignSystem_5e657c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Logo — typographic recreation of the Nails by Vera wordmark: the "NbV"
 * serif monogram, a hairline rule, and the "NAIL ARTIST" caption.
 * NOTE: this is a TYPESET stand-in. Replace with the real logo PNG
 * (NbyV-logo-black.png) when available — see readme ICONOGRAPHY.
 */
function Logo({
  size = 40,
  color,
  onDark = false,
  withCaption = true,
  style,
  ...rest
}) {
  const ink = color || (onDark ? 'var(--text-on-dark)' : 'var(--text-heading)');
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      color: ink,
      ...style
    },
    "aria-label": "Nails by Vera"
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-display-bold)',
      fontSize: size,
      lineHeight: 1,
      letterSpacing: '0.01em',
      display: 'inline-flex',
      alignItems: 'baseline'
    }
  }, "N", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.5,
      fontStyle: 'italic',
      margin: '0 0.02em',
      transform: 'translateY(-0.06em)',
      display: 'inline-block'
    }
  }, "b"), "V"), withCaption && /*#__PURE__*/React.createElement("span", {
    style: {
      paddingLeft: '12px',
      borderLeft: `1px solid ${onDark ? 'rgba(255,255,255,0.35)' : 'var(--border-soft)'}`,
      fontFamily: 'var(--font-body)',
      fontSize: size * 0.26,
      fontWeight: 'var(--fw-body-med)',
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      lineHeight: 1.3
    }
  }, "Nail", /*#__PURE__*/React.createElement("br", null), "Artist"));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/ArchFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ArchFrame — the signature arched image frame (rounded top, square base)
 * that holds nearly every photo on Nails by Vera. Renders an <img> when `src`
 * is given, otherwise a soft blush placeholder. An optional hairline "outline"
 * variant draws the thin arch stroke seen behind several photos.
 */
function ArchFrame({
  src,
  alt = '',
  width = '100%',
  height = 420,
  outline = false,
  placeholder = 'Foto',
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width,
      height,
      borderRadius: 'var(--radius-arch)',
      overflow: 'hidden',
      background: 'var(--bg-arch)',
      border: outline ? '1px solid var(--border-soft)' : 'none',
      boxShadow: outline ? 'none' : 'var(--shadow-soft)',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : children ? children : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      color: 'var(--rose-500)',
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontStyle: 'italic',
      background: 'linear-gradient(160deg, var(--blush-200), var(--blush-100))'
    }
  }, placeholder));
}
Object.assign(__ds_scope, { ArchFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ArchFrame.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — Nails by Vera actions.
 *  - primary: solid coral, white text (the main "Plan jouw NAILDATE" / "Boek nu" CTA)
 *  - outline: hairline border, ink text (quiet secondary)
 *  - link:    underlined-on-hover text link with a trailing arrow ("Alle behandelingen →")
 * Pill-ish soft corners; gentle lift on hover, no bounce.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  arrow = false,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const pad = size === 'lg' ? '16px 32px' : size === 'sm' ? '9px 18px' : '13px 26px';
  const fs = size === 'lg' ? '1rem' : size === 'sm' ? '0.8125rem' : '0.875rem';
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-body-med)',
    fontSize: fs,
    letterSpacing: 'var(--ls-button)',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    padding: pad,
    transition: 'transform var(--dur) var(--ease), background var(--dur) var(--ease), box-shadow var(--dur) var(--ease), color var(--dur) var(--ease)',
    transform: press ? 'translateY(0) scale(0.985)' : hover ? 'translateY(-2px)' : 'none',
    opacity: disabled ? 0.5 : 1,
    lineHeight: 1,
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: hover ? 'var(--accent-hover)' : 'var(--accent)',
      color: 'var(--text-on-coral)',
      boxShadow: hover ? 'var(--shadow-coral)' : '0 8px 18px -10px rgba(224,116,79,0.5)'
    },
    outline: {
      background: hover ? 'rgba(28,26,25,0.04)' : 'transparent',
      color: 'var(--text-heading)',
      border: '1px solid var(--border-hair)',
      borderRadius: 'var(--radius-pill)'
    },
    link: {
      background: 'transparent',
      color: 'var(--text-heading)',
      padding: '4px 0',
      borderRadius: 0,
      textTransform: 'uppercase'
    }
  };
  const linkUnderline = variant === 'link' ? {
    backgroundImage: 'linear-gradient(var(--accent), var(--accent))',
    backgroundRepeat: 'no-repeat',
    backgroundSize: hover ? '100% 1px' : '0% 1px',
    backgroundPosition: '0 100%',
    transition: 'background-size var(--dur) var(--ease), color var(--dur) var(--ease)',
    color: hover ? 'var(--accent)' : 'var(--text-heading)'
  } : null;
  const merged = {
    ...base,
    ...variants[variant],
    ...(linkUnderline || {}),
    ...style
  };
  const showArrow = arrow || variant === 'link';
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, children, showArrow && /*#__PURE__*/React.createElement("span", {
    style: {
      transition: 'transform var(--dur) var(--ease)',
      transform: hover ? 'translateX(4px)' : 'none',
      display: 'inline-block'
    }
  }, "\u2192"));
  const handlers = {
    onMouseEnter: () => !disabled && setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => !disabled && setPress(true),
    onMouseUp: () => setPress(false),
    onClick: disabled ? undefined : onClick
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: merged
    }, handlers, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    style: merged,
    disabled: disabled
  }, handlers, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — the small uppercase, wide-tracked dusty-rose label that sits
 * above almost every section heading on Nails by Vera ("WELKOM", "WAT WE DOEN").
 */
function Eyebrow({
  children,
  color,
  align = 'start',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-eyebrow)',
      fontWeight: 'var(--fw-body-med)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: color || 'var(--text-eyebrow)',
      textAlign: align === 'center' ? 'center' : 'left',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionHeading — the serif display title that anchors each page band,
 * optionally with an Eyebrow kicker above it. High-contrast Cormorant,
 * tight leading. Used everywhere: "Look good and feel even better", etc.
 */
function SectionHeading({
  children,
  eyebrow,
  eyebrowColor,
  size = 'h2',
  align = 'start',
  onDark = false,
  italic = false,
  style,
  ...rest
}) {
  const fsMap = {
    display: 'var(--fs-display)',
    h1: 'var(--fs-h1)',
    h2: 'var(--fs-h2)',
    h3: 'var(--fs-h3)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align === 'center' ? 'center' : 'left'
    }
  }, eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    align: align,
    color: eyebrowColor || (onDark ? 'rgba(255,255,255,0.7)' : undefined),
    style: {
      marginBottom: '14px'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", _extends({
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: fsMap[size],
      fontWeight: 'var(--fw-display)',
      fontStyle: italic ? 'italic' : 'normal',
      lineHeight: 'var(--lh-tight)',
      letterSpacing: 'var(--ls-display)',
      color: onDark ? 'var(--text-on-dark)' : 'var(--text-heading)',
      textWrap: 'balance',
      ...style
    }
  }, rest), children));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ServiceCard — a single treatment in the "Wat we doen" grid. Hairline-bordered,
 * sharp corners, an illustration/icon at the top, a serif title and body copy.
 * Lifts gently on hover. Pass an image/icon via `icon` (URL) or `children`.
 */
function ServiceCard({
  title,
  description,
  icon,
  children,
  href,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block',
      textDecoration: 'none',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hair)',
      borderRadius: 'var(--radius-sm)',
      padding: '36px 28px 32px',
      textAlign: 'center',
      transition: 'transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
      transform: hover ? 'translateY(-6px)' : 'none',
      boxShadow: hover ? 'var(--shadow-card)' : 'var(--shadow-xs)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 72,
      display: 'grid',
      placeItems: 'center',
      marginBottom: '18px'
    }
  }, icon ? /*#__PURE__*/React.createElement("img", {
    src: icon,
    alt: "",
    style: {
      height: 64,
      width: 'auto',
      objectFit: 'contain'
    }
  }) : children ? children : /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--blush-100)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--rose-500)',
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic'
    }
  }, "\u2726")), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 10px',
      fontFamily: 'var(--font-display)',
      fontSize: '1.5rem',
      fontWeight: 'var(--fw-display)',
      color: 'var(--text-heading)',
      lineHeight: 'var(--lh-snug)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-body-light)',
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, description));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Sparkle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sparkle — the small four-point gold sparkle/star sprinkled as decoration
 * across the site (beside headings, around photos). Purely ornamental.
 */
function Sparkle({
  size = 18,
  color,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    style: {
      display: 'inline-block',
      verticalAlign: 'middle',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: "M12 0c.7 5.9 5.4 10.6 11.3 11.3v.4C17.4 12.4 12.7 17.1 12 23h-.4C10.9 17.1 6.2 12.4.3 11.7v-.4C6.2 10.6 10.9 5.9 11.6 0z",
    fill: color || 'var(--gold)'
  }));
}
Object.assign(__ds_scope, { Sparkle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Sparkle.jsx", error: String((e && e.message) || e) }); }

// components/core/StarRating.jsx
try { (() => {
/**
 * StarRating — the gold five-star row used for Google reviews / testimonials.
 * Solid gold filled stars; supports partials and a label.
 */
function StarRating({
  value = 5,
  max = 5,
  size = 18,
  label,
  color,
  style
}) {
  const fill = color || 'var(--gold)';
  const empty = 'rgba(199,162,78,0.28)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: '3px'
    },
    "aria-label": `${value} van ${max}`
  }, Array.from({
    length: max
  }).map((_, i) => {
    const pct = Math.max(0, Math.min(1, value - i));
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: 'relative',
        display: 'inline-block',
        width: size,
        height: size,
        lineHeight: 0
      }
    }, /*#__PURE__*/React.createElement(Star, {
      size: size,
      color: empty
    }), pct > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 0,
        width: `${pct * 100}%`,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(Star, {
      size: size,
      color: fill
    })));
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-caption)',
      letterSpacing: '0.04em',
      color: 'var(--text-muted)'
    }
  }, label));
}
function Star({
  size,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: color,
    "aria-hidden": "true",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2.4l2.6 6.3 6.8.5-5.2 4.4 1.6 6.6L12 17.2 6.2 20.8l1.6-6.6L2.6 9.8l6.8-.5z"
  }));
}
Object.assign(__ds_scope, { StarRating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StarRating.jsx", error: String((e && e.message) || e) }); }

// components/core/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatBlock — the oversized serif figure + label pair, split by a thin rule,
 * used for proof points like "7 dagen | 100% nagel garantie".
 */
function StatBlock({
  value,
  label,
  align = 'row',
  onDark = false,
  style,
  ...rest
}) {
  const row = align === 'row';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: row ? 'row' : 'column',
      alignItems: row ? 'center' : 'flex-start',
      gap: row ? '24px' : '10px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-stat)',
      fontWeight: 'var(--fw-display)',
      lineHeight: 1,
      color: onDark ? 'var(--text-on-dark)' : 'var(--text-heading)',
      whiteSpace: 'nowrap'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: 'stretch',
      borderLeft: row ? '1px solid var(--border-soft)' : 'none',
      paddingLeft: row ? '24px' : 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-body-light)',
      fontSize: 'var(--fs-sm)',
      letterSpacing: '0.02em',
      color: onDark ? 'rgba(255,255,255,0.85)' : 'var(--text-body)',
      maxWidth: row ? 160 : 'none'
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/TestimonialCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TestimonialCard — a customer review: gold stars, the quote in body copy,
 * a serif name and a muted "x maanden geleden" timestamp. Quiet hairline card.
 */
function TestimonialCard({
  quote,
  name,
  meta,
  rating = 5,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hair)',
      borderRadius: 'var(--radius-sm)',
      padding: '32px 30px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      textAlign: 'center',
      alignItems: 'center',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.StarRating, {
    value: rating,
    size: 16
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-body-light)',
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, quote), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontWeight: 'var(--fw-display)',
      color: 'var(--text-heading)'
    }
  }, name), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)',
      marginTop: '4px',
      letterSpacing: '0.02em'
    }
  }, meta)));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SectionsBottom.jsx
try { (() => {
/* Nails by Vera — homepage recreation, lower sections */
const NbV2 = window.NailsByVeraDesignSystem_5e657c;
const {
  Button,
  Eyebrow,
  SectionHeading,
  StarRating,
  Sparkle,
  ServiceCard,
  TestimonialCard,
  ArchFrame
} = NbV2;
const {
  Photo
} = window.NbVSections;
const SERVICES = [['Versteviging', 'Nagelversteviging biedt jouw nagels de extra stevigheid die ze nodig hebben om te groeien zonder kans op splijten of breken!'], ['Verlenging', 'Wanneer je gelijk wilt genieten van lange nagels, kan je kiezen voor een nagelverlenging.'], ['Natural nails', 'Diverse behandelingen zonder product op de nagels óf ga voor een kleurtje zonder extra versteviging.'], ['Nail art', 'De keuze in nail art is erg divers. Van minimale nail art tot de meest uitgesproken kunst!']];
function Services() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 620,
      margin: '0 auto 56px'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Wat we doen",
    align: "center",
    size: "h1"
  }, "Profesioneel nagelstyliste"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '18px auto 0',
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, "Een breed scala aan behandelingen uitgevoerd door een professioneel nagelstyliste. Neem een kijkje hieronder voor welke behandeling het beste bij je past.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 20
    }
  }, SERVICES.map(([t, d], i) => /*#__PURE__*/React.createElement(ServiceCard, {
    key: t,
    title: t,
    description: d,
    style: {
      marginTop: i % 2 ? 28 : 0
    }
  })))));
}
function Coffee() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--bg-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 'clamp(32px,5vw,72px)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(ArchFrame, {
    height: 400,
    placeholder: "Koffie & nagels"
  }), /*#__PURE__*/React.createElement(Sparkle, {
    size: 20,
    style: {
      position: 'absolute',
      bottom: 24,
      right: -8
    },
    color: "var(--gold-400)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Nails & coffee",
    size: "h1"
  }, "Enjoy your coffee"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 12px',
      maxWidth: 460,
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, "Tijdens je behandeling kan je ook heerlijk genieten van een lekkere luxe koffie of thee! Zo wordt je nagelafspraak n\xF3g leuker!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 26px',
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 19,
      color: 'var(--text-heading)'
    }
  }, "Jij hebt wel een ontspan-momentje verdiend!"), /*#__PURE__*/React.createElement(Button, {
    variant: "link"
  }, "Alle behandelingen"))));
}
function FeatureBand() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--bg-feature)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: '0 auto',
      padding: 'clamp(56px,8vw,104px) var(--gutter)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    align: "center",
    size: "h1"
  }, "Genieten van de perfecte nagels?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 460,
      color: 'rgba(255,255,255,0.82)',
      fontWeight: 300,
      fontSize: 'var(--fs-body)',
      lineHeight: 1.6
    }
  }, "Er zijn meerdere behandelingen beschikbaar bij Nails by Vera. Zo zit er altijd wat tussen wat bij jou past!"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "Boek nu"))));
}
const REVIEWS = [['Dit was voor mij de eerste keer dat ik mijn nagels liet verlengen. Ik vind ze prachtig geworden en krijg vele complimenten. Vera is een lieve vakkundige dame waar de tijd zo voorbij is. Zeker voor herhaling vatbaar!', 'Angelique Luijkman', '7 maanden geleden'], ['Vera is super aardig en geweldig met nail art. Je krijgt goed advies en verlaat de salon met prachtige nagels.', 'Sandra Kamst', '8 maanden geleden']];
function Reviews() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 580,
      margin: '0 auto 48px'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Reviews",
    align: "center",
    size: "h1"
  }, "Wat klanten zeggen"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '18px auto 0',
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, "Benieuwd naar wat onze klanten zeggen? Lees de enthousiaste feedback van tevreden klanten die hun nagels bij Nails by Vera laten verzorgen.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, REVIEWS.map(([q, n, m]) => /*#__PURE__*/React.createElement(TestimonialCard, {
    key: n,
    quote: q,
    name: n,
    meta: m,
    rating: 5
  })))));
}
function PhotoGrid() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 0
    }
  }, Array.from({
    length: 6
  }).map((_, i) => /*#__PURE__*/React.createElement(Photo, {
    key: i,
    label: "nagel foto",
    h: 300,
    r: 0
  })));
}
function RouteCTA() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      textAlign: 'center',
      padding: 'var(--section-y) var(--gutter)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    align: "center",
    style: {
      marginBottom: 14
    }
  }, "Boek jouw afspraak"), /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    size: "h1"
  }, "Plan jouw route"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px auto 28px',
      maxWidth: 420,
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      color: 'var(--text-body)'
    }
  }, "Bekijk de route naar de salon en plan gauw jouw afspraak!"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "Route beschrijving"));
}
function Footer() {
  const {
    Logo
  } = NbV2;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--bg-soft)',
      borderTop: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '28px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 30
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "\xA92026 Nails by Vera. All rights reserved.")));
}
window.NbVSections2 = {
  Services,
  Coffee,
  FeatureBand,
  Reviews,
  PhotoGrid,
  RouteCTA,
  Footer
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SectionsBottom.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SectionsTop.jsx
try { (() => {
/* Nails by Vera — homepage recreation (UI kit)
 * Composes the design-system primitives into the real page structure.
 * Photography uses blush ArchFrame/placeholder blocks — drop in real images
 * (see readme ICONOGRAPHY for the asset list).
 */
const NbV = window.NailsByVeraDesignSystem_5e657c;
const {
  Logo,
  Button,
  Eyebrow,
  SectionHeading,
  StarRating,
  StatBlock,
  Sparkle,
  ServiceCard,
  TestimonialCard,
  ArchFrame
} = NbV;
const NAV = ['Home', 'Over mij', 'Portfolio', 'Behandelingen', 'Prijzen', 'Contact'];

/* Soft blush photo placeholder */
function Photo({
  label = 'foto',
  h = 240,
  r = 'var(--radius-lg)',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: h,
      borderRadius: r,
      overflow: 'hidden',
      background: 'linear-gradient(155deg, var(--blush-200), var(--blush-100) 70%, #fff)',
      border: '1px solid var(--border-soft)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--rose-500)',
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 18,
      ...style
    }
  }, label);
}
function Header() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'rgba(255,246,242,0.86)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '16px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 34
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 30
    }
  }, NAV.map((n, i) => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: "#",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      textDecoration: 'none',
      color: i === 0 ? 'var(--text-heading)' : 'var(--text-body)',
      fontWeight: i === 0 ? 500 : 400
    }
  }, n))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Plan jouw naildate")));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'clamp(40px,7vw,96px) var(--gutter)',
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 'clamp(32px,5vw,72px)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 18
    }
  }, "Nails by Vera"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 'var(--fs-display)',
      lineHeight: 1.02,
      color: 'var(--text-heading)'
    }
  }, "\u201CNail care is ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "self care"), "\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '22px 0 30px',
      maxWidth: 440,
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: 'var(--fs-lead)',
      lineHeight: 1.6,
      color: 'var(--text-body)'
    }
  }, "Jouw nagels spreken als jouw persoonlijke visitekaartje. Geef jouw zelfvertrouwen een boost met die prachtige nagels!"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "Plan jouw naildate"), /*#__PURE__*/React.createElement(Button, {
    variant: "link"
  }, "Alle behandelingen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    label: "",
    h: 92,
    style: {
      width: 92,
      borderRadius: '999px'
    }
  }), /*#__PURE__*/React.createElement(Photo, {
    label: "",
    h: 92,
    style: {
      width: 92,
      borderRadius: '999px'
    }
  }), /*#__PURE__*/React.createElement(Photo, {
    label: "",
    h: 92,
    style: {
      width: 92,
      borderRadius: '999px'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Sparkle, {
    size: 26,
    style: {
      position: 'absolute',
      top: -6,
      left: -10
    }
  }), /*#__PURE__*/React.createElement(Sparkle, {
    size: 16,
    style: {
      position: 'absolute',
      bottom: 30,
      right: -6
    },
    color: "var(--gold-400)"
  }), /*#__PURE__*/React.createElement(ArchFrame, {
    height: 460,
    placeholder: "Hero foto"
  }))));
}
function Welcome() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--bg-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      display: 'grid',
      gridTemplateColumns: '0.85fr 1.15fr',
      gap: 'clamp(32px,5vw,72px)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(ArchFrame, {
    height: 420,
    placeholder: "Nagellak foto"
  }), /*#__PURE__*/React.createElement(Sparkle, {
    size: 22,
    style: {
      position: 'absolute',
      top: -10,
      right: 20
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Welkom",
    size: "h1"
  }, "Look good and feel even better"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 24px',
      maxWidth: 520,
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, "Bij Nails by Vera, jouw priv\xE9 nagelsalon, draait alles om jou! Verwen jezelf met onze luxe nagelbehandelingen en stap de deur uit met een stralende glimlach en prachtige, gezonde nagels. Kun je niet kiezen? Geen zorgen, ik geef je graag persoonlijk advies!"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 16,
      color: 'var(--text-body)',
      maxWidth: 150
    }
  }, "Gevestigd in Hengelo, Overijssel"), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 28,
      borderLeft: '1px solid var(--border-soft)'
    }
  }, /*#__PURE__*/React.createElement(StarRating, {
    value: 5,
    label: "Google reviews"
  }))))));
}
function Garantie() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 'clamp(32px,5vw,72px)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Top kwaliteit",
    eyebrowColor: "var(--gold)",
    size: "h1"
  }, "100% Nagel Garantie"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 16px',
      maxWidth: 480,
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, "Bij Nails by Vera geloven wij in perfecte nagels en tevreden klanten! Daarom geldt er een 100% nagel garantie in de eerste week. Ben je niet helemaal tevreden? Geen zorgen, ik sta klaar om het voor je op te lossen."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "7 dagen",
    label: "100% nagel garantie"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(ArchFrame, {
    height: 400,
    placeholder: "Salon foto",
    outline: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 24,
      right: 18,
      width: 84,
      height: 84,
      borderRadius: '999px',
      border: '1px dashed var(--gold-400)',
      color: 'var(--gold-600)',
      display: 'grid',
      placeItems: 'center',
      fontSize: 9,
      textAlign: 'center',
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      background: 'rgba(255,246,242,.7)'
    }
  }, "100% garantie"))));
}
window.NbVSections = {
  Photo,
  Header,
  Hero,
  Welcome,
  Garantie
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SectionsTop.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.ArchFrame = __ds_scope.ArchFrame;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.Sparkle = __ds_scope.Sparkle;

__ds_ns.StarRating = __ds_scope.StarRating;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

})();
