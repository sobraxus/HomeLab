function Get-TokenSize{
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$false, Position=1)] $group, #Parameter for group entry in terminal
        [Parameter(Mandatory=$false, Position=2)] $user #Parameter for user entry in terminal
    )
    begin {
        $group = $group.split(',') -replace '/s','' #Formatting - splits into an comma-delim array)
        $user = $user.split(',') -replace '/s',''  #Formatting - splits into an comma-delim array)
        $domain = example.net #Golbal variable for domain
        $csvPath = C:\Users #Global varaible for csv path (This will be instantly deleted but for troubleshooting)

        foreach ($user in $users){
            Invoke-Command{ #Used since ntdsutil cannot be invoked directly
                (
                ntdsutil.exe "group membership evaluation" "run $domain $user" "quit" "quit" #creates tsv file containing direct and recursive membership
                )
            } | Out-Null #So no output to terminal (GME produces a lot of output)

            $csvPath = Get-ChildItem -Path $csvPath -Filter $user*.tsv -Recurse | ForEach-Object ($_.FullName) #Sets filepath to full path of tsv created (e.g. 'C/Users/joeb/ntdsutil/samt89754.tsv')
            (Get-Content $csvPath | Select-Object -Skip 8 | Set-Content $csvPath) #gets content of tsv skipping headers etc
            $userImport = Import-Csv -Delimiter "`t" -Path $csvPath #Creates variable $userImport importing content of tsv to it
            remove-item $csvPath -Force #Removes tsv file from folder

        foreach ($group in $group){
            Invoke-Command{ #Used since ntdsutil cannot be invoked directly
                (
                ntdsutil.exe "group membership evaluation" "run $domain $group" "quit" "quit" #creates csv file containing direct and recursive membership
                )
            } | Out-Null #So no output to terminal (GME produces a lot of output)

            $csvPath = Get-ChildItem -Path $csvPath -Filter $group*.tsv -Recurse | ForEach-Object ($_.FullName) #Sets filepath to full path of tsv created (e.g. 'C/Users/joeb/ntdsutil/DnsAdmins89754.tsv')
            (Get-Content $csvPath | Select-Object -Skip 8 | Set-Content $csvPath) #gets content of tsv skipping headers etc
            $groupImport = Import-Csv -Delimiter "`t" -Path $csvPath #Creates variable $groupImport importing content of tsv to it
            remove-item $csvPath -Force #Removes tsv file from folder
        }

        $uniquePerms = ($userImport+$groupImport) | Select-Object SamAccountName -Unique #Selects only unique names from SamAccountName. Adds both together.
        $totalPerms = ($uniquePerms - 6 - $user.count - $group.count) #Subtract 6 for shadow groups (Domain Users etc) and subtract the amount of user and group inputted anyway
        Write-Host $totalPerms #Total permissions should accurately reflect
        }
    }
}
