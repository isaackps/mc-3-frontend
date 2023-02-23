import { hasError } from ".";

describe("hasError", () => {
  it("should return true if given object has an 'error'", () => {
    const obj = {
      a: { error: true },
      b: { error: false },
      c: { error: false },
    };

    expect(hasError(obj)).toStrictEqual(true);
  });

  it("should return false if given object has no 'error'", () => {
    const obj = {
      a: { error: false },
      b: { error: false },
      c: { error: false },
    };

    expect(hasError(obj)).toStrictEqual(false);
  });

  it("should return false when given object doesn't have 'error' key", () => {
    const obj = {
      a: { errored: true },
      b: { errored: true },
      c: { errored: true },
    };

    expect(hasError(obj)).toStrictEqual(false);
  });
});
