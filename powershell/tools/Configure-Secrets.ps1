throw "Use F8 to run a single command not F5"

if (-not (Test-SecretVault -Name 'AppSecrets')) {
    Register-SecretVault `
        -Name 'AppSecrets' `
        -ModuleName 'SecretManagement.Keepass' `
        -VaultParameters @{
        Path              = "C:\tmp\pwsh-secrets\AppSecrets.kdbx"
        UseMasterPassword = $false
        KeyPath           = "C:\tmp\pwsh-secrets\secrets-vault.keyx"
    }
}


Test-SecretVault -Name 'AppSecrets'

Set-Secret -Name "db_user" -Secret "mihai" -Vault "AppSecrets"


Get-Secret -Name "db_user" -Vault "AppSecrets"
Get-Secret -Name "db_user" -Vault "AppSecrets" -AsPlainText
Get-Secret -Name "db_user" -Vault "AppSecrets" | ConvertFrom-SecureString -AsPlainText
