
import { getContext, hasContext, setContext } from "svelte";

/**
 * Get value from a `ContextStore`, which is created for each user, and save for SSR.
 *
 * Implementation by Brendan Matkin, on `dev.to`.
 * @see {@link https://dev.to/brendanmatkin/safe-sveltekit-stores-for-ssr-5a0h}
 */
export const useContextStore = <T, TStore>(
    name: string,
    fn: (value?: T) => TStore,
    defaultValue?: T,
): TStore => {
  // INFO: `TStore` is not constrained to `Readable<T>`, to be more flexible (with the objects)
    if (hasContext(name)) {
        return getContext<TStore>(name);
    }
    const _value = fn(defaultValue);
    setContext(name, _value);
    return _value;
};
