#UP2009045
function Open_FLClients {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]$clients #User required to enter amount of clients
    )
    $partitions = 50 #Creates and sets variable for amount of data partitions
    
    Write-Host("This file has is on version 0.19") # Updated each new version
        for ($i = 0; $i -lt $clients; $i++){# Creates a for loop which will continue for aslong as $i is less than amount of clients
        
        $part_ID = Get-Random -Minimum 0 -Maximum $partitions

        wt -w 0 nt python 'c:/Users/adamc/Work/HomeLab/ML Dissertation/WOnce/Client.py' --partition-id $part_ID  #New terminal tab runs client.py and automatically selects a partition
        
    }
    write-output ("Opened ", $clients, " clients")
}
