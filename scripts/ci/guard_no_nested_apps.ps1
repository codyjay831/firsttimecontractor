$found = Get-ChildItem -Recurse -Filter package.json -File |
  Where-Object { $_.FullName -notmatch "\\node_modules\\" -and $_.FullName -notmatch "\\.next\\" } |
  Where-Object { $_.FullName -ne (Join-Path (Get-Location) "package.json") } |
  Select-Object -First 1

if ($found) {
  Write-Host "❌ Nested package.json found at: $($found.FullName)"
  exit 1
}

Write-Host "✅ No nested apps found."
