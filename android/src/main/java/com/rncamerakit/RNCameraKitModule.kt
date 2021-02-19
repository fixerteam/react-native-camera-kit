package com.rncamerakit

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.google.mlkit.vision.barcode.Barcode


class RNCameraKitModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  companion object {
    @JvmStatic
    val VALID_BARCODE_TYPES = mapOf(
        "aztec" to Barcode.FORMAT_AZTEC,
        "ean13" to Barcode.FORMAT_EAN_13,
        "ean8" to Barcode.FORMAT_EAN_8,
        "qr" to Barcode.FORMAT_QR_CODE,
        "pdf417" to Barcode.FORMAT_PDF417,
        "upc_e" to Barcode.FORMAT_UPC_E,
        "datamatrix" to Barcode.FORMAT_DATA_MATRIX,
        "code39" to Barcode.FORMAT_CODE_39,
        "code93" to Barcode.FORMAT_CODE_93,
        "itf14" to Barcode.FORMAT_ITF,
        "codabar" to Barcode.FORMAT_CODABAR,
        "code128" to Barcode.FORMAT_CODE_128,
        "upc_a" to Barcode.FORMAT_UPC_A
    )

    @JvmStatic
    val BARCODE_TYPES_TO_NAME = VALID_BARCODE_TYPES.entries.map { it.value to it.key }.toMap()
  }


  override fun getName(): String {
    return "RNCameraKitModule"
  }
}