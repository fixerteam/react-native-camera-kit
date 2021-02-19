package com.rncamerakit

import android.annotation.SuppressLint
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import com.google.mlkit.vision.barcode.BarcodeScannerOptions
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.common.InputImage

class QRCodeAnalyzer(
    private val options: BarcodeScannerOptions?,
    private val onBarCodeDetected: (barcode: Pair<String, Int>) -> Unit
) : ImageAnalysis.Analyzer {
  @SuppressLint("UnsafeExperimentalUsageError")
  override fun analyze(image: ImageProxy) {
    val inputImage = InputImage.fromMediaImage(image.image!!, image.imageInfo.rotationDegrees)

    val scanner = if (options != null) BarcodeScanning.getClient(options) else BarcodeScanning.getClient()
    scanner.process(inputImage)
        .addOnSuccessListener { barcodes ->
          barcodes.forEach { barcode ->
            if (!barcode.rawValue.isNullOrEmpty()) {
              onBarCodeDetected(barcode.rawValue!! to barcode.format)
              return@forEach
            }
          }
        }
        .addOnCompleteListener {
          image.close()
        }
  }
}