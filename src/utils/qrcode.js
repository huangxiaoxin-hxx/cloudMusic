/**
 * 识别图片中的二维码
 * @param img 本地图片地址
 */
export async function scanQrcode(img) {
  return new Promise(function(resolve, reject) {
    // #ifdef APP-PLUS
    uni.compressImage({
      src: img,
      quality: 0,
      success: res => {
        plus.barcode.scan(
          res.tempFilePath,
          function(type, result) {
            resolve(result);
          },
          function(e) {
            console.log(e);
            reject("未识别到二维码！");
          }
        );
      }
    });
    // #endif

    //TODO 完善H5端的识别代码
    // #ifdef H5
    reject("暂不支持在H5中识别二维码！");
    // #endif
  });
}
