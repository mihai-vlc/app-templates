Import-Module ./Math.psm1 -Force -Function Invoke-Add, Invoke-Subtract, New-Calculator

function Invoke-Cleanup() {
    Remove-Module Math
}

function Invoke-Main() {
    Write-Output "20 + 30 = $(Invoke-Add 20 30)"
    Write-Output "20 + 30 = $(Invoke-Subtract 20 30)"


    $c1 = New-Calculator 100

    $c1.Add(7)
    $c1.Add(8)

    Write-Output "Calculator value = $($c1.Value)"
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



