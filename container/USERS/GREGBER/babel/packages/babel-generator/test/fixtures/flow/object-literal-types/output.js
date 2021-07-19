type U = {};
type V = {};
type T = { ...U
};
type T = { ...U,
  ...V,
};
type T = {
  p: V,
  ...U,
};
type T = { ...U,
  p: V,
};
type T = { ...{} | {
    p: V
  }
};
type T = {
  foo(): number
};
type T = {
  foo: () => number
};
type T = {
  [string]: U
};
type T = {
  [param: string]: U
};