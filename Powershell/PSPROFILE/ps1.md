Get-ChildItem -path C:\Users\adamc\Work\HomeLab\Powershell -Filter *.ps1 -Recurse | ForEach-Object {. $_.FullName}
Set-Location -Path C:\Users\adamc\Work\HomeLab
python -m pip install --upgrade pip pandas numpy matplotlib django
Clear-Host
$text = @' 
Have a nice day! 
'@
Write-host $text