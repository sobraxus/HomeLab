function Open_FLClients {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]$clients
    )
    wt new-tab cd 'C:\ML Dissertation\LogReg', python LR_Sever.py
    for ($i = 0; $i -lt $clients; $i++){
        wt new-tab cd 'C:\ML Dissertation\LogReg',python LR_Client.py
    }
    write-output ("Opened ", $clients, " clients")
}

