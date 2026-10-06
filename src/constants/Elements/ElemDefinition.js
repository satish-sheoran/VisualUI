// THIS FILE DESCRIBES WHICH TAG CAN BE INSERTED AND THE OBJECT WHICH WILL BE THEN PASSED TO CANVAS...
// constants/elements.js
export const ELEMENTS = [
  // ─────────────────────────────
  // Basic / Layout
  // ─────────────────────────────
  {
    id: "div",
    type: 'container',
    name: "Container",
    tag: "div",
    icon: "Square",
    category: "basic",
    description: "A generic container used to group and organize elements.",
  },
  {
    id: "nav",
    type: 'container',
    name: "Navigation",
    tag: "nav",
    icon: "Compass",
    category: "basic",
    description: "A section containing navigation links.",
  },
  {
    id: "footer",
    type: 'container',
    name: "Footer",
    tag: "footer",
    icon: "Dock",
    category: "basic",
    description: "A footer for a page or section.",
  },

  // ─────────────────────────────
  // Text
  // ─────────────────────────────
  {
    id: "heading",
    name: "Heading",
    type: 'text',
    tag: "h1",
    defaultVariant: 'h1',
    icon: "Heading",
    category: "text",
    description: "A heading used to introduce a section or topic.",
    variants: [
      { id: "h1", name: "Heading 1", tag: "h1", icon: "Heading1" },
      { id: "h2", name: "Heading 2", tag: "h2", icon: "Heading2" },
      { id: "h3", name: "Heading 3", tag: "h3", icon: "Heading3" },
      { id: "h4", name: "Heading 4", tag: "h4", icon: "Heading4" },
      { id: "h5", name: "Heading 5", tag: "h5", icon: "Heading5" },
      { id: "h6", name: "Heading 6", tag: "h6", icon: "Heading6" },
    ],
  },
  {
    id: "paragraph",
    name: "Paragraph",
    tag: "p",
    type: 'text',
    icon: "Text",
    category: "text",
    description: "A block of text used for paragraphs and longer content.",
  },
  {
    id: "span",
    name: "Text",
    type: 'text',
    tag: "span",
    icon: "Type",
    category: "text",
    description: "An inline element used to style or group a small piece of text.",
  },

  // ─────────────────────────────
  // Forms
  // ─────────────────────────────
  {
    id: "input",
    name: "Input",
    tag: "input",
    type: 'input',
    icon: "FormInput",
    category: "forms",
    defaultVariant: 'text',
    description: "A field used to collect information from the user.",
    variants: [
      {
        id: "text",
        name: "Text",
        tag: "input",
        icon: "CaseSensitive",
        attributes: { type: "text", placeholder: 'Enter Text' },
      },
      // {
      //   id: "email",
      //   name: "Email",
      //   tag: "input",
      //   icon: "Mail",
      //   attributes: { type: "email" },
      // },
      // {
      //   id: "password",
      //   name: "Password",
      //   tag: "input",
      //   icon: "LockKeyhole",
      //   attributes: { type: "password" },
      // },
      // {
      //   id: "number",
      //   name: "Number",
      //   tag: "input",
      //   icon: "Binary",
      //   attributes: { type: "number" },
      // },
      // {
      //   id: "search",
      //   name: "Search",
      //   tag: "input",
      //   icon: "Search",
      //   attributes: { type: "search" },
      // },
      // {
      //   id: "tel",
      //   name: "Phone",
      //   tag: "input",
      //   icon: "Phone",
      //   attributes: { type: "tel" },
      // },
      // {
      //   id: "url",
      //   name: "URL",
      //   tag: "input",
      //   icon: "Link2",
      //   attributes: { type: "url" },
      // },
      // {
      //   id: "date",
      //   name: "Date",
      //   tag: "input",
      //   icon: "Calendar",
      //   attributes: { type: "date" },
      // },
      // {
      //   id: "time",
      //   name: "Time",
      //   tag: "input",
      //   icon: "Clock",
      //   attributes: { type: "time" },
      // },
      // {
      //   id: "color",
      //   name: "Color",
      //   tag: "input",
      //   icon: "Palette",
      //   attributes: { type: "color" },
      // },
      {
        id: "range",
        name: "Range",
        tag: "input",
        icon: "SlidersHorizontal",
        attributes: { type: "range", defaultValue: 50, min: 0, max: 100 },
      },
      // {
      //   id: "checkbox",
      //   name: "Checkbox",
      //   tag: "input",
      //   icon: "SquareCheck",
      //   attributes: { type: "checkbox" },
      // },
      // {
      //   id: "radio",
      //   name: "Radio",
      //   tag: "input",
      //   icon: "CircleDot",
      //   attributes: { type: "radio" },
      // },
      // {
      //   id: "file",
      //   name: "File",
      //   tag: "input",
      //   icon: "FileUp",
      //   attributes: { type: "file" },
      // },
    ],
  },
];



{/*
  {
  
  id : '',
type : 'heading',
tag : 'h2',
content : '',


  }
  */}
