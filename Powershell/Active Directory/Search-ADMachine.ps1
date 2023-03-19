function Search-ADMachine{
    <#
    Written in Powershell 7.3.3 
    Version 1.0.0 by Adam Cooper

    .SYNOPSIS
    Queries Active Directory for the object(s) (Applies to users and general machines)
    
    .DESCRIPTION
    Queries Active Directory for the object(s) (Applies to users and general machines) and returns the object(s):
    FQDN, IPv4Address, and whenCreated/whenChanged i.e. when the object was last patched/rebuilt etc.
    
    .EXAMPLE
    Search-ADMachine -Object <username>

    <username@DN> | <ip4address> | 01/12/2022 | 01/01/2023
    
    .NOTES
    This Works, for future versions of this, it would be worth looking at implementing error checking
    via try;catch blocks.
    #>
        [CmdletBinding()] #Makes the current function an advanced function
        param ( #Beginning of the Parameter List
          [Parameter(Mandatory)]$Object #Username or Machine name to be searched for in Active Directory
        )
        
        begin { #Beginning of the Main Code Section
          Get-ADComputer -Filter "Name -like '*$Object*'" -Properties IPv4Address, whenCreated,WhenChanged | Select-Object DNSHostName,IPv4Address, whenCreated, WhenChanged   
        }
}