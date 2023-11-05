import type { Action } from "svelte/action";

// TODO: smooth scroll with <a />

export const withIcon: Action = (node) => {
  // NOTE: may need tailwind-merge
  node.classList.add("flex", "items-center", "gap-2");
};

export const editField: Action<
  HTMLInputElement,
  { id: string; label: string; className?: string }
> = (node, { id, label: labelText, className }) => {
  const fs = document.createElement("fieldset");
  const label = document.createElement("label");

  node.placeholder = labelText;
  node.id = id;
  node.name = id;

  fs.className = className;
  label.setAttribute("for", id);
  label.innerText = labelText;

  node.replaceWith(fs);
  fs.appendChild(label);
  fs.appendChild(node);
};
