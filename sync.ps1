param(
  [string]$Source = "D:\Source Codes\Zero\freestreamingsite\freestreamingsite\freestreamingsite\wwwroot\data"
)
if (-not (Test-Path $Source)) { Write-Host "Source not found: $Source"; exit 1 }
$dest = Join-Path $PSScriptRoot "data"
if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
Copy-Item $Source $dest -Recurse -Force
Write-Host "Copied $Source -> $dest"
node (Join-Path $PSScriptRoot "update.js")
Write-Host "Regenerated pages. Done."