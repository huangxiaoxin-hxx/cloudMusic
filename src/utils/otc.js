/**
 * 获取撮合交易状态
 * @param {number} status
 */
export function getTradeStatusText(status, _this) {
  let text = "";
  switch (status) {
    case -1:
      text = _this.$t("otc.order.status.fail_to_return");
      break;
    case 0:
      text = _this.$t("otc.order.status.pending_payment");
      break;
    case 1:
      text = _this.$t("otc.order.status.pending_payment");
      break;
    case 2:
      text = _this.$t("otc.order.status.paid");
      break;
    case 3:
      text = _this.$t("otc.order.status.transaction_complate");
      break;
    case 8:
      text = _this.$t("otc.order.status.complaining");
      break;
    case 9:
      text = _this.$t("otc.order.status.complaining");
      break;
    case 10:
      text = _this.$t("common.status.cancelled");
      break;
    default:
      break;
  }
  return text;
}
