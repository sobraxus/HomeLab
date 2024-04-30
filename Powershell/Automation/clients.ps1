function Open_FLClients {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]$clients
    )
    $partitions = 10
    Write-Host("This file has is on version 0.19")
    wt -w -0 nt python 'C:\Users\adamc\Work\HomeLab\ML Dissertation\WOnce\Server.py'
    Start-Sleep -Seconds 5
    for ($i = 0; $i -lt $clients; $i++){
        for($j = 0; $j -lt $partitions; $j++){ 
        wt -w 0 nt python 'c:/Users/adamc/Work/HomeLab/ML Dissertation/WOnce/Client.py' --partition-id $j
        if($j = 10){
            $j = 0
        }
       }
    }
    write-output ("Opened ", $clients, " clients")
}

