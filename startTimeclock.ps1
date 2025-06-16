Write-Host "Starting both servers in separate windows..."

# Start npm server in first window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

# Start Flask server in second window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ..\timeclock-python-flask; .\runFlaskServer.ps1"