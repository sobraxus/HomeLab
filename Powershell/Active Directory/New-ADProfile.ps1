## Still Testing


function New-ADProfile () {
    $FName = Read-Host "Enter user's first name"
    $LName = Read-Host "Enter user's last name"
    $Password = ConvertTo-SecureString "FirstTime" -AsPlainText -Force

    $FRandom = 1
    $LRandom = 4

    $userName = $FName.Substring(0, $FRandom) + $LName.Substring(0, $LRandom)
    Get-ADUser -Filter "Name -like '$userName*'"
}