Get-ChildItem "frontend/public/images/*.jpg.jpg" | ForEach-Object {
    $newName = $_.Name -replace '\.jpg\.jpg$', '.jpg'
    Rename-Item $_.FullName -NewName $newName
}

Get-ChildItem "frontend/public/images/*.jpg.webp" | ForEach-Object {
    $newName = $_.Name -replace '\.jpg\.webp$', '.jpg'
    Rename-Item $_.FullName -NewName $newName
} 