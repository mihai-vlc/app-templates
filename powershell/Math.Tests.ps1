BeforeAll {
    Import-Module ./Math.psm1 -Force -Function Invoke-Add, Invoke-Subtract, New-Calculator
}


AfterAll {
    Remove-Module Math
}


Describe "Invoke-Add function" {
    It "should add numbers" {
        Invoke-Add 20 30 | Should -Be 50
        Invoke-Add 25 30 | Should -Be 55
    }
}

Describe "Invoke-Subtract function" {
    It "should subtract numbers" {
        Invoke-Subtract 20 30 | Should -Be -10
        Invoke-Subtract 250 100 | Should -Be 150
    }
}

Describe "Calculator" {
    It "should add numbers" {
        $c1 = New-Calculator

        $c1.Add(2)
        $c1.Add(3)

        $c1.Value | Should -Be 5
    }
}


