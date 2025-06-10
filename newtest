function Get-TokenSize{

<# 

.SYNOPSIS

Used to generate the accurate kerberos token size of a user

.DESCRIPTION

While this script alone can be used to generate a user's token size if added to a group (Example1)
Similarly it can be reversed to generate a group added to a group (Example2)
or even to send an automated email via a task scheduler to check what the highest token count is on a daily basis.

Remember, your second entry (-group) will be added to your first entry (-user)

There is always room for improvment also.

.EXAMPLE

In this example we will assume the following:

User: 805
Group: 150

Terminal: Get-TokenSize -user adam1 -group testgroup
Output: adam1's total permissions will be 955

.EXAMPLE

In this example we will assume the following:

Group1: 340
Group2: 120

and that this is a seperate token generation script dedicated to groups (however you can put a group in the user section just remember that's the one you want to add to)

Terminal: Get-TokenSizeGroup -group1 SecEngTest -group2 K8Admin
Output: adam1's total permissions will be 460

#>


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
        Write-Host "$user's total permissions will be $totalPerms" #Total permissions should accurately reflect
        }
    }
}
