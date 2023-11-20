#requires -Module @{ModuleName='dotenv'; ModuleVersion="0.4.0"}
# To get the most recent version
# TODO: Look into PSDepend as an alternative
# Install-ModuleFromGitHub -GitHubRepo stopthatastronaut/poshdotenv -moduleName dotenv -Scope CurrentUser

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$PSDefaultParameterValues['*:ErrorAction'] = 'Stop'


Import-Module dotenv -Function Set-DotEnv, Remove-DotEnv
Set-DotEnv

Import-Module ./Math.psm1 -Force -Function Invoke-Add, Invoke-Subtract, New-Calculator


function Invoke-Cleanup() {
    Remove-Module Math
    Remove-DotEnv
}

function Invoke-Main() {
    Write-Output "20 + 30 = $(Invoke-Add 20 30)"
    Write-Output "20 + 30 = $(Invoke-Subtract 20 30)"


    $c1 = New-Calculator 100

    $c1.Add(7)
    $c1.Add(8)

    Write-Output "Calculator value = $($c1.Value)"

    Write-Output "$($env:APP_THEME)"
}


try {
    Invoke-Main
}
catch {
    Write-Output "=== CATCH ERROR ==="
    Write-Output $_
    Write-Output $_.ScriptStackTrace
}
finally {
    Invoke-Cleanup
}



