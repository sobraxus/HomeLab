function Open_FLClients {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]$clients
    )
    for ($i = 0; $i -lt $clients; $i++){
        wt new-tab python 'c:/Users/adamc/Work/HomeLab/ML Dissertation/LogReg/LR_Server.py'
    }
    write-output ("Opened ", $clients, " clients")
}

