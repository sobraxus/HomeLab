function Check-Token{
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$false, Position=1)] $group,
        [Parameter(Mandatory=$false, Position=2)] $user
    )
    begin {
        $group = $group.split(',') -replace '/s',''
        $user = $user.split(',') -replace '/s',''
        $domain = example.net
        $csvPath = C:\Users

        foreach ($user in $users){
            Invoke-Command{
                (
                ntdsutil.exe "group membership evaluation" "run $domain $user" "quit" "quit"
                )
            } | Out-Null

            $csvPath = Get-ChildItem -Path $csvPath -Filter $user*.tsv -Recurse | ForEach-Object ($_.FullName)
            (Get-Content $csvPath | Select-Object -Skip 8 | Set-Content $csvPath)
            $userImport = Import-Csv -Delimiter "`t" -Path $csvPath
            remove-item $csvPath

        foreach ($group in $group){
            Invoke-Command{
                (
                ntdsutil.exe "group membership evaluation" "run $domain $group" "quit" "quit"
                )
            } | Out-Null
            $csvPath = Get-ChildItem -Path $csvPath -Filter $group*.tsv -Recurse | ForEach-Object ($_.FullName)
            (Get-Content $csvPath | Select-Object -Skip 8 | Set-Content $csvPath)
            $groupImport = Import-Csv -Delimiter "`t" -Path $csvPath
            remove-item $csvPath
        }

        $uniquePerms = ($userImport+$groupImport) | Select-Object SamAccountName -Unique
        $totalPerms = ($uniquePerms - 6 - $user.count - $group.count)
        Write-Host $totalPerms
        }
    }
}
