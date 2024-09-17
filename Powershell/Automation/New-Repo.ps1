function New-Repo{
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$True, Position=1)] $Path,
        [Parameter(Mandatory=$True, Position=2)] $repo_Name
)
Set-Location $path
gh repo create $repo_Name --public
gh repo clone $repo_Name
Set-Location $repo_Name
Write-Output "New repository $repo_Name created"
}