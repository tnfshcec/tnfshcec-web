import { scrollOffset } from "$lib/utils/scrollOffset";
import type { Action } from "svelte/action";

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

export type ActivityLabelOptions = {
  label: string;
  labelPosition: [number, number];
  pinPosition: [number, number];
};
export const activityLabel: Action<HTMLDivElement, ActivityLabelOptions> = (
  node,
  { label, labelPosition, pinPosition }
) => {
  // calculate line ends position
  // create svg
  // create line
  // create pin (the circle)
  // insert svg
  // create events (handle dragging)

  return {
    update: ({ label, labelPosition, pinPosition }) => {
      // do update
    }
  };
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

  fs.className = className ?? "";
  label.setAttribute("for", id);
  label.innerText = labelText;

  node.replaceWith(fs);
  fs.appendChild(label);
  fs.appendChild(node);

  return {
    update: ({ id, label: labelText, className }) => {
      node.placeholder = labelText;
      node.id = id;
      node.name = id;

      fs.className = className ?? "";
      label.setAttribute("for", id);
      label.innerText = labelText;
    }
  };
};
