import BIN from "bankcardinfo";

/**
 * 传入卡号，获取银行卡信息
 */
export function getBankInfo(cardNo) {
  return BIN.getBankBin(cardNo);
}
