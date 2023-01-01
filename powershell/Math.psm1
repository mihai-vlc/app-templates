function Invoke-Add ([int]$a, [int]$b) {
    return $a + $b
}

function Invoke-Subtract ([int]$a, [int]$b) {
    return $a - $b
}


class Calculator {

    [int] $Value

    Calculator([int]$initalValue) {
        $this.Value = $initalValue
    }

    [void] Add ([int]$n) {
        $this.Value += $n
    }

}

function New-Calculator ([int]$initalValue) {
    return [Calculator]::new($initalValue)
}


Export-ModuleMember *-*
