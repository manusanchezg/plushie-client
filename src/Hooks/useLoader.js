import React from "react";

/**
 *
 * @param {React.component} component // component to render after the loading is set
 * @param {React.component} loader
 * @param {boolean} loading
 */
export default function useLoader(component, loader, loading) {
  if (!loading) {
    return component;
  } else {
    return loader;
  }
}
