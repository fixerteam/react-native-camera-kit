package com.rncamerakit

import android.graphics.Color
import android.util.Log
import androidx.annotation.ColorInt
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableType
import com.facebook.react.common.MapBuilder
import com.facebook.react.common.ReactConstants.TAG
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.google.mlkit.vision.barcode.BarcodeScannerOptions
import com.rncamerakit.RNCameraKitModule.Companion.VALID_BARCODE_TYPES


class CKCameraManager : SimpleViewManager<CKCamera>() {

  override fun getName(): String {
    return "CKCameraManager"
  }

  override fun createViewInstance(context: ThemedReactContext): CKCamera {
    return CKCamera(context)
  }

  override fun receiveCommand(view: CKCamera, commandId: String?, args: ReadableArray?) {
    var logCommand = "CameraManager received command $commandId("
    for (i in 0..(args?.size() ?: 0)) {
      if (i > 0) {
        logCommand += ", "
      }
      logCommand += when (args?.getType(0)) {
        ReadableType.Null -> "Null"
        ReadableType.Array -> "Array"
        ReadableType.Boolean -> "Boolean"
        ReadableType.Map -> "Map"
        ReadableType.Number -> "Number"
        ReadableType.String -> "String"
        else -> ""
      }
    }
    logCommand += ")"
    Log.d(TAG, logCommand)
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
    return MapBuilder.of("onReadCode", MapBuilder.of("registrationName", "onReadCode"))
  }

  @ReactProp(name = "showFrame")
  fun setShowFrame(view: CKCamera, enabled: Boolean) {
    view.setShowFrame(enabled)
  }

  @ReactProp(name = "barCodeTypes")
  fun setBarCodeTypes(view: CKCamera, barCodeTypes: ReadableArray?) {
    if (barCodeTypes == null) {
      return
    }
    val builder = BarcodeScannerOptions.Builder()
    val newBarCodeTypes = barCodeTypes.toArrayList().map { VALID_BARCODE_TYPES.getValue(it.toString()) }
    var barcodeFormats = 0
    for (code in newBarCodeTypes) {
      barcodeFormats = barcodeFormats or code
    }
    builder.setBarcodeFormats(barcodeFormats)
    view.setSupportedBarCodes(builder.build())
  }

  @ReactProp(name = "laserColor", defaultInt = Color.RED)
  fun setLaserColor(view: CKCamera, @ColorInt color: Int) {
    view.setLaserColor(color)
  }

  @ReactProp(name = "frameColor", defaultInt = Color.WHITE)
  fun setFrameColor(view: CKCamera, @ColorInt color: Int) {
    view.setFrameColor(color)
  }
}