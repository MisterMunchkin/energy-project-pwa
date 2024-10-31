/**
 * Allows creating component props that takes an object of dynamic
 * properties to configure styles and allow for more generic, and un-opinionated components to be built.
 *
 * I personally think this is one of the reasons why tailwind is so powerful..., Instead of
 * !important overwriting css because maybe you need padding to be 15px instead of the configured 8px,
 * you can just overwrite it by allowing a generic component to be overwitten optionally.
 *
 * best of both worlds, explicitly create strict style for a component but allow it to be customized by the developer using it if needed. highly customizable components but can still be used as is.
 *
 * @example classNames?: ClassValues<"container" | "label" | "field" | "error">
 *
 * see SelectField.tsx line 15
 */
export type ClassValues<T extends string> = Partial<{
  [K in T]: string | boolean | undefined | null | 0;
}>;
