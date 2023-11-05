import { scrollOffset } from "$lib/utils/scrollOffset";
import type { Action } from "svelte/action";

// TODO: smooth scroll with <a />
export const anchorScroll: Action<HTMLAnchorElement> = (node) => {
  node.addEventListener("click", (e) => {
    e.preventDefault();

    const selector = node.href.split("#").at(-1);
    const el = document.getElementById(selector ?? "");
    if (!el) return;

    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - scrollOffset(),
      behavior: "smooth"
    });
  });
};

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
