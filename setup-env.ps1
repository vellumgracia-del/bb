$ErrorActionPreference = 'Stop'

$phpDir = "$env:USERPROFILE\php"
Write-Host "Creating $phpDir"
New-Item -ItemType Directory -Force -Path $phpDir | Out-Null

Write-Host "Downloading PHP..."
Invoke-WebRequest -Uri "https://windows.php.net/downloads/releases/latest/php-8.3-nts-Win32-vs16-x64-latest.zip" -OutFile "$env:TEMP\php.zip" -UseBasicParsing

Write-Host "Extracting PHP..."
Expand-Archive -Path "$env:TEMP\php.zip" -DestinationPath $phpDir -Force

Write-Host "Configuring PHP..."
Copy-Item "$phpDir\php.ini-development" "$phpDir\php.ini"
$ini = Get-Content "$phpDir\php.ini"
$ini = $ini -replace ';extension=curl', 'extension=curl'
$ini = $ini -replace ';extension=fileinfo', 'extension=fileinfo'
$ini = $ini -replace ';extension=mbstring', 'extension=mbstring'
$ini = $ini -replace ';extension=openssl', 'extension=openssl'
$ini = $ini -replace ';extension=pdo_sqlite', 'extension=pdo_sqlite'
$ini = $ini -replace ';extension=sqlite3', 'extension=sqlite3'
$ini = $ini -replace ';extension=zip', 'extension=zip'
$ini = $ini -replace ';extension_dir = "ext"', 'extension_dir = "ext"'
Set-Content "$phpDir\php.ini" $ini

Write-Host "Downloading Composer..."
Invoke-WebRequest -Uri "https://getcomposer.org/installer" -OutFile "$env:TEMP\composer-setup.php" -UseBasicParsing
& "$phpDir\php.exe" "$env:TEMP\composer-setup.php" --install-dir="$phpDir" --filename=composer.phar

# Create a composer.bat file so it can be called easily
Set-Content "$phpDir\composer.bat" "@php `"%~dp0composer.phar`" %*"

Write-Host "Updating PATH..."
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notmatch [regex]::Escape($phpDir)) {
    [Environment]::SetEnvironmentVariable("Path", $userPath + ";$phpDir", "User")
    Write-Host "Added $phpDir to User PATH."
}

Write-Host "Done!"
