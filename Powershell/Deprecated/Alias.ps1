Set-Location -Path "~TOP_DIR~"
foreach ($i in (Get-ChildItem -Filter *.ps1 -Recurse).FullName){ . $i | Out-Null}

python -m pip --upgrade pip pandas numpy flwr matplotlib sklearn joblib
Clear-Host
$text = @' 
Have a nice day! 
'@
Write-host $text