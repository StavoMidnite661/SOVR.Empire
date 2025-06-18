"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileArchive, CheckCircle, XCircle, AlertCircle, Download } from "lucide-react"

export default function ZipInstaller() {
  const [file, setFile] = useState<File | null>(null)
  const [installing, setInstalling] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"idle" | "uploading" | "extracting" | "installing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/zip") {
      setFile(selectedFile)
      setStatus("idle")
      setErrorMessage("")
    } else {
      setErrorMessage("Please select a valid ZIP file")
      setStatus("error")
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "application/zip") {
      setFile(droppedFile)
      setStatus("idle")
      setErrorMessage("")
    } else {
      setErrorMessage("Please drop a valid ZIP file")
      setStatus("error")
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const simulateInstallation = async () => {
    if (!file) return

    setInstalling(true)
    setProgress(0)
    setStatus("uploading")

    // Simulate upload
    for (let i = 0; i <= 30; i++) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    setStatus("extracting")
    // Simulate extraction
    for (let i = 30; i <= 60; i++) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 80))
    }

    setStatus("installing")
    // Simulate installation
    for (let i = 60; i <= 100; i++) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setStatus("success")
    setInstalling(false)
  }

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "uploading":
      case "extracting":
      case "installing":
        return <AlertCircle className="h-5 w-5 text-blue-500 animate-pulse" />
      default:
        return <FileArchive className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "uploading":
        return "Uploading ZIP file..."
      case "extracting":
        return "Extracting files..."
      case "installing":
        return "Installing application..."
      case "success":
        return "Installation completed successfully!"
      case "error":
        return "Installation failed"
      default:
        return "Ready to install"
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-6 w-6" />
            ZIP Installer
          </CardTitle>
          <CardDescription>Upload and install software from ZIP archives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Drop your ZIP file here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
            <Button variant="outline" size="sm">
              Select ZIP File
            </Button>
            <input ref={fileInputRef} type="file" accept=".zip" onChange={handleFileSelect} className="hidden" />
          </div>

          {/* Selected File Info */}
          {file && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileArchive className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">ZIP Archive</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Installation Progress */}
          {(installing || status === "success") && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon()}
                  <span className="font-medium">{getStatusText()}</span>
                </div>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground">{progress}% complete</p>
              </CardContent>
            </Card>
          )}

          {/* Error Message */}
          {status === "error" && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {status === "success" && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Installation completed successfully! The application is now ready to use.
              </AlertDescription>
            </Alert>
          )}

          {/* Install Button */}
          <div className="flex gap-3">
            <Button
              onClick={simulateInstallation}
              disabled={!file || installing || status === "success"}
              className="flex-1"
            >
              {installing ? "Installing..." : "Install from ZIP"}
            </Button>
            {file && (
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null)
                  setStatus("idle")
                  setProgress(0)
                  setErrorMessage("")
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                  }
                }}
              >
                Clear
              </Button>
            )}
          </div>

          {/* Installation Steps */}
          <div className="space-y-2">
            <h4 className="font-medium">Installation Process:</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${progress > 0 ? "bg-blue-500" : "bg-muted"}`} />
                Upload ZIP file
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${progress > 30 ? "bg-blue-500" : "bg-muted"}`} />
                Extract archive contents
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${progress > 60 ? "bg-blue-500" : "bg-muted"}`} />
                Install application files
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${progress === 100 ? "bg-green-500" : "bg-muted"}`} />
                Complete installation
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
