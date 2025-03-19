import React from "react";

export function List({ children }) {
  return <ul className="list-disc list-inside">{children}</ul>;
}

export function ListItem({ children }) {
  return <li className="mb-2">{children}</li>;
}

export function ListIcon({ as: Icon }) {
  return (
    <span className="inline-flex items-center mr-2">
      <Icon className="w-4 h-4" />
    </span>
  );
}
