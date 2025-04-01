// src/shared/Either.ts

export type Left<L> = { kind: "left"; leftValue: L };
export type Right<R> = { kind: "right"; rightValue: R };
export type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
  private constructor(private readonly value: EitherValue<L, R>) {}

  static left<L, R>(value: L): Either<L, R> {
    return new Either<L, R>({ kind: "left", leftValue: value });
  }

  static right<L, R>(value: R): Either<L, R> {
    return new Either<L, R>({ kind: "right", rightValue: value });
  }

  isLeft(): boolean {
    return this.value.kind === "left";
  }

  isRight(): boolean {
    return this.value.kind === "right";
  }

  fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
        switch (this.value.kind) {
        case "left":
            return leftFn(this.value.leftValue);
        case "right":
            return rightFn(this.value.rightValue);
        }
    }
}
