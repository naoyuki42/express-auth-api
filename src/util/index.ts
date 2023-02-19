import { FAILED_TO_PARSE_NUMBER } from "../constants/Message";

/** 共通処理：文字列型の数字を数値型に変換 */
export const parseNumber = (stringNumber: string): number => {
  if (!!Number(stringNumber)) throw new Error(FAILED_TO_PARSE_NUMBER);
  return Number(stringNumber);
};
